/**
 * JS code for the stage 1
 */
var outrenderer;
var outstage;
var outbackground;
var active3 = 0;

var container_prize = new PIXI.Container();
var message_final = new PIXI.Sprite();
var container_score = new PIXI.Container();
var logo3;
var containermain;
var prize;
var textBottom;
var textTop;

var selected_flag = new PIXI.Sprite();
var random_flag_sprite = new PIXI.Sprite();

function Scene4(stage, renderer, background) {
  containerscore = new PIXI.Sprite(
    resources["/cache/public/euro2016_penalty/container_score.png"].texture
  );
  logo3 = new PIXI.Sprite(
    resources["/cache/public/euro2016_penalty/small_logo.png"].texture
  );
  containermain = new PIXI.Sprite(
    resources["/cache/public/euro2016_penalty/container_box.png"].texture
  );
  prize = new PIXI.Sprite(
    resources["/cache/public/euro2016_penalty/red_card.png"].texture
  );

  outstage = stage;
  outrenderer = renderer;
  outbackground = background;

  containermain.position.x = 0;
  containermain.position.y = 0;
  containermain.height = 420;
  containermain.width = 420;
  container_prize.addChild(containermain);

  logo3.anchor.x = 0.5;
  logo3.anchor.y = 0.5;
  logo3.position.x = containermain.width / 2;
  logo3.position.y = 370;
  container_prize.addChild(logo3);

  prize.anchor.x = 0.5;
  prize.anchor.y = 0.5;
  prize.position.x = containermain.width / 2;
  prize.position.y = 180;
  prize.height = 180;
  prize.width = 180;
  container_prize.addChild(prize);

  message_final.anchor.x = 0.5;
  message_final.anchor.y = 0.5;
  message_final.position.x = container_prize.width / 2;
  message_final.position.y = container_prize.height;

  container_prize.addChild(message_final);
  textBottom = new PIXI.Text(messages["loser"], {
    font: "bold italic 16px Arial",
    fill: "white",
    align: "center",
  });
  textBottom.anchor.x = 0.5;
  textBottom.anchor.y = 0.5;
  textBottom.position.x = containermain.width / 2;
  textBottom.position.y = 315;
  c.fadeOut(textBottom);

  textTop = new PIXI.Text(messages["top_winner"], {
    font: "bold italic 18px Arial",
    fill: "white",
    align: "center",
  });
  textTop.anchor.x = 0.5;
  textTop.anchor.y = 0.5;
  textTop.position.x = containermain.width / 2;
  textTop.position.y = 110;
  c.fadeOut(textTop);

  container_prize.addChild(textBottom);
  container_prize.addChild(textTop);

  container_prize.position.x = outrenderer.original_width / 2 - 210;
  container_prize.position.y = 90;
  outstage.addChild(container_prize);

  containerscore.anchor.x = 0.5;
  containerscore.anchor.y = 0.5;
  containerscore.position.x = 200;
  containerscore.position.y = 41;
  containerscore.width = 400;
  containerscore.height = 82;
  container_score.position.x = outrenderer.original_width / 2 - 200;
  container_score.position.y = 0;

  container_score.addChild(containerscore);
  outstage.addChild(container_score);
}

Scene4.prototype.startScene = function (result, teams, scores, status) {
  var idflag;
  var random_flag;
  if (status == "2") {
    teams = teams.replace("'", "").replace("'", "");
    var teams_new = teams.split(":");
    for (var key in names) {
      // skip loop if the property is from prototype
      if (!names.hasOwnProperty(key)) continue;
      var obj = names[key];
      if (obj[0] == teams_new[0]) idflag = key;
      if (obj[0] == teams_new[1]) random_flag = key;
    }

    var scores_new = JSON.parse(scores);
    var c1 = 0;
    for (var i = 0; i < 5; i++) {
      c1 += scores_new.usr[i];
    }
    var c2 = 0;
    for (var j = 0; j < 5; j++) {
      c2 += scores_new.pc[j];
    }

    active2 = 1;
    active_score_2 = 1;
    textTeam1 = new PIXI.Text(names[idflag][1], {
      font: "bold 17px Arial",
      fill: "black",
      align: "left",
    });
    textTeam1.position.x = 45;
    textTeam1.position.y = 9;
    textTeam2 = new PIXI.Text(names[random_flag][1], {
      font: "bold 17px Arial",
      fill: "black",
      align: "right",
    });
    textTeam2.anchor.x = 1;
    textTeam2.position.x = 360;
    textTeam2.position.y = 9;

    textScoreTeam1 = new PIXI.Text(c1 + "", {
      font: "bold 30px Arial",
      fill: "#74B500",
      align: "center",
    });
    textScoreTeam1.position.x = 170;
    textScoreTeam1.position.y = 48;
    textScoreTeam2 = new PIXI.Text(c2 + "", {
      font: "bold 30px Arial",
      fill: "#74B500",
      align: "center",
    });
    textScoreTeam2.anchor.x = 0.5;
    textScoreTeam2.position.x = 222;
    textScoreTeam2.position.y = 48;

    //Adds the flag selected by the user
    var textureFlag = PIXI.Texture.fromImage(
      "/cache/public/euro2016_penalty/flags/" + idflag + ".png"
    );
    selected_flag.texture = textureFlag;
    selected_flag.anchor.x = 0.5;
    selected_flag.anchor.y = 0.5;
    selected_flag.width = 32;
    selected_flag.height = 32;
    selected_flag.position.x = 20;
    selected_flag.position.y = 18;

    container_score.addChild(selected_flag);
    //Adds a random flag as opponent
    var textureRandomFlag = PIXI.Texture.fromImage(
      "/cache/public/euro2016_penalty/flags/" + random_flag + ".png"
    );
    random_flag_sprite.texture = textureRandomFlag;
    random_flag_sprite.anchor.x = 0.5;
    random_flag_sprite.anchor.y = 0.5;
    random_flag_sprite.width = 32;
    random_flag_sprite.height = 32;
    random_flag_sprite.position.x = 380;
    random_flag_sprite.position.y = 18;

    teams = names[idflag][0] + ":" + names[random_flag][0];

    container_score.addChild(random_flag_sprite);
    container_score.addChild(textTeam1);
    container_score.addChild(textTeam2);
    container_score.addChild(textScoreTeam1);
    container_score.addChild(textScoreTeam2);
  } else {
    container_score.visible = false;
  }
  if (result == "0") {
    message_final.texture =
      resources[
        "/cache/public/euro2016_penalty/messages/try_again_" + lg + ".png"
      ].texture;
    prize.texture =
      resources["/cache/public/euro2016_penalty/red_card.png"].texture;
  } else if (result == "1") {
    message_final.texture =
      resources[
        "/cache/public/euro2016_penalty/messages/congrats_" + lg + ".png"
      ].texture;
    prize.texture =
      resources[
        "/cache/public/euro2016_penalty/messages/" + prs + ".png"
      ].texture;
    textBottom.text = messages["winner"];
  } else if (result == "2") {
    message_final.texture =
      resources[
        "/cache/public/euro2016_penalty/messages/congrats_" + lg + ".png"
      ].texture;
    prize.texture =
      resources[
        "/cache/public/euro2016_penalty/messages/" + prb + ".png"
      ].texture;
    textBottom.text = messages["winner"];
  }
  showMessage(result);
};

Scene4.prototype.clearScene = function () {};
Scene4.prototype.repositionElements = function (orientation) {
  container_score.position.x = outrenderer.original_width / 2 - 200;
  container_prize.position.x = outrenderer.original_width / 2 - 210;
  if (orientation >= 1) container_prize.position.y = 80;
  else container_prize.position.y = 170;
};
Scene4.prototype.isActive = function () {
  return active3 === 1 ? true : false;
};
function showMessage(result) {
  c.fadeIn(message_final);
  c.scale(message_final, 1, 1, 22);
  var tween_message_final = c.slide(
    message_final,
    message_final.position.x,
    60,
    40,
    "bounce 3 -3"
  );
  tween_message_final.onComplete = function () {
    c.fadeIn(textBottom);
    if (result == "1") {
      c.fadeIn(textTop);
      requestAnimationFrame(animatePrizeWinner);
      c.breathe(prize, 1, 1, 20, false);
    }
  };
}
var yspeed_4 = 0.6;

function animatePrizeWinner() {
  if (prize.position.y > 205) {
    // bounce the circle
    yspeed_4 *= -1;
    // affix to the bottom of the stage
    prize.position.y = 205;
  } else if (prize.position.y < 180) {
    // bounce the circle
    yspeed_4 *= -1;
    // affix to the top of the stage
    prize.position.y = 180;
  }

  prize.position.y += yspeed_4;
  requestAnimationFrame(animatePrizeWinner);
}
