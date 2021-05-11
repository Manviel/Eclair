var b7_mobile_promo_show_count = 50, b7_mobile_promo_show_interval = undefined;
var b7_mobile_promo_interval = setInterval(function(){
	if (jQuery("#b7_fullpage_container").length == 0) return;
	jQuery("#b7_fullpage_container").appendTo("#b7_body");
	jQuery('#content').html('<div style="height:946px;pointer-events:none;-moz-pointer-events:none;-webkit-pointer-events:none"></div>').css('padding','0').css('margin','0');
	jQuery('#b7_footer').css('margin-top','0');
        jQuery('div.mainNavigationWrap').css('z-index','4');
	/*b7_mobile_promo_show_interval = setInterval(function(){
		jQuery("#b7_fullpage_container").fadeIn(100);
		b7_mobile_promo_show_count--;
		if (b7_mobile_promo_show_count == 0) {
			clearInterval(b7_mobile_promo_show_interval);
			b7_mobile_promo_show_interval = undefined;	
		}
	},100);*/
	clearInterval(b7_mobile_promo_interval);
	b7_mobile_promo_interval = undefined;
},10);

jQuery(document).ready(function() {
	jQuery('.bottomList > h4').unbind('click').bind('click', function(){
		jQuery(this).addClass('animate').toggleClass('open').next().stop(true).slideToggle(200,'linear',function(){
                    if(jQuery("div.r_content_contener_main.contentPage").length > 0)
                        jQuery("div.r_content_contener_main.contentPage").animate({'height': (jQuery('#b7_fullpage_container').height() - 20) + 'px'});
                });
		jQuery(this).find('h4').each(function(){ jQuery(this).removeClass('animate'); });
                
	});

	jQuery('.bottomList > div > h4').unbind('click').bind('click', function(){
		jQuery(this).addClass('animate').toggleClass('open').next().stop(true).slideToggle(200,'linear');
	});
});
jQuery(window).load(function(){
    setTimeout(function(){
        if(jQuery("div.r_content_contener_main.contentPage").length > 0){
            jQuery("div.r_content_contener_main.contentPage").css('height',(jQuery('#b7_fullpage_container').height() - 20)+'px');
        }
    },500);
        
});