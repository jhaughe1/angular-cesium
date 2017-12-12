import { CesiumService } from '../cesium/cesium.service';
import { Injectable } from '@angular/core';
var MapLayersService = (function () {
    function MapLayersService(cesiumService) {
        this.cesiumService = cesiumService;
        this.layersDataSources = [];
    }
    MapLayersService.prototype.registerLayerDataSources = function (dataSources, zIndex) {
        var _this = this;
        dataSources.forEach(function (ds) {
            ds.zIndex = zIndex;
            _this.layersDataSources.push(ds);
        });
    };
    MapLayersService.prototype.drawAllLayers = function () {
        var _this = this;
        this.layersDataSources.sort(function (a, b) { return a.zIndex - b.zIndex; });
        this.layersDataSources.forEach(function (dataSource) {
            _this.cesiumService.getViewer().dataSources.add(dataSource);
        });
    };
    MapLayersService.prototype.updateAndRefresh = function (dataSources, newZIndex) {
        var _this = this;
        if (dataSources && dataSources.length) {
            dataSources.forEach(function (ds) {
                var index = _this.layersDataSources.indexOf(ds);
                if (index !== -1) {
                    _this.layersDataSources[index].zIndex = newZIndex;
                }
            });
            this.cesiumService.getViewer().dataSources.removeAll();
            this.drawAllLayers();
        }
    };
    MapLayersService.prototype.removeDataSources = function (dataSources) {
        var _this = this;
        dataSources.forEach(function (ds) {
            var index = _this.layersDataSources.indexOf(ds);
            if (index !== -1) {
                _this.layersDataSources.splice(index, 1);
                _this.cesiumService.getViewer().dataSources.remove(ds, true);
            }
        });
    };
    MapLayersService.decorators = [
        { type: Injectable },
    ];
    MapLayersService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return MapLayersService;
}());
export { MapLayersService };
//# sourceMappingURL=map-layers.service.js.map