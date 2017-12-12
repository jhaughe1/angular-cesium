import { Injectable } from '@angular/core';
var ComputationCache = (function () {
    function ComputationCache() {
        this._cache = new Map();
    }
    ComputationCache.prototype.get = function (expression, insertFn) {
        if (this._cache.has(expression)) {
            return this._cache.get(expression);
        }
        var value = insertFn();
        this._cache.set(expression, value);
        return value;
    };
    ComputationCache.prototype.clear = function () {
        this._cache.clear();
    };
    ComputationCache.decorators = [
        { type: Injectable },
    ];
    ComputationCache.ctorParameters = function () { return []; };
    return ComputationCache;
}());
export { ComputationCache };
//# sourceMappingURL=computation-cache.service.js.map