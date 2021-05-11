var refresh_captcha = function () {
  jQuery("#contact_form img.captcha").attr(
    "src",
    jQuery("#contact_form img.captcha").attr("src").split("?")[0] +
      "?" +
      Math.random()
  );
};

jQuery(document).ready(function () {
  jQuery("#contact_form img.captcha").bind("click", function () {
    refresh_captcha();
  });
  jQuery('#contact_form input[type="text"], #contact_form textarea').bind(
    "focus",
    function () {
      jQuery(this).removeClass("has_error").next().css({ opacity: 0 });
    }
  );
  jQuery('#contact_form input[type="radio"]').change(function () {
    jQuery('.contact_message_error[data-for="contact_choices"]').hide();
  });
  jQuery('#contact_form input[type="button"]').bind("click", function () {
    if (jQuery(this).hasClass("submitting")) return;
    jQuery(this).addClass("submitting").css({ opacity: 0.5, cursor: "wait" });
    jQuery("#contact_error_message").hide();
    jQuery("#contact_success_message").hide();
    jQuery("#contact_form #ajax_loader").show();
    jQuery.ajax({
      url: urls.base + "support/contact_us/",
      type: "POST",
      data: jQuery("#contact_form").serialize(),
      dataType: "jsonp",
      success: function (r) {
        if (r.result == true) {
          jQuery("#contact_success_message").show();
          jQuery("#contact_form")[0].reset();
        } else {
          if (r.errors.length == 0) {
            jQuery("#contact_error_message").show();
          } else
            for (var i in r.errors) {
              if (r.errors[i] == "department")
                jQuery(
                  '.contact_message_error[data-for="contact_choices"]'
                ).show();
              else if (r.errors[i] == "note")
                jQuery('#contact_form textarea[name="' + r.errors[i] + '"]')
                  .addClass("has_error")
                  .next()
                  .css({ opacity: 1 });
              else
                jQuery('#contact_form input[name="' + r.errors[i] + '"]')
                  .addClass("has_error")
                  .next()
                  .css({ opacity: 1 });
            }
        }
      },
      error: function () {
        jQuery("#contact_error_message").show();
      },
      complete: function () {
        jQuery('#contact_form input[type="button"]')
          .removeClass("submitting")
          .css({ opacity: 1, cursor: "pointer" });
        jQuery("#contact_form #ajax_loader").hide();
        refresh_captcha();
      },
    });
  });
});

/*
b7f.submitContactForm = function () {
  $("#b7_contact_us").addClass("sending");

  $.post(
    b7f.getURL({ alias: "base", extra: "support/contact_us?lang={lang}" }),
    $("#b7_contact_us").serialize(),
    function (response) {
      $("#b7_contact_us").removeClass("sending");
      $(
        "select.error_field, input.error_field, textarea.error_field"
      ).removeClass("error_field");
      $("#b7_contact_us span.error_field").hide();
      $("#b7_contact_us span.success_field").hide();

      if (typeof response.result == "undefined") {
        response = { result: false };
      } else if (response.result == false) {
        var found_error = false;

        for (var i = 0; i < response.errors.length; i++) {
          $(
            'select[name="' +
              response.errors[i] +
              '"], input[name="' +
              response.errors[i] +
              '"], textarea[name="' +
              response.errors[i] +
              '"]'
          ).addClass("error_field");

          if (
            $('span.error_field[data-id="' + response.errors[i] + '"]').length >
            0
          ) {
            $('span.error_field[data-id="' + response.errors[i] + '"]').show();
            found_error = true;
          }
        }

        if (found_error == false)
          $('span.error_field[data-id="global"]').show();
      } else {
        $('#b7_contact_us select[name="department"]').val("");
        $('#b7_contact_us input[name="captcha"]').val("");
        $('#b7_contact_us input[name="email"]').val("");
        $('#b7_contact_us textarea[name="note"]').val("");
        $('span.success_field[data-id="global"]').show();
      }
      $("#b7_contact_us img").click();
    },
    "jsonp"
  );

  return false;
};
*/
