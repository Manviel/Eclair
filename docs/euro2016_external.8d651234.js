parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"hNm2":[function(require,module,exports) {
"use strict";var t=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();function e(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function i(){var t=this,e=arguments.length<=0||void 0===arguments[0]?PIXI:arguments[0];if(n(this,i),void 0===e)throw new Error("Please assign a rendering engine in the constructor before using charm.js");this.renderer="",e.ParticleContainer&&e.Sprite&&(this.renderer="pixi"),this.globalTweens=[],this.easingFormulas={linear:function(t){return t},smoothstep:function(t){return t*t*(3-2*t)},smoothstepSquared:function(t){return Math.pow(t*t*(3-2*t),2)},smoothstepCubed:function(t){return Math.pow(t*t*(3-2*t),3)},acceleration:function(t){return t*t},accelerationCubed:function(t){return Math.pow(t*t,3)},deceleration:function(t){return 1-Math.pow(1-t,2)},decelerationCubed:function(t){return 1-Math.pow(1-t,3)},sine:function(t){return Math.sin(t*Math.PI/2)},sineSquared:function(t){return Math.pow(Math.sin(t*Math.PI/2),2)},sineCubed:function(t){return Math.pow(Math.sin(t*Math.PI/2),2)},inverseSine:function(t){return 1-Math.sin((1-t)*Math.PI/2)},inverseSineSquared:function(t){return 1-Math.pow(Math.sin((1-t)*Math.PI/2),2)},inverseSineCubed:function(t){return 1-Math.pow(Math.sin((1-t)*Math.PI/2),3)},spline:function(t,e,n,i,o){return.5*(2*n+(-e+i)*t+(2*e-5*n+4*i-o)*t*t+(3*n-e-3*i+o)*t*t*t)},cubicBezier:function(t,e,n,i,o){var a=t*t;return e+(3*-e+t*(3*e-e*t))*t+(3*n+t*(-6*n+3*n*t))*t+(3*i-3*i*t)*a+o*(a*t)}},this._addScaleProperties=function(e){"pixi"===t.renderer&&(!e.scaleX&&e.scale.x&&Object.defineProperty(e,"scaleX",{get:function(){return e.scale.x},set:function(t){e.scale.x=t}}),!e.scaleY&&e.scale.y&&Object.defineProperty(e,"scaleY",{get:function(){return e.scale.y},set:function(t){e.scale.y=t}}))}}return t(i,[{key:"tweenProperty",value:function(t,e,n,i,o){var a=arguments.length<=5||void 0===arguments[5]?"smoothstep":arguments[5],r=this,s=!(arguments.length<=6||void 0===arguments[6])&&arguments[6],d=arguments.length<=7||void 0===arguments[7]?0:arguments[7],l={},p=a.split(" ");return"bounce"===p[0]&&(l.startMagnitude=parseInt(p[1]),l.endMagnitude=parseInt(p[2])),l.start=function(t,e){l.startValue=JSON.parse(JSON.stringify(t)),l.endValue=JSON.parse(JSON.stringify(e)),l.playing=!0,l.totalFrames=o,l.frameCounter=0,r.globalTweens.push(l)},l.start(n,i),l.update=function(){var n=void 0;if(l.playing)if(l.frameCounter<l.totalFrames){var i=l.frameCounter/l.totalFrames;n="bounce"!==p[0]?r.easingFormulas[a](i):r.easingFormulas.spline(i,l.startMagnitude,0,1,l.endMagnitude),t[e]=l.endValue*n+l.startValue*(1-n),l.frameCounter+=1}else t[e]=l.endValue,l.end()},l.end=function(){l.playing=!1,l.onComplete&&l.onComplete(),r.globalTweens.splice(r.globalTweens.indexOf(l),1),s&&r.wait(d).then(function(){l.start(l.endValue,l.startValue)})},l.play=function(){return l.playing=!0},l.pause=function(){return l.playing=!1},l}},{key:"makeTween",value:function(t){var n=this,i={tweens:[]};t.forEach(function(t){var o=n.tweenProperty.apply(n,e(t));i.tweens.push(o)});var o=0;return i.completed=function(){(o+=1)===i.tweens.length&&(i.onComplete&&i.onComplete(),o=0)},i.tweens.forEach(function(t){t.onComplete=function(){return i.completed()}}),i.pause=function(){i.tweens.forEach(function(t){t.playing=!1})},i.play=function(){i.tweens.forEach(function(t){t.playing=!0})},i}},{key:"fadeOut",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?60:arguments[1];return this.tweenProperty(t,"alpha",t.alpha,0,e,"sine")}},{key:"fadeIn",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?60:arguments[1];return this.tweenProperty(t,"alpha",t.alpha,1,e,"sine")}},{key:"pulse",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?60:arguments[1],n=arguments.length<=2||void 0===arguments[2]?0:arguments[2];return this.tweenProperty(t,"alpha",t.alpha,n,e,"smoothstep",!0)}},{key:"slide",value:function(t,e,n){var i=arguments.length<=3||void 0===arguments[3]?60:arguments[3],o=arguments.length<=4||void 0===arguments[4]?"smoothstep":arguments[4],a=!(arguments.length<=5||void 0===arguments[5])&&arguments[5],r=arguments.length<=6||void 0===arguments[6]?0:arguments[6];return this.makeTween([[t,"x",t.x,e,i,o,a,r],[t,"y",t.y,n,i,o,a,r]])}},{key:"breathe",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?.8:arguments[1],n=arguments.length<=2||void 0===arguments[2]?.8:arguments[2],i=arguments.length<=3||void 0===arguments[3]?60:arguments[3],o=arguments.length<=4||void 0===arguments[4]||arguments[4],a=arguments.length<=5||void 0===arguments[5]?0:arguments[5];return this._addScaleProperties(t),this.makeTween([[t,"scaleX",t.scaleX,e,i,"smoothstepSquared",o,a],[t,"scaleY",t.scaleY,n,i,"smoothstepSquared",o,a]])}},{key:"scale",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?.5:arguments[1],n=arguments.length<=2||void 0===arguments[2]?.5:arguments[2],i=arguments.length<=3||void 0===arguments[3]?60:arguments[3];return this._addScaleProperties(t),this.makeTween([[t,"scaleX",t.scaleX,e,i,"smoothstep",!1],[t,"scaleY",t.scaleY,n,i,"smoothstep",!1]])}},{key:"strobe",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?1.3:arguments[1],n=arguments.length<=2||void 0===arguments[2]?10:arguments[2],i=arguments.length<=3||void 0===arguments[3]?20:arguments[3],o=arguments.length<=4||void 0===arguments[4]?10:arguments[4],a=arguments.length<=5||void 0===arguments[5]||arguments[5],r=arguments.length<=6||void 0===arguments[6]?0:arguments[6],s="bounce "+n+" "+i;return this._addScaleProperties(t),this.makeTween([[t,"scaleX",t.scaleX,e,o,s,a,r],[t,"scaleY",t.scaleY,e,o,s,a,r]])}},{key:"wobble",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?1.2:arguments[1],n=arguments.length<=2||void 0===arguments[2]?1.2:arguments[2],i=arguments.length<=3||void 0===arguments[3]?10:arguments[3],o=arguments.length<=4||void 0===arguments[4]?10:arguments[4],a=arguments.length<=5||void 0===arguments[5]?10:arguments[5],r=arguments.length<=6||void 0===arguments[6]?-10:arguments[6],s=arguments.length<=7||void 0===arguments[7]?-10:arguments[7],d=arguments.length<=8||void 0===arguments[8]?.98:arguments[8],l=this,p=arguments.length<=9||void 0===arguments[9]||arguments[9],h=arguments.length<=10||void 0===arguments[10]?0:arguments[10],u="bounce "+o+" "+a,c="bounce "+r+" "+s;this._addScaleProperties(t);var g=this.makeTween([[t,"scaleX",t.scaleX,e,i,u,p,h],[t,"scaleY",t.scaleY,n,i,c,p,h]]);return g.tweens.forEach(function(t){t.onComplete=function(){t.endValue>1&&(t.endValue*=d,t.endValue<=1&&(t.endValue=1,l.removeTween(t)))}}),g}},{key:"followCurve",value:function(t,e,n){var i=arguments.length<=3||void 0===arguments[3]?"smoothstep":arguments[3],o=this,a=!(arguments.length<=4||void 0===arguments[4])&&arguments[4],r=arguments.length<=5||void 0===arguments[5]?0:arguments[5],s={},d=i.split(" ");return"bounce"===d[0]&&(s.startMagnitude=parseInt(d[1]),s.endMagnitude=parseInt(d[2])),s.start=function(t){s.playing=!0,s.totalFrames=n,s.frameCounter=0,s.pointsArray=JSON.parse(JSON.stringify(t)),o.globalTweens.push(s)},s.start(e),s.update=function(){var e=void 0,n=void 0,a=s.pointsArray;s.playing&&(s.frameCounter<s.totalFrames?(e=s.frameCounter/s.totalFrames,n="bounce"!==d[0]?o.easingFormulas[i](e):o.easingFormulas.spline(e,s.startMagnitude,0,1,s.endMagnitude),t.x=o.easingFormulas.cubicBezier(n,a[0][0],a[1][0],a[2][0],a[3][0]),t.y=o.easingFormulas.cubicBezier(n,a[0][1],a[1][1],a[2][1],a[3][1]),s.frameCounter+=1):s.end())},s.end=function(){s.playing=!1,s.onComplete&&s.onComplete(),o.globalTweens.splice(o.globalTweens.indexOf(s),1),a&&o.wait(r).then(function(){s.pointsArray=s.pointsArray.reverse(),s.start(s.pointsArray)})},s.pause=function(){s.playing=!1},s.play=function(){s.playing=!0},s}},{key:"walkPath",value:function(t,e){var n=arguments.length<=2||void 0===arguments[2]?300:arguments[2],i=arguments.length<=3||void 0===arguments[3]?"smoothstep":arguments[3],o=!(arguments.length<=4||void 0===arguments[4])&&arguments[4],a=this,r=!(arguments.length<=5||void 0===arguments[5])&&arguments[5],s=arguments.length<=6||void 0===arguments[6]?0:arguments[6],d=JSON.parse(JSON.stringify(e)),l=n/d.length;return function e(n){var p=a.makeTween([[t,"x",d[n][0],d[n+1][0],l,i],[t,"y",d[n][1],d[n+1][1],l,i]]);return p.onComplete=function(){(n+=1)<d.length-1?a.wait(s).then(function(){p=e(n)}):o&&(r&&d.reverse(),a.wait(s).then(function(){n=0,t.x=d[0][0],t.y=d[0][1],p=e(n)}))},p}(0)}},{key:"walkCurve",value:function(t,e){var n=arguments.length<=2||void 0===arguments[2]?300:arguments[2],i=arguments.length<=3||void 0===arguments[3]?"smoothstep":arguments[3],o=!(arguments.length<=4||void 0===arguments[4])&&arguments[4],a=this,r=!(arguments.length<=5||void 0===arguments[5])&&arguments[5],s=arguments.length<=6||void 0===arguments[6]?0:arguments[6],d=n/e.length;return function n(l){var p=a.followCurve(t,e[l],d,i);return p.onComplete=function(){(l+=1)<e.length?a.wait(s).then(function(){p=n(l)}):o&&(r&&(e.reverse(),e.forEach(function(t){return t.reverse()})),a.wait(s).then(function(){l=0,t.x=e[0][0],t.y=e[0][1],p=n(l)}))},p}(0)}},{key:"wait",value:function(){var t=arguments.length<=0||void 0===arguments[0]?0:arguments[0];return new Promise(function(e,n){setTimeout(e,t)})}},{key:"removeTween",value:function(t){var e=this;t.tweens?(t.pause(),t.tweens.forEach(function(t){e.globalTweens.splice(e.globalTweens.indexOf(t),1)})):(t.pause(),this.globalTweens.splice(this.globalTweens.indexOf(t),1))}},{key:"update",value:function(){if(this.globalTweens.length>0)for(var t=this.globalTweens.length-1;t>=0;t--){var e=this.globalTweens[t];e&&e.update()}}}]),i}();function o(t,e,n,i,a){this.object=t;var r=e.split(".");this.property=r[r.length-1];for(var s=0;s<r.length-1;s++)this.object=this.object[r[s]];this.targetValue=n,this.startValue,this.active=a,this.currentFrame=0,this.endFrame=i,this.onComplete,this.onCompleteParams,this.easing=o.noEase,o.tweens.push(this)}function a(t){this.tweens=t,o.tweens.push(this)}function r(t){}function s(){return!1}o.prototype.setOnComplete=function(t,e){this.onComplete=t,this.onCompleteParams=e},o.prototype.start=function(){this.active=!0},o.prototype.initIterations=function(){""!=this.property&&(this.startValue=this.object[this.property],this.targetValue=this.targetValue-this.object[this.property])},o.prototype.update=function(){if(!this.active)return!1;if(0==this.currentFrame&&this.initIterations(),this.currentFrame++,this.currentFrame<=this.endFrame){if(""!=this.property){this.object[this.property];var t=this.easing(this.currentFrame,this.startValue,this.targetValue,this.endFrame);this.object[this.property]=t}return!1}return this.active=!1,null!=this.onComplete&&this.onComplete(this.onCompleteParams),!0},o.tweens=[],o.runTweens=function(){for(var t=0;t<o.tweens.length;t++){var e=o.tweens[t];if(e.update()){var n=o.tweens.indexOf(e);-1!=n&&o.tweens.splice(n,1),t--}}},o.noEase=function(t,e,n,i){return e+n*(t/=i)},o.outElastic=function(t,e,n,i){var o=(t/=i)*t,a=o*t;return e+n*(33*a*o+-106*o*o+126*a+-67*o+15*t)},o.inElastic=function(t,e,n,i){var o=(t/=i)*t,a=o*t;return e+n*(56*a*o+-105*o*o+60*a+-10*o)},o.inOutQuintic=function(t,e,n,i){var o=(t/=i)*t,a=o*t;return e+n*(6*a*o+-15*o*o+10*a)},o.inQuintic=function(t,e,n,i){var o=(t/=i)*t;return e+n*(o*t*o)},o.outQuintic=function(t,e,n,i){var o=(t/=i)*t,a=o*t;return e+n*(a*o+-5*o*o+10*a+-10*o+5*t)},o.inCubic=function(t,e,n,i){return e+n*((t/=i)*t*t)},o.inOutCubic=function(t,e,n,i){var o=(t/=i)*t;return e+n*(-2*(o*t)+3*o)},o.outCubic=function(t,e,n,i){var o=(t/=i)*t;return e+n*(o*t+-3*o+3*t)},a.prototype.update=function(){if(0==this.tweens.length)return!0;var t=this.tweens[0];return t.active||t.start(),t.update()&&this.tweens.splice(0,1),!1},r.prototype.start=function(){},r.prototype.update=function(){};var d=function(){return!1};PIXI.SCALE_MODES.DEFAULT=PIXI.SCALE_MODES.NEAREST,PIXI.utils._saidHello=!0;var l,p,h,u,c,g,w,f,m,x,y,v={1:["ENG","England"],2:["FRA","France"],3:["ITA","Italy"],4:["BEL","Belgium"],5:["GER","Germany"],6:["SPA","Spain"],7:["POR","Portugal"],8:["AUS","Austria"],9:["RUS","Russia"],10:["IRE","Ireland"],11:["WAL","Wales"],12:["ROM","Romania"],13:["CRO","Croatia"],14:["TUR","Turkey"],15:["SWE","Sweden"],16:["POL","Poland"],17:["SWZ","Switzerland"],18:["CZR","C. Republic"],19:["HUN","Hungary"],20:["UKR","Ukraine"],21:["NIR","N. Ireland"],22:["ICE","Iceland"],23:["SLO","Slovakia"],24:["ALB","Albania"]},I={winner:"CONGRATULATIONS!",loser:"NO LUCK THIS TIME,\nCOME BACK AGAIN TO TRY TO\n WIN ONE OF OUR GREAT PRIZES",top_winner:"YOU HAVE WON",title_text:"CHOOSE A TEAM TO START!",terms_conditions:"",play:"PLAY",init_message:""},C=[0,1,0,1,0,1,0,1,0,1],_="voucher_10_en",P="TK:Guest",b="en",S=new PIXI.Container,E=new i(PIXI),X=PIXI.loader,T=PIXI.loader.resources,M="./euro2016_penalty/",A=PIXI.autoDetectRenderer(480,720,{backgroundColor:2368548}),O=new PIXI.Container,k=new PIXI.Container,F=new PIXI.Container,W=new PIXI.Container,N="";function R(t,e){document.getElementById("message_overlay").innerHTML=t.progress.toFixed(2)+" % "}function H(){document.getElementById("overlay_game").style.display="none",u=new PIXI.Sprite(T[M+"flash.png"].texture),h=new PIXI.Sprite(T[M+"sky.jpg"].texture),p=new PIXI.Sprite(T[M+"backgroundfull.png"].texture),A.original_width=A.width,A.original_height=A.height,document.getElementById("container_shoot").appendChild(A.view),window.addEventListener("resize",q),S.transition_rate=60,p.anchor.x=0,p.anchor.y=0,p.position.x=0,p.position.y=212,u.anchor.x=0,u.anchor.y=0,k.position.x=0,k.position.y=212,F.position.x=-480,F.position.y=378,u.position.x=720,u.position.y=200,h.anchor.x=0,h.anchor.y=0,h.position.x=0,h.position.y=0,E.slide(h,-900,h.position.y,3500,"linear",!0),O.position.x=0,O.position.y=-170,V(),j(),O.addChild(h),O.addChild(p),O.addChild(F),O.addChild(k),S.addChild(O),w=new Xe(S,A,O),g=new ee(S,A,w,O),(c=new dt(S,A,g)).startScene(),B(),q()}function B(){requestAnimationFrame(B),o.runTweens(),E.update(),A.render(S)}function q(){var t,e,n=window.devicePixelRatio||1,i=(window.innerWidth>0?window.innerWidth:screen.width)*n/((window.innerHeight>0?window.innerHeight:screen.height)*n);i>=1?(A.resize(720,480),t=window.document.documentElement.clientHeight<window.document.documentElement.clientWidth/720*480?window.document.documentElement.clientHeight<480?window.document.documentElement.clientHeight:480:window.document.documentElement.clientWidth<720?window.document.documentElement.clientWidth/720*480:480,e=window.document.documentElement.clientHeight<window.document.documentElement.clientWidth/720*480?window.document.documentElement.clientHeight<480?window.document.documentElement.clientHeight/480*720:720:window.document.documentElement.clientWidth<720?window.document.documentElement.clientWidth:720,document.getElementsByTagName("canvas")[0].style.height=t+"px",document.getElementsByTagName("canvas")[0].style.width=e+"px",document.getElementsByTagName("canvas")[0].style.top=(window.document.documentElement.clientHeight<(window.document.documentElement.clientWidth<720?window.document.documentElement.clientWidth/720*480:480)?0:(window.document.documentElement.clientHeight-(window.document.documentElement.clientWidth<720?window.document.documentElement.clientWidth/720*480:480))/2)+"px",p.position.y=212,k.position.y=212,l.pause(),F.position.y=378,l=E.slide(F,F.position.x+720,F.position.y,1e3,"linear",!0),A.original_width=720,A.original_height=480):(A.resize(480,720),t=window.document.documentElement.clientHeight<window.document.documentElement.clientWidth/480*720?window.document.documentElement.clientHeight<720?window.document.documentElement.clientHeight:720:window.document.documentElement.clientWidth<480?window.document.documentElement.clientWidth/480*720:720,e=window.document.documentElement.clientHeight<window.document.documentElement.clientWidth/480*720?window.document.documentElement.clientHeight<720?window.document.documentElement.clientHeight/720*480:480:window.document.documentElement.clientWidth<480?window.document.documentElement.clientWidth:480,document.getElementsByTagName("canvas")[0].style.height=t+"px",document.getElementsByTagName("canvas")[0].style.width=e+"px",document.getElementsByTagName("canvas")[0].style.top=(window.document.documentElement.clientHeight<(window.document.documentElement.clientWidth<480?window.document.documentElement.clientWidth/480*720:720)?0:(window.document.documentElement.clientHeight-(window.document.documentElement.clientWidth<480?window.document.documentElement.clientWidth/480*720:720))/2)+"px",p.position.y=340,k.position.y=340,l.pause(),F.position.y=505,l=E.slide(F,F.position.x+480,F.position.y,1e3,"linear",!0),A.original_width=480,A.original_height=720),document.getElementById("container_shoot").style.width=e+"px",w.repositionElements(i),g.repositionElements(i),c.repositionElements(i)}function V(){for(var t,e,n,i=0;i<21;i++)(t=new PIXI.Sprite(T[M+"flash.png"].texture)).anchor.x=.5,t.anchor.y=.5,e=Math.floor(60*Math.random())+20,t.width=e,t.height=e,t.position.x=Math.floor(2160*Math.random())+20,t.position.y=Math.floor(150*Math.random())+20,n=Math.floor(8*Math.random())+6,E.pulse(t,n),k.addChild(t)}function j(){for(var t,e=0;e<10;e++)(t=new PIXI.Sprite(T[M+"page_logo.png"].texture)).anchor.x=.5,t.anchor.y=.5,t.anchor.y=.5,t.position.x=240*e,t.position.y=25,L(t,e),e%2==0&&(t.visible=!1),F.addChild(t);l=E.slide(F,F.position.x+720,F.position.y,1e3,"linear",!0)}function L(t,e){0==C[e]?setTimeout(function(){t.visible=!0,C[e]=1},2e3):setTimeout(function(){t.visible=!1,C[e]=0},2e3),requestAnimationFrame(function(){L(t,e)})}X.add(M+"backgroundfull.png").add(M+"page_logo.png").add(M+"flash.png").add(M+"sky.jpg").add(M+"container_box.png").add(M+"play.png").add(M+"logo.png").add(M+"arrow_left.png").add(M+"arrow_lefth.png").add(M+"arrow_right.png").add(M+"arrow_righth.png").add(M+"football.png").add(M+"gloves.png").add(M+"gloves2.png").add(M+"container_goal.png").add(M+"container_score.png").add(M+"football2.png").add(M+"arco.png").add(M+"arco-0-0.png").add(M+"arco-1-0.png").add(M+"arco-2-0.png").add(M+"arco-0-1.png").add(M+"arco-1-1.png").add(M+"arco-2-1.png").add(M+"player_icon.png").add(M+"empty_score.png").add(M+"good_score.png").add(M+"bad_score.png").add(M+"selected_score.png").add(M+"messages/goal_"+b+".png").add(M+"messages/goal_auto_"+b+".png").add(M+"messages/missed_"+b+".png").add(M+"messages/saved_"+b+".png").add(M+"white_mark.png").add(M+"small_logo.png").add(M+"messages/congrats_"+b+".png").add(M+"messages/try_again_"+b+".png").add(M+"red_card.png").add(M+"messages/"+_+".png").add(M+"flags/1.png").add(M+"flags/2.png").add(M+"flags/3.png").add(M+"flags/4.png").add(M+"flags/5.png").add(M+"flags/6.png").add(M+"flags/7.png").add(M+"flags/8.png").add(M+"flags/9.png").add(M+"flags/10.png").add(M+"flags/11.png").add(M+"flags/12.png").add(M+"flags/13.png").add(M+"flags/14.png").add(M+"flags/15.png").add(M+"flags/16.png").add(M+"flags/17.png").add(M+"flags/18.png").add(M+"flags/19.png").add(M+"flags/20.png").add(M+"flags/21.png").add(M+"flags/22.png").add(M+"flags/23.png").add(M+"flags/24.png").on("progress",R).load(H);var U,Y,G,J,z,Q,D,K,Z,$=0,tt=1,et=new PIXI.Graphics,nt=new PIXI.Container,it=new PIXI.Container,ot=new PIXI.Container,at=new PIXI.Container,rt=[],st=new PIXI.Text(I.init_message,{font:"italic 19px Arial",fill:"white",align:"center"});function dt(t,e,n){U=new PIXI.Sprite(T[M+"container_box.png"].texture),Y=new PIXI.Sprite(T[M+"play.png"].texture),G=new PIXI.Sprite(T[M+"logo.png"].texture),J=new PIXI.Sprite(T[M+"arrow_left.png"].texture),z=new PIXI.Sprite(T[M+"arrow_right.png"].texture),K=new PIXI.Sprite(T[M+"messages/"+_+".png"].texture),y=n,x=t,m=e,G.anchor.x=.5,G.anchor.y=.5,G.height=132,G.width=250,G.position.x=m.original_width/2,G.position.y=66;for(var i,a=0,r=0;r<24;r++)i=new PIXI.Sprite(T[M+"flags/"+(r+1)+".png"].texture),rt.push(i);U.position.x=0,U.position.y=0,U.height=420,U.width=420,nt.addChild(U),K.anchor.x=.5,K.anchor.y=.5,K.position.x=U.width/2,K.position.y=180,K.height=180,K.width=180,K.mask=et,nt.addChild(K),(Q=new PIXI.Text(I.terms_conditions,{font:"15px Arial",fill:"white",align:"center"})).anchor.x=.5,Q.anchor.y=.5,Q.position.x=U.width/2,Q.position.y=375,Q.interactive=!0,Q.buttonMode=!0,Q.defaultCursor="pointer",Q.mouseup=Q.touchend=function(){s()},nt.addChild(Q),(D=new PIXI.Text(I.title_text,{font:"italic 19px Arial",fill:"white",align:"center"})).anchor.x=.5,D.anchor.y=.5,D.position.x=U.width/2,D.position.y=480,nt.addChild(D),nt.position.x=m.original_width/2-210,nt.position.y=m.original_height/2-210,ot.position.x=115,ot.position.y=450;var d,l,p=1,h=1;for(r=0;r<12;r++)(d=new PIXI.Text(v[r+1][0],{font:"bold 16px Arial",fill:"white",align:"center"})).anchor.x=.5,d.anchor.y=.5,d.position.x=0,d.position.y=35,l=new PIXI.Container,4==r&&(h=1,p=2,a=0),8==r&&(h=1,p=3,a=0),rt[r].anchor.x=.5,rt[r].anchor.y=.5,rt[r].width=45,rt[r].height=45,rt[r].idflag=r+1,rt[r].interactive=!0,rt[r].buttonMode=!0,rt[r].defaultCursor="pointer",rt[r].mouseup=rt[r].touchend=function(){dt.prototype.clearScene(this.idflag)},rt[r].mouseover=function(){this.width=50,this.height=50},rt[r].mouseout=function(){this.width=45,this.height=45},l.addChild(rt[r]),l.addChild(d),l.position.x=65*h*a,a+=1,l.position.y=85*p,ot.addChild(l);at.position.x=420,at.position.y=450,p=1,h=1,a=0;for(r=12;r<24;r++)(d=new PIXI.Text(v[r+1][0],{font:"bold 16px Arial",fill:"white",align:"center"})).anchor.x=.5,d.anchor.y=.5,d.position.x=0,d.position.y=35,l=new PIXI.Container,16==r&&(h=1,p=2,a=0),20==r&&(h=1,p=3,a=0),rt[r].anchor.x=.5,rt[r].anchor.y=.5,rt[r].width=45,rt[r].height=45,rt[r].idflag=r+1,rt[r].interactive=!0,rt[r].buttonMode=!0,rt[r].defaultCursor="pointer",rt[r].mouseup=rt[r].touchend=function(){dt.prototype.clearScene(this.idflag)},rt[r].mouseover=function(){this.width=50,this.height=50},rt[r].mouseout=function(){this.width=45,this.height=45},l.addChild(rt[r]),l.addChild(d),l.position.x=65*h*a,a+=1,l.position.y=85*p,at.addChild(l);et.beginFill(16776960),et.drawRect(0,0,392,392),et.endFill(),ot.mask=et,at.mask=et,J.anchor.x=.5,J.anchor.y=.5,J.width=40,J.height=40,J.position.x=40,J.position.y=615,J.interactive=!0,J.buttonMode=!0,J.defaultCursor="pointer",J.mouseup=J.touchend=function(){2==tt&&(new o(ot,"position.x",ot.position.x+420,25,!0),new o(at,"position.x",at.position.x+305,25,!0),tt=1)},J.mouseover=function(){this.width=45,this.height=45,this.texture=T[M+"arrow_lefth.png"].texture},J.mouseout=function(){this.width=40,this.height=40,this.texture=T[M+"arrow_left.png"].texture},z.anchor.x=.5,z.anchor.y=.5,z.width=40,z.height=40,z.position.x=380,z.position.y=615,z.interactive=!0,z.buttonMode=!0,z.defaultCursor="pointer",z.mouseup=z.touchend=function(){1==tt&&(new o(ot,"position.x",ot.position.x-420,25,!0),new o(at,"position.x",at.position.x-305,25,!0),tt=2)},z.mouseover=function(){this.width=45,this.height=45,this.texture=T[M+"arrow_righth.png"].texture},z.mouseout=function(){this.width=40,this.height=40,this.texture=T[M+"arrow_right.png"].texture},z.mask=et,J.mask=et,D.mask=et,Q.mask=et,nt.addChild(ot),nt.addChild(at),nt.addChild(et),nt.addChild(J),nt.addChild(z),Y.position.x=0,Y.position.y=0,Y.height=38,Y.width=128,Y.interactive=!0,Y.buttonMode=!0,Y.defaultCursor="pointer",Y.mouseup=Y.touchend=function(){ct()},it.addChild(Y),(Z=new PIXI.Text(I.play,{font:"italic 19px Arial",fill:"white",align:"center"})).anchor.x=.5,Z.anchor.y=.5,Z.position.x=Y.width/2,Z.position.y=Y.height/2,st.anchor.x=.5,st.anchor.y=.5,st.position.x=U.width/2,st.position.y=60,nt.addChild(st),it.addChild(Z),it.position.x=146,it.position.y=320,it.mask=et,nt.addChild(it),x.addChild(nt),x.addChild(G)}dt.prototype.startScene=function(){$=1,E.scale(K,1,1,22),requestAnimationFrame(ut)},dt.prototype.clearScene=function(t){var e;new o(nt,"position.x",nt.position.x-m.original_width,x.transition_rate,!0).setOnComplete(function(t){t.visible=!1},nt),new o(G,"position.x",G.position.x-m.original_width,x.transition_rate,!0),rt.splice(t-1,1);do{e=Math.floor(Math.random()*rt.length)}while(0==e||e>=rt.length||void 0===rt[e]);var n=rt[e];y.startScene(t,n.idflag),$=0},dt.prototype.repositionElements=function(t){0===$?(nt.position.x=nt.position.x-m.original_width,G.position.x=G.position.x-m.original_width):(nt.position.x=m.original_width/2-210,G.position.x=m.original_width/2),t>=1?(1===$&&(nt.position.x=285),G.position.y=240,nt.position.y=m.original_height/2-210,1===$&&(G.position.x=155)):(G.position.y=120,1===$&&(nt.position.x=m.original_width/2-210),nt.position.y=220)},dt.prototype.isActive=function(){return 1===$};var lt,pt,ht=.6;function ut(){K.position.y>205?(ht*=-1,K.position.y=205):K.position.y<180&&(ht*=-1,K.position.y=180),K.position.y+=ht,requestAnimationFrame(ut)}function ct(){E.slide(K,K.position.x,K.position.y-420,x.transition_rate,"smoothstep").onComplete=function(){K.visible=!1},E.slide(it,it.position.x,it.position.y-420,x.transition_rate,"smoothstep"),E.slide(D,D.position.x,D.position.y-420,x.transition_rate,"smoothstep"),E.slide(st,st.position.x,st.position.y-420,x.transition_rate,"smoothstep"),E.slide(ot,ot.position.x,ot.position.y-420,x.transition_rate,"smoothstep"),E.slide(at,at.position.x,at.position.y-420,x.transition_rate,"smoothstep"),E.slide(J,J.position.x,J.position.y-420,x.transition_rate,"smoothstep"),E.slide(z,z.position.x,z.position.y-420,x.transition_rate,"smoothstep")}var gt,wt,ft,mt,xt,yt,vt,It,Ct,_t,Pt,bt,St,Et,Xt=0,Tt=0,Mt=0,At=0,Ot=0,kt=new PIXI.Container,Ft=new PIXI.Container,Wt=new PIXI.Container,Nt=0,Rt=[],Ht=[],Bt="",qt=0,Vt=[M+"football.png",M+"football.png"],jt=new PIXI.Sprite,Lt=new PIXI.Sprite,Ut=new PIXI.Sprite,Yt=[1,2,3,4,5,6],Gt=[],Jt=[],zt=[-1,-1,-1,-1,-1],Qt=[-1,-1,-1,-1,-1],Dt=0,Kt=0,Zt=0,$t=0,te=0;function ee(t,e,n,i){var o,a,r,s,d,l;gt=new PIXI.Sprite(T[M+"football2.png"].texture),wt=new PIXI.Sprite(T[M+"gloves.png"].texture),ft=new PIXI.Sprite(T[M+"white_mark.png"].texture),mt=new PIXI.Sprite(T[M+"arco.png"].texture),xt=new PIXI.Sprite(T[M+"arco-0-0.png"].texture),yt=new PIXI.Sprite(T[M+"arco-1-0.png"].texture),vt=new PIXI.Sprite(T[M+"arco-2-0.png"].texture),It=new PIXI.Sprite(T[M+"arco-0-1.png"].texture),Ct=new PIXI.Sprite(T[M+"arco-1-1.png"].texture),_t=new PIXI.Sprite(T[M+"arco-2-1.png"].texture),(Pt=new PIXI.Sprite(T[M+"container_goal.png"].texture)).visible=!1,Ie=new PIXI.Sprite(T[M+"container_score.png"].texture),St=new PIXI.filters.BlurFilter,Et=new PIXI.Sprite(T[M+"player_icon.png"].texture),jt=new PIXI.Sprite,Lt=new PIXI.Sprite,Ut=new PIXI.Sprite,bt=[xt,yt,vt,It,Ct,_t],x=t,m=e,lt=n,pt=i,kt.position.x=m.original_width+(m.original_width/2-240),kt.position.y=0,Pt.position.x=0,Pt.position.y=0,kt.addChild(Pt),At=250,yt.position.x=240,yt.position.y=At-84,gt.anchor.x=.5,gt.anchor.y=.5,gt.filters=[St],xt.position.x=yt.position.x-140,xt.position.y=At-84,vt.position.x=yt.position.x+140,vt.position.y=At-84,It.position.x=yt.position.x-140,It.position.y=At,Ct.position.x=yt.position.x,Ct.position.y=At,_t.position.x=yt.position.x+140,_t.position.y=At,Ie.anchor.x=.5,Ie.anchor.y=.5,Ie.position.x=200,Ie.position.y=41,Ie.width=400,Ie.height=82,Ft.position.x=m.original_width+(m.original_width/2-200),Ft.position.y=0,Ft.addChild(Ie);for(var p=0;p<zt.length;p++)(d=0!==p?new PIXI.Sprite(T[M+"empty_score.png"].texture):new PIXI.Sprite(T[M+"selected_score.png"].texture)).anchor.x=.5,d.anchor.y=.5,d.width=22,d.height=22,d.position.x=22*p+12,d.position.y=60,Gt.push(d),Ft.addChild(d),(d=new PIXI.Sprite(T[M+"empty_score.png"].texture)).anchor.x=.5,d.anchor.y=.5,d.width=22,d.height=22,d.position.x=22*p+12+278,d.position.y=60,Jt.push(d),Ft.addChild(d);x.addChild(Ft);for(p=0;p<bt.length;p++)bt[p].anchor.x=.5,bt[p].anchor.y=.5,bt[p].interactive=!0,bt[p].buttonMode=!0,bt[p].defaultCursor="pointer",bt[p].mousedown=bt[p].touchstart=function(){if(0!=this.interactive){var t;Wt.visible=!1,ge(!1);var e=-1,n=-1;if(Rt.length>0?(e=-2,n=-2):t=Yt[Math.floor(Math.random()*Yt.length)],0==Xt){if(-1!==e)if(1==(e=Rt[Dt]))do{t=Yt[Math.floor(Math.random()*Yt.length)]}while(bt[t-1].position.x==this.position.x&&bt[t-1].position.y==this.position.y);else if(0==e)do{t=Yt[Math.floor(Math.random()*Yt.length)]}while(bt[t-1].position.x!=this.position.x||bt[t-1].position.y!=this.position.y);r=gt,s=wt,this.position.x==bt[t-1].position.x&&this.position.y==bt[t-1].position.y?(l=0,Gt[Dt].texture=T[M+"bad_score.png"].texture):(l=1,Gt[Dt].texture=T[M+"good_score.png"].texture,$t+=1),zt[Dt]=l,Dt+=1,Xt=1}else{if(-1!==n)if(1==(n=Ht[Kt]))do{t=Yt[Math.floor(Math.random()*Yt.length)]}while(bt[t-1].position.x==this.position.x&&bt[t-1].position.y==this.position.y);else if(0==n)do{t=Yt[Math.floor(Math.random()*Yt.length)]}while(bt[t-1].position.x!=this.position.x||bt[t-1].position.y!=this.position.y);r=wt,s=gt,this.position.x==bt[t-1].position.x&&this.position.y==bt[t-1].position.y?(l=0,Jt[Kt].texture=T[M+"bad_score.png"].texture):(l=1,Jt[Kt].texture=T[M+"good_score.png"].texture,te+=1),Qt[Kt]=l,Kt+=1,Xt=0}requestAnimationFrame(ae),o=E.slide(r,this.position.x,this.position.y,25,"inverseSineSquared"),E.scale(gt,.7,.7,25),a=E.slide(s,bt[t-1].position.x,bt[t-1].position.y,25,"inverseSineSquared"),o.onComplete=function(){pe(gt)},a.onComplete=function(){ce(l),he(wt)}}},kt.addChild(bt[p]);wt.position.x=240,wt.position.y=At-15,wt.width=90,wt.height=90,wt.anchor.x=.5,wt.anchor.y=.5,kt.addChild(wt),gt.position.x=240,gt.position.y=At+150,Et.anchor.x=.5,Et.anchor.y=.5,Et.position.x=0,Et.position.y=0,Wt.position.x=gt.position.x,Wt.position.y=340,Wt.addChild(Et),ft.anchor.x=.5,ft.anchor.y=.5,ft.position.x=gt.position.x,ft.position.y=gt.position.y+35,kt.addChild(ft),kt.addChild(gt),kt.addChild(Wt),jt.anchor.x=.5,jt.anchor.y=.5,jt.position.x=-1e3,jt.position.y=280,kt.addChild(jt),x.addChild(kt),requestAnimationFrame(de)}var ne=new PIXI.Text("0",{font:"bold 30px Arial",fill:"#74B500",align:"center"}),ie=new PIXI.Text("0",{font:"bold 30px Arial",fill:"#74B500",align:"center"}),oe=null;ee.prototype.startScene=function(t,e){we(),Tt=1,Mt=1,(Ce=new PIXI.Text(v[t][1],{font:"bold 17px Arial",fill:"black",align:"left"})).position.x=45,Ce.position.y=9,(_e=new PIXI.Text(v[e][1],{font:"bold 17px Arial",fill:"black",align:"right"})).anchor.x=1,_e.position.x=360,_e.position.y=9,ne.position.x=170,ne.position.y=48,ie.anchor.x=.5,ie.position.x=222,ie.position.y=48;var n=PIXI.Texture.fromImage(M+"flags/"+t+".png");Lt.texture=n,Lt.anchor.x=.5,Lt.anchor.y=.5,Lt.width=32,Lt.height=32,Lt.position.x=20,Lt.position.y=18,Ft.addChild(Lt);var i=PIXI.Texture.fromImage(M+"flags/"+e+".png");Ut.texture=i,Ut.anchor.x=.5,Ut.anchor.y=.5,Ut.width=32,Ut.height=32,Ut.position.x=380,Ut.position.y=18,oe=v[t][0]+":"+v[e][0],Ft.addChild(Ut),Ft.addChild(Ce),Ft.addChild(_e),Ft.addChild(ne),Ft.addChild(ie),new o(pt,"position.x",pt.position.x-720,x.transition_rate,!0),new o(kt,"position.x",m.original_width/2-240,x.transition_rate,!0),new o(Ft,"position.x",m.original_width/2-200,x.transition_rate,!0)},ee.prototype.clearScene=function(){0==Nt&&(jt.visible=!1,Nt=1,Tt=0,new o(pt,"position.x",pt.position.x-m.original_width,x.transition_rate,!0),E.slide(kt,-600,kt.position.y,x.transition_rate,"smoothstep").setOnComplete=function(){kt.visible=!1,jt.visible=!1},lt.startScene(qt,oe))},ee.prototype.repositionElements=function(t){0==Tt?(kt.position.x=m.original_width+(m.original_width/2-240),Ft.position.x=0==Mt?m.original_width+(m.original_width/2-200):m.original_width/2-200):(kt.position.x=m.original_width/2-240,Ft.position.x=m.original_width/2-200),kt.position.y=t>=1?0:130,Ft.position.y=10},ee.prototype.isActive=function(){return 1===Tt};var ae=function t(){Ot+=.5;var e=Math.cos(Ot);St.blur=20*e,gt.rotation+=.3,requestAnimationFrame(t)};function re(){gt.rotation-=.3,St.blur=0,requestAnimationFrame(re)}var se=1;function de(){Et.position.y>30?(se*=-1,Et.position.y=30):Et.position.y<0&&(se*=-1,Et.position.y=0),Et.position.y+=se,requestAnimationFrame(de)}function le(){}function pe(t){setTimeout(function(){var e=new o(t,"position.x",240,25,!1),n=new o(t,"position.y",At+150,25,!1);e.easing=o.outCubic,n.easing=o.outCubic,e.start(),n.start(),requestAnimationFrame(re)},600)}function he(t){setTimeout(function(){var e=new o(t,"position.x",240,25,!1),n=new o(t,"position.y",At-25,25,!1);e.easing=o.outCubic,n.easing=o.outCubic,e.start(),n.start(),n.setOnComplete(function(){ue()})},600)}function ue(){0==Xt?(gt.texture=T[M+"football2.png"].texture,wt.texture=T[M+"gloves.png"].texture,Wt.position.y=340):(wt.texture=T[M+"gloves2.png"].texture,gt.texture=T[M+"football.png"].texture,Wt.position.y=95),ne.text=""+$t,ie.text=""+te,E.scale(gt,1,1,25),Wt.visible=!0,ge(!0)}function ce(t){var e;jt.texture=0==Xt?0==t?T[M+"messages/saved_"+b+".png"].texture:T[M+"messages/goal_auto_"+b+".png"].texture:0==t?T[M+"messages/missed_"+b+".png"].texture:T[M+"messages/goal_"+b+".png"].texture,E.slide(jt,Pt.width/2,jt.position.y,20,"deceleration").onComplete=function(){(e=E.breathe(jt,1.2,1.2,20,!0)).play(),setTimeout(function(){e.pause(),E.slide(jt,1e3,jt.position.y,20,"acceleration").onComplete=function(){jt.position.x=-1e3,5===Kt&&(ge(!1),ee.prototype.clearScene())}},800)}}function ge(t){for(var e=0;e<bt.length;e++)bt[e].interactive=t}function we(){var t=N+"PenaltyEURO2016/initializeGame/";jQuery.post(t,{data:P},function(t){if(t)if(void 0!==t.sprites){var e=t.sprites;for(var n in e)if(e.hasOwnProperty(n)){for(var i=JSON.parse(Base64.decode(e[n])),o=0;o<i.length;o++)"1"==n?Rt.push(i[o]):"2"==n&&Ht.push(i[o]);"t"==n&&(qt=parseInt(i))}}else console.log("Error Inside Response");else console.log("Error")},"jsonp")}var fe,me,xe,ye,ve,Ie,Ce,_e,Pe,be=0,Se=new PIXI.Container,Ee=new PIXI.Sprite;Lt=new PIXI.Sprite,Ut=new PIXI.Sprite;function Xe(t,e,n){fe=new PIXI.Sprite(T[M+"small_logo.png"].texture),me=new PIXI.Sprite(T[M+"container_box.png"].texture),xe=new PIXI.Sprite(T[M+"red_card.png"].texture),x=t,m=e,pt=n,me.position.x=0,me.position.y=0,me.height=420,me.width=420,Se.addChild(me),fe.anchor.x=.5,fe.anchor.y=.5,fe.position.x=me.width/2,fe.position.y=370,Se.addChild(fe),(Pe=new PIXI.Text(I.terms_conditions,{font:"15px Arial",fill:"white",align:"center"})).anchor.x=.5,Pe.anchor.y=.5,Pe.position.x=me.width/2,Pe.position.y=340,Pe.interactive=!0,Pe.buttonMode=!0,Pe.defaultCursor="pointer",xe.anchor.x=.5,xe.anchor.y=.5,xe.position.x=me.width/2,xe.position.y=180,xe.height=180,xe.width=180,Se.addChild(xe),Ee.anchor.x=.5,Ee.anchor.y=.5,Ee.position.x=Se.width/2,Ee.position.y=Se.height,E.fadeOut(Ee),Se.addChild(Ee),(ye=new PIXI.Text(I.loser,{font:"bold italic 16px Arial",fill:"white",align:"center"})).anchor.x=.5,ye.anchor.y=.5,ye.position.x=me.width/2,ye.position.y=315,E.fadeOut(ye),(ve=new PIXI.Text(I.top_winner,{font:"bold italic 18px Arial",fill:"white",align:"center"})).anchor.x=.5,ve.anchor.y=.5,ve.position.x=me.width/2,ve.position.y=110,E.fadeOut(ve),Se.addChild(ye),Se.addChild(ve),Se.position.x=2*m.original_width+(m.original_width/2-200),Se.position.y=90,x.addChild(Se)}function Te(t){E.fadeIn(Ee),E.scale(Ee,1,1,22),E.slide(Ee,Ee.position.x,60,40,"bounce 3 -3").onComplete=function(){E.fadeIn(ye),1!=t&&2!=t||(E.fadeIn(ve),requestAnimationFrame(Ae),E.breathe(xe,.85,.85,20,!1))}}Xe.prototype.startScene=function(t,e){be=1,0==t?(Ee.texture=T[M+"messages/try_again_"+b+".png"].texture,xe.texture=T[M+"red_card.png"].texture):1==t?(Ee.texture=T[M+"messages/congrats_"+b+".png"].texture,xe.texture=T[M+"messages/"+prs+".png"].texture,ye.text=I.winner):2==t&&(Ee.texture=T[M+"messages/congrats_"+b+".png"].texture,"0"!=prb?xe.texture=T[M+"messages/"+prb+".png"].texture:xe.texture=T[M+"messages/"+prs+".png"].texture,ye.text=I.winner),new o(pt,"position.x",pt.position.x-720,x.transition_rate,!0),new o(Se,"position.x",m.original_width/2-210,x.transition_rate,!0).setOnComplete(function(n){Te(t),Oe(e)})},Xe.prototype.clearScene=function(){},Xe.prototype.repositionElements=function(t){Se.position.x=1==be?m.original_width/2-210:2*m.original_width+(m.original_width/2-210),Se.position.y=t>=1?80:170},Xe.prototype.isActive=function(){return 1===be};var Me=.6;function Ae(){xe.position.y>215?(Me*=-1,xe.position.y=215):xe.position.y<190&&(Me*=-1,xe.position.y=190),xe.position.y+=Me,requestAnimationFrame(Ae)}function Oe(t){var e=N+"PenaltyEURO2016/endGame/";jQuery.post(e,{data:t},function(t){t&&void 0!==t.msg||alert("Error")},"jsonp")}
},{}]},{},["hNm2"], null)
//# sourceMappingURL=euro2016_external.8d651234.js.map