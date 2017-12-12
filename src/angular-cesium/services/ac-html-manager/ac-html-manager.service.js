import { Injectable } from '@angular/core';
var AcHtmlManager = (function () {
    function AcHtmlManager() {
        this._entities = new Map();
    }
    AcHtmlManager.prototype.has = function (id) {
        return this._entities.has(id);
    };
    AcHtmlManager.prototype.get = function (id) {
        return this._entities.get(id);
    };
    AcHtmlManager.prototype.addOrUpdate = function (id, info) {
        this._entities.set(id, info);
    };
    AcHtmlManager.prototype.remove = function (id) {
        this._entities.delete(id);
    };
    AcHtmlManager.prototype.forEach = function (callback) {
        this._entities.forEach(callback);
    };
    AcHtmlManager.decorators = [
        { type: Injectable },
    ];
    AcHtmlManager.ctorParameters = function () { return []; };
    return AcHtmlManager;
}());
export { AcHtmlManager };
//# sourceMappingURL=ac-html-manager.service.js.map