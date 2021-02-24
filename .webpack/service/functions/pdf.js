module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./functions/pdf.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./functions/pdf.ts":
/*!**************************!*\
  !*** ./functions/pdf.ts ***!
  \**************************/
/*! exports provided: generate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generate\", function() { return generate; });\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/core */ \"@middy/core\");\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chrome-aws-lambda */ \"chrome-aws-lambda\");\n/* harmony import */ var chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @middy/do-not-wait-for-empty-event-loop */ \"@middy/do-not-wait-for-empty-event-loop\");\n/* harmony import */ var _middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _middy_http_event_normalizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @middy/http-event-normalizer */ \"@middy/http-event-normalizer\");\n/* harmony import */ var _middy_http_event_normalizer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_middy_http_event_normalizer__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst handler = async (event) => {\n    const executablePath = process.env.IS_OFFLINE\n        ? null\n        : await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1___default.a.executablePath;\n    const browser = await chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1___default.a.puppeteer.launch({\n        headless: true,\n        args: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1___default.a.args,\n        defaultViewport: chrome_aws_lambda__WEBPACK_IMPORTED_MODULE_1___default.a.defaultViewport,\n        executablePath\n    });\n    const page = await browser.newPage();\n    const url = event.queryStringParameters.url;\n    if (url === undefined) {\n        return {\n            statusCode: 400,\n            headers: {\n                \"Content-type\": \"application/json\"\n            },\n            body: '{\"error\":\"Url is not found!\"}'\n        };\n    }\n    if (!url.match(/((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+\\$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[\\+~%\\/.\\w-_]*)?\\??(?:[-\\+=&;%@.\\w_]*)#?(?:[\\w]*))?)/)) {\n        return {\n            statusCode: 400,\n            headers: {\n                \"Content-type\": \"application/json\"\n            },\n            body: '{\"error\":\"Invalid url!\"}'\n        };\n    }\n    var buf = decodeURIComponent(url);\n    await page.setExtraHTTPHeaders({ 'Authorization': 'Basic QmFua29wZW46QmFua29wZW5AMTYwMjIwMjEkIw==' });\n    await page.setUserAgent(\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36\");\n    await page.goto(buf.toString(), { waitUntil: 'networkidle2' });\n    await page.setViewport({\n        width: 1920,\n        height: 1020,\n        isLandscape: false,\n        deviceScaleFactor: 60\n    });\n    const data = await page.pdf({\n        format: \"A4\",\n        scale: 1,\n        printBackground: true,\n        margin: {\n            top: \"0\",\n            bottom: \"0\",\n            right: \"0\",\n            left: \"0\"\n        },\n    });\n    const stream = await data;\n    return {\n        statusCode: 200,\n        isBase64Encoded: true,\n        headers: {\n            'Content-type': 'application/pdf',\n            'content-disposition': 'attachment; filename=statement.pdf' // key of success\n        },\n        body: stream.toString(\"base64\")\n    };\n};\nconst generate = _middy_core__WEBPACK_IMPORTED_MODULE_0___default()(handler).use(_middy_http_event_normalizer__WEBPACK_IMPORTED_MODULE_3___default()()).use(_middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_2___default()());\n\n\n//# sourceURL=webpack:///./functions/pdf.ts?");

/***/ }),

/***/ "@middy/core":
/*!******************************!*\
  !*** external "@middy/core" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@middy/core\");\n\n//# sourceURL=webpack:///external_%22@middy/core%22?");

/***/ }),

/***/ "@middy/do-not-wait-for-empty-event-loop":
/*!**********************************************************!*\
  !*** external "@middy/do-not-wait-for-empty-event-loop" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@middy/do-not-wait-for-empty-event-loop\");\n\n//# sourceURL=webpack:///external_%22@middy/do-not-wait-for-empty-event-loop%22?");

/***/ }),

/***/ "@middy/http-event-normalizer":
/*!***********************************************!*\
  !*** external "@middy/http-event-normalizer" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@middy/http-event-normalizer\");\n\n//# sourceURL=webpack:///external_%22@middy/http-event-normalizer%22?");

/***/ }),

/***/ "chrome-aws-lambda":
/*!************************************!*\
  !*** external "chrome-aws-lambda" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chrome-aws-lambda\");\n\n//# sourceURL=webpack:///external_%22chrome-aws-lambda%22?");

/***/ })

/******/ });