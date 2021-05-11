jQuery('#promo_termsConditions > a').click(function(){
	if (jQuery('#promo_termsConditions > a').hasClass('moving')) return;
	jQuery('#promo_termsConditions > a').addClass('moving');
	jQuery('#promo_termsConditions > div').slideToggle(250,function(){
		jQuery('#promo_termsConditions > a').removeClass('moving');
	});
	jQuery('html, body').animate({
		scrollTop: jQuery('#promo_termsConditions > a').offset().top
	},250);
});
var addthis_config = addthis_config || {};
addthis_config.pubid = 'ra-519399622abd41c9';
if (jQuery('.addthis_native_toolbox').length > 0) {
	jQuery.getScript("//s7.addthis.com/js/300/addthis_widget.js#async=1");
}
var addthis_sidebar_remover_interval = null;
if (jQuery('.addthis_native_sidebarblocker').length > 0) {
	addthis_sidebar_remover_interval = setInterval(function(){
		if (jQuery('.addthis-smartlayers:visible').length == 0) return;
		jQuery('.addthis-smartlayers:visible').each(function(){
			jQuery(this).hide();
		});
	},10);
}
jQuery('.promotion_register_button').click(function(){
    if(APIUser().token.toString().length > 10) {
        jQuery.get(urls.base + 'promotions/register/' + jQuery(this).attr('data-id'),function(){
            location.reload(/* forceGet*/ true);
        },'jsonp');
    } else {
        popup_error(jQuery(this).attr('data-not-logged'));
    }
});