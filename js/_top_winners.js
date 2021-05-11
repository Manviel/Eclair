var b7_winners_template =
  '\
	<div class="r_contener_main">\
		<h2>¶Bet777 Winners¶</h2>\
		<div id="b7_winners_menu">\
			<div data-type="weeks" class="disabled">¶Weekly¶</div>\
			<div data-type="months" class="disabled">¶Monthly¶</div>\
			<div data-type="years" class="disabled">¶Yearly¶</div>\
		</div>\
		<div id="b7_winners" class="b7_winners_loading">\
			<div class="b7_winners_date">\
				<span class="b7_winners_left_arrow disabled"></span>\
				<div>-</div>\
				<span class="b7_winners_right_arrow disabled"></span>\
			</div>\
			<div data-bet="1" class="b7_winners_line">\
				<span></span>\
				<div>\
					<span>--</span>\
					<span>¶&euro; -.--¶</span>\
				</div>\
				<div>\
					<span>¶Stake¶: ¶&euro; -.--¶</span>\
					<span>¶Odds¶: <span>--</span></span>\
				</div>\
			</div>\
			<div data-bet="2" class="b7_winners_line">\
				<span></span>\
				<div>\
					<span>--</span>\
					<span>¶&euro; -.--¶</span>\
				</div>\
				<div>\
					<span>¶Stake¶: ¶&euro; -.--¶</span>\
					<span>¶Odds¶: <span>--</span></span>\
				</div>\
			</div>\
			<div data-bet="3" class="b7_winners_line">\
				<span></span>\
				<div>\
					<span>--</span>\
					<span>¶&euro; -.--¶</span>\
				</div>\
				<div>\
					<span>¶Stake¶: ¶&euro; -.--¶</span>\
					<span>¶Odds¶: <span>--</span></span>\
				</div>\
			</div>\
			<div data-bet="4" class="b7_winners_line">\
				<span></span>\
				<div>\
					<span>--</span>\
					<span>¶&euro; -.--¶</span>\
				</div>\
				<div>\
					<span>¶Stake¶: ¶&euro; -.--¶</span>\
					<span>¶Odds¶: <span>--</span></span>\
				</div>\
			</div>\
			<div data-bet="5" class="b7_winners_line">\
				<span></span>\
				<div>\
					<span>--</span>\
					<span>¶&euro; -.--¶</span>\
				</div>\
				<div>\
					<span>¶Stake¶: ¶&euro; -.--¶</span>\
					<span>¶Odds¶: <span>--</span></span>\
				</div>\
			</div>\
		</div>\
		<div id="b7_winners_link">\
			<a href="/top_winners#weekly,1">\
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAASCAMAAAB7LJ7rAAAAaVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8G612AAAAInRSTlMA0OBQEKHxL4AGsFvGaPqRiTkM9Onj2gK3mXVB17qdYFgkqzhWLAAAALhJREFUKM990NkOgyAQQFFAQVBUwF27+v8fWQZQrLG9D0PiieOCDtGO2LoaXZbhAQ7Rvy95TPz5pFeqKxpak8xljpysezKHRinOrCaY4SnqAdOkrsJe73gNXKQ+WSK0tNhFAHLHBIcYErcsLq8mXoXlBr4SI65QZMY58VzKu+OqYb5m3Uvc33GM4a2KzI5vnrlnO2u2+OWRda+HjUtpzvziXGysqToztN9N5z8sykL84oaE2sgtCbEPhQgXxbjEaqMAAAAASUVORK5CYII=" />\
				<span>-</span></a>\
		</div>\
	</div>\
';
var b7_winners_selections_holder_template =
  '\
	<div data-bet="1" class="b7_winner_selections"></div>\
	<div data-bet="2" class="b7_winner_selections"></div>\
	<div data-bet="3" class="b7_winner_selections"></div>\
	<div data-bet="4" class="b7_winner_selections"></div>\
	<div data-bet="5" class="b7_winner_selections"></div>\
';
var b7_winners_selections_template =
  "\
	<span></span>\
	<div>\
		<div>¶%username%'s Winning Selections¶</div>\
		<span></span>\
	</div>\
	%selections%\
	<div>\
		<div>¶Total Winnings¶: %winnings%</div>\
	</div>\
";
var b7_winners_selection_template =
  '\
	<div>\
		<div>\
			<span class="b7_winner_icon b_%branch_id%"></span>\
			%league_name% : %event_name%<br />\
			<i>%line_type%%event_type% : <strong>%chosen_bet%</strong></i>\
			<span>%odds%</span>\
		</div>\
		<span></span>\
	</div>\
';
var b7_winners_month_list = [
  "Unknown",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var b7_winners_type = "weeks";
var b7_winners_odds_types = ["american", "decimal", "fractional"],
  b7_winners_odds_type = b7_winners_odds_types[currentOddStyle];
var b7_currency_string = getTranslation("&euro; -.--");

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
  b7_winners_odds_type = b7_winners_odds_types[new_type];
  if (b7_winners_type == "weeks")
    b7_winners_weeks_get(b7_winners_weeks_current);
  else if (b7_winners_type == "months")
    b7_winners_months_get(b7_winners_months_current);
  else if (b7_winners_type == "years")
    b7_winners_years_get(b7_winners_years_current);
};
var b7_winners_lines_fix_pos = setInterval(function () {
  jQuery(".b7_winners_line > span").each(function () {
    jQuery(
      '.b7_winner_selections[data-bet="' +
        jQuery(this).parent().attr("data-bet") +
        '"]'
    ).css({
      top: jQuery(this).offset().top,
      left: jQuery(this).offset().left - 338,
    });
  });
}, 500);

var b7_winners_lines_bind = function () {
  jQuery(".b7_winners_line > span").each(function () {
    jQuery(
      '.b7_winner_selections[data-bet="' +
        jQuery(this).parent().attr("data-bet") +
        '"]'
    ).css({
      top: jQuery(this).offset().top,
      left: jQuery(this).offset().left - 338,
    });
  });
  jQuery(".b7_winners_line > span")
    .unbind("mouseenter")
    .unbind("mouseleave")
    .hover(
      function () {
        if (jQuery(this).parent().parent().hasClass("b7_winners_loading")) {
          jQuery(
            '.b7_winner_selections[data-bet="' +
              jQuery(this).parent().attr("data-bet") +
              '"]'
          )
            .stop(true)
            .animate({ opacity: 0 }, 100, function () {
              jQuery(this).css("display", "none");
            });
        } else {
          jQuery(
            '.b7_winner_selections[data-bet="' +
              jQuery(this).parent().attr("data-bet") +
              '"]'
          )
            .stop(true)
            .css("display", "block")
            .animate({ opacity: 1 }, 100);
        }
      },
      function () {
        jQuery(
          '.b7_winner_selections[data-bet="' +
            jQuery(this).parent().attr("data-bet") +
            '"]'
        )
          .stop(true)
          .animate({ opacity: 0 }, 100, function () {
            jQuery(this).css("display", "none");
          });
      }
    );
};

var b7_winners_menu_bind = function () {
  jQuery("#b7_winners_menu > div")
    .unbind("click")
    .click(function () {
      if (jQuery(this).hasClass("disabled") || jQuery(this).hasClass("active"))
        return;
      jQuery("#b7_winners_menu > div.active").removeClass("active");
      jQuery(this).addClass("active");
      b7_winners_type = jQuery(this).attr("data-type");
      b7_winners_weeks_current = 1;
      if (b7_winners_weeks.length < 1) b7_winners_weeks_current = 0;
      b7_winners_months_current = 1;
      if (b7_winners_months.length < 1) b7_winners_months_current = 0;
      b7_winners_years_current = 1;
      if (b7_winners_years.length < 1) b7_winners_years_current = 0;
      if (b7_winners_weeks_ajax_call != null) {
        b7_winners_weeks_ajax_call.abort();
        b7_winners_weeks_ajax_call = null;
      }
      if (b7_winners_months_ajax_call != null) {
        b7_winners_months_ajax_call.abort();
        b7_winners_months_ajax_call = null;
      }
      if (b7_winners_years_ajax_call != null) {
        b7_winners_years_ajax_call.abort();
        b7_winners_years_ajax_call = null;
      }
      if (b7_winners_type == "weeks") {
        b7_winners_weeks_get(b7_winners_weeks_current);
        jQuery(".b7_winners_left_arrow")
          .unbind("click")
          .click(function () {
            if (jQuery(this).hasClass("disabled")) return;
            if (b7_winners_weeks_current < b7_winners_weeks.length) {
              b7_winners_weeks_current++;
              b7_winners_weeks_get(b7_winners_weeks_current);
            }
          });
        jQuery(".b7_winners_right_arrow")
          .unbind("click")
          .click(function () {
            if (jQuery(this).hasClass("disabled")) return;
            if (b7_winners_weeks_current > 0) {
              b7_winners_weeks_current--;
              b7_winners_weeks_get(b7_winners_weeks_current);
            }
          });
      } else if (b7_winners_type == "months") {
        b7_winners_months_get(b7_winners_months_current);
        jQuery(".b7_winners_left_arrow")
          .unbind("click")
          .click(function () {
            if (jQuery(this).hasClass("disabled")) return;
            if (b7_winners_months_current < b7_winners_months.length) {
              b7_winners_months_current++;
              b7_winners_months_get(b7_winners_months_current);
            }
          });
        jQuery(".b7_winners_right_arrow")
          .unbind("click")
          .click(function () {
            if (jQuery(this).hasClass("disabled")) return;
            if (b7_winners_months_current > 0) {
              b7_winners_months_current--;
              b7_winners_months_get(b7_winners_months_current);
            }
          });
      } else if (b7_winners_type == "years") {
        b7_winners_years_get(b7_winners_years_current);
        jQuery(".b7_winners_left_arrow")
          .unbind("click")
          .click(function () {
            if (jQuery(this).hasClass("disabled")) return;
            if (b7_winners_years_current < b7_winners_years.length) {
              b7_winners_years_current++;
              b7_winners_years_get(b7_winners_years_current);
            }
          });
        jQuery(".b7_winners_right_arrow")
          .unbind("click")
          .click(function () {
            if (jQuery(this).hasClass("disabled")) return;
            if (b7_winners_years_current > 0) {
              b7_winners_years_current--;
              b7_winners_years_get(b7_winners_years_current);
            }
          });
      }
    });
};

var b7_winners_weeks = [];
var b7_winners_weeks_current = 1;
var b7_winners_weeks_ajax_call = null;
var b7_winners_weeks_getlist = function () {
  jQuery(".b7_winners_left_arrow").addClass("disabled").unbind("click");
  jQuery(".b7_winners_right_arrow").addClass("disabled").unbind("click");
  jQuery("#b7_winners_menu > div:nth-child(1)")
    .removeClass("active")
    .addClass("disabled");
  jQuery(".b7_winners_date > div").html("-");
  if (b7_winners_weeks_ajax_call != null) {
    b7_winners_weeks_ajax_call.abort();
    b7_winners_weeks_ajax_call = null;
  }
  b7_winners_weeks = [];
  b7_winners_weeks_current = 1;
  b7_winners_weeks_ajax_call = setTimeout(function () {
    b7_winners_weeks_ajax_call = jQuery.ajax({
      url: urls.base + "bet/weeklyWinners",
      dataType: "json",
      success: function (data) {
        b7_winners_weeks = [];
        b7_winners_weeks_current = 1;
        for (var i in data) b7_winners_weeks.push(data[i].start_date);
        if (b7_winners_weeks.length > 0) {
          jQuery("#b7_winners_menu > div:nth-child(1)").removeClass("disabled");
          if (b7_winners_type == "weeks")
            jQuery("#b7_winners_menu > div:nth-child(1)").addClass("active");
        } else
          jQuery("#b7_winners_menu > div:nth-child(1)").addClass("disabled");
      },
      error: function () {
        jQuery("#b7_winners_menu > div:nth-child(1)").addClass("disabled");
      },
      complete: function () {
        b7_winners_weeks_ajax_call = null;
        if (b7_winners_weeks.length < 1) b7_winners_weeks_current = 0;
        if (b7_winners_type == "weeks") {
          b7_winners_weeks_get(b7_winners_weeks_current);
          jQuery(".b7_winners_left_arrow")
            .unbind("click")
            .click(function () {
              if (jQuery(this).hasClass("disabled")) return;
              if (b7_winners_weeks_current < b7_winners_weeks.length) {
                b7_winners_weeks_current++;
                b7_winners_weeks_get(b7_winners_weeks_current);
              }
            });
          jQuery(".b7_winners_right_arrow")
            .unbind("click")
            .click(function () {
              if (jQuery(this).hasClass("disabled")) return;
              if (b7_winners_weeks_current > 0) {
                b7_winners_weeks_current--;
                b7_winners_weeks_get(b7_winners_weeks_current);
              }
            });
        }
      },
    });
  }, 150);
};
var b7_winners_weeks_get = function (which) {
  if (b7_winners_weeks.length <= which) return;
  if (b7_winners_weeks_ajax_call != null) {
    b7_winners_weeks_ajax_call.abort();
    b7_winners_weeks_ajax_call = null;
  }
  jQuery("#b7_winners").addClass("b7_winners_loading");
  jQuery("#b7_winners_link a").attr("href", "/top_winners#weekly," + which);
  for (var i = 0; i < 5; i++) {
    jQuery(
      '.b7_winners_line[data-bet="' +
        (i + 1) +
        '"] > div:nth-child(2) > span:first-child'
    ).html("--");
    jQuery(
      '.b7_winners_line[data-bet="' +
        (i + 1) +
        '"] > div:nth-child(2) > span:last-child > span'
    ).html("-.--");
    jQuery(
      '.b7_winners_line[data-bet="' +
        (i + 1) +
        '"] > div:nth-child(3) > span:first-child > span'
    ).html("-.--");
    jQuery(
      '.b7_winners_line[data-bet="' +
        (i + 1) +
        '"] > div:nth-child(3) > span:last-child > span'
    ).html("--");
    jQuery(".b7_winners_line").each(function () {
      jQuery(this).attr("class", "b7_winners_line");
    });
  }
  jQuery(".b7_winners_date > div").html(
    which == 0
      ? getTranslation("This Week")
      : which == 1
      ? getTranslation("Last Week")
      : getTranslation("Week Beginning %weekdate%").replace(
          "%weekdate%",
          b7_winners_weeks[which].split("-")[2] +
            "/" +
            b7_winners_weeks[which].split("-")[1] +
            "/" +
            b7_winners_weeks[which].split("-")[0]
        )
  );
  if (which <= 0) {
    jQuery(".b7_winners_left_arrow").removeClass("disabled");
    jQuery(".b7_winners_right_arrow").addClass("disabled");
  } else if (which >= b7_winners_weeks.length - 1) {
    jQuery(".b7_winners_left_arrow").addClass("disabled");
    jQuery(".b7_winners_right_arrow").removeClass("disabled");
  } else {
    jQuery(".b7_winners_left_arrow").removeClass("disabled");
    jQuery(".b7_winners_right_arrow").removeClass("disabled");
  }
  b7_winners_weeks_ajax_call = setTimeout(function () {
    b7_winners_weeks_ajax_call = jQuery.ajax({
      url: urls.base + "bet/weeklyWinners/" + b7_winners_weeks[which] + "/5",
      dataType: "json",
      success: function (data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {
          html = "";
          data[i].odds = parseFloat(data[i].odds);
          data[i].stake = parseFloat(data[i].stake);
          data[i].winnings = parseFloat(data[i].winnings);
          if (b7_winners_odds_type == "fractional")
            data[i].odds = convertOddsDecimalToFractional(data[i].odds);
          else if (b7_winners_odds_type == "american")
            data[i].odds = convertOddsDecimalToAmerican(data[i].odds);
          else data[i].odds = data[i].odds.toFixed(2);
          jQuery('.b7_winners_line[data-bet="' + (i + 1) + '"]').attr(
            "class",
            "b7_winners_line p" + data[i].position
          );
          jQuery(
            '.b7_winners_line[data-bet="' +
              (i + 1) +
              '"] > div:nth-child(2) > span:first-child'
          ).html(data[i].display_name);
          jQuery(
            '.b7_winners_line[data-bet="' +
              (i + 1) +
              '"] > div:nth-child(2) > span:last-child > span'
          ).html(data[i].winnings.toFixed(2));
          jQuery(
            '.b7_winners_line[data-bet="' +
              (i + 1) +
              '"] > div:nth-child(3) > span:first-child > span'
          ).html(data[i].stake.toFixed(2));
          jQuery(
            '.b7_winners_line[data-bet="' +
              (i + 1) +
              '"] > div:nth-child(3) > span:last-child > span'
          ).html(data[i].odds);
          for (var j = 0; j < data[i].selections.length; j++) {
            data[i].selections[j].odds = parseFloat(data[i].selections[j].odds);
            if (b7_winners_odds_type == "fractional")
              data[i].selections[j].odds = convertOddsDecimalToFractional(
                data[i].selections[j].odds
              );
            else if (b7_winners_odds_type == "american")
              data[i].selections[j].odds = convertOddsDecimalToAmerican(
                data[i].selections[j].odds
              );
            else
              data[i].selections[j].odds = data[i].selections[j].odds.toFixed(
                2
              );
            html += b7_winners_selection_template
              .replace("%league_name%", data[i].selections[j].league)
              .replace("%branch_id%", data[i].selections[j].branch_id)
              .replace("%event_name%", data[i].selections[j].event_name)
              .replace(
                "%line_type%",
                data[i].selections[j].line_type_translated == ""
                  ? data[i].selections[j].line_type
                  : data[i].selections[j].line_type_translated
              )
              .replace("%chosen_bet%", data[i].selections[j].chosen_bet)
              .replace("%odds%", data[i].selections[j].odds)
              .replace(
                "%event_type%",
                (data[i].selections[j].event_type_translated == ""
                  ? data[i].selections[j].event_type
                  : data[i].selections[j].event_type_translated) !=
                  (data[i].selections[j].line_type_translated == ""
                    ? data[i].selections[j].line_type
                    : data[i].selections[j].line_type_translated)
                  ? " (" +
                      (data[i].selections[j].event_type_translated == ""
                        ? data[i].selections[j].event_type
                        : data[i].selections[j].event_type_translated) +
                      ")"
                  : ""
              );
          }
          html = interpolateTranslations(b7_winners_selections_template, "¶")
            .replace("%username%", data[i].display_name)
            .replace(
              "%winnings%",
              getTranslation("&euro; -.--").replace(
                "-.--",
                data[i].winnings.toFixed(2)
              )
            )
            .replace("%selections%", html);
          jQuery('.b7_winner_selections[data-bet="' + (i + 1) + '"]').html(
            html
          );
        }
      },
      complete: function () {
        jQuery("#b7_winners").removeClass("b7_winners_loading");
        b7_winners_weeks_ajax_call = null;
      },
    });
  }, 150);
};

var b7_winners_months = [];
var b7_winners_months_current = 1;
var b7_winners_months_ajax_call = null;
var b7_winners_months_getlist = function () {
  jQuery(".b7_winners_left_arrow").addClass("disabled").unbind("click");
  jQuery(".b7_winners_right_arrow").addClass("disabled").unbind("click");
  jQuery("#b7_winners_menu > div:nth-child(2)")
    .removeClass("active")
    .addClass("disabled");
  jQuery(".b7_winners_date > div").html("-");
  if (b7_winners_months_ajax_call != null) {
    b7_winners_months_ajax_call.abort();
    b7_winners_months_ajax_call = null;
  }
  b7_winners_months = [];
  b7_winners_months_current = 1;
  b7_winners_months_ajax_call = setTimeout(function () {
    b7_winners_months_ajax_call = jQuery.ajax({
      url: urls.base + "bet/monthlyWinners",
      dataType: "json",
      success: function (data) {
        b7_winners_months = [];
        b7_winners_months_current = 1;
        for (var i in data) b7_winners_months.push(data[i].start_date);
        if (b7_winners_months.length > 0) {
          jQuery("#b7_winners_menu > div:nth-child(2)").removeClass("disabled");
          if (b7_winners_type == "months")
            jQuery("#b7_winners_menu > div:nth-child(2)").addClass("active");
        } else
          jQuery("#b7_winners_menu > div:nth-child(2)").addClass("disabled");
      },
      error: function () {
        jQuery("#b7_winners_menu > div:nth-child(2)").addClass("disabled");
      },
      complete: function () {
        b7_winners_months_ajax_call = null;
        if (b7_winners_months.length < 1) b7_winners_months_current = 0;
        if (b7_winners_type == "months") {
          b7_winners_months_get(b7_winners_months_current);
          jQuery(".b7_winners_left_arrow")
            .unbind("click")
            .click(function () {
              if (jQuery(this).hasClass("disabled")) return;
              if (b7_winners_months_current < b7_winners_months.length) {
                b7_winners_months_current++;
                b7_winners_months_get(b7_winners_months_current);
              }
            });
          jQuery(".b7_winners_right_arrow")
            .unbind("click")
            .click(function () {
              if (jQuery(this).hasClass("disabled")) return;
              if (b7_winners_months_current > 0) {
                b7_winners_months_current--;
                b7_winners_months_get(b7_winners_months_current);
              }
            });
        }
      },
    });
  }, 150);
};
var b7_winners_months_get = function (which) {
  if (b7_winners_months.length <= which) return;
  if (b7_winners_months_ajax_call != null) {
    b7_winners_months_ajax_call.abort();
    b7_winners_months_ajax_call = null;
  }
  jQuery("#b7_winners").addClass("b7_winners_loading");
  jQuery("#b7_winners_link a").attr("href", "/top_winners#monthly," + which);
  for (var i = 0; i < 5; i++) {
    jQuery(
      '.b7_winners_line[data-bet="' +
        (i + 1) +
        '"] > div:nth-child(2) > span:first-child'
    ).html("--");
    jQuery(
      '.b7_winners_line[data-bet="' +
        (i + 1) +
        '"] > div:nth-child(2) > span:last-child > span'
    ).html("-.--");
    jQuery(
      '.b7_winners_line[data-bet="' +
        (i + 1) +
        '"] > div:nth-child(3) > span:first-child > span'
    ).html("-.--");
    jQuery(
      '.b7_winners_line[data-bet="' +
        (i + 1) +
        '"] > div:nth-child(3) > span:last-child > span'
    ).html("--");
    jQuery(".b7_winners_line").each(function () {
      jQuery(this).attr("class", "b7_winners_line");
    });
  }
  jQuery(".b7_winners_date > div").html(
    which == 0
      ? getTranslation("This Month")
      : which == 1
      ? getTranslation("Last Month")
      : getTranslation(
          b7_winners_month_list[
            parseInt(b7_winners_months[which].split("-")[1])
          ]
        ) +
        " " +
        b7_winners_months[which].split("-")[0]
  );
  if (which <= 0) {
    jQuery(".b7_winners_left_arrow").removeClass("disabled");
    jQuery(".b7_winners_right_arrow").addClass("disabled");
  } else if (which >= b7_winners_months.length - 1) {
    jQuery(".b7_winners_left_arrow").addClass("disabled");
    jQuery(".b7_winners_right_arrow").removeClass("disabled");
  } else {
    jQuery(".b7_winners_left_arrow").removeClass("disabled");
    jQuery(".b7_winners_right_arrow").removeClass("disabled");
  }
  b7_winners_months_ajax_call = setTimeout(function () {
    b7_winners_months_ajax_call = jQuery.ajax({
      url: urls.base + "bet/monthlyWinners/" + b7_winners_months[which] + "/5",
      dataType: "json",
      success: function (data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {
          html = "";
          data[i].odds = parseFloat(data[i].odds);
          data[i].stake = parseFloat(data[i].stake);
          data[i].winnings = parseFloat(data[i].winnings);
          if (b7_winners_odds_type == "fractional")
            data[i].odds = convertOddsDecimalToFractional(data[i].odds);
          else if (b7_winners_odds_type == "american")
            data[i].odds = convertOddsDecimalToAmerican(data[i].odds);
          else data[i].odds = data[i].odds.toFixed(2);
          jQuery('.b7_winners_line[data-bet="' + (i + 1) + '"]').attr(
            "class",
            "b7_winners_line p" + data[i].position
          );
          jQuery(
            '.b7_winners_line[data-bet="' +
              (i + 1) +
              '"] > div:nth-child(2) > span:first-child'
          ).html(data[i].display_name);
          jQuery(
            '.b7_winners_line[data-bet="' +
              (i + 1) +
              '"] > div:nth-child(2) > span:last-child > span'
          ).html(data[i].winnings.toFixed(2));
          jQuery(
            '.b7_winners_line[data-bet="' +
              (i + 1) +
              '"] > div:nth-child(3) > span:first-child > span'
          ).html(data[i].stake.toFixed(2));
          jQuery(
            '.b7_winners_line[data-bet="' +
              (i + 1) +
              '"] > div:nth-child(3) > span:last-child > span'
          ).html(data[i].odds);
          for (var j = 0; j < data[i].selections.length; j++) {
            data[i].selections[j].odds = parseFloat(data[i].selections[j].odds);
            if (b7_winners_odds_type == "fractional")
              data[i].selections[j].odds = convertOddsDecimalToFractional(
                data[i].selections[j].odds
              );
            else if (b7_winners_odds_type == "american")
              data[i].selections[j].odds = convertOddsDecimalToAmerican(
                data[i].selections[j].odds
              );
            else
              data[i].selections[j].odds = data[i].selections[j].odds.toFixed(
                2
              );
            html += b7_winners_selection_template
              .replace("%league_name%", data[i].selections[j].league)
              .replace("%branch_id%", data[i].selections[j].branch_id)
              .replace("%event_name%", data[i].selections[j].event_name)
              .replace(
                "%line_type%",
                data[i].selections[j].line_type_translated == ""
                  ? data[i].selections[j].line_type
                  : data[i].selections[j].line_type_translated
              )
              .replace("%chosen_bet%", data[i].selections[j].chosen_bet)
              .replace("%odds%", data[i].selections[j].odds)
              .replace(
                "%event_type%",
                (data[i].selections[j].event_type_translated == ""
                  ? data[i].selections[j].event_type
                  : data[i].selections[j].event_type_translated) !=
                  (data[i].selections[j].line_type_translated == ""
                    ? data[i].selections[j].line_type
                    : data[i].selections[j].line_type_translated)
                  ? " (" +
                      (data[i].selections[j].event_type_translated == ""
                        ? data[i].selections[j].event_type
                        : data[i].selections[j].event_type_translated) +
                      ")"
                  : ""
              );
          }
          html = interpolateTranslations(b7_winners_selections_template, "¶")
            .replace("%username%", data[i].display_name)
            .replace(
              "%winnings%",
              getTranslation("&euro; -.--").replace(
                "-.--",
                data[i].winnings.toFixed(2)
              )
            )
            .replace("%selections%", html);
          jQuery('.b7_winner_selections[data-bet="' + (i + 1) + '"]').html(
            html
          );
        }
      },
      complete: function () {
        jQuery("#b7_winners").removeClass("b7_winners_loading");
        b7_winners_months_ajax_call = null;
      },
    });
  }, 150);
};

var b7_winners_years = [];
var b7_winners_years_current = 1;
var b7_winners_years_ajax_call = null;
var b7_winners_years_getlist = function () {
  jQuery(".b7_winners_left_arrow").addClass("disabled").unbind("click");
  jQuery(".b7_winners_right_arrow").addClass("disabled").unbind("click");
  jQuery("#b7_winners_menu > div:nth-child(3)")
    .removeClass("active")
    .addClass("disabled");
  jQuery(".b7_winners_date > div").html("-");
  if (b7_winners_years_ajax_call != null) {
    b7_winners_years_ajax_call.abort();
    b7_winners_years_ajax_call = null;
  }
  b7_winners_years = [];
  b7_winners_years_current = 1;
  b7_winners_years_ajax_call = setTimeout(function () {
    b7_winners_years_ajax_call = jQuery.ajax({
      url: urls.base + "bet/yearlyWinners",
      dataType: "json",
      success: function (data) {
        b7_winners_years = [];
        b7_winners_years_current = 1;
        for (var i in data) b7_winners_years.push(data[i].start_date);
        if (b7_winners_years.length > 0) {
          jQuery("#b7_winners_menu > div:nth-child(3)").removeClass("disabled");
          if (b7_winners_type == "years")
            jQuery("#b7_winners_menu > div:nth-child(3)").addClass("active");
        } else
          jQuery("#b7_winners_menu > div:nth-child(3)").addClass("disabled");
      },
      error: function () {
        jQuery("#b7_winners_menu > div:nth-child(3)").addClass("disabled");
      },
      complete: function () {
        b7_winners_years_ajax_call = null;
        if (b7_winners_years.length < 1) b7_winners_years_current = 0;
        if (b7_winners_type == "years") {
          b7_winners_years_get(b7_winners_years_current);
          jQuery(".b7_winners_left_arrow")
            .unbind("click")
            .click(function () {
              if (jQuery(this).hasClass("disabled")) return;
              if (b7_winners_years_current < b7_winners_years.length) {
                b7_winners_years_current++;
                b7_winners_years_get(b7_winners_years_current);
              }
            });
          jQuery(".b7_winners_right_arrow")
            .unbind("click")
            .click(function () {
              if (jQuery(this).hasClass("disabled")) return;
              if (b7_winners_years_current > 0) {
                b7_winners_years_current--;
                b7_winners_years_get(b7_winners_years_current);
              }
            });
        }
      },
    });
  }, 150);
};
var b7_winners_years_get = function (which) {
  if (b7_winners_years.length <= which) return;
  if (b7_winners_years_ajax_call != null) {
    b7_winners_years_ajax_call.abort();
    b7_winners_years_ajax_call = null;
  }
  jQuery("#b7_winners").addClass("b7_winners_loading");
  jQuery("#b7_winners_link a").attr("href", "/top_winners#yearly," + which);
  for (var i = 0; i < 5; i++) {
    jQuery(
      '.b7_winners_line[data-bet="' +
        (i + 1) +
        '"] > div:nth-child(2) > span:first-child'
    ).html("--");
    jQuery(
      '.b7_winners_line[data-bet="' +
        (i + 1) +
        '"] > div:nth-child(2) > span:last-child > span'
    ).html("-.--");
    jQuery(
      '.b7_winners_line[data-bet="' +
        (i + 1) +
        '"] > div:nth-child(3) > span:first-child > span'
    ).html("-.--");
    jQuery(
      '.b7_winners_line[data-bet="' +
        (i + 1) +
        '"] > div:nth-child(3) > span:last-child > span'
    ).html("--");
    jQuery(".b7_winners_line").each(function () {
      jQuery(this).attr("class", "b7_winners_line");
    });
  }
  jQuery(".b7_winners_date > div").html(
    which == 0
      ? getTranslation("This Year")
      : which == 1
      ? getTranslation("Last Year")
      : b7_winners_years[which].split("-")[0]
  );
  if (which <= 0) {
    jQuery(".b7_winners_left_arrow").removeClass("disabled");
    jQuery(".b7_winners_right_arrow").addClass("disabled");
  } else if (which >= b7_winners_years.length - 1) {
    jQuery(".b7_winners_left_arrow").addClass("disabled");
    jQuery(".b7_winners_right_arrow").removeClass("disabled");
  } else {
    jQuery(".b7_winners_left_arrow").removeClass("disabled");
    jQuery(".b7_winners_right_arrow").removeClass("disabled");
  }
  b7_winners_years_ajax_call = setTimeout(function () {
    b7_winners_years_ajax_call = jQuery.ajax({
      url: urls.base + "bet/yearlyWinners/" + b7_winners_years[which] + "/5",
      dataType: "json",
      success: function (data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {
          html = "";
          data[i].odds = parseFloat(data[i].odds);
          data[i].stake = parseFloat(data[i].stake);
          data[i].winnings = parseFloat(data[i].winnings);
          if (b7_winners_odds_type == "fractional")
            data[i].odds = convertOddsDecimalToFractional(data[i].odds);
          else if (b7_winners_odds_type == "american")
            data[i].odds = convertOddsDecimalToAmerican(data[i].odds);
          else data[i].odds = data[i].odds.toFixed(2);
          jQuery('.b7_winners_line[data-bet="' + (i + 1) + '"]').attr(
            "class",
            "b7_winners_line p" + data[i].position
          );
          jQuery(
            '.b7_winners_line[data-bet="' +
              (i + 1) +
              '"] > div:nth-child(2) > span:first-child'
          ).html(data[i].display_name);
          jQuery(
            '.b7_winners_line[data-bet="' +
              (i + 1) +
              '"] > div:nth-child(2) > span:last-child > span'
          ).html(data[i].winnings.toFixed(2));
          jQuery(
            '.b7_winners_line[data-bet="' +
              (i + 1) +
              '"] > div:nth-child(3) > span:first-child > span'
          ).html(data[i].stake.toFixed(2));
          jQuery(
            '.b7_winners_line[data-bet="' +
              (i + 1) +
              '"] > div:nth-child(3) > span:last-child > span'
          ).html(data[i].odds);
          for (var j = 0; j < data[i].selections.length; j++) {
            data[i].selections[j].odds = parseFloat(data[i].selections[j].odds);
            if (b7_winners_odds_type == "fractional")
              data[i].selections[j].odds = convertOddsDecimalToFractional(
                data[i].selections[j].odds
              );
            else if (b7_winners_odds_type == "american")
              data[i].selections[j].odds = convertOddsDecimalToAmerican(
                data[i].selections[j].odds
              );
            else
              data[i].selections[j].odds = data[i].selections[j].odds.toFixed(
                2
              );
            html += b7_winners_selection_template
              .replace("%league_name%", data[i].selections[j].league)
              .replace("%branch_id%", data[i].selections[j].branch_id)
              .replace("%event_name%", data[i].selections[j].event_name)
              .replace(
                "%line_type%",
                data[i].selections[j].line_type_translated == ""
                  ? data[i].selections[j].line_type
                  : data[i].selections[j].line_type_translated
              )
              .replace("%chosen_bet%", data[i].selections[j].chosen_bet)
              .replace("%odds%", data[i].selections[j].odds)
              .replace(
                "%event_type%",
                (data[i].selections[j].event_type_translated == ""
                  ? data[i].selections[j].event_type
                  : data[i].selections[j].event_type_translated) !=
                  (data[i].selections[j].line_type_translated == ""
                    ? data[i].selections[j].line_type
                    : data[i].selections[j].line_type_translated)
                  ? " (" +
                      (data[i].selections[j].event_type_translated == ""
                        ? data[i].selections[j].event_type
                        : data[i].selections[j].event_type_translated) +
                      ")"
                  : ""
              );
          }
          html = interpolateTranslations(b7_winners_selections_template, "¶")
            .replace("%username%", data[i].display_name)
            .replace(
              "%winnings%",
              getTranslation("&euro; -.--").replace(
                "-.--",
                data[i].winnings.toFixed(2)
              )
            )
            .replace("%selections%", html);
          jQuery('.b7_winner_selections[data-bet="' + (i + 1) + '"]').html(
            html
          );
        }
      },
      complete: function () {
        jQuery("#b7_winners").removeClass("b7_winners_loading");
        b7_winners_years_ajax_call = null;
      },
    });
  }, 150);
};

jQuery(document).ready(function () {
  if (jQuery("#b7_winners").length == 0) {
    jQuery("#b7_winners_container").append(
      replaceAll(
        replaceAll(
          interpolateTranslations(b7_winners_template, "¶"),
          "-.--",
          "<span>=.==</span>"
        ),
        "=.==",
        "-.--"
      )
    );
  }
  if (
    jQuery("#b7_body").length > 0 &&
    jQuery(".b7_winner_selections").length == 0
  ) {
    jQuery("#b7_body").append(b7_winners_selections_holder_template);
    b7_winners_type = "weeks";
    b7_winners_weeks_getlist();
    b7_winners_months_getlist();
    b7_winners_years_getlist();
    b7_winners_lines_bind();
    b7_winners_menu_bind();
  }
});

var b7_winners_link_button_text = setInterval(function () {
  if (typeof APIUser().token == "undefined") return;
  if (APIUser().token == "" || APIUser().token == false)
    jQuery("#b7_winners_link a span").html(
      getTranslation("View the Full Ranking")
    );
  else
    jQuery("#b7_winners_link a span").html(
      getTranslation("View your Own Ranking")
    );
}, 500);
