AdventCalendar = {
  claimed: false,
  promo_url: "https://code.bet777.be/AdventCalendar",
  image_url: "https://media.bet777.be/public/advent_calendar/",
  prize_image_url: "https://media.bet777.be/public/advent_calendar/prizes/",

  init: function () {
    AdventCalendar.retrieveWinningPrize();
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
          });
          return;
        }
        var listItems = jQuery(".ball_holder li");
        var counter = 1;

        jQuery("#prize_name").html(data.prizes[data.day - 1].prize_name);
        jQuery("#prize_image").attr(
          "src",
          AdventCalendar.prize_image_url + data.prizes[data.day - 1].prize_image
        );
        jQuery("#sub_message").html(
          data.prizes[data.day - 1].prize_description
        );

        listItems.each(function (li) {
          if (
            (data.day == 1 && counter == 1) ||
            (data.day == 24 && counter == 3) ||
            (counter == 2 && data.day != 1 && data.day != 24)
          ) {
            jQuery(this).addClass("active_day");
            jQuery(this)
              .find(".ball")
              .attr("src", AdventCalendar.image_url + "mob_todays_ball.png");
            if (counter == 1) {
              jQuery("#ball1 .month_number").html(data.day);
              jQuery("#ball2 .month_number").html(data.day + 1);
              jQuery("#ball3 .month_number").html(data.day + 2);
            } else if (counter == 3) {
              jQuery("#ball1 .month_number").html(data.day - 2);
              jQuery("#ball2 .month_number").html(data.day - 1);
              jQuery("#ball3 .month_number").html(data.day);
            } else {
              jQuery("#ball1 .month_number").html(data.day - 1);
              jQuery("#ball2 .month_number").html(data.day);
              jQuery("#ball3 .month_number").html(data.day + 1);
            }
            return false;
          } else {
            jQuery(this).addClass("prev_day");
            jQuery(this)
              .find(".ball")
              .attr("src", AdventCalendar.image_url + "mob_prev_ball.png");
          }
          counter++;
        });
        jQuery("#loader").fadeOut(500, function () {
          jQuery(".ball").fadeIn(500);
          jQuery(".month_number").fadeIn(500);
          jQuery(".active_day").click(function () {
            if (AdventCalendar.claimed == true) return;
            AdventCalendar.claimed = true;
            var audio = document.getElementById("audioJingle");
            audio.play();
            audio.volume = 1;
            jQuery(".active_day .month_number").fadeOut(500, function () {
              jQuery(".active_day .ball").addClass("spin_active_ball");
            });
            jQuery(".ball_holder li").removeClass("clicked");
            jQuery("#prev_prize_popup").hide();
            setTimeout(function () {
              audio.pause();
              if (data.countdownPrize)
                jQuery("#advent_container").fadeOut(500, function () {
                  jQuery("#countdown_message").fadeIn(500);
                });
              else
                jQuery("#advent_container").fadeOut(500, function () {
                  jQuery("#winnings_container").fadeIn(500);
                });
            }, 2000);
          });
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
};

jQuery(window).load(function () {
  AdventCalendar.init();
});
