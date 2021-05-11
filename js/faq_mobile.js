jQuery('.contentPage > h4').each(function(){
	jQuery(this).append('<span class="b7_icon b7_icon_20 triangle_down"></span>');
}).bind('click',function(){
	if (jQuery(this).hasClass('moving')) return;
	jQuery(this).addClass('moving').toggleClass('open');
	jQuery(this).next().slideToggle(250,'linear',function(){
		jQuery(this).prev().removeClass('moving');
	});
});
