var xtremepush_available = false;
var default_permission;
var thatXP;
var debug_xp = false;
var xp_tries_queue = 0;
var origin_urls_xp = { bet: "SVI1BVn1wsVfWtZIs-rVh0WwbEXJ5fyH", casino: "OG10l213XkoJ5tRtLhNdYO1WAl0oP4uT"};
var origin_site_xp;
//Sports pages to tag
var xp_constant_tag_pages_js = {
    1: "sports_view.football",
    2: "sports_view.basketball",
    6: "sports_view.tennis",
    70: "sports_view.virtual_sports"
};
var xp_constant_tag_pages_desktop = {
    'football': "sports_view.football",
    'voetbal': "sports_view.football",
    'basketball': "sports_view.basketball",
    'basketbal': "sports_view.basketball",
    'basket': "sports_view.basketball",
    'tennis': "sports_view.tennis",
    'virtual-sports': "sports_view.virtual_sports",
    'virtuele-sporten': "sports_view.virtual_sports",
    'virtuele-sport': "sports_view.virtual_sports",
    'sports-virtuels': "sports_view.virtual_sports"
};
var xp_sport_location = String(window.location.pathname).split("/")[1];
function XPBet777(debug, origin_calling, callback_ready , initialize_after){
    if(typeof(origin_calling) == "undefined") origin_site_xp = 'bet';
    else origin_site_xp = origin_calling;
    debug_xp = debug;
    thatXP = this;
    if(typeof(initialize_after) == "undefined"){
        this.initialize_XP(debug_xp, callback_ready);
    } else {
        if(typeof(initialize_after) == "integer"){
            if(initialize_after < 50){
                this.initialize_XP(debug_xp, callback_ready);
            }
        }
    }
}
XPBet777.prototype.xtreme_push_handler = function(xtremepush_action, property, value, callback){
	if(typeof(xtremepush_available) != "undefined" && xtremepush_available == false && xp_tries_queue < 5)
		thatXP.xtreme_push_wait(xtremepush_action, property, value);
	else if(typeof(xtremepush_available) != "undefined" && xtremepush_available == true) {
            xp_tries_queue = 0;
            switch(xtremepush_action){
                case 'ask_permission':
                    if(default_permission == "default") {
                        xtremepush('push', 'prompt',{
                            allowCallback: function() {
                                default_permission = xtremepush('push', 'permission');
                                if(typeof(callback) == "function")
                                    callback({'permission':'granted'});
                            }, 
                            blockCallback: function() {
                                // user clicked block button
                                // Maybe create an object 
                                default_permission = xtremepush('push', 'permission');
                                if(typeof(callback) == "function")
                                    callback({'permission':'denied'});
                            }, 
                            dismissCallback: function() {
                                default_permission = xtremepush('push', 'permission');
                                if(typeof(callback) == "function")
                                    callback({'permission':'default'});
                            } 
                        });
                    } else {
                        if(typeof(callback) == "function")
                            callback({'permission': default_permission});
                    }
                break;
                case 'tag_sports_pages':
                    thatXP.tag_sport_pages_xtremepush(property);
                break;
                default:
                    if(debug_xp)
                        console.log("Action: " + xtremepush_action + " Property(ies): " + JSON.stringify(property) + " Values: " + JSON.stringify(value)) ;
                    switch(xtremepush_action){
                        case 'set':
                            thatXP.execute_action_xp('set', property, value);
                        break;
                        case 'impression':
                            thatXP.execute_action_xp('impression', false, value);
                        break;
                        case 'tag':
                            thatXP.execute_action_xp('tag', property , value);
                        break;
                        case 'event':
                            thatXP.execute_action_xp('event', false , value);
                        break;
                    }
                break;
            }
	} else {
            if(debug_xp)
                console.log("xtremepush not available, max retries done: " + xtremepush_action + "  " + property);
	}
		
};

XPBet777.prototype.execute_action_xp = function(action, property, value){
    if(typeof(value) == "undefined"){
        if((property instanceof Array)){
            for(var i = 0; i < property.length; i++){
                xtremepush(action, property[i]);
            }
        } else {
            if(property != false)
                xtremepush(action, property, value);
            else
                xtremepush(action, value);
        }
    } else {
        if((property instanceof Array) && (value instanceof Array)){
            if(property.length == value.length){
                for(var i = 0; i < property.length; i++){
                    xtremepush(action, property[i], value[i]);
                }
            } else
                throw "Unmatched Arrays length - XPB7";
        } else if(
            ((property instanceof Array) && !(value instanceof Array)) ||
            (!(property instanceof Array) && (value instanceof Array))
        ) {
            throw "Array vs. Variable Exception - XPB7";
        } else {
            if(property != false)
                xtremepush(action, property, value);
            else
                xtremepush(action, value);
        }
    }
};

XPBet777.prototype.initialize_XP = function(debug, callback_ready){
    if(typeof(debug) == "undefined") debug = false;
    (function(p,u,s,h,e,r,l,i,b) {
        p['XtremePushObject']=h;
        p[h]=function(){
                (p[h].q=p[h].q||[]).push(arguments)
        };
        i=u.createElement('script');
        i.async=1;
        i.src=s;
        b=u.getElementsByTagName('script')[0];
        b.parentNode.insertBefore(i,b);    
    })(window,document,'https://prod.webpu.sh/' + origin_urls_xp[origin_site_xp] + '/sdk.js','xtremepush');
    console.log(origin_site_xp);
    if(debug)
        xtremepush('debug_logs', true);
    xtremepush('ready',function(){
        console.log("XPB7 Really loaded"); 
        xtremepush_available = true;
        default_permission = xtremepush('push', 'permission');
        if(typeof(callback_ready) == "function")
            callback_ready();
    });
};

XPBet777.prototype.xtreme_push_wait = function(xtremepush_action, property, value, ms){
    xp_tries_queue += 1;
    if(typeof(ms) == "undefined") ms = 1000;
    setTimeout(function(){
        thatXP.xtreme_push_handler(xtremepush_action, property, value);
    },ms);
};

XPBet777.prototype.tag_sport_pages_xtremepush = function(platform){
    if(platform == 0){
        if(xp_constant_tag_pages_desktop.hasOwnProperty(xp_sport_location)){
            if(typeof(xtreme_push_obj) != "undefined")
                xtreme_push_obj.xtreme_push_handler('tag',xp_constant_tag_pages_desktop[xp_sport_location]);
        }
        PageMethods.getBranchFilters = (function() {
            var cached_function = PageMethods.getBranchFilters;
            return function() {
                if(arguments instanceof Object){
                    if(xp_constant_tag_pages_js.hasOwnProperty(arguments[0]))
                        thatXP.xtreme_push_handler('tag',xp_constant_tag_pages_js[arguments[0]]);
                }
                var result = cached_function.apply(this, arguments); // use .apply() to call it
                return result;
            };
        })();
    } else if(platform == 1) {
        PageMethods.GetBranchDataForMobile = (function() {
        var cached_function = PageMethods.GetBranchDataForMobile;
        return function() {
            if(arguments instanceof Object){
                if(xp_constant_tag_pages_js.hasOwnProperty(arguments[0]))
                    thatXP.xtreme_push_handler('tag',xp_constant_tag_pages_js[arguments[0]]);
            }
            var result = cached_function.apply(this, arguments); // use .apply() to call it
            return result;
        };
        })();
    }
};