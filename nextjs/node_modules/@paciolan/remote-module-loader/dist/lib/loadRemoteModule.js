"use strict";
exports.__esModule = true;
exports.createLoadRemoteModule = void 0;
var memoize_1 = require("./memoize");
var nodeFetcher_1 = require("./nodeFetcher");
var index_1 = require("./xmlHttpRequestFetcher/index");
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
/* istanbul ignore next - difficult to test */
var defaultFetcher = isBrowser ? index_1["default"] : nodeFetcher_1["default"];
var defaultRequires = function (name) {
    throw new Error("Could not require '" + name + "'. The 'requires' function was not provided.");
};
var createLoadRemoteModule = function (_a) {
    var _b = _a === void 0 ? {} : _a, requires = _b.requires, fetcher = _b.fetcher;
    var _requires = requires || defaultRequires;
    var _fetcher = fetcher || defaultFetcher;
    return (0, memoize_1["default"])(function (url) {
        return _fetcher(url).then(function (data) {
            var exports = {};
            var module = { exports: exports };
            var func = new Function("require", "module", "exports", data);
            func(_requires, module, exports);
            return module.exports;
        });
    });
};
exports.createLoadRemoteModule = createLoadRemoteModule;
//# sourceMappingURL=loadRemoteModule.js.map