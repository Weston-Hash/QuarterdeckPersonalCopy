(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
          }
          var ReactVersion = "18.3.1";
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactCurrentDispatcher = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactCurrentBatchConfig = {
            transition: null
          };
          var ReactCurrentActQueue = {
            current: null,
            // Used to reproduce behavior of `batchedUpdates` in legacy mode.
            isBatchingLegacy: false,
            didScheduleLegacyUpdate: false
          };
          var ReactCurrentOwner = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactDebugCurrentFrame = {};
          var currentExtraStackFrame = null;
          function setExtraStackFrame(stack) {
            {
              currentExtraStackFrame = stack;
            }
          }
          {
            ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
              {
                currentExtraStackFrame = stack;
              }
            };
            ReactDebugCurrentFrame.getCurrentStack = null;
            ReactDebugCurrentFrame.getStackAddendum = function() {
              var stack = "";
              if (currentExtraStackFrame) {
                stack += currentExtraStackFrame;
              }
              var impl = ReactDebugCurrentFrame.getCurrentStack;
              if (impl) {
                stack += impl() || "";
              }
              return stack;
            };
          }
          var enableScopeAPI = false;
          var enableCacheElement = false;
          var enableTransitionTracing = false;
          var enableLegacyHidden = false;
          var enableDebugTracing = false;
          var ReactSharedInternals = {
            ReactCurrentDispatcher,
            ReactCurrentBatchConfig,
            ReactCurrentOwner
          };
          {
            ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
            ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
          }
          function warn(format) {
            {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                printWarning("warn", format, args);
              }
            }
          }
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var didWarnStateUpdateForUnmountedComponent = {};
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                return;
              }
              error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
              didWarnStateUpdateForUnmountedComponent[warningKey] = true;
            }
          }
          var ReactNoopUpdateQueue = {
            /**
             * Checks whether or not this composite component is mounted.
             * @param {ReactClass} publicInstance The instance we want to test.
             * @return {boolean} True if mounted, false otherwise.
             * @protected
             * @final
             */
            isMounted: function(publicInstance) {
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
            enqueueForceUpdate: function(publicInstance, callback, callerName) {
              warnNoop(publicInstance, "forceUpdate");
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
            enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
              warnNoop(publicInstance, "replaceState");
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
            enqueueSetState: function(publicInstance, partialState, callback, callerName) {
              warnNoop(publicInstance, "setState");
            }
          };
          var assign = Object.assign;
          var emptyObject = {};
          {
            Object.freeze(emptyObject);
          }
          function Component(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          Component.prototype.isReactComponent = {};
          Component.prototype.setState = function(partialState, callback) {
            if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
              throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
            this.updater.enqueueSetState(this, partialState, callback, "setState");
          };
          Component.prototype.forceUpdate = function(callback) {
            this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
          };
          {
            var deprecatedAPIs = {
              isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
              replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
            };
            var defineDeprecationWarning = function(methodName, info) {
              Object.defineProperty(Component.prototype, methodName, {
                get: function() {
                  warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                  return void 0;
                }
              });
            };
            for (var fnName in deprecatedAPIs) {
              if (deprecatedAPIs.hasOwnProperty(fnName)) {
                defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
              }
            }
          }
          function ComponentDummy() {
          }
          ComponentDummy.prototype = Component.prototype;
          function PureComponent(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
          pureComponentPrototype.constructor = PureComponent;
          assign(pureComponentPrototype, Component.prototype);
          pureComponentPrototype.isPureReactComponent = true;
          function createRef() {
            var refObject = {
              current: null
            };
            {
              Object.seal(refObject);
            }
            return refObject;
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config) {
            {
              if (hasOwnProperty.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.ref !== void 0;
          }
          function hasValidKey(config) {
            {
              if (hasOwnProperty.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.key !== void 0;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function() {
              {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
          function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function() {
              {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
          function warnIfStringRefCannotBeAutoConverted(config) {
            {
              if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
                var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          var ReactElement = function(type, key, ref, self, source, owner, props) {
            var element = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: REACT_ELEMENT_TYPE,
              // Built-in properties that belong on the element
              type,
              key,
              ref,
              props,
              // Record the component responsible for creating this element.
              _owner: owner
            };
            {
              element._store = {};
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self
              });
              Object.defineProperty(element, "_source", {
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
          function createElement(type, config, children) {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            var self = null;
            var source = null;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                {
                  warnIfStringRefCannotBeAutoConverted(config);
                }
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              self = config.__self === void 0 ? null : config.__self;
              source = config.__source === void 0 ? null : config.__source;
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
            }
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
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            {
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
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
          function cloneAndReplaceKey(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
          }
          function cloneElement(element, config, children) {
            if (element === null || element === void 0) {
              throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
            }
            var propName;
            var props = assign({}, element.props);
            var key = element.key;
            var ref = element.ref;
            var self = element._self;
            var source = element._source;
            var owner = element._owner;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                owner = ReactCurrentOwner.current;
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              var defaultProps;
              if (element.type && element.type.defaultProps) {
                defaultProps = element.type.defaultProps;
              }
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  if (config[propName] === void 0 && defaultProps !== void 0) {
                    props[propName] = defaultProps[propName];
                  } else {
                    props[propName] = config[propName];
                  }
                }
              }
            }
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
          function isValidElement(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          var SEPARATOR = ".";
          var SUBSEPARATOR = ":";
          function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
              "=": "=0",
              ":": "=2"
            };
            var escapedString = key.replace(escapeRegex, function(match) {
              return escaperLookup[match];
            });
            return "$" + escapedString;
          }
          var didWarnAboutMaps = false;
          var userProvidedKeyEscapeRegex = /\/+/g;
          function escapeUserProvidedKey(text) {
            return text.replace(userProvidedKeyEscapeRegex, "$&/");
          }
          function getElementKey(element, index) {
            if (typeof element === "object" && element !== null && element.key != null) {
              {
                checkKeyStringCoercion(element.key);
              }
              return escape("" + element.key);
            }
            return index.toString(36);
          }
          function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
            var type = typeof children;
            if (type === "undefined" || type === "boolean") {
              children = null;
            }
            var invokeCallback = false;
            if (children === null) {
              invokeCallback = true;
            } else {
              switch (type) {
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                  }
              }
            }
            if (invokeCallback) {
              var _child = children;
              var mappedChild = callback(_child);
              var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
              if (isArray(mappedChild)) {
                var escapedChildKey = "";
                if (childKey != null) {
                  escapedChildKey = escapeUserProvidedKey(childKey) + "/";
                }
                mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                  return c;
                });
              } else if (mappedChild != null) {
                if (isValidElement(mappedChild)) {
                  {
                    if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                      checkKeyStringCoercion(mappedChild.key);
                    }
                  }
                  mappedChild = cloneAndReplaceKey(
                    mappedChild,
                    // Keep both the (mapped) and old keys if they differ, just as
                    // traverseAllChildren used to do for objects as children
                    escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                    (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                      // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                      // eslint-disable-next-line react-internal/safe-string-coercion
                      escapeUserProvidedKey("" + mappedChild.key) + "/"
                    ) : "") + childKey
                  );
                }
                array.push(mappedChild);
              }
              return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0;
            var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                child = children[i];
                nextName = nextNamePrefix + getElementKey(child, i);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else {
              var iteratorFn = getIteratorFn(children);
              if (typeof iteratorFn === "function") {
                var iterableChildren = children;
                {
                  if (iteratorFn === iterableChildren.entries) {
                    if (!didWarnAboutMaps) {
                      warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                    }
                    didWarnAboutMaps = true;
                  }
                }
                var iterator = iteratorFn.call(iterableChildren);
                var step;
                var ii = 0;
                while (!(step = iterator.next()).done) {
                  child = step.value;
                  nextName = nextNamePrefix + getElementKey(child, ii++);
                  subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                }
              } else if (type === "object") {
                var childrenString = String(children);
                throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
              }
            }
            return subtreeCount;
          }
          function mapChildren(children, func, context) {
            if (children == null) {
              return children;
            }
            var result = [];
            var count = 0;
            mapIntoArray(children, result, "", "", function(child) {
              return func.call(context, child, count++);
            });
            return result;
          }
          function countChildren(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          }
          function forEachChildren(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
              forEachFunc.apply(this, arguments);
            }, forEachContext);
          }
          function toArray(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          }
          function onlyChild(children) {
            if (!isValidElement(children)) {
              throw new Error("React.Children.only expected to receive a single React element child.");
            }
            return children;
          }
          function createContext2(defaultValue) {
            var context = {
              $$typeof: REACT_CONTEXT_TYPE,
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
              Consumer: null,
              // Add these to use same hidden class in VM as ServerContext
              _defaultValue: null,
              _globalName: null
            };
            context.Provider = {
              $$typeof: REACT_PROVIDER_TYPE,
              _context: context
            };
            var hasWarnedAboutUsingNestedContextConsumers = false;
            var hasWarnedAboutUsingConsumerProvider = false;
            var hasWarnedAboutDisplayNameOnConsumer = false;
            {
              var Consumer = {
                $$typeof: REACT_CONTEXT_TYPE,
                _context: context
              };
              Object.defineProperties(Consumer, {
                Provider: {
                  get: function() {
                    if (!hasWarnedAboutUsingConsumerProvider) {
                      hasWarnedAboutUsingConsumerProvider = true;
                      error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                    }
                    return context.Provider;
                  },
                  set: function(_Provider) {
                    context.Provider = _Provider;
                  }
                },
                _currentValue: {
                  get: function() {
                    return context._currentValue;
                  },
                  set: function(_currentValue) {
                    context._currentValue = _currentValue;
                  }
                },
                _currentValue2: {
                  get: function() {
                    return context._currentValue2;
                  },
                  set: function(_currentValue2) {
                    context._currentValue2 = _currentValue2;
                  }
                },
                _threadCount: {
                  get: function() {
                    return context._threadCount;
                  },
                  set: function(_threadCount) {
                    context._threadCount = _threadCount;
                  }
                },
                Consumer: {
                  get: function() {
                    if (!hasWarnedAboutUsingNestedContextConsumers) {
                      hasWarnedAboutUsingNestedContextConsumers = true;
                      error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                    return context.Consumer;
                  }
                },
                displayName: {
                  get: function() {
                    return context.displayName;
                  },
                  set: function(displayName) {
                    if (!hasWarnedAboutDisplayNameOnConsumer) {
                      warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                      hasWarnedAboutDisplayNameOnConsumer = true;
                    }
                  }
                }
              });
              context.Consumer = Consumer;
            }
            {
              context._currentRenderer = null;
              context._currentRenderer2 = null;
            }
            return context;
          }
          var Uninitialized = -1;
          var Pending = 0;
          var Resolved = 1;
          var Rejected = 2;
          function lazyInitializer(payload) {
            if (payload._status === Uninitialized) {
              var ctor = payload._result;
              var thenable = ctor();
              thenable.then(function(moduleObject2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var resolved = payload;
                  resolved._status = Resolved;
                  resolved._result = moduleObject2;
                }
              }, function(error2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var rejected = payload;
                  rejected._status = Rejected;
                  rejected._result = error2;
                }
              });
              if (payload._status === Uninitialized) {
                var pending = payload;
                pending._status = Pending;
                pending._result = thenable;
              }
            }
            if (payload._status === Resolved) {
              var moduleObject = payload._result;
              {
                if (moduleObject === void 0) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
                }
              }
              {
                if (!("default" in moduleObject)) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                }
              }
              return moduleObject.default;
            } else {
              throw payload._result;
            }
          }
          function lazy(ctor) {
            var payload = {
              // We use these fields to store the result.
              _status: Uninitialized,
              _result: ctor
            };
            var lazyType = {
              $$typeof: REACT_LAZY_TYPE,
              _payload: payload,
              _init: lazyInitializer
            };
            {
              var defaultProps;
              var propTypes;
              Object.defineProperties(lazyType, {
                defaultProps: {
                  configurable: true,
                  get: function() {
                    return defaultProps;
                  },
                  set: function(newDefaultProps) {
                    error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    defaultProps = newDefaultProps;
                    Object.defineProperty(lazyType, "defaultProps", {
                      enumerable: true
                    });
                  }
                },
                propTypes: {
                  configurable: true,
                  get: function() {
                    return propTypes;
                  },
                  set: function(newPropTypes) {
                    error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    propTypes = newPropTypes;
                    Object.defineProperty(lazyType, "propTypes", {
                      enumerable: true
                    });
                  }
                }
              });
            }
            return lazyType;
          }
          function forwardRef(render) {
            {
              if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
              } else if (typeof render !== "function") {
                error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
              } else {
                if (render.length !== 0 && render.length !== 2) {
                  error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
                }
              }
              if (render != null) {
                if (render.defaultProps != null || render.propTypes != null) {
                  error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
                }
              }
            }
            var elementType = {
              $$typeof: REACT_FORWARD_REF_TYPE,
              render
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!render.name && !render.displayName) {
                    render.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          var REACT_MODULE_REFERENCE;
          {
            REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
          }
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
              // types supported by any Flight configuration anywhere since
              // we don't know which Flight build this will end up being used
              // with.
              type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
                return true;
              }
            }
            return false;
          }
          function memo(type, compare) {
            {
              if (!isValidElementType(type)) {
                error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
              }
            }
            var elementType = {
              $$typeof: REACT_MEMO_TYPE,
              type,
              compare: compare === void 0 ? null : compare
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!type.name && !type.displayName) {
                    type.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          function resolveDispatcher() {
            var dispatcher = ReactCurrentDispatcher.current;
            {
              if (dispatcher === null) {
                error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
              }
            }
            return dispatcher;
          }
          function useContext2(Context) {
            var dispatcher = resolveDispatcher();
            {
              if (Context._context !== void 0) {
                var realContext = Context._context;
                if (realContext.Consumer === Context) {
                  error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
                } else if (realContext.Provider === Context) {
                  error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
                }
              }
            }
            return dispatcher.useContext(Context);
          }
          function useState2(initialState) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useState(initialState);
          }
          function useReducer(reducer, initialArg, init) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useReducer(reducer, initialArg, init);
          }
          function useRef(initialValue) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useRef(initialValue);
          }
          function useEffect2(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useEffect(create, deps);
          }
          function useInsertionEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useInsertionEffect(create, deps);
          }
          function useLayoutEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useLayoutEffect(create, deps);
          }
          function useCallback(callback, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useCallback(callback, deps);
          }
          function useMemo(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useMemo(create, deps);
          }
          function useImperativeHandle(ref, create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useImperativeHandle(ref, create, deps);
          }
          function useDebugValue(value, formatterFn) {
            {
              var dispatcher = resolveDispatcher();
              return dispatcher.useDebugValue(value, formatterFn);
            }
          }
          function useTransition() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useTransition();
          }
          function useDeferredValue(value) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDeferredValue(value);
          }
          function useId() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useId();
          }
          function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher$1.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component2) {
            var prototype = Component2.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has = Function.call.bind(hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          function setCurrentlyValidatingElement$1(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                setExtraStackFrame(stack);
              } else {
                setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
              var name = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
          function getSourceInfoErrorAddendum(source) {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
          function getSourceInfoErrorAddendumForProps(elementProps) {
            if (elementProps !== null && elementProps !== void 0) {
              return getSourceInfoErrorAddendum(elementProps.__source);
            }
            return "";
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
          function validateExplicitKey(element, parentType) {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            {
              setCurrentlyValidatingElement$1(element);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element) {
            {
              var type = element.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
              // Inner props are checked in the reconciler.
              type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentNameFromType(type);
                checkPropTypes(propTypes, element.props, "prop", name, element);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentNameFromType(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys = Object.keys(fragment.props);
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          function createElementWithValidation(type, props, children) {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendumForProps(props);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              {
                error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
            }
            var element = createElement.apply(this, arguments);
            if (element == null) {
              return element;
            }
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
          var didWarnAboutDeprecatedCreateFactory = false;
          function createFactoryWithValidation(type) {
            var validatedFactory = createElementWithValidation.bind(null, type);
            validatedFactory.type = type;
            {
              if (!didWarnAboutDeprecatedCreateFactory) {
                didWarnAboutDeprecatedCreateFactory = true;
                warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
              }
              Object.defineProperty(validatedFactory, "type", {
                enumerable: false,
                get: function() {
                  warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                  Object.defineProperty(this, "type", {
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
          function startTransition(scope, options) {
            var prevTransition = ReactCurrentBatchConfig.transition;
            ReactCurrentBatchConfig.transition = {};
            var currentTransition = ReactCurrentBatchConfig.transition;
            {
              ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
            }
            try {
              scope();
            } finally {
              ReactCurrentBatchConfig.transition = prevTransition;
              {
                if (prevTransition === null && currentTransition._updatedFibers) {
                  var updatedFibersCount = currentTransition._updatedFibers.size;
                  if (updatedFibersCount > 10) {
                    warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                  }
                  currentTransition._updatedFibers.clear();
                }
              }
            }
          }
          var didWarnAboutMessageChannel = false;
          var enqueueTaskImpl = null;
          function enqueueTask(task) {
            if (enqueueTaskImpl === null) {
              try {
                var requireString = ("require" + Math.random()).slice(0, 7);
                var nodeRequire = module && module[requireString];
                enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
              } catch (_err) {
                enqueueTaskImpl = function(callback) {
                  {
                    if (didWarnAboutMessageChannel === false) {
                      didWarnAboutMessageChannel = true;
                      if (typeof MessageChannel === "undefined") {
                        error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                      }
                    }
                  }
                  var channel = new MessageChannel();
                  channel.port1.onmessage = callback;
                  channel.port2.postMessage(void 0);
                };
              }
            }
            return enqueueTaskImpl(task);
          }
          var actScopeDepth = 0;
          var didWarnNoAwaitAct = false;
          function act(callback) {
            {
              var prevActScopeDepth = actScopeDepth;
              actScopeDepth++;
              if (ReactCurrentActQueue.current === null) {
                ReactCurrentActQueue.current = [];
              }
              var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
              var result;
              try {
                ReactCurrentActQueue.isBatchingLegacy = true;
                result = callback();
                if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                  var queue = ReactCurrentActQueue.current;
                  if (queue !== null) {
                    ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                    flushActQueue(queue);
                  }
                }
              } catch (error2) {
                popActScope(prevActScopeDepth);
                throw error2;
              } finally {
                ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
              }
              if (result !== null && typeof result === "object" && typeof result.then === "function") {
                var thenableResult = result;
                var wasAwaited = false;
                var thenable = {
                  then: function(resolve, reject) {
                    wasAwaited = true;
                    thenableResult.then(function(returnValue2) {
                      popActScope(prevActScopeDepth);
                      if (actScopeDepth === 0) {
                        recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                      } else {
                        resolve(returnValue2);
                      }
                    }, function(error2) {
                      popActScope(prevActScopeDepth);
                      reject(error2);
                    });
                  }
                };
                {
                  if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                    Promise.resolve().then(function() {
                    }).then(function() {
                      if (!wasAwaited) {
                        didWarnNoAwaitAct = true;
                        error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                      }
                    });
                  }
                }
                return thenable;
              } else {
                var returnValue = result;
                popActScope(prevActScopeDepth);
                if (actScopeDepth === 0) {
                  var _queue = ReactCurrentActQueue.current;
                  if (_queue !== null) {
                    flushActQueue(_queue);
                    ReactCurrentActQueue.current = null;
                  }
                  var _thenable = {
                    then: function(resolve, reject) {
                      if (ReactCurrentActQueue.current === null) {
                        ReactCurrentActQueue.current = [];
                        recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                      } else {
                        resolve(returnValue);
                      }
                    }
                  };
                  return _thenable;
                } else {
                  var _thenable2 = {
                    then: function(resolve, reject) {
                      resolve(returnValue);
                    }
                  };
                  return _thenable2;
                }
              }
            }
          }
          function popActScope(prevActScopeDepth) {
            {
              if (prevActScopeDepth !== actScopeDepth - 1) {
                error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
              }
              actScopeDepth = prevActScopeDepth;
            }
          }
          function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
            {
              var queue = ReactCurrentActQueue.current;
              if (queue !== null) {
                try {
                  flushActQueue(queue);
                  enqueueTask(function() {
                    if (queue.length === 0) {
                      ReactCurrentActQueue.current = null;
                      resolve(returnValue);
                    } else {
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    }
                  });
                } catch (error2) {
                  reject(error2);
                }
              } else {
                resolve(returnValue);
              }
            }
          }
          var isFlushing = false;
          function flushActQueue(queue) {
            {
              if (!isFlushing) {
                isFlushing = true;
                var i = 0;
                try {
                  for (; i < queue.length; i++) {
                    var callback = queue[i];
                    do {
                      callback = callback(true);
                    } while (callback !== null);
                  }
                  queue.length = 0;
                } catch (error2) {
                  queue = queue.slice(i + 1);
                  throw error2;
                } finally {
                  isFlushing = false;
                }
              }
            }
          }
          var createElement$1 = createElementWithValidation;
          var cloneElement$1 = cloneElementWithValidation;
          var createFactory = createFactoryWithValidation;
          var Children = {
            map: mapChildren,
            forEach: forEachChildren,
            count: countChildren,
            toArray,
            only: onlyChild
          };
          exports.Children = Children;
          exports.Component = Component;
          exports.Fragment = REACT_FRAGMENT_TYPE;
          exports.Profiler = REACT_PROFILER_TYPE;
          exports.PureComponent = PureComponent;
          exports.StrictMode = REACT_STRICT_MODE_TYPE;
          exports.Suspense = REACT_SUSPENSE_TYPE;
          exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
          exports.act = act;
          exports.cloneElement = cloneElement$1;
          exports.createContext = createContext2;
          exports.createElement = createElement$1;
          exports.createFactory = createFactory;
          exports.createRef = createRef;
          exports.forwardRef = forwardRef;
          exports.isValidElement = isValidElement;
          exports.lazy = lazy;
          exports.memo = memo;
          exports.startTransition = startTransition;
          exports.unstable_act = act;
          exports.useCallback = useCallback;
          exports.useContext = useContext2;
          exports.useDebugValue = useDebugValue;
          exports.useDeferredValue = useDeferredValue;
          exports.useEffect = useEffect2;
          exports.useId = useId;
          exports.useImperativeHandle = useImperativeHandle;
          exports.useInsertionEffect = useInsertionEffect;
          exports.useLayoutEffect = useLayoutEffect;
          exports.useMemo = useMemo;
          exports.useReducer = useReducer;
          exports.useRef = useRef;
          exports.useState = useState2;
          exports.useSyncExternalStore = useSyncExternalStore;
          exports.useTransition = useTransition;
          exports.version = ReactVersion;
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
          }
        })();
      }
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.development.js
  var require_react_jsx_runtime_development = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var React2 = require_react();
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactSharedInternals = React2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var enableScopeAPI = false;
          var enableCacheElement = false;
          var enableTransitionTracing = false;
          var enableLegacyHidden = false;
          var enableDebugTracing = false;
          var REACT_MODULE_REFERENCE;
          {
            REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
          }
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
              // types supported by any Flight configuration anywhere since
              // we don't know which Flight build this will end up being used
              // with.
              type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
                return true;
              }
            }
            return false;
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var assign = Object.assign;
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component) {
            var prototype = Component.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has = Function.call.bind(hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown;
          var specialPropRefWarningShown;
          var didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config) {
            {
              if (hasOwnProperty.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.ref !== void 0;
          }
          function hasValidKey(config) {
            {
              if (hasOwnProperty.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.key !== void 0;
          }
          function warnIfStringRefCannotBeAutoConverted(config, self) {
            {
              if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
                var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          function defineKeyPropWarningGetter(props, displayName) {
            {
              var warnAboutAccessingKey = function() {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              };
              warnAboutAccessingKey.isReactWarning = true;
              Object.defineProperty(props, "key", {
                get: warnAboutAccessingKey,
                configurable: true
              });
            }
          }
          function defineRefPropWarningGetter(props, displayName) {
            {
              var warnAboutAccessingRef = function() {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              };
              warnAboutAccessingRef.isReactWarning = true;
              Object.defineProperty(props, "ref", {
                get: warnAboutAccessingRef,
                configurable: true
              });
            }
          }
          var ReactElement = function(type, key, ref, self, source, owner, props) {
            var element = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: REACT_ELEMENT_TYPE,
              // Built-in properties that belong on the element
              type,
              key,
              ref,
              props,
              // Record the component responsible for creating this element.
              _owner: owner
            };
            {
              element._store = {};
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self
              });
              Object.defineProperty(element, "_source", {
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
          function jsxDEV(type, config, maybeKey, source, self) {
            {
              var propName;
              var props = {};
              var key = null;
              var ref = null;
              if (maybeKey !== void 0) {
                {
                  checkKeyStringCoercion(maybeKey);
                }
                key = "" + maybeKey;
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              if (hasValidRef(config)) {
                ref = config.ref;
                warnIfStringRefCannotBeAutoConverted(config, self);
              }
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
              if (type && type.defaultProps) {
                var defaultProps = type.defaultProps;
                for (propName in defaultProps) {
                  if (props[propName] === void 0) {
                    props[propName] = defaultProps[propName];
                  }
                }
              }
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
              return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
            }
          }
          var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement$1(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function isValidElement(object) {
            {
              return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
            }
          }
          function getDeclarationErrorAddendum() {
            {
              if (ReactCurrentOwner$1.current) {
                var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
                if (name) {
                  return "\n\nCheck the render method of `" + name + "`.";
                }
              }
              return "";
            }
          }
          function getSourceInfoErrorAddendum(source) {
            {
              if (source !== void 0) {
                var fileName = source.fileName.replace(/^.*[\\\/]/, "");
                var lineNumber = source.lineNumber;
                return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
              }
              return "";
            }
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            {
              var info = getDeclarationErrorAddendum();
              if (!info) {
                var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
                if (parentName) {
                  info = "\n\nCheck the top-level render call using <" + parentName + ">.";
                }
              }
              return info;
            }
          }
          function validateExplicitKey(element, parentType) {
            {
              if (!element._store || element._store.validated || element.key != null) {
                return;
              }
              element._store.validated = true;
              var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
              if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
                return;
              }
              ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
              var childOwner = "";
              if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
                childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
              }
              setCurrentlyValidatingElement$1(element);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            {
              if (typeof node !== "object") {
                return;
              }
              if (isArray(node)) {
                for (var i = 0; i < node.length; i++) {
                  var child = node[i];
                  if (isValidElement(child)) {
                    validateExplicitKey(child, parentType);
                  }
                }
              } else if (isValidElement(node)) {
                if (node._store) {
                  node._store.validated = true;
                }
              } else if (node) {
                var iteratorFn = getIteratorFn(node);
                if (typeof iteratorFn === "function") {
                  if (iteratorFn !== node.entries) {
                    var iterator = iteratorFn.call(node);
                    var step;
                    while (!(step = iterator.next()).done) {
                      if (isValidElement(step.value)) {
                        validateExplicitKey(step.value, parentType);
                      }
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element) {
            {
              var type = element.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
              // Inner props are checked in the reconciler.
              type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentNameFromType(type);
                checkPropTypes(propTypes, element.props, "prop", name, element);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentNameFromType(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys = Object.keys(fragment.props);
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          var didWarnAboutKeySpread = {};
          function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
            {
              var validType = isValidElementType(type);
              if (!validType) {
                var info = "";
                if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                  info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                }
                var sourceInfo = getSourceInfoErrorAddendum(source);
                if (sourceInfo) {
                  info += sourceInfo;
                } else {
                  info += getDeclarationErrorAddendum();
                }
                var typeString;
                if (type === null) {
                  typeString = "null";
                } else if (isArray(type)) {
                  typeString = "array";
                } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                  typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                  info = " Did you accidentally export a JSX literal instead of a component?";
                } else {
                  typeString = typeof type;
                }
                error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
              var element = jsxDEV(type, props, key, source, self);
              if (element == null) {
                return element;
              }
              if (validType) {
                var children = props.children;
                if (children !== void 0) {
                  if (isStaticChildren) {
                    if (isArray(children)) {
                      for (var i = 0; i < children.length; i++) {
                        validateChildKeys(children[i], type);
                      }
                      if (Object.freeze) {
                        Object.freeze(children);
                      }
                    } else {
                      error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                    }
                  } else {
                    validateChildKeys(children, type);
                  }
                }
              }
              {
                if (hasOwnProperty.call(props, "key")) {
                  var componentName = getComponentNameFromType(type);
                  var keys = Object.keys(props).filter(function(k) {
                    return k !== "key";
                  });
                  var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
                  if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                    var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                    error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                    didWarnAboutKeySpread[componentName + beforeExample] = true;
                  }
                }
              }
              if (type === REACT_FRAGMENT_TYPE) {
                validateFragmentProps(element);
              } else {
                validatePropTypes(element);
              }
              return element;
            }
          }
          function jsxWithValidationStatic(type, props, key) {
            {
              return jsxWithValidation(type, props, key, true);
            }
          }
          function jsxWithValidationDynamic(type, props, key) {
            {
              return jsxWithValidation(type, props, key, false);
            }
          }
          var jsx2 = jsxWithValidationDynamic;
          var jsxs2 = jsxWithValidationStatic;
          exports.Fragment = REACT_FRAGMENT_TYPE;
          exports.jsx = jsx2;
          exports.jsxs = jsxs2;
        })();
      }
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_jsx_runtime_development();
      }
    }
  });

  // ut_app_basecode.jsx
  var import_react = __toESM(require_react(), 1);
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var AuthContext = (0, import_react.createContext)(null);
  var useAuth = () => (0, import_react.useContext)(AuthContext);
  var SENIOR_ROLES = ["bn_cdr", "xo", "ops", "sel"];
  var isSenior = (u) => u && SENIOR_ROLES.includes(u.role);
  var isCoC = (u) => u && [...SENIOR_ROLES, "co_cdr", "plt_cdr", "adj"].includes(u.role);
  var isBigFour = (u) => normalizeCompany(u?.company) === "BN" && ["bn_cdr", "xo", "ops", "sel"].includes(u?.role);
  function canEdit(user, section) {
    if (!user) return false;
    if (isSenior(user)) return true;
    switch (section) {
      case "pt":
        return user.role === "pto";
      case "leadlab":
        return user.role === "traino";
      case "chits":
        return ["adj", "co_cdr", "plt_cdr"].includes(user.role);
      case "structure":
        return user.role === "adj";
      case "academic":
        return user.role === "academics";
      case "forms":
        return ["adj", "pto", "traino", "academics"].includes(user.role);
      // billets excl. PC/CC
      case "fitreps":
        return ["adj", "co_cdr", "plt_cdr"].includes(user.role);
      default:
        return false;
    }
  }
  var LEGACY_COMPANY_MAP = {
    Marines: "Alpha",
    "Navy Alpha": "Bravo",
    "Navy Bravo": "Charlie"
  };
  var COMPANY_META = {
    BN: { short: "BN", full: "BN" },
    Alpha: { short: "Alpha", full: "Alpha Company" },
    Bravo: { short: "Bravo", full: "Bravo Company" },
    Charlie: { short: "Charlie", full: "Charlie Company" }
  };
  var COMPANY_COLORS = {
    Alpha: "#8B0000",
    Bravo: "#003087",
    Charlie: "#B8860B"
  };
  var STRUCTURE_BILLET_ORDER = ["PTO", "ADJ", "SUPPO", "PAO", "TRAINO", "AO", "BGDO", "CGC", "AOPS"];
  function normalizeCompany(company) {
    return LEGACY_COMPANY_MAP[company] || company;
  }
  function getCompanyShortName(company) {
    const normalized = normalizeCompany(company);
    return COMPANY_META[normalized]?.short || normalized;
  }
  function getCompanyFullName(company) {
    const normalized = normalizeCompany(company);
    return COMPANY_META[normalized]?.full || normalized;
  }
  function formatCompanyCoLabel(company) {
    const normalized = normalizeCompany(company);
    if (!normalized) return "\u2014";
    return normalized === "BN" ? "BN" : `${getCompanyShortName(normalized)} Co`;
  }
  function getBilletLabel(user) {
    return (user.billet || (normalizeCompany(user.company) === "BN" ? user.platoon : "") || "").trim();
  }
  function normalizePlatoon(platoon) {
    const value = (platoon || "").trim().replace(/\s+/g, " ");
    if (!value) return "";
    const companyPrefixedPlatoon = value.match(/^[ABC]\s+(\d+(?:st|nd|rd|th))(?:\s*(?:PC|PLT))?$/i);
    if (companyPrefixedPlatoon) return `${companyPrefixedPlatoon[1]} PC`;
    if (/^(?:[ABC]\s+)?CC$/i.test(value) || /^CO$/i.test(value)) return "CO";
    if (/^(?:[ABC]\s+)?SEL$/i.test(value)) return "SEL";
    if (/^\d+(?:st|nd|rd|th)\s*PLT$/i.test(value)) return value.replace(/\s*PLT$/i, " PC");
    if (/^\d+(?:st|nd|rd|th)$/i.test(value)) return `${value} PC`;
    return value;
  }
  function formatPlatoonLabel(platoon) {
    const normalized = normalizePlatoon(platoon);
    if (!normalized) return "\u2014";
    return /^\d+(?:st|nd|rd|th)\s*PC$/i.test(normalized) ? normalized.replace(/\s*PC$/i, " PLT") : normalized;
  }
  function getNameKey(name) {
    return (name || "").split(",")[0].trim().toLowerCase();
  }
  function matchesUserIdentity(user, candidate = {}) {
    if (!user) return false;
    const candidateId = (candidate.id || "").trim();
    const candidateEid = (candidate.eid || "").trim().toLowerCase();
    const candidateEmail = (candidate.email || "").trim().toLowerCase();
    const candidateName = (candidate.name || "").trim().toLowerCase();
    const userEmail = (user.email || "").trim().toLowerCase();
    const userEid = (user.eid || "").trim().toLowerCase();
    const userName = (user.name || "").trim().toLowerCase();
    const userNameKey = getNameKey(user.name);
    const candidateNameKey = getNameKey(candidate.name);
    return candidateId && user.id === candidateId || candidateEid && userEid === candidateEid || candidateEmail && userEmail === candidateEmail || candidateName && userName === candidateName || candidateNameKey && userNameKey === candidateNameKey;
  }
  function canSubmitChit(user) {
    return !!user && !isBigFour(user);
  }
  function requiresChitRouteSelection(user) {
    if (!user || isBigFour(user) || ["adj", "co_cdr", "plt_cdr"].includes(user.role)) return false;
    return !["Alpha", "Bravo", "Charlie"].includes(normalizeCompany(user.company)) || !/^\d+(?:st|nd|rd|th)\s*PC$/i.test(normalizePlatoon(user.platoon));
  }
  function getCompanyCommander(userList, company) {
    return userList.find((u) => normalizeCompany(u.company) === normalizeCompany(company) && u.role === "co_cdr");
  }
  function getPlatoonCommander(userList, company, platoon) {
    const normalizedCompany = normalizeCompany(company);
    const normalizedPlatoon = normalizePlatoon(platoon);
    return userList.find(
      (u) => normalizeCompany(u.company) === normalizedCompany && u.role === "plt_cdr" && normalizePlatoon(u.platoon) === normalizedPlatoon
    );
  }
  function formatRouteNode(label, person) {
    if (!label) return "";
    if (!person) return label;
    return `${label} (${person.name.split(",")[0]})`;
  }
  function resolveChitRoutingContext(user, form) {
    const needsSelection = requiresChitRouteSelection(user);
    const company = normalizeCompany(
      needsSelection ? form.routeCompany || user.company : user.company
    );
    const platoon = normalizePlatoon(
      needsSelection ? form.routePlatoon || user.platoon : user.platoon
    );
    return { company, platoon, needsSelection };
  }
  function makeChitChainNode(label, stageName, person, approverRole, icon) {
    return {
      label: formatRouteNode(label, person),
      stageName,
      approverId: person?.id || null,
      approverName: person?.name || label,
      approverRole: approverRole || person?.role || null,
      icon
    };
  }
  function buildChitApprovalChain(userList, user, routeContext) {
    const { company, platoon } = routeContext;
    const adj = userList.find((u) => u.role === "adj");
    const bnxo = userList.find((u) => u.role === "xo");
    const bnco = userList.find((u) => u.role === "bn_cdr");
    const cc = getCompanyCommander(userList, company);
    const pc = getPlatoonCommander(userList, company, platoon);
    const chain = [];
    if (user.role === "adj") {
      chain.push(
        makeChitChainNode("BNXO", "BNXO Review", bnxo, "xo", "\u{1F396}"),
        makeChitChainNode("BNCO", "BNCO Approval", bnco, "bn_cdr", "\u2705")
      );
    } else if (user.role === "co_cdr") {
      chain.push(
        makeChitChainNode("ADJ", "ADJ Review", adj, "adj", "\u{1F5C2}"),
        makeChitChainNode("BNXO", "BNXO Review", bnxo, "xo", "\u{1F396}"),
        makeChitChainNode("BNCO", "BNCO Approval", bnco, "bn_cdr", "\u2705")
      );
    } else if (user.role === "plt_cdr") {
      chain.push(
        makeChitChainNode(`${getCompanyShortName(company)} CC`, "CC Review", cc, "co_cdr", "\u2B50"),
        makeChitChainNode("ADJ", "ADJ Review", adj, "adj", "\u{1F5C2}"),
        makeChitChainNode("BNXO", "BNXO Review", bnxo, "xo", "\u{1F396}"),
        makeChitChainNode("BNCO", "BNCO Approval", bnco, "bn_cdr", "\u2705")
      );
    } else {
      chain.push(
        makeChitChainNode(formatPlatoonLabel(platoon), "PC Review", pc, "plt_cdr", "\u{1F464}"),
        makeChitChainNode(`${getCompanyShortName(company)} CC`, "CC Review", cc, "co_cdr", "\u2B50"),
        makeChitChainNode("ADJ", "ADJ Review", adj, "adj", "\u{1F5C2}"),
        makeChitChainNode("BNXO", "BNXO Review", bnxo, "xo", "\u{1F396}"),
        makeChitChainNode("BNCO", "BNCO Approval", bnco, "bn_cdr", "\u2705")
      );
    }
    return chain.length > 0 && chain.every((node) => node.approverId) ? chain : [];
  }
  function buildChitStages(submitterName, submittedAt, approvalChain) {
    return [
      { name: "Submitted", routeLabel: submitterName, approverId: null, approverRole: null, approverName: submitterName, icon: "\u{1F4DD}", completedBy: submitterName, completedAt: submittedAt, comment: "" },
      ...approvalChain.map((node) => ({
        name: node.stageName,
        routeLabel: node.label,
        approverId: node.approverId,
        approverRole: node.approverRole,
        approverName: node.approverName,
        icon: node.icon,
        completedBy: null,
        completedAt: null,
        comment: ""
      })),
      { name: "Complete", routeLabel: "", approverId: null, approverRole: null, approverName: "", icon: "\u{1F3C5}", completedBy: null, completedAt: null, comment: "" }
    ];
  }
  function canActOnChit(user, chit) {
    if (!user || !chit?.stages || chit.status === "Approved" || chit.status === "Denied" || chit.status === "Returned") return false;
    if (chit.currentStage >= chit.stages.length - 1) return false;
    if (!chit.stages.slice(0, chit.currentStage).every((s) => s.completedBy)) return false;
    const stage = chit.stages[chit.currentStage];
    if (!stage?.approverRole) return false;
    if (stage.approverId && user.id === stage.approverId) return true;
    if (stage.approverRole === "plt_cdr") {
      return user.role === "plt_cdr" && normalizeCompany(user.company) === normalizeCompany(chit.company) && normalizePlatoon(user.platoon) === normalizePlatoon(chit.platoon);
    }
    if (stage.approverRole === "co_cdr") {
      return user.role === "co_cdr" && normalizeCompany(user.company) === normalizeCompany(chit.company);
    }
    return user.role === stage.approverRole;
  }
  function canViewChit(user, chit) {
    if (!user || !chit) return false;
    if (matchesUserIdentity(user, { id: chit.userId, name: chit.name })) return true;
    return !!chit.stages?.some((stage) => {
      if (matchesUserIdentity(user, { id: stage.approverId, name: stage.approverName })) return true;
      if (stage.approverRole === "plt_cdr") {
        return user.role === "plt_cdr" && normalizeCompany(user.company) === normalizeCompany(chit.company) && normalizePlatoon(user.platoon) === normalizePlatoon(chit.platoon);
      }
      if (stage.approverRole === "co_cdr") {
        return user.role === "co_cdr" && normalizeCompany(user.company) === normalizeCompany(chit.company);
      }
      return !!stage.approverRole && user.role === stage.approverRole;
    });
  }
  var SEMESTER_START = /* @__PURE__ */ new Date("2026-01-19T00:00:00");
  var SEMESTER_LABEL = "Spring 2026";
  function getCurrentWeekMonday() {
    const now = /* @__PURE__ */ new Date();
    const day = now.getDay();
    const daysBack = day === 0 ? 6 : day - 1;
    const mon = new Date(now);
    mon.setHours(0, 0, 0, 0);
    mon.setDate(mon.getDate() - daysBack);
    if (day === 6 || day === 0) mon.setDate(mon.getDate() + 7);
    return mon;
  }
  function getWeekNumber(mon) {
    return Math.round((mon - SEMESTER_START) / (7 * 24 * 3600 * 1e3)) + 1;
  }
  function formatWeekRange(mon) {
    const fri = new Date(mon);
    fri.setDate(fri.getDate() + 4);
    const M = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const f = (d) => `${String(d.getDate()).padStart(2, "0")}${M[d.getMonth()]}${String(d.getFullYear()).slice(-2)}`;
    return `${f(mon)} - ${f(fri)}`;
  }
  var POTW = {
    operations: [
      { date: "23 MAR", title: "Battalion PT", time: "0700\u20130800", type: "PT", location: "Caven Lacrosse and Sports Center at Clark Field" },
      { date: "23 MAR", title: "Digital FITREPs due to PCs", time: "1500\u20131600", type: "Admin", location: "" },
      { date: "24 MAR", title: "PNS Inspection", time: "0700\u20130800", type: "Inspection", location: "" },
      { date: "24 MAR", title: "Company LL", time: "0800\u20130900", type: "Leadership", location: "ADM McRaven Classroom" },
      { date: "24 MAR", title: "Calculus/Physics Tutoring", time: "1900\u20132000", type: "Academic", location: "ADM McRaven Classroom" },
      { date: "25 MAR", title: "Alpha Company PT", time: "0530\u20130630", type: "PT", location: "Lady Bird Lake Trail" },
      { date: "25 MAR", title: "Bravo/Charlie Company PT", time: "0700\u20130800", type: "PT", location: "Caven Lacrosse and Sports Center at Clark Field" },
      { date: "26 MAR", title: "FEP", time: "0700\u20130800", type: "PT", location: "Caven Lacrosse and Sports Center at Clark Field" },
      { date: "26 MAR", title: "BN Staff Meeting", time: "1530\u20131630", type: "Staff", location: "BN Staff Office" },
      { date: "26-29 MAR", title: "Yale Leadership Conference", time: "All Day", type: "Conference", location: "" },
      { date: "27 MAR", title: "Drill", time: "0700\u20130800", type: "Drill", location: "Caven Lacrosse and Sports Center at Clark Field" },
      { date: "27 MAR", title: "Unit Sync Meeting", time: "1000\u20131100", type: "Staff", location: "Conference Room" }
    ]
  };
  var LEADLAB_INIT = [
    { id: 1, title: "Land Navigation", date: "Mar 12", notes: "Bring protractor, compass, pencil. MGRS map issued at 1345." },
    { id: 2, title: "React to Contact", date: "Mar 26", notes: "ACU/camouflage required. No live ammo." },
    { id: 3, title: "Leadership Reaction Course", date: "Apr 9", notes: "Teams assigned day prior." }
  ];
  var PT_SESSIONS = [
    { key: "monday", day: "Monday", type: "BN PT", desc: "Battalion-wide formation PT", color: "#BF5700" },
    { key: "wednesday", day: "Wednesday", type: "Company PT", desc: "Company-level physical training", color: "#003087" },
    { key: "thursday", day: "Thursday", type: "FEP", desc: "Fitness Enhancement Program", color: "#2A7D4F" }
  ];
  var INIT_CHITS = [];
  var INIT_QS = [
    {
      id: 1,
      authorId: "u009",
      author: "Wilson, Ryan",
      rank: "CDT/PVT",
      subject: "Calculus II",
      time: "2h ago",
      answered: true,
      text: "Struggling with integration by parts \u2014 when to use it vs u-substitution. Any tips for the LIATE rule?",
      answers: [{ author: "Davis, Kyle", rank: "CDT/2LT", text: "LIATE = Logarithm, Inverse trig, Algebraic, Trig, Exponential. Pick your u from whichever type comes first in that list. Use IBP when you have a product of two different function types." }]
    },
    {
      id: 2,
      authorId: "u012",
      author: "Nguyen, Lily",
      rank: "CDT/PFC",
      subject: "Physics I",
      time: "5h ago",
      answered: true,
      text: "Do we account for air resistance in PHY 301 projectile motion problems?",
      answers: [{ author: "Peterson, Chris", rank: "CDT/MAJ", text: "Ignore air resistance unless explicitly stated. For max range on flat ground, 45 degrees is always your answer." }]
    },
    {
      id: 3,
      authorId: "u011",
      author: "Jackson, Tyler",
      rank: "CDT/SPC",
      subject: "Calculus III",
      time: "1d ago",
      answered: false,
      text: "What is the best way to set up triple integrals? I keep confusing the order of integration.",
      answers: []
    }
  ];
  var SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbzlf-kNMTGKZDvvTS9zBeMuqphwM_ybCQZLalZIKL0-SxTnQ-hj0hT-X30QEr1mQM8/exec";
  var SHEETS_API_TOKEN = "UT_NROTC";
  var ROSTER_CACHE_KEY = "quarterdeck_roster_cache_v1";
  function loadCachedRoster() {
    try {
      if (typeof window === "undefined" || !window.localStorage) return [];
      const raw = window.localStorage.getItem(ROSTER_CACHE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }
  function saveCachedRoster(users) {
    try {
      if (typeof window === "undefined" || !window.localStorage || !Array.isArray(users)) return;
      window.localStorage.setItem(ROSTER_CACHE_KEY, JSON.stringify(users));
    } catch (err) {
    }
  }
  var COMPANY_MAP = {
    "BN Staff": "BN",
    "A": "Alpha",
    "B": "Bravo",
    "C": "Charlie"
  };
  var BILLET_TO_ROLE = {
    "BNCO": "bn_cdr",
    "BNXO": "xo",
    "OPS": "ops",
    "SEL": "sel",
    "ADJ": "adj",
    "PTO": "pto",
    "TRAINO": "traino",
    "AO": "academics",
    "A CC": "co_cdr",
    "B CC": "co_cdr",
    "C CC": "co_cdr",
    "A SEL": "sel",
    "B SEL": "sel",
    "C SEL": "sel",
    "1st PC": "plt_cdr",
    "2nd PC": "plt_cdr",
    "3rd PC": "plt_cdr",
    "CC": "co_cdr",
    "SEL": "sel",
    "AOPS": "mid",
    "PAO": "mid",
    "SUPPO": "mid",
    "BGDO": "mid",
    "COC": "mid",
    "CGC": "mid",
    "MIR": "mid"
  };
  function sheetRowToUser(row, index) {
    const companyRaw = (row.company || "").trim();
    const billetRaw = (row.billet || "").trim();
    const nameRaw = (row.name || "").trim();
    const classVal = (row.class || "").trim();
    let companyKey;
    if (companyRaw === "BN Staff") companyKey = "BN Staff";
    else if (/^[ABC]\b/.test(companyRaw)) companyKey = companyRaw.charAt(0);
    else if (/^[ABC]\s/.test(billetRaw)) companyKey = billetRaw.charAt(0);
    else companyKey = companyRaw;
    const company = normalizeCompany(COMPANY_MAP[companyKey] || companyRaw);
    const platoonMatch = companyRaw.match(/(\d+(?:st|nd|rd|th))/i) || billetRaw.match(/(\d+(?:st|nd|rd|th))/i);
    const platoon = platoonMatch ? `${platoonMatch[1]} PC` : /CC$/i.test(billetRaw) ? "CO" : /SEL$/i.test(billetRaw) ? "SEL" : billetRaw;
    const name = nameRaw.replace(/^(MIDN|GySgt|GySGT|SSgt|SSGT|OC|Sgt|SGT|Cpl|CPL|LCpl|PFC)\s+/i, "").trim();
    const rank = /^\d\/C$/i.test(classVal) ? `MIDN ${classVal}` : classVal;
    const billetNorm = billetRaw.replace(/^[ABC]\s+/, "");
    const role = BILLET_TO_ROLE[billetRaw] || BILLET_TO_ROLE[billetNorm] || "mid";
    return {
      id: (row.eid || `sheet-${index}`).trim(),
      name,
      rank,
      role,
      company,
      platoon,
      password: (row.password || "").trim(),
      email: (row.email || "").trim(),
      phone: (row.phone_number || row.phone || "").trim(),
      major: (row.major || "").trim(),
      campus: (row.campus || "").trim(),
      eid: (row.eid || "").trim(),
      billet: billetRaw,
      mustChangePassword: false
    };
  }
  function canActOnFitrep(user, fitrep) {
    if (!user || !fitrep?.stages || fitrep.status === "Returned" || fitrep.currentStage >= fitrep.stages.length - 1) return false;
    if (!fitrep.stages.slice(0, fitrep.currentStage).every((s) => s.completedBy)) return false;
    const stage = fitrep.stages[fitrep.currentStage];
    if (!stage?.approverRole) return false;
    if (stage.approverId && user.id === stage.approverId) return true;
    if (stage.approverRole === "plt_cdr")
      return user.role === "plt_cdr" && normalizeCompany(user.company) === normalizeCompany(fitrep.company) && normalizePlatoon(user.platoon) === normalizePlatoon(fitrep.platoon);
    if (stage.approverRole === "co_cdr")
      return user.role === "co_cdr" && normalizeCompany(user.company) === normalizeCompany(fitrep.company);
    return user.role === stage.approverRole;
  }
  function canViewFitrep(user, fitrep) {
    if (!user || !fitrep) return false;
    if (matchesUserIdentity(user, { id: fitrep.subjectId, name: fitrep.subjectName })) return true;
    return !!fitrep.stages?.some((stage) => {
      if (!stage.approverRole) return false;
      if (stage.approverId && matchesUserIdentity(user, { id: stage.approverId })) return true;
      if (stage.approverRole === "plt_cdr") {
        return user.role === "plt_cdr" && normalizeCompany(user.company) === normalizeCompany(fitrep.company) && normalizePlatoon(user.platoon) === normalizePlatoon(fitrep.platoon);
      }
      if (stage.approverRole === "co_cdr") {
        return user.role === "co_cdr" && normalizeCompany(user.company) === normalizeCompany(fitrep.company);
      }
      return user.role === stage.approverRole;
    });
  }
  var INIT_FITREBS = [];
  var CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Barlow', "Segoe UI", sans-serif; font-size: 1rem; background: #FFF8F0; color: #1A1209; }

  .topbar { background: #1A1209; color: white; display: flex; align-items: center; justify-content: space-between; padding: 0 1.25rem; height: 58px; border-bottom: 3px solid #BF5700; position: sticky; top: 0; z-index: 50; }
  .topbar-logo { width: 40px; height: 40px; background: #BF5700; border-radius: 6px; display: grid; place-items: center; margin-right: 0.7rem; }
  .topbar-title { font-family: 'Rajdhani', Impact, sans-serif; font-weight: 600; font-size: 1.35rem; letter-spacing: 3px; text-transform: uppercase; }
  .topbar-title span { color: #F7941D; }
  .topbar-right { display: flex; align-items: center; gap: 0.75rem; }
  .rank-pill { background: #BF5700; color: white; padding: 2px 8px; border-radius: 4px; font-family: 'Rajdhani', Impact, sans-serif; font-size: 0.72rem; letter-spacing: 1px; text-transform: uppercase; }
  .role-pill { background: rgba(255,255,255,0.12); color: #ccc; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; text-transform: uppercase; }
  .btn-logout { background: transparent; border: 1.5px solid rgba(255,255,255,0.25); color: #ccc; border-radius: 4px; padding: 3px 10px; font-size: 0.75rem; cursor: pointer; font-family: 'Rajdhani', Impact, sans-serif; letter-spacing: 1px; text-transform: uppercase; }
  .btn-logout:hover { background: rgba(255,255,255,0.1); }

  .layout { display: flex; min-height: calc(100vh - 58px); }
  .sidebar { width: 210px; background: #0D1B2A; flex-shrink: 0; position: sticky; top: 58px; height: calc(100vh - 58px); overflow-y: auto; display: flex; flex-direction: column; }
  .sidebar-group { padding: 1rem 0 0.5rem; }
  .sidebar-label { font-family: 'Rajdhani', Impact, sans-serif; font-size: 0.62rem; letter-spacing: 3px; text-transform: uppercase; color: #7a8fa0; padding: 0 1rem; margin-bottom: 0.5rem; }
  .nav-btn { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1rem; cursor: pointer; color: #9ab0c4; font-size: 0.88rem; border-left: 3px solid transparent; transition: all 0.15s; background: none; border-top: none; border-right: none; border-bottom: none; width: 100%; text-align: left; }
  .nav-btn:hover { background: rgba(255,255,255,0.05); color: white; }
  .nav-btn.active { background: rgba(191,87,0,0.2); color: #F7941D; border-left-color: #BF5700; font-weight: 600; }
  .sidebar-footer { padding: 1rem; border-top: 1px solid rgba(255,255,255,0.08); margin-top: auto; font-size: 0.75rem; color: #6b7e90; line-height: 1.6; }

  .content { flex: 1; padding: 1.5rem; overflow-y: auto; min-width: 0; }

  .page-title { font-family: 'Rajdhani', Impact, sans-serif; font-size: 2.1rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 0.2rem; }
  .page-title span { color: #BF5700; }
  .page-sub { font-size: 0.88rem; color: #6B6B6B; margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 2px solid rgba(191,87,0,0.15); }

  .card { background: white; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid rgba(191,87,0,0.1); margin-bottom: 1rem; }
  .card-title { font-family: 'Rajdhani', Impact, sans-serif; font-size: 0.9rem; letter-spacing: 1.5px; text-transform: uppercase; color: #1A1209; }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }

  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }

  .stat { background: white; border-radius: 10px; padding: 1rem 1.2rem; border-left: 4px solid #BF5700; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
  .stat-n { font-family: 'Rajdhani', Impact, sans-serif; font-size: 2.4rem; font-weight: 700; color: #BF5700; line-height: 1; }
  .stat-l { font-size: 0.78rem; color: #6B6B6B; text-transform: uppercase; letter-spacing: 1px; margin-top: 0.2rem; }

  .btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.9rem; border-radius: 6px; font-family: 'Rajdhani'; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; border: none; font-weight: 500; transition: all 0.15s; }
  .btn-orange { background: #BF5700; color: white; }
  .btn-orange:hover { background: #8B3D00; }
  .btn-outline { background: transparent; border: 2px solid #BF5700; color: #BF5700; }
  .btn-outline:hover { background: #BF5700; color: white; }
  .btn-navy { background: #0D1B2A; color: white; }
  .btn-sm { padding: 0.25rem 0.65rem; font-size: 0.72rem; }
  .btn-green { background: #2A7D4F; color: white; }
  .btn-red { background: #C0392B; color: white; }

  .badge { display: inline-block; padding: 2px 7px; border-radius: 4px; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .badge-orange { background: rgba(191,87,0,0.12); color: #8B3D00; }
  .badge-green  { background: rgba(42,125,79,0.15); color: #2A7D4F; }
  .badge-red    { background: rgba(192,57,43,0.15); color: #C0392B; }
  .badge-navy   { background: rgba(13,27,42,0.1); color: #0D1B2A; }
  .badge-gray   { background: #eee; color: #666; }

  .input { width: 100%; padding: 0.5rem 0.75rem; border: 1.5px solid #ddd; border-radius: 6px; font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.9rem; color: #1A1209; background: white; }
  .input:focus { outline: none; border-color: #BF5700; }
  .input-group { margin-bottom: 0.9rem; }
  .input-label { display: block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #6B6B6B; margin-bottom: 0.3rem; }

  .alert { background: rgba(191,87,0,0.08); border: 1.5px solid #BF5700; border-radius: 8px; padding: 0.65rem 1rem; font-size: 0.85rem; color: #8B3D00; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
  .alert-green { background: rgba(42,125,79,0.1); border-color: #2A7D4F; color: #2A7D4F; }
  .privacy-note { background: rgba(13,27,42,0.05); border: 1.5px solid rgba(13,27,42,0.15); border-radius: 8px; padding: 0.6rem 1rem; font-size: 0.82rem; color: #0D1B2A; margin-bottom: 1rem; }

  .potw-card { background: linear-gradient(135deg, #1A1209 0%, #0D1B2A 100%); color: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; }
  .potw-week { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.68rem; letter-spacing: 3px; text-transform: uppercase; color: #F7941D; margin-bottom: 0.4rem; }
  .potw-title { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.6rem; }
  .potw-body { font-size: 0.88rem; line-height: 1.6; color: #CCC; margin-bottom: 0.75rem; }

  .event-row { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.7rem 0; border-bottom: 1px solid #f0ede8; }
  .event-date { min-width: 46px; text-align: center; background: #BF5700; color: white; border-radius: 7px; padding: 3px; }
  .event-day { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 1.35rem; font-weight: 700; line-height: 1; }
  .event-mo  { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 1px; }
  .event-title { font-weight: 600; font-size: 0.88rem; }
  .event-sub   { font-size: 0.78rem; color: #6B6B6B; }

  .company-block { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06); margin-bottom: 1rem; }
  .company-header { color: white; padding: 0.8rem 1.2rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
  .company-name { font-family: 'Rajdhani'; font-size: 1.05rem; letter-spacing: 2px; text-transform: uppercase; }
  .company-co { font-size: 0.78rem; color: rgba(255,255,255,0.75); }
  .platoon-grid { padding: 1rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 0.75rem; }
  .platoon-card { border: 1.5px solid rgba(191,87,0,0.2); border-radius: 8px; padding: 0.75rem; }
  .platoon-name { font-family: 'Rajdhani'; font-size: 0.82rem; letter-spacing: 1.5px; color: #BF5700; margin-bottom: 0.35rem; }
  .platoon-detail { font-size: 0.78rem; color: #6B6B6B; }

  .pt-block { background: white; border-radius: 8px; overflow: hidden; margin-bottom: 0.75rem; border: 1px solid #eee; }
  .pt-header { background: #BF5700; color: white; padding: 0.55rem 1rem; display: flex; align-items: center; justify-content: space-between; font-family: 'Rajdhani'; font-size: 0.9rem; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; }
  .pt-row { display: flex; align-items: center; gap: 1rem; padding: 0.4rem 1rem; border-bottom: 1px solid #faf7f4; font-size: 0.85rem; }
  .pt-name { flex: 1; font-weight: 500; }
  .pt-sets { color: #BF5700; font-weight: 600; font-size: 0.82rem; min-width: 80px; }
  .pt-notes { color: #888; font-size: 0.78rem; }

  .chit-card { border-left: 4px solid #BF5700; padding: 1rem; background: white; border-radius: 8px; margin-bottom: 0.75rem; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
  .chit-route { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem; font-size: 0.78rem; }
  .chit-node { background: rgba(191,87,0,0.1); border-radius: 4px; padding: 2px 7px; color: #8B3D00; }

  .form-row { background: white; border-radius: 10px; padding: 1rem 1.2rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem; border: 1.5px solid #eee; flex-wrap: wrap; }
  .progress-bar { background: #eee; border-radius: 4px; height: 4px; margin-top: 4px; width: 60px; }
  .progress-fill { background: #BF5700; height: 100%; border-radius: 4px; }

  .roster-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.7rem 0; border-bottom: 1px solid #f4f0eb; flex-wrap: wrap; }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: #BF5700; color: white; display: flex; align-items: center; justify-content: center; font-family: 'Rajdhani'; font-weight: 700; font-size: 0.82rem; flex-shrink: 0; }

  .q-card { background: white; border-radius: 10px; padding: 1.2rem; margin-bottom: 1rem; border: 1.5px solid #eee; }
  .q-meta { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
  .q-text { font-size: 0.92rem; line-height: 1.55; margin-bottom: 0.75rem; }
  .answer-block { background: rgba(191,87,0,0.04); border-left: 3px solid #BF5700; padding: 0.55rem 0.75rem; border-radius: 0 6px 6px 0; margin-bottom: 0.5rem; font-size: 0.85rem; }
  .answer-author { font-weight: 600; color: #8B3D00; font-size: 0.78rem; margin-bottom: 0.15rem; }

  .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; }
  .modal { background: white; border-radius: 12px; padding: 1.5rem; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
  .modal-title { font-family: 'Rajdhani'; font-size: 1.1rem; letter-spacing: 2px; text-transform: uppercase; }
  .modal-close { background: none; border: none; font-size: 1.4rem; color: #888; cursor: pointer; }

  .tag { display: inline-block; padding: 2px 8px; background: rgba(191,87,0,0.1); border-radius: 20px; font-size: 0.72rem; color: #8B3D00; }

  .login-wrap { min-height: 100vh; background: #1A1209; display: flex; align-items: center; justify-content: center; padding: 1rem; }
  .login-card { background: white; border-radius: 14px; padding: 2.25rem 1.75rem; max-width: 380px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .login-logo { display: flex; align-items: center; gap: 0.75rem; justify-content: center; margin-bottom: 1.25rem; }
  .login-mark { width: 56px; height: 56px; background: #BF5700; border-radius: 10px; display: grid; place-items: center; }
  .login-title { font-family: 'Rajdhani', Impact, sans-serif; font-size: 1.75rem; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; }
  .login-title span { color: #BF5700; }
  .login-sub { text-align: center; font-size: 0.88rem; color: #888; margin-bottom: 1.5rem; }
  .hint-box { margin-top: 1rem; background: #f5f2ee; border-radius: 8px; padding: 0.75rem; font-size: 0.75rem; color: #666; line-height: 1.6; }

  .mobile-nav { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #1A1209; border-top: 2px solid #BF5700; z-index: 100; }
  .mobile-nav-inner { display: flex; justify-content: space-around; padding: 0.35rem 0; }
  .mobile-btn { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 0.3rem 0.5rem; cursor: pointer; color: #666; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.5px; background: none; border: none; }
  .mobile-btn.active { color: #F7941D; }
  .mobile-icon { font-size: 1.2rem; }

  .empty { text-align: center; padding: 2rem; color: #888; }
  .divider { border: none; border-top: 1px solid #f0ede8; margin: 0.75rem 0; }

  /* \u2500\u2500 FITREP STAGE TRACKER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .stage-track { display: flex; align-items: flex-start; gap: 0; margin: 1rem 0; overflow-x: auto; padding-bottom: 0.25rem; }
  .stage-item { display: flex; flex-direction: column; align-items: center; position: relative; flex: 1; min-width: 90px; }
  .stage-item:not(:last-child)::after { content:""; position:absolute; top:18px; left:50%; width:100%; height:3px; background:#eee; z-index:0; }
  .stage-item.done::after { background:#2A7D4F; }
  .stage-item.active::after { background:linear-gradient(90deg,#2A7D4F 0%,#eee 100%); }
  .stage-dot { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1rem; border:3px solid #eee; background:white; z-index:1; position:relative; flex-shrink:0; }
  .stage-dot.done  { border-color:#2A7D4F; background:#2A7D4F; color:white; }
  .stage-dot.active { border-color:#BF5700; background:#BF5700; color:white; box-shadow:0 0 0 4px rgba(191,87,0,0.2); animation: pulse 2s infinite; }
  .stage-dot.pending  { border-color:#ddd; background:#f5f5f5; color:#aaa; }
  .stage-dot.returned { border-color:#9b1c1c; background:#9b1c1c; color:white; }
  .stage-item.returned::after { background:#9b1c1c; }
  @keyframes pulse { 0%,100% { box-shadow:0 0 0 4px rgba(191,87,0,0.2); } 50% { box-shadow:0 0 0 8px rgba(191,87,0,0.08); } }
  .stage-label { font-size:0.65rem; text-align:center; margin-top:0.35rem; text-transform:uppercase; letter-spacing:0.5px; line-height:1.3; color:#888; font-family:Oswald; }
  .stage-label.active   { color:#BF5700; font-weight:700; }
  .stage-label.done     { color:#2A7D4F; }
  .stage-label.returned { color:#9b1c1c; font-weight:700; }
  .stage-approver { font-size:0.6rem; color:#aaa; text-align:center; }
  .stage-approver.active { color:#BF5700; }

  .fitrep-card { background:white; border-radius:10px; border:1.5px solid #eee; margin-bottom:1rem; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05); }
  .fitrep-header { padding:0.9rem 1.2rem; border-bottom:1px solid #f5f2ee; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; }
  .fitrep-body { padding:1rem 1.2rem; }
  .stage-comment { background:#f8f6f2; border-left:3px solid #2A7D4F; border-radius:0 6px 6px 0; padding:0.5rem 0.75rem; margin-top:0.4rem; font-size:0.82rem; }
  .stage-comment-by { font-size:0.72rem; color:#2A7D4F; font-weight:600; margin-bottom:0.2rem; font-family:Oswald; letter-spacing:0.5px; text-transform:uppercase; }
  .active-stage-comment { background:#fff9f5; border-left:3px solid #BF5700; border-radius:0 6px 6px 0; padding:0.5rem 0.75rem; margin-top:0.4rem; font-size:0.82rem; }
  .stage-action-box { background:#fff9f5; border:1.5px solid rgba(191,87,0,0.2); border-radius:8px; padding:0.9rem; margin-top:0.75rem; }
  .stage-action-label { font-family:Oswald; font-size:0.72rem; letter-spacing:1.5px; text-transform:uppercase; color:#BF5700; margin-bottom:0.5rem; }

  /* \u2500\u2500 ACCOUNT MODAL \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .acct-field { display:flex; align-items:center; gap:0.75rem; padding:0.55rem 0; border-bottom:1px solid #f5f2ee; font-size:0.88rem; }
  .acct-label { font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#888; min-width:90px; }
  .first-login-banner { background:rgba(191,87,0,0.1); border:1.5px solid #BF5700; border-radius:8px; padding:0.75rem 1rem; margin-bottom:1.25rem; font-size:0.85rem; color:#8B3D00; }

  @media (max-width: 768px) {
    .sidebar { display: none; }
    .mobile-nav { display: block; }
    .content { padding: 1rem; padding-bottom: 5rem; }
    .grid2 { grid-template-columns: 1fr; }
    .grid3 { grid-template-columns: 1fr; }
  }
`;
  function Modal({ title, onClose, children }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "modal-bg", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "modal", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "modal-header", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "modal-title", children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "modal-close", onClick: onClose, children: "\u2715" })
      ] }),
      children
    ] }) });
  }
  function AccountModal({ onClose, onPasswordChange }) {
    const { user } = useAuth();
    const [mode, setMode] = (0, import_react.useState)(user.mustChangePassword ? "change" : "view");
    const [newPass, setNewPass] = (0, import_react.useState)("");
    const [confirm, setConfirm] = (0, import_react.useState)("");
    const [err, setErr] = (0, import_react.useState)("");
    const [success, setSuccess] = (0, import_react.useState)("");
    const handleChange = () => {
      if (newPass.length < 8) {
        setErr("Password must be at least 8 characters.");
        return;
      }
      if (newPass !== confirm) {
        setErr("Passwords do not match.");
        return;
      }
      setErr("");
      onPasswordChange(newPass);
      setSuccess("Password updated successfully.");
      setMode("view");
      setNewPass("");
      setConfirm("");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, { title: "Account Information", onClose, children: [
      user.mustChangePassword && mode !== "change" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "first-login-banner", children: [
        "\u26A0 ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Action required:" }),
        " Please set a new password before continuing.",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange btn-sm", style: { marginLeft: "0.75rem" }, onClick: () => setMode("change"), children: "Set Password" })
      ] }),
      success && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "alert alert-green", children: success }),
      mode === "view" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "acct-field", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "acct-label", children: "Name" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: user.name })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "acct-field", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "acct-label", children: "Rank" }),
          user.rank
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "acct-field", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "acct-label", children: "Role" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge badge-orange", children: user.role.replace("_", " ").toUpperCase() })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "acct-field", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "acct-label", children: "Company" }),
          user.company
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "acct-field", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "acct-label", children: "Platoon" }),
          user.platoon
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "acct-field", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "acct-label", children: "Email" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "mailto:" + user.email, style: { color: "#BF5700" }, children: user.email })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "acct-field", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "acct-label", children: "Phone" }),
          user.phone || "\u2014"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "1.25rem", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline", onClick: () => setMode("change"), children: "Change Password" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange", onClick: onClose, children: "Close" })
        ] })
      ] }),
      mode === "change" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        err && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "rgba(192,57,43,0.1)", border: "1.5px solid #C0392B", borderRadius: "6px", padding: "0.55rem 0.9rem", fontSize: "0.84rem", color: "#C0392B", marginBottom: "0.9rem" }, children: [
          "\u26A0 ",
          err
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "New Password" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "input", type: "password", placeholder: "At least 8 characters", value: newPass, onChange: (e) => setNewPass(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Confirm New Password" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "input", type: "password", placeholder: "Re-enter password", value: confirm, onChange: (e) => setConfirm(e.target.value), onKeyDown: (e) => e.key === "Enter" && handleChange() })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "0.5rem" }, children: [
          !user.mustChangePassword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline", onClick: () => {
            setMode("view");
            setErr("");
          }, children: "Cancel" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange", onClick: handleChange, children: "Update Password" })
        ] })
      ] })
    ] });
  }
  function FirstLoginGate({ onPasswordChange }) {
    const [newPass, setNewPass] = (0, import_react.useState)("");
    const [confirm, setConfirm] = (0, import_react.useState)("");
    const [err, setErr] = (0, import_react.useState)("");
    const handle = () => {
      if (newPass.length < 8) {
        setErr("Password must be at least 8 characters.");
        return;
      }
      if (newPass !== confirm) {
        setErr("Passwords do not match.");
        return;
      }
      onPasswordChange(newPass);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "modal-bg", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "modal", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "modal-header", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "modal-title", children: "\u{1F510} Set Your Password" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "first-login-banner", children: "Your account was issued a temporary password. You must set a permanent password to continue." }),
      err && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "rgba(192,57,43,0.1)", border: "1.5px solid #C0392B", borderRadius: "6px", padding: "0.55rem 0.9rem", fontSize: "0.84rem", color: "#C0392B", marginBottom: "0.9rem" }, children: [
        "\u26A0 ",
        err
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "New Password" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "input", type: "password", placeholder: "At least 8 characters", value: newPass, onChange: (e) => setNewPass(e.target.value) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Confirm Password" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "input", type: "password", placeholder: "Re-enter password", value: confirm, onChange: (e) => setConfirm(e.target.value), onKeyDown: (e) => e.key === "Enter" && handle() })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange", style: { width: "100%", justifyContent: "center" }, onClick: handle, children: "Set Password & Continue \u2192" })
    ] }) });
  }
  function LoginPage({ onLogin, userList, sheetSynced, sheetError, onRetry }) {
    const [name, setName] = (0, import_react.useState)("");
    const [pass, setPass] = (0, import_react.useState)("");
    const [err, setErr] = (0, import_react.useState)("");
    const [mfaStep, setMfaStep] = (0, import_react.useState)(false);
    const [mfaUser, setMfaUser] = (0, import_react.useState)(null);
    const [mfaCode, setMfaCode] = (0, import_react.useState)("");
    const [mfaLoading, setMfaLoading] = (0, import_react.useState)(false);
    const [mfaInfo, setMfaInfo] = (0, import_react.useState)("");
    const hasRoster = userList.length > 0;
    const locked = !sheetSynced;
    const go = () => {
      if (locked) return;
      const q = name.trim().toLowerCase();
      const user = userList.find(
        (u) => u.name.toLowerCase() === q || u.name.split(",")[0].trim().toLowerCase() === q || u.email.toLowerCase() === q || u.eid && u.eid.toLowerCase() === q
      );
      if (!user) {
        setErr("Name not found. Try your last name, email, or EID.");
        return;
      }
      if (user.password !== pass.trim()) {
        setErr("Incorrect password. Contact ADJ if you need a reset.");
        return;
      }
      if (!user.email) {
        setErr("No email on file. Contact ADJ to add your email before logging in.");
        return;
      }
      setErr("");
      setMfaLoading(true);
      fetch(SHEETS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ token: SHEETS_API_TOKEN, action: "sendMFA", email: user.email })
      }).then((r) => r.json()).then((data) => {
        setMfaLoading(false);
        if (data.ok) {
          setMfaUser(user);
          setMfaStep(true);
          setMfaInfo("A 6-digit code was sent to " + user.email + ". It expires in 5 minutes.");
        } else {
          setErr(data.error || "Failed to send verification code. Try again.");
        }
      }).catch(() => {
        setMfaLoading(false);
        setErr("Network error sending verification code. Check your connection.");
      });
    };
    const verifyCode = () => {
      if (!mfaCode.trim()) {
        setErr("Enter the 6-digit code from your email.");
        return;
      }
      setErr("");
      setMfaLoading(true);
      fetch(SHEETS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ token: SHEETS_API_TOKEN, action: "verifyMFA", email: mfaUser.email, code: mfaCode.trim() })
      }).then((r) => r.json()).then((data) => {
        setMfaLoading(false);
        if (data.ok) {
          onLogin(mfaUser);
        } else {
          setErr(data.error || "Verification failed. Request a new code.");
          setMfaCode("");
        }
      }).catch(() => {
        setMfaLoading(false);
        setErr("Network error verifying code. Check your connection.");
      });
    };
    const resendCode = () => {
      setErr("");
      setMfaCode("");
      setMfaLoading(true);
      fetch(SHEETS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ token: SHEETS_API_TOKEN, action: "sendMFA", email: mfaUser.email })
      }).then((r) => r.json()).then((data) => {
        setMfaLoading(false);
        if (data.ok) {
          setMfaInfo("A new code was sent to " + mfaUser.email + ".");
        } else {
          setErr(data.error || "Failed to resend code.");
        }
      }).catch(() => {
        setMfaLoading(false);
        setErr("Network error. Check your connection.");
      });
    };
    const banner = (msg, color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: `rgba(${color},0.1)`, border: `1.5px solid rgb(${color})`, borderRadius: "6px", padding: "0.55rem 0.9rem", fontSize: "0.84rem", color: `rgb(${color})`, marginBottom: "0.9rem" }, children: msg });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "login-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "login-card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "login-logo", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "login-mark", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", style: { width: "72%", height: "72%", marginBottom: "3px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "4", r: "2" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "3", y1: "7.5", x2: "21", y2: "7.5" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "6", x2: "12", y2: "19" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "6", y1: "19", x2: "18", y2: "19" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 19 Q3 21 4 23 Q6 24 7.5 22" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 19 Q21 21 20 23 Q18 24 16.5 22" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "login-title", children: [
          "The ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quarterdeck" })
        ] })
      ] }),
      !mfaStep ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "login-sub", children: "Sign in with your battalion credentials" }),
        !sheetSynced && !hasRoster && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "rgba(191,87,0,0.08)", border: "1.5px solid #BF5700", borderRadius: "6px", padding: "0.65rem 1rem", fontSize: "0.84rem", color: "#BF5700", marginBottom: "0.9rem", display: "flex", alignItems: "center", gap: "0.6rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "1.1rem" }, children: "\u23F3" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Syncing roster from Google Sheets\u2026 please wait." })
        ] }),
        !sheetSynced && hasRoster && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: "rgba(191,87,0,0.08)", border: "1.5px solid #BF5700", borderRadius: "6px", padding: "0.65rem 1rem", fontSize: "0.84rem", color: "#BF5700", marginBottom: "0.9rem" }, children: "\u23F3 Refreshing roster from Google Sheets in the background\u2026" }),
        sheetSynced && sheetError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "rgba(192,57,43,0.1)", border: "1.5px solid #C0392B", borderRadius: "6px", padding: "0.65rem 1rem", fontSize: "0.84rem", color: "#C0392B", marginBottom: "0.9rem" }, children: [
          "\u26A0 Could not reach Google Sheets",
          hasRoster ? ". Using cached roster for now" : "",
          ". Check your connection and",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onRetry, style: { background: "none", border: "none", color: "#C0392B", fontWeight: 700, textDecoration: "underline", cursor: "pointer", fontSize: "inherit", padding: 0 }, children: "retry" }),
          "."
        ] }),
        err && banner("\u26A0 " + err, "192,57,43"),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Last Name, Email, or EID" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "input",
              placeholder: locked ? "Waiting for roster sync\u2026" : "Last name, email, or EID",
              value: name,
              disabled: locked || mfaLoading,
              style: locked || mfaLoading ? { opacity: 0.45, cursor: "not-allowed" } : {},
              onChange: (e) => setName(e.target.value),
              onKeyDown: (e) => e.key === "Enter" && go()
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Password" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "input",
              type: "password",
              placeholder: locked ? "Waiting for roster sync\u2026" : "Your password",
              value: pass,
              disabled: locked || mfaLoading,
              style: locked || mfaLoading ? { opacity: 0.45, cursor: "not-allowed" } : {},
              onChange: (e) => setPass(e.target.value),
              onKeyDown: (e) => e.key === "Enter" && go()
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            className: "btn btn-orange",
            style: { width: "100%", justifyContent: "center", marginTop: "0.25rem", opacity: locked || mfaLoading ? 0.45 : 1, cursor: locked || mfaLoading ? "not-allowed" : "pointer", fontFamily: "'Barlow', 'Segoe UI', sans-serif", letterSpacing: "normal", textTransform: "none" },
            disabled: locked || mfaLoading,
            onClick: go,
            children: mfaLoading ? "\u23F3 Sending code\u2026" : locked ? "\u23F3 Syncing\u2026" : "Sign In \u2192"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "hint-box", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Username:" }),
          " your last name, full email, or EID.",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Password:" }),
          " use your provided password on first login.",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
          "Contact ADJ if you need a password reset."
        ] })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "login-sub", children: "Two-factor verification" }),
        mfaInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "rgba(39,174,96,0.1)", border: "1.5px solid #27AE60", borderRadius: "6px", padding: "0.55rem 0.9rem", fontSize: "0.84rem", color: "#1e8449", marginBottom: "0.9rem" }, children: [
          "\u2709 ",
          mfaInfo
        ] }),
        err && banner("\u26A0 " + err, "192,57,43"),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Verification Code" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "input",
              type: "text",
              inputMode: "numeric",
              maxLength: 6,
              placeholder: "Enter 6-digit code",
              value: mfaCode,
              disabled: mfaLoading,
              style: mfaLoading ? { opacity: 0.45, cursor: "not-allowed" } : {},
              onChange: (e) => setMfaCode(e.target.value.replace(/\D/g, "").slice(0, 6)),
              onKeyDown: (e) => e.key === "Enter" && verifyCode(),
              autoFocus: true
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            className: "btn btn-orange",
            style: { width: "100%", justifyContent: "center", marginTop: "0.25rem", opacity: mfaLoading ? 0.45 : 1, cursor: mfaLoading ? "not-allowed" : "pointer", fontFamily: "'Barlow', 'Segoe UI', sans-serif", letterSpacing: "normal", textTransform: "none" },
            disabled: mfaLoading,
            onClick: verifyCode,
            children: mfaLoading ? "\u23F3 Verifying\u2026" : "Verify & Sign In \u2192"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", marginTop: "0.75rem", fontSize: "0.83rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              onClick: () => {
                setMfaStep(false);
                setMfaUser(null);
                setMfaCode("");
                setErr("");
                setMfaInfo("");
              },
              style: { background: "none", border: "none", color: "#666", cursor: "pointer", padding: 0, textDecoration: "underline" },
              children: "\u2190 Back"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              onClick: resendCode,
              disabled: mfaLoading,
              style: { background: "none", border: "none", color: "#BF5700", cursor: mfaLoading ? "not-allowed" : "pointer", padding: 0, textDecoration: "underline", opacity: mfaLoading ? 0.45 : 1 },
              children: "Resend code"
            }
          )
        ] })
      ] })
    ] }) });
  }
  function Dashboard({ onNav, userList, chits, forms, reminder, setReminder }) {
    const { user } = useAuth();
    const canManageReminder = isBigFour(user);
    const [editingReminder, setEditingReminder] = React.useState(false);
    const [draftText, setDraftText] = React.useState(reminder.text);
    const saveReminder = () => {
      setReminder({ enabled: draftText.trim().length > 0, text: draftText.trim() });
      setEditingReminder(false);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-title", children: [
        "BN ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dashboard" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-sub", children: [
        "Welcome, ",
        user.rank,
        " ",
        user.name,
        " \u2014 Spring 2026"
      ] }),
      reminder.enabled && reminder.text && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "alert", children: [
        "\u{1F514} ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Reminder:" }),
        " ",
        reminder.text
      ] }),
      canManageReminder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginBottom: "1rem" }, children: editingReminder ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stage-action-box", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stage-action-label", children: "BN Reminder" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "textarea",
          {
            className: "input",
            style: { minHeight: "60px", resize: "vertical", marginBottom: "0.5rem", fontSize: "0.85rem" },
            placeholder: "Type reminder text\u2026 (leave blank to hide)",
            value: draftText,
            onChange: (e) => setDraftText(e.target.value)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-green btn-sm", onClick: saveReminder, children: "Save" }),
          reminder.enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-red btn-sm", onClick: () => {
            setReminder({ enabled: false, text: "" });
            setDraftText("");
            setEditingReminder(false);
          }, children: "Turn Off" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => {
            setDraftText(reminder.text);
            setEditingReminder(false);
          }, children: "Cancel" })
        ] })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => {
        setDraftText(reminder.text);
        setEditingReminder(true);
      }, children: reminder.enabled ? "\u270F Edit Reminder" : "+ Add Reminder" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid3", style: { marginBottom: "1rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stat", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-n", children: userList.length }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-l", children: "BN Strength" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stat", style: { borderLeftColor: "#0D1B2A" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-n", style: { color: "#0D1B2A" }, children: chits.filter((c) => c.status !== "Complete").length }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-l", children: "Open CHITs" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stat", style: { borderLeftColor: "#2A7D4F" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-n", style: { color: "#2A7D4F" }, children: forms.length }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-l", children: "Active Forms" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "potw-card", children: (() => {
            const mon = getCurrentWeekMonday();
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "potw-week", children: [
                "\u{1F4D6} Week ",
                getWeekNumber(mon),
                " \u2014 ",
                SEMESTER_LABEL
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "potw-title", children: [
                "POTW: ",
                formatWeekRange(mon)
              ] })
            ] });
          })() }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card-header", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "card-title", children: "\u{1F4C5} Upcoming Events" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => onNav("calendar"), children: "View All" })
            ] }),
            POTW.operations.slice(0, 4).map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "event-row", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "event-date", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "event-day", children: e.date.split(" ")[0] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "event-mo", children: e.date.split(" ")[1] || "" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "event-title", children: e.title }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "event-sub", children: [
                  e.time,
                  e.location ? ` \xB7 ${e.location}` : ""
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge badge-navy", children: e.type })
            ] }, i))
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card-header", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "card-title", children: "\u{1F4CB} My CHITs" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => onNav("chits"), children: "Open" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.83rem", color: "#666" }, children: "\u{1F512} Private \u2014 only visible to you and your chain of command." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card-header", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "card-title", children: "\u2753 Academic Board" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => onNav("academic"), children: "Open" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: "0.88rem" }, children: [
              "Questions needing answers: ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { style: { color: "#BF5700" }, children: "1" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card-header", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "card-title", children: "\u{1F4DD} Open Forms" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => onNav("forms"), children: "View" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: "0.88rem" }, children: [
              forms.length,
              " form",
              forms.length !== 1 ? "s" : "",
              " posted for your response."
            ] })
          ] })
        ] })
      ] })
    ] });
  }
  function CalendarPage() {
    const mon = getCurrentWeekMonday();
    const weekNum = getWeekNumber(mon);
    const weekRange = formatWeekRange(mon);
    const weekLabel = `Week ${weekNum} \u2014 ${SEMESTER_LABEL}`;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-title", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "POTW" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "potw-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "potw-week", children: [
          "\u{1F4D6} ",
          weekLabel
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "potw-title", children: weekRange })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "card-header", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "card-title", children: [
          "\u{1F4C5} ",
          weekRange
        ] }) }),
        POTW.operations.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.88rem", color: "#666", padding: "0.5rem 0" }, children: "No events scheduled for this week." }),
        POTW.operations.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "event-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "event-date", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "event-day", children: e.date.split(" ")[0] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "event-mo", children: e.date.split(" ")[1] || "" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "event-title", children: e.title }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "event-sub", children: [
              "\u{1F550} ",
              e.time,
              e.location ? ` \xB7 \u{1F4CD} ${e.location}` : ""
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge badge-navy", children: e.type })
        ] }, i))
      ] })
    ] });
  }
  function StructurePage({ userList }) {
    const [open, setOpen] = (0, import_react.useState)({});
    const [billetsOpen, setBilletsOpen] = (0, import_react.useState)(true);
    const byRole = (role) => userList.filter((u) => u.role === role);
    const fmt = (u) => u ? `${u.rank} ${u.name}` : "\u2014";
    const bnco = byRole("bn_cdr")[0];
    const bnxo = byRole("xo")[0];
    const ops = byRole("ops")[0];
    const sel = userList.find((u) => u.role === "sel" && u.company === "BN");
    const billetHolders = STRUCTURE_BILLET_ORDER.flatMap(
      (billet) => userList.filter((u) => getBilletLabel(u) === billet)
    );
    const COMPANY_DEFS = [
      { key: "Alpha", name: getCompanyFullName("Alpha"), color: COMPANY_COLORS.Alpha },
      { key: "Bravo", name: getCompanyFullName("Bravo"), color: COMPANY_COLORS.Bravo },
      { key: "Charlie", name: getCompanyFullName("Charlie"), color: COMPANY_COLORS.Charlie }
    ];
    const companies = COMPANY_DEFS.map((def) => {
      const members = userList.filter((u) => normalizeCompany(u.company) === def.key);
      const co = members.find((u) => u.role === "co_cdr");
      const sel2 = members.find((u) => u.role === "sel");
      const platoonNames = [...new Set(members.map((u) => u.platoon).filter((p) => /\d+(st|nd|rd|th) PC/i.test(p)))].sort();
      const platoons = platoonNames.map((pName) => {
        const pMembers = members.filter((u) => u.platoon === pName);
        const pc = pMembers.find((u) => u.role === "plt_cdr");
        const displayName = pName.replace(/ PC$/i, " PLT");
        return { name: displayName, pc, total: pMembers.length };
      });
      return { ...def, co, sel: sel2, platoons, total: members.length };
    });
    const grandTotal = userList.length;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-title", children: [
        "BN ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Structure" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-sub", children: [
        "The Quarterdeck \u2014 ",
        grandTotal,
        " Personnel"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card", style: { padding: "1rem 1.2rem", marginBottom: "1rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "#888", marginBottom: "0.6rem", fontWeight: 600 }, children: "Battalion Leadership" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }, children: [
          { label: "BNCO", user: bnco },
          { label: "BNXO", user: bnxo },
          { label: "OPS", user: ops },
          { label: "SEL", user: sel }
        ].map(({ label, user: u }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "#f8f8f8", borderRadius: "8px", padding: "0.6rem 0.8rem", borderLeft: "3px solid #BF5700" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "1px", color: "#BF5700", fontWeight: 700 }, children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.88rem", fontWeight: 600, marginTop: "0.15rem" }, children: u ? fmt(u) : "\u2014" })
        ] }, label)) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid3", style: { marginBottom: "1rem" }, children: companies.map((co, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stat", style: { borderLeftColor: co.color }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-n", style: { color: co.color }, children: co.total }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-l", children: co.name })
      ] }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "company-block", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "company-header", style: { background: "#333" }, onClick: () => setBilletsOpen((s) => !s), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "company-name", children: "Billet Holders" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "company-co", children: [
              billetHolders.length,
              " billets assigned"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: billetsOpen ? "\u25B2" : "\u25BC" })
        ] }),
        billetsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "0.75rem 1rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.5rem" }, children: billetHolders.map((u, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.45rem 0.7rem", background: "#f8f8f8", borderRadius: "6px", fontSize: "0.82rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontWeight: 600 }, children: fmt(u) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge badge-orange", style: { fontSize: "0.68rem" }, children: getBilletLabel(u) })
        ] }, i)) }) })
      ] }),
      companies.map((co, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "company-block", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "company-header", style: { background: co.color }, onClick: () => setOpen((s) => ({ ...s, [ci]: !s[ci] })), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "company-name", children: co.name }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "company-co", children: [
              "CO: ",
              co.co ? fmt(co.co) : "\u2014",
              co.sel ? ` \xB7 SEL: ${fmt(co.sel)}` : ""
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: open[ci] ? "\u25B2" : "\u25BC" })
        ] }),
        open[ci] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "platoon-grid", children: co.platoons.map((p, pi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "platoon-card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "platoon-name", children: p.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "platoon-detail", children: [
            "PC: ",
            p.pc ? fmt(p.pc) : "\u2014"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: "0.4rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "badge badge-orange", children: [
            p.total,
            " Member",
            p.total !== 1 ? "s" : ""
          ] }) })
        ] }, pi)) })
      ] }, ci))
    ] });
  }
  function TrainingPage({ ptPlans, setPtPlans, llSessions, setLlSessions }) {
    const { user } = useAuth();
    const canUploadPT = canEdit(user, "pt");
    const canEditLL = user.role === "traino";
    const [tab, setTab] = (0, import_react.useState)("pt");
    const [toast, setToast] = (0, import_react.useState)("");
    const [editingLL, setEditingLL] = (0, import_react.useState)(null);
    const [llDraft, setLlDraft] = (0, import_react.useState)({});
    const [showAddLL, setShowAddLL] = (0, import_react.useState)(false);
    const [newLL, setNewLL] = (0, import_react.useState)({ title: "", date: "", notes: "" });
    const fire = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(""), 3e3);
    };
    const handlePTUpload = (key, file) => {
      if (!file) return;
      if (file.type !== "application/pdf") {
        fire("\u26A0 Please select a PDF file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setPtPlans((prev) => ({
          ...prev,
          [key]: { fileName: file.name, dataUrl: e.target.result, uploadedBy: user.name, uploadedAt: (/* @__PURE__ */ new Date()).toLocaleDateString() }
        }));
        fire("\u2705 PT plan uploaded.");
      };
      reader.readAsDataURL(file);
    };
    const removePTPlan = (key) => {
      setPtPlans((prev) => ({ ...prev, [key]: null }));
      fire("PT plan removed.");
    };
    const startEditLL = (ll) => {
      setEditingLL(ll.id);
      setLlDraft({ title: ll.title, date: ll.date, notes: ll.notes });
    };
    const saveEditLL = () => {
      setLlSessions((prev) => prev.map((s) => s.id === editingLL ? { ...s, ...llDraft } : s));
      setEditingLL(null);
      fire("\u2705 Session updated.");
    };
    const addLLSession = () => {
      if (!newLL.title || !newLL.date) return;
      setLlSessions((prev) => [...prev, { id: Date.now(), ...newLL }]);
      setNewLL({ title: "", date: "", notes: "" });
      setShowAddLL(false);
      fire("\u2705 Leadership Lab session added.");
    };
    const deleteLLSession = (id) => {
      setLlSessions((prev) => prev.filter((s) => s.id !== id));
      fire("Session removed.");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-title", children: [
        "Training ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Plans" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-sub", children: "Weekly PT schedules and Leadership Lab notes" }),
      toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "alert alert-green", children: toast }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", borderBottom: "2px solid #eee", marginBottom: "1.25rem" }, children: [["pt", "PT Plan"], ["leadlab", "LL"]].map(([t, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setTab(t), style: {
        padding: "0.5rem 1.2rem",
        fontFamily: "Oswald",
        fontSize: "0.8rem",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        cursor: "pointer",
        background: "none",
        border: "none",
        borderBottom: tab === t ? "2px solid #BF5700" : "2px solid transparent",
        color: tab === t ? "#BF5700" : "#888",
        marginBottom: "-2px"
      }, children: label }, t)) }),
      tab === "pt" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        canUploadPT && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "alert", children: [
          "\u270F ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "OPS / PTO \u2014 Upload Mode:" }),
          " Use the buttons below to post this week's PT plan PDFs."
        ] }),
        PT_SESSIONS.map((s) => {
          const plan = ptPlans[s.key];
          const inputId = `pt-file-${s.key}`;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "white", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid rgba(191,87,0,0.1)", borderTop: `4px solid ${s.color}`, padding: "1.25rem", marginBottom: "1.25rem" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.9rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: "Oswald", fontSize: "1.05rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px" }, children: [
                  s.day,
                  " \u2014 ",
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: s.color }, children: s.type })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.78rem", color: "#888", marginTop: "2px" }, children: s.desc })
              ] }),
              canUploadPT && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { htmlFor: inputId, className: "btn btn-orange btn-sm", style: { cursor: "pointer" }, children: [
                  "\u2191 ",
                  plan ? "Replace PDF" : "Upload PDF"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "input",
                  {
                    id: inputId,
                    type: "file",
                    accept: ".pdf,application/pdf",
                    style: { display: "none" },
                    onChange: (e) => {
                      handlePTUpload(s.key, e.target.files[0]);
                      e.target.value = "";
                    }
                  }
                ),
                plan && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => removePTPlan(s.key), children: "\u2715 Remove" })
              ] })
            ] }),
            plan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.65rem", flexWrap: "wrap" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "0.78rem", color: "#2A7D4F", fontWeight: 600 }, children: [
                  "\u{1F4C4} ",
                  plan.fileName
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "0.72rem", color: "#aaa" }, children: [
                  "Uploaded by ",
                  plan.uploadedBy,
                  " \xB7 ",
                  plan.uploadedAt
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: plan.dataUrl, download: plan.fileName, className: "btn btn-outline btn-sm", children: "\u2B07 Download" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "iframe",
                {
                  src: plan.dataUrl,
                  title: `${s.day} ${s.type} Plan`,
                  style: { width: "100%", height: "620px", border: "1px solid #eee", borderRadius: "6px", display: "block" }
                }
              )
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { textAlign: "center", padding: "2.5rem 1rem", background: "#faf8f5", borderRadius: "8px", border: "2px dashed #e0d8d0" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "2.2rem", marginBottom: "0.4rem" }, children: "\u{1F4CB}" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "Oswald", fontSize: "0.82rem", letterSpacing: "1px", textTransform: "uppercase", color: "#bbb" }, children: "No plan uploaded for this week" }),
              canUploadPT && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.78rem", color: "#BF5700", marginTop: "0.4rem" }, children: "Use the Upload PDF button above." })
            ] })
          ] }, s.key);
        })
      ] }),
      tab === "leadlab" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        canEditLL && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: "Oswald", fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#BF5700" }, children: "\u270F TRAINO \u2014 you can add and edit sessions" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange btn-sm", onClick: () => setShowAddLL(true), children: "+ Add Session" })
        ] }),
        llSessions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "empty", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "2rem" }, children: "\u{1F5FA}" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: "0.5rem" }, children: "No Leadership Lab sessions scheduled yet." })
        ] }),
        llSessions.map((ll) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "card", style: { marginBottom: "1rem" }, children: editingLL === ll.id ? (
          /* ── Edit mode (TRAINO only) ── */
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "Oswald", fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#BF5700", marginBottom: "0.75rem" }, children: "\u270F Editing Session" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Title" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "input", value: llDraft.title, onChange: (e) => setLlDraft((d) => ({ ...d, title: e.target.value })) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Date" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "input", type: "date", value: llDraft.date, onChange: (e) => setLlDraft((d) => ({ ...d, date: e.target.value })) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Notes" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "textarea",
                {
                  className: "input",
                  style: { minHeight: "100px", resize: "vertical" },
                  value: llDraft.notes,
                  onChange: (e) => setLlDraft((d) => ({ ...d, notes: e.target.value }))
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", justifyContent: "flex-end" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => setEditingLL(null), children: "Cancel" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange btn-sm", onClick: saveEditLL, children: "Save" })
            ] })
          ] })
        ) : (
          /* ── View mode ── */
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: ll.notes ? "0.75rem" : 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "Oswald", fontSize: "1rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }, children: ll.title }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge badge-orange", style: { marginTop: "0.3rem" }, children: ll.date })
              ] }),
              canEditLL && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.4rem" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => startEditLL(ll), children: "\u270F Edit" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-sm", style: { background: "transparent", border: "1.5px solid #C0392B", color: "#C0392B" }, onClick: () => deleteLLSession(ll.id), children: "\u{1F5D1}" })
              ] })
            ] }),
            ll.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: "#f5f2ee", borderRadius: "6px", padding: "0.65rem 0.85rem", fontSize: "0.85rem", color: "#555", lineHeight: 1.6 }, children: ll.notes }) : canEditLL && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.78rem", color: "#aaa" }, children: "No notes yet \u2014 click Edit to add." })
          ] })
        ) }, ll.id)),
        showAddLL && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, { title: "Add Leadership Lab Session", onClose: () => setShowAddLL(false), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Title" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "input", placeholder: "e.g. Land Navigation", value: newLL.title, onChange: (e) => setNewLL((s) => ({ ...s, title: e.target.value })) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Date" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "input", type: "date", value: newLL.date, onChange: (e) => setNewLL((s) => ({ ...s, date: e.target.value })) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Notes" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "textarea",
              {
                className: "input",
                style: { minHeight: "90px", resize: "vertical" },
                placeholder: "Equipment, uniform, location, objectives\u2026",
                value: newLL.notes,
                onChange: (e) => setNewLL((s) => ({ ...s, notes: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.75rem", justifyContent: "flex-end" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline", onClick: () => setShowAddLL(false), children: "Cancel" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange", onClick: addLLSession, children: "Add Session" })
          ] })
        ] })
      ] })
    ] });
  }
  function ChitsPage({ chits, setChits, userList }) {
    const { user } = useAuth();
    const canSubmit = canSubmitChit(user);
    const needsRouteSelect = requiresChitRouteSelection(user);
    const [showModal, setShowModal] = (0, import_react.useState)(false);
    const [toast, setToast] = (0, import_react.useState)("");
    const [form, setForm] = (0, import_react.useState)({ date: "", reason: "", notes: "", routeCompany: "", routePlatoon: "", routingSheet: null, chitDoc: null });
    const [chitSubmitAttempted, setChitSubmitAttempted] = (0, import_react.useState)(false);
    const [activeComment, setActiveComment] = (0, import_react.useState)(null);
    const [commentText, setCommentText] = (0, import_react.useState)("");
    const visible = chits.filter((c) => canViewChit(user, c));
    const fire = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(""), 3500);
    };
    const loadChitPDF = (field, file) => {
      if (!file || file.type !== "application/pdf") {
        fire("\u26A0 Please select a PDF file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => setForm((s) => ({ ...s, [field]: { fileName: file.name, dataUrl: e.target.result } }));
      reader.readAsDataURL(file);
    };
    const getPlatoons = (company) => {
      const pcs = userList.filter((u) => normalizeCompany(u.company) === company && u.role === "plt_cdr");
      return [...new Set(pcs.map((u) => normalizePlatoon(u.platoon)).filter(Boolean))].sort();
    };
    const routeHint = () => {
      if (user.role === "adj") return "BNXO \u2192 BNCO";
      if (user.role === "co_cdr") return "ADJ \u2192 BNXO \u2192 BNCO";
      if (user.role === "plt_cdr") return "CC \u2192 ADJ \u2192 BNXO \u2192 BNCO";
      return "PC \u2192 CC \u2192 ADJ \u2192 BNXO \u2192 BNCO";
    };
    const submit = () => {
      setChitSubmitAttempted(true);
      if (!form.date || !form.reason) {
        fire("\u26A0 Date of Absence and Reason are required.");
        return;
      }
      if (!form.routingSheet || !form.chitDoc) {
        fire("\u26A0 Both PDFs are required: Routing Sheet and CHIT Document.");
        return;
      }
      if (needsRouteSelect && (!form.routeCompany || !form.routePlatoon)) {
        fire("\u26A0 Please select your company and platoon.");
        return;
      }
      const routeContext = resolveChitRoutingContext(user, form);
      const approvalChain = buildChitApprovalChain(userList, user, routeContext);
      if (approvalChain.length === 0) {
        fire("\u26A0 Could not build approval chain. Ensure your company/platoon has assigned personnel.");
        return;
      }
      const now = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const stages = buildChitStages(user.name, now, approvalChain);
      const c = {
        id: "CHT-" + String(chits.length + 1).padStart(3, "0"),
        userId: user.id,
        name: user.name,
        company: routeContext.company,
        platoon: routeContext.platoon,
        date: form.date,
        reason: form.reason,
        notes: form.notes,
        status: "Pending",
        currentStage: 1,
        stages,
        docs: { routingSheet: form.routingSheet, chitDoc: form.chitDoc }
      };
      setChits((prev) => [...prev, c]);
      setShowModal(false);
      setForm({ date: "", reason: "", notes: "", routeCompany: "", routePlatoon: "", routingSheet: null, chitDoc: null });
      setChitSubmitAttempted(false);
      fire("\u2705 CHIT submitted and routed to your chain of command.");
    };
    const advanceStage = (id, action) => {
      const comment = commentText.trim();
      setChits((prev) => prev.map((c) => {
        if (c.id !== id) return c;
        const updated = [...c.stages];
        updated[c.currentStage] = {
          ...updated[c.currentStage],
          completedBy: user.name,
          completedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          comment
        };
        const next = action === "returned" ? c.currentStage : Math.min(c.currentStage + 1, c.stages.length - 1);
        const status = action === "returned" ? "Returned" : next === c.stages.length - 1 ? "Approved" : "Pending";
        return { ...c, currentStage: next, stages: updated, status };
      }));
      setActiveComment(null);
      setCommentText("");
      fire("CHIT updated.");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-title", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CHITs" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-sub", children: "Submit and track absence requests" }),
      toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "alert alert-green", children: toast }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "privacy-note", children: [
        "\u{1F512} ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Private." }),
        " Only you and your chain of command can see your CHITs."
      ] }),
      canSubmit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange", onClick: () => setShowModal(true), children: "+ Submit New CHIT" }) }),
      visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "empty", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "2rem" }, children: "\u{1F4CB}" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: "0.5rem" }, children: "No CHITs on file." })
      ] }),
      visible.map((c, i) => {
        const canAct = canActOnChit(user, c);
        const isDone = c.status === "Approved" || c.status === "Denied" || c.status === "Returned";
        const currentStageName = c.stages?.[c.currentStage]?.name || "";
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "chit-card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.3rem" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.id }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { color: "#888", fontSize: "0.82rem", marginLeft: "0.75rem" }, children: [
                c.name,
                " \xB7 ",
                formatCompanyCoLabel(c.company),
                ", ",
                formatPlatoonLabel(c.platoon)
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `badge ${c.status === "Approved" ? "badge-green" : c.status === "Denied" || c.status === "Returned" ? "badge-red" : "badge-orange"}`, children: c.status }),
              canAct && !isDone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge", style: { background: "rgba(42,125,79,0.15)", color: "#2A7D4F" }, children: "\u25CF Your Action" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: "0.82rem", color: "#666" }, children: [
            c.reason,
            " \xB7 Absent: ",
            c.date
          ] }),
          c.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.8rem", color: "#888", marginTop: "0.2rem" }, children: c.notes }),
          c.docs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center", marginTop: "0.55rem" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: "Oswald", fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888" }, children: "Docs:" }),
            c.docs.routingSheet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: c.docs.routingSheet.dataUrl, download: c.docs.routingSheet.fileName, className: "btn btn-outline btn-sm", children: "\u{1F4C4} Routing Sheet" }),
            c.docs.chitDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: c.docs.chitDoc.dataUrl, download: c.docs.chitDoc.fileName, className: "btn btn-outline btn-sm", children: "\u{1F4C4} CHIT Document" })
          ] }),
          c.stages && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stage-track", style: { marginTop: "0.75rem" }, children: c.stages.map((s, j) => {
            const done = j < c.currentStage;
            const returned = j === c.currentStage && c.status === "Returned";
            const active = j === c.currentStage && !isDone;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `stage-item ${done ? "done" : returned ? "returned" : active ? "active" : ""}`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `stage-dot ${done ? "done" : returned ? "returned" : active ? "active" : "pending"}`, children: done ? "\u2713" : returned ? "\u21A9" : s.icon }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `stage-label ${done ? "done" : returned ? "returned" : active ? "active" : ""}`, children: s.name }),
              active && canAct && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stage-approver active", children: "\u25CF You" })
            ] }, j);
          }) }),
          c.stages?.some((s) => s.completedBy && s.comment) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: "0.5rem" }, children: c.stages.map((s, j) => s.completedBy && s.comment ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stage-comment", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stage-comment-by", children: [
              s.name,
              " \xB7 ",
              s.completedBy,
              " \xB7 ",
              s.completedAt
            ] }),
            s.comment
          ] }, j) : null) }),
          canAct && !isDone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stage-action-box", style: { marginTop: "0.75rem" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stage-action-label", children: [
              "\u2B50 Your Review \u2014 ",
              currentStageName
            ] }),
            activeComment === c.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "textarea",
                {
                  className: "input",
                  style: { minHeight: "70px", resize: "vertical", marginBottom: "0.65rem", fontSize: "0.85rem" },
                  placeholder: "Add comments (optional)\u2026",
                  value: commentText,
                  onChange: (e) => setCommentText(e.target.value)
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-green btn-sm", onClick: () => advanceStage(c.id, "approved"), children: "\u2713 Approve" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-red btn-sm", onClick: () => advanceStage(c.id, "returned"), children: "\u21A9 Return to Originator" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => {
                  setActiveComment(null);
                  setCommentText("");
                }, children: "Cancel" })
              ] })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange btn-sm", onClick: () => {
              setActiveComment(c.id);
              setCommentText("");
            }, children: "\u270F Review CHIT" })
          ] })
        ] }, i);
      }),
      showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, { title: "Submit CHIT", onClose: () => setShowModal(false), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "privacy-note", children: "\u{1F512} Private \u2014 only you and your CoC will see this." }),
        needsRouteSelect && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Your Company" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", value: form.routeCompany, onChange: (e) => setForm((s) => ({ ...s, routeCompany: e.target.value, routePlatoon: "" })), children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "Select company\u2026" }),
              ["Alpha", "Bravo", "Charlie"].map((co) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: co, children: co }, co))
            ] })
          ] }),
          form.routeCompany && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Your Platoon" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", value: form.routePlatoon, onChange: (e) => setForm((s) => ({ ...s, routePlatoon: e.target.value })), children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "Select platoon\u2026" }),
              getPlatoons(form.routeCompany).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: p, children: formatPlatoonLabel(p) }, p))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Date of Absence" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "input", type: "date", value: form.date, onChange: (e) => setForm((s) => ({ ...s, date: e.target.value })) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Reason" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", value: form.reason, onChange: (e) => setForm((s) => ({ ...s, reason: e.target.value })), children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "Select reason\u2026" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Medical Appointment" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Academic Conflict \u2014 Exam" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Academic Conflict \u2014 Lab" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Family Emergency" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Personal Emergency" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Notes (optional)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { className: "input", style: { minHeight: "80px", resize: "vertical" }, value: form.notes, onChange: (e) => setForm((s) => ({ ...s, notes: e.target.value })) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { borderTop: "1px solid #eee", paddingTop: "0.85rem", marginTop: "0.25rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "Oswald", fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", marginBottom: "0.65rem" }, children: "Required Documents" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
              "Routing Sheet ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#C0392B" }, children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "chit-routing-sheet", className: "btn btn-outline btn-sm", style: { cursor: "pointer" }, children: form.routingSheet ? "\u2191 Replace PDF" : "\u2191 Upload PDF" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  id: "chit-routing-sheet",
                  type: "file",
                  accept: ".pdf,application/pdf",
                  style: { display: "none" },
                  onChange: (e) => {
                    loadChitPDF("routingSheet", e.target.files[0]);
                    e.target.value = "";
                  }
                }
              ),
              form.routingSheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "0.78rem", color: "#2A7D4F", fontWeight: 600 }, children: [
                "\u{1F4C4} ",
                form.routingSheet.fileName
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "0.75rem", color: "#C0392B" }, children: "Required" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
              "CHIT Document ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#C0392B" }, children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "chit-doc", className: "btn btn-outline btn-sm", style: { cursor: "pointer" }, children: form.chitDoc ? "\u2191 Replace PDF" : "\u2191 Upload PDF" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  id: "chit-doc",
                  type: "file",
                  accept: ".pdf,application/pdf",
                  style: { display: "none" },
                  onChange: (e) => {
                    loadChitPDF("chitDoc", e.target.files[0]);
                    e.target.value = "";
                  }
                }
              ),
              form.chitDoc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "0.78rem", color: "#2A7D4F", fontWeight: 600 }, children: [
                "\u{1F4C4} ",
                form.chitDoc.fileName
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "0.75rem", color: "#C0392B" }, children: "Required" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "#f5f2ee", borderRadius: "8px", padding: "0.65rem", fontSize: "0.8rem", color: "#666", marginBottom: "1rem" }, children: [
          "Your CHIT routes to: ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: routeHint() })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.75rem", justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline", onClick: () => setShowModal(false), children: "Cancel" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange", onClick: submit, children: "Submit CHIT" })
        ] })
      ] })
    ] });
  }
  function RosterPage({ userList }) {
    const [q, setQ] = (0, import_react.useState)("");
    const [co, setCo] = (0, import_react.useState)("");
    const fil = userList.filter(
      (p) => (!q || p.name.toLowerCase().includes(q.toLowerCase()) || p.rank.toLowerCase().includes(q.toLowerCase())) && (!co || normalizeCompany(p.company) === co)
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-title", children: [
        "Recall ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Roster" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-sub", children: "BN contact directory \u2014 sourced live from Google Sheets" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative", flex: 1, minWidth: "180px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)", color: "#aaa" }, children: "\u{1F50D}" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "input", style: { paddingLeft: "2.1rem" }, placeholder: "Search name or rank\u2026", value: q, onChange: (e) => setQ(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", style: { maxWidth: "170px" }, value: co, onChange: (e) => setCo(e.target.value), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "All Companies" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "BN", children: "BN" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Alpha", children: "Alpha" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Bravo", children: "Bravo" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Charlie", children: "Charlie" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: "0.78rem", color: "#888", marginBottom: "0.75rem" }, children: [
          fil.length,
          " result",
          fil.length !== 1 ? "s" : ""
        ] }),
        fil.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "empty", children: "No results found." }),
        fil.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "roster-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "avatar", children: p.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontWeight: 600, fontSize: "0.9rem" }, children: p.name }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.78rem", color: "#BF5700", fontWeight: 600 }, children: p.rank }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: "0.78rem", color: "#888" }, children: [
              formatCompanyCoLabel(p.company),
              " \xB7 ",
              p.platoon,
              " Plt"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap", marginLeft: "auto" }, children: [
            p.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "tel:" + p.phone, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "btn btn-outline btn-sm", children: [
              "\u{1F4DE} ",
              p.phone
            ] }) }),
            p.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "mailto:" + p.email, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-navy btn-sm", children: "\u2709 Email" }) })
          ] })
        ] }, i))
      ] })
    ] });
  }
  function FormsPage({ forms, setForms }) {
    const { user } = useAuth();
    const canManage = isSenior(user) || ["adj", "pto", "traino", "academics"].includes(user.role);
    const [showModal, setShowModal] = (0, import_react.useState)(false);
    const [toast, setToast] = (0, import_react.useState)("");
    const [draft, setDraft] = (0, import_react.useState)({ title: "", url: "", category: "Admin", deadline: "" });
    const fire = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(""), 3e3);
    };
    const addForm = () => {
      if (!draft.title.trim() || !draft.url.trim()) {
        fire("\u26A0 Title and URL are required.");
        return;
      }
      setForms((prev) => [...prev, {
        id: Date.now(),
        title: draft.title.trim(),
        url: draft.url.trim(),
        category: draft.category,
        deadline: draft.deadline,
        addedBy: user.name,
        addedAt: (/* @__PURE__ */ new Date()).toLocaleDateString(),
        clicks: {}
        // { [userId]: true } once they click Fill Out
      }]);
      setShowModal(false);
      setDraft({ title: "", url: "", category: "Admin", deadline: "" });
      fire("\u2705 Form posted to the battalion.");
    };
    const deleteForm = (id) => {
      setForms((prev) => prev.filter((f) => f.id !== id));
      fire("Form removed.");
    };
    const handleFillOut = (id) => {
      const f = forms.find((f2) => f2.id === id);
      if (!f) return;
      setForms((prev) => prev.map(
        (f2) => f2.id === id ? { ...f2, clicks: { ...f2.clicks, [user.id]: true } } : f2
      ));
      window.open(f.url, "_blank", "noopener,noreferrer");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-title", children: [
        "Forms & ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Links" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-sub", children: "Click a link to open the form \u2014 your status updates automatically" }),
      toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "alert alert-green", children: toast }),
      canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange", onClick: () => setShowModal(true), children: "+ Add Form" }) }),
      forms.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "empty", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "2rem" }, children: "\u{1F4DD}" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: "0.5rem" }, children: "No forms posted yet." }),
        canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.8rem", color: "#BF5700", marginTop: "0.3rem" }, children: "Use the Add Form button to share a link with the battalion." })
      ] }),
      forms.map((f) => {
        const opened = !!f.clicks[user.id];
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "form-row", style: { alignItems: "center" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontWeight: 600, marginBottom: "0.2rem" }, children: f.title }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: "0.78rem", color: "#888" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tag", children: f.category }),
              f.deadline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                " \xB7 Due: ",
                f.deadline
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                " \xB7 Added by ",
                f.addedBy,
                " \xB7 ",
                f.addedAt
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }, children: [
            opened ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge badge-green", children: "\u2713 Opened" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge", style: { background: "#f5f2ee", color: "#bbb" }, children: "Not opened" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange btn-sm", onClick: () => handleFillOut(f.id), children: "Fill Out \u2197" }),
            canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                className: "btn btn-sm",
                style: { background: "transparent", border: "1.5px solid #C0392B", color: "#C0392B" },
                onClick: () => deleteForm(f.id),
                children: "\u{1F5D1}"
              }
            )
          ] })
        ] }, f.id);
      }),
      showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, { title: "Add Form", onClose: () => setShowModal(false), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
            "Title ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#C0392B" }, children: "*" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "input",
              placeholder: "e.g. ACFT Readiness Survey",
              value: draft.title,
              onChange: (e) => setDraft((s) => ({ ...s, title: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
            "URL ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#C0392B" }, children: "*" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "input",
              type: "url",
              placeholder: "https://forms.google.com/\u2026",
              value: draft.url,
              onChange: (e) => setDraft((s) => ({ ...s, url: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Category" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", value: draft.category, onChange: (e) => setDraft((s) => ({ ...s, category: e.target.value })), children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Admin" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "PT" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Training" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Event" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Deadline (optional)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "input",
              type: "date",
              value: draft.deadline,
              onChange: (e) => setDraft((s) => ({ ...s, deadline: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.75rem", justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline", onClick: () => setShowModal(false), children: "Cancel" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange", onClick: addForm, children: "Add Form" })
        ] })
      ] })
    ] });
  }
  function AcademicPage() {
    const { user } = useAuth();
    const [qs, setQs] = (0, import_react.useState)(INIT_QS);
    const [showModal, setShowModal] = (0, import_react.useState)(false);
    const [ansFor, setAnsFor] = (0, import_react.useState)(null);
    const [filter, setFilter] = (0, import_react.useState)("");
    const [newQ, setNewQ] = (0, import_react.useState)({ subject: "", text: "" });
    const [ansText, setAnsText] = (0, import_react.useState)("");
    const subjects = [...new Set(qs.map((q) => q.subject))];
    const visible = qs.filter((q) => !filter || q.subject === filter);
    const postQ = () => {
      if (!newQ.subject || !newQ.text) return;
      setQs((prev) => [{
        id: Date.now(),
        authorId: user.id,
        author: user.name,
        rank: user.rank,
        subject: newQ.subject,
        time: "Just now",
        answered: false,
        text: newQ.text,
        answers: []
      }, ...prev]);
      setShowModal(false);
      setNewQ({ subject: "", text: "" });
    };
    const postAns = (qid) => {
      if (!ansText.trim()) return;
      setQs((prev) => prev.map((q) => q.id === qid ? {
        ...q,
        answered: true,
        answers: [...q.answers, { author: user.name, rank: user.rank, text: ansText }]
      } : q));
      setAnsFor(null);
      setAnsText("");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-title", children: [
        "Academic ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Help Board" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-sub", children: "Post questions \xB7 Get answers from upperclassmen" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", style: { maxWidth: "200px" }, value: filter, onChange: (e) => setFilter(e.target.value), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "All Subjects" }),
          subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "0.82rem", color: "#888", flex: 1 }, children: [
          qs.filter((q) => !q.answered).length,
          " question",
          qs.filter((q) => !q.answered).length !== 1 ? "s" : "",
          " need answers"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange", onClick: () => setShowModal(true), children: "+ Ask a Question" })
      ] }),
      visible.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "q-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "q-meta", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "avatar", style: { width: 32, height: 32, fontSize: "0.72rem" }, children: [
            q.author.split(",")[0]?.[0],
            q.author.split(",")[1]?.trim()?.[0]
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { style: { fontSize: "0.85rem" }, children: q.author }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge badge-navy", children: q.rank }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tag", children: q.subject }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "0.75rem", color: "#aaa" }, children: q.time }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `badge ${q.answered ? "badge-green" : "badge-orange"}`, style: { marginLeft: "auto" }, children: q.answered ? "Answered" : "Needs Answer" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "q-text", children: q.text }),
        q.answers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: "Oswald", fontSize: "0.7rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", marginBottom: "0.5rem" }, children: [
            "Answers (",
            q.answers.length,
            ")"
          ] }),
          q.answers.map((a, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "answer-block", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "answer-author", children: [
              a.author,
              " \xB7 ",
              a.rank
            ] }),
            a.text
          ] }, j))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: "0.75rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => setAnsFor(ansFor === q.id ? null : q.id), children: ansFor === q.id ? "Cancel" : "\u270F Add Answer" }) }),
        ansFor === q.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "0.75rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "textarea",
            {
              className: "input",
              style: { minHeight: "80px", resize: "vertical", marginBottom: "0.5rem" },
              placeholder: "Write your answer\u2026",
              value: ansText,
              onChange: (e) => setAnsText(e.target.value)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange btn-sm", onClick: () => postAns(q.id), children: "Post Answer" })
        ] })
      ] }, i)),
      showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, { title: "Ask a Question", onClose: () => setShowModal(false), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Subject" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", value: newQ.subject, onChange: (e) => setNewQ((s) => ({ ...s, subject: e.target.value })), children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "Select subject\u2026" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Calculus I" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Calculus II" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Calculus III" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Physics I" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Physics II" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Chemistry" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Statics" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Naval Science" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Your Question" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "textarea",
            {
              className: "input",
              style: { minHeight: "100px", resize: "vertical" },
              placeholder: "Be specific \u2014 include what you have already tried\u2026",
              value: newQ.text,
              onChange: (e) => setNewQ((s) => ({ ...s, text: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.75rem", justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline", onClick: () => setShowModal(false), children: "Cancel" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange", onClick: postQ, children: "Post Question" })
        ] })
      ] })
    ] });
  }
  function FitrepsPage({ fitrebs, setFitrebs, userList }) {
    const { user } = useAuth();
    const canSubmit = canSubmitChit(user);
    const needsRouteSelect = requiresChitRouteSelection(user);
    const [showModal, setShowModal] = (0, import_react.useState)(false);
    const [submitForm, setSubmitForm] = (0, import_react.useState)({ period: "Spring 2026", notes: "", routeCompany: "", routePlatoon: "", fitrepDoc: null, routingSheet: null });
    const [activeComment, setActiveComment] = (0, import_react.useState)(null);
    const [commentText, setCommentText] = (0, import_react.useState)("");
    const [toast, setToast] = (0, import_react.useState)("");
    const [filter, setFilter] = (0, import_react.useState)("");
    const fire = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(""), 3500);
    };
    const loadFitrepPDF = (field, file) => {
      if (!file || file.type !== "application/pdf") {
        fire("\u26A0 Please select a PDF file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => setSubmitForm((s) => ({ ...s, [field]: { fileName: file.name, dataUrl: e.target.result } }));
      reader.readAsDataURL(file);
    };
    const visible = fitrebs.filter((f) => canViewFitrep(user, f));
    const filtered = filter ? visible.filter((f) => normalizeCompany(f.company) === filter) : visible;
    const getPlatoons = (company) => {
      const pcs = userList.filter((u) => normalizeCompany(u.company) === company && u.role === "plt_cdr");
      return [...new Set(pcs.map((u) => normalizePlatoon(u.platoon)).filter(Boolean))].sort();
    };
    const routeHint = () => {
      if (user.role === "adj") return "BNXO \u2192 BNCO";
      if (user.role === "co_cdr") return "ADJ \u2192 BNXO \u2192 BNCO";
      if (user.role === "plt_cdr") return "CC \u2192 ADJ \u2192 BNXO \u2192 BNCO";
      return "PC \u2192 CC \u2192 ADJ \u2192 BNXO \u2192 BNCO";
    };
    const handleSubmit = () => {
      if (!submitForm.period) return;
      if (!submitForm.fitrepDoc || !submitForm.routingSheet) {
        fire("\u26A0 Both PDFs are required: FITREP Document and Routing Sheet.");
        return;
      }
      if (needsRouteSelect && (!submitForm.routeCompany || !submitForm.routePlatoon)) {
        fire("\u26A0 Please select your company and platoon.");
        return;
      }
      const routeContext = resolveChitRoutingContext(user, submitForm);
      const approvalChain = buildChitApprovalChain(userList, user, routeContext);
      if (approvalChain.length === 0) {
        fire("\u26A0 Could not build approval chain. Ensure your company/platoon has assigned personnel.");
        return;
      }
      const now = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const stages = buildChitStages(user.name, now, approvalChain);
      const f = {
        id: "FIT-" + String(fitrebs.length + 1).padStart(3, "0"),
        subjectId: user.id,
        subjectName: user.name,
        subjectRank: user.rank,
        company: routeContext.company,
        platoon: routeContext.platoon,
        period: submitForm.period,
        status: "Pending",
        currentStage: 1,
        stages,
        docs: { fitrepDoc: submitForm.fitrepDoc, routingSheet: submitForm.routingSheet }
      };
      setFitrebs((prev) => [...prev, f]);
      setShowModal(false);
      setSubmitForm({ period: "Spring 2026", notes: "", routeCompany: "", routePlatoon: "", fitrepDoc: null, routingSheet: null });
      fire("\u2705 FITREP submitted and routed to your chain of command.");
    };
    const advanceStage = (id, action = "approved") => {
      const comment = commentText.trim();
      setFitrebs((prev) => prev.map((f) => {
        if (f.id !== id) return f;
        const updated = [...f.stages];
        updated[f.currentStage] = {
          ...updated[f.currentStage],
          completedBy: user.name,
          completedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          comment
        };
        const next = action === "returned" ? f.currentStage : Math.min(f.currentStage + 1, f.stages.length - 1);
        const status = action === "returned" ? "Returned" : next === f.stages.length - 1 ? "Approved" : "Pending";
        return { ...f, currentStage: next, stages: updated, status };
      }));
      setActiveComment(null);
      setCommentText("");
      fire(action === "returned" ? "FITREP returned to originator." : "\u2705 FITREP advanced. Stage comments saved.");
    };
    const companies = [...new Set(visible.map((f) => normalizeCompany(f.company)))];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-title", children: [
        "FITREP ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tracker" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-sub", children: [
        "Fitness Report pipeline \u2014 ",
        visible.length,
        " report",
        visible.length !== 1 ? "s" : "",
        " visible to you"
      ] }),
      toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "alert alert-green", children: toast }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "privacy-note", children: [
        "\u{1F512} ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Private." }),
        " Only you and your chain of command can see your FITREPs."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid3", style: { marginBottom: "1rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stat", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-n", children: visible.filter((f) => f.currentStage > 0 && f.currentStage < f.stages.length - 1).length }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-l", children: "In Progress" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stat", style: { borderLeftColor: "#2A7D4F" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-n", style: { color: "#2A7D4F" }, children: visible.filter((f) => f.currentStage === f.stages.length - 1).length }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-l", children: "Complete" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stat", style: { borderLeftColor: "#0D1B2A" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-n", style: { color: "#0D1B2A" }, children: visible.filter((f) => f.currentStage === 1).length }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-l", children: "Awaiting PC" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }, children: [
        companies.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", style: { maxWidth: "200px" }, value: filter, onChange: (e) => setFilter(e.target.value), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "All Companies" }),
          companies.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: c, children: getCompanyShortName(c) }, c))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "0.82rem", color: "#888", flex: 1 }, children: [
          filtered.length,
          " report",
          filtered.length !== 1 ? "s" : "",
          " shown"
        ] }),
        canSubmit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange", onClick: () => setShowModal(true), children: "+ Submit FITREP" })
      ] }),
      filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "empty", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "2rem" }, children: "\u{1F4CA}" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: "0.5rem" }, children: "No FITREPs on file." })
      ] }),
      filtered.map((f) => {
        const canAct = canActOnFitrep(user, f);
        const isDone = f.currentStage >= f.stages.length - 1 || f.status === "Returned";
        const currentStageName = isDone ? f.status === "Returned" ? "Returned" : "Complete" : f.stages?.[f.currentStage]?.name || "";
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "fitrep-card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "fitrep-header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { style: { fontSize: "0.95rem" }, children: [
                f.subjectRank,
                " ",
                f.subjectName
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: "0.78rem", color: "#888", marginTop: "1px" }, children: [
                formatCompanyCoLabel(f.company),
                " \xB7 ",
                formatPlatoonLabel(f.platoon),
                " \xB7 ",
                f.period
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge badge-navy", children: f.id }),
              f.status === "Returned" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge badge-red", children: "Returned" }) : isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge badge-green", children: "Complete" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge badge-orange", children: currentStageName }),
              canAct && !isDone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge", style: { background: "rgba(42,125,79,0.15)", color: "#2A7D4F" }, children: "\u25CF Your Action" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "fitrep-body", children: [
            f.docs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center", marginBottom: "0.75rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: "Oswald", fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888" }, children: "Docs:" }),
              f.docs.fitrepDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: f.docs.fitrepDoc.dataUrl, download: f.docs.fitrepDoc.fileName, className: "btn btn-outline btn-sm", children: "\u{1F4C4} FITREP Document" }),
              f.docs.routingSheet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: f.docs.routingSheet.dataUrl, download: f.docs.routingSheet.fileName, className: "btn btn-outline btn-sm", children: "\u{1F4C4} Routing Sheet" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stage-track", children: f.stages.map((s, i) => {
              const done = i < f.currentStage;
              const returned = i === f.currentStage && f.status === "Returned";
              const active = i === f.currentStage && !isDone;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `stage-item ${done ? "done" : returned ? "returned" : active ? "active" : ""}`, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `stage-dot ${done ? "done" : returned ? "returned" : active ? "active" : "pending"}`, children: done ? "\u2713" : returned ? "\u21A9" : s.icon }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `stage-label ${done ? "done" : returned ? "returned" : active ? "active" : ""}`, children: s.name }),
                active && canAct && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stage-approver active", children: "\u25CF You" })
              ] }, i);
            }) }),
            f.stages.some((s) => s.completedBy && s.comment) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "0.75rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "Oswald", fontSize: "0.7rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", marginBottom: "0.5rem" }, children: "Stage Comments" }),
              f.stages.map((s, i) => s.completedBy && s.comment ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stage-comment", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stage-comment-by", children: [
                  s.name,
                  " \xB7 ",
                  s.completedBy,
                  " \xB7 ",
                  s.completedAt
                ] }),
                s.comment
              ] }, i) : null)
            ] }),
            canAct && !isDone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stage-action-box", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stage-action-label", children: [
                "\u2B50 Your Review \u2014 ",
                currentStageName
              ] }),
              activeComment === f.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "textarea",
                  {
                    className: "input",
                    style: { minHeight: "80px", resize: "vertical", marginBottom: "0.65rem", fontSize: "0.85rem" },
                    placeholder: "Add your comments (optional \u2014 describe performance, concerns, or recommendations)\u2026",
                    value: commentText,
                    onChange: (e) => setCommentText(e.target.value)
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-green btn-sm", onClick: () => advanceStage(f.id, "approved"), children: "\u2713 Approve & Advance" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-red btn-sm", onClick: () => advanceStage(f.id, "returned"), children: "\u21A9 Return to Originator" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => {
                    setActiveComment(null);
                    setCommentText("");
                  }, children: "Cancel" })
                ] })
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange btn-sm", onClick: () => {
                setActiveComment(f.id);
                setCommentText("");
              }, children: "\u270F Review & Add Comments" })
            ] })
          ] })
        ] }, f.id);
      }),
      showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, { title: "Submit FITREP", onClose: () => setShowModal(false), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "privacy-note", children: "\u{1F512} Private \u2014 only you and your CoC will see this." }),
        needsRouteSelect && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Your Company" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", value: submitForm.routeCompany, onChange: (e) => setSubmitForm((s) => ({ ...s, routeCompany: e.target.value, routePlatoon: "" })), children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "Select company\u2026" }),
              ["Alpha", "Bravo", "Charlie"].map((co) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: co, children: co }, co))
            ] })
          ] }),
          submitForm.routeCompany && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Your Platoon" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", value: submitForm.routePlatoon, onChange: (e) => setSubmitForm((s) => ({ ...s, routePlatoon: e.target.value })), children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "Select platoon\u2026" }),
              getPlatoons(submitForm.routeCompany).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: p, children: formatPlatoonLabel(p) }, p))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Period" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", value: submitForm.period, onChange: (e) => setSubmitForm((s) => ({ ...s, period: e.target.value })), children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Spring 2026" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Fall 2025" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Spring 2025" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Notes (optional)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { className: "input", style: { minHeight: "80px", resize: "vertical" }, value: submitForm.notes, onChange: (e) => setSubmitForm((s) => ({ ...s, notes: e.target.value })) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { borderTop: "1px solid #eee", paddingTop: "0.85rem", marginTop: "0.25rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "Oswald", fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", marginBottom: "0.65rem" }, children: "Required Documents" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
              "FITREP Document ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#C0392B" }, children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "fitrep-doc", className: "btn btn-outline btn-sm", style: { cursor: "pointer" }, children: submitForm.fitrepDoc ? "\u2191 Replace PDF" : "\u2191 Upload PDF" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  id: "fitrep-doc",
                  type: "file",
                  accept: ".pdf,application/pdf",
                  style: { display: "none" },
                  onChange: (e) => {
                    loadFitrepPDF("fitrepDoc", e.target.files[0]);
                    e.target.value = "";
                  }
                }
              ),
              submitForm.fitrepDoc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "0.78rem", color: "#2A7D4F", fontWeight: 600 }, children: [
                "\u{1F4C4} ",
                submitForm.fitrepDoc.fileName
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "0.75rem", color: "#C0392B" }, children: "Required" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
              "Routing Sheet ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#C0392B" }, children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "fitrep-routing-sheet", className: "btn btn-outline btn-sm", style: { cursor: "pointer" }, children: submitForm.routingSheet ? "\u2191 Replace PDF" : "\u2191 Upload PDF" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  id: "fitrep-routing-sheet",
                  type: "file",
                  accept: ".pdf,application/pdf",
                  style: { display: "none" },
                  onChange: (e) => {
                    loadFitrepPDF("routingSheet", e.target.files[0]);
                    e.target.value = "";
                  }
                }
              ),
              submitForm.routingSheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "0.78rem", color: "#2A7D4F", fontWeight: 600 }, children: [
                "\u{1F4C4} ",
                submitForm.routingSheet.fileName
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "0.75rem", color: "#C0392B" }, children: "Required" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "#f5f2ee", borderRadius: "8px", padding: "0.65rem", fontSize: "0.8rem", color: "#666", marginBottom: "1rem" }, children: [
          "Your FITREP routes to: ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: routeHint() })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.75rem", justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline", onClick: () => setShowModal(false), children: "Cancel" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange", onClick: handleSubmit, children: "Submit FITREP" })
        ] })
      ] })
    ] });
  }
  var NAV = [
    { id: "dashboard", label: "Dashboard", icon: "\u{1F3E0}" },
    { id: "calendar", label: "POTW", icon: "\u{1F4C5}" },
    { id: "structure", label: "BN Structure", icon: "\u{1F3DB}" },
    { id: "training", label: "PT & LL", icon: "\u{1F4AA}" },
    { id: "chits", label: "CHITs", icon: "\u{1F4CB}" },
    { id: "fitreps", label: "FITREPs", icon: "\u{1F4CA}" },
    { id: "roster", label: "Recall Roster", icon: "\u{1F4D2}" },
    { id: "forms", label: "Forms", icon: "\u{1F4DD}" },
    { id: "academic", label: "Academic Board", icon: "\u{1F393}" }
  ];
  var MNAV = [
    { id: "dashboard", label: "Home", icon: "\u{1F3E0}" },
    { id: "calendar", label: "POTW", icon: "\u{1F4C5}" },
    { id: "chits", label: "CHITs", icon: "\u{1F4CB}" },
    { id: "fitreps", label: "FITREPs", icon: "\u{1F4CA}" },
    { id: "roster", label: "Roster", icon: "\u{1F4D2}" }
  ];
  function App() {
    const cachedRoster = loadCachedRoster();
    const [user, setUser] = (0, import_react.useState)(null);
    const [page, setPage] = (0, import_react.useState)("dashboard");
    const [reminder, setReminder] = (0, import_react.useState)({ enabled: false, text: "" });
    const [chits, setChits] = (0, import_react.useState)(INIT_CHITS);
    const [fitrebs, setFitrebs] = (0, import_react.useState)(INIT_FITREBS);
    const [showAccount, setShowAccount] = (0, import_react.useState)(false);
    const [forms, setForms] = (0, import_react.useState)([]);
    const [ptPlans, setPtPlans] = (0, import_react.useState)({ monday: null, wednesday: null, thursday: null });
    const [llSessions, setLlSessions] = (0, import_react.useState)(LEADLAB_INIT);
    const [userList, setUserList] = (0, import_react.useState)(cachedRoster);
    const [sheetSynced, setSheetSynced] = (0, import_react.useState)(!SHEETS_API_URL || cachedRoster.length > 0);
    const [sheetError, setSheetError] = (0, import_react.useState)(false);
    const fetchRoster = () => {
      if (!SHEETS_API_URL) {
        setSheetSynced(true);
        return;
      }
      setSheetSynced(false);
      setSheetError(false);
      const cbName = "__qd_cb_" + Date.now();
      const script = document.createElement("script");
      const hasCachedRoster = loadCachedRoster().length > 0;
      const timer = setTimeout(() => {
        cleanup();
        setSheetError(true);
        setSheetSynced(true);
      }, hasCachedRoster ? 2500 : 5e3);
      function cleanup() {
        clearTimeout(timer);
        window[cbName] = () => {
        };
        if (script.parentNode) script.parentNode.removeChild(script);
      }
      window[cbName] = (data) => {
        cleanup();
        if (data.users && data.users.length > 0) {
          const nextUsers = data.users.map((row, i) => sheetRowToUser(row, i));
          setUserList(nextUsers);
          saveCachedRoster(nextUsers);
        } else {
          setSheetError(true);
        }
        setSheetSynced(true);
      };
      script.onerror = () => {
        cleanup();
        setSheetError(true);
        setSheetSynced(true);
      };
      script.src = `${SHEETS_API_URL}?token=${encodeURIComponent(SHEETS_API_TOKEN)}&callback=${cbName}`;
      document.head.appendChild(script);
    };
    (0, import_react.useEffect)(fetchRoster, []);
    const handleLogin = (loggedInUser) => {
      const fresh = userList.find((u) => u.id === loggedInUser.id) || loggedInUser;
      setUser(fresh);
    };
    const handlePasswordChange = (newPassword) => {
      setUser((prev) => ({ ...prev, password: newPassword, mustChangePassword: false }));
      setUserList((prev) => prev.map((u) => u.id === user.id ? { ...u, password: newPassword, mustChangePassword: false } : u));
    };
    if (!user) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: CSS }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPage, { onLogin: handleLogin, userList, sheetSynced, sheetError, onRetry: fetchRoster })
      ] });
    }
    if (user.mustChangePassword) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: CSS }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FirstLoginGate, { onPasswordChange: handlePasswordChange })
      ] });
    }
    const renderPage = () => {
      if (page === "dashboard") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, { onNav: setPage, userList, chits, forms, reminder, setReminder });
      if (page === "calendar") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPage, {});
      if (page === "structure") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructurePage, { userList });
      if (page === "training") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainingPage, { ptPlans, setPtPlans, llSessions, setLlSessions });
      if (page === "chits") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChitsPage, { chits, setChits, userList });
      if (page === "fitreps") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitrepsPage, { fitrebs, setFitrebs, userList });
      if (page === "roster") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RosterPage, { userList });
      if (page === "forms") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormsPage, { forms, setForms });
      if (page === "academic") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcademicPage, {});
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, { onNav: setPage });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthContext.Provider, { value: { user, setUser }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: CSS }),
      showAccount && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        AccountModal,
        {
          onClose: () => setShowAccount(false),
          onPasswordChange: handlePasswordChange
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "topbar", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "topbar-logo", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", style: { width: "68%", height: "68%", marginBottom: "2px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "4", r: "2" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "3", y1: "7.5", x2: "21", y2: "7.5" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "6", x2: "12", y2: "19" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "6", y1: "19", x2: "18", y2: "19" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 19 Q3 21 4 23 Q6 24 7.5 22" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 19 Q21 21 20 23 Q18 24 16.5 22" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "topbar-title", children: [
              "The ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quarterdeck" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "topbar-right", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "div",
              {
                style: { display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" },
                onClick: () => setShowAccount(true),
                title: "Account Info",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rank-pill", children: user.rank.split(" ")[0] || user.rank }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#ccc", fontSize: "0.85rem" }, children: user.name.split(",")[0] }),
                  isCoC(user) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "role-pill", children: user.role.replace("_", " ") })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn-logout", onClick: () => {
              setUser(null);
              setPage("dashboard");
            }, children: "Sign Out" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "layout", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { className: "sidebar", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sidebar-group", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sidebar-label", children: "Navigation" }),
              NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: `nav-btn ${page === item.id ? "active" : ""}`, onClick: () => setPage(item.id), children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
                " ",
                item.label
              ] }, item.id))
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sidebar-footer", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { style: { color: "#9ab0c4", cursor: "pointer" }, onClick: () => setShowAccount(true), children: user.name }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
              formatCompanyCoLabel(user.company),
              " \xB7 ",
              user.platoon,
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#F7941D" }, children: user.role.replace("_", " ").toUpperCase() })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "content", children: renderPage() })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", { className: "mobile-nav", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mobile-nav-inner", children: MNAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: `mobile-btn ${page === item.id ? "active" : ""}`, onClick: () => setPage(item.id), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mobile-icon", children: item.icon }),
          item.label
        ] }, item.id)) }) })
      ] })
    ] });
  }
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
