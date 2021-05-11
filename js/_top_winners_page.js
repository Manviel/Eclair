var b7_winners_odds_types = ["a", "d", "f"],
  b7_winners_odds_type = b7_winners_odds_types[currentOddStyle];
b7_postLogin = function () {
  jQuery("#winners")[0].contentWindow.postMessage(
    "d7c3baf4ec051001d17b5aaeac804480*7ade3034ff963668984e759564e6a136a0261e0d*reload",
    "*"
  );
  jQuery("#winners_login_message > span").animate({ opacity: 0 }, 250);
  return false;
};
b7_postLogout = function () {
  jQuery("#winners")[0].contentWindow.postMessage(
    "d7c3baf4ec051001d17b5aaeac804480*7ade3034ff963668984e759564e6a136a0261e0d*reload",
    "*"
  );
  jQuery("#winners_login_message > span").animate({ opacity: 1 }, 250);
  return false;
};
var b7_winners_extra_url = "";
if (window.location.href.split("#").length > 1) {
  b7_winners_extra_url = window.location.href.split("#")[1];
  if (b7_winners_extra_url == "challenge")
    b7_winners_extra_url = "&type=luckyChallenge";
  else if (b7_winners_extra_url == "prizes")
    b7_winners_extra_url = "&type=luckyPrizes";
  else if (b7_winners_extra_url == "ranking")
    b7_winners_extra_url = "&type=luckyRanking";
  else if (b7_winners_extra_url.split(",").length > 1) {
    b7_winners_extra_url = b7_winners_extra_url.split(",");
    if (b7_winners_extra_url[0] == "weekly")
      b7_winners_extra_url =
        "&type=weekly&choice=" + parseInt(b7_winners_extra_url[1]);
    else if (b7_winners_extra_url[0] == "monthly")
      b7_winners_extra_url =
        "&type=monthly&choice=" + parseInt(b7_winners_extra_url[1]);
    else if (b7_winners_extra_url[0] == "yearly")
      b7_winners_extra_url =
        "&type=yearly&choice=" + parseInt(b7_winners_extra_url[1]);
    else b7_winners_extra_url = "";
  }
}
jQuery("#winners_header").html(
  "<div style=\"height:200px;background:url('" +
    urls.base +
    "uploads/public/winners/logo_" +
    sbtech2bet777Lang(LangID) +
    '.png\') center center no-repeat;text-align:center;color:transparent">.</div><div id="winners_wrapper" style="height:734px;border:10px solid rgba(0,0,0,0.5);border-radius:8px;overflow:hidden"><iframe id="winners" src="' +
    urls.base +
    "bet/winners?lang=" +
    sbtech2bet777Lang(LangID) +
    "&odds=" +
    b7_winners_odds_type +
    b7_winners_extra_url +
    '" style="width:100%;height:100%"></iframe></div><div style="height:72px;padding-top:12px;color:white;font-family:\'PT Sans\';font-size:10pt;text-align:center" id="winners_login_message"><span style="padding:8px 0;display:inline-block;opacity:' +
    (APIUser().token == "" || APIUser().token == false ? "1" : "0") +
    '">' +
    getTranslation("Please log in to see your own ranking!") +
    '</span><br /><center><div class="addthis_native_toolbox addthis_native_sidebarblocker"></div></center></div>'
);
var background_image_interval = setInterval(function () {
  if (jQuery("#b7_body").length == 0) return;
  jQuery("#b7_body")
    .append(
      '<div id="b7_custom_background" style="position:absolute;top:118px;left:0;width:100%;height:1px;z-index:-1;display:none;opacity:1;background:url(' +
        urls.base +
        '/uploads/public/winners/bg.jpg) center bottom no-repeat #000000"></div>'
    )
    .css("background", "none");
  setInterval(function () {
    jQuery("#b7_custom_background").css(
      "height",
      Math.floor(jQuery("#b7_footer").offset().top) - 64 + "px"
    );
  }, 250);
  jQuery("#b7_custom_background").fadeIn(500);
  clearInterval(background_image_interval);
  background_image_interval = null;
});

if (typeof setOddStyle_old == "undefined") {
  var setOddStyle_old = setOddStyle;
  setOddStyle = function (val) {
    setOddStyle_old(val);
    b7_winners_change_odds_type(val);
  };
  setOddStyle.listeners = setOddStyle_old.listeners;
  var setOddStyle_new = setOddStyle.toString();
  var setOddStyle_new_interval = setInterval(function () {
    if (setOddStyle.toString() != setOddStyle_new) {
      var setOddStyle_temp = setOddStyle;
      setOddStyle = function (val) {
        setOddStyle_old(val);
        b7_winners_change_odds_type(val);
      };
      setOddStyle.listeners = setOddStyle_temp.listeners;
    }
  }, 100);
}

var b7_winners_change_odds_type = function (new_type) {
  if (typeof new_type != "number" || new_type < 0) new_type = currentOddStyle;
  if (
    new_type >= b7_winners_odds_types.length ||
    b7_winners_odds_type == new_type
  )
    return false;
  if (b7_winners_odds_type != b7_winners_odds_types[new_type]) {
    b7_winners_odds_type = b7_winners_odds_types[new_type];
    jQuery("#winners")[0].contentWindow.postMessage(
      "d7c3baf4ec051001d17b5aaeac804480*7ade3034ff963668984e759564e6a136a0261e0d*changeOdds*" +
        b7_winners_odds_type,
      "*"
    );
  }
};

var b7_winners_selection_big_template =
  "\
	<span></span>\
	<div>\
		<div>¶%username%'s Winning Selections¶</div>\
		<span></span>\
	</div>\
	<div>\
		%selections%\
	</div>\
";
var b7_winners_selection_big_selections_template =
  '\
	<div>\
		<span class="b7_winner_icon b_%branch_id%"></span>\
		%league_name% : %event_name%<br />\
		<i>%line_type% : <strong>%chosen_bet%</strong></i>\
		<span>%odds%</span>\
	</div>\
';

var b7_winners_selection_big_show = function (
  username,
  selections,
  xpos,
  ypos
) {
  if (jQuery(".b7_winner_selections_big").length == 0)
    jQuery("#b7_body").append('<div class="b7_winner_selections_big"></div>');
  var selections_html = [];
  for (var i in selections) {
    selections_html.push(
      b7_winners_selection_big_selections_template
        .replace("%branch_id%", selections[i].branch_id)
        .replace("%league_name%", selections[i].league_name)
        .replace("%event_name%", selections[i].event_name)
        .replace("%line_type%", selections[i].line_type)
        .replace("%chosen_bet%", selections[i].chosen_bet)
        .replace("%odds%", selections[i].odds)
    );
  }
  jQuery(".b7_winner_selections_big").html(
    interpolateTranslations(b7_winners_selection_big_template, "¶")
      .replace("%username%", username)
      .replace("%selections%", selections_html.join("<span></span>"))
  );
  jQuery(".b7_winner_selections_big")
    .stop(true)
    .css({
      top: jQuery("#winners").offset().top + ypos - 11,
      left: jQuery("#winners").offset().left + xpos + 40,
      display: "block",
    })
    .animate({ opacity: 1 }, 100);
};

var b7_winners_selection_big_hide = function () {
  jQuery(".b7_winner_selections_big")
    .stop(true)
    .animate({ opacity: 0 }, 100, function () {
      jQuery(this).html("").css({ top: -100, left: -350, display: "none" });
    });
};
jQuery.getScript(urls.base + "cache/js/_content.js");
