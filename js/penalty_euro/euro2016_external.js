"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Charm = (function () {
  function Charm() {
    var _this = this;

    var renderingEngine =
      arguments.length <= 0 || arguments[0] === undefined ? PIXI : arguments[0];

    _classCallCheck(this, Charm);

    if (renderingEngine === undefined)
      throw new Error(
        "Please assign a rendering engine in the constructor before using charm.js"
      );

    //Find out which rendering engine is being used (the default is Pixi)
    this.renderer = "";

    //If the `renderingEngine` is Pixi, set up Pixi object aliases
    if (renderingEngine.ParticleContainer && renderingEngine.Sprite) {
      this.renderer = "pixi";
    }

    //An array to store the global tweens
    this.globalTweens = [];

    //An object that stores all the easing formulas
    this.easingFormulas = {
      //Linear

      linear: function linear(x) {
        return x;
      },

      //Smoothstep
      smoothstep: function smoothstep(x) {
        return x * x * (3 - 2 * x);
      },
      smoothstepSquared: function smoothstepSquared(x) {
        return Math.pow(x * x * (3 - 2 * x), 2);
      },
      smoothstepCubed: function smoothstepCubed(x) {
        return Math.pow(x * x * (3 - 2 * x), 3);
      },

      //Acceleration
      acceleration: function acceleration(x) {
        return x * x;
      },
      accelerationCubed: function accelerationCubed(x) {
        return Math.pow(x * x, 3);
      },

      //Deceleration
      deceleration: function deceleration(x) {
        return 1 - Math.pow(1 - x, 2);
      },
      decelerationCubed: function decelerationCubed(x) {
        return 1 - Math.pow(1 - x, 3);
      },

      //Sine
      sine: function sine(x) {
        return Math.sin((x * Math.PI) / 2);
      },
      sineSquared: function sineSquared(x) {
        return Math.pow(Math.sin((x * Math.PI) / 2), 2);
      },
      sineCubed: function sineCubed(x) {
        return Math.pow(Math.sin((x * Math.PI) / 2), 2);
      },
      inverseSine: function inverseSine(x) {
        return 1 - Math.sin(((1 - x) * Math.PI) / 2);
      },
      inverseSineSquared: function inverseSineSquared(x) {
        return 1 - Math.pow(Math.sin(((1 - x) * Math.PI) / 2), 2);
      },
      inverseSineCubed: function inverseSineCubed(x) {
        return 1 - Math.pow(Math.sin(((1 - x) * Math.PI) / 2), 3);
      },

      //Spline
      spline: function spline(t, p0, p1, p2, p3) {
        return (
          0.5 *
          (2 * p1 +
            (-p0 + p2) * t +
            (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
            (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t)
        );
      },

      //Bezier curve
      cubicBezier: function cubicBezier(t, a, b, c, d) {
        var t2 = t * t;
        var t3 = t2 * t;
        return (
          a +
          (-a * 3 + t * (3 * a - a * t)) * t +
          (3 * b + t * (-6 * b + b * 3 * t)) * t +
          (c * 3 - c * 3 * t) * t2 +
          d * t3
        );
      },
    };

    //Add `scaleX` and `scaleY` properties to Pixi sprites
    this._addScaleProperties = function (sprite) {
      if (_this.renderer === "pixi") {
        if (!sprite.scaleX && sprite.scale.x) {
          Object.defineProperty(sprite, "scaleX", {
            get: function get() {
              return sprite.scale.x;
            },
            set: function set(value) {
              sprite.scale.x = value;
            },
          });
        }
        if (!sprite.scaleY && sprite.scale.y) {
          Object.defineProperty(sprite, "scaleY", {
            get: function get() {
              return sprite.scale.y;
            },
            set: function set(value) {
              sprite.scale.y = value;
            },
          });
        }
      }
    };
  }

  //The low level `tweenProperty` function is used as the foundation
  //for the the higher level tween methods.

  _createClass(Charm, [
    {
      key: "tweenProperty",
      value: function tweenProperty(
        sprite, //Sprite object
        property, //String property
        startValue, //Tween start value
        endValue, //Tween end value
        totalFrames //Delay in frames before repeating
      ) {
        var type =
          arguments.length <= 5 || arguments[5] === undefined
            ? "smoothstep"
            : arguments[5];

        var _this2 = this;

        var yoyo =
          arguments.length <= 6 || arguments[6] === undefined
            ? false
            : arguments[6];
        var delayBeforeRepeat =
          arguments.length <= 7 || arguments[7] === undefined
            ? 0
            : arguments[7];

        //Create the tween object
        var o = {};

        //If the tween is a bounce type (a spline), set the
        //start and end magnitude values
        var typeArray = type.split(" ");
        if (typeArray[0] === "bounce") {
          o.startMagnitude = parseInt(typeArray[1]);
          o.endMagnitude = parseInt(typeArray[2]);
        }

        //Use `o.start` to make a new tween using the current
        //end point values
        o.start = function (startValue, endValue) {
          //Clone the start and end values so that any possible references to sprite
          //properties are converted to ordinary numbers
          o.startValue = JSON.parse(JSON.stringify(startValue));
          o.endValue = JSON.parse(JSON.stringify(endValue));
          o.playing = true;
          o.totalFrames = totalFrames;
          o.frameCounter = 0;

          //Add the tween to the global `tweens` array. The `tweens` array is
          //updated on each frame
          _this2.globalTweens.push(o);
        };

        //Call `o.start` to start the tween
        o.start(startValue, endValue);

        //The `update` method will be called on each frame by the game loop.
        //This is what makes the tween move
        o.update = function () {
          var time = void 0,
            curvedTime = void 0;

          if (o.playing) {
            //If the elapsed frames are less than the total frames,
            //use the tweening formulas to move the sprite
            if (o.frameCounter < o.totalFrames) {
              //Find the normalized value
              var normalizedTime = o.frameCounter / o.totalFrames;

              //Select the correct easing function from the
              //`ease` object’s library of easing functions

              //If it's not a spline, use one of the ordinary easing functions
              if (typeArray[0] !== "bounce") {
                curvedTime = _this2.easingFormulas[type](normalizedTime);
              }

              //If it's a spline, use the `spline` function and apply the
              //2 additional `type` array values as the spline's start and
              //end points
              else {
                curvedTime = _this2.easingFormulas.spline(
                  normalizedTime,
                  o.startMagnitude,
                  0,
                  1,
                  o.endMagnitude
                );
              }

              //Interpolate the sprite's property based on the curve
              sprite[property] =
                o.endValue * curvedTime + o.startValue * (1 - curvedTime);

              o.frameCounter += 1;
            }

            //When the tween has finished playing, run the end tasks
            else {
              sprite[property] = o.endValue;
              o.end();
            }
          }
        };

        //The `end` method will be called when the tween is finished
        o.end = function () {
          //Set `playing` to `false`
          o.playing = false;

          //Call the tween's `onComplete` method, if it's been assigned
          if (o.onComplete) o.onComplete();

          //Remove the tween from the `tweens` array
          _this2.globalTweens.splice(_this2.globalTweens.indexOf(o), 1);

          //If the tween's `yoyo` property is `true`, create a new tween
          //using the same values, but use the current tween's `startValue`
          //as the next tween's `endValue`
          if (yoyo) {
            _this2.wait(delayBeforeRepeat).then(function () {
              o.start(o.endValue, o.startValue);
            });
          }
        };

        //Pause and play methods
        o.play = function () {
          return (o.playing = true);
        };
        o.pause = function () {
          return (o.playing = false);
        };

        //Return the tween object
        return o;
      },

      //`makeTween` is a general low-level method for making complex tweens
      //out of multiple `tweenProperty` functions. Its one argument,
      //`tweensToAdd` is an array containing multiple `tweenProperty` calls
    },
    {
      key: "makeTween",
      value: function makeTween(tweensToAdd) {
        var _this3 = this;

        //Create an object to manage the tweens
        var o = {};

        //Create a `tweens` array to store the new tweens
        o.tweens = [];

        //Make a new tween for each array
        tweensToAdd.forEach(function (tweenPropertyArguments) {
          //Use the tween property arguments to make a new tween
          var newTween = _this3.tweenProperty.apply(
            _this3,
            _toConsumableArray(tweenPropertyArguments)
          );

          //Push the new tween into this object's internal `tweens` array
          o.tweens.push(newTween);
        });

        //Add a counter to keep track of the
        //number of tweens that have completed their actions
        var completionCounter = 0;

        //`o.completed` will be called each time one of the tweens
        //finishes
        o.completed = function () {
          //Add 1 to the `completionCounter`
          completionCounter += 1;

          //If all tweens have finished, call the user-defined `onComplete`
          //method, if it's been assigned. Reset the `completionCounter`
          if (completionCounter === o.tweens.length) {
            if (o.onComplete) o.onComplete();
            completionCounter = 0;
          }
        };

        //Add `onComplete` methods to all tweens
        o.tweens.forEach(function (tween) {
          tween.onComplete = function () {
            return o.completed();
          };
        });

        //Add pause and play methods to control all the tweens
        o.pause = function () {
          o.tweens.forEach(function (tween) {
            tween.playing = false;
          });
        };
        o.play = function () {
          o.tweens.forEach(function (tween) {
            tween.playing = true;
          });
        };

        //Return the tween object
        return o;
      },

      /* High level tween methods */

      //1. Simple tweens

      //`fadeOut`
    },
    {
      key: "fadeOut",
      value: function fadeOut(sprite) {
        var frames =
          arguments.length <= 1 || arguments[1] === undefined
            ? 60
            : arguments[1];

        return this.tweenProperty(
          sprite,
          "alpha",
          sprite.alpha,
          0,
          frames,
          "sine"
        );
      },

      //`fadeIn`
    },
    {
      key: "fadeIn",
      value: function fadeIn(sprite) {
        var frames =
          arguments.length <= 1 || arguments[1] === undefined
            ? 60
            : arguments[1];

        return this.tweenProperty(
          sprite,
          "alpha",
          sprite.alpha,
          1,
          frames,
          "sine"
        );
      },

      //`pulse`
      //Fades the sprite in and out at a steady rate.
      //Set the `minAlpha` to something greater than 0 if you
      //don't want the sprite to fade away completely
    },
    {
      key: "pulse",
      value: function pulse(sprite) {
        var frames =
          arguments.length <= 1 || arguments[1] === undefined
            ? 60
            : arguments[1];
        var minAlpha =
          arguments.length <= 2 || arguments[2] === undefined
            ? 0
            : arguments[2];

        return this.tweenProperty(
          sprite,
          "alpha",
          sprite.alpha,
          minAlpha,
          frames,
          "smoothstep",
          true
        );
      },

      //2. Complex tweens
    },
    {
      key: "slide",
      value: function slide(sprite, endX, endY) {
        var frames =
          arguments.length <= 3 || arguments[3] === undefined
            ? 60
            : arguments[3];
        var type =
          arguments.length <= 4 || arguments[4] === undefined
            ? "smoothstep"
            : arguments[4];
        var yoyo =
          arguments.length <= 5 || arguments[5] === undefined
            ? false
            : arguments[5];
        var delayBeforeRepeat =
          arguments.length <= 6 || arguments[6] === undefined
            ? 0
            : arguments[6];

        return this.makeTween([
          //Create the x axis tween
          [sprite, "x", sprite.x, endX, frames, type, yoyo, delayBeforeRepeat],

          //Create the y axis tween
          [sprite, "y", sprite.y, endY, frames, type, yoyo, delayBeforeRepeat],
        ]);
      },
    },
    {
      key: "breathe",
      value: function breathe(sprite) {
        var endScaleX =
          arguments.length <= 1 || arguments[1] === undefined
            ? 0.8
            : arguments[1];
        var endScaleY =
          arguments.length <= 2 || arguments[2] === undefined
            ? 0.8
            : arguments[2];
        var frames =
          arguments.length <= 3 || arguments[3] === undefined
            ? 60
            : arguments[3];
        var yoyo =
          arguments.length <= 4 || arguments[4] === undefined
            ? true
            : arguments[4];
        var delayBeforeRepeat =
          arguments.length <= 5 || arguments[5] === undefined
            ? 0
            : arguments[5];

        //Add `scaleX` and `scaleY` properties to Pixi sprites
        this._addScaleProperties(sprite);

        return this.makeTween([
          //Create the scaleX tween
          [
            sprite,
            "scaleX",
            sprite.scaleX,
            endScaleX,
            frames,
            "smoothstepSquared",
            yoyo,
            delayBeforeRepeat,
          ],

          //Create the scaleY tween
          [
            sprite,
            "scaleY",
            sprite.scaleY,
            endScaleY,
            frames,
            "smoothstepSquared",
            yoyo,
            delayBeforeRepeat,
          ],
        ]);
      },
    },
    {
      key: "scale",
      value: function scale(sprite) {
        var endScaleX =
          arguments.length <= 1 || arguments[1] === undefined
            ? 0.5
            : arguments[1];
        var endScaleY =
          arguments.length <= 2 || arguments[2] === undefined
            ? 0.5
            : arguments[2];
        var frames =
          arguments.length <= 3 || arguments[3] === undefined
            ? 60
            : arguments[3];

        //Add `scaleX` and `scaleY` properties to Pixi sprites
        this._addScaleProperties(sprite);

        return this.makeTween([
          //Create the scaleX tween
          [
            sprite,
            "scaleX",
            sprite.scaleX,
            endScaleX,
            frames,
            "smoothstep",
            false,
          ],

          //Create the scaleY tween
          [
            sprite,
            "scaleY",
            sprite.scaleY,
            endScaleY,
            frames,
            "smoothstep",
            false,
          ],
        ]);
      },
    },
    {
      key: "strobe",
      value: function strobe(sprite) {
        var scaleFactor =
          arguments.length <= 1 || arguments[1] === undefined
            ? 1.3
            : arguments[1];
        var startMagnitude =
          arguments.length <= 2 || arguments[2] === undefined
            ? 10
            : arguments[2];
        var endMagnitude =
          arguments.length <= 3 || arguments[3] === undefined
            ? 20
            : arguments[3];
        var frames =
          arguments.length <= 4 || arguments[4] === undefined
            ? 10
            : arguments[4];
        var yoyo =
          arguments.length <= 5 || arguments[5] === undefined
            ? true
            : arguments[5];
        var delayBeforeRepeat =
          arguments.length <= 6 || arguments[6] === undefined
            ? 0
            : arguments[6];

        var bounce = "bounce " + startMagnitude + " " + endMagnitude;

        //Add `scaleX` and `scaleY` properties to Pixi sprites
        this._addScaleProperties(sprite);

        return this.makeTween([
          //Create the scaleX tween
          [
            sprite,
            "scaleX",
            sprite.scaleX,
            scaleFactor,
            frames,
            bounce,
            yoyo,
            delayBeforeRepeat,
          ],

          //Create the scaleY tween
          [
            sprite,
            "scaleY",
            sprite.scaleY,
            scaleFactor,
            frames,
            bounce,
            yoyo,
            delayBeforeRepeat,
          ],
        ]);
      },
    },
    {
      key: "wobble",
      value: function wobble(sprite) {
        var scaleFactorX =
          arguments.length <= 1 || arguments[1] === undefined
            ? 1.2
            : arguments[1];
        var scaleFactorY =
          arguments.length <= 2 || arguments[2] === undefined
            ? 1.2
            : arguments[2];
        var frames =
          arguments.length <= 3 || arguments[3] === undefined
            ? 10
            : arguments[3];
        var xStartMagnitude =
          arguments.length <= 4 || arguments[4] === undefined
            ? 10
            : arguments[4];
        var xEndMagnitude =
          arguments.length <= 5 || arguments[5] === undefined
            ? 10
            : arguments[5];
        var yStartMagnitude =
          arguments.length <= 6 || arguments[6] === undefined
            ? -10
            : arguments[6];
        var yEndMagnitude =
          arguments.length <= 7 || arguments[7] === undefined
            ? -10
            : arguments[7];
        var friction =
          arguments.length <= 8 || arguments[8] === undefined
            ? 0.98
            : arguments[8];

        var _this4 = this;

        var yoyo =
          arguments.length <= 9 || arguments[9] === undefined
            ? true
            : arguments[9];
        var delayBeforeRepeat =
          arguments.length <= 10 || arguments[10] === undefined
            ? 0
            : arguments[10];

        var bounceX = "bounce " + xStartMagnitude + " " + xEndMagnitude;
        var bounceY = "bounce " + yStartMagnitude + " " + yEndMagnitude;

        //Add `scaleX` and `scaleY` properties to Pixi sprites
        this._addScaleProperties(sprite);

        var o = this.makeTween([
          //Create the scaleX tween
          [
            sprite,
            "scaleX",
            sprite.scaleX,
            scaleFactorX,
            frames,
            bounceX,
            yoyo,
            delayBeforeRepeat,
          ],

          //Create the scaleY tween
          [
            sprite,
            "scaleY",
            sprite.scaleY,
            scaleFactorY,
            frames,
            bounceY,
            yoyo,
            delayBeforeRepeat,
          ],
        ]);

        //Add some friction to the `endValue` at the end of each tween
        o.tweens.forEach(function (tween) {
          tween.onComplete = function () {
            //Add friction if the `endValue` is greater than 1
            if (tween.endValue > 1) {
              tween.endValue *= friction;

              //Set the `endValue` to 1 when the effect is finished and
              //remove the tween from the global `tweens` array
              if (tween.endValue <= 1) {
                tween.endValue = 1;
                _this4.removeTween(tween);
              }
            }
          };
        });

        return o;
      },

      //3. Motion path tweens
    },
    {
      key: "followCurve",
      value: function followCurve(sprite, pointsArray, totalFrames) {
        var type =
          arguments.length <= 3 || arguments[3] === undefined
            ? "smoothstep"
            : arguments[3];

        var _this5 = this;

        var yoyo =
          arguments.length <= 4 || arguments[4] === undefined
            ? false
            : arguments[4];
        var delayBeforeRepeat =
          arguments.length <= 5 || arguments[5] === undefined
            ? 0
            : arguments[5];

        //Create the tween object
        var o = {};

        //If the tween is a bounce type (a spline), set the
        //start and end magnitude values
        var typeArray = type.split(" ");
        if (typeArray[0] === "bounce") {
          o.startMagnitude = parseInt(typeArray[1]);
          o.endMagnitude = parseInt(typeArray[2]);
        }

        //Use `tween.start` to make a new tween using the current
        //end point values
        o.start = function (pointsArray) {
          o.playing = true;
          o.totalFrames = totalFrames;
          o.frameCounter = 0;

          //Clone the points array
          o.pointsArray = JSON.parse(JSON.stringify(pointsArray));

          //Add the tween to the `globalTweens` array. The `globalTweens` array is
          //updated on each frame
          _this5.globalTweens.push(o);
        };

        //Call `tween.start` to start the first tween
        o.start(pointsArray);

        //The `update` method will be called on each frame by the game loop.
        //This is what makes the tween move
        o.update = function () {
          var normalizedTime = void 0,
            curvedTime = void 0,
            p = o.pointsArray;

          if (o.playing) {
            //If the elapsed frames are less than the total frames,
            //use the tweening formulas to move the sprite
            if (o.frameCounter < o.totalFrames) {
              //Find the normalized value
              normalizedTime = o.frameCounter / o.totalFrames;

              //Select the correct easing function

              //If it's not a spline, use one of the ordinary tween
              //functions
              if (typeArray[0] !== "bounce") {
                curvedTime = _this5.easingFormulas[type](normalizedTime);
              }

              //If it's a spline, use the `spline` function and apply the
              //2 additional `type` array values as the spline's start and
              //end points
              else {
                //curve = tweenFunction.spline(n, type[1], 0, 1, type[2]);
                curvedTime = _this5.easingFormulas.spline(
                  normalizedTime,
                  o.startMagnitude,
                  0,
                  1,
                  o.endMagnitude
                );
              }

              //Apply the Bezier curve to the sprite's position
              sprite.x = _this5.easingFormulas.cubicBezier(
                curvedTime,
                p[0][0],
                p[1][0],
                p[2][0],
                p[3][0]
              );
              sprite.y = _this5.easingFormulas.cubicBezier(
                curvedTime,
                p[0][1],
                p[1][1],
                p[2][1],
                p[3][1]
              );

              //Add one to the `elapsedFrames`
              o.frameCounter += 1;
            }

            //When the tween has finished playing, run the end tasks
            else {
              //sprite[property] = o.endValue;
              o.end();
            }
          }
        };

        //The `end` method will be called when the tween is finished
        o.end = function () {
          //Set `playing` to `false`
          o.playing = false;

          //Call the tween's `onComplete` method, if it's been
          //assigned
          if (o.onComplete) o.onComplete();

          //Remove the tween from the global `tweens` array
          _this5.globalTweens.splice(_this5.globalTweens.indexOf(o), 1);

          //If the tween's `yoyo` property is `true`, reverse the array and
          //use it to create a new tween
          if (yoyo) {
            _this5.wait(delayBeforeRepeat).then(function () {
              o.pointsArray = o.pointsArray.reverse();
              o.start(o.pointsArray);
            });
          }
        };

        //Pause and play methods
        o.pause = function () {
          o.playing = false;
        };
        o.play = function () {
          o.playing = true;
        };

        //Return the tween object
        return o;
      },
    },
    {
      key: "walkPath",
      value: function walkPath(
        sprite, //The sprite
        originalPathArray //Delay, in milliseconds, between sections
      ) {
        var totalFrames =
          arguments.length <= 2 || arguments[2] === undefined
            ? 300
            : arguments[2];
        var type =
          arguments.length <= 3 || arguments[3] === undefined
            ? "smoothstep"
            : arguments[3];
        var loop =
          arguments.length <= 4 || arguments[4] === undefined
            ? false
            : arguments[4];

        var _this6 = this;

        var yoyo =
          arguments.length <= 5 || arguments[5] === undefined
            ? false
            : arguments[5];
        var delayBetweenSections =
          arguments.length <= 6 || arguments[6] === undefined
            ? 0
            : arguments[6];

        //Clone the path array so that any possible references to sprite
        //properties are converted into ordinary numbers
        var pathArray = JSON.parse(JSON.stringify(originalPathArray));

        //Figure out the duration, in frames, of each path section by
        //dividing the `totalFrames` by the length of the `pathArray`
        var frames = totalFrames / pathArray.length;

        //Set the current point to 0, which will be the first waypoint
        var currentPoint = 0;

        //The `makePath` function creates a single tween between two points and
        //then schedules the next path to be made after it
        var makePath = function makePath(currentPoint) {
          //Use the `makeTween` function to tween the sprite's
          //x and y position
          var tween = _this6.makeTween([
            //Create the x axis tween between the first x value in the
            //current point and the x value in the following point
            [
              sprite,
              "x",
              pathArray[currentPoint][0],
              pathArray[currentPoint + 1][0],
              frames,
              type,
            ],

            //Create the y axis tween in the same way
            [
              sprite,
              "y",
              pathArray[currentPoint][1],
              pathArray[currentPoint + 1][1],
              frames,
              type,
            ],
          ]);

          //When the tween is complete, advance the `currentPoint` by one.
          //Add an optional delay between path segments, and then make the
          //next connecting path
          tween.onComplete = function () {
            //Advance to the next point
            currentPoint += 1;

            //If the sprite hasn't reached the end of the
            //path, tween the sprite to the next point
            if (currentPoint < pathArray.length - 1) {
              _this6.wait(delayBetweenSections).then(function () {
                tween = makePath(currentPoint);
              });
            }

            //If we've reached the end of the path, optionally
            //loop and yoyo it
            else {
              //Reverse the path if `loop` is `true`
              if (loop) {
                //Reverse the array if `yoyo` is `true`
                if (yoyo) pathArray.reverse();

                //Optionally wait before restarting
                _this6.wait(delayBetweenSections).then(function () {
                  //Reset the `currentPoint` to 0 so that we can
                  //restart at the first point
                  currentPoint = 0;

                  //Set the sprite to the first point
                  sprite.x = pathArray[0][0];
                  sprite.y = pathArray[0][1];

                  //Make the first new path
                  tween = makePath(currentPoint);

                  //... and so it continues!
                });
              }
            }
          };

          //Return the path tween to the main function
          return tween;
        };

        //Make the first path using the internal `makePath` function (below)
        var tween = makePath(currentPoint);

        //Pass the tween back to the main program
        return tween;
      },
    },
    {
      key: "walkCurve",
      value: function walkCurve(
        sprite, //The sprite
        pathArray //Delay, in milliseconds, between sections
      ) {
        var totalFrames =
          arguments.length <= 2 || arguments[2] === undefined
            ? 300
            : arguments[2];
        var type =
          arguments.length <= 3 || arguments[3] === undefined
            ? "smoothstep"
            : arguments[3];
        var loop =
          arguments.length <= 4 || arguments[4] === undefined
            ? false
            : arguments[4];

        var _this7 = this;

        var yoyo =
          arguments.length <= 5 || arguments[5] === undefined
            ? false
            : arguments[5];
        var delayBeforeContinue =
          arguments.length <= 6 || arguments[6] === undefined
            ? 0
            : arguments[6];

        //Divide the `totalFrames` into sections for each part of the path
        var frames = totalFrames / pathArray.length;

        //Set the current curve to 0, which will be the first one
        var currentCurve = 0;

        //The `makePath` function
        var makePath = function makePath(currentCurve) {
          //Use the custom `followCurve` function to make
          //a sprite follow a curve
          var tween = _this7.followCurve(
            sprite,
            pathArray[currentCurve],
            frames,
            type
          );

          //When the tween is complete, advance the `currentCurve` by one.
          //Add an optional delay between path segments, and then make the
          //next path
          tween.onComplete = function () {
            currentCurve += 1;
            if (currentCurve < pathArray.length) {
              _this7.wait(delayBeforeContinue).then(function () {
                tween = makePath(currentCurve);
              });
            }

            //If we've reached the end of the path, optionally
            //loop and reverse it
            else {
              if (loop) {
                if (yoyo) {
                  //Reverse order of the curves in the `pathArray`
                  pathArray.reverse();

                  //Reverse the order of the points in each curve
                  pathArray.forEach(function (curveArray) {
                    return curveArray.reverse();
                  });
                }

                //After an optional delay, reset the sprite to the
                //beginning of the path and make the next new path
                _this7.wait(delayBeforeContinue).then(function () {
                  currentCurve = 0;
                  sprite.x = pathArray[0][0];
                  sprite.y = pathArray[0][1];
                  tween = makePath(currentCurve);
                });
              }
            }
          };

          //Return the path tween to the main function
          return tween;
        };

        //Make the first path
        var tween = makePath(currentCurve);

        //Pass the tween back to the main program
        return tween;
      },

      //4. Utilities
    },
    {
      key: "wait",
      value: function wait() {
        var duration =
          arguments.length <= 0 || arguments[0] === undefined
            ? 0
            : arguments[0];

        return new Promise(function (resolve, reject) {
          setTimeout(resolve, duration);
        });
      },

      //A utility to remove tweens from the game
    },
    {
      key: "removeTween",
      value: function removeTween(tweenObject) {
        var _this8 = this;

        //Remove the tween if `tweenObject` doesn't have any nested
        //tween objects
        if (!tweenObject.tweens) {
          tweenObject.pause();
          this.globalTweens.splice(this.globalTweens.indexOf(tweenObject), 1);

          //Otherwise, remove the nested tween objects
        } else {
          tweenObject.pause();
          tweenObject.tweens.forEach(function (element) {
            _this8.globalTweens.splice(_this8.globalTweens.indexOf(element), 1);
          });
        }
      },
    },
    {
      key: "update",
      value: function update() {
        //Update all the tween objects in the `globalTweens` array
        if (this.globalTweens.length > 0) {
          for (var i = this.globalTweens.length - 1; i >= 0; i--) {
            var tween = this.globalTweens[i];
            if (tween) tween.update();
          }
        }
      },
    },
  ]);

  return Charm;
})();

/*
Copyright (c) 2013 Marian Euent

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
@param {Object} object: Any object you want to tween. For example: PIXI.Sprite
@param {String} property: the property which needs to be changed. Use "property.property.property..." if the property is little deeper. Pass "" to create a Wait-Tween
@param {float} value: targetValue of tweening
@param {int} frames: duration of the tween in frames.
@param {boolean} autostart: starting when created? Set to false if you use it with ChainedTween

use examples:
new Tween(sprite, "position.x", 100, 60, true);
new Tween(sprite.position, "x", 100, 60, true);

*/
function Tween(object, property, value, frames, autostart) {
  this.object = object;

  var properties = property.split(".");
  this.property = properties[properties.length - 1];
  for (var i = 0; i < properties.length - 1; i++) {
    this.object = this.object[properties[i]];
  }

  this.targetValue = value;
  this.startValue;
  this.active = autostart;
  this.currentFrame = 0;
  this.endFrame = frames;
  this.onComplete;
  this.onCompleteParams;
  this.easing = Tween.noEase;

  Tween.tweens.push(this);
}

Tween.prototype.setOnComplete = function (callback, parameters) {
  this.onComplete = callback;
  this.onCompleteParams = parameters;
};

Tween.prototype.start = function () {
  this.active = true;
};

Tween.prototype.initIterations = function () {
  if (this.property != "") {
    this.startValue = this.object[this.property];
    this.targetValue = this.targetValue - this.object[this.property];
  }
};

Tween.prototype.update = function () {
  if (!this.active) {
    return false;
  }
  if (this.currentFrame == 0) {
    this.initIterations();
  }
  this.currentFrame++;
  if (this.currentFrame <= this.endFrame) {
    if (this.property != "") {
      var oldValue = this.object[this.property];
      var newValue = this.easing(
        this.currentFrame,
        this.startValue,
        this.targetValue,
        this.endFrame
      );
      this.object[this.property] = newValue;
    }
    return false;
  } else {
    this.active = false;
    if (this.onComplete != null) {
      this.onComplete(this.onCompleteParams);
    }
    return true;
  }
};

Tween.tweens = [];
// Call this every Frame of your Game/Application to keep the tweens running.
Tween.runTweens = function () {
  for (var i = 0; i < Tween.tweens.length; i++) {
    var tween = Tween.tweens[i];
    if (tween.update()) {
      var index = Tween.tweens.indexOf(tween);
      if (index != -1) {
        Tween.tweens.splice(index, 1);
      }
      i--;
    }
  }
};

// EASING
// use example:
// var tween = new Tween(sprite, "alpha", 0, 60, true);
// tween.easing = Tween.outElastic;

Tween.noEase = function (t, b, c, d) {
  t /= d;
  return b + c * t;
};

Tween.outElastic = function (t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (33 * tc * ts + -106 * ts * ts + 126 * tc + -67 * ts + 15 * t);
};

Tween.inElastic = function (t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (56 * tc * ts + -105 * ts * ts + 60 * tc + -10 * ts);
};

Tween.inOutQuintic = function (t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

Tween.inQuintic = function (t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc * ts);
};

Tween.outQuintic = function (t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
};

Tween.inCubic = function (t, b, c, d) {
  var tc = (t /= d) * t * t;
  return b + c * tc;
};

Tween.inOutCubic = function (t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (-2 * tc + 3 * ts);
};

Tween.outCubic = function (t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
};

// CHAINED TWEEN

/*
@param {Array} tweens: Array of Tweens.

example:
var tween1 = new Tween(sprite, "position.x", 100, 60, false);
var tween2 = new Tween(sprite, "position.x", 0, 60, false);
new ChainedTween([tween1, tween2]);
*/
function ChainedTween(tweens) {
  this.tweens = tweens;
  Tween.tweens.push(this);
}

ChainedTween.prototype.update = function () {
  if (this.tweens.length == 0) {
    return true;
  }
  var currentTween = this.tweens[0];
  if (!currentTween.active) {
    currentTween.start();
  }
  var finished = currentTween.update();
  if (finished) {
    this.tweens.splice(0, 1);
  }
  return false;
};

// TODO: COMBINED TWEEN
function CombinedTween(tweens) {}

CombinedTween.prototype.start = function () {};

CombinedTween.prototype.update = function () {};

// Main part
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
PIXI.utils._saidHello = true;
// initialization
var names = {
  14: ["TUR", "Turkey"],
  3: ["ITA", "Italy"],
  11: ["WAL", "Wales"],
  19: ["SWZ", "Switzerland"],
  12: ["DNK", "Denmark"],
  21: ["FIN", "Finland"],
  4: ["BEL", "Belgium"],
  9: ["RUS", "Russia"],
  17: ["NLD", "Netherlands"],
  20: ["UKR", "Ukraine"],
  8: ["AUS", "Austria"],
  24: ["MKD", "North Macedonia"],
  1: ["ENG", "England"],
  13: ["CRO", "Croatia"],
  22: ["SCT", "Scotland"],
  18: ["CZR", "C. Republic"],
  6: ["SPA", "Spain"],
  15: ["SWE", "Sweden"],
  16: ["POL", "Poland"],
  23: ["SLO", "Slovakia"],
  10: ["HUN", "Hungary"],
  7: ["POR", "Portugal"],
  2: ["FRA", "France"],
  5: ["GER", "Germany"],
};
var messages = {
  winner: "CONGRATULATIONS!",
  loser:
    "NO LUCK THIS TIME,\nCOME BACK AGAIN TO TRY TO\n WIN ONE OF OUR GREAT PRIZES",
  top_winner: "YOU HAVE WON",
  title_text: "CHOOSE A TEAM TO START!",
  play: "PLAY AGAIN",
  init_message: "",
  your_turn_to_kick: "your_turn_to_kick",
  your_turn_to_save: "your_turn_to_save",
};
var timers = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];

var lg = new URL(document.URL).searchParams.get("lang") || "en";

var stage = new PIXI.Container();
var c = new Charm(PIXI);
var loader = PIXI.loader;
var resources = PIXI.loader.resources;
var prfx = "./euro2016_penalty/";

var CANSAS_WIDTH = 570;
var CANVAS_HEIGHT = 720;

// Containers/Sprites
var renderer = PIXI.autoDetectRenderer(CANSAS_WIDTH, CANVAS_HEIGHT, {
  backgroundColor: 0x242424,
});
var background_container = new PIXI.Container();
var container_flashes = new PIXI.Container();
var container_logos = new PIXI.Container();
var background;
// Scenes
var scene1;
var scene2;
var scene3;
var scene4;

loader
  .add(prfx + "backgroundfull.png")
  .add(prfx + "flash.png")
  .add(prfx + "sky.jpg")
  .add(prfx + "container_box.png")
  .add(prfx + "logo.png")
  .add(prfx + "arrow_left.png")
  .add(prfx + "arrow_right.png")
  .add(prfx + "football.png")
  .add(prfx + "gloves.png")
  .add(prfx + "gloves2.png")
  .add(prfx + "container_goal.png")
  .add(prfx + "container_score.png")
  .add(prfx + "football2.png")
  .add(prfx + "arco.png")
  .add(prfx + "arco-0-0.png")
  .add(prfx + "arco-1-0.png")
  .add(prfx + "arco-2-0.png")
  .add(prfx + "arco-0-1.png")
  .add(prfx + "arco-1-1.png")
  .add(prfx + "arco-2-1.png")
  .add(prfx + "player_icon.png")
  .add(prfx + "empty_score.png")
  .add(prfx + "good_score.png")
  .add(prfx + "bad_score.png")
  .add(prfx + "selected_score.png")
  .add(prfx + "messages/goal_" + lg + ".png")
  .add(prfx + "messages/goal_auto_" + lg + ".png")
  .add(prfx + "messages/missed_" + lg + ".png")
  .add(prfx + "messages/saved_" + lg + ".png")
  .add(prfx + "white_mark.png")
  .add(prfx + "small_logo.png")
  .add(prfx + "messages/congrats_" + lg + ".png")
  .add(prfx + "messages/try_again_" + lg + ".png")
  .add(prfx + "messages/voucher_10_" + lg + ".png")
  .add(prfx + "messages/voucher_15_" + lg + ".png")
  .add(prfx + "messages/voucher_25_" + lg + ".png")
  .add(prfx + "messages/voucher_50_" + lg + ".png")
  .add(prfx + "messages/voucher_100_" + lg + ".png")
  .add(prfx + "messages/voucher_250_" + lg + ".png")
  .add(prfx + "messages/fifa_21_ps5.png")
  .add(prfx + "messages/fifa_21_xbox.png")
  .add(prfx + "messages/iphone.png")
  .add(prfx + "messages/ps5.png")
  .add(prfx + "messages/samsung_galaxy.png")
  .add(prfx + "messages/xbox_series_s.png")
  .add(prfx + "red_card.png")
  .add(prfx + "flags/1.png")
  .add(prfx + "flags/2.png")
  .add(prfx + "flags/3.png")
  .add(prfx + "flags/4.png")
  .add(prfx + "flags/5.png")
  .add(prfx + "flags/6.png")
  .add(prfx + "flags/7.png")
  .add(prfx + "flags/8.png")
  .add(prfx + "flags/9.png")
  .add(prfx + "flags/10.png")
  .add(prfx + "flags/11.png")
  .add(prfx + "flags/12.png")
  .add(prfx + "flags/13.png")
  .add(prfx + "flags/14.png")
  .add(prfx + "flags/15.png")
  .add(prfx + "flags/16.png")
  .add(prfx + "flags/17.png")
  .add(prfx + "flags/18.png")
  .add(prfx + "flags/19.png")
  .add(prfx + "flags/20.png")
  .add(prfx + "flags/21.png")
  .add(prfx + "flags/22.png")
  .add(prfx + "flags/23.png")
  .add(prfx + "flags/24.png")
  .add(prfx + "play.png")
  .load(getTranslations);

var gja = [];
var gjp = [];
var won = "";

function initGame(data) {
  var response = {
    success: true,
    sprites: {
      1: "WzEsMCwwLDEsMF0=", // [1,0,0,1,0]
      2: "WzEsMSwwLDEsMF0=", // [1,1,0,1,0]
      t: "InZvdWNoZXJfMTBfZW4i",
    },
  };

  if (!response.success) {
    scene2.clearScene();
    scene3.clearScene(response.message);
  } else {
    gjp = JSON.parse(atob(response.sprites[1])); // player
    gja = JSON.parse(atob(response.sprites[2])); // computer
    won = JSON.parse(atob(response.sprites["t"]));
  }
}

function getTranslations() {
  setup();
}

function setup() {
  var sky = new PIXI.Sprite(resources[prfx + "sky.jpg"].texture);
  var flash = new PIXI.Sprite(resources[prfx + "flash.png"].texture);
  background = new PIXI.Sprite(resources[prfx + "backgroundfull.png"].texture);

  // create a renderer instance.
  renderer.original_width = renderer.width;
  renderer.original_height = renderer.height;

  // add the renderer view element to the DOM
  document.getElementById("container_shoot").appendChild(renderer.view);

  window.addEventListener("resize", resize);
  stage.transition_rate = 60;

  background.anchor.x = 0;
  background.anchor.y = 0;
  background.position.x = 0;
  background.position.y = 212;

  flash.anchor.x = 0;
  flash.anchor.y = 0;

  container_flashes.position.x = 0;
  container_flashes.position.y = 212;

  container_logos.position.x = -1 * CANSAS_WIDTH;
  container_logos.position.y = 378;

  flash.position.x = CANVAS_HEIGHT;
  flash.position.y = 200;

  sky.anchor.x = 0;
  sky.anchor.y = 0;
  sky.position.x = 0;
  sky.position.y = 0;
  c.slide(sky, -900, sky.position.y, 3500, "linear", true);

  background_container.position.x = 0;
  background_container.position.y = -170;

  createFlashes();

  background_container.addChild(sky);

  background_container.addChild(background);
  background_container.addChild(container_logos);
  background_container.addChild(container_flashes);

  stage.addChild(background_container);
  scene3 = new Scene3(stage, renderer, background_container);
  scene2 = new Scene2(stage, renderer, scene3, background_container);
  scene1 = new Scene1(stage, renderer, scene2);
  scene4 = new Scene4(stage, renderer, background_container);

  scene1.startScene();

  resize();

  document.getElementById("overlay_game").style.display = "none";

  renderImage();
}

function renderImage() {
  requestAnimationFrame(renderImage);
  Tween.runTweens();
  c.update();

  renderer.render(stage);
}

function resize() {
  var height_new;
  var width_new;
  var ratio2 = window.devicePixelRatio || 1;
  var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  var height = window.innerHeight > 0 ? window.innerHeight : screen.height;
  var w = width * ratio2;
  var h = height * ratio2;
  var orientation = w / h;
  var clientHeight = window.document.documentElement.clientHeight;
  var clientWidth = window.document.documentElement.clientWidth;

  if (orientation >= 1) {
    renderer.resize(CANVAS_HEIGHT, CANSAS_WIDTH);
    height_new =
      clientHeight < (clientWidth / CANVAS_HEIGHT) * CANSAS_WIDTH
        ? clientHeight < CANSAS_WIDTH
          ? clientHeight
          : CANSAS_WIDTH
        : clientWidth < CANVAS_HEIGHT
        ? (clientWidth / CANVAS_HEIGHT) * CANSAS_WIDTH
        : CANSAS_WIDTH;
    width_new =
      clientHeight < (clientWidth / CANVAS_HEIGHT) * CANSAS_WIDTH
        ? clientHeight < CANSAS_WIDTH
          ? (clientHeight / CANSAS_WIDTH) * CANVAS_HEIGHT
          : CANVAS_HEIGHT
        : clientWidth < CANVAS_HEIGHT
        ? clientWidth
        : CANVAS_HEIGHT;

    document.getElementsByTagName("canvas")[0].style.top =
      (clientHeight <
      (clientWidth < CANVAS_HEIGHT
        ? (clientWidth / CANVAS_HEIGHT) * CANSAS_WIDTH
        : CANSAS_WIDTH)
        ? 0
        : (clientHeight -
            (clientWidth < CANVAS_HEIGHT
              ? (clientWidth / CANVAS_HEIGHT) * CANSAS_WIDTH
              : CANSAS_WIDTH)) /
          2) + "px";
    background.position.y = 212;

    container_flashes.position.y = 212;

    container_logos.position.y = 378;

    renderer.original_width = CANVAS_HEIGHT;
    renderer.original_height = CANSAS_WIDTH;
  } else {
    renderer.resize(CANSAS_WIDTH, CANVAS_HEIGHT);
    height_new =
      clientHeight < (clientWidth / CANSAS_WIDTH) * CANVAS_HEIGHT
        ? clientHeight < CANVAS_HEIGHT
          ? clientHeight
          : CANVAS_HEIGHT
        : clientWidth < CANSAS_WIDTH
        ? (clientWidth / CANSAS_WIDTH) * CANVAS_HEIGHT
        : CANVAS_HEIGHT;
    width_new =
      clientHeight < (clientWidth / CANSAS_WIDTH) * CANVAS_HEIGHT
        ? clientHeight < CANVAS_HEIGHT
          ? (clientHeight / CANVAS_HEIGHT) * CANSAS_WIDTH
          : CANSAS_WIDTH
        : clientWidth < CANSAS_WIDTH
        ? clientWidth
        : CANSAS_WIDTH;

    document.getElementsByTagName("canvas")[0].style.top =
      (clientHeight <
      (clientWidth < CANSAS_WIDTH
        ? (clientWidth / CANSAS_WIDTH) * CANVAS_HEIGHT
        : CANVAS_HEIGHT)
        ? 0
        : (clientHeight -
            (clientWidth < CANSAS_WIDTH
              ? (clientWidth / CANSAS_WIDTH) * CANVAS_HEIGHT
              : CANVAS_HEIGHT)) /
          2) + "px";
    background.position.y = 340;

    container_flashes.position.y = 340;

    container_logos.position.y = 505;

    renderer.original_width = CANSAS_WIDTH;
    renderer.original_height = CANVAS_HEIGHT;
  }

  document.getElementsByTagName("canvas")[0].style.height = height_new + "px";
  document.getElementsByTagName("canvas")[0].style.width = width_new + "px";
  document.getElementById("container_shoot").style.width = width_new + "px";

  scene3.repositionElements(orientation);
  scene2.repositionElements(orientation);
  scene1.repositionElements(orientation);
  scene4.repositionElements(orientation);
}

function createFlashes() {
  var flash_temp;
  var temp_size;
  var frames;
  for (var i = 0; i < 21; i++) {
    flash_temp = new PIXI.Sprite(resources[prfx + "flash.png"].texture);
    flash_temp.anchor.x = 0.5;
    flash_temp.anchor.y = 0.5;
    temp_size = Math.floor(Math.random() * 60) + 20;
    flash_temp.width = temp_size;
    flash_temp.height = temp_size;
    flash_temp.position.x = Math.floor(Math.random() * 2160) + 20;
    flash_temp.position.y = Math.floor(Math.random() * 150) + 20;
    frames = Math.floor(Math.random() * 8) + 6;
    c.pulse(flash_temp, frames);
    container_flashes.addChild(flash_temp);
  }
}

function animateLogo(param, i) {
  if (timers[i] == 0) {
    setTimeout(function () {
      param.visible = true;
      timers[i] = 1;
    }, 2000);
  } else {
    setTimeout(function () {
      param.visible = false;
      timers[i] = 0;
    }, 2000);
  }
  requestAnimationFrame(function () {
    animateLogo(param, i);
  });
}

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
var sub_container_flags = new PIXI.Container();
var sub_container_flags2 = new PIXI.Container();
var container_1;
var logo;
var left_arrow;
var right_arrow;
var flags = [];
var text_temp;
var text_play;
var ARROW_SIZE = 40;

var text_init = new PIXI.Text(messages["init_message"], {
  font: "19px DIN",
  fill: "white",
  align: "center",
});

function Scene1(stage, renderer, next_scene) {
  // Initialize sprites 1
  container_1 = new PIXI.Sprite(resources[prfx + "container_box.png"].texture);
  logo = new PIXI.Sprite(resources[prfx + "logo.png"].texture);
  left_arrow = new PIXI.Sprite(resources[prfx + "arrow_left.png"].texture);
  right_arrow = new PIXI.Sprite(resources[prfx + "arrow_right.png"].texture);

  out_next_scene1 = next_scene;
  outstage = stage;
  outrenderer = renderer;

  logo.anchor.x = 0.5;
  logo.anchor.y = 0.5;
  logo.height = 250;
  logo.width = 250;
  logo.position.x = outrenderer.original_width / 2;
  logo.position.y = 66;

  var positionx = 0;
  var flag;
  for (var i = 0; i < 24; i++) {
    flag = new PIXI.Sprite(
      resources[prfx + "flags/" + (i + 1) + ".png"].texture
    );
    flags.push(flag);
  }

  container_1.position.x = 0;
  container_1.position.y = 0;
  container_1.height = 420;
  container_1.width = 440;
  container_flags.addChild(container_1);

  text_temp = new PIXI.Text(messages["title_text"], {
    font: "19px DIN",
    fill: "white",
    align: "center",
  });
  text_temp.anchor.x = 0.5;
  text_temp.anchor.y = 0.5;
  text_temp.position.x = container_1.width / 2 + 10;
  text_temp.position.y = 60 + 420;
  container_flags.addChild(text_temp);
  container_flags.position.x = outrenderer.original_width / 2 - 420 / 2;
  container_flags.position.y = outrenderer.original_height / 2 - 210;
  sub_container_flags.position.x = 125;
  sub_container_flags.position.y = 30 + 420;
  var row = 1;
  var col = 1;
  var name_flag;
  var flag_mini_container;

  for (var i = 0; i < 12; i++) {
    name_flag = new PIXI.Text(names[i + 1][0], {
      font: "bold 16px DIN",
      fill: "white",
      align: "center",
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
  sub_container_flags2.position.x = 460;
  sub_container_flags2.position.y = 450;
  row = 1;
  col = 1;
  positionx = 0;
  for (var i = 12; i < 24; i++) {
    name_flag = new PIXI.Text(names[i + 1][0], {
      font: "bold 16px DIN",
      fill: "white",
      align: "center",
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
  left_arrow.width = ARROW_SIZE;
  left_arrow.height = ARROW_SIZE;
  left_arrow.position.x = 50;
  left_arrow.position.y = 195 + 420;
  left_arrow.interactive = true;
  left_arrow.buttonMode = true;
  left_arrow.defaultCursor = "pointer";
  left_arrow.mouseup = left_arrow.touchend = function () {
    if (page_flags == 2) {
      new Tween(
        sub_container_flags,
        "position.x",
        sub_container_flags.position.x + 420,
        25,
        true
      );
      new Tween(
        sub_container_flags2,
        "position.x",
        sub_container_flags2.position.x + 305,
        25,
        true
      );
      page_flags = 1;
      onArrowFlagsChange(page_flags);
    }
  };
  left_arrow.mouseover = function () {
    this.width = 45;
    this.height = 45;
  };
  left_arrow.mouseout = function () {
    this.width = ARROW_SIZE;
    this.height = ARROW_SIZE;
  };

  right_arrow.anchor.x = 0.5;
  right_arrow.anchor.y = 0.5;
  right_arrow.width = ARROW_SIZE;
  right_arrow.height = ARROW_SIZE;
  right_arrow.position.x = 390;
  right_arrow.position.y = 195 + 420;
  right_arrow.interactive = true;
  right_arrow.buttonMode = true;
  right_arrow.defaultCursor = "pointer";
  right_arrow.mouseup = right_arrow.touchend = function () {
    if (page_flags == 1) {
      new Tween(
        sub_container_flags,
        "position.x",
        sub_container_flags.position.x - 420,
        25,
        true
      );
      new Tween(
        sub_container_flags2,
        "position.x",
        sub_container_flags2.position.x - 305,
        25,
        true
      );
      page_flags = 2;
      onArrowFlagsChange(page_flags);
    }
  };

  right_arrow.mouseover = function () {
    this.width = 45;
    this.height = 45;
  };
  right_arrow.mouseout = function () {
    this.width = ARROW_SIZE;
    this.height = ARROW_SIZE;
  };
  right_arrow.mask = mask_menu;
  left_arrow.mask = mask_menu;
  text_temp.mask = mask_menu;

  onArrowFlagsChange(page_flags);

  container_flags.addChild(sub_container_flags);
  container_flags.addChild(sub_container_flags2);
  container_flags.addChild(mask_menu);
  container_flags.addChild(left_arrow);
  container_flags.addChild(right_arrow);

  moveToFlags();

  text_init.anchor.x = 0.5;
  text_init.anchor.y = 0.5;
  text_init.position.x = container_1.width / 2;
  text_init.position.y = 60;
  container_flags.addChild(text_init);

  outstage.addChild(container_flags);
  outstage.addChild(logo);
}

Scene1.prototype.startScene = function () {
  active1 = 1;
};

Scene1.prototype.clearScene = function (idflag) {
  var rand_number;
  var cont_tween = new Tween(
    container_flags,
    "position.x",
    container_flags.position.x - outrenderer.original_width,
    outstage.transition_rate,
    true
  );
  cont_tween.setOnComplete(function (param) {
    param.visible = false;
  }, container_flags);
  new Tween(
    logo,
    "position.x",
    logo.position.x - outrenderer.original_width,
    outstage.transition_rate,
    true
  );
  flags.splice(idflag - 1, 1);
  do {
    rand_number = Math.floor(Math.random() * flags.length);
  } while (
    rand_number == 0 ||
    rand_number >= flags.length ||
    typeof flags[rand_number] == "undefined"
  );
  var random_flag = flags[rand_number];

  out_next_scene1.startScene(idflag, random_flag.idflag);
  active1 = 0;
};

Scene1.prototype.repositionElements = function (orientation) {
  if (active1 === 0) {
    container_flags.position.x =
      container_flags.position.x - outrenderer.original_width;
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
    if (active1 === 1) {
      container_flags.position.x = outrenderer.original_width / 2 - 420 / 2;
    }

    container_flags.position.y = 220;
  }
};
Scene1.prototype.isActive = function () {
  return active1 === 1 ? true : false;
};
var yspeed_init = 0.6;

function onArrowFlagsChange(tramp) {
  if (tramp === 1) {
    left_arrow.visible = false;

    right_arrow.visible = true;
  } else {
    right_arrow.visible = false;

    left_arrow.visible = true;
  }
}

function moveToFlags() {
  c.slide(
    text_temp,
    text_temp.position.x,
    text_temp.position.y - 420,
    outstage.transition_rate,
    "smoothstep"
  );
  c.slide(
    text_init,
    text_init.position.x,
    text_init.position.y - 420,
    outstage.transition_rate,
    "smoothstep"
  );
  c.slide(
    sub_container_flags,
    sub_container_flags.position.x,
    sub_container_flags.position.y - 420,
    outstage.transition_rate,
    "smoothstep"
  );
  c.slide(
    sub_container_flags2,
    sub_container_flags2.position.x,
    sub_container_flags2.position.y - 420,
    outstage.transition_rate,
    "smoothstep"
  );
  c.slide(
    left_arrow,
    left_arrow.position.x,
    left_arrow.position.y - 420,
    outstage.transition_rate,
    "smoothstep"
  );
  c.slide(
    right_arrow,
    right_arrow.position.x,
    right_arrow.position.y - 420,
    outstage.transition_rate,
    "smoothstep"
  );
}

/**
 * JS code for the stage 2
 */
var out_next_scene2;
var outbackground;
var current_turn = 0;
var active2 = 0;
var active_score_2 = 0;
var positionYBaseArco = 0;
var count = 0;
var container_goal_ball = new PIXI.Container();
var container_score = new PIXI.Container();
var container_icon = new PIXI.Container();
var scene_call = 0;

var teams_selected = "";

// You turn to kick
var ball = new PIXI.Sprite(resources[prfx + "football2.png"].texture);
var gloves;
var white_mark;
var arco;
var arco1;
var arco2;
var arco3;
var arco4;
var arco5;
var arco6;
var container;
var containerscore;
var arcos;
var blurFilter1 = new PIXI.filters.BlurFilter();
var playerIcon;
var textTeam1;
var textTeam2;
var message = new PIXI.Sprite();
var selected_flag = new PIXI.Sprite();
var random_flag_sprite = new PIXI.Sprite();

var numbers_random = [1, 2, 3, 4, 5, 6];
var score_sprites = [];
var score_sprites_auto = [];

var number_clicks_goal = 0;
var number_clicks_glove = 0;
var current_turn_sum = 0;
var sum_score_player = 0;
var sum_score_auto = 0;

function Scene2(stage, renderer, next_scene, background) {
  // Initialize sprites 2
  gloves = new PIXI.Sprite(resources[prfx + "gloves.png"].texture);
  white_mark = new PIXI.Sprite(resources[prfx + "white_mark.png"].texture);
  arco = new PIXI.Sprite(resources[prfx + "arco.png"].texture);
  arco1 = new PIXI.Sprite(resources[prfx + "arco-0-0.png"].texture);
  arco2 = new PIXI.Sprite(resources[prfx + "arco-1-0.png"].texture);
  arco3 = new PIXI.Sprite(resources[prfx + "arco-2-0.png"].texture);
  arco4 = new PIXI.Sprite(resources[prfx + "arco-0-1.png"].texture);
  arco5 = new PIXI.Sprite(resources[prfx + "arco-1-1.png"].texture);
  arco6 = new PIXI.Sprite(resources[prfx + "arco-2-1.png"].texture);
  container = new PIXI.Sprite(resources[prfx + "container_goal.png"].texture);
  container.visible = false;
  containerscore = new PIXI.Sprite(
    resources[prfx + "container_score.png"].texture
  );
  playerIcon = new PIXI.Sprite(resources[prfx + "player_icon.png"].texture);

  textTeam1;
  textTeam2;
  message = new PIXI.Sprite();
  selected_flag = new PIXI.Sprite();
  random_flag_sprite = new PIXI.Sprite();
  arcos = [arco1, arco2, arco3, arco4, arco5, arco6];

  outstage = stage;
  outrenderer = renderer;
  out_next_scene2 = next_scene;
  outbackground = background;

  container_goal_ball.position.x =
    outrenderer.original_width + (outrenderer.original_width / 2 - 240);
  container_goal_ball.position.y = 0;

  container.position.x = 0;
  container.position.y = 0;
  container_goal_ball.addChild(container);

  positionYBaseArco = 250;
  arco2.position.x = 240;
  arco2.position.y = positionYBaseArco - 84;

  // center the sprites anchor point
  ball.anchor.x = 0.5;
  ball.anchor.y = 0.5;

  arco1.position.x = arco2.position.x - 140;
  arco1.position.y = positionYBaseArco - 84;

  arco3.position.x = arco2.position.x + 140;
  arco3.position.y = positionYBaseArco - 84;

  arco4.position.x = arco2.position.x - 140;
  arco4.position.y = positionYBaseArco;

  arco5.position.x = arco2.position.x;
  arco5.position.y = positionYBaseArco;

  arco6.position.x = arco2.position.x + 140;
  arco6.position.y = positionYBaseArco;

  //Add goals to array in order to bind a click function to them
  var elasticTween;
  var elasticTweenAuto;
  var current_click;
  var current_auto;
  var empty_score;
  var current_result;

  // Top scorebaord
  containerscore.anchor.x = 0.5;
  containerscore.anchor.y = 0.5;
  containerscore.position.x = 200;
  containerscore.position.y = 41;
  containerscore.width = 500;
  containerscore.height = 92;
  container_score.position.x =
    outrenderer.original_width + (outrenderer.original_width / 2 - 200);
  container_score.position.y = 0;

  container_score.addChild(containerscore);

  // Combinations
  var score_goal = [-1, -1, -1, -1, -1];
  var score_goal_auto = [-1, -1, -1, -1, -1];

  for (var i = 0; i < score_goal.length; i++) {
    if (i !== 0)
      empty_score = new PIXI.Sprite(
        resources[prfx + "empty_score.png"].texture
      );
    else
      empty_score = new PIXI.Sprite(
        resources[prfx + "selected_score.png"].texture
      );
    empty_score.anchor.x = 0.5;
    empty_score.anchor.y = 0.5;
    empty_score.width = 22;
    empty_score.height = 22;
    empty_score.position.x = i * 22 + 12;

    empty_score.position.y = 70;

    score_sprites.push(empty_score);
    container_score.addChild(empty_score);

    // Add the other one for the computer score
    empty_score = new PIXI.Sprite(resources[prfx + "empty_score.png"].texture);
    empty_score.anchor.x = 0.5;
    empty_score.anchor.y = 0.5;
    empty_score.width = 22;
    empty_score.height = 22;
    empty_score.position.x = 200 + 78 + (i * 22 + 12);

    empty_score.position.y = 70;

    score_sprites_auto.push(empty_score);
    container_score.addChild(empty_score);
  }
  outstage.addChild(container_score);
  for (var i = 0; i < arcos.length; i++) {
    arcos[i].anchor.x = 0.5;
    arcos[i].anchor.y = 0.5;
    arcos[i].interactive = true;
    arcos[i].buttonMode = true;
    arcos[i].defaultCursor = "pointer";
    arcos[i].mousedown = arcos[i].touchstart = function () {
      if (this.interactive == false) return;
      container_icon.visible = false;
      turnInteractiveOnOff(false);

      var item =
        numbers_random[Math.floor(Math.random() * numbers_random.length)];

      if (current_turn == 0) {
        var pr = gjp[number_clicks_goal];

        if (pr == 1) {
          do {
            item =
              numbers_random[Math.floor(Math.random() * numbers_random.length)];
          } while (
            arcos[item - 1].position.x == this.position.x &&
            arcos[item - 1].position.y == this.position.y
          );
        } else if (pr == 0) {
          do {
            item =
              numbers_random[Math.floor(Math.random() * numbers_random.length)];
          } while (
            arcos[item - 1].position.x != this.position.x ||
            arcos[item - 1].position.y != this.position.y
          );
        }

        current_click = ball;
        current_auto = gloves;
        if (
          this.position.x == arcos[item - 1].position.x &&
          this.position.y == arcos[item - 1].position.y
        ) {
          current_result = 0;
          score_sprites[number_clicks_goal].texture =
            resources[prfx + "bad_score.png"].texture;
        } else {
          current_result = 1;
          score_sprites[number_clicks_goal].texture =
            resources[prfx + "good_score.png"].texture;
          sum_score_player += 1;
        }
        score_goal[number_clicks_goal] = current_result;
        number_clicks_goal += 1;
        current_turn = 1;
      } else {
        var pr2 = gja[number_clicks_glove];

        if (pr2 == 1) {
          do {
            item =
              numbers_random[Math.floor(Math.random() * numbers_random.length)];
          } while (
            arcos[item - 1].position.x == this.position.x &&
            arcos[item - 1].position.y == this.position.y
          );
        } else if (pr2 == 0) {
          do {
            item =
              numbers_random[Math.floor(Math.random() * numbers_random.length)];
          } while (
            arcos[item - 1].position.x != this.position.x ||
            arcos[item - 1].position.y != this.position.y
          );
        }

        current_click = gloves;
        current_auto = ball;

        if (
          this.position.x == arcos[item - 1].position.x &&
          this.position.y == arcos[item - 1].position.y
        ) {
          current_result = 0;
          score_sprites_auto[number_clicks_glove].texture =
            resources[prfx + "bad_score.png"].texture;
        } else {
          current_result = 1;
          score_sprites_auto[number_clicks_glove].texture =
            resources[prfx + "good_score.png"].texture;
          sum_score_auto += 1;
        }

        score_goal_auto[number_clicks_glove] = current_result;
        number_clicks_glove += 1;
        current_turn = 0;
      }

      requestAnimationFrame(frameBall);
      elasticTween = c.slide(
        current_click,
        this.position.x,
        this.position.y,
        25,
        "inverseSineSquared"
      );
      c.scale(ball, 0.7, 0.7, 25);
      elasticTweenAuto = c.slide(
        current_auto,
        arcos[item - 1].position.x,
        arcos[item - 1].position.y,
        25,
        "inverseSineSquared"
      );
      elasticTween.onComplete = function () {
        onTweenCompleteBall(ball);
      };
      elasticTweenAuto.onComplete = function () {
        displayMessage(current_result);
        onTweenCompleteGloves(gloves);
      };
    };

    container_goal_ball.addChild(arcos[i]);
  }

  gloves.position.x = 240;
  gloves.position.y = positionYBaseArco - 15;
  gloves.width = 90;
  gloves.height = 90;
  gloves.anchor.x = 0.5;
  gloves.anchor.y = 0.5;
  container_goal_ball.addChild(gloves);

  ball.position.x = 240;
  ball.position.y = positionYBaseArco + 150;

  playerIcon.anchor.x = 0.5;
  playerIcon.anchor.y = 0.5;
  playerIcon.position.x = 0;
  playerIcon.position.y = 0;

  container_icon.position.x = ball.position.x;
  container_icon.position.y = 340;
  container_icon.addChild(playerIcon);

  white_mark.anchor.x = 0.5;
  white_mark.anchor.y = 0.5;
  white_mark.position.x = ball.position.x;
  white_mark.position.y = ball.position.y + 35;

  container_goal_ball.addChild(white_mark);
  container_goal_ball.addChild(ball);
  container_goal_ball.addChild(container_icon);

  message.anchor.x = 0.5;
  message.anchor.y = 0.5;
  message.position.x = -1000;
  message.position.y = 280;
  container_goal_ball.addChild(message);
  outstage.addChild(container_goal_ball);
  requestAnimationFrame(animateIcon);
}

var textScoreTeam1 = new PIXI.Text("0", {
  font: "bold 30px DIN",
  fill: "white",
  align: "center",
});

var textScoreTeam2 = new PIXI.Text("0", {
  font: "bold 30px DIN",
  fill: "white",
  align: "center",
});

var teams = null;
// Team name
Scene2.prototype.startScene = function (idflag, random_flag) {
  scene_call += 1;

  if (scene_call > 1) return;

  active2 = 1;
  active_score_2 = 1;
  textTeam1 = new PIXI.Text(names[idflag][1], {
    font: "bold 17px DIN",
    fill: "white",
    align: "left",
  });
  textTeam1.position.x = 45;
  textTeam2 = new PIXI.Text(names[random_flag][1], {
    font: "bold 17px DIN",
    fill: "white",
    align: "right",
  });
  textTeam2.anchor.x = 1;
  textTeam2.position.x = 360;

  textTeam1.position.y = 18;
  textTeam2.position.y = 18;

  textScoreTeam1.position.x = 170;
  textScoreTeam1.position.y = 52;
  textScoreTeam2.position.y = 52;

  textScoreTeam2.anchor.x = 0.5;
  textScoreTeam2.position.x = 222;

  // Adds the flag selected by the user
  var textureFlag = PIXI.Texture.fromImage(prfx + "flags/" + idflag + ".png");
  selected_flag.texture = textureFlag;
  selected_flag.anchor.x = 0.5;
  selected_flag.anchor.y = 0.5;
  selected_flag.width = 32;
  selected_flag.height = 32;
  selected_flag.position.x = 20;

  selected_flag.position.y = 28;
  random_flag_sprite.position.y = 28;

  container_score.addChild(selected_flag);
  // Adds a random flag as opponent
  var textureRandomFlag = PIXI.Texture.fromImage(
    prfx + "flags/" + random_flag + ".png"
  );
  random_flag_sprite.texture = textureRandomFlag;
  random_flag_sprite.anchor.x = 0.5;
  random_flag_sprite.anchor.y = 0.5;
  random_flag_sprite.width = 32;
  random_flag_sprite.height = 32;
  random_flag_sprite.position.x = 380;

  teams = names[idflag][0] + ":" + names[random_flag][0];

  initGame(teams);

  container_score.addChild(random_flag_sprite);
  container_score.addChild(textTeam1);
  container_score.addChild(textTeam2);
  container_score.addChild(textScoreTeam1);
  container_score.addChild(textScoreTeam2);
  new Tween(
    outbackground,
    "position.x",
    outbackground.position.x - CANVAS_HEIGHT,
    outstage.transition_rate,
    true
  );
  new Tween(
    container_goal_ball,
    "position.x",
    outrenderer.original_width / 2 - 240,
    outstage.transition_rate,
    true
  );
  new Tween(
    container_score,
    "position.x",
    outrenderer.original_width / 2 - 200,
    outstage.transition_rate,
    true
  );

  alterTurnImages();
};

Scene2.prototype.clearScene = function () {
  scene_call += 1;

  if (scene_call > 2) return;

  message.visible = false;

  active2 = 0;

  new Tween(
    outbackground,
    "position.x",
    outbackground.position.x - outrenderer.original_width,
    outstage.transition_rate,
    true
  );

  var cont_ball_tween = c.slide(
    container_goal_ball,
    -600,
    container_goal_ball.position.y,
    outstage.transition_rate,
    "smoothstep"
  );

  cont_ball_tween.setOnComplete = function () {
    container_goal_ball.visible = false;
    message.visible = false;
  };

  // Decide who won
  var decision = 0;

  if (Number(textScoreTeam1.text) > Number(textScoreTeam2.text)) {
    decision = 1;
  }

  out_next_scene2.startScene(decision, teams);
};

// Your turn to goal
Scene2.prototype.repositionElements = function (orientation) {
  if (active2 == 0) {
    container_goal_ball.position.x =
      outrenderer.original_width + (outrenderer.original_width / 2 - 240);
    if (active_score_2 == 0)
      container_score.position.x =
        outrenderer.original_width + (outrenderer.original_width / 2 - 200);
    else container_score.position.x = outrenderer.original_width / 2 - 200;
  } else {
    container_goal_ball.position.x = outrenderer.original_width / 2 - 240;
    container_score.position.x = outrenderer.original_width / 2 - 200;
  }
  if (orientation >= 1) container_goal_ball.position.y = 0;
  else container_goal_ball.position.y = 130;

  container_score.position.y = 10;
};
Scene2.prototype.isActive = function () {
  return active2 === 1 ? true : false;
};

var frameBall = function () {
  count += 0.5;
  var blurAmount = Math.cos(count);
  blurFilter1.blur = 20 * blurAmount;
  ball.rotation += 0.3;
  requestAnimationFrame(frameBall);
};
function animateErase() {
  ball.rotation -= 0.3;
  blurFilter1.blur = 0;
  requestAnimationFrame(animateErase);
}
var yspeed = 1;
function animateIcon() {
  if (playerIcon.position.y > 30) {
    // bounce the circle
    yspeed *= -1;
    // affix to the bottom of the stage
    playerIcon.position.y = 30;
  } else if (playerIcon.position.y < 0) {
    // bounce the circle
    yspeed *= -1;
    // affix to the top of the stage
    playerIcon.position.y = 0;
  }
  playerIcon.position.y += yspeed;
  requestAnimationFrame(animateIcon);
}

function onTweenCompleteBall(param) {
  setTimeout(function () {
    var elasticTweenBackX = new Tween(param, "position.x", 240, 25, false);
    var elasticTweenBackY = new Tween(
      param,
      "position.y",
      positionYBaseArco + 150,
      25,
      false
    );
    elasticTweenBackX.easing = Tween.outCubic;
    elasticTweenBackY.easing = Tween.outCubic;
    elasticTweenBackX.start();
    elasticTweenBackY.start();
    requestAnimationFrame(animateErase);
  }, 600);
}
function onTweenCompleteGloves(param) {
  setTimeout(function () {
    var elasticTweenBackX = new Tween(param, "position.x", 240, 25, false);
    var elasticTweenBackY = new Tween(
      param,
      "position.y",
      positionYBaseArco - 25,
      25,
      false
    );
    elasticTweenBackX.easing = Tween.outCubic;
    elasticTweenBackY.easing = Tween.outCubic;
    elasticTweenBackX.start();
    elasticTweenBackY.start();
    elasticTweenBackY.setOnComplete(function () {
      alterTurnImages();
    });
  }, 600);
}

var tipTextBot;

function alterTurnImages() {
  if (current_turn == 0) {
    ball.texture = resources[prfx + "football2.png"].texture;
    gloves.texture = resources[prfx + "gloves.png"].texture;
    container_icon.position.y = 340;
  } else {
    gloves.texture = resources[prfx + "gloves2.png"].texture;
    ball.texture = resources[prfx + "football.png"].texture;
    container_icon.position.y = 95;
  }

  var blackBox = new PIXI.Sprite(resources[prfx + "play.png"].texture);

  blackBox.anchor.x = 0.5;
  blackBox.anchor.y = 0.5;
  blackBox.position.x = containermain.width / 2 + 30;
  blackBox.position.y = 515;
  blackBox.height = 50;
  blackBox.width = 380;

  container_goal_ball.removeChild(tipTextBot);

  // play
  tipTextBot = new PIXI.Text(
    current_turn === 0
      ? messages["your_turn_to_kick"]
      : messages["your_turn_to_save"],
    {
      font: "bold 18px DIN",
      fill: "white",
      align: "center",
    }
  );

  tipTextBot.anchor.x = 0.5;
  tipTextBot.anchor.y = 0.5;
  tipTextBot.position.x = containermain.width / 2 + 30;
  tipTextBot.position.y = 515;

  container_goal_ball.addChild(blackBox);
  container_goal_ball.addChild(tipTextBot);

  // Assign user score
  textScoreTeam1.text = "" + sum_score_player;
  textScoreTeam2.text = "" + sum_score_auto;

  c.scale(ball, 1, 1, 25);
  container_icon.visible = true;
  turnInteractiveOnOff(true);
}

function displayMessage(result) {
  if (current_turn == 0) {
    if (result == 0) {
      message.texture =
        resources[prfx + "messages/saved_" + lg + ".png"].texture;
    } else {
      message.texture =
        resources[prfx + "messages/goal_auto_" + lg + ".png"].texture;
    }
  } else {
    if (result == 0) {
      message.texture =
        resources[prfx + "messages/missed_" + lg + ".png"].texture;
    } else {
      message.texture =
        resources[prfx + "messages/goal_" + lg + ".png"].texture;
    }
  }
  var tween_message = c.slide(
    message,
    container.width / 2,
    message.position.y,
    20,
    "deceleration"
  );

  tween_message.onComplete = function () {
    var tween_breathe = c.breathe(message, 1.2, 1.2, 20, true);

    tween_breathe.play();

    setTimeout(() => {
      tween_breathe.pause();
      var tween_message2 = c.slide(
        message,
        1000,
        message.position.y,
        20,
        "acceleration"
      );

      tween_message2.onComplete = function () {
        message.position.x = -1000;

        if (number_clicks_glove === 5) {
          turnInteractiveOnOff(false);
          Scene2.prototype.clearScene();
        }
      };
    }, 800);
  };
}

function turnInteractiveOnOff(newinteractive) {
  for (var i = 0; i < arcos.length; i++) {
    arcos[i].interactive = newinteractive;
  }
}

/**
 * JS code for the stage 3
 */
var active3 = 0;

var container_prize = new PIXI.Container();
var message_final = new PIXI.Sprite();
var containermain;
var prize;
var textBottom;
var textTop;

function Scene3(stage, renderer, background) {
  // Initialize sprites 3
  var logoBox = new PIXI.Sprite(resources[prfx + "play.png"].texture);
  containermain = new PIXI.Sprite(
    resources[prfx + "container_box.png"].texture
  );
  prize = new PIXI.Sprite(resources[prfx + "red_card.png"].texture);

  outstage = stage;
  outrenderer = renderer;
  outbackground = background;

  containermain.position.x = 0;
  containermain.position.y = 0;
  containermain.height = 500;
  containermain.width = 420;
  container_prize.addChild(containermain);

  logoBox.anchor.x = 0.5;
  logoBox.anchor.y = 0.5;
  logoBox.position.x = containermain.width / 2;
  logoBox.position.y = 440;
  logoBox.height = 50;
  logoBox.width = 300;
  logoBox.buttonMode = true;
  logoBox.interactive = true;
  logoBox.defaultCursor = "pointer";

  logoBox.mouseup = logoBox.touchend = function () {
    location.reload();
  };

  // play again
  var playAgainText = new PIXI.Text(messages["play"], {
    font: "bold 18px DIN",
    fill: "white",
    align: "center",
  });

  playAgainText.anchor.x = 0.5;
  playAgainText.anchor.y = 0.5;
  playAgainText.position.x = containermain.width / 2;
  playAgainText.position.y = 440;

  container_prize.addChild(logoBox);
  container_prize.addChild(playAgainText);

  prize.anchor.x = 0.5;
  prize.anchor.y = 0.5;
  prize.position.x = containermain.width / 2;
  prize.position.y = 240;
  prize.height = 180;
  prize.width = 180;
  container_prize.addChild(prize);

  message_final.anchor.x = 0.5;
  message_final.anchor.y = 0.5;
  message_final.position.x = container_prize.width / 2;
  message_final.position.y = 0;

  textBottom = new PIXI.Text(messages["loser"], {
    font: "bold 16px DIN",
    fill: "white",
    align: "center",
    wordWrap: true,
    wordWrapWidth: 370,
  });

  textBottom.anchor.x = 0.5;
  textBottom.anchor.y = 0.5;
  textBottom.position.x = containermain.width / 2;
  textBottom.position.y = 365;

  textTop = new PIXI.Text(messages["top_winner"], {
    font: "bold 18px DIN",
    fill: "white",
    align: "center",
  });
  textTop.anchor.x = 0.5;
  textTop.anchor.y = 0.5;
  textTop.position.x = containermain.width / 2;
  textTop.position.y = 120;

  c.fadeOut(message_final);
  c.fadeOut(textBottom);
  c.fadeOut(textTop);

  container_prize.addChild(message_final);
  container_prize.addChild(textBottom);
  container_prize.addChild(textTop);

  container_prize.position.x =
    outrenderer.original_width * 2 + (outrenderer.original_width / 2 - 200);
  container_prize.position.y = 90;
  outstage.addChild(container_prize);
}

Scene3.prototype.startScene = function (result, teams) {
  active3 = 1;

  if (result === 0) {
    message_final.texture =
      resources[prfx + "messages/try_again_" + lg + ".png"].texture;
    prize.texture = resources[prfx + "red_card.png"].texture;
  } else if (result === 1) {
    message_final.texture =
      resources[prfx + "messages/congrats_" + lg + ".png"].texture;
    prize.texture = resources[prfx + "messages/" + won + ".png"].texture;
    textBottom.text = messages["winner"];
  }

  new Tween(
    outbackground,
    "position.x",
    outbackground.position.x - CANVAS_HEIGHT,
    outstage.transition_rate,
    true
  );
  var tween_cont_final = new Tween(
    container_prize,
    "position.x",
    outrenderer.original_width / 2 - 420 / 2,
    outstage.transition_rate,
    true
  );
  tween_cont_final.setOnComplete(function (params) {
    showMessage(result);
    endGame(teams);
  });
};

Scene3.prototype.clearScene = function (params) {
  active3 = 0;

  scene4.startScene(params);
};
Scene3.prototype.repositionElements = function (orientation) {
  if (active3 == 1) {
    container_prize.position.x = outrenderer.original_width / 2 - 210;
  } else {
    container_prize.position.x =
      outrenderer.original_width * 2 + (outrenderer.original_width / 2 - 210);
  }
  if (orientation >= 1) container_prize.position.y = 80;
  else container_prize.position.y = 170;
};
Scene3.prototype.isActive = function () {
  return active3 === 1 ? true : false;
};
function showMessage(result) {
  c.fadeIn(message_final);
  c.scale(message_final, 1, 1, 22);

  // Final top message
  var tween_message_final = c.slide(
    message_final,
    message_final.position.x,
    70,
    40,
    "bounce 3 -3"
  );
  tween_message_final.onComplete = function () {
    c.fadeIn(textBottom);

    if (result == 1) {
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
    yspeed_3 *= -1;
    // affix to the bottom of the stage
    prize.position.y = 215;
  } else if (prize.position.y < 190) {
    // bounce the circle
    yspeed_3 *= -1;
    // affix to the top of the stage
    prize.position.y = 190;
  }

  prize.position.y += yspeed_3;
  requestAnimationFrame(animatePrizeWinner);
}

function endGame(teams) {
  console.log(teams);
}

/**
 * JS code for the stage 4
 */
var active4 = 0;
var container_error = new PIXI.Container();
var errorBottom;
var prizeLogo;
var error_final = new PIXI.Sprite();

function Scene4(stage, renderer, background) {
  var logo4 = new PIXI.Sprite(resources[prfx + "small_logo.png"].texture);
  var containerWrap = new PIXI.Sprite(
    resources[prfx + "container_box.png"].texture
  );
  prizeLogo = new PIXI.Sprite(resources[prfx + "red_card.png"].texture);

  outstage = stage;
  outrenderer = renderer;
  outbackground = background;

  containerWrap.position.x = containerWrap.width / 2 - 35;
  containerWrap.position.y = 0;
  containerWrap.height = 480;
  containerWrap.width = 420;
  container_error.addChild(containerWrap);

  logo4.anchor.x = 0.5;
  logo4.anchor.y = 0.5;
  logo4.position.x = containerWrap.width - 35;
  logo4.position.y = 420;
  logo4.height = 45;
  logo4.width = 45;

  container_error.addChild(logo4);

  prizeLogo.anchor.x = 0.5;
  prizeLogo.anchor.y = 0.5;
  prizeLogo.position.x = containerWrap.width - 35;
  prizeLogo.position.y = 220;
  prizeLogo.height = 180;
  prizeLogo.width = 180;
  container_error.addChild(prizeLogo);

  error_final.anchor.x = 0.5;
  error_final.anchor.y = 0.5;
  error_final.position.x = containerWrap.width - 35;
  error_final.position.y = 80;

  container_error.addChild(error_final);

  errorBottom = new PIXI.Text(messages["loser"], {
    font: "bold 16px DIN",
    fill: "white",
    align: "center",
    wordWrap: true,
    wordWrapWidth: 370,
  });

  errorBottom.anchor.x = 0.5;
  errorBottom.anchor.y = 0.5;
  errorBottom.position.x = containerWrap.width - 35;
  errorBottom.position.y = 355;

  container_error.addChild(errorBottom);
  outstage.addChild(container_error);
}

Scene4.prototype.startScene = function (result) {
  active4 = 1;

  error_final.texture =
    resources[prfx + "messages/try_again_" + lg + ".png"].texture;
  prizeLogo.texture = resources[prfx + "red_card.png"].texture;
  errorBottom.text = result;

  showMessage();
};

Scene4.prototype.clearScene = function () {};
Scene4.prototype.repositionElements = function (orientation) {
  if (active4 == 1) {
    container_error.position.x = -25;
  } else {
    container_error.position.x =
      outrenderer.original_width * 2 + (outrenderer.original_width / 2 - 210);
  }

  if (orientation >= 1) {
    container_error.position.y = 80;
  } else {
    container_error.position.y = 170;

    if (active4) container_error.position.x = -100;
  }
};
Scene4.prototype.isActive = function () {
  return active4 === 1 ? true : false;
};
