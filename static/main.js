/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./static-main/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static-main/js/helpers/jq-helpers.js":
/*!**********************************************!*\
  !*** ./static-main/js/helpers/jq-helpers.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _serialize2 = __webpack_require__(/*! ./serialize */ \"./static-main/js/helpers/serialize.js\");\n\nvar _serialize3 = _interopRequireDefault(_serialize2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction $(selector) {\n  var nodes = Array.from(document.querySelectorAll(selector));\n\n  return {\n    $nodes: nodes,\n    on: function on(event, callback) {\n      return nodes.forEach(function (node) {\n        return node['on' + event] = callback;\n      });\n    },\n    addClass: function addClass(className) {\n      return nodes.forEach(function (node) {\n        return node.classList.add(className);\n      });\n    },\n    removeClass: function removeClass(className) {\n      return nodes.forEach(function (node) {\n        return node.classList.remove(className);\n      });\n    },\n    attr: function attr(attribute, value) {\n      if (value === undefined && nodes.length > 1) {\n        throw new Error('Can\\'t access value of several nodes\\' attributes');\n      }\n\n      if (value === undefined) {\n        return nodes[0].getAttribute(attribute);\n      } else {\n        nodes.forEach(function (node) {\n          return node.setAttribute(attribute, value);\n        });\n      }\n    },\n    submit: function submit() {\n      return nodes.forEach(function (node) {\n        return node.submit();\n      });\n    },\n    serialize: function serialize() {\n      if (nodes.length > 1) {\n        throw new Error('Can\\'t serialize forms at once');\n      }\n\n      return (0, _serialize3.default)(nodes[0]);\n    },\n    length: nodes.length\n  };\n}\n\n$.scrollTo = function scrollTo(element, to, duration) {\n  if (duration <= 0) return;\n  var difference = to - element.scrollTop;\n  var perTick = difference / duration * 10;\n\n  setTimeout(function () {\n    element.scrollTop = element.scrollTop + perTick;\n    if (element.scrollTop === to) return;\n    scrollTo(element, to, duration - 10);\n  }, 10);\n};\n\n$.ajax = function ajax(_ref) {\n  var method = _ref.method,\n      url = _ref.url,\n      data = _ref.data;\n\n  var xhr = new XMLHttpRequest();\n  xhr.open(method.toUpperCase(), url);\n  xhr.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n  xhr.send(data);\n\n  return new Promise(function (resove, reject) {\n    xhr.onreadystatechange = function () {\n      if (xhr.readyState == 4) {\n        if (xhr.status == 200) {\n          resolve(JSON.parse(xhr.responseXML));\n        } else {\n          reject(xhr.statusText);\n        }\n      }\n    };\n  });\n};\n\n$.post = function (url, data) {\n  return $.ajax({ method: 'post', url: url, data: data });\n};\n\nexports.default = $;\n\n//# sourceURL=webpack:///./static-main/js/helpers/jq-helpers.js?");

/***/ }),

/***/ "./static-main/js/helpers/serialize.js":
/*!*********************************************!*\
  !*** ./static-main/js/helpers/serialize.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = serialize;\n// From https://code.google.com/archive/p/form-serialize/\nfunction serialize(form) {\n  if (!form || form.nodeName !== \"FORM\") {\n    return;\n  }\n  var i,\n      j,\n      q = [];\n  for (i = form.elements.length - 1; i >= 0; i = i - 1) {\n    if (form.elements[i].name === \"\") {\n      continue;\n    }\n    switch (form.elements[i].nodeName) {\n      case 'INPUT':\n        switch (form.elements[i].type) {\n          case 'text':\n          case 'hidden':\n          case 'password':\n          case 'button':\n          case 'reset':\n          case 'submit':\n            q.push(form.elements[i].name + \"=\" + encodeURIComponent(form.elements[i].value));\n            break;\n          case 'checkbox':\n          case 'radio':\n            if (form.elements[i].checked) {\n              q.push(form.elements[i].name + \"=\" + encodeURIComponent(form.elements[i].value));\n            }\n            break;\n          case 'file':\n            break;\n        }\n        break;\n      case 'TEXTAREA':\n        q.push(form.elements[i].name + \"=\" + encodeURIComponent(form.elements[i].value));\n        break;\n      case 'SELECT':\n        switch (form.elements[i].type) {\n          case 'select-one':\n            q.push(form.elements[i].name + \"=\" + encodeURIComponent(form.elements[i].value));\n            break;\n          case 'select-multiple':\n            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {\n              if (form.elements[i].options[j].selected) {\n                q.push(form.elements[i].name + \"=\" + encodeURIComponent(form.elements[i].options[j].value));\n              }\n            }\n            break;\n        }\n        break;\n      case 'BUTTON':\n        switch (form.elements[i].type) {\n          case 'reset':\n          case 'submit':\n          case 'button':\n            q.push(form.elements[i].name + \"=\" + encodeURIComponent(form.elements[i].value));\n            break;\n        }\n        break;\n    }\n  }\n  return q.join(\"&\");\n}\n\n//# sourceURL=webpack:///./static-main/js/helpers/serialize.js?");

/***/ }),

/***/ "./static-main/js/index.js":
/*!*********************************!*\
  !*** ./static-main/js/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./scroll */ \"./static-main/js/scroll.js\");\n\n__webpack_require__(/*! ../styles */ \"./static-main/styles/index.scss\");\n\n//# sourceURL=webpack:///./static-main/js/index.js?");

/***/ }),

/***/ "./static-main/js/scroll.js":
/*!**********************************!*\
  !*** ./static-main/js/scroll.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _jqHelpers = __webpack_require__(/*! ./helpers/jq-helpers */ \"./static-main/js/helpers/jq-helpers.js\");\n\nvar _jqHelpers2 = _interopRequireDefault(_jqHelpers);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  handleScroll();\n  window.onscroll = handleScroll;\n  (0, _jqHelpers2.default)('.scroll-to-top').on('click', scrollToTop);\n})();\n\nfunction handleScroll() {\n  if (window.scrollY > window.innerHeight / 2) {\n    (0, _jqHelpers2.default)('.scroll-to-top').removeClass('d-none');\n  } else {\n    (0, _jqHelpers2.default)('.scroll-to-top').addClass('d-none');\n  }\n}\n\nfunction scrollToTop() {\n  _jqHelpers2.default.scrollTo(document.body, 0, 250);\n}\n\n//# sourceURL=webpack:///./static-main/js/scroll.js?");

/***/ }),

/***/ "./static-main/styles/index.scss":
/*!***************************************!*\
  !*** ./static-main/styles/index.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./static-main/styles/index.scss?");

/***/ })

/******/ });