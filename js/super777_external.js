var history_open = 0;
jQuery(document).ready(function() {
    jQuery('#history_r_container').addClass('inactive');
    var cont_temp =0, temp_interval = setInterval(function(){
        if(cont_temp < 200){
            if (typeof(UserInfo.current) != "undefined" && UserInfo.current != null) {
                jQuery('#history_r_container').removeClass('inactive');
            }
            cont_temp+=1;
        } else{
            clearInterval(temp_interval);
            temp_interval = undefined;
        }

    },500);
    jQuery('#history_r_container').die('click').live('click', function(){
        if (typeof(UserInfo.current) == "undefined" || UserInfo.current == null) {

        } else {
            if(history_open == 0){
                    whl.prototype.internalMessage('c4c6ea2a5d12aa2679069e6449a0686a*1d0a3b9e48980bfb834eb5ec08f36ead894d3d58*show_super777_history*show', '*');
                    history_open = 1;
            } else {
                    whl.prototype.internalMessage('c4c6ea2a5d12aa2679069e6449a0686a*1d0a3b9e48980bfb834eb5ec08f36ead894d3d58*show_super777_history*hide', '*');
                    history_open = 0;
            }
        }
    });

    jQuery('#tandc_container').die('click').live('click', function(){
        popup_message('<iframe src="https://code.bet777.be/pronofoot_terms_conditions?lang='+sbtech2bet777Lang(LangID)+'&raw&display&titleskip" style="width:100%;height:600px;border:1px solid rgb(192,192,192)">',getTranslation('Terms and Conditions'));
    });

    jQuery('#tips_container').die('click').live('click', function(){
        popup_message('<iframe src="https://code.bet777.be/pronofoot_tips_to_win?lang='+sbtech2bet777Lang(LangID)+'&raw&display&titleskip" style="width:100%;height:600px;border:1px solid rgb(192,192,192)">',getTranslation('Tips to win'));
    });

    jQuery('#button_ok_promo_super777').die('click').live('click', function(){
            var promoCode = jQuery('#promo_code_outer').val();
            promoCode = promoCode.trim();
            if(promoCode != '')
                whl.prototype.internalMessage('c4c6ea2a5d12aa2679069e6449a0686a*1d0a3b9e48980bfb834eb5ec08f36ead894d3d58*promo_code_super777*'+promoCode, '*');
            else
                popup_error('Please enter a valid code','Super777')

    });
});
