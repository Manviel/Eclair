$(document).ready(function() {
    jQuery('.r_content_tab').show();
    jQuery('.r_content_tab > li:not(:last-child)').click(function() {
		b7_hashClickSkip = true;
        if (!jQuery(this).hasClass('active')) {
            jQuery(this)
                    .siblings('li')
                    .removeClass('active');
            jQuery(this)
                    .addClass('active')
                    .parent()
                    .parent()
                    .children('.r_content_contener_main').eq(jQuery(this).index())
                    .show()
                    .siblings('.r_content_contener_main')
                    .hide();
        }
    });
});