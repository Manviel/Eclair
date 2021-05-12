parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"hNm2":[function(require,module,exports) {
"use strict";var t=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();function e(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function i(){var t=this,e=arguments.length<=0||void 0===arguments[0]?PIXI:arguments[0];if(n(this,i),void 0===e)throw new Error("Please assign a rendering engine in the constructor before using charm.js");this.renderer="",e.ParticleContainer&&e.Sprite&&(this.renderer="pixi"),this.globalTweens=[],this.easingFormulas={linear:function(t){return t},smoothstep:function(t){return t*t*(3-2*t)},smoothstepSquared:function(t){return Math.pow(t*t*(3-2*t),2)},smoothstepCubed:function(t){return Math.pow(t*t*(3-2*t),3)},acceleration:function(t){return t*t},accelerationCubed:function(t){return Math.pow(t*t,3)},deceleration:function(t){return 1-Math.pow(1-t,2)},decelerationCubed:function(t){return 1-Math.pow(1-t,3)},sine:function(t){return Math.sin(t*Math.PI/2)},sineSquared:function(t){return Math.pow(Math.sin(t*Math.PI/2),2)},sineCubed:function(t){return Math.pow(Math.sin(t*Math.PI/2),2)},inverseSine:function(t){return 1-Math.sin((1-t)*Math.PI/2)},inverseSineSquared:function(t){return 1-Math.pow(Math.sin((1-t)*Math.PI/2),2)},inverseSineCubed:function(t){return 1-Math.pow(Math.sin((1-t)*Math.PI/2),3)},spline:function(t,e,n,i,o){return.5*(2*n+(-e+i)*t+(2*e-5*n+4*i-o)*t*t+(3*n-e-3*i+o)*t*t*t)},cubicBezier:function(t,e,n,i,o){var a=t*t;return e+(3*-e+t*(3*e-e*t))*t+(3*n+t*(-6*n+3*n*t))*t+(3*i-3*i*t)*a+o*(a*t)}},this._addScaleProperties=function(e){"pixi"===t.renderer&&(!e.scaleX&&e.scale.x&&Object.defineProperty(e,"scaleX",{get:function(){return e.scale.x},set:function(t){e.scale.x=t}}),!e.scaleY&&e.scale.y&&Object.defineProperty(e,"scaleY",{get:function(){return e.scale.y},set:function(t){e.scale.y=t}}))}}return t(i,[{key:"tweenProperty",value:function(t,e,n,i,o){var a=arguments.length<=5||void 0===arguments[5]?"smoothstep":arguments[5],r=this,s=!(arguments.length<=6||void 0===arguments[6])&&arguments[6],d=arguments.length<=7||void 0===arguments[7]?0:arguments[7],l={},p=a.split(" ");return"bounce"===p[0]&&(l.startMagnitude=parseInt(p[1]),l.endMagnitude=parseInt(p[2])),l.start=function(t,e){l.startValue=JSON.parse(JSON.stringify(t)),l.endValue=JSON.parse(JSON.stringify(e)),l.playing=!0,l.totalFrames=o,l.frameCounter=0,r.globalTweens.push(l)},l.start(n,i),l.update=function(){var n=void 0;if(l.playing)if(l.frameCounter<l.totalFrames){var i=l.frameCounter/l.totalFrames;n="bounce"!==p[0]?r.easingFormulas[a](i):r.easingFormulas.spline(i,l.startMagnitude,0,1,l.endMagnitude),t[e]=l.endValue*n+l.startValue*(1-n),l.frameCounter+=1}else t[e]=l.endValue,l.end()},l.end=function(){l.playing=!1,l.onComplete&&l.onComplete(),r.globalTweens.splice(r.globalTweens.indexOf(l),1),s&&r.wait(d).then(function(){l.start(l.endValue,l.startValue)})},l.play=function(){return l.playing=!0},l.pause=function(){return l.playing=!1},l}},{key:"makeTween",value:function(t){var n=this,i={tweens:[]};t.forEach(function(t){var o=n.tweenProperty.apply(n,e(t));i.tweens.push(o)});var o=0;return i.completed=function(){(o+=1)===i.tweens.length&&(i.onComplete&&i.onComplete(),o=0)},i.tweens.forEach(function(t){t.onComplete=function(){return i.completed()}}),i.pause=function(){i.tweens.forEach(function(t){t.playing=!1})},i.play=function(){i.tweens.forEach(function(t){t.playing=!0})},i}},{key:"fadeOut",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?60:arguments[1];return this.tweenProperty(t,"alpha",t.alpha,0,e,"sine")}},{key:"fadeIn",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?60:arguments[1];return this.tweenProperty(t,"alpha",t.alpha,1,e,"sine")}},{key:"pulse",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?60:arguments[1],n=arguments.length<=2||void 0===arguments[2]?0:arguments[2];return this.tweenProperty(t,"alpha",t.alpha,n,e,"smoothstep",!0)}},{key:"slide",value:function(t,e,n){var i=arguments.length<=3||void 0===arguments[3]?60:arguments[3],o=arguments.length<=4||void 0===arguments[4]?"smoothstep":arguments[4],a=!(arguments.length<=5||void 0===arguments[5])&&arguments[5],r=arguments.length<=6||void 0===arguments[6]?0:arguments[6];return this.makeTween([[t,"x",t.x,e,i,o,a,r],[t,"y",t.y,n,i,o,a,r]])}},{key:"breathe",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?.8:arguments[1],n=arguments.length<=2||void 0===arguments[2]?.8:arguments[2],i=arguments.length<=3||void 0===arguments[3]?60:arguments[3],o=arguments.length<=4||void 0===arguments[4]||arguments[4],a=arguments.length<=5||void 0===arguments[5]?0:arguments[5];return this._addScaleProperties(t),this.makeTween([[t,"scaleX",t.scaleX,e,i,"smoothstepSquared",o,a],[t,"scaleY",t.scaleY,n,i,"smoothstepSquared",o,a]])}},{key:"scale",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?.5:arguments[1],n=arguments.length<=2||void 0===arguments[2]?.5:arguments[2],i=arguments.length<=3||void 0===arguments[3]?60:arguments[3];return this._addScaleProperties(t),this.makeTween([[t,"scaleX",t.scaleX,e,i,"smoothstep",!1],[t,"scaleY",t.scaleY,n,i,"smoothstep",!1]])}},{key:"strobe",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?1.3:arguments[1],n=arguments.length<=2||void 0===arguments[2]?10:arguments[2],i=arguments.length<=3||void 0===arguments[3]?20:arguments[3],o=arguments.length<=4||void 0===arguments[4]?10:arguments[4],a=arguments.length<=5||void 0===arguments[5]||arguments[5],r=arguments.length<=6||void 0===arguments[6]?0:arguments[6],s="bounce "+n+" "+i;return this._addScaleProperties(t),this.makeTween([[t,"scaleX",t.scaleX,e,o,s,a,r],[t,"scaleY",t.scaleY,e,o,s,a,r]])}},{key:"wobble",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?1.2:arguments[1],n=arguments.length<=2||void 0===arguments[2]?1.2:arguments[2],i=arguments.length<=3||void 0===arguments[3]?10:arguments[3],o=arguments.length<=4||void 0===arguments[4]?10:arguments[4],a=arguments.length<=5||void 0===arguments[5]?10:arguments[5],r=arguments.length<=6||void 0===arguments[6]?-10:arguments[6],s=arguments.length<=7||void 0===arguments[7]?-10:arguments[7],d=arguments.length<=8||void 0===arguments[8]?.98:arguments[8],l=this,p=arguments.length<=9||void 0===arguments[9]||arguments[9],h=arguments.length<=10||void 0===arguments[10]?0:arguments[10],u="bounce "+o+" "+a,c="bounce "+r+" "+s;this._addScaleProperties(t);var g=this.makeTween([[t,"scaleX",t.scaleX,e,i,u,p,h],[t,"scaleY",t.scaleY,n,i,c,p,h]]);return g.tweens.forEach(function(t){t.onComplete=function(){t.endValue>1&&(t.endValue*=d,t.endValue<=1&&(t.endValue=1,l.removeTween(t)))}}),g}},{key:"followCurve",value:function(t,e,n){var i=arguments.length<=3||void 0===arguments[3]?"smoothstep":arguments[3],o=this,a=!(arguments.length<=4||void 0===arguments[4])&&arguments[4],r=arguments.length<=5||void 0===arguments[5]?0:arguments[5],s={},d=i.split(" ");return"bounce"===d[0]&&(s.startMagnitude=parseInt(d[1]),s.endMagnitude=parseInt(d[2])),s.start=function(t){s.playing=!0,s.totalFrames=n,s.frameCounter=0,s.pointsArray=JSON.parse(JSON.stringify(t)),o.globalTweens.push(s)},s.start(e),s.update=function(){var e=void 0,n=void 0,a=s.pointsArray;s.playing&&(s.frameCounter<s.totalFrames?(e=s.frameCounter/s.totalFrames,n="bounce"!==d[0]?o.easingFormulas[i](e):o.easingFormulas.spline(e,s.startMagnitude,0,1,s.endMagnitude),t.x=o.easingFormulas.cubicBezier(n,a[0][0],a[1][0],a[2][0],a[3][0]),t.y=o.easingFormulas.cubicBezier(n,a[0][1],a[1][1],a[2][1],a[3][1]),s.frameCounter+=1):s.end())},s.end=function(){s.playing=!1,s.onComplete&&s.onComplete(),o.globalTweens.splice(o.globalTweens.indexOf(s),1),a&&o.wait(r).then(function(){s.pointsArray=s.pointsArray.reverse(),s.start(s.pointsArray)})},s.pause=function(){s.playing=!1},s.play=function(){s.playing=!0},s}},{key:"walkPath",value:function(t,e){var n=arguments.length<=2||void 0===arguments[2]?300:arguments[2],i=arguments.length<=3||void 0===arguments[3]?"smoothstep":arguments[3],o=!(arguments.length<=4||void 0===arguments[4])&&arguments[4],a=this,r=!(arguments.length<=5||void 0===arguments[5])&&arguments[5],s=arguments.length<=6||void 0===arguments[6]?0:arguments[6],d=JSON.parse(JSON.stringify(e)),l=n/d.length;return function e(n){var p=a.makeTween([[t,"x",d[n][0],d[n+1][0],l,i],[t,"y",d[n][1],d[n+1][1],l,i]]);return p.onComplete=function(){(n+=1)<d.length-1?a.wait(s).then(function(){p=e(n)}):o&&(r&&d.reverse(),a.wait(s).then(function(){n=0,t.x=d[0][0],t.y=d[0][1],p=e(n)}))},p}(0)}},{key:"walkCurve",value:function(t,e){var n=arguments.length<=2||void 0===arguments[2]?300:arguments[2],i=arguments.length<=3||void 0===arguments[3]?"smoothstep":arguments[3],o=!(arguments.length<=4||void 0===arguments[4])&&arguments[4],a=this,r=!(arguments.length<=5||void 0===arguments[5])&&arguments[5],s=arguments.length<=6||void 0===arguments[6]?0:arguments[6],d=n/e.length;return function n(l){var p=a.followCurve(t,e[l],d,i);return p.onComplete=function(){(l+=1)<e.length?a.wait(s).then(function(){p=n(l)}):o&&(r&&(e.reverse(),e.forEach(function(t){return t.reverse()})),a.wait(s).then(function(){l=0,t.x=e[0][0],t.y=e[0][1],p=n(l)}))},p}(0)}},{key:"wait",value:function(){var t=arguments.length<=0||void 0===arguments[0]?0:arguments[0];return new Promise(function(e,n){setTimeout(e,t)})}},{key:"removeTween",value:function(t){var e=this;t.tweens?(t.pause(),t.tweens.forEach(function(t){e.globalTweens.splice(e.globalTweens.indexOf(t),1)})):(t.pause(),this.globalTweens.splice(this.globalTweens.indexOf(t),1))}},{key:"update",value:function(){if(this.globalTweens.length>0)for(var t=this.globalTweens.length-1;t>=0;t--){var e=this.globalTweens[t];e&&e.update()}}}]),i}();function o(t,e,n,i,a){this.object=t;var r=e.split(".");this.property=r[r.length-1];for(var s=0;s<r.length-1;s++)this.object=this.object[r[s]];this.targetValue=n,this.startValue,this.active=a,this.currentFrame=0,this.endFrame=i,this.onComplete,this.onCompleteParams,this.easing=o.noEase,o.tweens.push(this)}function a(t){this.tweens=t,o.tweens.push(this)}function r(t){}function s(){return!1}o.prototype.setOnComplete=function(t,e){this.onComplete=t,this.onCompleteParams=e},o.prototype.start=function(){this.active=!0},o.prototype.initIterations=function(){""!=this.property&&(this.startValue=this.object[this.property],this.targetValue=this.targetValue-this.object[this.property])},o.prototype.update=function(){if(!this.active)return!1;if(0==this.currentFrame&&this.initIterations(),this.currentFrame++,this.currentFrame<=this.endFrame){if(""!=this.property){this.object[this.property];var t=this.easing(this.currentFrame,this.startValue,this.targetValue,this.endFrame);this.object[this.property]=t}return!1}return this.active=!1,null!=this.onComplete&&this.onComplete(this.onCompleteParams),!0},o.tweens=[],o.runTweens=function(){for(var t=0;t<o.tweens.length;t++){var e=o.tweens[t];if(e.update()){var n=o.tweens.indexOf(e);-1!=n&&o.tweens.splice(n,1),t--}}},o.noEase=function(t,e,n,i){return e+n*(t/=i)},o.outElastic=function(t,e,n,i){var o=(t/=i)*t,a=o*t;return e+n*(33*a*o+-106*o*o+126*a+-67*o+15*t)},o.inElastic=function(t,e,n,i){var o=(t/=i)*t,a=o*t;return e+n*(56*a*o+-105*o*o+60*a+-10*o)},o.inOutQuintic=function(t,e,n,i){var o=(t/=i)*t,a=o*t;return e+n*(6*a*o+-15*o*o+10*a)},o.inQuintic=function(t,e,n,i){var o=(t/=i)*t;return e+n*(o*t*o)},o.outQuintic=function(t,e,n,i){var o=(t/=i)*t,a=o*t;return e+n*(a*o+-5*o*o+10*a+-10*o+5*t)},o.inCubic=function(t,e,n,i){return e+n*((t/=i)*t*t)},o.inOutCubic=function(t,e,n,i){var o=(t/=i)*t;return e+n*(-2*(o*t)+3*o)},o.outCubic=function(t,e,n,i){var o=(t/=i)*t;return e+n*(o*t+-3*o+3*t)},a.prototype.update=function(){if(0==this.tweens.length)return!0;var t=this.tweens[0];return t.active||t.start(),t.update()&&this.tweens.splice(0,1),!1},r.prototype.start=function(){},r.prototype.update=function(){};var d=function(){return!1};PIXI.SCALE_MODES.DEFAULT=PIXI.SCALE_MODES.NEAREST,PIXI.utils._saidHello=!0;var l,p,h,u,c,g,w,f,m,x,y={1:["ENG","England"],2:["FRA","France"],3:["ITA","Italy"],4:["BEL","Belgium"],5:["GER","Germany"],6:["SPA","Spain"],7:["POR","Portugal"],8:["AUS","Austria"],9:["RUS","Russia"],10:["IRE","Ireland"],11:["WAL","Wales"],12:["ROM","Romania"],13:["CRO","Croatia"],14:["TUR","Turkey"],15:["SWE","Sweden"],16:["POL","Poland"],17:["SWZ","Switzerland"],18:["CZR","C. Republic"],19:["HUN","Hungary"],20:["UKR","Ukraine"],21:["NIR","N. Ireland"],22:["ICE","Iceland"],23:["SLO","Slovakia"],24:["ALB","Albania"]},v={winner:"CONGRATULATIONS!",loser:"NO LUCK THIS TIME,\nCOME BACK AGAIN TO TRY TO\n WIN ONE OF OUR GREAT PRIZES",top_winner:"YOU HAVE WON",title_text:"CHOOSE A TEAM TO START!",terms_conditions:"",play:"PLAY",init_message:""},I=[0,1,0,1,0,1,0,1,0,1],C="10_cashback_en",_="TK:Guest",P="en",b=new PIXI.Container,S=new i(PIXI),E=PIXI.loader,X=PIXI.loader.resources,T="./euro2016_penalty/",M=PIXI.autoDetectRenderer(480,720,{backgroundColor:2368548}),A=new PIXI.Container,O=new PIXI.Container,k=new PIXI.Container,F=new PIXI.Container,W="";function N(t,e){document.getElementById("message_overlay").innerHTML=t.progress.toFixed(2)+" % "}function R(){document.getElementById("overlay_game").style.display="none",c=new PIXI.Sprite(X[T+"flash.png"].texture),u=new PIXI.Sprite(X[T+"sky.jpg"].texture),h=new PIXI.Sprite(X[T+"lights.png"].texture),p=new PIXI.Sprite(X[T+"backgroundfull.png"].texture),M.original_width=M.width,M.original_height=M.height,document.getElementById("container_shoot").appendChild(M.view),window.addEventListener("resize",B),b.transition_rate=60,p.anchor.x=0,p.anchor.y=0,p.position.x=0,p.position.y=212,c.anchor.x=0,c.anchor.y=0,O.position.x=0,O.position.y=212,k.position.x=-480,k.position.y=378,c.position.x=720,c.position.y=200,h.anchor.x=0,h.anchor.y=0,h.position.x=0,h.position.y=47,u.anchor.x=0,u.anchor.y=0,u.position.x=0,u.position.y=0,S.slide(u,-900,u.position.y,3500,"linear",!0),A.position.x=0,A.position.y=-170,q(),V(),A.addChild(u),A.addChild(h),A.addChild(p),A.addChild(k),A.addChild(O),b.addChild(A),f=new Te(b,M,A),w=new $t(b,M,f,A),(g=new st(b,M,w)).startScene(),H(),B()}function H(){requestAnimationFrame(H),o.runTweens(),S.update(),M.render(b)}function B(){var t,e,n=window.devicePixelRatio||1,i=(window.innerWidth>0?window.innerWidth:screen.width)*n/((window.innerHeight>0?window.innerHeight:screen.height)*n);i>=1?(M.resize(720,480),t=window.document.documentElement.clientHeight<window.document.documentElement.clientWidth/720*480?window.document.documentElement.clientHeight<480?window.document.documentElement.clientHeight:480:window.document.documentElement.clientWidth<720?window.document.documentElement.clientWidth/720*480:480,e=window.document.documentElement.clientHeight<window.document.documentElement.clientWidth/720*480?window.document.documentElement.clientHeight<480?window.document.documentElement.clientHeight/480*720:720:window.document.documentElement.clientWidth<720?window.document.documentElement.clientWidth:720,document.getElementsByTagName("canvas")[0].style.height=t+"px",document.getElementsByTagName("canvas")[0].style.width=e+"px",document.getElementsByTagName("canvas")[0].style.top=(window.document.documentElement.clientHeight<(window.document.documentElement.clientWidth<720?window.document.documentElement.clientWidth/720*480:480)?0:(window.document.documentElement.clientHeight-(window.document.documentElement.clientWidth<720?window.document.documentElement.clientWidth/720*480:480))/2)+"px",p.position.y=212,h.position.y=47,h.position.x=0,O.position.y=212,l.pause(),k.position.y=378,l=S.slide(k,k.position.x+720,k.position.y,1e3,"linear",!0),M.original_width=720,M.original_height=480):(M.resize(480,720),t=window.document.documentElement.clientHeight<window.document.documentElement.clientWidth/480*720?window.document.documentElement.clientHeight<720?window.document.documentElement.clientHeight:720:window.document.documentElement.clientWidth<480?window.document.documentElement.clientWidth/480*720:720,e=window.document.documentElement.clientHeight<window.document.documentElement.clientWidth/480*720?window.document.documentElement.clientHeight<720?window.document.documentElement.clientHeight/720*480:480:window.document.documentElement.clientWidth<480?window.document.documentElement.clientWidth:480,document.getElementsByTagName("canvas")[0].style.height=t+"px",document.getElementsByTagName("canvas")[0].style.width=e+"px",document.getElementsByTagName("canvas")[0].style.top=(window.document.documentElement.clientHeight<(window.document.documentElement.clientWidth<480?window.document.documentElement.clientWidth/480*720:720)?0:(window.document.documentElement.clientHeight-(window.document.documentElement.clientWidth<480?window.document.documentElement.clientWidth/480*720:720))/2)+"px",p.position.y=340,h.position.y=180,h.position.x=-95,O.position.y=340,l.pause(),k.position.y=505,l=S.slide(k,k.position.x+480,k.position.y,1e3,"linear",!0),M.original_width=480,M.original_height=720),document.getElementById("container_shoot").style.width=e+"px",f.repositionElements(i),w.repositionElements(i),g.repositionElements(i)}function q(){for(var t,e,n,i=0;i<21;i++)(t=new PIXI.Sprite(X[T+"flash.png"].texture)).anchor.x=.5,t.anchor.y=.5,e=Math.floor(60*Math.random())+20,t.width=e,t.height=e,t.position.x=Math.floor(2160*Math.random())+20,t.position.y=Math.floor(150*Math.random())+20,n=Math.floor(8*Math.random())+6,S.pulse(t,n),O.addChild(t)}function V(){for(var t,e=0;e<10;e++)(t=new PIXI.Sprite(X[T+"page_logo.png"].texture)).anchor.x=.5,t.anchor.y=.5,t.anchor.y=.5,t.position.x=240*e,t.position.y=25,j(t,e),e%2==0&&(t.visible=!1),k.addChild(t);l=S.slide(k,k.position.x+720,k.position.y,1e3,"linear",!0)}function j(t,e){0==I[e]?setTimeout(function(){t.visible=!0,I[e]=1},2e3):setTimeout(function(){t.visible=!1,I[e]=0},2e3),requestAnimationFrame(function(){j(t,e)})}E.add(T+"backgroundfull.png").add(T+"page_logo.png").add(T+"lights.png").add(T+"flash.png").add(T+"sky.jpg").add(T+"container_box.png").add(T+"play.png").add(T+"logo.png").add(T+"arrow_left.png").add(T+"arrow_lefth.png").add(T+"arrow_right.png").add(T+"arrow_righth.png").add(T+"football.png").add(T+"gloves.png").add(T+"gloves2.png").add(T+"container_goal.png").add(T+"container_score.png").add(T+"football2.png").add(T+"arco.png").add(T+"arco-0-0.png").add(T+"arco-1-0.png").add(T+"arco-2-0.png").add(T+"arco-0-1.png").add(T+"arco-1-1.png").add(T+"arco-2-1.png").add(T+"player_icon.png").add(T+"empty_score.png").add(T+"good_score.png").add(T+"bad_score.png").add(T+"selected_score.png").add(T+"messages/goal_"+P+".png").add(T+"messages/goal_auto_"+P+".png").add(T+"messages/missed_"+P+".png").add(T+"messages/saved_"+P+".png").add(T+"white_mark.png").add(T+"small_logo.png").add(T+"messages/congrats_"+P+".png").add(T+"messages/try_again_"+P+".png").add(T+"red_card.png").add(T+"messages/"+C+".png").add(T+"flags/1.png").add(T+"flags/2.png").add(T+"flags/3.png").add(T+"flags/4.png").add(T+"flags/5.png").add(T+"flags/6.png").add(T+"flags/7.png").add(T+"flags/8.png").add(T+"flags/9.png").add(T+"flags/10.png").add(T+"flags/11.png").add(T+"flags/12.png").add(T+"flags/13.png").add(T+"flags/14.png").add(T+"flags/15.png").add(T+"flags/16.png").add(T+"flags/17.png").add(T+"flags/18.png").add(T+"flags/19.png").add(T+"flags/20.png").add(T+"flags/21.png").add(T+"flags/22.png").add(T+"flags/23.png").add(T+"flags/24.png").on("progress",N).load(R);var L,U,Y,G,J,z,Q,D,K,Z=0,$=1,tt=new PIXI.Graphics,et=new PIXI.Container,nt=new PIXI.Container,it=new PIXI.Container,ot=new PIXI.Container,at=[],rt=new PIXI.Text(v.init_message,{font:"italic 19px Arial",fill:"white",align:"center"});function st(t,e,n){L=new PIXI.Sprite(X[T+"container_box.png"].texture),U=new PIXI.Sprite(X[T+"play.png"].texture),Y=new PIXI.Sprite(X[T+"logo.png"].texture),G=new PIXI.Sprite(X[T+"arrow_left.png"].texture),J=new PIXI.Sprite(X[T+"arrow_right.png"].texture),D=new PIXI.Sprite(X[T+"messages/"+C+".png"].texture),x=n,re=t,ae=e,Y.anchor.x=.5,Y.anchor.y=.5,Y.height=132,Y.width=250,Y.position.x=ae.original_width/2,Y.position.y=66;for(var i,a=0,r=0;r<24;r++)i=new PIXI.Sprite(X[T+"flags/"+(r+1)+".png"].texture),at.push(i);L.position.x=0,L.position.y=0,L.height=420,L.width=420,et.addChild(L),D.anchor.x=.5,D.anchor.y=.5,D.position.x=L.width/2,D.position.y=180,D.height=180,D.width=180,D.mask=tt,et.addChild(D),(z=new PIXI.Text(v.terms_conditions,{font:"15px Arial",fill:"white",align:"center"})).anchor.x=.5,z.anchor.y=.5,z.position.x=L.width/2,z.position.y=375,z.interactive=!0,z.buttonMode=!0,z.defaultCursor="pointer",z.mouseup=z.touchend=function(){s()},et.addChild(z),(Q=new PIXI.Text(v.title_text,{font:"italic 19px Arial",fill:"white",align:"center"})).anchor.x=.5,Q.anchor.y=.5,Q.position.x=L.width/2,Q.position.y=480,et.addChild(Q),et.position.x=ae.original_width/2-210,et.position.y=ae.original_height/2-210,it.position.x=115,it.position.y=450;var d,l,p=1,h=1;for(r=0;r<12;r++)(d=new PIXI.Text(y[r+1][0],{font:"bold 16px Arial",fill:"white",align:"center"})).anchor.x=.5,d.anchor.y=.5,d.position.x=0,d.position.y=35,l=new PIXI.Container,4==r&&(h=1,p=2,a=0),8==r&&(h=1,p=3,a=0),at[r].anchor.x=.5,at[r].anchor.y=.5,at[r].width=45,at[r].height=45,at[r].idflag=r+1,at[r].interactive=!0,at[r].buttonMode=!0,at[r].defaultCursor="pointer",at[r].mouseup=at[r].touchend=function(){st.prototype.clearScene(this.idflag)},at[r].mouseover=function(){this.width=50,this.height=50},at[r].mouseout=function(){this.width=45,this.height=45},l.addChild(at[r]),l.addChild(d),l.position.x=65*h*a,a+=1,l.position.y=85*p,it.addChild(l);ot.position.x=420,ot.position.y=450,p=1,h=1,a=0;for(r=12;r<24;r++)(d=new PIXI.Text(y[r+1][0],{font:"bold 16px Arial",fill:"white",align:"center"})).anchor.x=.5,d.anchor.y=.5,d.position.x=0,d.position.y=35,l=new PIXI.Container,16==r&&(h=1,p=2,a=0),20==r&&(h=1,p=3,a=0),at[r].anchor.x=.5,at[r].anchor.y=.5,at[r].width=45,at[r].height=45,at[r].idflag=r+1,at[r].interactive=!0,at[r].buttonMode=!0,at[r].defaultCursor="pointer",at[r].mouseup=at[r].touchend=function(){st.prototype.clearScene(this.idflag)},at[r].mouseover=function(){this.width=50,this.height=50},at[r].mouseout=function(){this.width=45,this.height=45},l.addChild(at[r]),l.addChild(d),l.position.x=65*h*a,a+=1,l.position.y=85*p,ot.addChild(l);tt.beginFill(16776960),tt.drawRect(0,0,392,392),tt.endFill(),it.mask=tt,ot.mask=tt,G.anchor.x=.5,G.anchor.y=.5,G.width=40,G.height=40,G.position.x=40,G.position.y=615,G.interactive=!0,G.buttonMode=!0,G.defaultCursor="pointer",G.mouseup=G.touchend=function(){2==$&&(new o(it,"position.x",it.position.x+420,25,!0),new o(ot,"position.x",ot.position.x+305,25,!0),$=1)},G.mouseover=function(){this.width=45,this.height=45,this.texture=X[T+"arrow_lefth.png"].texture},G.mouseout=function(){this.width=40,this.height=40,this.texture=X[T+"arrow_left.png"].texture},J.anchor.x=.5,J.anchor.y=.5,J.width=40,J.height=40,J.position.x=380,J.position.y=615,J.interactive=!0,J.buttonMode=!0,J.defaultCursor="pointer",J.mouseup=J.touchend=function(){1==$&&(new o(it,"position.x",it.position.x-420,25,!0),new o(ot,"position.x",ot.position.x-305,25,!0),$=2)},J.mouseover=function(){this.width=45,this.height=45,this.texture=X[T+"arrow_righth.png"].texture},J.mouseout=function(){this.width=40,this.height=40,this.texture=X[T+"arrow_right.png"].texture},J.mask=tt,G.mask=tt,Q.mask=tt,z.mask=tt,et.addChild(it),et.addChild(ot),et.addChild(tt),et.addChild(G),et.addChild(J),U.position.x=0,U.position.y=0,U.height=38,U.width=128,U.interactive=!0,U.buttonMode=!0,U.defaultCursor="pointer",U.mouseup=U.touchend=function(){ht()},nt.addChild(U),(K=new PIXI.Text(v.play,{font:"italic 19px Arial",fill:"white",align:"center"})).anchor.x=.5,K.anchor.y=.5,K.position.x=U.width/2,K.position.y=U.height/2,rt.anchor.x=.5,rt.anchor.y=.5,rt.position.x=L.width/2,rt.position.y=60,et.addChild(rt),nt.addChild(K),nt.position.x=146,nt.position.y=320,nt.mask=tt,et.addChild(nt),re.addChild(et),re.addChild(Y)}st.prototype.startScene=function(){Z=1,S.scale(D,1,1,22),requestAnimationFrame(pt)},st.prototype.clearScene=function(t){var e;new o(et,"position.x",et.position.x-ae.original_width,re.transition_rate,!0).setOnComplete(function(t){t.visible=!1},et),new o(Y,"position.x",Y.position.x-ae.original_width,re.transition_rate,!0),at.splice(t-1,1);do{e=Math.floor(Math.random()*at.length)}while(0==e||e>=at.length||void 0===at[e]);var n=at[e];x.startScene(t,n.idflag),Z=0},st.prototype.repositionElements=function(t){0===Z?(et.position.x=et.position.x-ae.original_width,Y.position.x=Y.position.x-ae.original_width):(et.position.x=ae.original_width/2-210,Y.position.x=ae.original_width/2),t>=1?(1===Z&&(et.position.x=285),Y.position.y=240,et.position.y=ae.original_height/2-210,1===Z&&(Y.position.x=155)):(Y.position.y=120,1===Z&&(et.position.x=ae.original_width/2-210),et.position.y=220)},st.prototype.isActive=function(){return 1===Z};var dt,lt=.6;function pt(){D.position.y>205?(lt*=-1,D.position.y=205):D.position.y<180&&(lt*=-1,D.position.y=180),D.position.y+=lt,requestAnimationFrame(pt)}function ht(){S.slide(D,D.position.x,D.position.y-420,re.transition_rate,"smoothstep").onComplete=function(){D.visible=!1},S.slide(nt,nt.position.x,nt.position.y-420,re.transition_rate,"smoothstep"),S.slide(Q,Q.position.x,Q.position.y-420,re.transition_rate,"smoothstep"),S.slide(rt,rt.position.x,rt.position.y-420,re.transition_rate,"smoothstep"),S.slide(it,it.position.x,it.position.y-420,re.transition_rate,"smoothstep"),S.slide(ot,ot.position.x,ot.position.y-420,re.transition_rate,"smoothstep"),S.slide(G,G.position.x,G.position.y-420,re.transition_rate,"smoothstep"),S.slide(J,J.position.x,J.position.y-420,re.transition_rate,"smoothstep")}var ut,ct,gt,wt,ft,mt,xt,yt,vt,It,Ct,_t,Pt,bt,St=0,Et=0,Xt=0,Tt=0,Mt=0,At=new PIXI.Container,Ot=new PIXI.Container,kt=new PIXI.Container,Ft=0,Wt=[],Nt=[],Rt="",Ht=0,Bt=[T+"football.png",T+"football.png"],qt=new PIXI.Sprite,Vt=new PIXI.Sprite,jt=new PIXI.Sprite,Lt=[1,2,3,4,5,6],Ut=[],Yt=[],Gt=[-1,-1,-1,-1,-1],Jt=[-1,-1,-1,-1,-1],zt=0,Qt=0,Dt=0,Kt=0,Zt=0;function $t(t,e,n,i){var o,a,r,s,d,l;ut=new PIXI.Sprite(X[T+"football2.png"].texture),ct=new PIXI.Sprite(X[T+"gloves.png"].texture),gt=new PIXI.Sprite(X[T+"white_mark.png"].texture),wt=new PIXI.Sprite(X[T+"arco.png"].texture),ft=new PIXI.Sprite(X[T+"arco-0-0.png"].texture),mt=new PIXI.Sprite(X[T+"arco-1-0.png"].texture),xt=new PIXI.Sprite(X[T+"arco-2-0.png"].texture),yt=new PIXI.Sprite(X[T+"arco-0-1.png"].texture),vt=new PIXI.Sprite(X[T+"arco-1-1.png"].texture),It=new PIXI.Sprite(X[T+"arco-2-1.png"].texture),(Ct=new PIXI.Sprite(X[T+"container_goal.png"].texture)).visible=!1,Ce=new PIXI.Sprite(X[T+"container_score.png"].texture),Pt=new PIXI.filters.BlurFilter,bt=new PIXI.Sprite(X[T+"player_icon.png"].texture),qt=new PIXI.Sprite,Vt=new PIXI.Sprite,jt=new PIXI.Sprite,_t=[ft,mt,xt,yt,vt,It],re=t,ae=e,dt=n,se=i,At.position.x=ae.original_width+(ae.original_width/2-240),At.position.y=0,Ct.position.x=0,Ct.position.y=0,At.addChild(Ct),Tt=250,mt.position.x=240,mt.position.y=Tt-84,ut.anchor.x=.5,ut.anchor.y=.5,ut.filters=[Pt],ft.position.x=mt.position.x-140,ft.position.y=Tt-84,xt.position.x=mt.position.x+140,xt.position.y=Tt-84,yt.position.x=mt.position.x-140,yt.position.y=Tt,vt.position.x=mt.position.x,vt.position.y=Tt,It.position.x=mt.position.x+140,It.position.y=Tt,Ce.anchor.x=.5,Ce.anchor.y=.5,Ce.position.x=200,Ce.position.y=41,Ce.width=400,Ce.height=82,Ot.position.x=ae.original_width+(ae.original_width/2-200),Ot.position.y=0,Ot.addChild(Ce);for(var p=0;p<Gt.length;p++)(d=0!==p?new PIXI.Sprite(X[T+"empty_score.png"].texture):new PIXI.Sprite(X[T+"selected_score.png"].texture)).anchor.x=.5,d.anchor.y=.5,d.width=22,d.height=22,d.position.x=22*p+12,d.position.y=60,Ut.push(d),Ot.addChild(d),(d=new PIXI.Sprite(X[T+"empty_score.png"].texture)).anchor.x=.5,d.anchor.y=.5,d.width=22,d.height=22,d.position.x=22*p+12+278,d.position.y=60,Yt.push(d),Ot.addChild(d);re.addChild(Ot);for(p=0;p<_t.length;p++)_t[p].anchor.x=.5,_t[p].anchor.y=.5,_t[p].interactive=!0,_t[p].buttonMode=!0,_t[p].defaultCursor="pointer",_t[p].mousedown=_t[p].touchstart=function(){if(0!=this.interactive){var t;kt.visible=!1,we(!1);var e=-1,n=-1;if(Wt.length>0?(e=-2,n=-2):t=Lt[Math.floor(Math.random()*Lt.length)],0==St){if(-1!==e)if(1==(e=Wt[zt]))do{t=Lt[Math.floor(Math.random()*Lt.length)]}while(_t[t-1].position.x==this.position.x&&_t[t-1].position.y==this.position.y);else if(0==e)do{t=Lt[Math.floor(Math.random()*Lt.length)]}while(_t[t-1].position.x!=this.position.x||_t[t-1].position.y!=this.position.y);r=ut,s=ct,this.position.x==_t[t-1].position.x&&this.position.y==_t[t-1].position.y?(l=0,Ut[zt].texture=X[T+"bad_score.png"].texture):(l=1,Ut[zt].texture=X[T+"good_score.png"].texture,Kt+=1),Gt[zt]=l,zt+=1,St=1}else{if(-1!==n)if(1==(n=Nt[Qt]))do{t=Lt[Math.floor(Math.random()*Lt.length)]}while(_t[t-1].position.x==this.position.x&&_t[t-1].position.y==this.position.y);else if(0==n)do{t=Lt[Math.floor(Math.random()*Lt.length)]}while(_t[t-1].position.x!=this.position.x||_t[t-1].position.y!=this.position.y);r=ct,s=ut,this.position.x==_t[t-1].position.x&&this.position.y==_t[t-1].position.y?(l=0,Yt[Qt].texture=X[T+"bad_score.png"].texture):(l=1,Yt[Qt].texture=X[T+"good_score.png"].texture,Zt+=1),Jt[Qt]=l,Qt+=1,St=0}requestAnimationFrame(ie),o=S.slide(r,this.position.x,this.position.y,25,"inverseSineSquared"),S.scale(ut,.7,.7,25),a=S.slide(s,_t[t-1].position.x,_t[t-1].position.y,25,"inverseSineSquared"),o.onComplete=function(){he(ut)},a.onComplete=function(){ge(l),ue(ct)}}},At.addChild(_t[p]);ct.position.x=240,ct.position.y=Tt-15,ct.width=90,ct.height=90,ct.anchor.x=.5,ct.anchor.y=.5,At.addChild(ct),ut.position.x=240,ut.position.y=Tt+150,bt.anchor.x=.5,bt.anchor.y=.5,bt.position.x=0,bt.position.y=0,kt.position.x=ut.position.x,kt.position.y=340,kt.addChild(bt),gt.anchor.x=.5,gt.anchor.y=.5,gt.position.x=ut.position.x,gt.position.y=ut.position.y+35,At.addChild(gt),At.addChild(ut),At.addChild(kt),qt.anchor.x=.5,qt.anchor.y=.5,qt.position.x=-1e3,qt.position.y=280,At.addChild(qt),re.addChild(At),requestAnimationFrame(le)}var te=new PIXI.Text("0",{font:"bold 30px Arial",fill:"#74B500",align:"center"}),ee=new PIXI.Text("0",{font:"bold 30px Arial",fill:"#74B500",align:"center"}),ne=null;$t.prototype.startScene=function(t,e){fe(),Et=1,Xt=1,(_e=new PIXI.Text(y[t][1],{font:"bold 17px Arial",fill:"black",align:"left"})).position.x=45,_e.position.y=9,(Pe=new PIXI.Text(y[e][1],{font:"bold 17px Arial",fill:"black",align:"right"})).anchor.x=1,Pe.position.x=360,Pe.position.y=9,te.position.x=170,te.position.y=48,ee.anchor.x=.5,ee.position.x=222,ee.position.y=48;var n=PIXI.Texture.fromImage(T+"flags/"+t+".png");Vt.texture=n,Vt.anchor.x=.5,Vt.anchor.y=.5,Vt.width=32,Vt.height=32,Vt.position.x=20,Vt.position.y=18,Ot.addChild(Vt);var i=PIXI.Texture.fromImage(T+"flags/"+e+".png");jt.texture=i,jt.anchor.x=.5,jt.anchor.y=.5,jt.width=32,jt.height=32,jt.position.x=380,jt.position.y=18,ne=y[t][0]+":"+y[e][0],Ot.addChild(jt),Ot.addChild(_e),Ot.addChild(Pe),Ot.addChild(te),Ot.addChild(ee),new o(se,"position.x",se.position.x-720,re.transition_rate,!0),new o(At,"position.x",ae.original_width/2-240,re.transition_rate,!0),new o(Ot,"position.x",ae.original_width/2-200,re.transition_rate,!0)},$t.prototype.clearScene=function(){0==Ft&&(qt.visible=!1,Ft=1,Et=0,new o(se,"position.x",se.position.x-ae.original_width,re.transition_rate,!0),S.slide(At,-600,At.position.y,re.transition_rate,"smoothstep").setOnComplete=function(){At.visible=!1,qt.visible=!1},dt.startScene(Ht,ne))},$t.prototype.repositionElements=function(t){0==Et?(At.position.x=ae.original_width+(ae.original_width/2-240),Ot.position.x=0==Xt?ae.original_width+(ae.original_width/2-200):ae.original_width/2-200):(At.position.x=ae.original_width/2-240,Ot.position.x=ae.original_width/2-200),At.position.y=t>=1?0:130,Ot.position.y=0},$t.prototype.isActive=function(){return 1===Et};var ie=function t(){Mt+=.5;var e=Math.cos(Mt);Pt.blur=20*e,ut.rotation+=.3,requestAnimationFrame(t)};function oe(){ut.rotation-=.3,Pt.blur=0,requestAnimationFrame(oe)}var ae,re,se,de=1;function le(){bt.position.y>30?(de*=-1,bt.position.y=30):bt.position.y<0&&(de*=-1,bt.position.y=0),bt.position.y+=de,requestAnimationFrame(le)}function pe(){}function he(t){setTimeout(function(){var e=new o(t,"position.x",240,25,!1),n=new o(t,"position.y",Tt+150,25,!1);e.easing=o.outCubic,n.easing=o.outCubic,e.start(),n.start(),requestAnimationFrame(oe)},600)}function ue(t){setTimeout(function(){var e=new o(t,"position.x",240,25,!1),n=new o(t,"position.y",Tt-25,25,!1);e.easing=o.outCubic,n.easing=o.outCubic,e.start(),n.start(),n.setOnComplete(function(){ce()})},600)}function ce(){0==St?(ut.texture=X[T+"football2.png"].texture,ct.texture=X[T+"gloves.png"].texture,kt.position.y=340):(ct.texture=X[T+"gloves2.png"].texture,ut.texture=X[T+"football.png"].texture,kt.position.y=95),te.text=""+Kt,ee.text=""+Zt,S.scale(ut,1,1,25),kt.visible=!0,we(!0)}function ge(t){var e;qt.texture=0==St?0==t?X[T+"messages/saved_"+P+".png"].texture:X[T+"messages/goal_auto_"+P+".png"].texture:0==t?X[T+"messages/missed_"+P+".png"].texture:X[T+"messages/goal_"+P+".png"].texture,S.slide(qt,Ct.width/2,qt.position.y,20,"deceleration").onComplete=function(){(e=S.breathe(qt,1.2,1.2,20,!0)).play(),setTimeout(function(){e.pause(),S.slide(qt,1e3,qt.position.y,20,"acceleration").onComplete=function(){qt.position.x=-1e3,5===Qt&&(we(!1),$t.prototype.clearScene())}},800)}}function we(t){for(var e=0;e<_t.length;e++)_t[e].interactive=t}function fe(){var t=W+"PenaltyEURO2016/initializeGame/";jQuery.post(t,{data:_},function(t){if(t)if(void 0!==t.sprites){var e=t.sprites;for(var n in e)if(e.hasOwnProperty(n)){for(var i=JSON.parse(Base64.decode(e[n])),o=0;o<i.length;o++)"1"==n?Wt.push(i[o]):"2"==n&&Nt.push(i[o]);"t"==n&&(Ht=parseInt(i))}}else console.log("Error Inside Response");else console.log("Error")},"jsonp")}var me,xe,ye,ve,Ie,Ce,_e,Pe,be,Se=0,Ee=new PIXI.Container,Xe=new PIXI.Sprite;Vt=new PIXI.Sprite,jt=new PIXI.Sprite;function Te(t,e,n){me=new PIXI.Sprite(X[T+"small_logo.png"].texture),xe=new PIXI.Sprite(X[T+"container_box.png"].texture),ye=new PIXI.Sprite(X[T+"red_card.png"].texture),re=t,ae=e,se=n,xe.position.x=0,xe.position.y=0,xe.height=420,xe.width=420,Ee.addChild(xe),me.anchor.x=.5,me.anchor.y=.5,me.position.x=xe.width/2,me.position.y=370,Ee.addChild(me),(be=new PIXI.Text(v.terms_conditions,{font:"15px Arial",fill:"white",align:"center"})).anchor.x=.5,be.anchor.y=.5,be.position.x=xe.width/2,be.position.y=340,be.interactive=!0,be.buttonMode=!0,be.defaultCursor="pointer",ye.anchor.x=.5,ye.anchor.y=.5,ye.position.x=xe.width/2,ye.position.y=180,ye.height=180,ye.width=180,Ee.addChild(ye),Xe.anchor.x=.5,Xe.anchor.y=.5,Xe.position.x=Ee.width/2,Xe.position.y=Ee.height,S.fadeOut(Xe),Ee.addChild(Xe),(ve=new PIXI.Text(v.loser,{font:"bold italic 16px Arial",fill:"white",align:"center"})).anchor.x=.5,ve.anchor.y=.5,ve.position.x=xe.width/2,ve.position.y=315,S.fadeOut(ve),(Ie=new PIXI.Text(v.top_winner,{font:"bold italic 18px Arial",fill:"white",align:"center"})).anchor.x=.5,Ie.anchor.y=.5,Ie.position.x=xe.width/2,Ie.position.y=110,S.fadeOut(Ie),Ee.addChild(ve),Ee.addChild(Ie),Ee.position.x=2*ae.original_width+(ae.original_width/2-200),Ee.position.y=90,re.addChild(Ee)}function Me(t){S.fadeIn(Xe),S.scale(Xe,1,1,22),S.slide(Xe,Xe.position.x,60,40,"bounce 3 -3").onComplete=function(){S.fadeIn(ve),1!=t&&2!=t||(S.fadeIn(Ie),requestAnimationFrame(Oe),S.breathe(ye,.85,.85,20,!1))}}Te.prototype.startScene=function(t,e){Se=1,0==t?(Xe.texture=X[T+"messages/try_again_"+P+".png"].texture,ye.texture=X[T+"red_card.png"].texture):1==t?(Xe.texture=X[T+"messages/congrats_"+P+".png"].texture,ye.texture=X[T+"messages/"+prs+".png"].texture,ve.text=v.winner):2==t&&(Xe.texture=X[T+"messages/congrats_"+P+".png"].texture,"0"!=prb?ye.texture=X[T+"messages/"+prb+".png"].texture:ye.texture=X[T+"messages/"+prs+".png"].texture,ve.text=v.winner),new o(se,"position.x",se.position.x-720,re.transition_rate,!0),new o(Ee,"position.x",ae.original_width/2-210,re.transition_rate,!0).setOnComplete(function(n){Me(t),ke(e)})},Te.prototype.clearScene=function(){},Te.prototype.repositionElements=function(t){Ee.position.x=1==Se?ae.original_width/2-210:2*ae.original_width+(ae.original_width/2-210),Ee.position.y=t>=1?80:170},Te.prototype.isActive=function(){return 1===Se};var Ae=.6;function Oe(){ye.position.y>215?(Ae*=-1,ye.position.y=215):ye.position.y<190&&(Ae*=-1,ye.position.y=190),ye.position.y+=Ae,requestAnimationFrame(Oe)}function ke(t){var e=W+"PenaltyEURO2016/endGame/";jQuery.post(e,{data:t},function(t){t&&void 0!==t.msg||alert("Error")},"jsonp")}
},{}]},{},["hNm2"], null)
//# sourceMappingURL=/euro2016_external.c5bc1ee4.js.map