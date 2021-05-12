// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/penalty_euro/euro_scene2.js":[function(require,module,exports) {
/**
 * JS code for the stage 2
 */
var outrenderer;
var outstage;
var out_next_scene2;
var outbackground;
var current_turn = 0;
var active2 = 0;
var active_score_2 = 0;
var positionYBaseArco = 0;
var count = 0;
var container_goal_ball = new PIXI.Container();
var container_score = new PIXI.Container();
var container_icon = new PIXI.Container();
var scene_call = 0;
var gjp = [];
var gja = [];
var teams_selected = "";
var rl = 0;
var FRAMES = [prfx + "football.png", prfx + "football.png"]; // create a new Sprite using the texture

var ball;
var gloves;
var white_mark;
var arco;
var arco1;
var arco2;
var arco3;
var arco4;
var arco5;
var arco6;
var container;
var containerscore;
var arcos;
var blurFilter1;
var playerIcon;
var textTeam1;
var textTeam2;
var message = new PIXI.Sprite();
var selected_flag = new PIXI.Sprite();
var random_flag_sprite = new PIXI.Sprite();
var numbers_random = [1, 2, 3, 4, 5, 6];
var score_sprites = [];
var score_sprites_auto = [];
var score_goal = [-1, -1, -1, -1, -1];
var score_goal_auto = [-1, -1, -1, -1, -1];
var number_clicks_goal = 0;
var number_clicks_glove = 0;
var current_turn_sum = 0;
var sum_score_player = 0;
var sum_score_auto = 0;

function Scene2(stage, renderer, next_scene, background) {
  // Initialize sprites 2
  ball = new PIXI.Sprite(resources[prfx + "football2.png"].texture);
  gloves = new PIXI.Sprite(resources[prfx + "gloves.png"].texture);
  white_mark = new PIXI.Sprite(resources[prfx + "white_mark.png"].texture);
  arco = new PIXI.Sprite(resources[prfx + "arco.png"].texture);
  arco1 = new PIXI.Sprite(resources[prfx + "arco-0-0.png"].texture);
  arco2 = new PIXI.Sprite(resources[prfx + "arco-1-0.png"].texture);
  arco3 = new PIXI.Sprite(resources[prfx + "arco-2-0.png"].texture);
  arco4 = new PIXI.Sprite(resources[prfx + "arco-0-1.png"].texture);
  arco5 = new PIXI.Sprite(resources[prfx + "arco-1-1.png"].texture);
  arco6 = new PIXI.Sprite(resources[prfx + "arco-2-1.png"].texture);
  container = new PIXI.Sprite(resources[prfx + "container_goal.png"].texture);
  container.visible = false;
  containerscore = new PIXI.Sprite(resources[prfx + "container_score.png"].texture);
  blurFilter1 = new PIXI.filters.BlurFilter();
  playerIcon = new PIXI.Sprite(resources[prfx + "player_icon.png"].texture);
  textTeam1;
  textTeam2;
  message = new PIXI.Sprite();
  selected_flag = new PIXI.Sprite();
  random_flag_sprite = new PIXI.Sprite();
  arcos = [arco1, arco2, arco3, arco4, arco5, arco6];
  outstage = stage;
  outrenderer = renderer;
  out_next_scene2 = next_scene;
  outbackground = background;
  container_goal_ball.position.x = outrenderer.original_width + (outrenderer.original_width / 2 - 240);
  container_goal_ball.position.y = 0;
  container.position.x = 0;
  container.position.y = 0;
  container_goal_ball.addChild(container);
  positionYBaseArco = 250;
  arco2.position.x = 240;
  arco2.position.y = positionYBaseArco - 84; // center the sprites anchor point

  ball.anchor.x = 0.5;
  ball.anchor.y = 0.5;
  ball.filters = [blurFilter1];
  arco1.position.x = arco2.position.x - 140;
  arco1.position.y = positionYBaseArco - 84;
  arco3.position.x = arco2.position.x + 140;
  arco3.position.y = positionYBaseArco - 84;
  arco4.position.x = arco2.position.x - 140;
  arco4.position.y = positionYBaseArco;
  arco5.position.x = arco2.position.x;
  arco5.position.y = positionYBaseArco;
  arco6.position.x = arco2.position.x + 140;
  arco6.position.y = positionYBaseArco; //Add goals to array in order to bind a click function to them

  var elasticTween;
  var elasticTweenAuto;
  var current_click;
  var current_auto;
  var empty_score;
  var current_result;
  containerscore.anchor.x = 0.5;
  containerscore.anchor.y = 0.5;
  containerscore.position.x = 200;
  containerscore.position.y = 41;
  containerscore.width = 400;
  containerscore.height = 82;
  container_score.position.x = outrenderer.original_width + (outrenderer.original_width / 2 - 200);
  container_score.position.y = 0;
  container_score.addChild(containerscore);

  for (var i = 0; i < score_goal.length; i++) {
    if (i !== 0) empty_score = new PIXI.Sprite(resources[prfx + "empty_score.png"].texture);else empty_score = new PIXI.Sprite(resources[prfx + "selected_score.png"].texture);
    empty_score.anchor.x = 0.5;
    empty_score.anchor.y = 0.5;
    empty_score.width = 22;
    empty_score.height = 22;
    empty_score.position.x = i * 22 + 12;
    empty_score.position.y = 60;
    score_sprites.push(empty_score);
    container_score.addChild(empty_score); //Add the other one for the computer score

    empty_score = new PIXI.Sprite(resources[prfx + "empty_score.png"].texture);
    empty_score.anchor.x = 0.5;
    empty_score.anchor.y = 0.5;
    empty_score.width = 22;
    empty_score.height = 22;
    empty_score.position.x = 200 + 78 + (i * 22 + 12);
    empty_score.position.y = 60;
    score_sprites_auto.push(empty_score);
    container_score.addChild(empty_score);
  }

  outstage.addChild(container_score);

  for (var i = 0; i < arcos.length; i++) {
    arcos[i].anchor.x = 0.5;
    arcos[i].anchor.y = 0.5;
    arcos[i].interactive = true;
    arcos[i].buttonMode = true;
    arcos[i].defaultCursor = "pointer";

    arcos[i].mousedown = arcos[i].touchstart = function () {
      if (this.interactive == false) return;
      container_icon.visible = false;
      turnInteractiveOnOff(false);
      var item;
      var pr = -1;
      var pr2 = -1;

      if (gjp.length > 0) {
        pr = -2;
        pr2 = -2;
      } else {
        item = numbers_random[Math.floor(Math.random() * numbers_random.length)];
      }

      if (current_turn == 0) {
        if (pr !== -1) {
          pr = gjp[number_clicks_goal];

          if (pr == 1) {
            do {
              item = numbers_random[Math.floor(Math.random() * numbers_random.length)];
            } while (arcos[item - 1].position.x == this.position.x && arcos[item - 1].position.y == this.position.y);
          } else if (pr == 0) {
            do {
              item = numbers_random[Math.floor(Math.random() * numbers_random.length)];
            } while (arcos[item - 1].position.x != this.position.x || arcos[item - 1].position.y != this.position.y);
          }
        }

        current_click = ball;
        current_auto = gloves;

        if (this.position.x == arcos[item - 1].position.x && this.position.y == arcos[item - 1].position.y) {
          current_result = 0;
          score_sprites[number_clicks_goal].texture = resources[prfx + "bad_score.png"].texture;
        } else {
          current_result = 1;
          score_sprites[number_clicks_goal].texture = resources[prfx + "good_score.png"].texture;
          sum_score_player += 1;
        }

        score_goal[number_clicks_goal] = current_result;
        number_clicks_goal += 1;
        current_turn = 1;
      } else {
        if (pr2 !== -1) {
          pr2 = gja[number_clicks_glove];

          if (pr2 == 1) {
            do {
              item = numbers_random[Math.floor(Math.random() * numbers_random.length)];
            } while (arcos[item - 1].position.x == this.position.x && arcos[item - 1].position.y == this.position.y);
          } else if (pr2 == 0) {
            do {
              item = numbers_random[Math.floor(Math.random() * numbers_random.length)];
            } while (arcos[item - 1].position.x != this.position.x || arcos[item - 1].position.y != this.position.y);
          }
        }

        current_click = gloves;
        current_auto = ball;

        if (this.position.x == arcos[item - 1].position.x && this.position.y == arcos[item - 1].position.y) {
          current_result = 0;
          score_sprites_auto[number_clicks_glove].texture = resources[prfx + "bad_score.png"].texture;
        } else {
          current_result = 1;
          score_sprites_auto[number_clicks_glove].texture = resources[prfx + "good_score.png"].texture;
          sum_score_auto += 1;
        }

        score_goal_auto[number_clicks_glove] = current_result;
        number_clicks_glove += 1;
        current_turn = 0;
      }

      requestAnimationFrame(frameBall);
      elasticTween = c.slide(current_click, this.position.x, this.position.y, 25, "inverseSineSquared");
      c.scale(ball, 0.7, 0.7, 25);
      elasticTweenAuto = c.slide(current_auto, arcos[item - 1].position.x, arcos[item - 1].position.y, 25, "inverseSineSquared");

      elasticTween.onComplete = function () {
        onTweenCompleteBall(ball);
      };

      elasticTweenAuto.onComplete = function () {
        displayMessage(current_result);
        onTweenCompleteGloves(gloves);
      };
    };

    container_goal_ball.addChild(arcos[i]);
  }

  gloves.position.x = 240;
  gloves.position.y = positionYBaseArco - 15;
  gloves.width = 90;
  gloves.height = 90;
  gloves.anchor.x = 0.5;
  gloves.anchor.y = 0.5;
  container_goal_ball.addChild(gloves);
  ball.position.x = 240;
  ball.position.y = positionYBaseArco + 150;
  playerIcon.anchor.x = 0.5;
  playerIcon.anchor.y = 0.5;
  playerIcon.position.x = 0;
  playerIcon.position.y = 0;
  container_icon.position.x = ball.position.x;
  container_icon.position.y = 340;
  container_icon.addChild(playerIcon);
  white_mark.anchor.x = 0.5;
  white_mark.anchor.y = 0.5;
  white_mark.position.x = ball.position.x;
  white_mark.position.y = ball.position.y + 35;
  container_goal_ball.addChild(white_mark);
  container_goal_ball.addChild(ball);
  container_goal_ball.addChild(container_icon);
  message.anchor.x = 0.5;
  message.anchor.y = 0.5;
  message.position.x = -1000;
  message.position.y = 280;
  container_goal_ball.addChild(message);
  outstage.addChild(container_goal_ball);
  requestAnimationFrame(animateIcon);
}

Scene2.prototype.startScene = function (idflag, random_flag) {
  initGame();
  active2 = 1;
  active_score_2 = 1;
  textTeam1 = new PIXI.Text(names[idflag][1], {
    font: "bold 17px Arial",
    fill: "black",
    align: "left"
  });
  textTeam1.position.x = 45;
  textTeam1.position.y = 9;
  textTeam2 = new PIXI.Text(names[random_flag][1], {
    font: "bold 17px Arial",
    fill: "black",
    align: "right"
  });
  textTeam2.anchor.x = 1;
  textTeam2.position.x = 360;
  textTeam2.position.y = 9;
  textScoreTeam1 = new PIXI.Text("0", {
    font: "bold 30px Arial",
    fill: "#74B500",
    align: "center"
  });
  textScoreTeam1.position.x = 170;
  textScoreTeam1.position.y = 48;
  textScoreTeam2 = new PIXI.Text("0", {
    font: "bold 30px Arial",
    fill: "#74B500",
    align: "center"
  });
  textScoreTeam2.anchor.x = 0.5;
  textScoreTeam2.position.x = 222;
  textScoreTeam2.position.y = 48; //Adds the flag selected by the user

  var textureFlag = PIXI.Texture.fromImage(prfx + "flags/" + idflag + ".png");
  selected_flag.texture = textureFlag;
  selected_flag.anchor.x = 0.5;
  selected_flag.anchor.y = 0.5;
  selected_flag.width = 32;
  selected_flag.height = 32;
  selected_flag.position.x = 20;
  selected_flag.position.y = 18;
  container_score.addChild(selected_flag); //Adds a random flag as opponent

  var textureRandomFlag = PIXI.Texture.fromImage(prfx + "flags/" + random_flag + ".png");
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
  new Tween(outbackground, "position.x", outbackground.position.x - 720, outstage.transition_rate, true);
  new Tween(container_goal_ball, "position.x", outrenderer.original_width / 2 - 240, outstage.transition_rate, true);
  new Tween(container_score, "position.x", outrenderer.original_width / 2 - 200, outstage.transition_rate, true);
};

Scene2.prototype.clearScene = function () {
  if (scene_call == 0) {
    message.visible = false;
    scene_call = 1;
    active2 = 0;
    new Tween(outbackground, "position.x", outbackground.position.x - outrenderer.original_width, outstage.transition_rate, true);
    /*new Tween(container_goal_ball, "position.x",(-600) , outstage.transition_rate, true);
         new Tween(container_score, "position.x", (-600), outstage.transition_rate, true);*/

    var cont_ball_tween = c.slide(container_goal_ball, -600, container_goal_ball.position.y, outstage.transition_rate, "smoothstep"); //c.slide(container_score, -600, container_score.position.y, outstage.transition_rate, "smoothstep");

    cont_ball_tween.setOnComplete = function () {
      container_goal_ball.visible = false;
      message.visible = false;
    };
    /*var c1=0;
         var c2=0;
         for(var i =0;i < gja.length;i++){
             if(gja[i] == 1)
                c1+=1; 
         }
         for(var i =0;i < gjp.length;i++){
             if(gjp[i] == 1)
                c2+=1; 
         }
         if(c1 > c2) out_next_scene2.startScene(0,teams);
         else out_next_scene2.startScene(1,teams);*/


    out_next_scene2.startScene(rl, teams);
  }
};

Scene2.prototype.repositionElements = function (orientation) {
  if (active2 == 0) {
    container_goal_ball.position.x = outrenderer.original_width + (outrenderer.original_width / 2 - 240);
    if (active_score_2 == 0) container_score.position.x = outrenderer.original_width + (outrenderer.original_width / 2 - 200);else container_score.position.x = outrenderer.original_width / 2 - 200;
  } else {
    container_goal_ball.position.x = outrenderer.original_width / 2 - 240;
    container_score.position.x = outrenderer.original_width / 2 - 200;
  }

  if (orientation >= 1) container_goal_ball.position.y = 0;else container_goal_ball.position.y = 130;
  container_score.position.y = 0;
};

Scene2.prototype.isActive = function () {
  return active2 === 1 ? true : false;
};

var frameBall = function frameBall() {
  count += 0.5;
  var blurAmount = Math.cos(count);
  blurFilter1.blur = 20 * blurAmount;
  ball.rotation += 0.3;
  requestAnimationFrame(frameBall);
};

function animateErase() {
  ball.rotation -= 0.3;
  blurFilter1.blur = 0;
  requestAnimationFrame(animateErase);
}

var yspeed = 1;

function animateIcon() {
  if (playerIcon.position.y > 30) {
    // bounce the circle
    yspeed *= -1; // affix to the bottom of the stage

    playerIcon.position.y = 30;
  } else if (playerIcon.position.y < 0) {
    // bounce the circle
    yspeed *= -1; // affix to the top of the stage

    playerIcon.position.y = 0;
  }

  playerIcon.position.y += yspeed;
  requestAnimationFrame(animateIcon);
}

function onButtonUpArco() {}

function onTweenCompleteBall(param) {
  setTimeout(function () {
    var elasticTweenBackX = new Tween(param, "position.x", 240, 25, false);
    var elasticTweenBackY = new Tween(param, "position.y", positionYBaseArco + 150, 25, false);
    elasticTweenBackX.easing = Tween.outCubic;
    elasticTweenBackY.easing = Tween.outCubic;
    elasticTweenBackX.start();
    elasticTweenBackY.start();
    requestAnimationFrame(animateErase);
  }, 600);
}

function onTweenCompleteGloves(param) {
  setTimeout(function () {
    var elasticTweenBackX = new Tween(param, "position.x", 240, 25, false);
    var elasticTweenBackY = new Tween(param, "position.y", positionYBaseArco - 25, 25, false);
    elasticTweenBackX.easing = Tween.outCubic;
    elasticTweenBackY.easing = Tween.outCubic;
    elasticTweenBackX.start();
    elasticTweenBackY.start();
    elasticTweenBackY.setOnComplete(function () {
      alterTurnImages();
    });
  }, 600);
}

function alterTurnImages() {
  if (current_turn == 0) {
    ball.texture = resources[prfx + "football2.png"].texture;
    gloves.texture = resources[prfx + "gloves.png"].texture;
    container_icon.position.y = 340;
  } else {
    gloves.texture = resources[prfx + "gloves2.png"].texture;
    ball.texture = resources[prfx + "football.png"].texture;
    container_icon.position.y = 95;
  }

  textScoreTeam1.text = "" + sum_score_player;
  textScoreTeam2.text = "" + sum_score_auto;
  c.scale(ball, 1, 1, 25);
  container_icon.visible = true;
  turnInteractiveOnOff(true);
}

function displayMessage(result) {
  if (current_turn == 0) {
    if (result == 0) {
      message.texture = resources[prfx + "messages/saved_" + lg + ".png"].texture;
    } else {
      message.texture = resources[prfx + "messages/goal_auto_" + lg + ".png"].texture;
    }
  } else {
    if (result == 0) {
      message.texture = resources[prfx + "messages/missed_" + lg + ".png"].texture;
    } else {
      message.texture = resources[prfx + "messages/goal_" + lg + ".png"].texture;
    }
  }

  var tween_message = c.slide(message, container.width / 2, message.position.y, 20, "deceleration");
  var tween_breathe;

  tween_message.onComplete = function () {
    tween_breathe = c.breathe(message, 1.2, 1.2, 20, true);
    tween_breathe.play();
    setTimeout(function () {
      tween_breathe.pause();
      var tween_message2 = c.slide(message, 1000, message.position.y, 20, "acceleration");

      tween_message2.onComplete = function () {
        message.position.x = -1000;

        if (number_clicks_glove === 5) {
          turnInteractiveOnOff(false);
          Scene2.prototype.clearScene();
        }
      };
    }, 800);
  };
}

function turnInteractiveOnOff(newinteractive) {
  for (var i = 0; i < arcos.length; i++) {
    arcos[i].interactive = newinteractive;
  }
}

function initGame() {
  var url = c_url + "PenaltyEURO2016/initializeGame/";
  jQuery.post(url, {
    data: tn
  }, function (response) {
    if (response) {
      if (typeof response["sprites"] != "undefined") {
        var inits = response["sprites"];

        for (var key in inits) {
          if (!inits.hasOwnProperty(key)) continue;
          var a = JSON.parse(Base64.decode(inits[key]));

          for (var i = 0; i < a.length; i++) {
            if (key == "1") gjp.push(a[i]);else if (key == "2") gja.push(a[i]);
          }

          if (key == "t") rl = parseInt(a);
        }
      } else {
        console.log("Error Inside Response");
      }
    } else {
      console.log("Error");
    }
  }, "jsonp");
}
},{}],"C:/Users/Michael/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52631" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Michael/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/penalty_euro/euro_scene2.js"], null)
//# sourceMappingURL=/euro_scene2.99a867be.js.map