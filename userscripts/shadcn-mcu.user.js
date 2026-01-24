// ==UserScript==
// @name         Shadcn MCU Colors
// @namespace    https://github.com/abernier/react-mcu
// @version      1.0.0
// @description  Extract shadcn primary color and generate MCU color scheme
// @author       abernier
// @match        *://*/*
// @grant        none
// ==/UserScript==

"use strict";
var ShadcnMCU = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) =>
    function __require() {
      return (
        mod ||
          (0, cb[__getOwnPropNames(cb)[0]])(
            (mod = { exports: {} }).exports,
            mod,
          ),
        mod.exports
      );
    };
  var __copyProps = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, {
            get: () => from[key],
            enumerable:
              !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
          });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (
    (target = mod != null ? __create(__getProtoOf(mod)) : {}),
    __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule
        ? __defProp(target, "default", { value: mod, enumerable: true })
        : target,
      mod,
    )
  );

  // node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react.production.js
  var require_react_production = __commonJS({
    "node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react.production.js"(
      exports,
    ) {
      "use strict";
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for(
        "react.transitional.element",
      );
      var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE =
        /* @__PURE__ */ Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
      var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
      var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE =
        /* @__PURE__ */ Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
      var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
      var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
      var REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable)
          return null;
        maybeIterable =
          (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
          maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      var ReactNoopUpdateQueue = {
        isMounted: function () {
          return false;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      };
      var assign = Object.assign;
      var emptyObject = {};
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function (partialState, callback) {
        if (
          "object" !== typeof partialState &&
          "function" !== typeof partialState &&
          null != partialState
        )
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables.",
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function (callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      function ComponentDummy() {}
      ComponentDummy.prototype = Component.prototype;
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      var pureComponentPrototype = (PureComponent.prototype =
        new ComponentDummy());
      pureComponentPrototype.constructor = PureComponent;
      assign(pureComponentPrototype, Component.prototype);
      pureComponentPrototype.isPureReactComponent = true;
      var isArrayImpl = Array.isArray;
      function noop() {}
      var ReactSharedInternals = { H: null, A: null, T: null, S: null };
      var hasOwnProperty2 = Object.prototype.hasOwnProperty;
      function ReactElement(type, key, props) {
        var refProp = props.ref;
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref: void 0 !== refProp ? refProp : null,
          props,
        };
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        return ReactElement(oldElement.type, newKey, oldElement.props);
      }
      function isValidElement(object) {
        return (
          "object" === typeof object &&
          null !== object &&
          object.$$typeof === REACT_ELEMENT_TYPE
        );
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return (
          "$" +
          key.replace(/[=:]/g, function (match) {
            return escaperLookup[match];
          })
        );
      }
      var userProvidedKeyEscapeRegex = /\/+/g;
      function getElementKey(element, index) {
        return "object" === typeof element &&
          null !== element &&
          null != element.key
          ? escape("" + element.key)
          : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch (
              ("string" === typeof thenable.status
                ? thenable.then(noop, noop)
                : ((thenable.status = "pending"),
                  thenable.then(
                    function (fulfilledValue) {
                      "pending" === thenable.status &&
                        ((thenable.status = "fulfilled"),
                        (thenable.value = fulfilledValue));
                    },
                    function (error) {
                      "pending" === thenable.status &&
                        ((thenable.status = "rejected"),
                        (thenable.reason = error));
                    },
                  )),
              thenable.status)
            ) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(
        children,
        array,
        escapedPrefix,
        nameSoFar,
        callback,
      ) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return (
                    (invokeCallback = children._init),
                    mapIntoArray(
                      invokeCallback(children._payload),
                      array,
                      escapedPrefix,
                      nameSoFar,
                      callback,
                    )
                  );
              }
          }
        if (invokeCallback)
          return (
            (callback = callback(children)),
            (invokeCallback =
              "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar),
            isArrayImpl(callback)
              ? ((escapedPrefix = ""),
                null != invokeCallback &&
                  (escapedPrefix =
                    invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") +
                    "/"),
                mapIntoArray(callback, array, escapedPrefix, "", function (c) {
                  return c;
                }))
              : null != callback &&
                (isValidElement(callback) &&
                  (callback = cloneAndReplaceKey(
                    callback,
                    escapedPrefix +
                      (null == callback.key ||
                      (children && children.key === callback.key)
                        ? ""
                        : ("" + callback.key).replace(
                            userProvidedKeyEscapeRegex,
                            "$&/",
                          ) + "/") +
                      invokeCallback,
                  )),
                array.push(callback)),
            1
          );
        invokeCallback = 0;
        var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            ((nameSoFar = children[i]),
              (type = nextNamePrefix + getElementKey(nameSoFar, i)),
              (invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback,
              )));
        else if (((i = getIteratorFn(children)), "function" === typeof i))
          for (
            children = i.call(children), i = 0;
            !(nameSoFar = children.next()).done;
          )
            ((nameSoFar = nameSoFar.value),
              (type = nextNamePrefix + getElementKey(nameSoFar, i++)),
              (invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback,
              )));
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback,
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " +
              ("[object Object]" === array
                ? "object with keys {" + Object.keys(children).join(", ") + "}"
                : array) +
              "). If you meant to render a collection of children, use an array instead.",
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [],
          count = 0;
        mapIntoArray(children, result, "", "", function (child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ctor = payload._result;
          ctor = ctor();
          ctor.then(
            function (moduleObject) {
              if (0 === payload._status || -1 === payload._status)
                ((payload._status = 1), (payload._result = moduleObject));
            },
            function (error) {
              if (0 === payload._status || -1 === payload._status)
                ((payload._status = 2), (payload._result = error));
            },
          );
          -1 === payload._status &&
            ((payload._status = 0), (payload._result = ctor));
        }
        if (1 === payload._status) return payload._result.default;
        throw payload._result;
      }
      var reportGlobalError =
        "function" === typeof reportError
          ? reportError
          : function (error) {
              if (
                "object" === typeof window &&
                "function" === typeof window.ErrorEvent
              ) {
                var event = new window.ErrorEvent("error", {
                  bubbles: true,
                  cancelable: true,
                  message:
                    "object" === typeof error &&
                    null !== error &&
                    "string" === typeof error.message
                      ? String(error.message)
                      : String(error),
                  error,
                });
                if (!window.dispatchEvent(event)) return;
              } else if (
                "object" === typeof process &&
                "function" === typeof process.emit
              ) {
                process.emit("uncaughtException", error);
                return;
              }
              console.error(error);
            };
      var Children = {
        map: mapChildren,
        forEach: function (children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function () {
              forEachFunc.apply(this, arguments);
            },
            forEachContext,
          );
        },
        count: function (children) {
          var n = 0;
          mapChildren(children, function () {
            n++;
          });
          return n;
        },
        toArray: function (children) {
          return (
            mapChildren(children, function (child) {
              return child;
            }) || []
          );
        },
        only: function (children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child.",
            );
          return children;
        },
      };
      exports.Activity = REACT_ACTIVITY_TYPE;
      exports.Children = Children;
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
        ReactSharedInternals;
      exports.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function (size) {
          return ReactSharedInternals.H.useMemoCache(size);
        },
      };
      exports.cache = function (fn) {
        return function () {
          return fn.apply(null, arguments);
        };
      };
      exports.cacheSignal = function () {
        return null;
      };
      exports.cloneElement = function (element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " +
              element +
              ".",
          );
        var props = assign({}, element.props),
          key = element.key;
        if (null != config)
          for (propName in (void 0 !== config.key && (key = "" + config.key),
          config))
            !hasOwnProperty2.call(config, propName) ||
              "key" === propName ||
              "__self" === propName ||
              "__source" === propName ||
              ("ref" === propName && void 0 === config.ref) ||
              (props[propName] = config[propName]);
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          for (var childArray = Array(propName), i = 0; i < propName; i++)
            childArray[i] = arguments[i + 2];
          props.children = childArray;
        }
        return ReactElement(element.type, key, props);
      };
      exports.createContext = function (defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue,
        };
        return defaultValue;
      };
      exports.createElement = function (type, config, children) {
        var propName,
          props = {},
          key = null;
        if (null != config)
          for (propName in (void 0 !== config.key && (key = "" + config.key),
          config))
            hasOwnProperty2.call(config, propName) &&
              "key" !== propName &&
              "__self" !== propName &&
              "__source" !== propName &&
              (props[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) props.children = children;
        else if (1 < childrenLength) {
          for (
            var childArray = Array(childrenLength), i = 0;
            i < childrenLength;
            i++
          )
            childArray[i] = arguments[i + 2];
          props.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in ((childrenLength = type.defaultProps),
          childrenLength))
            void 0 === props[propName] &&
              (props[propName] = childrenLength[propName]);
        return ReactElement(type, key, props);
      };
      exports.createRef = function () {
        return { current: null };
      };
      exports.forwardRef = function (render) {
        return { $$typeof: REACT_FORWARD_REF_TYPE, render };
      };
      exports.isValidElement = isValidElement;
      exports.lazy = function (ctor) {
        return {
          $$typeof: REACT_LAZY_TYPE,
          _payload: { _status: -1, _result: ctor },
          _init: lazyInitializer,
        };
      };
      exports.memo = function (type, compare2) {
        return {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare2 ? null : compare2,
        };
      };
      exports.startTransition = function (scope) {
        var prevTransition = ReactSharedInternals.T,
          currentTransition = {};
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(),
            onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish &&
            onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue &&
            null !== returnValue &&
            "function" === typeof returnValue.then &&
            returnValue.then(noop, reportGlobalError);
        } catch (error) {
          reportGlobalError(error);
        } finally {
          (null !== prevTransition &&
            null !== currentTransition.types &&
            (prevTransition.types = currentTransition.types),
            (ReactSharedInternals.T = prevTransition));
        }
      };
      exports.unstable_useCacheRefresh = function () {
        return ReactSharedInternals.H.useCacheRefresh();
      };
      exports.use = function (usable) {
        return ReactSharedInternals.H.use(usable);
      };
      exports.useActionState = function (action, initialState, permalink) {
        return ReactSharedInternals.H.useActionState(
          action,
          initialState,
          permalink,
        );
      };
      exports.useCallback = function (callback, deps) {
        return ReactSharedInternals.H.useCallback(callback, deps);
      };
      exports.useContext = function (Context) {
        return ReactSharedInternals.H.useContext(Context);
      };
      exports.useDebugValue = function () {};
      exports.useDeferredValue = function (value, initialValue) {
        return ReactSharedInternals.H.useDeferredValue(value, initialValue);
      };
      exports.useEffect = function (create, deps) {
        return ReactSharedInternals.H.useEffect(create, deps);
      };
      exports.useEffectEvent = function (callback) {
        return ReactSharedInternals.H.useEffectEvent(callback);
      };
      exports.useId = function () {
        return ReactSharedInternals.H.useId();
      };
      exports.useImperativeHandle = function (ref, create, deps) {
        return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
      };
      exports.useInsertionEffect = function (create, deps) {
        return ReactSharedInternals.H.useInsertionEffect(create, deps);
      };
      exports.useLayoutEffect = function (create, deps) {
        return ReactSharedInternals.H.useLayoutEffect(create, deps);
      };
      exports.useMemo = function (create, deps) {
        return ReactSharedInternals.H.useMemo(create, deps);
      };
      exports.useOptimistic = function (passthrough, reducer) {
        return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
      };
      exports.useReducer = function (reducer, initialArg, init2) {
        return ReactSharedInternals.H.useReducer(reducer, initialArg, init2);
      };
      exports.useRef = function (initialValue) {
        return ReactSharedInternals.H.useRef(initialValue);
      };
      exports.useState = function (initialState) {
        return ReactSharedInternals.H.useState(initialState);
      };
      exports.useSyncExternalStore = function (
        subscribe,
        getSnapshot,
        getServerSnapshot,
      ) {
        return ReactSharedInternals.H.useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot,
        );
      };
      exports.useTransition = function () {
        return ReactSharedInternals.H.useTransition();
      };
      exports.version = "19.2.3";
    },
  });

  // node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react.development.js"(
      exports,
      module,
    ) {
      "use strict";
      "production" !== process.env.NODE_ENV &&
        (function () {
          function defineDeprecationWarning(methodName, info) {
            Object.defineProperty(Component.prototype, methodName, {
              get: function () {
                console.warn(
                  "%s(...) is deprecated in plain JavaScript React classes. %s",
                  info[0],
                  info[1],
                );
              },
            });
          }
          function getIteratorFn(maybeIterable) {
            if (null === maybeIterable || "object" !== typeof maybeIterable)
              return null;
            maybeIterable =
              (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
              maybeIterable["@@iterator"];
            return "function" === typeof maybeIterable ? maybeIterable : null;
          }
          function warnNoop(publicInstance, callerName) {
            publicInstance =
              ((publicInstance = publicInstance.constructor) &&
                (publicInstance.displayName || publicInstance.name)) ||
              "ReactClass";
            var warningKey = publicInstance + "." + callerName;
            didWarnStateUpdateForUnmountedComponent[warningKey] ||
              (console.error(
                "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
                callerName,
                publicInstance,
              ),
              (didWarnStateUpdateForUnmountedComponent[warningKey] = true));
          }
          function Component(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          function ComponentDummy() {}
          function PureComponent(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          function noop() {}
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            try {
              testStringCoercion(value);
              var JSCompiler_inline_result = false;
            } catch (e) {
              JSCompiler_inline_result = true;
            }
            if (JSCompiler_inline_result) {
              JSCompiler_inline_result = console;
              var JSCompiler_temp_const = JSCompiler_inline_result.error;
              var JSCompiler_inline_result$jscomp$0 =
                ("function" === typeof Symbol &&
                  Symbol.toStringTag &&
                  value[Symbol.toStringTag]) ||
                value.constructor.name ||
                "Object";
              JSCompiler_temp_const.call(
                JSCompiler_inline_result,
                "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
                JSCompiler_inline_result$jscomp$0,
              );
              return testStringCoercion(value);
            }
          }
          function getComponentNameFromType(type) {
            if (null == type) return null;
            if ("function" === typeof type)
              return type.$$typeof === REACT_CLIENT_REFERENCE
                ? null
                : type.displayName || type.name || null;
            if ("string" === typeof type) return type;
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
              case REACT_ACTIVITY_TYPE:
                return "Activity";
            }
            if ("object" === typeof type)
              switch (
                ("number" === typeof type.tag &&
                  console.error(
                    "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.",
                  ),
                type.$$typeof)
              ) {
                case REACT_PORTAL_TYPE:
                  return "Portal";
                case REACT_CONTEXT_TYPE:
                  return type.displayName || "Context";
                case REACT_CONSUMER_TYPE:
                  return (type._context.displayName || "Context") + ".Consumer";
                case REACT_FORWARD_REF_TYPE:
                  var innerType = type.render;
                  type = type.displayName;
                  type ||
                    ((type = innerType.displayName || innerType.name || ""),
                    (type =
                      "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
                  return type;
                case REACT_MEMO_TYPE:
                  return (
                    (innerType = type.displayName || null),
                    null !== innerType
                      ? innerType
                      : getComponentNameFromType(type.type) || "Memo"
                  );
                case REACT_LAZY_TYPE:
                  innerType = type._payload;
                  type = type._init;
                  try {
                    return getComponentNameFromType(type(innerType));
                  } catch (x) {}
              }
            return null;
          }
          function getTaskName(type) {
            if (type === REACT_FRAGMENT_TYPE) return "<>";
            if (
              "object" === typeof type &&
              null !== type &&
              type.$$typeof === REACT_LAZY_TYPE
            )
              return "<...>";
            try {
              var name = getComponentNameFromType(type);
              return name ? "<" + name + ">" : "<...>";
            } catch (x) {
              return "<...>";
            }
          }
          function getOwner() {
            var dispatcher = ReactSharedInternals.A;
            return null === dispatcher ? null : dispatcher.getOwner();
          }
          function UnknownOwner() {
            return Error("react-stack-top-frame");
          }
          function hasValidKey(config) {
            if (hasOwnProperty2.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) return false;
            }
            return void 0 !== config.key;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            function warnAboutAccessingKey() {
              specialPropKeyWarningShown ||
                ((specialPropKeyWarningShown = true),
                console.error(
                  "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
                  displayName,
                ));
            }
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true,
            });
          }
          function elementRefGetterWithDeprecationWarning() {
            var componentName = getComponentNameFromType(this.type);
            didWarnAboutElementRef[componentName] ||
              ((didWarnAboutElementRef[componentName] = true),
              console.error(
                "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.",
              ));
            componentName = this.props.ref;
            return void 0 !== componentName ? componentName : null;
          }
          function ReactElement(
            type,
            key,
            props,
            owner,
            debugStack,
            debugTask,
          ) {
            var refProp = props.ref;
            type = {
              $$typeof: REACT_ELEMENT_TYPE,
              type,
              key,
              props,
              _owner: owner,
            };
            null !== (void 0 !== refProp ? refProp : null)
              ? Object.defineProperty(type, "ref", {
                  enumerable: false,
                  get: elementRefGetterWithDeprecationWarning,
                })
              : Object.defineProperty(type, "ref", {
                  enumerable: false,
                  value: null,
                });
            type._store = {};
            Object.defineProperty(type._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: 0,
            });
            Object.defineProperty(type, "_debugInfo", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: null,
            });
            Object.defineProperty(type, "_debugStack", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: debugStack,
            });
            Object.defineProperty(type, "_debugTask", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: debugTask,
            });
            Object.freeze && (Object.freeze(type.props), Object.freeze(type));
            return type;
          }
          function cloneAndReplaceKey(oldElement, newKey) {
            newKey = ReactElement(
              oldElement.type,
              newKey,
              oldElement.props,
              oldElement._owner,
              oldElement._debugStack,
              oldElement._debugTask,
            );
            oldElement._store &&
              (newKey._store.validated = oldElement._store.validated);
            return newKey;
          }
          function validateChildKeys(node) {
            isValidElement(node)
              ? node._store && (node._store.validated = 1)
              : "object" === typeof node &&
                null !== node &&
                node.$$typeof === REACT_LAZY_TYPE &&
                ("fulfilled" === node._payload.status
                  ? isValidElement(node._payload.value) &&
                    node._payload.value._store &&
                    (node._payload.value._store.validated = 1)
                  : node._store && (node._store.validated = 1));
          }
          function isValidElement(object) {
            return (
              "object" === typeof object &&
              null !== object &&
              object.$$typeof === REACT_ELEMENT_TYPE
            );
          }
          function escape(key) {
            var escaperLookup = { "=": "=0", ":": "=2" };
            return (
              "$" +
              key.replace(/[=:]/g, function (match) {
                return escaperLookup[match];
              })
            );
          }
          function getElementKey(element, index) {
            return "object" === typeof element &&
              null !== element &&
              null != element.key
              ? (checkKeyStringCoercion(element.key), escape("" + element.key))
              : index.toString(36);
          }
          function resolveThenable(thenable) {
            switch (thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
              default:
                switch (
                  ("string" === typeof thenable.status
                    ? thenable.then(noop, noop)
                    : ((thenable.status = "pending"),
                      thenable.then(
                        function (fulfilledValue) {
                          "pending" === thenable.status &&
                            ((thenable.status = "fulfilled"),
                            (thenable.value = fulfilledValue));
                        },
                        function (error) {
                          "pending" === thenable.status &&
                            ((thenable.status = "rejected"),
                            (thenable.reason = error));
                        },
                      )),
                  thenable.status)
                ) {
                  case "fulfilled":
                    return thenable.value;
                  case "rejected":
                    throw thenable.reason;
                }
            }
            throw thenable;
          }
          function mapIntoArray(
            children,
            array,
            escapedPrefix,
            nameSoFar,
            callback,
          ) {
            var type = typeof children;
            if ("undefined" === type || "boolean" === type) children = null;
            var invokeCallback = false;
            if (null === children) invokeCallback = true;
            else
              switch (type) {
                case "bigint":
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                      break;
                    case REACT_LAZY_TYPE:
                      return (
                        (invokeCallback = children._init),
                        mapIntoArray(
                          invokeCallback(children._payload),
                          array,
                          escapedPrefix,
                          nameSoFar,
                          callback,
                        )
                      );
                  }
              }
            if (invokeCallback) {
              invokeCallback = children;
              callback = callback(invokeCallback);
              var childKey =
                "" === nameSoFar
                  ? "." + getElementKey(invokeCallback, 0)
                  : nameSoFar;
              isArrayImpl(callback)
                ? ((escapedPrefix = ""),
                  null != childKey &&
                    (escapedPrefix =
                      childKey.replace(userProvidedKeyEscapeRegex, "$&/") +
                      "/"),
                  mapIntoArray(
                    callback,
                    array,
                    escapedPrefix,
                    "",
                    function (c) {
                      return c;
                    },
                  ))
                : null != callback &&
                  (isValidElement(callback) &&
                    (null != callback.key &&
                      ((invokeCallback &&
                        invokeCallback.key === callback.key) ||
                        checkKeyStringCoercion(callback.key)),
                    (escapedPrefix = cloneAndReplaceKey(
                      callback,
                      escapedPrefix +
                        (null == callback.key ||
                        (invokeCallback && invokeCallback.key === callback.key)
                          ? ""
                          : ("" + callback.key).replace(
                              userProvidedKeyEscapeRegex,
                              "$&/",
                            ) + "/") +
                        childKey,
                    )),
                    "" !== nameSoFar &&
                      null != invokeCallback &&
                      isValidElement(invokeCallback) &&
                      null == invokeCallback.key &&
                      invokeCallback._store &&
                      !invokeCallback._store.validated &&
                      (escapedPrefix._store.validated = 2),
                    (callback = escapedPrefix)),
                  array.push(callback));
              return 1;
            }
            invokeCallback = 0;
            childKey = "" === nameSoFar ? "." : nameSoFar + ":";
            if (isArrayImpl(children))
              for (var i = 0; i < children.length; i++)
                ((nameSoFar = children[i]),
                  (type = childKey + getElementKey(nameSoFar, i)),
                  (invokeCallback += mapIntoArray(
                    nameSoFar,
                    array,
                    escapedPrefix,
                    type,
                    callback,
                  )));
            else if (((i = getIteratorFn(children)), "function" === typeof i))
              for (
                i === children.entries &&
                  (didWarnAboutMaps ||
                    console.warn(
                      "Using Maps as children is not supported. Use an array of keyed ReactElements instead.",
                    ),
                  (didWarnAboutMaps = true)),
                  children = i.call(children),
                  i = 0;
                !(nameSoFar = children.next()).done;
              )
                ((nameSoFar = nameSoFar.value),
                  (type = childKey + getElementKey(nameSoFar, i++)),
                  (invokeCallback += mapIntoArray(
                    nameSoFar,
                    array,
                    escapedPrefix,
                    type,
                    callback,
                  )));
            else if ("object" === type) {
              if ("function" === typeof children.then)
                return mapIntoArray(
                  resolveThenable(children),
                  array,
                  escapedPrefix,
                  nameSoFar,
                  callback,
                );
              array = String(children);
              throw Error(
                "Objects are not valid as a React child (found: " +
                  ("[object Object]" === array
                    ? "object with keys {" +
                      Object.keys(children).join(", ") +
                      "}"
                    : array) +
                  "). If you meant to render a collection of children, use an array instead.",
              );
            }
            return invokeCallback;
          }
          function mapChildren(children, func, context) {
            if (null == children) return children;
            var result = [],
              count = 0;
            mapIntoArray(children, result, "", "", function (child) {
              return func.call(context, child, count++);
            });
            return result;
          }
          function lazyInitializer(payload) {
            if (-1 === payload._status) {
              var ioInfo = payload._ioInfo;
              null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
              ioInfo = payload._result;
              var thenable = ioInfo();
              thenable.then(
                function (moduleObject) {
                  if (0 === payload._status || -1 === payload._status) {
                    payload._status = 1;
                    payload._result = moduleObject;
                    var _ioInfo = payload._ioInfo;
                    null != _ioInfo && (_ioInfo.end = performance.now());
                    void 0 === thenable.status &&
                      ((thenable.status = "fulfilled"),
                      (thenable.value = moduleObject));
                  }
                },
                function (error) {
                  if (0 === payload._status || -1 === payload._status) {
                    payload._status = 2;
                    payload._result = error;
                    var _ioInfo2 = payload._ioInfo;
                    null != _ioInfo2 && (_ioInfo2.end = performance.now());
                    void 0 === thenable.status &&
                      ((thenable.status = "rejected"),
                      (thenable.reason = error));
                  }
                },
              );
              ioInfo = payload._ioInfo;
              if (null != ioInfo) {
                ioInfo.value = thenable;
                var displayName = thenable.displayName;
                "string" === typeof displayName && (ioInfo.name = displayName);
              }
              -1 === payload._status &&
                ((payload._status = 0), (payload._result = thenable));
            }
            if (1 === payload._status)
              return (
                (ioInfo = payload._result),
                void 0 === ioInfo &&
                  console.error(
                    "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
                    ioInfo,
                  ),
                "default" in ioInfo ||
                  console.error(
                    "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
                    ioInfo,
                  ),
                ioInfo.default
              );
            throw payload._result;
          }
          function resolveDispatcher() {
            var dispatcher = ReactSharedInternals.H;
            null === dispatcher &&
              console.error(
                "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.",
              );
            return dispatcher;
          }
          function releaseAsyncTransition() {
            ReactSharedInternals.asyncTransitions--;
          }
          function enqueueTask(task) {
            if (null === enqueueTaskImpl)
              try {
                var requireString = ("require" + Math.random()).slice(0, 7);
                enqueueTaskImpl = (module && module[requireString]).call(
                  module,
                  "timers",
                ).setImmediate;
              } catch (_err) {
                enqueueTaskImpl = function (callback) {
                  false === didWarnAboutMessageChannel &&
                    ((didWarnAboutMessageChannel = true),
                    "undefined" === typeof MessageChannel &&
                      console.error(
                        "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.",
                      ));
                  var channel = new MessageChannel();
                  channel.port1.onmessage = callback;
                  channel.port2.postMessage(void 0);
                };
              }
            return enqueueTaskImpl(task);
          }
          function aggregateErrors(errors) {
            return 1 < errors.length && "function" === typeof AggregateError
              ? new AggregateError(errors)
              : errors[0];
          }
          function popActScope(prevActQueue, prevActScopeDepth) {
            prevActScopeDepth !== actScopeDepth - 1 &&
              console.error(
                "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ",
              );
            actScopeDepth = prevActScopeDepth;
          }
          function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
            var queue = ReactSharedInternals.actQueue;
            if (null !== queue)
              if (0 !== queue.length)
                try {
                  flushActQueue(queue);
                  enqueueTask(function () {
                    return recursivelyFlushAsyncActWork(
                      returnValue,
                      resolve,
                      reject,
                    );
                  });
                  return;
                } catch (error) {
                  ReactSharedInternals.thrownErrors.push(error);
                }
              else ReactSharedInternals.actQueue = null;
            0 < ReactSharedInternals.thrownErrors.length
              ? ((queue = aggregateErrors(ReactSharedInternals.thrownErrors)),
                (ReactSharedInternals.thrownErrors.length = 0),
                reject(queue))
              : resolve(returnValue);
          }
          function flushActQueue(queue) {
            if (!isFlushing) {
              isFlushing = true;
              var i = 0;
              try {
                for (; i < queue.length; i++) {
                  var callback = queue[i];
                  do {
                    ReactSharedInternals.didUsePromise = false;
                    var continuation = callback(false);
                    if (null !== continuation) {
                      if (ReactSharedInternals.didUsePromise) {
                        queue[i] = callback;
                        queue.splice(0, i);
                        return;
                      }
                      callback = continuation;
                    } else break;
                  } while (1);
                }
                queue.length = 0;
              } catch (error) {
                (queue.splice(0, i + 1),
                  ReactSharedInternals.thrownErrors.push(error));
              } finally {
                isFlushing = false;
              }
            }
          }
          "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            "function" ===
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
          var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for(
              "react.transitional.element",
            ),
            REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"),
            REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"),
            REACT_STRICT_MODE_TYPE =
              /* @__PURE__ */ Symbol.for("react.strict_mode"),
            REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"),
            REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"),
            REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"),
            REACT_FORWARD_REF_TYPE =
              /* @__PURE__ */ Symbol.for("react.forward_ref"),
            REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"),
            REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for(
              "react.suspense_list",
            ),
            REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"),
            REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"),
            REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"),
            MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
            didWarnStateUpdateForUnmountedComponent = {},
            ReactNoopUpdateQueue = {
              isMounted: function () {
                return false;
              },
              enqueueForceUpdate: function (publicInstance) {
                warnNoop(publicInstance, "forceUpdate");
              },
              enqueueReplaceState: function (publicInstance) {
                warnNoop(publicInstance, "replaceState");
              },
              enqueueSetState: function (publicInstance) {
                warnNoop(publicInstance, "setState");
              },
            },
            assign = Object.assign,
            emptyObject = {};
          Object.freeze(emptyObject);
          Component.prototype.isReactComponent = {};
          Component.prototype.setState = function (partialState, callback) {
            if (
              "object" !== typeof partialState &&
              "function" !== typeof partialState &&
              null != partialState
            )
              throw Error(
                "takes an object of state variables to update or a function which returns an object of state variables.",
              );
            this.updater.enqueueSetState(
              this,
              partialState,
              callback,
              "setState",
            );
          };
          Component.prototype.forceUpdate = function (callback) {
            this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
          };
          var deprecatedAPIs = {
            isMounted: [
              "isMounted",
              "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.",
            ],
            replaceState: [
              "replaceState",
              "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236).",
            ],
          };
          for (fnName in deprecatedAPIs)
            deprecatedAPIs.hasOwnProperty(fnName) &&
              defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
          ComponentDummy.prototype = Component.prototype;
          deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
          deprecatedAPIs.constructor = PureComponent;
          assign(deprecatedAPIs, Component.prototype);
          deprecatedAPIs.isPureReactComponent = true;
          var isArrayImpl = Array.isArray,
            REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for(
              "react.client.reference",
            ),
            ReactSharedInternals = {
              H: null,
              A: null,
              T: null,
              S: null,
              actQueue: null,
              asyncTransitions: 0,
              isBatchingLegacy: false,
              didScheduleLegacyUpdate: false,
              didUsePromise: false,
              thrownErrors: [],
              getCurrentStack: null,
              recentlyCreatedOwnerStacks: 0,
            },
            hasOwnProperty2 = Object.prototype.hasOwnProperty,
            createTask = console.createTask
              ? console.createTask
              : function () {
                  return null;
                };
          deprecatedAPIs = {
            react_stack_bottom_frame: function (callStackForError) {
              return callStackForError();
            },
          };
          var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
          var didWarnAboutElementRef = {};
          var unknownOwnerDebugStack =
            deprecatedAPIs.react_stack_bottom_frame.bind(
              deprecatedAPIs,
              UnknownOwner,
            )();
          var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
          var didWarnAboutMaps = false,
            userProvidedKeyEscapeRegex = /\/+/g,
            reportGlobalError =
              "function" === typeof reportError
                ? reportError
                : function (error) {
                    if (
                      "object" === typeof window &&
                      "function" === typeof window.ErrorEvent
                    ) {
                      var event = new window.ErrorEvent("error", {
                        bubbles: true,
                        cancelable: true,
                        message:
                          "object" === typeof error &&
                          null !== error &&
                          "string" === typeof error.message
                            ? String(error.message)
                            : String(error),
                        error,
                      });
                      if (!window.dispatchEvent(event)) return;
                    } else if (
                      "object" === typeof process &&
                      "function" === typeof process.emit
                    ) {
                      process.emit("uncaughtException", error);
                      return;
                    }
                    console.error(error);
                  },
            didWarnAboutMessageChannel = false,
            enqueueTaskImpl = null,
            actScopeDepth = 0,
            didWarnNoAwaitAct = false,
            isFlushing = false,
            queueSeveralMicrotasks =
              "function" === typeof queueMicrotask
                ? function (callback) {
                    queueMicrotask(function () {
                      return queueMicrotask(callback);
                    });
                  }
                : enqueueTask;
          deprecatedAPIs = Object.freeze({
            __proto__: null,
            c: function (size) {
              return resolveDispatcher().useMemoCache(size);
            },
          });
          var fnName = {
            map: mapChildren,
            forEach: function (children, forEachFunc, forEachContext) {
              mapChildren(
                children,
                function () {
                  forEachFunc.apply(this, arguments);
                },
                forEachContext,
              );
            },
            count: function (children) {
              var n = 0;
              mapChildren(children, function () {
                n++;
              });
              return n;
            },
            toArray: function (children) {
              return (
                mapChildren(children, function (child) {
                  return child;
                }) || []
              );
            },
            only: function (children) {
              if (!isValidElement(children))
                throw Error(
                  "React.Children.only expected to receive a single React element child.",
                );
              return children;
            },
          };
          exports.Activity = REACT_ACTIVITY_TYPE;
          exports.Children = fnName;
          exports.Component = Component;
          exports.Fragment = REACT_FRAGMENT_TYPE;
          exports.Profiler = REACT_PROFILER_TYPE;
          exports.PureComponent = PureComponent;
          exports.StrictMode = REACT_STRICT_MODE_TYPE;
          exports.Suspense = REACT_SUSPENSE_TYPE;
          exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
            ReactSharedInternals;
          exports.__COMPILER_RUNTIME = deprecatedAPIs;
          exports.act = function (callback) {
            var prevActQueue = ReactSharedInternals.actQueue,
              prevActScopeDepth = actScopeDepth;
            actScopeDepth++;
            var queue = (ReactSharedInternals.actQueue =
                null !== prevActQueue ? prevActQueue : []),
              didAwaitActCall = false;
            try {
              var result = callback();
            } catch (error) {
              ReactSharedInternals.thrownErrors.push(error);
            }
            if (0 < ReactSharedInternals.thrownErrors.length)
              throw (
                popActScope(prevActQueue, prevActScopeDepth),
                (callback = aggregateErrors(ReactSharedInternals.thrownErrors)),
                (ReactSharedInternals.thrownErrors.length = 0),
                callback
              );
            if (
              null !== result &&
              "object" === typeof result &&
              "function" === typeof result.then
            ) {
              var thenable = result;
              queueSeveralMicrotasks(function () {
                didAwaitActCall ||
                  didWarnNoAwaitAct ||
                  ((didWarnNoAwaitAct = true),
                  console.error(
                    "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);",
                  ));
              });
              return {
                then: function (resolve, reject) {
                  didAwaitActCall = true;
                  thenable.then(
                    function (returnValue) {
                      popActScope(prevActQueue, prevActScopeDepth);
                      if (0 === prevActScopeDepth) {
                        try {
                          (flushActQueue(queue),
                            enqueueTask(function () {
                              return recursivelyFlushAsyncActWork(
                                returnValue,
                                resolve,
                                reject,
                              );
                            }));
                        } catch (error$0) {
                          ReactSharedInternals.thrownErrors.push(error$0);
                        }
                        if (0 < ReactSharedInternals.thrownErrors.length) {
                          var _thrownError = aggregateErrors(
                            ReactSharedInternals.thrownErrors,
                          );
                          ReactSharedInternals.thrownErrors.length = 0;
                          reject(_thrownError);
                        }
                      } else resolve(returnValue);
                    },
                    function (error) {
                      popActScope(prevActQueue, prevActScopeDepth);
                      0 < ReactSharedInternals.thrownErrors.length
                        ? ((error = aggregateErrors(
                            ReactSharedInternals.thrownErrors,
                          )),
                          (ReactSharedInternals.thrownErrors.length = 0),
                          reject(error))
                        : reject(error);
                    },
                  );
                },
              };
            }
            var returnValue$jscomp$0 = result;
            popActScope(prevActQueue, prevActScopeDepth);
            0 === prevActScopeDepth &&
              (flushActQueue(queue),
              0 !== queue.length &&
                queueSeveralMicrotasks(function () {
                  didAwaitActCall ||
                    didWarnNoAwaitAct ||
                    ((didWarnNoAwaitAct = true),
                    console.error(
                      "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)",
                    ));
                }),
              (ReactSharedInternals.actQueue = null));
            if (0 < ReactSharedInternals.thrownErrors.length)
              throw (
                (callback = aggregateErrors(ReactSharedInternals.thrownErrors)),
                (ReactSharedInternals.thrownErrors.length = 0),
                callback
              );
            return {
              then: function (resolve, reject) {
                didAwaitActCall = true;
                0 === prevActScopeDepth
                  ? ((ReactSharedInternals.actQueue = queue),
                    enqueueTask(function () {
                      return recursivelyFlushAsyncActWork(
                        returnValue$jscomp$0,
                        resolve,
                        reject,
                      );
                    }))
                  : resolve(returnValue$jscomp$0);
              },
            };
          };
          exports.cache = function (fn) {
            return function () {
              return fn.apply(null, arguments);
            };
          };
          exports.cacheSignal = function () {
            return null;
          };
          exports.captureOwnerStack = function () {
            var getCurrentStack = ReactSharedInternals.getCurrentStack;
            return null === getCurrentStack ? null : getCurrentStack();
          };
          exports.cloneElement = function (element, config, children) {
            if (null === element || void 0 === element)
              throw Error(
                "The argument must be a React element, but you passed " +
                  element +
                  ".",
              );
            var props = assign({}, element.props),
              key = element.key,
              owner = element._owner;
            if (null != config) {
              var JSCompiler_inline_result;
              a: {
                if (
                  hasOwnProperty2.call(config, "ref") &&
                  (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
                    config,
                    "ref",
                  ).get) &&
                  JSCompiler_inline_result.isReactWarning
                ) {
                  JSCompiler_inline_result = false;
                  break a;
                }
                JSCompiler_inline_result = void 0 !== config.ref;
              }
              JSCompiler_inline_result && (owner = getOwner());
              hasValidKey(config) &&
                (checkKeyStringCoercion(config.key), (key = "" + config.key));
              for (propName in config)
                !hasOwnProperty2.call(config, propName) ||
                  "key" === propName ||
                  "__self" === propName ||
                  "__source" === propName ||
                  ("ref" === propName && void 0 === config.ref) ||
                  (props[propName] = config[propName]);
            }
            var propName = arguments.length - 2;
            if (1 === propName) props.children = children;
            else if (1 < propName) {
              JSCompiler_inline_result = Array(propName);
              for (var i = 0; i < propName; i++)
                JSCompiler_inline_result[i] = arguments[i + 2];
              props.children = JSCompiler_inline_result;
            }
            props = ReactElement(
              element.type,
              key,
              props,
              owner,
              element._debugStack,
              element._debugTask,
            );
            for (key = 2; key < arguments.length; key++)
              validateChildKeys(arguments[key]);
            return props;
          };
          exports.createContext = function (defaultValue) {
            defaultValue = {
              $$typeof: REACT_CONTEXT_TYPE,
              _currentValue: defaultValue,
              _currentValue2: defaultValue,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
            };
            defaultValue.Provider = defaultValue;
            defaultValue.Consumer = {
              $$typeof: REACT_CONSUMER_TYPE,
              _context: defaultValue,
            };
            defaultValue._currentRenderer = null;
            defaultValue._currentRenderer2 = null;
            return defaultValue;
          };
          exports.createElement = function (type, config, children) {
            for (var i = 2; i < arguments.length; i++)
              validateChildKeys(arguments[i]);
            i = {};
            var key = null;
            if (null != config)
              for (propName in (didWarnAboutOldJSXRuntime ||
                !("__self" in config) ||
                "key" in config ||
                ((didWarnAboutOldJSXRuntime = true),
                console.warn(
                  "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform",
                )),
              hasValidKey(config) &&
                (checkKeyStringCoercion(config.key), (key = "" + config.key)),
              config))
                hasOwnProperty2.call(config, propName) &&
                  "key" !== propName &&
                  "__self" !== propName &&
                  "__source" !== propName &&
                  (i[propName] = config[propName]);
            var childrenLength = arguments.length - 2;
            if (1 === childrenLength) i.children = children;
            else if (1 < childrenLength) {
              for (
                var childArray = Array(childrenLength), _i = 0;
                _i < childrenLength;
                _i++
              )
                childArray[_i] = arguments[_i + 2];
              Object.freeze && Object.freeze(childArray);
              i.children = childArray;
            }
            if (type && type.defaultProps)
              for (propName in ((childrenLength = type.defaultProps),
              childrenLength))
                void 0 === i[propName] &&
                  (i[propName] = childrenLength[propName]);
            key &&
              defineKeyPropWarningGetter(
                i,
                "function" === typeof type
                  ? type.displayName || type.name || "Unknown"
                  : type,
              );
            var propName =
              1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
            return ReactElement(
              type,
              key,
              i,
              getOwner(),
              propName
                ? Error("react-stack-top-frame")
                : unknownOwnerDebugStack,
              propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask,
            );
          };
          exports.createRef = function () {
            var refObject = { current: null };
            Object.seal(refObject);
            return refObject;
          };
          exports.forwardRef = function (render) {
            null != render && render.$$typeof === REACT_MEMO_TYPE
              ? console.error(
                  "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).",
                )
              : "function" !== typeof render
                ? console.error(
                    "forwardRef requires a render function but was given %s.",
                    null === render ? "null" : typeof render,
                  )
                : 0 !== render.length &&
                  2 !== render.length &&
                  console.error(
                    "forwardRef render functions accept exactly two parameters: props and ref. %s",
                    1 === render.length
                      ? "Did you forget to use the ref parameter?"
                      : "Any additional parameter will be undefined.",
                  );
            null != render &&
              null != render.defaultProps &&
              console.error(
                "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?",
              );
            var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render },
              ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function () {
                return ownName;
              },
              set: function (name) {
                ownName = name;
                render.name ||
                  render.displayName ||
                  (Object.defineProperty(render, "name", { value: name }),
                  (render.displayName = name));
              },
            });
            return elementType;
          };
          exports.isValidElement = isValidElement;
          exports.lazy = function (ctor) {
            ctor = { _status: -1, _result: ctor };
            var lazyType = {
                $$typeof: REACT_LAZY_TYPE,
                _payload: ctor,
                _init: lazyInitializer,
              },
              ioInfo = {
                name: "lazy",
                start: -1,
                end: -1,
                value: null,
                owner: null,
                debugStack: Error("react-stack-top-frame"),
                debugTask: console.createTask
                  ? console.createTask("lazy()")
                  : null,
              };
            ctor._ioInfo = ioInfo;
            lazyType._debugInfo = [{ awaited: ioInfo }];
            return lazyType;
          };
          exports.memo = function (type, compare2) {
            null == type &&
              console.error(
                "memo: The first argument must be a component. Instead received: %s",
                null === type ? "null" : typeof type,
              );
            compare2 = {
              $$typeof: REACT_MEMO_TYPE,
              type,
              compare: void 0 === compare2 ? null : compare2,
            };
            var ownName;
            Object.defineProperty(compare2, "displayName", {
              enumerable: false,
              configurable: true,
              get: function () {
                return ownName;
              },
              set: function (name) {
                ownName = name;
                type.name ||
                  type.displayName ||
                  (Object.defineProperty(type, "name", { value: name }),
                  (type.displayName = name));
              },
            });
            return compare2;
          };
          exports.startTransition = function (scope) {
            var prevTransition = ReactSharedInternals.T,
              currentTransition = {};
            currentTransition._updatedFibers = /* @__PURE__ */ new Set();
            ReactSharedInternals.T = currentTransition;
            try {
              var returnValue = scope(),
                onStartTransitionFinish = ReactSharedInternals.S;
              null !== onStartTransitionFinish &&
                onStartTransitionFinish(currentTransition, returnValue);
              "object" === typeof returnValue &&
                null !== returnValue &&
                "function" === typeof returnValue.then &&
                (ReactSharedInternals.asyncTransitions++,
                returnValue.then(
                  releaseAsyncTransition,
                  releaseAsyncTransition,
                ),
                returnValue.then(noop, reportGlobalError));
            } catch (error) {
              reportGlobalError(error);
            } finally {
              (null === prevTransition &&
                currentTransition._updatedFibers &&
                ((scope = currentTransition._updatedFibers.size),
                currentTransition._updatedFibers.clear(),
                10 < scope &&
                  console.warn(
                    "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.",
                  )),
                null !== prevTransition &&
                  null !== currentTransition.types &&
                  (null !== prevTransition.types &&
                    prevTransition.types !== currentTransition.types &&
                    console.error(
                      "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React.",
                    ),
                  (prevTransition.types = currentTransition.types)),
                (ReactSharedInternals.T = prevTransition));
            }
          };
          exports.unstable_useCacheRefresh = function () {
            return resolveDispatcher().useCacheRefresh();
          };
          exports.use = function (usable) {
            return resolveDispatcher().use(usable);
          };
          exports.useActionState = function (action, initialState, permalink) {
            return resolveDispatcher().useActionState(
              action,
              initialState,
              permalink,
            );
          };
          exports.useCallback = function (callback, deps) {
            return resolveDispatcher().useCallback(callback, deps);
          };
          exports.useContext = function (Context) {
            var dispatcher = resolveDispatcher();
            Context.$$typeof === REACT_CONSUMER_TYPE &&
              console.error(
                "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?",
              );
            return dispatcher.useContext(Context);
          };
          exports.useDebugValue = function (value, formatterFn) {
            return resolveDispatcher().useDebugValue(value, formatterFn);
          };
          exports.useDeferredValue = function (value, initialValue) {
            return resolveDispatcher().useDeferredValue(value, initialValue);
          };
          exports.useEffect = function (create, deps) {
            null == create &&
              console.warn(
                "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?",
              );
            return resolveDispatcher().useEffect(create, deps);
          };
          exports.useEffectEvent = function (callback) {
            return resolveDispatcher().useEffectEvent(callback);
          };
          exports.useId = function () {
            return resolveDispatcher().useId();
          };
          exports.useImperativeHandle = function (ref, create, deps) {
            return resolveDispatcher().useImperativeHandle(ref, create, deps);
          };
          exports.useInsertionEffect = function (create, deps) {
            null == create &&
              console.warn(
                "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?",
              );
            return resolveDispatcher().useInsertionEffect(create, deps);
          };
          exports.useLayoutEffect = function (create, deps) {
            null == create &&
              console.warn(
                "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?",
              );
            return resolveDispatcher().useLayoutEffect(create, deps);
          };
          exports.useMemo = function (create, deps) {
            return resolveDispatcher().useMemo(create, deps);
          };
          exports.useOptimistic = function (passthrough, reducer) {
            return resolveDispatcher().useOptimistic(passthrough, reducer);
          };
          exports.useReducer = function (reducer, initialArg, init2) {
            return resolveDispatcher().useReducer(reducer, initialArg, init2);
          };
          exports.useRef = function (initialValue) {
            return resolveDispatcher().useRef(initialValue);
          };
          exports.useState = function (initialState) {
            return resolveDispatcher().useState(initialState);
          };
          exports.useSyncExternalStore = function (
            subscribe,
            getSnapshot,
            getServerSnapshot,
          ) {
            return resolveDispatcher().useSyncExternalStore(
              subscribe,
              getSnapshot,
              getServerSnapshot,
            );
          };
          exports.useTransition = function () {
            return resolveDispatcher().useTransition();
          };
          exports.version = "19.2.3";
          "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            "function" ===
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
        })();
    },
  });

  // node_modules/.pnpm/react@19.2.3/node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/.pnpm/react@19.2.3/node_modules/react/index.js"(
      exports,
      module,
    ) {
      "use strict";
      if (process.env.NODE_ENV === "production") {
        module.exports = require_react_production();
      } else {
        module.exports = require_react_development();
      }
    },
  });

  // node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react-jsx-runtime.production.js
  var require_react_jsx_runtime_production = __commonJS({
    "node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react-jsx-runtime.production.js"(
      exports,
    ) {
      "use strict";
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for(
        "react.transitional.element",
      );
      var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
      function jsxProd(type, config, maybeKey) {
        var key = null;
        void 0 !== maybeKey && (key = "" + maybeKey);
        void 0 !== config.key && (key = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        config = maybeKey.ref;
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref: void 0 !== config ? config : null,
          props: maybeKey,
        };
      }
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = jsxProd;
      exports.jsxs = jsxProd;
    },
  });

  // node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react-jsx-runtime.development.js
  var require_react_jsx_runtime_development = __commonJS({
    "node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react-jsx-runtime.development.js"(
      exports,
    ) {
      "use strict";
      "production" !== process.env.NODE_ENV &&
        (function () {
          function getComponentNameFromType(type) {
            if (null == type) return null;
            if ("function" === typeof type)
              return type.$$typeof === REACT_CLIENT_REFERENCE
                ? null
                : type.displayName || type.name || null;
            if ("string" === typeof type) return type;
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
              case REACT_ACTIVITY_TYPE:
                return "Activity";
            }
            if ("object" === typeof type)
              switch (
                ("number" === typeof type.tag &&
                  console.error(
                    "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.",
                  ),
                type.$$typeof)
              ) {
                case REACT_PORTAL_TYPE:
                  return "Portal";
                case REACT_CONTEXT_TYPE:
                  return type.displayName || "Context";
                case REACT_CONSUMER_TYPE:
                  return (type._context.displayName || "Context") + ".Consumer";
                case REACT_FORWARD_REF_TYPE:
                  var innerType = type.render;
                  type = type.displayName;
                  type ||
                    ((type = innerType.displayName || innerType.name || ""),
                    (type =
                      "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
                  return type;
                case REACT_MEMO_TYPE:
                  return (
                    (innerType = type.displayName || null),
                    null !== innerType
                      ? innerType
                      : getComponentNameFromType(type.type) || "Memo"
                  );
                case REACT_LAZY_TYPE:
                  innerType = type._payload;
                  type = type._init;
                  try {
                    return getComponentNameFromType(type(innerType));
                  } catch (x) {}
              }
            return null;
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            try {
              testStringCoercion(value);
              var JSCompiler_inline_result = false;
            } catch (e) {
              JSCompiler_inline_result = true;
            }
            if (JSCompiler_inline_result) {
              JSCompiler_inline_result = console;
              var JSCompiler_temp_const = JSCompiler_inline_result.error;
              var JSCompiler_inline_result$jscomp$0 =
                ("function" === typeof Symbol &&
                  Symbol.toStringTag &&
                  value[Symbol.toStringTag]) ||
                value.constructor.name ||
                "Object";
              JSCompiler_temp_const.call(
                JSCompiler_inline_result,
                "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
                JSCompiler_inline_result$jscomp$0,
              );
              return testStringCoercion(value);
            }
          }
          function getTaskName(type) {
            if (type === REACT_FRAGMENT_TYPE) return "<>";
            if (
              "object" === typeof type &&
              null !== type &&
              type.$$typeof === REACT_LAZY_TYPE
            )
              return "<...>";
            try {
              var name = getComponentNameFromType(type);
              return name ? "<" + name + ">" : "<...>";
            } catch (x) {
              return "<...>";
            }
          }
          function getOwner() {
            var dispatcher = ReactSharedInternals.A;
            return null === dispatcher ? null : dispatcher.getOwner();
          }
          function UnknownOwner() {
            return Error("react-stack-top-frame");
          }
          function hasValidKey(config) {
            if (hasOwnProperty2.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) return false;
            }
            return void 0 !== config.key;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            function warnAboutAccessingKey() {
              specialPropKeyWarningShown ||
                ((specialPropKeyWarningShown = true),
                console.error(
                  "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
                  displayName,
                ));
            }
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true,
            });
          }
          function elementRefGetterWithDeprecationWarning() {
            var componentName = getComponentNameFromType(this.type);
            didWarnAboutElementRef[componentName] ||
              ((didWarnAboutElementRef[componentName] = true),
              console.error(
                "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.",
              ));
            componentName = this.props.ref;
            return void 0 !== componentName ? componentName : null;
          }
          function ReactElement(
            type,
            key,
            props,
            owner,
            debugStack,
            debugTask,
          ) {
            var refProp = props.ref;
            type = {
              $$typeof: REACT_ELEMENT_TYPE,
              type,
              key,
              props,
              _owner: owner,
            };
            null !== (void 0 !== refProp ? refProp : null)
              ? Object.defineProperty(type, "ref", {
                  enumerable: false,
                  get: elementRefGetterWithDeprecationWarning,
                })
              : Object.defineProperty(type, "ref", {
                  enumerable: false,
                  value: null,
                });
            type._store = {};
            Object.defineProperty(type._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: 0,
            });
            Object.defineProperty(type, "_debugInfo", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: null,
            });
            Object.defineProperty(type, "_debugStack", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: debugStack,
            });
            Object.defineProperty(type, "_debugTask", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: debugTask,
            });
            Object.freeze && (Object.freeze(type.props), Object.freeze(type));
            return type;
          }
          function jsxDEVImpl(
            type,
            config,
            maybeKey,
            isStaticChildren,
            debugStack,
            debugTask,
          ) {
            var children = config.children;
            if (void 0 !== children)
              if (isStaticChildren)
                if (isArrayImpl(children)) {
                  for (
                    isStaticChildren = 0;
                    isStaticChildren < children.length;
                    isStaticChildren++
                  )
                    validateChildKeys(children[isStaticChildren]);
                  Object.freeze && Object.freeze(children);
                } else
                  console.error(
                    "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.",
                  );
              else validateChildKeys(children);
            if (hasOwnProperty2.call(config, "key")) {
              children = getComponentNameFromType(type);
              var keys = Object.keys(config).filter(function (k) {
                return "key" !== k;
              });
              isStaticChildren =
                0 < keys.length
                  ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
                  : "{key: someKey}";
              didWarnAboutKeySpread[children + isStaticChildren] ||
                ((keys =
                  0 < keys.length
                    ? "{" + keys.join(": ..., ") + ": ...}"
                    : "{}"),
                console.error(
                  'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
                  isStaticChildren,
                  children,
                  keys,
                  children,
                ),
                (didWarnAboutKeySpread[children + isStaticChildren] = true));
            }
            children = null;
            void 0 !== maybeKey &&
              (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
            hasValidKey(config) &&
              (checkKeyStringCoercion(config.key),
              (children = "" + config.key));
            if ("key" in config) {
              maybeKey = {};
              for (var propName in config)
                "key" !== propName && (maybeKey[propName] = config[propName]);
            } else maybeKey = config;
            children &&
              defineKeyPropWarningGetter(
                maybeKey,
                "function" === typeof type
                  ? type.displayName || type.name || "Unknown"
                  : type,
              );
            return ReactElement(
              type,
              children,
              maybeKey,
              getOwner(),
              debugStack,
              debugTask,
            );
          }
          function validateChildKeys(node) {
            isValidElement(node)
              ? node._store && (node._store.validated = 1)
              : "object" === typeof node &&
                null !== node &&
                node.$$typeof === REACT_LAZY_TYPE &&
                ("fulfilled" === node._payload.status
                  ? isValidElement(node._payload.value) &&
                    node._payload.value._store &&
                    (node._payload.value._store.validated = 1)
                  : node._store && (node._store.validated = 1));
          }
          function isValidElement(object) {
            return (
              "object" === typeof object &&
              null !== object &&
              object.$$typeof === REACT_ELEMENT_TYPE
            );
          }
          var React2 = require_react(),
            REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for(
              "react.transitional.element",
            ),
            REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"),
            REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"),
            REACT_STRICT_MODE_TYPE =
              /* @__PURE__ */ Symbol.for("react.strict_mode"),
            REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"),
            REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"),
            REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"),
            REACT_FORWARD_REF_TYPE =
              /* @__PURE__ */ Symbol.for("react.forward_ref"),
            REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"),
            REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for(
              "react.suspense_list",
            ),
            REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"),
            REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"),
            REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"),
            REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for(
              "react.client.reference",
            ),
            ReactSharedInternals =
              React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
            hasOwnProperty2 = Object.prototype.hasOwnProperty,
            isArrayImpl = Array.isArray,
            createTask = console.createTask
              ? console.createTask
              : function () {
                  return null;
                };
          React2 = {
            react_stack_bottom_frame: function (callStackForError) {
              return callStackForError();
            },
          };
          var specialPropKeyWarningShown;
          var didWarnAboutElementRef = {};
          var unknownOwnerDebugStack = React2.react_stack_bottom_frame.bind(
            React2,
            UnknownOwner,
          )();
          var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
          var didWarnAboutKeySpread = {};
          exports.Fragment = REACT_FRAGMENT_TYPE;
          exports.jsx = function (type, config, maybeKey) {
            var trackActualOwner =
              1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
            return jsxDEVImpl(
              type,
              config,
              maybeKey,
              false,
              trackActualOwner
                ? Error("react-stack-top-frame")
                : unknownOwnerDebugStack,
              trackActualOwner
                ? createTask(getTaskName(type))
                : unknownOwnerDebugTask,
            );
          };
          exports.jsxs = function (type, config, maybeKey) {
            var trackActualOwner =
              1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
            return jsxDEVImpl(
              type,
              config,
              maybeKey,
              true,
              trackActualOwner
                ? Error("react-stack-top-frame")
                : unknownOwnerDebugStack,
              trackActualOwner
                ? createTask(getTaskName(type))
                : unknownOwnerDebugTask,
            );
          };
        })();
    },
  });

  // node_modules/.pnpm/react@19.2.3/node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/.pnpm/react@19.2.3/node_modules/react/jsx-runtime.js"(
      exports,
      module,
    ) {
      "use strict";
      if (process.env.NODE_ENV === "production") {
        module.exports = require_react_jsx_runtime_production();
      } else {
        module.exports = require_react_jsx_runtime_development();
      }
    },
  });

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/utils/math_utils.js
  function signum(num) {
    if (num < 0) {
      return -1;
    } else if (num === 0) {
      return 0;
    } else {
      return 1;
    }
  }
  function lerp(start, stop, amount) {
    return (1 - amount) * start + amount * stop;
  }
  function clampInt(min, max, input) {
    if (input < min) {
      return min;
    } else if (input > max) {
      return max;
    }
    return input;
  }
  function clampDouble(min, max, input) {
    if (input < min) {
      return min;
    } else if (input > max) {
      return max;
    }
    return input;
  }
  function sanitizeDegreesInt(degrees) {
    degrees = degrees % 360;
    if (degrees < 0) {
      degrees = degrees + 360;
    }
    return degrees;
  }
  function sanitizeDegreesDouble(degrees) {
    degrees = degrees % 360;
    if (degrees < 0) {
      degrees = degrees + 360;
    }
    return degrees;
  }
  function rotationDirection(from, to) {
    const increasingDifference = sanitizeDegreesDouble(to - from);
    return increasingDifference <= 180 ? 1 : -1;
  }
  function differenceDegrees(a, b) {
    return 180 - Math.abs(Math.abs(a - b) - 180);
  }
  function matrixMultiply(row, matrix) {
    const a =
      row[0] * matrix[0][0] + row[1] * matrix[0][1] + row[2] * matrix[0][2];
    const b =
      row[0] * matrix[1][0] + row[1] * matrix[1][1] + row[2] * matrix[1][2];
    const c =
      row[0] * matrix[2][0] + row[1] * matrix[2][1] + row[2] * matrix[2][2];
    return [a, b, c];
  }

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/utils/color_utils.js
  var SRGB_TO_XYZ = [
    [0.41233895, 0.35762064, 0.18051042],
    [0.2126, 0.7152, 0.0722],
    [0.01932141, 0.11916382, 0.95034478],
  ];
  var XYZ_TO_SRGB = [
    [3.2413774792388685, -1.5376652402851851, -0.49885366846268053],
    [-0.9691452513005321, 1.8758853451067872, 0.04156585616912061],
    [0.05562093689691305, -0.20395524564742123, 1.0571799111220335],
  ];
  var WHITE_POINT_D65 = [95.047, 100, 108.883];
  function argbFromRgb(red, green, blue) {
    return (
      ((255 << 24) |
        ((red & 255) << 16) |
        ((green & 255) << 8) |
        (blue & 255)) >>>
      0
    );
  }
  function argbFromLinrgb(linrgb) {
    const r = delinearized(linrgb[0]);
    const g = delinearized(linrgb[1]);
    const b = delinearized(linrgb[2]);
    return argbFromRgb(r, g, b);
  }
  function redFromArgb(argb) {
    return (argb >> 16) & 255;
  }
  function greenFromArgb(argb) {
    return (argb >> 8) & 255;
  }
  function blueFromArgb(argb) {
    return argb & 255;
  }
  function argbFromXyz(x, y, z) {
    const matrix = XYZ_TO_SRGB;
    const linearR = matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z;
    const linearG = matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z;
    const linearB = matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z;
    const r = delinearized(linearR);
    const g = delinearized(linearG);
    const b = delinearized(linearB);
    return argbFromRgb(r, g, b);
  }
  function xyzFromArgb(argb) {
    const r = linearized(redFromArgb(argb));
    const g = linearized(greenFromArgb(argb));
    const b = linearized(blueFromArgb(argb));
    return matrixMultiply([r, g, b], SRGB_TO_XYZ);
  }
  function labFromArgb(argb) {
    const linearR = linearized(redFromArgb(argb));
    const linearG = linearized(greenFromArgb(argb));
    const linearB = linearized(blueFromArgb(argb));
    const matrix = SRGB_TO_XYZ;
    const x =
      matrix[0][0] * linearR + matrix[0][1] * linearG + matrix[0][2] * linearB;
    const y =
      matrix[1][0] * linearR + matrix[1][1] * linearG + matrix[1][2] * linearB;
    const z =
      matrix[2][0] * linearR + matrix[2][1] * linearG + matrix[2][2] * linearB;
    const whitePoint = WHITE_POINT_D65;
    const xNormalized = x / whitePoint[0];
    const yNormalized = y / whitePoint[1];
    const zNormalized = z / whitePoint[2];
    const fx = labF(xNormalized);
    const fy = labF(yNormalized);
    const fz = labF(zNormalized);
    const l = 116 * fy - 16;
    const a = 500 * (fx - fy);
    const b = 200 * (fy - fz);
    return [l, a, b];
  }
  function argbFromLstar(lstar) {
    const y = yFromLstar(lstar);
    const component = delinearized(y);
    return argbFromRgb(component, component, component);
  }
  function lstarFromArgb(argb) {
    const y = xyzFromArgb(argb)[1];
    return 116 * labF(y / 100) - 16;
  }
  function yFromLstar(lstar) {
    return 100 * labInvf((lstar + 16) / 116);
  }
  function lstarFromY(y) {
    return labF(y / 100) * 116 - 16;
  }
  function linearized(rgbComponent) {
    const normalized = rgbComponent / 255;
    if (normalized <= 0.040449936) {
      return (normalized / 12.92) * 100;
    } else {
      return Math.pow((normalized + 0.055) / 1.055, 2.4) * 100;
    }
  }
  function delinearized(rgbComponent) {
    const normalized = rgbComponent / 100;
    let delinearized2 = 0;
    if (normalized <= 31308e-7) {
      delinearized2 = normalized * 12.92;
    } else {
      delinearized2 = 1.055 * Math.pow(normalized, 1 / 2.4) - 0.055;
    }
    return clampInt(0, 255, Math.round(delinearized2 * 255));
  }
  function whitePointD65() {
    return WHITE_POINT_D65;
  }
  function labF(t) {
    const e = 216 / 24389;
    const kappa = 24389 / 27;
    if (t > e) {
      return Math.pow(t, 1 / 3);
    } else {
      return (kappa * t + 16) / 116;
    }
  }
  function labInvf(ft) {
    const e = 216 / 24389;
    const kappa = 24389 / 27;
    const ft3 = ft * ft * ft;
    if (ft3 > e) {
      return ft3;
    } else {
      return (116 * ft - 16) / kappa;
    }
  }

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/hct/viewing_conditions.js
  var ViewingConditions = class _ViewingConditions {
    /**
     * Create ViewingConditions from a simple, physically relevant, set of
     * parameters.
     *
     * @param whitePoint White point, measured in the XYZ color space.
     *     default = D65, or sunny day afternoon
     * @param adaptingLuminance The luminance of the adapting field. Informally,
     *     how bright it is in the room where the color is viewed. Can be
     *     calculated from lux by multiplying lux by 0.0586. default = 11.72,
     *     or 200 lux.
     * @param backgroundLstar The lightness of the area surrounding the color.
     *     measured by L* in L*a*b*. default = 50.0
     * @param surround A general description of the lighting surrounding the
     *     color. 0 is pitch dark, like watching a movie in a theater. 1.0 is a
     *     dimly light room, like watching TV at home at night. 2.0 means there
     *     is no difference between the lighting on the color and around it.
     *     default = 2.0
     * @param discountingIlluminant Whether the eye accounts for the tint of the
     *     ambient lighting, such as knowing an apple is still red in green light.
     *     default = false, the eye does not perform this process on
     *       self-luminous objects like displays.
     */
    static make(
      whitePoint = whitePointD65(),
      adaptingLuminance = ((200 / Math.PI) * yFromLstar(50)) / 100,
      backgroundLstar = 50,
      surround = 2,
      discountingIlluminant = false,
    ) {
      const xyz = whitePoint;
      const rW = xyz[0] * 0.401288 + xyz[1] * 0.650173 + xyz[2] * -0.051461;
      const gW = xyz[0] * -0.250268 + xyz[1] * 1.204414 + xyz[2] * 0.045854;
      const bW = xyz[0] * -2079e-6 + xyz[1] * 0.048952 + xyz[2] * 0.953127;
      const f = 0.8 + surround / 10;
      const c =
        f >= 0.9
          ? lerp(0.59, 0.69, (f - 0.9) * 10)
          : lerp(0.525, 0.59, (f - 0.8) * 10);
      let d = discountingIlluminant
        ? 1
        : f * (1 - (1 / 3.6) * Math.exp((-adaptingLuminance - 42) / 92));
      d = d > 1 ? 1 : d < 0 ? 0 : d;
      const nc = f;
      const rgbD = [
        d * (100 / rW) + 1 - d,
        d * (100 / gW) + 1 - d,
        d * (100 / bW) + 1 - d,
      ];
      const k = 1 / (5 * adaptingLuminance + 1);
      const k4 = k * k * k * k;
      const k4F = 1 - k4;
      const fl =
        k4 * adaptingLuminance +
        0.1 * k4F * k4F * Math.cbrt(5 * adaptingLuminance);
      const n = yFromLstar(backgroundLstar) / whitePoint[1];
      const z = 1.48 + Math.sqrt(n);
      const nbb = 0.725 / Math.pow(n, 0.2);
      const ncb = nbb;
      const rgbAFactors = [
        Math.pow((fl * rgbD[0] * rW) / 100, 0.42),
        Math.pow((fl * rgbD[1] * gW) / 100, 0.42),
        Math.pow((fl * rgbD[2] * bW) / 100, 0.42),
      ];
      const rgbA = [
        (400 * rgbAFactors[0]) / (rgbAFactors[0] + 27.13),
        (400 * rgbAFactors[1]) / (rgbAFactors[1] + 27.13),
        (400 * rgbAFactors[2]) / (rgbAFactors[2] + 27.13),
      ];
      const aw = (2 * rgbA[0] + rgbA[1] + 0.05 * rgbA[2]) * nbb;
      return new _ViewingConditions(
        n,
        aw,
        nbb,
        ncb,
        c,
        nc,
        rgbD,
        fl,
        Math.pow(fl, 0.25),
        z,
      );
    }
    /**
     * Parameters are intermediate values of the CAM16 conversion process. Their
     * names are shorthand for technical color science terminology, this class
     * would not benefit from documenting them individually. A brief overview
     * is available in the CAM16 specification, and a complete overview requires
     * a color science textbook, such as Fairchild's Color Appearance Models.
     */
    constructor(n, aw, nbb, ncb, c, nc, rgbD, fl, fLRoot, z) {
      this.n = n;
      this.aw = aw;
      this.nbb = nbb;
      this.ncb = ncb;
      this.c = c;
      this.nc = nc;
      this.rgbD = rgbD;
      this.fl = fl;
      this.fLRoot = fLRoot;
      this.z = z;
    }
  };
  ViewingConditions.DEFAULT = ViewingConditions.make();

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/hct/cam16.js
  var Cam16 = class _Cam16 {
    /**
     * All of the CAM16 dimensions can be calculated from 3 of the dimensions, in
     * the following combinations:
     *      -  {j or q} and {c, m, or s} and hue
     *      - jstar, astar, bstar
     * Prefer using a static method that constructs from 3 of those dimensions.
     * This constructor is intended for those methods to use to return all
     * possible dimensions.
     *
     * @param hue
     * @param chroma informally, colorfulness / color intensity. like saturation
     *     in HSL, except perceptually accurate.
     * @param j lightness
     * @param q brightness; ratio of lightness to white point's lightness
     * @param m colorfulness
     * @param s saturation; ratio of chroma to white point's chroma
     * @param jstar CAM16-UCS J coordinate
     * @param astar CAM16-UCS a coordinate
     * @param bstar CAM16-UCS b coordinate
     */
    constructor(hue, chroma, j, q, m, s, jstar, astar, bstar) {
      this.hue = hue;
      this.chroma = chroma;
      this.j = j;
      this.q = q;
      this.m = m;
      this.s = s;
      this.jstar = jstar;
      this.astar = astar;
      this.bstar = bstar;
    }
    /**
     * CAM16 instances also have coordinates in the CAM16-UCS space, called J*,
     * a*, b*, or jstar, astar, bstar in code. CAM16-UCS is included in the CAM16
     * specification, and is used to measure distances between colors.
     */
    distance(other) {
      const dJ = this.jstar - other.jstar;
      const dA = this.astar - other.astar;
      const dB = this.bstar - other.bstar;
      const dEPrime = Math.sqrt(dJ * dJ + dA * dA + dB * dB);
      const dE = 1.41 * Math.pow(dEPrime, 0.63);
      return dE;
    }
    /**
     * @param argb ARGB representation of a color.
     * @return CAM16 color, assuming the color was viewed in default viewing
     *     conditions.
     */
    static fromInt(argb) {
      return _Cam16.fromIntInViewingConditions(argb, ViewingConditions.DEFAULT);
    }
    /**
     * @param argb ARGB representation of a color.
     * @param viewingConditions Information about the environment where the color
     *     was observed.
     * @return CAM16 color.
     */
    static fromIntInViewingConditions(argb, viewingConditions) {
      const red = (argb & 16711680) >> 16;
      const green = (argb & 65280) >> 8;
      const blue = argb & 255;
      const redL = linearized(red);
      const greenL = linearized(green);
      const blueL = linearized(blue);
      const x = 0.41233895 * redL + 0.35762064 * greenL + 0.18051042 * blueL;
      const y = 0.2126 * redL + 0.7152 * greenL + 0.0722 * blueL;
      const z = 0.01932141 * redL + 0.11916382 * greenL + 0.95034478 * blueL;
      const rC = 0.401288 * x + 0.650173 * y - 0.051461 * z;
      const gC = -0.250268 * x + 1.204414 * y + 0.045854 * z;
      const bC = -2079e-6 * x + 0.048952 * y + 0.953127 * z;
      const rD = viewingConditions.rgbD[0] * rC;
      const gD = viewingConditions.rgbD[1] * gC;
      const bD = viewingConditions.rgbD[2] * bC;
      const rAF = Math.pow((viewingConditions.fl * Math.abs(rD)) / 100, 0.42);
      const gAF = Math.pow((viewingConditions.fl * Math.abs(gD)) / 100, 0.42);
      const bAF = Math.pow((viewingConditions.fl * Math.abs(bD)) / 100, 0.42);
      const rA = (signum(rD) * 400 * rAF) / (rAF + 27.13);
      const gA = (signum(gD) * 400 * gAF) / (gAF + 27.13);
      const bA = (signum(bD) * 400 * bAF) / (bAF + 27.13);
      const a = (11 * rA + -12 * gA + bA) / 11;
      const b = (rA + gA - 2 * bA) / 9;
      const u = (20 * rA + 20 * gA + 21 * bA) / 20;
      const p2 = (40 * rA + 20 * gA + bA) / 20;
      const atan2 = Math.atan2(b, a);
      const atanDegrees = (atan2 * 180) / Math.PI;
      const hue =
        atanDegrees < 0
          ? atanDegrees + 360
          : atanDegrees >= 360
            ? atanDegrees - 360
            : atanDegrees;
      const hueRadians = (hue * Math.PI) / 180;
      const ac = p2 * viewingConditions.nbb;
      const j =
        100 *
        Math.pow(
          ac / viewingConditions.aw,
          viewingConditions.c * viewingConditions.z,
        );
      const q =
        (4 / viewingConditions.c) *
        Math.sqrt(j / 100) *
        (viewingConditions.aw + 4) *
        viewingConditions.fLRoot;
      const huePrime = hue < 20.14 ? hue + 360 : hue;
      const eHue = 0.25 * (Math.cos((huePrime * Math.PI) / 180 + 2) + 3.8);
      const p1 =
        (5e4 / 13) * eHue * viewingConditions.nc * viewingConditions.ncb;
      const t = (p1 * Math.sqrt(a * a + b * b)) / (u + 0.305);
      const alpha =
        Math.pow(t, 0.9) *
        Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73);
      const c = alpha * Math.sqrt(j / 100);
      const m = c * viewingConditions.fLRoot;
      const s =
        50 *
        Math.sqrt((alpha * viewingConditions.c) / (viewingConditions.aw + 4));
      const jstar = ((1 + 100 * 7e-3) * j) / (1 + 7e-3 * j);
      const mstar = (1 / 0.0228) * Math.log(1 + 0.0228 * m);
      const astar = mstar * Math.cos(hueRadians);
      const bstar = mstar * Math.sin(hueRadians);
      return new _Cam16(hue, c, j, q, m, s, jstar, astar, bstar);
    }
    /**
     * @param j CAM16 lightness
     * @param c CAM16 chroma
     * @param h CAM16 hue
     */
    static fromJch(j, c, h) {
      return _Cam16.fromJchInViewingConditions(
        j,
        c,
        h,
        ViewingConditions.DEFAULT,
      );
    }
    /**
     * @param j CAM16 lightness
     * @param c CAM16 chroma
     * @param h CAM16 hue
     * @param viewingConditions Information about the environment where the color
     *     was observed.
     */
    static fromJchInViewingConditions(j, c, h, viewingConditions) {
      const q =
        (4 / viewingConditions.c) *
        Math.sqrt(j / 100) *
        (viewingConditions.aw + 4) *
        viewingConditions.fLRoot;
      const m = c * viewingConditions.fLRoot;
      const alpha = c / Math.sqrt(j / 100);
      const s =
        50 *
        Math.sqrt((alpha * viewingConditions.c) / (viewingConditions.aw + 4));
      const hueRadians = (h * Math.PI) / 180;
      const jstar = ((1 + 100 * 7e-3) * j) / (1 + 7e-3 * j);
      const mstar = (1 / 0.0228) * Math.log(1 + 0.0228 * m);
      const astar = mstar * Math.cos(hueRadians);
      const bstar = mstar * Math.sin(hueRadians);
      return new _Cam16(h, c, j, q, m, s, jstar, astar, bstar);
    }
    /**
     * @param jstar CAM16-UCS lightness.
     * @param astar CAM16-UCS a dimension. Like a* in L*a*b*, it is a Cartesian
     *     coordinate on the Y axis.
     * @param bstar CAM16-UCS b dimension. Like a* in L*a*b*, it is a Cartesian
     *     coordinate on the X axis.
     */
    static fromUcs(jstar, astar, bstar) {
      return _Cam16.fromUcsInViewingConditions(
        jstar,
        astar,
        bstar,
        ViewingConditions.DEFAULT,
      );
    }
    /**
     * @param jstar CAM16-UCS lightness.
     * @param astar CAM16-UCS a dimension. Like a* in L*a*b*, it is a Cartesian
     *     coordinate on the Y axis.
     * @param bstar CAM16-UCS b dimension. Like a* in L*a*b*, it is a Cartesian
     *     coordinate on the X axis.
     * @param viewingConditions Information about the environment where the color
     *     was observed.
     */
    static fromUcsInViewingConditions(jstar, astar, bstar, viewingConditions) {
      const a = astar;
      const b = bstar;
      const m = Math.sqrt(a * a + b * b);
      const M = (Math.exp(m * 0.0228) - 1) / 0.0228;
      const c = M / viewingConditions.fLRoot;
      let h = Math.atan2(b, a) * (180 / Math.PI);
      if (h < 0) {
        h += 360;
      }
      const j = jstar / (1 - (jstar - 100) * 7e-3);
      return _Cam16.fromJchInViewingConditions(j, c, h, viewingConditions);
    }
    /**
     *  @return ARGB representation of color, assuming the color was viewed in
     *     default viewing conditions, which are near-identical to the default
     *     viewing conditions for sRGB.
     */
    toInt() {
      return this.viewed(ViewingConditions.DEFAULT);
    }
    /**
     * @param viewingConditions Information about the environment where the color
     *     will be viewed.
     * @return ARGB representation of color
     */
    viewed(viewingConditions) {
      const alpha =
        this.chroma === 0 || this.j === 0
          ? 0
          : this.chroma / Math.sqrt(this.j / 100);
      const t = Math.pow(
        alpha / Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73),
        1 / 0.9,
      );
      const hRad = (this.hue * Math.PI) / 180;
      const eHue = 0.25 * (Math.cos(hRad + 2) + 3.8);
      const ac =
        viewingConditions.aw *
        Math.pow(this.j / 100, 1 / viewingConditions.c / viewingConditions.z);
      const p1 =
        eHue * (5e4 / 13) * viewingConditions.nc * viewingConditions.ncb;
      const p2 = ac / viewingConditions.nbb;
      const hSin = Math.sin(hRad);
      const hCos = Math.cos(hRad);
      const gamma =
        (23 * (p2 + 0.305) * t) / (23 * p1 + 11 * t * hCos + 108 * t * hSin);
      const a = gamma * hCos;
      const b = gamma * hSin;
      const rA = (460 * p2 + 451 * a + 288 * b) / 1403;
      const gA = (460 * p2 - 891 * a - 261 * b) / 1403;
      const bA = (460 * p2 - 220 * a - 6300 * b) / 1403;
      const rCBase = Math.max(0, (27.13 * Math.abs(rA)) / (400 - Math.abs(rA)));
      const rC =
        signum(rA) * (100 / viewingConditions.fl) * Math.pow(rCBase, 1 / 0.42);
      const gCBase = Math.max(0, (27.13 * Math.abs(gA)) / (400 - Math.abs(gA)));
      const gC =
        signum(gA) * (100 / viewingConditions.fl) * Math.pow(gCBase, 1 / 0.42);
      const bCBase = Math.max(0, (27.13 * Math.abs(bA)) / (400 - Math.abs(bA)));
      const bC =
        signum(bA) * (100 / viewingConditions.fl) * Math.pow(bCBase, 1 / 0.42);
      const rF = rC / viewingConditions.rgbD[0];
      const gF = gC / viewingConditions.rgbD[1];
      const bF = bC / viewingConditions.rgbD[2];
      const x = 1.86206786 * rF - 1.01125463 * gF + 0.14918677 * bF;
      const y = 0.38752654 * rF + 0.62144744 * gF - 897398e-8 * bF;
      const z = -0.0158415 * rF - 0.03412294 * gF + 1.04996444 * bF;
      const argb = argbFromXyz(x, y, z);
      return argb;
    }
    /// Given color expressed in XYZ and viewed in [viewingConditions], convert to
    /// CAM16.
    static fromXyzInViewingConditions(x, y, z, viewingConditions) {
      const rC = 0.401288 * x + 0.650173 * y - 0.051461 * z;
      const gC = -0.250268 * x + 1.204414 * y + 0.045854 * z;
      const bC = -2079e-6 * x + 0.048952 * y + 0.953127 * z;
      const rD = viewingConditions.rgbD[0] * rC;
      const gD = viewingConditions.rgbD[1] * gC;
      const bD = viewingConditions.rgbD[2] * bC;
      const rAF = Math.pow((viewingConditions.fl * Math.abs(rD)) / 100, 0.42);
      const gAF = Math.pow((viewingConditions.fl * Math.abs(gD)) / 100, 0.42);
      const bAF = Math.pow((viewingConditions.fl * Math.abs(bD)) / 100, 0.42);
      const rA = (signum(rD) * 400 * rAF) / (rAF + 27.13);
      const gA = (signum(gD) * 400 * gAF) / (gAF + 27.13);
      const bA = (signum(bD) * 400 * bAF) / (bAF + 27.13);
      const a = (11 * rA + -12 * gA + bA) / 11;
      const b = (rA + gA - 2 * bA) / 9;
      const u = (20 * rA + 20 * gA + 21 * bA) / 20;
      const p2 = (40 * rA + 20 * gA + bA) / 20;
      const atan2 = Math.atan2(b, a);
      const atanDegrees = (atan2 * 180) / Math.PI;
      const hue =
        atanDegrees < 0
          ? atanDegrees + 360
          : atanDegrees >= 360
            ? atanDegrees - 360
            : atanDegrees;
      const hueRadians = (hue * Math.PI) / 180;
      const ac = p2 * viewingConditions.nbb;
      const J =
        100 *
        Math.pow(
          ac / viewingConditions.aw,
          viewingConditions.c * viewingConditions.z,
        );
      const Q =
        (4 / viewingConditions.c) *
        Math.sqrt(J / 100) *
        (viewingConditions.aw + 4) *
        viewingConditions.fLRoot;
      const huePrime = hue < 20.14 ? hue + 360 : hue;
      const eHue = (1 / 4) * (Math.cos((huePrime * Math.PI) / 180 + 2) + 3.8);
      const p1 =
        (5e4 / 13) * eHue * viewingConditions.nc * viewingConditions.ncb;
      const t = (p1 * Math.sqrt(a * a + b * b)) / (u + 0.305);
      const alpha =
        Math.pow(t, 0.9) *
        Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73);
      const C = alpha * Math.sqrt(J / 100);
      const M = C * viewingConditions.fLRoot;
      const s =
        50 *
        Math.sqrt((alpha * viewingConditions.c) / (viewingConditions.aw + 4));
      const jstar = ((1 + 100 * 7e-3) * J) / (1 + 7e-3 * J);
      const mstar = Math.log(1 + 0.0228 * M) / 0.0228;
      const astar = mstar * Math.cos(hueRadians);
      const bstar = mstar * Math.sin(hueRadians);
      return new _Cam16(hue, C, J, Q, M, s, jstar, astar, bstar);
    }
    /// XYZ representation of CAM16 seen in [viewingConditions].
    xyzInViewingConditions(viewingConditions) {
      const alpha =
        this.chroma === 0 || this.j === 0
          ? 0
          : this.chroma / Math.sqrt(this.j / 100);
      const t = Math.pow(
        alpha / Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73),
        1 / 0.9,
      );
      const hRad = (this.hue * Math.PI) / 180;
      const eHue = 0.25 * (Math.cos(hRad + 2) + 3.8);
      const ac =
        viewingConditions.aw *
        Math.pow(this.j / 100, 1 / viewingConditions.c / viewingConditions.z);
      const p1 =
        eHue * (5e4 / 13) * viewingConditions.nc * viewingConditions.ncb;
      const p2 = ac / viewingConditions.nbb;
      const hSin = Math.sin(hRad);
      const hCos = Math.cos(hRad);
      const gamma =
        (23 * (p2 + 0.305) * t) / (23 * p1 + 11 * t * hCos + 108 * t * hSin);
      const a = gamma * hCos;
      const b = gamma * hSin;
      const rA = (460 * p2 + 451 * a + 288 * b) / 1403;
      const gA = (460 * p2 - 891 * a - 261 * b) / 1403;
      const bA = (460 * p2 - 220 * a - 6300 * b) / 1403;
      const rCBase = Math.max(0, (27.13 * Math.abs(rA)) / (400 - Math.abs(rA)));
      const rC =
        signum(rA) * (100 / viewingConditions.fl) * Math.pow(rCBase, 1 / 0.42);
      const gCBase = Math.max(0, (27.13 * Math.abs(gA)) / (400 - Math.abs(gA)));
      const gC =
        signum(gA) * (100 / viewingConditions.fl) * Math.pow(gCBase, 1 / 0.42);
      const bCBase = Math.max(0, (27.13 * Math.abs(bA)) / (400 - Math.abs(bA)));
      const bC =
        signum(bA) * (100 / viewingConditions.fl) * Math.pow(bCBase, 1 / 0.42);
      const rF = rC / viewingConditions.rgbD[0];
      const gF = gC / viewingConditions.rgbD[1];
      const bF = bC / viewingConditions.rgbD[2];
      const x = 1.86206786 * rF - 1.01125463 * gF + 0.14918677 * bF;
      const y = 0.38752654 * rF + 0.62144744 * gF - 897398e-8 * bF;
      const z = -0.0158415 * rF - 0.03412294 * gF + 1.04996444 * bF;
      return [x, y, z];
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/hct/hct_solver.js
  var HctSolver = class _HctSolver {
    /**
     * Sanitizes a small enough angle in radians.
     *
     * @param angle An angle in radians; must not deviate too much
     * from 0.
     * @return A coterminal angle between 0 and 2pi.
     */
    static sanitizeRadians(angle) {
      return (angle + Math.PI * 8) % (Math.PI * 2);
    }
    /**
     * Delinearizes an RGB component, returning a floating-point
     * number.
     *
     * @param rgbComponent 0.0 <= rgb_component <= 100.0, represents
     * linear R/G/B channel
     * @return 0.0 <= output <= 255.0, color channel converted to
     * regular RGB space
     */
    static trueDelinearized(rgbComponent) {
      const normalized = rgbComponent / 100;
      let delinearized2 = 0;
      if (normalized <= 31308e-7) {
        delinearized2 = normalized * 12.92;
      } else {
        delinearized2 = 1.055 * Math.pow(normalized, 1 / 2.4) - 0.055;
      }
      return delinearized2 * 255;
    }
    static chromaticAdaptation(component) {
      const af = Math.pow(Math.abs(component), 0.42);
      return (signum(component) * 400 * af) / (af + 27.13);
    }
    /**
     * Returns the hue of a linear RGB color in CAM16.
     *
     * @param linrgb The linear RGB coordinates of a color.
     * @return The hue of the color in CAM16, in radians.
     */
    static hueOf(linrgb) {
      const scaledDiscount = matrixMultiply(
        linrgb,
        _HctSolver.SCALED_DISCOUNT_FROM_LINRGB,
      );
      const rA = _HctSolver.chromaticAdaptation(scaledDiscount[0]);
      const gA = _HctSolver.chromaticAdaptation(scaledDiscount[1]);
      const bA = _HctSolver.chromaticAdaptation(scaledDiscount[2]);
      const a = (11 * rA + -12 * gA + bA) / 11;
      const b = (rA + gA - 2 * bA) / 9;
      return Math.atan2(b, a);
    }
    static areInCyclicOrder(a, b, c) {
      const deltaAB = _HctSolver.sanitizeRadians(b - a);
      const deltaAC = _HctSolver.sanitizeRadians(c - a);
      return deltaAB < deltaAC;
    }
    /**
     * Solves the lerp equation.
     *
     * @param source The starting number.
     * @param mid The number in the middle.
     * @param target The ending number.
     * @return A number t such that lerp(source, target, t) = mid.
     */
    static intercept(source, mid, target) {
      return (mid - source) / (target - source);
    }
    static lerpPoint(source, t, target) {
      return [
        source[0] + (target[0] - source[0]) * t,
        source[1] + (target[1] - source[1]) * t,
        source[2] + (target[2] - source[2]) * t,
      ];
    }
    /**
     * Intersects a segment with a plane.
     *
     * @param source The coordinates of point A.
     * @param coordinate The R-, G-, or B-coordinate of the plane.
     * @param target The coordinates of point B.
     * @param axis The axis the plane is perpendicular with. (0: R, 1:
     * G, 2: B)
     * @return The intersection point of the segment AB with the plane
     * R=coordinate, G=coordinate, or B=coordinate
     */
    static setCoordinate(source, coordinate, target, axis) {
      const t = _HctSolver.intercept(source[axis], coordinate, target[axis]);
      return _HctSolver.lerpPoint(source, t, target);
    }
    static isBounded(x) {
      return 0 <= x && x <= 100;
    }
    /**
     * Returns the nth possible vertex of the polygonal intersection.
     *
     * @param y The Y value of the plane.
     * @param n The zero-based index of the point. 0 <= n <= 11.
     * @return The nth possible vertex of the polygonal intersection
     * of the y plane and the RGB cube, in linear RGB coordinates, if
     * it exists. If this possible vertex lies outside of the cube,
     * [-1.0, -1.0, -1.0] is returned.
     */
    static nthVertex(y, n) {
      const kR = _HctSolver.Y_FROM_LINRGB[0];
      const kG = _HctSolver.Y_FROM_LINRGB[1];
      const kB = _HctSolver.Y_FROM_LINRGB[2];
      const coordA = n % 4 <= 1 ? 0 : 100;
      const coordB = n % 2 === 0 ? 0 : 100;
      if (n < 4) {
        const g = coordA;
        const b = coordB;
        const r = (y - g * kG - b * kB) / kR;
        if (_HctSolver.isBounded(r)) {
          return [r, g, b];
        } else {
          return [-1, -1, -1];
        }
      } else if (n < 8) {
        const b = coordA;
        const r = coordB;
        const g = (y - r * kR - b * kB) / kG;
        if (_HctSolver.isBounded(g)) {
          return [r, g, b];
        } else {
          return [-1, -1, -1];
        }
      } else {
        const r = coordA;
        const g = coordB;
        const b = (y - r * kR - g * kG) / kB;
        if (_HctSolver.isBounded(b)) {
          return [r, g, b];
        } else {
          return [-1, -1, -1];
        }
      }
    }
    /**
     * Finds the segment containing the desired color.
     *
     * @param y The Y value of the color.
     * @param targetHue The hue of the color.
     * @return A list of two sets of linear RGB coordinates, each
     * corresponding to an endpoint of the segment containing the
     * desired color.
     */
    static bisectToSegment(y, targetHue) {
      let left = [-1, -1, -1];
      let right = left;
      let leftHue = 0;
      let rightHue = 0;
      let initialized = false;
      let uncut = true;
      for (let n = 0; n < 12; n++) {
        const mid = _HctSolver.nthVertex(y, n);
        if (mid[0] < 0) {
          continue;
        }
        const midHue = _HctSolver.hueOf(mid);
        if (!initialized) {
          left = mid;
          right = mid;
          leftHue = midHue;
          rightHue = midHue;
          initialized = true;
          continue;
        }
        if (uncut || _HctSolver.areInCyclicOrder(leftHue, midHue, rightHue)) {
          uncut = false;
          if (_HctSolver.areInCyclicOrder(leftHue, targetHue, midHue)) {
            right = mid;
            rightHue = midHue;
          } else {
            left = mid;
            leftHue = midHue;
          }
        }
      }
      return [left, right];
    }
    static midpoint(a, b) {
      return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
    }
    static criticalPlaneBelow(x) {
      return Math.floor(x - 0.5);
    }
    static criticalPlaneAbove(x) {
      return Math.ceil(x - 0.5);
    }
    /**
     * Finds a color with the given Y and hue on the boundary of the
     * cube.
     *
     * @param y The Y value of the color.
     * @param targetHue The hue of the color.
     * @return The desired color, in linear RGB coordinates.
     */
    static bisectToLimit(y, targetHue) {
      const segment = _HctSolver.bisectToSegment(y, targetHue);
      let left = segment[0];
      let leftHue = _HctSolver.hueOf(left);
      let right = segment[1];
      for (let axis = 0; axis < 3; axis++) {
        if (left[axis] !== right[axis]) {
          let lPlane = -1;
          let rPlane = 255;
          if (left[axis] < right[axis]) {
            lPlane = _HctSolver.criticalPlaneBelow(
              _HctSolver.trueDelinearized(left[axis]),
            );
            rPlane = _HctSolver.criticalPlaneAbove(
              _HctSolver.trueDelinearized(right[axis]),
            );
          } else {
            lPlane = _HctSolver.criticalPlaneAbove(
              _HctSolver.trueDelinearized(left[axis]),
            );
            rPlane = _HctSolver.criticalPlaneBelow(
              _HctSolver.trueDelinearized(right[axis]),
            );
          }
          for (let i = 0; i < 8; i++) {
            if (Math.abs(rPlane - lPlane) <= 1) {
              break;
            } else {
              const mPlane = Math.floor((lPlane + rPlane) / 2);
              const midPlaneCoordinate = _HctSolver.CRITICAL_PLANES[mPlane];
              const mid = _HctSolver.setCoordinate(
                left,
                midPlaneCoordinate,
                right,
                axis,
              );
              const midHue = _HctSolver.hueOf(mid);
              if (_HctSolver.areInCyclicOrder(leftHue, targetHue, midHue)) {
                right = mid;
                rPlane = mPlane;
              } else {
                left = mid;
                leftHue = midHue;
                lPlane = mPlane;
              }
            }
          }
        }
      }
      return _HctSolver.midpoint(left, right);
    }
    static inverseChromaticAdaptation(adapted) {
      const adaptedAbs = Math.abs(adapted);
      const base = Math.max(0, (27.13 * adaptedAbs) / (400 - adaptedAbs));
      return signum(adapted) * Math.pow(base, 1 / 0.42);
    }
    /**
     * Finds a color with the given hue, chroma, and Y.
     *
     * @param hueRadians The desired hue in radians.
     * @param chroma The desired chroma.
     * @param y The desired Y.
     * @return The desired color as a hexadecimal integer, if found; 0
     * otherwise.
     */
    static findResultByJ(hueRadians, chroma, y) {
      let j = Math.sqrt(y) * 11;
      const viewingConditions = ViewingConditions.DEFAULT;
      const tInnerCoeff =
        1 / Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73);
      const eHue = 0.25 * (Math.cos(hueRadians + 2) + 3.8);
      const p1 =
        eHue * (5e4 / 13) * viewingConditions.nc * viewingConditions.ncb;
      const hSin = Math.sin(hueRadians);
      const hCos = Math.cos(hueRadians);
      for (let iterationRound = 0; iterationRound < 5; iterationRound++) {
        const jNormalized = j / 100;
        const alpha =
          chroma === 0 || j === 0 ? 0 : chroma / Math.sqrt(jNormalized);
        const t = Math.pow(alpha * tInnerCoeff, 1 / 0.9);
        const ac =
          viewingConditions.aw *
          Math.pow(jNormalized, 1 / viewingConditions.c / viewingConditions.z);
        const p2 = ac / viewingConditions.nbb;
        const gamma =
          (23 * (p2 + 0.305) * t) / (23 * p1 + 11 * t * hCos + 108 * t * hSin);
        const a = gamma * hCos;
        const b = gamma * hSin;
        const rA = (460 * p2 + 451 * a + 288 * b) / 1403;
        const gA = (460 * p2 - 891 * a - 261 * b) / 1403;
        const bA = (460 * p2 - 220 * a - 6300 * b) / 1403;
        const rCScaled = _HctSolver.inverseChromaticAdaptation(rA);
        const gCScaled = _HctSolver.inverseChromaticAdaptation(gA);
        const bCScaled = _HctSolver.inverseChromaticAdaptation(bA);
        const linrgb = matrixMultiply(
          [rCScaled, gCScaled, bCScaled],
          _HctSolver.LINRGB_FROM_SCALED_DISCOUNT,
        );
        if (linrgb[0] < 0 || linrgb[1] < 0 || linrgb[2] < 0) {
          return 0;
        }
        const kR = _HctSolver.Y_FROM_LINRGB[0];
        const kG = _HctSolver.Y_FROM_LINRGB[1];
        const kB = _HctSolver.Y_FROM_LINRGB[2];
        const fnj = kR * linrgb[0] + kG * linrgb[1] + kB * linrgb[2];
        if (fnj <= 0) {
          return 0;
        }
        if (iterationRound === 4 || Math.abs(fnj - y) < 2e-3) {
          if (linrgb[0] > 100.01 || linrgb[1] > 100.01 || linrgb[2] > 100.01) {
            return 0;
          }
          return argbFromLinrgb(linrgb);
        }
        j = j - ((fnj - y) * j) / (2 * fnj);
      }
      return 0;
    }
    /**
     * Finds an sRGB color with the given hue, chroma, and L*, if
     * possible.
     *
     * @param hueDegrees The desired hue, in degrees.
     * @param chroma The desired chroma.
     * @param lstar The desired L*.
     * @return A hexadecimal representing the sRGB color. The color
     * has sufficiently close hue, chroma, and L* to the desired
     * values, if possible; otherwise, the hue and L* will be
     * sufficiently close, and chroma will be maximized.
     */
    static solveToInt(hueDegrees, chroma, lstar) {
      if (chroma < 1e-4 || lstar < 1e-4 || lstar > 99.9999) {
        return argbFromLstar(lstar);
      }
      hueDegrees = sanitizeDegreesDouble(hueDegrees);
      const hueRadians = (hueDegrees / 180) * Math.PI;
      const y = yFromLstar(lstar);
      const exactAnswer = _HctSolver.findResultByJ(hueRadians, chroma, y);
      if (exactAnswer !== 0) {
        return exactAnswer;
      }
      const linrgb = _HctSolver.bisectToLimit(y, hueRadians);
      return argbFromLinrgb(linrgb);
    }
    /**
     * Finds an sRGB color with the given hue, chroma, and L*, if
     * possible.
     *
     * @param hueDegrees The desired hue, in degrees.
     * @param chroma The desired chroma.
     * @param lstar The desired L*.
     * @return An CAM16 object representing the sRGB color. The color
     * has sufficiently close hue, chroma, and L* to the desired
     * values, if possible; otherwise, the hue and L* will be
     * sufficiently close, and chroma will be maximized.
     */
    static solveToCam(hueDegrees, chroma, lstar) {
      return Cam16.fromInt(_HctSolver.solveToInt(hueDegrees, chroma, lstar));
    }
  };
  HctSolver.SCALED_DISCOUNT_FROM_LINRGB = [
    [0.001200833568784504, 0.002389694492170889, 2795742885861124e-19],
    [5891086651375999e-19, 0.0029785502573438758, 3270666104008398e-19],
    [10146692491640572e-20, 5364214359186694e-19, 0.0032979401770712076],
  ];
  HctSolver.LINRGB_FROM_SCALED_DISCOUNT = [
    [1373.2198709594231, -1100.4251190754821, -7.278681089101213],
    [-271.815969077903, 559.6580465940733, -32.46047482791194],
    [1.9622899599665666, -57.173814538844006, 308.7233197812385],
  ];
  HctSolver.Y_FROM_LINRGB = [0.2126, 0.7152, 0.0722];
  HctSolver.CRITICAL_PLANES = [
    0.015176349177441876, 0.045529047532325624, 0.07588174588720938,
    0.10623444424209313, 0.13658714259697685, 0.16693984095186062,
    0.19729253930674434, 0.2276452376616281, 0.2579979360165119,
    0.28835063437139563, 0.3188300904430532, 0.350925934958123,
    0.3848314933096426, 0.42057480301049466, 0.458183274052838,
    0.4976837250274023, 0.5391024159806381, 0.5824650784040898,
    0.6277969426914107, 0.6751227633498623, 0.7244668422128921,
    0.775853049866786, 0.829304845476233, 0.8848452951698498, 0.942497089126609,
    1.0022825574869039, 1.0642236851973577, 1.1283421258858297,
    1.1946592148522128, 1.2631959812511864, 1.3339731595349034,
    1.407011200216447, 1.4823302800086415, 1.5599503113873272,
    1.6398909516233677, 1.7221716113234105, 1.8068114625156377,
    1.8938294463134073, 1.9832442801866852, 2.075074464868551,
    2.1693382909216234, 2.2660538449872063, 2.36523901573795,
    2.4669114995532007, 2.5710888059345764, 2.6777882626779785,
    2.7870270208169257, 2.898822059350997, 3.0131901897720907,
    3.1301480604002863, 3.2497121605402226, 3.3718988244681087,
    3.4967242352587946, 3.624204428461639, 3.754355295633311, 3.887192587735158,
    4.022731918402185, 4.160988767090289, 4.301978482107941, 4.445716283538092,
    4.592217266055746, 4.741496401646282, 4.893568542229298, 5.048448422192488,
    5.20615066083972, 5.3666897647573375, 5.5300801301023865, 5.696336044816294,
    5.865471690767354, 6.037501145825082, 6.212438385869475, 6.390297286737924,
    6.571091626112461, 6.7548350853498045, 6.941541251256611, 7.131223617812143,
    7.323895587840543, 7.5195704746346665, 7.7182615035334345,
    7.919981813454504, 8.124744458384042, 8.332562408825165, 8.543448553206703,
    8.757415699253682, 8.974476575321063, 9.194643831691977, 9.417930041841839,
    9.644347703669503, 9.873909240696694, 10.106627003236781,
    10.342513269534024, 10.58158024687427, 10.8238400726681, 11.069304815507364,
    11.317986476196008, 11.569896988756009, 11.825048221409341,
    12.083451977536606, 12.345119996613247, 12.610063955123938,
    12.878295467455942, 13.149826086772048, 13.42466730586372,
    13.702830557985108, 13.984327217668513, 14.269168601521828,
    14.55736596900856, 14.848930523210871, 15.143873411576273,
    15.44220572664832, 15.743938506781891, 16.04908273684337, 16.35764934889634,
    16.66964922287304, 16.985093187232053, 17.30399201960269, 17.62635644741625,
    17.95219714852476, 18.281524751807332, 18.614349837764564,
    18.95068293910138, 19.290534541298456, 19.633915083172692,
    19.98083495742689, 20.331304511189067, 20.685334046541502,
    21.042933821039977, 21.404114048223256, 21.76888489811322,
    22.137256497705877, 22.50923893145328, 22.884842241736916,
    23.264076429332462, 23.6469514538663, 24.033477234264016, 24.42366364919083,
    24.817520537484558, 25.21505769858089, 25.61628489293138,
    26.021211842414342, 26.429848230738664, 26.842203703840827,
    27.258287870275353, 27.678110301598522, 28.10168053274597,
    28.529008062403893, 28.96010235337422, 29.39497283293396, 29.83362889318845,
    30.276079891419332, 30.722335150426627, 31.172403958865512,
    31.62629557157785, 32.08401920991837, 32.54558406207592, 33.010999283389665,
    33.4802739966603, 33.953417292456834, 34.430438229418264,
    34.911345834551085, 35.39614910352207, 35.88485700094671, 36.37747846067349,
    36.87402238606382, 37.37449765026789, 37.87891309649659, 38.38727753828926,
    38.89959975977785, 39.41588851594697, 39.93615253289054, 40.460400508064545,
    40.98864111053629, 41.520882981230194, 42.05713473317016,
    42.597404951718396, 43.141702194811224, 43.6900349931913, 44.24241185063697,
    44.798841244188324, 45.35933162437017, 45.92389141541209, 46.49252901546552,
    47.065252796817916, 47.64207110610409, 48.22299226451468,
    48.808024568002054, 49.3971762874833, 49.9904556690408, 50.587870934119984,
    51.189430279724725, 51.79514187861014, 52.40501387947288, 53.0190544071392,
    53.637271562750364, 54.259673423945976, 54.88626804504493,
    55.517063457223934, 56.15206766869424, 56.79128866487574, 57.43473440856916,
    58.08241284012621, 58.734331877617365, 59.39049941699807, 60.05092333227251,
    60.715611475655585, 61.38457167773311, 62.057811747619894, 62.7353394731159,
    63.417162620860914, 64.10328893648692, 64.79372614476921, 65.48848194977529,
    66.18756403501224, 66.89098006357258, 67.59873767827808, 68.31084450182222,
    69.02730813691093, 69.74813616640164, 70.47333615344107, 71.20291564160104,
    71.93688215501312, 72.67524319850172, 73.41800625771542, 74.16517879925733,
    74.9167682708136, 75.67278210128072, 76.43322770089146, 77.1981124613393,
    77.96744375590167, 78.74122893956174, 79.51947534912904, 80.30219030335869,
    81.08938110306934, 81.88105503125999, 82.67721935322541, 83.4778813166706,
    84.28304815182372, 85.09272707154808, 85.90692527145302, 86.72564993000343,
    87.54890820862819, 88.3767072518277, 89.2090541872801, 90.04595612594655,
    90.88742016217518, 91.73345337380438, 92.58406282226491, 93.43925555268066,
    94.29903859396902, 95.16341895893969, 96.03240364439274, 96.9059996312159,
    97.78421388448044, 98.6670533535366, 99.55452497210776,
  ];

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/hct/hct.js
  var Hct = class _Hct {
    static from(hue, chroma, tone) {
      return new _Hct(HctSolver.solveToInt(hue, chroma, tone));
    }
    /**
     * @param argb ARGB representation of a color.
     * @return HCT representation of a color in default viewing conditions
     */
    static fromInt(argb) {
      return new _Hct(argb);
    }
    toInt() {
      return this.argb;
    }
    /**
     * A number, in degrees, representing ex. red, orange, yellow, etc.
     * Ranges from 0 <= hue < 360.
     */
    get hue() {
      return this.internalHue;
    }
    /**
     * @param newHue 0 <= newHue < 360; invalid values are corrected.
     * Chroma may decrease because chroma has a different maximum for any given
     * hue and tone.
     */
    set hue(newHue) {
      this.setInternalState(
        HctSolver.solveToInt(newHue, this.internalChroma, this.internalTone),
      );
    }
    get chroma() {
      return this.internalChroma;
    }
    /**
     * @param newChroma 0 <= newChroma < ?
     * Chroma may decrease because chroma has a different maximum for any given
     * hue and tone.
     */
    set chroma(newChroma) {
      this.setInternalState(
        HctSolver.solveToInt(this.internalHue, newChroma, this.internalTone),
      );
    }
    /** Lightness. Ranges from 0 to 100. */
    get tone() {
      return this.internalTone;
    }
    /**
     * @param newTone 0 <= newTone <= 100; invalid valids are corrected.
     * Chroma may decrease because chroma has a different maximum for any given
     * hue and tone.
     */
    set tone(newTone) {
      this.setInternalState(
        HctSolver.solveToInt(this.internalHue, this.internalChroma, newTone),
      );
    }
    constructor(argb) {
      this.argb = argb;
      const cam = Cam16.fromInt(argb);
      this.internalHue = cam.hue;
      this.internalChroma = cam.chroma;
      this.internalTone = lstarFromArgb(argb);
      this.argb = argb;
    }
    setInternalState(argb) {
      const cam = Cam16.fromInt(argb);
      this.internalHue = cam.hue;
      this.internalChroma = cam.chroma;
      this.internalTone = lstarFromArgb(argb);
      this.argb = argb;
    }
    /**
     * Translates a color into different [ViewingConditions].
     *
     * Colors change appearance. They look different with lights on versus off,
     * the same color, as in hex code, on white looks different when on black.
     * This is called color relativity, most famously explicated by Josef Albers
     * in Interaction of Color.
     *
     * In color science, color appearance models can account for this and
     * calculate the appearance of a color in different settings. HCT is based on
     * CAM16, a color appearance model, and uses it to make these calculations.
     *
     * See [ViewingConditions.make] for parameters affecting color appearance.
     */
    inViewingConditions(vc) {
      const cam = Cam16.fromInt(this.toInt());
      const viewedInVc = cam.xyzInViewingConditions(vc);
      const recastInVc = Cam16.fromXyzInViewingConditions(
        viewedInVc[0],
        viewedInVc[1],
        viewedInVc[2],
        ViewingConditions.make(),
      );
      const recastHct = _Hct.from(
        recastInVc.hue,
        recastInVc.chroma,
        lstarFromY(viewedInVc[1]),
      );
      return recastHct;
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/blend/blend.js
  var Blend = class _Blend {
    /**
     * Blend the design color's HCT hue towards the key color's HCT
     * hue, in a way that leaves the original color recognizable and
     * recognizably shifted towards the key color.
     *
     * @param designColor ARGB representation of an arbitrary color.
     * @param sourceColor ARGB representation of the main theme color.
     * @return The design color with a hue shifted towards the
     * system's color, a slightly warmer/cooler variant of the design
     * color's hue.
     */
    static harmonize(designColor, sourceColor) {
      const fromHct = Hct.fromInt(designColor);
      const toHct = Hct.fromInt(sourceColor);
      const differenceDegrees2 = differenceDegrees(fromHct.hue, toHct.hue);
      const rotationDegrees = Math.min(differenceDegrees2 * 0.5, 15);
      const outputHue = sanitizeDegreesDouble(
        fromHct.hue +
          rotationDegrees * rotationDirection(fromHct.hue, toHct.hue),
      );
      return Hct.from(outputHue, fromHct.chroma, fromHct.tone).toInt();
    }
    /**
     * Blends hue from one color into another. The chroma and tone of
     * the original color are maintained.
     *
     * @param from ARGB representation of color
     * @param to ARGB representation of color
     * @param amount how much blending to perform; 0.0 >= and <= 1.0
     * @return from, with a hue blended towards to. Chroma and tone
     * are constant.
     */
    static hctHue(from, to, amount) {
      const ucs = _Blend.cam16Ucs(from, to, amount);
      const ucsCam = Cam16.fromInt(ucs);
      const fromCam = Cam16.fromInt(from);
      const blended = Hct.from(ucsCam.hue, fromCam.chroma, lstarFromArgb(from));
      return blended.toInt();
    }
    /**
     * Blend in CAM16-UCS space.
     *
     * @param from ARGB representation of color
     * @param to ARGB representation of color
     * @param amount how much blending to perform; 0.0 >= and <= 1.0
     * @return from, blended towards to. Hue, chroma, and tone will
     * change.
     */
    static cam16Ucs(from, to, amount) {
      const fromCam = Cam16.fromInt(from);
      const toCam = Cam16.fromInt(to);
      const fromJ = fromCam.jstar;
      const fromA = fromCam.astar;
      const fromB = fromCam.bstar;
      const toJ = toCam.jstar;
      const toA = toCam.astar;
      const toB = toCam.bstar;
      const jstar = fromJ + (toJ - fromJ) * amount;
      const astar = fromA + (toA - fromA) * amount;
      const bstar = fromB + (toB - fromB) * amount;
      return Cam16.fromUcs(jstar, astar, bstar).toInt();
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/contrast/contrast.js
  var Contrast = class _Contrast {
    /**
     * Returns a contrast ratio, which ranges from 1 to 21.
     *
     * @param toneA Tone between 0 and 100. Values outside will be clamped.
     * @param toneB Tone between 0 and 100. Values outside will be clamped.
     */
    static ratioOfTones(toneA, toneB) {
      toneA = clampDouble(0, 100, toneA);
      toneB = clampDouble(0, 100, toneB);
      return _Contrast.ratioOfYs(yFromLstar(toneA), yFromLstar(toneB));
    }
    static ratioOfYs(y1, y2) {
      const lighter = y1 > y2 ? y1 : y2;
      const darker = lighter === y2 ? y1 : y2;
      return (lighter + 5) / (darker + 5);
    }
    /**
     * Returns a tone >= tone parameter that ensures ratio parameter.
     * Return value is between 0 and 100.
     * Returns -1 if ratio cannot be achieved with tone parameter.
     *
     * @param tone Tone return value must contrast with.
     * Range is 0 to 100. Invalid values will result in -1 being returned.
     * @param ratio Contrast ratio of return value and tone.
     * Range is 1 to 21, invalid values have undefined behavior.
     */
    static lighter(tone, ratio) {
      if (tone < 0 || tone > 100) {
        return -1;
      }
      const darkY = yFromLstar(tone);
      const lightY = ratio * (darkY + 5) - 5;
      const realContrast = _Contrast.ratioOfYs(lightY, darkY);
      const delta = Math.abs(realContrast - ratio);
      if (realContrast < ratio && delta > 0.04) {
        return -1;
      }
      const returnValue = lstarFromY(lightY) + 0.4;
      if (returnValue < 0 || returnValue > 100) {
        return -1;
      }
      return returnValue;
    }
    /**
     * Returns a tone <= tone parameter that ensures ratio parameter.
     * Return value is between 0 and 100.
     * Returns -1 if ratio cannot be achieved with tone parameter.
     *
     * @param tone Tone return value must contrast with.
     * Range is 0 to 100. Invalid values will result in -1 being returned.
     * @param ratio Contrast ratio of return value and tone.
     * Range is 1 to 21, invalid values have undefined behavior.
     */
    static darker(tone, ratio) {
      if (tone < 0 || tone > 100) {
        return -1;
      }
      const lightY = yFromLstar(tone);
      const darkY = (lightY + 5) / ratio - 5;
      const realContrast = _Contrast.ratioOfYs(lightY, darkY);
      const delta = Math.abs(realContrast - ratio);
      if (realContrast < ratio && delta > 0.04) {
        return -1;
      }
      const returnValue = lstarFromY(darkY) - 0.4;
      if (returnValue < 0 || returnValue > 100) {
        return -1;
      }
      return returnValue;
    }
    /**
     * Returns a tone >= tone parameter that ensures ratio parameter.
     * Return value is between 0 and 100.
     * Returns 100 if ratio cannot be achieved with tone parameter.
     *
     * This method is unsafe because the returned value is guaranteed to be in
     * bounds for tone, i.e. between 0 and 100. However, that value may not reach
     * the ratio with tone. For example, there is no color lighter than T100.
     *
     * @param tone Tone return value must contrast with.
     * Range is 0 to 100. Invalid values will result in 100 being returned.
     * @param ratio Desired contrast ratio of return value and tone parameter.
     * Range is 1 to 21, invalid values have undefined behavior.
     */
    static lighterUnsafe(tone, ratio) {
      const lighterSafe = _Contrast.lighter(tone, ratio);
      return lighterSafe < 0 ? 100 : lighterSafe;
    }
    /**
     * Returns a tone >= tone parameter that ensures ratio parameter.
     * Return value is between 0 and 100.
     * Returns 100 if ratio cannot be achieved with tone parameter.
     *
     * This method is unsafe because the returned value is guaranteed to be in
     * bounds for tone, i.e. between 0 and 100. However, that value may not reach
     * the [ratio with [tone]. For example, there is no color darker than T0.
     *
     * @param tone Tone return value must contrast with.
     * Range is 0 to 100. Invalid values will result in 0 being returned.
     * @param ratio Desired contrast ratio of return value and tone parameter.
     * Range is 1 to 21, invalid values have undefined behavior.
     */
    static darkerUnsafe(tone, ratio) {
      const darkerSafe = _Contrast.darker(tone, ratio);
      return darkerSafe < 0 ? 0 : darkerSafe;
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/dislike/dislike_analyzer.js
  var DislikeAnalyzer = class _DislikeAnalyzer {
    /**
     * Returns true if a color is disliked.
     *
     * @param hct A color to be judged.
     * @return Whether the color is disliked.
     *
     * Disliked is defined as a dark yellow-green that is not neutral.
     */
    static isDisliked(hct) {
      const huePasses = Math.round(hct.hue) >= 90 && Math.round(hct.hue) <= 111;
      const chromaPasses = Math.round(hct.chroma) > 16;
      const tonePasses = Math.round(hct.tone) < 65;
      return huePasses && chromaPasses && tonePasses;
    }
    /**
     * If a color is disliked, lighten it to make it likable.
     *
     * @param hct A color to be judged.
     * @return A new color if the original color is disliked, or the original
     *   color if it is acceptable.
     */
    static fixIfDisliked(hct) {
      if (_DislikeAnalyzer.isDisliked(hct)) {
        return Hct.from(hct.hue, hct.chroma, 70);
      }
      return hct;
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/dynamiccolor/dynamic_color.js
  var DynamicColor = class _DynamicColor {
    /**
     * Create a DynamicColor defined by a TonalPalette and HCT tone.
     *
     * @param args Functions with DynamicScheme as input. Must provide a palette
     * and tone. May provide a background DynamicColor and ToneDeltaConstraint.
     */
    static fromPalette(args) {
      return new _DynamicColor(
        args.name ?? "",
        args.palette,
        args.tone,
        args.isBackground ?? false,
        args.background,
        args.secondBackground,
        args.contrastCurve,
        args.toneDeltaPair,
      );
    }
    /**
     * The base constructor for DynamicColor.
     *
     * _Strongly_ prefer using one of the convenience constructors. This class is
     * arguably too flexible to ensure it can support any scenario. Functional
     * arguments allow  overriding without risks that come with subclasses.
     *
     * For example, the default behavior of adjust tone at max contrast
     * to be at a 7.0 ratio with its background is principled and
     * matches accessibility guidance. That does not mean it's the desired
     * approach for _every_ design system, and every color pairing,
     * always, in every case.
     *
     * @param name The name of the dynamic color. Defaults to empty.
     * @param palette Function that provides a TonalPalette given
     * DynamicScheme. A TonalPalette is defined by a hue and chroma, so this
     * replaces the need to specify hue/chroma. By providing a tonal palette, when
     * contrast adjustments are made, intended chroma can be preserved.
     * @param tone Function that provides a tone, given a DynamicScheme.
     * @param isBackground Whether this dynamic color is a background, with
     * some other color as the foreground. Defaults to false.
     * @param background The background of the dynamic color (as a function of a
     *     `DynamicScheme`), if it exists.
     * @param secondBackground A second background of the dynamic color (as a
     *     function of a `DynamicScheme`), if it
     * exists.
     * @param contrastCurve A `ContrastCurve` object specifying how its contrast
     * against its background should behave in various contrast levels options.
     * @param toneDeltaPair A `ToneDeltaPair` object specifying a tone delta
     * constraint between two colors. One of them must be the color being
     * constructed.
     */
    constructor(
      name,
      palette,
      tone,
      isBackground,
      background,
      secondBackground,
      contrastCurve,
      toneDeltaPair,
    ) {
      this.name = name;
      this.palette = palette;
      this.tone = tone;
      this.isBackground = isBackground;
      this.background = background;
      this.secondBackground = secondBackground;
      this.contrastCurve = contrastCurve;
      this.toneDeltaPair = toneDeltaPair;
      this.hctCache = /* @__PURE__ */ new Map();
      if (!background && secondBackground) {
        throw new Error(
          `Color ${name} has secondBackgrounddefined, but background is not defined.`,
        );
      }
      if (!background && contrastCurve) {
        throw new Error(
          `Color ${name} has contrastCurvedefined, but background is not defined.`,
        );
      }
      if (background && !contrastCurve) {
        throw new Error(
          `Color ${name} has backgrounddefined, but contrastCurve is not defined.`,
        );
      }
    }
    /**
     * Return a ARGB integer (i.e. a hex code).
     *
     * @param scheme Defines the conditions of the user interface, for example,
     * whether or not it is dark mode or light mode, and what the desired
     * contrast level is.
     */
    getArgb(scheme) {
      return this.getHct(scheme).toInt();
    }
    /**
     * Return a color, expressed in the HCT color space, that this
     * DynamicColor is under the conditions in scheme.
     *
     * @param scheme Defines the conditions of the user interface, for example,
     * whether or not it is dark mode or light mode, and what the desired
     * contrast level is.
     */
    getHct(scheme) {
      const cachedAnswer = this.hctCache.get(scheme);
      if (cachedAnswer != null) {
        return cachedAnswer;
      }
      const tone = this.getTone(scheme);
      const answer = this.palette(scheme).getHct(tone);
      if (this.hctCache.size > 4) {
        this.hctCache.clear();
      }
      this.hctCache.set(scheme, answer);
      return answer;
    }
    /**
     * Return a tone, T in the HCT color space, that this DynamicColor is under
     * the conditions in scheme.
     *
     * @param scheme Defines the conditions of the user interface, for example,
     * whether or not it is dark mode or light mode, and what the desired
     * contrast level is.
     */
    getTone(scheme) {
      const decreasingContrast = scheme.contrastLevel < 0;
      if (this.toneDeltaPair) {
        const toneDeltaPair = this.toneDeltaPair(scheme);
        const roleA = toneDeltaPair.roleA;
        const roleB = toneDeltaPair.roleB;
        const delta = toneDeltaPair.delta;
        const polarity = toneDeltaPair.polarity;
        const stayTogether = toneDeltaPair.stayTogether;
        const bg = this.background(scheme);
        const bgTone = bg.getTone(scheme);
        const aIsNearer =
          polarity === "nearer" ||
          (polarity === "lighter" && !scheme.isDark) ||
          (polarity === "darker" && scheme.isDark);
        const nearer = aIsNearer ? roleA : roleB;
        const farther = aIsNearer ? roleB : roleA;
        const amNearer = this.name === nearer.name;
        const expansionDir = scheme.isDark ? 1 : -1;
        const nContrast = nearer.contrastCurve.get(scheme.contrastLevel);
        const fContrast = farther.contrastCurve.get(scheme.contrastLevel);
        const nInitialTone = nearer.tone(scheme);
        let nTone =
          Contrast.ratioOfTones(bgTone, nInitialTone) >= nContrast
            ? nInitialTone
            : _DynamicColor.foregroundTone(bgTone, nContrast);
        const fInitialTone = farther.tone(scheme);
        let fTone =
          Contrast.ratioOfTones(bgTone, fInitialTone) >= fContrast
            ? fInitialTone
            : _DynamicColor.foregroundTone(bgTone, fContrast);
        if (decreasingContrast) {
          nTone = _DynamicColor.foregroundTone(bgTone, nContrast);
          fTone = _DynamicColor.foregroundTone(bgTone, fContrast);
        }
        if ((fTone - nTone) * expansionDir >= delta) {
        } else {
          fTone = clampDouble(0, 100, nTone + delta * expansionDir);
          if ((fTone - nTone) * expansionDir >= delta) {
          } else {
            nTone = clampDouble(0, 100, fTone - delta * expansionDir);
          }
        }
        if (50 <= nTone && nTone < 60) {
          if (expansionDir > 0) {
            nTone = 60;
            fTone = Math.max(fTone, nTone + delta * expansionDir);
          } else {
            nTone = 49;
            fTone = Math.min(fTone, nTone + delta * expansionDir);
          }
        } else if (50 <= fTone && fTone < 60) {
          if (stayTogether) {
            if (expansionDir > 0) {
              nTone = 60;
              fTone = Math.max(fTone, nTone + delta * expansionDir);
            } else {
              nTone = 49;
              fTone = Math.min(fTone, nTone + delta * expansionDir);
            }
          } else {
            if (expansionDir > 0) {
              fTone = 60;
            } else {
              fTone = 49;
            }
          }
        }
        return amNearer ? nTone : fTone;
      } else {
        let answer = this.tone(scheme);
        if (this.background == null) {
          return answer;
        }
        const bgTone = this.background(scheme).getTone(scheme);
        const desiredRatio = this.contrastCurve.get(scheme.contrastLevel);
        if (Contrast.ratioOfTones(bgTone, answer) >= desiredRatio) {
        } else {
          answer = _DynamicColor.foregroundTone(bgTone, desiredRatio);
        }
        if (decreasingContrast) {
          answer = _DynamicColor.foregroundTone(bgTone, desiredRatio);
        }
        if (this.isBackground && 50 <= answer && answer < 60) {
          if (Contrast.ratioOfTones(49, bgTone) >= desiredRatio) {
            answer = 49;
          } else {
            answer = 60;
          }
        }
        if (this.secondBackground) {
          const [bg1, bg2] = [this.background, this.secondBackground];
          const [bgTone1, bgTone2] = [
            bg1(scheme).getTone(scheme),
            bg2(scheme).getTone(scheme),
          ];
          const [upper, lower] = [
            Math.max(bgTone1, bgTone2),
            Math.min(bgTone1, bgTone2),
          ];
          if (
            Contrast.ratioOfTones(upper, answer) >= desiredRatio &&
            Contrast.ratioOfTones(lower, answer) >= desiredRatio
          ) {
            return answer;
          }
          const lightOption = Contrast.lighter(upper, desiredRatio);
          const darkOption = Contrast.darker(lower, desiredRatio);
          const availables = [];
          if (lightOption !== -1) availables.push(lightOption);
          if (darkOption !== -1) availables.push(darkOption);
          const prefersLight =
            _DynamicColor.tonePrefersLightForeground(bgTone1) ||
            _DynamicColor.tonePrefersLightForeground(bgTone2);
          if (prefersLight) {
            return lightOption < 0 ? 100 : lightOption;
          }
          if (availables.length === 1) {
            return availables[0];
          }
          return darkOption < 0 ? 0 : darkOption;
        }
        return answer;
      }
    }
    /**
     * Given a background tone, find a foreground tone, while ensuring they reach
     * a contrast ratio that is as close to [ratio] as possible.
     *
     * @param bgTone Tone in HCT. Range is 0 to 100, undefined behavior when it
     *     falls outside that range.
     * @param ratio The contrast ratio desired between bgTone and the return
     *     value.
     */
    static foregroundTone(bgTone, ratio) {
      const lighterTone = Contrast.lighterUnsafe(bgTone, ratio);
      const darkerTone = Contrast.darkerUnsafe(bgTone, ratio);
      const lighterRatio = Contrast.ratioOfTones(lighterTone, bgTone);
      const darkerRatio = Contrast.ratioOfTones(darkerTone, bgTone);
      const preferLighter = _DynamicColor.tonePrefersLightForeground(bgTone);
      if (preferLighter) {
        const negligibleDifference =
          Math.abs(lighterRatio - darkerRatio) < 0.1 &&
          lighterRatio < ratio &&
          darkerRatio < ratio;
        return lighterRatio >= ratio ||
          lighterRatio >= darkerRatio ||
          negligibleDifference
          ? lighterTone
          : darkerTone;
      } else {
        return darkerRatio >= ratio || darkerRatio >= lighterRatio
          ? darkerTone
          : lighterTone;
      }
    }
    /**
     * Returns whether [tone] prefers a light foreground.
     *
     * People prefer white foregrounds on ~T60-70. Observed over time, and also
     * by Andrew Somers during research for APCA.
     *
     * T60 used as to create the smallest discontinuity possible when skipping
     * down to T49 in order to ensure light foregrounds.
     * Since `tertiaryContainer` in dark monochrome scheme requires a tone of
     * 60, it should not be adjusted. Therefore, 60 is excluded here.
     */
    static tonePrefersLightForeground(tone) {
      return Math.round(tone) < 60;
    }
    /**
     * Returns whether [tone] can reach a contrast ratio of 4.5 with a lighter
     * color.
     */
    static toneAllowsLightForeground(tone) {
      return Math.round(tone) <= 49;
    }
    /**
     * Adjust a tone such that white has 4.5 contrast, if the tone is
     * reasonably close to supporting it.
     */
    static enableLightForeground(tone) {
      if (
        _DynamicColor.tonePrefersLightForeground(tone) &&
        !_DynamicColor.toneAllowsLightForeground(tone)
      ) {
        return 49;
      }
      return tone;
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/palettes/tonal_palette.js
  var TonalPalette = class _TonalPalette {
    /**
     * @param argb ARGB representation of a color
     * @return Tones matching that color's hue and chroma.
     */
    static fromInt(argb) {
      const hct = Hct.fromInt(argb);
      return _TonalPalette.fromHct(hct);
    }
    /**
     * @param hct Hct
     * @return Tones matching that color's hue and chroma.
     */
    static fromHct(hct) {
      return new _TonalPalette(hct.hue, hct.chroma, hct);
    }
    /**
     * @param hue HCT hue
     * @param chroma HCT chroma
     * @return Tones matching hue and chroma.
     */
    static fromHueAndChroma(hue, chroma) {
      const keyColor = new KeyColor(hue, chroma).create();
      return new _TonalPalette(hue, chroma, keyColor);
    }
    constructor(hue, chroma, keyColor) {
      this.hue = hue;
      this.chroma = chroma;
      this.keyColor = keyColor;
      this.cache = /* @__PURE__ */ new Map();
    }
    /**
     * @param tone HCT tone, measured from 0 to 100.
     * @return ARGB representation of a color with that tone.
     */
    tone(tone) {
      let argb = this.cache.get(tone);
      if (argb === void 0) {
        argb = Hct.from(this.hue, this.chroma, tone).toInt();
        this.cache.set(tone, argb);
      }
      return argb;
    }
    /**
     * @param tone HCT tone.
     * @return HCT representation of a color with that tone.
     */
    getHct(tone) {
      return Hct.fromInt(this.tone(tone));
    }
  };
  var KeyColor = class {
    constructor(hue, requestedChroma) {
      this.hue = hue;
      this.requestedChroma = requestedChroma;
      this.chromaCache = /* @__PURE__ */ new Map();
      this.maxChromaValue = 200;
    }
    /**
     * Creates a key color from a [hue] and a [chroma].
     * The key color is the first tone, starting from T50, matching the given hue
     * and chroma.
     *
     * @return Key color [Hct]
     */
    create() {
      const pivotTone = 50;
      const toneStepSize = 1;
      const epsilon = 0.01;
      let lowerTone = 0;
      let upperTone = 100;
      while (lowerTone < upperTone) {
        const midTone = Math.floor((lowerTone + upperTone) / 2);
        const isAscending =
          this.maxChroma(midTone) < this.maxChroma(midTone + toneStepSize);
        const sufficientChroma =
          this.maxChroma(midTone) >= this.requestedChroma - epsilon;
        if (sufficientChroma) {
          if (
            Math.abs(lowerTone - pivotTone) < Math.abs(upperTone - pivotTone)
          ) {
            upperTone = midTone;
          } else {
            if (lowerTone === midTone) {
              return Hct.from(this.hue, this.requestedChroma, lowerTone);
            }
            lowerTone = midTone;
          }
        } else {
          if (isAscending) {
            lowerTone = midTone + toneStepSize;
          } else {
            upperTone = midTone;
          }
        }
      }
      return Hct.from(this.hue, this.requestedChroma, lowerTone);
    }
    // Find the maximum chroma for a given tone
    maxChroma(tone) {
      if (this.chromaCache.has(tone)) {
        return this.chromaCache.get(tone);
      }
      const chroma = Hct.from(this.hue, this.maxChromaValue, tone).chroma;
      this.chromaCache.set(tone, chroma);
      return chroma;
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/dynamiccolor/contrast_curve.js
  var ContrastCurve = class {
    /**
     * Creates a `ContrastCurve` object.
     *
     * @param low Value for contrast level -1.0
     * @param normal Value for contrast level 0.0
     * @param medium Value for contrast level 0.5
     * @param high Value for contrast level 1.0
     */
    constructor(low, normal, medium, high) {
      this.low = low;
      this.normal = normal;
      this.medium = medium;
      this.high = high;
    }
    /**
     * Returns the value at a given contrast level.
     *
     * @param contrastLevel The contrast level. 0.0 is the default (normal); -1.0
     *     is the lowest; 1.0 is the highest.
     * @return The value. For contrast ratios, a number between 1.0 and 21.0.
     */
    get(contrastLevel) {
      if (contrastLevel <= -1) {
        return this.low;
      } else if (contrastLevel < 0) {
        return lerp(this.low, this.normal, (contrastLevel - -1) / 1);
      } else if (contrastLevel < 0.5) {
        return lerp(this.normal, this.medium, (contrastLevel - 0) / 0.5);
      } else if (contrastLevel < 1) {
        return lerp(this.medium, this.high, (contrastLevel - 0.5) / 0.5);
      } else {
        return this.high;
      }
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/dynamiccolor/tone_delta_pair.js
  var ToneDeltaPair = class {
    /**
     * Documents a constraint in tone distance between two DynamicColors.
     *
     * The polarity is an adjective that describes "A", compared to "B".
     *
     * For instance, ToneDeltaPair(A, B, 15, 'darker', stayTogether) states that
     * A's tone should be at least 15 darker than B's.
     *
     * 'nearer' and 'farther' describes closeness to the surface roles. For
     * instance, ToneDeltaPair(A, B, 10, 'nearer', stayTogether) states that A
     * should be 10 lighter than B in light mode, and 10 darker than B in dark
     * mode.
     *
     * @param roleA The first role in a pair.
     * @param roleB The second role in a pair.
     * @param delta Required difference between tones. Absolute value, negative
     * values have undefined behavior.
     * @param polarity The relative relation between tones of roleA and roleB,
     * as described above.
     * @param stayTogether Whether these two roles should stay on the same side of
     * the "awkward zone" (T50-59). This is necessary for certain cases where
     * one role has two backgrounds.
     */
    constructor(roleA, roleB, delta, polarity, stayTogether) {
      this.roleA = roleA;
      this.roleB = roleB;
      this.delta = delta;
      this.polarity = polarity;
      this.stayTogether = stayTogether;
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/dynamiccolor/variant.js
  var Variant;
  (function (Variant3) {
    Variant3[(Variant3["MONOCHROME"] = 0)] = "MONOCHROME";
    Variant3[(Variant3["NEUTRAL"] = 1)] = "NEUTRAL";
    Variant3[(Variant3["TONAL_SPOT"] = 2)] = "TONAL_SPOT";
    Variant3[(Variant3["VIBRANT"] = 3)] = "VIBRANT";
    Variant3[(Variant3["EXPRESSIVE"] = 4)] = "EXPRESSIVE";
    Variant3[(Variant3["FIDELITY"] = 5)] = "FIDELITY";
    Variant3[(Variant3["CONTENT"] = 6)] = "CONTENT";
    Variant3[(Variant3["RAINBOW"] = 7)] = "RAINBOW";
    Variant3[(Variant3["FRUIT_SALAD"] = 8)] = "FRUIT_SALAD";
  })(Variant || (Variant = {}));

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/dynamiccolor/material_dynamic_colors.js
  function isFidelity(scheme) {
    return (
      scheme.variant === Variant.FIDELITY || scheme.variant === Variant.CONTENT
    );
  }
  function isMonochrome(scheme) {
    return scheme.variant === Variant.MONOCHROME;
  }
  function findDesiredChromaByTone(hue, chroma, tone, byDecreasingTone) {
    let answer = tone;
    let closestToChroma = Hct.from(hue, chroma, tone);
    if (closestToChroma.chroma < chroma) {
      let chromaPeak = closestToChroma.chroma;
      while (closestToChroma.chroma < chroma) {
        answer += byDecreasingTone ? -1 : 1;
        const potentialSolution = Hct.from(hue, chroma, answer);
        if (chromaPeak > potentialSolution.chroma) {
          break;
        }
        if (Math.abs(potentialSolution.chroma - chroma) < 0.4) {
          break;
        }
        const potentialDelta = Math.abs(potentialSolution.chroma - chroma);
        const currentDelta = Math.abs(closestToChroma.chroma - chroma);
        if (potentialDelta < currentDelta) {
          closestToChroma = potentialSolution;
        }
        chromaPeak = Math.max(chromaPeak, potentialSolution.chroma);
      }
    }
    return answer;
  }
  var MaterialDynamicColors = class _MaterialDynamicColors {
    static highestSurface(s) {
      return s.isDark
        ? _MaterialDynamicColors.surfaceBright
        : _MaterialDynamicColors.surfaceDim;
    }
  };
  MaterialDynamicColors.contentAccentToneDelta = 15;
  MaterialDynamicColors.primaryPaletteKeyColor = DynamicColor.fromPalette({
    name: "primary_palette_key_color",
    palette: (s) => s.primaryPalette,
    tone: (s) => s.primaryPalette.keyColor.tone,
  });
  MaterialDynamicColors.secondaryPaletteKeyColor = DynamicColor.fromPalette({
    name: "secondary_palette_key_color",
    palette: (s) => s.secondaryPalette,
    tone: (s) => s.secondaryPalette.keyColor.tone,
  });
  MaterialDynamicColors.tertiaryPaletteKeyColor = DynamicColor.fromPalette({
    name: "tertiary_palette_key_color",
    palette: (s) => s.tertiaryPalette,
    tone: (s) => s.tertiaryPalette.keyColor.tone,
  });
  MaterialDynamicColors.neutralPaletteKeyColor = DynamicColor.fromPalette({
    name: "neutral_palette_key_color",
    palette: (s) => s.neutralPalette,
    tone: (s) => s.neutralPalette.keyColor.tone,
  });
  MaterialDynamicColors.neutralVariantPaletteKeyColor =
    DynamicColor.fromPalette({
      name: "neutral_variant_palette_key_color",
      palette: (s) => s.neutralVariantPalette,
      tone: (s) => s.neutralVariantPalette.keyColor.tone,
    });
  MaterialDynamicColors.background = DynamicColor.fromPalette({
    name: "background",
    palette: (s) => s.neutralPalette,
    tone: (s) => (s.isDark ? 6 : 98),
    isBackground: true,
  });
  MaterialDynamicColors.onBackground = DynamicColor.fromPalette({
    name: "on_background",
    palette: (s) => s.neutralPalette,
    tone: (s) => (s.isDark ? 90 : 10),
    background: (s) => MaterialDynamicColors.background,
    contrastCurve: new ContrastCurve(3, 3, 4.5, 7),
  });
  MaterialDynamicColors.surface = DynamicColor.fromPalette({
    name: "surface",
    palette: (s) => s.neutralPalette,
    tone: (s) => (s.isDark ? 6 : 98),
    isBackground: true,
  });
  MaterialDynamicColors.surfaceDim = DynamicColor.fromPalette({
    name: "surface_dim",
    palette: (s) => s.neutralPalette,
    tone: (s) =>
      s.isDark ? 6 : new ContrastCurve(87, 87, 80, 75).get(s.contrastLevel),
    isBackground: true,
  });
  MaterialDynamicColors.surfaceBright = DynamicColor.fromPalette({
    name: "surface_bright",
    palette: (s) => s.neutralPalette,
    tone: (s) =>
      s.isDark ? new ContrastCurve(24, 24, 29, 34).get(s.contrastLevel) : 98,
    isBackground: true,
  });
  MaterialDynamicColors.surfaceContainerLowest = DynamicColor.fromPalette({
    name: "surface_container_lowest",
    palette: (s) => s.neutralPalette,
    tone: (s) =>
      s.isDark ? new ContrastCurve(4, 4, 2, 0).get(s.contrastLevel) : 100,
    isBackground: true,
  });
  MaterialDynamicColors.surfaceContainerLow = DynamicColor.fromPalette({
    name: "surface_container_low",
    palette: (s) => s.neutralPalette,
    tone: (s) =>
      s.isDark
        ? new ContrastCurve(10, 10, 11, 12).get(s.contrastLevel)
        : new ContrastCurve(96, 96, 96, 95).get(s.contrastLevel),
    isBackground: true,
  });
  MaterialDynamicColors.surfaceContainer = DynamicColor.fromPalette({
    name: "surface_container",
    palette: (s) => s.neutralPalette,
    tone: (s) =>
      s.isDark
        ? new ContrastCurve(12, 12, 16, 20).get(s.contrastLevel)
        : new ContrastCurve(94, 94, 92, 90).get(s.contrastLevel),
    isBackground: true,
  });
  MaterialDynamicColors.surfaceContainerHigh = DynamicColor.fromPalette({
    name: "surface_container_high",
    palette: (s) => s.neutralPalette,
    tone: (s) =>
      s.isDark
        ? new ContrastCurve(17, 17, 21, 25).get(s.contrastLevel)
        : new ContrastCurve(92, 92, 88, 85).get(s.contrastLevel),
    isBackground: true,
  });
  MaterialDynamicColors.surfaceContainerHighest = DynamicColor.fromPalette({
    name: "surface_container_highest",
    palette: (s) => s.neutralPalette,
    tone: (s) =>
      s.isDark
        ? new ContrastCurve(22, 22, 26, 30).get(s.contrastLevel)
        : new ContrastCurve(90, 90, 84, 80).get(s.contrastLevel),
    isBackground: true,
  });
  MaterialDynamicColors.onSurface = DynamicColor.fromPalette({
    name: "on_surface",
    palette: (s) => s.neutralPalette,
    tone: (s) => (s.isDark ? 90 : 10),
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(4.5, 7, 11, 21),
  });
  MaterialDynamicColors.surfaceVariant = DynamicColor.fromPalette({
    name: "surface_variant",
    palette: (s) => s.neutralVariantPalette,
    tone: (s) => (s.isDark ? 30 : 90),
    isBackground: true,
  });
  MaterialDynamicColors.onSurfaceVariant = DynamicColor.fromPalette({
    name: "on_surface_variant",
    palette: (s) => s.neutralVariantPalette,
    tone: (s) => (s.isDark ? 80 : 30),
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(3, 4.5, 7, 11),
  });
  MaterialDynamicColors.inverseSurface = DynamicColor.fromPalette({
    name: "inverse_surface",
    palette: (s) => s.neutralPalette,
    tone: (s) => (s.isDark ? 90 : 20),
  });
  MaterialDynamicColors.inverseOnSurface = DynamicColor.fromPalette({
    name: "inverse_on_surface",
    palette: (s) => s.neutralPalette,
    tone: (s) => (s.isDark ? 20 : 95),
    background: (s) => MaterialDynamicColors.inverseSurface,
    contrastCurve: new ContrastCurve(4.5, 7, 11, 21),
  });
  MaterialDynamicColors.outline = DynamicColor.fromPalette({
    name: "outline",
    palette: (s) => s.neutralVariantPalette,
    tone: (s) => (s.isDark ? 60 : 50),
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(1.5, 3, 4.5, 7),
  });
  MaterialDynamicColors.outlineVariant = DynamicColor.fromPalette({
    name: "outline_variant",
    palette: (s) => s.neutralVariantPalette,
    tone: (s) => (s.isDark ? 30 : 80),
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
  });
  MaterialDynamicColors.shadow = DynamicColor.fromPalette({
    name: "shadow",
    palette: (s) => s.neutralPalette,
    tone: (s) => 0,
  });
  MaterialDynamicColors.scrim = DynamicColor.fromPalette({
    name: "scrim",
    palette: (s) => s.neutralPalette,
    tone: (s) => 0,
  });
  MaterialDynamicColors.surfaceTint = DynamicColor.fromPalette({
    name: "surface_tint",
    palette: (s) => s.primaryPalette,
    tone: (s) => (s.isDark ? 80 : 40),
    isBackground: true,
  });
  MaterialDynamicColors.primary = DynamicColor.fromPalette({
    name: "primary",
    palette: (s) => s.primaryPalette,
    tone: (s) => {
      if (isMonochrome(s)) {
        return s.isDark ? 100 : 0;
      }
      return s.isDark ? 80 : 40;
    },
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(3, 4.5, 7, 7),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.primaryContainer,
        MaterialDynamicColors.primary,
        10,
        "nearer",
        false,
      ),
  });
  MaterialDynamicColors.onPrimary = DynamicColor.fromPalette({
    name: "on_primary",
    palette: (s) => s.primaryPalette,
    tone: (s) => {
      if (isMonochrome(s)) {
        return s.isDark ? 10 : 90;
      }
      return s.isDark ? 20 : 100;
    },
    background: (s) => MaterialDynamicColors.primary,
    contrastCurve: new ContrastCurve(4.5, 7, 11, 21),
  });
  MaterialDynamicColors.primaryContainer = DynamicColor.fromPalette({
    name: "primary_container",
    palette: (s) => s.primaryPalette,
    tone: (s) => {
      if (isFidelity(s)) {
        return s.sourceColorHct.tone;
      }
      if (isMonochrome(s)) {
        return s.isDark ? 85 : 25;
      }
      return s.isDark ? 30 : 90;
    },
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.primaryContainer,
        MaterialDynamicColors.primary,
        10,
        "nearer",
        false,
      ),
  });
  MaterialDynamicColors.onPrimaryContainer = DynamicColor.fromPalette({
    name: "on_primary_container",
    palette: (s) => s.primaryPalette,
    tone: (s) => {
      if (isFidelity(s)) {
        return DynamicColor.foregroundTone(
          MaterialDynamicColors.primaryContainer.tone(s),
          4.5,
        );
      }
      if (isMonochrome(s)) {
        return s.isDark ? 0 : 100;
      }
      return s.isDark ? 90 : 30;
    },
    background: (s) => MaterialDynamicColors.primaryContainer,
    contrastCurve: new ContrastCurve(3, 4.5, 7, 11),
  });
  MaterialDynamicColors.inversePrimary = DynamicColor.fromPalette({
    name: "inverse_primary",
    palette: (s) => s.primaryPalette,
    tone: (s) => (s.isDark ? 40 : 80),
    background: (s) => MaterialDynamicColors.inverseSurface,
    contrastCurve: new ContrastCurve(3, 4.5, 7, 7),
  });
  MaterialDynamicColors.secondary = DynamicColor.fromPalette({
    name: "secondary",
    palette: (s) => s.secondaryPalette,
    tone: (s) => (s.isDark ? 80 : 40),
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(3, 4.5, 7, 7),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.secondaryContainer,
        MaterialDynamicColors.secondary,
        10,
        "nearer",
        false,
      ),
  });
  MaterialDynamicColors.onSecondary = DynamicColor.fromPalette({
    name: "on_secondary",
    palette: (s) => s.secondaryPalette,
    tone: (s) => {
      if (isMonochrome(s)) {
        return s.isDark ? 10 : 100;
      } else {
        return s.isDark ? 20 : 100;
      }
    },
    background: (s) => MaterialDynamicColors.secondary,
    contrastCurve: new ContrastCurve(4.5, 7, 11, 21),
  });
  MaterialDynamicColors.secondaryContainer = DynamicColor.fromPalette({
    name: "secondary_container",
    palette: (s) => s.secondaryPalette,
    tone: (s) => {
      const initialTone = s.isDark ? 30 : 90;
      if (isMonochrome(s)) {
        return s.isDark ? 30 : 85;
      }
      if (!isFidelity(s)) {
        return initialTone;
      }
      return findDesiredChromaByTone(
        s.secondaryPalette.hue,
        s.secondaryPalette.chroma,
        initialTone,
        s.isDark ? false : true,
      );
    },
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.secondaryContainer,
        MaterialDynamicColors.secondary,
        10,
        "nearer",
        false,
      ),
  });
  MaterialDynamicColors.onSecondaryContainer = DynamicColor.fromPalette({
    name: "on_secondary_container",
    palette: (s) => s.secondaryPalette,
    tone: (s) => {
      if (isMonochrome(s)) {
        return s.isDark ? 90 : 10;
      }
      if (!isFidelity(s)) {
        return s.isDark ? 90 : 30;
      }
      return DynamicColor.foregroundTone(
        MaterialDynamicColors.secondaryContainer.tone(s),
        4.5,
      );
    },
    background: (s) => MaterialDynamicColors.secondaryContainer,
    contrastCurve: new ContrastCurve(3, 4.5, 7, 11),
  });
  MaterialDynamicColors.tertiary = DynamicColor.fromPalette({
    name: "tertiary",
    palette: (s) => s.tertiaryPalette,
    tone: (s) => {
      if (isMonochrome(s)) {
        return s.isDark ? 90 : 25;
      }
      return s.isDark ? 80 : 40;
    },
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(3, 4.5, 7, 7),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.tertiaryContainer,
        MaterialDynamicColors.tertiary,
        10,
        "nearer",
        false,
      ),
  });
  MaterialDynamicColors.onTertiary = DynamicColor.fromPalette({
    name: "on_tertiary",
    palette: (s) => s.tertiaryPalette,
    tone: (s) => {
      if (isMonochrome(s)) {
        return s.isDark ? 10 : 90;
      }
      return s.isDark ? 20 : 100;
    },
    background: (s) => MaterialDynamicColors.tertiary,
    contrastCurve: new ContrastCurve(4.5, 7, 11, 21),
  });
  MaterialDynamicColors.tertiaryContainer = DynamicColor.fromPalette({
    name: "tertiary_container",
    palette: (s) => s.tertiaryPalette,
    tone: (s) => {
      if (isMonochrome(s)) {
        return s.isDark ? 60 : 49;
      }
      if (!isFidelity(s)) {
        return s.isDark ? 30 : 90;
      }
      const proposedHct = s.tertiaryPalette.getHct(s.sourceColorHct.tone);
      return DislikeAnalyzer.fixIfDisliked(proposedHct).tone;
    },
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.tertiaryContainer,
        MaterialDynamicColors.tertiary,
        10,
        "nearer",
        false,
      ),
  });
  MaterialDynamicColors.onTertiaryContainer = DynamicColor.fromPalette({
    name: "on_tertiary_container",
    palette: (s) => s.tertiaryPalette,
    tone: (s) => {
      if (isMonochrome(s)) {
        return s.isDark ? 0 : 100;
      }
      if (!isFidelity(s)) {
        return s.isDark ? 90 : 30;
      }
      return DynamicColor.foregroundTone(
        MaterialDynamicColors.tertiaryContainer.tone(s),
        4.5,
      );
    },
    background: (s) => MaterialDynamicColors.tertiaryContainer,
    contrastCurve: new ContrastCurve(3, 4.5, 7, 11),
  });
  MaterialDynamicColors.error = DynamicColor.fromPalette({
    name: "error",
    palette: (s) => s.errorPalette,
    tone: (s) => (s.isDark ? 80 : 40),
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(3, 4.5, 7, 7),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.errorContainer,
        MaterialDynamicColors.error,
        10,
        "nearer",
        false,
      ),
  });
  MaterialDynamicColors.onError = DynamicColor.fromPalette({
    name: "on_error",
    palette: (s) => s.errorPalette,
    tone: (s) => (s.isDark ? 20 : 100),
    background: (s) => MaterialDynamicColors.error,
    contrastCurve: new ContrastCurve(4.5, 7, 11, 21),
  });
  MaterialDynamicColors.errorContainer = DynamicColor.fromPalette({
    name: "error_container",
    palette: (s) => s.errorPalette,
    tone: (s) => (s.isDark ? 30 : 90),
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.errorContainer,
        MaterialDynamicColors.error,
        10,
        "nearer",
        false,
      ),
  });
  MaterialDynamicColors.onErrorContainer = DynamicColor.fromPalette({
    name: "on_error_container",
    palette: (s) => s.errorPalette,
    tone: (s) => {
      if (isMonochrome(s)) {
        return s.isDark ? 90 : 10;
      }
      return s.isDark ? 90 : 30;
    },
    background: (s) => MaterialDynamicColors.errorContainer,
    contrastCurve: new ContrastCurve(3, 4.5, 7, 11),
  });
  MaterialDynamicColors.primaryFixed = DynamicColor.fromPalette({
    name: "primary_fixed",
    palette: (s) => s.primaryPalette,
    tone: (s) => (isMonochrome(s) ? 40 : 90),
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.primaryFixed,
        MaterialDynamicColors.primaryFixedDim,
        10,
        "lighter",
        true,
      ),
  });
  MaterialDynamicColors.primaryFixedDim = DynamicColor.fromPalette({
    name: "primary_fixed_dim",
    palette: (s) => s.primaryPalette,
    tone: (s) => (isMonochrome(s) ? 30 : 80),
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.primaryFixed,
        MaterialDynamicColors.primaryFixedDim,
        10,
        "lighter",
        true,
      ),
  });
  MaterialDynamicColors.onPrimaryFixed = DynamicColor.fromPalette({
    name: "on_primary_fixed",
    palette: (s) => s.primaryPalette,
    tone: (s) => (isMonochrome(s) ? 100 : 10),
    background: (s) => MaterialDynamicColors.primaryFixedDim,
    secondBackground: (s) => MaterialDynamicColors.primaryFixed,
    contrastCurve: new ContrastCurve(4.5, 7, 11, 21),
  });
  MaterialDynamicColors.onPrimaryFixedVariant = DynamicColor.fromPalette({
    name: "on_primary_fixed_variant",
    palette: (s) => s.primaryPalette,
    tone: (s) => (isMonochrome(s) ? 90 : 30),
    background: (s) => MaterialDynamicColors.primaryFixedDim,
    secondBackground: (s) => MaterialDynamicColors.primaryFixed,
    contrastCurve: new ContrastCurve(3, 4.5, 7, 11),
  });
  MaterialDynamicColors.secondaryFixed = DynamicColor.fromPalette({
    name: "secondary_fixed",
    palette: (s) => s.secondaryPalette,
    tone: (s) => (isMonochrome(s) ? 80 : 90),
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.secondaryFixed,
        MaterialDynamicColors.secondaryFixedDim,
        10,
        "lighter",
        true,
      ),
  });
  MaterialDynamicColors.secondaryFixedDim = DynamicColor.fromPalette({
    name: "secondary_fixed_dim",
    palette: (s) => s.secondaryPalette,
    tone: (s) => (isMonochrome(s) ? 70 : 80),
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.secondaryFixed,
        MaterialDynamicColors.secondaryFixedDim,
        10,
        "lighter",
        true,
      ),
  });
  MaterialDynamicColors.onSecondaryFixed = DynamicColor.fromPalette({
    name: "on_secondary_fixed",
    palette: (s) => s.secondaryPalette,
    tone: (s) => 10,
    background: (s) => MaterialDynamicColors.secondaryFixedDim,
    secondBackground: (s) => MaterialDynamicColors.secondaryFixed,
    contrastCurve: new ContrastCurve(4.5, 7, 11, 21),
  });
  MaterialDynamicColors.onSecondaryFixedVariant = DynamicColor.fromPalette({
    name: "on_secondary_fixed_variant",
    palette: (s) => s.secondaryPalette,
    tone: (s) => (isMonochrome(s) ? 25 : 30),
    background: (s) => MaterialDynamicColors.secondaryFixedDim,
    secondBackground: (s) => MaterialDynamicColors.secondaryFixed,
    contrastCurve: new ContrastCurve(3, 4.5, 7, 11),
  });
  MaterialDynamicColors.tertiaryFixed = DynamicColor.fromPalette({
    name: "tertiary_fixed",
    palette: (s) => s.tertiaryPalette,
    tone: (s) => (isMonochrome(s) ? 40 : 90),
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.tertiaryFixed,
        MaterialDynamicColors.tertiaryFixedDim,
        10,
        "lighter",
        true,
      ),
  });
  MaterialDynamicColors.tertiaryFixedDim = DynamicColor.fromPalette({
    name: "tertiary_fixed_dim",
    palette: (s) => s.tertiaryPalette,
    tone: (s) => (isMonochrome(s) ? 30 : 80),
    isBackground: true,
    background: (s) => MaterialDynamicColors.highestSurface(s),
    contrastCurve: new ContrastCurve(1, 1, 3, 4.5),
    toneDeltaPair: (s) =>
      new ToneDeltaPair(
        MaterialDynamicColors.tertiaryFixed,
        MaterialDynamicColors.tertiaryFixedDim,
        10,
        "lighter",
        true,
      ),
  });
  MaterialDynamicColors.onTertiaryFixed = DynamicColor.fromPalette({
    name: "on_tertiary_fixed",
    palette: (s) => s.tertiaryPalette,
    tone: (s) => (isMonochrome(s) ? 100 : 10),
    background: (s) => MaterialDynamicColors.tertiaryFixedDim,
    secondBackground: (s) => MaterialDynamicColors.tertiaryFixed,
    contrastCurve: new ContrastCurve(4.5, 7, 11, 21),
  });
  MaterialDynamicColors.onTertiaryFixedVariant = DynamicColor.fromPalette({
    name: "on_tertiary_fixed_variant",
    palette: (s) => s.tertiaryPalette,
    tone: (s) => (isMonochrome(s) ? 90 : 30),
    background: (s) => MaterialDynamicColors.tertiaryFixedDim,
    secondBackground: (s) => MaterialDynamicColors.tertiaryFixed,
    contrastCurve: new ContrastCurve(3, 4.5, 7, 11),
  });

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/dynamiccolor/dynamic_scheme.js
  var DynamicScheme = class {
    constructor(args) {
      this.sourceColorArgb = args.sourceColorArgb;
      this.variant = args.variant;
      this.contrastLevel = args.contrastLevel;
      this.isDark = args.isDark;
      this.sourceColorHct = Hct.fromInt(args.sourceColorArgb);
      this.primaryPalette = args.primaryPalette;
      this.secondaryPalette = args.secondaryPalette;
      this.tertiaryPalette = args.tertiaryPalette;
      this.neutralPalette = args.neutralPalette;
      this.neutralVariantPalette = args.neutralVariantPalette;
      this.errorPalette = TonalPalette.fromHueAndChroma(25, 84);
    }
    /**
     * Support design spec'ing Dynamic Color by schemes that specify hue
     * rotations that should be applied at certain breakpoints.
     * @param sourceColor the source color of the theme, in HCT.
     * @param hues The "breakpoints", i.e. the hues at which a rotation should
     * be apply.
     * @param rotations The rotation that should be applied when source color's
     * hue is >= the same index in hues array, and <= the hue at the next index
     * in hues array.
     */
    static getRotatedHue(sourceColor, hues, rotations) {
      const sourceHue = sourceColor.hue;
      if (hues.length !== rotations.length) {
        throw new Error(
          `mismatch between hue length ${hues.length} & rotations ${rotations.length}`,
        );
      }
      if (rotations.length === 1) {
        return sanitizeDegreesDouble(sourceColor.hue + rotations[0]);
      }
      const size = hues.length;
      for (let i = 0; i <= size - 2; i++) {
        const thisHue = hues[i];
        const nextHue = hues[i + 1];
        if (thisHue < sourceHue && sourceHue < nextHue) {
          return sanitizeDegreesDouble(sourceHue + rotations[i]);
        }
      }
      return sourceHue;
    }
    getArgb(dynamicColor) {
      return dynamicColor.getArgb(this);
    }
    getHct(dynamicColor) {
      return dynamicColor.getHct(this);
    }
    get primaryPaletteKeyColor() {
      return this.getArgb(MaterialDynamicColors.primaryPaletteKeyColor);
    }
    get secondaryPaletteKeyColor() {
      return this.getArgb(MaterialDynamicColors.secondaryPaletteKeyColor);
    }
    get tertiaryPaletteKeyColor() {
      return this.getArgb(MaterialDynamicColors.tertiaryPaletteKeyColor);
    }
    get neutralPaletteKeyColor() {
      return this.getArgb(MaterialDynamicColors.neutralPaletteKeyColor);
    }
    get neutralVariantPaletteKeyColor() {
      return this.getArgb(MaterialDynamicColors.neutralVariantPaletteKeyColor);
    }
    get background() {
      return this.getArgb(MaterialDynamicColors.background);
    }
    get onBackground() {
      return this.getArgb(MaterialDynamicColors.onBackground);
    }
    get surface() {
      return this.getArgb(MaterialDynamicColors.surface);
    }
    get surfaceDim() {
      return this.getArgb(MaterialDynamicColors.surfaceDim);
    }
    get surfaceBright() {
      return this.getArgb(MaterialDynamicColors.surfaceBright);
    }
    get surfaceContainerLowest() {
      return this.getArgb(MaterialDynamicColors.surfaceContainerLowest);
    }
    get surfaceContainerLow() {
      return this.getArgb(MaterialDynamicColors.surfaceContainerLow);
    }
    get surfaceContainer() {
      return this.getArgb(MaterialDynamicColors.surfaceContainer);
    }
    get surfaceContainerHigh() {
      return this.getArgb(MaterialDynamicColors.surfaceContainerHigh);
    }
    get surfaceContainerHighest() {
      return this.getArgb(MaterialDynamicColors.surfaceContainerHighest);
    }
    get onSurface() {
      return this.getArgb(MaterialDynamicColors.onSurface);
    }
    get surfaceVariant() {
      return this.getArgb(MaterialDynamicColors.surfaceVariant);
    }
    get onSurfaceVariant() {
      return this.getArgb(MaterialDynamicColors.onSurfaceVariant);
    }
    get inverseSurface() {
      return this.getArgb(MaterialDynamicColors.inverseSurface);
    }
    get inverseOnSurface() {
      return this.getArgb(MaterialDynamicColors.inverseOnSurface);
    }
    get outline() {
      return this.getArgb(MaterialDynamicColors.outline);
    }
    get outlineVariant() {
      return this.getArgb(MaterialDynamicColors.outlineVariant);
    }
    get shadow() {
      return this.getArgb(MaterialDynamicColors.shadow);
    }
    get scrim() {
      return this.getArgb(MaterialDynamicColors.scrim);
    }
    get surfaceTint() {
      return this.getArgb(MaterialDynamicColors.surfaceTint);
    }
    get primary() {
      return this.getArgb(MaterialDynamicColors.primary);
    }
    get onPrimary() {
      return this.getArgb(MaterialDynamicColors.onPrimary);
    }
    get primaryContainer() {
      return this.getArgb(MaterialDynamicColors.primaryContainer);
    }
    get onPrimaryContainer() {
      return this.getArgb(MaterialDynamicColors.onPrimaryContainer);
    }
    get inversePrimary() {
      return this.getArgb(MaterialDynamicColors.inversePrimary);
    }
    get secondary() {
      return this.getArgb(MaterialDynamicColors.secondary);
    }
    get onSecondary() {
      return this.getArgb(MaterialDynamicColors.onSecondary);
    }
    get secondaryContainer() {
      return this.getArgb(MaterialDynamicColors.secondaryContainer);
    }
    get onSecondaryContainer() {
      return this.getArgb(MaterialDynamicColors.onSecondaryContainer);
    }
    get tertiary() {
      return this.getArgb(MaterialDynamicColors.tertiary);
    }
    get onTertiary() {
      return this.getArgb(MaterialDynamicColors.onTertiary);
    }
    get tertiaryContainer() {
      return this.getArgb(MaterialDynamicColors.tertiaryContainer);
    }
    get onTertiaryContainer() {
      return this.getArgb(MaterialDynamicColors.onTertiaryContainer);
    }
    get error() {
      return this.getArgb(MaterialDynamicColors.error);
    }
    get onError() {
      return this.getArgb(MaterialDynamicColors.onError);
    }
    get errorContainer() {
      return this.getArgb(MaterialDynamicColors.errorContainer);
    }
    get onErrorContainer() {
      return this.getArgb(MaterialDynamicColors.onErrorContainer);
    }
    get primaryFixed() {
      return this.getArgb(MaterialDynamicColors.primaryFixed);
    }
    get primaryFixedDim() {
      return this.getArgb(MaterialDynamicColors.primaryFixedDim);
    }
    get onPrimaryFixed() {
      return this.getArgb(MaterialDynamicColors.onPrimaryFixed);
    }
    get onPrimaryFixedVariant() {
      return this.getArgb(MaterialDynamicColors.onPrimaryFixedVariant);
    }
    get secondaryFixed() {
      return this.getArgb(MaterialDynamicColors.secondaryFixed);
    }
    get secondaryFixedDim() {
      return this.getArgb(MaterialDynamicColors.secondaryFixedDim);
    }
    get onSecondaryFixed() {
      return this.getArgb(MaterialDynamicColors.onSecondaryFixed);
    }
    get onSecondaryFixedVariant() {
      return this.getArgb(MaterialDynamicColors.onSecondaryFixedVariant);
    }
    get tertiaryFixed() {
      return this.getArgb(MaterialDynamicColors.tertiaryFixed);
    }
    get tertiaryFixedDim() {
      return this.getArgb(MaterialDynamicColors.tertiaryFixedDim);
    }
    get onTertiaryFixed() {
      return this.getArgb(MaterialDynamicColors.onTertiaryFixed);
    }
    get onTertiaryFixedVariant() {
      return this.getArgb(MaterialDynamicColors.onTertiaryFixedVariant);
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/palettes/core_palette.js
  var CorePalette = class _CorePalette {
    /**
     * @param argb ARGB representation of a color
     */
    static of(argb) {
      return new _CorePalette(argb, false);
    }
    /**
     * @param argb ARGB representation of a color
     */
    static contentOf(argb) {
      return new _CorePalette(argb, true);
    }
    /**
     * Create a [CorePalette] from a set of colors
     */
    static fromColors(colors) {
      return _CorePalette.createPaletteFromColors(false, colors);
    }
    /**
     * Create a content [CorePalette] from a set of colors
     */
    static contentFromColors(colors) {
      return _CorePalette.createPaletteFromColors(true, colors);
    }
    static createPaletteFromColors(content, colors) {
      const palette = new _CorePalette(colors.primary, content);
      if (colors.secondary) {
        const p = new _CorePalette(colors.secondary, content);
        palette.a2 = p.a1;
      }
      if (colors.tertiary) {
        const p = new _CorePalette(colors.tertiary, content);
        palette.a3 = p.a1;
      }
      if (colors.error) {
        const p = new _CorePalette(colors.error, content);
        palette.error = p.a1;
      }
      if (colors.neutral) {
        const p = new _CorePalette(colors.neutral, content);
        palette.n1 = p.n1;
      }
      if (colors.neutralVariant) {
        const p = new _CorePalette(colors.neutralVariant, content);
        palette.n2 = p.n2;
      }
      return palette;
    }
    constructor(argb, isContent) {
      const hct = Hct.fromInt(argb);
      const hue = hct.hue;
      const chroma = hct.chroma;
      if (isContent) {
        this.a1 = TonalPalette.fromHueAndChroma(hue, chroma);
        this.a2 = TonalPalette.fromHueAndChroma(hue, chroma / 3);
        this.a3 = TonalPalette.fromHueAndChroma(hue + 60, chroma / 2);
        this.n1 = TonalPalette.fromHueAndChroma(hue, Math.min(chroma / 12, 4));
        this.n2 = TonalPalette.fromHueAndChroma(hue, Math.min(chroma / 6, 8));
      } else {
        this.a1 = TonalPalette.fromHueAndChroma(hue, Math.max(48, chroma));
        this.a2 = TonalPalette.fromHueAndChroma(hue, 16);
        this.a3 = TonalPalette.fromHueAndChroma(hue + 60, 24);
        this.n1 = TonalPalette.fromHueAndChroma(hue, 4);
        this.n2 = TonalPalette.fromHueAndChroma(hue, 8);
      }
      this.error = TonalPalette.fromHueAndChroma(25, 84);
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/temperature/temperature_cache.js
  var TemperatureCache = class _TemperatureCache {
    constructor(input) {
      this.input = input;
      this.hctsByTempCache = [];
      this.hctsByHueCache = [];
      this.tempsByHctCache = /* @__PURE__ */ new Map();
      this.inputRelativeTemperatureCache = -1;
      this.complementCache = null;
    }
    get hctsByTemp() {
      if (this.hctsByTempCache.length > 0) {
        return this.hctsByTempCache;
      }
      const hcts = this.hctsByHue.concat([this.input]);
      const temperaturesByHct = this.tempsByHct;
      hcts.sort((a, b) => temperaturesByHct.get(a) - temperaturesByHct.get(b));
      this.hctsByTempCache = hcts;
      return hcts;
    }
    get warmest() {
      return this.hctsByTemp[this.hctsByTemp.length - 1];
    }
    get coldest() {
      return this.hctsByTemp[0];
    }
    /**
     * A set of colors with differing hues, equidistant in temperature.
     *
     * In art, this is usually described as a set of 5 colors on a color wheel
     * divided into 12 sections. This method allows provision of either of those
     * values.
     *
     * Behavior is undefined when [count] or [divisions] is 0.
     * When divisions < count, colors repeat.
     *
     * [count] The number of colors to return, includes the input color.
     * [divisions] The number of divisions on the color wheel.
     */
    analogous(count = 5, divisions = 12) {
      const startHue = Math.round(this.input.hue);
      const startHct = this.hctsByHue[startHue];
      let lastTemp = this.relativeTemperature(startHct);
      const allColors = [startHct];
      let absoluteTotalTempDelta = 0;
      for (let i = 0; i < 360; i++) {
        const hue = sanitizeDegreesInt(startHue + i);
        const hct = this.hctsByHue[hue];
        const temp = this.relativeTemperature(hct);
        const tempDelta = Math.abs(temp - lastTemp);
        lastTemp = temp;
        absoluteTotalTempDelta += tempDelta;
      }
      let hueAddend = 1;
      const tempStep = absoluteTotalTempDelta / divisions;
      let totalTempDelta = 0;
      lastTemp = this.relativeTemperature(startHct);
      while (allColors.length < divisions) {
        const hue = sanitizeDegreesInt(startHue + hueAddend);
        const hct = this.hctsByHue[hue];
        const temp = this.relativeTemperature(hct);
        const tempDelta = Math.abs(temp - lastTemp);
        totalTempDelta += tempDelta;
        const desiredTotalTempDeltaForIndex = allColors.length * tempStep;
        let indexSatisfied = totalTempDelta >= desiredTotalTempDeltaForIndex;
        let indexAddend = 1;
        while (indexSatisfied && allColors.length < divisions) {
          allColors.push(hct);
          const desiredTotalTempDeltaForIndex2 =
            (allColors.length + indexAddend) * tempStep;
          indexSatisfied = totalTempDelta >= desiredTotalTempDeltaForIndex2;
          indexAddend++;
        }
        lastTemp = temp;
        hueAddend++;
        if (hueAddend > 360) {
          while (allColors.length < divisions) {
            allColors.push(hct);
          }
          break;
        }
      }
      const answers = [this.input];
      const increaseHueCount = Math.floor((count - 1) / 2);
      for (let i = 1; i < increaseHueCount + 1; i++) {
        let index = 0 - i;
        while (index < 0) {
          index = allColors.length + index;
        }
        if (index >= allColors.length) {
          index = index % allColors.length;
        }
        answers.splice(0, 0, allColors[index]);
      }
      const decreaseHueCount = count - increaseHueCount - 1;
      for (let i = 1; i < decreaseHueCount + 1; i++) {
        let index = i;
        while (index < 0) {
          index = allColors.length + index;
        }
        if (index >= allColors.length) {
          index = index % allColors.length;
        }
        answers.push(allColors[index]);
      }
      return answers;
    }
    /**
     * A color that complements the input color aesthetically.
     *
     * In art, this is usually described as being across the color wheel.
     * History of this shows intent as a color that is just as cool-warm as the
     * input color is warm-cool.
     */
    get complement() {
      if (this.complementCache != null) {
        return this.complementCache;
      }
      const coldestHue = this.coldest.hue;
      const coldestTemp = this.tempsByHct.get(this.coldest);
      const warmestHue = this.warmest.hue;
      const warmestTemp = this.tempsByHct.get(this.warmest);
      const range = warmestTemp - coldestTemp;
      const startHueIsColdestToWarmest = _TemperatureCache.isBetween(
        this.input.hue,
        coldestHue,
        warmestHue,
      );
      const startHue = startHueIsColdestToWarmest ? warmestHue : coldestHue;
      const endHue = startHueIsColdestToWarmest ? coldestHue : warmestHue;
      const directionOfRotation = 1;
      let smallestError = 1e3;
      let answer = this.hctsByHue[Math.round(this.input.hue)];
      const complementRelativeTemp = 1 - this.inputRelativeTemperature;
      for (let hueAddend = 0; hueAddend <= 360; hueAddend += 1) {
        const hue = sanitizeDegreesDouble(
          startHue + directionOfRotation * hueAddend,
        );
        if (!_TemperatureCache.isBetween(hue, startHue, endHue)) {
          continue;
        }
        const possibleAnswer = this.hctsByHue[Math.round(hue)];
        const relativeTemp =
          (this.tempsByHct.get(possibleAnswer) - coldestTemp) / range;
        const error = Math.abs(complementRelativeTemp - relativeTemp);
        if (error < smallestError) {
          smallestError = error;
          answer = possibleAnswer;
        }
      }
      this.complementCache = answer;
      return this.complementCache;
    }
    /**
     * Temperature relative to all colors with the same chroma and tone.
     * Value on a scale from 0 to 1.
     */
    relativeTemperature(hct) {
      const range =
        this.tempsByHct.get(this.warmest) - this.tempsByHct.get(this.coldest);
      const differenceFromColdest =
        this.tempsByHct.get(hct) - this.tempsByHct.get(this.coldest);
      if (range === 0) {
        return 0.5;
      }
      return differenceFromColdest / range;
    }
    /** Relative temperature of the input color. See [relativeTemperature]. */
    get inputRelativeTemperature() {
      if (this.inputRelativeTemperatureCache >= 0) {
        return this.inputRelativeTemperatureCache;
      }
      this.inputRelativeTemperatureCache = this.relativeTemperature(this.input);
      return this.inputRelativeTemperatureCache;
    }
    /** A Map with keys of HCTs in [hctsByTemp], values of raw temperature. */
    get tempsByHct() {
      if (this.tempsByHctCache.size > 0) {
        return this.tempsByHctCache;
      }
      const allHcts = this.hctsByHue.concat([this.input]);
      const temperaturesByHct = /* @__PURE__ */ new Map();
      for (const e of allHcts) {
        temperaturesByHct.set(e, _TemperatureCache.rawTemperature(e));
      }
      this.tempsByHctCache = temperaturesByHct;
      return temperaturesByHct;
    }
    /**
     * HCTs for all hues, with the same chroma/tone as the input.
     * Sorted ascending, hue 0 to 360.
     */
    get hctsByHue() {
      if (this.hctsByHueCache.length > 0) {
        return this.hctsByHueCache;
      }
      const hcts = [];
      for (let hue = 0; hue <= 360; hue += 1) {
        const colorAtHue = Hct.from(hue, this.input.chroma, this.input.tone);
        hcts.push(colorAtHue);
      }
      this.hctsByHueCache = hcts;
      return this.hctsByHueCache;
    }
    /** Determines if an angle is between two other angles, rotating clockwise. */
    static isBetween(angle, a, b) {
      if (a < b) {
        return a <= angle && angle <= b;
      }
      return a <= angle || angle <= b;
    }
    /**
     * Value representing cool-warm factor of a color.
     * Values below 0 are considered cool, above, warm.
     *
     * Color science has researched emotion and harmony, which art uses to select
     * colors. Warm-cool is the foundation of analogous and complementary colors.
     * See:
     * - Li-Chen Ou's Chapter 19 in Handbook of Color Psychology (2015).
     * - Josef Albers' Interaction of Color chapters 19 and 21.
     *
     * Implementation of Ou, Woodcock and Wright's algorithm, which uses
     * L*a*b* / LCH color space.
     * Return value has these properties:
     * - Values below 0 are cool, above 0 are warm.
     * - Lower bound: -0.52 - (chroma ^ 1.07 / 20). L*a*b* chroma is infinite.
     *   Assuming max of 130 chroma, -9.66.
     * - Upper bound: -0.52 + (chroma ^ 1.07 / 20). L*a*b* chroma is infinite.
     *   Assuming max of 130 chroma, 8.61.
     */
    static rawTemperature(color) {
      const lab = labFromArgb(color.toInt());
      const hue = sanitizeDegreesDouble(
        (Math.atan2(lab[2], lab[1]) * 180) / Math.PI,
      );
      const chroma = Math.sqrt(lab[1] * lab[1] + lab[2] * lab[2]);
      const temperature =
        -0.5 +
        0.02 *
          Math.pow(chroma, 1.07) *
          Math.cos((sanitizeDegreesDouble(hue - 50) * Math.PI) / 180);
      return temperature;
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/scheme/scheme_content.js
  var SchemeContent = class extends DynamicScheme {
    constructor(sourceColorHct, isDark, contrastLevel) {
      super({
        sourceColorArgb: sourceColorHct.toInt(),
        variant: Variant.CONTENT,
        contrastLevel,
        isDark,
        primaryPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue,
          sourceColorHct.chroma,
        ),
        secondaryPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue,
          Math.max(sourceColorHct.chroma - 32, sourceColorHct.chroma * 0.5),
        ),
        tertiaryPalette: TonalPalette.fromInt(
          DislikeAnalyzer.fixIfDisliked(
            new TemperatureCache(sourceColorHct).analogous(3, 6)[2],
          ).toInt(),
        ),
        neutralPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue,
          sourceColorHct.chroma / 8,
        ),
        neutralVariantPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue,
          sourceColorHct.chroma / 8 + 4,
        ),
      });
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/scheme/scheme_expressive.js
  var SchemeExpressive = class _SchemeExpressive extends DynamicScheme {
    constructor(sourceColorHct, isDark, contrastLevel) {
      super({
        sourceColorArgb: sourceColorHct.toInt(),
        variant: Variant.EXPRESSIVE,
        contrastLevel,
        isDark,
        primaryPalette: TonalPalette.fromHueAndChroma(
          sanitizeDegreesDouble(sourceColorHct.hue + 240),
          40,
        ),
        secondaryPalette: TonalPalette.fromHueAndChroma(
          DynamicScheme.getRotatedHue(
            sourceColorHct,
            _SchemeExpressive.hues,
            _SchemeExpressive.secondaryRotations,
          ),
          24,
        ),
        tertiaryPalette: TonalPalette.fromHueAndChroma(
          DynamicScheme.getRotatedHue(
            sourceColorHct,
            _SchemeExpressive.hues,
            _SchemeExpressive.tertiaryRotations,
          ),
          32,
        ),
        neutralPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue + 15,
          8,
        ),
        neutralVariantPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue + 15,
          12,
        ),
      });
    }
  };
  SchemeExpressive.hues = [0, 21, 51, 121, 151, 191, 271, 321, 360];
  SchemeExpressive.secondaryRotations = [45, 95, 45, 20, 45, 90, 45, 45, 45];
  SchemeExpressive.tertiaryRotations = [120, 120, 20, 45, 20, 15, 20, 120, 120];

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/scheme/scheme_fidelity.js
  var SchemeFidelity = class extends DynamicScheme {
    constructor(sourceColorHct, isDark, contrastLevel) {
      super({
        sourceColorArgb: sourceColorHct.toInt(),
        variant: Variant.FIDELITY,
        contrastLevel,
        isDark,
        primaryPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue,
          sourceColorHct.chroma,
        ),
        secondaryPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue,
          Math.max(sourceColorHct.chroma - 32, sourceColorHct.chroma * 0.5),
        ),
        tertiaryPalette: TonalPalette.fromInt(
          DislikeAnalyzer.fixIfDisliked(
            new TemperatureCache(sourceColorHct).complement,
          ).toInt(),
        ),
        neutralPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue,
          sourceColorHct.chroma / 8,
        ),
        neutralVariantPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue,
          sourceColorHct.chroma / 8 + 4,
        ),
      });
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/scheme/scheme_monochrome.js
  var SchemeMonochrome = class extends DynamicScheme {
    constructor(sourceColorHct, isDark, contrastLevel) {
      super({
        sourceColorArgb: sourceColorHct.toInt(),
        variant: Variant.MONOCHROME,
        contrastLevel,
        isDark,
        primaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0),
        secondaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0),
        tertiaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0),
        neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0),
        neutralVariantPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue,
          0,
        ),
      });
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/scheme/scheme_neutral.js
  var SchemeNeutral = class extends DynamicScheme {
    constructor(sourceColorHct, isDark, contrastLevel) {
      super({
        sourceColorArgb: sourceColorHct.toInt(),
        variant: Variant.NEUTRAL,
        contrastLevel,
        isDark,
        primaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 12),
        secondaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 8),
        tertiaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16),
        neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 2),
        neutralVariantPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue,
          2,
        ),
      });
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/scheme/scheme_tonal_spot.js
  var SchemeTonalSpot = class extends DynamicScheme {
    constructor(sourceColorHct, isDark, contrastLevel) {
      super({
        sourceColorArgb: sourceColorHct.toInt(),
        variant: Variant.TONAL_SPOT,
        contrastLevel,
        isDark,
        primaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 36),
        secondaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16),
        tertiaryPalette: TonalPalette.fromHueAndChroma(
          sanitizeDegreesDouble(sourceColorHct.hue + 60),
          24,
        ),
        neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 6),
        neutralVariantPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue,
          8,
        ),
      });
    }
  };

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/scheme/scheme_vibrant.js
  var SchemeVibrant = class _SchemeVibrant extends DynamicScheme {
    constructor(sourceColorHct, isDark, contrastLevel) {
      super({
        sourceColorArgb: sourceColorHct.toInt(),
        variant: Variant.VIBRANT,
        contrastLevel,
        isDark,
        primaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 200),
        secondaryPalette: TonalPalette.fromHueAndChroma(
          DynamicScheme.getRotatedHue(
            sourceColorHct,
            _SchemeVibrant.hues,
            _SchemeVibrant.secondaryRotations,
          ),
          24,
        ),
        tertiaryPalette: TonalPalette.fromHueAndChroma(
          DynamicScheme.getRotatedHue(
            sourceColorHct,
            _SchemeVibrant.hues,
            _SchemeVibrant.tertiaryRotations,
          ),
          32,
        ),
        neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 10),
        neutralVariantPalette: TonalPalette.fromHueAndChroma(
          sourceColorHct.hue,
          12,
        ),
      });
    }
  };
  SchemeVibrant.hues = [0, 41, 61, 101, 131, 181, 251, 301, 360];
  SchemeVibrant.secondaryRotations = [18, 15, 10, 12, 15, 18, 15, 12, 12];
  SchemeVibrant.tertiaryRotations = [35, 30, 20, 25, 30, 35, 30, 25, 25];

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/score/score.js
  var SCORE_OPTION_DEFAULTS = {
    desired: 4,
    fallbackColorARGB: 4282549748,
    filter: true,
    // Avoid unsuitable colors.
  };
  function compare(a, b) {
    if (a.score > b.score) {
      return -1;
    } else if (a.score < b.score) {
      return 1;
    }
    return 0;
  }
  var Score = class _Score {
    constructor() {}
    /**
     * Given a map with keys of colors and values of how often the color appears,
     * rank the colors based on suitability for being used for a UI theme.
     *
     * @param colorsToPopulation map with keys of colors and values of how often
     *     the color appears, usually from a source image.
     * @param {ScoreOptions} options optional parameters.
     * @return Colors sorted by suitability for a UI theme. The most suitable
     *     color is the first item, the least suitable is the last. There will
     *     always be at least one color returned. If all the input colors
     *     were not suitable for a theme, a default fallback color will be
     *     provided, Google Blue.
     */
    static score(colorsToPopulation, options) {
      const { desired, fallbackColorARGB, filter } = {
        ...SCORE_OPTION_DEFAULTS,
        ...options,
      };
      const colorsHct = [];
      const huePopulation = new Array(360).fill(0);
      let populationSum = 0;
      for (const [argb, population] of colorsToPopulation.entries()) {
        const hct = Hct.fromInt(argb);
        colorsHct.push(hct);
        const hue = Math.floor(hct.hue);
        huePopulation[hue] += population;
        populationSum += population;
      }
      const hueExcitedProportions = new Array(360).fill(0);
      for (let hue = 0; hue < 360; hue++) {
        const proportion = huePopulation[hue] / populationSum;
        for (let i = hue - 14; i < hue + 16; i++) {
          const neighborHue = sanitizeDegreesInt(i);
          hueExcitedProportions[neighborHue] += proportion;
        }
      }
      const scoredHct = new Array();
      for (const hct of colorsHct) {
        const hue = sanitizeDegreesInt(Math.round(hct.hue));
        const proportion = hueExcitedProportions[hue];
        if (
          filter &&
          (hct.chroma < _Score.CUTOFF_CHROMA ||
            proportion <= _Score.CUTOFF_EXCITED_PROPORTION)
        ) {
          continue;
        }
        const proportionScore = proportion * 100 * _Score.WEIGHT_PROPORTION;
        const chromaWeight =
          hct.chroma < _Score.TARGET_CHROMA
            ? _Score.WEIGHT_CHROMA_BELOW
            : _Score.WEIGHT_CHROMA_ABOVE;
        const chromaScore = (hct.chroma - _Score.TARGET_CHROMA) * chromaWeight;
        const score = proportionScore + chromaScore;
        scoredHct.push({ hct, score });
      }
      scoredHct.sort(compare);
      const chosenColors = [];
      for (
        let differenceDegrees2 = 90;
        differenceDegrees2 >= 15;
        differenceDegrees2--
      ) {
        chosenColors.length = 0;
        for (const { hct } of scoredHct) {
          const duplicateHue = chosenColors.find((chosenHct) => {
            return (
              differenceDegrees(hct.hue, chosenHct.hue) < differenceDegrees2
            );
          });
          if (!duplicateHue) {
            chosenColors.push(hct);
          }
          if (chosenColors.length >= desired) break;
        }
        if (chosenColors.length >= desired) break;
      }
      const colors = [];
      if (chosenColors.length === 0) {
        colors.push(fallbackColorARGB);
      }
      for (const chosenHct of chosenColors) {
        colors.push(chosenHct.toInt());
      }
      return colors;
    }
  };
  Score.TARGET_CHROMA = 48;
  Score.WEIGHT_PROPORTION = 0.7;
  Score.WEIGHT_CHROMA_ABOVE = 0.3;
  Score.WEIGHT_CHROMA_BELOW = 0.1;
  Score.CUTOFF_CHROMA = 5;
  Score.CUTOFF_EXCITED_PROPORTION = 0.01;

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/utils/string_utils.js
  function hexFromArgb(argb) {
    const r = redFromArgb(argb);
    const g = greenFromArgb(argb);
    const b = blueFromArgb(argb);
    const outParts = [r.toString(16), g.toString(16), b.toString(16)];
    for (const [i, part] of outParts.entries()) {
      if (part.length === 1) {
        outParts[i] = "0" + part;
      }
    }
    return "#" + outParts.join("");
  }
  function argbFromHex(hex) {
    hex = hex.replace("#", "");
    const isThree = hex.length === 3;
    const isSix = hex.length === 6;
    const isEight = hex.length === 8;
    if (!isThree && !isSix && !isEight) {
      throw new Error("unexpected hex " + hex);
    }
    let r = 0;
    let g = 0;
    let b = 0;
    if (isThree) {
      r = parseIntHex(hex.slice(0, 1).repeat(2));
      g = parseIntHex(hex.slice(1, 2).repeat(2));
      b = parseIntHex(hex.slice(2, 3).repeat(2));
    } else if (isSix) {
      r = parseIntHex(hex.slice(0, 2));
      g = parseIntHex(hex.slice(2, 4));
      b = parseIntHex(hex.slice(4, 6));
    } else if (isEight) {
      r = parseIntHex(hex.slice(2, 4));
      g = parseIntHex(hex.slice(4, 6));
      b = parseIntHex(hex.slice(6, 8));
    }
    return (
      ((255 << 24) | ((r & 255) << 16) | ((g & 255) << 8) | (b & 255)) >>> 0
    );
  }
  function parseIntHex(value) {
    return parseInt(value, 16);
  }

  // node_modules/.pnpm/@material+material-color-utilities@0.3.0/node_modules/@material/material-color-utilities/utils/theme_utils.js
  function customColor(source, color) {
    let value = color.value;
    const from = value;
    const to = source;
    if (color.blend) {
      value = Blend.harmonize(from, to);
    }
    const palette = CorePalette.of(value);
    const tones = palette.a1;
    return {
      color,
      value,
      light: {
        color: tones.tone(40),
        onColor: tones.tone(100),
        colorContainer: tones.tone(90),
        onColorContainer: tones.tone(10),
      },
      dark: {
        color: tones.tone(80),
        onColor: tones.tone(20),
        colorContainer: tones.tone(30),
        onColorContainer: tones.tone(90),
      },
    };
  }

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_freeGlobal.js
  var freeGlobal =
    typeof global == "object" && global && global.Object === Object && global;
  var freeGlobal_default = freeGlobal;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_root.js
  var freeSelf =
    typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal_default || freeSelf || Function("return this")();
  var root_default = root;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_Symbol.js
  var Symbol2 = root_default.Symbol;
  var Symbol_default = Symbol2;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_getRawTag.js
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {}
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  var getRawTag_default = getRawTag;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_objectToString.js
  var objectProto2 = Object.prototype;
  var nativeObjectToString2 = objectProto2.toString;
  function objectToString(value) {
    return nativeObjectToString2.call(value);
  }
  var objectToString_default = objectToString;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_baseGetTag.js
  var nullTag = "[object Null]";
  var undefinedTag = "[object Undefined]";
  var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag2 && symToStringTag2 in Object(value)
      ? getRawTag_default(value)
      : objectToString_default(value);
  }
  var baseGetTag_default = baseGetTag;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/isObjectLike.js
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isObjectLike_default = isObjectLike;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/isSymbol.js
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return (
      typeof value == "symbol" ||
      (isObjectLike_default(value) && baseGetTag_default(value) == symbolTag)
    );
  }
  var isSymbol_default = isSymbol;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_arrayMap.js
  function arrayMap(array, iteratee) {
    var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }
  var arrayMap_default = arrayMap;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/isArray.js
  var isArray = Array.isArray;
  var isArray_default = isArray;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_baseToString.js
  var INFINITY = 1 / 0;
  var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
  var symbolToString = symbolProto ? symbolProto.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray_default(value)) {
      return arrayMap_default(value, baseToString) + "";
    }
    if (isSymbol_default(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  var baseToString_default = baseToString;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/toString.js
  function toString(value) {
    return value == null ? "" : baseToString_default(value);
  }
  var toString_default = toString;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_baseSlice.js
  function baseSlice(array, start, end) {
    var index = -1,
      length = array.length;
    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : (end - start) >>> 0;
    start >>>= 0;
    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }
  var baseSlice_default = baseSlice;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_castSlice.js
  function castSlice(array, start, end) {
    var length = array.length;
    end = end === void 0 ? length : end;
    return !start && end >= length
      ? array
      : baseSlice_default(array, start, end);
  }
  var castSlice_default = castSlice;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_hasUnicode.js
  var rsAstralRange = "\\ud800-\\udfff";
  var rsComboMarksRange = "\\u0300-\\u036f";
  var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
  var rsComboSymbolsRange = "\\u20d0-\\u20ff";
  var rsComboRange =
    rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
  var rsVarRange = "\\ufe0e\\ufe0f";
  var rsZWJ = "\\u200d";
  var reHasUnicode = RegExp(
    "[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]",
  );
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }
  var hasUnicode_default = hasUnicode;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_asciiToArray.js
  function asciiToArray(string) {
    return string.split("");
  }
  var asciiToArray_default = asciiToArray;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_unicodeToArray.js
  var rsAstralRange2 = "\\ud800-\\udfff";
  var rsComboMarksRange2 = "\\u0300-\\u036f";
  var reComboHalfMarksRange2 = "\\ufe20-\\ufe2f";
  var rsComboSymbolsRange2 = "\\u20d0-\\u20ff";
  var rsComboRange2 =
    rsComboMarksRange2 + reComboHalfMarksRange2 + rsComboSymbolsRange2;
  var rsVarRange2 = "\\ufe0e\\ufe0f";
  var rsAstral = "[" + rsAstralRange2 + "]";
  var rsCombo = "[" + rsComboRange2 + "]";
  var rsFitz = "\\ud83c[\\udffb-\\udfff]";
  var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
  var rsNonAstral = "[^" + rsAstralRange2 + "]";
  var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
  var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
  var rsZWJ2 = "\\u200d";
  var reOptMod = rsModifier + "?";
  var rsOptVar = "[" + rsVarRange2 + "]?";
  var rsOptJoin =
    "(?:" +
    rsZWJ2 +
    "(?:" +
    [rsNonAstral, rsRegional, rsSurrPair].join("|") +
    ")" +
    rsOptVar +
    reOptMod +
    ")*";
  var rsSeq = rsOptVar + reOptMod + rsOptJoin;
  var rsSymbol =
    "(?:" +
    [
      rsNonAstral + rsCombo + "?",
      rsCombo,
      rsRegional,
      rsSurrPair,
      rsAstral,
    ].join("|") +
    ")";
  var reUnicode = RegExp(
    rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq,
    "g",
  );
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }
  var unicodeToArray_default = unicodeToArray;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_stringToArray.js
  function stringToArray(string) {
    return hasUnicode_default(string)
      ? unicodeToArray_default(string)
      : asciiToArray_default(string);
  }
  var stringToArray_default = stringToArray;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_createCaseFirst.js
  function createCaseFirst(methodName) {
    return function (string) {
      string = toString_default(string);
      var strSymbols = hasUnicode_default(string)
        ? stringToArray_default(string)
        : void 0;
      var chr = strSymbols ? strSymbols[0] : string.charAt(0);
      var trailing = strSymbols
        ? castSlice_default(strSymbols, 1).join("")
        : string.slice(1);
      return chr[methodName]() + trailing;
    };
  }
  var createCaseFirst_default = createCaseFirst;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/upperFirst.js
  var upperFirst = createCaseFirst_default("toUpperCase");
  var upperFirst_default = upperFirst;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_arrayReduce.js
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
      length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }
  var arrayReduce_default = arrayReduce;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_basePropertyOf.js
  function basePropertyOf(object) {
    return function (key) {
      return object == null ? void 0 : object[key];
    };
  }
  var basePropertyOf_default = basePropertyOf;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_deburrLetter.js
  var deburredLetters = {
    // Latin-1 Supplement block.
    "\xC0": "A",
    "\xC1": "A",
    "\xC2": "A",
    "\xC3": "A",
    "\xC4": "A",
    "\xC5": "A",
    "\xE0": "a",
    "\xE1": "a",
    "\xE2": "a",
    "\xE3": "a",
    "\xE4": "a",
    "\xE5": "a",
    "\xC7": "C",
    "\xE7": "c",
    "\xD0": "D",
    "\xF0": "d",
    "\xC8": "E",
    "\xC9": "E",
    "\xCA": "E",
    "\xCB": "E",
    "\xE8": "e",
    "\xE9": "e",
    "\xEA": "e",
    "\xEB": "e",
    "\xCC": "I",
    "\xCD": "I",
    "\xCE": "I",
    "\xCF": "I",
    "\xEC": "i",
    "\xED": "i",
    "\xEE": "i",
    "\xEF": "i",
    "\xD1": "N",
    "\xF1": "n",
    "\xD2": "O",
    "\xD3": "O",
    "\xD4": "O",
    "\xD5": "O",
    "\xD6": "O",
    "\xD8": "O",
    "\xF2": "o",
    "\xF3": "o",
    "\xF4": "o",
    "\xF5": "o",
    "\xF6": "o",
    "\xF8": "o",
    "\xD9": "U",
    "\xDA": "U",
    "\xDB": "U",
    "\xDC": "U",
    "\xF9": "u",
    "\xFA": "u",
    "\xFB": "u",
    "\xFC": "u",
    "\xDD": "Y",
    "\xFD": "y",
    "\xFF": "y",
    "\xC6": "Ae",
    "\xE6": "ae",
    "\xDE": "Th",
    "\xFE": "th",
    "\xDF": "ss",
    // Latin Extended-A block.
    "\u0100": "A",
    "\u0102": "A",
    "\u0104": "A",
    "\u0101": "a",
    "\u0103": "a",
    "\u0105": "a",
    "\u0106": "C",
    "\u0108": "C",
    "\u010A": "C",
    "\u010C": "C",
    "\u0107": "c",
    "\u0109": "c",
    "\u010B": "c",
    "\u010D": "c",
    "\u010E": "D",
    "\u0110": "D",
    "\u010F": "d",
    "\u0111": "d",
    "\u0112": "E",
    "\u0114": "E",
    "\u0116": "E",
    "\u0118": "E",
    "\u011A": "E",
    "\u0113": "e",
    "\u0115": "e",
    "\u0117": "e",
    "\u0119": "e",
    "\u011B": "e",
    "\u011C": "G",
    "\u011E": "G",
    "\u0120": "G",
    "\u0122": "G",
    "\u011D": "g",
    "\u011F": "g",
    "\u0121": "g",
    "\u0123": "g",
    "\u0124": "H",
    "\u0126": "H",
    "\u0125": "h",
    "\u0127": "h",
    "\u0128": "I",
    "\u012A": "I",
    "\u012C": "I",
    "\u012E": "I",
    "\u0130": "I",
    "\u0129": "i",
    "\u012B": "i",
    "\u012D": "i",
    "\u012F": "i",
    "\u0131": "i",
    "\u0134": "J",
    "\u0135": "j",
    "\u0136": "K",
    "\u0137": "k",
    "\u0138": "k",
    "\u0139": "L",
    "\u013B": "L",
    "\u013D": "L",
    "\u013F": "L",
    "\u0141": "L",
    "\u013A": "l",
    "\u013C": "l",
    "\u013E": "l",
    "\u0140": "l",
    "\u0142": "l",
    "\u0143": "N",
    "\u0145": "N",
    "\u0147": "N",
    "\u014A": "N",
    "\u0144": "n",
    "\u0146": "n",
    "\u0148": "n",
    "\u014B": "n",
    "\u014C": "O",
    "\u014E": "O",
    "\u0150": "O",
    "\u014D": "o",
    "\u014F": "o",
    "\u0151": "o",
    "\u0154": "R",
    "\u0156": "R",
    "\u0158": "R",
    "\u0155": "r",
    "\u0157": "r",
    "\u0159": "r",
    "\u015A": "S",
    "\u015C": "S",
    "\u015E": "S",
    "\u0160": "S",
    "\u015B": "s",
    "\u015D": "s",
    "\u015F": "s",
    "\u0161": "s",
    "\u0162": "T",
    "\u0164": "T",
    "\u0166": "T",
    "\u0163": "t",
    "\u0165": "t",
    "\u0167": "t",
    "\u0168": "U",
    "\u016A": "U",
    "\u016C": "U",
    "\u016E": "U",
    "\u0170": "U",
    "\u0172": "U",
    "\u0169": "u",
    "\u016B": "u",
    "\u016D": "u",
    "\u016F": "u",
    "\u0171": "u",
    "\u0173": "u",
    "\u0174": "W",
    "\u0175": "w",
    "\u0176": "Y",
    "\u0177": "y",
    "\u0178": "Y",
    "\u0179": "Z",
    "\u017B": "Z",
    "\u017D": "Z",
    "\u017A": "z",
    "\u017C": "z",
    "\u017E": "z",
    "\u0132": "IJ",
    "\u0133": "ij",
    "\u0152": "Oe",
    "\u0153": "oe",
    "\u0149": "'n",
    "\u017F": "s",
  };
  var deburrLetter = basePropertyOf_default(deburredLetters);
  var deburrLetter_default = deburrLetter;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/deburr.js
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
  var rsComboMarksRange3 = "\\u0300-\\u036f";
  var reComboHalfMarksRange3 = "\\ufe20-\\ufe2f";
  var rsComboSymbolsRange3 = "\\u20d0-\\u20ff";
  var rsComboRange3 =
    rsComboMarksRange3 + reComboHalfMarksRange3 + rsComboSymbolsRange3;
  var rsCombo2 = "[" + rsComboRange3 + "]";
  var reComboMark = RegExp(rsCombo2, "g");
  function deburr(string) {
    string = toString_default(string);
    return (
      string &&
      string.replace(reLatin, deburrLetter_default).replace(reComboMark, "")
    );
  }
  var deburr_default = deburr;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_asciiWords.js
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }
  var asciiWords_default = asciiWords;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_hasUnicodeWord.js
  var reHasUnicodeWord =
    /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }
  var hasUnicodeWord_default = hasUnicodeWord;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_unicodeWords.js
  var rsAstralRange3 = "\\ud800-\\udfff";
  var rsComboMarksRange4 = "\\u0300-\\u036f";
  var reComboHalfMarksRange4 = "\\ufe20-\\ufe2f";
  var rsComboSymbolsRange4 = "\\u20d0-\\u20ff";
  var rsComboRange4 =
    rsComboMarksRange4 + reComboHalfMarksRange4 + rsComboSymbolsRange4;
  var rsDingbatRange = "\\u2700-\\u27bf";
  var rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff";
  var rsMathOpRange = "\\xac\\xb1\\xd7\\xf7";
  var rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf";
  var rsPunctuationRange = "\\u2000-\\u206f";
  var rsSpaceRange =
    " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
  var rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde";
  var rsVarRange3 = "\\ufe0e\\ufe0f";
  var rsBreakRange =
    rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
  var rsApos = "['\u2019]";
  var rsBreak = "[" + rsBreakRange + "]";
  var rsCombo3 = "[" + rsComboRange4 + "]";
  var rsDigits = "\\d+";
  var rsDingbat = "[" + rsDingbatRange + "]";
  var rsLower = "[" + rsLowerRange + "]";
  var rsMisc =
    "[^" +
    rsAstralRange3 +
    rsBreakRange +
    rsDigits +
    rsDingbatRange +
    rsLowerRange +
    rsUpperRange +
    "]";
  var rsFitz2 = "\\ud83c[\\udffb-\\udfff]";
  var rsModifier2 = "(?:" + rsCombo3 + "|" + rsFitz2 + ")";
  var rsNonAstral2 = "[^" + rsAstralRange3 + "]";
  var rsRegional2 = "(?:\\ud83c[\\udde6-\\uddff]){2}";
  var rsSurrPair2 = "[\\ud800-\\udbff][\\udc00-\\udfff]";
  var rsUpper = "[" + rsUpperRange + "]";
  var rsZWJ3 = "\\u200d";
  var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")";
  var rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")";
  var rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?";
  var rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?";
  var reOptMod2 = rsModifier2 + "?";
  var rsOptVar2 = "[" + rsVarRange3 + "]?";
  var rsOptJoin2 =
    "(?:" +
    rsZWJ3 +
    "(?:" +
    [rsNonAstral2, rsRegional2, rsSurrPair2].join("|") +
    ")" +
    rsOptVar2 +
    reOptMod2 +
    ")*";
  var rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])";
  var rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])";
  var rsSeq2 = rsOptVar2 + reOptMod2 + rsOptJoin2;
  var rsEmoji =
    "(?:" + [rsDingbat, rsRegional2, rsSurrPair2].join("|") + ")" + rsSeq2;
  var reUnicodeWord = RegExp(
    [
      rsUpper +
        "?" +
        rsLower +
        "+" +
        rsOptContrLower +
        "(?=" +
        [rsBreak, rsUpper, "$"].join("|") +
        ")",
      rsMiscUpper +
        "+" +
        rsOptContrUpper +
        "(?=" +
        [rsBreak, rsUpper + rsMiscLower, "$"].join("|") +
        ")",
      rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
      rsUpper + "+" + rsOptContrUpper,
      rsOrdUpper,
      rsOrdLower,
      rsDigits,
      rsEmoji,
    ].join("|"),
    "g",
  );
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }
  var unicodeWords_default = unicodeWords;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/words.js
  function words(string, pattern, guard) {
    string = toString_default(string);
    pattern = guard ? void 0 : pattern;
    if (pattern === void 0) {
      return hasUnicodeWord_default(string)
        ? unicodeWords_default(string)
        : asciiWords_default(string);
    }
    return string.match(pattern) || [];
  }
  var words_default = words;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/_createCompounder.js
  var rsApos2 = "['\u2019]";
  var reApos = RegExp(rsApos2, "g");
  function createCompounder(callback) {
    return function (string) {
      return arrayReduce_default(
        words_default(deburr_default(string).replace(reApos, "")),
        callback,
        "",
      );
    };
  }
  var createCompounder_default = createCompounder;

  // node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/kebabCase.js
  var kebabCase = createCompounder_default(function (result, word, index) {
    return result + (index ? "-" : "") + word.toLowerCase();
  });
  var kebabCase_default = kebabCase;

  // src/Mcu.tsx
  var import_react3 = __toESM(require_react(), 1);

  // src/Mcu.context.tsx
  var import_react2 = __toESM(require_react(), 1);

  // src/lib/createRequiredContext.ts
  var import_react = __toESM(require_react(), 1);
  var createRequiredContext = () => {
    const Ctx = (0, import_react.createContext)(null);
    const useCtx = () => {
      const contextValue = (0, import_react.useContext)(Ctx);
      if (contextValue === null) {
        throw new Error("Context value is null");
      }
      return contextValue;
    };
    return [useCtx, Ctx.Provider, Ctx];
  };

  // src/Mcu.context.tsx
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var [useMcu, Provider, McuContext] = createRequiredContext();

  // src/Mcu.tsx
  var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
  var schemesMap = {
    tonalSpot: SchemeTonalSpot,
    monochrome: SchemeMonochrome,
    neutral: SchemeNeutral,
    vibrant: SchemeVibrant,
    expressive: SchemeExpressive,
    fidelity: SchemeFidelity,
    content: SchemeContent,
  };
  var schemeNames = Object.keys(schemesMap);
  var DEFAULT_SCHEME = "tonalSpot";
  var DEFAULT_CONTRAST = 0;
  var DEFAULT_COLOR_MATCH = false;
  var DEFAULT_CUSTOM_COLORS = [];
  var STANDARD_TONES = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100,
  ];
  var Variant2 = {
    MONOCHROME: 0,
    NEUTRAL: 1,
    TONAL_SPOT: 2,
    VIBRANT: 3,
    EXPRESSIVE: 4,
    FIDELITY: 5,
    CONTENT: 6,
    RAINBOW: 7,
    FRUIT_SALAD: 8,
  };
  var schemeToVariant = {
    tonalSpot: Variant2.TONAL_SPOT,
    monochrome: Variant2.MONOCHROME,
    neutral: Variant2.NEUTRAL,
    vibrant: Variant2.VIBRANT,
    expressive: Variant2.EXPRESSIVE,
    fidelity: Variant2.FIDELITY,
    content: Variant2.CONTENT,
  };
  var tokenNames = [
    "background",
    "onBackground",
    "surface",
    "surfaceDim",
    "surfaceBright",
    "surfaceContainerLowest",
    "surfaceContainerLow",
    "surfaceContainer",
    "surfaceContainerHigh",
    "surfaceContainerHighest",
    "onSurface",
    "onSurfaceVariant",
    "outline",
    "outlineVariant",
    "inverseSurface",
    "inverseOnSurface",
    "primary",
    // "primaryDim",
    "onPrimary",
    "primaryContainer",
    "onPrimaryContainer",
    "primaryFixed",
    "primaryFixedDim",
    "onPrimaryFixed",
    "onPrimaryFixedVariant",
    "inversePrimary",
    "primaryFixed",
    "primaryFixedDim",
    "onPrimaryFixed",
    "onPrimaryFixedVariant",
    "secondary",
    // "secondaryDim",
    "onSecondary",
    "secondaryContainer",
    "onSecondaryContainer",
    "secondaryFixed",
    "secondaryFixedDim",
    "onSecondaryFixed",
    "onSecondaryFixedVariant",
    "tertiary",
    // "tertiaryDim",
    "onTertiary",
    "tertiaryContainer",
    "onTertiaryContainer",
    "tertiaryFixed",
    "tertiaryFixedDim",
    "onTertiaryFixed",
    "onTertiaryFixedVariant",
    "error",
    // "errorDim",
    "onError",
    "errorContainer",
    "onErrorContainer",
    "scrim",
    // added manually, was missing
    "shadow",
    // added manually, was missing
  ];
  function toRecord(arr, getEntry) {
    return arr.reduce((acc, item) => {
      const [key, value] = getEntry(item);
      acc[key] = value;
      return acc;
    }, {});
  }
  function mergeBaseAndCustomColors(scheme, customColors, sourceArgb) {
    const baseVars = toRecord(tokenNames, (tokenName) => {
      const dynamicColor = MaterialDynamicColors[tokenName];
      const argb = dynamicColor.getArgb(scheme);
      return [tokenName, argb];
    });
    const customVars = {};
    const isDark = scheme.isDark;
    customColors.forEach((color) => {
      const customColorGroup = customColor(sourceArgb, color);
      const colorGroup = isDark
        ? customColorGroup.dark
        : customColorGroup.light;
      const colorname = color.name;
      customVars[colorname] = colorGroup.color;
      customVars[`on${upperFirst_default(colorname)}`] = colorGroup.onColor;
      customVars[`${colorname}Container`] = colorGroup.colorContainer;
      customVars[`on${upperFirst_default(colorname)}Container`] =
        colorGroup.onColorContainer;
    });
    return { ...baseVars, ...customVars };
  }
  var cssVar = (colorName, colorValue) => {
    const name = `--mcu-${kebabCase_default(colorName)}`;
    const value = hexFromArgb(colorValue);
    return `${name}:${value};`;
  };
  var generateTonalPaletteVars = (paletteName, palette) => {
    return STANDARD_TONES.map((tone) => {
      const color = palette.tone(tone);
      return cssVar(`${paletteName}-${tone}`, color);
    }).join(" ");
  };
  var toCssVars = (mergedColors) => {
    return Object.entries(mergedColors)
      .map(([name, value]) => cssVar(name, value))
      .join(" ");
  };
  function generateCss({
    source: hexSource,
    scheme = DEFAULT_SCHEME,
    contrast = DEFAULT_CONTRAST,
    primary,
    secondary,
    tertiary,
    neutral,
    neutralVariant,
    error,
    colorMatch = DEFAULT_COLOR_MATCH,
    customColors: hexCustomColors = DEFAULT_CUSTOM_COLORS,
  }) {
    const hasCoreColors =
      primary ?? secondary ?? tertiary ?? neutral ?? neutralVariant ?? error;
    const sourceArgb = argbFromHex(hexSource);
    const createSchemes = (baseConfig) => [
      new DynamicScheme({ ...baseConfig, isDark: false }),
      new DynamicScheme({ ...baseConfig, isDark: true }),
    ];
    let lightScheme;
    let darkScheme;
    let corePalette;
    if (hasCoreColors) {
      const coreColorsArgb = {
        primary: primary ? argbFromHex(primary) : sourceArgb,
        secondary: secondary ? argbFromHex(secondary) : void 0,
        tertiary: tertiary ? argbFromHex(tertiary) : void 0,
        neutral: neutral ? argbFromHex(neutral) : void 0,
        neutralVariant: neutralVariant ? argbFromHex(neutralVariant) : void 0,
        error: error ? argbFromHex(error) : void 0,
      };
      corePalette = colorMatch
        ? CorePalette.fromColors(coreColorsArgb)
        : CorePalette.contentFromColors(coreColorsArgb);
      const variant = schemeToVariant[scheme];
      [lightScheme, darkScheme] = createSchemes({
        sourceColorArgb: sourceArgb,
        variant,
        contrastLevel: contrast,
        primaryPalette: corePalette.a1,
        secondaryPalette: corePalette.a2,
        tertiaryPalette: corePalette.a3,
        neutralPalette: corePalette.n1,
        neutralVariantPalette: corePalette.n2,
      });
    } else {
      const SchemeClass = schemesMap[scheme];
      const hct = Hct.fromInt(sourceArgb);
      lightScheme = new SchemeClass(hct, false, contrast);
      darkScheme = new SchemeClass(hct, true, contrast);
      corePalette = CorePalette.of(sourceArgb);
    }
    const customColors = hexCustomColors.map(({ hex, ...rest }) => ({
      ...rest,
      value: argbFromHex(hex),
    }));
    const mergedColorsLight = mergeBaseAndCustomColors(
      lightScheme,
      customColors,
      sourceArgb,
    );
    const mergedColorsDark = mergeBaseAndCustomColors(
      darkScheme,
      customColors,
      sourceArgb,
    );
    const lightVars = toCssVars(mergedColorsLight);
    const darkVars = toCssVars(mergedColorsDark);
    const coreColorsTonalVars = [
      generateTonalPaletteVars("primary", corePalette.a1),
      generateTonalPaletteVars("secondary", corePalette.a2),
      generateTonalPaletteVars("tertiary", corePalette.a3),
      generateTonalPaletteVars("neutral", corePalette.n1),
      generateTonalPaletteVars("neutral-variant", corePalette.n2),
      generateTonalPaletteVars("error", corePalette.error),
    ].join(" ");
    const customColorTonalVars = customColors
      .map((customColorObj) => {
        const palette = TonalPalette.fromInt(customColorObj.value);
        return generateTonalPaletteVars(
          kebabCase_default(customColorObj.name),
          palette,
        );
      })
      .join(" ");
    return {
      css: `
:root { ${lightVars} ${coreColorsTonalVars} ${customColorTonalVars} }
.dark { ${darkVars} }
`,
      mergedColorsLight,
      mergedColorsDark,
    };
  }

  // userscripts/shadcn-mcu.ts
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  function init() {
    const primaryColor = getShadcnPrimaryColor();
    if (!primaryColor) {
      console.log("[Shadcn MCU] No shadcn primary color found on this page");
      return;
    }
    console.log("[Shadcn MCU] Found shadcn primary color:", primaryColor);
    const { css } = generateCss({ source: primaryColor });
    const styleId = "shadcn-mcu-colors";
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = css;
    console.log("[Shadcn MCU] MCU colors injected successfully");
  }
  function getShadcnPrimaryColor() {
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryValue = rootStyles.getPropertyValue("--primary").trim();
    if (!primaryValue) {
      return null;
    }
    if (primaryValue.includes("%")) {
      return hslToHex(primaryValue);
    }
    if (primaryValue.startsWith("#")) {
      return primaryValue;
    }
    return null;
  }
  function hslToHex(hslString) {
    const parts = hslString.split(/\s+/);
    const h = parseFloat(parts[0]);
    const s = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;
    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (h >= 300 && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
})();
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@material/material-color-utilities/utils/math_utils.js:
@material/material-color-utilities/utils/color_utils.js:
@material/material-color-utilities/hct/viewing_conditions.js:
@material/material-color-utilities/hct/cam16.js:
@material/material-color-utilities/hct/hct_solver.js:
@material/material-color-utilities/hct/hct.js:
@material/material-color-utilities/blend/blend.js:
@material/material-color-utilities/palettes/tonal_palette.js:
@material/material-color-utilities/palettes/core_palette.js:
@material/material-color-utilities/quantize/lab_point_provider.js:
@material/material-color-utilities/quantize/quantizer_wsmeans.js:
@material/material-color-utilities/quantize/quantizer_map.js:
@material/material-color-utilities/quantize/quantizer_wu.js:
@material/material-color-utilities/quantize/quantizer_celebi.js:
@material/material-color-utilities/scheme/scheme.js:
@material/material-color-utilities/scheme/scheme_android.js:
@material/material-color-utilities/score/score.js:
@material/material-color-utilities/utils/string_utils.js:
@material/material-color-utilities/utils/image_utils.js:
@material/material-color-utilities/utils/theme_utils.js:
@material/material-color-utilities/index.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/contrast/contrast.js:
@material/material-color-utilities/dynamiccolor/dynamic_color.js:
@material/material-color-utilities/dynamiccolor/variant.js:
@material/material-color-utilities/dynamiccolor/material_dynamic_colors.js:
@material/material-color-utilities/dynamiccolor/dynamic_scheme.js:
@material/material-color-utilities/scheme/scheme_expressive.js:
@material/material-color-utilities/scheme/scheme_fruit_salad.js:
@material/material-color-utilities/scheme/scheme_monochrome.js:
@material/material-color-utilities/scheme/scheme_neutral.js:
@material/material-color-utilities/scheme/scheme_rainbow.js:
@material/material-color-utilities/scheme/scheme_tonal_spot.js:
@material/material-color-utilities/scheme/scheme_vibrant.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dislike/dislike_analyzer.js:
@material/material-color-utilities/dynamiccolor/contrast_curve.js:
@material/material-color-utilities/dynamiccolor/tone_delta_pair.js:
@material/material-color-utilities/temperature/temperature_cache.js:
@material/material-color-utilities/scheme/scheme_content.js:
@material/material-color-utilities/scheme/scheme_fidelity.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
