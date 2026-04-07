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

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = Symbol.for("react.element");
      var n = Symbol.for("react.portal");
      var p = Symbol.for("react.fragment");
      var q = Symbol.for("react.strict_mode");
      var r = Symbol.for("react.profiler");
      var t = Symbol.for("react.provider");
      var u = Symbol.for("react.context");
      var v = Symbol.for("react.forward_ref");
      var w = Symbol.for("react.suspense");
      var x = Symbol.for("react.memo");
      var y = Symbol.for("react.lazy");
      var z = Symbol.iterator;
      function A(a) {
        if (null === a || "object" !== typeof a) return null;
        a = z && a[z] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var B = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C = Object.assign;
      var D = {};
      function E(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      E.prototype.isReactComponent = {};
      E.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      E.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function F() {
      }
      F.prototype = E.prototype;
      function G(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      var H = G.prototype = new F();
      H.constructor = G;
      C(H, E.prototype);
      H.isPureReactComponent = true;
      var I = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L = { key: true, ref: true, __self: true, __source: true };
      function M(a, b, e) {
        var d, c = {}, k = null, h = null;
        if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
        var g = arguments.length - 2;
        if (1 === g) c.children = e;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
          c.children = f;
        }
        if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
        return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
      }
      function N(a, b) {
        return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function O(a) {
        return "object" === typeof a && null !== a && a.$$typeof === l;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var P = /\/+/g;
      function Q(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
      }
      function R(a, b, e, d, c) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k) a = null;
        var h = false;
        if (null === a) h = true;
        else switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = true;
            }
        }
        if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
          return a2;
        })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
        h = 0;
        d = "" === d ? "." : d + ":";
        if (I(a)) for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
        else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
        else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
        return h;
      }
      function S(a, b, e) {
        if (null == a) return a;
        var d = [], c = 0;
        R(a, d, "", "", function(a2) {
          return b.call(e, a2, c++);
        });
        return d;
      }
      function T(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          b.then(function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
          }, function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
          });
          -1 === a._status && (a._status = 0, a._result = b);
        }
        if (1 === a._status) return a._result.default;
        throw a._result;
      }
      var U = { current: null };
      var V = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
      function X() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      exports.Children = { map: S, forEach: function(a, b, e) {
        S(a, function() {
          b.apply(this, arguments);
        }, e);
      }, count: function(a) {
        var b = 0;
        S(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return S(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
        return a;
      } };
      exports.Component = E;
      exports.Fragment = p;
      exports.Profiler = r;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.act = X;
      exports.cloneElement = function(a, b, e) {
        if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
        var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = K.current);
          void 0 !== b.key && (c = "" + b.key);
          if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
          for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f) d.children = e;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
          d.children = g;
        }
        return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
      };
      exports.createContext = function(a) {
        a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a.Provider = { $$typeof: t, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = M;
      exports.createFactory = function(a) {
        var b = M.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: v, render: a };
      };
      exports.isValidElement = O;
      exports.lazy = function(a) {
        return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
      };
      exports.memo = function(a, b) {
        return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
      };
      exports.startTransition = function(a) {
        var b = V.transition;
        V.transition = {};
        try {
          a();
        } finally {
          V.transition = b;
        }
      };
      exports.unstable_act = X;
      exports.useCallback = function(a, b) {
        return U.current.useCallback(a, b);
      };
      exports.useContext = function(a) {
        return U.current.useContext(a);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a) {
        return U.current.useDeferredValue(a);
      };
      exports.useEffect = function(a, b) {
        return U.current.useEffect(a, b);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a, b, e) {
        return U.current.useImperativeHandle(a, b, e);
      };
      exports.useInsertionEffect = function(a, b) {
        return U.current.useInsertionEffect(a, b);
      };
      exports.useLayoutEffect = function(a, b) {
        return U.current.useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return U.current.useMemo(a, b);
      };
      exports.useReducer = function(a, b, e) {
        return U.current.useReducer(a, b, e);
      };
      exports.useRef = function(a) {
        return U.current.useRef(a);
      };
      exports.useState = function(a) {
        return U.current.useState(a);
      };
      exports.useSyncExternalStore = function(a, b, e) {
        return U.current.useSyncExternalStore(a, b, e);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.3.1";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      function f(a, b) {
        var c = a.length;
        a.push(b);
        a: for (; 0 < c; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
          else break a;
        }
      }
      function h(a) {
        return 0 === a.length ? null : a[0];
      }
      function k(a) {
        if (0 === a.length) return null;
        var b = a[0], c = a.pop();
        if (c !== b) {
          a[0] = c;
          a: for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
            var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
            if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
            else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
            else break a;
          }
        }
        return b;
      }
      function g(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return 0 !== c ? c : a.id - b.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l = performance;
        exports.unstable_now = function() {
          return l.now();
        };
      } else {
        p = Date, q = p.now();
        exports.unstable_now = function() {
          return p.now() - q;
        };
      }
      var l;
      var p;
      var q;
      var r = [];
      var t = [];
      var u = 1;
      var v = null;
      var y = 3;
      var z = false;
      var A = false;
      var B = false;
      var D = "function" === typeof setTimeout ? setTimeout : null;
      var E = "function" === typeof clearTimeout ? clearTimeout : null;
      var F = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(a) {
        for (var b = h(t); null !== b; ) {
          if (null === b.callback) k(t);
          else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);
          else break;
          b = h(t);
        }
      }
      function H(a) {
        B = false;
        G(a);
        if (!A) if (null !== h(r)) A = true, I(J);
        else {
          var b = h(t);
          null !== b && K(H, b.startTime - a);
        }
      }
      function J(a, b) {
        A = false;
        B && (B = false, E(L), L = -1);
        z = true;
        var c = y;
        try {
          G(b);
          for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
            var d = v.callback;
            if ("function" === typeof d) {
              v.callback = null;
              y = v.priorityLevel;
              var e = d(v.expirationTime <= b);
              b = exports.unstable_now();
              "function" === typeof e ? v.callback = e : v === h(r) && k(r);
              G(b);
            } else k(r);
            v = h(r);
          }
          if (null !== v) var w = true;
          else {
            var m = h(t);
            null !== m && K(H, m.startTime - b);
            w = false;
          }
          return w;
        } finally {
          v = null, y = c, z = false;
        }
      }
      var N = false;
      var O = null;
      var L = -1;
      var P = 5;
      var Q = -1;
      function M() {
        return exports.unstable_now() - Q < P ? false : true;
      }
      function R() {
        if (null !== O) {
          var a = exports.unstable_now();
          Q = a;
          var b = true;
          try {
            b = O(true, a);
          } finally {
            b ? S() : (N = false, O = null);
          }
        } else N = false;
      }
      var S;
      if ("function" === typeof F) S = function() {
        F(R);
      };
      else if ("undefined" !== typeof MessageChannel) {
        T = new MessageChannel(), U = T.port2;
        T.port1.onmessage = R;
        S = function() {
          U.postMessage(null);
        };
      } else S = function() {
        D(R, 0);
      };
      var T;
      var U;
      function I(a) {
        O = a;
        N || (N = true, S());
      }
      function K(a, b) {
        L = D(function() {
          a(exports.unstable_now());
        }, b);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports.unstable_continueExecution = function() {
        A || z || (A = true, I(J));
      };
      exports.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return y;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return h(r);
      };
      exports.unstable_next = function(a) {
        switch (y) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = y;
        }
        var c = y;
        y = b;
        try {
          return a();
        } finally {
          y = c;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = function() {
      };
      exports.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = y;
        y = a;
        try {
          return b();
        } finally {
          y = c;
        }
      };
      exports.unstable_scheduleCallback = function(a, b, c) {
        var d = exports.unstable_now();
        "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = true, I(J)));
        return a;
      };
      exports.unstable_shouldYield = M;
      exports.unstable_wrapCallback = function(a) {
        var b = y;
        return function() {
          var c = y;
          y = b;
          try {
            return a.apply(this, arguments);
          } finally {
            y = c;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var ca = require_scheduler();
      function p(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var da = /* @__PURE__ */ new Set();
      var ea = {};
      function fa(a, b) {
        ha(a, b);
        ha(a + "Capture", b);
      }
      function ha(a, b) {
        ea[a] = b;
        for (a = 0; a < b.length; a++) da.add(b[a]);
      }
      var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ja = Object.prototype.hasOwnProperty;
      var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var la = {};
      var ma = {};
      function oa(a) {
        if (ja.call(ma, a)) return true;
        if (ja.call(la, a)) return false;
        if (ka.test(a)) return ma[a] = true;
        la[a] = true;
        return false;
      }
      function pa(a, b, c, d) {
        if (null !== c && 0 === c.type) return false;
        switch (typeof b) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d) return false;
            if (null !== c) return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return "data-" !== a && "aria-" !== a;
          default:
            return false;
        }
      }
      function qa(a, b, c, d) {
        if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
        if (d) return false;
        if (null !== c) switch (c.type) {
          case 3:
            return !b;
          case 4:
            return false === b;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
        return false;
      }
      function v(a, b, c, d, e, f, g) {
        this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
        this.attributeName = d;
        this.attributeNamespace = e;
        this.mustUseProperty = c;
        this.propertyName = a;
        this.type = b;
        this.sanitizeURL = f;
        this.removeEmptyString = g;
      }
      var z = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
        z[a] = new v(a, 0, false, a, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
        var b = a[0];
        z[b] = new v(b, 1, false, a[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
        z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
        z[a] = new v(a, 2, false, a, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
        z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a) {
        z[a] = new v(a, 3, true, a, null, false, false);
      });
      ["capture", "download"].forEach(function(a) {
        z[a] = new v(a, 4, false, a, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a) {
        z[a] = new v(a, 6, false, a, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a) {
        z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
      });
      var ra = /[\-:]([a-z])/g;
      function sa(a) {
        return a[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
        var b = a.replace(
          ra,
          sa
        );
        z[b] = new v(b, 1, false, a, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
      });
      z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
      });
      function ta(a, b, c, d) {
        var e = z.hasOwnProperty(b) ? z[b] : null;
        if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
      }
      var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var va = Symbol.for("react.element");
      var wa = Symbol.for("react.portal");
      var ya = Symbol.for("react.fragment");
      var za = Symbol.for("react.strict_mode");
      var Aa = Symbol.for("react.profiler");
      var Ba = Symbol.for("react.provider");
      var Ca = Symbol.for("react.context");
      var Da = Symbol.for("react.forward_ref");
      var Ea = Symbol.for("react.suspense");
      var Fa = Symbol.for("react.suspense_list");
      var Ga = Symbol.for("react.memo");
      var Ha = Symbol.for("react.lazy");
      Symbol.for("react.scope");
      Symbol.for("react.debug_trace_mode");
      var Ia = Symbol.for("react.offscreen");
      Symbol.for("react.legacy_hidden");
      Symbol.for("react.cache");
      Symbol.for("react.tracing_marker");
      var Ja = Symbol.iterator;
      function Ka(a) {
        if (null === a || "object" !== typeof a) return null;
        a = Ja && a[Ja] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var A = Object.assign;
      var La;
      function Ma(a) {
        if (void 0 === La) try {
          throw Error();
        } catch (c) {
          var b = c.stack.trim().match(/\n( *(at )?)/);
          La = b && b[1] || "";
        }
        return "\n" + La + a;
      }
      var Na = false;
      function Oa(a, b) {
        if (!a || Na) return "";
        Na = true;
        var c = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b) if (b = function() {
            throw Error();
          }, Object.defineProperty(b.prototype, "props", { set: function() {
            throw Error();
          } }), "object" === typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (l) {
              var d = l;
            }
            Reflect.construct(a, [], b);
          } else {
            try {
              b.call();
            } catch (l) {
              d = l;
            }
            a.call(b.prototype);
          }
          else {
            try {
              throw Error();
            } catch (l) {
              d = l;
            }
            a();
          }
        } catch (l) {
          if (l && d && "string" === typeof l.stack) {
            for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
            for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
              if (1 !== g || 1 !== h) {
                do
                  if (g--, h--, 0 > h || e[g] !== f[h]) {
                    var k = "\n" + e[g].replace(" at new ", " at ");
                    a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                    return k;
                  }
                while (1 <= g && 0 <= h);
              }
              break;
            }
          }
        } finally {
          Na = false, Error.prepareStackTrace = c;
        }
        return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
      }
      function Pa(a) {
        switch (a.tag) {
          case 5:
            return Ma(a.type);
          case 16:
            return Ma("Lazy");
          case 13:
            return Ma("Suspense");
          case 19:
            return Ma("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a = Oa(a.type, false), a;
          case 11:
            return a = Oa(a.type.render, false), a;
          case 1:
            return a = Oa(a.type, true), a;
          default:
            return "";
        }
      }
      function Qa(a) {
        if (null == a) return null;
        if ("function" === typeof a) return a.displayName || a.name || null;
        if ("string" === typeof a) return a;
        switch (a) {
          case ya:
            return "Fragment";
          case wa:
            return "Portal";
          case Aa:
            return "Profiler";
          case za:
            return "StrictMode";
          case Ea:
            return "Suspense";
          case Fa:
            return "SuspenseList";
        }
        if ("object" === typeof a) switch (a.$$typeof) {
          case Ca:
            return (a.displayName || "Context") + ".Consumer";
          case Ba:
            return (a._context.displayName || "Context") + ".Provider";
          case Da:
            var b = a.render;
            a = a.displayName;
            a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
            return a;
          case Ga:
            return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
          case Ha:
            b = a._payload;
            a = a._init;
            try {
              return Qa(a(b));
            } catch (c) {
            }
        }
        return null;
      }
      function Ra(a) {
        var b = a.type;
        switch (a.tag) {
          case 24:
            return "Cache";
          case 9:
            return (b.displayName || "Context") + ".Consumer";
          case 10:
            return (b._context.displayName || "Context") + ".Provider";
          case 18:
            return "DehydratedFragment";
          case 11:
            return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          case 7:
            return "Fragment";
          case 5:
            return b;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return Qa(b);
          case 8:
            return b === za ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ("function" === typeof b) return b.displayName || b.name || null;
            if ("string" === typeof b) return b;
        }
        return null;
      }
      function Sa(a) {
        switch (typeof a) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return a;
          case "object":
            return a;
          default:
            return "";
        }
      }
      function Ta(a) {
        var b = a.type;
        return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
      }
      function Ua(a) {
        var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
        if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
          var e = c.get, f = c.set;
          Object.defineProperty(a, b, { configurable: true, get: function() {
            return e.call(this);
          }, set: function(a2) {
            d = "" + a2;
            f.call(this, a2);
          } });
          Object.defineProperty(a, b, { enumerable: c.enumerable });
          return { getValue: function() {
            return d;
          }, setValue: function(a2) {
            d = "" + a2;
          }, stopTracking: function() {
            a._valueTracker = null;
            delete a[b];
          } };
        }
      }
      function Va(a) {
        a._valueTracker || (a._valueTracker = Ua(a));
      }
      function Wa(a) {
        if (!a) return false;
        var b = a._valueTracker;
        if (!b) return true;
        var c = b.getValue();
        var d = "";
        a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
        a = d;
        return a !== c ? (b.setValue(a), true) : false;
      }
      function Xa(a) {
        a = a || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a) return null;
        try {
          return a.activeElement || a.body;
        } catch (b) {
          return a.body;
        }
      }
      function Ya(a, b) {
        var c = b.checked;
        return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
      }
      function Za(a, b) {
        var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
        c = Sa(null != b.value ? b.value : c);
        a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
      }
      function ab(a, b) {
        b = b.checked;
        null != b && ta(a, "checked", b, false);
      }
      function bb(a, b) {
        ab(a, b);
        var c = Sa(b.value), d = b.type;
        if (null != c) if ("number" === d) {
          if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
        } else a.value !== "" + c && (a.value = "" + c);
        else if ("submit" === d || "reset" === d) {
          a.removeAttribute("value");
          return;
        }
        b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
        null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
      }
      function db(a, b, c) {
        if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
          var d = b.type;
          if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
          b = "" + a._wrapperState.initialValue;
          c || b === a.value || (a.value = b);
          a.defaultValue = b;
        }
        c = a.name;
        "" !== c && (a.name = "");
        a.defaultChecked = !!a._wrapperState.initialChecked;
        "" !== c && (a.name = c);
      }
      function cb(a, b, c) {
        if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
      }
      var eb = Array.isArray;
      function fb(a, b, c, d) {
        a = a.options;
        if (b) {
          b = {};
          for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
          for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
        } else {
          c = "" + Sa(c);
          b = null;
          for (e = 0; e < a.length; e++) {
            if (a[e].value === c) {
              a[e].selected = true;
              d && (a[e].defaultSelected = true);
              return;
            }
            null !== b || a[e].disabled || (b = a[e]);
          }
          null !== b && (b.selected = true);
        }
      }
      function gb(a, b) {
        if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
        return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
      }
      function hb(a, b) {
        var c = b.value;
        if (null == c) {
          c = b.children;
          b = b.defaultValue;
          if (null != c) {
            if (null != b) throw Error(p(92));
            if (eb(c)) {
              if (1 < c.length) throw Error(p(93));
              c = c[0];
            }
            b = c;
          }
          null == b && (b = "");
          c = b;
        }
        a._wrapperState = { initialValue: Sa(c) };
      }
      function ib(a, b) {
        var c = Sa(b.value), d = Sa(b.defaultValue);
        null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
        null != d && (a.defaultValue = "" + d);
      }
      function jb(a) {
        var b = a.textContent;
        b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
      }
      function kb(a) {
        switch (a) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function lb(a, b) {
        return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
      }
      var mb;
      var nb = (function(a) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
          MSApp.execUnsafeLocalFunction(function() {
            return a(b, c, d, e);
          });
        } : a;
      })(function(a, b) {
        if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
        else {
          mb = mb || document.createElement("div");
          mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
          for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
          for (; b.firstChild; ) a.appendChild(b.firstChild);
        }
      });
      function ob(a, b) {
        if (b) {
          var c = a.firstChild;
          if (c && c === a.lastChild && 3 === c.nodeType) {
            c.nodeValue = b;
            return;
          }
        }
        a.textContent = b;
      }
      var pb = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var qb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(pb).forEach(function(a) {
        qb.forEach(function(b) {
          b = b + a.charAt(0).toUpperCase() + a.substring(1);
          pb[b] = pb[a];
        });
      });
      function rb(a, b, c) {
        return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
      }
      function sb(a, b) {
        a = a.style;
        for (var c in b) if (b.hasOwnProperty(c)) {
          var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
          "float" === c && (c = "cssFloat");
          d ? a.setProperty(c, e) : a[c] = e;
        }
      }
      var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function ub(a, b) {
        if (b) {
          if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
          if (null != b.dangerouslySetInnerHTML) {
            if (null != b.children) throw Error(p(60));
            if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
          }
          if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
        }
      }
      function vb(a, b) {
        if (-1 === a.indexOf("-")) return "string" === typeof b.is;
        switch (a) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var wb = null;
      function xb(a) {
        a = a.target || a.srcElement || window;
        a.correspondingUseElement && (a = a.correspondingUseElement);
        return 3 === a.nodeType ? a.parentNode : a;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a) {
        if (a = Cb(a)) {
          if ("function" !== typeof yb) throw Error(p(280));
          var b = a.stateNode;
          b && (b = Db(b), yb(a.stateNode, a.type, b));
        }
      }
      function Eb(a) {
        zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
      }
      function Fb() {
        if (zb) {
          var a = zb, b = Ab;
          Ab = zb = null;
          Bb(a);
          if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
        }
      }
      function Gb(a, b) {
        return a(b);
      }
      function Hb() {
      }
      var Ib = false;
      function Jb(a, b, c) {
        if (Ib) return a(b, c);
        Ib = true;
        try {
          return Gb(a, b, c);
        } finally {
          if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
        }
      }
      function Kb(a, b) {
        var c = a.stateNode;
        if (null === c) return null;
        var d = Db(c);
        if (null === d) return null;
        c = d[b];
        a: switch (b) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
            a = !d;
            break a;
          default:
            a = false;
        }
        if (a) return null;
        if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
        return c;
      }
      var Lb = false;
      if (ia) try {
        Mb = {};
        Object.defineProperty(Mb, "passive", { get: function() {
          Lb = true;
        } });
        window.addEventListener("test", Mb, Mb);
        window.removeEventListener("test", Mb, Mb);
      } catch (a) {
        Lb = false;
      }
      var Mb;
      function Nb(a, b, c, d, e, f, g, h, k) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          b.apply(c, l);
        } catch (m) {
          this.onError(m);
        }
      }
      var Ob = false;
      var Pb = null;
      var Qb = false;
      var Rb = null;
      var Sb = { onError: function(a) {
        Ob = true;
        Pb = a;
      } };
      function Tb(a, b, c, d, e, f, g, h, k) {
        Ob = false;
        Pb = null;
        Nb.apply(Sb, arguments);
      }
      function Ub(a, b, c, d, e, f, g, h, k) {
        Tb.apply(this, arguments);
        if (Ob) {
          if (Ob) {
            var l = Pb;
            Ob = false;
            Pb = null;
          } else throw Error(p(198));
          Qb || (Qb = true, Rb = l);
        }
      }
      function Vb(a) {
        var b = a, c = a;
        if (a.alternate) for (; b.return; ) b = b.return;
        else {
          a = b;
          do
            b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
          while (a);
        }
        return 3 === b.tag ? c : null;
      }
      function Wb(a) {
        if (13 === a.tag) {
          var b = a.memoizedState;
          null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
          if (null !== b) return b.dehydrated;
        }
        return null;
      }
      function Xb(a) {
        if (Vb(a) !== a) throw Error(p(188));
      }
      function Yb(a) {
        var b = a.alternate;
        if (!b) {
          b = Vb(a);
          if (null === b) throw Error(p(188));
          return b !== a ? null : a;
        }
        for (var c = a, d = b; ; ) {
          var e = c.return;
          if (null === e) break;
          var f = e.alternate;
          if (null === f) {
            d = e.return;
            if (null !== d) {
              c = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c) return Xb(e), a;
              if (f === d) return Xb(e), b;
              f = f.sibling;
            }
            throw Error(p(188));
          }
          if (c.return !== d.return) c = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c) {
                g = true;
                c = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c) {
                  g = true;
                  c = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g) throw Error(p(189));
            }
          }
          if (c.alternate !== d) throw Error(p(190));
        }
        if (3 !== c.tag) throw Error(p(188));
        return c.stateNode.current === c ? a : b;
      }
      function Zb(a) {
        a = Yb(a);
        return null !== a ? $b(a) : null;
      }
      function $b(a) {
        if (5 === a.tag || 6 === a.tag) return a;
        for (a = a.child; null !== a; ) {
          var b = $b(a);
          if (null !== b) return b;
          a = a.sibling;
        }
        return null;
      }
      var ac = ca.unstable_scheduleCallback;
      var bc = ca.unstable_cancelCallback;
      var cc = ca.unstable_shouldYield;
      var dc = ca.unstable_requestPaint;
      var B = ca.unstable_now;
      var ec = ca.unstable_getCurrentPriorityLevel;
      var fc = ca.unstable_ImmediatePriority;
      var gc = ca.unstable_UserBlockingPriority;
      var hc = ca.unstable_NormalPriority;
      var ic = ca.unstable_LowPriority;
      var jc = ca.unstable_IdlePriority;
      var kc = null;
      var lc = null;
      function mc(a) {
        if (lc && "function" === typeof lc.onCommitFiberRoot) try {
          lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
        } catch (b) {
        }
      }
      var oc = Math.clz32 ? Math.clz32 : nc;
      var pc = Math.log;
      var qc = Math.LN2;
      function nc(a) {
        a >>>= 0;
        return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
      }
      var rc = 64;
      var sc = 4194304;
      function tc(a) {
        switch (a & -a) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return a & 4194240;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return a & 130023424;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return a;
        }
      }
      function uc(a, b) {
        var c = a.pendingLanes;
        if (0 === c) return 0;
        var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
        if (0 !== g) {
          var h = g & ~e;
          0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
        } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
        if (0 === d) return 0;
        if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
        0 !== (d & 4) && (d |= c & 16);
        b = a.entangledLanes;
        if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
        return d;
      }
      function vc(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 4:
            return b + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return b + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return -1;
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function wc(a, b) {
        for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
          var g = 31 - oc(f), h = 1 << g, k = e[g];
          if (-1 === k) {
            if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
          } else k <= b && (a.expiredLanes |= h);
          f &= ~h;
        }
      }
      function xc(a) {
        a = a.pendingLanes & -1073741825;
        return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
      }
      function yc() {
        var a = rc;
        rc <<= 1;
        0 === (rc & 4194240) && (rc = 64);
        return a;
      }
      function zc(a) {
        for (var b = [], c = 0; 31 > c; c++) b.push(a);
        return b;
      }
      function Ac(a, b, c) {
        a.pendingLanes |= b;
        536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
        a = a.eventTimes;
        b = 31 - oc(b);
        a[b] = c;
      }
      function Bc(a, b) {
        var c = a.pendingLanes & ~b;
        a.pendingLanes = b;
        a.suspendedLanes = 0;
        a.pingedLanes = 0;
        a.expiredLanes &= b;
        a.mutableReadLanes &= b;
        a.entangledLanes &= b;
        b = a.entanglements;
        var d = a.eventTimes;
        for (a = a.expirationTimes; 0 < c; ) {
          var e = 31 - oc(c), f = 1 << e;
          b[e] = 0;
          d[e] = -1;
          a[e] = -1;
          c &= ~f;
        }
      }
      function Cc(a, b) {
        var c = a.entangledLanes |= b;
        for (a = a.entanglements; c; ) {
          var d = 31 - oc(c), e = 1 << d;
          e & b | a[d] & b && (a[d] |= b);
          c &= ~e;
        }
      }
      var C = 0;
      function Dc(a) {
        a &= -a;
        return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
      }
      var Ec;
      var Fc;
      var Gc;
      var Hc;
      var Ic;
      var Jc = false;
      var Kc = [];
      var Lc = null;
      var Mc = null;
      var Nc = null;
      var Oc = /* @__PURE__ */ new Map();
      var Pc = /* @__PURE__ */ new Map();
      var Qc = [];
      var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function Sc(a, b) {
        switch (a) {
          case "focusin":
          case "focusout":
            Lc = null;
            break;
          case "dragenter":
          case "dragleave":
            Mc = null;
            break;
          case "mouseover":
          case "mouseout":
            Nc = null;
            break;
          case "pointerover":
          case "pointerout":
            Oc.delete(b.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            Pc.delete(b.pointerId);
        }
      }
      function Tc(a, b, c, d, e, f) {
        if (null === a || a.nativeEvent !== f) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
        a.eventSystemFlags |= d;
        b = a.targetContainers;
        null !== e && -1 === b.indexOf(e) && b.push(e);
        return a;
      }
      function Uc(a, b, c, d, e) {
        switch (b) {
          case "focusin":
            return Lc = Tc(Lc, a, b, c, d, e), true;
          case "dragenter":
            return Mc = Tc(Mc, a, b, c, d, e), true;
          case "mouseover":
            return Nc = Tc(Nc, a, b, c, d, e), true;
          case "pointerover":
            var f = e.pointerId;
            Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
            return true;
          case "gotpointercapture":
            return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
        }
        return false;
      }
      function Vc(a) {
        var b = Wc(a.target);
        if (null !== b) {
          var c = Vb(b);
          if (null !== c) {
            if (b = c.tag, 13 === b) {
              if (b = Wb(c), null !== b) {
                a.blockedOn = b;
                Ic(a.priority, function() {
                  Gc(c);
                });
                return;
              }
            } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
              a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a.blockedOn = null;
      }
      function Xc(a) {
        if (null !== a.blockedOn) return false;
        for (var b = a.targetContainers; 0 < b.length; ) {
          var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
          if (null === c) {
            c = a.nativeEvent;
            var d = new c.constructor(c.type, c);
            wb = d;
            c.target.dispatchEvent(d);
            wb = null;
          } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
          b.shift();
        }
        return true;
      }
      function Zc(a, b, c) {
        Xc(a) && c.delete(b);
      }
      function $c() {
        Jc = false;
        null !== Lc && Xc(Lc) && (Lc = null);
        null !== Mc && Xc(Mc) && (Mc = null);
        null !== Nc && Xc(Nc) && (Nc = null);
        Oc.forEach(Zc);
        Pc.forEach(Zc);
      }
      function ad(a, b) {
        a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
      }
      function bd(a) {
        function b(b2) {
          return ad(b2, a);
        }
        if (0 < Kc.length) {
          ad(Kc[0], a);
          for (var c = 1; c < Kc.length; c++) {
            var d = Kc[c];
            d.blockedOn === a && (d.blockedOn = null);
          }
        }
        null !== Lc && ad(Lc, a);
        null !== Mc && ad(Mc, a);
        null !== Nc && ad(Nc, a);
        Oc.forEach(b);
        Pc.forEach(b);
        for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
        for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
      }
      var cd = ua.ReactCurrentBatchConfig;
      var dd = true;
      function ed(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 1, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function gd(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 4, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function fd(a, b, c, d) {
        if (dd) {
          var e = Yc(a, b, c, d);
          if (null === e) hd(a, b, d, id, c), Sc(a, d);
          else if (Uc(e, a, b, c, d)) d.stopPropagation();
          else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
            for (; null !== e; ) {
              var f = Cb(e);
              null !== f && Ec(f);
              f = Yc(a, b, c, d);
              null === f && hd(a, b, d, id, c);
              if (f === e) break;
              e = f;
            }
            null !== e && d.stopPropagation();
          } else hd(a, b, d, null, c);
        }
      }
      var id = null;
      function Yc(a, b, c, d) {
        id = null;
        a = xb(d);
        a = Wc(a);
        if (null !== a) if (b = Vb(a), null === b) a = null;
        else if (c = b.tag, 13 === c) {
          a = Wb(b);
          if (null !== a) return a;
          a = null;
        } else if (3 === c) {
          if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
          a = null;
        } else b !== a && (a = null);
        id = a;
        return null;
      }
      function jd(a) {
        switch (a) {
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 1;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "toggle":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 4;
          case "message":
            switch (ec()) {
              case fc:
                return 1;
              case gc:
                return 4;
              case hc:
              case ic:
                return 16;
              case jc:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md) return md;
        var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
        for (a = 0; a < c && b[a] === e[a]; a++) ;
        var g = c - a;
        for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
        return md = e.slice(a, 1 < d ? 1 - d : void 0);
      }
      function od(a) {
        var b = a.keyCode;
        "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
        10 === a && (a = 13);
        return 32 <= a || 13 === a ? a : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a) {
        function b(b2, d, e, f, g) {
          this._reactName = b2;
          this._targetInst = e;
          this.type = d;
          this.nativeEvent = f;
          this.target = g;
          this.currentTarget = null;
          for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
          this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        A(b.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a2 = this.nativeEvent;
          a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a2 = this.nativeEvent;
          a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
        return a.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = A({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
        return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
      }, movementX: function(a) {
        if ("movementX" in a) return a.movementX;
        a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
        return wd;
      }, movementY: function(a) {
        return "movementY" in a ? a.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = A({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = A({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = A({}, sd, { clipboardData: function(a) {
        return "clipboardData" in a ? a.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = A({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a) {
        var b = this.nativeEvent;
        return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = A({}, ud, { key: function(a) {
        if (a.key) {
          var b = Md[a.key] || a.key;
          if ("Unidentified" !== b) return b;
        }
        return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
        return "keypress" === a.type ? od(a) : 0;
      }, keyCode: function(a) {
        return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      }, which: function(a) {
        return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = A({}, Ad, {
        deltaX: function(a) {
          return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
        },
        deltaY: function(a) {
          return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = ia && "CompositionEvent" in window;
      var be = null;
      ia && "documentMode" in document && (be = document.documentMode);
      var ce = ia && "TextEvent" in window && !be;
      var de = ia && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a, b) {
        switch (a) {
          case "keyup":
            return -1 !== $d.indexOf(b.keyCode);
          case "keydown":
            return 229 !== b.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a) {
        a = a.detail;
        return "object" === typeof a && "data" in a ? a.data : null;
      }
      var ie = false;
      function je(a, b) {
        switch (a) {
          case "compositionend":
            return he(b);
          case "keypress":
            if (32 !== b.which) return null;
            fe = true;
            return ee;
          case "textInput":
            return a = b.data, a === ee && fe ? null : a;
          default:
            return null;
        }
      }
      function ke(a, b) {
        if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
        switch (a) {
          case "paste":
            return null;
          case "keypress":
            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
              if (b.char && 1 < b.char.length) return b.char;
              if (b.which) return String.fromCharCode(b.which);
            }
            return null;
          case "compositionend":
            return de && "ko" !== b.locale ? null : b.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
      }
      function ne(a, b, c, d) {
        Eb(d);
        b = oe(b, "onChange");
        0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
      }
      var pe = null;
      var qe = null;
      function re(a) {
        se(a, 0);
      }
      function te(a) {
        var b = ue(a);
        if (Wa(b)) return a;
      }
      function ve(a, b) {
        if ("change" === a) return b;
      }
      var we = false;
      if (ia) {
        if (ia) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
          }
          xe = ye;
        } else xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a) {
        if ("value" === a.propertyName && te(qe)) {
          var b = [];
          ne(b, qe, a, xb(a));
          Jb(re, b);
        }
      }
      function Ce(a, b, c) {
        "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
      }
      function De(a) {
        if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
      }
      function Ee(a, b) {
        if ("click" === a) return te(b);
      }
      function Fe(a, b) {
        if ("input" === a || "change" === a) return te(b);
      }
      function Ge(a, b) {
        return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var He = "function" === typeof Object.is ? Object.is : Ge;
      function Ie(a, b) {
        if (He(a, b)) return true;
        if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
        var c = Object.keys(a), d = Object.keys(b);
        if (c.length !== d.length) return false;
        for (d = 0; d < c.length; d++) {
          var e = c[d];
          if (!ja.call(b, e) || !He(a[e], b[e])) return false;
        }
        return true;
      }
      function Je(a) {
        for (; a && a.firstChild; ) a = a.firstChild;
        return a;
      }
      function Ke(a, b) {
        var c = Je(a);
        a = 0;
        for (var d; c; ) {
          if (3 === c.nodeType) {
            d = a + c.textContent.length;
            if (a <= b && d >= b) return { node: c, offset: b - a };
            a = d;
          }
          a: {
            for (; c; ) {
              if (c.nextSibling) {
                c = c.nextSibling;
                break a;
              }
              c = c.parentNode;
            }
            c = void 0;
          }
          c = Je(c);
        }
      }
      function Le(a, b) {
        return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
      }
      function Me() {
        for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
          try {
            var c = "string" === typeof b.contentWindow.location.href;
          } catch (d) {
            c = false;
          }
          if (c) a = b.contentWindow;
          else break;
          b = Xa(a.document);
        }
        return b;
      }
      function Ne(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
      }
      function Oe(a) {
        var b = Me(), c = a.focusedElem, d = a.selectionRange;
        if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
          if (null !== d && Ne(c)) {
            if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
            else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
              a = a.getSelection();
              var e = c.textContent.length, f = Math.min(d.start, e);
              d = void 0 === d.end ? f : Math.min(d.end, e);
              !a.extend && f > d && (e = d, d = f, f = e);
              e = Ke(c, f);
              var g = Ke(
                c,
                d
              );
              e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
            }
          }
          b = [];
          for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
          "function" === typeof c.focus && c.focus();
          for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
        }
      }
      var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a, b, c) {
        var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
        Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
      }
      function Ve(a, b) {
        var c = {};
        c[a.toLowerCase()] = b.toLowerCase();
        c["Webkit" + a] = "webkit" + b;
        c["Moz" + a] = "moz" + b;
        return c;
      }
      var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") };
      var Xe = {};
      var Ye = {};
      ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
      function Ze(a) {
        if (Xe[a]) return Xe[a];
        if (!We[a]) return a;
        var b = We[a], c;
        for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
        return a;
      }
      var $e = Ze("animationend");
      var af = Ze("animationiteration");
      var bf = Ze("animationstart");
      var cf = Ze("transitionend");
      var df = /* @__PURE__ */ new Map();
      var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
      function ff(a, b) {
        df.set(a, b);
        fa(b, [a]);
      }
      for (gf = 0; gf < ef.length; gf++) {
        hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
        ff(jf, "on" + kf);
      }
      var hf;
      var jf;
      var kf;
      var gf;
      ff($e, "onAnimationEnd");
      ff(af, "onAnimationIteration");
      ff(bf, "onAnimationStart");
      ff("dblclick", "onDoubleClick");
      ff("focusin", "onFocus");
      ff("focusout", "onBlur");
      ff(cf, "onTransitionEnd");
      ha("onMouseEnter", ["mouseout", "mouseover"]);
      ha("onMouseLeave", ["mouseout", "mouseover"]);
      ha("onPointerEnter", ["pointerout", "pointerover"]);
      ha("onPointerLeave", ["pointerout", "pointerover"]);
      fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
      function nf(a, b, c) {
        var d = a.type || "unknown-event";
        a.currentTarget = c;
        Ub(d, b, void 0, a);
        a.currentTarget = null;
      }
      function se(a, b) {
        b = 0 !== (b & 4);
        for (var c = 0; c < a.length; c++) {
          var d = a[c], e = d.event;
          d = d.listeners;
          a: {
            var f = void 0;
            if (b) for (var g = d.length - 1; 0 <= g; g--) {
              var h = d[g], k = h.instance, l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
            else for (g = 0; g < d.length; g++) {
              h = d[g];
              k = h.instance;
              l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
          }
        }
        if (Qb) throw a = Rb, Qb = false, Rb = null, a;
      }
      function D(a, b) {
        var c = b[of];
        void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
        var d = a + "__bubble";
        c.has(d) || (pf(b, a, 2, false), c.add(d));
      }
      function qf(a, b, c) {
        var d = 0;
        b && (d |= 4);
        pf(c, a, d, b);
      }
      var rf = "_reactListening" + Math.random().toString(36).slice(2);
      function sf(a) {
        if (!a[rf]) {
          a[rf] = true;
          da.forEach(function(b2) {
            "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
          });
          var b = 9 === a.nodeType ? a : a.ownerDocument;
          null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
        }
      }
      function pf(a, b, c, d) {
        switch (jd(b)) {
          case 1:
            var e = ed;
            break;
          case 4:
            e = gd;
            break;
          default:
            e = fd;
        }
        c = e.bind(null, b, c, a);
        e = void 0;
        !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
        d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
      }
      function hd(a, b, c, d, e) {
        var f = d;
        if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
          if (null === d) return;
          var g = d.tag;
          if (3 === g || 4 === g) {
            var h = d.stateNode.containerInfo;
            if (h === e || 8 === h.nodeType && h.parentNode === e) break;
            if (4 === g) for (g = d.return; null !== g; ) {
              var k = g.tag;
              if (3 === k || 4 === k) {
                if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
              }
              g = g.return;
            }
            for (; null !== h; ) {
              g = Wc(h);
              if (null === g) return;
              k = g.tag;
              if (5 === k || 6 === k) {
                d = f = g;
                continue a;
              }
              h = h.parentNode;
            }
          }
          d = d.return;
        }
        Jb(function() {
          var d2 = f, e2 = xb(c), g2 = [];
          a: {
            var h2 = df.get(a);
            if (void 0 !== h2) {
              var k2 = td, n = a;
              switch (a) {
                case "keypress":
                  if (0 === od(c)) break a;
                case "keydown":
                case "keyup":
                  k2 = Rd;
                  break;
                case "focusin":
                  n = "focus";
                  k2 = Fd;
                  break;
                case "focusout":
                  n = "blur";
                  k2 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Fd;
                  break;
                case "click":
                  if (2 === c.button) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Vd;
                  break;
                case $e:
                case af:
                case bf:
                  k2 = Hd;
                  break;
                case cf:
                  k2 = Xd;
                  break;
                case "scroll":
                  k2 = vd;
                  break;
                case "wheel":
                  k2 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Td;
              }
              var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
              t = [];
              for (var w = d2, u; null !== w; ) {
                u = w;
                var F = u.stateNode;
                5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
                if (J) break;
                w = w.return;
              }
              0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
            }
          }
          if (0 === (b & 7)) {
            a: {
              h2 = "mouseover" === a || "pointerover" === a;
              k2 = "mouseout" === a || "pointerout" === a;
              if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
              if (k2 || h2) {
                h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
                if (k2) {
                  if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
                } else k2 = null, n = d2;
                if (k2 !== n) {
                  t = Bd;
                  F = "onMouseLeave";
                  x = "onMouseEnter";
                  w = "mouse";
                  if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                  J = null == k2 ? h2 : ue(k2);
                  u = null == n ? h2 : ue(n);
                  h2 = new t(F, w + "leave", k2, c, e2);
                  h2.target = J;
                  h2.relatedTarget = u;
                  F = null;
                  Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t);
                  J = F;
                  if (k2 && n) b: {
                    t = k2;
                    x = n;
                    w = 0;
                    for (u = t; u; u = vf(u)) w++;
                    u = 0;
                    for (F = x; F; F = vf(F)) u++;
                    for (; 0 < w - u; ) t = vf(t), w--;
                    for (; 0 < u - w; ) x = vf(x), u--;
                    for (; w--; ) {
                      if (t === x || null !== x && t === x.alternate) break b;
                      t = vf(t);
                      x = vf(x);
                    }
                    t = null;
                  }
                  else t = null;
                  null !== k2 && wf(g2, h2, k2, t, false);
                  null !== n && null !== J && wf(g2, J, n, t, true);
                }
              }
            }
            a: {
              h2 = d2 ? ue(d2) : window;
              k2 = h2.nodeName && h2.nodeName.toLowerCase();
              if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
              else if (me(h2)) if (we) na = Fe;
              else {
                na = De;
                var xa = Ce;
              }
              else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
              if (na && (na = na(a, d2))) {
                ne(g2, na, c, e2);
                break a;
              }
              xa && xa(a, h2, d2);
              "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
            }
            xa = d2 ? ue(d2) : window;
            switch (a) {
              case "focusin":
                if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g2, c, e2);
                break;
              case "selectionchange":
                if (Pe) break;
              case "keydown":
              case "keyup":
                Ue(g2, c, e2);
            }
            var $a;
            if (ae) b: {
              switch (a) {
                case "compositionstart":
                  var ba = "onCompositionStart";
                  break b;
                case "compositionend":
                  ba = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  ba = "onCompositionUpdate";
                  break b;
              }
              ba = void 0;
            }
            else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
            ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
            if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
          }
          se(g2, b);
        });
      }
      function tf(a, b, c) {
        return { instance: a, listener: b, currentTarget: c };
      }
      function oe(a, b) {
        for (var c = b + "Capture", d = []; null !== a; ) {
          var e = a, f = e.stateNode;
          5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
          a = a.return;
        }
        return d;
      }
      function vf(a) {
        if (null === a) return null;
        do
          a = a.return;
        while (a && 5 !== a.tag);
        return a ? a : null;
      }
      function wf(a, b, c, d, e) {
        for (var f = b._reactName, g = []; null !== c && c !== d; ) {
          var h = c, k = h.alternate, l = h.stateNode;
          if (null !== k && k === d) break;
          5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
          c = c.return;
        }
        0 !== g.length && a.push({ event: b, listeners: g });
      }
      var xf = /\r\n?/g;
      var yf = /\u0000|\uFFFD/g;
      function zf(a) {
        return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
      }
      function Af(a, b, c) {
        b = zf(b);
        if (zf(a) !== b && c) throw Error(p(425));
      }
      function Bf() {
      }
      var Cf = null;
      var Df = null;
      function Ef(a, b) {
        return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
      }
      var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
      var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var Hf = "function" === typeof Promise ? Promise : void 0;
      var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
        return Hf.resolve(null).then(a).catch(If);
      } : Ff;
      function If(a) {
        setTimeout(function() {
          throw a;
        });
      }
      function Kf(a, b) {
        var c = b, d = 0;
        do {
          var e = c.nextSibling;
          a.removeChild(c);
          if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
            if (0 === d) {
              a.removeChild(e);
              bd(b);
              return;
            }
            d--;
          } else "$" !== c && "$?" !== c && "$!" !== c || d++;
          c = e;
        } while (c);
        bd(b);
      }
      function Lf(a) {
        for (; null != a; a = a.nextSibling) {
          var b = a.nodeType;
          if (1 === b || 3 === b) break;
          if (8 === b) {
            b = a.data;
            if ("$" === b || "$!" === b || "$?" === b) break;
            if ("/$" === b) return null;
          }
        }
        return a;
      }
      function Mf(a) {
        a = a.previousSibling;
        for (var b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("$" === c || "$!" === c || "$?" === c) {
              if (0 === b) return a;
              b--;
            } else "/$" === c && b++;
          }
          a = a.previousSibling;
        }
        return null;
      }
      var Nf = Math.random().toString(36).slice(2);
      var Of = "__reactFiber$" + Nf;
      var Pf = "__reactProps$" + Nf;
      var uf = "__reactContainer$" + Nf;
      var of = "__reactEvents$" + Nf;
      var Qf = "__reactListeners$" + Nf;
      var Rf = "__reactHandles$" + Nf;
      function Wc(a) {
        var b = a[Of];
        if (b) return b;
        for (var c = a.parentNode; c; ) {
          if (b = c[uf] || c[Of]) {
            c = b.alternate;
            if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
              if (c = a[Of]) return c;
              a = Mf(a);
            }
            return b;
          }
          a = c;
          c = a.parentNode;
        }
        return null;
      }
      function Cb(a) {
        a = a[Of] || a[uf];
        return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
      }
      function ue(a) {
        if (5 === a.tag || 6 === a.tag) return a.stateNode;
        throw Error(p(33));
      }
      function Db(a) {
        return a[Pf] || null;
      }
      var Sf = [];
      var Tf = -1;
      function Uf(a) {
        return { current: a };
      }
      function E(a) {
        0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
      }
      function G(a, b) {
        Tf++;
        Sf[Tf] = a.current;
        a.current = b;
      }
      var Vf = {};
      var H = Uf(Vf);
      var Wf = Uf(false);
      var Xf = Vf;
      function Yf(a, b) {
        var c = a.type.contextTypes;
        if (!c) return Vf;
        var d = a.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c) e[f] = b[f];
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function Zf(a) {
        a = a.childContextTypes;
        return null !== a && void 0 !== a;
      }
      function $f() {
        E(Wf);
        E(H);
      }
      function ag(a, b, c) {
        if (H.current !== Vf) throw Error(p(168));
        G(H, b);
        G(Wf, c);
      }
      function bg(a, b, c) {
        var d = a.stateNode;
        b = b.childContextTypes;
        if ("function" !== typeof d.getChildContext) return c;
        d = d.getChildContext();
        for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
        return A({}, c, d);
      }
      function cg(a) {
        a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
        Xf = H.current;
        G(H, a);
        G(Wf, Wf.current);
        return true;
      }
      function dg(a, b, c) {
        var d = a.stateNode;
        if (!d) throw Error(p(169));
        c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
        G(Wf, c);
      }
      var eg = null;
      var fg = false;
      var gg = false;
      function hg(a) {
        null === eg ? eg = [a] : eg.push(a);
      }
      function ig(a) {
        fg = true;
        hg(a);
      }
      function jg() {
        if (!gg && null !== eg) {
          gg = true;
          var a = 0, b = C;
          try {
            var c = eg;
            for (C = 1; a < c.length; a++) {
              var d = c[a];
              do
                d = d(true);
              while (null !== d);
            }
            eg = null;
            fg = false;
          } catch (e) {
            throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
          } finally {
            C = b, gg = false;
          }
        }
        return null;
      }
      var kg = [];
      var lg = 0;
      var mg = null;
      var ng = 0;
      var og = [];
      var pg = 0;
      var qg = null;
      var rg = 1;
      var sg = "";
      function tg(a, b) {
        kg[lg++] = ng;
        kg[lg++] = mg;
        mg = a;
        ng = b;
      }
      function ug(a, b, c) {
        og[pg++] = rg;
        og[pg++] = sg;
        og[pg++] = qg;
        qg = a;
        var d = rg;
        a = sg;
        var e = 32 - oc(d) - 1;
        d &= ~(1 << e);
        c += 1;
        var f = 32 - oc(b) + e;
        if (30 < f) {
          var g = e - e % 5;
          f = (d & (1 << g) - 1).toString(32);
          d >>= g;
          e -= g;
          rg = 1 << 32 - oc(b) + e | c << e | d;
          sg = f + a;
        } else rg = 1 << f | c << e | d, sg = a;
      }
      function vg(a) {
        null !== a.return && (tg(a, 1), ug(a, 1, 0));
      }
      function wg(a) {
        for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
        for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
      }
      var xg = null;
      var yg = null;
      var I = false;
      var zg = null;
      function Ag(a, b) {
        var c = Bg(5, null, null, 0);
        c.elementType = "DELETED";
        c.stateNode = b;
        c.return = a;
        b = a.deletions;
        null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
      }
      function Cg(a, b) {
        switch (a.tag) {
          case 5:
            var c = a.type;
            b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
            return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
          case 6:
            return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
          case 13:
            return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
          default:
            return false;
        }
      }
      function Dg(a) {
        return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
      }
      function Eg(a) {
        if (I) {
          var b = yg;
          if (b) {
            var c = b;
            if (!Cg(a, b)) {
              if (Dg(a)) throw Error(p(418));
              b = Lf(c.nextSibling);
              var d = xg;
              b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
            }
          } else {
            if (Dg(a)) throw Error(p(418));
            a.flags = a.flags & -4097 | 2;
            I = false;
            xg = a;
          }
        }
      }
      function Fg(a) {
        for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
        xg = a;
      }
      function Gg(a) {
        if (a !== xg) return false;
        if (!I) return Fg(a), I = true, false;
        var b;
        (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
        if (b && (b = yg)) {
          if (Dg(a)) throw Hg(), Error(p(418));
          for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
        }
        Fg(a);
        if (13 === a.tag) {
          a = a.memoizedState;
          a = null !== a ? a.dehydrated : null;
          if (!a) throw Error(p(317));
          a: {
            a = a.nextSibling;
            for (b = 0; a; ) {
              if (8 === a.nodeType) {
                var c = a.data;
                if ("/$" === c) {
                  if (0 === b) {
                    yg = Lf(a.nextSibling);
                    break a;
                  }
                  b--;
                } else "$" !== c && "$!" !== c && "$?" !== c || b++;
              }
              a = a.nextSibling;
            }
            yg = null;
          }
        } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
        return true;
      }
      function Hg() {
        for (var a = yg; a; ) a = Lf(a.nextSibling);
      }
      function Ig() {
        yg = xg = null;
        I = false;
      }
      function Jg(a) {
        null === zg ? zg = [a] : zg.push(a);
      }
      var Kg = ua.ReactCurrentBatchConfig;
      function Lg(a, b, c) {
        a = c.ref;
        if (null !== a && "function" !== typeof a && "object" !== typeof a) {
          if (c._owner) {
            c = c._owner;
            if (c) {
              if (1 !== c.tag) throw Error(p(309));
              var d = c.stateNode;
            }
            if (!d) throw Error(p(147, a));
            var e = d, f = "" + a;
            if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
            b = function(a2) {
              var b2 = e.refs;
              null === a2 ? delete b2[f] : b2[f] = a2;
            };
            b._stringRef = f;
            return b;
          }
          if ("string" !== typeof a) throw Error(p(284));
          if (!c._owner) throw Error(p(290, a));
        }
        return a;
      }
      function Mg(a, b) {
        a = Object.prototype.toString.call(b);
        throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
      }
      function Ng(a) {
        var b = a._init;
        return b(a._payload);
      }
      function Og(a) {
        function b(b2, c2) {
          if (a) {
            var d2 = b2.deletions;
            null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
          }
        }
        function c(c2, d2) {
          if (!a) return null;
          for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
          return null;
        }
        function d(a2, b2) {
          for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
          return a2;
        }
        function e(a2, b2) {
          a2 = Pg(a2, b2);
          a2.index = 0;
          a2.sibling = null;
          return a2;
        }
        function f(b2, c2, d2) {
          b2.index = d2;
          if (!a) return b2.flags |= 1048576, c2;
          d2 = b2.alternate;
          if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
          b2.flags |= 2;
          return c2;
        }
        function g(b2) {
          a && null === b2.alternate && (b2.flags |= 2);
          return b2;
        }
        function h(a2, b2, c2, d2) {
          if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function k(a2, b2, c2, d2) {
          var f2 = c2.type;
          if (f2 === ya) return m(a2, b2, c2.props.children, d2, c2.key);
          if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
          d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
          d2.ref = Lg(a2, b2, c2);
          d2.return = a2;
          return d2;
        }
        function l(a2, b2, c2, d2) {
          if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2.children || []);
          b2.return = a2;
          return b2;
        }
        function m(a2, b2, c2, d2, f2) {
          if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function q(a2, b2, c2) {
          if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
          if ("object" === typeof b2 && null !== b2) {
            switch (b2.$$typeof) {
              case va:
                return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
              case wa:
                return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
              case Ha:
                var d2 = b2._init;
                return q(a2, d2(b2._payload), c2);
            }
            if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
            Mg(a2, b2);
          }
          return null;
        }
        function r(a2, b2, c2, d2) {
          var e2 = null !== b2 ? b2.key : null;
          if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
          if ("object" === typeof c2 && null !== c2) {
            switch (c2.$$typeof) {
              case va:
                return c2.key === e2 ? k(a2, b2, c2, d2) : null;
              case wa:
                return c2.key === e2 ? l(a2, b2, c2, d2) : null;
              case Ha:
                return e2 = c2._init, r(
                  a2,
                  b2,
                  e2(c2._payload),
                  d2
                );
            }
            if (eb(c2) || Ka(c2)) return null !== e2 ? null : m(a2, b2, c2, d2, null);
            Mg(a2, c2);
          }
          return null;
        }
        function y(a2, b2, c2, d2, e2) {
          if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
          if ("object" === typeof d2 && null !== d2) {
            switch (d2.$$typeof) {
              case va:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
              case wa:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
              case Ha:
                var f2 = d2._init;
                return y(a2, b2, c2, f2(d2._payload), e2);
            }
            if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
            Mg(b2, d2);
          }
          return null;
        }
        function n(e2, g2, h2, k2) {
          for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
            u.index > w ? (x = u, u = null) : x = u.sibling;
            var n2 = r(e2, u, h2[w], k2);
            if (null === n2) {
              null === u && (u = x);
              break;
            }
            a && u && null === n2.alternate && b(e2, u);
            g2 = f(n2, g2, w);
            null === m2 ? l2 = n2 : m2.sibling = n2;
            m2 = n2;
            u = x;
          }
          if (w === h2.length) return c(e2, u), I && tg(e2, w), l2;
          if (null === u) {
            for (; w < h2.length; w++) u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
            I && tg(e2, w);
            return l2;
          }
          for (u = d(e2, u); w < h2.length; w++) x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function t(e2, g2, h2, k2) {
          var l2 = Ka(h2);
          if ("function" !== typeof l2) throw Error(p(150));
          h2 = l2.call(h2);
          if (null == h2) throw Error(p(151));
          for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
            m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
            var t2 = r(e2, m2, n2.value, k2);
            if (null === t2) {
              null === m2 && (m2 = x);
              break;
            }
            a && m2 && null === t2.alternate && b(e2, m2);
            g2 = f(t2, g2, w);
            null === u ? l2 = t2 : u.sibling = t2;
            u = t2;
            m2 = x;
          }
          if (n2.done) return c(
            e2,
            m2
          ), I && tg(e2, w), l2;
          if (null === m2) {
            for (; !n2.done; w++, n2 = h2.next()) n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
            I && tg(e2, w);
            return l2;
          }
          for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next()) n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
          a && m2.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function J(a2, d2, f2, h2) {
          "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
          if ("object" === typeof f2 && null !== f2) {
            switch (f2.$$typeof) {
              case va:
                a: {
                  for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                    if (l2.key === k2) {
                      k2 = f2.type;
                      if (k2 === ya) {
                        if (7 === l2.tag) {
                          c(a2, l2.sibling);
                          d2 = e(l2, f2.props.children);
                          d2.return = a2;
                          a2 = d2;
                          break a;
                        }
                      } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                        c(a2, l2.sibling);
                        d2 = e(l2, f2.props);
                        d2.ref = Lg(a2, l2, f2);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      }
                      c(a2, l2);
                      break;
                    } else b(a2, l2);
                    l2 = l2.sibling;
                  }
                  f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
                }
                return g(a2);
              case wa:
                a: {
                  for (l2 = f2.key; null !== d2; ) {
                    if (d2.key === l2) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                      c(a2, d2.sibling);
                      d2 = e(d2, f2.children || []);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    } else {
                      c(a2, d2);
                      break;
                    }
                    else b(a2, d2);
                    d2 = d2.sibling;
                  }
                  d2 = Sg(f2, a2.mode, h2);
                  d2.return = a2;
                  a2 = d2;
                }
                return g(a2);
              case Ha:
                return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
            }
            if (eb(f2)) return n(a2, d2, f2, h2);
            if (Ka(f2)) return t(a2, d2, f2, h2);
            Mg(a2, f2);
          }
          return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
        }
        return J;
      }
      var Ug = Og(true);
      var Vg = Og(false);
      var Wg = Uf(null);
      var Xg = null;
      var Yg = null;
      var Zg = null;
      function $g() {
        Zg = Yg = Xg = null;
      }
      function ah(a) {
        var b = Wg.current;
        E(Wg);
        a._currentValue = b;
      }
      function bh(a, b, c) {
        for (; null !== a; ) {
          var d = a.alternate;
          (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
          if (a === c) break;
          a = a.return;
        }
      }
      function ch(a, b) {
        Xg = a;
        Zg = Yg = null;
        a = a.dependencies;
        null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
      }
      function eh(a) {
        var b = a._currentValue;
        if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
          if (null === Xg) throw Error(p(308));
          Yg = a;
          Xg.dependencies = { lanes: 0, firstContext: a };
        } else Yg = Yg.next = a;
        return b;
      }
      var fh = null;
      function gh(a) {
        null === fh ? fh = [a] : fh.push(a);
      }
      function hh(a, b, c, d) {
        var e = b.interleaved;
        null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
        b.interleaved = c;
        return ih(a, d);
      }
      function ih(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        null !== c && (c.lanes |= b);
        c = a;
        for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
        return 3 === c.tag ? c.stateNode : null;
      }
      var jh = false;
      function kh(a) {
        a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
      }
      function lh(a, b) {
        a = a.updateQueue;
        b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
      }
      function mh(a, b) {
        return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
      }
      function nh(a, b, c) {
        var d = a.updateQueue;
        if (null === d) return null;
        d = d.shared;
        if (0 !== (K & 2)) {
          var e = d.pending;
          null === e ? b.next = b : (b.next = e.next, e.next = b);
          d.pending = b;
          return ih(a, c);
        }
        e = d.interleaved;
        null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
        d.interleaved = b;
        return ih(a, c);
      }
      function oh(a, b, c) {
        b = b.updateQueue;
        if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      function ph(a, b) {
        var c = a.updateQueue, d = a.alternate;
        if (null !== d && (d = d.updateQueue, c === d)) {
          var e = null, f = null;
          c = c.firstBaseUpdate;
          if (null !== c) {
            do {
              var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
              null === f ? e = f = g : f = f.next = g;
              c = c.next;
            } while (null !== c);
            null === f ? e = f = b : f = f.next = b;
          } else e = f = b;
          c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
          a.updateQueue = c;
          return;
        }
        a = c.lastBaseUpdate;
        null === a ? c.firstBaseUpdate = b : a.next = b;
        c.lastBaseUpdate = b;
      }
      function qh(a, b, c, d) {
        var e = a.updateQueue;
        jh = false;
        var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
        if (null !== h) {
          e.shared.pending = null;
          var k = h, l = k.next;
          k.next = null;
          null === g ? f = l : g.next = l;
          g = k;
          var m = a.alternate;
          null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
        }
        if (null !== f) {
          var q = e.baseState;
          g = 0;
          m = l = k = null;
          h = f;
          do {
            var r = h.lane, y = h.eventTime;
            if ((d & r) === r) {
              null !== m && (m = m.next = {
                eventTime: y,
                lane: 0,
                tag: h.tag,
                payload: h.payload,
                callback: h.callback,
                next: null
              });
              a: {
                var n = a, t = h;
                r = b;
                y = c;
                switch (t.tag) {
                  case 1:
                    n = t.payload;
                    if ("function" === typeof n) {
                      q = n.call(y, q, r);
                      break a;
                    }
                    q = n;
                    break a;
                  case 3:
                    n.flags = n.flags & -65537 | 128;
                  case 0:
                    n = t.payload;
                    r = "function" === typeof n ? n.call(y, q, r) : n;
                    if (null === r || void 0 === r) break a;
                    q = A({}, q, r);
                    break a;
                  case 2:
                    jh = true;
                }
              }
              null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
            } else y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
            h = h.next;
            if (null === h) if (h = e.shared.pending, null === h) break;
            else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
          } while (1);
          null === m && (k = q);
          e.baseState = k;
          e.firstBaseUpdate = l;
          e.lastBaseUpdate = m;
          b = e.shared.interleaved;
          if (null !== b) {
            e = b;
            do
              g |= e.lane, e = e.next;
            while (e !== b);
          } else null === f && (e.shared.lanes = 0);
          rh |= g;
          a.lanes = g;
          a.memoizedState = q;
        }
      }
      function sh(a, b, c) {
        a = b.effects;
        b.effects = null;
        if (null !== a) for (b = 0; b < a.length; b++) {
          var d = a[b], e = d.callback;
          if (null !== e) {
            d.callback = null;
            d = c;
            if ("function" !== typeof e) throw Error(p(191, e));
            e.call(d);
          }
        }
      }
      var th = {};
      var uh = Uf(th);
      var vh = Uf(th);
      var wh = Uf(th);
      function xh(a) {
        if (a === th) throw Error(p(174));
        return a;
      }
      function yh(a, b) {
        G(wh, b);
        G(vh, a);
        G(uh, th);
        a = b.nodeType;
        switch (a) {
          case 9:
          case 11:
            b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
            break;
          default:
            a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
        }
        E(uh);
        G(uh, b);
      }
      function zh() {
        E(uh);
        E(vh);
        E(wh);
      }
      function Ah(a) {
        xh(wh.current);
        var b = xh(uh.current);
        var c = lb(b, a.type);
        b !== c && (G(vh, a), G(uh, c));
      }
      function Bh(a) {
        vh.current === a && (E(uh), E(vh));
      }
      var L = Uf(0);
      function Ch(a) {
        for (var b = a; null !== b; ) {
          if (13 === b.tag) {
            var c = b.memoizedState;
            if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
          } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
            if (0 !== (b.flags & 128)) return b;
          } else if (null !== b.child) {
            b.child.return = b;
            b = b.child;
            continue;
          }
          if (b === a) break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a) return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
        return null;
      }
      var Dh = [];
      function Eh() {
        for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
        Dh.length = 0;
      }
      var Fh = ua.ReactCurrentDispatcher;
      var Gh = ua.ReactCurrentBatchConfig;
      var Hh = 0;
      var M = null;
      var N = null;
      var O = null;
      var Ih = false;
      var Jh = false;
      var Kh = 0;
      var Lh = 0;
      function P() {
        throw Error(p(321));
      }
      function Mh(a, b) {
        if (null === b) return false;
        for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
        return true;
      }
      function Nh(a, b, c, d, e, f) {
        Hh = f;
        M = b;
        b.memoizedState = null;
        b.updateQueue = null;
        b.lanes = 0;
        Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
        a = c(d, e);
        if (Jh) {
          f = 0;
          do {
            Jh = false;
            Kh = 0;
            if (25 <= f) throw Error(p(301));
            f += 1;
            O = N = null;
            b.updateQueue = null;
            Fh.current = Qh;
            a = c(d, e);
          } while (Jh);
        }
        Fh.current = Rh;
        b = null !== N && null !== N.next;
        Hh = 0;
        O = N = M = null;
        Ih = false;
        if (b) throw Error(p(300));
        return a;
      }
      function Sh() {
        var a = 0 !== Kh;
        Kh = 0;
        return a;
      }
      function Th() {
        var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === O ? M.memoizedState = O = a : O = O.next = a;
        return O;
      }
      function Uh() {
        if (null === N) {
          var a = M.alternate;
          a = null !== a ? a.memoizedState : null;
        } else a = N.next;
        var b = null === O ? M.memoizedState : O.next;
        if (null !== b) O = b, N = a;
        else {
          if (null === a) throw Error(p(310));
          N = a;
          a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
          null === O ? M.memoizedState = O = a : O = O.next = a;
        }
        return O;
      }
      function Vh(a, b) {
        return "function" === typeof b ? b(a) : b;
      }
      function Wh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = N, e = d.baseQueue, f = c.pending;
        if (null !== f) {
          if (null !== e) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c.pending = null;
        }
        if (null !== e) {
          f = e.next;
          d = d.baseState;
          var h = g = null, k = null, l = f;
          do {
            var m = l.lane;
            if ((Hh & m) === m) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
            else {
              var q = {
                lane: m,
                action: l.action,
                hasEagerState: l.hasEagerState,
                eagerState: l.eagerState,
                next: null
              };
              null === k ? (h = k = q, g = d) : k = k.next = q;
              M.lanes |= m;
              rh |= m;
            }
            l = l.next;
          } while (null !== l && l !== f);
          null === k ? g = d : k.next = h;
          He(d, b.memoizedState) || (dh = true);
          b.memoizedState = d;
          b.baseState = g;
          b.baseQueue = k;
          c.lastRenderedState = d;
        }
        a = c.interleaved;
        if (null !== a) {
          e = a;
          do
            f = e.lane, M.lanes |= f, rh |= f, e = e.next;
          while (e !== a);
        } else null === e && (c.lanes = 0);
        return [b.memoizedState, c.dispatch];
      }
      function Xh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = c.dispatch, e = c.pending, f = b.memoizedState;
        if (null !== e) {
          c.pending = null;
          var g = e = e.next;
          do
            f = a(f, g.action), g = g.next;
          while (g !== e);
          He(f, b.memoizedState) || (dh = true);
          b.memoizedState = f;
          null === b.baseQueue && (b.baseState = f);
          c.lastRenderedState = f;
        }
        return [f, d];
      }
      function Yh() {
      }
      function Zh(a, b) {
        var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
        f && (d.memoizedState = e, dh = true);
        d = d.queue;
        $h(ai.bind(null, c, d, a), [a]);
        if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
          c.flags |= 2048;
          bi(9, ci.bind(null, c, d, e, b), void 0, null);
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(c, b, e);
        }
        return e;
      }
      function di(a, b, c) {
        a.flags |= 16384;
        a = { getSnapshot: b, value: c };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
      }
      function ci(a, b, c, d) {
        b.value = c;
        b.getSnapshot = d;
        ei(b) && fi(a);
      }
      function ai(a, b, c) {
        return c(function() {
          ei(b) && fi(a);
        });
      }
      function ei(a) {
        var b = a.getSnapshot;
        a = a.value;
        try {
          var c = b();
          return !He(a, c);
        } catch (d) {
          return true;
        }
      }
      function fi(a) {
        var b = ih(a, 1);
        null !== b && gi(b, a, 1, -1);
      }
      function hi(a) {
        var b = Th();
        "function" === typeof a && (a = a());
        b.memoizedState = b.baseState = a;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
        b.queue = a;
        a = a.dispatch = ii.bind(null, M, a);
        return [b.memoizedState, a];
      }
      function bi(a, b, c, d) {
        a = { tag: a, create: b, destroy: c, deps: d, next: null };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
        return a;
      }
      function ji() {
        return Uh().memoizedState;
      }
      function ki(a, b, c, d) {
        var e = Th();
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
      }
      function li(a, b, c, d) {
        var e = Uh();
        d = void 0 === d ? null : d;
        var f = void 0;
        if (null !== N) {
          var g = N.memoizedState;
          f = g.destroy;
          if (null !== d && Mh(d, g.deps)) {
            e.memoizedState = bi(b, c, f, d);
            return;
          }
        }
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, f, d);
      }
      function mi(a, b) {
        return ki(8390656, 8, a, b);
      }
      function $h(a, b) {
        return li(2048, 8, a, b);
      }
      function ni(a, b) {
        return li(4, 2, a, b);
      }
      function oi(a, b) {
        return li(4, 4, a, b);
      }
      function pi(a, b) {
        if ("function" === typeof b) return a = a(), b(a), function() {
          b(null);
        };
        if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
          b.current = null;
        };
      }
      function qi(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return li(4, 4, pi.bind(null, b, a), c);
      }
      function ri() {
      }
      function si(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        c.memoizedState = [a, b];
        return a;
      }
      function ti(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        a = a();
        c.memoizedState = [a, b];
        return a;
      }
      function ui(a, b, c) {
        if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
        He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
        return b;
      }
      function vi(a, b) {
        var c = C;
        C = 0 !== c && 4 > c ? c : 4;
        a(true);
        var d = Gh.transition;
        Gh.transition = {};
        try {
          a(false), b();
        } finally {
          C = c, Gh.transition = d;
        }
      }
      function wi() {
        return Uh().memoizedState;
      }
      function xi(a, b, c) {
        var d = yi(a);
        c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, c);
        else if (c = hh(a, b, c, d), null !== c) {
          var e = R();
          gi(c, a, d, e);
          Bi(c, b, d);
        }
      }
      function ii(a, b, c) {
        var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, e);
        else {
          var f = a.alternate;
          if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
            var g = b.lastRenderedState, h = f(g, c);
            e.hasEagerState = true;
            e.eagerState = h;
            if (He(h, g)) {
              var k = b.interleaved;
              null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
              b.interleaved = e;
              return;
            }
          } catch (l) {
          } finally {
          }
          c = hh(a, b, e, d);
          null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
        }
      }
      function zi(a) {
        var b = a.alternate;
        return a === M || null !== b && b === M;
      }
      function Ai(a, b) {
        Jh = Ih = true;
        var c = a.pending;
        null === c ? b.next = b : (b.next = c.next, c.next = b);
        a.pending = b;
      }
      function Bi(a, b, c) {
        if (0 !== (c & 4194240)) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false };
      var Oh = { readContext: eh, useCallback: function(a, b) {
        Th().memoizedState = [a, void 0 === b ? null : b];
        return a;
      }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return ki(
          4194308,
          4,
          pi.bind(null, b, a),
          c
        );
      }, useLayoutEffect: function(a, b) {
        return ki(4194308, 4, a, b);
      }, useInsertionEffect: function(a, b) {
        return ki(4, 2, a, b);
      }, useMemo: function(a, b) {
        var c = Th();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      }, useReducer: function(a, b, c) {
        var d = Th();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
        d.queue = a;
        a = a.dispatch = xi.bind(null, M, a);
        return [d.memoizedState, a];
      }, useRef: function(a) {
        var b = Th();
        a = { current: a };
        return b.memoizedState = a;
      }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
        return Th().memoizedState = a;
      }, useTransition: function() {
        var a = hi(false), b = a[0];
        a = vi.bind(null, a[1]);
        Th().memoizedState = a;
        return [b, a];
      }, useMutableSource: function() {
      }, useSyncExternalStore: function(a, b, c) {
        var d = M, e = Th();
        if (I) {
          if (void 0 === c) throw Error(p(407));
          c = c();
        } else {
          c = b();
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(d, b, c);
        }
        e.memoizedState = c;
        var f = { value: c, getSnapshot: b };
        e.queue = f;
        mi(ai.bind(
          null,
          d,
          f,
          a
        ), [a]);
        d.flags |= 2048;
        bi(9, ci.bind(null, d, f, c, b), void 0, null);
        return c;
      }, useId: function() {
        var a = Th(), b = Q.identifierPrefix;
        if (I) {
          var c = sg;
          var d = rg;
          c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
          b = ":" + b + "R" + c;
          c = Kh++;
          0 < c && (b += "H" + c.toString(32));
          b += ":";
        } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
        return a.memoizedState = b;
      }, unstable_isNewReconciler: false };
      var Ph = {
        readContext: eh,
        useCallback: si,
        useContext: eh,
        useEffect: $h,
        useImperativeHandle: qi,
        useInsertionEffect: ni,
        useLayoutEffect: oi,
        useMemo: ti,
        useReducer: Wh,
        useRef: ji,
        useState: function() {
          return Wh(Vh);
        },
        useDebugValue: ri,
        useDeferredValue: function(a) {
          var b = Uh();
          return ui(b, N.memoizedState, a);
        },
        useTransition: function() {
          var a = Wh(Vh)[0], b = Uh().memoizedState;
          return [a, b];
        },
        useMutableSource: Yh,
        useSyncExternalStore: Zh,
        useId: wi,
        unstable_isNewReconciler: false
      };
      var Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
        return Xh(Vh);
      }, useDebugValue: ri, useDeferredValue: function(a) {
        var b = Uh();
        return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
      }, useTransition: function() {
        var a = Xh(Vh)[0], b = Uh().memoizedState;
        return [a, b];
      }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
      function Ci(a, b) {
        if (a && a.defaultProps) {
          b = A({}, b);
          a = a.defaultProps;
          for (var c in a) void 0 === b[c] && (b[c] = a[c]);
          return b;
        }
        return b;
      }
      function Di(a, b, c, d) {
        b = a.memoizedState;
        c = c(d, b);
        c = null === c || void 0 === c ? b : A({}, b, c);
        a.memoizedState = c;
        0 === a.lanes && (a.updateQueue.baseState = c);
      }
      var Ei = { isMounted: function(a) {
        return (a = a._reactInternals) ? Vb(a) === a : false;
      }, enqueueSetState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueReplaceState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.tag = 1;
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueForceUpdate: function(a, b) {
        a = a._reactInternals;
        var c = R(), d = yi(a), e = mh(c, d);
        e.tag = 2;
        void 0 !== b && null !== b && (e.callback = b);
        b = nh(a, e, d);
        null !== b && (gi(b, a, d, c), oh(b, a, d));
      } };
      function Fi(a, b, c, d, e, f, g) {
        a = a.stateNode;
        return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
      }
      function Gi(a, b, c) {
        var d = false, e = Vf;
        var f = b.contextType;
        "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
        b = new b(c, f);
        a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
        b.updater = Ei;
        a.stateNode = b;
        b._reactInternals = a;
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
        return b;
      }
      function Hi(a, b, c, d) {
        a = b.state;
        "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
        "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
        b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
      }
      function Ii(a, b, c, d) {
        var e = a.stateNode;
        e.props = c;
        e.state = a.memoizedState;
        e.refs = {};
        kh(a);
        var f = b.contextType;
        "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
        e.state = a.memoizedState;
        f = b.getDerivedStateFromProps;
        "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
        "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
        "function" === typeof e.componentDidMount && (a.flags |= 4194308);
      }
      function Ji(a, b) {
        try {
          var c = "", d = b;
          do
            c += Pa(d), d = d.return;
          while (d);
          var e = c;
        } catch (f) {
          e = "\nError generating stack: " + f.message + "\n" + f.stack;
        }
        return { value: a, source: b, stack: e, digest: null };
      }
      function Ki(a, b, c) {
        return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
      }
      function Li(a, b) {
        try {
          console.error(b.value);
        } catch (c) {
          setTimeout(function() {
            throw c;
          });
        }
      }
      var Mi = "function" === typeof WeakMap ? WeakMap : Map;
      function Ni(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        c.payload = { element: null };
        var d = b.value;
        c.callback = function() {
          Oi || (Oi = true, Pi = d);
          Li(a, b);
        };
        return c;
      }
      function Qi(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        var d = a.type.getDerivedStateFromError;
        if ("function" === typeof d) {
          var e = b.value;
          c.payload = function() {
            return d(e);
          };
          c.callback = function() {
            Li(a, b);
          };
        }
        var f = a.stateNode;
        null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
          Li(a, b);
          "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
          var c2 = b.stack;
          this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
        });
        return c;
      }
      function Si(a, b, c) {
        var d = a.pingCache;
        if (null === d) {
          d = a.pingCache = new Mi();
          var e = /* @__PURE__ */ new Set();
          d.set(b, e);
        } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
        e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
      }
      function Ui(a) {
        do {
          var b;
          if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
          if (b) return a;
          a = a.return;
        } while (null !== a);
        return null;
      }
      function Vi(a, b, c, d, e) {
        if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
        a.flags |= 65536;
        a.lanes = e;
        return a;
      }
      var Wi = ua.ReactCurrentOwner;
      var dh = false;
      function Xi(a, b, c, d) {
        b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
      }
      function Yi(a, b, c, d, e) {
        c = c.render;
        var f = b.ref;
        ch(b, e);
        d = Nh(a, b, c, d, f, e);
        c = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && c && vg(b);
        b.flags |= 1;
        Xi(a, b, d, e);
        return b.child;
      }
      function $i(a, b, c, d, e) {
        if (null === a) {
          var f = c.type;
          if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
          a = Rg(c.type, null, d, b, b.mode, e);
          a.ref = b.ref;
          a.return = b;
          return b.child = a;
        }
        f = a.child;
        if (0 === (a.lanes & e)) {
          var g = f.memoizedProps;
          c = c.compare;
          c = null !== c ? c : Ie;
          if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
        }
        b.flags |= 1;
        a = Pg(f, d);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      function bj(a, b, c, d, e) {
        if (null !== a) {
          var f = a.memoizedProps;
          if (Ie(f, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
          else return b.lanes = a.lanes, Zi(a, b, e);
        }
        return cj(a, b, c, d, e);
      }
      function dj(a, b, c) {
        var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
        if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
        else {
          if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
          b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
          d = null !== f ? f.baseLanes : c;
          G(ej, fj);
          fj |= d;
        }
        else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
        Xi(a, b, e, c);
        return b.child;
      }
      function gj(a, b) {
        var c = b.ref;
        if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
      }
      function cj(a, b, c, d, e) {
        var f = Zf(c) ? Xf : H.current;
        f = Yf(b, f);
        ch(b, e);
        c = Nh(a, b, c, d, f, e);
        d = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && d && vg(b);
        b.flags |= 1;
        Xi(a, b, c, e);
        return b.child;
      }
      function hj(a, b, c, d, e) {
        if (Zf(c)) {
          var f = true;
          cg(b);
        } else f = false;
        ch(b, e);
        if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
        else if (null === a) {
          var g = b.stateNode, h = b.memoizedProps;
          g.props = h;
          var k = g.context, l = c.contextType;
          "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
          var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
          q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
          jh = false;
          var r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          k = b.memoizedState;
          h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
        } else {
          g = b.stateNode;
          lh(a, b);
          h = b.memoizedProps;
          l = b.type === b.elementType ? h : Ci(b.type, h);
          g.props = l;
          q = b.pendingProps;
          r = g.context;
          k = c.contextType;
          "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
          var y = c.getDerivedStateFromProps;
          (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
          jh = false;
          r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          var n = b.memoizedState;
          h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = false);
        }
        return jj(a, b, c, d, f, e);
      }
      function jj(a, b, c, d, e, f) {
        gj(a, b);
        var g = 0 !== (b.flags & 128);
        if (!d && !g) return e && dg(b, c, false), Zi(a, b, f);
        d = b.stateNode;
        Wi.current = b;
        var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
        b.flags |= 1;
        null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
        b.memoizedState = d.state;
        e && dg(b, c, true);
        return b.child;
      }
      function kj(a) {
        var b = a.stateNode;
        b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
        yh(a, b.containerInfo);
      }
      function lj(a, b, c, d, e) {
        Ig();
        Jg(e);
        b.flags |= 256;
        Xi(a, b, c, d);
        return b.child;
      }
      var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
      function nj(a) {
        return { baseLanes: a, cachePool: null, transitions: null };
      }
      function oj(a, b, c) {
        var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
        (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
        if (h) f = true, b.flags &= -129;
        else if (null === a || null !== a.memoizedState) e |= 1;
        G(L, e & 1);
        if (null === a) {
          Eg(b);
          a = b.memoizedState;
          if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
          g = d.children;
          a = d.fallback;
          return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
        }
        e = a.memoizedState;
        if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
        if (f) {
          f = d.fallback;
          g = b.mode;
          e = a.child;
          h = e.sibling;
          var k = { mode: "hidden", children: d.children };
          0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
          null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
          f.return = b;
          d.return = b;
          d.sibling = f;
          b.child = d;
          d = f;
          f = b.child;
          g = a.child.memoizedState;
          g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
          f.memoizedState = g;
          f.childLanes = a.childLanes & ~c;
          b.memoizedState = mj;
          return d;
        }
        f = a.child;
        a = f.sibling;
        d = Pg(f, { mode: "visible", children: d.children });
        0 === (b.mode & 1) && (d.lanes = c);
        d.return = b;
        d.sibling = null;
        null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
        b.child = d;
        b.memoizedState = null;
        return d;
      }
      function qj(a, b) {
        b = pj({ mode: "visible", children: b }, a.mode, 0, null);
        b.return = a;
        return a.child = b;
      }
      function sj(a, b, c, d) {
        null !== d && Jg(d);
        Ug(b, a.child, null, c);
        a = qj(b, b.pendingProps.children);
        a.flags |= 2;
        b.memoizedState = null;
        return a;
      }
      function rj(a, b, c, d, e, f, g) {
        if (c) {
          if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
          if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
          f = d.fallback;
          e = b.mode;
          d = pj({ mode: "visible", children: d.children }, e, 0, null);
          f = Tg(f, e, g, null);
          f.flags |= 2;
          d.return = b;
          f.return = b;
          d.sibling = f;
          b.child = d;
          0 !== (b.mode & 1) && Ug(b, a.child, null, g);
          b.child.memoizedState = nj(g);
          b.memoizedState = mj;
          return f;
        }
        if (0 === (b.mode & 1)) return sj(a, b, g, null);
        if ("$!" === e.data) {
          d = e.nextSibling && e.nextSibling.dataset;
          if (d) var h = d.dgst;
          d = h;
          f = Error(p(419));
          d = Ki(f, d, void 0);
          return sj(a, b, g, d);
        }
        h = 0 !== (g & a.childLanes);
        if (dh || h) {
          d = Q;
          if (null !== d) {
            switch (g & -g) {
              case 4:
                e = 2;
                break;
              case 16:
                e = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                e = 32;
                break;
              case 536870912:
                e = 268435456;
                break;
              default:
                e = 0;
            }
            e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
            0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
          }
          tj();
          d = Ki(Error(p(421)));
          return sj(a, b, g, d);
        }
        if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
        a = f.treeContext;
        yg = Lf(e.nextSibling);
        xg = b;
        I = true;
        zg = null;
        null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
        b = qj(b, d.children);
        b.flags |= 4096;
        return b;
      }
      function vj(a, b, c) {
        a.lanes |= b;
        var d = a.alternate;
        null !== d && (d.lanes |= b);
        bh(a.return, b, c);
      }
      function wj(a, b, c, d, e) {
        var f = a.memoizedState;
        null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
      }
      function xj(a, b, c) {
        var d = b.pendingProps, e = d.revealOrder, f = d.tail;
        Xi(a, b, d.children, c);
        d = L.current;
        if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
        else {
          if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
            if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
            else if (19 === a.tag) vj(a, c, b);
            else if (null !== a.child) {
              a.child.return = a;
              a = a.child;
              continue;
            }
            if (a === b) break a;
            for (; null === a.sibling; ) {
              if (null === a.return || a.return === b) break a;
              a = a.return;
            }
            a.sibling.return = a.return;
            a = a.sibling;
          }
          d &= 1;
        }
        G(L, d);
        if (0 === (b.mode & 1)) b.memoizedState = null;
        else switch (e) {
          case "forwards":
            c = b.child;
            for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
            c = e;
            null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
            wj(b, false, e, c, f);
            break;
          case "backwards":
            c = null;
            e = b.child;
            for (b.child = null; null !== e; ) {
              a = e.alternate;
              if (null !== a && null === Ch(a)) {
                b.child = e;
                break;
              }
              a = e.sibling;
              e.sibling = c;
              c = e;
              e = a;
            }
            wj(b, true, c, null, f);
            break;
          case "together":
            wj(b, false, null, null, void 0);
            break;
          default:
            b.memoizedState = null;
        }
        return b.child;
      }
      function ij(a, b) {
        0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
      }
      function Zi(a, b, c) {
        null !== a && (b.dependencies = a.dependencies);
        rh |= b.lanes;
        if (0 === (c & b.childLanes)) return null;
        if (null !== a && b.child !== a.child) throw Error(p(153));
        if (null !== b.child) {
          a = b.child;
          c = Pg(a, a.pendingProps);
          b.child = c;
          for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
          c.sibling = null;
        }
        return b.child;
      }
      function yj(a, b, c) {
        switch (b.tag) {
          case 3:
            kj(b);
            Ig();
            break;
          case 5:
            Ah(b);
            break;
          case 1:
            Zf(b.type) && cg(b);
            break;
          case 4:
            yh(b, b.stateNode.containerInfo);
            break;
          case 10:
            var d = b.type._context, e = b.memoizedProps.value;
            G(Wg, d._currentValue);
            d._currentValue = e;
            break;
          case 13:
            d = b.memoizedState;
            if (null !== d) {
              if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
              if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
              G(L, L.current & 1);
              a = Zi(a, b, c);
              return null !== a ? a.sibling : null;
            }
            G(L, L.current & 1);
            break;
          case 19:
            d = 0 !== (c & b.childLanes);
            if (0 !== (a.flags & 128)) {
              if (d) return xj(a, b, c);
              b.flags |= 128;
            }
            e = b.memoizedState;
            null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
            G(L, L.current);
            if (d) break;
            else return null;
          case 22:
          case 23:
            return b.lanes = 0, dj(a, b, c);
        }
        return Zi(a, b, c);
      }
      var zj;
      var Aj;
      var Bj;
      var Cj;
      zj = function(a, b) {
        for (var c = b.child; null !== c; ) {
          if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
          else if (4 !== c.tag && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b) break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === b) return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      };
      Aj = function() {
      };
      Bj = function(a, b, c, d) {
        var e = a.memoizedProps;
        if (e !== d) {
          a = b.stateNode;
          xh(uh.current);
          var f = null;
          switch (c) {
            case "input":
              e = Ya(a, e);
              d = Ya(a, d);
              f = [];
              break;
            case "select":
              e = A({}, e, { value: void 0 });
              d = A({}, d, { value: void 0 });
              f = [];
              break;
            case "textarea":
              e = gb(a, e);
              d = gb(a, d);
              f = [];
              break;
            default:
              "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
          }
          ub(c, d);
          var g;
          c = null;
          for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
            var h = e[l];
            for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
          } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
          for (l in d) {
            var k = d[l];
            h = null != e ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
              for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
              for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
            } else c || (f || (f = []), f.push(
              l,
              c
            )), c = k;
            else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
          }
          c && (f = f || []).push("style", c);
          var l = f;
          if (b.updateQueue = l) b.flags |= 4;
        }
      };
      Cj = function(a, b, c, d) {
        c !== d && (b.flags |= 4);
      };
      function Dj(a, b) {
        if (!I) switch (a.tailMode) {
          case "hidden":
            b = a.tail;
            for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
            null === c ? a.tail = null : c.sibling = null;
            break;
          case "collapsed":
            c = a.tail;
            for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
            null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
        }
      }
      function S(a) {
        var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
        if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
        else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
        a.subtreeFlags |= d;
        a.childLanes = c;
        return b;
      }
      function Ej(a, b, c) {
        var d = b.pendingProps;
        wg(b);
        switch (b.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return S(b), null;
          case 1:
            return Zf(b.type) && $f(), S(b), null;
          case 3:
            d = b.stateNode;
            zh();
            E(Wf);
            E(H);
            Eh();
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
            Aj(a, b);
            S(b);
            return null;
          case 5:
            Bh(b);
            var e = xh(wh.current);
            c = b.type;
            if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            else {
              if (!d) {
                if (null === b.stateNode) throw Error(p(166));
                S(b);
                return null;
              }
              a = xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.type;
                var f = b.memoizedProps;
                d[Of] = b;
                d[Pf] = f;
                a = 0 !== (b.mode & 1);
                switch (c) {
                  case "dialog":
                    D("cancel", d);
                    D("close", d);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", d);
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++) D(lf[e], d);
                    break;
                  case "source":
                    D("error", d);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      d
                    );
                    D("load", d);
                    break;
                  case "details":
                    D("toggle", d);
                    break;
                  case "input":
                    Za(d, f);
                    D("invalid", d);
                    break;
                  case "select":
                    d._wrapperState = { wasMultiple: !!f.multiple };
                    D("invalid", d);
                    break;
                  case "textarea":
                    hb(d, f), D("invalid", d);
                }
                ub(c, f);
                e = null;
                for (var g in f) if (f.hasOwnProperty(g)) {
                  var h = f[g];
                  "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                    d.textContent,
                    h,
                    a
                  ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
                }
                switch (c) {
                  case "input":
                    Va(d);
                    db(d, f, true);
                    break;
                  case "textarea":
                    Va(d);
                    jb(d);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f.onClick && (d.onclick = Bf);
                }
                d = e;
                b.updateQueue = d;
                null !== d && (b.flags |= 4);
              } else {
                g = 9 === e.nodeType ? e : e.ownerDocument;
                "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
                "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                a[Of] = b;
                a[Pf] = d;
                zj(a, b, false, false);
                b.stateNode = a;
                a: {
                  g = vb(c, d);
                  switch (c) {
                    case "dialog":
                      D("cancel", a);
                      D("close", a);
                      e = d;
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      D("load", a);
                      e = d;
                      break;
                    case "video":
                    case "audio":
                      for (e = 0; e < lf.length; e++) D(lf[e], a);
                      e = d;
                      break;
                    case "source":
                      D("error", a);
                      e = d;
                      break;
                    case "img":
                    case "image":
                    case "link":
                      D(
                        "error",
                        a
                      );
                      D("load", a);
                      e = d;
                      break;
                    case "details":
                      D("toggle", a);
                      e = d;
                      break;
                    case "input":
                      Za(a, d);
                      e = Ya(a, d);
                      D("invalid", a);
                      break;
                    case "option":
                      e = d;
                      break;
                    case "select":
                      a._wrapperState = { wasMultiple: !!d.multiple };
                      e = A({}, d, { value: void 0 });
                      D("invalid", a);
                      break;
                    case "textarea":
                      hb(a, d);
                      e = gb(a, d);
                      D("invalid", a);
                      break;
                    default:
                      e = d;
                  }
                  ub(c, e);
                  h = e;
                  for (f in h) if (h.hasOwnProperty(f)) {
                    var k = h[f];
                    "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                  }
                  switch (c) {
                    case "input":
                      Va(a);
                      db(a, d, false);
                      break;
                    case "textarea":
                      Va(a);
                      jb(a);
                      break;
                    case "option":
                      null != d.value && a.setAttribute("value", "" + Sa(d.value));
                      break;
                    case "select":
                      a.multiple = !!d.multiple;
                      f = d.value;
                      null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                        a,
                        !!d.multiple,
                        d.defaultValue,
                        true
                      );
                      break;
                    default:
                      "function" === typeof e.onClick && (a.onclick = Bf);
                  }
                  switch (c) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      d = !!d.autoFocus;
                      break a;
                    case "img":
                      d = true;
                      break a;
                    default:
                      d = false;
                  }
                }
                d && (b.flags |= 4);
              }
              null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            }
            S(b);
            return null;
          case 6:
            if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
            else {
              if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
              c = xh(wh.current);
              xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.memoizedProps;
                d[Of] = b;
                if (f = d.nodeValue !== c) {
                  if (a = xg, null !== a) switch (a.tag) {
                    case 3:
                      Af(d.nodeValue, c, 0 !== (a.mode & 1));
                      break;
                    case 5:
                      true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  }
                }
                f && (b.flags |= 4);
              } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
            }
            S(b);
            return null;
          case 13:
            E(L);
            d = b.memoizedState;
            if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
              if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = false;
              else if (f = Gg(b), null !== d && null !== d.dehydrated) {
                if (null === a) {
                  if (!f) throw Error(p(318));
                  f = b.memoizedState;
                  f = null !== f ? f.dehydrated : null;
                  if (!f) throw Error(p(317));
                  f[Of] = b;
                } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
                S(b);
                f = false;
              } else null !== zg && (Fj(zg), zg = null), f = true;
              if (!f) return b.flags & 65536 ? b : null;
            }
            if (0 !== (b.flags & 128)) return b.lanes = c, b;
            d = null !== d;
            d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
            null !== b.updateQueue && (b.flags |= 4);
            S(b);
            return null;
          case 4:
            return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
          case 10:
            return ah(b.type._context), S(b), null;
          case 17:
            return Zf(b.type) && $f(), S(b), null;
          case 19:
            E(L);
            f = b.memoizedState;
            if (null === f) return S(b), null;
            d = 0 !== (b.flags & 128);
            g = f.rendering;
            if (null === g) if (d) Dj(f, false);
            else {
              if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
                g = Ch(a);
                if (null !== g) {
                  b.flags |= 128;
                  Dj(f, false);
                  d = g.updateQueue;
                  null !== d && (b.updateQueue = d, b.flags |= 4);
                  b.subtreeFlags = 0;
                  d = c;
                  for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                  G(L, L.current & 1 | 2);
                  return b.child;
                }
                a = a.sibling;
              }
              null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
            }
            else {
              if (!d) if (a = Ch(g), null !== a) {
                if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
              } else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
              f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
            }
            if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
            S(b);
            return null;
          case 22:
          case 23:
            return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
          case 24:
            return null;
          case 25:
            return null;
        }
        throw Error(p(156, b.tag));
      }
      function Ij(a, b) {
        wg(b);
        switch (b.tag) {
          case 1:
            return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 3:
            return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
          case 5:
            return Bh(b), null;
          case 13:
            E(L);
            a = b.memoizedState;
            if (null !== a && null !== a.dehydrated) {
              if (null === b.alternate) throw Error(p(340));
              Ig();
            }
            a = b.flags;
            return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 19:
            return E(L), null;
          case 4:
            return zh(), null;
          case 10:
            return ah(b.type._context), null;
          case 22:
          case 23:
            return Hj(), null;
          case 24:
            return null;
          default:
            return null;
        }
      }
      var Jj = false;
      var U = false;
      var Kj = "function" === typeof WeakSet ? WeakSet : Set;
      var V = null;
      function Lj(a, b) {
        var c = a.ref;
        if (null !== c) if ("function" === typeof c) try {
          c(null);
        } catch (d) {
          W(a, b, d);
        }
        else c.current = null;
      }
      function Mj(a, b, c) {
        try {
          c();
        } catch (d) {
          W(a, b, d);
        }
      }
      var Nj = false;
      function Oj(a, b) {
        Cf = dd;
        a = Me();
        if (Ne(a)) {
          if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
          else a: {
            c = (c = a.ownerDocument) && c.defaultView || window;
            var d = c.getSelection && c.getSelection();
            if (d && 0 !== d.rangeCount) {
              c = d.anchorNode;
              var e = d.anchorOffset, f = d.focusNode;
              d = d.focusOffset;
              try {
                c.nodeType, f.nodeType;
              } catch (F) {
                c = null;
                break a;
              }
              var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
              b: for (; ; ) {
                for (var y; ; ) {
                  q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                  q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                  3 === q.nodeType && (g += q.nodeValue.length);
                  if (null === (y = q.firstChild)) break;
                  r = q;
                  q = y;
                }
                for (; ; ) {
                  if (q === a) break b;
                  r === c && ++l === e && (h = g);
                  r === f && ++m === d && (k = g);
                  if (null !== (y = q.nextSibling)) break;
                  q = r;
                  r = q.parentNode;
                }
                q = y;
              }
              c = -1 === h || -1 === k ? null : { start: h, end: k };
            } else c = null;
          }
          c = c || { start: 0, end: 0 };
        } else c = null;
        Df = { focusedElem: a, selectionRange: c };
        dd = false;
        for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
        else for (; null !== V; ) {
          b = V;
          try {
            var n = b.alternate;
            if (0 !== (b.flags & 1024)) switch (b.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n) {
                  var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
                  x.__reactInternalSnapshotBeforeUpdate = w;
                }
                break;
              case 3:
                var u = b.stateNode.containerInfo;
                1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p(163));
            }
          } catch (F) {
            W(b, b.return, F);
          }
          a = b.sibling;
          if (null !== a) {
            a.return = b.return;
            V = a;
            break;
          }
          V = b.return;
        }
        n = Nj;
        Nj = false;
        return n;
      }
      function Pj(a, b, c) {
        var d = b.updateQueue;
        d = null !== d ? d.lastEffect : null;
        if (null !== d) {
          var e = d = d.next;
          do {
            if ((e.tag & a) === a) {
              var f = e.destroy;
              e.destroy = void 0;
              void 0 !== f && Mj(b, c, f);
            }
            e = e.next;
          } while (e !== d);
        }
      }
      function Qj(a, b) {
        b = b.updateQueue;
        b = null !== b ? b.lastEffect : null;
        if (null !== b) {
          var c = b = b.next;
          do {
            if ((c.tag & a) === a) {
              var d = c.create;
              c.destroy = d();
            }
            c = c.next;
          } while (c !== b);
        }
      }
      function Rj(a) {
        var b = a.ref;
        if (null !== b) {
          var c = a.stateNode;
          switch (a.tag) {
            case 5:
              a = c;
              break;
            default:
              a = c;
          }
          "function" === typeof b ? b(a) : b.current = a;
        }
      }
      function Sj(a) {
        var b = a.alternate;
        null !== b && (a.alternate = null, Sj(b));
        a.child = null;
        a.deletions = null;
        a.sibling = null;
        5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
        a.stateNode = null;
        a.return = null;
        a.dependencies = null;
        a.memoizedProps = null;
        a.memoizedState = null;
        a.pendingProps = null;
        a.stateNode = null;
        a.updateQueue = null;
      }
      function Tj(a) {
        return 5 === a.tag || 3 === a.tag || 4 === a.tag;
      }
      function Uj(a) {
        a: for (; ; ) {
          for (; null === a.sibling; ) {
            if (null === a.return || Tj(a.return)) return null;
            a = a.return;
          }
          a.sibling.return = a.return;
          for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
            if (a.flags & 2) continue a;
            if (null === a.child || 4 === a.tag) continue a;
            else a.child.return = a, a = a.child;
          }
          if (!(a.flags & 2)) return a.stateNode;
        }
      }
      function Vj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
        else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
      }
      function Wj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
        else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
      }
      var X = null;
      var Xj = false;
      function Yj(a, b, c) {
        for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
      }
      function Zj(a, b, c) {
        if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
          lc.onCommitFiberUnmount(kc, c);
        } catch (h) {
        }
        switch (c.tag) {
          case 5:
            U || Lj(c, b);
          case 6:
            var d = X, e = Xj;
            X = null;
            Yj(a, b, c);
            X = d;
            Xj = e;
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
            break;
          case 18:
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
            break;
          case 4:
            d = X;
            e = Xj;
            X = c.stateNode.containerInfo;
            Xj = true;
            Yj(a, b, c);
            X = d;
            Xj = e;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
              e = d = d.next;
              do {
                var f = e, g = f.destroy;
                f = f.tag;
                void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
                e = e.next;
              } while (e !== d);
            }
            Yj(a, b, c);
            break;
          case 1:
            if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
              d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
            } catch (h) {
              W(c, b, h);
            }
            Yj(a, b, c);
            break;
          case 21:
            Yj(a, b, c);
            break;
          case 22:
            c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
            break;
          default:
            Yj(a, b, c);
        }
      }
      function ak(a) {
        var b = a.updateQueue;
        if (null !== b) {
          a.updateQueue = null;
          var c = a.stateNode;
          null === c && (c = a.stateNode = new Kj());
          b.forEach(function(b2) {
            var d = bk.bind(null, a, b2);
            c.has(b2) || (c.add(b2), b2.then(d, d));
          });
        }
      }
      function ck(a, b) {
        var c = b.deletions;
        if (null !== c) for (var d = 0; d < c.length; d++) {
          var e = c[d];
          try {
            var f = a, g = b, h = g;
            a: for (; null !== h; ) {
              switch (h.tag) {
                case 5:
                  X = h.stateNode;
                  Xj = false;
                  break a;
                case 3:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
                case 4:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
              }
              h = h.return;
            }
            if (null === X) throw Error(p(160));
            Zj(f, g, e);
            X = null;
            Xj = false;
            var k = e.alternate;
            null !== k && (k.return = null);
            e.return = null;
          } catch (l) {
            W(e, b, l);
          }
        }
        if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
      }
      function dk(a, b) {
        var c = a.alternate, d = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ck(b, a);
            ek(a);
            if (d & 4) {
              try {
                Pj(3, a, a.return), Qj(3, a);
              } catch (t) {
                W(a, a.return, t);
              }
              try {
                Pj(5, a, a.return);
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 1:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            break;
          case 5:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            if (a.flags & 32) {
              var e = a.stateNode;
              try {
                ob(e, "");
              } catch (t) {
                W(a, a.return, t);
              }
            }
            if (d & 4 && (e = a.stateNode, null != e)) {
              var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
              a.updateQueue = null;
              if (null !== k) try {
                "input" === h && "radio" === f.type && null != f.name && ab(e, f);
                vb(h, g);
                var l = vb(h, f);
                for (g = 0; g < k.length; g += 2) {
                  var m = k[g], q = k[g + 1];
                  "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
                }
                switch (h) {
                  case "input":
                    bb(e, f);
                    break;
                  case "textarea":
                    ib(e, f);
                    break;
                  case "select":
                    var r = e._wrapperState.wasMultiple;
                    e._wrapperState.wasMultiple = !!f.multiple;
                    var y = f.value;
                    null != y ? fb(e, !!f.multiple, y, false) : r !== !!f.multiple && (null != f.defaultValue ? fb(
                      e,
                      !!f.multiple,
                      f.defaultValue,
                      true
                    ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
                }
                e[Pf] = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 6:
            ck(b, a);
            ek(a);
            if (d & 4) {
              if (null === a.stateNode) throw Error(p(162));
              e = a.stateNode;
              f = a.memoizedProps;
              try {
                e.nodeValue = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 3:
            ck(b, a);
            ek(a);
            if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
              bd(b.containerInfo);
            } catch (t) {
              W(a, a.return, t);
            }
            break;
          case 4:
            ck(b, a);
            ek(a);
            break;
          case 13:
            ck(b, a);
            ek(a);
            e = a.child;
            e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
            d & 4 && ak(a);
            break;
          case 22:
            m = null !== c && null !== c.memoizedState;
            a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
            ek(a);
            if (d & 8192) {
              l = null !== a.memoizedState;
              if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m; ) {
                for (q = V = m; null !== V; ) {
                  r = V;
                  y = r.child;
                  switch (r.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      Pj(4, r, r.return);
                      break;
                    case 1:
                      Lj(r, r.return);
                      var n = r.stateNode;
                      if ("function" === typeof n.componentWillUnmount) {
                        d = r;
                        c = r.return;
                        try {
                          b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                        } catch (t) {
                          W(d, c, t);
                        }
                      }
                      break;
                    case 5:
                      Lj(r, r.return);
                      break;
                    case 22:
                      if (null !== r.memoizedState) {
                        gk(q);
                        continue;
                      }
                  }
                  null !== y ? (y.return = r, V = y) : gk(q);
                }
                m = m.sibling;
              }
              a: for (m = null, q = a; ; ) {
                if (5 === q.tag) {
                  if (null === m) {
                    m = q;
                    try {
                      e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                    } catch (t) {
                      W(a, a.return, t);
                    }
                  }
                } else if (6 === q.tag) {
                  if (null === m) try {
                    q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                  } catch (t) {
                    W(a, a.return, t);
                  }
                } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                  q.child.return = q;
                  q = q.child;
                  continue;
                }
                if (q === a) break a;
                for (; null === q.sibling; ) {
                  if (null === q.return || q.return === a) break a;
                  m === q && (m = null);
                  q = q.return;
                }
                m === q && (m = null);
                q.sibling.return = q.return;
                q = q.sibling;
              }
            }
            break;
          case 19:
            ck(b, a);
            ek(a);
            d & 4 && ak(a);
            break;
          case 21:
            break;
          default:
            ck(
              b,
              a
            ), ek(a);
        }
      }
      function ek(a) {
        var b = a.flags;
        if (b & 2) {
          try {
            a: {
              for (var c = a.return; null !== c; ) {
                if (Tj(c)) {
                  var d = c;
                  break a;
                }
                c = c.return;
              }
              throw Error(p(160));
            }
            switch (d.tag) {
              case 5:
                var e = d.stateNode;
                d.flags & 32 && (ob(e, ""), d.flags &= -33);
                var f = Uj(a);
                Wj(a, f, e);
                break;
              case 3:
              case 4:
                var g = d.stateNode.containerInfo, h = Uj(a);
                Vj(a, h, g);
                break;
              default:
                throw Error(p(161));
            }
          } catch (k) {
            W(a, a.return, k);
          }
          a.flags &= -3;
        }
        b & 4096 && (a.flags &= -4097);
      }
      function hk(a, b, c) {
        V = a;
        ik(a, b, c);
      }
      function ik(a, b, c) {
        for (var d = 0 !== (a.mode & 1); null !== V; ) {
          var e = V, f = e.child;
          if (22 === e.tag && d) {
            var g = null !== e.memoizedState || Jj;
            if (!g) {
              var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
              h = Jj;
              var l = U;
              Jj = g;
              if ((U = k) && !l) for (V = e; null !== V; ) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
              for (; null !== f; ) V = f, ik(f, b, c), f = f.sibling;
              V = e;
              Jj = h;
              U = l;
            }
            kk(a, b, c);
          } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a, b, c);
        }
      }
      function kk(a) {
        for (; null !== V; ) {
          var b = V;
          if (0 !== (b.flags & 8772)) {
            var c = b.alternate;
            try {
              if (0 !== (b.flags & 8772)) switch (b.tag) {
                case 0:
                case 11:
                case 15:
                  U || Qj(5, b);
                  break;
                case 1:
                  var d = b.stateNode;
                  if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
                  else {
                    var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                    d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                  }
                  var f = b.updateQueue;
                  null !== f && sh(b, f, d);
                  break;
                case 3:
                  var g = b.updateQueue;
                  if (null !== g) {
                    c = null;
                    if (null !== b.child) switch (b.child.tag) {
                      case 5:
                        c = b.child.stateNode;
                        break;
                      case 1:
                        c = b.child.stateNode;
                    }
                    sh(b, g, c);
                  }
                  break;
                case 5:
                  var h = b.stateNode;
                  if (null === c && b.flags & 4) {
                    c = h;
                    var k = b.memoizedProps;
                    switch (b.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        k.autoFocus && c.focus();
                        break;
                      case "img":
                        k.src && (c.src = k.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (null === b.memoizedState) {
                    var l = b.alternate;
                    if (null !== l) {
                      var m = l.memoizedState;
                      if (null !== m) {
                        var q = m.dehydrated;
                        null !== q && bd(q);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(p(163));
              }
              U || b.flags & 512 && Rj(b);
            } catch (r) {
              W(b, b.return, r);
            }
          }
          if (b === a) {
            V = null;
            break;
          }
          c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function gk(a) {
        for (; null !== V; ) {
          var b = V;
          if (b === a) {
            V = null;
            break;
          }
          var c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function jk(a) {
        for (; null !== V; ) {
          var b = V;
          try {
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                var c = b.return;
                try {
                  Qj(4, b);
                } catch (k) {
                  W(b, c, k);
                }
                break;
              case 1:
                var d = b.stateNode;
                if ("function" === typeof d.componentDidMount) {
                  var e = b.return;
                  try {
                    d.componentDidMount();
                  } catch (k) {
                    W(b, e, k);
                  }
                }
                var f = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, f, k);
                }
                break;
              case 5:
                var g = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, g, k);
                }
            }
          } catch (k) {
            W(b, b.return, k);
          }
          if (b === a) {
            V = null;
            break;
          }
          var h = b.sibling;
          if (null !== h) {
            h.return = b.return;
            V = h;
            break;
          }
          V = b.return;
        }
      }
      var lk = Math.ceil;
      var mk = ua.ReactCurrentDispatcher;
      var nk = ua.ReactCurrentOwner;
      var ok = ua.ReactCurrentBatchConfig;
      var K = 0;
      var Q = null;
      var Y = null;
      var Z = 0;
      var fj = 0;
      var ej = Uf(0);
      var T = 0;
      var pk = null;
      var rh = 0;
      var qk = 0;
      var rk = 0;
      var sk = null;
      var tk = null;
      var fk = 0;
      var Gj = Infinity;
      var uk = null;
      var Oi = false;
      var Pi = null;
      var Ri = null;
      var vk = false;
      var wk = null;
      var xk = 0;
      var yk = 0;
      var zk = null;
      var Ak = -1;
      var Bk = 0;
      function R() {
        return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
      }
      function yi(a) {
        if (0 === (a.mode & 1)) return 1;
        if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
        if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
        a = C;
        if (0 !== a) return a;
        a = window.event;
        a = void 0 === a ? 16 : jd(a.type);
        return a;
      }
      function gi(a, b, c, d) {
        if (50 < yk) throw yk = 0, zk = null, Error(p(185));
        Ac(a, c, d);
        if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
      }
      function Dk(a, b) {
        var c = a.callbackNode;
        wc(a, b);
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
        else if (b = d & -d, a.callbackPriority !== b) {
          null != c && bc(c);
          if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
            0 === (K & 6) && jg();
          }), c = null;
          else {
            switch (Dc(d)) {
              case 1:
                c = fc;
                break;
              case 4:
                c = gc;
                break;
              case 16:
                c = hc;
                break;
              case 536870912:
                c = jc;
                break;
              default:
                c = hc;
            }
            c = Fk(c, Gk.bind(null, a));
          }
          a.callbackPriority = b;
          a.callbackNode = c;
        }
      }
      function Gk(a, b) {
        Ak = -1;
        Bk = 0;
        if (0 !== (K & 6)) throw Error(p(327));
        var c = a.callbackNode;
        if (Hk() && a.callbackNode !== c) return null;
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) return null;
        if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
        else {
          b = d;
          var e = K;
          K |= 2;
          var f = Jk();
          if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
          do
            try {
              Lk();
              break;
            } catch (h) {
              Mk(a, h);
            }
          while (1);
          $g();
          mk.current = f;
          K = e;
          null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
        }
        if (0 !== b) {
          2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
          if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
          if (6 === b) Ck(a, d);
          else {
            e = a.current.alternate;
            if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
            a.finishedWork = e;
            a.finishedLanes = d;
            switch (b) {
              case 0:
              case 1:
                throw Error(p(345));
              case 2:
                Pk(a, tk, uk);
                break;
              case 3:
                Ck(a, d);
                if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
                  if (0 !== uc(a, 0)) break;
                  e = a.suspendedLanes;
                  if ((e & d) !== d) {
                    R();
                    a.pingedLanes |= a.suspendedLanes & e;
                    break;
                  }
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 4:
                Ck(a, d);
                if ((d & 4194240) === d) break;
                b = a.eventTimes;
                for (e = -1; 0 < d; ) {
                  var g = 31 - oc(d);
                  f = 1 << g;
                  g = b[g];
                  g > e && (e = g);
                  d &= ~f;
                }
                d = e;
                d = B() - d;
                d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
                if (10 < d) {
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 5:
                Pk(a, tk, uk);
                break;
              default:
                throw Error(p(329));
            }
          }
        }
        Dk(a, B());
        return a.callbackNode === c ? Gk.bind(null, a) : null;
      }
      function Nk(a, b) {
        var c = sk;
        a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
        a = Ik(a, b);
        2 !== a && (b = tk, tk = c, null !== b && Fj(b));
        return a;
      }
      function Fj(a) {
        null === tk ? tk = a : tk.push.apply(tk, a);
      }
      function Ok(a) {
        for (var b = a; ; ) {
          if (b.flags & 16384) {
            var c = b.updateQueue;
            if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
              var e = c[d], f = e.getSnapshot;
              e = e.value;
              try {
                if (!He(f(), e)) return false;
              } catch (g) {
                return false;
              }
            }
          }
          c = b.child;
          if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
          else {
            if (b === a) break;
            for (; null === b.sibling; ) {
              if (null === b.return || b.return === a) return true;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return true;
      }
      function Ck(a, b) {
        b &= ~rk;
        b &= ~qk;
        a.suspendedLanes |= b;
        a.pingedLanes &= ~b;
        for (a = a.expirationTimes; 0 < b; ) {
          var c = 31 - oc(b), d = 1 << c;
          a[c] = -1;
          b &= ~d;
        }
      }
      function Ek(a) {
        if (0 !== (K & 6)) throw Error(p(327));
        Hk();
        var b = uc(a, 0);
        if (0 === (b & 1)) return Dk(a, B()), null;
        var c = Ik(a, b);
        if (0 !== a.tag && 2 === c) {
          var d = xc(a);
          0 !== d && (b = d, c = Nk(a, d));
        }
        if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
        if (6 === c) throw Error(p(345));
        a.finishedWork = a.current.alternate;
        a.finishedLanes = b;
        Pk(a, tk, uk);
        Dk(a, B());
        return null;
      }
      function Qk(a, b) {
        var c = K;
        K |= 1;
        try {
          return a(b);
        } finally {
          K = c, 0 === K && (Gj = B() + 500, fg && jg());
        }
      }
      function Rk(a) {
        null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
        var b = K;
        K |= 1;
        var c = ok.transition, d = C;
        try {
          if (ok.transition = null, C = 1, a) return a();
        } finally {
          C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
        }
      }
      function Hj() {
        fj = ej.current;
        E(ej);
      }
      function Kk(a, b) {
        a.finishedWork = null;
        a.finishedLanes = 0;
        var c = a.timeoutHandle;
        -1 !== c && (a.timeoutHandle = -1, Gf(c));
        if (null !== Y) for (c = Y.return; null !== c; ) {
          var d = c;
          wg(d);
          switch (d.tag) {
            case 1:
              d = d.type.childContextTypes;
              null !== d && void 0 !== d && $f();
              break;
            case 3:
              zh();
              E(Wf);
              E(H);
              Eh();
              break;
            case 5:
              Bh(d);
              break;
            case 4:
              zh();
              break;
            case 13:
              E(L);
              break;
            case 19:
              E(L);
              break;
            case 10:
              ah(d.type._context);
              break;
            case 22:
            case 23:
              Hj();
          }
          c = c.return;
        }
        Q = a;
        Y = a = Pg(a.current, null);
        Z = fj = b;
        T = 0;
        pk = null;
        rk = qk = rh = 0;
        tk = sk = null;
        if (null !== fh) {
          for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
            c.interleaved = null;
            var e = d.next, f = c.pending;
            if (null !== f) {
              var g = f.next;
              f.next = e;
              d.next = g;
            }
            c.pending = d;
          }
          fh = null;
        }
        return a;
      }
      function Mk(a, b) {
        do {
          var c = Y;
          try {
            $g();
            Fh.current = Rh;
            if (Ih) {
              for (var d = M.memoizedState; null !== d; ) {
                var e = d.queue;
                null !== e && (e.pending = null);
                d = d.next;
              }
              Ih = false;
            }
            Hh = 0;
            O = N = M = null;
            Jh = false;
            Kh = 0;
            nk.current = null;
            if (null === c || null === c.return) {
              T = 1;
              pk = b;
              Y = null;
              break;
            }
            a: {
              var f = a, g = c.return, h = c, k = b;
              b = Z;
              h.flags |= 32768;
              if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                var l = k, m = h, q = m.tag;
                if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                  var r = m.alternate;
                  r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
                }
                var y = Ui(g);
                if (null !== y) {
                  y.flags &= -257;
                  Vi(y, g, h, f, b);
                  y.mode & 1 && Si(f, l, b);
                  b = y;
                  k = l;
                  var n = b.updateQueue;
                  if (null === n) {
                    var t = /* @__PURE__ */ new Set();
                    t.add(k);
                    b.updateQueue = t;
                  } else n.add(k);
                  break a;
                } else {
                  if (0 === (b & 1)) {
                    Si(f, l, b);
                    tj();
                    break a;
                  }
                  k = Error(p(426));
                }
              } else if (I && h.mode & 1) {
                var J = Ui(g);
                if (null !== J) {
                  0 === (J.flags & 65536) && (J.flags |= 256);
                  Vi(J, g, h, f, b);
                  Jg(Ji(k, h));
                  break a;
                }
              }
              f = k = Ji(k, h);
              4 !== T && (T = 2);
              null === sk ? sk = [f] : sk.push(f);
              f = g;
              do {
                switch (f.tag) {
                  case 3:
                    f.flags |= 65536;
                    b &= -b;
                    f.lanes |= b;
                    var x = Ni(f, k, b);
                    ph(f, x);
                    break a;
                  case 1:
                    h = k;
                    var w = f.type, u = f.stateNode;
                    if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                      f.flags |= 65536;
                      b &= -b;
                      f.lanes |= b;
                      var F = Qi(f, h, b);
                      ph(f, F);
                      break a;
                    }
                }
                f = f.return;
              } while (null !== f);
            }
            Sk(c);
          } catch (na) {
            b = na;
            Y === c && null !== c && (Y = c = c.return);
            continue;
          }
          break;
        } while (1);
      }
      function Jk() {
        var a = mk.current;
        mk.current = Rh;
        return null === a ? Rh : a;
      }
      function tj() {
        if (0 === T || 3 === T || 2 === T) T = 4;
        null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
      }
      function Ik(a, b) {
        var c = K;
        K |= 2;
        var d = Jk();
        if (Q !== a || Z !== b) uk = null, Kk(a, b);
        do
          try {
            Tk();
            break;
          } catch (e) {
            Mk(a, e);
          }
        while (1);
        $g();
        K = c;
        mk.current = d;
        if (null !== Y) throw Error(p(261));
        Q = null;
        Z = 0;
        return T;
      }
      function Tk() {
        for (; null !== Y; ) Uk(Y);
      }
      function Lk() {
        for (; null !== Y && !cc(); ) Uk(Y);
      }
      function Uk(a) {
        var b = Vk(a.alternate, a, fj);
        a.memoizedProps = a.pendingProps;
        null === b ? Sk(a) : Y = b;
        nk.current = null;
      }
      function Sk(a) {
        var b = a;
        do {
          var c = b.alternate;
          a = b.return;
          if (0 === (b.flags & 32768)) {
            if (c = Ej(c, b, fj), null !== c) {
              Y = c;
              return;
            }
          } else {
            c = Ij(c, b);
            if (null !== c) {
              c.flags &= 32767;
              Y = c;
              return;
            }
            if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
            else {
              T = 6;
              Y = null;
              return;
            }
          }
          b = b.sibling;
          if (null !== b) {
            Y = b;
            return;
          }
          Y = b = a;
        } while (null !== b);
        0 === T && (T = 5);
      }
      function Pk(a, b, c) {
        var d = C, e = ok.transition;
        try {
          ok.transition = null, C = 1, Wk(a, b, c, d);
        } finally {
          ok.transition = e, C = d;
        }
        return null;
      }
      function Wk(a, b, c, d) {
        do
          Hk();
        while (null !== wk);
        if (0 !== (K & 6)) throw Error(p(327));
        c = a.finishedWork;
        var e = a.finishedLanes;
        if (null === c) return null;
        a.finishedWork = null;
        a.finishedLanes = 0;
        if (c === a.current) throw Error(p(177));
        a.callbackNode = null;
        a.callbackPriority = 0;
        var f = c.lanes | c.childLanes;
        Bc(a, f);
        a === Q && (Y = Q = null, Z = 0);
        0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
          Hk();
          return null;
        }));
        f = 0 !== (c.flags & 15990);
        if (0 !== (c.subtreeFlags & 15990) || f) {
          f = ok.transition;
          ok.transition = null;
          var g = C;
          C = 1;
          var h = K;
          K |= 4;
          nk.current = null;
          Oj(a, c);
          dk(c, a);
          Oe(Df);
          dd = !!Cf;
          Df = Cf = null;
          a.current = c;
          hk(c, a, e);
          dc();
          K = h;
          C = g;
          ok.transition = f;
        } else a.current = c;
        vk && (vk = false, wk = a, xk = e);
        f = a.pendingLanes;
        0 === f && (Ri = null);
        mc(c.stateNode, d);
        Dk(a, B());
        if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
        if (Oi) throw Oi = false, a = Pi, Pi = null, a;
        0 !== (xk & 1) && 0 !== a.tag && Hk();
        f = a.pendingLanes;
        0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
        jg();
        return null;
      }
      function Hk() {
        if (null !== wk) {
          var a = Dc(xk), b = ok.transition, c = C;
          try {
            ok.transition = null;
            C = 16 > a ? 16 : a;
            if (null === wk) var d = false;
            else {
              a = wk;
              wk = null;
              xk = 0;
              if (0 !== (K & 6)) throw Error(p(331));
              var e = K;
              K |= 4;
              for (V = a.current; null !== V; ) {
                var f = V, g = f.child;
                if (0 !== (V.flags & 16)) {
                  var h = f.deletions;
                  if (null !== h) {
                    for (var k = 0; k < h.length; k++) {
                      var l = h[k];
                      for (V = l; null !== V; ) {
                        var m = V;
                        switch (m.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Pj(8, m, f);
                        }
                        var q = m.child;
                        if (null !== q) q.return = m, V = q;
                        else for (; null !== V; ) {
                          m = V;
                          var r = m.sibling, y = m.return;
                          Sj(m);
                          if (m === l) {
                            V = null;
                            break;
                          }
                          if (null !== r) {
                            r.return = y;
                            V = r;
                            break;
                          }
                          V = y;
                        }
                      }
                    }
                    var n = f.alternate;
                    if (null !== n) {
                      var t = n.child;
                      if (null !== t) {
                        n.child = null;
                        do {
                          var J = t.sibling;
                          t.sibling = null;
                          t = J;
                        } while (null !== t);
                      }
                    }
                    V = f;
                  }
                }
                if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
                else b: for (; null !== V; ) {
                  f = V;
                  if (0 !== (f.flags & 2048)) switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(9, f, f.return);
                  }
                  var x = f.sibling;
                  if (null !== x) {
                    x.return = f.return;
                    V = x;
                    break b;
                  }
                  V = f.return;
                }
              }
              var w = a.current;
              for (V = w; null !== V; ) {
                g = V;
                var u = g.child;
                if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;
                else b: for (g = w; null !== V; ) {
                  h = V;
                  if (0 !== (h.flags & 2048)) try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Qj(9, h);
                    }
                  } catch (na) {
                    W(h, h.return, na);
                  }
                  if (h === g) {
                    V = null;
                    break b;
                  }
                  var F = h.sibling;
                  if (null !== F) {
                    F.return = h.return;
                    V = F;
                    break b;
                  }
                  V = h.return;
                }
              }
              K = e;
              jg();
              if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
                lc.onPostCommitFiberRoot(kc, a);
              } catch (na) {
              }
              d = true;
            }
            return d;
          } finally {
            C = c, ok.transition = b;
          }
        }
        return false;
      }
      function Xk(a, b, c) {
        b = Ji(c, b);
        b = Ni(a, b, 1);
        a = nh(a, b, 1);
        b = R();
        null !== a && (Ac(a, 1, b), Dk(a, b));
      }
      function W(a, b, c) {
        if (3 === a.tag) Xk(a, a, c);
        else for (; null !== b; ) {
          if (3 === b.tag) {
            Xk(b, a, c);
            break;
          } else if (1 === b.tag) {
            var d = b.stateNode;
            if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
              a = Ji(c, a);
              a = Qi(b, a, 1);
              b = nh(b, a, 1);
              a = R();
              null !== b && (Ac(b, 1, a), Dk(b, a));
              break;
            }
          }
          b = b.return;
        }
      }
      function Ti(a, b, c) {
        var d = a.pingCache;
        null !== d && d.delete(b);
        b = R();
        a.pingedLanes |= a.suspendedLanes & c;
        Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
        Dk(a, b);
      }
      function Yk(a, b) {
        0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
        var c = R();
        a = ih(a, b);
        null !== a && (Ac(a, b, c), Dk(a, c));
      }
      function uj(a) {
        var b = a.memoizedState, c = 0;
        null !== b && (c = b.retryLane);
        Yk(a, c);
      }
      function bk(a, b) {
        var c = 0;
        switch (a.tag) {
          case 13:
            var d = a.stateNode;
            var e = a.memoizedState;
            null !== e && (c = e.retryLane);
            break;
          case 19:
            d = a.stateNode;
            break;
          default:
            throw Error(p(314));
        }
        null !== d && d.delete(b);
        Yk(a, c);
      }
      var Vk;
      Vk = function(a, b, c) {
        if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
        else {
          if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
          dh = 0 !== (a.flags & 131072) ? true : false;
        }
        else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
        b.lanes = 0;
        switch (b.tag) {
          case 2:
            var d = b.type;
            ij(a, b);
            a = b.pendingProps;
            var e = Yf(b, H.current);
            ch(b, c);
            e = Nh(null, b, d, a, e, c);
            var f = Sh();
            b.flags |= 1;
            "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
            return b;
          case 16:
            d = b.elementType;
            a: {
              ij(a, b);
              a = b.pendingProps;
              e = d._init;
              d = e(d._payload);
              b.type = d;
              e = b.tag = Zk(d);
              a = Ci(d, a);
              switch (e) {
                case 0:
                  b = cj(null, b, d, a, c);
                  break a;
                case 1:
                  b = hj(null, b, d, a, c);
                  break a;
                case 11:
                  b = Yi(null, b, d, a, c);
                  break a;
                case 14:
                  b = $i(null, b, d, Ci(d.type, a), c);
                  break a;
              }
              throw Error(p(
                306,
                d,
                ""
              ));
            }
            return b;
          case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
          case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
          case 3:
            a: {
              kj(b);
              if (null === a) throw Error(p(387));
              d = b.pendingProps;
              f = b.memoizedState;
              e = f.element;
              lh(a, b);
              qh(b, d, null, c);
              var g = b.memoizedState;
              d = g.element;
              if (f.isDehydrated) if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
                e = Ji(Error(p(423)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else if (d !== e) {
                e = Ji(Error(p(424)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
              else {
                Ig();
                if (d === e) {
                  b = Zi(a, b, c);
                  break a;
                }
                Xi(a, b, d, c);
              }
              b = b.child;
            }
            return b;
          case 5:
            return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
          case 6:
            return null === a && Eg(b), null;
          case 13:
            return oj(a, b, c);
          case 4:
            return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
          case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
          case 7:
            return Xi(a, b, b.pendingProps, c), b.child;
          case 8:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 12:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 10:
            a: {
              d = b.type._context;
              e = b.pendingProps;
              f = b.memoizedProps;
              g = e.value;
              G(Wg, d._currentValue);
              d._currentValue = g;
              if (null !== f) if (He(f.value, g)) {
                if (f.children === e.children && !Wf.current) {
                  b = Zi(a, b, c);
                  break a;
                }
              } else for (f = b.child, null !== f && (f.return = b); null !== f; ) {
                var h = f.dependencies;
                if (null !== h) {
                  g = f.child;
                  for (var k = h.firstContext; null !== k; ) {
                    if (k.context === d) {
                      if (1 === f.tag) {
                        k = mh(-1, c & -c);
                        k.tag = 2;
                        var l = f.updateQueue;
                        if (null !== l) {
                          l = l.shared;
                          var m = l.pending;
                          null === m ? k.next = k : (k.next = m.next, m.next = k);
                          l.pending = k;
                        }
                      }
                      f.lanes |= c;
                      k = f.alternate;
                      null !== k && (k.lanes |= c);
                      bh(
                        f.return,
                        c,
                        b
                      );
                      h.lanes |= c;
                      break;
                    }
                    k = k.next;
                  }
                } else if (10 === f.tag) g = f.type === b.type ? null : f.child;
                else if (18 === f.tag) {
                  g = f.return;
                  if (null === g) throw Error(p(341));
                  g.lanes |= c;
                  h = g.alternate;
                  null !== h && (h.lanes |= c);
                  bh(g, c, b);
                  g = f.sibling;
                } else g = f.child;
                if (null !== g) g.return = f;
                else for (g = f; null !== g; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  f = g.sibling;
                  if (null !== f) {
                    f.return = g.return;
                    g = f;
                    break;
                  }
                  g = g.return;
                }
                f = g;
              }
              Xi(a, b, e.children, c);
              b = b.child;
            }
            return b;
          case 9:
            return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
          case 14:
            return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
          case 15:
            return bj(a, b, b.type, b.pendingProps, c);
          case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
          case 19:
            return xj(a, b, c);
          case 22:
            return dj(a, b, c);
        }
        throw Error(p(156, b.tag));
      };
      function Fk(a, b) {
        return ac(a, b);
      }
      function $k(a, b, c, d) {
        this.tag = a;
        this.key = c;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function Bg(a, b, c, d) {
        return new $k(a, b, c, d);
      }
      function aj(a) {
        a = a.prototype;
        return !(!a || !a.isReactComponent);
      }
      function Zk(a) {
        if ("function" === typeof a) return aj(a) ? 1 : 0;
        if (void 0 !== a && null !== a) {
          a = a.$$typeof;
          if (a === Da) return 11;
          if (a === Ga) return 14;
        }
        return 2;
      }
      function Pg(a, b) {
        var c = a.alternate;
        null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
        c.flags = a.flags & 14680064;
        c.childLanes = a.childLanes;
        c.lanes = a.lanes;
        c.child = a.child;
        c.memoizedProps = a.memoizedProps;
        c.memoizedState = a.memoizedState;
        c.updateQueue = a.updateQueue;
        b = a.dependencies;
        c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
        c.sibling = a.sibling;
        c.index = a.index;
        c.ref = a.ref;
        return c;
      }
      function Rg(a, b, c, d, e, f) {
        var g = 2;
        d = a;
        if ("function" === typeof a) aj(a) && (g = 1);
        else if ("string" === typeof a) g = 5;
        else a: switch (a) {
          case ya:
            return Tg(c.children, e, f, b);
          case za:
            g = 8;
            e |= 8;
            break;
          case Aa:
            return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
          case Ea:
            return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
          case Fa:
            return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
          case Ia:
            return pj(c, e, f, b);
          default:
            if ("object" === typeof a && null !== a) switch (a.$$typeof) {
              case Ba:
                g = 10;
                break a;
              case Ca:
                g = 9;
                break a;
              case Da:
                g = 11;
                break a;
              case Ga:
                g = 14;
                break a;
              case Ha:
                g = 16;
                d = null;
                break a;
            }
            throw Error(p(130, null == a ? a : typeof a, ""));
        }
        b = Bg(g, c, b, e);
        b.elementType = a;
        b.type = d;
        b.lanes = f;
        return b;
      }
      function Tg(a, b, c, d) {
        a = Bg(7, a, d, b);
        a.lanes = c;
        return a;
      }
      function pj(a, b, c, d) {
        a = Bg(22, a, d, b);
        a.elementType = Ia;
        a.lanes = c;
        a.stateNode = { isHidden: false };
        return a;
      }
      function Qg(a, b, c) {
        a = Bg(6, a, null, b);
        a.lanes = c;
        return a;
      }
      function Sg(a, b, c) {
        b = Bg(4, null !== a.children ? a.children : [], a.key, b);
        b.lanes = c;
        b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
        return b;
      }
      function al(a, b, c, d, e) {
        this.tag = b;
        this.containerInfo = a;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.pendingContext = this.context = null;
        this.callbackPriority = 0;
        this.eventTimes = zc(0);
        this.expirationTimes = zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = zc(0);
        this.identifierPrefix = d;
        this.onRecoverableError = e;
        this.mutableSourceEagerHydrationData = null;
      }
      function bl(a, b, c, d, e, f, g, h, k) {
        a = new al(a, b, c, h, k);
        1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
        f = Bg(3, null, null, b);
        a.current = f;
        f.stateNode = a;
        f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        kh(f);
        return a;
      }
      function cl(a, b, c) {
        var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
      }
      function dl(a) {
        if (!a) return Vf;
        a = a._reactInternals;
        a: {
          if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
          var b = a;
          do {
            switch (b.tag) {
              case 3:
                b = b.stateNode.context;
                break a;
              case 1:
                if (Zf(b.type)) {
                  b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                  break a;
                }
            }
            b = b.return;
          } while (null !== b);
          throw Error(p(171));
        }
        if (1 === a.tag) {
          var c = a.type;
          if (Zf(c)) return bg(a, c, b);
        }
        return b;
      }
      function el(a, b, c, d, e, f, g, h, k) {
        a = bl(c, d, true, a, e, f, g, h, k);
        a.context = dl(null);
        c = a.current;
        d = R();
        e = yi(c);
        f = mh(d, e);
        f.callback = void 0 !== b && null !== b ? b : null;
        nh(c, f, e);
        a.current.lanes = e;
        Ac(a, e, d);
        Dk(a, d);
        return a;
      }
      function fl(a, b, c, d) {
        var e = b.current, f = R(), g = yi(e);
        c = dl(c);
        null === b.context ? b.context = c : b.pendingContext = c;
        b = mh(f, g);
        b.payload = { element: a };
        d = void 0 === d ? null : d;
        null !== d && (b.callback = d);
        a = nh(e, b, g);
        null !== a && (gi(a, e, g, f), oh(a, e, g));
        return g;
      }
      function gl(a) {
        a = a.current;
        if (!a.child) return null;
        switch (a.child.tag) {
          case 5:
            return a.child.stateNode;
          default:
            return a.child.stateNode;
        }
      }
      function hl(a, b) {
        a = a.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          var c = a.retryLane;
          a.retryLane = 0 !== c && c < b ? c : b;
        }
      }
      function il(a, b) {
        hl(a, b);
        (a = a.alternate) && hl(a, b);
      }
      function jl() {
        return null;
      }
      var kl = "function" === typeof reportError ? reportError : function(a) {
        console.error(a);
      };
      function ll(a) {
        this._internalRoot = a;
      }
      ml.prototype.render = ll.prototype.render = function(a) {
        var b = this._internalRoot;
        if (null === b) throw Error(p(409));
        fl(a, b, null, null);
      };
      ml.prototype.unmount = ll.prototype.unmount = function() {
        var a = this._internalRoot;
        if (null !== a) {
          this._internalRoot = null;
          var b = a.containerInfo;
          Rk(function() {
            fl(null, a, null, null);
          });
          b[uf] = null;
        }
      };
      function ml(a) {
        this._internalRoot = a;
      }
      ml.prototype.unstable_scheduleHydration = function(a) {
        if (a) {
          var b = Hc();
          a = { blockedOn: null, target: a, priority: b };
          for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
          Qc.splice(c, 0, a);
          0 === c && Vc(a);
        }
      };
      function nl(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
      }
      function ol(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
      }
      function pl() {
      }
      function ql(a, b, c, d, e) {
        if (e) {
          if ("function" === typeof d) {
            var f = d;
            d = function() {
              var a2 = gl(g);
              f.call(a2);
            };
          }
          var g = el(b, d, a, 0, null, false, false, "", pl);
          a._reactRootContainer = g;
          a[uf] = g.current;
          sf(8 === a.nodeType ? a.parentNode : a);
          Rk();
          return g;
        }
        for (; e = a.lastChild; ) a.removeChild(e);
        if ("function" === typeof d) {
          var h = d;
          d = function() {
            var a2 = gl(k);
            h.call(a2);
          };
        }
        var k = bl(a, 0, false, null, null, false, false, "", pl);
        a._reactRootContainer = k;
        a[uf] = k.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        Rk(function() {
          fl(b, k, c, d);
        });
        return k;
      }
      function rl(a, b, c, d, e) {
        var f = c._reactRootContainer;
        if (f) {
          var g = f;
          if ("function" === typeof e) {
            var h = e;
            e = function() {
              var a2 = gl(g);
              h.call(a2);
            };
          }
          fl(b, g, a, e);
        } else g = ql(c, b, a, e, d);
        return gl(g);
      }
      Ec = function(a) {
        switch (a.tag) {
          case 3:
            var b = a.stateNode;
            if (b.current.memoizedState.isDehydrated) {
              var c = tc(b.pendingLanes);
              0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
            }
            break;
          case 13:
            Rk(function() {
              var b2 = ih(a, 1);
              if (null !== b2) {
                var c2 = R();
                gi(b2, a, 1, c2);
              }
            }), il(a, 1);
        }
      };
      Fc = function(a) {
        if (13 === a.tag) {
          var b = ih(a, 134217728);
          if (null !== b) {
            var c = R();
            gi(b, a, 134217728, c);
          }
          il(a, 134217728);
        }
      };
      Gc = function(a) {
        if (13 === a.tag) {
          var b = yi(a), c = ih(a, b);
          if (null !== c) {
            var d = R();
            gi(c, a, b, d);
          }
          il(a, b);
        }
      };
      Hc = function() {
        return C;
      };
      Ic = function(a, b) {
        var c = C;
        try {
          return C = a, b();
        } finally {
          C = c;
        }
      };
      yb = function(a, b, c) {
        switch (b) {
          case "input":
            bb(a, c);
            b = c.name;
            if ("radio" === c.type && null != b) {
              for (c = a; c.parentNode; ) c = c.parentNode;
              c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
              for (b = 0; b < c.length; b++) {
                var d = c[b];
                if (d !== a && d.form === a.form) {
                  var e = Db(d);
                  if (!e) throw Error(p(90));
                  Wa(d);
                  bb(d, e);
                }
              }
            }
            break;
          case "textarea":
            ib(a, c);
            break;
          case "select":
            b = c.value, null != b && fb(a, !!c.multiple, b, false);
        }
      };
      Gb = Qk;
      Hb = Rk;
      var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] };
      var tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
      var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
        a = Zb(a);
        return null === a ? null : a.stateNode;
      }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!vl.isDisabled && vl.supportsFiber) try {
          kc = vl.inject(ul), lc = vl;
        } catch (a) {
        }
      }
      var vl;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
      exports.createPortal = function(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!nl(b)) throw Error(p(200));
        return cl(a, b, null, c);
      };
      exports.createRoot = function(a, b) {
        if (!nl(a)) throw Error(p(299));
        var c = false, d = "", e = kl;
        null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
        b = bl(a, 1, false, null, null, c, false, d, e);
        a[uf] = b.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        return new ll(b);
      };
      exports.findDOMNode = function(a) {
        if (null == a) return null;
        if (1 === a.nodeType) return a;
        var b = a._reactInternals;
        if (void 0 === b) {
          if ("function" === typeof a.render) throw Error(p(188));
          a = Object.keys(a).join(",");
          throw Error(p(268, a));
        }
        a = Zb(b);
        a = null === a ? null : a.stateNode;
        return a;
      };
      exports.flushSync = function(a) {
        return Rk(a);
      };
      exports.hydrate = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, true, c);
      };
      exports.hydrateRoot = function(a, b, c) {
        if (!nl(a)) throw Error(p(405));
        var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
        null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
        b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
        a[uf] = b.current;
        sf(a);
        if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
          c,
          e
        );
        return new ml(b);
      };
      exports.render = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, false, c);
      };
      exports.unmountComponentAtNode = function(a) {
        if (!ol(a)) throw Error(p(40));
        return a._reactRootContainer ? (Rk(function() {
          rl(null, null, a, false, function() {
            a._reactRootContainer = null;
            a[uf] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Qk;
      exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
        if (!ol(c)) throw Error(p(200));
        if (null == a || void 0 === a._reactInternals) throw Error(p(38));
        return rl(a, b, c, false, d);
      };
      exports.version = "18.3.1-next-f1338f8080-20240426";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports) {
      "use strict";
      var m = require_react_dom();
      if (true) {
        exports.createRoot = m.createRoot;
        exports.hydrateRoot = m.hydrateRoot;
      } else {
        i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function(c, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.createRoot(c, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function(c, h, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.hydrateRoot(c, h, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
      }
      var i;
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.production.min.js
  var require_react_jsx_runtime_production_min = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
      "use strict";
      var f = require_react();
      var k = Symbol.for("react.element");
      var l = Symbol.for("react.fragment");
      var m = Object.prototype.hasOwnProperty;
      var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
      var p = { key: true, ref: true, __self: true, __source: true };
      function q(c, a, g) {
        var b, d = {}, e = null, h = null;
        void 0 !== g && (e = "" + g);
        void 0 !== a.key && (e = "" + a.key);
        void 0 !== a.ref && (h = a.ref);
        for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
        if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
        return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
      }
      exports.Fragment = l;
      exports.jsx = q;
      exports.jsxs = q;
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_jsx_runtime_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // preview-entry.jsx
  var import_react2 = __toESM(require_react(), 1);
  var import_client = __toESM(require_client(), 1);

  // ut_app_basecode.jsx
  var import_react = __toESM(require_react(), 1);
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var AuthContext = (0, import_react.createContext)(null);
  var useAuth = () => (0, import_react.useContext)(AuthContext);
  var SENIOR_ROLES = ["bn_cdr", "xo", "ops", "sel"];
  var isSenior = (u) => u && SENIOR_ROLES.includes(u.role);
  var isCoC = (u) => u && [...SENIOR_ROLES, "co_cdr", "plt_cdr", "adj"].includes(u.role);
  var isBigFour = (u) => normalizeCompany(u?.company) === "BN" && ["bn_cdr", "xo", "ops", "sel"].includes(u?.role);
  var ROLE_DISPLAY = { bn_cdr: "BNCO", xo: "BNXO", ops: "OPS", sel: "SEL", co_cdr: "CC", plt_cdr: "PC", adj: "ADJ" };
  var displayRole = (role) => ROLE_DISPLAY[role] || role.replace("_", " ").toUpperCase();
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
  function getRosterDescriptor(user) {
    const company = normalizeCompany(user.company);
    const coLabel = formatCompanyCoLabel(company);
    if (company === "BN") {
      if (user.role === "bn_cdr") return "BNCO";
      if (user.role === "xo") return "BNXO";
      if (user.role === "ops") return "OPS";
      if (user.role === "sel") return "SEL";
      return user.billet ? `BN \xB7 ${user.billet}` : "BN";
    }
    if (user.role === "co_cdr") return `${coLabel} \xB7 CC`;
    if (user.role === "sel") return `${coLabel} \xB7 SEL`;
    const pltOrdinal = (user.platoon || "").replace(/\s*(?:PC|PLT)$/i, "").trim();
    if (user.role === "plt_cdr") {
      return pltOrdinal ? `${coLabel} \xB7 ${pltOrdinal} PLT PC` : `${coLabel} \xB7 PC`;
    }
    if (pltOrdinal && pltOrdinal !== "CO" && pltOrdinal !== "SEL") {
      return `${coLabel} \xB7 ${pltOrdinal} PLT`;
    }
    return coLabel;
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
  function getPlatoonSortValue(platoon) {
    const match = normalizePlatoon(platoon).match(/^(\d+)/);
    return match ? Number(match[1]) : 99;
  }
  var ROSTER_COMPANY_ORDER = ["BN", "Alpha", "Bravo", "Charlie"];
  var BN_ROSTER_ASSIGNMENT_ORDER = ["BNCO", "BNXO", "OPS", "SEL", "PTO", "ADJ", "SUPPO", "PAO", "TRAINO", "AO", "BGDO", "CGC", "AOPS", "MIR"];
  function getRosterAssignment(user) {
    const billet = getBilletLabel(user);
    if (billet) return billet;
    const platoon = normalizePlatoon(user.platoon);
    if (platoon === "CO" || user.role === "co_cdr") return "CO";
    if (platoon === "SEL" || user.role === "sel") return "SEL";
    if (platoon) return platoon;
    return "\u2014";
  }
  function compareRoster(a, b) {
    const ac = normalizeCompany(a.company), bc = normalizeCompany(b.company);
    const co = ROSTER_COMPANY_ORDER.indexOf(ac) - ROSTER_COMPANY_ORDER.indexOf(bc);
    if (co !== 0) return co;
    if (ac === "BN") {
      const ai = BN_ROSTER_ASSIGNMENT_ORDER.indexOf(getRosterAssignment(a));
      const bi = BN_ROSTER_ASSIGNMENT_ORDER.indexOf(getRosterAssignment(b));
      const d = (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      if (d !== 0) return d;
      return getNameKey(a.name).localeCompare(getNameKey(b.name));
    }
    if (a.role === "co_cdr" && b.role !== "co_cdr") return -1;
    if (b.role === "co_cdr" && a.role !== "co_cdr") return 1;
    if (a.role === "sel" && b.role !== "sel") return -1;
    if (b.role === "sel" && a.role !== "sel") return 1;
    const pd = getPlatoonSortValue(a.platoon) - getPlatoonSortValue(b.platoon);
    if (pd !== 0) return pd;
    if (a.role === "plt_cdr" && b.role !== "plt_cdr") return -1;
    if (b.role === "plt_cdr" && a.role !== "plt_cdr") return 1;
    return getNameKey(a.name).localeCompare(getNameKey(b.name));
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
      approverName: person ? `${person.rank} ${person.name}` : label,
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
        makeChitChainNode("BNXO", "BNXO Review", bnxo, "xo", "\u{1F948}"),
        makeChitChainNode("BNCO", "BNCO Approval", bnco, "bn_cdr", "\u{1F947}")
      );
    } else if (user.role === "co_cdr") {
      chain.push(
        makeChitChainNode("ADJ", "ADJ Review", adj, "adj", "\u270F\uFE0F"),
        makeChitChainNode("BNXO", "BNXO Review", bnxo, "xo", "\u{1F948}"),
        makeChitChainNode("BNCO", "BNCO Approval", bnco, "bn_cdr", "\u{1F947}")
      );
    } else if (user.role === "plt_cdr") {
      chain.push(
        makeChitChainNode(`${getCompanyShortName(company)} CC`, "CC Review", cc, "co_cdr", "\u2B50"),
        makeChitChainNode("ADJ", "ADJ Review", adj, "adj", "\u270F\uFE0F"),
        makeChitChainNode("BNXO", "BNXO Review", bnxo, "xo", "\u{1F948}"),
        makeChitChainNode("BNCO", "BNCO Approval", bnco, "bn_cdr", "\u{1F947}")
      );
    } else {
      chain.push(
        makeChitChainNode(formatPlatoonLabel(platoon), "PC Review", pc, "plt_cdr", "\u{1F464}"),
        makeChitChainNode(`${getCompanyShortName(company)} CC`, "CC Review", cc, "co_cdr", "\u2B50"),
        makeChitChainNode("ADJ", "ADJ Review", adj, "adj", "\u270F\uFE0F"),
        makeChitChainNode("BNXO", "BNXO Review", bnxo, "xo", "\u{1F948}"),
        makeChitChainNode("BNCO", "BNCO Approval", bnco, "bn_cdr", "\u{1F947}")
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
      { name: "Complete", routeLabel: "", approverId: null, approverRole: null, approverName: "", icon: "\u2705", completedBy: null, completedAt: null, comment: "" }
    ];
  }
  var DEFAULT_NOTIF_PREFS = {
    notif_submission: true,
    // "A new CHIT/FITREP was submitted and needs your review"
    notif_approval: true,
    // "A CHIT/FITREP has advanced and now needs your review"
    notif_return: true,
    // "Your CHIT/FITREP was returned"
    notif_complete: true,
    // "Your CHIT/FITREP was fully approved"
    notif_announcement: true,
    // BN announcements
    reminder_days: 1
    // Business days before follow-up reminder
  };
  function loadNotifPrefs(userId) {
    try {
      const raw = localStorage.getItem("qd_notif_" + userId);
      if (raw) return { ...DEFAULT_NOTIF_PREFS, ...JSON.parse(raw) };
    } catch (e) {
    }
    return { ...DEFAULT_NOTIF_PREFS };
  }
  function saveNotifPrefs(userId, prefs) {
    localStorage.setItem("qd_notif_" + userId, JSON.stringify(prefs));
  }
  function sendNotification(to, subject, body, notifType, recipientId) {
    if (!to || !SHEETS_API_URL) return;
    if (recipientId && notifType) {
      const prefs = loadNotifPrefs(recipientId);
      const key = "notif_" + notifType;
      if (prefs[key] === false) return;
    }
    fetch(SHEETS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ token: SHEETS_API_TOKEN, action: "notify", to, subject, body })
    }).catch(() => {
    });
  }
  function trackApproval(id, type, approverEmail, approverName, submitterName, reminderDays) {
    if (!SHEETS_API_URL) return;
    fetch(SHEETS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ token: SHEETS_API_TOKEN, action: "trackApproval", id, type, approverEmail, approverName, submitterName, reminderDays: reminderDays || 1 })
    }).catch(() => {
    });
  }
  function clearApproval(id) {
    if (!SHEETS_API_URL) return;
    fetch(SHEETS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ token: SHEETS_API_TOKEN, action: "clearApproval", id })
    }).catch(() => {
    });
  }
  function getUserEmail(userList, userId) {
    const u = userList.find((u2) => u2.id === userId);
    return u?.email || "";
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
  var GCAL_API_KEY = window.__QD_GCAL_API_KEY || "";
  var GCAL_CALENDAR_ID = "8favdaqbd14bfquur8fvil5ecc@group.calendar.google.com";
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
  function formatEventTime(isoStr) {
    if (!isoStr) return "";
    const d = new Date(isoStr);
    return `${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}`;
  }
  function guessEventType(title) {
    const t = (title || "").toLowerCase();
    if (/\bpt\b|run|fep|drill/.test(t)) return "PT";
    if (/fitrep|chit|inspection/.test(t)) return "Admin";
    if (/leadership|leadlab|\bll\b/.test(t)) return "Leadership";
    if (/tutor|calculus|physics/.test(t)) return "Academic";
    if (/staff|meeting|sync/.test(t)) return "Staff";
    if (/conference/.test(t)) return "Conference";
    return "Event";
  }
  var MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  function fetchCalendarEvents() {
    if (!GCAL_API_KEY || !GCAL_CALENDAR_ID) return Promise.resolve([]);
    const now = /* @__PURE__ */ new Date();
    const maxDate = new Date(now);
    maxDate.setDate(maxDate.getDate() + 14);
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GCAL_CALENDAR_ID)}/events?key=${GCAL_API_KEY}&timeMin=${now.toISOString()}&timeMax=${maxDate.toISOString()}&singleEvents=true&orderBy=startTime&maxResults=20`;
    return fetch(url).then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    }).then(
      (data) => (data.items || []).filter((ev) => !/^potw$/i.test((ev.summary || "").trim())).map((ev) => {
        const allDay = !!ev.start.date;
        const start = new Date(ev.start.dateTime || ev.start.date);
        const end = ev.end ? new Date(ev.end.dateTime || ev.end.date) : null;
        const dd = String(start.getDate()).padStart(2, "0");
        const mo = MONTHS[start.getMonth()];
        const time = allDay ? "All Day" : `${formatEventTime(ev.start.dateTime)}\u2013${end ? formatEventTime(ev.end.dateTime) : ""}`;
        return {
          date: `${dd} ${mo}`,
          title: ev.summary || "(No title)",
          time,
          type: guessEventType(ev.summary),
          location: ev.location || ""
        };
      })
    ).catch(() => []);
  }
  function useCalendarEvents() {
    const [events, setEvents] = (0, import_react.useState)([]);
    (0, import_react.useEffect)(() => {
      fetchCalendarEvents().then(setEvents);
    }, []);
    return events;
  }
  var POTW = {
    operations: [
      { date: "06 APR", title: "Battalion PT", time: "0700\u20130800", type: "PT", location: "" },
      { date: "07 APR", title: "Navy LL: RADM Oliver Lewis", time: "0700\u20130900", type: "Leadership", location: "" },
      { date: "07 APR", title: "FEX Prep", time: "0700\u20130800", type: "Admin", location: "" },
      { date: "07 APR", title: "Calculus/Physics Tutoring", time: "1900\u20132000", type: "Academic", location: "" },
      { date: "08 APR", title: "Navy Company PT", time: "0700\u20130800", type: "PT", location: "" },
      { date: "09 APR", title: "Spring FEX", time: "All Day", type: "Event", location: "" },
      { date: "09 APR", title: "FEP", time: "0700\u20130800", type: "PT", location: "" },
      { date: "09 APR", title: "BN Staff Meeting", time: "1530\u20131630", type: "Staff", location: "" },
      { date: "10 APR", title: "Drill", time: "0700\u20130800", type: "Drill", location: "" },
      { date: "10 APR", title: "Unit Sync Meeting", time: "1000\u20131100", type: "Staff", location: "" }
    ]
  };
  var LEADLAB_INIT = [];
  var PT_SESSIONS = [
    { key: "monday", day: "Monday", type: "BN PT", desc: "Battalion-wide formation PT", color: "#BF5700" },
    { key: "wednesday", day: "Wednesday", type: "Company PT", desc: "Company-level physical training", color: "#003087" },
    { key: "thursday", day: "Thursday", type: "FEP", desc: "Fitness Enhancement Program", color: "#2A7D4F" }
  ];
  var INIT_CHITS = [];
  var INIT_QS = [];
  var SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbxRuo1IKB2TQSfHpGIZ7bxD96tCXjNHlwf5T-5wb348xAoq7IXS_VgdWoOdD9VKkSxi/exec";
  var SHEETS_API_TOKEN = "UT_NROTC";
  var ROSTER_CACHE_KEY = "quarterdeck_roster_cache_v1";
  function loadCachedRoster() {
    try {
      if (typeof window === "undefined" || !window.sessionStorage) return [];
      const raw = window.sessionStorage.getItem(ROSTER_CACHE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.every(
        (user) => user && typeof user === "object" && Object.prototype.hasOwnProperty.call(user, "name")
      ) ? parsed : [];
    } catch (err) {
      return [];
    }
  }
  function saveCachedRoster(users) {
    try {
      if (typeof window === "undefined" || !window.sessionStorage || !Array.isArray(users)) return;
      window.sessionStorage.setItem(ROSTER_CACHE_KEY, JSON.stringify(users));
    } catch (err) {
    }
  }
  try {
    window.localStorage.removeItem(ROSTER_CACHE_KEY);
  } catch (e) {
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
    const platoon = platoonMatch ? `${platoonMatch[1]} PLT` : /CC$/i.test(billetRaw) ? "CO" : /SEL$/i.test(billetRaw) ? "SEL" : billetRaw;
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
      email: (row.email || "").trim(),
      phone: (row.phone_number || row.phone || "").trim(),
      major: (row.major || "").trim(),
      campus: (row.campus || "").trim(),
      eid: (row.eid || "").trim(),
      billet: billetRaw
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
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow:wght@400;500;600&family=Oswald:wght@700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Barlow', "Segoe UI", sans-serif; font-size: 1rem; background: #FFF8F0; color: #1A1209; }

  .topbar { background: #1A1209; color: white; display: flex; align-items: center; justify-content: space-between; padding: 0 1.25rem; height: 58px; border-bottom: 3px solid #BF5700; position: sticky; top: 0; z-index: 50; }
  .topbar-logo { width: 40px; height: 40px; background: #BF5700; border-radius: 6px; display: grid; place-items: center; font-family: 'Rajdhani', Impact, sans-serif; font-weight: 700; font-size: 1.1rem; color: white; margin-right: 0.7rem; }
  .topbar-title { font-family: 'Rajdhani', Impact, sans-serif; font-weight: 500; font-size: 1.35rem; letter-spacing: 3px; text-transform: uppercase; }
  .topbar-title span { color: #F7941D; }
  .topbar-right { display: flex; align-items: center; gap: 0.75rem; }
  .rank-pill { background: #BF5700; color: white; padding: 2px 8px; border-radius: 4px; font-family: 'Rajdhani', Impact, sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
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
  .nav-btn.active .nav-structure-icon { color: #9ab0c4; font-weight: 400; }
  .sidebar-footer { padding: 1rem; border-top: 1px solid rgba(255,255,255,0.08); margin-top: auto; font-size: 0.75rem; color: #6b7e90; line-height: 1.6; }

  .content { flex: 1; padding: 1.5rem; overflow-y: auto; min-width: 0; }

  .page-title { font-family: 'Rajdhani', Impact, sans-serif; font-size: 2.1rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 0.2rem; }
  .page-title span { color: #BF5700; }
  .page-sub { font-size: 0.88rem; color: #6B6B6B; margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 2px solid rgba(191,87,0,0.15); }

  .card { background: white; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid rgba(191,87,0,0.1); margin-bottom: 1rem; }
  .card-title { font-family: 'Rajdhani', Impact, sans-serif; font-size: 0.9rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #1A1209; }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }

  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }

  .stat { background: white; border-radius: 10px; padding: 1rem 1.2rem; border-left: 4px solid #BF5700; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
  .stat-n { font-family: 'Rajdhani', Impact, sans-serif; font-size: 2.4rem; font-weight: 700; color: #BF5700; line-height: 1; }
  .stat-l { font-size: 0.78rem; color: #6B6B6B; text-transform: uppercase; letter-spacing: 1px; margin-top: 0.2rem; }

  .btn { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.9rem; border-radius: 6px; font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.8rem; letter-spacing: 0.5px; text-transform: uppercase; cursor: pointer; border: none; font-weight: 600; transition: all 0.15s; }
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
  .alert-announce { background: rgba(13,27,42,0.07); border-color: #0D1B2A; color: #0D1B2A; }
  .alert-green { background: rgba(42,125,79,0.1); border-color: #2A7D4F; color: #2A7D4F; }
  .alert-red { background: rgba(192,57,43,0.1); border-color: #C0392B; color: #C0392B; }
  .privacy-note { background: rgba(13,27,42,0.05); border: 1.5px solid rgba(13,27,42,0.15); border-radius: 8px; padding: 0.6rem 1rem; font-size: 0.82rem; color: #0D1B2A; margin-bottom: 1rem; }

  .potw-card { background: linear-gradient(135deg, #1A1209 0%, #0D1B2A 100%); color: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; }
  .potw-week { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.68rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #F7941D; margin-bottom: 0.4rem; }
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
  .company-name { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 1.05rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; }
  .company-co { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.78rem; font-style: normal; color: rgba(255,255,255,0.75); }
  .platoon-grid { padding: 1rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 0.75rem; }
  .platoon-card { border: 1.5px solid rgba(191,87,0,0.2); border-radius: 8px; padding: 0.75rem; }
  .platoon-name { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.95rem; font-weight: 700; font-style: normal; letter-spacing: 1.5px; color: #BF5700; margin-bottom: 0.35rem; }
  .platoon-detail { font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.78rem; font-style: normal; color: #6B6B6B; }

  .tab-bar { display:flex; border-bottom:2px solid #eee; margin-bottom:1.25rem; }
  .pt-session-card { background:white; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.06); border:1px solid rgba(191,87,0,0.1); padding:1.25rem; margin-bottom:1.25rem; }
  .pt-day-label { font-family:'Barlow', 'Segoe UI', sans-serif; font-size:1.05rem; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; }
  .pt-empty-state { text-align:center; padding:2.5rem 1rem; background:#faf8f5; border-radius:8px; border:2px dashed #e0d8d0; }
  .route-hint { background:#f5f2ee; border-radius:8px; padding:0.65rem; font-size:0.8rem; color:#666; margin-bottom:1rem; }
  .bn-leader-card { background:#f8f8f8; border-radius:8px; padding:0.6rem 0.8rem; border-left:3px solid #BF5700; }
  .billet-card { display:flex; justify-content:space-between; align-items:center; padding:0.45rem 0.7rem; background:#f8f8f8; border-radius:6px; font-size:0.82rem; }

  .pt-block { background: white; border-radius: 8px; overflow: hidden; margin-bottom: 0.75rem; border: 1px solid #eee; }
  .pt-header { background: #BF5700; color: white; padding: 0.55rem 1rem; display: flex; align-items: center; justify-content: space-between; font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.9rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; }
  .pt-row { display: flex; align-items: center; gap: 1rem; padding: 0.4rem 1rem; border-bottom: 1px solid #faf7f4; font-size: 0.85rem; }
  .pt-name { flex: 1; font-weight: 500; }
  .pt-sets { color: #BF5700; font-weight: 600; font-size: 0.82rem; min-width: 80px; }
  .pt-notes { color: #888; font-size: 0.78rem; }

  .folder-section { margin-bottom: 1rem; }
  .folder-header { cursor: pointer; padding: 0.65rem 1rem; background: #1A1209; color: white; border-radius: 8px; font-family: 'Barlow', 'Segoe UI', sans-serif; font-size: 0.88rem; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 0.5rem; user-select: none; }
  .folder-header:hover { background: #2a1f14; }
  .chit-card { border-left: 4px solid #BF5700; padding: 1rem; background: white; border-radius: 8px; margin-bottom: 0.75rem; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
  .chit-route { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.5rem; font-size: 0.78rem; }
  .chit-node { background: rgba(191,87,0,0.1); border-radius: 4px; padding: 2px 7px; color: #8B3D00; }

  .form-row { background: white; border-radius: 10px; padding: 1rem 1.2rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem; border: 1.5px solid #eee; flex-wrap: wrap; }
  .progress-bar { background: #eee; border-radius: 4px; height: 4px; margin-top: 4px; width: 60px; }
  .progress-fill { background: #BF5700; height: 100%; border-radius: 4px; }

  .roster-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.7rem 0; border-bottom: 1px solid #f4f0eb; flex-wrap: wrap; }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: #BF5700; color: white; display: flex; align-items: center; justify-content: center; font-family: 'Barlow', 'Segoe UI', sans-serif; font-weight: 700; font-style: normal; font-size: 0.82rem; flex-shrink: 0; }

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
  .login-card { background: white; border-radius: 14px; padding: 2.75rem 2.5rem; max-width: 480px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .login-logo { display: flex; align-items: center; gap: 0.75rem; justify-content: center; margin-bottom: 1.25rem; }
  .login-mark { width: 56px; height: 56px; background: #BF5700; border-radius: 10px; display: grid; place-items: center; font-family: 'Oswald', Impact, sans-serif; font-weight: 700; font-size: 1.5rem; color: white; }
  .login-title { font-family: 'Oswald', Impact, sans-serif; font-size: 1.75rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; }
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
  .stage-track { display: flex; align-items: flex-start; gap: 0; margin: 1rem 0; overflow-x: auto; padding-top: 0.6rem; padding-bottom: 0.25rem; }
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
  .stage-label { font-size:0.65rem; text-align:center; margin-top:0.35rem; text-transform:uppercase; letter-spacing:0.5px; line-height:1.3; color:#888; font-family:'Barlow','Segoe UI',sans-serif; }
  .stage-label.active   { color:#BF5700; font-weight:700; }
  .stage-label.done     { color:#2A7D4F; }
  .stage-label.returned { color:#9b1c1c; font-weight:700; }
  .stage-approver { font-size:0.6rem; color:#aaa; text-align:center; }
  .stage-approver.active { color:#BF5700; }

  .fitrep-card { background:white; border-radius:10px; border:1.5px solid #eee; margin-bottom:1rem; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05); }
  .fitrep-header { padding:0.9rem 1.2rem; border-bottom:1px solid #f5f2ee; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; }
  .fitrep-body { padding:1rem 1.2rem; }
  .stage-comment { background:#f8f6f2; border-left:3px solid #2A7D4F; border-radius:0 6px 6px 0; padding:0.5rem 0.75rem; margin-top:0.4rem; font-size:0.82rem; }
  .stage-comment-by { font-size:0.72rem; color:#2A7D4F; font-weight:600; margin-bottom:0.2rem; font-family:'Barlow','Segoe UI',sans-serif; letter-spacing:0.5px; text-transform:uppercase; }
  .active-stage-comment { background:#fff9f5; border-left:3px solid #BF5700; border-radius:0 6px 6px 0; padding:0.5rem 0.75rem; margin-top:0.4rem; font-size:0.82rem; }
  .stage-action-box { background:#fff9f5; border:1.5px solid rgba(191,87,0,0.2); border-radius:8px; padding:0.9rem; margin-top:0.75rem; }
  .stage-action-label { font-family:'Barlow','Segoe UI',sans-serif; font-size:0.72rem; letter-spacing:1.5px; text-transform:uppercase; color:#BF5700; margin-bottom:0.5rem; }

  /* \u2500\u2500 ACCOUNT MODAL \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .acct-field { display:flex; align-items:center; gap:0.75rem; padding:0.55rem 0; border-bottom:1px solid #f5f2ee; font-size:0.88rem; }
  .acct-label { font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#888; min-width:90px; }
  .first-login-banner { background:rgba(191,87,0,0.1); border:1.5px solid #BF5700; border-radius:8px; padding:0.75rem 1rem; margin-bottom:1.25rem; font-size:0.85rem; color:#8B3D00; }

  /* \u2500\u2500 DARK MODE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .dark body, body.dark { background:#0f1117; color:#d4d4d8; }
  .dark .content { background:#0f1117; }
  .dark .card, .dark .stat, .dark .chit-card, .dark .fitrep-card, .dark .q-card, .dark .form-row, .dark .pt-block, .dark .platoon-card { background:#1a1b23; border-color:#2a2b35; color:#d4d4d8; }
  .dark .card-title { color:#d4d4d8; }
  .dark .stat { border-left-color:#BF5700; }
  .dark .page-title { color:#d4d4d8; }
  .dark .stat-l, .dark .event-sub, .dark .page-sub { color:#8b8b96; }
  .dark .input { background:#1a1b23; border-color:#2a2b35; color:#d4d4d8; color-scheme:dark; }
  .dark .input:focus { border-color:#BF5700; }
  .dark .alert { background:rgba(191,87,0,0.12); border-color:#BF5700; color:#e8a065; }
  .dark .alert-announce { background:rgba(191,87,0,0.12); border-color:#BF5700; color:#d4d4d8; }
  .dark .alert-green { background:rgba(42,125,79,0.15); border-color:#2A7D4F; color:#5cb882; }
  .dark .alert-red { background:rgba(192,57,43,0.15); border-color:#C0392B; color:#e06050; }
  .dark .event-row { border-bottom-color:#2a2b35; }
  .dark .roster-row { border-bottom-color:#2a2b35; }
  .dark .acct-field { border-bottom-color:#2a2b35; }
  .dark .modal { background:#1a1b23; color:#d4d4d8; }
  .dark .modal-close { color:#8b8b96; }
  .dark .folder-header { background:#1a1b23; }
  .dark .folder-header:hover { background:#22232e; }
  .dark .stage-action-box { background:#15161e; border-color:rgba(191,87,0,0.3); }
  .dark .stage-comment { background:#15161e; }
  .dark .active-stage-comment { background:#1a1209; }
  .dark .privacy-note { background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.1); color:#aaa; }
  .dark .page-sub { border-bottom-color:rgba(191,87,0,0.2); }
  .dark .company-block { background:#1a1b23; }
  .dark .platoon-grid { background:#1a1b23; }
  .dark .hint-box { background:#1a1b23; color:#8b8b96; }
  .dark .btn-outline { border-color:#BF5700; color:#e8a065; }
  .dark .btn-outline:hover { background:#BF5700; color:white; }
  .dark .divider { border-top-color:#2a2b35; }
  .dark .chit-node { background:rgba(191,87,0,0.15); color:#e8a065; }
  .dark .badge-orange { background:rgba(191,87,0,0.2); color:#e8a065; }
  .dark .badge-green { background:rgba(42,125,79,0.2); color:#5cb882; }
  .dark .badge-red { background:rgba(192,57,43,0.2); color:#e06050; }
  .dark .badge-navy { background:rgba(255,255,255,0.08); color:#9ab0c4; }
  .dark .badge-gray { background:#2a2b35; color:#8b8b96; }
  .dark .tag { background:rgba(191,87,0,0.15); color:#e8a065; }
  .dark .fitrep-header { border-bottom-color:#2a2b35; }
  .dark .tab-bar { border-bottom-color:#2a2b35; }
  .dark .pt-session-card { background:#1a1b23; border-color:#2a2b35; box-shadow:none; }
  .dark .pt-day-label { color:#d4d4d8; }
  .dark .pt-empty-state { background:#15161e; border-color:#2a2b35; color:#8b8b96; }
  .dark .pt-empty-state div { color:#8b8b96; }
  .dark .route-hint { background:#15161e; color:#8b8b96; }
  .dark .bn-leader-card { background:#15161e; color:#d4d4d8; }
  .dark .billet-card { background:#15161e; color:#d4d4d8; }
  .dark .platoon-detail { color:#d4d4d8; }
  .dark .platoon-name { color:#e8a065; }
  .dark .stat-company-alpha { border-left-color:#c45555 !important; }
  .dark .stat-company-alpha .stat-n { color:#c45555 !important; }
  .dark .stat-company-bravo { border-left-color:#5580cc !important; }
  .dark .stat-company-bravo .stat-n { color:#5580cc !important; }
  .dark .stat-company-charlie { border-left-color:#d4a84b !important; }
  .dark .stat-company-charlie .stat-n { color:#d4a84b !important; }
  .dark .stage-dot { background:#1a1b23; border-color:#2a2b35; }
  .dark .stage-dot.pending { background:#15161e; border-color:#2a2b35; color:#555; }
  .dark .stat-chits { border-left-color:#9ab0c4 !important; }
  .dark .stat-chits .stat-n { color:#9ab0c4 !important; }

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
  function AccountModal({ onClose, darkMode, toggleDark }) {
    const { user } = useAuth();
    const showNotifSettings = isCoC(user);
    const [prefs, setPrefs] = (0, import_react.useState)(() => loadNotifPrefs(user.id));
    const togglePref = (key) => {
      setPrefs((prev) => {
        const next = { ...prev, [key]: !prev[key] };
        saveNotifPrefs(user.id, next);
        return next;
      });
    };
    const setReminderDays = (val) => {
      const days = Math.max(0, parseInt(val) || 0);
      setPrefs((prev) => {
        const next = { ...prev, reminder_days: days };
        saveNotifPrefs(user.id, next);
        return next;
      });
    };
    const NOTIF_OPTIONS = [
      { key: "notif_submission", label: "New CHIT/FITREP requires my review" },
      { key: "notif_approval", label: "CHIT/FITREP advanced to me" },
      { key: "notif_return", label: "My CHIT/FITREP was returned" },
      { key: "notif_complete", label: "My CHIT/FITREP was fully approved" },
      { key: "notif_announcement", label: "BN announcements" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, { title: "Account Information", onClose, children: [
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge badge-orange", children: displayRole(user.role) })
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "mailto:" + encodeURIComponent(user.email), style: { color: "#BF5700" }, children: user.email })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "acct-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "acct-label", children: "Phone" }),
        user.phone || "\u2014"
      ] }),
      showNotifSettings && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "1.25rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "'Rajdhani', Impact, sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "0.6rem" }, children: "Email Notifications" }),
        NOTIF_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.35rem 0", fontSize: "0.85rem", cursor: "pointer" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: prefs[opt.key], onChange: () => togglePref(opt.key), style: { accentColor: "#BF5700", width: "16px", height: "16px" } }),
          opt.label
        ] }, opt.key)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Follow-up reminder after" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "select",
            {
              className: "input",
              style: { width: "auto", padding: "0.25rem 0.5rem", fontSize: "0.85rem" },
              value: prefs.reminder_days,
              onChange: (e) => setReminderDays(e.target.value),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: 0, children: "Off" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: 1, children: "1 business day" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: 2, children: "2 business days" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: 3, children: "3 business days" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: 5, children: "5 business days" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.72rem", color: "#888", marginTop: "0.3rem" }, children: prefs.reminder_days === 0 ? "No follow-up reminders will be sent for items awaiting your approval." : `You'll receive a daily reminder if a CHIT/FITREP has been waiting ${prefs.reminder_days}+ business day${prefs.reminder_days !== 1 ? "s" : ""}.` })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "1.25rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "'Rajdhani', Impact, sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "0.6rem" }, children: "Appearance" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline", style: { width: "100%", justifyContent: "center", padding: "0.6rem 1rem", fontSize: "0.85rem" }, onClick: toggleDark, children: darkMode ? "\u2600\uFE0F Switch to Light Mode" : "\u{1F319} Switch to Dark Mode" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "1.25rem", display: "flex", gap: "0.75rem", justifyContent: "flex-end" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { className: "btn btn-outline", href: "https://docs.google.com/forms/d/e/1FAIpQLSfNKcFJ1qBd6HTxpnBxTFOY8Y0N3YZ0DkTN6BYmMA9QaE3_0w/viewform?usp=publish-editor", target: "_blank", rel: "noopener noreferrer", children: "Update My Email" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange", onClick: onClose, children: "Close" })
      ] })
    ] });
  }
  function LoginPage({ onLogin, userList, sheetSynced, sheetError, onRetry }) {
    const [name, setName] = (0, import_react.useState)("");
    const [err, setErr] = (0, import_react.useState)("");
    const [mfaStep, setMfaStep] = (0, import_react.useState)(false);
    const [mfaUser, setMfaUser] = (0, import_react.useState)(null);
    const [mfaCode, setMfaCode] = (0, import_react.useState)("");
    const [mfaLoading, setMfaLoading] = (0, import_react.useState)(false);
    const [mfaInfo, setMfaInfo] = (0, import_react.useState)("");
    const [mfaSentAt, setMfaSentAt] = (0, import_react.useState)(null);
    const [mfaExpired, setMfaExpired] = (0, import_react.useState)(false);
    const [mfaCountdown, setMfaCountdown] = (0, import_react.useState)(0);
    (0, import_react.useEffect)(() => {
      if (!mfaSentAt) return;
      const tick = () => {
        const remaining = Math.max(0, Math.ceil((mfaSentAt + 5 * 60 * 1e3 - Date.now()) / 1e3));
        setMfaCountdown(remaining);
        if (remaining <= 0) {
          setMfaExpired(true);
        }
      };
      tick();
      const id = setInterval(tick, 1e3);
      return () => clearInterval(id);
    }, [mfaSentAt]);
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
      if (!user.email) {
        setErr("No email on file. Contact ADJ to add your email.");
        return;
      }
      setErr("");
      setMfaLoading(true);
      fetch(SHEETS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ token: SHEETS_API_TOKEN, action: "sendMFA", email: user.email, name: `${user.rank} ${user.name}` })
      }).then((r) => r.json()).then((data) => {
        setMfaLoading(false);
        if (data.ok) {
          setMfaUser(user);
          setMfaStep(true);
          setMfaSentAt(Date.now());
          setMfaExpired(false);
          setMfaInfo("A 6-digit code was sent to " + user.email + ".");
        } else {
          setErr(data.error || "Failed to send verification code. Try again.");
        }
      }).catch(() => {
        setMfaLoading(false);
        setErr("Network error sending verification code. Check your connection.");
      });
    };
    const verifyCode = () => {
      if (mfaExpired) {
        setErr("Code expired. Please request a new one.");
        return;
      }
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
          setErr(data.error || "Verification failed. Try again or request a new code.");
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
          setMfaSentAt(Date.now());
          setMfaExpired(false);
          setMfaInfo("A new code was sent to " + mfaUser.email + ".");
        } else {
          setErr(data.error || "Failed to resend code.");
        }
      }).catch(() => {
        setMfaLoading(false);
        setErr("Network error. Check your connection.");
      });
    };
    const errorBanner = (msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "rgba(192,57,43,0.1)", border: "1.5px solid rgb(192,57,43)", borderRadius: "6px", padding: "0.55rem 0.9rem", fontSize: "0.84rem", color: "rgb(192,57,43)", marginBottom: "0.9rem" }, children: [
      "\u26A0 ",
      msg
    ] });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "login-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "login-card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "login-logo", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "login-mark", children: "UT" }),
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
        !sheetSynced && hasRoster && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: "rgba(191,87,0,0.08)", border: "1.5px solid #BF5700", borderRadius: "6px", padding: "0.65rem 1rem", fontSize: "0.84rem", color: "#BF5700", marginBottom: "0.9rem" }, children: "\u23F3 Pulling login details\u2026" }),
        sheetSynced && sheetError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { background: "rgba(192,57,43,0.1)", border: "1.5px solid #C0392B", borderRadius: "6px", padding: "0.65rem 1rem", fontSize: "0.84rem", color: "#C0392B", marginBottom: "0.9rem" }, children: [
          "\u26A0 Could not reach Google Sheets",
          hasRoster ? ". Using cached roster for now" : "",
          ". Check your connection and",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: onRetry, style: { background: "none", border: "none", color: "#C0392B", fontWeight: 700, textDecoration: "underline", cursor: "pointer", fontSize: "inherit", padding: 0 }, children: "retry" }),
          "."
        ] }),
        err && errorBanner(err),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", htmlFor: "login-username", children: "Last Name, Email, or EID" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              id: "login-username",
              name: "username",
              className: "input",
              autoComplete: "username",
              placeholder: locked ? "Waiting for roster sync\u2026" : "Last name, email, or EID",
              value: name,
              disabled: locked || mfaLoading,
              style: locked || mfaLoading ? { opacity: 0.45, cursor: "not-allowed" } : {},
              onChange: (e) => setName(e.target.value),
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
          "A verification code will be sent to your email on file."
        ] })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "login-sub", children: "Email verification" }),
        mfaInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: mfaExpired ? "rgba(192,57,43,0.1)" : "rgba(39,174,96,0.1)", border: mfaExpired ? "1.5px solid #C0392B" : "1.5px solid #27AE60", borderRadius: "6px", padding: "0.55rem 0.9rem", fontSize: "0.84rem", color: mfaExpired ? "#C0392B" : "#1e8449", marginBottom: "0.9rem" }, children: mfaExpired ? "\u26A0 Code expired. Please request a new one below." : `\u2709 ${mfaInfo} Expires in ${Math.floor(mfaCountdown / 60)}:${String(mfaCountdown % 60).padStart(2, "0")}` }),
        err && errorBanner(err),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", htmlFor: "login-mfa", children: "Verification Code" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              id: "login-mfa",
              name: "mfa-code",
              className: "input",
              type: "text",
              inputMode: "numeric",
              autoComplete: "one-time-code",
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
            style: { width: "100%", justifyContent: "center", marginTop: "0.25rem", opacity: mfaLoading || mfaExpired ? 0.45 : 1, cursor: mfaLoading || mfaExpired ? "not-allowed" : "pointer", fontFamily: "'Barlow', 'Segoe UI', sans-serif", letterSpacing: "normal", textTransform: "none" },
            disabled: mfaLoading || mfaExpired,
            onClick: verifyCode,
            children: mfaLoading ? "\u23F3 Verifying\u2026" : mfaExpired ? "Code Expired" : "Verify & Sign In \u2192"
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
  function Dashboard({ onNav, userList, chits, setChits, fitrebs, setFitrebs, forms, reminder, setReminder, announcements, setAnnouncements }) {
    const { user } = useAuth();
    const canManageReminder = isBigFour(user);
    const canReset = isBigFour(user) || user.role === "adj";
    const [editingReminder, setEditingReminder] = (0, import_react.useState)(false);
    const [draftText, setDraftText] = (0, import_react.useState)(reminder.text);
    const [draftAnnouncement, setDraftAnnouncement] = (0, import_react.useState)("");
    const [announcementFiles, setAnnouncementFiles] = (0, import_react.useState)([]);
    const [showAnnouncementForm, setShowAnnouncementForm] = (0, import_react.useState)(false);
    const [showResetConfirm, setShowResetConfirm] = (0, import_react.useState)(false);
    const [resetConfirmText, setResetConfirmText] = (0, import_react.useState)("");
    const myChits = chits.filter((c) => canActOnChit(user, c) && c.status !== "Approved" && c.status !== "Denied" && c.status !== "Returned");
    const myFitreps = fitrebs.filter((f) => canActOnFitrep(user, f) && f.status !== "Approved" && f.status !== "Returned");
    const queueTotal = myChits.length + myFitreps.length;
    const handleAnnouncementFiles = (e) => {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        if (file.size > 10 * 1024 * 1024) return;
        const reader = new FileReader();
        reader.onload = () => setAnnouncementFiles((prev) => [...prev, { name: file.name, size: file.size, url: reader.result }]);
        reader.readAsDataURL(file);
      });
      e.target.value = "";
    };
    const postAnnouncement = () => {
      const text = draftAnnouncement.trim();
      if (!text) return;
      const announcerName = `${user.rank} ${user.name}`;
      const entry = { id: Date.now(), text, author: announcerName, date: (/* @__PURE__ */ new Date()).toLocaleDateString(), files: announcementFiles };
      setAnnouncements((prev) => [entry, ...prev]);
      setDraftAnnouncement("");
      setAnnouncementFiles([]);
      setShowAnnouncementForm(false);
      const subject = "BN Announcement from " + announcerName;
      const fileNote = announcementFiles.length > 0 ? "\n\n\u{1F4CE} " + announcementFiles.length + " file(s) attached \u2014 view in The Quarterdeck." : "";
      const body = text + fileNote + "\n\n\u2014 " + announcerName + ", UT NROTC Battalion";
      userList.forEach((u) => {
        if (u.email) sendNotification(u.email, subject, body, "announcement", u.id);
      });
    };
    const liveEvents = useCalendarEvents();
    const upcomingEvents = liveEvents.length > 0 ? liveEvents : POTW.operations;
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
            maxLength: 500,
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
      announcements.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginBottom: "1rem" }, children: announcements.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "alert alert-announce", style: { marginBottom: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "\u{1F4E2} Announcement:" }),
          " ",
          a.text,
          a.files && a.files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: "0.4rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }, children: a.files.map((f, fi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { href: f.url, download: f.name, className: "btn btn-outline btn-sm", style: { fontSize: "0.72rem", gap: "0.3rem" }, children: [
            "\u{1F4CE} ",
            f.name
          ] }, fi)) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: "0.75rem", opacity: 0.6, marginTop: "0.25rem" }, children: [
            "\u2014 ",
            a.author,
            ", ",
            a.date
          ] })
        ] }),
        isBigFour(user) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-red btn-sm", style: { marginLeft: "0.75rem", flexShrink: 0 }, onClick: () => setAnnouncements((prev) => prev.filter((x) => x.id !== a.id)), children: "\u2715" })
      ] }, a.id)) }),
      isBigFour(user) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginBottom: "1rem" }, children: showAnnouncementForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stage-action-box", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stage-action-label", children: "Post BN Announcement" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "textarea",
          {
            className: "input",
            style: { minHeight: "60px", resize: "vertical", marginBottom: "0.5rem", fontSize: "0.85rem" },
            placeholder: "Type announcement\u2026 this will be emailed to all BN members",
            maxLength: 2e3,
            value: draftAnnouncement,
            onChange: (e) => setDraftAnnouncement(e.target.value)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: "0.5rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "btn btn-outline btn-sm", style: { cursor: "pointer", display: "inline-flex", gap: "0.3rem" }, children: [
            "\u{1F4CE} Attach Files",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "file", multiple: true, style: { display: "none" }, onChange: handleAnnouncementFiles })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "0.72rem", color: "#888", marginLeft: "0.5rem" }, children: "Max 10 MB per file" })
        ] }),
        announcementFiles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.5rem" }, children: announcementFiles.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "rgba(191,87,0,0.08)", border: "1px solid rgba(191,87,0,0.2)", borderRadius: "4px", padding: "0.2rem 0.5rem", fontSize: "0.75rem" }, children: [
          "\u{1F4CE} ",
          f.name,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem", padding: 0, color: "#C0392B" }, onClick: () => setAnnouncementFiles((prev) => prev.filter((_, j) => j !== i)), children: "\u2715" })
        ] }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-green btn-sm", onClick: postAnnouncement, children: "Post & Email BN" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => {
            setDraftAnnouncement("");
            setAnnouncementFiles([]);
            setShowAnnouncementForm(false);
          }, children: "Cancel" })
        ] })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => setShowAnnouncementForm(true), children: "\u{1F4E2} Post Announcement" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid3", style: { marginBottom: "1rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stat", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-n", children: userList.length }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-l", children: "BN Strength" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stat stat-chits", style: { borderLeftColor: "#0D1B2A" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-n", style: { color: "#0D1B2A" }, children: chits.filter((c) => c.status !== "Complete").length }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-l", children: "Open CHITs" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stat", style: { borderLeftColor: "#2A7D4F" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-n", style: { color: "#2A7D4F" }, children: forms.length }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stat-l", children: "Active Forms" })
        ] })
      ] }),
      isCoC(user) && queueTotal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card", style: { marginBottom: "1rem", borderLeft: "4px solid #BF5700" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card-header", style: { marginBottom: "0.5rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "card-title", children: "\u{1F4E5} My Queue" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "badge badge-orange", children: [
            queueTotal,
            " awaiting action"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "1rem", flexWrap: "wrap" }, children: [
          myChits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "btn btn-outline btn-sm", onClick: () => onNav("chits"), children: [
            myChits.length,
            " CHIT",
            myChits.length !== 1 ? "s" : "",
            " to review"
          ] }),
          myFitreps.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "btn btn-outline btn-sm", onClick: () => onNav("fitreps"), children: [
            myFitreps.length,
            " FITREP",
            myFitreps.length !== 1 ? "s" : "",
            " to review"
          ] })
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
            upcomingEvents.slice(0, 4).map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "event-row", children: [
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
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.88rem" }, children: "Post questions and get answers from upperclassmen." })
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
      ] }),
      canReset && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card", style: { marginTop: "1.5rem", borderLeft: "3px solid #C0392B" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "card-header", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "card-title", children: "\u26A0\uFE0F Semester Data Management" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.83rem", color: "#888", marginBottom: "0.75rem" }, children: "Clear all CHIT and FITREP records at the end of the semester. This action is permanent and cannot be undone." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn", style: { background: "#C0392B", color: "white", fontSize: "0.82rem" }, onClick: () => setShowResetConfirm(true), children: "\u{1F5D1} Initialize Semester Reset" })
      ] }),
      showResetConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, { title: "\u26A0\uFE0F Confirm Semester Reset", onClose: () => {
        setShowResetConfirm(false);
        setResetConfirmText("");
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: "0.75rem", fontSize: "0.88rem", color: "#C0392B", fontWeight: 600 }, children: [
          "This will permanently delete ALL CHITs (",
          chits.length,
          ") and FITREPs (",
          fitrebs.length,
          ")."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: "0.85rem", marginBottom: "1rem" }, children: [
          "Type ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "RESET" }),
          " to confirm:"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            className: "input",
            placeholder: "Type RESET to confirm",
            value: resetConfirmText,
            onChange: (e) => setResetConfirmText(e.target.value),
            style: { marginBottom: "1rem" }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.75rem", justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline", onClick: () => {
            setShowResetConfirm(false);
            setResetConfirmText("");
          }, children: "Cancel" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              className: "btn",
              style: { background: resetConfirmText === "RESET" ? "#C0392B" : "#ccc", color: "white", cursor: resetConfirmText === "RESET" ? "pointer" : "not-allowed" },
              disabled: resetConfirmText !== "RESET",
              onClick: () => {
                if (resetConfirmText !== "RESET") return;
                setChits([]);
                setFitrebs([]);
                setShowResetConfirm(false);
                setResetConfirmText("");
              },
              children: "Permanently Delete All Data"
            }
          )
        ] })
      ] })
    ] });
  }
  function CalendarPage() {
    const mon = getCurrentWeekMonday();
    const weekNum = getWeekNumber(mon);
    const weekLabel = `Week ${weekNum} \u2014 ${SEMESTER_LABEL}`;
    const calSrc = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(GCAL_CALENDAR_ID)}&ctz=America/Chicago&mode=WEEK&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&color=%23BF5700`;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-title", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "POTW" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "potw-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "potw-week", children: [
          "\u{1F4D6} ",
          weekLabel
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "potw-title", children: formatWeekRange(mon) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: "#BF5700", borderRadius: "10px", padding: "3px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "1rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "iframe",
        {
          src: calSrc,
          style: { border: 0, width: "100%", height: "600px", borderRadius: "8px", display: "block" },
          title: "Battalion Calendar"
        }
      ) })
    ] });
  }
  function StructurePage({ userList }) {
    const [open, setOpen] = (0, import_react.useState)({});
    const [billetsOpen, setBilletsOpen] = (0, import_react.useState)(false);
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
      const platoonNames = [...new Set(members.map((u) => u.platoon).filter((p) => /\d+(st|nd|rd|th)\s*(PLT|PC)/i.test(p)))].sort();
      const platoons = platoonNames.map((pName) => {
        const pMembers = members.filter((u) => u.platoon === pName);
        const pc = pMembers.find((u) => u.role === "plt_cdr");
        const displayName = pName.replace(/\s*PC$/i, " PLT");
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
        ].map(({ label, user: u }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bn-leader-card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "1px", color: "#BF5700", fontWeight: 700 }, children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.88rem", fontWeight: 600, marginTop: "0.15rem" }, children: u ? fmt(u) : "\u2014" })
        ] }, label)) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid3", style: { marginBottom: "1rem" }, children: companies.map((co, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `stat stat-company-${co.key.toLowerCase()}`, style: { borderLeftColor: co.color }, children: [
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
        billetsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "0.75rem 1rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }, children: billetHolders.map((u, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bn-leader-card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "1px", color: "#BF5700", fontWeight: 700 }, children: getBilletLabel(u) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.88rem", fontWeight: 600, marginTop: "0.15rem" }, children: fmt(u) })
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
    const canEditLL = canEdit(user, "leadlab");
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tab-bar", children: [["pt", "PT Plan"], ["leadlab", "LL"]].map(([t, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setTab(t), style: {
        padding: "0.5rem 1.2rem",
        fontFamily: "'Barlow', 'Segoe UI', sans-serif",
        fontSize: "0.8rem",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        cursor: "pointer",
        background: "none",
        border: "none",
        borderBottom: tab === t ? "3px solid #BF5700" : "3px solid transparent",
        color: tab === t ? "#BF5700" : "#888",
        marginBottom: "-2px",
        position: "relative"
      }, children: label }, t)) }),
      tab === "pt" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        canUploadPT && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "alert", children: [
          "\u270F ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Big 4 / PTO \u2014 Upload Mode:" }),
          " Use the buttons below to post this week's PT plan PDFs."
        ] }),
        PT_SESSIONS.map((s) => {
          const plan = ptPlans[s.key];
          const inputId = `pt-file-${s.key}`;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pt-session-card", style: { borderTop: `4px solid ${s.color}` }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.9rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pt-day-label", children: [
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
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pt-empty-state", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "2.2rem", marginBottom: "0.4rem" }, children: "\u{1F4CB}" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "'Barlow', 'Segoe UI', sans-serif", fontSize: "0.82rem", letterSpacing: "1px", textTransform: "uppercase", color: "#bbb" }, children: "No plan uploaded for this week" }),
              canUploadPT && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.78rem", color: "#BF5700", marginTop: "0.4rem" }, children: "Use the Upload PDF button above." })
            ] })
          ] }, s.key);
        })
      ] }),
      tab === "leadlab" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        canEditLL && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: "'Barlow', 'Segoe UI', sans-serif", fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#BF5700" }, children: "\u270F Big 4 / TRAINO \u2014 you can add and edit sessions" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange btn-sm", onClick: () => setShowAddLL(true), children: "+ Add Session" })
        ] }),
        llSessions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "empty", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "2rem" }, children: "\u{1F5FA}" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: "0.5rem" }, children: "No Leadership Lab sessions scheduled yet." })
        ] }),
        llSessions.map((ll) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "card", style: { marginBottom: "1rem" }, children: editingLL === ll.id ? (
          /* ── Edit mode (TRAINO only) ── */
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "'Barlow', 'Segoe UI', sans-serif", fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#BF5700", marginBottom: "0.75rem" }, children: "\u270F Editing Session" }),
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
                  maxLength: 2e3,
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
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "'Barlow', 'Segoe UI', sans-serif", fontSize: "1rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }, children: ll.title }),
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
                maxLength: 2e3,
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
    const [form, setForm] = (0, import_react.useState)({ startDate: "", endDate: "", reason: "", notes: "", routeCompany: "", routePlatoon: "", routingSheet: null, chitDoc: null });
    const [chitSubmitAttempted, setChitSubmitAttempted] = (0, import_react.useState)(false);
    const [activeComment, setActiveComment] = (0, import_react.useState)(null);
    const [commentText, setCommentText] = (0, import_react.useState)("");
    const visible = chits.filter((c) => canViewChit(user, c));
    const fire = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(""), 3500);
    };
    const loadChitFile = (field, file, allowedTypes, errorMsg) => {
      if (!file || !allowedTypes.includes(file.type)) {
        fire(errorMsg);
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
      if (!form.startDate || !form.reason) {
        fire("\u26A0 Start Date and Reason are required.");
        return;
      }
      if (form.startDate < (/* @__PURE__ */ new Date()).toISOString().split("T")[0]) {
        fire("\u26A0 Start date cannot be in the past.");
        return;
      }
      if (form.endDate && form.endDate <= form.startDate) {
        fire("\u26A0 Return date must be after the start date.");
        return;
      }
      if (form.reason === "Other" && !form.notes.trim()) {
        fire("\u26A0 Notes are required when reason is 'Other'.");
        return;
      }
      if (!form.routingSheet || !form.chitDoc) {
        fire("\u26A0 Both documents are required: Routing Sheet and CHIT Document.");
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
      const fullName = `${user.rank} ${user.name}`;
      const stages = buildChitStages(fullName, now, approvalChain);
      const c = {
        id: "CHT-" + String(chits.length + 1).padStart(3, "0"),
        userId: user.id,
        name: fullName,
        company: routeContext.company,
        platoon: routeContext.platoon,
        date: form.endDate && form.endDate !== form.startDate ? `${form.startDate} \u2013 ${form.endDate}` : form.startDate,
        reason: form.reason,
        notes: form.notes,
        status: "Pending",
        currentStage: 1,
        stages,
        docs: { routingSheet: form.routingSheet, chitDoc: form.chitDoc }
      };
      setChits((prev) => [...prev, c]);
      const firstStage = stages[1];
      if (firstStage?.approverId) {
        const firstEmail = getUserEmail(userList, firstStage.approverId);
        if (firstEmail) {
          sendNotification(
            firstEmail,
            `New CHIT ${c.id} \u2014 Requires Your Approval`,
            `Hello ${firstStage.approverName},

A new CHIT (${c.id}) has been submitted by ${fullName} for "${form.reason}".

Please log in to The Quarterdeck to review and take action.

\u2014 The Quarterdeck`,
            "submission",
            firstStage.approverId
          );
          const approverPrefs = loadNotifPrefs(firstStage.approverId);
          trackApproval(c.id, "CHIT", firstEmail, firstStage.approverName, fullName, approverPrefs.reminder_days);
        }
      }
      setShowModal(false);
      setForm({ startDate: "", endDate: "", reason: "", notes: "", routeCompany: "", routePlatoon: "", routingSheet: null, chitDoc: null });
      setChitSubmitAttempted(false);
      fire("\u2705 CHIT submitted and routed to your chain of command.");
    };
    const [reviewDoc, setReviewDoc] = (0, import_react.useState)(null);
    const loadReviewDoc = (file) => {
      if (!file || file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        fire("\u26A0 Please select a DOCX file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => setReviewDoc({ fileName: file.name, dataUrl: e.target.result });
      reader.readAsDataURL(file);
    };
    const advanceStage = (id, action) => {
      if (action === "approved" && !reviewDoc) {
        fire("\u26A0 Please upload a signed routing sheet before approving.");
        return;
      }
      const comment = commentText.trim();
      const reviewerFullName = `${user.rank} ${user.name}`;
      const chit = chits.find((c) => c.id === id);
      setChits((prev) => prev.map((c) => {
        if (c.id !== id) return c;
        const updated = [...c.stages];
        updated[c.currentStage] = {
          ...updated[c.currentStage],
          completedBy: reviewerFullName,
          completedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          comment
        };
        const next = action === "returned" ? c.currentStage : Math.min(c.currentStage + 1, c.stages.length - 1);
        const status = action === "returned" ? "Returned" : next === c.stages.length - 1 ? "Approved" : "Pending";
        const docs = action === "approved" && reviewDoc ? { ...c.docs, routingSheet: reviewDoc } : c.docs;
        return { ...c, currentStage: next, stages: updated, status, docs };
      }));
      if (chit) {
        const originatorEmail = getUserEmail(userList, chit.userId);
        if (action === "returned") {
          clearApproval(id);
          if (originatorEmail) {
            sendNotification(
              originatorEmail,
              `CHIT ${id} \u2014 Returned`,
              `Hello ${chit.name},

Your CHIT (${id}) for "${chit.reason}" has been returned by ${reviewerFullName}.

${comment ? "Comments: " + comment + "\n\n" : ""}Please log in to The Quarterdeck to review.

\u2014 The Quarterdeck`,
              "return",
              chit.userId
            );
          }
        } else {
          const nextStageIdx = Math.min(chit.currentStage + 1, chit.stages.length - 1);
          if (nextStageIdx >= chit.stages.length - 1) {
            clearApproval(id);
            if (originatorEmail) {
              sendNotification(
                originatorEmail,
                `CHIT ${id} \u2014 Fully Approved`,
                `Hello ${chit.name},

Your CHIT (${id}) for "${chit.reason}" has been fully approved through the chain of command.

\u2014 The Quarterdeck`,
                "complete",
                chit.userId
              );
            }
          } else {
            const nextStage = chit.stages[nextStageIdx];
            if (nextStage?.approverId) {
              const nextEmail = getUserEmail(userList, nextStage.approverId);
              if (nextEmail) {
                sendNotification(
                  nextEmail,
                  `CHIT ${id} \u2014 Requires Your Approval`,
                  `Hello ${nextStage.approverName},

A CHIT (${id}) from ${chit.name} for "${chit.reason}" requires your approval.

Please log in to The Quarterdeck to review and take action.

\u2014 The Quarterdeck`,
                  "approval",
                  nextStage.approverId
                );
                const nextPrefs = loadNotifPrefs(nextStage.approverId);
                trackApproval(id, "CHIT", nextEmail, nextStage.approverName, chit.name, nextPrefs.reminder_days);
              }
            }
          }
        }
      }
      setActiveComment(null);
      setCommentText("");
      setReviewDoc(null);
      fire("CHIT updated.");
    };
    const [chitFolders, setChitFolders] = (0, import_react.useState)({ action: false, pipeline: false, complete: false });
    const needsAction = visible.filter((c) => canActOnChit(user, c) && c.status !== "Approved" && c.status !== "Denied" && c.status !== "Returned");
    const inPipeline = visible.filter((c) => c.status === "Pending" && !canActOnChit(user, c));
    const completed = visible.filter((c) => c.status === "Approved" || c.status === "Denied" || c.status === "Returned");
    const renderChitCard = (c) => {
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: "'Barlow', 'Segoe UI', sans-serif", fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888" }, children: "Docs:" }),
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
                maxLength: 1e3,
                placeholder: "Add comments (optional)\u2026",
                value: commentText,
                onChange: (e) => setCommentText(e.target.value)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", style: { marginBottom: "0.65rem" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
                "Signed Routing Sheet ",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#C0392B" }, children: "*" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "btn btn-outline btn-sm", style: { cursor: "pointer" }, children: [
                  reviewDoc ? "\u2191 Replace DOCX" : "\u2191 Upload DOCX",
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "file", accept: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document", style: { display: "none" }, onChange: (e) => {
                    loadReviewDoc(e.target.files[0]);
                    e.target.value = "";
                  } })
                ] }),
                reviewDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "0.78rem", color: "#2A7D4F", fontWeight: 600 }, children: [
                  "\u{1F4C4} ",
                  reviewDoc.fileName
                ] })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-green btn-sm", onClick: () => advanceStage(c.id, "approved"), children: "\u2713 Approve" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-red btn-sm", onClick: () => advanceStage(c.id, "returned"), children: "\u21A9 Return to Originator" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => {
                setActiveComment(null);
                setCommentText("");
                setReviewDoc(null);
              }, children: "Cancel" })
            ] })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange btn-sm", onClick: () => {
            setActiveComment(c.id);
            setCommentText("");
            setReviewDoc(null);
          }, children: "\u270F Review CHIT" })
        ] })
      ] }, c.id);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-title", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CHITs" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-sub", children: "Submit and track absence requests" }),
      toast && !showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `alert ${toast.startsWith("\u26A0") ? "alert-red" : "alert-green"}`, children: toast }),
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
      needsAction.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "folder-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "folder-header", onClick: () => setChitFolders((f) => ({ ...f, action: !f.action })), children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          chitFolders.action ? "\u25BC" : "\u25B6",
          " Requiring Your Approval (",
          needsAction.length,
          ")"
        ] }) }),
        chitFolders.action && needsAction.map(renderChitCard)
      ] }),
      inPipeline.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "folder-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "folder-header", onClick: () => setChitFolders((f) => ({ ...f, pipeline: !f.pipeline })), children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          chitFolders.pipeline ? "\u25BC" : "\u25B6",
          " In Pipeline (",
          inPipeline.length,
          ")"
        ] }) }),
        chitFolders.pipeline && inPipeline.map(renderChitCard)
      ] }),
      completed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "folder-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "folder-header", onClick: () => setChitFolders((f) => ({ ...f, complete: !f.complete })), children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          chitFolders.complete ? "\u25BC" : "\u25B6",
          " Completed (",
          completed.length,
          ")"
        ] }) }),
        chitFolders.complete && completed.map(renderChitCard)
      ] }),
      showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, { title: "Submit CHIT", onClose: () => setShowModal(false), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "privacy-note", children: "\u{1F512} Private \u2014 only you and your CoC will see this." }),
        toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `alert ${toast.startsWith("\u26A0") ? "alert-red" : "alert-green"}`, children: toast }),
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
            "Start Date ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#C0392B" }, children: "*" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "input", type: "date", value: form.startDate, onChange: (e) => setForm((s) => ({ ...s, startDate: e.target.value })) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
            "End Date ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "0.75rem", color: "#888" }, children: "(leave blank if single day)" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "input", type: "date", value: form.endDate, min: form.startDate, onChange: (e) => setForm((s) => ({ ...s, endDate: e.target.value })) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
            "Reason ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#C0392B" }, children: "*" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", value: form.reason, onChange: (e) => setForm((s) => ({ ...s, reason: e.target.value })), children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "Select reason\u2026" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Medical Appointment" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Academic Conflict" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Family Emergency" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Personal Emergency" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
            "Notes ",
            form.reason === "Other" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#C0392B" }, children: "*" }) : "(optional)"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { className: "input", style: { minHeight: "80px", resize: "vertical" }, maxLength: 1e3, value: form.notes, onChange: (e) => setForm((s) => ({ ...s, notes: e.target.value })), placeholder: form.reason === "Other" ? "Please explain the reason for your absence" : "" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { borderTop: "1px solid #eee", paddingTop: "0.85rem", marginTop: "0.25rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "'Barlow', 'Segoe UI', sans-serif", fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", marginBottom: "0.65rem" }, children: "Required Documents" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
              "Routing Sheet ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#C0392B" }, children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "chit-routing-sheet", className: "btn btn-outline btn-sm", style: { cursor: "pointer" }, children: form.routingSheet ? "\u2191 Replace DOCX" : "\u2191 Upload DOCX" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  id: "chit-routing-sheet",
                  type: "file",
                  accept: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  style: { display: "none" },
                  onChange: (e) => {
                    loadChitFile("routingSheet", e.target.files[0], ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"], "\u26A0 Please select a DOCX file.");
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
                    loadChitFile("chitDoc", e.target.files[0], ["application/pdf"], "\u26A0 Please select a PDF file.");
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "route-hint", children: [
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
    const fil = [...userList].sort(compareRoster).filter(
      (p) => (!q || p.name.toLowerCase().includes(q.toLowerCase()) || p.rank.toLowerCase().includes(q.toLowerCase())) && (!co || normalizeCompany(p.company) === co)
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-title", children: [
        "Recall ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Roster" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-sub", children: "BN contact directory" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative", flex: 1, minWidth: "180px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)", color: "#aaa" }, children: "\u{1F50D}" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "input", style: { paddingLeft: "2.1rem" }, placeholder: "Search name or rank\u2026", value: q, onChange: (e) => setQ(e.target.value) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", style: { maxWidth: "170px" }, value: co, onChange: (e) => setCo(e.target.value), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "All Companies" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "BN", children: "Big Four" }),
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "avatar", style: { background: COMPANY_COLORS[normalizeCompany(p.company)] || "#BF5700" }, children: p.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontWeight: 600, fontSize: "0.9rem" }, children: p.name }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.78rem", color: "#BF5700", fontWeight: 600 }, children: p.rank }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "0.78rem", color: "#888" }, children: getRosterDescriptor(p) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap", marginLeft: "auto" }, children: [
            p.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "tel:" + p.phone, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "btn btn-outline btn-sm", children: [
              "\u{1F4DE} ",
              p.phone
            ] }) }),
            p.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "mailto:" + encodeURIComponent(p.email), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-navy btn-sm", children: "\u2709 Email" }) })
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "page-sub", children: "Battalion forms and links" }),
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
    const [newQ, setNewQ] = (0, import_react.useState)({ subject: "", customSubject: "", text: "" });
    const [ansText, setAnsText] = (0, import_react.useState)("");
    const subjects = [...new Set(qs.map((q) => q.subject))];
    const visible = qs.filter((q) => !filter || q.subject === filter);
    const postQ = () => {
      if (!newQ.subject || !newQ.text) return;
      if (newQ.subject === "Other" && !newQ.customSubject.trim()) return;
      const finalSubject = newQ.subject === "Other" ? newQ.customSubject.trim() : newQ.subject;
      setQs((prev) => [{
        id: Date.now(),
        authorId: user.id,
        author: user.name,
        rank: user.rank,
        subject: finalSubject,
        time: "Just now",
        answered: false,
        text: newQ.text,
        answers: []
      }, ...prev]);
      setShowModal(false);
      setNewQ({ subject: "", customSubject: "", text: "" });
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontFamily: "'Barlow', 'Segoe UI', sans-serif", fontSize: "0.7rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", marginBottom: "0.5rem" }, children: [
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
              maxLength: 2e3,
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: "input", value: newQ.subject, onChange: (e) => setNewQ((s) => ({ ...s, subject: e.target.value, customSubject: "" })), children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "Select subject\u2026" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Calculus 1" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Calculus 2" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Physics 1" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Physics 2" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Naval Science" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
          ] })
        ] }),
        newQ.subject === "Other" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
            "Class Name ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#C0392B" }, children: "*" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "input",
              placeholder: "e.g. Chemistry, Statics\u2026",
              value: newQ.customSubject,
              onChange: (e) => setNewQ((s) => ({ ...s, customSubject: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "input-label", children: "Your Question" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "textarea",
            {
              className: "input",
              style: { minHeight: "100px", resize: "vertical" },
              maxLength: 2e3,
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
    const [reviewDoc, setReviewDoc] = (0, import_react.useState)(null);
    const [fitrepFolders, setFitrepFolders] = (0, import_react.useState)({ action: false, pipeline: false, complete: false });
    const fire = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(""), 3500);
    };
    const loadReviewDoc = (file) => {
      if (!file || file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        fire("\u26A0 Please select a DOCX file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => setReviewDoc({ fileName: file.name, dataUrl: e.target.result });
      reader.readAsDataURL(file);
    };
    const loadFitrepFile = (field, file, allowedTypes, errorMsg) => {
      if (!file || !allowedTypes.includes(file.type)) {
        fire(errorMsg);
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
      const fitFullName = `${user.rank} ${user.name}`;
      const stages = buildChitStages(fitFullName, now, approvalChain);
      const f = {
        id: "FIT-" + String(fitrebs.length + 1).padStart(3, "0"),
        subjectId: user.id,
        subjectName: fitFullName,
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
      const firstStage = stages[1];
      if (firstStage?.approverId) {
        const firstEmail = getUserEmail(userList, firstStage.approverId);
        if (firstEmail) {
          sendNotification(
            firstEmail,
            `New FITREP ${f.id} \u2014 Requires Your Approval`,
            `Hello ${firstStage.approverName},

A new FITREP (${f.id}) has been submitted by ${fitFullName} for period ${submitForm.period}.

Please log in to The Quarterdeck to review and take action.

\u2014 The Quarterdeck`,
            "submission",
            firstStage.approverId
          );
          const approverPrefs = loadNotifPrefs(firstStage.approverId);
          trackApproval(f.id, "FITREP", firstEmail, firstStage.approverName, fitFullName, approverPrefs.reminder_days);
        }
      }
      setShowModal(false);
      setSubmitForm({ period: "Spring 2026", notes: "", routeCompany: "", routePlatoon: "", fitrepDoc: null, routingSheet: null });
      fire("\u2705 FITREP submitted and routed to your chain of command.");
    };
    const advanceStage = (id, action = "approved") => {
      if (action === "approved" && !reviewDoc) {
        fire("\u26A0 Please upload a signed routing sheet before approving.");
        return;
      }
      const comment = commentText.trim();
      const reviewerFullName = `${user.rank} ${user.name}`;
      const fitrep = fitrebs.find((f) => f.id === id);
      setFitrebs((prev) => prev.map((f) => {
        if (f.id !== id) return f;
        const updated = [...f.stages];
        updated[f.currentStage] = {
          ...updated[f.currentStage],
          completedBy: reviewerFullName,
          completedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          comment
        };
        const next = action === "returned" ? f.currentStage : Math.min(f.currentStage + 1, f.stages.length - 1);
        const status = action === "returned" ? "Returned" : next === f.stages.length - 1 ? "Approved" : "Pending";
        const docs = action === "approved" && reviewDoc ? { ...f.docs, routingSheet: reviewDoc } : f.docs;
        return { ...f, currentStage: next, stages: updated, status, docs };
      }));
      if (fitrep) {
        const originatorEmail = getUserEmail(userList, fitrep.subjectId);
        if (action === "returned") {
          clearApproval(id);
          if (originatorEmail) {
            sendNotification(
              originatorEmail,
              `FITREP ${id} \u2014 Returned`,
              `Hello ${fitrep.subjectName},

Your FITREP (${id}) has been returned by ${reviewerFullName}.

${comment ? "Comments: " + comment + "\n\n" : ""}Please log in to The Quarterdeck to review.

\u2014 The Quarterdeck`,
              "return",
              fitrep.subjectId
            );
          }
        } else {
          const nextStageIdx = Math.min(fitrep.currentStage + 1, fitrep.stages.length - 1);
          if (nextStageIdx >= fitrep.stages.length - 1) {
            clearApproval(id);
            if (originatorEmail) {
              sendNotification(
                originatorEmail,
                `FITREP ${id} \u2014 Fully Approved`,
                `Hello ${fitrep.subjectName},

Your FITREP (${id}) for ${fitrep.period} has been fully approved through the chain of command.

\u2014 The Quarterdeck`,
                "complete",
                fitrep.subjectId
              );
            }
          } else {
            const nextStage = fitrep.stages[nextStageIdx];
            if (nextStage?.approverId) {
              const nextEmail = getUserEmail(userList, nextStage.approverId);
              if (nextEmail) {
                sendNotification(
                  nextEmail,
                  `FITREP ${id} \u2014 Requires Your Approval`,
                  `Hello ${nextStage.approverName},

A FITREP (${id}) from ${fitrep.subjectName} requires your approval.

Please log in to The Quarterdeck to review and take action.

\u2014 The Quarterdeck`,
                  "approval",
                  nextStage.approverId
                );
                const nextPrefs = loadNotifPrefs(nextStage.approverId);
                trackApproval(id, "FITREP", nextEmail, nextStage.approverName, fitrep.subjectName, nextPrefs.reminder_days);
              }
            }
          }
        }
      }
      setActiveComment(null);
      setCommentText("");
      setReviewDoc(null);
      fire(action === "returned" ? "FITREP returned to originator." : "\u2705 FITREP advanced. Stage comments saved.");
    };
    const companies = [...new Set(visible.map((f) => normalizeCompany(f.company)))];
    const needsActionF = filtered.filter((f) => canActOnFitrep(user, f) && f.status !== "Approved" && f.status !== "Returned");
    const inPipelineF = filtered.filter((f) => f.status === "Pending" && !canActOnFitrep(user, f));
    const completedF = filtered.filter((f) => f.status === "Approved" || f.status === "Returned");
    const renderFitrepCard = (f) => {
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
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: "'Barlow', 'Segoe UI', sans-serif", fontSize: "0.65rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888" }, children: "Docs:" }),
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
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "'Barlow', 'Segoe UI', sans-serif", fontSize: "0.7rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", marginBottom: "0.5rem" }, children: "Stage Comments" }),
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
                  maxLength: 1e3,
                  placeholder: "Add your comments (optional \u2014 describe performance, concerns, or recommendations)\u2026",
                  value: commentText,
                  onChange: (e) => setCommentText(e.target.value)
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "input-group", style: { marginBottom: "0.65rem" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "input-label", children: [
                  "Signed Routing Sheet ",
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#C0392B" }, children: "*" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "btn btn-outline btn-sm", style: { cursor: "pointer" }, children: [
                    reviewDoc ? "\u2191 Replace DOCX" : "\u2191 Upload DOCX",
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "file", accept: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document", style: { display: "none" }, onChange: (e) => {
                      loadReviewDoc(e.target.files[0]);
                      e.target.value = "";
                    } })
                  ] }),
                  reviewDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "0.78rem", color: "#2A7D4F", fontWeight: 600 }, children: [
                    "\u{1F4C4} ",
                    reviewDoc.fileName
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-green btn-sm", onClick: () => advanceStage(f.id, "approved"), children: "\u2713 Approve & Advance" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-red btn-sm", onClick: () => advanceStage(f.id, "returned"), children: "\u21A9 Return to Originator" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-outline btn-sm", onClick: () => {
                  setActiveComment(null);
                  setCommentText("");
                  setReviewDoc(null);
                }, children: "Cancel" })
              ] })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-orange btn-sm", onClick: () => {
              setActiveComment(f.id);
              setCommentText("");
              setReviewDoc(null);
            }, children: "\u270F Review FITREP" })
          ] })
        ] })
      ] }, f.id);
    };
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
      toast && !showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `alert ${toast.startsWith("\u26A0") ? "alert-red" : "alert-green"}`, children: toast }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "privacy-note", children: [
        "\u{1F512} ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Private." }),
        " Only you and your chain of command can see your FITREPs."
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
      needsActionF.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "folder-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "folder-header", onClick: () => setFitrepFolders((f) => ({ ...f, action: !f.action })), children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          fitrepFolders.action ? "\u25BC" : "\u25B6",
          " Requiring Your Approval (",
          needsActionF.length,
          ")"
        ] }) }),
        fitrepFolders.action && needsActionF.map(renderFitrepCard)
      ] }),
      inPipelineF.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "folder-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "folder-header", onClick: () => setFitrepFolders((f) => ({ ...f, pipeline: !f.pipeline })), children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          fitrepFolders.pipeline ? "\u25BC" : "\u25B6",
          " In Pipeline (",
          inPipelineF.length,
          ")"
        ] }) }),
        fitrepFolders.pipeline && inPipelineF.map(renderFitrepCard)
      ] }),
      completedF.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "folder-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "folder-header", onClick: () => setFitrepFolders((f) => ({ ...f, complete: !f.complete })), children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          fitrepFolders.complete ? "\u25BC" : "\u25B6",
          " Completed (",
          completedF.length,
          ")"
        ] }) }),
        fitrepFolders.complete && completedF.map(renderFitrepCard)
      ] }),
      showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, { title: "Submit FITREP", onClose: () => setShowModal(false), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "privacy-note", children: "\u{1F512} Private \u2014 only you and your CoC will see this." }),
        toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `alert ${toast.startsWith("\u26A0") ? "alert-red" : "alert-green"}`, children: toast }),
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { className: "input", style: { minHeight: "80px", resize: "vertical" }, maxLength: 1e3, value: submitForm.notes, onChange: (e) => setSubmitForm((s) => ({ ...s, notes: e.target.value })) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { borderTop: "1px solid #eee", paddingTop: "0.85rem", marginTop: "0.25rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "'Barlow', 'Segoe UI', sans-serif", fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", marginBottom: "0.65rem" }, children: "Required Documents" }),
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
                    loadFitrepFile("fitrepDoc", e.target.files[0], ["application/pdf"], "\u26A0 Please select a PDF file.");
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
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "fitrep-routing-sheet", className: "btn btn-outline btn-sm", style: { cursor: "pointer" }, children: submitForm.routingSheet ? "\u2191 Replace DOCX" : "\u2191 Upload DOCX" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  id: "fitrep-routing-sheet",
                  type: "file",
                  accept: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  style: { display: "none" },
                  onChange: (e) => {
                    loadFitrepFile("routingSheet", e.target.files[0], ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"], "\u26A0 Please select a DOCX file.");
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "route-hint", children: [
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
    { id: "structure", label: "BN Structure", icon: "\u{1F5A7}" },
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
    const [darkMode, setDarkMode] = (0, import_react.useState)(() => localStorage.getItem("qd_dark") === "1");
    const toggleDark = () => setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("qd_dark", next ? "1" : "0");
      return next;
    });
    const [reminder, setReminder] = (0, import_react.useState)({ enabled: false, text: "" });
    const [announcements, setAnnouncements] = (0, import_react.useState)([]);
    const [chits, setChits] = (0, import_react.useState)(INIT_CHITS);
    const [fitrebs, setFitrebs] = (0, import_react.useState)(INIT_FITREBS);
    const [showAccount, setShowAccount] = (0, import_react.useState)(false);
    const [forms, setForms] = (0, import_react.useState)([]);
    const [ptPlans, setPtPlans] = (0, import_react.useState)({ monday: null, wednesday: null, thursday: null });
    const [llSessions, setLlSessions] = (0, import_react.useState)(LEADLAB_INIT);
    const [userList, setUserList] = (0, import_react.useState)(cachedRoster);
    const [sheetSynced, setSheetSynced] = (0, import_react.useState)(!SHEETS_API_URL || cachedRoster.length > 0);
    const [sheetError, setSheetError] = (0, import_react.useState)(false);
    const fetchRoster = (attempt = 0) => {
      if (!SHEETS_API_URL) {
        setSheetSynced(true);
        return;
      }
      if (attempt === 0) {
        setSheetSynced(false);
        setSheetError(false);
      }
      const url = `${SHEETS_API_URL}?token=${encodeURIComponent(SHEETS_API_TOKEN)}&_t=${Date.now()}`;
      fetch(url).then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      }).then((data) => {
        if (data.users && data.users.length > 0) {
          const nextUsers = data.users.map((row, i) => sheetRowToUser(row, i));
          setUserList(nextUsers);
          saveCachedRoster(nextUsers);
          setSheetSynced(true);
        } else {
          throw new Error("Empty roster");
        }
      }).catch(() => {
        if (attempt < 2) {
          setTimeout(() => fetchRoster(attempt + 1), 1500);
        } else {
          setSheetError(true);
          setSheetSynced(true);
        }
      });
    };
    (0, import_react.useEffect)(() => {
      fetchRoster();
    }, []);
    (0, import_react.useEffect)(() => {
      if (!user) return;
      const TIMEOUT = 5 * 60 * 1e3;
      let timer = setTimeout(logout, TIMEOUT);
      const reset = () => {
        clearTimeout(timer);
        timer = setTimeout(logout, TIMEOUT);
      };
      const events = ["mousedown", "keydown", "touchstart", "scroll"];
      events.forEach((e) => window.addEventListener(e, reset));
      return () => {
        clearTimeout(timer);
        events.forEach((e) => window.removeEventListener(e, reset));
      };
    }, [user]);
    const logout = () => {
      try {
        window.sessionStorage.removeItem(ROSTER_CACHE_KEY);
      } catch (e) {
      }
      setUser(null);
      setPage("dashboard");
    };
    const handleLogin = (loggedInUser) => {
      const fresh = userList.find((u) => u.id === loggedInUser.id) || loggedInUser;
      setUser(fresh);
    };
    if (!user) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: CSS }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPage, { onLogin: handleLogin, userList, sheetSynced, sheetError, onRetry: fetchRoster })
      ] });
    }
    const renderPage = () => {
      if (page === "dashboard") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, { onNav: setPage, userList, chits, setChits, fitrebs, setFitrebs, forms, reminder, setReminder, announcements, setAnnouncements });
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: darkMode ? "dark" : "", children: [
        showAccount && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountModal, { onClose: () => setShowAccount(false), darkMode, toggleDark }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "topbar", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "topbar-logo", children: "UT" }),
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
                  (isCoC(user) || getBilletLabel(user)) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "role-pill", children: isCoC(user) ? displayRole(user.role) : getBilletLabel(user) })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn-logout", onClick: logout, children: "Sign Out" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "layout", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { className: "sidebar", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sidebar-group", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sidebar-label", children: "Navigation" }),
              NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: `nav-btn ${page === item.id ? "active" : ""}`, onClick: () => setPage(item.id), children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: item.id === "structure" ? "nav-structure-icon" : void 0, children: item.icon }),
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
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#F7941D" }, children: displayRole(user.role) })
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

  // preview-entry.jsx
  (0, import_client.createRoot)(document.getElementById("root")).render(import_react2.default.createElement(App));
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
