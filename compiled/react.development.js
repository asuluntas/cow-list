/** @license React v16.6.1
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.React = factory();
})(this, function () {
  'use strict'; // TODO: this is special because it gets imported during build.

  var ReactVersion = '16.6.3'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.

  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  function getIteratorFn(maybeIterable) {
    if (maybeIterable === null || typeof maybeIterable !== 'object') {
      return null;
    }

    var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

    if (typeof maybeIterator === 'function') {
      return maybeIterator;
    }

    return null;
  }

  var enableHooks = false; // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
  // In some cases, StrictMode should also double-render lifecycles.
  // This can be confusing for tests though,
  // And it can be bad for performance in production.
  // This feature flag can be used to control the behavior:
  // To preserve the "Pause on caught exceptions" behavior of the debugger, we
  // replay the begin phase of a failed component inside invokeGuardedCallback.
  // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:
  // Gather advanced timing metrics for Profiler subtrees.
  // Trace which interactions trigger each commit.

  var enableSchedulerTracing = true; // Only used in www builds.
  // Only used in www builds.
  // React Fire: prevent the value and checked attributes from syncing
  // with their related DOM properties
  // These APIs will no longer be "unstable" in the upcoming 16.7 release,
  // Control this behavior with a flag to support 16.6 minor releases in the meanwhile.

  var enableStableConcurrentModeAPIs = false;
  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */

  /* eslint-disable no-unused-vars */

  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined');
    }

    return Object(val);
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      } // Detect buggy property enumeration order in older V8 versions.
      // https://bugs.chromium.org/p/v8/issues/detail?id=4118


      var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

      test1[5] = 'de';

      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test2 = {};

      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }

      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });

      if (order2.join('') !== '0123456789') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });

      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
        return false;
      }

      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    var from;
    var to = toObject(target);
    var symbols;

    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);

      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }

      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);

        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }

    return to;
  };
  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */

  var validateFormat = function () {};

  {
    validateFormat = function (format) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    };
  }

  function invariant(condition, format, a, b, c, d, e, f) {
    validateFormat(format);

    if (!condition) {
      var error = void 0;

      if (format === undefined) {
        error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function () {
          return args[argIndex++];
        }));
        error.name = 'Invariant Violation';
      }

      error.framesToPop = 1; // we don't care about invariant's own frame

      throw error;
    }
  } // Relying on the `invariant()` implementation lets us
  // preserve the format and params in the www builds.

  /**
   * Forked from fbjs/warning:
   * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
   *
   * Only change is we use console.warn instead of console.error,
   * and do nothing when 'console' is not supported.
   * This really simplifies the code.
   * ---
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */


  var lowPriorityWarning = function () {};

  {
    var printWarning = function (format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });

      if (typeof console !== 'undefined') {
        console.warn(message);
      }

      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    lowPriorityWarning = function (condition, format) {
      if (format === undefined) {
        throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  }
  var lowPriorityWarning$1 = lowPriorityWarning;
  /**
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var warningWithoutStack = function () {};

  {
    warningWithoutStack = function (condition, format) {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      if (format === undefined) {
        throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (args.length > 8) {
        // Check before the condition to catch violations early.
        throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
      }

      if (condition) {
        return;
      }

      if (typeof console !== 'undefined') {
        var argsWithFormat = args.map(function (item) {
          return '' + item;
        });
        argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
        // breaks IE9: https://github.com/facebook/react/issues/13610

        Function.prototype.apply.call(console.error, console, argsWithFormat);
      }

      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        throw new Error(message);
      } catch (x) {}
    };
  }
  var warningWithoutStack$1 = warningWithoutStack;
  var didWarnStateUpdateForUnmountedComponent = {};

  function warnNoop(publicInstance, callerName) {
    {
      var _constructor = publicInstance.constructor;
      var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
      var warningKey = componentName + '.' + callerName;

      if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
        return;
      }

      warningWithoutStack$1(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
      didWarnStateUpdateForUnmountedComponent[warningKey] = true;
    }
  }
  /**
   * This is the abstract API for an update queue.
   */


  var ReactNoopUpdateQueue = {
    /**
     * Checks whether or not this composite component is mounted.
     * @param {ReactClass} publicInstance The instance we want to test.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function (publicInstance) {
      return false;
    },

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {?function} callback Called after component is updated.
     * @param {?string} callerName name of the calling function in the public API.
     * @internal
     */
    enqueueForceUpdate: function (publicInstance, callback, callerName) {
      warnNoop(publicInstance, 'forceUpdate');
    },

    /**
     * Replaces all of the state. Always use this or `setState` to mutate state.
     * You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} completeState Next state.
     * @param {?function} callback Called after component is updated.
     * @param {?string} callerName name of the calling function in the public API.
     * @internal
     */
    enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
      warnNoop(publicInstance, 'replaceState');
    },

    /**
     * Sets a subset of the state. This only exists because _pendingState is
     * internal. This provides a merging strategy that is not available to deep
     * properties which is confusing. TODO: Expose pendingState or don't use it
     * during the merge.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} partialState Next partial state to be merged with state.
     * @param {?function} callback Called after component is updated.
     * @param {?string} Name of the calling function in the public API.
     * @internal
     */
    enqueueSetState: function (publicInstance, partialState, callback, callerName) {
      warnNoop(publicInstance, 'setState');
    }
  };
  var emptyObject = {};
  {
    Object.freeze(emptyObject);
  }
  /**
   * Base class helpers for the updating state of a component.
   */

  function Component(props, context, updater) {
    this.props = props;
    this.context = context; // If a component has string refs, we will assign a different object later.

    this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
    // renderer.

    this.updater = updater || ReactNoopUpdateQueue;
  }

  Component.prototype.isReactComponent = {};
  /**
   * Sets a subset of the state. Always use this to mutate
   * state. You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * There is no guarantee that calls to `setState` will run synchronously,
   * as they may eventually be batched together.  You can provide an optional
   * callback that will be executed when the call to setState is actually
   * completed.
   *
   * When a function is provided to setState, it will be called at some point in
   * the future (not synchronously). It will be called with the up to date
   * component arguments (state, props, context). These values can be different
   * from this.* because your function may be called after receiveProps but before
   * shouldComponentUpdate, and this new state, props, and context will not yet be
   * assigned to this.
   *
   * @param {object|function} partialState Next partial state or function to
   *        produce next partial state to be merged with current state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */

  Component.prototype.setState = function (partialState, callback) {
    !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
    this.updater.enqueueSetState(this, partialState, callback, 'setState');
  };
  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {?function} callback Called after update is complete.
   * @final
   * @protected
   */


  Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
  };
  /**
   * Deprecated APIs. These APIs used to exist on classic React classes but since
   * we would like to deprecate them, we're not going to move them over to this
   * modern base class. Instead, we define a getter that warns if it's accessed.
   */


  {
    var deprecatedAPIs = {
      isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
      replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
    };

    var defineDeprecationWarning = function (methodName, info) {
      Object.defineProperty(Component.prototype, methodName, {
        get: function () {
          lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
          return undefined;
        }
      });
    };

    for (var fnName in deprecatedAPIs) {
      if (deprecatedAPIs.hasOwnProperty(fnName)) {
        defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      }
    }
  }

  function ComponentDummy() {}

  ComponentDummy.prototype = Component.prototype;
  /**
   * Convenience component with default shallow equality check for sCU.
   */

  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context; // If a component has string refs, we will assign a different object later.

    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }

  var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
  pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

  objectAssign(pureComponentPrototype, Component.prototype);
  pureComponentPrototype.isPureReactComponent = true; // an immutable object with a single mutable value

  function createRef() {
    var refObject = {
      current: null
    };
    {
      Object.seal(refObject);
    }
    return refObject;
  }
  /* eslint-disable no-var */
  // TODO: Use symbols?


  var ImmediatePriority = 1;
  var UserBlockingPriority = 2;
  var NormalPriority = 3;
  var LowPriority = 4;
  var IdlePriority = 5; // Max 31 bit integer. The max integer size in V8 for 32-bit systems.
  // Math.pow(2, 30) - 1
  // 0b111111111111111111111111111111

  var maxSigned31BitInt = 1073741823; // Times out immediately

  var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out

  var USER_BLOCKING_PRIORITY = 250;
  var NORMAL_PRIORITY_TIMEOUT = 5000;
  var LOW_PRIORITY_TIMEOUT = 10000; // Never times out

  var IDLE_PRIORITY = maxSigned31BitInt; // Callbacks are stored as a circular, doubly linked list.

  var firstCallbackNode = null;
  var currentDidTimeout = false;
  var currentPriorityLevel = NormalPriority;
  var currentEventStartTime = -1;
  var currentExpirationTime = -1; // This is set when a callback is being executed, to prevent re-entrancy.

  var isExecutingCallback = false;
  var isHostCallbackScheduled = false;
  var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';

  function ensureHostCallbackIsScheduled() {
    if (isExecutingCallback) {
      // Don't schedule work yet; wait until the next time we yield.
      return;
    } // Schedule the host callback using the earliest expiration in the list.


    var expirationTime = firstCallbackNode.expirationTime;

    if (!isHostCallbackScheduled) {
      isHostCallbackScheduled = true;
    } else {
      // Cancel the existing host callback.
      cancelHostCallback();
    }

    requestHostCallback(flushWork, expirationTime);
  }

  function flushFirstCallback() {
    var flushedNode = firstCallbackNode; // Remove the node from the list before calling the callback. That way the
    // list is in a consistent state even if the callback throws.

    var next = firstCallbackNode.next;

    if (firstCallbackNode === next) {
      // This is the last callback in the list.
      firstCallbackNode = null;
      next = null;
    } else {
      var lastCallbackNode = firstCallbackNode.previous;
      firstCallbackNode = lastCallbackNode.next = next;
      next.previous = lastCallbackNode;
    }

    flushedNode.next = flushedNode.previous = null; // Now it's safe to call the callback.

    var callback = flushedNode.callback;
    var expirationTime = flushedNode.expirationTime;
    var priorityLevel = flushedNode.priorityLevel;
    var previousPriorityLevel = currentPriorityLevel;
    var previousExpirationTime = currentExpirationTime;
    currentPriorityLevel = priorityLevel;
    currentExpirationTime = expirationTime;
    var continuationCallback;

    try {
      continuationCallback = callback();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
      currentExpirationTime = previousExpirationTime;
    } // A callback may return a continuation. The continuation should be scheduled
    // with the same priority and expiration as the just-finished callback.


    if (typeof continuationCallback === 'function') {
      var continuationNode = {
        callback: continuationCallback,
        priorityLevel: priorityLevel,
        expirationTime: expirationTime,
        next: null,
        previous: null
      }; // Insert the new callback into the list, sorted by its expiration. This is
      // almost the same as the code in `scheduleCallback`, except the callback
      // is inserted into the list *before* callbacks of equal expiration instead
      // of after.

      if (firstCallbackNode === null) {
        // This is the first callback in the list.
        firstCallbackNode = continuationNode.next = continuationNode.previous = continuationNode;
      } else {
        var nextAfterContinuation = null;
        var node = firstCallbackNode;

        do {
          if (node.expirationTime >= expirationTime) {
            // This callback expires at or after the continuation. We will insert
            // the continuation *before* this callback.
            nextAfterContinuation = node;
            break;
          }

          node = node.next;
        } while (node !== firstCallbackNode);

        if (nextAfterContinuation === null) {
          // No equal or lower priority callback was found, which means the new
          // callback is the lowest priority callback in the list.
          nextAfterContinuation = firstCallbackNode;
        } else if (nextAfterContinuation === firstCallbackNode) {
          // The new callback is the highest priority callback in the list.
          firstCallbackNode = continuationNode;
          ensureHostCallbackIsScheduled();
        }

        var previous = nextAfterContinuation.previous;
        previous.next = nextAfterContinuation.previous = continuationNode;
        continuationNode.next = nextAfterContinuation;
        continuationNode.previous = previous;
      }
    }
  }

  function flushImmediateWork() {
    if ( // Confirm we've exited the outer most event handler
    currentEventStartTime === -1 && firstCallbackNode !== null && firstCallbackNode.priorityLevel === ImmediatePriority) {
      isExecutingCallback = true;

      try {
        do {
          flushFirstCallback();
        } while ( // Keep flushing until there are no more immediate callbacks
        firstCallbackNode !== null && firstCallbackNode.priorityLevel === ImmediatePriority);
      } finally {
        isExecutingCallback = false;

        if (firstCallbackNode !== null) {
          // There's still work remaining. Request another callback.
          ensureHostCallbackIsScheduled();
        } else {
          isHostCallbackScheduled = false;
        }
      }
    }
  }

  function flushWork(didTimeout) {
    isExecutingCallback = true;
    var previousDidTimeout = currentDidTimeout;
    currentDidTimeout = didTimeout;

    try {
      if (didTimeout) {
        // Flush all the expired callbacks without yielding.
        while (firstCallbackNode !== null) {
          // Read the current time. Flush all the callbacks that expire at or
          // earlier than that time. Then read the current time again and repeat.
          // This optimizes for as few performance.now calls as possible.
          var currentTime = getCurrentTime();

          if (firstCallbackNode.expirationTime <= currentTime) {
            do {
              flushFirstCallback();
            } while (firstCallbackNode !== null && firstCallbackNode.expirationTime <= currentTime);

            continue;
          }

          break;
        }
      } else {
        // Keep flushing callbacks until we run out of time in the frame.
        if (firstCallbackNode !== null) {
          do {
            flushFirstCallback();
          } while (firstCallbackNode !== null && !shouldYieldToHost());
        }
      }
    } finally {
      isExecutingCallback = false;
      currentDidTimeout = previousDidTimeout;

      if (firstCallbackNode !== null) {
        // There's still work remaining. Request another callback.
        ensureHostCallbackIsScheduled();
      } else {
        isHostCallbackScheduled = false;
      } // Before exiting, flush all the immediate work that was scheduled.


      flushImmediateWork();
    }
  }

  function unstable_runWithPriority(priorityLevel, eventHandler) {
    switch (priorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
      case LowPriority:
      case IdlePriority:
        break;

      default:
        priorityLevel = NormalPriority;
    }

    var previousPriorityLevel = currentPriorityLevel;
    var previousEventStartTime = currentEventStartTime;
    currentPriorityLevel = priorityLevel;
    currentEventStartTime = getCurrentTime();

    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
      currentEventStartTime = previousEventStartTime; // Before exiting, flush all the immediate work that was scheduled.

      flushImmediateWork();
    }
  }

  function unstable_wrapCallback(callback) {
    var parentPriorityLevel = currentPriorityLevel;
    return function () {
      // This is a fork of runWithPriority, inlined for performance.
      var previousPriorityLevel = currentPriorityLevel;
      var previousEventStartTime = currentEventStartTime;
      currentPriorityLevel = parentPriorityLevel;
      currentEventStartTime = getCurrentTime();

      try {
        return callback.apply(this, arguments);
      } finally {
        currentPriorityLevel = previousPriorityLevel;
        currentEventStartTime = previousEventStartTime;
        flushImmediateWork();
      }
    };
  }

  function unstable_scheduleCallback(callback, deprecated_options) {
    var startTime = currentEventStartTime !== -1 ? currentEventStartTime : getCurrentTime();
    var expirationTime;

    if (typeof deprecated_options === 'object' && deprecated_options !== null && typeof deprecated_options.timeout === 'number') {
      // FIXME: Remove this branch once we lift expiration times out of React.
      expirationTime = startTime + deprecated_options.timeout;
    } else {
      switch (currentPriorityLevel) {
        case ImmediatePriority:
          expirationTime = startTime + IMMEDIATE_PRIORITY_TIMEOUT;
          break;

        case UserBlockingPriority:
          expirationTime = startTime + USER_BLOCKING_PRIORITY;
          break;

        case IdlePriority:
          expirationTime = startTime + IDLE_PRIORITY;
          break;

        case LowPriority:
          expirationTime = startTime + LOW_PRIORITY_TIMEOUT;
          break;

        case NormalPriority:
        default:
          expirationTime = startTime + NORMAL_PRIORITY_TIMEOUT;
      }
    }

    var newNode = {
      callback: callback,
      priorityLevel: currentPriorityLevel,
      expirationTime: expirationTime,
      next: null,
      previous: null
    }; // Insert the new callback into the list, ordered first by expiration, then
    // by insertion. So the new callback is inserted any other callback with
    // equal expiration.

    if (firstCallbackNode === null) {
      // This is the first callback in the list.
      firstCallbackNode = newNode.next = newNode.previous = newNode;
      ensureHostCallbackIsScheduled();
    } else {
      var next = null;
      var node = firstCallbackNode;

      do {
        if (node.expirationTime > expirationTime) {
          // The new callback expires before this one.
          next = node;
          break;
        }

        node = node.next;
      } while (node !== firstCallbackNode);

      if (next === null) {
        // No callback with a later expiration was found, which means the new
        // callback has the latest expiration in the list.
        next = firstCallbackNode;
      } else if (next === firstCallbackNode) {
        // The new callback has the earliest expiration in the entire list.
        firstCallbackNode = newNode;
        ensureHostCallbackIsScheduled();
      }

      var previous = next.previous;
      previous.next = next.previous = newNode;
      newNode.next = next;
      newNode.previous = previous;
    }

    return newNode;
  }

  function unstable_cancelCallback(callbackNode) {
    var next = callbackNode.next;

    if (next === null) {
      // Already cancelled.
      return;
    }

    if (next === callbackNode) {
      // This is the only scheduled callback. Clear the list.
      firstCallbackNode = null;
    } else {
      // Remove the callback from its position in the list.
      if (callbackNode === firstCallbackNode) {
        firstCallbackNode = next;
      }

      var previous = callbackNode.previous;
      previous.next = next;
      next.previous = previous;
    }

    callbackNode.next = callbackNode.previous = null;
  }

  function unstable_getCurrentPriorityLevel() {
    return currentPriorityLevel;
  }

  function unstable_shouldYield() {
    return !currentDidTimeout && (firstCallbackNode !== null && firstCallbackNode.expirationTime < currentExpirationTime || shouldYieldToHost());
  } // The remaining code is essentially a polyfill for requestIdleCallback. It
  // works by scheduling a requestAnimationFrame, storing the time for the start
  // of the frame, then scheduling a postMessage which gets scheduled after paint.
  // Within the postMessage handler do as much work as possible until time + frame
  // rate. By separating the idle call into a separate event tick we ensure that
  // layout, paint and other browser work is counted against the available time.
  // The frame rate is dynamically adjusted.
  // We capture a local reference to any global, in case it gets polyfilled after
  // this module is initially evaluated. We want to be using a
  // consistent implementation.


  var localDate = Date; // This initialization code may run even on server environments if a component
  // just imports ReactDOM (e.g. for findDOMNode). Some environments might not
  // have setTimeout or clearTimeout. However, we always expect them to be defined
  // on the client. https://github.com/facebook/react/pull/13088

  var localSetTimeout = typeof setTimeout === 'function' ? setTimeout : undefined;
  var localClearTimeout = typeof clearTimeout === 'function' ? clearTimeout : undefined; // We don't expect either of these to necessarily be defined, but we will error
  // later if they are missing on the client.

  var localRequestAnimationFrame = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : undefined;
  var localCancelAnimationFrame = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : undefined;
  var getCurrentTime; // requestAnimationFrame does not run when the tab is in the background. If
  // we're backgrounded we prefer for that work to happen so that the page
  // continues to load in the background. So we also schedule a 'setTimeout' as
  // a fallback.
  // TODO: Need a better heuristic for backgrounded work.

  var ANIMATION_FRAME_TIMEOUT = 100;
  var rAFID;
  var rAFTimeoutID;

  var requestAnimationFrameWithTimeout = function (callback) {
    // schedule rAF and also a setTimeout
    rAFID = localRequestAnimationFrame(function (timestamp) {
      // cancel the setTimeout
      localClearTimeout(rAFTimeoutID);
      callback(timestamp);
    });
    rAFTimeoutID = localSetTimeout(function () {
      // cancel the requestAnimationFrame
      localCancelAnimationFrame(rAFID);
      callback(getCurrentTime());
    }, ANIMATION_FRAME_TIMEOUT);
  };

  if (hasNativePerformanceNow) {
    var Performance = performance;

    getCurrentTime = function () {
      return Performance.now();
    };
  } else {
    getCurrentTime = function () {
      return localDate.now();
    };
  }

  var requestHostCallback;
  var cancelHostCallback;
  var shouldYieldToHost;

  if (typeof window !== 'undefined' && window._schedMock) {
    // Dynamic injection, only for testing purposes.
    var impl = window._schedMock;
    requestHostCallback = impl[0];
    cancelHostCallback = impl[1];
    shouldYieldToHost = impl[2];
  } else if ( // If Scheduler runs in a non-DOM environment, it falls back to a naive
  // implementation using setTimeout.
  typeof window === 'undefined' || // "addEventListener" might not be available on the window object
  // if this is a mocked "window" object. So we need to validate that too.
  typeof window.addEventListener !== 'function') {
    var _callback = null;

    var _currentTime = -1;

    var _flushCallback = function (didTimeout, ms) {
      if (_callback !== null) {
        var cb = _callback;
        _callback = null;

        try {
          _currentTime = ms;
          cb(didTimeout);
        } finally {
          _currentTime = -1;
        }
      }
    };

    requestHostCallback = function (cb, ms) {
      if (_currentTime !== -1) {
        // Protect against re-entrancy.
        setTimeout(requestHostCallback, 0, cb, ms);
      } else {
        _callback = cb;
        setTimeout(_flushCallback, ms, true, ms);
        setTimeout(_flushCallback, maxSigned31BitInt, false, maxSigned31BitInt);
      }
    };

    cancelHostCallback = function () {
      _callback = null;
    };

    shouldYieldToHost = function () {
      return false;
    };

    getCurrentTime = function () {
      return _currentTime === -1 ? 0 : _currentTime;
    };
  } else {
    if (typeof console !== 'undefined') {
      // TODO: Remove fb.me link
      if (typeof localRequestAnimationFrame !== 'function') {
        console.error("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
      }

      if (typeof localCancelAnimationFrame !== 'function') {
        console.error("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
      }
    }

    var scheduledHostCallback = null;
    var isMessageEventScheduled = false;
    var timeoutTime = -1;
    var isAnimationFrameScheduled = false;
    var isFlushingHostCallback = false;
    var frameDeadline = 0; // We start out assuming that we run at 30fps but then the heuristic tracking
    // will adjust this value to a faster fps if we get more frequent animation
    // frames.

    var previousFrameTime = 33;
    var activeFrameTime = 33;

    shouldYieldToHost = function () {
      return frameDeadline <= getCurrentTime();
    }; // We use the postMessage trick to defer idle work until after the repaint.


    var messageKey = '__reactIdleCallback$' + Math.random().toString(36).slice(2);

    var idleTick = function (event) {
      if (event.source !== window || event.data !== messageKey) {
        return;
      }

      isMessageEventScheduled = false;
      var prevScheduledCallback = scheduledHostCallback;
      var prevTimeoutTime = timeoutTime;
      scheduledHostCallback = null;
      timeoutTime = -1;
      var currentTime = getCurrentTime();
      var didTimeout = false;

      if (frameDeadline - currentTime <= 0) {
        // There's no time left in this idle period. Check if the callback has
        // a timeout and whether it's been exceeded.
        if (prevTimeoutTime !== -1 && prevTimeoutTime <= currentTime) {
          // Exceeded the timeout. Invoke the callback even though there's no
          // time left.
          didTimeout = true;
        } else {
          // No timeout.
          if (!isAnimationFrameScheduled) {
            // Schedule another animation callback so we retry later.
            isAnimationFrameScheduled = true;
            requestAnimationFrameWithTimeout(animationTick);
          } // Exit without invoking the callback.


          scheduledHostCallback = prevScheduledCallback;
          timeoutTime = prevTimeoutTime;
          return;
        }
      }

      if (prevScheduledCallback !== null) {
        isFlushingHostCallback = true;

        try {
          prevScheduledCallback(didTimeout);
        } finally {
          isFlushingHostCallback = false;
        }
      }
    }; // Assumes that we have addEventListener in this environment. Might need
    // something better for old IE.


    window.addEventListener('message', idleTick, false);

    var animationTick = function (rafTime) {
      if (scheduledHostCallback !== null) {
        // Eagerly schedule the next animation callback at the beginning of the
        // frame. If the scheduler queue is not empty at the end of the frame, it
        // will continue flushing inside that callback. If the queue *is* empty,
        // then it will exit immediately. Posting the callback at the start of the
        // frame ensures it's fired within the earliest possible frame. If we
        // waited until the end of the frame to post the callback, we risk the
        // browser skipping a frame and not firing the callback until the frame
        // after that.
        requestAnimationFrameWithTimeout(animationTick);
      } else {
        // No pending work. Exit.
        isAnimationFrameScheduled = false;
        return;
      }

      var nextFrameTime = rafTime - frameDeadline + activeFrameTime;

      if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
        if (nextFrameTime < 8) {
          // Defensive coding. We don't support higher frame rates than 120hz.
          // If the calculated frame time gets lower than 8, it is probably a bug.
          nextFrameTime = 8;
        } // If one frame goes long, then the next one can be short to catch up.
        // If two frames are short in a row, then that's an indication that we
        // actually have a higher frame rate than what we're currently optimizing.
        // We adjust our heuristic dynamically accordingly. For example, if we're
        // running on 120hz display or 90hz VR display.
        // Take the max of the two in case one of them was an anomaly due to
        // missed frame deadlines.


        activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
      } else {
        previousFrameTime = nextFrameTime;
      }

      frameDeadline = rafTime + activeFrameTime;

      if (!isMessageEventScheduled) {
        isMessageEventScheduled = true;
        window.postMessage(messageKey, '*');
      }
    };

    requestHostCallback = function (callback, absoluteTimeout) {
      scheduledHostCallback = callback;
      timeoutTime = absoluteTimeout;

      if (isFlushingHostCallback || absoluteTimeout < 0) {
        // Don't wait for the next frame. Continue working ASAP, in a new event.
        window.postMessage(messageKey, '*');
      } else if (!isAnimationFrameScheduled) {
        // If rAF didn't already schedule one, we need to schedule a frame.
        // TODO: If this rAF doesn't materialize because the browser throttles, we
        // might want to still have setTimeout trigger rIC as a backup to ensure
        // that we keep performing work.
        isAnimationFrameScheduled = true;
        requestAnimationFrameWithTimeout(animationTick);
      }
    };

    cancelHostCallback = function () {
      scheduledHostCallback = null;
      isMessageEventScheduled = false;
      timeoutTime = -1;
    };
  }

  var DEFAULT_THREAD_ID = 0; // Counters used to generate unique IDs.

  var interactionIDCounter = 0;
  var threadIDCounter = 0; // Set of currently traced interactions.
  // Interactions "stack"–
  // Meaning that newly traced interactions are appended to the previously active set.
  // When an interaction goes out of scope, the previous set (if any) is restored.

  var interactionsRef = null; // Listener(s) to notify when interactions begin and end.

  var subscriberRef = null;

  if (enableSchedulerTracing) {
    interactionsRef = {
      current: new Set()
    };
    subscriberRef = {
      current: null
    };
  }

  function unstable_clear(callback) {
    if (!enableSchedulerTracing) {
      return callback();
    }

    var prevInteractions = interactionsRef.current;
    interactionsRef.current = new Set();

    try {
      return callback();
    } finally {
      interactionsRef.current = prevInteractions;
    }
  }

  function unstable_getCurrent() {
    if (!enableSchedulerTracing) {
      return null;
    } else {
      return interactionsRef.current;
    }
  }

  function unstable_getThreadID() {
    return ++threadIDCounter;
  }

  function unstable_trace(name, timestamp, callback) {
    var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;

    if (!enableSchedulerTracing) {
      return callback();
    }

    var interaction = {
      __count: 1,
      id: interactionIDCounter++,
      name: name,
      timestamp: timestamp
    };
    var prevInteractions = interactionsRef.current; // Traced interactions should stack/accumulate.
    // To do that, clone the current interactions.
    // The previous set will be restored upon completion.

    var interactions = new Set(prevInteractions);
    interactions.add(interaction);
    interactionsRef.current = interactions;
    var subscriber = subscriberRef.current;
    var returnValue = void 0;

    try {
      if (subscriber !== null) {
        subscriber.onInteractionTraced(interaction);
      }
    } finally {
      try {
        if (subscriber !== null) {
          subscriber.onWorkStarted(interactions, threadID);
        }
      } finally {
        try {
          returnValue = callback();
        } finally {
          interactionsRef.current = prevInteractions;

          try {
            if (subscriber !== null) {
              subscriber.onWorkStopped(interactions, threadID);
            }
          } finally {
            interaction.__count--; // If no async work was scheduled for this interaction,
            // Notify subscribers that it's completed.

            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          }
        }
      }
    }

    return returnValue;
  }

  function unstable_wrap(callback) {
    var threadID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THREAD_ID;

    if (!enableSchedulerTracing) {
      return callback;
    }

    var wrappedInteractions = interactionsRef.current;
    var subscriber = subscriberRef.current;

    if (subscriber !== null) {
      subscriber.onWorkScheduled(wrappedInteractions, threadID);
    } // Update the pending async work count for the current interactions.
    // Update after calling subscribers in case of error.


    wrappedInteractions.forEach(function (interaction) {
      interaction.__count++;
    });
    var hasRun = false;

    function wrapped() {
      var prevInteractions = interactionsRef.current;
      interactionsRef.current = wrappedInteractions;
      subscriber = subscriberRef.current;

      try {
        var returnValue = void 0;

        try {
          if (subscriber !== null) {
            subscriber.onWorkStarted(wrappedInteractions, threadID);
          }
        } finally {
          try {
            returnValue = callback.apply(undefined, arguments);
          } finally {
            interactionsRef.current = prevInteractions;

            if (subscriber !== null) {
              subscriber.onWorkStopped(wrappedInteractions, threadID);
            }
          }
        }

        return returnValue;
      } finally {
        if (!hasRun) {
          // We only expect a wrapped function to be executed once,
          // But in the event that it's executed more than once–
          // Only decrement the outstanding interaction counts once.
          hasRun = true; // Update pending async counts for all wrapped interactions.
          // If this was the last scheduled async work for any of them,
          // Mark them as completed.

          wrappedInteractions.forEach(function (interaction) {
            interaction.__count--;

            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          });
        }
      }
    }

    wrapped.cancel = function cancel() {
      subscriber = subscriberRef.current;

      try {
        if (subscriber !== null) {
          subscriber.onWorkCanceled(wrappedInteractions, threadID);
        }
      } finally {
        // Update pending async counts for all wrapped interactions.
        // If this was the last scheduled async work for any of them,
        // Mark them as completed.
        wrappedInteractions.forEach(function (interaction) {
          interaction.__count--;

          if (subscriber && interaction.__count === 0) {
            subscriber.onInteractionScheduledWorkCompleted(interaction);
          }
        });
      }
    };

    return wrapped;
  }

  var subscribers = null;

  if (enableSchedulerTracing) {
    subscribers = new Set();
  }

  function unstable_subscribe(subscriber) {
    if (enableSchedulerTracing) {
      subscribers.add(subscriber);

      if (subscribers.size === 1) {
        subscriberRef.current = {
          onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,
          onInteractionTraced: onInteractionTraced,
          onWorkCanceled: onWorkCanceled,
          onWorkScheduled: onWorkScheduled,
          onWorkStarted: onWorkStarted,
          onWorkStopped: onWorkStopped
        };
      }
    }
  }

  function unstable_unsubscribe(subscriber) {
    if (enableSchedulerTracing) {
      subscribers.delete(subscriber);

      if (subscribers.size === 0) {
        subscriberRef.current = null;
      }
    }
  }

  function onInteractionTraced(interaction) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onInteractionTraced(interaction);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onInteractionScheduledWorkCompleted(interaction) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onInteractionScheduledWorkCompleted(interaction);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkScheduled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkScheduled(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkStarted(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkStarted(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkStopped(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkStopped(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkCanceled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkCanceled(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }
  /**
   * Keeps track of the current owner.
   *
   * The current owner is the component who should own any components that are
   * currently being constructed.
   */


  var ReactCurrentOwner = {
    /**
     * @internal
     * @type {ReactComponent}
     */
    current: null,
    currentDispatcher: null
  };
  var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

  var describeComponentFrame = function (name, source, ownerName) {
    var sourceInfo = '';

    if (source) {
      var path = source.fileName;
      var fileName = path.replace(BEFORE_SLASH_RE, '');
      {
        // In DEV, include code for a common special case:
        // prefer "folder/index.js" instead of just "index.js".
        if (/^index\./.test(fileName)) {
          var match = path.match(BEFORE_SLASH_RE);

          if (match) {
            var pathBeforeSlash = match[1];

            if (pathBeforeSlash) {
              var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
              fileName = folderName + '/' + fileName;
            }
          }
        }
      }
      sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
    } else if (ownerName) {
      sourceInfo = ' (created by ' + ownerName + ')';
    }

    return '\n    in ' + (name || 'Unknown') + sourceInfo;
  };

  var Resolved = 1;

  function refineResolvedLazyComponent(lazyComponent) {
    return lazyComponent._status === Resolved ? lazyComponent._result : null;
  }

  function getWrappedName(outerType, innerType, wrapperName) {
    var functionName = innerType.displayName || innerType.name || '';
    return outerType.displayName || (functionName !== '' ? wrapperName + '(' + functionName + ')' : wrapperName);
  }

  function getComponentName(type) {
    if (type == null) {
      // Host root, text node or just invalid type.
      return null;
    }

    {
      if (typeof type.tag === 'number') {
        warningWithoutStack$1(false, 'Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
      }
    }

    if (typeof type === 'function') {
      return type.displayName || type.name || null;
    }

    if (typeof type === 'string') {
      return type;
    }

    switch (type) {
      case REACT_CONCURRENT_MODE_TYPE:
        return 'ConcurrentMode';

      case REACT_FRAGMENT_TYPE:
        return 'Fragment';

      case REACT_PORTAL_TYPE:
        return 'Portal';

      case REACT_PROFILER_TYPE:
        return 'Profiler';

      case REACT_STRICT_MODE_TYPE:
        return 'StrictMode';

      case REACT_SUSPENSE_TYPE:
        return 'Suspense';
    }

    if (typeof type === 'object') {
      switch (type.$$typeof) {
        case REACT_CONTEXT_TYPE:
          return 'Context.Consumer';

        case REACT_PROVIDER_TYPE:
          return 'Context.Provider';

        case REACT_FORWARD_REF_TYPE:
          return getWrappedName(type, type.render, 'ForwardRef');

        case REACT_MEMO_TYPE:
          return getComponentName(type.type);

        case REACT_LAZY_TYPE:
          {
            var thenable = type;
            var resolvedThenable = refineResolvedLazyComponent(thenable);

            if (resolvedThenable) {
              return getComponentName(resolvedThenable);
            }
          }
      }
    }

    return null;
  }

  var ReactDebugCurrentFrame = {};
  var currentlyValidatingElement = null;

  function setCurrentlyValidatingElement(element) {
    {
      currentlyValidatingElement = element;
    }
  }

  {
    // Stack implementation injected by the current renderer.
    ReactDebugCurrentFrame.getCurrentStack = null;

    ReactDebugCurrentFrame.getStackAddendum = function () {
      var stack = ''; // Add an extra top frame while an element is being validated

      if (currentlyValidatingElement) {
        var name = getComponentName(currentlyValidatingElement.type);
        var owner = currentlyValidatingElement._owner;
        stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
      } // Delegate to the injected renderer-specific implementation


      var impl = ReactDebugCurrentFrame.getCurrentStack;

      if (impl) {
        stack += impl() || '';
      }

      return stack;
    };
  }
  var ReactSharedInternals = {
    ReactCurrentOwner: ReactCurrentOwner,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: objectAssign
  };
  {
    // Re-export the schedule API(s) for UMD bundles.
    // This avoids introducing a dependency on a new UMD global in a minor update,
    // Since that would be a breaking change (e.g. for all existing CodeSandboxes).
    // This re-export is only required for UMD bundles;
    // CJS bundles use the shared NPM package.
    objectAssign(ReactSharedInternals, {
      Scheduler: {
        unstable_cancelCallback: unstable_cancelCallback,
        unstable_shouldYield: unstable_shouldYield,
        unstable_now: getCurrentTime,
        unstable_scheduleCallback: unstable_scheduleCallback,
        unstable_runWithPriority: unstable_runWithPriority,
        unstable_wrapCallback: unstable_wrapCallback,
        unstable_getCurrentPriorityLevel: unstable_getCurrentPriorityLevel
      },
      SchedulerTracing: {
        __interactionsRef: interactionsRef,
        __subscriberRef: subscriberRef,
        unstable_clear: unstable_clear,
        unstable_getCurrent: unstable_getCurrent,
        unstable_getThreadID: unstable_getThreadID,
        unstable_subscribe: unstable_subscribe,
        unstable_trace: unstable_trace,
        unstable_unsubscribe: unstable_unsubscribe,
        unstable_wrap: unstable_wrap
      }
    });
  }
  {
    objectAssign(ReactSharedInternals, {
      // These should not be included in production.
      ReactDebugCurrentFrame: ReactDebugCurrentFrame,
      // Shim for React DOM 16.0.0 which still destructured (but not used) this.
      // TODO: remove in React 17.0.
      ReactComponentTreeHook: {}
    });
  }
  /**
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var warning = warningWithoutStack$1;
  {
    warning = function (condition, format) {
      if (condition) {
        return;
      }

      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      var stack = ReactDebugCurrentFrame.getStackAddendum(); // eslint-disable-next-line react-internal/warning-and-invariant-args

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      warningWithoutStack$1.apply(undefined, [false, format + '%s'].concat(args, [stack]));
    };
  }
  var warning$1 = warning;
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
  };
  var specialPropKeyWarningShown = void 0;
  var specialPropRefWarningShown = void 0;

  function hasValidRef(config) {
    {
      if (hasOwnProperty$1.call(config, 'ref')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }
    return config.ref !== undefined;
  }

  function hasValidKey(config) {
    {
      if (hasOwnProperty$1.call(config, 'key')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }
    return config.key !== undefined;
  }

  function defineKeyPropWarningGetter(props, displayName) {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;
        warningWithoutStack$1(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }

  function defineRefPropWarningGetter(props, displayName) {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;
        warningWithoutStack$1(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
  /**
   * Factory method to create a new React element. This no longer adheres to
   * the class pattern, so do not use new to call it. Also, no instanceof check
   * will work. Instead test $$typeof field against Symbol.for('react.element') to check
   * if something is a React Element.
   *
   * @param {*} type
   * @param {*} key
   * @param {string|object} ref
   * @param {*} self A *temporary* helper to detect places where `this` is
   * different from the `owner` when React.createElement is called, so that we
   * can warn. We want to get rid of owner and replace string `ref`s with arrow
   * functions, and as long as `this` and owner are the same, there will be no
   * change in behavior.
   * @param {*} source An annotation object (added by a transpiler or otherwise)
   * indicating filename, line number, and/or other information.
   * @param {*} owner
   * @param {*} props
   * @internal
   */


  var ReactElement = function (type, key, ref, self, source, owner, props) {
    var element = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: REACT_ELEMENT_TYPE,
      // Built-in properties that belong on the element
      type: type,
      key: key,
      ref: ref,
      props: props,
      // Record the component responsible for creating this element.
      _owner: owner
    };
    {
      // The validation flag is currently mutative. We put it on
      // an external backing store so that we can freeze the whole object.
      // This can be replaced with a WeakMap once they are implemented in
      // commonly used development environments.
      element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
      // the validation flag non-enumerable (where possible, which should
      // include every environment we run tests in), so the test framework
      // ignores it.

      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      }); // self and source are DEV only properties.

      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      }); // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.

      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });

      if (Object.freeze) {
        Object.freeze(element.props);
        Object.freeze(element);
      }
    }
    return element;
  };
  /**
   * Create and return a new ReactElement of the given type.
   * See https://reactjs.org/docs/react-api.html#createelement
   */


  function createElement(type, config, children) {
    var propName = void 0; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null;
    var self = null;
    var source = null;

    if (config != null) {
      if (hasValidRef(config)) {
        ref = config.ref;
      }

      if (hasValidKey(config)) {
        key = '' + config.key;
      }

      self = config.__self === undefined ? null : config.__self;
      source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

      for (propName in config) {
        if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          props[propName] = config[propName];
        }
      }
    } // Children can be more than one argument, and those are transferred onto
    // the newly allocated props object.


    var childrenLength = arguments.length - 2;

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);

      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }

      {
        if (Object.freeze) {
          Object.freeze(childArray);
        }
      }
      props.children = childArray;
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    {
      if (key || ref) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }

        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
  /**
   * Return a function that produces ReactElements of a given type.
   * See https://reactjs.org/docs/react-api.html#createfactory
   */


  function cloneAndReplaceKey(oldElement, newKey) {
    var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
    return newElement;
  }
  /**
   * Clone and return a new ReactElement using element as the starting point.
   * See https://reactjs.org/docs/react-api.html#cloneelement
   */


  function cloneElement(element, config, children) {
    !!(element === null || element === undefined) ? invariant(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;
    var propName = void 0; // Original props are copied

    var props = objectAssign({}, element.props); // Reserved names are extracted

    var key = element.key;
    var ref = element.ref; // Self is preserved since the owner is preserved.

    var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
    // transpiler, and the original source is probably a better indicator of the
    // true owner.

    var source = element._source; // Owner will be preserved, unless ref is overridden

    var owner = element._owner;

    if (config != null) {
      if (hasValidRef(config)) {
        // Silently steal the ref from the parent.
        ref = config.ref;
        owner = ReactCurrentOwner.current;
      }

      if (hasValidKey(config)) {
        key = '' + config.key;
      } // Remaining properties override existing props


      var defaultProps = void 0;

      if (element.type && element.type.defaultProps) {
        defaultProps = element.type.defaultProps;
      }

      for (propName in config) {
        if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          if (config[propName] === undefined && defaultProps !== undefined) {
            // Resolve default props
            props[propName] = defaultProps[propName];
          } else {
            props[propName] = config[propName];
          }
        }
      }
    } // Children can be more than one argument, and those are transferred onto
    // the newly allocated props object.


    var childrenLength = arguments.length - 2;

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);

      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }

      props.children = childArray;
    }

    return ReactElement(element.type, key, ref, self, source, owner, props);
  }
  /**
   * Verifies the object is a ReactElement.
   * See https://reactjs.org/docs/react-api.html#isvalidelement
   * @param {?object} object
   * @return {boolean} True if `object` is a ReactElement.
   * @final
   */


  function isValidElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }

  var SEPARATOR = '.';
  var SUBSEPARATOR = ':';
  /**
   * Escape and wrap key so it is safe to use as a reactid
   *
   * @param {string} key to be escaped.
   * @return {string} the escaped key.
   */

  function escape(key) {
    var escapeRegex = /[=:]/g;
    var escaperLookup = {
      '=': '=0',
      ':': '=2'
    };
    var escapedString = ('' + key).replace(escapeRegex, function (match) {
      return escaperLookup[match];
    });
    return '$' + escapedString;
  }
  /**
   * TODO: Test that a single child and an array with one item have the same key
   * pattern.
   */


  var didWarnAboutMaps = false;
  var userProvidedKeyEscapeRegex = /\/+/g;

  function escapeUserProvidedKey(text) {
    return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
  }

  var POOL_SIZE = 10;
  var traverseContextPool = [];

  function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
    if (traverseContextPool.length) {
      var traverseContext = traverseContextPool.pop();
      traverseContext.result = mapResult;
      traverseContext.keyPrefix = keyPrefix;
      traverseContext.func = mapFunction;
      traverseContext.context = mapContext;
      traverseContext.count = 0;
      return traverseContext;
    } else {
      return {
        result: mapResult,
        keyPrefix: keyPrefix,
        func: mapFunction,
        context: mapContext,
        count: 0
      };
    }
  }

  function releaseTraverseContext(traverseContext) {
    traverseContext.result = null;
    traverseContext.keyPrefix = null;
    traverseContext.func = null;
    traverseContext.context = null;
    traverseContext.count = 0;

    if (traverseContextPool.length < POOL_SIZE) {
      traverseContextPool.push(traverseContext);
    }
  }
  /**
   * @param {?*} children Children tree container.
   * @param {!string} nameSoFar Name of the key path so far.
   * @param {!function} callback Callback to invoke with each child found.
   * @param {?*} traverseContext Used to pass information throughout the traversal
   * process.
   * @return {!number} The number of children in this subtree.
   */


  function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
    var type = typeof children;

    if (type === 'undefined' || type === 'boolean') {
      // All of the above are perceived as null.
      children = null;
    }

    var invokeCallback = false;

    if (children === null) {
      invokeCallback = true;
    } else {
      switch (type) {
        case 'string':
        case 'number':
          invokeCallback = true;
          break;

        case 'object':
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
          }

      }
    }

    if (invokeCallback) {
      callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
      // so that it's consistent if the number of children grows.
      nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
      return 1;
    }

    var child = void 0;
    var nextName = void 0;
    var subtreeCount = 0; // Count of children found in the current subtree.

    var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        nextName = nextNamePrefix + getComponentKey(child, i);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else {
      var iteratorFn = getIteratorFn(children);

      if (typeof iteratorFn === 'function') {
        {
          // Warn about using Maps as children
          if (iteratorFn === children.entries) {
            !didWarnAboutMaps ? warning$1(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.') : void 0;
            didWarnAboutMaps = true;
          }
        }
        var iterator = iteratorFn.call(children);
        var step = void 0;
        var ii = 0;

        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else if (type === 'object') {
        var addendum = '';
        {
          addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
        }
        var childrenString = '' + children;
        invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
      }
    }

    return subtreeCount;
  }
  /**
   * Traverses children that are typically specified as `props.children`, but
   * might also be specified through attributes:
   *
   * - `traverseAllChildren(this.props.children, ...)`
   * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
   *
   * The `traverseContext` is an optional argument that is passed through the
   * entire traversal. It can be used to store accumulations or anything else that
   * the callback might find relevant.
   *
   * @param {?*} children Children tree object.
   * @param {!function} callback To invoke upon traversing each child.
   * @param {?*} traverseContext Context for traversal.
   * @return {!number} The number of children in this subtree.
   */


  function traverseAllChildren(children, callback, traverseContext) {
    if (children == null) {
      return 0;
    }

    return traverseAllChildrenImpl(children, '', callback, traverseContext);
  }
  /**
   * Generate a key string that identifies a component within a set.
   *
   * @param {*} component A component that could contain a manual key.
   * @param {number} index Index that is used if a manual key is not provided.
   * @return {string}
   */


  function getComponentKey(component, index) {
    // Do some typechecking here since we call this blindly. We want to ensure
    // that we don't block potential future ES APIs.
    if (typeof component === 'object' && component !== null && component.key != null) {
      // Explicit key
      return escape(component.key);
    } // Implicit key determined by the index in the set


    return index.toString(36);
  }

  function forEachSingleChild(bookKeeping, child, name) {
    var func = bookKeeping.func,
        context = bookKeeping.context;
    func.call(context, child, bookKeeping.count++);
  }
  /**
   * Iterates through children that are typically specified as `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
   *
   * The provided forEachFunc(child, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} forEachFunc
   * @param {*} forEachContext Context for forEachContext.
   */


  function forEachChildren(children, forEachFunc, forEachContext) {
    if (children == null) {
      return children;
    }

    var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
    traverseAllChildren(children, forEachSingleChild, traverseContext);
    releaseTraverseContext(traverseContext);
  }

  function mapSingleChildIntoContext(bookKeeping, child, childKey) {
    var result = bookKeeping.result,
        keyPrefix = bookKeeping.keyPrefix,
        func = bookKeeping.func,
        context = bookKeeping.context;
    var mappedChild = func.call(context, child, bookKeeping.count++);

    if (Array.isArray(mappedChild)) {
      mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
        return c;
      });
    } else if (mappedChild != null) {
      if (isValidElement(mappedChild)) {
        mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
        // traverseAllChildren used to do for objects as children
        keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
      }

      result.push(mappedChild);
    }
  }

  function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
    var escapedPrefix = '';

    if (prefix != null) {
      escapedPrefix = escapeUserProvidedKey(prefix) + '/';
    }

    var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
    traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
    releaseTraverseContext(traverseContext);
  }
  /**
   * Maps children that are typically specified as `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenmap
   *
   * The provided mapFunction(child, key, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} func The map function.
   * @param {*} context Context for mapFunction.
   * @return {object} Object containing the ordered map of results.
   */


  function mapChildren(children, func, context) {
    if (children == null) {
      return children;
    }

    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, func, context);
    return result;
  }
  /**
   * Count the number of children that are typically specified as
   * `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrencount
   *
   * @param {?*} children Children tree container.
   * @return {number} The number of children.
   */


  function countChildren(children) {
    return traverseAllChildren(children, function () {
      return null;
    }, null);
  }
  /**
   * Flatten a children object (typically specified as `props.children`) and
   * return an array with appropriately re-keyed children.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
   */


  function toArray(children) {
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
      return child;
    });
    return result;
  }
  /**
   * Returns the first child in a collection of children and verifies that there
   * is only one child in the collection.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenonly
   *
   * The current implementation of this function assumes that a single child gets
   * passed without a wrapper, but the purpose of this helper function is to
   * abstract away the particular structure of children.
   *
   * @param {?object} children Child collection structure.
   * @return {ReactElement} The first and only `ReactElement` contained in the
   * structure.
   */


  function onlyChild(children) {
    !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
    return children;
  }

  function createContext(defaultValue, calculateChangedBits) {
    if (calculateChangedBits === undefined) {
      calculateChangedBits = null;
    } else {
      {
        !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warningWithoutStack$1(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
      }
    }

    var context = {
      $$typeof: REACT_CONTEXT_TYPE,
      _calculateChangedBits: calculateChangedBits,
      // As a workaround to support multiple concurrent renderers, we categorize
      // some renderers as primary and others as secondary. We only expect
      // there to be two concurrent renderers at most: React Native (primary) and
      // Fabric (secondary); React DOM (primary) and React ART (secondary).
      // Secondary renderers store their context values on separate fields.
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      // Used to track how many concurrent renderers this context currently
      // supports within in a single renderer. Such as parallel server rendering.
      _threadCount: 0,
      // These are circular
      Provider: null,
      Consumer: null
    };
    context.Provider = {
      $$typeof: REACT_PROVIDER_TYPE,
      _context: context
    };
    var hasWarnedAboutUsingNestedContextConsumers = false;
    var hasWarnedAboutUsingConsumerProvider = false;
    {
      // A separate object, but proxies back to the original context object for
      // backwards compatibility. It has a different $$typeof, so we can properly
      // warn for the incorrect usage of Context as a Consumer.
      var Consumer = {
        $$typeof: REACT_CONTEXT_TYPE,
        _context: context,
        _calculateChangedBits: context._calculateChangedBits
      }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

      Object.defineProperties(Consumer, {
        Provider: {
          get: function () {
            if (!hasWarnedAboutUsingConsumerProvider) {
              hasWarnedAboutUsingConsumerProvider = true;
              warning$1(false, 'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
            }

            return context.Provider;
          },
          set: function (_Provider) {
            context.Provider = _Provider;
          }
        },
        _currentValue: {
          get: function () {
            return context._currentValue;
          },
          set: function (_currentValue) {
            context._currentValue = _currentValue;
          }
        },
        _currentValue2: {
          get: function () {
            return context._currentValue2;
          },
          set: function (_currentValue2) {
            context._currentValue2 = _currentValue2;
          }
        },
        _threadCount: {
          get: function () {
            return context._threadCount;
          },
          set: function (_threadCount) {
            context._threadCount = _threadCount;
          }
        },
        Consumer: {
          get: function () {
            if (!hasWarnedAboutUsingNestedContextConsumers) {
              hasWarnedAboutUsingNestedContextConsumers = true;
              warning$1(false, 'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
            }

            return context.Consumer;
          }
        }
      }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

      context.Consumer = Consumer;
    }
    {
      context._currentRenderer = null;
      context._currentRenderer2 = null;
    }
    return context;
  }

  function lazy(ctor) {
    return {
      $$typeof: REACT_LAZY_TYPE,
      _ctor: ctor,
      // React uses these fields to store the result.
      _status: -1,
      _result: null
    };
  }

  function forwardRef(render) {
    {
      if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
        warningWithoutStack$1(false, 'forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
      } else if (typeof render !== 'function') {
        warningWithoutStack$1(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
      } else {
        !( // Do not warn for 0 arguments because it could be due to usage of the 'arguments' object
        render.length === 0 || render.length === 2) ? warningWithoutStack$1(false, 'forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.') : void 0;
      }

      if (render != null) {
        !(render.defaultProps == null && render.propTypes == null) ? warningWithoutStack$1(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;
      }
    }
    return {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render: render
    };
  }

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
  }

  function memo(type, compare) {
    {
      if (!isValidElementType(type)) {
        warningWithoutStack$1(false, 'memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
      }
    }
    return {
      $$typeof: REACT_MEMO_TYPE,
      type: type,
      compare: compare === undefined ? null : compare
    };
  }

  function resolveDispatcher() {
    var dispatcher = ReactCurrentOwner.currentDispatcher;
    !(dispatcher !== null) ? invariant(false, 'Hooks can only be called inside the body of a function component.') : void 0;
    return dispatcher;
  }

  function useContext(Context, observedBits) {
    var dispatcher = resolveDispatcher();
    {
      // TODO: add a more generic warning for invalid values.
      if (Context._context !== undefined) {
        var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
        // and nobody should be using this in existing code.

        if (realContext.Consumer === Context) {
          warning$1(false, 'Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
        } else if (realContext.Provider === Context) {
          warning$1(false, 'Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
        }
      }
    }
    return dispatcher.useContext(Context, observedBits);
  }

  function useState(initialState) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
  }

  function useReducer(reducer, initialState, initialAction) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useReducer(reducer, initialState, initialAction);
  }

  function useRef(initialValue) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useRef(initialValue);
  }

  function useEffect(create, inputs) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useEffect(create, inputs);
  }

  function useMutationEffect(create, inputs) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useMutationEffect(create, inputs);
  }

  function useLayoutEffect(create, inputs) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useLayoutEffect(create, inputs);
  }

  function useCallback(callback, inputs) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useCallback(callback, inputs);
  }

  function useMemo(create, inputs) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useMemo(create, inputs);
  }

  function useImperativeMethods(ref, create, inputs) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useImperativeMethods(ref, create, inputs);
  }
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */


  var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var printWarning$1 = function () {};

  {
    var ReactPropTypesSecret = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};

    printWarning$1 = function (text) {
      var message = 'Warning: ' + text;

      if (typeof console !== 'undefined') {
        console.error(message);
      }

      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }
  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */

  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    {
      for (var typeSpecName in typeSpecs) {
        if (typeSpecs.hasOwnProperty(typeSpecName)) {
          var error; // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.

          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.');
              err.name = 'Invariant Violation';
              throw err;
            }

            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }

          if (error && !(error instanceof Error)) {
            printWarning$1((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
          }

          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;
            var stack = getStack ? getStack() : '';
            printWarning$1('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
          }
        }
      }
    }
  }

  var checkPropTypes_1 = checkPropTypes;
  /**
   * ReactElementValidator provides a wrapper around a element factory
   * which validates the props passed to the element. This is intended to be
   * used only in DEV and could be replaced by a static type checker for languages
   * that support it.
   */

  var propTypesMisspellWarningShown = void 0;
  {
    propTypesMisspellWarningShown = false;
  }

  function getDeclarationErrorAddendum() {
    if (ReactCurrentOwner.current) {
      var name = getComponentName(ReactCurrentOwner.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }

  function getSourceInfoErrorAddendum(elementProps) {
    if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
      var source = elementProps.__source;
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */


  var ownerHasKeyUseWarning = {};

  function getCurrentComponentErrorInfo(parentType) {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = '\n\nCheck the top-level render call using <' + parentName + '>.';
      }
    }

    return info;
  }
  /**
   * Warn if the element doesn't have an explicit key assigned to it.
   * This element is in an array. The array could grow and shrink or be
   * reordered. All children that haven't already been validated are required to
   * have a "key" property assigned to it. Error statuses are cached so a warning
   * will only be shown once.
   *
   * @internal
   * @param {ReactElement} element Element that requires a key.
   * @param {*} parentType element's parent's type.
   */


  function validateExplicitKey(element, parentType) {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
      // Give the component that originally created this child.
      childOwner = ' It was passed a child from ' + getComponentName(element._owner.type) + '.';
    }

    setCurrentlyValidatingElement(element);
    {
      warning$1(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
    }
    setCurrentlyValidatingElement(null);
  }
  /**
   * Ensure that every element either is passed in a static location, in an
   * array with an explicit keys property defined, or in an object literal
   * with valid key property.
   *
   * @internal
   * @param {ReactNode} node Statically passed child of any type.
   * @param {*} parentType node's parent's type.
   */


  function validateChildKeys(node, parentType) {
    if (typeof node !== 'object') {
      return;
    }

    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step = void 0;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
  /**
   * Given an element, validate that its props follow the propTypes definition,
   * provided by the type.
   *
   * @param {ReactElement} element
   */


  function validatePropTypes(element) {
    var type = element.type;
    var name = void 0,
        propTypes = void 0;

    if (typeof type === 'function') {
      // Class or function component
      name = type.displayName || type.name;
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && type !== null && type.$$typeof === REACT_FORWARD_REF_TYPE) {
      // ForwardRef
      var functionName = type.render.displayName || type.render.name || '';
      name = type.displayName || (functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef');
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      setCurrentlyValidatingElement(element);
      checkPropTypes_1(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
      setCurrentlyValidatingElement(null);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true;
      warningWithoutStack$1(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function') {
      !type.getDefaultProps.isReactClassApproved ? warningWithoutStack$1(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
    }
  }
  /**
   * Given a fragment, validate that it can only be provided with fragment props
   * @param {ReactElement} fragment
   */


  function validateFragmentProps(fragment) {
    setCurrentlyValidatingElement(fragment);
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        warning$1(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
        break;
      }
    }

    if (fragment.ref !== null) {
      warning$1(false, 'Invalid attribute `ref` supplied to `React.Fragment`.');
    }

    setCurrentlyValidatingElement(null);
  }

  function createElementWithValidation(type, props, children) {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(props);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString = void 0;

      if (type === null) {
        typeString = 'null';
      } else if (Array.isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = '<' + (getComponentName(type.type) || 'Unknown') + ' />';
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      warning$1(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }

  function createFactoryWithValidation(type) {
    var validatedFactory = createElementWithValidation.bind(null, type);
    validatedFactory.type = type; // Legacy hook: remove it

    {
      Object.defineProperty(validatedFactory, 'type', {
        enumerable: false,
        get: function () {
          lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
          Object.defineProperty(this, 'type', {
            value: type
          });
          return type;
        }
      });
    }
    return validatedFactory;
  }

  function cloneElementWithValidation(element, props, children) {
    var newElement = cloneElement.apply(this, arguments);

    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }

    validatePropTypes(newElement);
    return newElement;
  }

  var React = {
    Children: {
      map: mapChildren,
      forEach: forEachChildren,
      count: countChildren,
      toArray: toArray,
      only: onlyChild
    },
    createRef: createRef,
    Component: Component,
    PureComponent: PureComponent,
    createContext: createContext,
    forwardRef: forwardRef,
    lazy: lazy,
    memo: memo,
    Fragment: REACT_FRAGMENT_TYPE,
    StrictMode: REACT_STRICT_MODE_TYPE,
    Suspense: REACT_SUSPENSE_TYPE,
    createElement: createElementWithValidation,
    cloneElement: cloneElementWithValidation,
    createFactory: createFactoryWithValidation,
    isValidElement: isValidElement,
    version: ReactVersion,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
  };

  if (enableStableConcurrentModeAPIs) {
    React.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    React.Profiler = REACT_PROFILER_TYPE;
  } else {
    React.unstable_ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    React.unstable_Profiler = REACT_PROFILER_TYPE;
  }

  if (enableHooks) {
    React.useCallback = useCallback;
    React.useContext = useContext;
    React.useEffect = useEffect;
    React.useImperativeMethods = useImperativeMethods;
    React.useLayoutEffect = useLayoutEffect;
    React.useMemo = useMemo;
    React.useMutationEffect = useMutationEffect;
    React.useReducer = useReducer;
    React.useRef = useRef;
    React.useState = useState;
  }

  var React$2 = Object.freeze({
    default: React
  });
  var React$3 = React$2 && React || React$2; // TODO: decide on the top-level export form.
  // This is hacky but makes it work with both Rollup and Jest.

  var react = React$3.default || React$3;
  return react;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3B1YmxpYy9yZWFjdC5kZXZlbG9wbWVudC5qcyJdLCJuYW1lcyI6WyJnbG9iYWwiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsIlJlYWN0IiwiUmVhY3RWZXJzaW9uIiwiaGFzU3ltYm9sIiwiU3ltYm9sIiwiZm9yIiwiUkVBQ1RfRUxFTUVOVF9UWVBFIiwiUkVBQ1RfUE9SVEFMX1RZUEUiLCJSRUFDVF9GUkFHTUVOVF9UWVBFIiwiUkVBQ1RfU1RSSUNUX01PREVfVFlQRSIsIlJFQUNUX1BST0ZJTEVSX1RZUEUiLCJSRUFDVF9QUk9WSURFUl9UWVBFIiwiUkVBQ1RfQ09OVEVYVF9UWVBFIiwiUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUiLCJSRUFDVF9GT1JXQVJEX1JFRl9UWVBFIiwiUkVBQ1RfU1VTUEVOU0VfVFlQRSIsIlJFQUNUX01FTU9fVFlQRSIsIlJFQUNUX0xBWllfVFlQRSIsIk1BWUJFX0lURVJBVE9SX1NZTUJPTCIsIml0ZXJhdG9yIiwiRkFVWF9JVEVSQVRPUl9TWU1CT0wiLCJnZXRJdGVyYXRvckZuIiwibWF5YmVJdGVyYWJsZSIsIm1heWJlSXRlcmF0b3IiLCJlbmFibGVIb29rcyIsImVuYWJsZVNjaGVkdWxlclRyYWNpbmciLCJlbmFibGVTdGFibGVDb25jdXJyZW50TW9kZUFQSXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsInByb3RvdHlwZSIsInByb3BJc0VudW1lcmFibGUiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsInRvT2JqZWN0IiwidmFsIiwidW5kZWZpbmVkIiwiVHlwZUVycm9yIiwic2hvdWxkVXNlTmF0aXZlIiwiYXNzaWduIiwidGVzdDEiLCJTdHJpbmciLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwidGVzdDIiLCJpIiwiZnJvbUNoYXJDb2RlIiwib3JkZXIyIiwibWFwIiwibiIsImpvaW4iLCJ0ZXN0MyIsInNwbGl0IiwiZm9yRWFjaCIsImxldHRlciIsImtleXMiLCJlcnIiLCJvYmplY3RBc3NpZ24iLCJ0YXJnZXQiLCJzb3VyY2UiLCJmcm9tIiwidG8iLCJzeW1ib2xzIiwicyIsImFyZ3VtZW50cyIsImxlbmd0aCIsImtleSIsImNhbGwiLCJ2YWxpZGF0ZUZvcm1hdCIsImZvcm1hdCIsIkVycm9yIiwiaW52YXJpYW50IiwiY29uZGl0aW9uIiwiYSIsImIiLCJjIiwiZCIsImUiLCJmIiwiZXJyb3IiLCJhcmdzIiwiYXJnSW5kZXgiLCJyZXBsYWNlIiwibmFtZSIsImZyYW1lc1RvUG9wIiwibG93UHJpb3JpdHlXYXJuaW5nIiwicHJpbnRXYXJuaW5nIiwiX2xlbiIsIkFycmF5IiwiX2tleSIsIm1lc3NhZ2UiLCJjb25zb2xlIiwid2FybiIsIngiLCJfbGVuMiIsIl9rZXkyIiwiYXBwbHkiLCJjb25jYXQiLCJsb3dQcmlvcml0eVdhcm5pbmckMSIsIndhcm5pbmdXaXRob3V0U3RhY2siLCJhcmdzV2l0aEZvcm1hdCIsIml0ZW0iLCJ1bnNoaWZ0IiwiRnVuY3Rpb24iLCJ3YXJuaW5nV2l0aG91dFN0YWNrJDEiLCJkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnQiLCJ3YXJuTm9vcCIsInB1YmxpY0luc3RhbmNlIiwiY2FsbGVyTmFtZSIsIl9jb25zdHJ1Y3RvciIsImNvbnN0cnVjdG9yIiwiY29tcG9uZW50TmFtZSIsImRpc3BsYXlOYW1lIiwid2FybmluZ0tleSIsIlJlYWN0Tm9vcFVwZGF0ZVF1ZXVlIiwiaXNNb3VudGVkIiwiZW5xdWV1ZUZvcmNlVXBkYXRlIiwiY2FsbGJhY2siLCJlbnF1ZXVlUmVwbGFjZVN0YXRlIiwiY29tcGxldGVTdGF0ZSIsImVucXVldWVTZXRTdGF0ZSIsInBhcnRpYWxTdGF0ZSIsImVtcHR5T2JqZWN0IiwiZnJlZXplIiwiQ29tcG9uZW50IiwicHJvcHMiLCJjb250ZXh0IiwidXBkYXRlciIsInJlZnMiLCJpc1JlYWN0Q29tcG9uZW50Iiwic2V0U3RhdGUiLCJmb3JjZVVwZGF0ZSIsImRlcHJlY2F0ZWRBUElzIiwicmVwbGFjZVN0YXRlIiwiZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nIiwibWV0aG9kTmFtZSIsImluZm8iLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImZuTmFtZSIsIkNvbXBvbmVudER1bW15IiwiUHVyZUNvbXBvbmVudCIsInB1cmVDb21wb25lbnRQcm90b3R5cGUiLCJpc1B1cmVSZWFjdENvbXBvbmVudCIsImNyZWF0ZVJlZiIsInJlZk9iamVjdCIsImN1cnJlbnQiLCJzZWFsIiwiSW1tZWRpYXRlUHJpb3JpdHkiLCJVc2VyQmxvY2tpbmdQcmlvcml0eSIsIk5vcm1hbFByaW9yaXR5IiwiTG93UHJpb3JpdHkiLCJJZGxlUHJpb3JpdHkiLCJtYXhTaWduZWQzMUJpdEludCIsIklNTUVESUFURV9QUklPUklUWV9USU1FT1VUIiwiVVNFUl9CTE9DS0lOR19QUklPUklUWSIsIk5PUk1BTF9QUklPUklUWV9USU1FT1VUIiwiTE9XX1BSSU9SSVRZX1RJTUVPVVQiLCJJRExFX1BSSU9SSVRZIiwiZmlyc3RDYWxsYmFja05vZGUiLCJjdXJyZW50RGlkVGltZW91dCIsImN1cnJlbnRQcmlvcml0eUxldmVsIiwiY3VycmVudEV2ZW50U3RhcnRUaW1lIiwiY3VycmVudEV4cGlyYXRpb25UaW1lIiwiaXNFeGVjdXRpbmdDYWxsYmFjayIsImlzSG9zdENhbGxiYWNrU2NoZWR1bGVkIiwiaGFzTmF0aXZlUGVyZm9ybWFuY2VOb3ciLCJwZXJmb3JtYW5jZSIsIm5vdyIsImVuc3VyZUhvc3RDYWxsYmFja0lzU2NoZWR1bGVkIiwiZXhwaXJhdGlvblRpbWUiLCJjYW5jZWxIb3N0Q2FsbGJhY2siLCJyZXF1ZXN0SG9zdENhbGxiYWNrIiwiZmx1c2hXb3JrIiwiZmx1c2hGaXJzdENhbGxiYWNrIiwiZmx1c2hlZE5vZGUiLCJuZXh0IiwibGFzdENhbGxiYWNrTm9kZSIsInByZXZpb3VzIiwicHJpb3JpdHlMZXZlbCIsInByZXZpb3VzUHJpb3JpdHlMZXZlbCIsInByZXZpb3VzRXhwaXJhdGlvblRpbWUiLCJjb250aW51YXRpb25DYWxsYmFjayIsImNvbnRpbnVhdGlvbk5vZGUiLCJuZXh0QWZ0ZXJDb250aW51YXRpb24iLCJub2RlIiwiZmx1c2hJbW1lZGlhdGVXb3JrIiwiZGlkVGltZW91dCIsInByZXZpb3VzRGlkVGltZW91dCIsImN1cnJlbnRUaW1lIiwiZ2V0Q3VycmVudFRpbWUiLCJzaG91bGRZaWVsZFRvSG9zdCIsInVuc3RhYmxlX3J1bldpdGhQcmlvcml0eSIsImV2ZW50SGFuZGxlciIsInByZXZpb3VzRXZlbnRTdGFydFRpbWUiLCJ1bnN0YWJsZV93cmFwQ2FsbGJhY2siLCJwYXJlbnRQcmlvcml0eUxldmVsIiwidW5zdGFibGVfc2NoZWR1bGVDYWxsYmFjayIsImRlcHJlY2F0ZWRfb3B0aW9ucyIsInN0YXJ0VGltZSIsInRpbWVvdXQiLCJuZXdOb2RlIiwidW5zdGFibGVfY2FuY2VsQ2FsbGJhY2siLCJjYWxsYmFja05vZGUiLCJ1bnN0YWJsZV9nZXRDdXJyZW50UHJpb3JpdHlMZXZlbCIsInVuc3RhYmxlX3Nob3VsZFlpZWxkIiwibG9jYWxEYXRlIiwiRGF0ZSIsImxvY2FsU2V0VGltZW91dCIsInNldFRpbWVvdXQiLCJsb2NhbENsZWFyVGltZW91dCIsImNsZWFyVGltZW91dCIsImxvY2FsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibG9jYWxDYW5jZWxBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiQU5JTUFUSU9OX0ZSQU1FX1RJTUVPVVQiLCJyQUZJRCIsInJBRlRpbWVvdXRJRCIsInJlcXVlc3RBbmltYXRpb25GcmFtZVdpdGhUaW1lb3V0IiwidGltZXN0YW1wIiwiUGVyZm9ybWFuY2UiLCJ3aW5kb3ciLCJfc2NoZWRNb2NrIiwiaW1wbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfY2FsbGJhY2siLCJfY3VycmVudFRpbWUiLCJfZmx1c2hDYWxsYmFjayIsIm1zIiwiY2IiLCJzY2hlZHVsZWRIb3N0Q2FsbGJhY2siLCJpc01lc3NhZ2VFdmVudFNjaGVkdWxlZCIsInRpbWVvdXRUaW1lIiwiaXNBbmltYXRpb25GcmFtZVNjaGVkdWxlZCIsImlzRmx1c2hpbmdIb3N0Q2FsbGJhY2siLCJmcmFtZURlYWRsaW5lIiwicHJldmlvdXNGcmFtZVRpbWUiLCJhY3RpdmVGcmFtZVRpbWUiLCJtZXNzYWdlS2V5IiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic2xpY2UiLCJpZGxlVGljayIsImV2ZW50IiwiZGF0YSIsInByZXZTY2hlZHVsZWRDYWxsYmFjayIsInByZXZUaW1lb3V0VGltZSIsImFuaW1hdGlvblRpY2siLCJyYWZUaW1lIiwibmV4dEZyYW1lVGltZSIsInBvc3RNZXNzYWdlIiwiYWJzb2x1dGVUaW1lb3V0IiwiREVGQVVMVF9USFJFQURfSUQiLCJpbnRlcmFjdGlvbklEQ291bnRlciIsInRocmVhZElEQ291bnRlciIsImludGVyYWN0aW9uc1JlZiIsInN1YnNjcmliZXJSZWYiLCJTZXQiLCJ1bnN0YWJsZV9jbGVhciIsInByZXZJbnRlcmFjdGlvbnMiLCJ1bnN0YWJsZV9nZXRDdXJyZW50IiwidW5zdGFibGVfZ2V0VGhyZWFkSUQiLCJ1bnN0YWJsZV90cmFjZSIsInRocmVhZElEIiwiaW50ZXJhY3Rpb24iLCJfX2NvdW50IiwiaWQiLCJpbnRlcmFjdGlvbnMiLCJhZGQiLCJzdWJzY3JpYmVyIiwicmV0dXJuVmFsdWUiLCJvbkludGVyYWN0aW9uVHJhY2VkIiwib25Xb3JrU3RhcnRlZCIsIm9uV29ya1N0b3BwZWQiLCJvbkludGVyYWN0aW9uU2NoZWR1bGVkV29ya0NvbXBsZXRlZCIsInVuc3RhYmxlX3dyYXAiLCJ3cmFwcGVkSW50ZXJhY3Rpb25zIiwib25Xb3JrU2NoZWR1bGVkIiwiaGFzUnVuIiwid3JhcHBlZCIsImNhbmNlbCIsIm9uV29ya0NhbmNlbGVkIiwic3Vic2NyaWJlcnMiLCJ1bnN0YWJsZV9zdWJzY3JpYmUiLCJzaXplIiwidW5zdGFibGVfdW5zdWJzY3JpYmUiLCJkZWxldGUiLCJkaWRDYXRjaEVycm9yIiwiY2F1Z2h0RXJyb3IiLCJSZWFjdEN1cnJlbnRPd25lciIsImN1cnJlbnREaXNwYXRjaGVyIiwiQkVGT1JFX1NMQVNIX1JFIiwiZGVzY3JpYmVDb21wb25lbnRGcmFtZSIsIm93bmVyTmFtZSIsInNvdXJjZUluZm8iLCJwYXRoIiwiZmlsZU5hbWUiLCJ0ZXN0IiwibWF0Y2giLCJwYXRoQmVmb3JlU2xhc2giLCJmb2xkZXJOYW1lIiwibGluZU51bWJlciIsIlJlc29sdmVkIiwicmVmaW5lUmVzb2x2ZWRMYXp5Q29tcG9uZW50IiwibGF6eUNvbXBvbmVudCIsIl9zdGF0dXMiLCJfcmVzdWx0IiwiZ2V0V3JhcHBlZE5hbWUiLCJvdXRlclR5cGUiLCJpbm5lclR5cGUiLCJ3cmFwcGVyTmFtZSIsImZ1bmN0aW9uTmFtZSIsImdldENvbXBvbmVudE5hbWUiLCJ0eXBlIiwidGFnIiwiJCR0eXBlb2YiLCJyZW5kZXIiLCJ0aGVuYWJsZSIsInJlc29sdmVkVGhlbmFibGUiLCJSZWFjdERlYnVnQ3VycmVudEZyYW1lIiwiY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQiLCJzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCIsImVsZW1lbnQiLCJnZXRDdXJyZW50U3RhY2siLCJnZXRTdGFja0FkZGVuZHVtIiwic3RhY2siLCJvd25lciIsIl9vd25lciIsIl9zb3VyY2UiLCJSZWFjdFNoYXJlZEludGVybmFscyIsIlNjaGVkdWxlciIsInVuc3RhYmxlX25vdyIsIlNjaGVkdWxlclRyYWNpbmciLCJfX2ludGVyYWN0aW9uc1JlZiIsIl9fc3Vic2NyaWJlclJlZiIsIlJlYWN0Q29tcG9uZW50VHJlZUhvb2siLCJ3YXJuaW5nIiwid2FybmluZyQxIiwiaGFzT3duUHJvcGVydHkkMSIsIlJFU0VSVkVEX1BST1BTIiwicmVmIiwiX19zZWxmIiwiX19zb3VyY2UiLCJzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biIsInNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duIiwiaGFzVmFsaWRSZWYiLCJjb25maWciLCJnZXR0ZXIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc1JlYWN0V2FybmluZyIsImhhc1ZhbGlkS2V5IiwiZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIiLCJ3YXJuQWJvdXRBY2Nlc3NpbmdLZXkiLCJjb25maWd1cmFibGUiLCJkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlciIsIndhcm5BYm91dEFjY2Vzc2luZ1JlZiIsIlJlYWN0RWxlbWVudCIsInNlbGYiLCJfc3RvcmUiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJ2YWx1ZSIsImNyZWF0ZUVsZW1lbnQiLCJjaGlsZHJlbiIsInByb3BOYW1lIiwiY2hpbGRyZW5MZW5ndGgiLCJjaGlsZEFycmF5IiwiZGVmYXVsdFByb3BzIiwiY2xvbmVBbmRSZXBsYWNlS2V5Iiwib2xkRWxlbWVudCIsIm5ld0tleSIsIm5ld0VsZW1lbnQiLCJfc2VsZiIsImNsb25lRWxlbWVudCIsImlzVmFsaWRFbGVtZW50Iiwib2JqZWN0IiwiU0VQQVJBVE9SIiwiU1VCU0VQQVJBVE9SIiwiZXNjYXBlIiwiZXNjYXBlUmVnZXgiLCJlc2NhcGVyTG9va3VwIiwiZXNjYXBlZFN0cmluZyIsImRpZFdhcm5BYm91dE1hcHMiLCJ1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCIsImVzY2FwZVVzZXJQcm92aWRlZEtleSIsInRleHQiLCJQT09MX1NJWkUiLCJ0cmF2ZXJzZUNvbnRleHRQb29sIiwiZ2V0UG9vbGVkVHJhdmVyc2VDb250ZXh0IiwibWFwUmVzdWx0Iiwia2V5UHJlZml4IiwibWFwRnVuY3Rpb24iLCJtYXBDb250ZXh0IiwidHJhdmVyc2VDb250ZXh0IiwicG9wIiwicmVzdWx0IiwiZnVuYyIsImNvdW50IiwicmVsZWFzZVRyYXZlcnNlQ29udGV4dCIsInB1c2giLCJ0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbCIsIm5hbWVTb0ZhciIsImludm9rZUNhbGxiYWNrIiwiZ2V0Q29tcG9uZW50S2V5IiwiY2hpbGQiLCJuZXh0TmFtZSIsInN1YnRyZWVDb3VudCIsIm5leHROYW1lUHJlZml4IiwiaXNBcnJheSIsIml0ZXJhdG9yRm4iLCJlbnRyaWVzIiwic3RlcCIsImlpIiwiZG9uZSIsImFkZGVuZHVtIiwiY2hpbGRyZW5TdHJpbmciLCJ0cmF2ZXJzZUFsbENoaWxkcmVuIiwiY29tcG9uZW50IiwiaW5kZXgiLCJmb3JFYWNoU2luZ2xlQ2hpbGQiLCJib29rS2VlcGluZyIsImZvckVhY2hDaGlsZHJlbiIsImZvckVhY2hGdW5jIiwiZm9yRWFjaENvbnRleHQiLCJtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0IiwiY2hpbGRLZXkiLCJtYXBwZWRDaGlsZCIsIm1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwiLCJhcnJheSIsInByZWZpeCIsImVzY2FwZWRQcmVmaXgiLCJtYXBDaGlsZHJlbiIsImNvdW50Q2hpbGRyZW4iLCJ0b0FycmF5Iiwib25seUNoaWxkIiwiY3JlYXRlQ29udGV4dCIsImRlZmF1bHRWYWx1ZSIsImNhbGN1bGF0ZUNoYW5nZWRCaXRzIiwiX2NhbGN1bGF0ZUNoYW5nZWRCaXRzIiwiX2N1cnJlbnRWYWx1ZSIsIl9jdXJyZW50VmFsdWUyIiwiX3RocmVhZENvdW50IiwiUHJvdmlkZXIiLCJDb25zdW1lciIsIl9jb250ZXh0IiwiaGFzV2FybmVkQWJvdXRVc2luZ05lc3RlZENvbnRleHRDb25zdW1lcnMiLCJoYXNXYXJuZWRBYm91dFVzaW5nQ29uc3VtZXJQcm92aWRlciIsImRlZmluZVByb3BlcnRpZXMiLCJzZXQiLCJfUHJvdmlkZXIiLCJfY3VycmVudFJlbmRlcmVyIiwiX2N1cnJlbnRSZW5kZXJlcjIiLCJsYXp5IiwiY3RvciIsIl9jdG9yIiwiZm9yd2FyZFJlZiIsInByb3BUeXBlcyIsImlzVmFsaWRFbGVtZW50VHlwZSIsIm1lbW8iLCJjb21wYXJlIiwicmVzb2x2ZURpc3BhdGNoZXIiLCJkaXNwYXRjaGVyIiwidXNlQ29udGV4dCIsIkNvbnRleHQiLCJvYnNlcnZlZEJpdHMiLCJyZWFsQ29udGV4dCIsInVzZVN0YXRlIiwiaW5pdGlhbFN0YXRlIiwidXNlUmVkdWNlciIsInJlZHVjZXIiLCJpbml0aWFsQWN0aW9uIiwidXNlUmVmIiwiaW5pdGlhbFZhbHVlIiwidXNlRWZmZWN0IiwiY3JlYXRlIiwiaW5wdXRzIiwidXNlTXV0YXRpb25FZmZlY3QiLCJ1c2VMYXlvdXRFZmZlY3QiLCJ1c2VDYWxsYmFjayIsInVzZU1lbW8iLCJ1c2VJbXBlcmF0aXZlTWV0aG9kcyIsIlJlYWN0UHJvcFR5cGVzU2VjcmV0JDEiLCJSZWFjdFByb3BUeXBlc1NlY3JldF8xIiwicHJpbnRXYXJuaW5nJDEiLCJSZWFjdFByb3BUeXBlc1NlY3JldCIsImxvZ2dlZFR5cGVGYWlsdXJlcyIsImNoZWNrUHJvcFR5cGVzIiwidHlwZVNwZWNzIiwidmFsdWVzIiwibG9jYXRpb24iLCJnZXRTdGFjayIsInR5cGVTcGVjTmFtZSIsImV4IiwiY2hlY2tQcm9wVHlwZXNfMSIsInByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duIiwiZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtIiwiZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0iLCJlbGVtZW50UHJvcHMiLCJvd25lckhhc0tleVVzZVdhcm5pbmciLCJnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvIiwicGFyZW50VHlwZSIsInBhcmVudE5hbWUiLCJ2YWxpZGF0ZUV4cGxpY2l0S2V5IiwidmFsaWRhdGVkIiwiY3VycmVudENvbXBvbmVudEVycm9ySW5mbyIsImNoaWxkT3duZXIiLCJ2YWxpZGF0ZUNoaWxkS2V5cyIsInZhbGlkYXRlUHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiZ2V0RGVmYXVsdFByb3BzIiwiaXNSZWFjdENsYXNzQXBwcm92ZWQiLCJ2YWxpZGF0ZUZyYWdtZW50UHJvcHMiLCJmcmFnbWVudCIsImNyZWF0ZUVsZW1lbnRXaXRoVmFsaWRhdGlvbiIsInZhbGlkVHlwZSIsInR5cGVTdHJpbmciLCJjcmVhdGVGYWN0b3J5V2l0aFZhbGlkYXRpb24iLCJ2YWxpZGF0ZWRGYWN0b3J5IiwiYmluZCIsImNsb25lRWxlbWVudFdpdGhWYWxpZGF0aW9uIiwiQ2hpbGRyZW4iLCJvbmx5IiwiRnJhZ21lbnQiLCJTdHJpY3RNb2RlIiwiU3VzcGVuc2UiLCJjcmVhdGVGYWN0b3J5IiwidmVyc2lvbiIsIl9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEIiwiQ29uY3VycmVudE1vZGUiLCJQcm9maWxlciIsInVuc3RhYmxlX0NvbmN1cnJlbnRNb2RlIiwidW5zdGFibGVfUHJvZmlsZXIiLCJSZWFjdCQyIiwiZGVmYXVsdCIsIlJlYWN0JDMiLCJyZWFjdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7O0FBRUMsV0FBVUEsTUFBVixFQUFrQkMsT0FBbEIsRUFBMkI7QUFDM0IsU0FBT0MsT0FBUCxLQUFtQixRQUFuQixJQUErQixPQUFPQyxNQUFQLEtBQWtCLFdBQWpELEdBQStEQSxNQUFNLENBQUNELE9BQVAsR0FBaUJELE9BQU8sRUFBdkYsR0FDQSxPQUFPRyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDQSxNQUFNLENBQUNDLEdBQXZDLEdBQTZDRCxNQUFNLENBQUNILE9BQUQsQ0FBbkQsR0FDQ0QsTUFBTSxDQUFDTSxLQUFQLEdBQWVMLE9BQU8sRUFGdkI7QUFHQSxDQUpBLEVBSUMsSUFKRCxFQUlRLFlBQVk7QUFBRSxlQUFGLENBRXJCOztBQUVBLE1BQUlNLFlBQVksR0FBRyxRQUFuQixDQUpxQixDQU1yQjtBQUNBOztBQUNBLE1BQUlDLFNBQVMsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDQSxNQUFNLENBQUNDLEdBQXZEO0FBRUEsTUFBSUMsa0JBQWtCLEdBQUdILFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxHQUFQLENBQVcsZUFBWCxDQUFILEdBQWlDLE1BQW5FO0FBQ0EsTUFBSUUsaUJBQWlCLEdBQUdKLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxHQUFQLENBQVcsY0FBWCxDQUFILEdBQWdDLE1BQWpFO0FBQ0EsTUFBSUcsbUJBQW1CLEdBQUdMLFNBQVMs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QjtBQUNBeGQsSUFBQUEsS0FBSyxDQUFDK2Qsb0JBQU4sR0FBNkJBLG9CQUE3QjtBQUNBL2QsSUFBQUEsS0FBSyxDQUFDNGQsZUFBTixHQUF3QkEsZUFBeEI7QUFDQTVkLElBQUFBLEtBQUssQ0FBQzhkLE9BQU4sR0FBZ0JBLE9BQWhCO0FBQ0E5ZCxJQUFBQSxLQUFLLENBQUMyZCxpQkFBTixHQUEwQkEsaUJBQTFCO0FBQ0EzZCxJQUFBQSxLQUFLLENBQUNtZCxVQUFOLEdBQW1CQSxVQUFuQjtBQUNBbmQsSUFBQUEsS0FBSyxDQUFDc2QsTUFBTixHQUFlQSxNQUFmO0FBQ0F0ZCxJQUFBQSxLQUFLLENBQUNpZCxRQUFOLEdBQWlCQSxRQUFqQjtBQUNEOztBQUlELE1BQUlrRSxPQUFPLEdBQUd4ZixNQUFNLENBQUM2RixNQUFQLENBQWM7QUFDM0I0WixJQUFBQSxPQUFPLEVBQUVwaEI7QUFEa0IsR0FBZCxDQUFkO0FBSUEsTUFBSXFoQixPQUFPLEdBQUtGLE9BQU8sSUFBSW5oQixLQUFiLElBQXdCbWhCLE9BQXRDLENBNzdGcUIsQ0ErN0ZyQjtBQUNBOztBQUNBLE1BQUlHLEtBQUssR0FBR0QsT0FBTyxDQUFDRCxPQUFSLElBQW1CQyxPQUEvQjtBQUVBLFNBQU9DLEtBQVA7QUFFQyxDQXo4RkEsQ0FBRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuNi4xXG4gKiByZWFjdC5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLlJlYWN0ID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4vLyBUT0RPOiB0aGlzIGlzIHNwZWNpYWwgYmVjYXVzZSBpdCBnZXRzIGltcG9ydGVkIGR1cmluZyBidWlsZC5cblxudmFyIFJlYWN0VmVyc2lvbiA9ICcxNi42LjMnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTtcblxudmFyIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29uY3VycmVudF9tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJykgOiAweGVhZDA7XG52YXIgUkVBQ1RfU1VTUEVOU0VfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlJykgOiAweGVhZDE7XG52YXIgUkVBQ1RfTUVNT19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubWVtbycpIDogMHhlYWQzO1xudmFyIFJFQUNUX0xBWllfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKSA6IDB4ZWFkNDtcblxudmFyIE1BWUJFX0lURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InO1xuXG5mdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgaWYgKG1heWJlSXRlcmFibGUgPT09IG51bGwgfHwgdHlwZW9mIG1heWJlSXRlcmFibGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIG1heWJlSXRlcmF0b3IgPSBNQVlCRV9JVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtNQVlCRV9JVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdO1xuICBpZiAodHlwZW9mIG1heWJlSXRlcmF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gbWF5YmVJdGVyYXRvcjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxudmFyIGVuYWJsZUhvb2tzID0gZmFsc2U7XG4vLyBIZWxwcyBpZGVudGlmeSBzaWRlIGVmZmVjdHMgaW4gYmVnaW4tcGhhc2UgbGlmZWN5Y2xlIGhvb2tzIGFuZCBzZXRTdGF0ZSByZWR1Y2VyczpcblxuXG4vLyBJbiBzb21lIGNhc2VzLCBTdHJpY3RNb2RlIHNob3VsZCBhbHNvIGRvdWJsZS1yZW5kZXIgbGlmZWN5Y2xlcy5cbi8vIFRoaXMgY2FuIGJlIGNvbmZ1c2luZyBmb3IgdGVzdHMgdGhvdWdoLFxuLy8gQW5kIGl0IGNhbiBiZSBiYWQgZm9yIHBlcmZvcm1hbmNlIGluIHByb2R1Y3Rpb24uXG4vLyBUaGlzIGZlYXR1cmUgZmxhZyBjYW4gYmUgdXNlZCB0byBjb250cm9sIHRoZSBiZWhhdmlvcjpcblxuXG4vLyBUbyBwcmVzZXJ2ZSB0aGUgXCJQYXVzZSBvbiBjYXVnaHQgZXhjZXB0aW9uc1wiIGJlaGF2aW9yIG9mIHRoZSBkZWJ1Z2dlciwgd2Vcbi8vIHJlcGxheSB0aGUgYmVnaW4gcGhhc2Ugb2YgYSBmYWlsZWQgY29tcG9uZW50IGluc2lkZSBpbnZva2VHdWFyZGVkQ2FsbGJhY2suXG5cblxuLy8gV2FybiBhYm91dCBkZXByZWNhdGVkLCBhc3luYy11bnNhZmUgbGlmZWN5Y2xlczsgcmVsYXRlcyB0byBSRkMgIzY6XG5cblxuLy8gR2F0aGVyIGFkdmFuY2VkIHRpbWluZyBtZXRyaWNzIGZvciBQcm9maWxlciBzdWJ0cmVlcy5cblxuXG4vLyBUcmFjZSB3aGljaCBpbnRlcmFjdGlvbnMgdHJpZ2dlciBlYWNoIGNvbW1pdC5cbnZhciBlbmFibGVTY2hlZHVsZXJUcmFjaW5nID0gdHJ1ZTtcblxuLy8gT25seSB1c2VkIGluIHd3dyBidWlsZHMuXG5cblxuLy8gT25seSB1c2VkIGluIHd3dyBidWlsZHMuXG5cblxuLy8gUmVhY3QgRmlyZTogcHJldmVudCB0aGUgdmFsdWUgYW5kIGNoZWNrZWQgYXR0cmlidXRlcyBmcm9tIHN5bmNpbmdcbi8vIHdpdGggdGhlaXIgcmVsYXRlZCBET00gcHJvcGVydGllc1xuXG5cbi8vIFRoZXNlIEFQSXMgd2lsbCBubyBsb25nZXIgYmUgXCJ1bnN0YWJsZVwiIGluIHRoZSB1cGNvbWluZyAxNi43IHJlbGVhc2UsXG4vLyBDb250cm9sIHRoaXMgYmVoYXZpb3Igd2l0aCBhIGZsYWcgdG8gc3VwcG9ydCAxNi42IG1pbm9yIHJlbGVhc2VzIGluIHRoZSBtZWFud2hpbGUuXG52YXIgZW5hYmxlU3RhYmxlQ29uY3VycmVudE1vZGVBUElzID0gZmFsc2U7XG5cbi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbnZhciBvYmplY3RBc3NpZ24gPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpO1xuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yID0gdm9pZCAwO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG4vLyBSZWx5aW5nIG9uIHRoZSBgaW52YXJpYW50KClgIGltcGxlbWVudGF0aW9uIGxldHMgdXNcbi8vIHByZXNlcnZlIHRoZSBmb3JtYXQgYW5kIHBhcmFtcyBpbiB0aGUgd3d3IGJ1aWxkcy5cblxuLyoqXG4gKiBGb3JrZWQgZnJvbSBmYmpzL3dhcm5pbmc6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmJqcy9ibG9iL2U2NmJhMjBhZDViZTQzM2ViNTQ0MjNmMmIwOTdkODI5MzI0ZDlkZTYvcGFja2FnZXMvZmJqcy9zcmMvX19mb3Jrc19fL3dhcm5pbmcuanNcbiAqXG4gKiBPbmx5IGNoYW5nZSBpcyB3ZSB1c2UgY29uc29sZS53YXJuIGluc3RlYWQgb2YgY29uc29sZS5lcnJvcixcbiAqIGFuZCBkbyBub3RoaW5nIHdoZW4gJ2NvbnNvbGUnIGlzIG5vdCBzdXBwb3J0ZWQuXG4gKiBUaGlzIHJlYWxseSBzaW1wbGlmaWVzIHRoZSBjb2RlLlxuICogLS0tXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uICgpIHt9O1xuXG57XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIGxvd1ByaW9yaXR5V2FybmluZyA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgbG93UHJpb3JpdHlXYXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxudmFyIGxvd1ByaW9yaXR5V2FybmluZyQxID0gbG93UHJpb3JpdHlXYXJuaW5nO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZ1dpdGhvdXRTdGFjayA9IGZ1bmN0aW9uICgpIHt9O1xuXG57XG4gIHdhcm5pbmdXaXRob3V0U3RhY2sgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAyID8gX2xlbiAtIDIgOiAwKSwgX2tleSA9IDI7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZ1dpdGhvdXRTdGFjayhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gOCkge1xuICAgICAgLy8gQ2hlY2sgYmVmb3JlIHRoZSBjb25kaXRpb24gdG8gY2F0Y2ggdmlvbGF0aW9ucyBlYXJseS5cbiAgICAgIHRocm93IG5ldyBFcnJvcignd2FybmluZ1dpdGhvdXRTdGFjaygpIGN1cnJlbnRseSBzdXBwb3J0cyBhdCBtb3N0IDggYXJndW1lbnRzLicpO1xuICAgIH1cbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBhcmdzV2l0aEZvcm1hdCA9IGFyZ3MubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiAnJyArIGl0ZW07XG4gICAgICB9KTtcbiAgICAgIGFyZ3NXaXRoRm9ybWF0LnVuc2hpZnQoJ1dhcm5pbmc6ICcgKyBmb3JtYXQpO1xuXG4gICAgICAvLyBXZSBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBzcHJlYWQgKG9yIC5hcHBseSkgZGlyZWN0bHkgYmVjYXVzZSBpdFxuICAgICAgLy8gYnJlYWtzIElFOTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8xMzYxMFxuICAgICAgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSwgYXJnc1dpdGhGb3JtYXQpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG52YXIgd2FybmluZ1dpdGhvdXRTdGFjayQxID0gd2FybmluZ1dpdGhvdXRTdGFjaztcblxudmFyIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudCA9IHt9O1xuXG5mdW5jdGlvbiB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICB7XG4gICAgdmFyIF9jb25zdHJ1Y3RvciA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gX2NvbnN0cnVjdG9yICYmIChfY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgX2NvbnN0cnVjdG9yLm5hbWUpIHx8ICdSZWFjdENsYXNzJztcbiAgICB2YXIgd2FybmluZ0tleSA9IGNvbXBvbmVudE5hbWUgKyAnLicgKyBjYWxsZXJOYW1lO1xuICAgIGlmIChkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnRbd2FybmluZ0tleV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2FybmluZ1dpdGhvdXRTdGFjayQxKGZhbHNlLCBcIkNhbid0IGNhbGwgJXMgb24gYSBjb21wb25lbnQgdGhhdCBpcyBub3QgeWV0IG1vdW50ZWQuIFwiICsgJ1RoaXMgaXMgYSBuby1vcCwgYnV0IGl0IG1pZ2h0IGluZGljYXRlIGEgYnVnIGluIHlvdXIgYXBwbGljYXRpb24uICcgKyAnSW5zdGVhZCwgYXNzaWduIHRvIGB0aGlzLnN0YXRlYCBkaXJlY3RseSBvciBkZWZpbmUgYSBgc3RhdGUgPSB7fTtgICcgKyAnY2xhc3MgcHJvcGVydHkgd2l0aCB0aGUgZGVzaXJlZCBzdGF0ZSBpbiB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNvbXBvbmVudE5hbWUpO1xuICAgIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudFt3YXJuaW5nS2V5XSA9IHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBhYnN0cmFjdCBBUEkgZm9yIGFuIHVwZGF0ZSBxdWV1ZS5cbiAqL1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0ge1xuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgY29tcG9uZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gY2FsbGVyTmFtZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnZm9yY2VVcGRhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVwbGFjZXMgYWxsIG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIG9yIGBzZXRTdGF0ZWAgdG8gbXV0YXRlIHN0YXRlLlxuICAgKiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gICAqXG4gICAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gICAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29tcGxldGVTdGF0ZSBOZXh0IHN0YXRlLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IGNhbGxlck5hbWUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IE5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gIH1cbn07XG5cbnZhciBlbXB0eU9iamVjdCA9IHt9O1xue1xuICBPYmplY3QuZnJlZXplKGVtcHR5T2JqZWN0KTtcbn1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGhlbHBlcnMgZm9yIHRoZSB1cGRhdGluZyBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgLy8gSWYgYSBjb21wb25lbnQgaGFzIHN0cmluZyByZWZzLCB3ZSB3aWxsIGFzc2lnbiBhIGRpZmZlcmVudCBvYmplY3QgbGF0ZXIuXG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxuQ29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ID0ge307XG5cbi8qKlxuICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyB0byBtdXRhdGVcbiAqIHN0YXRlLiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgY2FsbHMgdG8gYHNldFN0YXRlYCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5LFxuICogYXMgdGhleSBtYXkgZXZlbnR1YWxseSBiZSBiYXRjaGVkIHRvZ2V0aGVyLiAgWW91IGNhbiBwcm92aWRlIGFuIG9wdGlvbmFsXG4gKiBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgY2FsbCB0byBzZXRTdGF0ZSBpcyBhY3R1YWxseVxuICogY29tcGxldGVkLlxuICpcbiAqIFdoZW4gYSBmdW5jdGlvbiBpcyBwcm92aWRlZCB0byBzZXRTdGF0ZSwgaXQgd2lsbCBiZSBjYWxsZWQgYXQgc29tZSBwb2ludCBpblxuICogdGhlIGZ1dHVyZSAobm90IHN5bmNocm9ub3VzbHkpLiBJdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSB1cCB0byBkYXRlXG4gKiBjb21wb25lbnQgYXJndW1lbnRzIChzdGF0ZSwgcHJvcHMsIGNvbnRleHQpLiBUaGVzZSB2YWx1ZXMgY2FuIGJlIGRpZmZlcmVudFxuICogZnJvbSB0aGlzLiogYmVjYXVzZSB5b3VyIGZ1bmN0aW9uIG1heSBiZSBjYWxsZWQgYWZ0ZXIgcmVjZWl2ZVByb3BzIGJ1dCBiZWZvcmVcbiAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSwgYW5kIHRoaXMgbmV3IHN0YXRlLCBwcm9wcywgYW5kIGNvbnRleHQgd2lsbCBub3QgeWV0IGJlXG4gKiBhc3NpZ25lZCB0byB0aGlzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIG9yIGZ1bmN0aW9uIHRvXG4gKiAgICAgICAgcHJvZHVjZSBuZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggY3VycmVudCBzdGF0ZS5cbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5Db21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgISh0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnZnVuY3Rpb24nIHx8IHBhcnRpYWxTdGF0ZSA9PSBudWxsKSA/IGludmFyaWFudChmYWxzZSwgJ3NldFN0YXRlKC4uLik6IHRha2VzIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMgdG8gdXBkYXRlIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzLicpIDogdm9pZCAwO1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsIHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2ssICdzZXRTdGF0ZScpO1xufTtcblxuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cbkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVGb3JjZVVwZGF0ZSh0aGlzLCBjYWxsYmFjaywgJ2ZvcmNlVXBkYXRlJyk7XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQgQVBJcy4gVGhlc2UgQVBJcyB1c2VkIHRvIGV4aXN0IG9uIGNsYXNzaWMgUmVhY3QgY2xhc3NlcyBidXQgc2luY2VcbiAqIHdlIHdvdWxkIGxpa2UgdG8gZGVwcmVjYXRlIHRoZW0sIHdlJ3JlIG5vdCBnb2luZyB0byBtb3ZlIHRoZW0gb3ZlciB0byB0aGlzXG4gKiBtb2Rlcm4gYmFzZSBjbGFzcy4gSW5zdGVhZCwgd2UgZGVmaW5lIGEgZ2V0dGVyIHRoYXQgd2FybnMgaWYgaXQncyBhY2Nlc3NlZC5cbiAqL1xue1xuICB2YXIgZGVwcmVjYXRlZEFQSXMgPSB7XG4gICAgaXNNb3VudGVkOiBbJ2lzTW91bnRlZCcsICdJbnN0ZWFkLCBtYWtlIHN1cmUgdG8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucyBhbmQgcGVuZGluZyByZXF1ZXN0cyBpbiAnICsgJ2NvbXBvbmVudFdpbGxVbm1vdW50IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLiddLFxuICAgIHJlcGxhY2VTdGF0ZTogWydyZXBsYWNlU3RhdGUnLCAnUmVmYWN0b3IgeW91ciBjb2RlIHRvIHVzZSBzZXRTdGF0ZSBpbnN0ZWFkIChzZWUgJyArICdodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzMyMzYpLiddXG4gIH07XG4gIHZhciBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgaW5mbykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb21wb25lbnQucHJvdG90eXBlLCBtZXRob2ROYW1lLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICclcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlcycsIGluZm9bMF0sIGluZm9bMV0pO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICBmb3IgKHZhciBmbk5hbWUgaW4gZGVwcmVjYXRlZEFQSXMpIHtcbiAgICBpZiAoZGVwcmVjYXRlZEFQSXMuaGFzT3duUHJvcGVydHkoZm5OYW1lKSkge1xuICAgICAgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nKGZuTmFtZSwgZGVwcmVjYXRlZEFQSXNbZm5OYW1lXSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIENvbXBvbmVudER1bW15KCkge31cbkNvbXBvbmVudER1bW15LnByb3RvdHlwZSA9IENvbXBvbmVudC5wcm90b3R5cGU7XG5cbi8qKlxuICogQ29udmVuaWVuY2UgY29tcG9uZW50IHdpdGggZGVmYXVsdCBzaGFsbG93IGVxdWFsaXR5IGNoZWNrIGZvciBzQ1UuXG4gKi9cbmZ1bmN0aW9uIFB1cmVDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAvLyBJZiBhIGNvbXBvbmVudCBoYXMgc3RyaW5nIHJlZnMsIHdlIHdpbGwgYXNzaWduIGEgZGlmZmVyZW50IG9iamVjdCBsYXRlci5cbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cbnZhciBwdXJlQ29tcG9uZW50UHJvdG90eXBlID0gUHVyZUNvbXBvbmVudC5wcm90b3R5cGUgPSBuZXcgQ29tcG9uZW50RHVtbXkoKTtcbnB1cmVDb21wb25lbnRQcm90b3R5cGUuY29uc3RydWN0b3IgPSBQdXJlQ29tcG9uZW50O1xuLy8gQXZvaWQgYW4gZXh0cmEgcHJvdG90eXBlIGp1bXAgZm9yIHRoZXNlIG1ldGhvZHMuXG5vYmplY3RBc3NpZ24ocHVyZUNvbXBvbmVudFByb3RvdHlwZSwgQ29tcG9uZW50LnByb3RvdHlwZSk7XG5wdXJlQ29tcG9uZW50UHJvdG90eXBlLmlzUHVyZVJlYWN0Q29tcG9uZW50ID0gdHJ1ZTtcblxuLy8gYW4gaW1tdXRhYmxlIG9iamVjdCB3aXRoIGEgc2luZ2xlIG11dGFibGUgdmFsdWVcbmZ1bmN0aW9uIGNyZWF0ZVJlZigpIHtcbiAgdmFyIHJlZk9iamVjdCA9IHtcbiAgICBjdXJyZW50OiBudWxsXG4gIH07XG4gIHtcbiAgICBPYmplY3Quc2VhbChyZWZPYmplY3QpO1xuICB9XG4gIHJldHVybiByZWZPYmplY3Q7XG59XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXZhciAqL1xuXG4vLyBUT0RPOiBVc2Ugc3ltYm9scz9cbnZhciBJbW1lZGlhdGVQcmlvcml0eSA9IDE7XG52YXIgVXNlckJsb2NraW5nUHJpb3JpdHkgPSAyO1xudmFyIE5vcm1hbFByaW9yaXR5ID0gMztcbnZhciBMb3dQcmlvcml0eSA9IDQ7XG52YXIgSWRsZVByaW9yaXR5ID0gNTtcblxuLy8gTWF4IDMxIGJpdCBpbnRlZ2VyLiBUaGUgbWF4IGludGVnZXIgc2l6ZSBpbiBWOCBmb3IgMzItYml0IHN5c3RlbXMuXG4vLyBNYXRoLnBvdygyLCAzMCkgLSAxXG4vLyAwYjExMTExMTExMTExMTExMTExMTExMTExMTExMTExMVxudmFyIG1heFNpZ25lZDMxQml0SW50ID0gMTA3Mzc0MTgyMztcblxuLy8gVGltZXMgb3V0IGltbWVkaWF0ZWx5XG52YXIgSU1NRURJQVRFX1BSSU9SSVRZX1RJTUVPVVQgPSAtMTtcbi8vIEV2ZW50dWFsbHkgdGltZXMgb3V0XG52YXIgVVNFUl9CTE9DS0lOR19QUklPUklUWSA9IDI1MDtcbnZhciBOT1JNQUxfUFJJT1JJVFlfVElNRU9VVCA9IDUwMDA7XG52YXIgTE9XX1BSSU9SSVRZX1RJTUVPVVQgPSAxMDAwMDtcbi8vIE5ldmVyIHRpbWVzIG91dFxudmFyIElETEVfUFJJT1JJVFkgPSBtYXhTaWduZWQzMUJpdEludDtcblxuLy8gQ2FsbGJhY2tzIGFyZSBzdG9yZWQgYXMgYSBjaXJjdWxhciwgZG91Ymx5IGxpbmtlZCBsaXN0LlxudmFyIGZpcnN0Q2FsbGJhY2tOb2RlID0gbnVsbDtcblxudmFyIGN1cnJlbnREaWRUaW1lb3V0ID0gZmFsc2U7XG52YXIgY3VycmVudFByaW9yaXR5TGV2ZWwgPSBOb3JtYWxQcmlvcml0eTtcbnZhciBjdXJyZW50RXZlbnRTdGFydFRpbWUgPSAtMTtcbnZhciBjdXJyZW50RXhwaXJhdGlvblRpbWUgPSAtMTtcblxuLy8gVGhpcyBpcyBzZXQgd2hlbiBhIGNhbGxiYWNrIGlzIGJlaW5nIGV4ZWN1dGVkLCB0byBwcmV2ZW50IHJlLWVudHJhbmN5LlxudmFyIGlzRXhlY3V0aW5nQ2FsbGJhY2sgPSBmYWxzZTtcblxudmFyIGlzSG9zdENhbGxiYWNrU2NoZWR1bGVkID0gZmFsc2U7XG5cbnZhciBoYXNOYXRpdmVQZXJmb3JtYW5jZU5vdyA9IHR5cGVvZiBwZXJmb3JtYW5jZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHBlcmZvcm1hbmNlLm5vdyA9PT0gJ2Z1bmN0aW9uJztcblxuZnVuY3Rpb24gZW5zdXJlSG9zdENhbGxiYWNrSXNTY2hlZHVsZWQoKSB7XG4gIGlmIChpc0V4ZWN1dGluZ0NhbGxiYWNrKSB7XG4gICAgLy8gRG9uJ3Qgc2NoZWR1bGUgd29yayB5ZXQ7IHdhaXQgdW50aWwgdGhlIG5leHQgdGltZSB3ZSB5aWVsZC5cbiAgICByZXR1cm47XG4gIH1cbiAgLy8gU2NoZWR1bGUgdGhlIGhvc3QgY2FsbGJhY2sgdXNpbmcgdGhlIGVhcmxpZXN0IGV4cGlyYXRpb24gaW4gdGhlIGxpc3QuXG4gIHZhciBleHBpcmF0aW9uVGltZSA9IGZpcnN0Q2FsbGJhY2tOb2RlLmV4cGlyYXRpb25UaW1lO1xuICBpZiAoIWlzSG9zdENhbGxiYWNrU2NoZWR1bGVkKSB7XG4gICAgaXNIb3N0Q2FsbGJhY2tTY2hlZHVsZWQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIC8vIENhbmNlbCB0aGUgZXhpc3RpbmcgaG9zdCBjYWxsYmFjay5cbiAgICBjYW5jZWxIb3N0Q2FsbGJhY2soKTtcbiAgfVxuICByZXF1ZXN0SG9zdENhbGxiYWNrKGZsdXNoV29yaywgZXhwaXJhdGlvblRpbWUpO1xufVxuXG5mdW5jdGlvbiBmbHVzaEZpcnN0Q2FsbGJhY2soKSB7XG4gIHZhciBmbHVzaGVkTm9kZSA9IGZpcnN0Q2FsbGJhY2tOb2RlO1xuXG4gIC8vIFJlbW92ZSB0aGUgbm9kZSBmcm9tIHRoZSBsaXN0IGJlZm9yZSBjYWxsaW5nIHRoZSBjYWxsYmFjay4gVGhhdCB3YXkgdGhlXG4gIC8vIGxpc3QgaXMgaW4gYSBjb25zaXN0ZW50IHN0YXRlIGV2ZW4gaWYgdGhlIGNhbGxiYWNrIHRocm93cy5cbiAgdmFyIG5leHQgPSBmaXJzdENhbGxiYWNrTm9kZS5uZXh0O1xuICBpZiAoZmlyc3RDYWxsYmFja05vZGUgPT09IG5leHQpIHtcbiAgICAvLyBUaGlzIGlzIHRoZSBsYXN0IGNhbGxiYWNrIGluIHRoZSBsaXN0LlxuICAgIGZpcnN0Q2FsbGJhY2tOb2RlID0gbnVsbDtcbiAgICBuZXh0ID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGFzdENhbGxiYWNrTm9kZSA9IGZpcnN0Q2FsbGJhY2tOb2RlLnByZXZpb3VzO1xuICAgIGZpcnN0Q2FsbGJhY2tOb2RlID0gbGFzdENhbGxiYWNrTm9kZS5uZXh0ID0gbmV4dDtcbiAgICBuZXh0LnByZXZpb3VzID0gbGFzdENhbGxiYWNrTm9kZTtcbiAgfVxuXG4gIGZsdXNoZWROb2RlLm5leHQgPSBmbHVzaGVkTm9kZS5wcmV2aW91cyA9IG51bGw7XG5cbiAgLy8gTm93IGl0J3Mgc2FmZSB0byBjYWxsIHRoZSBjYWxsYmFjay5cbiAgdmFyIGNhbGxiYWNrID0gZmx1c2hlZE5vZGUuY2FsbGJhY2s7XG4gIHZhciBleHBpcmF0aW9uVGltZSA9IGZsdXNoZWROb2RlLmV4cGlyYXRpb25UaW1lO1xuICB2YXIgcHJpb3JpdHlMZXZlbCA9IGZsdXNoZWROb2RlLnByaW9yaXR5TGV2ZWw7XG4gIHZhciBwcmV2aW91c1ByaW9yaXR5TGV2ZWwgPSBjdXJyZW50UHJpb3JpdHlMZXZlbDtcbiAgdmFyIHByZXZpb3VzRXhwaXJhdGlvblRpbWUgPSBjdXJyZW50RXhwaXJhdGlvblRpbWU7XG4gIGN1cnJlbnRQcmlvcml0eUxldmVsID0gcHJpb3JpdHlMZXZlbDtcbiAgY3VycmVudEV4cGlyYXRpb25UaW1lID0gZXhwaXJhdGlvblRpbWU7XG4gIHZhciBjb250aW51YXRpb25DYWxsYmFjaztcbiAgdHJ5IHtcbiAgICBjb250aW51YXRpb25DYWxsYmFjayA9IGNhbGxiYWNrKCk7XG4gIH0gZmluYWxseSB7XG4gICAgY3VycmVudFByaW9yaXR5TGV2ZWwgPSBwcmV2aW91c1ByaW9yaXR5TGV2ZWw7XG4gICAgY3VycmVudEV4cGlyYXRpb25UaW1lID0gcHJldmlvdXNFeHBpcmF0aW9uVGltZTtcbiAgfVxuXG4gIC8vIEEgY2FsbGJhY2sgbWF5IHJldHVybiBhIGNvbnRpbnVhdGlvbi4gVGhlIGNvbnRpbnVhdGlvbiBzaG91bGQgYmUgc2NoZWR1bGVkXG4gIC8vIHdpdGggdGhlIHNhbWUgcHJpb3JpdHkgYW5kIGV4cGlyYXRpb24gYXMgdGhlIGp1c3QtZmluaXNoZWQgY2FsbGJhY2suXG4gIGlmICh0eXBlb2YgY29udGludWF0aW9uQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgY29udGludWF0aW9uTm9kZSA9IHtcbiAgICAgIGNhbGxiYWNrOiBjb250aW51YXRpb25DYWxsYmFjayxcbiAgICAgIHByaW9yaXR5TGV2ZWw6IHByaW9yaXR5TGV2ZWwsXG4gICAgICBleHBpcmF0aW9uVGltZTogZXhwaXJhdGlvblRpbWUsXG4gICAgICBuZXh0OiBudWxsLFxuICAgICAgcHJldmlvdXM6IG51bGxcbiAgICB9O1xuXG4gICAgLy8gSW5zZXJ0IHRoZSBuZXcgY2FsbGJhY2sgaW50byB0aGUgbGlzdCwgc29ydGVkIGJ5IGl0cyBleHBpcmF0aW9uLiBUaGlzIGlzXG4gICAgLy8gYWxtb3N0IHRoZSBzYW1lIGFzIHRoZSBjb2RlIGluIGBzY2hlZHVsZUNhbGxiYWNrYCwgZXhjZXB0IHRoZSBjYWxsYmFja1xuICAgIC8vIGlzIGluc2VydGVkIGludG8gdGhlIGxpc3QgKmJlZm9yZSogY2FsbGJhY2tzIG9mIGVxdWFsIGV4cGlyYXRpb24gaW5zdGVhZFxuICAgIC8vIG9mIGFmdGVyLlxuICAgIGlmIChmaXJzdENhbGxiYWNrTm9kZSA9PT0gbnVsbCkge1xuICAgICAgLy8gVGhpcyBpcyB0aGUgZmlyc3QgY2FsbGJhY2sgaW4gdGhlIGxpc3QuXG4gICAgICBmaXJzdENhbGxiYWNrTm9kZSA9IGNvbnRpbnVhdGlvbk5vZGUubmV4dCA9IGNvbnRpbnVhdGlvbk5vZGUucHJldmlvdXMgPSBjb250aW51YXRpb25Ob2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbmV4dEFmdGVyQ29udGludWF0aW9uID0gbnVsbDtcbiAgICAgIHZhciBub2RlID0gZmlyc3RDYWxsYmFja05vZGU7XG4gICAgICBkbyB7XG4gICAgICAgIGlmIChub2RlLmV4cGlyYXRpb25UaW1lID49IGV4cGlyYXRpb25UaW1lKSB7XG4gICAgICAgICAgLy8gVGhpcyBjYWxsYmFjayBleHBpcmVzIGF0IG9yIGFmdGVyIHRoZSBjb250aW51YXRpb24uIFdlIHdpbGwgaW5zZXJ0XG4gICAgICAgICAgLy8gdGhlIGNvbnRpbnVhdGlvbiAqYmVmb3JlKiB0aGlzIGNhbGxiYWNrLlxuICAgICAgICAgIG5leHRBZnRlckNvbnRpbnVhdGlvbiA9IG5vZGU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgIH0gd2hpbGUgKG5vZGUgIT09IGZpcnN0Q2FsbGJhY2tOb2RlKTtcblxuICAgICAgaWYgKG5leHRBZnRlckNvbnRpbnVhdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICAvLyBObyBlcXVhbCBvciBsb3dlciBwcmlvcml0eSBjYWxsYmFjayB3YXMgZm91bmQsIHdoaWNoIG1lYW5zIHRoZSBuZXdcbiAgICAgICAgLy8gY2FsbGJhY2sgaXMgdGhlIGxvd2VzdCBwcmlvcml0eSBjYWxsYmFjayBpbiB0aGUgbGlzdC5cbiAgICAgICAgbmV4dEFmdGVyQ29udGludWF0aW9uID0gZmlyc3RDYWxsYmFja05vZGU7XG4gICAgICB9IGVsc2UgaWYgKG5leHRBZnRlckNvbnRpbnVhdGlvbiA9PT0gZmlyc3RDYWxsYmFja05vZGUpIHtcbiAgICAgICAgLy8gVGhlIG5ldyBjYWxsYmFjayBpcyB0aGUgaGlnaGVzdCBwcmlvcml0eSBjYWxsYmFjayBpbiB0aGUgbGlzdC5cbiAgICAgICAgZmlyc3RDYWxsYmFja05vZGUgPSBjb250aW51YXRpb25Ob2RlO1xuICAgICAgICBlbnN1cmVIb3N0Q2FsbGJhY2tJc1NjaGVkdWxlZCgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJldmlvdXMgPSBuZXh0QWZ0ZXJDb250aW51YXRpb24ucHJldmlvdXM7XG4gICAgICBwcmV2aW91cy5uZXh0ID0gbmV4dEFmdGVyQ29udGludWF0aW9uLnByZXZpb3VzID0gY29udGludWF0aW9uTm9kZTtcbiAgICAgIGNvbnRpbnVhdGlvbk5vZGUubmV4dCA9IG5leHRBZnRlckNvbnRpbnVhdGlvbjtcbiAgICAgIGNvbnRpbnVhdGlvbk5vZGUucHJldmlvdXMgPSBwcmV2aW91cztcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmx1c2hJbW1lZGlhdGVXb3JrKCkge1xuICBpZiAoXG4gIC8vIENvbmZpcm0gd2UndmUgZXhpdGVkIHRoZSBvdXRlciBtb3N0IGV2ZW50IGhhbmRsZXJcbiAgY3VycmVudEV2ZW50U3RhcnRUaW1lID09PSAtMSAmJiBmaXJzdENhbGxiYWNrTm9kZSAhPT0gbnVsbCAmJiBmaXJzdENhbGxiYWNrTm9kZS5wcmlvcml0eUxldmVsID09PSBJbW1lZGlhdGVQcmlvcml0eSkge1xuICAgIGlzRXhlY3V0aW5nQ2FsbGJhY2sgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBkbyB7XG4gICAgICAgIGZsdXNoRmlyc3RDYWxsYmFjaygpO1xuICAgICAgfSB3aGlsZSAoXG4gICAgICAvLyBLZWVwIGZsdXNoaW5nIHVudGlsIHRoZXJlIGFyZSBubyBtb3JlIGltbWVkaWF0ZSBjYWxsYmFja3NcbiAgICAgIGZpcnN0Q2FsbGJhY2tOb2RlICE9PSBudWxsICYmIGZpcnN0Q2FsbGJhY2tOb2RlLnByaW9yaXR5TGV2ZWwgPT09IEltbWVkaWF0ZVByaW9yaXR5KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaXNFeGVjdXRpbmdDYWxsYmFjayA9IGZhbHNlO1xuICAgICAgaWYgKGZpcnN0Q2FsbGJhY2tOb2RlICE9PSBudWxsKSB7XG4gICAgICAgIC8vIFRoZXJlJ3Mgc3RpbGwgd29yayByZW1haW5pbmcuIFJlcXVlc3QgYW5vdGhlciBjYWxsYmFjay5cbiAgICAgICAgZW5zdXJlSG9zdENhbGxiYWNrSXNTY2hlZHVsZWQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzSG9zdENhbGxiYWNrU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZsdXNoV29yayhkaWRUaW1lb3V0KSB7XG4gIGlzRXhlY3V0aW5nQ2FsbGJhY2sgPSB0cnVlO1xuICB2YXIgcHJldmlvdXNEaWRUaW1lb3V0ID0gY3VycmVudERpZFRpbWVvdXQ7XG4gIGN1cnJlbnREaWRUaW1lb3V0ID0gZGlkVGltZW91dDtcbiAgdHJ5IHtcbiAgICBpZiAoZGlkVGltZW91dCkge1xuICAgICAgLy8gRmx1c2ggYWxsIHRoZSBleHBpcmVkIGNhbGxiYWNrcyB3aXRob3V0IHlpZWxkaW5nLlxuICAgICAgd2hpbGUgKGZpcnN0Q2FsbGJhY2tOb2RlICE9PSBudWxsKSB7XG4gICAgICAgIC8vIFJlYWQgdGhlIGN1cnJlbnQgdGltZS4gRmx1c2ggYWxsIHRoZSBjYWxsYmFja3MgdGhhdCBleHBpcmUgYXQgb3JcbiAgICAgICAgLy8gZWFybGllciB0aGFuIHRoYXQgdGltZS4gVGhlbiByZWFkIHRoZSBjdXJyZW50IHRpbWUgYWdhaW4gYW5kIHJlcGVhdC5cbiAgICAgICAgLy8gVGhpcyBvcHRpbWl6ZXMgZm9yIGFzIGZldyBwZXJmb3JtYW5jZS5ub3cgY2FsbHMgYXMgcG9zc2libGUuXG4gICAgICAgIHZhciBjdXJyZW50VGltZSA9IGdldEN1cnJlbnRUaW1lKCk7XG4gICAgICAgIGlmIChmaXJzdENhbGxiYWNrTm9kZS5leHBpcmF0aW9uVGltZSA8PSBjdXJyZW50VGltZSkge1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGZsdXNoRmlyc3RDYWxsYmFjaygpO1xuICAgICAgICAgIH0gd2hpbGUgKGZpcnN0Q2FsbGJhY2tOb2RlICE9PSBudWxsICYmIGZpcnN0Q2FsbGJhY2tOb2RlLmV4cGlyYXRpb25UaW1lIDw9IGN1cnJlbnRUaW1lKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gS2VlcCBmbHVzaGluZyBjYWxsYmFja3MgdW50aWwgd2UgcnVuIG91dCBvZiB0aW1lIGluIHRoZSBmcmFtZS5cbiAgICAgIGlmIChmaXJzdENhbGxiYWNrTm9kZSAhPT0gbnVsbCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgZmx1c2hGaXJzdENhbGxiYWNrKCk7XG4gICAgICAgIH0gd2hpbGUgKGZpcnN0Q2FsbGJhY2tOb2RlICE9PSBudWxsICYmICFzaG91bGRZaWVsZFRvSG9zdCgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgaXNFeGVjdXRpbmdDYWxsYmFjayA9IGZhbHNlO1xuICAgIGN1cnJlbnREaWRUaW1lb3V0ID0gcHJldmlvdXNEaWRUaW1lb3V0O1xuICAgIGlmIChmaXJzdENhbGxiYWNrTm9kZSAhPT0gbnVsbCkge1xuICAgICAgLy8gVGhlcmUncyBzdGlsbCB3b3JrIHJlbWFpbmluZy4gUmVxdWVzdCBhbm90aGVyIGNhbGxiYWNrLlxuICAgICAgZW5zdXJlSG9zdENhbGxiYWNrSXNTY2hlZHVsZWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXNIb3N0Q2FsbGJhY2tTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gQmVmb3JlIGV4aXRpbmcsIGZsdXNoIGFsbCB0aGUgaW1tZWRpYXRlIHdvcmsgdGhhdCB3YXMgc2NoZWR1bGVkLlxuICAgIGZsdXNoSW1tZWRpYXRlV29yaygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX3J1bldpdGhQcmlvcml0eShwcmlvcml0eUxldmVsLCBldmVudEhhbmRsZXIpIHtcbiAgc3dpdGNoIChwcmlvcml0eUxldmVsKSB7XG4gICAgY2FzZSBJbW1lZGlhdGVQcmlvcml0eTpcbiAgICBjYXNlIFVzZXJCbG9ja2luZ1ByaW9yaXR5OlxuICAgIGNhc2UgTm9ybWFsUHJpb3JpdHk6XG4gICAgY2FzZSBMb3dQcmlvcml0eTpcbiAgICBjYXNlIElkbGVQcmlvcml0eTpcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBwcmlvcml0eUxldmVsID0gTm9ybWFsUHJpb3JpdHk7XG4gIH1cblxuICB2YXIgcHJldmlvdXNQcmlvcml0eUxldmVsID0gY3VycmVudFByaW9yaXR5TGV2ZWw7XG4gIHZhciBwcmV2aW91c0V2ZW50U3RhcnRUaW1lID0gY3VycmVudEV2ZW50U3RhcnRUaW1lO1xuICBjdXJyZW50UHJpb3JpdHlMZXZlbCA9IHByaW9yaXR5TGV2ZWw7XG4gIGN1cnJlbnRFdmVudFN0YXJ0VGltZSA9IGdldEN1cnJlbnRUaW1lKCk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyKCk7XG4gIH0gZmluYWxseSB7XG4gICAgY3VycmVudFByaW9yaXR5TGV2ZWwgPSBwcmV2aW91c1ByaW9yaXR5TGV2ZWw7XG4gICAgY3VycmVudEV2ZW50U3RhcnRUaW1lID0gcHJldmlvdXNFdmVudFN0YXJ0VGltZTtcblxuICAgIC8vIEJlZm9yZSBleGl0aW5nLCBmbHVzaCBhbGwgdGhlIGltbWVkaWF0ZSB3b3JrIHRoYXQgd2FzIHNjaGVkdWxlZC5cbiAgICBmbHVzaEltbWVkaWF0ZVdvcmsoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1bnN0YWJsZV93cmFwQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgdmFyIHBhcmVudFByaW9yaXR5TGV2ZWwgPSBjdXJyZW50UHJpb3JpdHlMZXZlbDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUaGlzIGlzIGEgZm9yayBvZiBydW5XaXRoUHJpb3JpdHksIGlubGluZWQgZm9yIHBlcmZvcm1hbmNlLlxuICAgIHZhciBwcmV2aW91c1ByaW9yaXR5TGV2ZWwgPSBjdXJyZW50UHJpb3JpdHlMZXZlbDtcbiAgICB2YXIgcHJldmlvdXNFdmVudFN0YXJ0VGltZSA9IGN1cnJlbnRFdmVudFN0YXJ0VGltZTtcbiAgICBjdXJyZW50UHJpb3JpdHlMZXZlbCA9IHBhcmVudFByaW9yaXR5TGV2ZWw7XG4gICAgY3VycmVudEV2ZW50U3RhcnRUaW1lID0gZ2V0Q3VycmVudFRpbWUoKTtcblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY3VycmVudFByaW9yaXR5TGV2ZWwgPSBwcmV2aW91c1ByaW9yaXR5TGV2ZWw7XG4gICAgICBjdXJyZW50RXZlbnRTdGFydFRpbWUgPSBwcmV2aW91c0V2ZW50U3RhcnRUaW1lO1xuICAgICAgZmx1c2hJbW1lZGlhdGVXb3JrKCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiB1bnN0YWJsZV9zY2hlZHVsZUNhbGxiYWNrKGNhbGxiYWNrLCBkZXByZWNhdGVkX29wdGlvbnMpIHtcbiAgdmFyIHN0YXJ0VGltZSA9IGN1cnJlbnRFdmVudFN0YXJ0VGltZSAhPT0gLTEgPyBjdXJyZW50RXZlbnRTdGFydFRpbWUgOiBnZXRDdXJyZW50VGltZSgpO1xuXG4gIHZhciBleHBpcmF0aW9uVGltZTtcbiAgaWYgKHR5cGVvZiBkZXByZWNhdGVkX29wdGlvbnMgPT09ICdvYmplY3QnICYmIGRlcHJlY2F0ZWRfb3B0aW9ucyAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwcmVjYXRlZF9vcHRpb25zLnRpbWVvdXQgPT09ICdudW1iZXInKSB7XG4gICAgLy8gRklYTUU6IFJlbW92ZSB0aGlzIGJyYW5jaCBvbmNlIHdlIGxpZnQgZXhwaXJhdGlvbiB0aW1lcyBvdXQgb2YgUmVhY3QuXG4gICAgZXhwaXJhdGlvblRpbWUgPSBzdGFydFRpbWUgKyBkZXByZWNhdGVkX29wdGlvbnMudGltZW91dDtcbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2ggKGN1cnJlbnRQcmlvcml0eUxldmVsKSB7XG4gICAgICBjYXNlIEltbWVkaWF0ZVByaW9yaXR5OlxuICAgICAgICBleHBpcmF0aW9uVGltZSA9IHN0YXJ0VGltZSArIElNTUVESUFURV9QUklPUklUWV9USU1FT1VUO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVXNlckJsb2NraW5nUHJpb3JpdHk6XG4gICAgICAgIGV4cGlyYXRpb25UaW1lID0gc3RhcnRUaW1lICsgVVNFUl9CTE9DS0lOR19QUklPUklUWTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIElkbGVQcmlvcml0eTpcbiAgICAgICAgZXhwaXJhdGlvblRpbWUgPSBzdGFydFRpbWUgKyBJRExFX1BSSU9SSVRZO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTG93UHJpb3JpdHk6XG4gICAgICAgIGV4cGlyYXRpb25UaW1lID0gc3RhcnRUaW1lICsgTE9XX1BSSU9SSVRZX1RJTUVPVVQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBOb3JtYWxQcmlvcml0eTpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGV4cGlyYXRpb25UaW1lID0gc3RhcnRUaW1lICsgTk9STUFMX1BSSU9SSVRZX1RJTUVPVVQ7XG4gICAgfVxuICB9XG5cbiAgdmFyIG5ld05vZGUgPSB7XG4gICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgIHByaW9yaXR5TGV2ZWw6IGN1cnJlbnRQcmlvcml0eUxldmVsLFxuICAgIGV4cGlyYXRpb25UaW1lOiBleHBpcmF0aW9uVGltZSxcbiAgICBuZXh0OiBudWxsLFxuICAgIHByZXZpb3VzOiBudWxsXG4gIH07XG5cbiAgLy8gSW5zZXJ0IHRoZSBuZXcgY2FsbGJhY2sgaW50byB0aGUgbGlzdCwgb3JkZXJlZCBmaXJzdCBieSBleHBpcmF0aW9uLCB0aGVuXG4gIC8vIGJ5IGluc2VydGlvbi4gU28gdGhlIG5ldyBjYWxsYmFjayBpcyBpbnNlcnRlZCBhbnkgb3RoZXIgY2FsbGJhY2sgd2l0aFxuICAvLyBlcXVhbCBleHBpcmF0aW9uLlxuICBpZiAoZmlyc3RDYWxsYmFja05vZGUgPT09IG51bGwpIHtcbiAgICAvLyBUaGlzIGlzIHRoZSBmaXJzdCBjYWxsYmFjayBpbiB0aGUgbGlzdC5cbiAgICBmaXJzdENhbGxiYWNrTm9kZSA9IG5ld05vZGUubmV4dCA9IG5ld05vZGUucHJldmlvdXMgPSBuZXdOb2RlO1xuICAgIGVuc3VyZUhvc3RDYWxsYmFja0lzU2NoZWR1bGVkKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG5leHQgPSBudWxsO1xuICAgIHZhciBub2RlID0gZmlyc3RDYWxsYmFja05vZGU7XG4gICAgZG8ge1xuICAgICAgaWYgKG5vZGUuZXhwaXJhdGlvblRpbWUgPiBleHBpcmF0aW9uVGltZSkge1xuICAgICAgICAvLyBUaGUgbmV3IGNhbGxiYWNrIGV4cGlyZXMgYmVmb3JlIHRoaXMgb25lLlxuICAgICAgICBuZXh0ID0gbm9kZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgIH0gd2hpbGUgKG5vZGUgIT09IGZpcnN0Q2FsbGJhY2tOb2RlKTtcblxuICAgIGlmIChuZXh0ID09PSBudWxsKSB7XG4gICAgICAvLyBObyBjYWxsYmFjayB3aXRoIGEgbGF0ZXIgZXhwaXJhdGlvbiB3YXMgZm91bmQsIHdoaWNoIG1lYW5zIHRoZSBuZXdcbiAgICAgIC8vIGNhbGxiYWNrIGhhcyB0aGUgbGF0ZXN0IGV4cGlyYXRpb24gaW4gdGhlIGxpc3QuXG4gICAgICBuZXh0ID0gZmlyc3RDYWxsYmFja05vZGU7XG4gICAgfSBlbHNlIGlmIChuZXh0ID09PSBmaXJzdENhbGxiYWNrTm9kZSkge1xuICAgICAgLy8gVGhlIG5ldyBjYWxsYmFjayBoYXMgdGhlIGVhcmxpZXN0IGV4cGlyYXRpb24gaW4gdGhlIGVudGlyZSBsaXN0LlxuICAgICAgZmlyc3RDYWxsYmFja05vZGUgPSBuZXdOb2RlO1xuICAgICAgZW5zdXJlSG9zdENhbGxiYWNrSXNTY2hlZHVsZWQoKTtcbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXMgPSBuZXh0LnByZXZpb3VzO1xuICAgIHByZXZpb3VzLm5leHQgPSBuZXh0LnByZXZpb3VzID0gbmV3Tm9kZTtcbiAgICBuZXdOb2RlLm5leHQgPSBuZXh0O1xuICAgIG5ld05vZGUucHJldmlvdXMgPSBwcmV2aW91cztcbiAgfVxuXG4gIHJldHVybiBuZXdOb2RlO1xufVxuXG5mdW5jdGlvbiB1bnN0YWJsZV9jYW5jZWxDYWxsYmFjayhjYWxsYmFja05vZGUpIHtcbiAgdmFyIG5leHQgPSBjYWxsYmFja05vZGUubmV4dDtcbiAgaWYgKG5leHQgPT09IG51bGwpIHtcbiAgICAvLyBBbHJlYWR5IGNhbmNlbGxlZC5cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAobmV4dCA9PT0gY2FsbGJhY2tOb2RlKSB7XG4gICAgLy8gVGhpcyBpcyB0aGUgb25seSBzY2hlZHVsZWQgY2FsbGJhY2suIENsZWFyIHRoZSBsaXN0LlxuICAgIGZpcnN0Q2FsbGJhY2tOb2RlID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICAvLyBSZW1vdmUgdGhlIGNhbGxiYWNrIGZyb20gaXRzIHBvc2l0aW9uIGluIHRoZSBsaXN0LlxuICAgIGlmIChjYWxsYmFja05vZGUgPT09IGZpcnN0Q2FsbGJhY2tOb2RlKSB7XG4gICAgICBmaXJzdENhbGxiYWNrTm9kZSA9IG5leHQ7XG4gICAgfVxuICAgIHZhciBwcmV2aW91cyA9IGNhbGxiYWNrTm9kZS5wcmV2aW91cztcbiAgICBwcmV2aW91cy5uZXh0ID0gbmV4dDtcbiAgICBuZXh0LnByZXZpb3VzID0gcHJldmlvdXM7XG4gIH1cblxuICBjYWxsYmFja05vZGUubmV4dCA9IGNhbGxiYWNrTm9kZS5wcmV2aW91cyA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX2dldEN1cnJlbnRQcmlvcml0eUxldmVsKCkge1xuICByZXR1cm4gY3VycmVudFByaW9yaXR5TGV2ZWw7XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX3Nob3VsZFlpZWxkKCkge1xuICByZXR1cm4gIWN1cnJlbnREaWRUaW1lb3V0ICYmIChmaXJzdENhbGxiYWNrTm9kZSAhPT0gbnVsbCAmJiBmaXJzdENhbGxiYWNrTm9kZS5leHBpcmF0aW9uVGltZSA8IGN1cnJlbnRFeHBpcmF0aW9uVGltZSB8fCBzaG91bGRZaWVsZFRvSG9zdCgpKTtcbn1cblxuLy8gVGhlIHJlbWFpbmluZyBjb2RlIGlzIGVzc2VudGlhbGx5IGEgcG9seWZpbGwgZm9yIHJlcXVlc3RJZGxlQ2FsbGJhY2suIEl0XG4vLyB3b3JrcyBieSBzY2hlZHVsaW5nIGEgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLCBzdG9yaW5nIHRoZSB0aW1lIGZvciB0aGUgc3RhcnRcbi8vIG9mIHRoZSBmcmFtZSwgdGhlbiBzY2hlZHVsaW5nIGEgcG9zdE1lc3NhZ2Ugd2hpY2ggZ2V0cyBzY2hlZHVsZWQgYWZ0ZXIgcGFpbnQuXG4vLyBXaXRoaW4gdGhlIHBvc3RNZXNzYWdlIGhhbmRsZXIgZG8gYXMgbXVjaCB3b3JrIGFzIHBvc3NpYmxlIHVudGlsIHRpbWUgKyBmcmFtZVxuLy8gcmF0ZS4gQnkgc2VwYXJhdGluZyB0aGUgaWRsZSBjYWxsIGludG8gYSBzZXBhcmF0ZSBldmVudCB0aWNrIHdlIGVuc3VyZSB0aGF0XG4vLyBsYXlvdXQsIHBhaW50IGFuZCBvdGhlciBicm93c2VyIHdvcmsgaXMgY291bnRlZCBhZ2FpbnN0IHRoZSBhdmFpbGFibGUgdGltZS5cbi8vIFRoZSBmcmFtZSByYXRlIGlzIGR5bmFtaWNhbGx5IGFkanVzdGVkLlxuXG4vLyBXZSBjYXB0dXJlIGEgbG9jYWwgcmVmZXJlbmNlIHRvIGFueSBnbG9iYWwsIGluIGNhc2UgaXQgZ2V0cyBwb2x5ZmlsbGVkIGFmdGVyXG4vLyB0aGlzIG1vZHVsZSBpcyBpbml0aWFsbHkgZXZhbHVhdGVkLiBXZSB3YW50IHRvIGJlIHVzaW5nIGFcbi8vIGNvbnNpc3RlbnQgaW1wbGVtZW50YXRpb24uXG52YXIgbG9jYWxEYXRlID0gRGF0ZTtcblxuLy8gVGhpcyBpbml0aWFsaXphdGlvbiBjb2RlIG1heSBydW4gZXZlbiBvbiBzZXJ2ZXIgZW52aXJvbm1lbnRzIGlmIGEgY29tcG9uZW50XG4vLyBqdXN0IGltcG9ydHMgUmVhY3RET00gKGUuZy4gZm9yIGZpbmRET01Ob2RlKS4gU29tZSBlbnZpcm9ubWVudHMgbWlnaHQgbm90XG4vLyBoYXZlIHNldFRpbWVvdXQgb3IgY2xlYXJUaW1lb3V0LiBIb3dldmVyLCB3ZSBhbHdheXMgZXhwZWN0IHRoZW0gdG8gYmUgZGVmaW5lZFxuLy8gb24gdGhlIGNsaWVudC4gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvMTMwODhcbnZhciBsb2NhbFNldFRpbWVvdXQgPSB0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJyA/IHNldFRpbWVvdXQgOiB1bmRlZmluZWQ7XG52YXIgbG9jYWxDbGVhclRpbWVvdXQgPSB0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nID8gY2xlYXJUaW1lb3V0IDogdW5kZWZpbmVkO1xuXG4vLyBXZSBkb24ndCBleHBlY3QgZWl0aGVyIG9mIHRoZXNlIHRvIG5lY2Vzc2FyaWx5IGJlIGRlZmluZWQsIGJ1dCB3ZSB3aWxsIGVycm9yXG4vLyBsYXRlciBpZiB0aGV5IGFyZSBtaXNzaW5nIG9uIHRoZSBjbGllbnQuXG52YXIgbG9jYWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAnZnVuY3Rpb24nID8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIDogdW5kZWZpbmVkO1xudmFyIGxvY2FsQ2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB0eXBlb2YgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbicgPyBjYW5jZWxBbmltYXRpb25GcmFtZSA6IHVuZGVmaW5lZDtcblxudmFyIGdldEN1cnJlbnRUaW1lO1xuXG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZG9lcyBub3QgcnVuIHdoZW4gdGhlIHRhYiBpcyBpbiB0aGUgYmFja2dyb3VuZC4gSWZcbi8vIHdlJ3JlIGJhY2tncm91bmRlZCB3ZSBwcmVmZXIgZm9yIHRoYXQgd29yayB0byBoYXBwZW4gc28gdGhhdCB0aGUgcGFnZVxuLy8gY29udGludWVzIHRvIGxvYWQgaW4gdGhlIGJhY2tncm91bmQuIFNvIHdlIGFsc28gc2NoZWR1bGUgYSAnc2V0VGltZW91dCcgYXNcbi8vIGEgZmFsbGJhY2suXG4vLyBUT0RPOiBOZWVkIGEgYmV0dGVyIGhldXJpc3RpYyBmb3IgYmFja2dyb3VuZGVkIHdvcmsuXG52YXIgQU5JTUFUSU9OX0ZSQU1FX1RJTUVPVVQgPSAxMDA7XG52YXIgckFGSUQ7XG52YXIgckFGVGltZW91dElEO1xudmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZVdpdGhUaW1lb3V0ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIC8vIHNjaGVkdWxlIHJBRiBhbmQgYWxzbyBhIHNldFRpbWVvdXRcbiAgckFGSUQgPSBsb2NhbFJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAodGltZXN0YW1wKSB7XG4gICAgLy8gY2FuY2VsIHRoZSBzZXRUaW1lb3V0XG4gICAgbG9jYWxDbGVhclRpbWVvdXQockFGVGltZW91dElEKTtcbiAgICBjYWxsYmFjayh0aW1lc3RhbXApO1xuICB9KTtcbiAgckFGVGltZW91dElEID0gbG9jYWxTZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAvLyBjYW5jZWwgdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIGxvY2FsQ2FuY2VsQW5pbWF0aW9uRnJhbWUockFGSUQpO1xuICAgIGNhbGxiYWNrKGdldEN1cnJlbnRUaW1lKCkpO1xuICB9LCBBTklNQVRJT05fRlJBTUVfVElNRU9VVCk7XG59O1xuXG5pZiAoaGFzTmF0aXZlUGVyZm9ybWFuY2VOb3cpIHtcbiAgdmFyIFBlcmZvcm1hbmNlID0gcGVyZm9ybWFuY2U7XG4gIGdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBQZXJmb3JtYW5jZS5ub3coKTtcbiAgfTtcbn0gZWxzZSB7XG4gIGdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBsb2NhbERhdGUubm93KCk7XG4gIH07XG59XG5cbnZhciByZXF1ZXN0SG9zdENhbGxiYWNrO1xudmFyIGNhbmNlbEhvc3RDYWxsYmFjaztcbnZhciBzaG91bGRZaWVsZFRvSG9zdDtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5fc2NoZWRNb2NrKSB7XG4gIC8vIER5bmFtaWMgaW5qZWN0aW9uLCBvbmx5IGZvciB0ZXN0aW5nIHB1cnBvc2VzLlxuICB2YXIgaW1wbCA9IHdpbmRvdy5fc2NoZWRNb2NrO1xuICByZXF1ZXN0SG9zdENhbGxiYWNrID0gaW1wbFswXTtcbiAgY2FuY2VsSG9zdENhbGxiYWNrID0gaW1wbFsxXTtcbiAgc2hvdWxkWWllbGRUb0hvc3QgPSBpbXBsWzJdO1xufSBlbHNlIGlmIChcbi8vIElmIFNjaGVkdWxlciBydW5zIGluIGEgbm9uLURPTSBlbnZpcm9ubWVudCwgaXQgZmFsbHMgYmFjayB0byBhIG5haXZlXG4vLyBpbXBsZW1lbnRhdGlvbiB1c2luZyBzZXRUaW1lb3V0LlxudHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHxcbi8vIFwiYWRkRXZlbnRMaXN0ZW5lclwiIG1pZ2h0IG5vdCBiZSBhdmFpbGFibGUgb24gdGhlIHdpbmRvdyBvYmplY3Rcbi8vIGlmIHRoaXMgaXMgYSBtb2NrZWQgXCJ3aW5kb3dcIiBvYmplY3QuIFNvIHdlIG5lZWQgdG8gdmFsaWRhdGUgdGhhdCB0b28uXG50eXBlb2Ygd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgdmFyIF9jYWxsYmFjayA9IG51bGw7XG4gIHZhciBfY3VycmVudFRpbWUgPSAtMTtcbiAgdmFyIF9mbHVzaENhbGxiYWNrID0gZnVuY3Rpb24gKGRpZFRpbWVvdXQsIG1zKSB7XG4gICAgaWYgKF9jYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgdmFyIGNiID0gX2NhbGxiYWNrO1xuICAgICAgX2NhbGxiYWNrID0gbnVsbDtcbiAgICAgIHRyeSB7XG4gICAgICAgIF9jdXJyZW50VGltZSA9IG1zO1xuICAgICAgICBjYihkaWRUaW1lb3V0KTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIF9jdXJyZW50VGltZSA9IC0xO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgcmVxdWVzdEhvc3RDYWxsYmFjayA9IGZ1bmN0aW9uIChjYiwgbXMpIHtcbiAgICBpZiAoX2N1cnJlbnRUaW1lICE9PSAtMSkge1xuICAgICAgLy8gUHJvdGVjdCBhZ2FpbnN0IHJlLWVudHJhbmN5LlxuICAgICAgc2V0VGltZW91dChyZXF1ZXN0SG9zdENhbGxiYWNrLCAwLCBjYiwgbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfY2FsbGJhY2sgPSBjYjtcbiAgICAgIHNldFRpbWVvdXQoX2ZsdXNoQ2FsbGJhY2ssIG1zLCB0cnVlLCBtcyk7XG4gICAgICBzZXRUaW1lb3V0KF9mbHVzaENhbGxiYWNrLCBtYXhTaWduZWQzMUJpdEludCwgZmFsc2UsIG1heFNpZ25lZDMxQml0SW50KTtcbiAgICB9XG4gIH07XG4gIGNhbmNlbEhvc3RDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICBfY2FsbGJhY2sgPSBudWxsO1xuICB9O1xuICBzaG91bGRZaWVsZFRvSG9zdCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG4gIGdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfY3VycmVudFRpbWUgPT09IC0xID8gMCA6IF9jdXJyZW50VGltZTtcbiAgfTtcbn0gZWxzZSB7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBUT0RPOiBSZW1vdmUgZmIubWUgbGlua1xuICAgIGlmICh0eXBlb2YgbG9jYWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGlzIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IHJlcXVlc3RBbmltYXRpb25GcmFtZS4gXCIgKyAnTWFrZSBzdXJlIHRoYXQgeW91IGxvYWQgYSAnICsgJ3BvbHlmaWxsIGluIG9sZGVyIGJyb3dzZXJzLiBodHRwczovL2ZiLm1lL3JlYWN0LXBvbHlmaWxscycpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxvY2FsQ2FuY2VsQW5pbWF0aW9uRnJhbWUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGlzIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IGNhbmNlbEFuaW1hdGlvbkZyYW1lLiBcIiArICdNYWtlIHN1cmUgdGhhdCB5b3UgbG9hZCBhICcgKyAncG9seWZpbGwgaW4gb2xkZXIgYnJvd3NlcnMuIGh0dHBzOi8vZmIubWUvcmVhY3QtcG9seWZpbGxzJyk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHNjaGVkdWxlZEhvc3RDYWxsYmFjayA9IG51bGw7XG4gIHZhciBpc01lc3NhZ2VFdmVudFNjaGVkdWxlZCA9IGZhbHNlO1xuICB2YXIgdGltZW91dFRpbWUgPSAtMTtcblxuICB2YXIgaXNBbmltYXRpb25GcmFtZVNjaGVkdWxlZCA9IGZhbHNlO1xuXG4gIHZhciBpc0ZsdXNoaW5nSG9zdENhbGxiYWNrID0gZmFsc2U7XG5cbiAgdmFyIGZyYW1lRGVhZGxpbmUgPSAwO1xuICAvLyBXZSBzdGFydCBvdXQgYXNzdW1pbmcgdGhhdCB3ZSBydW4gYXQgMzBmcHMgYnV0IHRoZW4gdGhlIGhldXJpc3RpYyB0cmFja2luZ1xuICAvLyB3aWxsIGFkanVzdCB0aGlzIHZhbHVlIHRvIGEgZmFzdGVyIGZwcyBpZiB3ZSBnZXQgbW9yZSBmcmVxdWVudCBhbmltYXRpb25cbiAgLy8gZnJhbWVzLlxuICB2YXIgcHJldmlvdXNGcmFtZVRpbWUgPSAzMztcbiAgdmFyIGFjdGl2ZUZyYW1lVGltZSA9IDMzO1xuXG4gIHNob3VsZFlpZWxkVG9Ib3N0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmcmFtZURlYWRsaW5lIDw9IGdldEN1cnJlbnRUaW1lKCk7XG4gIH07XG5cbiAgLy8gV2UgdXNlIHRoZSBwb3N0TWVzc2FnZSB0cmljayB0byBkZWZlciBpZGxlIHdvcmsgdW50aWwgYWZ0ZXIgdGhlIHJlcGFpbnQuXG4gIHZhciBtZXNzYWdlS2V5ID0gJ19fcmVhY3RJZGxlQ2FsbGJhY2skJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIpO1xuICB2YXIgaWRsZVRpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuc291cmNlICE9PSB3aW5kb3cgfHwgZXZlbnQuZGF0YSAhPT0gbWVzc2FnZUtleSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlzTWVzc2FnZUV2ZW50U2NoZWR1bGVkID0gZmFsc2U7XG5cbiAgICB2YXIgcHJldlNjaGVkdWxlZENhbGxiYWNrID0gc2NoZWR1bGVkSG9zdENhbGxiYWNrO1xuICAgIHZhciBwcmV2VGltZW91dFRpbWUgPSB0aW1lb3V0VGltZTtcbiAgICBzY2hlZHVsZWRIb3N0Q2FsbGJhY2sgPSBudWxsO1xuICAgIHRpbWVvdXRUaW1lID0gLTE7XG5cbiAgICB2YXIgY3VycmVudFRpbWUgPSBnZXRDdXJyZW50VGltZSgpO1xuXG4gICAgdmFyIGRpZFRpbWVvdXQgPSBmYWxzZTtcbiAgICBpZiAoZnJhbWVEZWFkbGluZSAtIGN1cnJlbnRUaW1lIDw9IDApIHtcbiAgICAgIC8vIFRoZXJlJ3Mgbm8gdGltZSBsZWZ0IGluIHRoaXMgaWRsZSBwZXJpb2QuIENoZWNrIGlmIHRoZSBjYWxsYmFjayBoYXNcbiAgICAgIC8vIGEgdGltZW91dCBhbmQgd2hldGhlciBpdCdzIGJlZW4gZXhjZWVkZWQuXG4gICAgICBpZiAocHJldlRpbWVvdXRUaW1lICE9PSAtMSAmJiBwcmV2VGltZW91dFRpbWUgPD0gY3VycmVudFRpbWUpIHtcbiAgICAgICAgLy8gRXhjZWVkZWQgdGhlIHRpbWVvdXQuIEludm9rZSB0aGUgY2FsbGJhY2sgZXZlbiB0aG91Z2ggdGhlcmUncyBub1xuICAgICAgICAvLyB0aW1lIGxlZnQuXG4gICAgICAgIGRpZFRpbWVvdXQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTm8gdGltZW91dC5cbiAgICAgICAgaWYgKCFpc0FuaW1hdGlvbkZyYW1lU2NoZWR1bGVkKSB7XG4gICAgICAgICAgLy8gU2NoZWR1bGUgYW5vdGhlciBhbmltYXRpb24gY2FsbGJhY2sgc28gd2UgcmV0cnkgbGF0ZXIuXG4gICAgICAgICAgaXNBbmltYXRpb25GcmFtZVNjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lV2l0aFRpbWVvdXQoYW5pbWF0aW9uVGljayk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXhpdCB3aXRob3V0IGludm9raW5nIHRoZSBjYWxsYmFjay5cbiAgICAgICAgc2NoZWR1bGVkSG9zdENhbGxiYWNrID0gcHJldlNjaGVkdWxlZENhbGxiYWNrO1xuICAgICAgICB0aW1lb3V0VGltZSA9IHByZXZUaW1lb3V0VGltZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcmV2U2NoZWR1bGVkQ2FsbGJhY2sgIT09IG51bGwpIHtcbiAgICAgIGlzRmx1c2hpbmdIb3N0Q2FsbGJhY2sgPSB0cnVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcHJldlNjaGVkdWxlZENhbGxiYWNrKGRpZFRpbWVvdXQpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaXNGbHVzaGluZ0hvc3RDYWxsYmFjayA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgLy8gQXNzdW1lcyB0aGF0IHdlIGhhdmUgYWRkRXZlbnRMaXN0ZW5lciBpbiB0aGlzIGVudmlyb25tZW50LiBNaWdodCBuZWVkXG4gIC8vIHNvbWV0aGluZyBiZXR0ZXIgZm9yIG9sZCBJRS5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBpZGxlVGljaywgZmFsc2UpO1xuXG4gIHZhciBhbmltYXRpb25UaWNrID0gZnVuY3Rpb24gKHJhZlRpbWUpIHtcbiAgICBpZiAoc2NoZWR1bGVkSG9zdENhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICAvLyBFYWdlcmx5IHNjaGVkdWxlIHRoZSBuZXh0IGFuaW1hdGlvbiBjYWxsYmFjayBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZVxuICAgICAgLy8gZnJhbWUuIElmIHRoZSBzY2hlZHVsZXIgcXVldWUgaXMgbm90IGVtcHR5IGF0IHRoZSBlbmQgb2YgdGhlIGZyYW1lLCBpdFxuICAgICAgLy8gd2lsbCBjb250aW51ZSBmbHVzaGluZyBpbnNpZGUgdGhhdCBjYWxsYmFjay4gSWYgdGhlIHF1ZXVlICppcyogZW1wdHksXG4gICAgICAvLyB0aGVuIGl0IHdpbGwgZXhpdCBpbW1lZGlhdGVseS4gUG9zdGluZyB0aGUgY2FsbGJhY2sgYXQgdGhlIHN0YXJ0IG9mIHRoZVxuICAgICAgLy8gZnJhbWUgZW5zdXJlcyBpdCdzIGZpcmVkIHdpdGhpbiB0aGUgZWFybGllc3QgcG9zc2libGUgZnJhbWUuIElmIHdlXG4gICAgICAvLyB3YWl0ZWQgdW50aWwgdGhlIGVuZCBvZiB0aGUgZnJhbWUgdG8gcG9zdCB0aGUgY2FsbGJhY2ssIHdlIHJpc2sgdGhlXG4gICAgICAvLyBicm93c2VyIHNraXBwaW5nIGEgZnJhbWUgYW5kIG5vdCBmaXJpbmcgdGhlIGNhbGxiYWNrIHVudGlsIHRoZSBmcmFtZVxuICAgICAgLy8gYWZ0ZXIgdGhhdC5cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZVdpdGhUaW1lb3V0KGFuaW1hdGlvblRpY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyBwZW5kaW5nIHdvcmsuIEV4aXQuXG4gICAgICBpc0FuaW1hdGlvbkZyYW1lU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRGcmFtZVRpbWUgPSByYWZUaW1lIC0gZnJhbWVEZWFkbGluZSArIGFjdGl2ZUZyYW1lVGltZTtcbiAgICBpZiAobmV4dEZyYW1lVGltZSA8IGFjdGl2ZUZyYW1lVGltZSAmJiBwcmV2aW91c0ZyYW1lVGltZSA8IGFjdGl2ZUZyYW1lVGltZSkge1xuICAgICAgaWYgKG5leHRGcmFtZVRpbWUgPCA4KSB7XG4gICAgICAgIC8vIERlZmVuc2l2ZSBjb2RpbmcuIFdlIGRvbid0IHN1cHBvcnQgaGlnaGVyIGZyYW1lIHJhdGVzIHRoYW4gMTIwaHouXG4gICAgICAgIC8vIElmIHRoZSBjYWxjdWxhdGVkIGZyYW1lIHRpbWUgZ2V0cyBsb3dlciB0aGFuIDgsIGl0IGlzIHByb2JhYmx5IGEgYnVnLlxuICAgICAgICBuZXh0RnJhbWVUaW1lID0gODtcbiAgICAgIH1cbiAgICAgIC8vIElmIG9uZSBmcmFtZSBnb2VzIGxvbmcsIHRoZW4gdGhlIG5leHQgb25lIGNhbiBiZSBzaG9ydCB0byBjYXRjaCB1cC5cbiAgICAgIC8vIElmIHR3byBmcmFtZXMgYXJlIHNob3J0IGluIGEgcm93LCB0aGVuIHRoYXQncyBhbiBpbmRpY2F0aW9uIHRoYXQgd2VcbiAgICAgIC8vIGFjdHVhbGx5IGhhdmUgYSBoaWdoZXIgZnJhbWUgcmF0ZSB0aGFuIHdoYXQgd2UncmUgY3VycmVudGx5IG9wdGltaXppbmcuXG4gICAgICAvLyBXZSBhZGp1c3Qgb3VyIGhldXJpc3RpYyBkeW5hbWljYWxseSBhY2NvcmRpbmdseS4gRm9yIGV4YW1wbGUsIGlmIHdlJ3JlXG4gICAgICAvLyBydW5uaW5nIG9uIDEyMGh6IGRpc3BsYXkgb3IgOTBoeiBWUiBkaXNwbGF5LlxuICAgICAgLy8gVGFrZSB0aGUgbWF4IG9mIHRoZSB0d28gaW4gY2FzZSBvbmUgb2YgdGhlbSB3YXMgYW4gYW5vbWFseSBkdWUgdG9cbiAgICAgIC8vIG1pc3NlZCBmcmFtZSBkZWFkbGluZXMuXG4gICAgICBhY3RpdmVGcmFtZVRpbWUgPSBuZXh0RnJhbWVUaW1lIDwgcHJldmlvdXNGcmFtZVRpbWUgPyBwcmV2aW91c0ZyYW1lVGltZSA6IG5leHRGcmFtZVRpbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZpb3VzRnJhbWVUaW1lID0gbmV4dEZyYW1lVGltZTtcbiAgICB9XG4gICAgZnJhbWVEZWFkbGluZSA9IHJhZlRpbWUgKyBhY3RpdmVGcmFtZVRpbWU7XG4gICAgaWYgKCFpc01lc3NhZ2VFdmVudFNjaGVkdWxlZCkge1xuICAgICAgaXNNZXNzYWdlRXZlbnRTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgd2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2VLZXksICcqJyk7XG4gICAgfVxuICB9O1xuXG4gIHJlcXVlc3RIb3N0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGFic29sdXRlVGltZW91dCkge1xuICAgIHNjaGVkdWxlZEhvc3RDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRpbWVvdXRUaW1lID0gYWJzb2x1dGVUaW1lb3V0O1xuICAgIGlmIChpc0ZsdXNoaW5nSG9zdENhbGxiYWNrIHx8IGFic29sdXRlVGltZW91dCA8IDApIHtcbiAgICAgIC8vIERvbid0IHdhaXQgZm9yIHRoZSBuZXh0IGZyYW1lLiBDb250aW51ZSB3b3JraW5nIEFTQVAsIGluIGEgbmV3IGV2ZW50LlxuICAgICAgd2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2VLZXksICcqJyk7XG4gICAgfSBlbHNlIGlmICghaXNBbmltYXRpb25GcmFtZVNjaGVkdWxlZCkge1xuICAgICAgLy8gSWYgckFGIGRpZG4ndCBhbHJlYWR5IHNjaGVkdWxlIG9uZSwgd2UgbmVlZCB0byBzY2hlZHVsZSBhIGZyYW1lLlxuICAgICAgLy8gVE9ETzogSWYgdGhpcyByQUYgZG9lc24ndCBtYXRlcmlhbGl6ZSBiZWNhdXNlIHRoZSBicm93c2VyIHRocm90dGxlcywgd2VcbiAgICAgIC8vIG1pZ2h0IHdhbnQgdG8gc3RpbGwgaGF2ZSBzZXRUaW1lb3V0IHRyaWdnZXIgcklDIGFzIGEgYmFja3VwIHRvIGVuc3VyZVxuICAgICAgLy8gdGhhdCB3ZSBrZWVwIHBlcmZvcm1pbmcgd29yay5cbiAgICAgIGlzQW5pbWF0aW9uRnJhbWVTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lV2l0aFRpbWVvdXQoYW5pbWF0aW9uVGljayk7XG4gICAgfVxuICB9O1xuXG4gIGNhbmNlbEhvc3RDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICBzY2hlZHVsZWRIb3N0Q2FsbGJhY2sgPSBudWxsO1xuICAgIGlzTWVzc2FnZUV2ZW50U2NoZWR1bGVkID0gZmFsc2U7XG4gICAgdGltZW91dFRpbWUgPSAtMTtcbiAgfTtcbn1cblxudmFyIERFRkFVTFRfVEhSRUFEX0lEID0gMDtcblxuLy8gQ291bnRlcnMgdXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgSURzLlxudmFyIGludGVyYWN0aW9uSURDb3VudGVyID0gMDtcbnZhciB0aHJlYWRJRENvdW50ZXIgPSAwO1xuXG4vLyBTZXQgb2YgY3VycmVudGx5IHRyYWNlZCBpbnRlcmFjdGlvbnMuXG4vLyBJbnRlcmFjdGlvbnMgXCJzdGFja1wi4oCTXG4vLyBNZWFuaW5nIHRoYXQgbmV3bHkgdHJhY2VkIGludGVyYWN0aW9ucyBhcmUgYXBwZW5kZWQgdG8gdGhlIHByZXZpb3VzbHkgYWN0aXZlIHNldC5cbi8vIFdoZW4gYW4gaW50ZXJhY3Rpb24gZ29lcyBvdXQgb2Ygc2NvcGUsIHRoZSBwcmV2aW91cyBzZXQgKGlmIGFueSkgaXMgcmVzdG9yZWQuXG52YXIgaW50ZXJhY3Rpb25zUmVmID0gbnVsbDtcblxuLy8gTGlzdGVuZXIocykgdG8gbm90aWZ5IHdoZW4gaW50ZXJhY3Rpb25zIGJlZ2luIGFuZCBlbmQuXG52YXIgc3Vic2NyaWJlclJlZiA9IG51bGw7XG5cbmlmIChlbmFibGVTY2hlZHVsZXJUcmFjaW5nKSB7XG4gIGludGVyYWN0aW9uc1JlZiA9IHtcbiAgICBjdXJyZW50OiBuZXcgU2V0KClcbiAgfTtcbiAgc3Vic2NyaWJlclJlZiA9IHtcbiAgICBjdXJyZW50OiBudWxsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX2NsZWFyKGNhbGxiYWNrKSB7XG4gIGlmICghZW5hYmxlU2NoZWR1bGVyVHJhY2luZykge1xuICAgIHJldHVybiBjYWxsYmFjaygpO1xuICB9XG5cbiAgdmFyIHByZXZJbnRlcmFjdGlvbnMgPSBpbnRlcmFjdGlvbnNSZWYuY3VycmVudDtcbiAgaW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQgPSBuZXcgU2V0KCk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpbnRlcmFjdGlvbnNSZWYuY3VycmVudCA9IHByZXZJbnRlcmFjdGlvbnM7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5zdGFibGVfZ2V0Q3VycmVudCgpIHtcbiAgaWYgKCFlbmFibGVTY2hlZHVsZXJUcmFjaW5nKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGludGVyYWN0aW9uc1JlZi5jdXJyZW50O1xuICB9XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX2dldFRocmVhZElEKCkge1xuICByZXR1cm4gKyt0aHJlYWRJRENvdW50ZXI7XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX3RyYWNlKG5hbWUsIHRpbWVzdGFtcCwgY2FsbGJhY2spIHtcbiAgdmFyIHRocmVhZElEID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBERUZBVUxUX1RIUkVBRF9JRDtcblxuICBpZiAoIWVuYWJsZVNjaGVkdWxlclRyYWNpbmcpIHtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfVxuXG4gIHZhciBpbnRlcmFjdGlvbiA9IHtcbiAgICBfX2NvdW50OiAxLFxuICAgIGlkOiBpbnRlcmFjdGlvbklEQ291bnRlcisrLFxuICAgIG5hbWU6IG5hbWUsXG4gICAgdGltZXN0YW1wOiB0aW1lc3RhbXBcbiAgfTtcblxuICB2YXIgcHJldkludGVyYWN0aW9ucyA9IGludGVyYWN0aW9uc1JlZi5jdXJyZW50O1xuXG4gIC8vIFRyYWNlZCBpbnRlcmFjdGlvbnMgc2hvdWxkIHN0YWNrL2FjY3VtdWxhdGUuXG4gIC8vIFRvIGRvIHRoYXQsIGNsb25lIHRoZSBjdXJyZW50IGludGVyYWN0aW9ucy5cbiAgLy8gVGhlIHByZXZpb3VzIHNldCB3aWxsIGJlIHJlc3RvcmVkIHVwb24gY29tcGxldGlvbi5cbiAgdmFyIGludGVyYWN0aW9ucyA9IG5ldyBTZXQocHJldkludGVyYWN0aW9ucyk7XG4gIGludGVyYWN0aW9ucy5hZGQoaW50ZXJhY3Rpb24pO1xuICBpbnRlcmFjdGlvbnNSZWYuY3VycmVudCA9IGludGVyYWN0aW9ucztcblxuICB2YXIgc3Vic2NyaWJlciA9IHN1YnNjcmliZXJSZWYuY3VycmVudDtcbiAgdmFyIHJldHVyblZhbHVlID0gdm9pZCAwO1xuXG4gIHRyeSB7XG4gICAgaWYgKHN1YnNjcmliZXIgIT09IG51bGwpIHtcbiAgICAgIHN1YnNjcmliZXIub25JbnRlcmFjdGlvblRyYWNlZChpbnRlcmFjdGlvbik7XG4gICAgfVxuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoc3Vic2NyaWJlciAhPT0gbnVsbCkge1xuICAgICAgICBzdWJzY3JpYmVyLm9uV29ya1N0YXJ0ZWQoaW50ZXJhY3Rpb25zLCB0aHJlYWRJRCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVyblZhbHVlID0gY2FsbGJhY2soKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGludGVyYWN0aW9uc1JlZi5jdXJyZW50ID0gcHJldkludGVyYWN0aW9ucztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChzdWJzY3JpYmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm9uV29ya1N0b3BwZWQoaW50ZXJhY3Rpb25zLCB0aHJlYWRJRCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGludGVyYWN0aW9uLl9fY291bnQtLTtcblxuICAgICAgICAgIC8vIElmIG5vIGFzeW5jIHdvcmsgd2FzIHNjaGVkdWxlZCBmb3IgdGhpcyBpbnRlcmFjdGlvbixcbiAgICAgICAgICAvLyBOb3RpZnkgc3Vic2NyaWJlcnMgdGhhdCBpdCdzIGNvbXBsZXRlZC5cbiAgICAgICAgICBpZiAoc3Vic2NyaWJlciAhPT0gbnVsbCAmJiBpbnRlcmFjdGlvbi5fX2NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm9uSW50ZXJhY3Rpb25TY2hlZHVsZWRXb3JrQ29tcGxldGVkKGludGVyYWN0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX3dyYXAoY2FsbGJhY2spIHtcbiAgdmFyIHRocmVhZElEID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBERUZBVUxUX1RIUkVBRF9JRDtcblxuICBpZiAoIWVuYWJsZVNjaGVkdWxlclRyYWNpbmcpIHtcbiAgICByZXR1cm4gY2FsbGJhY2s7XG4gIH1cblxuICB2YXIgd3JhcHBlZEludGVyYWN0aW9ucyA9IGludGVyYWN0aW9uc1JlZi5jdXJyZW50O1xuXG4gIHZhciBzdWJzY3JpYmVyID0gc3Vic2NyaWJlclJlZi5jdXJyZW50O1xuICBpZiAoc3Vic2NyaWJlciAhPT0gbnVsbCkge1xuICAgIHN1YnNjcmliZXIub25Xb3JrU2NoZWR1bGVkKHdyYXBwZWRJbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgcGVuZGluZyBhc3luYyB3b3JrIGNvdW50IGZvciB0aGUgY3VycmVudCBpbnRlcmFjdGlvbnMuXG4gIC8vIFVwZGF0ZSBhZnRlciBjYWxsaW5nIHN1YnNjcmliZXJzIGluIGNhc2Ugb2YgZXJyb3IuXG4gIHdyYXBwZWRJbnRlcmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgICBpbnRlcmFjdGlvbi5fX2NvdW50Kys7XG4gIH0pO1xuXG4gIHZhciBoYXNSdW4gPSBmYWxzZTtcblxuICBmdW5jdGlvbiB3cmFwcGVkKCkge1xuICAgIHZhciBwcmV2SW50ZXJhY3Rpb25zID0gaW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQ7XG4gICAgaW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQgPSB3cmFwcGVkSW50ZXJhY3Rpb25zO1xuXG4gICAgc3Vic2NyaWJlciA9IHN1YnNjcmliZXJSZWYuY3VycmVudDtcblxuICAgIHRyeSB7XG4gICAgICB2YXIgcmV0dXJuVmFsdWUgPSB2b2lkIDA7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChzdWJzY3JpYmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgc3Vic2NyaWJlci5vbldvcmtTdGFydGVkKHdyYXBwZWRJbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm5WYWx1ZSA9IGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpbnRlcmFjdGlvbnNSZWYuY3VycmVudCA9IHByZXZJbnRlcmFjdGlvbnM7XG5cbiAgICAgICAgICBpZiAoc3Vic2NyaWJlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5vbldvcmtTdG9wcGVkKHdyYXBwZWRJbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoIWhhc1J1bikge1xuICAgICAgICAvLyBXZSBvbmx5IGV4cGVjdCBhIHdyYXBwZWQgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgb25jZSxcbiAgICAgICAgLy8gQnV0IGluIHRoZSBldmVudCB0aGF0IGl0J3MgZXhlY3V0ZWQgbW9yZSB0aGFuIG9uY2XigJNcbiAgICAgICAgLy8gT25seSBkZWNyZW1lbnQgdGhlIG91dHN0YW5kaW5nIGludGVyYWN0aW9uIGNvdW50cyBvbmNlLlxuICAgICAgICBoYXNSdW4gPSB0cnVlO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBwZW5kaW5nIGFzeW5jIGNvdW50cyBmb3IgYWxsIHdyYXBwZWQgaW50ZXJhY3Rpb25zLlxuICAgICAgICAvLyBJZiB0aGlzIHdhcyB0aGUgbGFzdCBzY2hlZHVsZWQgYXN5bmMgd29yayBmb3IgYW55IG9mIHRoZW0sXG4gICAgICAgIC8vIE1hcmsgdGhlbSBhcyBjb21wbGV0ZWQuXG4gICAgICAgIHdyYXBwZWRJbnRlcmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICBpbnRlcmFjdGlvbi5fX2NvdW50LS07XG5cbiAgICAgICAgICBpZiAoc3Vic2NyaWJlciAhPT0gbnVsbCAmJiBpbnRlcmFjdGlvbi5fX2NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm9uSW50ZXJhY3Rpb25TY2hlZHVsZWRXb3JrQ29tcGxldGVkKGludGVyYWN0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHdyYXBwZWQuY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIHN1YnNjcmliZXIgPSBzdWJzY3JpYmVyUmVmLmN1cnJlbnQ7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKHN1YnNjcmliZXIgIT09IG51bGwpIHtcbiAgICAgICAgc3Vic2NyaWJlci5vbldvcmtDYW5jZWxlZCh3cmFwcGVkSW50ZXJhY3Rpb25zLCB0aHJlYWRJRCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIC8vIFVwZGF0ZSBwZW5kaW5nIGFzeW5jIGNvdW50cyBmb3IgYWxsIHdyYXBwZWQgaW50ZXJhY3Rpb25zLlxuICAgICAgLy8gSWYgdGhpcyB3YXMgdGhlIGxhc3Qgc2NoZWR1bGVkIGFzeW5jIHdvcmsgZm9yIGFueSBvZiB0aGVtLFxuICAgICAgLy8gTWFyayB0aGVtIGFzIGNvbXBsZXRlZC5cbiAgICAgIHdyYXBwZWRJbnRlcmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgICAgICAgaW50ZXJhY3Rpb24uX19jb3VudC0tO1xuXG4gICAgICAgIGlmIChzdWJzY3JpYmVyICYmIGludGVyYWN0aW9uLl9fY291bnQgPT09IDApIHtcbiAgICAgICAgICBzdWJzY3JpYmVyLm9uSW50ZXJhY3Rpb25TY2hlZHVsZWRXb3JrQ29tcGxldGVkKGludGVyYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG52YXIgc3Vic2NyaWJlcnMgPSBudWxsO1xuaWYgKGVuYWJsZVNjaGVkdWxlclRyYWNpbmcpIHtcbiAgc3Vic2NyaWJlcnMgPSBuZXcgU2V0KCk7XG59XG5cbmZ1bmN0aW9uIHVuc3RhYmxlX3N1YnNjcmliZShzdWJzY3JpYmVyKSB7XG4gIGlmIChlbmFibGVTY2hlZHVsZXJUcmFjaW5nKSB7XG4gICAgc3Vic2NyaWJlcnMuYWRkKHN1YnNjcmliZXIpO1xuXG4gICAgaWYgKHN1YnNjcmliZXJzLnNpemUgPT09IDEpIHtcbiAgICAgIHN1YnNjcmliZXJSZWYuY3VycmVudCA9IHtcbiAgICAgICAgb25JbnRlcmFjdGlvblNjaGVkdWxlZFdvcmtDb21wbGV0ZWQ6IG9uSW50ZXJhY3Rpb25TY2hlZHVsZWRXb3JrQ29tcGxldGVkLFxuICAgICAgICBvbkludGVyYWN0aW9uVHJhY2VkOiBvbkludGVyYWN0aW9uVHJhY2VkLFxuICAgICAgICBvbldvcmtDYW5jZWxlZDogb25Xb3JrQ2FuY2VsZWQsXG4gICAgICAgIG9uV29ya1NjaGVkdWxlZDogb25Xb3JrU2NoZWR1bGVkLFxuICAgICAgICBvbldvcmtTdGFydGVkOiBvbldvcmtTdGFydGVkLFxuICAgICAgICBvbldvcmtTdG9wcGVkOiBvbldvcmtTdG9wcGVkXG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1bnN0YWJsZV91bnN1YnNjcmliZShzdWJzY3JpYmVyKSB7XG4gIGlmIChlbmFibGVTY2hlZHVsZXJUcmFjaW5nKSB7XG4gICAgc3Vic2NyaWJlcnMuZGVsZXRlKHN1YnNjcmliZXIpO1xuXG4gICAgaWYgKHN1YnNjcmliZXJzLnNpemUgPT09IDApIHtcbiAgICAgIHN1YnNjcmliZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG9uSW50ZXJhY3Rpb25UcmFjZWQoaW50ZXJhY3Rpb24pIHtcbiAgdmFyIGRpZENhdGNoRXJyb3IgPSBmYWxzZTtcbiAgdmFyIGNhdWdodEVycm9yID0gbnVsbDtcblxuICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN1YnNjcmliZXIub25JbnRlcmFjdGlvblRyYWNlZChpbnRlcmFjdGlvbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmICghZGlkQ2F0Y2hFcnJvcikge1xuICAgICAgICBkaWRDYXRjaEVycm9yID0gdHJ1ZTtcbiAgICAgICAgY2F1Z2h0RXJyb3IgPSBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGlmIChkaWRDYXRjaEVycm9yKSB7XG4gICAgdGhyb3cgY2F1Z2h0RXJyb3I7XG4gIH1cbn1cblxuZnVuY3Rpb24gb25JbnRlcmFjdGlvblNjaGVkdWxlZFdvcmtDb21wbGV0ZWQoaW50ZXJhY3Rpb24pIHtcbiAgdmFyIGRpZENhdGNoRXJyb3IgPSBmYWxzZTtcbiAgdmFyIGNhdWdodEVycm9yID0gbnVsbDtcblxuICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN1YnNjcmliZXIub25JbnRlcmFjdGlvblNjaGVkdWxlZFdvcmtDb21wbGV0ZWQoaW50ZXJhY3Rpb24pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoIWRpZENhdGNoRXJyb3IpIHtcbiAgICAgICAgZGlkQ2F0Y2hFcnJvciA9IHRydWU7XG4gICAgICAgIGNhdWdodEVycm9yID0gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpZiAoZGlkQ2F0Y2hFcnJvcikge1xuICAgIHRocm93IGNhdWdodEVycm9yO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uV29ya1NjaGVkdWxlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKSB7XG4gIHZhciBkaWRDYXRjaEVycm9yID0gZmFsc2U7XG4gIHZhciBjYXVnaHRFcnJvciA9IG51bGw7XG5cbiAgc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgIHRyeSB7XG4gICAgICBzdWJzY3JpYmVyLm9uV29ya1NjaGVkdWxlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKCFkaWRDYXRjaEVycm9yKSB7XG4gICAgICAgIGRpZENhdGNoRXJyb3IgPSB0cnVlO1xuICAgICAgICBjYXVnaHRFcnJvciA9IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKGRpZENhdGNoRXJyb3IpIHtcbiAgICB0aHJvdyBjYXVnaHRFcnJvcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbldvcmtTdGFydGVkKGludGVyYWN0aW9ucywgdGhyZWFkSUQpIHtcbiAgdmFyIGRpZENhdGNoRXJyb3IgPSBmYWxzZTtcbiAgdmFyIGNhdWdodEVycm9yID0gbnVsbDtcblxuICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN1YnNjcmliZXIub25Xb3JrU3RhcnRlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKCFkaWRDYXRjaEVycm9yKSB7XG4gICAgICAgIGRpZENhdGNoRXJyb3IgPSB0cnVlO1xuICAgICAgICBjYXVnaHRFcnJvciA9IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKGRpZENhdGNoRXJyb3IpIHtcbiAgICB0aHJvdyBjYXVnaHRFcnJvcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbldvcmtTdG9wcGVkKGludGVyYWN0aW9ucywgdGhyZWFkSUQpIHtcbiAgdmFyIGRpZENhdGNoRXJyb3IgPSBmYWxzZTtcbiAgdmFyIGNhdWdodEVycm9yID0gbnVsbDtcblxuICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN1YnNjcmliZXIub25Xb3JrU3RvcHBlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKCFkaWRDYXRjaEVycm9yKSB7XG4gICAgICAgIGRpZENhdGNoRXJyb3IgPSB0cnVlO1xuICAgICAgICBjYXVnaHRFcnJvciA9IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKGRpZENhdGNoRXJyb3IpIHtcbiAgICB0aHJvdyBjYXVnaHRFcnJvcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbldvcmtDYW5jZWxlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKSB7XG4gIHZhciBkaWRDYXRjaEVycm9yID0gZmFsc2U7XG4gIHZhciBjYXVnaHRFcnJvciA9IG51bGw7XG5cbiAgc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgIHRyeSB7XG4gICAgICBzdWJzY3JpYmVyLm9uV29ya0NhbmNlbGVkKGludGVyYWN0aW9ucywgdGhyZWFkSUQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoIWRpZENhdGNoRXJyb3IpIHtcbiAgICAgICAgZGlkQ2F0Y2hFcnJvciA9IHRydWU7XG4gICAgICAgIGNhdWdodEVycm9yID0gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpZiAoZGlkQ2F0Y2hFcnJvcikge1xuICAgIHRocm93IGNhdWdodEVycm9yO1xuICB9XG59XG5cbi8qKlxuICogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnQgb3duZXIuXG4gKlxuICogVGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIGNvbXBvbmVudCB3aG8gc2hvdWxkIG93biBhbnkgY29tcG9uZW50cyB0aGF0IGFyZVxuICogY3VycmVudGx5IGJlaW5nIGNvbnN0cnVjdGVkLlxuICovXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSB7XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQHR5cGUge1JlYWN0Q29tcG9uZW50fVxuICAgKi9cbiAgY3VycmVudDogbnVsbCxcbiAgY3VycmVudERpc3BhdGNoZXI6IG51bGxcbn07XG5cbnZhciBCRUZPUkVfU0xBU0hfUkUgPSAvXiguKilbXFxcXFxcL10vO1xuXG52YXIgZGVzY3JpYmVDb21wb25lbnRGcmFtZSA9IGZ1bmN0aW9uIChuYW1lLCBzb3VyY2UsIG93bmVyTmFtZSkge1xuICB2YXIgc291cmNlSW5mbyA9ICcnO1xuICBpZiAoc291cmNlKSB7XG4gICAgdmFyIHBhdGggPSBzb3VyY2UuZmlsZU5hbWU7XG4gICAgdmFyIGZpbGVOYW1lID0gcGF0aC5yZXBsYWNlKEJFRk9SRV9TTEFTSF9SRSwgJycpO1xuICAgIHtcbiAgICAgIC8vIEluIERFViwgaW5jbHVkZSBjb2RlIGZvciBhIGNvbW1vbiBzcGVjaWFsIGNhc2U6XG4gICAgICAvLyBwcmVmZXIgXCJmb2xkZXIvaW5kZXguanNcIiBpbnN0ZWFkIG9mIGp1c3QgXCJpbmRleC5qc1wiLlxuICAgICAgaWYgKC9eaW5kZXhcXC4vLnRlc3QoZmlsZU5hbWUpKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IHBhdGgubWF0Y2goQkVGT1JFX1NMQVNIX1JFKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgdmFyIHBhdGhCZWZvcmVTbGFzaCA9IG1hdGNoWzFdO1xuICAgICAgICAgIGlmIChwYXRoQmVmb3JlU2xhc2gpIHtcbiAgICAgICAgICAgIHZhciBmb2xkZXJOYW1lID0gcGF0aEJlZm9yZVNsYXNoLnJlcGxhY2UoQkVGT1JFX1NMQVNIX1JFLCAnJyk7XG4gICAgICAgICAgICBmaWxlTmFtZSA9IGZvbGRlck5hbWUgKyAnLycgKyBmaWxlTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlSW5mbyA9ICcgKGF0ICcgKyBmaWxlTmFtZSArICc6JyArIHNvdXJjZS5saW5lTnVtYmVyICsgJyknO1xuICB9IGVsc2UgaWYgKG93bmVyTmFtZSkge1xuICAgIHNvdXJjZUluZm8gPSAnIChjcmVhdGVkIGJ5ICcgKyBvd25lck5hbWUgKyAnKSc7XG4gIH1cbiAgcmV0dXJuICdcXG4gICAgaW4gJyArIChuYW1lIHx8ICdVbmtub3duJykgKyBzb3VyY2VJbmZvO1xufTtcblxudmFyIFJlc29sdmVkID0gMTtcblxuXG5mdW5jdGlvbiByZWZpbmVSZXNvbHZlZExhenlDb21wb25lbnQobGF6eUNvbXBvbmVudCkge1xuICByZXR1cm4gbGF6eUNvbXBvbmVudC5fc3RhdHVzID09PSBSZXNvbHZlZCA/IGxhenlDb21wb25lbnQuX3Jlc3VsdCA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldFdyYXBwZWROYW1lKG91dGVyVHlwZSwgaW5uZXJUeXBlLCB3cmFwcGVyTmFtZSkge1xuICB2YXIgZnVuY3Rpb25OYW1lID0gaW5uZXJUeXBlLmRpc3BsYXlOYW1lIHx8IGlubmVyVHlwZS5uYW1lIHx8ICcnO1xuICByZXR1cm4gb3V0ZXJUeXBlLmRpc3BsYXlOYW1lIHx8IChmdW5jdGlvbk5hbWUgIT09ICcnID8gd3JhcHBlck5hbWUgKyAnKCcgKyBmdW5jdGlvbk5hbWUgKyAnKScgOiB3cmFwcGVyTmFtZSk7XG59XG5cbmZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWUodHlwZSkge1xuICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgLy8gSG9zdCByb290LCB0ZXh0IG5vZGUgb3IganVzdCBpbnZhbGlkIHR5cGUuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAge1xuICAgIGlmICh0eXBlb2YgdHlwZS50YWcgPT09ICdudW1iZXInKSB7XG4gICAgICB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICdSZWNlaXZlZCBhbiB1bmV4cGVjdGVkIG9iamVjdCBpbiBnZXRDb21wb25lbnROYW1lKCkuICcgKyAnVGhpcyBpcyBsaWtlbHkgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLicpO1xuICAgIH1cbiAgfVxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgbnVsbDtcbiAgfVxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTpcbiAgICAgIHJldHVybiAnQ29uY3VycmVudE1vZGUnO1xuICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgIHJldHVybiAnRnJhZ21lbnQnO1xuICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICByZXR1cm4gJ1BvcnRhbCc7XG4gICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgcmV0dXJuICdQcm9maWxlcic7XG4gICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgcmV0dXJuICdTdHJpY3RNb2RlJztcbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICByZXR1cm4gJ1N1c3BlbnNlJztcbiAgfVxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgc3dpdGNoICh0eXBlLiQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgcmV0dXJuICdDb250ZXh0LkNvbnN1bWVyJztcbiAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgcmV0dXJuICdDb250ZXh0LlByb3ZpZGVyJztcbiAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgcmV0dXJuIGdldFdyYXBwZWROYW1lKHR5cGUsIHR5cGUucmVuZGVyLCAnRm9yd2FyZFJlZicpO1xuICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lKHR5cGUudHlwZSk7XG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAge1xuICAgICAgICAgIHZhciB0aGVuYWJsZSA9IHR5cGU7XG4gICAgICAgICAgdmFyIHJlc29sdmVkVGhlbmFibGUgPSByZWZpbmVSZXNvbHZlZExhenlDb21wb25lbnQodGhlbmFibGUpO1xuICAgICAgICAgIGlmIChyZXNvbHZlZFRoZW5hYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZShyZXNvbHZlZFRoZW5hYmxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0ge307XG5cbnZhciBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IG51bGw7XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KGVsZW1lbnQpIHtcbiAge1xuICAgIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gZWxlbWVudDtcbiAgfVxufVxuXG57XG4gIC8vIFN0YWNrIGltcGxlbWVudGF0aW9uIGluamVjdGVkIGJ5IHRoZSBjdXJyZW50IHJlbmRlcmVyLlxuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldEN1cnJlbnRTdGFjayA9IG51bGw7XG5cbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdGFjayA9ICcnO1xuXG4gICAgLy8gQWRkIGFuIGV4dHJhIHRvcCBmcmFtZSB3aGlsZSBhbiBlbGVtZW50IGlzIGJlaW5nIHZhbGlkYXRlZFxuICAgIGlmIChjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCkge1xuICAgICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lKGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50LnR5cGUpO1xuICAgICAgdmFyIG93bmVyID0gY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQuX293bmVyO1xuICAgICAgc3RhY2sgKz0gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lLCBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudC5fc291cmNlLCBvd25lciAmJiBnZXRDb21wb25lbnROYW1lKG93bmVyLnR5cGUpKTtcbiAgICB9XG5cbiAgICAvLyBEZWxlZ2F0ZSB0byB0aGUgaW5qZWN0ZWQgcmVuZGVyZXItc3BlY2lmaWMgaW1wbGVtZW50YXRpb25cbiAgICB2YXIgaW1wbCA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0Q3VycmVudFN0YWNrO1xuICAgIGlmIChpbXBsKSB7XG4gICAgICBzdGFjayArPSBpbXBsKCkgfHwgJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YWNrO1xuICB9O1xufVxuXG52YXIgUmVhY3RTaGFyZWRJbnRlcm5hbHMgPSB7XG4gIFJlYWN0Q3VycmVudE93bmVyOiBSZWFjdEN1cnJlbnRPd25lcixcbiAgLy8gVXNlZCBieSByZW5kZXJlcnMgdG8gYXZvaWQgYnVuZGxpbmcgb2JqZWN0LWFzc2lnbiB0d2ljZSBpbiBVTUQgYnVuZGxlczpcbiAgYXNzaWduOiBvYmplY3RBc3NpZ25cbn07XG5cbntcbiAgLy8gUmUtZXhwb3J0IHRoZSBzY2hlZHVsZSBBUEkocykgZm9yIFVNRCBidW5kbGVzLlxuICAvLyBUaGlzIGF2b2lkcyBpbnRyb2R1Y2luZyBhIGRlcGVuZGVuY3kgb24gYSBuZXcgVU1EIGdsb2JhbCBpbiBhIG1pbm9yIHVwZGF0ZSxcbiAgLy8gU2luY2UgdGhhdCB3b3VsZCBiZSBhIGJyZWFraW5nIGNoYW5nZSAoZS5nLiBmb3IgYWxsIGV4aXN0aW5nIENvZGVTYW5kYm94ZXMpLlxuICAvLyBUaGlzIHJlLWV4cG9ydCBpcyBvbmx5IHJlcXVpcmVkIGZvciBVTUQgYnVuZGxlcztcbiAgLy8gQ0pTIGJ1bmRsZXMgdXNlIHRoZSBzaGFyZWQgTlBNIHBhY2thZ2UuXG4gIG9iamVjdEFzc2lnbihSZWFjdFNoYXJlZEludGVybmFscywge1xuICAgIFNjaGVkdWxlcjoge1xuICAgICAgdW5zdGFibGVfY2FuY2VsQ2FsbGJhY2s6IHVuc3RhYmxlX2NhbmNlbENhbGxiYWNrLFxuICAgICAgdW5zdGFibGVfc2hvdWxkWWllbGQ6IHVuc3RhYmxlX3Nob3VsZFlpZWxkLFxuICAgICAgdW5zdGFibGVfbm93OiBnZXRDdXJyZW50VGltZSxcbiAgICAgIHVuc3RhYmxlX3NjaGVkdWxlQ2FsbGJhY2s6IHVuc3RhYmxlX3NjaGVkdWxlQ2FsbGJhY2ssXG4gICAgICB1bnN0YWJsZV9ydW5XaXRoUHJpb3JpdHk6IHVuc3RhYmxlX3J1bldpdGhQcmlvcml0eSxcbiAgICAgIHVuc3RhYmxlX3dyYXBDYWxsYmFjazogdW5zdGFibGVfd3JhcENhbGxiYWNrLFxuICAgICAgdW5zdGFibGVfZ2V0Q3VycmVudFByaW9yaXR5TGV2ZWw6IHVuc3RhYmxlX2dldEN1cnJlbnRQcmlvcml0eUxldmVsXG4gICAgfSxcbiAgICBTY2hlZHVsZXJUcmFjaW5nOiB7XG4gICAgICBfX2ludGVyYWN0aW9uc1JlZjogaW50ZXJhY3Rpb25zUmVmLFxuICAgICAgX19zdWJzY3JpYmVyUmVmOiBzdWJzY3JpYmVyUmVmLFxuICAgICAgdW5zdGFibGVfY2xlYXI6IHVuc3RhYmxlX2NsZWFyLFxuICAgICAgdW5zdGFibGVfZ2V0Q3VycmVudDogdW5zdGFibGVfZ2V0Q3VycmVudCxcbiAgICAgIHVuc3RhYmxlX2dldFRocmVhZElEOiB1bnN0YWJsZV9nZXRUaHJlYWRJRCxcbiAgICAgIHVuc3RhYmxlX3N1YnNjcmliZTogdW5zdGFibGVfc3Vic2NyaWJlLFxuICAgICAgdW5zdGFibGVfdHJhY2U6IHVuc3RhYmxlX3RyYWNlLFxuICAgICAgdW5zdGFibGVfdW5zdWJzY3JpYmU6IHVuc3RhYmxlX3Vuc3Vic2NyaWJlLFxuICAgICAgdW5zdGFibGVfd3JhcDogdW5zdGFibGVfd3JhcFxuICAgIH1cbiAgfSk7XG59XG5cbntcbiAgb2JqZWN0QXNzaWduKFJlYWN0U2hhcmVkSW50ZXJuYWxzLCB7XG4gICAgLy8gVGhlc2Ugc2hvdWxkIG5vdCBiZSBpbmNsdWRlZCBpbiBwcm9kdWN0aW9uLlxuICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWU6IFJlYWN0RGVidWdDdXJyZW50RnJhbWUsXG4gICAgLy8gU2hpbSBmb3IgUmVhY3QgRE9NIDE2LjAuMCB3aGljaCBzdGlsbCBkZXN0cnVjdHVyZWQgKGJ1dCBub3QgdXNlZCkgdGhpcy5cbiAgICAvLyBUT0RPOiByZW1vdmUgaW4gUmVhY3QgMTcuMC5cbiAgICBSZWFjdENvbXBvbmVudFRyZWVIb29rOiB7fVxuICB9KTtcbn1cblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSB3YXJuaW5nV2l0aG91dFN0YWNrJDE7XG5cbntcbiAgd2FybmluZyA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIFJlYWN0RGVidWdDdXJyZW50RnJhbWUgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdERlYnVnQ3VycmVudEZyYW1lO1xuICAgIHZhciBzdGFjayA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSgpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC93YXJuaW5nLWFuZC1pbnZhcmlhbnQtYXJnc1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB3YXJuaW5nV2l0aG91dFN0YWNrJDEuYXBwbHkodW5kZWZpbmVkLCBbZmFsc2UsIGZvcm1hdCArICclcyddLmNvbmNhdChhcmdzLCBbc3RhY2tdKSk7XG4gIH07XG59XG5cbnZhciB3YXJuaW5nJDEgPSB3YXJuaW5nO1xuXG52YXIgaGFzT3duUHJvcGVydHkkMSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAga2V5OiB0cnVlLFxuICByZWY6IHRydWUsXG4gIF9fc2VsZjogdHJ1ZSxcbiAgX19zb3VyY2U6IHRydWVcbn07XG5cbnZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHZvaWQgMDtcbnZhciBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHZvaWQgMDtcblxuZnVuY3Rpb24gaGFzVmFsaWRSZWYoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkkMS5jYWxsKGNvbmZpZywgJ3JlZicpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdyZWYnKS5nZXQ7XG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25maWcucmVmICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICB7XG4gICAgaWYgKGhhc093blByb3BlcnR5JDEuY2FsbChjb25maWcsICdrZXknKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLmtleSAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSk7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdrZXknLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXksXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ1JlZiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICclczogYHJlZmAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSk7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdyZWYnLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBSZWFjdCBlbGVtZW50LiBUaGlzIG5vIGxvbmdlciBhZGhlcmVzIHRvXG4gKiB0aGUgY2xhc3MgcGF0dGVybiwgc28gZG8gbm90IHVzZSBuZXcgdG8gY2FsbCBpdC4gQWxzbywgbm8gaW5zdGFuY2VvZiBjaGVja1xuICogd2lsbCB3b3JrLiBJbnN0ZWFkIHRlc3QgJCR0eXBlb2YgZmllbGQgYWdhaW5zdCBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgdG8gY2hlY2tcbiAqIGlmIHNvbWV0aGluZyBpcyBhIFJlYWN0IEVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHsqfSB0eXBlXG4gKiBAcGFyYW0geyp9IGtleVxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZWZcbiAqIEBwYXJhbSB7Kn0gc2VsZiBBICp0ZW1wb3JhcnkqIGhlbHBlciB0byBkZXRlY3QgcGxhY2VzIHdoZXJlIGB0aGlzYCBpc1xuICogZGlmZmVyZW50IGZyb20gdGhlIGBvd25lcmAgd2hlbiBSZWFjdC5jcmVhdGVFbGVtZW50IGlzIGNhbGxlZCwgc28gdGhhdCB3ZVxuICogY2FuIHdhcm4uIFdlIHdhbnQgdG8gZ2V0IHJpZCBvZiBvd25lciBhbmQgcmVwbGFjZSBzdHJpbmcgYHJlZmBzIHdpdGggYXJyb3dcbiAqIGZ1bmN0aW9ucywgYW5kIGFzIGxvbmcgYXMgYHRoaXNgIGFuZCBvd25lciBhcmUgdGhlIHNhbWUsIHRoZXJlIHdpbGwgYmUgbm9cbiAqIGNoYW5nZSBpbiBiZWhhdmlvci5cbiAqIEBwYXJhbSB7Kn0gc291cmNlIEFuIGFubm90YXRpb24gb2JqZWN0IChhZGRlZCBieSBhIHRyYW5zcGlsZXIgb3Igb3RoZXJ3aXNlKVxuICogaW5kaWNhdGluZyBmaWxlbmFtZSwgbGluZSBudW1iZXIsIGFuZC9vciBvdGhlciBpbmZvcm1hdGlvbi5cbiAqIEBwYXJhbSB7Kn0gb3duZXJcbiAqIEBwYXJhbSB7Kn0gcHJvcHNcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcykge1xuICB2YXIgZWxlbWVudCA9IHtcbiAgICAvLyBUaGlzIHRhZyBhbGxvd3MgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgLy8gUmVjb3JkIHRoZSBjb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoaXMgZWxlbWVudC5cbiAgICBfb3duZXI6IG93bmVyXG4gIH07XG5cbiAge1xuICAgIC8vIFRoZSB2YWxpZGF0aW9uIGZsYWcgaXMgY3VycmVudGx5IG11dGF0aXZlLiBXZSBwdXQgaXQgb25cbiAgICAvLyBhbiBleHRlcm5hbCBiYWNraW5nIHN0b3JlIHNvIHRoYXQgd2UgY2FuIGZyZWV6ZSB0aGUgd2hvbGUgb2JqZWN0LlxuICAgIC8vIFRoaXMgY2FuIGJlIHJlcGxhY2VkIHdpdGggYSBXZWFrTWFwIG9uY2UgdGhleSBhcmUgaW1wbGVtZW50ZWQgaW5cbiAgICAvLyBjb21tb25seSB1c2VkIGRldmVsb3BtZW50IGVudmlyb25tZW50cy5cbiAgICBlbGVtZW50Ll9zdG9yZSA9IHt9O1xuXG4gICAgLy8gVG8gbWFrZSBjb21wYXJpbmcgUmVhY3RFbGVtZW50cyBlYXNpZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMsIHdlIG1ha2VcbiAgICAvLyB0aGUgdmFsaWRhdGlvbiBmbGFnIG5vbi1lbnVtZXJhYmxlICh3aGVyZSBwb3NzaWJsZSwgd2hpY2ggc2hvdWxkXG4gICAgLy8gaW5jbHVkZSBldmVyeSBlbnZpcm9ubWVudCB3ZSBydW4gdGVzdHMgaW4pLCBzbyB0aGUgdGVzdCBmcmFtZXdvcmtcbiAgICAvLyBpZ25vcmVzIGl0LlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50Ll9zdG9yZSwgJ3ZhbGlkYXRlZCcsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfSk7XG4gICAgLy8gc2VsZiBhbmQgc291cmNlIGFyZSBERVYgb25seSBwcm9wZXJ0aWVzLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NlbGYnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogc2VsZlxuICAgIH0pO1xuICAgIC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgLy8gZXF1YWwgZm9yIHRlc3RpbmcgcHVycG9zZXMgYW5kIHRoZXJlZm9yZSB3ZSBoaWRlIGl0IGZyb20gZW51bWVyYXRpb24uXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc291cmNlJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHNvdXJjZVxuICAgIH0pO1xuICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IG9mIHRoZSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjcmVhdGVlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWUgPSB2b2lkIDA7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIgcHJvcHMgPSB7fTtcblxuICB2YXIga2V5ID0gbnVsbDtcbiAgdmFyIHJlZiA9IG51bGw7XG4gIHZhciBzZWxmID0gbnVsbDtcbiAgdmFyIHNvdXJjZSA9IG51bGw7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgc2VsZiA9IGNvbmZpZy5fX3NlbGYgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zZWxmO1xuICAgIHNvdXJjZSA9IGNvbmZpZy5fX3NvdXJjZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NvdXJjZTtcbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBhcmUgYWRkZWQgdG8gYSBuZXcgcHJvcHMgb2JqZWN0XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eSQxLmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHtcbiAgICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICAgIE9iamVjdC5mcmVlemUoY2hpbGRBcnJheSk7XG4gICAgICB9XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICBpZiAodHlwZSAmJiB0eXBlLmRlZmF1bHRQcm9wcykge1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcbiAgICBmb3IgKHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHtcbiAgICBpZiAoa2V5IHx8IHJlZikge1xuICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCAnVW5rbm93bicgOiB0eXBlO1xuICAgICAgaWYgKGtleSkge1xuICAgICAgICBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKHJlZikge1xuICAgICAgICBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYSBmdW5jdGlvbiB0aGF0IHByb2R1Y2VzIFJlYWN0RWxlbWVudHMgb2YgYSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjcmVhdGVmYWN0b3J5XG4gKi9cblxuXG5mdW5jdGlvbiBjbG9uZUFuZFJlcGxhY2VLZXkob2xkRWxlbWVudCwgbmV3S2V5KSB7XG4gIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50KG9sZEVsZW1lbnQudHlwZSwgbmV3S2V5LCBvbGRFbGVtZW50LnJlZiwgb2xkRWxlbWVudC5fc2VsZiwgb2xkRWxlbWVudC5fc291cmNlLCBvbGRFbGVtZW50Ll9vd25lciwgb2xkRWxlbWVudC5wcm9wcyk7XG5cbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogQ2xvbmUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgdXNpbmcgZWxlbWVudCBhcyB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2Nsb25lZWxlbWVudFxuICovXG5mdW5jdGlvbiBjbG9uZUVsZW1lbnQoZWxlbWVudCwgY29uZmlnLCBjaGlsZHJlbikge1xuICAhIShlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHVuZGVmaW5lZCkgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdC5jbG9uZUVsZW1lbnQoLi4uKTogVGhlIGFyZ3VtZW50IG11c3QgYmUgYSBSZWFjdCBlbGVtZW50LCBidXQgeW91IHBhc3NlZCAlcy4nLCBlbGVtZW50KSA6IHZvaWQgMDtcblxuICB2YXIgcHJvcE5hbWUgPSB2b2lkIDA7XG5cbiAgLy8gT3JpZ2luYWwgcHJvcHMgYXJlIGNvcGllZFxuICB2YXIgcHJvcHMgPSBvYmplY3RBc3NpZ24oe30sIGVsZW1lbnQucHJvcHMpO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIGtleSA9IGVsZW1lbnQua2V5O1xuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gIC8vIFNlbGYgaXMgcHJlc2VydmVkIHNpbmNlIHRoZSBvd25lciBpcyBwcmVzZXJ2ZWQuXG4gIHZhciBzZWxmID0gZWxlbWVudC5fc2VsZjtcbiAgLy8gU291cmNlIGlzIHByZXNlcnZlZCBzaW5jZSBjbG9uZUVsZW1lbnQgaXMgdW5saWtlbHkgdG8gYmUgdGFyZ2V0ZWQgYnkgYVxuICAvLyB0cmFuc3BpbGVyLCBhbmQgdGhlIG9yaWdpbmFsIHNvdXJjZSBpcyBwcm9iYWJseSBhIGJldHRlciBpbmRpY2F0b3Igb2YgdGhlXG4gIC8vIHRydWUgb3duZXIuXG4gIHZhciBzb3VyY2UgPSBlbGVtZW50Ll9zb3VyY2U7XG5cbiAgLy8gT3duZXIgd2lsbCBiZSBwcmVzZXJ2ZWQsIHVubGVzcyByZWYgaXMgb3ZlcnJpZGRlblxuICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgLy8gU2lsZW50bHkgc3RlYWwgdGhlIHJlZiBmcm9tIHRoZSBwYXJlbnQuXG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgICAgb3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgIH1cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIG92ZXJyaWRlIGV4aXN0aW5nIHByb3BzXG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHZvaWQgMDtcbiAgICBpZiAoZWxlbWVudC50eXBlICYmIGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICAgIGRlZmF1bHRQcm9wcyA9IGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgfVxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkkMS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgaWYgKGNvbmZpZ1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBkZWZhdWx0UHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIHJldHVybiBSZWFjdEVsZW1lbnQoZWxlbWVudC50eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFZlcmlmaWVzIHRoZSBvYmplY3QgaXMgYSBSZWFjdEVsZW1lbnQuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2lzdmFsaWRlbGVtZW50XG4gKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBgb2JqZWN0YCBpcyBhIFJlYWN0RWxlbWVudC5cbiAqIEBmaW5hbFxuICovXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbn1cblxudmFyIFNFUEFSQVRPUiA9ICcuJztcbnZhciBTVUJTRVBBUkFUT1IgPSAnOic7XG5cbi8qKlxuICogRXNjYXBlIGFuZCB3cmFwIGtleSBzbyBpdCBpcyBzYWZlIHRvIHVzZSBhcyBhIHJlYWN0aWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGJlIGVzY2FwZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBlc2NhcGVkIGtleS5cbiAqL1xuZnVuY3Rpb24gZXNjYXBlKGtleSkge1xuICB2YXIgZXNjYXBlUmVnZXggPSAvWz06XS9nO1xuICB2YXIgZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPSc6ICc9MCcsXG4gICAgJzonOiAnPTInXG4gIH07XG4gIHZhciBlc2NhcGVkU3RyaW5nID0gKCcnICsga2V5KS5yZXBsYWNlKGVzY2FwZVJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gZXNjYXBlckxvb2t1cFttYXRjaF07XG4gIH0pO1xuXG4gIHJldHVybiAnJCcgKyBlc2NhcGVkU3RyaW5nO1xufVxuXG4vKipcbiAqIFRPRE86IFRlc3QgdGhhdCBhIHNpbmdsZSBjaGlsZCBhbmQgYW4gYXJyYXkgd2l0aCBvbmUgaXRlbSBoYXZlIHRoZSBzYW1lIGtleVxuICogcGF0dGVybi5cbiAqL1xuXG52YXIgZGlkV2FybkFib3V0TWFwcyA9IGZhbHNlO1xuXG52YXIgdXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXggPSAvXFwvKy9nO1xuZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcbiAgcmV0dXJuICgnJyArIHRleHQpLnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsICckJi8nKTtcbn1cblxudmFyIFBPT0xfU0laRSA9IDEwO1xudmFyIHRyYXZlcnNlQ29udGV4dFBvb2wgPSBbXTtcbmZ1bmN0aW9uIGdldFBvb2xlZFRyYXZlcnNlQ29udGV4dChtYXBSZXN1bHQsIGtleVByZWZpeCwgbWFwRnVuY3Rpb24sIG1hcENvbnRleHQpIHtcbiAgaWYgKHRyYXZlcnNlQ29udGV4dFBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IHRyYXZlcnNlQ29udGV4dFBvb2wucG9wKCk7XG4gICAgdHJhdmVyc2VDb250ZXh0LnJlc3VsdCA9IG1hcFJlc3VsdDtcbiAgICB0cmF2ZXJzZUNvbnRleHQua2V5UHJlZml4ID0ga2V5UHJlZml4O1xuICAgIHRyYXZlcnNlQ29udGV4dC5mdW5jID0gbWFwRnVuY3Rpb247XG4gICAgdHJhdmVyc2VDb250ZXh0LmNvbnRleHQgPSBtYXBDb250ZXh0O1xuICAgIHRyYXZlcnNlQ29udGV4dC5jb3VudCA9IDA7XG4gICAgcmV0dXJuIHRyYXZlcnNlQ29udGV4dDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdWx0OiBtYXBSZXN1bHQsXG4gICAgICBrZXlQcmVmaXg6IGtleVByZWZpeCxcbiAgICAgIGZ1bmM6IG1hcEZ1bmN0aW9uLFxuICAgICAgY29udGV4dDogbWFwQ29udGV4dCxcbiAgICAgIGNvdW50OiAwXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWxlYXNlVHJhdmVyc2VDb250ZXh0KHRyYXZlcnNlQ29udGV4dCkge1xuICB0cmF2ZXJzZUNvbnRleHQucmVzdWx0ID0gbnVsbDtcbiAgdHJhdmVyc2VDb250ZXh0LmtleVByZWZpeCA9IG51bGw7XG4gIHRyYXZlcnNlQ29udGV4dC5mdW5jID0gbnVsbDtcbiAgdHJhdmVyc2VDb250ZXh0LmNvbnRleHQgPSBudWxsO1xuICB0cmF2ZXJzZUNvbnRleHQuY291bnQgPSAwO1xuICBpZiAodHJhdmVyc2VDb250ZXh0UG9vbC5sZW5ndGggPCBQT09MX1NJWkUpIHtcbiAgICB0cmF2ZXJzZUNvbnRleHRQb29sLnB1c2godHJhdmVyc2VDb250ZXh0KTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lU29GYXIgTmFtZSBvZiB0aGUga2V5IHBhdGggc28gZmFyLlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGludm9rZSB3aXRoIGVhY2ggY2hpbGQgZm91bmQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgVXNlZCB0byBwYXNzIGluZm9ybWF0aW9uIHRocm91Z2hvdXQgdGhlIHRyYXZlcnNhbFxuICogcHJvY2Vzcy5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgbmFtZVNvRmFyLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGNoaWxkcmVuO1xuXG4gIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAvLyBBbGwgb2YgdGhlIGFib3ZlIGFyZSBwZXJjZWl2ZWQgYXMgbnVsbC5cbiAgICBjaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICB2YXIgaW52b2tlQ2FsbGJhY2sgPSBmYWxzZTtcblxuICBpZiAoY2hpbGRyZW4gPT09IG51bGwpIHtcbiAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgaW52b2tlQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHN3aXRjaCAoY2hpbGRyZW4uJCR0eXBlb2YpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0VMRU1FTlRfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgICAgICAgaW52b2tlQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGludm9rZUNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sodHJhdmVyc2VDb250ZXh0LCBjaGlsZHJlbixcbiAgICAvLyBJZiBpdCdzIHRoZSBvbmx5IGNoaWxkLCB0cmVhdCB0aGUgbmFtZSBhcyBpZiBpdCB3YXMgd3JhcHBlZCBpbiBhbiBhcnJheVxuICAgIC8vIHNvIHRoYXQgaXQncyBjb25zaXN0ZW50IGlmIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gZ3Jvd3MuXG4gICAgbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiArIGdldENvbXBvbmVudEtleShjaGlsZHJlbiwgMCkgOiBuYW1lU29GYXIpO1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgdmFyIGNoaWxkID0gdm9pZCAwO1xuICB2YXIgbmV4dE5hbWUgPSB2b2lkIDA7XG4gIHZhciBzdWJ0cmVlQ291bnQgPSAwOyAvLyBDb3VudCBvZiBjaGlsZHJlbiBmb3VuZCBpbiB0aGUgY3VycmVudCBzdWJ0cmVlLlxuICB2YXIgbmV4dE5hbWVQcmVmaXggPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SIDogbmFtZVNvRmFyICsgU1VCU0VQQVJBVE9SO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpKTtcbiAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4oY2hpbGRyZW4pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAge1xuICAgICAgICAvLyBXYXJuIGFib3V0IHVzaW5nIE1hcHMgYXMgY2hpbGRyZW5cbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4gPT09IGNoaWxkcmVuLmVudHJpZXMpIHtcbiAgICAgICAgICAhZGlkV2FybkFib3V0TWFwcyA/IHdhcm5pbmckMShmYWxzZSwgJ1VzaW5nIE1hcHMgYXMgY2hpbGRyZW4gaXMgdW5zdXBwb3J0ZWQgYW5kIHdpbGwgbGlrZWx5IHlpZWxkICcgKyAndW5leHBlY3RlZCByZXN1bHRzLiBDb252ZXJ0IGl0IHRvIGEgc2VxdWVuY2UvaXRlcmFibGUgb2Yga2V5ZWQgJyArICdSZWFjdEVsZW1lbnRzIGluc3RlYWQuJykgOiB2b2lkIDA7XG4gICAgICAgICAgZGlkV2FybkFib3V0TWFwcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKGNoaWxkcmVuKTtcbiAgICAgIHZhciBzdGVwID0gdm9pZCAwO1xuICAgICAgdmFyIGlpID0gMDtcbiAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpaSsrKTtcbiAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGFkZGVuZHVtID0gJyc7XG4gICAgICB7XG4gICAgICAgIGFkZGVuZHVtID0gJyBJZiB5b3UgbWVhbnQgdG8gcmVuZGVyIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiwgdXNlIGFuIGFycmF5ICcgKyAnaW5zdGVhZC4nICsgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCk7XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGRyZW5TdHJpbmcgPSAnJyArIGNoaWxkcmVuO1xuICAgICAgaW52YXJpYW50KGZhbHNlLCAnT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgUmVhY3QgY2hpbGQgKGZvdW5kOiAlcykuJXMnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VidHJlZUNvdW50O1xufVxuXG4vKipcbiAqIFRyYXZlcnNlcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAsIGJ1dFxuICogbWlnaHQgYWxzbyBiZSBzcGVjaWZpZWQgdGhyb3VnaCBhdHRyaWJ1dGVzOlxuICpcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbiwgLi4uKWBcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5sZWZ0UGFuZWxDaGlsZHJlbiwgLi4uKWBcbiAqXG4gKiBUaGUgYHRyYXZlcnNlQ29udGV4dGAgaXMgYW4gb3B0aW9uYWwgYXJndW1lbnQgdGhhdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGVcbiAqIGVudGlyZSB0cmF2ZXJzYWwuIEl0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFjY3VtdWxhdGlvbnMgb3IgYW55dGhpbmcgZWxzZSB0aGF0XG4gKiB0aGUgY2FsbGJhY2sgbWlnaHQgZmluZCByZWxldmFudC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIG9iamVjdC5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBUbyBpbnZva2UgdXBvbiB0cmF2ZXJzaW5nIGVhY2ggY2hpbGQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBmb3IgdHJhdmVyc2FsLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgJycsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEga2V5IHN0cmluZyB0aGF0IGlkZW50aWZpZXMgYSBjb21wb25lbnQgd2l0aGluIGEgc2V0LlxuICpcbiAqIEBwYXJhbSB7Kn0gY29tcG9uZW50IEEgY29tcG9uZW50IHRoYXQgY291bGQgY29udGFpbiBhIG1hbnVhbCBrZXkuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggdGhhdCBpcyB1c2VkIGlmIGEgbWFudWFsIGtleSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudEtleShjb21wb25lbnQsIGluZGV4KSB7XG4gIC8vIERvIHNvbWUgdHlwZWNoZWNraW5nIGhlcmUgc2luY2Ugd2UgY2FsbCB0aGlzIGJsaW5kbHkuIFdlIHdhbnQgdG8gZW5zdXJlXG4gIC8vIHRoYXQgd2UgZG9uJ3QgYmxvY2sgcG90ZW50aWFsIGZ1dHVyZSBFUyBBUElzLlxuICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ29iamVjdCcgJiYgY29tcG9uZW50ICE9PSBudWxsICYmIGNvbXBvbmVudC5rZXkgIT0gbnVsbCkge1xuICAgIC8vIEV4cGxpY2l0IGtleVxuICAgIHJldHVybiBlc2NhcGUoY29tcG9uZW50LmtleSk7XG4gIH1cbiAgLy8gSW1wbGljaXQga2V5IGRldGVybWluZWQgYnkgdGhlIGluZGV4IGluIHRoZSBzZXRcbiAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbmZvcmVhY2hcbiAqXG4gKiBUaGUgcHJvdmlkZWQgZm9yRWFjaEZ1bmMoY2hpbGQsIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZm9yRWFjaEZ1bmNcbiAqIEBwYXJhbSB7Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCBmb3IgZm9yRWFjaENvbnRleHQuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2hDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBnZXRQb29sZWRUcmF2ZXJzZUNvbnRleHQobnVsbCwgbnVsbCwgZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkLCB0cmF2ZXJzZUNvbnRleHQpO1xuICByZWxlYXNlVHJhdmVyc2VDb250ZXh0KHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQoYm9va0tlZXBpbmcsIGNoaWxkLCBjaGlsZEtleSkge1xuICB2YXIgcmVzdWx0ID0gYm9va0tlZXBpbmcucmVzdWx0LFxuICAgICAga2V5UHJlZml4ID0gYm9va0tlZXBpbmcua2V5UHJlZml4LFxuICAgICAgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuXG4gIHZhciBtYXBwZWRDaGlsZCA9IGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG4gIGlmIChBcnJheS5pc0FycmF5KG1hcHBlZENoaWxkKSkge1xuICAgIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwobWFwcGVkQ2hpbGQsIHJlc3VsdCwgY2hpbGRLZXksIGZ1bmN0aW9uIChjKSB7XG4gICAgICByZXR1cm4gYztcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChtYXBwZWRDaGlsZCAhPSBudWxsKSB7XG4gICAgaWYgKGlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBjbG9uZUFuZFJlcGxhY2VLZXkobWFwcGVkQ2hpbGQsXG4gICAgICAvLyBLZWVwIGJvdGggdGhlIChtYXBwZWQpIGFuZCBvbGQga2V5cyBpZiB0aGV5IGRpZmZlciwganVzdCBhc1xuICAgICAgLy8gdHJhdmVyc2VBbGxDaGlsZHJlbiB1c2VkIHRvIGRvIGZvciBvYmplY3RzIGFzIGNoaWxkcmVuXG4gICAgICBrZXlQcmVmaXggKyAobWFwcGVkQ2hpbGQua2V5ICYmICghY2hpbGQgfHwgY2hpbGQua2V5ICE9PSBtYXBwZWRDaGlsZC5rZXkpID8gZXNjYXBlVXNlclByb3ZpZGVkS2V5KG1hcHBlZENoaWxkLmtleSkgKyAnLycgOiAnJykgKyBjaGlsZEtleSk7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKG1hcHBlZENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCBhcnJheSwgcHJlZml4LCBmdW5jLCBjb250ZXh0KSB7XG4gIHZhciBlc2NhcGVkUHJlZml4ID0gJyc7XG4gIGlmIChwcmVmaXggIT0gbnVsbCkge1xuICAgIGVzY2FwZWRQcmVmaXggPSBlc2NhcGVVc2VyUHJvdmlkZWRLZXkocHJlZml4KSArICcvJztcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gZ2V0UG9vbGVkVHJhdmVyc2VDb250ZXh0KGFycmF5LCBlc2NhcGVkUHJlZml4LCBmdW5jLCBjb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgcmVsZWFzZVRyYXZlcnNlQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIE1hcHMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbm1hcFxuICpcbiAqIFRoZSBwcm92aWRlZCBtYXBGdW5jdGlvbihjaGlsZCwga2V5LCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZ1bmMgVGhlIG1hcCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBDb250ZXh0IGZvciBtYXBGdW5jdGlvbi5cbiAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jLCBjb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBmdW5jLCBjb250ZXh0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb3VudCB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXNcbiAqIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdGNoaWxkcmVuY291bnRcbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbikge1xuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LCBudWxsKTtcbn1cblxuLyoqXG4gKiBGbGF0dGVuIGEgY2hpbGRyZW4gb2JqZWN0ICh0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmApIGFuZFxuICogcmV0dXJuIGFuIGFycmF5IHdpdGggYXBwcm9wcmlhdGVseSByZS1rZXllZCBjaGlsZHJlbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW50b2FycmF5XG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgIHJldHVybiBjaGlsZDtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgY2hpbGQgaW4gYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuIGFuZCB2ZXJpZmllcyB0aGF0IHRoZXJlXG4gKiBpcyBvbmx5IG9uZSBjaGlsZCBpbiB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5vbmx5XG4gKlxuICogVGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgYSBzaW5nbGUgY2hpbGQgZ2V0c1xuICogcGFzc2VkIHdpdGhvdXQgYSB3cmFwcGVyLCBidXQgdGhlIHB1cnBvc2Ugb2YgdGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdG9cbiAqIGFic3RyYWN0IGF3YXkgdGhlIHBhcnRpY3VsYXIgc3RydWN0dXJlIG9mIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gY2hpbGRyZW4gQ2hpbGQgY29sbGVjdGlvbiBzdHJ1Y3R1cmUuXG4gKiBAcmV0dXJuIHtSZWFjdEVsZW1lbnR9IFRoZSBmaXJzdCBhbmQgb25seSBgUmVhY3RFbGVtZW50YCBjb250YWluZWQgaW4gdGhlXG4gKiBzdHJ1Y3R1cmUuXG4gKi9cbmZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICAhaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3QuQ2hpbGRyZW4ub25seSBleHBlY3RlZCB0byByZWNlaXZlIGEgc2luZ2xlIFJlYWN0IGVsZW1lbnQgY2hpbGQuJykgOiB2b2lkIDA7XG4gIHJldHVybiBjaGlsZHJlbjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udGV4dChkZWZhdWx0VmFsdWUsIGNhbGN1bGF0ZUNoYW5nZWRCaXRzKSB7XG4gIGlmIChjYWxjdWxhdGVDaGFuZ2VkQml0cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2FsY3VsYXRlQ2hhbmdlZEJpdHMgPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHtcbiAgICAgICEoY2FsY3VsYXRlQ2hhbmdlZEJpdHMgPT09IG51bGwgfHwgdHlwZW9mIGNhbGN1bGF0ZUNoYW5nZWRCaXRzID09PSAnZnVuY3Rpb24nKSA/IHdhcm5pbmdXaXRob3V0U3RhY2skMShmYWxzZSwgJ2NyZWF0ZUNvbnRleHQ6IEV4cGVjdGVkIHRoZSBvcHRpb25hbCBzZWNvbmQgYXJndW1lbnQgdG8gYmUgYSAnICsgJ2Z1bmN0aW9uLiBJbnN0ZWFkIHJlY2VpdmVkOiAlcycsIGNhbGN1bGF0ZUNoYW5nZWRCaXRzKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICB2YXIgY29udGV4dCA9IHtcbiAgICAkJHR5cGVvZjogUkVBQ1RfQ09OVEVYVF9UWVBFLFxuICAgIF9jYWxjdWxhdGVDaGFuZ2VkQml0czogY2FsY3VsYXRlQ2hhbmdlZEJpdHMsXG4gICAgLy8gQXMgYSB3b3JrYXJvdW5kIHRvIHN1cHBvcnQgbXVsdGlwbGUgY29uY3VycmVudCByZW5kZXJlcnMsIHdlIGNhdGVnb3JpemVcbiAgICAvLyBzb21lIHJlbmRlcmVycyBhcyBwcmltYXJ5IGFuZCBvdGhlcnMgYXMgc2Vjb25kYXJ5LiBXZSBvbmx5IGV4cGVjdFxuICAgIC8vIHRoZXJlIHRvIGJlIHR3byBjb25jdXJyZW50IHJlbmRlcmVycyBhdCBtb3N0OiBSZWFjdCBOYXRpdmUgKHByaW1hcnkpIGFuZFxuICAgIC8vIEZhYnJpYyAoc2Vjb25kYXJ5KTsgUmVhY3QgRE9NIChwcmltYXJ5KSBhbmQgUmVhY3QgQVJUIChzZWNvbmRhcnkpLlxuICAgIC8vIFNlY29uZGFyeSByZW5kZXJlcnMgc3RvcmUgdGhlaXIgY29udGV4dCB2YWx1ZXMgb24gc2VwYXJhdGUgZmllbGRzLlxuICAgIF9jdXJyZW50VmFsdWU6IGRlZmF1bHRWYWx1ZSxcbiAgICBfY3VycmVudFZhbHVlMjogZGVmYXVsdFZhbHVlLFxuICAgIC8vIFVzZWQgdG8gdHJhY2sgaG93IG1hbnkgY29uY3VycmVudCByZW5kZXJlcnMgdGhpcyBjb250ZXh0IGN1cnJlbnRseVxuICAgIC8vIHN1cHBvcnRzIHdpdGhpbiBpbiBhIHNpbmdsZSByZW5kZXJlci4gU3VjaCBhcyBwYXJhbGxlbCBzZXJ2ZXIgcmVuZGVyaW5nLlxuICAgIF90aHJlYWRDb3VudDogMCxcbiAgICAvLyBUaGVzZSBhcmUgY2lyY3VsYXJcbiAgICBQcm92aWRlcjogbnVsbCxcbiAgICBDb25zdW1lcjogbnVsbFxuICB9O1xuXG4gIGNvbnRleHQuUHJvdmlkZXIgPSB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX1BST1ZJREVSX1RZUEUsXG4gICAgX2NvbnRleHQ6IGNvbnRleHRcbiAgfTtcblxuICB2YXIgaGFzV2FybmVkQWJvdXRVc2luZ05lc3RlZENvbnRleHRDb25zdW1lcnMgPSBmYWxzZTtcbiAgdmFyIGhhc1dhcm5lZEFib3V0VXNpbmdDb25zdW1lclByb3ZpZGVyID0gZmFsc2U7XG5cbiAge1xuICAgIC8vIEEgc2VwYXJhdGUgb2JqZWN0LCBidXQgcHJveGllcyBiYWNrIHRvIHRoZSBvcmlnaW5hbCBjb250ZXh0IG9iamVjdCBmb3JcbiAgICAvLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS4gSXQgaGFzIGEgZGlmZmVyZW50ICQkdHlwZW9mLCBzbyB3ZSBjYW4gcHJvcGVybHlcbiAgICAvLyB3YXJuIGZvciB0aGUgaW5jb3JyZWN0IHVzYWdlIG9mIENvbnRleHQgYXMgYSBDb25zdW1lci5cbiAgICB2YXIgQ29uc3VtZXIgPSB7XG4gICAgICAkJHR5cGVvZjogUkVBQ1RfQ09OVEVYVF9UWVBFLFxuICAgICAgX2NvbnRleHQ6IGNvbnRleHQsXG4gICAgICBfY2FsY3VsYXRlQ2hhbmdlZEJpdHM6IGNvbnRleHQuX2NhbGN1bGF0ZUNoYW5nZWRCaXRzXG4gICAgfTtcbiAgICAvLyAkRmxvd0ZpeE1lOiBGbG93IGNvbXBsYWlucyBhYm91dCBub3Qgc2V0dGluZyBhIHZhbHVlLCB3aGljaCBpcyBpbnRlbnRpb25hbCBoZXJlXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQ29uc3VtZXIsIHtcbiAgICAgIFByb3ZpZGVyOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICghaGFzV2FybmVkQWJvdXRVc2luZ0NvbnN1bWVyUHJvdmlkZXIpIHtcbiAgICAgICAgICAgIGhhc1dhcm5lZEFib3V0VXNpbmdDb25zdW1lclByb3ZpZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHdhcm5pbmckMShmYWxzZSwgJ1JlbmRlcmluZyA8Q29udGV4dC5Db25zdW1lci5Qcm92aWRlcj4gaXMgbm90IHN1cHBvcnRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluICcgKyAnYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gRGlkIHlvdSBtZWFuIHRvIHJlbmRlciA8Q29udGV4dC5Qcm92aWRlcj4gaW5zdGVhZD8nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQuUHJvdmlkZXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKF9Qcm92aWRlcikge1xuICAgICAgICAgIGNvbnRleHQuUHJvdmlkZXIgPSBfUHJvdmlkZXI7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBfY3VycmVudFZhbHVlOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0Ll9jdXJyZW50VmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKF9jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICBjb250ZXh0Ll9jdXJyZW50VmFsdWUgPSBfY3VycmVudFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgX2N1cnJlbnRWYWx1ZTI6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQuX2N1cnJlbnRWYWx1ZTI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKF9jdXJyZW50VmFsdWUyKSB7XG4gICAgICAgICAgY29udGV4dC5fY3VycmVudFZhbHVlMiA9IF9jdXJyZW50VmFsdWUyO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgX3RocmVhZENvdW50OiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0Ll90aHJlYWRDb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoX3RocmVhZENvdW50KSB7XG4gICAgICAgICAgY29udGV4dC5fdGhyZWFkQ291bnQgPSBfdGhyZWFkQ291bnQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBDb25zdW1lcjoge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoIWhhc1dhcm5lZEFib3V0VXNpbmdOZXN0ZWRDb250ZXh0Q29uc3VtZXJzKSB7XG4gICAgICAgICAgICBoYXNXYXJuZWRBYm91dFVzaW5nTmVzdGVkQ29udGV4dENvbnN1bWVycyA9IHRydWU7XG4gICAgICAgICAgICB3YXJuaW5nJDEoZmFsc2UsICdSZW5kZXJpbmcgPENvbnRleHQuQ29uc3VtZXIuQ29uc3VtZXI+IGlzIG5vdCBzdXBwb3J0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAnICsgJ2EgZnV0dXJlIG1ham9yIHJlbGVhc2UuIERpZCB5b3UgbWVhbiB0byByZW5kZXIgPENvbnRleHQuQ29uc3VtZXI+IGluc3RlYWQ/Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjb250ZXh0LkNvbnN1bWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gJEZsb3dGaXhNZTogRmxvdyBjb21wbGFpbnMgYWJvdXQgbWlzc2luZyBwcm9wZXJ0aWVzIGJlY2F1c2UgaXQgZG9lc24ndCB1bmRlcnN0YW5kIGRlZmluZVByb3BlcnR5XG4gICAgY29udGV4dC5Db25zdW1lciA9IENvbnN1bWVyO1xuICB9XG5cbiAge1xuICAgIGNvbnRleHQuX2N1cnJlbnRSZW5kZXJlciA9IG51bGw7XG4gICAgY29udGV4dC5fY3VycmVudFJlbmRlcmVyMiA9IG51bGw7XG4gIH1cblxuICByZXR1cm4gY29udGV4dDtcbn1cblxuZnVuY3Rpb24gbGF6eShjdG9yKSB7XG4gIHJldHVybiB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0xBWllfVFlQRSxcbiAgICBfY3RvcjogY3RvcixcbiAgICAvLyBSZWFjdCB1c2VzIHRoZXNlIGZpZWxkcyB0byBzdG9yZSB0aGUgcmVzdWx0LlxuICAgIF9zdGF0dXM6IC0xLFxuICAgIF9yZXN1bHQ6IG51bGxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZm9yd2FyZFJlZihyZW5kZXIpIHtcbiAge1xuICAgIGlmIChyZW5kZXIgIT0gbnVsbCAmJiByZW5kZXIuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSkge1xuICAgICAgd2FybmluZ1dpdGhvdXRTdGFjayQxKGZhbHNlLCAnZm9yd2FyZFJlZiByZXF1aXJlcyBhIHJlbmRlciBmdW5jdGlvbiBidXQgcmVjZWl2ZWQgYSBgbWVtb2AgJyArICdjb21wb25lbnQuIEluc3RlYWQgb2YgZm9yd2FyZFJlZihtZW1vKC4uLikpLCB1c2UgJyArICdtZW1vKGZvcndhcmRSZWYoLi4uKSkuJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVuZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICdmb3J3YXJkUmVmIHJlcXVpcmVzIGEgcmVuZGVyIGZ1bmN0aW9uIGJ1dCB3YXMgZ2l2ZW4gJXMuJywgcmVuZGVyID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHJlbmRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICEoXG4gICAgICAvLyBEbyBub3Qgd2FybiBmb3IgMCBhcmd1bWVudHMgYmVjYXVzZSBpdCBjb3VsZCBiZSBkdWUgdG8gdXNhZ2Ugb2YgdGhlICdhcmd1bWVudHMnIG9iamVjdFxuICAgICAgcmVuZGVyLmxlbmd0aCA9PT0gMCB8fCByZW5kZXIubGVuZ3RoID09PSAyKSA/IHdhcm5pbmdXaXRob3V0U3RhY2skMShmYWxzZSwgJ2ZvcndhcmRSZWYgcmVuZGVyIGZ1bmN0aW9ucyBhY2NlcHQgZXhhY3RseSB0d28gcGFyYW1ldGVyczogcHJvcHMgYW5kIHJlZi4gJXMnLCByZW5kZXIubGVuZ3RoID09PSAxID8gJ0RpZCB5b3UgZm9yZ2V0IHRvIHVzZSB0aGUgcmVmIHBhcmFtZXRlcj8nIDogJ0FueSBhZGRpdGlvbmFsIHBhcmFtZXRlciB3aWxsIGJlIHVuZGVmaW5lZC4nKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICBpZiAocmVuZGVyICE9IG51bGwpIHtcbiAgICAgICEocmVuZGVyLmRlZmF1bHRQcm9wcyA9PSBudWxsICYmIHJlbmRlci5wcm9wVHlwZXMgPT0gbnVsbCkgPyB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICdmb3J3YXJkUmVmIHJlbmRlciBmdW5jdGlvbnMgZG8gbm90IHN1cHBvcnQgcHJvcFR5cGVzIG9yIGRlZmF1bHRQcm9wcy4gJyArICdEaWQgeW91IGFjY2lkZW50YWxseSBwYXNzIGEgUmVhY3QgY29tcG9uZW50PycpIDogdm9pZCAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUsXG4gICAgcmVuZGVyOiByZW5kZXJcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAvLyBOb3RlOiBpdHMgdHlwZW9mIG1pZ2h0IGJlIG90aGVyIHRoYW4gJ3N5bWJvbCcgb3IgJ251bWJlcicgaWYgaXQncyBhIHBvbHlmaWxsLlxuICB0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9UWVBFIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUpO1xufVxuXG5mdW5jdGlvbiBtZW1vKHR5cGUsIGNvbXBhcmUpIHtcbiAge1xuICAgIGlmICghaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpKSB7XG4gICAgICB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICdtZW1vOiBUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIGNvbXBvbmVudC4gSW5zdGVhZCAnICsgJ3JlY2VpdmVkOiAlcycsIHR5cGUgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgdHlwZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX01FTU9fVFlQRSxcbiAgICB0eXBlOiB0eXBlLFxuICAgIGNvbXBhcmU6IGNvbXBhcmUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb21wYXJlXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVEaXNwYXRjaGVyKCkge1xuICB2YXIgZGlzcGF0Y2hlciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnREaXNwYXRjaGVyO1xuICAhKGRpc3BhdGNoZXIgIT09IG51bGwpID8gaW52YXJpYW50KGZhbHNlLCAnSG9va3MgY2FuIG9ubHkgYmUgY2FsbGVkIGluc2lkZSB0aGUgYm9keSBvZiBhIGZ1bmN0aW9uIGNvbXBvbmVudC4nKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGRpc3BhdGNoZXI7XG59XG5cbmZ1bmN0aW9uIHVzZUNvbnRleHQoQ29udGV4dCwgb2JzZXJ2ZWRCaXRzKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAge1xuICAgIC8vIFRPRE86IGFkZCBhIG1vcmUgZ2VuZXJpYyB3YXJuaW5nIGZvciBpbnZhbGlkIHZhbHVlcy5cbiAgICBpZiAoQ29udGV4dC5fY29udGV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgcmVhbENvbnRleHQgPSBDb250ZXh0Ll9jb250ZXh0O1xuICAgICAgLy8gRG9uJ3QgZGVkdXBsaWNhdGUgYmVjYXVzZSB0aGlzIGxlZ2l0aW1hdGVseSBjYXVzZXMgYnVnc1xuICAgICAgLy8gYW5kIG5vYm9keSBzaG91bGQgYmUgdXNpbmcgdGhpcyBpbiBleGlzdGluZyBjb2RlLlxuICAgICAgaWYgKHJlYWxDb250ZXh0LkNvbnN1bWVyID09PSBDb250ZXh0KSB7XG4gICAgICAgIHdhcm5pbmckMShmYWxzZSwgJ0NhbGxpbmcgdXNlQ29udGV4dChDb250ZXh0LkNvbnN1bWVyKSBpcyBub3Qgc3VwcG9ydGVkLCBtYXkgY2F1c2UgYnVncywgYW5kIHdpbGwgYmUgJyArICdyZW1vdmVkIGluIGEgZnV0dXJlIG1ham9yIHJlbGVhc2UuIERpZCB5b3UgbWVhbiB0byBjYWxsIHVzZUNvbnRleHQoQ29udGV4dCkgaW5zdGVhZD8nKTtcbiAgICAgIH0gZWxzZSBpZiAocmVhbENvbnRleHQuUHJvdmlkZXIgPT09IENvbnRleHQpIHtcbiAgICAgICAgd2FybmluZyQxKGZhbHNlLCAnQ2FsbGluZyB1c2VDb250ZXh0KENvbnRleHQuUHJvdmlkZXIpIGlzIG5vdCBzdXBwb3J0ZWQuICcgKyAnRGlkIHlvdSBtZWFuIHRvIGNhbGwgdXNlQ29udGV4dChDb250ZXh0KSBpbnN0ZWFkPycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZGlzcGF0Y2hlci51c2VDb250ZXh0KENvbnRleHQsIG9ic2VydmVkQml0cyk7XG59XG5cbmZ1bmN0aW9uIHVzZVN0YXRlKGluaXRpYWxTdGF0ZSkge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZVN0YXRlKGluaXRpYWxTdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbFN0YXRlLCBpbml0aWFsQWN0aW9uKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlUmVkdWNlcihyZWR1Y2VyLCBpbml0aWFsU3RhdGUsIGluaXRpYWxBY3Rpb24pO1xufVxuXG5mdW5jdGlvbiB1c2VSZWYoaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlUmVmKGluaXRpYWxWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHVzZUVmZmVjdChjcmVhdGUsIGlucHV0cykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUVmZmVjdChjcmVhdGUsIGlucHV0cyk7XG59XG5cbmZ1bmN0aW9uIHVzZU11dGF0aW9uRWZmZWN0KGNyZWF0ZSwgaW5wdXRzKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlTXV0YXRpb25FZmZlY3QoY3JlYXRlLCBpbnB1dHMpO1xufVxuXG5mdW5jdGlvbiB1c2VMYXlvdXRFZmZlY3QoY3JlYXRlLCBpbnB1dHMpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICByZXR1cm4gZGlzcGF0Y2hlci51c2VMYXlvdXRFZmZlY3QoY3JlYXRlLCBpbnB1dHMpO1xufVxuXG5mdW5jdGlvbiB1c2VDYWxsYmFjayhjYWxsYmFjaywgaW5wdXRzKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlQ2FsbGJhY2soY2FsbGJhY2ssIGlucHV0cyk7XG59XG5cbmZ1bmN0aW9uIHVzZU1lbW8oY3JlYXRlLCBpbnB1dHMpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICByZXR1cm4gZGlzcGF0Y2hlci51c2VNZW1vKGNyZWF0ZSwgaW5wdXRzKTtcbn1cblxuZnVuY3Rpb24gdXNlSW1wZXJhdGl2ZU1ldGhvZHMocmVmLCBjcmVhdGUsIGlucHV0cykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUltcGVyYXRpdmVNZXRob2RzKHJlZiwgY3JlYXRlLCBpbnB1dHMpO1xufVxuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cblxuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQkMSA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldF8xID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQkMTtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5cblxudmFyIHByaW50V2FybmluZyQxID0gZnVuY3Rpb24oKSB7fTtcblxue1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSBSZWFjdFByb3BUeXBlc1NlY3JldF8xO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG5cbiAgcHJpbnRXYXJuaW5nJDEgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpZiAodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgZXJyID0gRXJyb3IoXG4gICAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogJyArIGxvY2F0aW9uICsgJyB0eXBlIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgJyArXG4gICAgICAgICAgICAgICdpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJyArIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSArICdgLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciAmJiAhKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nJDEoXG4gICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAnICtcbiAgICAgICAgICAgIGxvY2F0aW9uICsgJyBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJyArIHR5cGVvZiBlcnJvciArICcuICcgK1xuICAgICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArXG4gICAgICAgICAgICAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLidcbiAgICAgICAgICApO1xuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgIHByaW50V2FybmluZyQxKFxuICAgICAgICAgICAgJ0ZhaWxlZCAnICsgbG9jYXRpb24gKyAnIHR5cGU6ICcgKyBlcnJvci5tZXNzYWdlICsgKHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudmFyIGNoZWNrUHJvcFR5cGVzXzEgPSBjaGVja1Byb3BUeXBlcztcblxuLyoqXG4gKiBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgcHJvdmlkZXMgYSB3cmFwcGVyIGFyb3VuZCBhIGVsZW1lbnQgZmFjdG9yeVxuICogd2hpY2ggdmFsaWRhdGVzIHRoZSBwcm9wcyBwYXNzZWQgdG8gdGhlIGVsZW1lbnQuIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmVcbiAqIHVzZWQgb25seSBpbiBERVYgYW5kIGNvdWxkIGJlIHJlcGxhY2VkIGJ5IGEgc3RhdGljIHR5cGUgY2hlY2tlciBmb3IgbGFuZ3VhZ2VzXG4gKiB0aGF0IHN1cHBvcnQgaXQuXG4gKi9cblxudmFyIHByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duID0gdm9pZCAwO1xuXG57XG4gIHByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpIHtcbiAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC50eXBlKTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuICdcXG5cXG5DaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIGdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtKGVsZW1lbnRQcm9wcykge1xuICBpZiAoZWxlbWVudFByb3BzICE9PSBudWxsICYmIGVsZW1lbnRQcm9wcyAhPT0gdW5kZWZpbmVkICYmIGVsZW1lbnRQcm9wcy5fX3NvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHNvdXJjZSA9IGVsZW1lbnRQcm9wcy5fX3NvdXJjZTtcbiAgICB2YXIgZmlsZU5hbWUgPSBzb3VyY2UuZmlsZU5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpO1xuICAgIHZhciBsaW5lTnVtYmVyID0gc291cmNlLmxpbmVOdW1iZXI7XG4gICAgcmV0dXJuICdcXG5cXG5DaGVjayB5b3VyIGNvZGUgYXQgJyArIGZpbGVOYW1lICsgJzonICsgbGluZU51bWJlciArICcuJztcbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogV2FybiBpZiB0aGVyZSdzIG5vIGtleSBleHBsaWNpdGx5IHNldCBvbiBkeW5hbWljIGFycmF5cyBvZiBjaGlsZHJlbiBvclxuICogb2JqZWN0IGtleXMgYXJlIG5vdCB2YWxpZC4gVGhpcyBhbGxvd3MgdXMgdG8ga2VlcCB0cmFjayBvZiBjaGlsZHJlbiBiZXR3ZWVuXG4gKiB1cGRhdGVzLlxuICovXG52YXIgb3duZXJIYXNLZXlVc2VXYXJuaW5nID0ge307XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSkge1xuICB2YXIgaW5mbyA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuXG4gIGlmICghaW5mbykge1xuICAgIHZhciBwYXJlbnROYW1lID0gdHlwZW9mIHBhcmVudFR5cGUgPT09ICdzdHJpbmcnID8gcGFyZW50VHlwZSA6IHBhcmVudFR5cGUuZGlzcGxheU5hbWUgfHwgcGFyZW50VHlwZS5uYW1lO1xuICAgIGlmIChwYXJlbnROYW1lKSB7XG4gICAgICBpbmZvID0gJ1xcblxcbkNoZWNrIHRoZSB0b3AtbGV2ZWwgcmVuZGVyIGNhbGwgdXNpbmcgPCcgKyBwYXJlbnROYW1lICsgJz4uJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZm87XG59XG5cbi8qKlxuICogV2FybiBpZiB0aGUgZWxlbWVudCBkb2Vzbid0IGhhdmUgYW4gZXhwbGljaXQga2V5IGFzc2lnbmVkIHRvIGl0LlxuICogVGhpcyBlbGVtZW50IGlzIGluIGFuIGFycmF5LiBUaGUgYXJyYXkgY291bGQgZ3JvdyBhbmQgc2hyaW5rIG9yIGJlXG4gKiByZW9yZGVyZWQuIEFsbCBjaGlsZHJlbiB0aGF0IGhhdmVuJ3QgYWxyZWFkeSBiZWVuIHZhbGlkYXRlZCBhcmUgcmVxdWlyZWQgdG9cbiAqIGhhdmUgYSBcImtleVwiIHByb3BlcnR5IGFzc2lnbmVkIHRvIGl0LiBFcnJvciBzdGF0dXNlcyBhcmUgY2FjaGVkIHNvIGEgd2FybmluZ1xuICogd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlRXhwbGljaXRLZXkoZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICBpZiAoIWVsZW1lbnQuX3N0b3JlIHx8IGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCB8fCBlbGVtZW50LmtleSAhPSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG5cbiAgdmFyIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8gPSBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpO1xuICBpZiAob3duZXJIYXNLZXlVc2VXYXJuaW5nW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIG93bmVySGFzS2V5VXNlV2FybmluZ1tjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSA9IHRydWU7XG5cbiAgLy8gVXN1YWxseSB0aGUgY3VycmVudCBvd25lciBpcyB0aGUgb2ZmZW5kZXIsIGJ1dCBpZiBpdCBhY2NlcHRzIGNoaWxkcmVuIGFzIGFcbiAgLy8gcHJvcGVydHksIGl0IG1heSBiZSB0aGUgY3JlYXRvciBvZiB0aGUgY2hpbGQgdGhhdCdzIHJlc3BvbnNpYmxlIGZvclxuICAvLyBhc3NpZ25pbmcgaXQgYSBrZXkuXG4gIHZhciBjaGlsZE93bmVyID0gJyc7XG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuX293bmVyICYmIGVsZW1lbnQuX293bmVyICE9PSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgY2hpbGRPd25lciA9ICcgSXQgd2FzIHBhc3NlZCBhIGNoaWxkIGZyb20gJyArIGdldENvbXBvbmVudE5hbWUoZWxlbWVudC5fb3duZXIudHlwZSkgKyAnLic7XG4gIH1cblxuICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChlbGVtZW50KTtcbiAge1xuICAgIHdhcm5pbmckMShmYWxzZSwgJ0VhY2ggY2hpbGQgaW4gYW4gYXJyYXkgb3IgaXRlcmF0b3Igc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJywgY3VycmVudENvbXBvbmVudEVycm9ySW5mbywgY2hpbGRPd25lcik7XG4gIH1cbiAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQobnVsbCk7XG59XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gKiB3aXRoIHZhbGlkIGtleSBwcm9wZXJ0eS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlIFN0YXRpY2FsbHkgcGFzc2VkIGNoaWxkIG9mIGFueSB0eXBlLlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG4gICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChpc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgIC8vIFRoaXMgZWxlbWVudCB3YXMgcGFzc2VkIGluIGEgdmFsaWQgbG9jYXRpb24uXG4gICAgaWYgKG5vZGUuX3N0b3JlKSB7XG4gICAgICBub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChub2RlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG5vZGUpO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gRW50cnkgaXRlcmF0b3JzIHVzZWQgdG8gcHJvdmlkZSBpbXBsaWNpdCBrZXlzLFxuICAgICAgLy8gYnV0IG5vdyB3ZSBwcmludCBhIHNlcGFyYXRlIHdhcm5pbmcgZm9yIHRoZW0gbGF0ZXIuXG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXAgPSB2b2lkIDA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoc3RlcC52YWx1ZSwgcGFyZW50VHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAqIHByb3ZpZGVkIGJ5IHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAgdmFyIHR5cGUgPSBlbGVtZW50LnR5cGU7XG4gIHZhciBuYW1lID0gdm9pZCAwLFxuICAgICAgcHJvcFR5cGVzID0gdm9pZCAwO1xuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBDbGFzcyBvciBmdW5jdGlvbiBjb21wb25lbnRcbiAgICBuYW1lID0gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWU7XG4gICAgcHJvcFR5cGVzID0gdHlwZS5wcm9wVHlwZXM7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSkge1xuICAgIC8vIEZvcndhcmRSZWZcbiAgICB2YXIgZnVuY3Rpb25OYW1lID0gdHlwZS5yZW5kZXIuZGlzcGxheU5hbWUgfHwgdHlwZS5yZW5kZXIubmFtZSB8fCAnJztcbiAgICBuYW1lID0gdHlwZS5kaXNwbGF5TmFtZSB8fCAoZnVuY3Rpb25OYW1lICE9PSAnJyA/ICdGb3J3YXJkUmVmKCcgKyBmdW5jdGlvbk5hbWUgKyAnKScgOiAnRm9yd2FyZFJlZicpO1xuICAgIHByb3BUeXBlcyA9IHR5cGUucHJvcFR5cGVzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocHJvcFR5cGVzKSB7XG4gICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCk7XG4gICAgY2hlY2tQcm9wVHlwZXNfMShwcm9wVHlwZXMsIGVsZW1lbnQucHJvcHMsICdwcm9wJywgbmFtZSwgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKTtcbiAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChudWxsKTtcbiAgfSBlbHNlIGlmICh0eXBlLlByb3BUeXBlcyAhPT0gdW5kZWZpbmVkICYmICFwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93bikge1xuICAgIHByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICdDb21wb25lbnQgJXMgZGVjbGFyZWQgYFByb3BUeXBlc2AgaW5zdGVhZCBvZiBgcHJvcFR5cGVzYC4gRGlkIHlvdSBtaXNzcGVsbCB0aGUgcHJvcGVydHkgYXNzaWdubWVudD8nLCBuYW1lIHx8ICdVbmtub3duJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiB0eXBlLmdldERlZmF1bHRQcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICF0eXBlLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA/IHdhcm5pbmdXaXRob3V0U3RhY2skMShmYWxzZSwgJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGEgZnJhZ21lbnQsIHZhbGlkYXRlIHRoYXQgaXQgY2FuIG9ubHkgYmUgcHJvdmlkZWQgd2l0aCBmcmFnbWVudCBwcm9wc1xuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGZyYWdtZW50XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlRnJhZ21lbnRQcm9wcyhmcmFnbWVudCkge1xuICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChmcmFnbWVudCk7XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhmcmFnbWVudC5wcm9wcyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgIT09ICdjaGlsZHJlbicgJiYga2V5ICE9PSAna2V5Jykge1xuICAgICAgd2FybmluZyQxKGZhbHNlLCAnSW52YWxpZCBwcm9wIGAlc2Agc3VwcGxpZWQgdG8gYFJlYWN0LkZyYWdtZW50YC4gJyArICdSZWFjdC5GcmFnbWVudCBjYW4gb25seSBoYXZlIGBrZXlgIGFuZCBgY2hpbGRyZW5gIHByb3BzLicsIGtleSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoZnJhZ21lbnQucmVmICE9PSBudWxsKSB7XG4gICAgd2FybmluZyQxKGZhbHNlLCAnSW52YWxpZCBhdHRyaWJ1dGUgYHJlZmAgc3VwcGxpZWQgdG8gYFJlYWN0LkZyYWdtZW50YC4nKTtcbiAgfVxuXG4gIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KG51bGwpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24odHlwZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIHZhciB2YWxpZFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSk7XG5cbiAgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICB2YXIgaW5mbyA9ICcnO1xuICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICBpbmZvICs9ICcgWW91IGxpa2VseSBmb3Jnb3QgdG8gZXhwb3J0IHlvdXIgY29tcG9uZW50IGZyb20gdGhlIGZpbGUgJyArIFwiaXQncyBkZWZpbmVkIGluLCBvciB5b3UgbWlnaHQgaGF2ZSBtaXhlZCB1cCBkZWZhdWx0IGFuZCBuYW1lZCBpbXBvcnRzLlwiO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2VJbmZvID0gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0ocHJvcHMpO1xuICAgIGlmIChzb3VyY2VJbmZvKSB7XG4gICAgICBpbmZvICs9IHNvdXJjZUluZm87XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZm8gKz0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGVTdHJpbmcgPSB2b2lkIDA7XG4gICAgaWYgKHR5cGUgPT09IG51bGwpIHtcbiAgICAgIHR5cGVTdHJpbmcgPSAnbnVsbCc7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgICB0eXBlU3RyaW5nID0gJ2FycmF5JztcbiAgICB9IGVsc2UgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCAmJiB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICAgIHR5cGVTdHJpbmcgPSAnPCcgKyAoZ2V0Q29tcG9uZW50TmFtZSh0eXBlLnR5cGUpIHx8ICdVbmtub3duJykgKyAnIC8+JztcbiAgICAgIGluZm8gPSAnIERpZCB5b3UgYWNjaWRlbnRhbGx5IGV4cG9ydCBhIEpTWCBsaXRlcmFsIGluc3RlYWQgb2YgYSBjb21wb25lbnQ/JztcbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZVN0cmluZyA9IHR5cGVvZiB0eXBlO1xuICAgIH1cblxuICAgIHdhcm5pbmckMShmYWxzZSwgJ1JlYWN0LmNyZWF0ZUVsZW1lbnQ6IHR5cGUgaXMgaW52YWxpZCAtLSBleHBlY3RlZCBhIHN0cmluZyAoZm9yICcgKyAnYnVpbHQtaW4gY29tcG9uZW50cykgb3IgYSBjbGFzcy9mdW5jdGlvbiAoZm9yIGNvbXBvc2l0ZSAnICsgJ2NvbXBvbmVudHMpIGJ1dCBnb3Q6ICVzLiVzJywgdHlwZVN0cmluZywgaW5mbyk7XG4gIH1cblxuICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAvLyBUaGUgcmVzdWx0IGNhbiBiZSBudWxsaXNoIGlmIGEgbW9jayBvciBhIGN1c3RvbSBmdW5jdGlvbiBpcyB1c2VkLlxuICAvLyBUT0RPOiBEcm9wIHRoaXMgd2hlbiB0aGVzZSBhcmUgbm8gbG9uZ2VyIGFsbG93ZWQgYXMgdGhlIHR5cGUgYXJndW1lbnQuXG4gIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gIC8vIGRvZXNuJ3QgZXhwZWN0IGEgbm9uLXN0cmluZy9mdW5jdGlvbiB0eXBlIGFuZCBjYW4gdGhyb3cgY29uZnVzaW5nIGVycm9ycy5cbiAgLy8gV2UgZG9uJ3Qgd2FudCBleGNlcHRpb24gYmVoYXZpb3IgdG8gZGlmZmVyIGJldHdlZW4gZGV2IGFuZCBwcm9kLlxuICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAvLyBmaXhlZCwgdGhlIGtleSB3YXJuaW5ncyB3aWxsIGFwcGVhci4pXG4gIGlmICh2YWxpZFR5cGUpIHtcbiAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCB0eXBlKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSkge1xuICAgIHZhbGlkYXRlRnJhZ21lbnRQcm9wcyhlbGVtZW50KTtcbiAgfSBlbHNlIHtcbiAgICB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGYWN0b3J5V2l0aFZhbGlkYXRpb24odHlwZSkge1xuICB2YXIgdmFsaWRhdGVkRmFjdG9yeSA9IGNyZWF0ZUVsZW1lbnRXaXRoVmFsaWRhdGlvbi5iaW5kKG51bGwsIHR5cGUpO1xuICB2YWxpZGF0ZWRGYWN0b3J5LnR5cGUgPSB0eXBlO1xuICAvLyBMZWdhY3kgaG9vazogcmVtb3ZlIGl0XG4gIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsaWRhdGVkRmFjdG9yeSwgJ3R5cGUnLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsb3dQcmlvcml0eVdhcm5pbmckMShmYWxzZSwgJ0ZhY3RvcnkudHlwZSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdGhlIGNsYXNzIGRpcmVjdGx5ICcgKyAnYmVmb3JlIHBhc3NpbmcgaXQgdG8gY3JlYXRlRmFjdG9yeS4nKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd0eXBlJywge1xuICAgICAgICAgIHZhbHVlOiB0eXBlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB2YWxpZGF0ZWRGYWN0b3J5O1xufVxuXG5mdW5jdGlvbiBjbG9uZUVsZW1lbnRXaXRoVmFsaWRhdGlvbihlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgdmFyIG5ld0VsZW1lbnQgPSBjbG9uZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIG5ld0VsZW1lbnQudHlwZSk7XG4gIH1cbiAgdmFsaWRhdGVQcm9wVHlwZXMobmV3RWxlbWVudCk7XG4gIHJldHVybiBuZXdFbGVtZW50O1xufVxuXG52YXIgUmVhY3QgPSB7XG4gIENoaWxkcmVuOiB7XG4gICAgbWFwOiBtYXBDaGlsZHJlbixcbiAgICBmb3JFYWNoOiBmb3JFYWNoQ2hpbGRyZW4sXG4gICAgY291bnQ6IGNvdW50Q2hpbGRyZW4sXG4gICAgdG9BcnJheTogdG9BcnJheSxcbiAgICBvbmx5OiBvbmx5Q2hpbGRcbiAgfSxcblxuICBjcmVhdGVSZWY6IGNyZWF0ZVJlZixcbiAgQ29tcG9uZW50OiBDb21wb25lbnQsXG4gIFB1cmVDb21wb25lbnQ6IFB1cmVDb21wb25lbnQsXG5cbiAgY3JlYXRlQ29udGV4dDogY3JlYXRlQ29udGV4dCxcbiAgZm9yd2FyZFJlZjogZm9yd2FyZFJlZixcbiAgbGF6eTogbGF6eSxcbiAgbWVtbzogbWVtbyxcblxuICBGcmFnbWVudDogUkVBQ1RfRlJBR01FTlRfVFlQRSxcbiAgU3RyaWN0TW9kZTogUkVBQ1RfU1RSSUNUX01PREVfVFlQRSxcbiAgU3VzcGVuc2U6IFJFQUNUX1NVU1BFTlNFX1RZUEUsXG5cbiAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudFdpdGhWYWxpZGF0aW9uLFxuICBjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudFdpdGhWYWxpZGF0aW9uLFxuICBjcmVhdGVGYWN0b3J5OiBjcmVhdGVGYWN0b3J5V2l0aFZhbGlkYXRpb24sXG4gIGlzVmFsaWRFbGVtZW50OiBpc1ZhbGlkRWxlbWVudCxcblxuICB2ZXJzaW9uOiBSZWFjdFZlcnNpb24sXG5cbiAgX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ6IFJlYWN0U2hhcmVkSW50ZXJuYWxzXG59O1xuXG5pZiAoZW5hYmxlU3RhYmxlQ29uY3VycmVudE1vZGVBUElzKSB7XG4gIFJlYWN0LkNvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG4gIFJlYWN0LlByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbn0gZWxzZSB7XG4gIFJlYWN0LnVuc3RhYmxlX0NvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG4gIFJlYWN0LnVuc3RhYmxlX1Byb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbn1cblxuaWYgKGVuYWJsZUhvb2tzKSB7XG4gIFJlYWN0LnVzZUNhbGxiYWNrID0gdXNlQ2FsbGJhY2s7XG4gIFJlYWN0LnVzZUNvbnRleHQgPSB1c2VDb250ZXh0O1xuICBSZWFjdC51c2VFZmZlY3QgPSB1c2VFZmZlY3Q7XG4gIFJlYWN0LnVzZUltcGVyYXRpdmVNZXRob2RzID0gdXNlSW1wZXJhdGl2ZU1ldGhvZHM7XG4gIFJlYWN0LnVzZUxheW91dEVmZmVjdCA9IHVzZUxheW91dEVmZmVjdDtcbiAgUmVhY3QudXNlTWVtbyA9IHVzZU1lbW87XG4gIFJlYWN0LnVzZU11dGF0aW9uRWZmZWN0ID0gdXNlTXV0YXRpb25FZmZlY3Q7XG4gIFJlYWN0LnVzZVJlZHVjZXIgPSB1c2VSZWR1Y2VyO1xuICBSZWFjdC51c2VSZWYgPSB1c2VSZWY7XG4gIFJlYWN0LnVzZVN0YXRlID0gdXNlU3RhdGU7XG59XG5cblxuXG52YXIgUmVhY3QkMiA9IE9iamVjdC5mcmVlemUoe1xuXHRkZWZhdWx0OiBSZWFjdFxufSk7XG5cbnZhciBSZWFjdCQzID0gKCBSZWFjdCQyICYmIFJlYWN0ICkgfHwgUmVhY3QkMjtcblxuLy8gVE9ETzogZGVjaWRlIG9uIHRoZSB0b3AtbGV2ZWwgZXhwb3J0IGZvcm0uXG4vLyBUaGlzIGlzIGhhY2t5IGJ1dCBtYWtlcyBpdCB3b3JrIHdpdGggYm90aCBSb2xsdXAgYW5kIEplc3QuXG52YXIgcmVhY3QgPSBSZWFjdCQzLmRlZmF1bHQgfHwgUmVhY3QkMztcblxucmV0dXJuIHJlYWN0O1xuXG59KSkpO1xuIl19