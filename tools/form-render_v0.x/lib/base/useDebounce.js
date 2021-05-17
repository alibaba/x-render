'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = require('react');

function useDebouncedCallback(func, wait, options) {
  var _this = this;

  var lastCallTime = (0, _react.useRef)(null);
  var lastInvokeTime = (0, _react.useRef)(0);
  var timerId = (0, _react.useRef)(null);
  var lastArgs = (0, _react.useRef)([]);
  var lastThis = (0, _react.useRef)();
  var result = (0, _react.useRef)();
  var funcRef = (0, _react.useRef)(func);
  var mounted = (0, _react.useRef)(true);
  funcRef.current = func; // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.

  var useRAF = !wait && wait !== 0 && typeof window !== 'undefined';

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  wait = +wait || 0;
  options = options || {};
  var leading = !!options.leading;
  var trailing = 'trailing' in options ? !!options.trailing : true; // `true` by default

  var maxing = 'maxWait' in options;
  var maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : null;
  (0, _react.useEffect)(function() {
    mounted.current = true;
    return function() {
      mounted.current = false;
    };
  }, []); // You may have a question, why we have so many code under the useMemo definition.
  //
  // This was made as we want to escape from useCallback hell and
  // not to initialize a number of functions each time useDebouncedCallback is called.
  //
  // It means that we have less garbage for our GC calls which improves performance.
  // Also, it makes this library smaller.
  //
  // And the last reason, that the code without lots of useCallback with deps is easier to read.
  // You have only one place for that.

  var debounced = (0, _react.useMemo)(
    function() {
      var invokeFunc = function invokeFunc(time) {
        var args = lastArgs.current;
        var thisArg = lastThis.current;
        lastArgs.current = lastThis.current = null;
        lastInvokeTime.current = time;
        return (result.current = funcRef.current.apply(thisArg, args));
      };

      var startTimer = function startTimer(pendingFunc, wait) {
        if (useRAF) cancelAnimationFrame(timerId.current);
        timerId.current = useRAF
          ? requestAnimationFrame(pendingFunc)
          : setTimeout(pendingFunc, wait);
      };

      var shouldInvoke = function shouldInvoke(time) {
        if (!mounted.current) return false;
        var timeSinceLastCall = time - lastCallTime.current;
        var timeSinceLastInvoke = time - lastInvokeTime.current; // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.

        return (
          !lastCallTime.current ||
          timeSinceLastCall >= wait ||
          timeSinceLastCall < 0 ||
          (maxing && timeSinceLastInvoke >= maxWait)
        );
      };

      var trailingEdge = function trailingEdge(time) {
        timerId.current = null; // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.

        if (trailing && lastArgs.current) {
          return invokeFunc(time);
        }

        lastArgs.current = lastThis.current = null;
        return result.current;
      };

      var timerExpired = function timerExpired() {
        var time = Date.now();

        if (shouldInvoke(time)) {
          return trailingEdge(time);
        } // https://github.com/xnimorz/use-debounce/issues/97

        if (!mounted.current) {
          return;
        } // Remaining wait calculation

        var timeSinceLastCall = time - lastCallTime.current;
        var timeSinceLastInvoke = time - lastInvokeTime.current;
        var timeWaiting = wait - timeSinceLastCall;
        var remainingWait = maxing
          ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
          : timeWaiting; // Restart the timer

        startTimer(timerExpired, remainingWait);
      };

      var func = function func() {
        var time = Date.now();
        var isInvoking = shouldInvoke(time);

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        lastArgs.current = args;
        lastThis.current = _this;
        lastCallTime.current = time;

        if (isInvoking) {
          if (!timerId.current && mounted.current) {
            // Reset any `maxWait` timer.
            lastInvokeTime.current = lastCallTime.current; // Start the timer for the trailing edge.

            startTimer(timerExpired, wait); // Invoke the leading edge.

            return leading ? invokeFunc(lastCallTime.current) : result.current;
          }

          if (maxing) {
            // Handle invocations in a tight loop.
            startTimer(timerExpired, wait);
            return invokeFunc(lastCallTime.current);
          }
        }

        if (!timerId.current) {
          startTimer(timerExpired, wait);
        }

        return result.current;
      };

      func.cancel = function() {
        if (timerId.current) {
          useRAF
            ? cancelAnimationFrame(timerId.current)
            : clearTimeout(timerId.current);
        }

        lastInvokeTime.current = 0;
        lastArgs.current = lastCallTime.current = lastThis.current = timerId.current = null;
      };

      func.isPending = function() {
        return !!timerId.current;
      };

      func.flush = function() {
        return !timerId.current ? result.current : trailingEdge(Date.now());
      };

      return func;
    },
    [leading, maxing, wait, maxWait, trailing, useRAF]
  );
  return debounced;
}

var _default = useDebouncedCallback;
exports.default = _default;
