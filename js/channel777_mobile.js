jQuery(document).ready(function() {
	//jQuery('.r_content_contener_main.contentPage').find('p:has(img)').first().css({'padding': '0', 'margin': '0'});
	jQuery('.r_content_contener_main.contentPage > h4').click(function(){
		jQuery(this).addClass('animate').toggleClass('open').next().stop(true).slideToggle(200,'linear');
		jQuery(this).find('h4').each(function(){ jQuery(this).removeClass('animate'); });
	});
	jQuery('.r_content_contener_main.contentPage > div > h4').click(function(){
		jQuery(this).addClass('animate').toggleClass('open').next().stop(true).slideToggle(200,'linear');
	});
	jQuery('.r_content_contener_main.contentPage > div > div > h4').click(function(){
		jQuery(this).addClass('animate').toggleClass('open').next().stop(true).slideToggle(200,'linear');
	});
});
