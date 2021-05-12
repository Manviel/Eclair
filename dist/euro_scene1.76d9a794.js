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
})({"js/penalty_euro/euro_scene1.js":[function(require,module,exports) {
/**
 * JS code for the stage 1
 */
var outrenderer;
var outstage;
var out_next_scene1;
var active1 = 0;
var page_flags = 1;
var mask_menu = new PIXI.Graphics();
var container_flags = new PIXI.Container();
var container_button = new PIXI.Container();
var sub_container_flags = new PIXI.Container();
var sub_container_flags2 = new PIXI.Container();
var container_1;
var containerbutton;
var logo;
var left_arrow;
var right_arrow;
var flags = [];
var text_terms_conditions;
var text_temp;
var prize_init;
var text_play;

function Scene1(stage, renderer, next_scene) {
  // Initialize sprites 1
  container_1 = new PIXI.Sprite(resources[prfx + "container_box.png"].texture);
  containerbutton = new PIXI.Sprite(resources[prfx + "play.png"].texture);
  logo = new PIXI.Sprite(resources[prfx + "logo.png"].texture);
  left_arrow = new PIXI.Sprite(resources[prfx + "arrow_left.png"].texture);
  right_arrow = new PIXI.Sprite(resources[prfx + "arrow_right.png"].texture);
  prize_init = new PIXI.Sprite(resources[prfx + "messages/" + pr + ".png"].texture);
  out_next_scene1 = next_scene;
  outstage = stage;
  outrenderer = renderer;
  logo.anchor.x = 0.5;
  logo.anchor.y = 0.5;
  logo.height = 132;
  logo.width = 250;
  logo.position.x = outrenderer.original_width / 2;
  logo.position.y = 66;
  var positionx = 0;
  var flag;

  for (var i = 0; i < 24; i++) {
    flag = new PIXI.Sprite(resources[prfx + "flags/" + (i + 1) + ".png"].texture);
    flags.push(flag);
  }

  container_1.position.x = 0;
  container_1.position.y = 0;
  container_1.height = 420;
  container_1.width = 420;
  container_flags.addChild(container_1);
  prize_init.anchor.x = 0.5;
  prize_init.anchor.y = 0.5;
  prize_init.position.x = container_1.width / 2;
  prize_init.position.y = 180;
  prize_init.height = 180;
  prize_init.width = 180;
  prize_init.mask = mask_menu;
  container_flags.addChild(prize_init);
  text_terms_conditions = new PIXI.Text(messages["terms_conditions"], {
    font: "15px Arial",
    fill: "white",
    align: "center"
  });
  text_terms_conditions.anchor.x = 0.5;
  text_terms_conditions.anchor.y = 0.5;
  text_terms_conditions.position.x = container_1.width / 2;
  text_terms_conditions.position.y = 375;
  text_terms_conditions.interactive = true;
  text_terms_conditions.buttonMode = true;
  text_terms_conditions.defaultCursor = "pointer";

  text_terms_conditions.mouseup = text_terms_conditions.touchend = function () {
    showTermsConditions();
  };

  container_flags.addChild(text_terms_conditions);
  text_temp = new PIXI.Text(messages["title_text"], {
    font: "italic 19px Arial",
    fill: "white",
    align: "center"
  });
  text_temp.anchor.x = 0.5;
  text_temp.anchor.y = 0.5;
  text_temp.position.x = container_1.width / 2;
  text_temp.position.y = 60 + 420;
  container_flags.addChild(text_temp);
  container_flags.position.x = outrenderer.original_width / 2 - 420 / 2;
  container_flags.position.y = outrenderer.original_height / 2 - 210;
  sub_container_flags.position.x = 115;
  sub_container_flags.position.y = 30 + 420;
  var row = 1;
  var col = 1;
  var name_flag;
  var flag_mini_container;

  for (var i = 0; i < 12; i++) {
    name_flag = new PIXI.Text(names[i + 1][0], {
      font: "bold 16px Arial",
      fill: "white",
      align: "center"
    });
    name_flag.anchor.x = 0.5;
    name_flag.anchor.y = 0.5;
    name_flag.position.x = 0;
    name_flag.position.y = 35;
    flag_mini_container = new PIXI.Container();

    if (i == 4) {
      col = 1;
      row = 2;
      positionx = 0;
    }

    if (i == 8) {
      col = 1;
      row = 3;
      positionx = 0;
    }

    flags[i].anchor.x = 0.5;
    flags[i].anchor.y = 0.5;
    flags[i].width = 45;
    flags[i].height = 45;
    flags[i].idflag = i + 1;
    flags[i].interactive = true;
    flags[i].buttonMode = true;
    flags[i].defaultCursor = "pointer";

    flags[i].mouseup = flags[i].touchend = function () {
      Scene1.prototype.clearScene(this.idflag);
    };

    flags[i].mouseover = function () {
      this.width = 50;
      this.height = 50;
    };

    flags[i].mouseout = function () {
      this.width = 45;
      this.height = 45;
    };

    flag_mini_container.addChild(flags[i]);
    flag_mini_container.addChild(name_flag);
    flag_mini_container.position.x = 65 * col * positionx;
    positionx += 1;
    flag_mini_container.position.y = 85 * row;
    sub_container_flags.addChild(flag_mini_container);
  }

  sub_container_flags2.position.x = 420;
  sub_container_flags2.position.y = 30 + 420;
  row = 1;
  col = 1;
  positionx = 0;

  for (var i = 12; i < 24; i++) {
    name_flag = new PIXI.Text(names[i + 1][0], {
      font: "bold 16px Arial",
      fill: "white",
      align: "center"
    });
    name_flag.anchor.x = 0.5;
    name_flag.anchor.y = 0.5;
    name_flag.position.x = 0;
    name_flag.position.y = 35;
    flag_mini_container = new PIXI.Container();

    if (i == 16) {
      col = 1;
      row = 2;
      positionx = 0;
    }

    if (i == 20) {
      col = 1;
      row = 3;
      positionx = 0;
    }

    flags[i].anchor.x = 0.5;
    flags[i].anchor.y = 0.5;
    flags[i].width = 45;
    flags[i].height = 45;
    flags[i].idflag = i + 1;
    flags[i].interactive = true;
    flags[i].buttonMode = true;
    flags[i].defaultCursor = "pointer";

    flags[i].mouseup = flags[i].touchend = function () {
      Scene1.prototype.clearScene(this.idflag);
    };

    flags[i].mouseover = function () {
      this.width = 50;
      this.height = 50;
    };

    flags[i].mouseout = function () {
      this.width = 45;
      this.height = 45;
    };

    flag_mini_container.addChild(flags[i]);
    flag_mini_container.addChild(name_flag);
    flag_mini_container.position.x = 65 * col * positionx;
    positionx += 1;
    flag_mini_container.position.y = 85 * row;
    sub_container_flags2.addChild(flag_mini_container);
  }

  mask_menu.beginFill(0xffff00);
  mask_menu.drawRect(0, 0, 392, 392);
  mask_menu.endFill();
  sub_container_flags.mask = mask_menu;
  sub_container_flags2.mask = mask_menu;
  left_arrow.anchor.x = 0.5;
  left_arrow.anchor.y = 0.5;
  left_arrow.width = 40;
  left_arrow.height = 40;
  left_arrow.position.x = 40;
  left_arrow.position.y = 195 + 420;
  left_arrow.interactive = true;
  left_arrow.buttonMode = true;
  left_arrow.defaultCursor = "pointer";

  left_arrow.mouseup = left_arrow.touchend = function () {
    if (page_flags == 2) {
      new Tween(sub_container_flags, "position.x", sub_container_flags.position.x + 420, 25, true);
      new Tween(sub_container_flags2, "position.x", sub_container_flags2.position.x + 305, 25, true);
      page_flags = 1;
    }
  };

  left_arrow.mouseover = function () {
    this.width = 45;
    this.height = 45;
    this.texture = resources[prfx + "arrow_lefth.png"].texture;
  };

  left_arrow.mouseout = function () {
    this.width = 40;
    this.height = 40;
    this.texture = resources[prfx + "arrow_left.png"].texture;
  };

  right_arrow.anchor.x = 0.5;
  right_arrow.anchor.y = 0.5;
  right_arrow.width = 40;
  right_arrow.height = 40;
  right_arrow.position.x = 380;
  right_arrow.position.y = 195 + 420;
  right_arrow.interactive = true;
  right_arrow.buttonMode = true;
  right_arrow.defaultCursor = "pointer";

  right_arrow.mouseup = right_arrow.touchend = function () {
    if (page_flags == 1) {
      new Tween(sub_container_flags, "position.x", sub_container_flags.position.x - 420, 25, true);
      new Tween(sub_container_flags2, "position.x", sub_container_flags2.position.x - 305, 25, true);
      page_flags = 2;
    }
  };

  right_arrow.mouseover = function () {
    this.width = 45;
    this.height = 45;
    this.texture = resources[prfx + "arrow_righth.png"].texture;
  };

  right_arrow.mouseout = function () {
    this.width = 40;
    this.height = 40;
    this.texture = resources[prfx + "arrow_right.png"].texture;
  };

  right_arrow.mask = mask_menu;
  left_arrow.mask = mask_menu;
  text_temp.mask = mask_menu;
  text_terms_conditions.mask = mask_menu;
  container_flags.addChild(sub_container_flags);
  container_flags.addChild(sub_container_flags2);
  container_flags.addChild(mask_menu);
  container_flags.addChild(left_arrow);
  container_flags.addChild(right_arrow);
  containerbutton.position.x = 0;
  containerbutton.position.y = 0;
  containerbutton.height = 38;
  containerbutton.width = 128;
  containerbutton.interactive = true;
  containerbutton.buttonMode = true;
  containerbutton.defaultCursor = "pointer";

  containerbutton.mouseup = containerbutton.touchend = function () {
    moveToFlags();
  };

  container_button.addChild(containerbutton);
  text_play = new PIXI.Text(messages["play"], {
    font: "italic 19px Arial",
    fill: "white",
    align: "center"
  });
  text_play.anchor.x = 0.5;
  text_play.anchor.y = 0.5;
  text_play.position.x = containerbutton.width / 2;
  text_play.position.y = containerbutton.height / 2;
  text_init = new PIXI.Text(messages["init_message"], {
    font: "italic 19px Arial",
    fill: "white",
    align: "center"
  });
  text_init.anchor.x = 0.5;
  text_init.anchor.y = 0.5;
  text_init.position.x = container_1.width / 2;
  text_init.position.y = 60;
  container_flags.addChild(text_init);
  container_button.addChild(text_play);
  container_button.position.x = 146;
  container_button.position.y = 320;
  container_button.mask = mask_menu;
  container_flags.addChild(container_button);
  outstage.addChild(container_flags);
  outstage.addChild(logo);
}

Scene1.prototype.startScene = function () {
  active1 = 1;
  c.scale(prize_init, 1, 1, 22);
  requestAnimationFrame(animatePrizeWinnerInit);
};

Scene1.prototype.clearScene = function (idflag) {
  var rand_number;
  var cont_tween = new Tween(container_flags, "position.x", container_flags.position.x - outrenderer.original_width, outstage.transition_rate, true);
  cont_tween.setOnComplete(function (param) {
    param.visible = false;
  }, container_flags);
  new Tween(logo, "position.x", logo.position.x - outrenderer.original_width, outstage.transition_rate, true);
  flags.splice(idflag - 1, 1);

  do {
    rand_number = Math.floor(Math.random() * flags.length);
  } while (rand_number == 0 || rand_number >= flags.length || typeof flags[rand_number] == "undefined");

  var random_flag = flags[rand_number];
  out_next_scene1.startScene(idflag, random_flag.idflag);
  active1 = 0;
};

Scene1.prototype.repositionElements = function (orientation) {
  if (active1 === 0) {
    container_flags.position.x = container_flags.position.x - outrenderer.original_width;
    logo.position.x = logo.position.x - outrenderer.original_width;
  } else {
    container_flags.position.x = outrenderer.original_width / 2 - 420 / 2;
    logo.position.x = outrenderer.original_width / 2;
  }

  if (orientation >= 1) {
    if (active1 === 1) container_flags.position.x = 285;
    logo.position.y = 240;
    container_flags.position.y = outrenderer.original_height / 2 - 210;
    if (active1 === 1) logo.position.x = 155;
  } else {
    logo.position.y = 120;
    if (active1 === 1) container_flags.position.x = outrenderer.original_width / 2 - 420 / 2;
    container_flags.position.y = 220;
  } //container_flags.position.y = (orientation >= 1 ? outrenderer.original_height/2 - (370/2):outrenderer.original_height/2 - ((370/2)-50));

};

Scene1.prototype.isActive = function () {
  return active1 === 1 ? true : false;
};

var yspeed_init = 0.6;

function animatePrizeWinnerInit() {
  if (prize_init.position.y > 205) {
    // bounce the circle
    yspeed_init *= -1; // affix to the bottom of the stage

    prize_init.position.y = 205;
  } else if (prize_init.position.y < 180) {
    // bounce the circle
    yspeed_init *= -1; // affix to the top of the stage

    prize_init.position.y = 180;
  }

  prize_init.position.y += yspeed_init;
  requestAnimationFrame(animatePrizeWinnerInit);
}

function moveToFlags() {
  var prize_init_tween = c.slide(prize_init, prize_init.position.x, prize_init.position.y - 420, outstage.transition_rate, "smoothstep");

  prize_init_tween.onComplete = function () {
    prize_init.visible = false;
  };

  c.slide(container_button, container_button.position.x, container_button.position.y - 420, outstage.transition_rate, "smoothstep");
  c.slide(text_temp, text_temp.position.x, text_temp.position.y - 420, outstage.transition_rate, "smoothstep");
  c.slide(text_init, text_init.position.x, text_init.position.y - 420, outstage.transition_rate, "smoothstep");
  c.slide(sub_container_flags, sub_container_flags.position.x, sub_container_flags.position.y - 420, outstage.transition_rate, "smoothstep");
  c.slide(sub_container_flags2, sub_container_flags2.position.x, sub_container_flags2.position.y - 420, outstage.transition_rate, "smoothstep");
  c.slide(left_arrow, left_arrow.position.x, left_arrow.position.y - 420, outstage.transition_rate, "smoothstep");
  c.slide(right_arrow, right_arrow.position.x, right_arrow.position.y - 420, outstage.transition_rate, "smoothstep");
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
},{}]},{},["C:/Users/Michael/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/penalty_euro/euro_scene1.js"], null)
//# sourceMappingURL=/euro_scene1.76d9a794.js.map