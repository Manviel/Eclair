jQuery(document).ready(function ($) {
    $('.pcpos_link').click(function (e) {
        e.stopPropagation();
        console.log('prepaid');
        if (isMobile.any()) {
            popup_message('<iframe style="height: 250px; width: 100%" src="' + urls.base + '/PrePaid/"></iframe>')
        } else {
            popup_window(urls.base + 'PrePaid/');
        }
    });
});