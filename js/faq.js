jQuery(document).ready(function() {
	jQuery('.freeContentBlock > h4').click(function(){
		jQuery(this).addClass('animate').toggleClass('open').next().stop(true).slideToggle(200,'linear');
		jQuery(this).find('h4').each(function(){ jQuery(this).removeClass('animate'); });
	});
	jQuery('.freeContentBlock > div > h4').click(function(){
		jQuery(this).addClass('animate').toggleClass('open').next().stop(true).slideToggle(200,'linear');
	});
});
