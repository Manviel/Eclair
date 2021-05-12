// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/penalty_euro/euro_scene3.js":[function(require,module,exports) {
/**
 * JS code for the stage 1
 */
var outrenderer;
var outstage;
var outbackground;
var active3 = 0;
var container_prize = new PIXI.Container();
var message_final = new PIXI.Sprite();
var logo3;
var containermain;
var prize;
var textBottom;
var textTop;
var containerscore;
var textTeam1;
var textTeam2;
var selected_flag = new PIXI.Sprite();
var random_flag_sprite = new PIXI.Sprite();
var text_terms_conditions_final;

function Scene3(stage, renderer, background) {
  // Initialize sprites 3
  logo3 = new PIXI.Sprite(resources[prfx + "small_logo.png"].texture);
  containermain = new PIXI.Sprite(resources[prfx + "container_box.png"].texture);
  prize = new PIXI.Sprite(resources[prfx + "red_card.png"].texture);
  outstage = stage;
  outrenderer = renderer;
  outbackground = background;
  containermain.position.x = 0;
  containermain.position.y = 0;
  containermain.height = 420;
  containermain.width = 420;
  container_prize.addChild(containermain);
  logo3.anchor.x = 0.5;
  logo3.anchor.y = 0.5;
  logo3.position.x = containermain.width / 2;
  logo3.position.y = 370;
  container_prize.addChild(logo3);
  text_terms_conditions_final = new PIXI.Text(messages["terms_conditions"], {
    font: "15px Arial",
    fill: "white",
    align: "center"
  });
  text_terms_conditions_final.anchor.x = 0.5;
  text_terms_conditions_final.anchor.y = 0.5;
  text_terms_conditions_final.position.x = containermain.width / 2;
  text_terms_conditions_final.position.y = 340;
  text_terms_conditions_final.interactive = true;
  text_terms_conditions_final.buttonMode = true;
  text_terms_conditions_final.defaultCursor = "pointer";
  prize.anchor.x = 0.5;
  prize.anchor.y = 0.5;
  prize.position.x = containermain.width / 2;
  prize.position.y = 180;
  prize.height = 180;
  prize.width = 180;
  container_prize.addChild(prize);
  message_final.anchor.x = 0.5;
  message_final.anchor.y = 0.5;
  message_final.position.x = container_prize.width / 2;
  message_final.position.y = container_prize.height;
  c.fadeOut(message_final);
  container_prize.addChild(message_final);
  textBottom = new PIXI.Text(messages["loser"], {
    font: "bold italic 16px Arial",
    fill: "white",
    align: "center"
  });
  textBottom.anchor.x = 0.5;
  textBottom.anchor.y = 0.5;
  textBottom.position.x = containermain.width / 2;
  textBottom.position.y = 315;
  c.fadeOut(textBottom);
  textTop = new PIXI.Text(messages["top_winner"], {
    font: "bold italic 18px Arial",
    fill: "white",
    align: "center"
  });
  textTop.anchor.x = 0.5;
  textTop.anchor.y = 0.5;
  textTop.position.x = containermain.width / 2;
  textTop.position.y = 110;
  c.fadeOut(textTop);
  container_prize.addChild(textBottom);
  container_prize.addChild(textTop);
  container_prize.position.x = outrenderer.original_width * 2 + (outrenderer.original_width / 2 - 200);
  container_prize.position.y = 90;
  outstage.addChild(container_prize);
}

Scene3.prototype.startScene = function (result, teams) {
  active3 = 1;

  if (result == 0) {
    message_final.texture = resources["/cache/images/euro2016_penalty/messages/try_again_" + lg + ".png"].texture;
    prize.texture = resources["/cache/images/euro2016_penalty/red_card.png"].texture;
  } else if (result == 1) {
    message_final.texture = resources["/cache/images/euro2016_penalty/messages/congrats_" + lg + ".png"].texture;
    prize.texture = resources["/cache/images/euro2016_penalty/messages/" + prs + ".png"].texture;
    textBottom.text = messages["winner"];
  } else if (result == 2) {
    message_final.texture = resources["/cache/images/euro2016_penalty/messages/congrats_" + lg + ".png"].texture;
    if (prb != "0") prize.texture = resources["/cache/images/euro2016_penalty/messages/" + prb + ".png"].texture;else prize.texture = resources["/cache/images/euro2016_penalty/messages/" + prs + ".png"].texture;
    textBottom.text = messages["winner"];
  }

  new Tween(outbackground, "position.x", outbackground.position.x - 720, outstage.transition_rate, true);
  var tween_cont_final = new Tween(container_prize, "position.x", outrenderer.original_width / 2 - 420 / 2, outstage.transition_rate, true);
  tween_cont_final.setOnComplete(function (params) {
    showMessage(result);
    endGame(teams);
  });
};

Scene3.prototype.clearScene = function () {};

Scene3.prototype.repositionElements = function (orientation) {
  if (active3 == 1) {
    container_prize.position.x = outrenderer.original_width / 2 - 210;
  } else {
    container_prize.position.x = outrenderer.original_width * 2 + (outrenderer.original_width / 2 - 210);
  }

  if (orientation >= 1) container_prize.position.y = 80;else container_prize.position.y = 170;
};

Scene3.prototype.isActive = function () {
  return active3 === 1 ? true : false;
};

function showMessage(result) {
  c.fadeIn(message_final);
  c.scale(message_final, 1, 1, 22);
  var tween_message_final = c.slide(message_final, message_final.position.x, 60, 40, "bounce 3 -3");

  tween_message_final.onComplete = function () {
    c.fadeIn(textBottom);

    if (result == 1 || result == 2) {
      c.fadeIn(textTop);
      requestAnimationFrame(animatePrizeWinner);
      c.breathe(prize, 0.85, 0.85, 20, false);
    }
  };
}

var yspeed_3 = 0.6;

function animatePrizeWinner() {
  if (prize.position.y > 215) {
    // bounce the circle
    yspeed_3 *= -1; // affix to the bottom of the stage

    prize.position.y = 215;
  } else if (prize.position.y < 190) {
    // bounce the circle
    yspeed_3 *= -1; // affix to the top of the stage

    prize.position.y = 190;
  }

  prize.position.y += yspeed_3;
  requestAnimationFrame(animatePrizeWinner);
}

function endGame(teams) {
  var url = c_url + "PenaltyEURO2016/endGame/";
  jQuery.post(url, {
    data: teams
  }, function (response) {
    if (response) {
      if (typeof response["msg"] != "undefined") {} else {
        alert("Error");
      }
    } else {
      alert("Error");
    }
  }, "jsonp");
}
},{}],"C:/Users/Michael/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52631" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Michael/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/penalty_euro/euro_scene3.js"], null)
//# sourceMappingURL=/euro_scene3.e63f09b7.js.map