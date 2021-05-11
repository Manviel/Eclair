jQuery(document).ready(function() {
	jQuery('.bottomList > h4').unbind('click').bind('click', function(){
		jQuery(this).addClass('animate').toggleClass('open').next().stop(true).slideToggle(200,'linear');
		jQuery(this).find('h4').each(function(){ jQuery(this).removeClass('animate'); });
	});

	jQuery('.bottomList > div > h4').unbind('click').bind('click', function(){
		jQuery(this).addClass('animate').toggleClass('open').next().stop(true).slideToggle(200,'linear');
	});
});
