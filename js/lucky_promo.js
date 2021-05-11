var b7_lucky_promo_show_count = 50, b7_lucky_promo_show_interval = undefined;
var b7_lucky_promo_interval = setInterval(function(){
	if (jQuery("#b7_fullpage_container").length == 0) return;
	jQuery("#b7_fullpage_container").appendTo("#b7_body");
	jQuery('#content').html('<div id="b7_promo_spacer" style="height:1176px;pointer-events:none;-moz-pointer-events:none;-webkit-pointer-events:none"></div>').css('padding','0').css('margin','0');
	jQuery('#b7_footer').css('margin-top','0');
	b7_lucky_promo_show_interval = setInterval(function(){
		jQuery("#b7_fullpage_container").fadeIn(100);
		b7_lucky_promo_show_count--;
		if (b7_lucky_promo_show_count == 0) {
			clearInterval(b7_lucky_promo_show_interval);
			b7_lucky_promo_show_interval = undefined;	
		}
	},100);
	clearInterval(b7_lucky_promo_interval);
	b7_lucky_promo_interval = undefined;
},10);
var b7_lucky_spacer_interval = setInterval(function(){
	if (jQuery("#b7_fullpage_container").length == 0) return;
	jQuery('#b7_promo_spacer').css('height',jQuery('#b7_fullpage_container').outerHeight());
},250);
jQuery(window).load(function(){
	jQuery('#b7_fullpage_container').addClass('animate');
});
var b7_lucky_promo_terms = function(){
	popup_message('<iframe src="https://bfscripts.dhnet.be/promotions/welcome-lucky?lang=' + sbtech2bet777Lang(LangID) + '&raw&display&titleSkip&termsOnly" style="width:620px;height:400px;border:1px solid rgb(192,192,192)"></iframe>',getTranslation('Terms and Conditions'),false,function(){
		jQuery('#b7_overlay_message').css('width','auto');
	});
};
b7_postLogout = function() { location.reload(); };
b7_postLogin = function() { location.reload(); };
