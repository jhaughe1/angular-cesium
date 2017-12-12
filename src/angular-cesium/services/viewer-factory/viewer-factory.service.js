var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Injectable } from '@angular/core';
var ViewerFactory = (function () {
    function ViewerFactory() {
        this.cesium = Cesium;
    }
    ViewerFactory.prototype.createViewer = function (mapContainer, options) {
        if (!window['CESIUM_BASE_URL']) {
            window['CESIUM_BASE_URL'] = '/node_modules/cesium/Build/Cesium';
        }
        var viewer = null;
        if (options) {
            viewer = new this.cesium.Viewer(mapContainer, __assign({ contextOptions: {
                    webgl: { preserveDrawingBuffer: true }
                } }, options));
        }
        else {
            viewer = new this.cesium.Viewer(mapContainer, {
                imageryProvider: Cesium.createTileMapServiceImageryProvider({
                    url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
                }),
                baseLayerPicker: false,
                geocoder: false,
                contextOptions: {
                    webgl: { preserveDrawingBuffer: true }
                },
            });
        }
        return viewer;
    };
    ViewerFactory.decorators = [
        { type: Injectable },
    ];
    ViewerFactory.ctorParameters = function () { return []; };
    return ViewerFactory;
}());
export { ViewerFactory };
//# sourceMappingURL=viewer-factory.service.js.map