var b7_livestream_promo_show_count = 50, b7_livestream_promo_show_interval = undefined;
var b7_livestream_promo_interval = setInterval(function(){
	if (jQuery("#b7_fullpage_container").length == 0) return;
	jQuery("#b7_fullpage_container").appendTo("#b7_body");
	jQuery('#content').html('<div id="b7_promo_spacer" style="height:1176px;pointer-events:none;-moz-pointer-events:none;-webkit-pointer-events:none"></div>').css('padding','0').css('margin','0');
	jQuery('#b7_footer').css('margin-top','0');
	b7_livestream_promo_show_interval = setInterval(function(){
		b7_livestream_promo_setup();
		jQuery("#b7_fullpage_container").fadeIn(100);
		b7_livestream_promo_show_count--;
		if (b7_livestream_promo_show_count == 0) {
			clearInterval(b7_livestream_promo_show_interval);
			b7_livestream_promo_show_interval = undefined;	
		}
	},100);
	clearInterval(b7_livestream_promo_interval);
	b7_livestream_promo_interval = undefined;
},10);
var b7_lucky_spacer_interval = setInterval(function(){
	if (jQuery("#b7_fullpage_container").length == 0) return;
	jQuery('#b7_promo_spacer').css('height',jQuery('#b7_fullpage_container').outerHeight());
},250);

var b7_livestream_promo_setup = function() {
	jQuery('.b7_advert_box').each(function(){
		if (jQuery(this).children('img').outerHeight() > jQuery(this).children('div').outerHeight()) {
			jQuery(this).children('div').css({
				top : (jQuery(this).children('img').outerHeight() - jQuery(this).children('div').outerHeight()) / 2,
				opacity : 1
			});
		}
	});
	jQuery('#b7_livestream_header > div > div').unbind('click').click(function(){
		if (!jQuery(this).children('video').is(':visible')) {
			jQuery(this).children('video').addClass('show').fadeIn(250,'linear');
			jQuery(this).children('video')[0].play();
		}
	});
};