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
