var title_img_fix_interval = setInterval(function(){
	if (jQuery("#b7_titleimg").length == 0) return;
	jQuery("#b7_titleimg").detach().insertAfter('.r_content_contener .r_content_header').css({position:'relative',top:-12});
	clearInterval(title_img_fix_interval);
	title_img_fix_interval = null;
},10);
