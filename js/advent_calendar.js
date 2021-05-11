AdventCalendar = {
  promo_url: "https://code.bet777.be/AdventCalendar",
  image_url: "https://media.bet777.be/public/advent_calendar/",
  prize_image_url: "https://media.bet777.be/public/advent_calendar/prizes/",

  init: function () {
    AdventCalendar.retrieveWinningPrize();
  },

  countdown: function () {
    jQuery
      .getScript(
        "https://css.bet777.be/desktop/Themes/casino777v3/public/advent_calendar/countdown/jquery.flipcountdown.old.js"
      )
      .done(function () {
        var CHRISTMAS = Math.round(
          new Date(Date.UTC("2016", "11", "1", "11", "0", "0", "0")) / 1000
        );

        jQuery("#countdownclock").flipcountdown({
          size: "lg",
          tick: function () {
            var nol = function (h) {
              return h > 9 ? h : "0" + h;
            };
            var range = CHRISTMAS - Math.round(new Date().getTime() / 1000),
              secday = 86400,
              sechour = 3600,
              days = parseInt(range / secday),
              hours = parseInt((range % secday) / sechour),
              min = parseInt(((range % secday) % sechour) / 60),
              sec = ((range % secday) % sechour) % 60;
            return (
              nol(days) + " " + nol(hours) + " " + nol(min) + " " + nol(sec)
            );
          },
        });
      })
      .fail(function () {
        jQuery("#loader").fadeOut(500, function () {
          jQuery("#error_message")
            .html(
              getTranslation(
                "Sorry, an error occurred. Please try again later or contact our support department."
              )
            )
            .fadeIn(500);
        });
      });
  },

  retrieveWinningPrize: function () {
    jQuery
      .ajax({
        url:
          AdventCalendar.promo_url + "/init?t=" + Math.random() + "&callback=?",
        type: "GET",
        dataType: "jsonp",
        jsonp: true,
      })
      .done(function (data) {
        if (data.error) {
          jQuery("#loader").fadeOut(500, function () {
            jQuery("#error_message").html(data.message).fadeIn(500);
            jQuery("#advent_container").css({ visibility: "visible" });
            jQuery("#advent_container").fadeIn(500);
          });
          return;
        }
        if (data.countdown == true) {
          jQuery("#loader").fadeOut(500, function () {
            jQuery("#countdown").css({ visibility: "visible" });
            jQuery("#countdown").fadeIn(500);
            jQuery("#terms").css({ visibility: "visible" });
            AdventCalendar.countdown();
          });
          return;
        }
        jQuery("#advent_container").css({ visibility: "visible" });
        jQuery("#advent_container").fadeIn(500);
        jQuery("#terms").css({ visibility: "visible" });

        var listItems = jQuery(".ball_holder li");
        var counter = 1;

        for (var x = 0; x < data.prizes.length; x++) {
          if (data.prizes[x].prize_date == data.day) {
            jQuery("#prize_name").html(data.prizes[x].prize_name);
            jQuery("#prize_image").attr(
              "src",
              AdventCalendar.prize_image_url + data.prizes[x].prize_image
            );
            jQuery("#sub_message").html(data.prizes[x].prize_description);
          } else {
            jQuery("#prev_prizes").append(
              "<div class='prev_days' id='prev_day_" +
                data.prizes[x].prize_date +
                "'></div>"
            );
            jQuery("#prev_day_" + data.prizes[x].prize_date).append(
              "<p class='prev_prize_name'>" + data.prizes[x].prize_name + "</p>"
            );
            jQuery("#prev_day_" + data.prizes[x].prize_date).append(
              "<img class='prev_prize_image' src='" +
                AdventCalendar.prize_image_url +
                data.prizes[x].prize_image +
                "'>"
            );
            jQuery("#prev_day_" + data.prizes[x].prize_date).append(
              "<p class='prev_prize_date'>0" +
                data.prizes[x].prize_date +
                ".12.16</p>"
            );
          }
        }

        listItems.each(function (li) {
          if (counter == data.day) {
            jQuery(this).addClass("active_day");
            jQuery(this)
              .find(".ball")
              .attr("src", AdventCalendar.image_url + "todays_ball.png");
            return false;
          } else {
            jQuery(this).addClass("prev_day");
            jQuery(this)
              .find(".ball")
              .attr("src", AdventCalendar.image_url + "prev_ball.png");
          }
          counter++;
        });

        jQuery("#loader").fadeOut(500, function () {
          jQuery(this).removeClass("spin_loader");

          if (jQuery(".active_day > img").length > 0) {
            jQuery(".active_day > img").fadeIn(500, function () {
              jQuery(".active_day > .month_number").fadeIn(500, function () {
                jQuery(".ball").fadeIn(500);
                jQuery(".month_number").fadeIn(500);
              });
            });
          } else {
            jQuery(".ball").fadeIn(500);
            jQuery(".month_number").fadeIn(500);
          }

          if (data.day == 0) {
            if (data.countdownPrize) {
              jQuery("#countdown_message").fadeIn(500);
              return;
            }
          }

          jQuery(".active_day .month_number").click(function () {
            if (data.countdownPrize) {
              jQuery("#countdown_message").fadeIn(500);
              return;
            }

            var audio = document.getElementById("audioJingle");
            audio.play();
            audio.volume = 1;

            jQuery(".active_day .month_number").fadeOut(500, function () {
              jQuery(".active_day .ball").addClass("spin_active_ball");
            });

            jQuery(".ball_holder li").removeClass("clicked");
            jQuery("#prev_prize_popup").hide();

            setTimeout(function () {
              AdventCalendar.fadeVolume(audio, audio.volume);
              AdventCalendar.showMessageBox();
            }, 2000);
          });

          jQuery(".prev_day .month_number").click(function () {
            var index = parseInt(jQuery(this).html()) - 1;

            if (jQuery("#prev_day_" + (index + 1)).html() == undefined) return;

            if (jQuery(".ball_holder li").hasClass("clicked")) {
              if (jQuery(this).closest("li").hasClass("clicked")) {
                jQuery(this).closest("li").removeClass("clicked");
                jQuery("#prev_prize_popup").hide();
                return;
              }
              jQuery(".ball_holder li").removeClass("clicked");
            }

            jQuery(this).closest("li").addClass("clicked");

            jQuery("#prev_prize_popup").html(
              jQuery("#prev_day_" + (index + 1)).html()
            );
            jQuery("#prev_prize_popup").css({
              left: jQuery(".ball_holder li").eq(index).position().left,
              top: jQuery(".ball_holder li").eq(index).position().top,
            });
            jQuery("#prev_prize_popup").fadeIn(600);
          });

          jQuery("#prev_prize_popup").click(function () {
            jQuery(".ball_holder li").removeClass("clicked");
            jQuery("#prev_prize_popup").hide();
          });
        });

        jQuery("#close_button").click(function () {
          jQuery(".active_day .month_number").fadeIn(500, function () {
            jQuery(".active_day .ball").removeClass("spin_active_ball");
          });
          AdventCalendar.closeMessageBox();
        });
      })
      .fail(function () {
        jQuery("#loader").fadeOut(500, function () {
          jQuery("#advent_container").css({ visibility: "visible" });
          jQuery("#advent_container").fadeIn(500);
          jQuery("#error_message")
            .html(
              getTranslation(
                "Sorry, an error occurred. Please try again later or contact our support department."
              )
            )
            .fadeIn(500);
        });
      });
  },

  showMessageBox: function () {
    jQuery("#winnings_container").css({ opacity: 0, display: "block" });
    setTimeout(function () {
      jQuery("#winnings_container")
        .css({
          top:
            (jQuery("#advent_container").outerHeight() -
              jQuery("#winnings_container").outerHeight()) /
            2,
        })
        .animate({ opacity: 1 }, 800);
    }, 100);
    //jQuery("#winnings_container").fadeIn(800);
  },

  closeMessageBox: function () {
    jQuery("#winnings_container").animate({ opacity: 0 }, 500, function () {
      jQuery("#winnings_container").css({ opacity: 1, display: "none" });
    });
  },

  fadeVolume: function (el, volume) {
    var factor = 0.05;
    var speed = 40;

    if (volume >= factor) {
      setTimeout(function () {
        volume = el.volume;
        volume -= factor;
        el.volume = volume.toFixed(2);
        AdventCalendar.fadeVolume(el, el.volume);
      }, speed);
    } else return false;
  },
};

AdventCalendar.init();

var snowInterval = undefined,
  snowCanvas = undefined,
  snowSize = { w: 0, h: 0 },
  snowParticles = [],
  snowAngle = 0;
var snow = function (mp) {
  if (typeof mp != "number") mp = 50;
  if (jQuery("#snowStyle").length == 0)
    jQuery("head").append(
      '<style type="text/css" id="snowStyle">canvas#snow { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 500000; pointer-events: none; }</style>'
    );
  if (jQuery("#snow").length > 0) {
    jQuery("#snow").fadeOut(500, function () {
      jQuery("#snow").remove();
      snowing = false;
      clearInterval(snowInterval);
      snowInterval = undefined;
    });
    return;
  }
  jQuery("body").append('<canvas id="snow" style="opacity:0"></canvas>');
  snowCanvas = document.getElementById("snow").getContext("2d");
  snowSize.w = document.getElementById("snow").width = window.innerWidth;
  snowSize.h = document.getElementById("snow").height = window.innerHeight;
  snowParticles = [];
  for (var i = 0; i < mp; i++) {
    snowParticles.push({
      x: Math.random() * snowSize.w,
      y: Math.random() * snowSize.h,
      r: Math.random() * 4 + 1,
      d: Math.random() * mp,
    });
  }
  snowInterval = setInterval(function () {
    snowDraw();
  }, 33);
  jQuery("#snow").animate({ opacity: 1 }, 500);
};
var snowDraw = function () {
  snowCanvas.clearRect(0, 0, snowSize.w, snowSize.h);
  snowCanvas.fillStyle = "rgba(255, 255, 255, 1)";
  snowCanvas.beginPath();
  for (var i = 0; i < snowParticles.length; i++) {
    var p = snowParticles[i];
    snowCanvas.moveTo(p.x, p.y);
    snowCanvas.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
  }
  snowCanvas.fill();
  snowUpdate();
};
var snowUpdate = function () {
  snowAngle += 0.01;
  for (var i = 0; i < snowParticles.length; i++) {
    var p = snowParticles[i];
    p.y += Math.cos(snowAngle + p.d) + 1 + p.r / 2;
    p.x += Math.sin(snowAngle) * 2;
    if (p.x > snowSize.w + 5 || p.x < -5 || p.y > snowSize.h) {
      if (i % 3 > 0)
        snowParticles[i] = {
          x: Math.random() * snowSize.w,
          y: -10,
          r: p.r,
          d: p.d,
        };
      else {
        if (Math.sin(snowAngle) > 0)
          snowParticles[i] = {
            x: -5,
            y: Math.random() * snowSize.h,
            r: p.r,
            d: p.d,
          };
        else
          snowParticles[i] = {
            x: snowSize.w + 5,
            y: Math.random() * snowSize.h,
            r: p.r,
            d: p.d,
          };
      }
    }
  }
};

jQuery(window).load(function () {
  if (typeof snow_timeout != "undefined") return;
  snow_timeout = setTimeout(function () {
    snow(50);
  }, 500);
});
