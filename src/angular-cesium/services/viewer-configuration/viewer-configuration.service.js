import { Injectable } from '@angular/core';
var ViewerConfiguration = (function () {
    function ViewerConfiguration() {
    }
    Object.defineProperty(ViewerConfiguration.prototype, "viewerOptions", {
        get: function () {
            return this._viewerOptions;
        },
        set: function (value) {
            this._viewerOptions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewerConfiguration.prototype, "viewerModifier", {
        get: function () {
            return this._viewerModifier;
        },
        set: function (value) {
            this._viewerModifier = value;
        },
        enumerable: true,
        configurable: true
    });
    ViewerConfiguration.decorators = [
        { type: Injectable },
    ];
    ViewerConfiguration.ctorParameters = function () { return []; };
    return ViewerConfiguration;
}());
export { ViewerConfiguration };
//# sourceMappingURL=viewer-configuration.service.js.map