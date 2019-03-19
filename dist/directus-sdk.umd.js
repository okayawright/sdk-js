(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DirectusSDK", [], factory);
	else if(typeof exports === 'object')
		exports["DirectusSDK"] = factory();
	else
		root["DirectusSDK"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/argument-validator/argument-validator.js":
/*!***************************************************************!*\
  !*** ./node_modules/argument-validator/argument-validator.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {
    /*
     * We only define the is/has* functions and use the
     * demand() function to build the demands, also the
     * getDemandMethodNameByValidatorKey() (yeh, I know it's an ugly name :()
     * build the demand method based in the .is/has methods
     */

    var v = { };

    if ( true && module.exports) {
        module.exports = v;
    } else {
        this.ArgumentValidator = v;
    }

    var demand = function (demandMethodName, validator) {
        return function (value /* ... more args, name */) {
            if (validator.apply(v, arguments)) {
                return true;
            }

            var name = null;
            if (arguments.length > 1) {
                var name = Array.prototype.slice.call(arguments, -1)[0];
            }

            if (v.isJson(value)) {
                value = JSON.stringify(value);
            }

            var msg = "Invalid " + demandMethodName + " value: " + value;
            if (v.isString(name)) {
                msg += "\nArgument Name: " + name;
            }

            if (v.isArray(arguments[1])) {
                msg += "\nKeys: " + arguments[1].join(", ");
            }

            throw new Error(msg);
        }
    };

    var getDemandMethodNameByValidatorKey = function (key) {
        var prefix = [ 'is', 'has' ];
        var prefixLength = null;

        for (var i = 0; i < prefix.length; i++) {
            prefixLength = prefix[i].length;

            if (key.slice(0, prefixLength) === prefix[i]) {
                break;
            }
        }

        var demandMethodName = key.slice(prefixLength + 1);
        var firstLetter = key.slice(prefixLength, prefixLength + 1).toLowerCase();
        var name = firstLetter + demandMethodName;

        return name;
    };

    var hasKeysWith = function (validator, obj, keys) {
        if (!v.isObjectOrEmpty(obj) || !v.isArrayOrEmpty(keys)) {
            return false;
        }

        var length = keys.length;
        for (var i = 0; i < length; i++) {
            if (!Object.prototype.hasOwnProperty.call(obj, keys[i])) {
                return false;
            }

            if (!validator(obj[keys[i]])) {
                return false;
            }
        }

        return true;
    };

    var isArrayOf = function (validator, arr) {
        if (!v.isArray(arr)) {
            return false;
        }

        var length = arr.length;
        for (var i = 0; i < length; i++) {
            if (!validator(arr[i])) {
                return false;
            }
        }

        return true;
    };

    v.isNotNull = function (value) {
        return value !== null && value !== undefined;
    };

    v.isInstanceOf = function(type, value) {
        return value instanceof type;
    };

    v.isType = function (type, value) {
        return Object.prototype.toString.call(value) === "[object " + type + "]";
    };

    v.isBoolean = function (value) {
        return ([ 1, 0, true, false ].indexOf(value) > -1);
    };

    v.isStringOrEmpty = function (value) {
        return v.isType("String", value);
    };

    v.isString = function (value) {
        if (!v.isStringOrEmpty(value)) {
            return false;
        }
        return /\S/.test(value);
    };

    v.isNumber = function (value) {
        if (!v.isType('Number', value)) {
            return false;
        }

        return isFinite(value) && !isNaN(parseFloat(value));
    };

    v.isArrayOrEmpty = function (arr) {
        return v.isType("Array", arr);
    };

    v.isArray = function (arr) {
        if (!v.isArrayOrEmpty(arr)) {
            return false;
        }

        return arr.length > 0;
    };

    v.isArrayOfNumbers = function (arr) {
        return isArrayOf(v.isNumber, arr);
    };

    v.isArrayOfObjects = function (arr) {
        return isArrayOf(v.isObject, arr);
    };

    v.isObjectOrEmpty = function (obj) {
        return v.isType("Object", obj);
    };

    v.isObject = function (obj) {
        if (!v.isObjectOrEmpty(obj)) {
            return false;
        }

        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                return true;
            }
        }

        return false;
    };

    v.isJson = function (value) {
        if (!v.isObjectOrEmpty(value)) {
            return false;
        }

        try {
            JSON.stringify(value);
        } catch (err) {
            return false;
        }

        return true;
    };

    v.isJsonString = function (value) {
        if (!v.isString(value)) {
            return false;
        }

        try {
            JSON.parse(value);
        } catch (err) {
            return false;
        }

        return true;
    };

    v.hasKeys = function (obj, keys) {
        return hasKeysWith(v.isNotNull, obj, keys);
    };

    v.hasKeysWithNumber = v.hasNumberKeys = function (obj, keys) {
        return hasKeysWith(v.isNumber, obj, keys);
    };

    v.hasKeysWithString = v.hasStringKeys = function (obj, keys) {
        return hasKeysWith(v.isString, obj, keys);
    };

    v.hasKeysWithObject = v.hasObjectKeys = function (obj, keys) {
        return hasKeysWith(v.isObject, obj, keys);
    };

    v.hasKeysWithStringOrEmpty = v.hasStringOrEmptyKeys = function (obj, keys) {
        return hasKeysWith(v.isStringOrEmpty, obj, keys);
    };

    v.hasKeysWithObjectOrEmpty = v.hasObjectOrEmptyKeys = function (obj, keys) {
        return hasKeysWith(v.isObjectOrEmpty, obj, keys);
    };

    v.isFunction = function (value) {
        return v.isInstanceOf(Function, value);
    };

    // build demand functions
    for (var key in v) {
        var demandMethodName = getDemandMethodNameByValidatorKey(key);
        v[demandMethodName] = demand(demandMethodName, v[key]);
    }

}).call(this);


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/base-64/base64.js":
/*!****************************************!*\
  !*** ./node_modules/base-64/base64.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports =  true && exports;

	// Detect free variable `module`.
	var freeModule =  true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code, and use
	// it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};

	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
	var decode = function(input) {
		input = String(input)
			.replace(REGEX_SPACE_CHARACTERS, '');
		var length = input.length;
		if (length % 4 == 0) {
			input = input.replace(/==?$/, '');
			length = input.length;
		}
		if (
			length % 4 == 1 ||
			// http://whatwg.org/C#alphanumeric-ascii-characters
			/[^+a-zA-Z0-9/]/.test(input)
		) {
			error(
				'Invalid character: the string to be decoded is not correctly encoded.'
			);
		}
		var bitCounter = 0;
		var bitStorage;
		var buffer;
		var output = '';
		var position = -1;
		while (++position < length) {
			buffer = TABLE.indexOf(input.charAt(position));
			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return output;
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input) {
		input = String(input);
		if (/[^\0-\xFF]/.test(input)) {
			// Note: no need to special-case astral symbols here, as surrogates are
			// matched, and the input is supposed to only contain ASCII anyway.
			error(
				'The string to be encoded contains characters outside of the ' +
				'Latin1 range.'
			);
		}
		var padding = input.length % 3;
		var output = '';
		var position = -1;
		var a;
		var b;
		var c;
		var d;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = input.length - padding;

		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input.charCodeAt(position) << 16;
			b = input.charCodeAt(++position) << 8;
			c = input.charCodeAt(++position);
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
			output += (
				TABLE.charAt(buffer >> 18 & 0x3F) +
				TABLE.charAt(buffer >> 12 & 0x3F) +
				TABLE.charAt(buffer >> 6 & 0x3F) +
				TABLE.charAt(buffer & 0x3F)
			);
		}

		if (padding == 2) {
			a = input.charCodeAt(position) << 8;
			b = input.charCodeAt(++position);
			buffer = a + b;
			output += (
				TABLE.charAt(buffer >> 10) +
				TABLE.charAt((buffer >> 4) & 0x3F) +
				TABLE.charAt((buffer << 2) & 0x3F) +
				'='
			);
		} else if (padding == 1) {
			buffer = input.charCodeAt(position);
			output += (
				TABLE.charAt(buffer >> 2) +
				TABLE.charAt((buffer << 4) & 0x3F) +
				'=='
			);
		}

		return output;
	};

	var base64 = {
		'encode': encode,
		'decode': decode,
		'version': '0.1.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return base64;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else { var key; }

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

exports.arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

exports.compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

exports.isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var base64 = __webpack_require__(/*! base-64 */ "./node_modules/base-64/base64.js");

var qs = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");

var AV = __webpack_require__(/*! argument-validator */ "./node_modules/argument-validator/argument-validator.js");
/**
 * Retrieves the payload from a JWT
 * @param  {String} token The JWT to retrieve the payload from
 * @return {Object}       The JWT payload
 */


function getPayload(token) {
  var payloadBase64 = token.split(".")[1].replace("-", "+").replace("_", "/");
  var payloadDecoded = base64.decode(payloadBase64);
  var payloadObject = JSON.parse(payloadDecoded);

  if (AV.isNumber(payloadObject.exp)) {
    payloadObject.exp = new Date(payloadObject.exp * 1000);
  }

  return payloadObject;
}
/**
 * Create a new SDK instance
 * @param       {object} [options]
 * @param       {string} [options.url]   The API url to connect to
 * @param       {string} [options.project]   The API project to connect to
 * @param       {string} [options.token] The access token to use for requests
 * @constructor
 */


function SDK() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var token;
  var url;
  var project = "_";
  var localExp;

  if (options.storage) {
    var storedInfo = options.storage.getItem("directus-sdk-js");

    if (storedInfo) {
      storedInfo = JSON.parse(storedInfo);
      token = storedInfo.token;
      url = storedInfo.url;
      project = storedInfo.project;
      localExp = storedInfo.localExp;
    }
  }

  if (options.token) {
    token = options.token;
  }

  if (options.url) {
    url = options.url;
  }

  if (options.project) {
    project = options.project;
  }

  if (options.localExp) {
    localExp = options.localExp;
  }

  var SDK = {
    url: url,
    token: token,
    project: project,
    // The token will contain an expiry time based on the server time
    // In order to make sure we check the right expiry date, we need to
    // keep a version that's based on the browser time
    localExp: localExp,
    axios: axios.create({
      paramsSerializer: qs.stringify,
      timeout: 10 * 60 * 1000 // 10 min

    }),
    refreshInterval: null,
    onAutoRefreshError: null,
    onAutoRefreshSuccess: null,
    // The storage method to use. Has to support getItem and setItem to store and
    // retrieve the token
    storage: options.storage || null,

    get payload() {
      if (!AV.isString(this.token)) return null;
      return getPayload(this.token);
    },

    get loggedIn() {
      if (AV.isString(this.token) && AV.isString(this.url) && AV.isString(this.project) && AV.isObject(this.payload)) {
        if (this.localExp > Date.now()) {
          return true;
        }
      }

      return false;
    },

    // REQUEST METHODS
    // -------------------------------------------------------------------------

    /**
     * Directus API request promise
     * @promise RequestPromise
     * @fulfill {object} Directus data
     * @reject {Error} Network error (if no connection to API)
     * @reject {Error} Directus error (eg not logged in or 404)
     */

    /**
     * Perform an API request to the Directus API
     * @param  {string} method      The HTTP method to use
     * @param  {string} endpoint    The API endpoint to request
     * @param  {Object} [params={}] The HTTP query parameters (GET only)
     * @param  {Object} [data={}]   The HTTP request body (non-GET only)
     * @param  {Boolean} noEnv      Don't use the project in the path
     * @return {RequestPromise}
     */
    request: function request(method, endpoint) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var noEnv = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var headers = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      AV.string(method, "method");
      AV.string(endpoint, "endpoint");
      AV.objectOrEmpty(params, "params");
      Array.isArray(data) ? AV.arrayOrEmpty(data, "data") : AV.objectOrEmpty(data, "data");
      AV.string(this.url, "this.url");
      var baseURL = "".concat(this.url, "/");

      if (noEnv === false) {
        baseURL += "".concat(this.project, "/");
      }

      var requestOptions = {
        url: endpoint,
        method: method,
        baseURL: baseURL,
        params: params,
        data: data
      };

      if (this.token && typeof this.token === "string" && this.token.length > 0) {
        requestOptions.headers = headers;
        requestOptions.headers.Authorization = "Bearer ".concat(this.token);
      }

      return this.axios.request(requestOptions).then(function (res) {
        return res.data;
      }).then(function (data) {
        if (!data || data.length === 0) return data;

        if (_typeof(data) !== "object") {
          try {
            return JSON.parse(data);
          } catch (error) {
            throw {
              json: true,
              error: error,
              data: data
            };
          }
        }

        return data;
      }).catch(function (error) {
        if (error.response) {
          throw error.response.data.error;
        } else if (error.json === true) {
          throw {
            // eslint-disable-line
            code: -2,
            message: "API returned invalid JSON",
            error: error.error,
            data: error.data
          };
        } else {
          throw {
            // eslint-disable-line
            code: -1,
            message: "Network Error",
            error: error
          };
        }
      });
    },

    /**
     * GET convenience method. Calls the request method for you
     * @param  {string} endpoint    The endpoint to get
     * @param  {Object} [params={}] The HTTP query parameters (GET only)
     * @return {RequestPromise}
     */
    get: function get(endpoint) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(endpoint, "endpoint");
      AV.objectOrEmpty(params, "params");
      return this.request("get", endpoint, params);
    },

    /**
     * POST convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @param  {Object} [body={}] The HTTP request body
     * @return {RequestPromise}
     */
    post: function post(endpoint) {
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(endpoint, "endpoint");
      Array.isArray(body) ? AV.arrayOrEmpty(body, "body") : AV.objectOrEmpty(body, "body");
      return this.request("post", endpoint, params, body);
    },

    /**
     * PATCH convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @param  {Object} [body={}] The HTTP request body
     * @return {RequestPromise}
     */
    patch: function patch(endpoint) {
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(endpoint, "endpoint");
      Array.isArray(body) ? AV.arrayOrEmpty(body, "body") : AV.objectOrEmpty(body, "body");
      return this.request("patch", endpoint, params, body);
    },

    /**
     * PATCH convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @param  {Object} [body={}] The HTTP request body
     * @return {RequestPromise}
     */
    put: function put(endpoint) {
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(endpoint, "endpoint");
      Array.isArray(body) ? AV.arrayOrEmpty(body, "body") : AV.objectOrEmpty(body, "body");
      return this.request("put", endpoint, params, body);
    },

    /**
     * PATCH convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @return {RequestPromise}
     */
    delete: function _delete(endpoint) {
      AV.string(endpoint, "endpoint");
      return this.request("delete", endpoint);
    },
    // AUTHENTICATION
    // -------------------------------------------------------------------------

    /**
     * Logging in promise
     * @promise LoginPromise
     * @fulfill {Object} Object containing URL, ENV, and TOKEN
     * @reject {Error}   Network error (if no connection to API)
     * @reject {Error}   Directus error (eg not logged in or 404)
     */

    /**
     * Login to the API.
     *
     * Gets a new token from the API and stores it in this.token
     * @param  {Object} credentials
     * @param  {String} credentials.email     The user's email address
     * @param  {String} credentials.password  The user's password
     * @param  {String} [credentials.url]     The API to login to (overwrites this.url)
     * @param  {String} [credentials.project] The API project to login to (overwrites this.project)
     * @param  {String} [options.persist]     Auto-fetch a new token when it's about to expire
     * @param  {Boolean} [options.storage]    Where to store the token (survive refreshes)
     * @return {LoginPromise}
     */
    login: function login(credentials) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        persist: true
      };
      AV.object(credentials, "credentials");
      AV.keysWithString(credentials, ["email", "password"], "credentials");
      this.token = null;

      if (AV.hasKeysWithString(credentials, ["url"])) {
        this.url = credentials.url;
      }

      if (AV.hasKeysWithString(credentials, ["project"])) {
        this.project = credentials.project;
      }

      if (credentials.persist || options.persist) {
        this.startInterval();
      }

      return new Promise(function (resolve, reject) {
        _this.post("/auth/authenticate", {
          email: credentials.email,
          password: credentials.password
        }).then(function (res) {
          return res.data.token;
        }).then(function (token) {
          _this.token = token; // Expiry date is the moment we got the token + 5 minutes

          _this.localExp = new Date(Date.now() + 5 * 60000).getTime();

          if (_this.storage) {
            _this.storage.setItem("directus-sdk-js", JSON.stringify({
              token: _this.token,
              url: _this.url,
              project: _this.project,
              localExp: _this.localExp
            }));
          }

          resolve({
            url: _this.url,
            project: _this.project,
            token: _this.token,
            localExp: _this.localExp
          });
        }).catch(reject);
      });
    },

    /**
     * Logs the user out by "forgetting" the token, and clearing the refresh interval
     */
    logout: function logout() {
      this.token = null;

      if (this.refreshInterval) {
        this.stopInterval();
      }

      if (this.storage) {
        this.storage.removeItem("directus-sdk-js");
      }
    },

    /**
     * Resets the client instance by logging out and removing the URL and project
     */
    reset: function reset() {
      this.logout();
      this.url = null;
      this.project = null;
    },

    /**
     * Starts an interval of 10 seconds that will check if the token needs refreshing
     * @param {Boolean} fireImmediately Fire the refreshIfNeeded method directly
     */
    startInterval: function startInterval(fireImmediately) {
      if (fireImmediately) this.refreshIfNeeded();
      this.refreshInterval = setInterval(this.refreshIfNeeded.bind(this), 10000);
    },

    /**
     * Clears and nullifies the token refreshing interval
     */
    stopInterval: function stopInterval() {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    },

    /**
     * Refresh the token if it is about to expire (within 30 seconds of expiry date)
     *
     * Calls onAutoRefreshSuccess with the new token if the refreshing is successful
     * Calls onAutoRefreshError if refreshing the token fails for some reason
     */
    refreshIfNeeded: function refreshIfNeeded() {
      var _this2 = this;

      if (!AV.hasStringKeys(this, ["token", "url", "project"])) return;
      if (!this.payload || !this.payload.exp) return;
      var timeDiff = this.localExp - Date.now();

      if (timeDiff <= 0) {
        if (AV.isFunction(this.onAutoRefreshError)) {
          this.onAutoRefreshError({
            message: "auth_expired_token",
            code: 102
          });
        }

        return;
      }

      if (timeDiff < 30000) {
        this.refresh(this.token).then(function (res) {
          _this2.token = res.data.token;
          _this2.localExp = new Date(Date.now() + 5 * 60000).getTime();

          if (AV.isFunction(_this2.onAutoRefreshSuccess)) {
            _this2.onAutoRefreshSuccess({
              url: _this2.url,
              project: _this2.project,
              token: _this2.token,
              localExp: _this2.localExp
            });
          }

          if (_this2.storage) {
            _this2.storage.setItem("directus-sdk-js", JSON.stringify({
              token: _this2.token,
              url: _this2.url,
              project: _this2.project,
              localExp: _this2.localExp
            }));
          }
        }).catch(function (error) {
          if (AV.isFunction(_this2.onAutoRefreshError)) {
            _this2.onAutoRefreshError(error);
          }
        });
      }
    },

    /**
     * Use the passed token to request a new one
     * @param  {String} token Active & Valid token
     * @return {RequestPromise}
     */
    refresh: function refresh(token) {
      AV.string(token, "token");
      return this.post("/auth/refresh", {
        token: token
      });
    },

    /**
     * Request to reset the password of the user with the given email address
     *
     * The API will send an email to the given email address with a link to generate a new
     * temporary password.
     * @param {String} email The user's email
     */
    requestPasswordReset: function requestPasswordReset(email) {
      AV.string(email, "email");
      return this.post("/auth/password/request", {
        email: email
      });
    },
    // ACTIVITY
    // -------------------------------------------------------------------------

    /**
     * Get activity
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getActivity: function getActivity() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/activity", params);
    },
    // BOOKMARKS
    // -------------------------------------------------------------------------

    /**
     * Get the bookmarks of the current user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getMyBookmarks: function getMyBookmarks() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.string(this.token, "this.token");
      AV.objectOrEmpty(params);
      return Promise.all([this.get("/collection_presets", {
        "filter[title][nnull]": 1,
        "filter[user][eq]": this.payload.id
      }), this.get("/collection_presets", {
        "filter[title][nnull]": 1,
        "filter[role][eq]": this.payload.role,
        "filter[user][null]": 1
      })]).then(function (values) {
        var _values = _slicedToArray(values, 2),
            user = _values[0],
            role = _values[1]; // eslint-disable-line no-shadow


        return _toConsumableArray(user.data).concat(_toConsumableArray(role.data));
      });
    },
    // COLLECTIONS
    // -------------------------------------------------------------------------

    /**
     * Get all available collections
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getCollections: function getCollections() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/collections", params);
    },

    /**
     * Get collection info by name
     * @param  {String} collection  Collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getCollection: function getCollection(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(collection, "collection");
      AV.objectOrEmpty(params, "params");
      return this.get("/collections/".concat(collection), params);
    },

    /**
     * Create a collection
     * @param {Object} data Collection information
     * @return {RequestPromise}
     */
    createCollection: function createCollection(data) {
      AV.object(data, "data");
      return this.post("/collections", data);
    },

    /**
     * @param  {String} The collection to update
     * @param  {Object} The fields to update
     * @return {RequestPromise}
     */
    updateCollection: function updateCollection(collection, data) {
      AV.string(collection, "collection");
      AV.object(data, "data");
      return this.patch("/collections/".concat(collection), data);
    },

    /**
     * @param  {String} collection The primary key of the collection to remove
     * @return {RequestPromise}
     */
    deleteCollection: function deleteCollection(collection) {
      AV.string(collection, "collection");
      return this.delete("/collections/".concat(collection));
    },
    // COLLECTION PRESETS
    // -------------------------------------------------------------------------

    /**
     * Create a new collection preset (bookmark / listing preferences)
     * @param  {Object} data The bookmark info
     * @return {RequestPromise}
     */
    createCollectionPreset: function createCollectionPreset(data) {
      AV.object(data);
      return this.post("/collection_presets", data);
    },

    /**
     * Update collection preset (bookmark / listing preference)
     * @param {String|Number} primaryKey
     * @param {RequestPromise} data
     */
    updateCollectionPreset: function updateCollectionPreset(primaryKey, data) {
      AV.notNull(primaryKey, "primaryKey");
      AV.object(data, "data");
      return this.patch("/collection_presets/".concat(primaryKey), data);
    },

    /**
     * Delete collection preset by primarykey
     * @param {String|Number} primaryKey The primaryKey of the preset to delete
     */
    deleteCollectionPreset: function deleteCollectionPreset(primaryKey) {
      AV.notNull(primaryKey, "primaryKey");
      return this.delete("/collection_presets/".concat(primaryKey));
    },
    // DATABASE
    // ------------------------------------------------------------------------

    /**
     * This will update the database of the API instance to the latest version
     * using the migrations in the API
     * @return {RequestPromise}
     */
    updateDatabase: function updateDatabase() {
      return this.post("/update");
    },
    // EXTENSIONS
    // -------------------------------------------------------------------------

    /**
     * Get the meta information of all installed interfaces
     * @return {RequestPromise}
     */
    getInterfaces: function getInterfaces() {
      return this.request("get", "/interfaces", {}, {}, true);
    },

    /**
     * Get the meta information of all installed layouts
     * @return {RequestPromise}
     */
    getLayouts: function getLayouts() {
      return this.request("get", "/layouts", {}, {}, true);
    },

    /**
     * Get the meta information of all installed pages
     * @return {RequestPromise}
     */
    getPages: function getPages() {
      return this.request("get", "/pages", {}, {}, true);
    },
    // FIELDS
    // ------------------------------------------------------------------------

    /**
     * Get all fields that are in Directus
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getAllFields: function getAllFields() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/fields", params);
    },

    /**
     * Get the fields that have been setup for a given collection
     * @param  {String} collection  Collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getFields: function getFields(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(collection, "collection");
      AV.objectOrEmpty(params, "params");
      return this.get("/fields/".concat(collection), params);
    },

    /**
     * Get the field information for a single given field
     * @param  {String} collection  Collection name
     * @param  {String} fieldName   Field name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getField: function getField(collection, fieldName) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(collection, "collection");
      AV.string(fieldName, "fieldName");
      AV.objectOrEmpty(params, "params");
      return this.get("/fields/".concat(collection, "/").concat(fieldName), params);
    },

    /**
     * Create a field in the given collection
     * @param  {String} collection Collection to add the field in
     * @param  {Object} fieldInfo  The fields info to save
     * @return {RequestPromise}
     */
    createField: function createField(collection, fieldInfo) {
      AV.string(collection, "collection");
      AV.object(fieldInfo, "fieldInfo");
      return this.post("/fields/".concat(collection), fieldInfo);
    },

    /**
     * Update a given field in a given collection
     * @param  {String} collection Field's parent collection
     * @param  {String} fieldName  Name of the field to update
     * @param  {Object} fieldInfo  Fields to update
     * @return {RequestPromise}
     */
    updateField: function updateField(collection, fieldName, fieldInfo) {
      AV.string(collection, "collection");
      AV.string(fieldName, "fieldName");
      AV.object(fieldInfo, "fieldInfo");
      return this.patch("/fields/".concat(collection, "/").concat(fieldName), fieldInfo);
    },

    /**
     * Update multiple fields at once
     * @param  {String} collection             Fields' parent collection
     * @param  {Array} fieldsInfoOrFieldNames  Array of field objects or array of field names
     * @param  {Object} [fieldInfo]            In case fieldsInfoOrFieldNames is an array of fieldNames, you need to provide the fields to update
     * @return {RequestPromise}
     *
     * @example
     *
     * // Set multiple fields to the same value
     * updateFields("projects", ["first_name", "last_name", "email"], {
     *   default_value: ""
     * })
     *
     * // Set multiple fields to different values
     * updateFields("projects", [
     *   {
     *     id: 14,
     *     sort: 1
     *   },
     *   {
     *     id: 17,
     *     sort: 2
     *   },
     *   {
     *     id: 912,
     *     sort: 3
     *   }
     * ])
     */
    updateFields: function updateFields(collection, fieldsInfoOrFieldNames) {
      var fieldInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      AV.string(collection, "collection");
      AV.array(fieldsInfoOrFieldNames, "fieldsInfoOrFieldNames");

      if (fieldInfo) {
        AV.object(fieldInfo);
      }

      if (fieldInfo) {
        return this.patch("/fields/".concat(collection, "/").concat(fieldsInfoOrFieldNames.join(",")), fieldInfo);
      }

      return this.patch("/fields/".concat(collection), fieldsInfoOrFieldNames);
    },

    /**
     * Delete a field from a collection
     * @param  {String} collection Name of the collection
     * @param  {String} fieldName  The name of the field to delete
     * @return {RequestPromise}
     */
    deleteField: function deleteField(collection, fieldName) {
      AV.string(collection, "collection");
      AV.string(fieldName, "fieldName");
      return this.delete("/fields/".concat(collection, "/").concat(fieldName));
    },
    // FILES
    // ------------------------------------------------------------------------

    /**
     * Upload multipart files in multipart/form-data
     * @param  {Object} data FormData object containing files
     * @return {RequestPromise}
     */
    uploadFiles: function uploadFiles(data) {
      var onUploadProgress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var headers = {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer ".concat(this.token)
      };
      return this.axios.post("".concat(this.url, "/").concat(this.project, "/files"), data, {
        headers: headers,
        onUploadProgress: onUploadProgress
      }).then(function (res) {
        return res.data;
      }).catch(function (error) {
        if (error.response) {
          throw error.response.data.error;
        } else {
          throw {
            // eslint-disable-line
            code: -1,
            message: "Network Error",
            error: error
          };
        }
      });
    },
    // ITEMS
    // -------------------------------------------------------------------------

    /**
     * Update an existing item
     * @param  {String} collection The collection to add the item to
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} body       The item's field values
     * @param  {Object} params     Query parameters
     * @return {RequestPromise}
     */
    updateItem: function updateItem(collection, primaryKey, body) {
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.object(body, "body");

      if (collection.startsWith("directus_")) {
        return this.patch("/".concat(collection.substring(9), "/").concat(primaryKey), body, params);
      }

      return this.patch("/items/".concat(collection, "/").concat(primaryKey), body, params);
    },

    /**
     * Update multiple items
     * @param  {String} collection The collection to add the item to
     * @param  {Array} body        The item's field values
     * @param  {Object} params     Query Parameters
     * @return {RequestPromise}
     */
    updateItems: function updateItems(collection, body) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(collection, "collection");
      AV.array(body, "body");

      if (collection.startsWith("directus_")) {
        return this.patch("/".concat(collection.substring(9)), body, params);
      }

      return this.patch("/items/".concat(collection), body, params);
    },

    /**
     * Create a new item
     * @param  {String} collection The collection to add the item to
     * @param  {Object} body       The item's field values
     * @return {RequestPromise}
     */
    createItem: function createItem(collection, body) {
      AV.string(collection, "collection");
      AV.object(body, "body");

      if (collection.startsWith("directus_")) {
        return this.post("/".concat(collection.substring(9)), body);
      }

      return this.post("/items/".concat(collection), body);
    },

    /**
     * Create multiple items
     * @param  {String} collection The collection to add the item to
     * @param  {Array} body        The item's field values
     * @return {RequestPromise}
     */
    createItems: function createItems(collection, body) {
      AV.string(collection, "collection");
      AV.array(body, "body");

      if (collection.startsWith("directus_")) {
        return this.post("/".concat(collection.substring(9)), body);
      }

      return this.post("/items/".concat(collection), body);
    },

    /**
     * Get items from a given collection
     * @param  {String} collection The collection to add the item to
     * @param  {Object} [params={}]   Query parameters
     * @return {RequestPromise}
     */
    getItems: function getItems(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(collection, "collection");
      AV.objectOrEmpty(params, "params");

      if (collection.startsWith("directus_")) {
        return this.get("/".concat(collection.substring(9)), params);
      }

      return this.get("/items/".concat(collection), params);
    },

    /**
     * Get a single item by primary key
     * @param  {String} collection  The collection to add the item to
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getItem: function getItem(collection, primaryKey) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");

      if (collection.startsWith("directus_")) {
        return this.get("/".concat(collection.substring(9), "/").concat(primaryKey), params);
      }

      return this.get("/items/".concat(collection, "/").concat(primaryKey), params);
    },

    /**
     * Delete a single item by primary key
     * @param  {String} collection  The collection to delete the item from
     * @param  {String|Number} primaryKey Primary key of the item
     * @return {RequestPromise}
     */
    deleteItem: function deleteItem(collection, primaryKey) {
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");

      if (collection.startsWith("directus_")) {
        return this.delete("/".concat(collection.substring(9), "/").concat(primaryKey));
      }

      return this.delete("/items/".concat(collection, "/").concat(primaryKey));
    },

    /**
     * Delete multiple items by primary key
     * @param  {String} collection  The collection to delete the item from
     * @param  {Array} primaryKey Primary key of the item
     * @return {RequestPromise}
     */
    deleteItems: function deleteItems(collection, primaryKeys) {
      AV.string(collection, "collection");
      AV.array(primaryKeys, "primaryKeys");

      if (collection.startsWith("directus_")) {
        return this.delete("/".concat(collection.substring(9), "/").concat(primaryKeys.join()));
      }

      return this.delete("/items/".concat(collection, "/").concat(primaryKeys.join()));
    },
    // LISTING PREFERENCES
    // -------------------------------------------------------------------------

    /**
     * Get the collection presets of the current user for a single collection
     * @param  {String} collection  Collection to fetch the preferences for
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getMyListingPreferences: function getMyListingPreferences(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(this.token, "this.token");
      AV.objectOrEmpty(params, "params");
      return Promise.all([this.get("/collection_presets", {
        limit: 1,
        "filter[title][null]": 1,
        "filter[collection][eq]": collection,
        "filter[role][null]": 1,
        "filter[user][null]": 1,
        sort: "-id"
      }), this.get("/collection_presets", {
        limit: 1,
        "filter[title][null]": 1,
        "filter[collection][eq]": collection,
        "filter[role][eq]": this.payload.role,
        "filter[user][null]": 1,
        sort: "-id"
      }), this.get("/collection_presets", {
        limit: 1,
        "filter[title][null]": 1,
        "filter[collection][eq]": collection,
        "filter[role][eq]": this.payload.role,
        "filter[user][eq]": this.payload.id,
        sort: "-id"
      })]).then(function (values) {
        var _values2 = _slicedToArray(values, 3),
            collection = _values2[0],
            role = _values2[1],
            user = _values2[2]; // eslint-disable-line no-shadow


        if (user.data && user.data.length > 0) {
          return user.data[0];
        }

        if (role.data && role.data.length > 0) {
          return role.data[0];
        }

        if (collection.data && collection.data.length > 0) {
          return collection.data[0];
        }

        return {};
      });
    },
    // PERMISSIONS
    // -------------------------------------------------------------------------

    /**
     * Get permissions
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getPermissions: function getPermissions() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.getItems("directus_permissions", params);
    },

    /**
     * Get the currently logged in user's permissions
     * @param  {Object} params Query parameters
     * @return {RequestPromise}
     */
    getMyPermissions: function getMyPermissions() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/permissions/me", params);
    },

    /**
     * Create multiple new permissions
     * @param  {Array} data  Permission records to save
     * @return {RequestPromise}
     */
    createPermissions: function createPermissions(data) {
      AV.array(data);
      return this.post("/permissions", data);
    },

    /**
     * Update multiple permission records
     * @param  {Array} data  Permission records to update
     * @return {RequestPromise}
     */
    updatePermissions: function updatePermissions(data) {
      AV.array(data);
      return this.patch("/permissions", data);
    },
    // RELATIONS
    // -------------------------------------------------------------------------

    /**
     * Get all relationships
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRelations: function getRelations() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params);
      return this.get("/relations", params);
    },
    createRelation: function createRelation(data) {
      return this.post("/relations", data);
    },
    updateRelation: function updateRelation(primaryKey, data) {
      return this.patch("/relations/".concat(primaryKey), data);
    },

    /**
     * Get the relationship information for the given collection
     * @param  {String} collection The collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getCollectionRelations: function getCollectionRelations(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(collection, "collection");
      AV.objectOrEmpty(params);
      return Promise.all([this.get("/relations", {
        "filter[collection_a][eq]": collection
      }), this.get("/relations", {
        "filter[collection_b][eq]": collection
      })]);
    },
    // REVISIONS
    // -------------------------------------------------------------------------

    /**
     * Get a single item's revisions by primary key
     * @param  {String} collection  The collection to fetch the revisions from
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getItemRevisions: function getItemRevisions(collection, primaryKey) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");

      if (collection.startsWith("directus_")) {
        return this.get("/".concat(collection.substring(9), "/").concat(primaryKey, "/revisions"), params);
      }

      return this.get("/items/".concat(collection, "/").concat(primaryKey, "/revisions"), params);
    },

    /**
     * revert an item to a previous state
     * @param  {String} collection  The collection to fetch the revisions from
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Number} revisionID The ID of the revision to revert to
     * @return {RequestPromise}
     */
    revert: function revert(collection, primaryKey, revisionID) {
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.number(revisionID, "revisionID");

      if (collection.startsWith("directus_")) {
        return this.patch("/".concat(collection.substring(9), "/").concat(primaryKey, "/revert/").concat(revisionID));
      }

      return this.patch("/items/".concat(collection, "/").concat(primaryKey, "/revert/").concat(revisionID));
    },
    // ROLES
    // -------------------------------------------------------------------------

    /**
     * Get a single user role
     * @param  {Number} primaryKey  The id of the user rol to get
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRole: function getRole(primaryKey) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.number(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");
      return this.get("/roles/".concat(primaryKey), params);
    },

    /**
     * Get the user roles
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRoles: function getRoles() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/roles", params);
    },

    /**
     * Update a user role
     * @param  {Number} primaryKey The ID of the role
     * @param  {Object} body       The fields to update
     * @return {RequestPromise}
     */
    updateRole: function updateRole(primaryKey, body) {
      AV.notNull(primaryKey, "primaryKey");
      AV.object(body, "body");
      return this.updateItem("directus_roles", primaryKey, body);
    },

    /**
     * Create a new user role
     * @param  {Object} body The role information
     * @return {RequestPromise}
     */
    createRole: function createRole(body) {
      AV.object(body, "body");
      return this.createItem("directus_roles", body);
    },

    /**
     * Delete a user rol by primary key
     * @param  {Number | String} primaryKey Primary key of the user role
     * @return {RequestPromise}
     */
    deleteRole: function deleteRole(primaryKey) {
      AV.notNull(primaryKey, "primaryKey");
      return this.deleteItem("directus_roles", primaryKey);
    },
    // SETTINGS
    // -------------------------------------------------------------------------

    /**
     * Get Directus' global settings
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getSettings: function getSettings() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/settings", params);
    },

    /**
     * Get the "fields" for directus_settings
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getSettingsFields: function getSettingsFields() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/settings/fields", params);
    },
    // USERS
    // -------------------------------------------------------------------------

    /**
     * Get a list of available users in Directus
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getUsers: function getUsers() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/users", params);
    },

    /**
     * Get a single Directus user
     * @param  {String} primaryKey  The unique identifier of the user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getUser: function getUser(primaryKey) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.notNull(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");
      return this.get("/users/".concat(primaryKey), params);
    },

    /**
     * Get the user info of the currently logged in user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getMe: function getMe() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/users/me", params);
    },

    /**
     * Update a single user based on primaryKey
     * @param  {String|Number} primaryKey The primary key of the user
     * @param  {Object} body              The fields to update
     * @return {RequestPromise}
     */
    updateUser: function updateUser(primaryKey, body) {
      AV.notNull(primaryKey, "primaryKey");
      AV.object(body, "body");
      return this.updateItem("directus_users", primaryKey, body);
    },
    // UTILS
    // -------------------------------------------------------------------------

    /**
     * Ping the API to check if it exists / is up and running
     * @return {RequestPromise}
     */
    ping: function ping() {
      return this.request("get", "/server/ping", {}, {}, true);
    },

    /**
     * Get the server info from the API
     * @return {RequestPromise}
     */
    serverInfo: function serverInfo() {
      return this.request("get", "/", {}, {}, true);
    },

    /**
     * Get the server info from the project
     * @return {RequestPromise}
     */
    projectInfo: function projectInfo() {
      return this.request("get", "/");
    },

    /**
     * Get all the setup third party auth providers
     * @return {RequestPromise}
     */
    getThirdPartyAuthProviders: function getThirdPartyAuthProviders() {
      return this.get("/auth/sso");
    }
  }; // Only start the auto refresh interval if the token exists and it's a JWT

  if (SDK.token && SDK.token.includes(".")) {
    SDK.startInterval(true);
  }

  return SDK;
} // CONVENIENCE METHODS
// -------------------------------------------------------------------------------------------------


SDK.getPayload = getPayload;
module.exports = SDK;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EaXJlY3R1c1NESy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXJndW1lbnQtdmFsaWRhdG9yL2FyZ3VtZW50LXZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9xcy9saWIvZm9ybWF0cy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL3BhcnNlLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1aXJlIiwiYmFzZTY0IiwicXMiLCJBViIsImdldFBheWxvYWQiLCJ0b2tlbiIsInBheWxvYWRCYXNlNjQiLCJzcGxpdCIsInJlcGxhY2UiLCJwYXlsb2FkRGVjb2RlZCIsImRlY29kZSIsInBheWxvYWRPYmplY3QiLCJKU09OIiwicGFyc2UiLCJpc051bWJlciIsImV4cCIsIkRhdGUiLCJTREsiLCJvcHRpb25zIiwidXJsIiwicHJvamVjdCIsImxvY2FsRXhwIiwic3RvcmFnZSIsInN0b3JlZEluZm8iLCJnZXRJdGVtIiwiY3JlYXRlIiwicGFyYW1zU2VyaWFsaXplciIsInN0cmluZ2lmeSIsInRpbWVvdXQiLCJyZWZyZXNoSW50ZXJ2YWwiLCJvbkF1dG9SZWZyZXNoRXJyb3IiLCJvbkF1dG9SZWZyZXNoU3VjY2VzcyIsInBheWxvYWQiLCJpc1N0cmluZyIsImxvZ2dlZEluIiwiaXNPYmplY3QiLCJub3ciLCJyZXF1ZXN0IiwibWV0aG9kIiwiZW5kcG9pbnQiLCJwYXJhbXMiLCJkYXRhIiwibm9FbnYiLCJoZWFkZXJzIiwic3RyaW5nIiwib2JqZWN0T3JFbXB0eSIsIkFycmF5IiwiaXNBcnJheSIsImFycmF5T3JFbXB0eSIsImJhc2VVUkwiLCJyZXF1ZXN0T3B0aW9ucyIsImxlbmd0aCIsIkF1dGhvcml6YXRpb24iLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJqc29uIiwiY2F0Y2giLCJyZXNwb25zZSIsImNvZGUiLCJtZXNzYWdlIiwiZ2V0IiwicG9zdCIsImJvZHkiLCJwYXRjaCIsInB1dCIsImRlbGV0ZSIsImxvZ2luIiwiY3JlZGVudGlhbHMiLCJwZXJzaXN0Iiwib2JqZWN0Iiwia2V5c1dpdGhTdHJpbmciLCJoYXNLZXlzV2l0aFN0cmluZyIsInN0YXJ0SW50ZXJ2YWwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVtYWlsIiwicGFzc3dvcmQiLCJnZXRUaW1lIiwic2V0SXRlbSIsImxvZ291dCIsInN0b3BJbnRlcnZhbCIsInJlbW92ZUl0ZW0iLCJyZXNldCIsImZpcmVJbW1lZGlhdGVseSIsInJlZnJlc2hJZk5lZWRlZCIsInNldEludGVydmFsIiwiYmluZCIsImNsZWFySW50ZXJ2YWwiLCJoYXNTdHJpbmdLZXlzIiwidGltZURpZmYiLCJpc0Z1bmN0aW9uIiwicmVmcmVzaCIsInJlcXVlc3RQYXNzd29yZFJlc2V0IiwiZ2V0QWN0aXZpdHkiLCJnZXRNeUJvb2ttYXJrcyIsImFsbCIsImlkIiwicm9sZSIsInZhbHVlcyIsInVzZXIiLCJnZXRDb2xsZWN0aW9ucyIsImdldENvbGxlY3Rpb24iLCJjb2xsZWN0aW9uIiwiY3JlYXRlQ29sbGVjdGlvbiIsInVwZGF0ZUNvbGxlY3Rpb24iLCJkZWxldGVDb2xsZWN0aW9uIiwiY3JlYXRlQ29sbGVjdGlvblByZXNldCIsInVwZGF0ZUNvbGxlY3Rpb25QcmVzZXQiLCJwcmltYXJ5S2V5Iiwibm90TnVsbCIsImRlbGV0ZUNvbGxlY3Rpb25QcmVzZXQiLCJ1cGRhdGVEYXRhYmFzZSIsImdldEludGVyZmFjZXMiLCJnZXRMYXlvdXRzIiwiZ2V0UGFnZXMiLCJnZXRBbGxGaWVsZHMiLCJnZXRGaWVsZHMiLCJnZXRGaWVsZCIsImZpZWxkTmFtZSIsImNyZWF0ZUZpZWxkIiwiZmllbGRJbmZvIiwidXBkYXRlRmllbGQiLCJ1cGRhdGVGaWVsZHMiLCJmaWVsZHNJbmZvT3JGaWVsZE5hbWVzIiwiYXJyYXkiLCJqb2luIiwiZGVsZXRlRmllbGQiLCJ1cGxvYWRGaWxlcyIsIm9uVXBsb2FkUHJvZ3Jlc3MiLCJ1cGRhdGVJdGVtIiwic3RhcnRzV2l0aCIsInN1YnN0cmluZyIsInVwZGF0ZUl0ZW1zIiwiY3JlYXRlSXRlbSIsImNyZWF0ZUl0ZW1zIiwiZ2V0SXRlbXMiLCJkZWxldGVJdGVtIiwiZGVsZXRlSXRlbXMiLCJwcmltYXJ5S2V5cyIsImdldE15TGlzdGluZ1ByZWZlcmVuY2VzIiwibGltaXQiLCJzb3J0IiwiZ2V0UGVybWlzc2lvbnMiLCJnZXRNeVBlcm1pc3Npb25zIiwiY3JlYXRlUGVybWlzc2lvbnMiLCJ1cGRhdGVQZXJtaXNzaW9ucyIsImdldFJlbGF0aW9ucyIsImNyZWF0ZVJlbGF0aW9uIiwidXBkYXRlUmVsYXRpb24iLCJnZXRDb2xsZWN0aW9uUmVsYXRpb25zIiwiZ2V0SXRlbVJldmlzaW9ucyIsInJldmVydCIsInJldmlzaW9uSUQiLCJudW1iZXIiLCJnZXRSb2xlIiwiZ2V0Um9sZXMiLCJ1cGRhdGVSb2xlIiwiY3JlYXRlUm9sZSIsImRlbGV0ZVJvbGUiLCJnZXRTZXR0aW5ncyIsImdldFNldHRpbmdzRmllbGRzIiwiZ2V0VXNlcnMiLCJnZXRVc2VyIiwiZ2V0TWUiLCJ1cGRhdGVVc2VyIiwicGluZyIsInNlcnZlckluZm8iLCJwcm9qZWN0SW5mbyIsImdldFRoaXJkUGFydHlBdXRoUHJvdmlkZXJzIiwiaW5jbHVkZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWIsUUFBUSxLQUE2QjtBQUNyQztBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixtQkFBbUI7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsWUFBWTtBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixZQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7O0FDeE9ELGlCQUFpQixtQkFBTyxDQUFD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T0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVMsR0FBRyxTQUFTO0FBQzVDLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOVNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLG1CQUFtQixLQUEwQjs7QUFFN0M7QUFDQSxrQkFBa0IsS0FBeUI7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRSxJQUVVO0FBQ1o7QUFDQSxFQUFFLG1DQUFPO0FBQ1Q7QUFDQSxHQUFHO0FBQUEsb0dBQUM7QUFDSixFQUFFLE1BQU0sWUFVTjs7QUFFRixDQUFDOzs7Ozs7Ozs7Ozs7O0FDcEtEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7Ozs7QUN2THpCOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakJhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLHVEQUFhO0FBQ3JDLFlBQVksbUJBQU8sQ0FBQywrQ0FBUztBQUM3QixjQUFjLG1CQUFPLENBQUMsbURBQVc7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNWYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsK0NBQVM7O0FBRTdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsa0JBQWtCO0FBQ3JDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtDQUFrQyxRQUFRO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDOztBQUV4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdLYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsK0NBQVM7QUFDN0IsY0FBYyxtQkFBTyxDQUFDLG1EQUFXOztBQUVqQztBQUNBLHlDQUF5QztBQUN6QztBQUNBLEtBQUs7QUFDTCw0Q0FBNEM7QUFDNUM7QUFDQSxLQUFLO0FBQ0wscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixvQkFBb0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0M7O0FBRXhDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDak5hOztBQUViOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQixnQkFBZ0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixPQUFPLFdBQVcsYUFBYTtBQUNqRDs7QUFFQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixzQkFBc0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDek1BOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJBLElBQU1BLEtBQUssR0FBR0MsbUJBQU8sQ0FBQyw0Q0FBRCxDQUFyQjs7QUFDQSxJQUFNQyxNQUFNLEdBQUdELG1CQUFPLENBQUMsaURBQUQsQ0FBdEI7O0FBQ0EsSUFBTUUsRUFBRSxHQUFHRixtQkFBTyxDQUFDLDBDQUFELENBQWxCOztBQUNBLElBQU1HLEVBQUUsR0FBR0gsbUJBQU8sQ0FBQyxtRkFBRCxDQUFsQjtBQUVBOzs7Ozs7O0FBS0EsU0FBU0ksVUFBVCxDQUFvQkMsS0FBcEIsRUFBMkI7QUFDekIsTUFBTUMsYUFBYSxHQUFHRCxLQUFLLENBQ3hCRSxLQURtQixDQUNiLEdBRGEsRUFDUixDQURRLEVBRW5CQyxPQUZtQixDQUVYLEdBRlcsRUFFTixHQUZNLEVBR25CQSxPQUhtQixDQUdYLEdBSFcsRUFHTixHQUhNLENBQXRCO0FBSUEsTUFBTUMsY0FBYyxHQUFHUixNQUFNLENBQUNTLE1BQVAsQ0FBY0osYUFBZCxDQUF2QjtBQUNBLE1BQU1LLGFBQWEsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdKLGNBQVgsQ0FBdEI7O0FBRUEsTUFBSU4sRUFBRSxDQUFDVyxRQUFILENBQVlILGFBQWEsQ0FBQ0ksR0FBMUIsQ0FBSixFQUFvQztBQUNsQ0osaUJBQWEsQ0FBQ0ksR0FBZCxHQUFvQixJQUFJQyxJQUFKLENBQVNMLGFBQWEsQ0FBQ0ksR0FBZCxHQUFvQixJQUE3QixDQUFwQjtBQUNEOztBQUVELFNBQU9KLGFBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7O0FBUUEsU0FBU00sR0FBVCxHQUEyQjtBQUFBLE1BQWRDLE9BQWMsdUVBQUosRUFBSTtBQUN6QixNQUFJYixLQUFKO0FBQ0EsTUFBSWMsR0FBSjtBQUNBLE1BQUlDLE9BQU8sR0FBRyxHQUFkO0FBQ0EsTUFBSUMsUUFBSjs7QUFFQSxNQUFJSCxPQUFPLENBQUNJLE9BQVosRUFBcUI7QUFDbkIsUUFBSUMsVUFBVSxHQUFHTCxPQUFPLENBQUNJLE9BQVIsQ0FBZ0JFLE9BQWhCLENBQXdCLGlCQUF4QixDQUFqQjs7QUFFQSxRQUFJRCxVQUFKLEVBQWdCO0FBQ2RBLGdCQUFVLEdBQUdYLElBQUksQ0FBQ0MsS0FBTCxDQUFXVSxVQUFYLENBQWI7QUFFQWxCLFdBQUssR0FBR2tCLFVBQVUsQ0FBQ2xCLEtBQW5CO0FBQ0FjLFNBQUcsR0FBR0ksVUFBVSxDQUFDSixHQUFqQjtBQUNBQyxhQUFPLEdBQUdHLFVBQVUsQ0FBQ0gsT0FBckI7QUFDQUMsY0FBUSxHQUFHRSxVQUFVLENBQUNGLFFBQXRCO0FBQ0Q7QUFDRjs7QUFFRCxNQUFJSCxPQUFPLENBQUNiLEtBQVosRUFBbUI7QUFDakJBLFNBQUssR0FBR2EsT0FBTyxDQUFDYixLQUFoQjtBQUNEOztBQUVELE1BQUlhLE9BQU8sQ0FBQ0MsR0FBWixFQUFpQjtBQUNmQSxPQUFHLEdBQUdELE9BQU8sQ0FBQ0MsR0FBZDtBQUNEOztBQUVELE1BQUlELE9BQU8sQ0FBQ0UsT0FBWixFQUFxQjtBQUNuQkEsV0FBTyxHQUFHRixPQUFPLENBQUNFLE9BQWxCO0FBQ0Q7O0FBRUQsTUFBSUYsT0FBTyxDQUFDRyxRQUFaLEVBQXNCO0FBQ3BCQSxZQUFRLEdBQUdILE9BQU8sQ0FBQ0csUUFBbkI7QUFDRDs7QUFFRCxNQUFNSixHQUFHLEdBQUc7QUFDVkUsT0FBRyxFQUFFQSxHQURLO0FBRVZkLFNBQUssRUFBRUEsS0FGRztBQUdWZSxXQUFPLEVBQUVBLE9BSEM7QUFLVjtBQUNBO0FBQ0E7QUFDQUMsWUFBUSxFQUFFQSxRQVJBO0FBU1Z0QixTQUFLLEVBQUVBLEtBQUssQ0FBQzBCLE1BQU4sQ0FBYTtBQUNsQkMsc0JBQWdCLEVBQUV4QixFQUFFLENBQUN5QixTQURIO0FBRWxCQyxhQUFPLEVBQUUsS0FBSyxFQUFMLEdBQVUsSUFGRCxDQUVNOztBQUZOLEtBQWIsQ0FURztBQWFWQyxtQkFBZSxFQUFFLElBYlA7QUFjVkMsc0JBQWtCLEVBQUUsSUFkVjtBQWVWQyx3QkFBb0IsRUFBRSxJQWZaO0FBaUJWO0FBQ0E7QUFDQVQsV0FBTyxFQUFFSixPQUFPLENBQUNJLE9BQVIsSUFBbUIsSUFuQmxCOztBQXFCVixRQUFJVSxPQUFKLEdBQWM7QUFDWixVQUFJLENBQUM3QixFQUFFLENBQUM4QixRQUFILENBQVksS0FBSzVCLEtBQWpCLENBQUwsRUFBOEIsT0FBTyxJQUFQO0FBQzlCLGFBQU9ELFVBQVUsQ0FBQyxLQUFLQyxLQUFOLENBQWpCO0FBQ0QsS0F4QlM7O0FBMEJWLFFBQUk2QixRQUFKLEdBQWU7QUFDYixVQUNFL0IsRUFBRSxDQUFDOEIsUUFBSCxDQUFZLEtBQUs1QixLQUFqQixLQUNBRixFQUFFLENBQUM4QixRQUFILENBQVksS0FBS2QsR0FBakIsQ0FEQSxJQUVBaEIsRUFBRSxDQUFDOEIsUUFBSCxDQUFZLEtBQUtiLE9BQWpCLENBRkEsSUFHQWpCLEVBQUUsQ0FBQ2dDLFFBQUgsQ0FBWSxLQUFLSCxPQUFqQixDQUpGLEVBS0U7QUFDQSxZQUFJLEtBQUtYLFFBQUwsR0FBZ0JMLElBQUksQ0FBQ29CLEdBQUwsRUFBcEIsRUFBZ0M7QUFDOUIsaUJBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBQ0QsYUFBTyxLQUFQO0FBQ0QsS0F0Q1M7O0FBd0NWO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7OztBQVNBQyxXQTVEVSxtQkE2RFJDLE1BN0RRLEVBOERSQyxRQTlEUSxFQW1FUjtBQUFBLFVBSkFDLE1BSUEsdUVBSlMsRUFJVDtBQUFBLFVBSEFDLElBR0EsdUVBSE8sRUFHUDtBQUFBLFVBRkFDLEtBRUEsdUVBRlEsS0FFUjtBQUFBLFVBREFDLE9BQ0EsdUVBRFUsRUFDVjtBQUNBeEMsUUFBRSxDQUFDeUMsTUFBSCxDQUFVTixNQUFWLEVBQWtCLFFBQWxCO0FBQ0FuQyxRQUFFLENBQUN5QyxNQUFILENBQVVMLFFBQVYsRUFBb0IsVUFBcEI7QUFDQXBDLFFBQUUsQ0FBQzBDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCO0FBQ0FNLFdBQUssQ0FBQ0MsT0FBTixDQUFjTixJQUFkLElBQ0l0QyxFQUFFLENBQUM2QyxZQUFILENBQWdCUCxJQUFoQixFQUFzQixNQUF0QixDQURKLEdBRUl0QyxFQUFFLENBQUMwQyxhQUFILENBQWlCSixJQUFqQixFQUF1QixNQUF2QixDQUZKO0FBSUF0QyxRQUFFLENBQUN5QyxNQUFILENBQVUsS0FBS3pCLEdBQWYsRUFBb0IsVUFBcEI7QUFFQSxVQUFJOEIsT0FBTyxhQUFNLEtBQUs5QixHQUFYLE1BQVg7O0FBRUEsVUFBSXVCLEtBQUssS0FBSyxLQUFkLEVBQXFCO0FBQ25CTyxlQUFPLGNBQU8sS0FBSzdCLE9BQVosTUFBUDtBQUNEOztBQUVELFVBQU04QixjQUFjLEdBQUc7QUFDckIvQixXQUFHLEVBQUVvQixRQURnQjtBQUVyQkQsY0FBTSxFQUFOQSxNQUZxQjtBQUdyQlcsZUFBTyxFQUFQQSxPQUhxQjtBQUlyQlQsY0FBTSxFQUFOQSxNQUpxQjtBQUtyQkMsWUFBSSxFQUFKQTtBQUxxQixPQUF2Qjs7QUFRQSxVQUNFLEtBQUtwQyxLQUFMLElBQ0EsT0FBTyxLQUFLQSxLQUFaLEtBQXNCLFFBRHRCLElBRUEsS0FBS0EsS0FBTCxDQUFXOEMsTUFBWCxHQUFvQixDQUh0QixFQUlFO0FBQ0FELHNCQUFjLENBQUNQLE9BQWYsR0FBeUJBLE9BQXpCO0FBQ0FPLHNCQUFjLENBQUNQLE9BQWYsQ0FBdUJTLGFBQXZCLG9CQUFpRCxLQUFLL0MsS0FBdEQ7QUFDRDs7QUFFRCxhQUFPLEtBQUtOLEtBQUwsQ0FDSnNDLE9BREksQ0FDSWEsY0FESixFQUVKRyxJQUZJLENBRUMsVUFBQUMsR0FBRztBQUFBLGVBQUlBLEdBQUcsQ0FBQ2IsSUFBUjtBQUFBLE9BRkosRUFHSlksSUFISSxDQUdDLFVBQUFaLElBQUksRUFBSTtBQUNaLFlBQUksQ0FBQ0EsSUFBRCxJQUFTQSxJQUFJLENBQUNVLE1BQUwsS0FBZ0IsQ0FBN0IsRUFBZ0MsT0FBT1YsSUFBUDs7QUFFaEMsWUFBSSxRQUFPQSxJQUFQLE1BQWdCLFFBQXBCLEVBQThCO0FBQzVCLGNBQUk7QUFDRixtQkFBTzdCLElBQUksQ0FBQ0MsS0FBTCxDQUFXNEIsSUFBWCxDQUFQO0FBQ0QsV0FGRCxDQUVFLE9BQU9jLEtBQVAsRUFBYztBQUNkLGtCQUFNO0FBQ0pDLGtCQUFJLEVBQUUsSUFERjtBQUVKRCxtQkFBSyxFQUFMQSxLQUZJO0FBR0pkLGtCQUFJLEVBQUpBO0FBSEksYUFBTjtBQUtEO0FBQ0Y7O0FBRUQsZUFBT0EsSUFBUDtBQUNELE9BbkJJLEVBb0JKZ0IsS0FwQkksQ0FvQkUsVUFBQUYsS0FBSyxFQUFJO0FBQ2QsWUFBSUEsS0FBSyxDQUFDRyxRQUFWLEVBQW9CO0FBQ2xCLGdCQUFNSCxLQUFLLENBQUNHLFFBQU4sQ0FBZWpCLElBQWYsQ0FBb0JjLEtBQTFCO0FBQ0QsU0FGRCxNQUVPLElBQUlBLEtBQUssQ0FBQ0MsSUFBTixLQUFlLElBQW5CLEVBQXlCO0FBQzlCLGdCQUFNO0FBQ0o7QUFDQUcsZ0JBQUksRUFBRSxDQUFDLENBRkg7QUFHSkMsbUJBQU8sRUFBRSwyQkFITDtBQUlKTCxpQkFBSyxFQUFFQSxLQUFLLENBQUNBLEtBSlQ7QUFLSmQsZ0JBQUksRUFBRWMsS0FBSyxDQUFDZDtBQUxSLFdBQU47QUFPRCxTQVJNLE1BUUE7QUFDTCxnQkFBTTtBQUNKO0FBQ0FrQixnQkFBSSxFQUFFLENBQUMsQ0FGSDtBQUdKQyxtQkFBTyxFQUFFLGVBSEw7QUFJSkwsaUJBQUssRUFBTEE7QUFKSSxXQUFOO0FBTUQ7QUFDRixPQXZDSSxDQUFQO0FBd0NELEtBNUlTOztBQThJVjs7Ozs7O0FBTUFNLE9BcEpVLGVBb0pOdEIsUUFwSk0sRUFvSmlCO0FBQUEsVUFBYkMsTUFBYSx1RUFBSixFQUFJO0FBQ3pCckMsUUFBRSxDQUFDeUMsTUFBSCxDQUFVTCxRQUFWLEVBQW9CLFVBQXBCO0FBQ0FwQyxRQUFFLENBQUMwQyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUVBLGFBQU8sS0FBS0gsT0FBTCxDQUFhLEtBQWIsRUFBb0JFLFFBQXBCLEVBQThCQyxNQUE5QixDQUFQO0FBQ0QsS0F6SlM7O0FBMkpWOzs7Ozs7QUFNQXNCLFFBaktVLGdCQWlLTHZCLFFBaktLLEVBaUs2QjtBQUFBLFVBQXhCd0IsSUFBd0IsdUVBQWpCLEVBQWlCO0FBQUEsVUFBYnZCLE1BQWEsdUVBQUosRUFBSTtBQUNyQ3JDLFFBQUUsQ0FBQ3lDLE1BQUgsQ0FBVUwsUUFBVixFQUFvQixVQUFwQjtBQUNBTyxXQUFLLENBQUNDLE9BQU4sQ0FBY2dCLElBQWQsSUFDSTVELEVBQUUsQ0FBQzZDLFlBQUgsQ0FBZ0JlLElBQWhCLEVBQXNCLE1BQXRCLENBREosR0FFSTVELEVBQUUsQ0FBQzBDLGFBQUgsQ0FBaUJrQixJQUFqQixFQUF1QixNQUF2QixDQUZKO0FBSUEsYUFBTyxLQUFLMUIsT0FBTCxDQUFhLE1BQWIsRUFBcUJFLFFBQXJCLEVBQStCQyxNQUEvQixFQUF1Q3VCLElBQXZDLENBQVA7QUFDRCxLQXhLUzs7QUEwS1Y7Ozs7OztBQU1BQyxTQWhMVSxpQkFnTEp6QixRQWhMSSxFQWdMOEI7QUFBQSxVQUF4QndCLElBQXdCLHVFQUFqQixFQUFpQjtBQUFBLFVBQWJ2QixNQUFhLHVFQUFKLEVBQUk7QUFDdENyQyxRQUFFLENBQUN5QyxNQUFILENBQVVMLFFBQVYsRUFBb0IsVUFBcEI7QUFDQU8sV0FBSyxDQUFDQyxPQUFOLENBQWNnQixJQUFkLElBQ0k1RCxFQUFFLENBQUM2QyxZQUFILENBQWdCZSxJQUFoQixFQUFzQixNQUF0QixDQURKLEdBRUk1RCxFQUFFLENBQUMwQyxhQUFILENBQWlCa0IsSUFBakIsRUFBdUIsTUFBdkIsQ0FGSjtBQUlBLGFBQU8sS0FBSzFCLE9BQUwsQ0FBYSxPQUFiLEVBQXNCRSxRQUF0QixFQUFnQ0MsTUFBaEMsRUFBd0N1QixJQUF4QyxDQUFQO0FBQ0QsS0F2TFM7O0FBeUxWOzs7Ozs7QUFNQUUsT0EvTFUsZUErTE4xQixRQS9MTSxFQStMNEI7QUFBQSxVQUF4QndCLElBQXdCLHVFQUFqQixFQUFpQjtBQUFBLFVBQWJ2QixNQUFhLHVFQUFKLEVBQUk7QUFDcENyQyxRQUFFLENBQUN5QyxNQUFILENBQVVMLFFBQVYsRUFBb0IsVUFBcEI7QUFDQU8sV0FBSyxDQUFDQyxPQUFOLENBQWNnQixJQUFkLElBQ0k1RCxFQUFFLENBQUM2QyxZQUFILENBQWdCZSxJQUFoQixFQUFzQixNQUF0QixDQURKLEdBRUk1RCxFQUFFLENBQUMwQyxhQUFILENBQWlCa0IsSUFBakIsRUFBdUIsTUFBdkIsQ0FGSjtBQUlBLGFBQU8sS0FBSzFCLE9BQUwsQ0FBYSxLQUFiLEVBQW9CRSxRQUFwQixFQUE4QkMsTUFBOUIsRUFBc0N1QixJQUF0QyxDQUFQO0FBQ0QsS0F0TVM7O0FBd01WOzs7OztBQUtBRyxVQTdNVSxtQkE2TUgzQixRQTdNRyxFQTZNTztBQUNmcEMsUUFBRSxDQUFDeUMsTUFBSCxDQUFVTCxRQUFWLEVBQW9CLFVBQXBCO0FBRUEsYUFBTyxLQUFLRixPQUFMLENBQWEsUUFBYixFQUF1QkUsUUFBdkIsQ0FBUDtBQUNELEtBak5TO0FBbU5WO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7Ozs7Ozs7QUFhQTRCLFNBM09VLGlCQTJPSkMsV0EzT0ksRUEyT3NDO0FBQUE7O0FBQUEsVUFBN0JsRCxPQUE2Qix1RUFBbkI7QUFBRW1ELGVBQU8sRUFBRTtBQUFYLE9BQW1CO0FBQzlDbEUsUUFBRSxDQUFDbUUsTUFBSCxDQUFVRixXQUFWLEVBQXVCLGFBQXZCO0FBQ0FqRSxRQUFFLENBQUNvRSxjQUFILENBQWtCSCxXQUFsQixFQUErQixDQUFDLE9BQUQsRUFBVSxVQUFWLENBQS9CLEVBQXNELGFBQXREO0FBRUEsV0FBSy9ELEtBQUwsR0FBYSxJQUFiOztBQUVBLFVBQUlGLEVBQUUsQ0FBQ3FFLGlCQUFILENBQXFCSixXQUFyQixFQUFrQyxDQUFDLEtBQUQsQ0FBbEMsQ0FBSixFQUFnRDtBQUM5QyxhQUFLakQsR0FBTCxHQUFXaUQsV0FBVyxDQUFDakQsR0FBdkI7QUFDRDs7QUFFRCxVQUFJaEIsRUFBRSxDQUFDcUUsaUJBQUgsQ0FBcUJKLFdBQXJCLEVBQWtDLENBQUMsU0FBRCxDQUFsQyxDQUFKLEVBQW9EO0FBQ2xELGFBQUtoRCxPQUFMLEdBQWVnRCxXQUFXLENBQUNoRCxPQUEzQjtBQUNEOztBQUVELFVBQUlnRCxXQUFXLENBQUNDLE9BQVosSUFBdUJuRCxPQUFPLENBQUNtRCxPQUFuQyxFQUE0QztBQUMxQyxhQUFLSSxhQUFMO0FBQ0Q7O0FBRUQsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLGFBQUksQ0FBQ2QsSUFBTCxDQUFVLG9CQUFWLEVBQWdDO0FBQzlCZSxlQUFLLEVBQUVULFdBQVcsQ0FBQ1MsS0FEVztBQUU5QkMsa0JBQVEsRUFBRVYsV0FBVyxDQUFDVTtBQUZRLFNBQWhDLEVBSUd6QixJQUpILENBSVEsVUFBQUMsR0FBRztBQUFBLGlCQUFJQSxHQUFHLENBQUNiLElBQUosQ0FBU3BDLEtBQWI7QUFBQSxTQUpYLEVBS0dnRCxJQUxILENBS1EsVUFBQWhELEtBQUssRUFBSTtBQUNiLGVBQUksQ0FBQ0EsS0FBTCxHQUFhQSxLQUFiLENBRGEsQ0FHYjs7QUFDQSxlQUFJLENBQUNnQixRQUFMLEdBQWdCLElBQUlMLElBQUosQ0FBU0EsSUFBSSxDQUFDb0IsR0FBTCxLQUFhLElBQUksS0FBMUIsRUFBaUMyQyxPQUFqQyxFQUFoQjs7QUFFQSxjQUFJLEtBQUksQ0FBQ3pELE9BQVQsRUFBa0I7QUFDaEIsaUJBQUksQ0FBQ0EsT0FBTCxDQUFhMEQsT0FBYixDQUNFLGlCQURGLEVBRUVwRSxJQUFJLENBQUNlLFNBQUwsQ0FBZTtBQUNidEIsbUJBQUssRUFBRSxLQUFJLENBQUNBLEtBREM7QUFFYmMsaUJBQUcsRUFBRSxLQUFJLENBQUNBLEdBRkc7QUFHYkMscUJBQU8sRUFBRSxLQUFJLENBQUNBLE9BSEQ7QUFJYkMsc0JBQVEsRUFBRSxLQUFJLENBQUNBO0FBSkYsYUFBZixDQUZGO0FBU0Q7O0FBRURzRCxpQkFBTyxDQUFDO0FBQ054RCxlQUFHLEVBQUUsS0FBSSxDQUFDQSxHQURKO0FBRU5DLG1CQUFPLEVBQUUsS0FBSSxDQUFDQSxPQUZSO0FBR05mLGlCQUFLLEVBQUUsS0FBSSxDQUFDQSxLQUhOO0FBSU5nQixvQkFBUSxFQUFFLEtBQUksQ0FBQ0E7QUFKVCxXQUFELENBQVA7QUFNRCxTQTdCSCxFQThCR29DLEtBOUJILENBOEJTbUIsTUE5QlQ7QUErQkQsT0FoQ00sQ0FBUDtBQWlDRCxLQTlSUzs7QUFnU1Y7OztBQUdBSyxVQW5TVSxvQkFtU0Q7QUFDUCxXQUFLNUUsS0FBTCxHQUFhLElBQWI7O0FBRUEsVUFBSSxLQUFLd0IsZUFBVCxFQUEwQjtBQUN4QixhQUFLcUQsWUFBTDtBQUNEOztBQUVELFVBQUksS0FBSzVELE9BQVQsRUFBa0I7QUFDaEIsYUFBS0EsT0FBTCxDQUFhNkQsVUFBYixDQUF3QixpQkFBeEI7QUFDRDtBQUNGLEtBN1NTOztBQStTVjs7O0FBR0FDLFNBbFRVLG1CQWtURjtBQUNOLFdBQUtILE1BQUw7QUFDQSxXQUFLOUQsR0FBTCxHQUFXLElBQVg7QUFDQSxXQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNELEtBdFRTOztBQXdUVjs7OztBQUlBcUQsaUJBNVRVLHlCQTRUSVksZUE1VEosRUE0VHFCO0FBQzdCLFVBQUlBLGVBQUosRUFBcUIsS0FBS0MsZUFBTDtBQUNyQixXQUFLekQsZUFBTCxHQUF1QjBELFdBQVcsQ0FDaEMsS0FBS0QsZUFBTCxDQUFxQkUsSUFBckIsQ0FBMEIsSUFBMUIsQ0FEZ0MsRUFFaEMsS0FGZ0MsQ0FBbEM7QUFJRCxLQWxVUzs7QUFvVVY7OztBQUdBTixnQkF2VVUsMEJBdVVLO0FBQ2JPLG1CQUFhLENBQUMsS0FBSzVELGVBQU4sQ0FBYjtBQUNBLFdBQUtBLGVBQUwsR0FBdUIsSUFBdkI7QUFDRCxLQTFVUzs7QUE0VVY7Ozs7OztBQU1BeUQsbUJBbFZVLDZCQWtWUTtBQUFBOztBQUNoQixVQUFJLENBQUNuRixFQUFFLENBQUN1RixhQUFILENBQWlCLElBQWpCLEVBQXVCLENBQUMsT0FBRCxFQUFVLEtBQVYsRUFBaUIsU0FBakIsQ0FBdkIsQ0FBTCxFQUEwRDtBQUMxRCxVQUFJLENBQUMsS0FBSzFELE9BQU4sSUFBaUIsQ0FBQyxLQUFLQSxPQUFMLENBQWFqQixHQUFuQyxFQUF3QztBQUV4QyxVQUFNNEUsUUFBUSxHQUFHLEtBQUt0RSxRQUFMLEdBQWdCTCxJQUFJLENBQUNvQixHQUFMLEVBQWpDOztBQUVBLFVBQUl1RCxRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDakIsWUFBSXhGLEVBQUUsQ0FBQ3lGLFVBQUgsQ0FBYyxLQUFLOUQsa0JBQW5CLENBQUosRUFBNEM7QUFDMUMsZUFBS0Esa0JBQUwsQ0FBd0I7QUFDdEI4QixtQkFBTyxFQUFFLG9CQURhO0FBRXRCRCxnQkFBSSxFQUFFO0FBRmdCLFdBQXhCO0FBSUQ7O0FBQ0Q7QUFDRDs7QUFFRCxVQUFJZ0MsUUFBUSxHQUFHLEtBQWYsRUFBc0I7QUFDcEIsYUFBS0UsT0FBTCxDQUFhLEtBQUt4RixLQUFsQixFQUNHZ0QsSUFESCxDQUNRLFVBQUFDLEdBQUcsRUFBSTtBQUNYLGdCQUFJLENBQUNqRCxLQUFMLEdBQWFpRCxHQUFHLENBQUNiLElBQUosQ0FBU3BDLEtBQXRCO0FBQ0EsZ0JBQUksQ0FBQ2dCLFFBQUwsR0FBZ0IsSUFBSUwsSUFBSixDQUFTQSxJQUFJLENBQUNvQixHQUFMLEtBQWEsSUFBSSxLQUExQixFQUFpQzJDLE9BQWpDLEVBQWhCOztBQUVBLGNBQUk1RSxFQUFFLENBQUN5RixVQUFILENBQWMsTUFBSSxDQUFDN0Qsb0JBQW5CLENBQUosRUFBOEM7QUFDNUMsa0JBQUksQ0FBQ0Esb0JBQUwsQ0FBMEI7QUFDeEJaLGlCQUFHLEVBQUUsTUFBSSxDQUFDQSxHQURjO0FBRXhCQyxxQkFBTyxFQUFFLE1BQUksQ0FBQ0EsT0FGVTtBQUd4QmYsbUJBQUssRUFBRSxNQUFJLENBQUNBLEtBSFk7QUFJeEJnQixzQkFBUSxFQUFFLE1BQUksQ0FBQ0E7QUFKUyxhQUExQjtBQU1EOztBQUVELGNBQUksTUFBSSxDQUFDQyxPQUFULEVBQWtCO0FBQ2hCLGtCQUFJLENBQUNBLE9BQUwsQ0FBYTBELE9BQWIsQ0FDRSxpQkFERixFQUVFcEUsSUFBSSxDQUFDZSxTQUFMLENBQWU7QUFDYnRCLG1CQUFLLEVBQUUsTUFBSSxDQUFDQSxLQURDO0FBRWJjLGlCQUFHLEVBQUUsTUFBSSxDQUFDQSxHQUZHO0FBR2JDLHFCQUFPLEVBQUUsTUFBSSxDQUFDQSxPQUhEO0FBSWJDLHNCQUFRLEVBQUUsTUFBSSxDQUFDQTtBQUpGLGFBQWYsQ0FGRjtBQVNEO0FBQ0YsU0F6QkgsRUEwQkdvQyxLQTFCSCxDQTBCUyxVQUFBRixLQUFLLEVBQUk7QUFDZCxjQUFJcEQsRUFBRSxDQUFDeUYsVUFBSCxDQUFjLE1BQUksQ0FBQzlELGtCQUFuQixDQUFKLEVBQTRDO0FBQzFDLGtCQUFJLENBQUNBLGtCQUFMLENBQXdCeUIsS0FBeEI7QUFDRDtBQUNGLFNBOUJIO0FBK0JEO0FBQ0YsS0FuWVM7O0FBcVlWOzs7OztBQUtBc0MsV0ExWVUsbUJBMFlGeEYsS0ExWUUsRUEwWUs7QUFDYkYsUUFBRSxDQUFDeUMsTUFBSCxDQUFVdkMsS0FBVixFQUFpQixPQUFqQjtBQUNBLGFBQU8sS0FBS3lELElBQUwsQ0FBVSxlQUFWLEVBQTJCO0FBQUV6RCxhQUFLLEVBQUxBO0FBQUYsT0FBM0IsQ0FBUDtBQUNELEtBN1lTOztBQStZVjs7Ozs7OztBQU9BeUYsd0JBdFpVLGdDQXNaV2pCLEtBdFpYLEVBc1prQjtBQUMxQjFFLFFBQUUsQ0FBQ3lDLE1BQUgsQ0FBVWlDLEtBQVYsRUFBaUIsT0FBakI7QUFDQSxhQUFPLEtBQUtmLElBQUwsQ0FBVSx3QkFBVixFQUFvQztBQUN6Q2UsYUFBSyxFQUFFQTtBQURrQyxPQUFwQyxDQUFQO0FBR0QsS0EzWlM7QUE2WlY7QUFDQTs7QUFFQTs7Ozs7QUFLQWtCLGVBcmFVLHlCQXFhZTtBQUFBLFVBQWJ2RCxNQUFhLHVFQUFKLEVBQUk7QUFDdkJyQyxRQUFFLENBQUMwQyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxXQUFULEVBQXNCckIsTUFBdEIsQ0FBUDtBQUNELEtBeGFTO0FBMGFWO0FBQ0E7O0FBRUE7Ozs7O0FBS0F3RCxrQkFsYlUsNEJBa2JrQjtBQUFBLFVBQWJ4RCxNQUFhLHVFQUFKLEVBQUk7QUFDMUJyQyxRQUFFLENBQUN5QyxNQUFILENBQVUsS0FBS3ZDLEtBQWYsRUFBc0IsWUFBdEI7QUFDQUYsUUFBRSxDQUFDMEMsYUFBSCxDQUFpQkwsTUFBakI7QUFDQSxhQUFPa0MsT0FBTyxDQUFDdUIsR0FBUixDQUFZLENBQ2pCLEtBQUtwQyxHQUFMLENBQVMscUJBQVQsRUFBZ0M7QUFDOUIsZ0NBQXdCLENBRE07QUFFOUIsNEJBQW9CLEtBQUs3QixPQUFMLENBQWFrRTtBQUZILE9BQWhDLENBRGlCLEVBS2pCLEtBQUtyQyxHQUFMLENBQVMscUJBQVQsRUFBZ0M7QUFDOUIsZ0NBQXdCLENBRE07QUFFOUIsNEJBQW9CLEtBQUs3QixPQUFMLENBQWFtRSxJQUZIO0FBRzlCLDhCQUFzQjtBQUhRLE9BQWhDLENBTGlCLENBQVosRUFVSjlDLElBVkksQ0FVQyxVQUFBK0MsTUFBTSxFQUFJO0FBQUEscUNBQ0tBLE1BREw7QUFBQSxZQUNUQyxJQURTO0FBQUEsWUFDSEYsSUFERyxlQUNhOzs7QUFDN0Isa0NBQVdFLElBQUksQ0FBQzVELElBQWhCLDRCQUF5QjBELElBQUksQ0FBQzFELElBQTlCO0FBQ0QsT0FiTSxDQUFQO0FBY0QsS0FuY1M7QUFxY1Y7QUFDQTs7QUFFQTs7Ozs7QUFLQTZELGtCQTdjVSw0QkE2Y2tCO0FBQUEsVUFBYjlELE1BQWEsdUVBQUosRUFBSTtBQUMxQnJDLFFBQUUsQ0FBQzBDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCO0FBQ0EsYUFBTyxLQUFLcUIsR0FBTCxDQUFTLGNBQVQsRUFBeUJyQixNQUF6QixDQUFQO0FBQ0QsS0FoZFM7O0FBa2RWOzs7Ozs7QUFNQStELGlCQXhkVSx5QkF3ZElDLFVBeGRKLEVBd2Q2QjtBQUFBLFVBQWJoRSxNQUFhLHVFQUFKLEVBQUk7QUFDckNyQyxRQUFFLENBQUN5QyxNQUFILENBQVU0RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0FyRyxRQUFFLENBQUMwQyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsd0JBQXlCMkMsVUFBekIsR0FBdUNoRSxNQUF2QyxDQUFQO0FBQ0QsS0E1ZFM7O0FBOGRWOzs7OztBQUtBaUUsb0JBbmVVLDRCQW1lT2hFLElBbmVQLEVBbWVhO0FBQ3JCdEMsUUFBRSxDQUFDbUUsTUFBSCxDQUFVN0IsSUFBVixFQUFnQixNQUFoQjtBQUNBLGFBQU8sS0FBS3FCLElBQUwsQ0FBVSxjQUFWLEVBQTBCckIsSUFBMUIsQ0FBUDtBQUNELEtBdGVTOztBQXdlVjs7Ozs7QUFLQWlFLG9CQTdlVSw0QkE2ZU9GLFVBN2VQLEVBNmVtQi9ELElBN2VuQixFQTZleUI7QUFDakN0QyxRQUFFLENBQUN5QyxNQUFILENBQVU0RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0FyRyxRQUFFLENBQUNtRSxNQUFILENBQVU3QixJQUFWLEVBQWdCLE1BQWhCO0FBQ0EsYUFBTyxLQUFLdUIsS0FBTCx3QkFBMkJ3QyxVQUEzQixHQUF5Qy9ELElBQXpDLENBQVA7QUFDRCxLQWpmUzs7QUFtZlY7Ozs7QUFJQWtFLG9CQXZmVSw0QkF1Zk9ILFVBdmZQLEVBdWZtQjtBQUMzQnJHLFFBQUUsQ0FBQ3lDLE1BQUgsQ0FBVTRELFVBQVYsRUFBc0IsWUFBdEI7QUFDQSxhQUFPLEtBQUt0QyxNQUFMLHdCQUE0QnNDLFVBQTVCLEVBQVA7QUFDRCxLQTFmUztBQTRmVjtBQUNBOztBQUVBOzs7OztBQUtBSSwwQkFwZ0JVLGtDQW9nQmFuRSxJQXBnQmIsRUFvZ0JtQjtBQUMzQnRDLFFBQUUsQ0FBQ21FLE1BQUgsQ0FBVTdCLElBQVY7QUFDQSxhQUFPLEtBQUtxQixJQUFMLENBQVUscUJBQVYsRUFBaUNyQixJQUFqQyxDQUFQO0FBQ0QsS0F2Z0JTOztBQXlnQlY7Ozs7O0FBS0FvRSwwQkE5Z0JVLGtDQThnQmFDLFVBOWdCYixFQThnQnlCckUsSUE5Z0J6QixFQThnQitCO0FBQ3ZDdEMsUUFBRSxDQUFDNEcsT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCO0FBQ0EzRyxRQUFFLENBQUNtRSxNQUFILENBQVU3QixJQUFWLEVBQWdCLE1BQWhCO0FBRUEsYUFBTyxLQUFLdUIsS0FBTCwrQkFBa0M4QyxVQUFsQyxHQUFnRHJFLElBQWhELENBQVA7QUFDRCxLQW5oQlM7O0FBcWhCVjs7OztBQUlBdUUsMEJBemhCVSxrQ0F5aEJhRixVQXpoQmIsRUF5aEJ5QjtBQUNqQzNHLFFBQUUsQ0FBQzRHLE9BQUgsQ0FBV0QsVUFBWCxFQUF1QixZQUF2QjtBQUNBLGFBQU8sS0FBSzVDLE1BQUwsK0JBQW1DNEMsVUFBbkMsRUFBUDtBQUNELEtBNWhCUztBQThoQlY7QUFDQTs7QUFFQTs7Ozs7QUFLQUcsa0JBdGlCVSw0QkFzaUJPO0FBQ2YsYUFBTyxLQUFLbkQsSUFBTCxDQUFVLFNBQVYsQ0FBUDtBQUNELEtBeGlCUztBQTBpQlY7QUFDQTs7QUFFQTs7OztBQUlBb0QsaUJBampCVSwyQkFpakJNO0FBQ2QsYUFBTyxLQUFLN0UsT0FBTCxDQUFhLEtBQWIsRUFBb0IsYUFBcEIsRUFBbUMsRUFBbkMsRUFBdUMsRUFBdkMsRUFBMkMsSUFBM0MsQ0FBUDtBQUNELEtBbmpCUzs7QUFxakJWOzs7O0FBSUE4RSxjQXpqQlUsd0JBeWpCRztBQUNYLGFBQU8sS0FBSzlFLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLFVBQXBCLEVBQWdDLEVBQWhDLEVBQW9DLEVBQXBDLEVBQXdDLElBQXhDLENBQVA7QUFDRCxLQTNqQlM7O0FBNmpCVjs7OztBQUlBK0UsWUFqa0JVLHNCQWlrQkM7QUFDVCxhQUFPLEtBQUsvRSxPQUFMLENBQWEsS0FBYixFQUFvQixRQUFwQixFQUE4QixFQUE5QixFQUFrQyxFQUFsQyxFQUFzQyxJQUF0QyxDQUFQO0FBQ0QsS0Fua0JTO0FBcWtCVjtBQUNBOztBQUVBOzs7OztBQUtBZ0YsZ0JBN2tCVSwwQkE2a0JnQjtBQUFBLFVBQWI3RSxNQUFhLHVFQUFKLEVBQUk7QUFDeEJyQyxRQUFFLENBQUMwQyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxTQUFULEVBQW9CckIsTUFBcEIsQ0FBUDtBQUNELEtBaGxCUzs7QUFrbEJWOzs7Ozs7QUFNQThFLGFBeGxCVSxxQkF3bEJBZCxVQXhsQkEsRUF3bEJ5QjtBQUFBLFVBQWJoRSxNQUFhLHVFQUFKLEVBQUk7QUFDakNyQyxRQUFFLENBQUN5QyxNQUFILENBQVU0RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0FyRyxRQUFFLENBQUMwQyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsbUJBQW9CMkMsVUFBcEIsR0FBa0NoRSxNQUFsQyxDQUFQO0FBQ0QsS0E1bEJTOztBQThsQlY7Ozs7Ozs7QUFPQStFLFlBcm1CVSxvQkFxbUJEZixVQXJtQkMsRUFxbUJXZ0IsU0FybUJYLEVBcW1CbUM7QUFBQSxVQUFiaEYsTUFBYSx1RUFBSixFQUFJO0FBQzNDckMsUUFBRSxDQUFDeUMsTUFBSCxDQUFVNEQsVUFBVixFQUFzQixZQUF0QjtBQUNBckcsUUFBRSxDQUFDeUMsTUFBSCxDQUFVNEUsU0FBVixFQUFxQixXQUFyQjtBQUNBckgsUUFBRSxDQUFDMEMsYUFBSCxDQUFpQkwsTUFBakIsRUFBeUIsUUFBekI7QUFDQSxhQUFPLEtBQUtxQixHQUFMLG1CQUFvQjJDLFVBQXBCLGNBQWtDZ0IsU0FBbEMsR0FBK0NoRixNQUEvQyxDQUFQO0FBQ0QsS0ExbUJTOztBQTRtQlY7Ozs7OztBQU1BaUYsZUFsbkJVLHVCQWtuQkVqQixVQWxuQkYsRUFrbkJja0IsU0FsbkJkLEVBa25CeUI7QUFDakN2SCxRQUFFLENBQUN5QyxNQUFILENBQVU0RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0FyRyxRQUFFLENBQUNtRSxNQUFILENBQVVvRCxTQUFWLEVBQXFCLFdBQXJCO0FBQ0EsYUFBTyxLQUFLNUQsSUFBTCxtQkFBcUIwQyxVQUFyQixHQUFtQ2tCLFNBQW5DLENBQVA7QUFDRCxLQXRuQlM7O0FBd25CVjs7Ozs7OztBQU9BQyxlQS9uQlUsdUJBK25CRW5CLFVBL25CRixFQStuQmNnQixTQS9uQmQsRUErbkJ5QkUsU0EvbkJ6QixFQStuQm9DO0FBQzVDdkgsUUFBRSxDQUFDeUMsTUFBSCxDQUFVNEQsVUFBVixFQUFzQixZQUF0QjtBQUNBckcsUUFBRSxDQUFDeUMsTUFBSCxDQUFVNEUsU0FBVixFQUFxQixXQUFyQjtBQUNBckgsUUFBRSxDQUFDbUUsTUFBSCxDQUFVb0QsU0FBVixFQUFxQixXQUFyQjtBQUNBLGFBQU8sS0FBSzFELEtBQUwsbUJBQXNCd0MsVUFBdEIsY0FBb0NnQixTQUFwQyxHQUFpREUsU0FBakQsQ0FBUDtBQUNELEtBcG9CUzs7QUFzb0JWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QkFFLGdCQXBxQlUsd0JBb3FCR3BCLFVBcHFCSCxFQW9xQmVxQixzQkFwcUJmLEVBb3FCeUQ7QUFBQSxVQUFsQkgsU0FBa0IsdUVBQU4sSUFBTTtBQUNqRXZILFFBQUUsQ0FBQ3lDLE1BQUgsQ0FBVTRELFVBQVYsRUFBc0IsWUFBdEI7QUFDQXJHLFFBQUUsQ0FBQzJILEtBQUgsQ0FBU0Qsc0JBQVQsRUFBaUMsd0JBQWpDOztBQUVBLFVBQUlILFNBQUosRUFBZTtBQUNidkgsVUFBRSxDQUFDbUUsTUFBSCxDQUFVb0QsU0FBVjtBQUNEOztBQUVELFVBQUlBLFNBQUosRUFBZTtBQUNiLGVBQU8sS0FBSzFELEtBQUwsbUJBQ013QyxVQUROLGNBQ29CcUIsc0JBQXNCLENBQUNFLElBQXZCLENBQTRCLEdBQTVCLENBRHBCLEdBRUxMLFNBRkssQ0FBUDtBQUlEOztBQUVELGFBQU8sS0FBSzFELEtBQUwsbUJBQXNCd0MsVUFBdEIsR0FBb0NxQixzQkFBcEMsQ0FBUDtBQUNELEtBcHJCUzs7QUFzckJWOzs7Ozs7QUFNQUcsZUE1ckJVLHVCQTRyQkV4QixVQTVyQkYsRUE0ckJjZ0IsU0E1ckJkLEVBNHJCeUI7QUFDakNySCxRQUFFLENBQUN5QyxNQUFILENBQVU0RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0FyRyxRQUFFLENBQUN5QyxNQUFILENBQVU0RSxTQUFWLEVBQXFCLFdBQXJCO0FBQ0EsYUFBTyxLQUFLdEQsTUFBTCxtQkFBdUJzQyxVQUF2QixjQUFxQ2dCLFNBQXJDLEVBQVA7QUFDRCxLQWhzQlM7QUFrc0JWO0FBQ0E7O0FBRUE7Ozs7O0FBS0FTLGVBMXNCVSx1QkEwc0JFeEYsSUExc0JGLEVBMHNCcUM7QUFBQSxVQUE3QnlGLGdCQUE2Qix1RUFBVixZQUFNLENBQUUsQ0FBRTtBQUM3QyxVQUFNdkYsT0FBTyxHQUFHO0FBQ2Qsd0JBQWdCLHFCQURGO0FBRWRTLHFCQUFhLG1CQUFZLEtBQUsvQyxLQUFqQjtBQUZDLE9BQWhCO0FBS0EsYUFBTyxLQUFLTixLQUFMLENBQ0orRCxJQURJLFdBQ0ksS0FBSzNDLEdBRFQsY0FDZ0IsS0FBS0MsT0FEckIsYUFDc0NxQixJQUR0QyxFQUM0QztBQUMvQ0UsZUFBTyxFQUFQQSxPQUQrQztBQUUvQ3VGLHdCQUFnQixFQUFoQkE7QUFGK0MsT0FENUMsRUFLSjdFLElBTEksQ0FLQyxVQUFBQyxHQUFHO0FBQUEsZUFBSUEsR0FBRyxDQUFDYixJQUFSO0FBQUEsT0FMSixFQU1KZ0IsS0FOSSxDQU1FLFVBQUFGLEtBQUssRUFBSTtBQUNkLFlBQUlBLEtBQUssQ0FBQ0csUUFBVixFQUFvQjtBQUNsQixnQkFBTUgsS0FBSyxDQUFDRyxRQUFOLENBQWVqQixJQUFmLENBQW9CYyxLQUExQjtBQUNELFNBRkQsTUFFTztBQUNMLGdCQUFNO0FBQ0o7QUFDQUksZ0JBQUksRUFBRSxDQUFDLENBRkg7QUFHSkMsbUJBQU8sRUFBRSxlQUhMO0FBSUpMLGlCQUFLLEVBQUxBO0FBSkksV0FBTjtBQU1EO0FBQ0YsT0FqQkksQ0FBUDtBQWtCRCxLQWx1QlM7QUFvdUJWO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FBUUE0RSxjQS91QlUsc0JBK3VCQzNCLFVBL3VCRCxFQSt1QmFNLFVBL3VCYixFQSt1QnlCL0MsSUEvdUJ6QixFQSt1QjRDO0FBQUEsVUFBYnZCLE1BQWEsdUVBQUosRUFBSTtBQUNwRHJDLFFBQUUsQ0FBQ3lDLE1BQUgsQ0FBVTRELFVBQVYsRUFBc0IsWUFBdEI7QUFDQXJHLFFBQUUsQ0FBQzRHLE9BQUgsQ0FBV0QsVUFBWCxFQUF1QixZQUF2QjtBQUNBM0csUUFBRSxDQUFDbUUsTUFBSCxDQUFVUCxJQUFWLEVBQWdCLE1BQWhCOztBQUVBLFVBQUl5QyxVQUFVLENBQUM0QixVQUFYLENBQXNCLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsZUFBTyxLQUFLcEUsS0FBTCxZQUNEd0MsVUFBVSxDQUFDNkIsU0FBWCxDQUFxQixDQUFyQixDQURDLGNBQzBCdkIsVUFEMUIsR0FFTC9DLElBRkssRUFHTHZCLE1BSEssQ0FBUDtBQUtEOztBQUVELGFBQU8sS0FBS3dCLEtBQUwsa0JBQXFCd0MsVUFBckIsY0FBbUNNLFVBQW5DLEdBQWlEL0MsSUFBakQsRUFBdUR2QixNQUF2RCxDQUFQO0FBQ0QsS0E3dkJTOztBQSt2QlY7Ozs7Ozs7QUFPQThGLGVBdHdCVSx1QkFzd0JFOUIsVUF0d0JGLEVBc3dCY3pDLElBdHdCZCxFQXN3QmlDO0FBQUEsVUFBYnZCLE1BQWEsdUVBQUosRUFBSTtBQUN6Q3JDLFFBQUUsQ0FBQ3lDLE1BQUgsQ0FBVTRELFVBQVYsRUFBc0IsWUFBdEI7QUFDQXJHLFFBQUUsQ0FBQzJILEtBQUgsQ0FBUy9ELElBQVQsRUFBZSxNQUFmOztBQUVBLFVBQUl5QyxVQUFVLENBQUM0QixVQUFYLENBQXNCLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsZUFBTyxLQUFLcEUsS0FBTCxZQUFld0MsVUFBVSxDQUFDNkIsU0FBWCxDQUFxQixDQUFyQixDQUFmLEdBQTBDdEUsSUFBMUMsRUFBZ0R2QixNQUFoRCxDQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLd0IsS0FBTCxrQkFBcUJ3QyxVQUFyQixHQUFtQ3pDLElBQW5DLEVBQXlDdkIsTUFBekMsQ0FBUDtBQUNELEtBL3dCUzs7QUFpeEJWOzs7Ozs7QUFNQStGLGNBdnhCVSxzQkF1eEJDL0IsVUF2eEJELEVBdXhCYXpDLElBdnhCYixFQXV4Qm1CO0FBQzNCNUQsUUFBRSxDQUFDeUMsTUFBSCxDQUFVNEQsVUFBVixFQUFzQixZQUF0QjtBQUNBckcsUUFBRSxDQUFDbUUsTUFBSCxDQUFVUCxJQUFWLEVBQWdCLE1BQWhCOztBQUVBLFVBQUl5QyxVQUFVLENBQUM0QixVQUFYLENBQXNCLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsZUFBTyxLQUFLdEUsSUFBTCxZQUFjMEMsVUFBVSxDQUFDNkIsU0FBWCxDQUFxQixDQUFyQixDQUFkLEdBQXlDdEUsSUFBekMsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBS0QsSUFBTCxrQkFBb0IwQyxVQUFwQixHQUFrQ3pDLElBQWxDLENBQVA7QUFDRCxLQWh5QlM7O0FBa3lCVjs7Ozs7O0FBTUF5RSxlQXh5QlUsdUJBd3lCRWhDLFVBeHlCRixFQXd5QmN6QyxJQXh5QmQsRUF3eUJvQjtBQUM1QjVELFFBQUUsQ0FBQ3lDLE1BQUgsQ0FBVTRELFVBQVYsRUFBc0IsWUFBdEI7QUFDQXJHLFFBQUUsQ0FBQzJILEtBQUgsQ0FBUy9ELElBQVQsRUFBZSxNQUFmOztBQUVBLFVBQUl5QyxVQUFVLENBQUM0QixVQUFYLENBQXNCLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsZUFBTyxLQUFLdEUsSUFBTCxZQUFjMEMsVUFBVSxDQUFDNkIsU0FBWCxDQUFxQixDQUFyQixDQUFkLEdBQXlDdEUsSUFBekMsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBS0QsSUFBTCxrQkFBb0IwQyxVQUFwQixHQUFrQ3pDLElBQWxDLENBQVA7QUFDRCxLQWp6QlM7O0FBbXpCVjs7Ozs7O0FBTUEwRSxZQXp6QlUsb0JBeXpCRGpDLFVBenpCQyxFQXl6QndCO0FBQUEsVUFBYmhFLE1BQWEsdUVBQUosRUFBSTtBQUNoQ3JDLFFBQUUsQ0FBQ3lDLE1BQUgsQ0FBVTRELFVBQVYsRUFBc0IsWUFBdEI7QUFDQXJHLFFBQUUsQ0FBQzBDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCOztBQUVBLFVBQUlnRSxVQUFVLENBQUM0QixVQUFYLENBQXNCLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsZUFBTyxLQUFLdkUsR0FBTCxZQUFhMkMsVUFBVSxDQUFDNkIsU0FBWCxDQUFxQixDQUFyQixDQUFiLEdBQXdDN0YsTUFBeEMsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBS3FCLEdBQUwsa0JBQW1CMkMsVUFBbkIsR0FBaUNoRSxNQUFqQyxDQUFQO0FBQ0QsS0FsMEJTOztBQW8wQlY7Ozs7Ozs7QUFPQWhCLFdBMzBCVSxtQkEyMEJGZ0YsVUEzMEJFLEVBMjBCVU0sVUEzMEJWLEVBMjBCbUM7QUFBQSxVQUFidEUsTUFBYSx1RUFBSixFQUFJO0FBQzNDckMsUUFBRSxDQUFDeUMsTUFBSCxDQUFVNEQsVUFBVixFQUFzQixZQUF0QjtBQUNBckcsUUFBRSxDQUFDNEcsT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCO0FBQ0EzRyxRQUFFLENBQUMwQyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6Qjs7QUFFQSxVQUFJZ0UsVUFBVSxDQUFDNEIsVUFBWCxDQUFzQixXQUF0QixDQUFKLEVBQXdDO0FBQ3RDLGVBQU8sS0FBS3ZFLEdBQUwsWUFBYTJDLFVBQVUsQ0FBQzZCLFNBQVgsQ0FBcUIsQ0FBckIsQ0FBYixjQUF3Q3ZCLFVBQXhDLEdBQXNEdEUsTUFBdEQsQ0FBUDtBQUNEOztBQUVELGFBQU8sS0FBS3FCLEdBQUwsa0JBQW1CMkMsVUFBbkIsY0FBaUNNLFVBQWpDLEdBQStDdEUsTUFBL0MsQ0FBUDtBQUNELEtBcjFCUzs7QUF1MUJWOzs7Ozs7QUFNQWtHLGNBNzFCVSxzQkE2MUJDbEMsVUE3MUJELEVBNjFCYU0sVUE3MUJiLEVBNjFCeUI7QUFDakMzRyxRQUFFLENBQUN5QyxNQUFILENBQVU0RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0FyRyxRQUFFLENBQUM0RyxPQUFILENBQVdELFVBQVgsRUFBdUIsWUFBdkI7O0FBRUEsVUFBSU4sVUFBVSxDQUFDNEIsVUFBWCxDQUFzQixXQUF0QixDQUFKLEVBQXdDO0FBQ3RDLGVBQU8sS0FBS2xFLE1BQUwsWUFBZ0JzQyxVQUFVLENBQUM2QixTQUFYLENBQXFCLENBQXJCLENBQWhCLGNBQTJDdkIsVUFBM0MsRUFBUDtBQUNEOztBQUVELGFBQU8sS0FBSzVDLE1BQUwsa0JBQXNCc0MsVUFBdEIsY0FBb0NNLFVBQXBDLEVBQVA7QUFDRCxLQXQyQlM7O0FBdzJCVjs7Ozs7O0FBTUE2QixlQTkyQlUsdUJBODJCRW5DLFVBOTJCRixFQTgyQmNvQyxXQTkyQmQsRUE4MkIyQjtBQUNuQ3pJLFFBQUUsQ0FBQ3lDLE1BQUgsQ0FBVTRELFVBQVYsRUFBc0IsWUFBdEI7QUFDQXJHLFFBQUUsQ0FBQzJILEtBQUgsQ0FBU2MsV0FBVCxFQUFzQixhQUF0Qjs7QUFFQSxVQUFJcEMsVUFBVSxDQUFDNEIsVUFBWCxDQUFzQixXQUF0QixDQUFKLEVBQXdDO0FBQ3RDLGVBQU8sS0FBS2xFLE1BQUwsWUFBZ0JzQyxVQUFVLENBQUM2QixTQUFYLENBQXFCLENBQXJCLENBQWhCLGNBQTJDTyxXQUFXLENBQUNiLElBQVosRUFBM0MsRUFBUDtBQUNEOztBQUVELGFBQU8sS0FBSzdELE1BQUwsa0JBQXNCc0MsVUFBdEIsY0FBb0NvQyxXQUFXLENBQUNiLElBQVosRUFBcEMsRUFBUDtBQUNELEtBdjNCUztBQXkzQlY7QUFDQTs7QUFFQTs7Ozs7O0FBTUFjLDJCQWw0QlUsbUNBazRCY3JDLFVBbDRCZCxFQWs0QnVDO0FBQUEsVUFBYmhFLE1BQWEsdUVBQUosRUFBSTtBQUMvQ3JDLFFBQUUsQ0FBQ3lDLE1BQUgsQ0FBVSxLQUFLdkMsS0FBZixFQUFzQixZQUF0QjtBQUNBRixRQUFFLENBQUMwQyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU9rQyxPQUFPLENBQUN1QixHQUFSLENBQVksQ0FDakIsS0FBS3BDLEdBQUwsQ0FBUyxxQkFBVCxFQUFnQztBQUM5QmlGLGFBQUssRUFBRSxDQUR1QjtBQUU5QiwrQkFBdUIsQ0FGTztBQUc5QixrQ0FBMEJ0QyxVQUhJO0FBSTlCLDhCQUFzQixDQUpRO0FBSzlCLDhCQUFzQixDQUxRO0FBTTlCdUMsWUFBSSxFQUFFO0FBTndCLE9BQWhDLENBRGlCLEVBU2pCLEtBQUtsRixHQUFMLENBQVMscUJBQVQsRUFBZ0M7QUFDOUJpRixhQUFLLEVBQUUsQ0FEdUI7QUFFOUIsK0JBQXVCLENBRk87QUFHOUIsa0NBQTBCdEMsVUFISTtBQUk5Qiw0QkFBb0IsS0FBS3hFLE9BQUwsQ0FBYW1FLElBSkg7QUFLOUIsOEJBQXNCLENBTFE7QUFNOUI0QyxZQUFJLEVBQUU7QUFOd0IsT0FBaEMsQ0FUaUIsRUFpQmpCLEtBQUtsRixHQUFMLENBQVMscUJBQVQsRUFBZ0M7QUFDOUJpRixhQUFLLEVBQUUsQ0FEdUI7QUFFOUIsK0JBQXVCLENBRk87QUFHOUIsa0NBQTBCdEMsVUFISTtBQUk5Qiw0QkFBb0IsS0FBS3hFLE9BQUwsQ0FBYW1FLElBSkg7QUFLOUIsNEJBQW9CLEtBQUtuRSxPQUFMLENBQWFrRSxFQUxIO0FBTTlCNkMsWUFBSSxFQUFFO0FBTndCLE9BQWhDLENBakJpQixDQUFaLEVBeUJKMUYsSUF6QkksQ0F5QkMsVUFBQStDLE1BQU0sRUFBSTtBQUFBLHNDQUNpQkEsTUFEakI7QUFBQSxZQUNUSSxVQURTO0FBQUEsWUFDR0wsSUFESDtBQUFBLFlBQ1NFLElBRFQsZ0JBQ3lCOzs7QUFDekMsWUFBSUEsSUFBSSxDQUFDNUQsSUFBTCxJQUFhNEQsSUFBSSxDQUFDNUQsSUFBTCxDQUFVVSxNQUFWLEdBQW1CLENBQXBDLEVBQXVDO0FBQ3JDLGlCQUFPa0QsSUFBSSxDQUFDNUQsSUFBTCxDQUFVLENBQVYsQ0FBUDtBQUNEOztBQUNELFlBQUkwRCxJQUFJLENBQUMxRCxJQUFMLElBQWEwRCxJQUFJLENBQUMxRCxJQUFMLENBQVVVLE1BQVYsR0FBbUIsQ0FBcEMsRUFBdUM7QUFDckMsaUJBQU9nRCxJQUFJLENBQUMxRCxJQUFMLENBQVUsQ0FBVixDQUFQO0FBQ0Q7O0FBQ0QsWUFBSStELFVBQVUsQ0FBQy9ELElBQVgsSUFBbUIrRCxVQUFVLENBQUMvRCxJQUFYLENBQWdCVSxNQUFoQixHQUF5QixDQUFoRCxFQUFtRDtBQUNqRCxpQkFBT3FELFVBQVUsQ0FBQy9ELElBQVgsQ0FBZ0IsQ0FBaEIsQ0FBUDtBQUNEOztBQUNELGVBQU8sRUFBUDtBQUNELE9BckNNLENBQVA7QUFzQ0QsS0EzNkJTO0FBNjZCVjtBQUNBOztBQUVBOzs7OztBQUtBdUcsa0JBcjdCVSw0QkFxN0JrQjtBQUFBLFVBQWJ4RyxNQUFhLHVFQUFKLEVBQUk7QUFDMUJyQyxRQUFFLENBQUMwQyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS2lHLFFBQUwsQ0FBYyxzQkFBZCxFQUFzQ2pHLE1BQXRDLENBQVA7QUFDRCxLQXg3QlM7O0FBMDdCVjs7Ozs7QUFLQXlHLG9CQS83QlUsOEJBKzdCb0I7QUFBQSxVQUFiekcsTUFBYSx1RUFBSixFQUFJO0FBQzVCckMsUUFBRSxDQUFDMEMsYUFBSCxDQUFpQkwsTUFBakIsRUFBeUIsUUFBekI7QUFDQSxhQUFPLEtBQUtxQixHQUFMLENBQVMsaUJBQVQsRUFBNEJyQixNQUE1QixDQUFQO0FBQ0QsS0FsOEJTOztBQW84QlY7Ozs7O0FBS0EwRyxxQkF6OEJVLDZCQXk4QlF6RyxJQXo4QlIsRUF5OEJjO0FBQ3RCdEMsUUFBRSxDQUFDMkgsS0FBSCxDQUFTckYsSUFBVDtBQUNBLGFBQU8sS0FBS3FCLElBQUwsQ0FBVSxjQUFWLEVBQTBCckIsSUFBMUIsQ0FBUDtBQUNELEtBNThCUzs7QUE4OEJWOzs7OztBQUtBMEcscUJBbjlCVSw2QkFtOUJRMUcsSUFuOUJSLEVBbTlCYztBQUN0QnRDLFFBQUUsQ0FBQzJILEtBQUgsQ0FBU3JGLElBQVQ7QUFDQSxhQUFPLEtBQUt1QixLQUFMLENBQVcsY0FBWCxFQUEyQnZCLElBQTNCLENBQVA7QUFDRCxLQXQ5QlM7QUF3OUJWO0FBQ0E7O0FBRUE7Ozs7O0FBS0EyRyxnQkFoK0JVLDBCQWcrQmdCO0FBQUEsVUFBYjVHLE1BQWEsdUVBQUosRUFBSTtBQUN4QnJDLFFBQUUsQ0FBQzBDLGFBQUgsQ0FBaUJMLE1BQWpCO0FBQ0EsYUFBTyxLQUFLcUIsR0FBTCxDQUFTLFlBQVQsRUFBdUJyQixNQUF2QixDQUFQO0FBQ0QsS0FuK0JTO0FBcStCVjZHLGtCQXIrQlUsMEJBcStCSzVHLElBcitCTCxFQXErQlc7QUFDbkIsYUFBTyxLQUFLcUIsSUFBTCxDQUFVLFlBQVYsRUFBd0JyQixJQUF4QixDQUFQO0FBQ0QsS0F2K0JTO0FBeStCVjZHLGtCQXorQlUsMEJBeStCS3hDLFVBeitCTCxFQXkrQmlCckUsSUF6K0JqQixFQXkrQnVCO0FBQy9CLGFBQU8sS0FBS3VCLEtBQUwsc0JBQXlCOEMsVUFBekIsR0FBdUNyRSxJQUF2QyxDQUFQO0FBQ0QsS0EzK0JTOztBQTYrQlY7Ozs7OztBQU1BOEcsMEJBbi9CVSxrQ0FtL0JhL0MsVUFuL0JiLEVBbS9Cc0M7QUFBQSxVQUFiaEUsTUFBYSx1RUFBSixFQUFJO0FBQzlDckMsUUFBRSxDQUFDeUMsTUFBSCxDQUFVNEQsVUFBVixFQUFzQixZQUF0QjtBQUNBckcsUUFBRSxDQUFDMEMsYUFBSCxDQUFpQkwsTUFBakI7QUFFQSxhQUFPa0MsT0FBTyxDQUFDdUIsR0FBUixDQUFZLENBQ2pCLEtBQUtwQyxHQUFMLENBQVMsWUFBVCxFQUF1QjtBQUFFLG9DQUE0QjJDO0FBQTlCLE9BQXZCLENBRGlCLEVBRWpCLEtBQUszQyxHQUFMLENBQVMsWUFBVCxFQUF1QjtBQUFFLG9DQUE0QjJDO0FBQTlCLE9BQXZCLENBRmlCLENBQVosQ0FBUDtBQUlELEtBMy9CUztBQTYvQlY7QUFDQTs7QUFFQTs7Ozs7OztBQU9BZ0Qsb0JBdmdDVSw0QkF1Z0NPaEQsVUF2Z0NQLEVBdWdDbUJNLFVBdmdDbkIsRUF1Z0M0QztBQUFBLFVBQWJ0RSxNQUFhLHVFQUFKLEVBQUk7QUFDcERyQyxRQUFFLENBQUN5QyxNQUFILENBQVU0RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0FyRyxRQUFFLENBQUM0RyxPQUFILENBQVdELFVBQVgsRUFBdUIsWUFBdkI7QUFDQTNHLFFBQUUsQ0FBQzBDLGFBQUgsQ0FBaUJMLE1BQWpCLEVBQXlCLFFBQXpCOztBQUVBLFVBQUlnRSxVQUFVLENBQUM0QixVQUFYLENBQXNCLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsZUFBTyxLQUFLdkUsR0FBTCxZQUNEMkMsVUFBVSxDQUFDNkIsU0FBWCxDQUFxQixDQUFyQixDQURDLGNBQzBCdkIsVUFEMUIsaUJBRUx0RSxNQUZLLENBQVA7QUFJRDs7QUFFRCxhQUFPLEtBQUtxQixHQUFMLGtCQUFtQjJDLFVBQW5CLGNBQWlDTSxVQUFqQyxpQkFBeUR0RSxNQUF6RCxDQUFQO0FBQ0QsS0FwaENTOztBQXNoQ1Y7Ozs7Ozs7QUFPQWlILFVBN2hDVSxrQkE2aENIakQsVUE3aENHLEVBNmhDU00sVUE3aENULEVBNmhDcUI0QyxVQTdoQ3JCLEVBNmhDaUM7QUFDekN2SixRQUFFLENBQUN5QyxNQUFILENBQVU0RCxVQUFWLEVBQXNCLFlBQXRCO0FBQ0FyRyxRQUFFLENBQUM0RyxPQUFILENBQVdELFVBQVgsRUFBdUIsWUFBdkI7QUFDQTNHLFFBQUUsQ0FBQ3dKLE1BQUgsQ0FBVUQsVUFBVixFQUFzQixZQUF0Qjs7QUFFQSxVQUFJbEQsVUFBVSxDQUFDNEIsVUFBWCxDQUFzQixXQUF0QixDQUFKLEVBQXdDO0FBQ3RDLGVBQU8sS0FBS3BFLEtBQUwsWUFDRHdDLFVBQVUsQ0FBQzZCLFNBQVgsQ0FBcUIsQ0FBckIsQ0FEQyxjQUMwQnZCLFVBRDFCLHFCQUMrQzRDLFVBRC9DLEVBQVA7QUFHRDs7QUFFRCxhQUFPLEtBQUsxRixLQUFMLGtCQUNLd0MsVUFETCxjQUNtQk0sVUFEbkIscUJBQ3dDNEMsVUFEeEMsRUFBUDtBQUdELEtBM2lDUztBQTZpQ1Y7QUFDQTs7QUFFQTs7Ozs7O0FBTUFFLFdBdGpDVSxtQkFzakNGOUMsVUF0akNFLEVBc2pDdUI7QUFBQSxVQUFidEUsTUFBYSx1RUFBSixFQUFJO0FBQy9CckMsUUFBRSxDQUFDd0osTUFBSCxDQUFVN0MsVUFBVixFQUFzQixZQUF0QjtBQUNBM0csUUFBRSxDQUFDMEMsYUFBSCxDQUFpQkwsTUFBakIsRUFBeUIsUUFBekI7QUFDQSxhQUFPLEtBQUtxQixHQUFMLGtCQUFtQmlELFVBQW5CLEdBQWlDdEUsTUFBakMsQ0FBUDtBQUNELEtBMWpDUzs7QUE0akNWOzs7OztBQUtBcUgsWUFqa0NVLHNCQWlrQ1k7QUFBQSxVQUFickgsTUFBYSx1RUFBSixFQUFJO0FBQ3BCckMsUUFBRSxDQUFDMEMsYUFBSCxDQUFpQkwsTUFBakIsRUFBeUIsUUFBekI7QUFDQSxhQUFPLEtBQUtxQixHQUFMLENBQVMsUUFBVCxFQUFtQnJCLE1BQW5CLENBQVA7QUFDRCxLQXBrQ1M7O0FBc2tDVjs7Ozs7O0FBTUFzSCxjQTVrQ1Usc0JBNGtDQ2hELFVBNWtDRCxFQTRrQ2EvQyxJQTVrQ2IsRUE0a0NtQjtBQUMzQjVELFFBQUUsQ0FBQzRHLE9BQUgsQ0FBV0QsVUFBWCxFQUF1QixZQUF2QjtBQUNBM0csUUFBRSxDQUFDbUUsTUFBSCxDQUFVUCxJQUFWLEVBQWdCLE1BQWhCO0FBQ0EsYUFBTyxLQUFLb0UsVUFBTCxDQUFnQixnQkFBaEIsRUFBa0NyQixVQUFsQyxFQUE4Qy9DLElBQTlDLENBQVA7QUFDRCxLQWhsQ1M7O0FBa2xDVjs7Ozs7QUFLQWdHLGNBdmxDVSxzQkF1bENDaEcsSUF2bENELEVBdWxDTztBQUNmNUQsUUFBRSxDQUFDbUUsTUFBSCxDQUFVUCxJQUFWLEVBQWdCLE1BQWhCO0FBQ0EsYUFBTyxLQUFLd0UsVUFBTCxDQUFnQixnQkFBaEIsRUFBa0N4RSxJQUFsQyxDQUFQO0FBQ0QsS0ExbENTOztBQTRsQ1Y7Ozs7O0FBS0FpRyxjQWptQ1Usc0JBaW1DQ2xELFVBam1DRCxFQWltQ2E7QUFDckIzRyxRQUFFLENBQUM0RyxPQUFILENBQVdELFVBQVgsRUFBdUIsWUFBdkI7QUFDQSxhQUFPLEtBQUs0QixVQUFMLENBQWdCLGdCQUFoQixFQUFrQzVCLFVBQWxDLENBQVA7QUFDRCxLQXBtQ1M7QUFzbUNWO0FBQ0E7O0FBRUE7Ozs7O0FBS0FtRCxlQTltQ1UseUJBOG1DZTtBQUFBLFVBQWJ6SCxNQUFhLHVFQUFKLEVBQUk7QUFDdkJyQyxRQUFFLENBQUMwQyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxXQUFULEVBQXNCckIsTUFBdEIsQ0FBUDtBQUNELEtBam5DUzs7QUFtbkNWOzs7OztBQUtBMEgscUJBeG5DVSwrQkF3bkNxQjtBQUFBLFVBQWIxSCxNQUFhLHVFQUFKLEVBQUk7QUFDN0JyQyxRQUFFLENBQUMwQyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxrQkFBVCxFQUE2QnJCLE1BQTdCLENBQVA7QUFDRCxLQTNuQ1M7QUE2bkNWO0FBQ0E7O0FBRUE7Ozs7O0FBS0EySCxZQXJvQ1Usc0JBcW9DWTtBQUFBLFVBQWIzSCxNQUFhLHVFQUFKLEVBQUk7QUFDcEJyQyxRQUFFLENBQUMwQyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxRQUFULEVBQW1CckIsTUFBbkIsQ0FBUDtBQUNELEtBeG9DUzs7QUEwb0NWOzs7Ozs7QUFNQTRILFdBaHBDVSxtQkFncENGdEQsVUFocENFLEVBZ3BDdUI7QUFBQSxVQUFidEUsTUFBYSx1RUFBSixFQUFJO0FBQy9CckMsUUFBRSxDQUFDNEcsT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCO0FBQ0EzRyxRQUFFLENBQUMwQyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsa0JBQW1CaUQsVUFBbkIsR0FBaUN0RSxNQUFqQyxDQUFQO0FBQ0QsS0FwcENTOztBQXNwQ1Y7Ozs7O0FBS0E2SCxTQTNwQ1UsbUJBMnBDUztBQUFBLFVBQWI3SCxNQUFhLHVFQUFKLEVBQUk7QUFDakJyQyxRQUFFLENBQUMwQyxhQUFILENBQWlCTCxNQUFqQixFQUF5QixRQUF6QjtBQUNBLGFBQU8sS0FBS3FCLEdBQUwsQ0FBUyxXQUFULEVBQXNCckIsTUFBdEIsQ0FBUDtBQUNELEtBOXBDUzs7QUFncUNWOzs7Ozs7QUFNQThILGNBdHFDVSxzQkFzcUNDeEQsVUF0cUNELEVBc3FDYS9DLElBdHFDYixFQXNxQ21CO0FBQzNCNUQsUUFBRSxDQUFDNEcsT0FBSCxDQUFXRCxVQUFYLEVBQXVCLFlBQXZCO0FBQ0EzRyxRQUFFLENBQUNtRSxNQUFILENBQVVQLElBQVYsRUFBZ0IsTUFBaEI7QUFDQSxhQUFPLEtBQUtvRSxVQUFMLENBQWdCLGdCQUFoQixFQUFrQ3JCLFVBQWxDLEVBQThDL0MsSUFBOUMsQ0FBUDtBQUNELEtBMXFDUztBQTRxQ1Y7QUFDQTs7QUFFQTs7OztBQUlBd0csUUFuckNVLGtCQW1yQ0g7QUFDTCxhQUFPLEtBQUtsSSxPQUFMLENBQWEsS0FBYixFQUFvQixjQUFwQixFQUFvQyxFQUFwQyxFQUF3QyxFQUF4QyxFQUE0QyxJQUE1QyxDQUFQO0FBQ0QsS0FyckNTOztBQXVyQ1Y7Ozs7QUFJQW1JLGNBM3JDVSx3QkEyckNHO0FBQ1gsYUFBTyxLQUFLbkksT0FBTCxDQUFhLEtBQWIsRUFBb0IsR0FBcEIsRUFBeUIsRUFBekIsRUFBNkIsRUFBN0IsRUFBaUMsSUFBakMsQ0FBUDtBQUNELEtBN3JDUzs7QUErckNWOzs7O0FBSUFvSSxlQW5zQ1UseUJBbXNDSTtBQUNaLGFBQU8sS0FBS3BJLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLEdBQXBCLENBQVA7QUFDRCxLQXJzQ1M7O0FBdXNDVjs7OztBQUlBcUksOEJBM3NDVSx3Q0Eyc0NtQjtBQUMzQixhQUFPLEtBQUs3RyxHQUFMLENBQVMsV0FBVCxDQUFQO0FBQ0Q7QUE3c0NTLEdBQVosQ0FuQ3lCLENBbXZDekI7O0FBQ0EsTUFBSTVDLEdBQUcsQ0FBQ1osS0FBSixJQUFhWSxHQUFHLENBQUNaLEtBQUosQ0FBVXNLLFFBQVYsQ0FBbUIsR0FBbkIsQ0FBakIsRUFBMEM7QUFDeEMxSixPQUFHLENBQUN3RCxhQUFKLENBQWtCLElBQWxCO0FBQ0Q7O0FBRUQsU0FBT3hELEdBQVA7QUFDRCxDLENBRUQ7QUFDQTs7O0FBRUFBLEdBQUcsQ0FBQ2IsVUFBSixHQUFpQkEsVUFBakI7QUFDQXdLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjVKLEdBQWpCLEMiLCJmaWxlIjoiZGlyZWN0dXMtc2RrLnVtZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiRGlyZWN0dXNTREtcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGlyZWN0dXNTREtcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGlyZWN0dXNTREtcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIoZnVuY3Rpb24gKCkge1xuICAgIC8qXG4gICAgICogV2Ugb25seSBkZWZpbmUgdGhlIGlzL2hhcyogZnVuY3Rpb25zIGFuZCB1c2UgdGhlXG4gICAgICogZGVtYW5kKCkgZnVuY3Rpb24gdG8gYnVpbGQgdGhlIGRlbWFuZHMsIGFsc28gdGhlXG4gICAgICogZ2V0RGVtYW5kTWV0aG9kTmFtZUJ5VmFsaWRhdG9yS2V5KCkgKHllaCwgSSBrbm93IGl0J3MgYW4gdWdseSBuYW1lIDooKVxuICAgICAqIGJ1aWxkIHRoZSBkZW1hbmQgbWV0aG9kIGJhc2VkIGluIHRoZSAuaXMvaGFzIG1ldGhvZHNcbiAgICAgKi9cblxuICAgIHZhciB2ID0geyB9O1xuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLkFyZ3VtZW50VmFsaWRhdG9yID0gdjtcbiAgICB9XG5cbiAgICB2YXIgZGVtYW5kID0gZnVuY3Rpb24gKGRlbWFuZE1ldGhvZE5hbWUsIHZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlIC8qIC4uLiBtb3JlIGFyZ3MsIG5hbWUgKi8pIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0b3IuYXBwbHkodiwgYXJndW1lbnRzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbmFtZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgLTEpWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodi5pc0pzb24odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtc2cgPSBcIkludmFsaWQgXCIgKyBkZW1hbmRNZXRob2ROYW1lICsgXCIgdmFsdWU6IFwiICsgdmFsdWU7XG4gICAgICAgICAgICBpZiAodi5pc1N0cmluZyhuYW1lKSkge1xuICAgICAgICAgICAgICAgIG1zZyArPSBcIlxcbkFyZ3VtZW50IE5hbWU6IFwiICsgbmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHYuaXNBcnJheShhcmd1bWVudHNbMV0pKSB7XG4gICAgICAgICAgICAgICAgbXNnICs9IFwiXFxuS2V5czogXCIgKyBhcmd1bWVudHNbMV0uam9pbihcIiwgXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZ2V0RGVtYW5kTWV0aG9kTmFtZUJ5VmFsaWRhdG9yS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgcHJlZml4ID0gWyAnaXMnLCAnaGFzJyBdO1xuICAgICAgICB2YXIgcHJlZml4TGVuZ3RoID0gbnVsbDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHJlZml4TGVuZ3RoID0gcHJlZml4W2ldLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKGtleS5zbGljZSgwLCBwcmVmaXhMZW5ndGgpID09PSBwcmVmaXhbaV0pIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkZW1hbmRNZXRob2ROYW1lID0ga2V5LnNsaWNlKHByZWZpeExlbmd0aCArIDEpO1xuICAgICAgICB2YXIgZmlyc3RMZXR0ZXIgPSBrZXkuc2xpY2UocHJlZml4TGVuZ3RoLCBwcmVmaXhMZW5ndGggKyAxKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgbmFtZSA9IGZpcnN0TGV0dGVyICsgZGVtYW5kTWV0aG9kTmFtZTtcblxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9O1xuXG4gICAgdmFyIGhhc0tleXNXaXRoID0gZnVuY3Rpb24gKHZhbGlkYXRvciwgb2JqLCBrZXlzKSB7XG4gICAgICAgIGlmICghdi5pc09iamVjdE9yRW1wdHkob2JqKSB8fCAhdi5pc0FycmF5T3JFbXB0eShrZXlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXZhbGlkYXRvcihvYmpba2V5c1tpXV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHZhciBpc0FycmF5T2YgPSBmdW5jdGlvbiAodmFsaWRhdG9yLCBhcnIpIHtcbiAgICAgICAgaWYgKCF2LmlzQXJyYXkoYXJyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdmFsaWRhdG9yKGFycltpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdi5pc05vdE51bGwgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIHYuaXNJbnN0YW5jZU9mID0gZnVuY3Rpb24odHlwZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgdHlwZTtcbiAgICB9O1xuXG4gICAgdi5pc1R5cGUgPSBmdW5jdGlvbiAodHlwZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBcIiArIHR5cGUgKyBcIl1cIjtcbiAgICB9O1xuXG4gICAgdi5pc0Jvb2xlYW4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIChbIDEsIDAsIHRydWUsIGZhbHNlIF0uaW5kZXhPZih2YWx1ZSkgPiAtMSk7XG4gICAgfTtcblxuICAgIHYuaXNTdHJpbmdPckVtcHR5ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2LmlzVHlwZShcIlN0cmluZ1wiLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIHYuaXNTdHJpbmcgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF2LmlzU3RyaW5nT3JFbXB0eSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gL1xcUy8udGVzdCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIHYuaXNOdW1iZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF2LmlzVHlwZSgnTnVtYmVyJywgdmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXNGaW5pdGUodmFsdWUpICYmICFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSk7XG4gICAgfTtcblxuICAgIHYuaXNBcnJheU9yRW1wdHkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHJldHVybiB2LmlzVHlwZShcIkFycmF5XCIsIGFycik7XG4gICAgfTtcblxuICAgIHYuaXNBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgaWYgKCF2LmlzQXJyYXlPckVtcHR5KGFycikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcnIubGVuZ3RoID4gMDtcbiAgICB9O1xuXG4gICAgdi5pc0FycmF5T2ZOdW1iZXJzID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICByZXR1cm4gaXNBcnJheU9mKHYuaXNOdW1iZXIsIGFycik7XG4gICAgfTtcblxuICAgIHYuaXNBcnJheU9mT2JqZWN0cyA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXlPZih2LmlzT2JqZWN0LCBhcnIpO1xuICAgIH07XG5cbiAgICB2LmlzT2JqZWN0T3JFbXB0eSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIHYuaXNUeXBlKFwiT2JqZWN0XCIsIG9iaik7XG4gICAgfTtcblxuICAgIHYuaXNPYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGlmICghdi5pc09iamVjdE9yRW1wdHkob2JqKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdi5pc0pzb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF2LmlzT2JqZWN0T3JFbXB0eSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHYuaXNKc29uU3RyaW5nID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdi5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdi5oYXNLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICAgICAgICByZXR1cm4gaGFzS2V5c1dpdGgodi5pc05vdE51bGwsIG9iaiwga2V5cyk7XG4gICAgfTtcblxuICAgIHYuaGFzS2V5c1dpdGhOdW1iZXIgPSB2Lmhhc051bWJlcktleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgICAgIHJldHVybiBoYXNLZXlzV2l0aCh2LmlzTnVtYmVyLCBvYmosIGtleXMpO1xuICAgIH07XG5cbiAgICB2Lmhhc0tleXNXaXRoU3RyaW5nID0gdi5oYXNTdHJpbmdLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICAgICAgICByZXR1cm4gaGFzS2V5c1dpdGgodi5pc1N0cmluZywgb2JqLCBrZXlzKTtcbiAgICB9O1xuXG4gICAgdi5oYXNLZXlzV2l0aE9iamVjdCA9IHYuaGFzT2JqZWN0S2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICAgICAgcmV0dXJuIGhhc0tleXNXaXRoKHYuaXNPYmplY3QsIG9iaiwga2V5cyk7XG4gICAgfTtcblxuICAgIHYuaGFzS2V5c1dpdGhTdHJpbmdPckVtcHR5ID0gdi5oYXNTdHJpbmdPckVtcHR5S2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICAgICAgcmV0dXJuIGhhc0tleXNXaXRoKHYuaXNTdHJpbmdPckVtcHR5LCBvYmosIGtleXMpO1xuICAgIH07XG5cbiAgICB2Lmhhc0tleXNXaXRoT2JqZWN0T3JFbXB0eSA9IHYuaGFzT2JqZWN0T3JFbXB0eUtleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgICAgIHJldHVybiBoYXNLZXlzV2l0aCh2LmlzT2JqZWN0T3JFbXB0eSwgb2JqLCBrZXlzKTtcbiAgICB9O1xuXG4gICAgdi5pc0Z1bmN0aW9uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2LmlzSW5zdGFuY2VPZihGdW5jdGlvbiwgdmFsdWUpO1xuICAgIH07XG5cbiAgICAvLyBidWlsZCBkZW1hbmQgZnVuY3Rpb25zXG4gICAgZm9yICh2YXIga2V5IGluIHYpIHtcbiAgICAgICAgdmFyIGRlbWFuZE1ldGhvZE5hbWUgPSBnZXREZW1hbmRNZXRob2ROYW1lQnlWYWxpZGF0b3JLZXkoa2V5KTtcbiAgICAgICAgdltkZW1hbmRNZXRob2ROYW1lXSA9IGRlbWFuZChkZW1hbmRNZXRob2ROYW1lLCB2W2tleV0pO1xuICAgIH1cblxufSkuY2FsbCh0aGlzKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xudmFyIGJ0b2EgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmJ0b2EgJiYgd2luZG93LmJ0b2EuYmluZCh3aW5kb3cpKSB8fCByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnRvYScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHZhciBsb2FkRXZlbnQgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbiAgICB2YXIgeERvbWFpbiA9IGZhbHNlO1xuXG4gICAgLy8gRm9yIElFIDgvOSBDT1JTIHN1cHBvcnRcbiAgICAvLyBPbmx5IHN1cHBvcnRzIFBPU1QgYW5kIEdFVCBjYWxscyBhbmQgZG9lc24ndCByZXR1cm5zIHRoZSByZXNwb25zZSBoZWFkZXJzLlxuICAgIC8vIERPTidUIGRvIHRoaXMgZm9yIHRlc3RpbmcgYi9jIFhNTEh0dHBSZXF1ZXN0IGlzIG1vY2tlZCwgbm90IFhEb21haW5SZXF1ZXN0LlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnICYmXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCAmJiAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAgICFpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgd2luZG93LlhEb21haW5SZXF1ZXN0KCk7XG4gICAgICBsb2FkRXZlbnQgPSAnb25sb2FkJztcbiAgICAgIHhEb21haW4gPSB0cnVlO1xuICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24gaGFuZGxlUHJvZ3Jlc3MoKSB7fTtcbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHt9O1xuICAgIH1cblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3RbbG9hZEV2ZW50XSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCAmJiAheERvbWFpbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgLy8gSUUgc2VuZHMgMTIyMyBpbnN0ZWFkIG9mIDIwNCAoaHR0cHM6Ly9naXRodWIuY29tL2F4aW9zL2F4aW9zL2lzc3Vlcy8yMDEpXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKHV0aWxzLm1lcmdlKGRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi8uLi9kZWZhdWx0cycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IHV0aWxzLm1lcmdlKHtcbiAgICAgIHVybDogYXJndW1lbnRzWzBdXG4gICAgfSwgYXJndW1lbnRzWzFdKTtcbiAgfVxuXG4gIGNvbmZpZyA9IHV0aWxzLm1lcmdlKGRlZmF1bHRzLCB7bWV0aG9kOiAnZ2V0J30sIHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIFN1cHBvcnQgYmFzZVVSTCBjb25maWdcbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgLy8gTm90ZTogc3RhdHVzIGlzIG5vdCBleHBvc2VkIGJ5IFhEb21haW5SZXF1ZXN0XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5cbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBidG9hIHBvbHlmaWxsIGZvciBJRTwxMCBjb3VydGVzeSBodHRwczovL2dpdGh1Yi5jb20vZGF2aWRjaGFtYmVycy9CYXNlNjQuanNcblxudmFyIGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JztcblxuZnVuY3Rpb24gRSgpIHtcbiAgdGhpcy5tZXNzYWdlID0gJ1N0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3Rlcic7XG59XG5FLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcbkUucHJvdG90eXBlLmNvZGUgPSA1O1xuRS5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5mdW5jdGlvbiBidG9hKGlucHV0KSB7XG4gIHZhciBzdHIgPSBTdHJpbmcoaW5wdXQpO1xuICB2YXIgb3V0cHV0ID0gJyc7XG4gIGZvciAoXG4gICAgLy8gaW5pdGlhbGl6ZSByZXN1bHQgYW5kIGNvdW50ZXJcbiAgICB2YXIgYmxvY2ssIGNoYXJDb2RlLCBpZHggPSAwLCBtYXAgPSBjaGFycztcbiAgICAvLyBpZiB0aGUgbmV4dCBzdHIgaW5kZXggZG9lcyBub3QgZXhpc3Q6XG4gICAgLy8gICBjaGFuZ2UgdGhlIG1hcHBpbmcgdGFibGUgdG8gXCI9XCJcbiAgICAvLyAgIGNoZWNrIGlmIGQgaGFzIG5vIGZyYWN0aW9uYWwgZGlnaXRzXG4gICAgc3RyLmNoYXJBdChpZHggfCAwKSB8fCAobWFwID0gJz0nLCBpZHggJSAxKTtcbiAgICAvLyBcIjggLSBpZHggJSAxICogOFwiIGdlbmVyYXRlcyB0aGUgc2VxdWVuY2UgMiwgNCwgNiwgOFxuICAgIG91dHB1dCArPSBtYXAuY2hhckF0KDYzICYgYmxvY2sgPj4gOCAtIGlkeCAlIDEgKiA4KVxuICApIHtcbiAgICBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGlkeCArPSAzIC8gNCk7XG4gICAgaWYgKGNoYXJDb2RlID4gMHhGRikge1xuICAgICAgdGhyb3cgbmV3IEUoKTtcbiAgICB9XG4gICAgYmxvY2sgPSBibG9jayA8PCA4IHwgY2hhckNvZGU7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidG9hO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdmFyIG9yaWdpblVSTDtcblxuICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcbiIsIi8qISBodHRwOi8vbXRocy5iZS9iYXNlNjQgdjAuMS4wIGJ5IEBtYXRoaWFzIHwgTUlUIGxpY2Vuc2UgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2AuXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSwgYW5kIHVzZVxuXHQvLyBpdCBhcyBgcm9vdGAuXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIEludmFsaWRDaGFyYWN0ZXJFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9O1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yO1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuXHR2YXIgZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0Ly8gTm90ZTogdGhlIGVycm9yIG1lc3NhZ2VzIHVzZWQgdGhyb3VnaG91dCB0aGlzIGZpbGUgbWF0Y2ggdGhvc2UgdXNlZCBieVxuXHRcdC8vIHRoZSBuYXRpdmUgYGF0b2JgL2BidG9hYCBpbXBsZW1lbnRhdGlvbiBpbiBDaHJvbWl1bS5cblx0XHR0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHZhciBUQUJMRSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI3NwYWNlLWNoYXJhY3RlclxuXHR2YXIgUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUyA9IC9bXFx0XFxuXFxmXFxyIF0vZztcblxuXHQvLyBgZGVjb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGF0b2JgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZC4gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1hdG9iXG5cdC8vIFRoZSBvcHRpbWl6ZWQgYmFzZTY0LWRlY29kaW5nIGFsZ29yaXRobSB1c2VkIGlzIGJhc2VkIG9uIEBhdGvigJlzIGV4Y2VsbGVudFxuXHQvLyBpbXBsZW1lbnRhdGlvbi4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYXRrLzEwMjAzOTZcblx0dmFyIGRlY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpXG5cdFx0XHQucmVwbGFjZShSRUdFWF9TUEFDRV9DSEFSQUNURVJTLCAnJyk7XG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHRpZiAobGVuZ3RoICUgNCA9PSAwKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoLz09PyQvLCAnJyk7XG5cdFx0XHRsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGxlbmd0aCAlIDQgPT0gMSB8fFxuXHRcdFx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvQyNhbHBoYW51bWVyaWMtYXNjaWktY2hhcmFjdGVyc1xuXHRcdFx0L1teK2EtekEtWjAtOS9dLy50ZXN0KGlucHV0KVxuXHRcdCkge1xuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdJbnZhbGlkIGNoYXJhY3RlcjogdGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgYml0Q291bnRlciA9IDA7XG5cdFx0dmFyIGJpdFN0b3JhZ2U7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdGJ1ZmZlciA9IFRBQkxFLmluZGV4T2YoaW5wdXQuY2hhckF0KHBvc2l0aW9uKSk7XG5cdFx0XHRiaXRTdG9yYWdlID0gYml0Q291bnRlciAlIDQgPyBiaXRTdG9yYWdlICogNjQgKyBidWZmZXIgOiBidWZmZXI7XG5cdFx0XHQvLyBVbmxlc3MgdGhpcyBpcyB0aGUgZmlyc3Qgb2YgYSBncm91cCBvZiA0IGNoYXJhY3RlcnPigKZcblx0XHRcdGlmIChiaXRDb3VudGVyKysgJSA0KSB7XG5cdFx0XHRcdC8vIOKApmNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBhIHNpbmdsZSBBU0NJSSBjaGFyYWN0ZXIuXG5cdFx0XHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdFx0XHRcdDB4RkYgJiBiaXRTdG9yYWdlID4+ICgtMiAqIGJpdENvdW50ZXIgJiA2KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdC8vIGBlbmNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYnRvYWAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkOiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWJ0b2Fcblx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuXHRcdGlmICgvW15cXDAtXFx4RkZdLy50ZXN0KGlucHV0KSkge1xuXHRcdFx0Ly8gTm90ZTogbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMgaGVyZSwgYXMgc3Vycm9nYXRlcyBhcmVcblx0XHRcdC8vIG1hdGNoZWQsIGFuZCB0aGUgaW5wdXQgaXMgc3VwcG9zZWQgdG8gb25seSBjb250YWluIEFTQ0lJIGFueXdheS5cblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkIGNvbnRhaW5zIGNoYXJhY3RlcnMgb3V0c2lkZSBvZiB0aGUgJyArXG5cdFx0XHRcdCdMYXRpbjEgcmFuZ2UuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIHBhZGRpbmcgPSBpbnB1dC5sZW5ndGggJSAzO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR2YXIgYTtcblx0XHR2YXIgYjtcblx0XHR2YXIgYztcblx0XHR2YXIgZDtcblx0XHR2YXIgYnVmZmVyO1xuXHRcdC8vIE1ha2Ugc3VyZSBhbnkgcGFkZGluZyBpcyBoYW5kbGVkIG91dHNpZGUgb2YgdGhlIGxvb3AuXG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIHBhZGRpbmc7XG5cblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gUmVhZCB0aHJlZSBieXRlcywgaS5lLiAyNCBiaXRzLlxuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDE2O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbikgPDwgODtcblx0XHRcdGMgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGIgKyBjO1xuXHRcdFx0Ly8gVHVybiB0aGUgMjQgYml0cyBpbnRvIGZvdXIgY2h1bmtzIG9mIDYgYml0cyBlYWNoLCBhbmQgYXBwZW5kIHRoZVxuXHRcdFx0Ly8gbWF0Y2hpbmcgY2hhcmFjdGVyIGZvciBlYWNoIG9mIHRoZW0gdG8gdGhlIG91dHB1dC5cblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTggJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTIgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gNiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciAmIDB4M0YpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChwYWRkaW5nID09IDIpIHtcblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYjtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTApICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPj4gNCkgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDIpICYgMHgzRikgK1xuXHRcdFx0XHQnPSdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChwYWRkaW5nID09IDEpIHtcblx0XHRcdGJ1ZmZlciA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAyKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDQpICYgMHgzRikgK1xuXHRcdFx0XHQnPT0nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0dmFyIGJhc2U2NCA9IHtcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J3ZlcnNpb24nOiAnMC4xLjAnXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTY0O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gYmFzZTY0O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYmFzZTY0KSB7XG5cdFx0XHRcdGJhc2U2NC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gYmFzZTY0W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QuYmFzZTY0ID0gYmFzZTY0O1xuXHR9XG5cbn0odGhpcykpO1xuIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIChpc0J1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopIHx8ICEhb2JqLl9pc0J1ZmZlcilcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0J1ZmZlcihvYmouc2xpY2UoMCwgMCkpXG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBwZXJjZW50VHdlbnRpZXMgPSAvJTIwL2c7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdkZWZhdWx0JzogJ1JGQzM5ODYnLFxuICAgIGZvcm1hdHRlcnM6IHtcbiAgICAgICAgUkZDMTczODogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZS5jYWxsKHZhbHVlLCBwZXJjZW50VHdlbnRpZXMsICcrJyk7XG4gICAgICAgIH0sXG4gICAgICAgIFJGQzM5ODY6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBSRkMxNzM4OiAnUkZDMTczOCcsXG4gICAgUkZDMzk4NjogJ1JGQzM5ODYnXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9zdHJpbmdpZnknKTtcbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKTtcbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZvcm1hdHM6IGZvcm1hdHMsXG4gICAgcGFyc2U6IHBhcnNlLFxuICAgIHN0cmluZ2lmeTogc3RyaW5naWZ5XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgICBhbGxvd1Byb3RvdHlwZXM6IGZhbHNlLFxuICAgIGFycmF5TGltaXQ6IDIwLFxuICAgIGRlY29kZXI6IHV0aWxzLmRlY29kZSxcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBkZXB0aDogNSxcbiAgICBwYXJhbWV0ZXJMaW1pdDogMTAwMCxcbiAgICBwbGFpbk9iamVjdHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBwYXJzZVZhbHVlcyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdWYWx1ZXMoc3RyLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIHZhciBjbGVhblN0ciA9IG9wdGlvbnMuaWdub3JlUXVlcnlQcmVmaXggPyBzdHIucmVwbGFjZSgvXlxcPy8sICcnKSA6IHN0cjtcbiAgICB2YXIgbGltaXQgPSBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSBJbmZpbml0eSA/IHVuZGVmaW5lZCA6IG9wdGlvbnMucGFyYW1ldGVyTGltaXQ7XG4gICAgdmFyIHBhcnRzID0gY2xlYW5TdHIuc3BsaXQob3B0aW9ucy5kZWxpbWl0ZXIsIGxpbWl0KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcblxuICAgICAgICB2YXIgYnJhY2tldEVxdWFsc1BvcyA9IHBhcnQuaW5kZXhPZignXT0nKTtcbiAgICAgICAgdmFyIHBvcyA9IGJyYWNrZXRFcXVhbHNQb3MgPT09IC0xID8gcGFydC5pbmRleE9mKCc9JykgOiBicmFja2V0RXF1YWxzUG9zICsgMTtcblxuICAgICAgICB2YXIga2V5LCB2YWw7XG4gICAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydCwgZGVmYXVsdHMuZGVjb2Rlcik7XG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA/IG51bGwgOiAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGtleSA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LnNsaWNlKDAsIHBvcyksIGRlZmF1bHRzLmRlY29kZXIpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UocG9zICsgMSksIGRlZmF1bHRzLmRlY29kZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gW10uY29uY2F0KG9ialtrZXldKS5jb25jYXQodmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBwYXJzZU9iamVjdCA9IGZ1bmN0aW9uIChjaGFpbiwgdmFsLCBvcHRpb25zKSB7XG4gICAgdmFyIGxlYWYgPSB2YWw7XG5cbiAgICBmb3IgKHZhciBpID0gY2hhaW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIG9iajtcbiAgICAgICAgdmFyIHJvb3QgPSBjaGFpbltpXTtcblxuICAgICAgICBpZiAocm9vdCA9PT0gJ1tdJykge1xuICAgICAgICAgICAgb2JqID0gW107XG4gICAgICAgICAgICBvYmogPSBvYmouY29uY2F0KGxlYWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgICAgICAgICB2YXIgY2xlYW5Sb290ID0gcm9vdC5jaGFyQXQoMCkgPT09ICdbJyAmJiByb290LmNoYXJBdChyb290Lmxlbmd0aCAtIDEpID09PSAnXScgPyByb290LnNsaWNlKDEsIC0xKSA6IHJvb3Q7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludChjbGVhblJvb3QsIDEwKTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhaXNOYU4oaW5kZXgpXG4gICAgICAgICAgICAgICAgJiYgcm9vdCAhPT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgU3RyaW5nKGluZGV4KSA9PT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgaW5kZXggPj0gMFxuICAgICAgICAgICAgICAgICYmIChvcHRpb25zLnBhcnNlQXJyYXlzICYmIGluZGV4IDw9IG9wdGlvbnMuYXJyYXlMaW1pdClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgICAgIG9ialtpbmRleF0gPSBsZWFmO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbY2xlYW5Sb290XSA9IGxlYWY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZWFmID0gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiBsZWFmO1xufTtcblxudmFyIHBhcnNlS2V5cyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdLZXlzKGdpdmVuS2V5LCB2YWwsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWdpdmVuS2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUcmFuc2Zvcm0gZG90IG5vdGF0aW9uIHRvIGJyYWNrZXQgbm90YXRpb25cbiAgICB2YXIga2V5ID0gb3B0aW9ucy5hbGxvd0RvdHMgPyBnaXZlbktleS5yZXBsYWNlKC9cXC4oW14uW10rKS9nLCAnWyQxXScpIDogZ2l2ZW5LZXk7XG5cbiAgICAvLyBUaGUgcmVnZXggY2h1bmtzXG5cbiAgICB2YXIgYnJhY2tldHMgPSAvKFxcW1teW1xcXV0qXSkvO1xuICAgIHZhciBjaGlsZCA9IC8oXFxbW15bXFxdXSpdKS9nO1xuXG4gICAgLy8gR2V0IHRoZSBwYXJlbnRcblxuICAgIHZhciBzZWdtZW50ID0gYnJhY2tldHMuZXhlYyhrZXkpO1xuICAgIHZhciBwYXJlbnQgPSBzZWdtZW50ID8ga2V5LnNsaWNlKDAsIHNlZ21lbnQuaW5kZXgpIDoga2V5O1xuXG4gICAgLy8gU3Rhc2ggdGhlIHBhcmVudCBpZiBpdCBleGlzdHNcblxuICAgIHZhciBrZXlzID0gW107XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgICAvLyBJZiB3ZSBhcmVuJ3QgdXNpbmcgcGxhaW4gb2JqZWN0cywgb3B0aW9uYWxseSBwcmVmaXgga2V5c1xuICAgICAgICAvLyB0aGF0IHdvdWxkIG92ZXJ3cml0ZSBvYmplY3QgcHJvdG90eXBlIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKCFvcHRpb25zLnBsYWluT2JqZWN0cyAmJiBoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBwYXJlbnQpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAga2V5cy5wdXNoKHBhcmVudCk7XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGNoaWxkcmVuIGFwcGVuZGluZyB0byB0aGUgYXJyYXkgdW50aWwgd2UgaGl0IGRlcHRoXG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKChzZWdtZW50ID0gY2hpbGQuZXhlYyhrZXkpKSAhPT0gbnVsbCAmJiBpIDwgb3B0aW9ucy5kZXB0aCkge1xuICAgICAgICBpICs9IDE7XG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc2VnbWVudFsxXS5zbGljZSgxLCAtMSkpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGtleXMucHVzaChzZWdtZW50WzFdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSdzIGEgcmVtYWluZGVyLCBqdXN0IGFkZCB3aGF0ZXZlciBpcyBsZWZ0XG5cbiAgICBpZiAoc2VnbWVudCkge1xuICAgICAgICBrZXlzLnB1c2goJ1snICsga2V5LnNsaWNlKHNlZ21lbnQuaW5kZXgpICsgJ10nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VPYmplY3Qoa2V5cywgdmFsLCBvcHRpb25zKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0ciwgb3B0cykge1xuICAgIHZhciBvcHRpb25zID0gb3B0cyA/IHV0aWxzLmFzc2lnbih7fSwgb3B0cykgOiB7fTtcblxuICAgIGlmIChvcHRpb25zLmRlY29kZXIgIT09IG51bGwgJiYgb3B0aW9ucy5kZWNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdGlvbnMuZGVjb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdEZWNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIG9wdGlvbnMuaWdub3JlUXVlcnlQcmVmaXggPSBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID09PSB0cnVlO1xuICAgIG9wdGlvbnMuZGVsaW1pdGVyID0gdHlwZW9mIG9wdGlvbnMuZGVsaW1pdGVyID09PSAnc3RyaW5nJyB8fCB1dGlscy5pc1JlZ0V4cChvcHRpb25zLmRlbGltaXRlcikgPyBvcHRpb25zLmRlbGltaXRlciA6IGRlZmF1bHRzLmRlbGltaXRlcjtcbiAgICBvcHRpb25zLmRlcHRoID0gdHlwZW9mIG9wdGlvbnMuZGVwdGggPT09ICdudW1iZXInID8gb3B0aW9ucy5kZXB0aCA6IGRlZmF1bHRzLmRlcHRoO1xuICAgIG9wdGlvbnMuYXJyYXlMaW1pdCA9IHR5cGVvZiBvcHRpb25zLmFycmF5TGltaXQgPT09ICdudW1iZXInID8gb3B0aW9ucy5hcnJheUxpbWl0IDogZGVmYXVsdHMuYXJyYXlMaW1pdDtcbiAgICBvcHRpb25zLnBhcnNlQXJyYXlzID0gb3B0aW9ucy5wYXJzZUFycmF5cyAhPT0gZmFsc2U7XG4gICAgb3B0aW9ucy5kZWNvZGVyID0gdHlwZW9mIG9wdGlvbnMuZGVjb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuZGVjb2RlciA6IGRlZmF1bHRzLmRlY29kZXI7XG4gICAgb3B0aW9ucy5hbGxvd0RvdHMgPSB0eXBlb2Ygb3B0aW9ucy5hbGxvd0RvdHMgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuYWxsb3dEb3RzIDogZGVmYXVsdHMuYWxsb3dEb3RzO1xuICAgIG9wdGlvbnMucGxhaW5PYmplY3RzID0gdHlwZW9mIG9wdGlvbnMucGxhaW5PYmplY3RzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnBsYWluT2JqZWN0cyA6IGRlZmF1bHRzLnBsYWluT2JqZWN0cztcbiAgICBvcHRpb25zLmFsbG93UHJvdG90eXBlcyA9IHR5cGVvZiBvcHRpb25zLmFsbG93UHJvdG90eXBlcyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMgOiBkZWZhdWx0cy5hbGxvd1Byb3RvdHlwZXM7XG4gICAgb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9IHR5cGVvZiBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdGlvbnMucGFyYW1ldGVyTGltaXQgOiBkZWZhdWx0cy5wYXJhbWV0ZXJMaW1pdDtcbiAgICBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA9IHR5cGVvZiBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmc7XG5cbiAgICBpZiAoc3RyID09PSAnJyB8fCBzdHIgPT09IG51bGwgfHwgdHlwZW9mIHN0ciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIH1cblxuICAgIHZhciB0ZW1wT2JqID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBwYXJzZVZhbHVlcyhzdHIsIG9wdGlvbnMpIDogc3RyO1xuICAgIHZhciBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcblxuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUga2V5cyBhbmQgc2V0dXAgdGhlIG5ldyBvYmplY3RcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGVtcE9iaik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICB2YXIgbmV3T2JqID0gcGFyc2VLZXlzKGtleSwgdGVtcE9ialtrZXldLCBvcHRpb25zKTtcbiAgICAgICAgb2JqID0gdXRpbHMubWVyZ2Uob2JqLCBuZXdPYmosIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB1dGlscy5jb21wYWN0KG9iaik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgdG9JU08gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGVuY29kZTogdHJ1ZSxcbiAgICBlbmNvZGVyOiB1dGlscy5lbmNvZGUsXG4gICAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gICAgc2VyaWFsaXplRGF0ZTogZnVuY3Rpb24gc2VyaWFsaXplRGF0ZShkYXRlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiB0b0lTTy5jYWxsKGRhdGUpO1xuICAgIH0sXG4gICAgc2tpcE51bGxzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0dGVyLFxuICAgIGVuY29kZVZhbHVlc09ubHlcbikge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2JqID0gZmlsdGVyKHByZWZpeCwgb2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgb2JqID0gc2VyaWFsaXplRGF0ZShvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIGlmIChzdHJpY3ROdWxsSGFuZGxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVyICYmICFlbmNvZGVWYWx1ZXNPbmx5ID8gZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIpIDogcHJlZml4O1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB1dGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIpO1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIoa2V5VmFsdWUpICsgJz0nICsgZm9ybWF0dGVyKGVuY29kZXIob2JqLCBkZWZhdWx0cy5lbmNvZGVyKSldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZm9ybWF0dGVyKHByZWZpeCkgKyAnPScgKyBmb3JtYXR0ZXIoU3RyaW5nKG9iaikpXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICB2YXIgb2JqS2V5cztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBvYmpLZXlzID0gc29ydCA/IGtleXMuc29ydChzb3J0KSA6IGtleXM7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeChwcmVmaXgsIGtleSksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHlcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgcHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHlcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0cykge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzID8gdXRpbHMuYXNzaWduKHt9LCBvcHRzKSA6IHt9O1xuXG4gICAgaWYgKG9wdGlvbnMuZW5jb2RlciAhPT0gbnVsbCAmJiBvcHRpb25zLmVuY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9ucy5lbmNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGRlbGltaXRlciA9IHR5cGVvZiBvcHRpb25zLmRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5kZWxpbWl0ZXIgOiBvcHRpb25zLmRlbGltaXRlcjtcbiAgICB2YXIgc3RyaWN0TnVsbEhhbmRsaW5nID0gdHlwZW9mIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZztcbiAgICB2YXIgc2tpcE51bGxzID0gdHlwZW9mIG9wdGlvbnMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscztcbiAgICB2YXIgZW5jb2RlID0gdHlwZW9mIG9wdGlvbnMuZW5jb2RlID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmVuY29kZSA6IGRlZmF1bHRzLmVuY29kZTtcbiAgICB2YXIgZW5jb2RlciA9IHR5cGVvZiBvcHRpb25zLmVuY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLmVuY29kZXIgOiBkZWZhdWx0cy5lbmNvZGVyO1xuICAgIHZhciBzb3J0ID0gdHlwZW9mIG9wdGlvbnMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuc29ydCA6IG51bGw7XG4gICAgdmFyIGFsbG93RG90cyA9IHR5cGVvZiBvcHRpb25zLmFsbG93RG90cyA9PT0gJ3VuZGVmaW5lZCcgPyBmYWxzZSA6IG9wdGlvbnMuYWxsb3dEb3RzO1xuICAgIHZhciBzZXJpYWxpemVEYXRlID0gdHlwZW9mIG9wdGlvbnMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGU7XG4gICAgdmFyIGVuY29kZVZhbHVlc09ubHkgPSB0eXBlb2Ygb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5ID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmVuY29kZVZhbHVlc09ubHkgOiBkZWZhdWx0cy5lbmNvZGVWYWx1ZXNPbmx5O1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5mb3JtYXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvbnMuZm9ybWF0ID0gZm9ybWF0c1snZGVmYXVsdCddO1xuICAgIH0gZWxzZSBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmb3JtYXRzLmZvcm1hdHRlcnMsIG9wdGlvbnMuZm9ybWF0KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbb3B0aW9ucy5mb3JtYXRdO1xuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRpb25zLmFycmF5Rm9ybWF0IGluIGFycmF5UHJlZml4R2VuZXJhdG9ycykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdGlvbnMuYXJyYXlGb3JtYXQ7XG4gICAgfSBlbHNlIGlmICgnaW5kaWNlcycgaW4gb3B0aW9ucykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdGlvbnMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZUFycmF5UHJlZml4ID0gYXJyYXlQcmVmaXhHZW5lcmF0b3JzW2FycmF5Rm9ybWF0XTtcblxuICAgIGlmICghb2JqS2V5cykge1xuICAgICAgICBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG5cbiAgICBpZiAoc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQoc29ydCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KHN0cmluZ2lmeShcbiAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgIGVuY29kZSA/IGVuY29kZXIgOiBudWxsLFxuICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHZhciBqb2luZWQgPSBrZXlzLmpvaW4oZGVsaW1pdGVyKTtcbiAgICB2YXIgcHJlZml4ID0gb3B0aW9ucy5hZGRRdWVyeVByZWZpeCA9PT0gdHJ1ZSA/ICc/JyA6ICcnO1xuXG4gICAgcmV0dXJuIGpvaW5lZC5sZW5ndGggPiAwID8gcHJlZml4ICsgam9pbmVkIDogJyc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGhleFRhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgICAgIGFycmF5LnB1c2goJyUnICsgKChpIDwgMTYgPyAnMCcgOiAnJykgKyBpLnRvU3RyaW5nKDE2KSkudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xufSgpKTtcblxudmFyIGNvbXBhY3RRdWV1ZSA9IGZ1bmN0aW9uIGNvbXBhY3RRdWV1ZShxdWV1ZSkge1xuICAgIHZhciBvYmo7XG5cbiAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWUucG9wKCk7XG4gICAgICAgIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgdmFyIGNvbXBhY3RlZCA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9iai5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2pdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wYWN0ZWQucHVzaChvYmpbal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbS5vYmpbaXRlbS5wcm9wXSA9IGNvbXBhY3RlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnRzLmFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiBhcnJheVRvT2JqZWN0KHNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSBvcHRpb25zICYmIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRhcmdldC5wdXNoKHNvdXJjZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBsYWluT2JqZWN0cyB8fCBvcHRpb25zLmFsbG93UHJvdG90eXBlcyB8fCAhaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc291cmNlKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtzb3VyY2VdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbdGFyZ2V0LCBzb3VyY2VdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIFt0YXJnZXRdLmNvbmNhdChzb3VyY2UpO1xuICAgIH1cblxuICAgIHZhciBtZXJnZVRhcmdldCA9IHRhcmdldDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmICFBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgbWVyZ2VUYXJnZXQgPSBleHBvcnRzLmFycmF5VG9PYmplY3QodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKHRhcmdldCwgaSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0W2ldICYmIHR5cGVvZiB0YXJnZXRbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IGV4cG9ydHMubWVyZ2UodGFyZ2V0W2ldLCBpdGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKGFjYywga2V5KSkge1xuICAgICAgICAgICAgYWNjW2tleV0gPSBleHBvcnRzLm1lcmdlKGFjY1trZXldLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgbWVyZ2VUYXJnZXQpO1xufTtcblxuZXhwb3J0cy5hc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ25TaW5nbGVTb3VyY2UodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIGFjY1trZXldID0gc291cmNlW2tleV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgdGFyZ2V0KTtcbn07XG5cbmV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufTtcblxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUoc3RyKSB7XG4gICAgLy8gVGhpcyBjb2RlIHdhcyBvcmlnaW5hbGx5IHdyaXR0ZW4gYnkgQnJpYW4gV2hpdGUgKG1zY2RleCkgZm9yIHRoZSBpby5qcyBjb3JlIHF1ZXJ5c3RyaW5nIGxpYnJhcnkuXG4gICAgLy8gSXQgaGFzIGJlZW4gYWRhcHRlZCBoZXJlIGZvciBzdHJpY3RlciBhZGhlcmVuY2UgdG8gUkZDIDM5ODZcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIHZhciBzdHJpbmcgPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IHN0ciA6IFN0cmluZyhzdHIpO1xuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYyA9PT0gMHgyRCAvLyAtXG4gICAgICAgICAgICB8fCBjID09PSAweDJFIC8vIC5cbiAgICAgICAgICAgIHx8IGMgPT09IDB4NUYgLy8gX1xuICAgICAgICAgICAgfHwgYyA9PT0gMHg3RSAvLyB+XG4gICAgICAgICAgICB8fCAoYyA+PSAweDMwICYmIGMgPD0gMHgzOSkgLy8gMC05XG4gICAgICAgICAgICB8fCAoYyA+PSAweDQxICYmIGMgPD0gMHg1QSkgLy8gYS16XG4gICAgICAgICAgICB8fCAoYyA+PSAweDYxICYmIGMgPD0gMHg3QSkgLy8gQS1aXG4gICAgICAgICkge1xuICAgICAgICAgICAgb3V0ICs9IHN0cmluZy5jaGFyQXQoaSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgaGV4VGFibGVbY107XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEMwIHwgKGMgPj4gNildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweEQ4MDAgfHwgYyA+PSAweEUwMDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEUwIHwgKGMgPj4gMTIpXSArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpICs9IDE7XG4gICAgICAgIGMgPSAweDEwMDAwICsgKCgoYyAmIDB4M0ZGKSA8PCAxMCkgfCAoc3RyaW5nLmNoYXJDb2RlQXQoaSkgJiAweDNGRikpO1xuICAgICAgICBvdXQgKz0gaGV4VGFibGVbMHhGMCB8IChjID4+IDE4KV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiAxMikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbmV4cG9ydHMuY29tcGFjdCA9IGZ1bmN0aW9uIGNvbXBhY3QodmFsdWUpIHtcbiAgICB2YXIgcXVldWUgPSBbeyBvYmo6IHsgbzogdmFsdWUgfSwgcHJvcDogJ28nIH1dO1xuICAgIHZhciByZWZzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWVbaV07XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tqXTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwgJiYgcmVmcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcXVldWUucHVzaCh7IG9iajogb2JqLCBwcm9wOiBrZXkgfSk7XG4gICAgICAgICAgICAgICAgcmVmcy5wdXNoKHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tcGFjdFF1ZXVlKHF1ZXVlKTtcbn07XG5cbmV4cG9ydHMuaXNSZWdFeHAgPSBmdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyKG9iaikge1xuICAgIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopKTtcbn07XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcbiIsImNvbnN0IGF4aW9zID0gcmVxdWlyZShcImF4aW9zXCIpO1xyXG5jb25zdCBiYXNlNjQgPSByZXF1aXJlKFwiYmFzZS02NFwiKTtcclxuY29uc3QgcXMgPSByZXF1aXJlKFwicXNcIik7XHJcbmNvbnN0IEFWID0gcmVxdWlyZShcImFyZ3VtZW50LXZhbGlkYXRvclwiKTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZXMgdGhlIHBheWxvYWQgZnJvbSBhIEpXVFxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHRva2VuIFRoZSBKV1QgdG8gcmV0cmlldmUgdGhlIHBheWxvYWQgZnJvbVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgIFRoZSBKV1QgcGF5bG9hZFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGF5bG9hZCh0b2tlbikge1xyXG4gIGNvbnN0IHBheWxvYWRCYXNlNjQgPSB0b2tlblxyXG4gICAgLnNwbGl0KFwiLlwiKVsxXVxyXG4gICAgLnJlcGxhY2UoXCItXCIsIFwiK1wiKVxyXG4gICAgLnJlcGxhY2UoXCJfXCIsIFwiL1wiKTtcclxuICBjb25zdCBwYXlsb2FkRGVjb2RlZCA9IGJhc2U2NC5kZWNvZGUocGF5bG9hZEJhc2U2NCk7XHJcbiAgY29uc3QgcGF5bG9hZE9iamVjdCA9IEpTT04ucGFyc2UocGF5bG9hZERlY29kZWQpO1xyXG5cclxuICBpZiAoQVYuaXNOdW1iZXIocGF5bG9hZE9iamVjdC5leHApKSB7XHJcbiAgICBwYXlsb2FkT2JqZWN0LmV4cCA9IG5ldyBEYXRlKHBheWxvYWRPYmplY3QuZXhwICogMTAwMCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcGF5bG9hZE9iamVjdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIG5ldyBTREsgaW5zdGFuY2VcclxuICogQHBhcmFtICAgICAgIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gKiBAcGFyYW0gICAgICAge3N0cmluZ30gW29wdGlvbnMudXJsXSAgIFRoZSBBUEkgdXJsIHRvIGNvbm5lY3QgdG9cclxuICogQHBhcmFtICAgICAgIHtzdHJpbmd9IFtvcHRpb25zLnByb2plY3RdICAgVGhlIEFQSSBwcm9qZWN0IHRvIGNvbm5lY3QgdG9cclxuICogQHBhcmFtICAgICAgIHtzdHJpbmd9IFtvcHRpb25zLnRva2VuXSBUaGUgYWNjZXNzIHRva2VuIHRvIHVzZSBmb3IgcmVxdWVzdHNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBTREsob3B0aW9ucyA9IHt9KSB7XHJcbiAgbGV0IHRva2VuO1xyXG4gIGxldCB1cmw7XHJcbiAgbGV0IHByb2plY3QgPSBcIl9cIjtcclxuICBsZXQgbG9jYWxFeHA7XHJcblxyXG4gIGlmIChvcHRpb25zLnN0b3JhZ2UpIHtcclxuICAgIGxldCBzdG9yZWRJbmZvID0gb3B0aW9ucy5zdG9yYWdlLmdldEl0ZW0oXCJkaXJlY3R1cy1zZGstanNcIik7XHJcblxyXG4gICAgaWYgKHN0b3JlZEluZm8pIHtcclxuICAgICAgc3RvcmVkSW5mbyA9IEpTT04ucGFyc2Uoc3RvcmVkSW5mbyk7XHJcblxyXG4gICAgICB0b2tlbiA9IHN0b3JlZEluZm8udG9rZW47XHJcbiAgICAgIHVybCA9IHN0b3JlZEluZm8udXJsO1xyXG4gICAgICBwcm9qZWN0ID0gc3RvcmVkSW5mby5wcm9qZWN0O1xyXG4gICAgICBsb2NhbEV4cCA9IHN0b3JlZEluZm8ubG9jYWxFeHA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAob3B0aW9ucy50b2tlbikge1xyXG4gICAgdG9rZW4gPSBvcHRpb25zLnRva2VuO1xyXG4gIH1cclxuXHJcbiAgaWYgKG9wdGlvbnMudXJsKSB7XHJcbiAgICB1cmwgPSBvcHRpb25zLnVybDtcclxuICB9XHJcblxyXG4gIGlmIChvcHRpb25zLnByb2plY3QpIHtcclxuICAgIHByb2plY3QgPSBvcHRpb25zLnByb2plY3Q7XHJcbiAgfVxyXG5cclxuICBpZiAob3B0aW9ucy5sb2NhbEV4cCkge1xyXG4gICAgbG9jYWxFeHAgPSBvcHRpb25zLmxvY2FsRXhwO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgU0RLID0ge1xyXG4gICAgdXJsOiB1cmwsXHJcbiAgICB0b2tlbjogdG9rZW4sXHJcbiAgICBwcm9qZWN0OiBwcm9qZWN0LFxyXG5cclxuICAgIC8vIFRoZSB0b2tlbiB3aWxsIGNvbnRhaW4gYW4gZXhwaXJ5IHRpbWUgYmFzZWQgb24gdGhlIHNlcnZlciB0aW1lXHJcbiAgICAvLyBJbiBvcmRlciB0byBtYWtlIHN1cmUgd2UgY2hlY2sgdGhlIHJpZ2h0IGV4cGlyeSBkYXRlLCB3ZSBuZWVkIHRvXHJcbiAgICAvLyBrZWVwIGEgdmVyc2lvbiB0aGF0J3MgYmFzZWQgb24gdGhlIGJyb3dzZXIgdGltZVxyXG4gICAgbG9jYWxFeHA6IGxvY2FsRXhwLFxyXG4gICAgYXhpb3M6IGF4aW9zLmNyZWF0ZSh7XHJcbiAgICAgIHBhcmFtc1NlcmlhbGl6ZXI6IHFzLnN0cmluZ2lmeSxcclxuICAgICAgdGltZW91dDogMTAgKiA2MCAqIDEwMDAgLy8gMTAgbWluXHJcbiAgICB9KSxcclxuICAgIHJlZnJlc2hJbnRlcnZhbDogbnVsbCxcclxuICAgIG9uQXV0b1JlZnJlc2hFcnJvcjogbnVsbCxcclxuICAgIG9uQXV0b1JlZnJlc2hTdWNjZXNzOiBudWxsLFxyXG5cclxuICAgIC8vIFRoZSBzdG9yYWdlIG1ldGhvZCB0byB1c2UuIEhhcyB0byBzdXBwb3J0IGdldEl0ZW0gYW5kIHNldEl0ZW0gdG8gc3RvcmUgYW5kXHJcbiAgICAvLyByZXRyaWV2ZSB0aGUgdG9rZW5cclxuICAgIHN0b3JhZ2U6IG9wdGlvbnMuc3RvcmFnZSB8fCBudWxsLFxyXG5cclxuICAgIGdldCBwYXlsb2FkKCkge1xyXG4gICAgICBpZiAoIUFWLmlzU3RyaW5nKHRoaXMudG9rZW4pKSByZXR1cm4gbnVsbDtcclxuICAgICAgcmV0dXJuIGdldFBheWxvYWQodGhpcy50b2tlbik7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldCBsb2dnZWRJbigpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIEFWLmlzU3RyaW5nKHRoaXMudG9rZW4pICYmXHJcbiAgICAgICAgQVYuaXNTdHJpbmcodGhpcy51cmwpICYmXHJcbiAgICAgICAgQVYuaXNTdHJpbmcodGhpcy5wcm9qZWN0KSAmJlxyXG4gICAgICAgIEFWLmlzT2JqZWN0KHRoaXMucGF5bG9hZClcclxuICAgICAgKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9jYWxFeHAgPiBEYXRlLm5vdygpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBSRVFVRVNUIE1FVEhPRFNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpcmVjdHVzIEFQSSByZXF1ZXN0IHByb21pc2VcclxuICAgICAqIEBwcm9taXNlIFJlcXVlc3RQcm9taXNlXHJcbiAgICAgKiBAZnVsZmlsbCB7b2JqZWN0fSBEaXJlY3R1cyBkYXRhXHJcbiAgICAgKiBAcmVqZWN0IHtFcnJvcn0gTmV0d29yayBlcnJvciAoaWYgbm8gY29ubmVjdGlvbiB0byBBUEkpXHJcbiAgICAgKiBAcmVqZWN0IHtFcnJvcn0gRGlyZWN0dXMgZXJyb3IgKGVnIG5vdCBsb2dnZWQgaW4gb3IgNDA0KVxyXG4gICAgICovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQZXJmb3JtIGFuIEFQSSByZXF1ZXN0IHRvIHRoZSBEaXJlY3R1cyBBUElcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbWV0aG9kICAgICAgVGhlIEhUVFAgbWV0aG9kIHRvIHVzZVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBlbmRwb2ludCAgICBUaGUgQVBJIGVuZHBvaW50IHRvIHJlcXVlc3RcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gVGhlIEhUVFAgcXVlcnkgcGFyYW1ldGVycyAoR0VUIG9ubHkpXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtkYXRhPXt9XSAgIFRoZSBIVFRQIHJlcXVlc3QgYm9keSAobm9uLUdFVCBvbmx5KVxyXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gbm9FbnYgICAgICBEb24ndCB1c2UgdGhlIHByb2plY3QgaW4gdGhlIHBhdGhcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICByZXF1ZXN0KFxyXG4gICAgICBtZXRob2QsXHJcbiAgICAgIGVuZHBvaW50LFxyXG4gICAgICBwYXJhbXMgPSB7fSxcclxuICAgICAgZGF0YSA9IHt9LFxyXG4gICAgICBub0VudiA9IGZhbHNlLFxyXG4gICAgICBoZWFkZXJzID0ge31cclxuICAgICkge1xyXG4gICAgICBBVi5zdHJpbmcobWV0aG9kLCBcIm1ldGhvZFwiKTtcclxuICAgICAgQVYuc3RyaW5nKGVuZHBvaW50LCBcImVuZHBvaW50XCIpO1xyXG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XHJcbiAgICAgIEFycmF5LmlzQXJyYXkoZGF0YSlcclxuICAgICAgICA/IEFWLmFycmF5T3JFbXB0eShkYXRhLCBcImRhdGFcIilcclxuICAgICAgICA6IEFWLm9iamVjdE9yRW1wdHkoZGF0YSwgXCJkYXRhXCIpO1xyXG5cclxuICAgICAgQVYuc3RyaW5nKHRoaXMudXJsLCBcInRoaXMudXJsXCIpO1xyXG5cclxuICAgICAgbGV0IGJhc2VVUkwgPSBgJHt0aGlzLnVybH0vYDtcclxuXHJcbiAgICAgIGlmIChub0VudiA9PT0gZmFsc2UpIHtcclxuICAgICAgICBiYXNlVVJMICs9IGAke3RoaXMucHJvamVjdH0vYDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XHJcbiAgICAgICAgdXJsOiBlbmRwb2ludCxcclxuICAgICAgICBtZXRob2QsXHJcbiAgICAgICAgYmFzZVVSTCxcclxuICAgICAgICBwYXJhbXMsXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMudG9rZW4gJiZcclxuICAgICAgICB0eXBlb2YgdGhpcy50b2tlbiA9PT0gXCJzdHJpbmdcIiAmJlxyXG4gICAgICAgIHRoaXMudG9rZW4ubGVuZ3RoID4gMFxyXG4gICAgICApIHtcclxuICAgICAgICByZXF1ZXN0T3B0aW9ucy5oZWFkZXJzID0gaGVhZGVycztcclxuICAgICAgICByZXF1ZXN0T3B0aW9ucy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dGhpcy50b2tlbn1gO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5heGlvc1xyXG4gICAgICAgIC5yZXF1ZXN0KHJlcXVlc3RPcHRpb25zKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGRhdGE7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBkYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cge1xyXG4gICAgICAgICAgICAgICAganNvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVycm9yLFxyXG4gICAgICAgICAgICAgICAgZGF0YVxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcjtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IuanNvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aHJvdyB7XHJcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgICAgICAgIGNvZGU6IC0yLFxyXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQVBJIHJldHVybmVkIGludmFsaWQgSlNPTlwiLFxyXG4gICAgICAgICAgICAgIGVycm9yOiBlcnJvci5lcnJvcixcclxuICAgICAgICAgICAgICBkYXRhOiBlcnJvci5kYXRhXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyB7XHJcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTmV0d29yayBFcnJvclwiLFxyXG4gICAgICAgICAgICAgIGVycm9yXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR0VUIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW5kcG9pbnQgICAgVGhlIGVuZHBvaW50IHRvIGdldFxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBUaGUgSFRUUCBxdWVyeSBwYXJhbWV0ZXJzIChHRVQgb25seSlcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBnZXQoZW5kcG9pbnQsIHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgIEFWLnN0cmluZyhlbmRwb2ludCwgXCJlbmRwb2ludFwiKTtcclxuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBlbmRwb2ludCwgcGFyYW1zKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQT1NUIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW5kcG9pbnQgIFRoZSBlbmRwb2ludCB0byBnZXRcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW2JvZHk9e31dIFRoZSBIVFRQIHJlcXVlc3QgYm9keVxyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIHBvc3QoZW5kcG9pbnQsIGJvZHkgPSB7fSwgcGFyYW1zID0ge30pIHtcclxuICAgICAgQVYuc3RyaW5nKGVuZHBvaW50LCBcImVuZHBvaW50XCIpO1xyXG4gICAgICBBcnJheS5pc0FycmF5KGJvZHkpXHJcbiAgICAgICAgPyBBVi5hcnJheU9yRW1wdHkoYm9keSwgXCJib2R5XCIpXHJcbiAgICAgICAgOiBBVi5vYmplY3RPckVtcHR5KGJvZHksIFwiYm9keVwiKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJwb3N0XCIsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBBVENIIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW5kcG9pbnQgIFRoZSBlbmRwb2ludCB0byBnZXRcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW2JvZHk9e31dIFRoZSBIVFRQIHJlcXVlc3QgYm9keVxyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIHBhdGNoKGVuZHBvaW50LCBib2R5ID0ge30sIHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgIEFWLnN0cmluZyhlbmRwb2ludCwgXCJlbmRwb2ludFwiKTtcclxuICAgICAgQXJyYXkuaXNBcnJheShib2R5KVxyXG4gICAgICAgID8gQVYuYXJyYXlPckVtcHR5KGJvZHksIFwiYm9keVwiKVxyXG4gICAgICAgIDogQVYub2JqZWN0T3JFbXB0eShib2R5LCBcImJvZHlcIik7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwicGF0Y2hcIiwgZW5kcG9pbnQsIHBhcmFtcywgYm9keSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUEFUQ0ggY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBlbmRwb2ludCAgVGhlIGVuZHBvaW50IHRvIGdldFxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbYm9keT17fV0gVGhlIEhUVFAgcmVxdWVzdCBib2R5XHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgcHV0KGVuZHBvaW50LCBib2R5ID0ge30sIHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgIEFWLnN0cmluZyhlbmRwb2ludCwgXCJlbmRwb2ludFwiKTtcclxuICAgICAgQXJyYXkuaXNBcnJheShib2R5KVxyXG4gICAgICAgID8gQVYuYXJyYXlPckVtcHR5KGJvZHksIFwiYm9keVwiKVxyXG4gICAgICAgIDogQVYub2JqZWN0T3JFbXB0eShib2R5LCBcImJvZHlcIik7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwicHV0XCIsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBBVENIIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW5kcG9pbnQgIFRoZSBlbmRwb2ludCB0byBnZXRcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBkZWxldGUoZW5kcG9pbnQpIHtcclxuICAgICAgQVYuc3RyaW5nKGVuZHBvaW50LCBcImVuZHBvaW50XCIpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImRlbGV0ZVwiLCBlbmRwb2ludCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEFVVEhFTlRJQ0FUSU9OXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2dnaW5nIGluIHByb21pc2VcclxuICAgICAqIEBwcm9taXNlIExvZ2luUHJvbWlzZVxyXG4gICAgICogQGZ1bGZpbGwge09iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgVVJMLCBFTlYsIGFuZCBUT0tFTlxyXG4gICAgICogQHJlamVjdCB7RXJyb3J9ICAgTmV0d29yayBlcnJvciAoaWYgbm8gY29ubmVjdGlvbiB0byBBUEkpXHJcbiAgICAgKiBAcmVqZWN0IHtFcnJvcn0gICBEaXJlY3R1cyBlcnJvciAoZWcgbm90IGxvZ2dlZCBpbiBvciA0MDQpXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZ2luIHRvIHRoZSBBUEkuXHJcbiAgICAgKlxyXG4gICAgICogR2V0cyBhIG5ldyB0b2tlbiBmcm9tIHRoZSBBUEkgYW5kIHN0b3JlcyBpdCBpbiB0aGlzLnRva2VuXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGNyZWRlbnRpYWxzXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNyZWRlbnRpYWxzLmVtYWlsICAgICBUaGUgdXNlcidzIGVtYWlsIGFkZHJlc3NcclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY3JlZGVudGlhbHMucGFzc3dvcmQgIFRoZSB1c2VyJ3MgcGFzc3dvcmRcclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gW2NyZWRlbnRpYWxzLnVybF0gICAgIFRoZSBBUEkgdG8gbG9naW4gdG8gKG92ZXJ3cml0ZXMgdGhpcy51cmwpXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IFtjcmVkZW50aWFscy5wcm9qZWN0XSBUaGUgQVBJIHByb2plY3QgdG8gbG9naW4gdG8gKG92ZXJ3cml0ZXMgdGhpcy5wcm9qZWN0KVxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBbb3B0aW9ucy5wZXJzaXN0XSAgICAgQXV0by1mZXRjaCBhIG5ldyB0b2tlbiB3aGVuIGl0J3MgYWJvdXQgdG8gZXhwaXJlXHJcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBbb3B0aW9ucy5zdG9yYWdlXSAgICBXaGVyZSB0byBzdG9yZSB0aGUgdG9rZW4gKHN1cnZpdmUgcmVmcmVzaGVzKVxyXG4gICAgICogQHJldHVybiB7TG9naW5Qcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBsb2dpbihjcmVkZW50aWFscywgb3B0aW9ucyA9IHsgcGVyc2lzdDogdHJ1ZSB9KSB7XHJcbiAgICAgIEFWLm9iamVjdChjcmVkZW50aWFscywgXCJjcmVkZW50aWFsc1wiKTtcclxuICAgICAgQVYua2V5c1dpdGhTdHJpbmcoY3JlZGVudGlhbHMsIFtcImVtYWlsXCIsIFwicGFzc3dvcmRcIl0sIFwiY3JlZGVudGlhbHNcIik7XHJcblxyXG4gICAgICB0aGlzLnRva2VuID0gbnVsbDtcclxuXHJcbiAgICAgIGlmIChBVi5oYXNLZXlzV2l0aFN0cmluZyhjcmVkZW50aWFscywgW1widXJsXCJdKSkge1xyXG4gICAgICAgIHRoaXMudXJsID0gY3JlZGVudGlhbHMudXJsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoQVYuaGFzS2V5c1dpdGhTdHJpbmcoY3JlZGVudGlhbHMsIFtcInByb2plY3RcIl0pKSB7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gY3JlZGVudGlhbHMucHJvamVjdDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNyZWRlbnRpYWxzLnBlcnNpc3QgfHwgb3B0aW9ucy5wZXJzaXN0KSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEludGVydmFsKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5wb3N0KFwiL2F1dGgvYXV0aGVudGljYXRlXCIsIHtcclxuICAgICAgICAgIGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCxcclxuICAgICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEudG9rZW4pXHJcbiAgICAgICAgICAudGhlbih0b2tlbiA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcclxuXHJcbiAgICAgICAgICAgIC8vIEV4cGlyeSBkYXRlIGlzIHRoZSBtb21lbnQgd2UgZ290IHRoZSB0b2tlbiArIDUgbWludXRlc1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsRXhwID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIDUgKiA2MDAwMCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKFxyXG4gICAgICAgICAgICAgICAgXCJkaXJlY3R1cy1zZGstanNcIixcclxuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwsXHJcbiAgICAgICAgICAgICAgICAgIHByb2plY3Q6IHRoaXMucHJvamVjdCxcclxuICAgICAgICAgICAgICAgICAgbG9jYWxFeHA6IHRoaXMubG9jYWxFeHBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcclxuICAgICAgICAgICAgICBwcm9qZWN0OiB0aGlzLnByb2plY3QsXHJcbiAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXHJcbiAgICAgICAgICAgICAgbG9jYWxFeHA6IHRoaXMubG9jYWxFeHBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKHJlamVjdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZ3MgdGhlIHVzZXIgb3V0IGJ5IFwiZm9yZ2V0dGluZ1wiIHRoZSB0b2tlbiwgYW5kIGNsZWFyaW5nIHRoZSByZWZyZXNoIGludGVydmFsXHJcbiAgICAgKi9cclxuICAgIGxvZ291dCgpIHtcclxuICAgICAgdGhpcy50b2tlbiA9IG51bGw7XHJcblxyXG4gICAgICBpZiAodGhpcy5yZWZyZXNoSW50ZXJ2YWwpIHtcclxuICAgICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5zdG9yYWdlKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0oXCJkaXJlY3R1cy1zZGstanNcIik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldHMgdGhlIGNsaWVudCBpbnN0YW5jZSBieSBsb2dnaW5nIG91dCBhbmQgcmVtb3ZpbmcgdGhlIFVSTCBhbmQgcHJvamVjdFxyXG4gICAgICovXHJcbiAgICByZXNldCgpIHtcclxuICAgICAgdGhpcy5sb2dvdXQoKTtcclxuICAgICAgdGhpcy51cmwgPSBudWxsO1xyXG4gICAgICB0aGlzLnByb2plY3QgPSBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyBhbiBpbnRlcnZhbCBvZiAxMCBzZWNvbmRzIHRoYXQgd2lsbCBjaGVjayBpZiB0aGUgdG9rZW4gbmVlZHMgcmVmcmVzaGluZ1xyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBmaXJlSW1tZWRpYXRlbHkgRmlyZSB0aGUgcmVmcmVzaElmTmVlZGVkIG1ldGhvZCBkaXJlY3RseVxyXG4gICAgICovXHJcbiAgICBzdGFydEludGVydmFsKGZpcmVJbW1lZGlhdGVseSkge1xyXG4gICAgICBpZiAoZmlyZUltbWVkaWF0ZWx5KSB0aGlzLnJlZnJlc2hJZk5lZWRlZCgpO1xyXG4gICAgICB0aGlzLnJlZnJlc2hJbnRlcnZhbCA9IHNldEludGVydmFsKFxyXG4gICAgICAgIHRoaXMucmVmcmVzaElmTmVlZGVkLmJpbmQodGhpcyksXHJcbiAgICAgICAgMTAwMDBcclxuICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgYW5kIG51bGxpZmllcyB0aGUgdG9rZW4gcmVmcmVzaGluZyBpbnRlcnZhbFxyXG4gICAgICovXHJcbiAgICBzdG9wSW50ZXJ2YWwoKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5yZWZyZXNoSW50ZXJ2YWwpO1xyXG4gICAgICB0aGlzLnJlZnJlc2hJbnRlcnZhbCA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaCB0aGUgdG9rZW4gaWYgaXQgaXMgYWJvdXQgdG8gZXhwaXJlICh3aXRoaW4gMzAgc2Vjb25kcyBvZiBleHBpcnkgZGF0ZSlcclxuICAgICAqXHJcbiAgICAgKiBDYWxscyBvbkF1dG9SZWZyZXNoU3VjY2VzcyB3aXRoIHRoZSBuZXcgdG9rZW4gaWYgdGhlIHJlZnJlc2hpbmcgaXMgc3VjY2Vzc2Z1bFxyXG4gICAgICogQ2FsbHMgb25BdXRvUmVmcmVzaEVycm9yIGlmIHJlZnJlc2hpbmcgdGhlIHRva2VuIGZhaWxzIGZvciBzb21lIHJlYXNvblxyXG4gICAgICovXHJcbiAgICByZWZyZXNoSWZOZWVkZWQoKSB7XHJcbiAgICAgIGlmICghQVYuaGFzU3RyaW5nS2V5cyh0aGlzLCBbXCJ0b2tlblwiLCBcInVybFwiLCBcInByb2plY3RcIl0pKSByZXR1cm47XHJcbiAgICAgIGlmICghdGhpcy5wYXlsb2FkIHx8ICF0aGlzLnBheWxvYWQuZXhwKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCB0aW1lRGlmZiA9IHRoaXMubG9jYWxFeHAgLSBEYXRlLm5vdygpO1xyXG5cclxuICAgICAgaWYgKHRpbWVEaWZmIDw9IDApIHtcclxuICAgICAgICBpZiAoQVYuaXNGdW5jdGlvbih0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcikpIHtcclxuICAgICAgICAgIHRoaXMub25BdXRvUmVmcmVzaEVycm9yKHtcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJhdXRoX2V4cGlyZWRfdG9rZW5cIixcclxuICAgICAgICAgICAgY29kZTogMTAyXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGltZURpZmYgPCAzMDAwMCkge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCh0aGlzLnRva2VuKVxyXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy50b2tlbiA9IHJlcy5kYXRhLnRva2VuO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsRXhwID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIDUgKiA2MDAwMCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKEFWLmlzRnVuY3Rpb24odGhpcy5vbkF1dG9SZWZyZXNoU3VjY2VzcykpIHtcclxuICAgICAgICAgICAgICB0aGlzLm9uQXV0b1JlZnJlc2hTdWNjZXNzKHtcclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwsXHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0OiB0aGlzLnByb2plY3QsXHJcbiAgICAgICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcclxuICAgICAgICAgICAgICAgIGxvY2FsRXhwOiB0aGlzLmxvY2FsRXhwXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShcclxuICAgICAgICAgICAgICAgIFwiZGlyZWN0dXMtc2RrLWpzXCIsXHJcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxyXG4gICAgICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxyXG4gICAgICAgICAgICAgICAgICBwcm9qZWN0OiB0aGlzLnByb2plY3QsXHJcbiAgICAgICAgICAgICAgICAgIGxvY2FsRXhwOiB0aGlzLmxvY2FsRXhwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQVYuaXNGdW5jdGlvbih0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcikpIHtcclxuICAgICAgICAgICAgICB0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXNlIHRoZSBwYXNzZWQgdG9rZW4gdG8gcmVxdWVzdCBhIG5ldyBvbmVcclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdG9rZW4gQWN0aXZlICYgVmFsaWQgdG9rZW5cclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICByZWZyZXNoKHRva2VuKSB7XHJcbiAgICAgIEFWLnN0cmluZyh0b2tlbiwgXCJ0b2tlblwiKTtcclxuICAgICAgcmV0dXJuIHRoaXMucG9zdChcIi9hdXRoL3JlZnJlc2hcIiwgeyB0b2tlbiB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXF1ZXN0IHRvIHJlc2V0IHRoZSBwYXNzd29yZCBvZiB0aGUgdXNlciB3aXRoIHRoZSBnaXZlbiBlbWFpbCBhZGRyZXNzXHJcbiAgICAgKlxyXG4gICAgICogVGhlIEFQSSB3aWxsIHNlbmQgYW4gZW1haWwgdG8gdGhlIGdpdmVuIGVtYWlsIGFkZHJlc3Mgd2l0aCBhIGxpbmsgdG8gZ2VuZXJhdGUgYSBuZXdcclxuICAgICAqIHRlbXBvcmFyeSBwYXNzd29yZC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbWFpbCBUaGUgdXNlcidzIGVtYWlsXHJcbiAgICAgKi9cclxuICAgIHJlcXVlc3RQYXNzd29yZFJlc2V0KGVtYWlsKSB7XHJcbiAgICAgIEFWLnN0cmluZyhlbWFpbCwgXCJlbWFpbFwiKTtcclxuICAgICAgcmV0dXJuIHRoaXMucG9zdChcIi9hdXRoL3Bhc3N3b3JkL3JlcXVlc3RcIiwge1xyXG4gICAgICAgIGVtYWlsOiBlbWFpbFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQUNUSVZJVFlcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhY3Rpdml0eVxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZ2V0QWN0aXZpdHkocGFyYW1zID0ge30pIHtcclxuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvYWN0aXZpdHlcIiwgcGFyYW1zKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQk9PS01BUktTXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGJvb2ttYXJrcyBvZiB0aGUgY3VycmVudCB1c2VyXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBnZXRNeUJvb2ttYXJrcyhwYXJhbXMgPSB7fSkge1xyXG4gICAgICBBVi5zdHJpbmcodGhpcy50b2tlbiwgXCJ0aGlzLnRva2VuXCIpO1xyXG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcyk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgdGhpcy5nZXQoXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcclxuICAgICAgICAgIFwiZmlsdGVyW3RpdGxlXVtubnVsbF1cIjogMSxcclxuICAgICAgICAgIFwiZmlsdGVyW3VzZXJdW2VxXVwiOiB0aGlzLnBheWxvYWQuaWRcclxuICAgICAgICB9KSxcclxuICAgICAgICB0aGlzLmdldChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xyXG4gICAgICAgICAgXCJmaWx0ZXJbdGl0bGVdW25udWxsXVwiOiAxLFxyXG4gICAgICAgICAgXCJmaWx0ZXJbcm9sZV1bZXFdXCI6IHRoaXMucGF5bG9hZC5yb2xlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJbdXNlcl1bbnVsbF1cIjogMVxyXG4gICAgICAgIH0pXHJcbiAgICAgIF0pLnRoZW4odmFsdWVzID0+IHtcclxuICAgICAgICBjb25zdCBbdXNlciwgcm9sZV0gPSB2YWx1ZXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2hhZG93XHJcbiAgICAgICAgcmV0dXJuIFsuLi51c2VyLmRhdGEsIC4uLnJvbGUuZGF0YV07XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDT0xMRUNUSU9OU1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgY29sbGVjdGlvbnNcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIGdldENvbGxlY3Rpb25zKHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL2NvbGxlY3Rpb25zXCIsIHBhcmFtcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGNvbGxlY3Rpb24gaW5mbyBieSBuYW1lXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIENvbGxlY3Rpb24gbmFtZVxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZ2V0Q29sbGVjdGlvbihjb2xsZWN0aW9uLCBwYXJhbXMgPSB7fSkge1xyXG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xyXG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldChgL2NvbGxlY3Rpb25zLyR7Y29sbGVjdGlvbn1gLCBwYXJhbXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIENvbGxlY3Rpb24gaW5mb3JtYXRpb25cclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVDb2xsZWN0aW9uKGRhdGEpIHtcclxuICAgICAgQVYub2JqZWN0KGRhdGEsIFwiZGF0YVwiKTtcclxuICAgICAgcmV0dXJuIHRoaXMucG9zdChcIi9jb2xsZWN0aW9uc1wiLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IFRoZSBjb2xsZWN0aW9uIHRvIHVwZGF0ZVxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZmllbGRzIHRvIHVwZGF0ZVxyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUNvbGxlY3Rpb24oY29sbGVjdGlvbiwgZGF0YSkge1xyXG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xyXG4gICAgICBBVi5vYmplY3QoZGF0YSwgXCJkYXRhXCIpO1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChgL2NvbGxlY3Rpb25zLyR7Y29sbGVjdGlvbn1gLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIHByaW1hcnkga2V5IG9mIHRoZSBjb2xsZWN0aW9uIHRvIHJlbW92ZVxyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZUNvbGxlY3Rpb24oY29sbGVjdGlvbikge1xyXG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xyXG4gICAgICByZXR1cm4gdGhpcy5kZWxldGUoYC9jb2xsZWN0aW9ucy8ke2NvbGxlY3Rpb259YCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENPTExFQ1RJT04gUFJFU0VUU1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IGNvbGxlY3Rpb24gcHJlc2V0IChib29rbWFyayAvIGxpc3RpbmcgcHJlZmVyZW5jZXMpXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgVGhlIGJvb2ttYXJrIGluZm9cclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVDb2xsZWN0aW9uUHJlc2V0KGRhdGEpIHtcclxuICAgICAgQVYub2JqZWN0KGRhdGEpO1xyXG4gICAgICByZXR1cm4gdGhpcy5wb3N0KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgY29sbGVjdGlvbiBwcmVzZXQgKGJvb2ttYXJrIC8gbGlzdGluZyBwcmVmZXJlbmNlKVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBwcmltYXJ5S2V5XHJcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3RQcm9taXNlfSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUNvbGxlY3Rpb25QcmVzZXQocHJpbWFyeUtleSwgZGF0YSkge1xyXG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcclxuICAgICAgQVYub2JqZWN0KGRhdGEsIFwiZGF0YVwiKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvY29sbGVjdGlvbl9wcmVzZXRzLyR7cHJpbWFyeUtleX1gLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGUgY29sbGVjdGlvbiBwcmVzZXQgYnkgcHJpbWFyeWtleVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBwcmltYXJ5S2V5IFRoZSBwcmltYXJ5S2V5IG9mIHRoZSBwcmVzZXQgdG8gZGVsZXRlXHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZUNvbGxlY3Rpb25QcmVzZXQocHJpbWFyeUtleSkge1xyXG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcclxuICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKGAvY29sbGVjdGlvbl9wcmVzZXRzLyR7cHJpbWFyeUtleX1gKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gREFUQUJBU0VcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyB3aWxsIHVwZGF0ZSB0aGUgZGF0YWJhc2Ugb2YgdGhlIEFQSSBpbnN0YW5jZSB0byB0aGUgbGF0ZXN0IHZlcnNpb25cclxuICAgICAqIHVzaW5nIHRoZSBtaWdyYXRpb25zIGluIHRoZSBBUElcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVEYXRhYmFzZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucG9zdChcIi91cGRhdGVcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEVYVEVOU0lPTlNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgbWV0YSBpbmZvcm1hdGlvbiBvZiBhbGwgaW5zdGFsbGVkIGludGVyZmFjZXNcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBnZXRJbnRlcmZhY2VzKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZ2V0XCIsIFwiL2ludGVyZmFjZXNcIiwge30sIHt9LCB0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIG1ldGEgaW5mb3JtYXRpb24gb2YgYWxsIGluc3RhbGxlZCBsYXlvdXRzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZ2V0TGF5b3V0cygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBcIi9sYXlvdXRzXCIsIHt9LCB7fSwgdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBtZXRhIGluZm9ybWF0aW9uIG9mIGFsbCBpbnN0YWxsZWQgcGFnZXNcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBnZXRQYWdlcygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBcIi9wYWdlc1wiLCB7fSwge30sIHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBGSUVMRFNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFsbCBmaWVsZHMgdGhhdCBhcmUgaW4gRGlyZWN0dXNcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIGdldEFsbEZpZWxkcyhwYXJhbXMgPSB7fSkge1xyXG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9maWVsZHNcIiwgcGFyYW1zKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGZpZWxkcyB0aGF0IGhhdmUgYmVlbiBzZXR1cCBmb3IgYSBnaXZlbiBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIENvbGxlY3Rpb24gbmFtZVxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZ2V0RmllbGRzKGNvbGxlY3Rpb24sIHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XHJcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvZmllbGRzLyR7Y29sbGVjdGlvbn1gLCBwYXJhbXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgZmllbGQgaW5mb3JtYXRpb24gZm9yIGEgc2luZ2xlIGdpdmVuIGZpZWxkXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIENvbGxlY3Rpb24gbmFtZVxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBmaWVsZE5hbWUgICBGaWVsZCBuYW1lXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBnZXRGaWVsZChjb2xsZWN0aW9uLCBmaWVsZE5hbWUsIHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XHJcbiAgICAgIEFWLnN0cmluZyhmaWVsZE5hbWUsIFwiZmllbGROYW1lXCIpO1xyXG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldChgL2ZpZWxkcy8ke2NvbGxlY3Rpb259LyR7ZmllbGROYW1lfWAsIHBhcmFtcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgZmllbGQgaW4gdGhlIGdpdmVuIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBDb2xsZWN0aW9uIHRvIGFkZCB0aGUgZmllbGQgaW5cclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZmllbGRJbmZvICBUaGUgZmllbGRzIGluZm8gdG8gc2F2ZVxyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUZpZWxkKGNvbGxlY3Rpb24sIGZpZWxkSW5mbykge1xyXG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xyXG4gICAgICBBVi5vYmplY3QoZmllbGRJbmZvLCBcImZpZWxkSW5mb1wiKTtcclxuICAgICAgcmV0dXJuIHRoaXMucG9zdChgL2ZpZWxkcy8ke2NvbGxlY3Rpb259YCwgZmllbGRJbmZvKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgYSBnaXZlbiBmaWVsZCBpbiBhIGdpdmVuIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBGaWVsZCdzIHBhcmVudCBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGZpZWxkTmFtZSAgTmFtZSBvZiB0aGUgZmllbGQgdG8gdXBkYXRlXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGZpZWxkSW5mbyAgRmllbGRzIHRvIHVwZGF0ZVxyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUZpZWxkKGNvbGxlY3Rpb24sIGZpZWxkTmFtZSwgZmllbGRJbmZvKSB7XHJcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XHJcbiAgICAgIEFWLnN0cmluZyhmaWVsZE5hbWUsIFwiZmllbGROYW1lXCIpO1xyXG4gICAgICBBVi5vYmplY3QoZmllbGRJbmZvLCBcImZpZWxkSW5mb1wiKTtcclxuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC9maWVsZHMvJHtjb2xsZWN0aW9ufS8ke2ZpZWxkTmFtZX1gLCBmaWVsZEluZm8pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBtdWx0aXBsZSBmaWVsZHMgYXQgb25jZVxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uICAgICAgICAgICAgIEZpZWxkcycgcGFyZW50IGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSAge0FycmF5fSBmaWVsZHNJbmZvT3JGaWVsZE5hbWVzICBBcnJheSBvZiBmaWVsZCBvYmplY3RzIG9yIGFycmF5IG9mIGZpZWxkIG5hbWVzXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtmaWVsZEluZm9dICAgICAgICAgICAgSW4gY2FzZSBmaWVsZHNJbmZvT3JGaWVsZE5hbWVzIGlzIGFuIGFycmF5IG9mIGZpZWxkTmFtZXMsIHlvdSBuZWVkIHRvIHByb3ZpZGUgdGhlIGZpZWxkcyB0byB1cGRhdGVcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogLy8gU2V0IG11bHRpcGxlIGZpZWxkcyB0byB0aGUgc2FtZSB2YWx1ZVxyXG4gICAgICogdXBkYXRlRmllbGRzKFwicHJvamVjdHNcIiwgW1wiZmlyc3RfbmFtZVwiLCBcImxhc3RfbmFtZVwiLCBcImVtYWlsXCJdLCB7XHJcbiAgICAgKiAgIGRlZmF1bHRfdmFsdWU6IFwiXCJcclxuICAgICAqIH0pXHJcbiAgICAgKlxyXG4gICAgICogLy8gU2V0IG11bHRpcGxlIGZpZWxkcyB0byBkaWZmZXJlbnQgdmFsdWVzXHJcbiAgICAgKiB1cGRhdGVGaWVsZHMoXCJwcm9qZWN0c1wiLCBbXHJcbiAgICAgKiAgIHtcclxuICAgICAqICAgICBpZDogMTQsXHJcbiAgICAgKiAgICAgc29ydDogMVxyXG4gICAgICogICB9LFxyXG4gICAgICogICB7XHJcbiAgICAgKiAgICAgaWQ6IDE3LFxyXG4gICAgICogICAgIHNvcnQ6IDJcclxuICAgICAqICAgfSxcclxuICAgICAqICAge1xyXG4gICAgICogICAgIGlkOiA5MTIsXHJcbiAgICAgKiAgICAgc29ydDogM1xyXG4gICAgICogICB9XHJcbiAgICAgKiBdKVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVGaWVsZHMoY29sbGVjdGlvbiwgZmllbGRzSW5mb09yRmllbGROYW1lcywgZmllbGRJbmZvID0gbnVsbCkge1xyXG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xyXG4gICAgICBBVi5hcnJheShmaWVsZHNJbmZvT3JGaWVsZE5hbWVzLCBcImZpZWxkc0luZm9PckZpZWxkTmFtZXNcIik7XHJcblxyXG4gICAgICBpZiAoZmllbGRJbmZvKSB7XHJcbiAgICAgICAgQVYub2JqZWN0KGZpZWxkSW5mbyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmaWVsZEluZm8pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRjaChcclxuICAgICAgICAgIGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZHNJbmZvT3JGaWVsZE5hbWVzLmpvaW4oXCIsXCIpfWAsXHJcbiAgICAgICAgICBmaWVsZEluZm9cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChgL2ZpZWxkcy8ke2NvbGxlY3Rpb259YCwgZmllbGRzSW5mb09yRmllbGROYW1lcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlIGEgZmllbGQgZnJvbSBhIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBOYW1lIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGZpZWxkTmFtZSAgVGhlIG5hbWUgb2YgdGhlIGZpZWxkIHRvIGRlbGV0ZVxyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZUZpZWxkKGNvbGxlY3Rpb24sIGZpZWxkTmFtZSkge1xyXG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xyXG4gICAgICBBVi5zdHJpbmcoZmllbGROYW1lLCBcImZpZWxkTmFtZVwiKTtcclxuICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZE5hbWV9YCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEZJTEVTXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwbG9hZCBtdWx0aXBhcnQgZmlsZXMgaW4gbXVsdGlwYXJ0L2Zvcm0tZGF0YVxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIEZvcm1EYXRhIG9iamVjdCBjb250YWluaW5nIGZpbGVzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgdXBsb2FkRmlsZXMoZGF0YSwgb25VcGxvYWRQcm9ncmVzcyA9ICgpID0+IHt9KSB7XHJcbiAgICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIsXHJcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMudG9rZW59YFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuYXhpb3NcclxuICAgICAgICAucG9zdChgJHt0aGlzLnVybH0vJHt0aGlzLnByb2plY3R9L2ZpbGVzYCwgZGF0YSwge1xyXG4gICAgICAgICAgaGVhZGVycyxcclxuICAgICAgICAgIG9uVXBsb2FkUHJvZ3Jlc3NcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yLnJlc3BvbnNlLmRhdGEuZXJyb3I7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyB7XHJcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgICAgICAgIGNvZGU6IC0xLFxyXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTmV0d29yayBFcnJvclwiLFxyXG4gICAgICAgICAgICAgIGVycm9yXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElURU1TXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgaXRlbVxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGFkZCB0aGUgaXRlbSB0b1xyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleSBQcmltYXJ5IGtleSBvZiB0aGUgaXRlbVxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBib2R5ICAgICAgIFRoZSBpdGVtJ3MgZmllbGQgdmFsdWVzXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHBhcmFtcyAgICAgUXVlcnkgcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUl0ZW0oY29sbGVjdGlvbiwgcHJpbWFyeUtleSwgYm9keSwgcGFyYW1zID0ge30pIHtcclxuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcclxuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XHJcbiAgICAgIEFWLm9iamVjdChib2R5LCBcImJvZHlcIik7XHJcblxyXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0Y2goXHJcbiAgICAgICAgICBgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleX1gLFxyXG4gICAgICAgICAgYm9keSxcclxuICAgICAgICAgIHBhcmFtc1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvaXRlbXMvJHtjb2xsZWN0aW9ufS8ke3ByaW1hcnlLZXl9YCwgYm9keSwgcGFyYW1zKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgbXVsdGlwbGUgaXRlbXNcclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBhZGQgdGhlIGl0ZW0gdG9cclxuICAgICAqIEBwYXJhbSAge0FycmF5fSBib2R5ICAgICAgICBUaGUgaXRlbSdzIGZpZWxkIHZhbHVlc1xyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBwYXJhbXMgICAgIFF1ZXJ5IFBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVJdGVtcyhjb2xsZWN0aW9uLCBib2R5LCBwYXJhbXMgPSB7fSkge1xyXG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xyXG4gICAgICBBVi5hcnJheShib2R5LCBcImJvZHlcIik7XHJcblxyXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfWAsIGJvZHksIHBhcmFtcyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvaXRlbXMvJHtjb2xsZWN0aW9ufWAsIGJvZHksIHBhcmFtcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IGl0ZW1cclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBhZGQgdGhlIGl0ZW0gdG9cclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gYm9keSAgICAgICBUaGUgaXRlbSdzIGZpZWxkIHZhbHVlc1xyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUl0ZW0oY29sbGVjdGlvbiwgYm9keSkge1xyXG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xyXG4gICAgICBBVi5vYmplY3QoYm9keSwgXCJib2R5XCIpO1xyXG5cclxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc3QoYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfWAsIGJvZHkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5wb3N0KGAvaXRlbXMvJHtjb2xsZWN0aW9ufWAsIGJvZHkpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBtdWx0aXBsZSBpdGVtc1xyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGFkZCB0aGUgaXRlbSB0b1xyXG4gICAgICogQHBhcmFtICB7QXJyYXl9IGJvZHkgICAgICAgIFRoZSBpdGVtJ3MgZmllbGQgdmFsdWVzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgY3JlYXRlSXRlbXMoY29sbGVjdGlvbiwgYm9keSkge1xyXG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xyXG4gICAgICBBVi5hcnJheShib2R5LCBcImJvZHlcIik7XHJcblxyXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdChgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9YCwgYm9keSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoYC9pdGVtcy8ke2NvbGxlY3Rpb259YCwgYm9keSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGl0ZW1zIGZyb20gYSBnaXZlbiBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gYWRkIHRoZSBpdGVtIHRvXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dICAgUXVlcnkgcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIGdldEl0ZW1zKGNvbGxlY3Rpb24sIHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XHJcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcclxuXHJcbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfWAsIHBhcmFtcyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmdldChgL2l0ZW1zLyR7Y29sbGVjdGlvbn1gLCBwYXJhbXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhIHNpbmdsZSBpdGVtIGJ5IHByaW1hcnkga2V5XHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIFRoZSBjb2xsZWN0aW9uIHRvIGFkZCB0aGUgaXRlbSB0b1xyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleSBQcmltYXJ5IGtleSBvZiB0aGUgaXRlbVxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZ2V0SXRlbShjb2xsZWN0aW9uLCBwcmltYXJ5S2V5LCBwYXJhbXMgPSB7fSkge1xyXG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xyXG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcclxuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xyXG5cclxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldChgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5nZXQoYC9pdGVtcy8ke2NvbGxlY3Rpb259LyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZSBhIHNpbmdsZSBpdGVtIGJ5IHByaW1hcnkga2V5XHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIFRoZSBjb2xsZWN0aW9uIHRvIGRlbGV0ZSB0aGUgaXRlbSBmcm9tXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8TnVtYmVyfSBwcmltYXJ5S2V5IFByaW1hcnkga2V5IG9mIHRoZSBpdGVtXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZGVsZXRlSXRlbShjb2xsZWN0aW9uLCBwcmltYXJ5S2V5KSB7XHJcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XHJcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xyXG5cclxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZShgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleX1gKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKGAvaXRlbXMvJHtjb2xsZWN0aW9ufS8ke3ByaW1hcnlLZXl9YCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlIG11bHRpcGxlIGl0ZW1zIGJ5IHByaW1hcnkga2V5XHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIFRoZSBjb2xsZWN0aW9uIHRvIGRlbGV0ZSB0aGUgaXRlbSBmcm9tXHJcbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gcHJpbWFyeUtleSBQcmltYXJ5IGtleSBvZiB0aGUgaXRlbVxyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZUl0ZW1zKGNvbGxlY3Rpb24sIHByaW1hcnlLZXlzKSB7XHJcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XHJcbiAgICAgIEFWLmFycmF5KHByaW1hcnlLZXlzLCBcInByaW1hcnlLZXlzXCIpO1xyXG5cclxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZShgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleXMuam9pbigpfWApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5kZWxldGUoYC9pdGVtcy8ke2NvbGxlY3Rpb259LyR7cHJpbWFyeUtleXMuam9pbigpfWApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSVNUSU5HIFBSRUZFUkVOQ0VTXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGNvbGxlY3Rpb24gcHJlc2V0cyBvZiB0aGUgY3VycmVudCB1c2VyIGZvciBhIHNpbmdsZSBjb2xsZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIENvbGxlY3Rpb24gdG8gZmV0Y2ggdGhlIHByZWZlcmVuY2VzIGZvclxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZ2V0TXlMaXN0aW5nUHJlZmVyZW5jZXMoY29sbGVjdGlvbiwgcGFyYW1zID0ge30pIHtcclxuICAgICAgQVYuc3RyaW5nKHRoaXMudG9rZW4sIFwidGhpcy50b2tlblwiKTtcclxuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgIHRoaXMuZ2V0KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XHJcbiAgICAgICAgICBsaW1pdDogMSxcclxuICAgICAgICAgIFwiZmlsdGVyW3RpdGxlXVtudWxsXVwiOiAxLFxyXG4gICAgICAgICAgXCJmaWx0ZXJbY29sbGVjdGlvbl1bZXFdXCI6IGNvbGxlY3Rpb24sXHJcbiAgICAgICAgICBcImZpbHRlcltyb2xlXVtudWxsXVwiOiAxLFxyXG4gICAgICAgICAgXCJmaWx0ZXJbdXNlcl1bbnVsbF1cIjogMSxcclxuICAgICAgICAgIHNvcnQ6IFwiLWlkXCJcclxuICAgICAgICB9KSxcclxuICAgICAgICB0aGlzLmdldChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xyXG4gICAgICAgICAgbGltaXQ6IDEsXHJcbiAgICAgICAgICBcImZpbHRlclt0aXRsZV1bbnVsbF1cIjogMSxcclxuICAgICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25dW2VxXVwiOiBjb2xsZWN0aW9uLFxyXG4gICAgICAgICAgXCJmaWx0ZXJbcm9sZV1bZXFdXCI6IHRoaXMucGF5bG9hZC5yb2xlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJbdXNlcl1bbnVsbF1cIjogMSxcclxuICAgICAgICAgIHNvcnQ6IFwiLWlkXCJcclxuICAgICAgICB9KSxcclxuICAgICAgICB0aGlzLmdldChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xyXG4gICAgICAgICAgbGltaXQ6IDEsXHJcbiAgICAgICAgICBcImZpbHRlclt0aXRsZV1bbnVsbF1cIjogMSxcclxuICAgICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25dW2VxXVwiOiBjb2xsZWN0aW9uLFxyXG4gICAgICAgICAgXCJmaWx0ZXJbcm9sZV1bZXFdXCI6IHRoaXMucGF5bG9hZC5yb2xlLFxyXG4gICAgICAgICAgXCJmaWx0ZXJbdXNlcl1bZXFdXCI6IHRoaXMucGF5bG9hZC5pZCxcclxuICAgICAgICAgIHNvcnQ6IFwiLWlkXCJcclxuICAgICAgICB9KVxyXG4gICAgICBdKS50aGVuKHZhbHVlcyA9PiB7XHJcbiAgICAgICAgY29uc3QgW2NvbGxlY3Rpb24sIHJvbGUsIHVzZXJdID0gdmFsdWVzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNoYWRvd1xyXG4gICAgICAgIGlmICh1c2VyLmRhdGEgJiYgdXNlci5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHJldHVybiB1c2VyLmRhdGFbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyb2xlLmRhdGEgJiYgcm9sZS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHJldHVybiByb2xlLmRhdGFbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb2xsZWN0aW9uLmRhdGEgJiYgY29sbGVjdGlvbi5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmRhdGFbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFBFUk1JU1NJT05TXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgcGVybWlzc2lvbnNcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIGdldFBlcm1pc3Npb25zKHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMoXCJkaXJlY3R1c19wZXJtaXNzaW9uc1wiLCBwYXJhbXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyJ3MgcGVybWlzc2lvbnNcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gcGFyYW1zIFF1ZXJ5IHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBnZXRNeVBlcm1pc3Npb25zKHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3Blcm1pc3Npb25zL21lXCIsIHBhcmFtcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIG11bHRpcGxlIG5ldyBwZXJtaXNzaW9uc1xyXG4gICAgICogQHBhcmFtICB7QXJyYXl9IGRhdGEgIFBlcm1pc3Npb24gcmVjb3JkcyB0byBzYXZlXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgY3JlYXRlUGVybWlzc2lvbnMoZGF0YSkge1xyXG4gICAgICBBVi5hcnJheShkYXRhKTtcclxuICAgICAgcmV0dXJuIHRoaXMucG9zdChcIi9wZXJtaXNzaW9uc1wiLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgbXVsdGlwbGUgcGVybWlzc2lvbiByZWNvcmRzXHJcbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gZGF0YSAgUGVybWlzc2lvbiByZWNvcmRzIHRvIHVwZGF0ZVxyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVBlcm1pc3Npb25zKGRhdGEpIHtcclxuICAgICAgQVYuYXJyYXkoZGF0YSk7XHJcbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKFwiL3Blcm1pc3Npb25zXCIsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBSRUxBVElPTlNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhbGwgcmVsYXRpb25zaGlwc1xyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZ2V0UmVsYXRpb25zKHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zKTtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3JlbGF0aW9uc1wiLCBwYXJhbXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVSZWxhdGlvbihkYXRhKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoXCIvcmVsYXRpb25zXCIsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVSZWxhdGlvbihwcmltYXJ5S2V5LCBkYXRhKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvcmVsYXRpb25zLyR7cHJpbWFyeUtleX1gLCBkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHJlbGF0aW9uc2hpcCBpbmZvcm1hdGlvbiBmb3IgdGhlIGdpdmVuIGNvbGxlY3Rpb25cclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiBuYW1lXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBnZXRDb2xsZWN0aW9uUmVsYXRpb25zKGNvbGxlY3Rpb24sIHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XHJcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zKTtcclxuXHJcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgdGhpcy5nZXQoXCIvcmVsYXRpb25zXCIsIHsgXCJmaWx0ZXJbY29sbGVjdGlvbl9hXVtlcV1cIjogY29sbGVjdGlvbiB9KSxcclxuICAgICAgICB0aGlzLmdldChcIi9yZWxhdGlvbnNcIiwgeyBcImZpbHRlcltjb2xsZWN0aW9uX2JdW2VxXVwiOiBjb2xsZWN0aW9uIH0pXHJcbiAgICAgIF0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBSRVZJU0lPTlNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhIHNpbmdsZSBpdGVtJ3MgcmV2aXNpb25zIGJ5IHByaW1hcnkga2V5XHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIFRoZSBjb2xsZWN0aW9uIHRvIGZldGNoIHRoZSByZXZpc2lvbnMgZnJvbVxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleSBQcmltYXJ5IGtleSBvZiB0aGUgaXRlbVxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZ2V0SXRlbVJldmlzaW9ucyhjb2xsZWN0aW9uLCBwcmltYXJ5S2V5LCBwYXJhbXMgPSB7fSkge1xyXG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xyXG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcclxuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xyXG5cclxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldChcclxuICAgICAgICAgIGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX0vJHtwcmltYXJ5S2V5fS9yZXZpc2lvbnNgLFxyXG4gICAgICAgICAgcGFyYW1zXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvaXRlbXMvJHtjb2xsZWN0aW9ufS8ke3ByaW1hcnlLZXl9L3JldmlzaW9uc2AsIHBhcmFtcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV2ZXJ0IGFuIGl0ZW0gdG8gYSBwcmV2aW91cyBzdGF0ZVxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uICBUaGUgY29sbGVjdGlvbiB0byBmZXRjaCB0aGUgcmV2aXNpb25zIGZyb21cclxuICAgICAqIEBwYXJhbSAge1N0cmluZ3xOdW1iZXJ9IHByaW1hcnlLZXkgUHJpbWFyeSBrZXkgb2YgdGhlIGl0ZW1cclxuICAgICAqIEBwYXJhbSAge051bWJlcn0gcmV2aXNpb25JRCBUaGUgSUQgb2YgdGhlIHJldmlzaW9uIHRvIHJldmVydCB0b1xyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIHJldmVydChjb2xsZWN0aW9uLCBwcmltYXJ5S2V5LCByZXZpc2lvbklEKSB7XHJcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XHJcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xyXG4gICAgICBBVi5udW1iZXIocmV2aXNpb25JRCwgXCJyZXZpc2lvbklEXCIpO1xyXG5cclxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGNoKFxyXG4gICAgICAgICAgYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfS8ke3ByaW1hcnlLZXl9L3JldmVydC8ke3JldmlzaW9uSUR9YFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKFxyXG4gICAgICAgIGAvaXRlbXMvJHtjb2xsZWN0aW9ufS8ke3ByaW1hcnlLZXl9L3JldmVydC8ke3JldmlzaW9uSUR9YFxyXG4gICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBST0xFU1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgc2luZ2xlIHVzZXIgcm9sZVxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBwcmltYXJ5S2V5ICBUaGUgaWQgb2YgdGhlIHVzZXIgcm9sIHRvIGdldFxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZ2V0Um9sZShwcmltYXJ5S2V5LCBwYXJhbXMgPSB7fSkge1xyXG4gICAgICBBVi5udW1iZXIocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xyXG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldChgL3JvbGVzLyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgdXNlciByb2xlc1xyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZ2V0Um9sZXMocGFyYW1zID0ge30pIHtcclxuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvcm9sZXNcIiwgcGFyYW1zKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgYSB1c2VyIHJvbGVcclxuICAgICAqIEBwYXJhbSAge051bWJlcn0gcHJpbWFyeUtleSBUaGUgSUQgb2YgdGhlIHJvbGVcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gYm9keSAgICAgICBUaGUgZmllbGRzIHRvIHVwZGF0ZVxyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVJvbGUocHJpbWFyeUtleSwgYm9keSkge1xyXG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcclxuICAgICAgQVYub2JqZWN0KGJvZHksIFwiYm9keVwiKTtcclxuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlSXRlbShcImRpcmVjdHVzX3JvbGVzXCIsIHByaW1hcnlLZXksIGJvZHkpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyB1c2VyIHJvbGVcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gYm9keSBUaGUgcm9sZSBpbmZvcm1hdGlvblxyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVJvbGUoYm9keSkge1xyXG4gICAgICBBVi5vYmplY3QoYm9keSwgXCJib2R5XCIpO1xyXG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVJdGVtKFwiZGlyZWN0dXNfcm9sZXNcIiwgYm9keSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlIGEgdXNlciByb2wgYnkgcHJpbWFyeSBrZXlcclxuICAgICAqIEBwYXJhbSAge051bWJlciB8IFN0cmluZ30gcHJpbWFyeUtleSBQcmltYXJ5IGtleSBvZiB0aGUgdXNlciByb2xlXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZGVsZXRlUm9sZShwcmltYXJ5S2V5KSB7XHJcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xyXG4gICAgICByZXR1cm4gdGhpcy5kZWxldGVJdGVtKFwiZGlyZWN0dXNfcm9sZXNcIiwgcHJpbWFyeUtleSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNFVFRJTkdTXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgRGlyZWN0dXMnIGdsb2JhbCBzZXR0aW5nc1xyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZ2V0U2V0dGluZ3MocGFyYW1zID0ge30pIHtcclxuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvc2V0dGluZ3NcIiwgcGFyYW1zKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIFwiZmllbGRzXCIgZm9yIGRpcmVjdHVzX3NldHRpbmdzXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBnZXRTZXR0aW5nc0ZpZWxkcyhwYXJhbXMgPSB7fSkge1xyXG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9zZXR0aW5ncy9maWVsZHNcIiwgcGFyYW1zKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gVVNFUlNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhIGxpc3Qgb2YgYXZhaWxhYmxlIHVzZXJzIGluIERpcmVjdHVzXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBnZXRVc2VycyhwYXJhbXMgPSB7fSkge1xyXG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi91c2Vyc1wiLCBwYXJhbXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhIHNpbmdsZSBEaXJlY3R1cyB1c2VyXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHByaW1hcnlLZXkgIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgdXNlclxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgZ2V0VXNlcihwcmltYXJ5S2V5LCBwYXJhbXMgPSB7fSkge1xyXG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcclxuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXQoYC91c2Vycy8ke3ByaW1hcnlLZXl9YCwgcGFyYW1zKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHVzZXIgaW5mbyBvZiB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBnZXRNZShwYXJhbXMgPSB7fSkge1xyXG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi91c2Vycy9tZVwiLCBwYXJhbXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBhIHNpbmdsZSB1c2VyIGJhc2VkIG9uIHByaW1hcnlLZXlcclxuICAgICAqIEBwYXJhbSAge1N0cmluZ3xOdW1iZXJ9IHByaW1hcnlLZXkgVGhlIHByaW1hcnkga2V5IG9mIHRoZSB1c2VyXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvZHkgICAgICAgICAgICAgIFRoZSBmaWVsZHMgdG8gdXBkYXRlXHJcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgdXBkYXRlVXNlcihwcmltYXJ5S2V5LCBib2R5KSB7XHJcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xyXG4gICAgICBBVi5vYmplY3QoYm9keSwgXCJib2R5XCIpO1xyXG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVJdGVtKFwiZGlyZWN0dXNfdXNlcnNcIiwgcHJpbWFyeUtleSwgYm9keSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFVUSUxTXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQaW5nIHRoZSBBUEkgdG8gY2hlY2sgaWYgaXQgZXhpc3RzIC8gaXMgdXAgYW5kIHJ1bm5pbmdcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBwaW5nKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZ2V0XCIsIFwiL3NlcnZlci9waW5nXCIsIHt9LCB7fSwgdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBzZXJ2ZXIgaW5mbyBmcm9tIHRoZSBBUElcclxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBzZXJ2ZXJJbmZvKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZ2V0XCIsIFwiL1wiLCB7fSwge30sIHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgc2VydmVyIGluZm8gZnJvbSB0aGUgcHJvamVjdFxyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIHByb2plY3RJbmZvKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZ2V0XCIsIFwiL1wiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYWxsIHRoZSBzZXR1cCB0aGlyZCBwYXJ0eSBhdXRoIHByb3ZpZGVyc1xyXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XHJcbiAgICAgKi9cclxuICAgIGdldFRoaXJkUGFydHlBdXRoUHJvdmlkZXJzKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvYXV0aC9zc29cIik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gT25seSBzdGFydCB0aGUgYXV0byByZWZyZXNoIGludGVydmFsIGlmIHRoZSB0b2tlbiBleGlzdHMgYW5kIGl0J3MgYSBKV1RcclxuICBpZiAoU0RLLnRva2VuICYmIFNESy50b2tlbi5pbmNsdWRlcyhcIi5cIikpIHtcclxuICAgIFNESy5zdGFydEludGVydmFsKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFNESztcclxufVxyXG5cclxuLy8gQ09OVkVOSUVOQ0UgTUVUSE9EU1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5TREsuZ2V0UGF5bG9hZCA9IGdldFBheWxvYWQ7XHJcbm1vZHVsZS5leHBvcnRzID0gU0RLO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9