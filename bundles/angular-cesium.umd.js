(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/add/operator/filter'), require('rxjs/add/operator/map'), require('rxjs/add/observable/of'), require('rxjs/add/operator/switchMap'), require('rxjs/add/operator/takeUntil'), require('rxjs/add/operator/mergeMap'), require('rxjs/add/operator/delay'), require('rxjs/add/operator/publish'), require('rxjs/add/operator/merge'), require('rxjs/add/operator/do'), require('rxjs/add/observable/from'), require('rxjs/add/observable/merge'), require('rxjs/add/observable/fromEvent'), require('@angular/core'), require('heatmap.js/build/heatmap.js'), require('@angular/common'), require('rxjs/Subject'), require('rxjs/Observable'), require('util'), require('geodesy'), require('primitive-primitives'), require('json-string-mapper'), require('angular2parse'), require('lodash.get'), require('rxjs/BehaviorSubject')) :
	typeof define === 'function' && define.amd ? define(['exports', 'rxjs/add/operator/filter', 'rxjs/add/operator/map', 'rxjs/add/observable/of', 'rxjs/add/operator/switchMap', 'rxjs/add/operator/takeUntil', 'rxjs/add/operator/mergeMap', 'rxjs/add/operator/delay', 'rxjs/add/operator/publish', 'rxjs/add/operator/merge', 'rxjs/add/operator/do', 'rxjs/add/observable/from', 'rxjs/add/observable/merge', 'rxjs/add/observable/fromEvent', '@angular/core', 'heatmap.js/build/heatmap.js', '@angular/common', 'rxjs/Subject', 'rxjs/Observable', 'util', 'geodesy', 'primitive-primitives', 'json-string-mapper', 'angular2parse', 'lodash.get', 'rxjs/BehaviorSubject'], factory) :
	(factory((global.angularCesium = global.angularCesium || {}),global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observabl,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,null,global.Rx.Observable,global.Rx.Observable,null,global.ng.core,global.h337,global.ng.common,global.Rx,global.Rx,global.util,global.geodesy,global.primitive_primitives,global.jsonStringMapper,global.ng.parse,global._get,global.rxjs_BehaviorSubject));
}(this, (function (exports,rxjs_add_operator_filter,rxjs_add_operator_map,rxjs_add_observable_of,rxjs_add_operator_switchMap,rxjs_add_operator_takeUntil,rxjs_add_operator_mergeMap,rxjs_add_operator_delay,rxjs_add_operator_publish,rxjs_add_operator_merge,rxjs_add_operator_do,rxjs_add_observable_from,rxjs_add_observable_merge,rxjs_add_observable_fromEvent,_angular_core,h337,_angular_common,rxjs_Subject,rxjs_Observable,util,geodesy,primitivePrimitives,jsonStringMapper,angular2parse,_get,rxjs_BehaviorSubject) { 'use strict';

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
        { type: _angular_core.Injectable },
    ];
    ViewerFactory.ctorParameters = function () { return []; };
    return ViewerFactory;
}());

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
        { type: _angular_core.Injectable },
    ];
    ViewerConfiguration.ctorParameters = function () { return []; };
    return ViewerConfiguration;
}());

var CesiumService = (function () {
    function CesiumService(ngZone, viewerFactory, viewerConfiguration) {
        this.ngZone = ngZone;
        this.viewerFactory = viewerFactory;
        this.viewerConfiguration = viewerConfiguration;
    }
    CesiumService.prototype.init = function (mapContainer) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var options = _this.viewerConfiguration ? _this.viewerConfiguration.viewerOptions : undefined;
            _this.cesiumViewer = _this.viewerFactory.createViewer(mapContainer, options);
            if (_this.viewerConfiguration && _this.viewerConfiguration.viewerModifier &&
                typeof _this.viewerConfiguration.viewerModifier === 'function') {
                _this.viewerConfiguration.viewerModifier(_this.cesiumViewer);
            }
        });
    };
    CesiumService.prototype.getViewer = function () {
        return this.cesiumViewer;
    };
    CesiumService.prototype.getScene = function () {
        return this.cesiumViewer.scene;
    };
    CesiumService.prototype.getCanvas = function () {
        return this.cesiumViewer.canvas;
    };
    CesiumService.decorators = [
        { type: _angular_core.Injectable },
    ];
    CesiumService.ctorParameters = function () { return [
        { type: _angular_core.NgZone, },
        { type: ViewerFactory, },
        { type: ViewerConfiguration, decorators: [{ type: _angular_core.Optional },] },
    ]; };
    return CesiumService;
}());

var GeoUtilsService = (function () {
    function GeoUtilsService(cesiumService) {
        this.cesiumService = cesiumService;
    }
    GeoUtilsService.pointByLocationDistanceAndAzimuth = function (currentLocation, meterDistance, radianAzimuth, isInputCartesian) {
        if (isInputCartesian === void 0) { isInputCartesian = false; }
        var distance = meterDistance / Cesium.Ellipsoid.WGS84.maximumRadius;
        var curLat = isInputCartesian ? Cesium.Cartographic.fromCartesian(currentLocation).latitude : currentLocation.latitude;
        var curLon = isInputCartesian ? Cesium.Cartographic.fromCartesian(currentLocation).longitude : currentLocation.longitude;
        var destinationLat = Math.asin(Math.sin(curLat) * Math.cos(distance) +
            Math.cos(curLat) * Math.sin(distance) * Math.cos(radianAzimuth));
        var destinationLon = curLon + Math.atan2(Math.sin(radianAzimuth) * Math.sin(distance) * Math.cos(curLat), Math.cos(distance) - Math.sin(curLat) * Math.sin(destinationLat));
        destinationLon = (destinationLon + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
        return Cesium.Cartesian3.fromRadians(destinationLon, destinationLat);
    };
    GeoUtilsService.distance = function (pos0, pos1) {
        return Cesium.Cartesian3.distance(pos0, pos1);
    };
    GeoUtilsService.getPositionsDelta = function (position0, position1) {
        return {
            x: position1.x - position0.x,
            y: position1.y - position0.y,
            z: position1.z - position0.z,
        };
    };
    GeoUtilsService.addDeltaToPosition = function (position, delta, keepReference) {
        if (keepReference === void 0) { keepReference = false; }
        if (keepReference) {
            position.x += delta.x;
            position.y += delta.y;
            position.z += delta.z;
            var cartographic = Cesium.Cartographic.fromCartesian(position);
            cartographic.height = 0;
            var cartesian = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
            position.x = cartesian.x;
            position.y = cartesian.y;
            position.z = cartesian.z;
            return position;
        }
        else {
            var cartesian = new Cesium.Cartesian3(position.x + delta.x, position.y + delta.y, position.z + delta.z);
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            cartographic.height = 0;
            return Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
        }
    };
    GeoUtilsService.middleCartesian3Point = function (position0, position1) {
        return new Cesium.Cartesian3(position1.x - position0.x / 2, position1.y - position0.y / 2, position1.z - position0.z / 2);
    };
    GeoUtilsService.prototype.screenPositionToCartesian3 = function (screenPos) {
        var camera = this.cesiumService.getViewer().camera;
        return camera.pickEllipsoid(screenPos);
    };
    GeoUtilsService.decorators = [
        { type: _angular_core.Injectable },
    ];
    GeoUtilsService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return GeoUtilsService;
}());

if (!h337) {
    throw new Error('must install heatmap.js. please do npm -i heatmap.js ');
}
var CesiumHeatMapMaterialCreator = (function () {
    function CesiumHeatMapMaterialCreator() {
        this.heatmapOptionsDefaults = {
            minCanvasSize: 700,
            maxCanvasSize: 2000,
            radiusFactor: 60,
            spacingFactor: 1,
            maxOpacity: 0.8,
            minOpacity: 0.1,
            blur: 0.85,
            gradient: {
                '.3': 'blue',
                '.65': 'yellow',
                '.8': 'orange',
                '.95': 'red'
            },
        };
        this.WMP = new Cesium.WebMercatorProjection();
        this.wgs84PointToHeatmapPoint = function (p) {
            return this.mercatorPointToHeatmapPoint(this.wgs84ToMercator(p));
        };
        this.rad2deg = function (r) {
            var d = r / (Math.PI / 180.0);
            return d;
        };
    }
    CesiumHeatMapMaterialCreator.calcCircleContainingRect = function (center, radius) {
        return CesiumHeatMapMaterialCreator.calcEllipseContainingRect(center, radius, radius);
    };
    CesiumHeatMapMaterialCreator.calcEllipseContainingRect = function (center, semiMajorAxis, semiMinorAxis) {
        var top = GeoUtilsService.pointByLocationDistanceAndAzimuth(center, semiMinorAxis, 0, true);
        var right = GeoUtilsService.pointByLocationDistanceAndAzimuth(center, semiMajorAxis, Math.PI / 2, true);
        var bottom = GeoUtilsService.pointByLocationDistanceAndAzimuth(center, semiMajorAxis, Math.PI, true);
        var left = GeoUtilsService.pointByLocationDistanceAndAzimuth(center, semiMajorAxis, Math.PI * 1.5, true);
        var ellipsePoints = [top, right, bottom, left];
        return Cesium.Rectangle.fromCartesianArray(ellipsePoints);
    };
    CesiumHeatMapMaterialCreator.calculateContainingRectFromPoints = function (points) {
        return Cesium.Rectangle.fromCartesianArray(points);
    };
    CesiumHeatMapMaterialCreator.prototype.setData = function (min, max, data) {
        if (data && data.length > 0 && min !== null && min !== false && max !== null && max !== false) {
            this.heatmap.setData({
                min: min,
                max: max,
                data: data
            });
            return true;
        }
        return false;
    };
    
    CesiumHeatMapMaterialCreator.prototype.setWGS84Data = function (min, max, data) {
        if (data && data.length > 0 && min !== null && min !== false && max !== null && max !== false) {
            var convdata = [];
            for (var i = 0; i < data.length; i++) {
                var gp = data[i];
                var hp = this.wgs84PointToHeatmapPoint(gp);
                if (gp.value || gp.value === 0) {
                    hp.value = gp.value;
                }
                convdata.push(hp);
            }
            return this.setData(min, max, convdata);
        }
        return false;
    };
    
    CesiumHeatMapMaterialCreator.prototype.mercatorPointToHeatmapPoint = function (p) {
        var pn = {};
        pn.x = Math.round((p.x - this._xoffset) / this._factor + this._spacing);
        pn.y = Math.round((p.y - this._yoffset) / this._factor + this._spacing);
        pn.y = this.height - pn.y;
        return pn;
    };
    
    CesiumHeatMapMaterialCreator.prototype.createContainer = function (height, width) {
        var id = 'heatmap' + CesiumHeatMapMaterialCreator.containerCanvasCounter++;
        var container = document.createElement('div');
        container.setAttribute('id', id);
        container.setAttribute('style', 'width: ' + width + 'px; height: ' + height + 'px; margin: 0px; display: none;');
        document.body.appendChild(container);
        return { container: container, id: id };
    };
    CesiumHeatMapMaterialCreator.prototype.wgs84ToMercator = function (p) {
        var mp = this.WMP.project(Cesium.Cartographic.fromDegrees(p.x, p.y));
        return {
            x: mp.x,
            y: mp.y
        };
    };
    
    CesiumHeatMapMaterialCreator.prototype.wgs84ToMercatorBB = function (bb) {
        var sw = this.WMP.project(Cesium.Cartographic.fromRadians(bb.west, bb.south));
        var ne = this.WMP.project(Cesium.Cartographic.fromRadians(bb.east, bb.north));
        return {
            north: ne.y,
            east: ne.x,
            south: sw.y,
            west: sw.x
        };
    };
    
    CesiumHeatMapMaterialCreator.prototype.mercatorToWgs84BB = function (bb) {
        var sw = this.WMP.unproject(new Cesium.Cartesian3(bb.west, bb.south));
        var ne = this.WMP.unproject(new Cesium.Cartesian3(bb.east, bb.north));
        return {
            north: this.rad2deg(ne.latitude),
            east: this.rad2deg(ne.longitude),
            south: this.rad2deg(sw.latitude),
            west: this.rad2deg(sw.longitude)
        };
    };
    
    CesiumHeatMapMaterialCreator.prototype.setWidthAndHeight = function (mbb) {
        this.width = ((mbb.east > 0 && mbb.west < 0) ? mbb.east + Math.abs(mbb.west) : Math.abs(mbb.east - mbb.west));
        this.height = ((mbb.north > 0 && mbb.south < 0) ? mbb.north + Math.abs(mbb.south) : Math.abs(mbb.north - mbb.south));
        this._factor = 1;
        if (this.width > this.height && this.width > this.heatmapOptionsDefaults.maxCanvasSize) {
            this._factor = this.width / this.heatmapOptionsDefaults.maxCanvasSize;
            if (this.height / this._factor < this.heatmapOptionsDefaults.minCanvasSize) {
                this._factor = this.height / this.heatmapOptionsDefaults.minCanvasSize;
            }
        }
        else if (this.height > this.width && this.height > this.heatmapOptionsDefaults.maxCanvasSize) {
            this._factor = this.height / this.heatmapOptionsDefaults.maxCanvasSize;
            if (this.width / this._factor < this.heatmapOptionsDefaults.minCanvasSize) {
                this._factor = this.width / this.heatmapOptionsDefaults.minCanvasSize;
            }
        }
        else if (this.width < this.height && this.width < this.heatmapOptionsDefaults.minCanvasSize) {
            this._factor = this.width / this.heatmapOptionsDefaults.minCanvasSize;
            if (this.height / this._factor > this.heatmapOptionsDefaults.maxCanvasSize) {
                this._factor = this.height / this.heatmapOptionsDefaults.maxCanvasSize;
            }
        }
        else if (this.height < this.width && this.height < this.heatmapOptionsDefaults.minCanvasSize) {
            this._factor = this.height / this.heatmapOptionsDefaults.minCanvasSize;
            if (this.width / this._factor > this.heatmapOptionsDefaults.maxCanvasSize) {
                this._factor = this.width / this.heatmapOptionsDefaults.maxCanvasSize;
            }
        }
        this.width = this.width / this._factor;
        this.height = this.height / this._factor;
    };
    
    CesiumHeatMapMaterialCreator.prototype.create = function (containingBoundingRect, heatmapDataSet, heatmapOptions) {
        var userBB = containingBoundingRect;
        var heatPointsData = heatmapDataSet.heatPointsData, _a = heatmapDataSet.min, min = _a === void 0 ? 0 : _a, _b = heatmapDataSet.max, max = _b === void 0 ? 100 : _b;
        var finalHeatmapOptions = Object.assign({}, this.heatmapOptionsDefaults, heatmapOptions);
        this._mbounds = this.wgs84ToMercatorBB(userBB);
        this.setWidthAndHeight(this._mbounds);
        finalHeatmapOptions.radius = Math.round((heatmapOptions.radius) ?
            heatmapOptions.radius : ((this.width > this.height) ?
            this.width / this.heatmapOptionsDefaults.radiusFactor :
            this.height / this.heatmapOptionsDefaults.radiusFactor));
        this._spacing = finalHeatmapOptions.radius * this.heatmapOptionsDefaults.spacingFactor;
        this._xoffset = this._mbounds.west;
        this._yoffset = this._mbounds.south;
        this.width = Math.round(this.width + this._spacing * 2);
        this.height = Math.round(this.height + this._spacing * 2);
        this._mbounds.west -= this._spacing * this._factor;
        this._mbounds.east += this._spacing * this._factor;
        this._mbounds.south -= this._spacing * this._factor;
        this._mbounds.north += this._spacing * this._factor;
        this.bounds = this.mercatorToWgs84BB(this._mbounds);
        this._rectangle = Cesium.Rectangle.fromDegrees(this.bounds.west, this.bounds.south, this.bounds.east, this.bounds.north);
        var _c = this.createContainer(this.height, this.width), container = _c.container, id = _c.id;
        Object.assign(finalHeatmapOptions, { container: container });
        this.heatmap = h337.create(finalHeatmapOptions);
        this.setWGS84Data(0, 100, heatPointsData);
        var heatMapCanvas = this.heatmap._renderer.canvas;
        var heatMapMaterial = new Cesium.ImageMaterialProperty({
            image: heatMapCanvas,
            transparent: true,
        });
        this.setClear(heatMapMaterial, id);
        return heatMapMaterial;
    };
    CesiumHeatMapMaterialCreator.prototype.setClear = function (heatMapMaterial, id) {
        heatMapMaterial.clear = function () {
            var elem = document.getElementById(id);
            return elem.parentNode.removeChild(elem);
        };
    };
    CesiumHeatMapMaterialCreator.containerCanvasCounter = 0;
    CesiumHeatMapMaterialCreator.decorators = [
        { type: _angular_core.Injectable },
    ];
    CesiumHeatMapMaterialCreator.ctorParameters = function () { return []; };
    return CesiumHeatMapMaterialCreator;
}());

var BasicDrawerService = (function () {
    function BasicDrawerService() {
    }
    BasicDrawerService.prototype.setPropsAssigner = function (assigner) {
        this._propsAssigner = assigner;
    };
    return BasicDrawerService;
}());

var GraphicsType;
(function (GraphicsType) {
    GraphicsType[GraphicsType["ellipse"] = Cesium.EllipseGraphics] = "ellipse";
    GraphicsType[GraphicsType["ellipsoid"] = Cesium.EllipsoidGraphics] = "ellipsoid";
    GraphicsType[GraphicsType["polygon"] = Cesium.PolygonGraphics] = "polygon";
    GraphicsType[GraphicsType["polyline"] = Cesium.PolylineGraphics] = "polyline";
    GraphicsType[GraphicsType["polylineVolume"] = Cesium.PolylineVolumeGraphics] = "polylineVolume";
    GraphicsType[GraphicsType["box"] = Cesium.BoxGraphics] = "box";
    GraphicsType[GraphicsType["corridor"] = Cesium.CorridorGraphics] = "corridor";
    GraphicsType[GraphicsType["cylinder"] = Cesium.CylinderGraphics] = "cylinder";
    GraphicsType[GraphicsType["label"] = Cesium.LabelGraphics] = "label";
    GraphicsType[GraphicsType["billboard"] = Cesium.BillboardGraphics] = "billboard";
    GraphicsType[GraphicsType["model"] = Cesium.ModelGraphics] = "model";
    GraphicsType[GraphicsType["path"] = Cesium.PathGraphics] = "path";
    GraphicsType[GraphicsType["point"] = Cesium.PointGraphics] = "point";
    GraphicsType[GraphicsType["rectangle"] = Cesium.RectangleGraphics] = "rectangle";
    GraphicsType[GraphicsType["wall"] = Cesium.WallGraphics] = "wall";
})(GraphicsType || (GraphicsType = {}));

var OptimizedEntityCollection = (function () {
    function OptimizedEntityCollection(entityCollection, collectionSize, updateRate) {
        if (collectionSize === void 0) { collectionSize = -1; }
        if (updateRate === void 0) { updateRate = -1; }
        this.entityCollection = entityCollection;
        this._isSuspended = false;
        this._isHardSuspend = false;
        this._updateRate = updateRate;
        this._collectionSize = collectionSize;
    }
    OptimizedEntityCollection.prototype.setShow = function (show) {
        this.entityCollection.show = show;
    };
    Object.defineProperty(OptimizedEntityCollection.prototype, "isSuspended", {
        get: function () {
            return this._isSuspended;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptimizedEntityCollection.prototype, "updateRate", {
        get: function () {
            return this._updateRate;
        },
        set: function (value) {
            this._updateRate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptimizedEntityCollection.prototype, "collectionSize", {
        get: function () {
            return this._collectionSize;
        },
        set: function (value) {
            this._collectionSize = value;
        },
        enumerable: true,
        configurable: true
    });
    OptimizedEntityCollection.prototype.collection = function () {
        return this.entityCollection;
    };
    OptimizedEntityCollection.prototype.isFree = function () {
        return this._collectionSize < 1 || this.entityCollection.values.length < this._collectionSize;
    };
    OptimizedEntityCollection.prototype.add = function (entity) {
        this.suspend();
        return this.entityCollection.add(entity);
    };
    OptimizedEntityCollection.prototype.remove = function (entity) {
        this.suspend();
        return this.entityCollection.remove(entity);
    };
    OptimizedEntityCollection.prototype.removeNoSuspend = function (entity) {
        this.entityCollection.remove(entity);
    };
    OptimizedEntityCollection.prototype.removeAll = function () {
        this.suspend();
        this.entityCollection.removeAll();
    };
    OptimizedEntityCollection.prototype.onEventSuspension = function (callback, once) {
        var _this = this;
        if (once === void 0) { once = false; }
        this._onEventSuspensionCallback = { callback: callback, once: once };
        return function () {
            _this._onEventSuspensionCallback = undefined;
        };
    };
    OptimizedEntityCollection.prototype.onEventResume = function (callback, once) {
        var _this = this;
        if (once === void 0) { once = false; }
        this._onEventResumeCallback = { callback: callback, once: once };
        if (!this._isSuspended) {
            this.triggerEventResume();
        }
        return function () {
            _this._onEventResumeCallback = undefined;
        };
    };
    OptimizedEntityCollection.prototype.triggerEventSuspension = function () {
        if (this._onEventSuspensionCallback !== undefined) {
            var callback = this._onEventSuspensionCallback.callback;
            if (this._onEventSuspensionCallback.once) {
                this._onEventSuspensionCallback = undefined;
            }
            callback();
        }
    };
    OptimizedEntityCollection.prototype.triggerEventResume = function () {
        if (this._onEventResumeCallback !== undefined) {
            var callback = this._onEventResumeCallback.callback;
            if (this._onEventResumeCallback.once) {
                this._onEventResumeCallback = undefined;
            }
            callback();
        }
    };
    OptimizedEntityCollection.prototype.suspend = function () {
        var _this = this;
        if (this._updateRate < 0) {
            return;
        }
        if (this._isHardSuspend) {
            return;
        }
        if (!this._isSuspended) {
            this._isSuspended = true;
            this.entityCollection.suspendEvents();
            this.triggerEventSuspension();
            this._suspensionTimeout = setTimeout(function () {
                _this.entityCollection.resumeEvents();
                _this.triggerEventResume();
                _this._isSuspended = false;
                _this._suspensionTimeout = undefined;
            }, this._updateRate);
        }
    };
    OptimizedEntityCollection.prototype.hardSuspend = function () {
        this.entityCollection.suspendEvents();
        this._isHardSuspend = true;
    };
    OptimizedEntityCollection.prototype.hardResume = function () {
        this.entityCollection.resumeEvents();
        this._isHardSuspend = false;
    };
    return OptimizedEntityCollection;
}());

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EntitiesDrawerService = (function (_super) {
    __extends$1(EntitiesDrawerService, _super);
    function EntitiesDrawerService(cesiumService, graphicsType, defaultOptions) {
        if (defaultOptions === void 0) { defaultOptions = {
            collectionMaxSize: -1,
            collectionSuspensionTime: -1,
            collectionsNumber: 1
        }; }
        var _this = _super.call(this) || this;
        _this.cesiumService = cesiumService;
        _this.graphicsType = graphicsType;
        _this.defaultOptions = defaultOptions;
        _this.entityCollections = new Map();
        _this.graphicsTypeName = GraphicsType[_this.graphicsType];
        return _this;
    }
    EntitiesDrawerService.prototype.getFreeEntitiesCollection = function () {
        var freeEntityCollection = null;
        this.entityCollections.forEach(function (entityCollection) {
            if (entityCollection.isFree()) {
                freeEntityCollection = entityCollection;
            }
        });
        return freeEntityCollection;
    };
    EntitiesDrawerService.prototype.init = function (options) {
        var finalOptions = options || this.defaultOptions;
        var dataSources = [];
        for (var i = 0; i < finalOptions.collectionsNumber; i++) {
            var dataSource = new Cesium.CustomDataSource();
            dataSources.push(dataSource);
            this.entityCollections.set(dataSource.entities, new OptimizedEntityCollection(dataSource.entities, finalOptions.collectionMaxSize, finalOptions.collectionSuspensionTime));
        }
        return dataSources;
    };
    EntitiesDrawerService.prototype.add = function (cesiumProps) {
        var optimizedEntityCollection = this.getFreeEntitiesCollection();
        if (optimizedEntityCollection === null) {
            throw new Error('No more free entity collections');
        }
        var graphicsClass = this.graphicsType;
        var entityObject = (_a = {
                position: cesiumProps.position !== undefined ? cesiumProps.position : undefined,
                description: cesiumProps.description !== undefined ? cesiumProps.description : undefined,
                orientation: cesiumProps.orientation !== undefined ? cesiumProps.orientation : undefined,
                viewFrom: cesiumProps.viewFrom !== undefined ? cesiumProps.viewFrom : undefined,
                availability: cesiumProps.availability !== undefined ? cesiumProps.availability : undefined
            },
            _a[this.graphicsTypeName] = cesiumProps,
            _a);
        if (cesiumProps.name !== undefined) {
            entityObject.name = cesiumProps.name;
        }
        return optimizedEntityCollection.add(entityObject);
        var _a;
    };
    EntitiesDrawerService.prototype.update = function (entity, cesiumProps) {
        this.suspendEntityCollection(entity);
        entity.position = cesiumProps.position !== undefined ? cesiumProps.position : undefined;
        entity.name = cesiumProps.name !== undefined ? cesiumProps.name : entity.name;
        entity.description = cesiumProps.description !== undefined ? cesiumProps.description : entity.description;
        entity.orientation = cesiumProps.orientation !== undefined ? cesiumProps.orientation : entity.orientation;
        entity.viewFrom = cesiumProps.viewFrom !== undefined ? cesiumProps.viewFrom : entity.viewFrom;
        entity.availability = cesiumProps.availability !== undefined ? cesiumProps.availability : undefined;
        if (this._propsAssigner) {
            this._propsAssigner(entity[this.graphicsTypeName], cesiumProps);
        }
        else {
            Object.assign(entity[this.graphicsTypeName], cesiumProps);
        }
    };
    EntitiesDrawerService.prototype.remove = function (entity) {
        var optimizedEntityCollection = this.entityCollections.get(entity.entityCollection);
        optimizedEntityCollection.remove(entity);
    };
    EntitiesDrawerService.prototype.removeAll = function () {
        this.entityCollections.forEach(function (entityCollection) {
            entityCollection.removeAll();
        });
    };
    EntitiesDrawerService.prototype.setShow = function (showValue) {
        this.entityCollections.forEach(function (entityCollection) {
            entityCollection.setShow(showValue);
        });
    };
    EntitiesDrawerService.prototype.suspendEntityCollection = function (entity) {
        var id = entity.entityCollection;
        if (!this.entityCollections.has(id)) {
            throw new Error('No EntityCollection for entity.entityCollection');
        }
        var entityCollection = this.entityCollections.get(id);
        entityCollection.suspend();
    };
    EntitiesDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    EntitiesDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
        { type: GraphicsType, },
        null,
    ]; };
    return EntitiesDrawerService;
}(BasicDrawerService));

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BillboardDrawerService = (function (_super) {
    __extends(BillboardDrawerService, _super);
    function BillboardDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.billboard) || this;
    }
    BillboardDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    BillboardDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return BillboardDrawerService;
}(EntitiesDrawerService));

(function (CesiumEvent) {
    CesiumEvent[CesiumEvent["MOUSE_MOVE"] = Cesium.ScreenSpaceEventType.MOUSE_MOVE] = "MOUSE_MOVE";
    CesiumEvent[CesiumEvent["LEFT_CLICK"] = Cesium.ScreenSpaceEventType.LEFT_CLICK] = "LEFT_CLICK";
    CesiumEvent[CesiumEvent["LEFT_DOUBLE_CLICK"] = Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK] = "LEFT_DOUBLE_CLICK";
    CesiumEvent[CesiumEvent["LEFT_DOWN"] = Cesium.ScreenSpaceEventType.LEFT_DOWN] = "LEFT_DOWN";
    CesiumEvent[CesiumEvent["LEFT_UP"] = Cesium.ScreenSpaceEventType.LEFT_UP] = "LEFT_UP";
    CesiumEvent[CesiumEvent["MIDDLE_CLICK"] = Cesium.ScreenSpaceEventType.MIDDLE_CLICK] = "MIDDLE_CLICK";
    CesiumEvent[CesiumEvent["MIDDLE_DOUBLE_CLICK"] = Cesium.ScreenSpaceEventType.MIDDLE_DOUBLE_CLICK] = "MIDDLE_DOUBLE_CLICK";
    CesiumEvent[CesiumEvent["MIDDLE_DOWN"] = Cesium.ScreenSpaceEventType.MIDDLE_DOWN] = "MIDDLE_DOWN";
    CesiumEvent[CesiumEvent["MIDDLE_UP"] = Cesium.ScreenSpaceEventType.MIDDLE_UP] = "MIDDLE_UP";
    CesiumEvent[CesiumEvent["PINCH_START"] = Cesium.ScreenSpaceEventType.PINCH_START] = "PINCH_START";
    CesiumEvent[CesiumEvent["PINCH_END"] = Cesium.ScreenSpaceEventType.PINCH_END] = "PINCH_END";
    CesiumEvent[CesiumEvent["PINCH_MOVE"] = Cesium.ScreenSpaceEventType.PINCH_MOVE] = "PINCH_MOVE";
    CesiumEvent[CesiumEvent["RIGHT_CLICK"] = Cesium.ScreenSpaceEventType.RIGHT_CLICK] = "RIGHT_CLICK";
    CesiumEvent[CesiumEvent["RIGHT_DOUBLE_CLICK"] = Cesium.ScreenSpaceEventType.RIGHT_DOUBLE_CLICK] = "RIGHT_DOUBLE_CLICK";
    CesiumEvent[CesiumEvent["RIGHT_DOWN"] = Cesium.ScreenSpaceEventType.RIGHT_DOWN] = "RIGHT_DOWN";
    CesiumEvent[CesiumEvent["RIGHT_UP"] = Cesium.ScreenSpaceEventType.RIGHT_UP] = "RIGHT_UP";
    CesiumEvent[CesiumEvent["WHEEL"] = Cesium.ScreenSpaceEventType.WHEEL] = "WHEEL";
    CesiumEvent[CesiumEvent["LONG_LEFT_PRESS"] = 110] = "LONG_LEFT_PRESS";
    CesiumEvent[CesiumEvent["LONG_RIGHT_PRESS"] = 111] = "LONG_RIGHT_PRESS";
    CesiumEvent[CesiumEvent["LONG_MIDDLE_PRESS"] = 112] = "LONG_MIDDLE_PRESS";
    CesiumEvent[CesiumEvent["LEFT_CLICK_DRAG"] = 113] = "LEFT_CLICK_DRAG";
    CesiumEvent[CesiumEvent["RIGHT_CLICK_DRAG"] = 114] = "RIGHT_CLICK_DRAG";
    CesiumEvent[CesiumEvent["MIDDLE_CLICK_DRAG"] = 115] = "MIDDLE_CLICK_DRAG";
})(exports.CesiumEvent || (exports.CesiumEvent = {}));

var CesiumPureEventObserver = (function () {
    function CesiumPureEventObserver(event, modifier) {
        this.event = event;
        this.modifier = modifier;
    }
    CesiumPureEventObserver.prototype.init = function (eventsHandler) {
        var _this = this;
        this.observer = rxjs_Observable.Observable.create(function (observer) {
            eventsHandler.setInputAction(function (movement) {
                if (movement.position) {
                    movement.startPosition = movement.position;
                    movement.endPosition = movement.position;
                }
                observer.next(movement);
            }, _this.event, _this.modifier);
        });
        return this.observer;
    };
    return CesiumPureEventObserver;
}());

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CesiumLongPressObserver = (function (_super) {
    __extends$2(CesiumLongPressObserver, _super);
    function CesiumLongPressObserver(event, modifier, eventFactory) {
        var _this = _super.call(this, event, modifier) || this;
        _this.event = event;
        _this.modifier = modifier;
        _this.eventFactory = eventFactory;
        return _this;
    }
    
    CesiumLongPressObserver.prototype.init = function () {
        var startEvent;
        var stopEvent;
        if (this.event === exports.CesiumEvent.LONG_LEFT_PRESS) {
            startEvent = exports.CesiumEvent.LEFT_DOWN;
            stopEvent = exports.CesiumEvent.LEFT_UP;
        }
        else if (this.event === exports.CesiumEvent.LONG_RIGHT_PRESS) {
            startEvent = exports.CesiumEvent.RIGHT_DOWN;
            stopEvent = exports.CesiumEvent.RIGHT_UP;
        }
        else if (this.event === exports.CesiumEvent.LONG_MIDDLE_PRESS) {
            startEvent = exports.CesiumEvent.MIDDLE_DOWN;
            stopEvent = exports.CesiumEvent.MIDDLE_UP;
        }
        var startEventObservable = this.eventFactory.get(startEvent, this.modifier);
        var stopEventObservable = this.eventFactory.get(stopEvent, this.modifier);
        var longPressObservable = startEventObservable
            .flatMap(function (e) { return rxjs_Observable.Observable.of(e).delay(CesiumLongPressObserver.LONG_PRESS_EVENTS_DURATION).takeUntil(stopEventObservable); }).publish();
        return longPressObservable;
    };
    CesiumLongPressObserver.LONG_PRESS_EVENTS_DURATION = 250;
    return CesiumLongPressObserver;
}(CesiumPureEventObserver));

var CesiumEventBuilder = (function () {
    function CesiumEventBuilder(cesiumService) {
        this.cesiumService = cesiumService;
        this.cesiumEventsObservables = new Map();
    }
    CesiumEventBuilder.getEventFullName = function (event, modifier) {
        if (modifier) {
            return event + "_" + modifier;
        }
        else {
            return event.toString();
        }
    };
    CesiumEventBuilder.prototype.init = function () {
        this.eventsHandler = this.cesiumService.getViewer().screenSpaceEventHandler;
    };
    CesiumEventBuilder.prototype.get = function (event, modifier) {
        if (modifier === void 0) { modifier = undefined; }
        var eventName = CesiumEventBuilder.getEventFullName(event, modifier);
        if (this.cesiumEventsObservables.has(eventName)) {
            return this.cesiumEventsObservables.get(eventName);
        }
        else {
            var eventObserver = this.createCesiumEventObservable(event, modifier);
            this.cesiumEventsObservables.set(eventName, eventObserver);
            return eventObserver;
        }
    };
    CesiumEventBuilder.prototype.createCesiumEventObservable = function (event, modifier) {
        var cesiumEventObservable = undefined;
        if (CesiumEventBuilder.longPressEvents.has(event)) {
            cesiumEventObservable = this.createSpecialCesiumEventObservable(event, modifier);
        }
        else {
            cesiumEventObservable = new CesiumPureEventObserver(event, modifier).init(this.eventsHandler).publish();
        }
        cesiumEventObservable.connect();
        return cesiumEventObservable;
    };
    CesiumEventBuilder.prototype.createSpecialCesiumEventObservable = function (event, modifier) {
        return new CesiumLongPressObserver(event, modifier, this).init();
    };
    CesiumEventBuilder.longPressEvents = new Set([
        exports.CesiumEvent.LONG_LEFT_PRESS,
        exports.CesiumEvent.LONG_RIGHT_PRESS,
        exports.CesiumEvent.LONG_MIDDLE_PRESS
    ]);
    CesiumEventBuilder.decorators = [
        { type: _angular_core.Injectable },
    ];
    CesiumEventBuilder.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return CesiumEventBuilder;
}());

(function (PickOptions) {
    PickOptions[PickOptions["NO_PICK"] = 0] = "NO_PICK";
    PickOptions[PickOptions["PICK_FIRST"] = 1] = "PICK_FIRST";
    PickOptions[PickOptions["PICK_ONE"] = 2] = "PICK_ONE";
    PickOptions[PickOptions["PICK_ALL"] = 3] = "PICK_ALL";
})(exports.PickOptions || (exports.PickOptions = {}));

var PlonterService = (function () {
    function PlonterService() {
        this._entitesToPlonter = [];
        this._plonterChangeNotifier = new _angular_core.EventEmitter();
        this._plonterObserver = new rxjs_Subject.Subject();
    }
    Object.defineProperty(PlonterService.prototype, "plonterChangeNotifier", {
        get: function () {
            return this._plonterChangeNotifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlonterService.prototype, "plonterShown", {
        get: function () {
            return this._plonterShown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlonterService.prototype, "entitesToPlonter", {
        get: function () {
            return this._entitesToPlonter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlonterService.prototype, "plonterClickPosition", {
        get: function () {
            return this._eventResult.movement;
        },
        enumerable: true,
        configurable: true
    });
    PlonterService.prototype.plonterIt = function (eventResult) {
        this._eventResult = eventResult;
        this._entitesToPlonter = eventResult.entities;
        this._plonterShown = true;
        this._plonterChangeNotifier.emit();
        return this._plonterObserver;
    };
    PlonterService.prototype.resolvePlonter = function (entity) {
        this._plonterShown = false;
        this._eventResult.entities = [entity];
        this._plonterChangeNotifier.emit();
        this._plonterObserver.next(this._eventResult);
    };
    PlonterService.decorators = [
        { type: _angular_core.Injectable },
    ];
    PlonterService.ctorParameters = function () { return []; };
    return PlonterService;
}());

var UtilsService = {
    unique: function (array) {
        return array.reduce(function (accumulator, currentValue) {
            if (accumulator.indexOf(currentValue) < 0) {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, []);
    }
};

var CesiumDragDropHelper = (function () {
    function CesiumDragDropHelper() {
    }
    CesiumDragDropHelper.getDragEventTypes = function (dragEvent) {
        var mouseDownEvent;
        var mouseUpEvent;
        if (dragEvent === exports.CesiumEvent.LEFT_CLICK_DRAG) {
            mouseDownEvent = exports.CesiumEvent.LEFT_DOWN;
            mouseUpEvent = exports.CesiumEvent.LEFT_UP;
        }
        else if (dragEvent === exports.CesiumEvent.RIGHT_CLICK_DRAG) {
            mouseDownEvent = exports.CesiumEvent.RIGHT_DOWN;
            mouseUpEvent = exports.CesiumEvent.RIGHT_UP;
        }
        else if (dragEvent === exports.CesiumEvent.MIDDLE_CLICK_DRAG) {
            mouseDownEvent = exports.CesiumEvent.MIDDLE_DOWN;
            mouseUpEvent = exports.CesiumEvent.MIDDLE_UP;
        }
        return { mouseDownEvent: mouseDownEvent, mouseUpEvent: mouseUpEvent };
    };
    CesiumDragDropHelper.dragEvents = new Set([
        exports.CesiumEvent.LEFT_CLICK_DRAG,
        exports.CesiumEvent.RIGHT_CLICK_DRAG,
        exports.CesiumEvent.MIDDLE_CLICK_DRAG
    ]);
    return CesiumDragDropHelper;
}());

var Registration = (function () {
    function Registration(observable, stopper, priority, isPaused) {
        this.observable = observable;
        this.stopper = stopper;
        this.priority = priority;
        this.isPaused = isPaused;
    }
    return Registration;
}());
var MapEventsManagerService = (function () {
    function MapEventsManagerService(cesiumService, eventBuilder, plonterService) {
        this.cesiumService = cesiumService;
        this.eventBuilder = eventBuilder;
        this.plonterService = plonterService;
        this.eventRegistrations = new Map();
    }
    MapEventsManagerService.prototype.init = function () {
        this.eventBuilder.init();
        this.scene = this.cesiumService.getScene();
    };
    MapEventsManagerService.prototype.register = function (input) {
        var _this = this;
        if (this.scene === undefined) {
            throw new Error('CesiumService has not been initialized yet - MapEventsManagerService must be injected  under ac-map');
        }
        input.pick = input.pick || exports.PickOptions.NO_PICK;
        input.priority = input.priority || 0;
        if (input.entityType && input.pick === exports.PickOptions.NO_PICK) {
            throw new Error('MapEventsManagerService: can\'t register an event ' +
                'with entityType and PickOptions.NO_PICK - It doesn\'t make sense ');
        }
        var eventName = CesiumEventBuilder.getEventFullName(input.event, input.modifier);
        if (!this.eventRegistrations.has(eventName)) {
            this.eventRegistrations.set(eventName, []);
        }
        var eventRegistration = this.createEventRegistration(input.event, input.modifier, input.entityType, input.pick, input.priority);
        var registrationObservable = eventRegistration.observable;
        registrationObservable.dispose = function () { return _this.disposeObservable(eventRegistration, eventName); };
        this.eventRegistrations.get(eventName).push(eventRegistration);
        this.sortRegistrationsByPriority(eventName);
        return registrationObservable;
    };
    MapEventsManagerService.prototype.disposeObservable = function (eventRegistration, eventName) {
        eventRegistration.stopper.next(1);
        var registrations = this.eventRegistrations.get(eventName);
        var index = registrations.indexOf(eventRegistration);
        if (index !== -1) {
            registrations.splice(index, 1);
        }
        this.sortRegistrationsByPriority(eventName);
    };
    MapEventsManagerService.prototype.sortRegistrationsByPriority = function (eventName) {
        var registrations = this.eventRegistrations.get(eventName);
        registrations.sort(function (a, b) { return b.priority - a.priority; });
        if (registrations.length === 0) {
            return;
        }
        var currentPriority = registrations[0].priority;
        registrations.forEach(function (registration) {
            registration.isPaused = registration.priority < currentPriority;
        });
    };
    MapEventsManagerService.prototype.createEventRegistration = function (event, modifier, entityType, pickOption, priority) {
        var _this = this;
        var cesiumEventObservable = this.eventBuilder.get(event, modifier);
        var stopper = new rxjs_Subject.Subject();
        var registration = new Registration(undefined, stopper, priority, false);
        var observable;
        if (!CesiumDragDropHelper.dragEvents.has(event)) {
            observable = cesiumEventObservable
                .filter(function () { return !registration.isPaused; })
                .map(function (movement) { return _this.triggerPick(movement, pickOption); })
                .filter(function (result) { return result.cesiumEntities !== null || entityType === undefined; })
                .map(function (picksAndMovement) { return _this.addEntities(picksAndMovement, entityType, pickOption); })
                .filter(function (result) { return result.entities !== null || entityType === undefined; })
                .switchMap(function (entitiesAndMovement) { return _this.plonter(entitiesAndMovement, pickOption); })
                .takeUntil(stopper);
        }
        else {
            observable = this.createDragEvent(event, modifier, entityType, pickOption, priority).takeUntil(stopper);
        }
        registration.observable = observable;
        return registration;
    };
    MapEventsManagerService.prototype.createDragEvent = function (event, modifier, entityType, pickOption, priority) {
        var _a = CesiumDragDropHelper.getDragEventTypes(event), mouseDownEvent = _a.mouseDownEvent, mouseUpEvent = _a.mouseUpEvent;
        var mouseUpObservable = this.eventBuilder.get(mouseUpEvent);
        var mouseMoveObservable = this.eventBuilder.get(exports.CesiumEvent.MOUSE_MOVE);
        var mouseDownRegistration = this.createEventRegistration(mouseDownEvent, modifier, entityType, pickOption, priority);
        var dropSubject = new rxjs_Subject.Subject();
        var dragObserver = mouseDownRegistration.observable.mergeMap(function (e) {
            var lastMove = null;
            var dragStartPositionX = e.movement.startPosition.x;
            var dragStartPositionY = e.movement.startPosition.y;
            return mouseMoveObservable.map(function (movement) {
                lastMove = {
                    movement: {
                        drop: false,
                        startPosition: {
                            x: dragStartPositionX,
                            y: dragStartPositionY,
                        },
                        endPosition: movement.endPosition,
                    },
                    entities: e.entities,
                    cesiumEntities: e.cesiumEntities
                };
                return lastMove;
            }).takeUntil(mouseUpObservable).do(undefined, undefined, function () {
                if (lastMove) {
                    var dropEvent = Object.assign({}, lastMove);
                    dropEvent.movement.drop = true;
                    dropSubject.next(dropEvent);
                }
            });
        });
        return dragObserver.merge(dropSubject);
    };
    MapEventsManagerService.prototype.triggerPick = function (movement, pickOptions) {
        var picks = [];
        switch (pickOptions) {
            case exports.PickOptions.PICK_ONE:
            case exports.PickOptions.PICK_ALL:
                picks = this.scene.drillPick(movement.endPosition);
                picks = picks.length === 0 ? null : picks;
                break;
            case exports.PickOptions.PICK_FIRST:
                var pick = this.scene.pick(movement.endPosition);
                picks = pick === undefined ? null : [pick];
                break;
            case exports.PickOptions.NO_PICK:
                break;
            default:
                break;
        }
        if (picks) {
            picks = picks.map(function (pick) { return pick.id && pick.id instanceof Cesium.Entity ? pick.id : pick.primitive; });
        }
        return { movement: movement, cesiumEntities: picks };
    };
    MapEventsManagerService.prototype.addEntities = function (picksAndMovement, entityType, pickOption) {
        if (picksAndMovement.cesiumEntities === null) {
            picksAndMovement.entities = null;
            return picksAndMovement;
        }
        var entities = [];
        if (pickOption !== exports.PickOptions.NO_PICK) {
            if (entityType) {
                entities = picksAndMovement.cesiumEntities.map(function (pick) { return pick.acEntity; }).filter(function (acEntity) {
                    return acEntity && acEntity instanceof entityType;
                });
            }
            else {
                entities = picksAndMovement.cesiumEntities.map(function (pick) { return pick.acEntity; });
            }
            entities = UtilsService.unique(entities);
            if (entities.length === 0) {
                entities = null;
            }
        }
        picksAndMovement.entities = entities;
        return picksAndMovement;
    };
    MapEventsManagerService.prototype.plonter = function (entitiesAndMovement, pickOption) {
        if (pickOption === exports.PickOptions.PICK_ONE && entitiesAndMovement.entities !== null && entitiesAndMovement.entities.length > 1) {
            return this.plonterService.plonterIt(entitiesAndMovement);
        }
        else {
            return rxjs_Observable.Observable.of(entitiesAndMovement);
        }
    };
    MapEventsManagerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    MapEventsManagerService.ctorParameters = function () { return [
        { type: CesiumService, },
        { type: CesiumEventBuilder, },
        { type: PlonterService, },
    ]; };
    return MapEventsManagerService;
}());

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LabelDrawerService = (function (_super) {
    __extends$3(LabelDrawerService, _super);
    function LabelDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.label) || this;
    }
    LabelDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    LabelDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return LabelDrawerService;
}(EntitiesDrawerService));

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PolylineDrawerService = (function (_super) {
    __extends$4(PolylineDrawerService, _super);
    function PolylineDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.polyline) || this;
    }
    PolylineDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    PolylineDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return PolylineDrawerService;
}(EntitiesDrawerService));

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PrimitivesDrawerService = (function (_super) {
    __extends$6(PrimitivesDrawerService, _super);
    function PrimitivesDrawerService(drawerType, cesiumService) {
        var _this = _super.call(this) || this;
        _this.drawerType = drawerType;
        _this.cesiumService = cesiumService;
        _this._show = true;
        return _this;
    }
    PrimitivesDrawerService.prototype.init = function () {
        this._cesiumCollection = new this.drawerType();
        this._primitiveCollectionWrap = new Cesium.PrimitiveCollection();
        this._primitiveCollectionWrap.add(this._cesiumCollection);
        this.cesiumService.getScene().primitives.add(this._primitiveCollectionWrap);
    };
    PrimitivesDrawerService.prototype.add = function (cesiumProps) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this._cesiumCollection.add(cesiumProps);
    };
    PrimitivesDrawerService.prototype.update = function (entity, cesiumProps) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (this._propsAssigner) {
            this._propsAssigner(entity, cesiumProps);
        }
        else {
            Object.assign(entity, cesiumProps);
        }
    };
    PrimitivesDrawerService.prototype.remove = function (entity) {
        this._cesiumCollection.remove(entity);
    };
    PrimitivesDrawerService.prototype.removeAll = function () {
        this._cesiumCollection.removeAll();
    };
    PrimitivesDrawerService.prototype.setShow = function (showValue) {
        this._show = showValue;
        this._primitiveCollectionWrap.show = showValue;
    };
    PrimitivesDrawerService.prototype.getShow = function () {
        return this._show;
    };
    return PrimitivesDrawerService;
}(BasicDrawerService));

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PointDrawerService = (function (_super) {
    __extends$5(PointDrawerService, _super);
    function PointDrawerService(cesiumService) {
        return _super.call(this, Cesium.PointPrimitiveCollection, cesiumService) || this;
    }
    PointDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    PointDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return PointDrawerService;
}(PrimitivesDrawerService));

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ArcDrawerService = (function (_super) {
    __extends$7(ArcDrawerService, _super);
    function ArcDrawerService(cesiumService) {
        return _super.call(this, Cesium.PolylineCollection, cesiumService) || this;
    }
    ArcDrawerService.prototype._calculateArcPositions = function (cesiumProps) {
        var quality = cesiumProps.quality || 18;
        var delta = (cesiumProps.delta) / quality;
        var pointsArray = [];
        for (var i = 0; i < quality + 1; ++i) {
            var point = GeoUtilsService.pointByLocationDistanceAndAzimuth(cesiumProps.center, cesiumProps.radius, cesiumProps.angle + delta * i, true);
            pointsArray.push(point);
        }
        return pointsArray;
    };
    ArcDrawerService.prototype._calculateTriangle = function (cesiumProps) {
        return [
            cesiumProps.center,
            GeoUtilsService.pointByLocationDistanceAndAzimuth(cesiumProps.center, cesiumProps.radius, cesiumProps.angle, true)
        ];
    };
    ArcDrawerService.prototype._calculateArc = function (cesiumProps) {
        var arcPoints = this._calculateArcPositions(cesiumProps);
        return cesiumProps.drawEdges ? arcPoints.concat(this._calculateTriangle(cesiumProps)) : arcPoints;
    };
    ArcDrawerService.prototype.add = function (cesiumProps) {
        cesiumProps.positions = this._calculateArc(cesiumProps);
        if (cesiumProps.color) {
            var material = Cesium.Material.fromType('Color');
            material.uniforms.color = cesiumProps.color;
            cesiumProps.material = material;
        }
        return this._cesiumCollection.add(cesiumProps);
    };
    
    ArcDrawerService.prototype.update = function (primitive, cesiumProps) {
        if (!cesiumProps.constantColor && cesiumProps.color &&
            !primitive.material.uniforms.color.equals(cesiumProps.color)) {
            primitive.material.uniforms.color = cesiumProps.color;
        }
        primitive.width = cesiumProps.width !== undefined ? cesiumProps.width : primitive.width;
        primitive.show = cesiumProps.show !== undefined ? cesiumProps.show : primitive.show;
        primitive.distanceDisplayCondition = cesiumProps.distanceDisplayCondition !== undefined ?
            cesiumProps.distanceDisplayCondition : primitive.distanceDisplayCondition;
        primitive.positions = this._calculateArc(cesiumProps);
        return primitive;
    };
    ArcDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    ArcDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return ArcDrawerService;
}(PrimitivesDrawerService));

var MapsManagerService = (function () {
    function MapsManagerService() {
        this.defaultIdCounter = 0;
        this._Maps = new Map();
    }
    MapsManagerService.prototype.getMap = function (id) {
        if (!id) {
            return this.firstMap;
        }
        return this._Maps.get(id);
    };
    MapsManagerService.prototype.registerMap = function (id, acMap) {
        if (!this.firstMap) {
            this.firstMap = acMap;
        }
        var mapId = id ? id : this.generateDefaultId();
        this._Maps.set(mapId, acMap);
    };
    MapsManagerService.prototype.generateDefaultId = function () {
        this.defaultIdCounter++;
        return 'default-map-id-' + this.defaultIdCounter;
    };
    MapsManagerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    MapsManagerService.ctorParameters = function () { return []; };
    return MapsManagerService;
}());

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EllipseDrawerService = (function (_super) {
    __extends$8(EllipseDrawerService, _super);
    function EllipseDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.ellipse, {
            collectionsNumber: 100,
            collectionMaxSize: 100,
            collectionSuspensionTime: 100
        }) || this;
    }
    EllipseDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    EllipseDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return EllipseDrawerService;
}(EntitiesDrawerService));

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PolygonDrawerService = (function (_super) {
    __extends$9(PolygonDrawerService, _super);
    function PolygonDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.polygon) || this;
    }
    PolygonDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    PolygonDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return PolygonDrawerService;
}(EntitiesDrawerService));

(function (KeyboardAction) {
    KeyboardAction[KeyboardAction["CAMERA_FORWARD"] = 0] = "CAMERA_FORWARD";
    KeyboardAction[KeyboardAction["CAMERA_BACKWARD"] = 1] = "CAMERA_BACKWARD";
    KeyboardAction[KeyboardAction["CAMERA_RIGHT"] = 2] = "CAMERA_RIGHT";
    KeyboardAction[KeyboardAction["CAMERA_LEFT"] = 3] = "CAMERA_LEFT";
    KeyboardAction[KeyboardAction["CAMERA_UP"] = 4] = "CAMERA_UP";
    KeyboardAction[KeyboardAction["CAMERA_DOWN"] = 5] = "CAMERA_DOWN";
    KeyboardAction[KeyboardAction["CAMERA_LOOK_RIGHT"] = 6] = "CAMERA_LOOK_RIGHT";
    KeyboardAction[KeyboardAction["CAMERA_LOOK_LEFT"] = 7] = "CAMERA_LOOK_LEFT";
    KeyboardAction[KeyboardAction["CAMERA_LOOK_UP"] = 8] = "CAMERA_LOOK_UP";
    KeyboardAction[KeyboardAction["CAMERA_LOOK_DOWN"] = 9] = "CAMERA_LOOK_DOWN";
    KeyboardAction[KeyboardAction["CAMERA_TWIST_RIGHT"] = 10] = "CAMERA_TWIST_RIGHT";
    KeyboardAction[KeyboardAction["CAMERA_TWIST_LEFT"] = 11] = "CAMERA_TWIST_LEFT";
    KeyboardAction[KeyboardAction["CAMERA_ROTATE_RIGHT"] = 12] = "CAMERA_ROTATE_RIGHT";
    KeyboardAction[KeyboardAction["CAMERA_ROTATE_LEFT"] = 13] = "CAMERA_ROTATE_LEFT";
    KeyboardAction[KeyboardAction["CAMERA_ROTATE_UP"] = 14] = "CAMERA_ROTATE_UP";
    KeyboardAction[KeyboardAction["CAMERA_ROTATE_DOWN"] = 15] = "CAMERA_ROTATE_DOWN";
    KeyboardAction[KeyboardAction["CAMERA_ZOOM_IN"] = 16] = "CAMERA_ZOOM_IN";
    KeyboardAction[KeyboardAction["CAMERA_ZOOM_OUT"] = 17] = "CAMERA_ZOOM_OUT";
})(exports.KeyboardAction || (exports.KeyboardAction = {}));

var CAMERA_MOVEMENT_DEFAULT_FACTOR = 100.0;
var CAMERA_LOOK_DEFAULT_FACTOR = 0.01;
var CAMERA_TWIST_DEFAULT_FACTOR = 0.01;
var CAMERA_ROTATE_DEFAULT_FACTOR = 0.01;
var PREDEFINED_KEYBOARD_ACTIONS = (_a = {},
    _a[exports.KeyboardAction.CAMERA_FORWARD] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var scene = cesiumService.getScene();
        var cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(camera.position).height;
        var moveRate = cameraHeight / (params.moveRate || CAMERA_MOVEMENT_DEFAULT_FACTOR);
        camera.moveForward(moveRate);
    },
    _a[exports.KeyboardAction.CAMERA_BACKWARD] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var scene = cesiumService.getScene();
        var cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(camera.position).height;
        var moveRate = cameraHeight / (params.moveRate || CAMERA_MOVEMENT_DEFAULT_FACTOR);
        camera.moveBackward(moveRate);
    },
    _a[exports.KeyboardAction.CAMERA_UP] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var scene = cesiumService.getScene();
        var cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(camera.position).height;
        var moveRate = cameraHeight / (params.moveRate || CAMERA_MOVEMENT_DEFAULT_FACTOR);
        camera.moveUp(moveRate);
    },
    _a[exports.KeyboardAction.CAMERA_DOWN] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var scene = cesiumService.getScene();
        var cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(camera.position).height;
        var moveRate = cameraHeight / (params.moveRate || CAMERA_MOVEMENT_DEFAULT_FACTOR);
        camera.moveDown(moveRate);
    },
    _a[exports.KeyboardAction.CAMERA_RIGHT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var scene = cesiumService.getScene();
        var cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(camera.position).height;
        var moveRate = cameraHeight / (params.moveRate || CAMERA_MOVEMENT_DEFAULT_FACTOR);
        camera.moveRight(moveRate);
    },
    _a[exports.KeyboardAction.CAMERA_LEFT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var scene = cesiumService.getScene();
        var cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(camera.position).height;
        var moveRate = cameraHeight / (params.moveRate || CAMERA_MOVEMENT_DEFAULT_FACTOR);
        camera.moveLeft(moveRate);
    },
    _a[exports.KeyboardAction.CAMERA_LOOK_RIGHT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var currentPosition = camera.positionCartographic;
        var lookFactor = params.lookFactor || CAMERA_LOOK_DEFAULT_FACTOR;
        camera.lookRight(currentPosition.latitude * lookFactor);
    },
    _a[exports.KeyboardAction.CAMERA_LOOK_LEFT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var currentPosition = camera.positionCartographic;
        var lookFactor = params.lookFactor || CAMERA_LOOK_DEFAULT_FACTOR;
        camera.lookLeft(currentPosition.latitude * lookFactor);
    },
    _a[exports.KeyboardAction.CAMERA_LOOK_UP] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var currentPosition = camera.positionCartographic;
        var lookFactor = params.lookFactor || CAMERA_LOOK_DEFAULT_FACTOR;
        camera.lookUp(currentPosition.longitude * (lookFactor * -1));
    },
    _a[exports.KeyboardAction.CAMERA_LOOK_DOWN] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var currentPosition = camera.positionCartographic;
        var lookFactor = params.lookFactor || CAMERA_LOOK_DEFAULT_FACTOR;
        camera.lookDown(currentPosition.longitude * (lookFactor * -1));
    },
    _a[exports.KeyboardAction.CAMERA_TWIST_RIGHT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var lookFactor = params.amount || CAMERA_TWIST_DEFAULT_FACTOR;
        camera.twistRight(lookFactor);
    },
    _a[exports.KeyboardAction.CAMERA_TWIST_LEFT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var lookFactor = params.amount || CAMERA_TWIST_DEFAULT_FACTOR;
        camera.twistLeft(lookFactor);
    },
    _a[exports.KeyboardAction.CAMERA_ROTATE_RIGHT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var lookFactor = params.angle || CAMERA_ROTATE_DEFAULT_FACTOR;
        camera.rotateRight(lookFactor);
    },
    _a[exports.KeyboardAction.CAMERA_ROTATE_LEFT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var lookFactor = params.angle || CAMERA_ROTATE_DEFAULT_FACTOR;
        camera.rotateLeft(lookFactor);
    },
    _a[exports.KeyboardAction.CAMERA_ROTATE_UP] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var lookFactor = params.angle || CAMERA_ROTATE_DEFAULT_FACTOR;
        camera.rotateUp(lookFactor);
    },
    _a[exports.KeyboardAction.CAMERA_ROTATE_DOWN] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var lookFactor = params.angle || CAMERA_ROTATE_DEFAULT_FACTOR;
        camera.rotateDown(lookFactor);
    },
    _a[exports.KeyboardAction.CAMERA_ZOOM_IN] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var amount = params.amount;
        camera.zoomIn(amount);
    },
    _a[exports.KeyboardAction.CAMERA_ZOOM_OUT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var amount = params.amount;
        camera.zoomOut(amount);
    },
    _a);
var _a;

var KeyEventState;
(function (KeyEventState) {
    KeyEventState[KeyEventState["IGNORED"] = 0] = "IGNORED";
    KeyEventState[KeyEventState["NOT_PRESSED"] = 1] = "NOT_PRESSED";
    KeyEventState[KeyEventState["PRESSED"] = 2] = "PRESSED";
})(KeyEventState || (KeyEventState = {}));
var KeyboardControlService = (function () {
    function KeyboardControlService(ngZone, cesiumService, document) {
        this.ngZone = ngZone;
        this.cesiumService = cesiumService;
        this.document = document;
        this._currentDefinitions = null;
        this._activeDefinitions = {};
        this._keyMappingFn = this.defaultKeyMappingFn;
    }
    KeyboardControlService.prototype.init = function () {
        var canvas = this.cesiumService.getCanvas();
        canvas.addEventListener('click', function () {
            canvas.focus();
        });
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);
        this.handleTick = this.handleTick.bind(this);
    };
    KeyboardControlService.prototype.setKeyboardControls = function (definitions, keyMappingFn, outsideOfAngularZone) {
        var _this = this;
        if (outsideOfAngularZone === void 0) { outsideOfAngularZone = false; }
        if (!definitions) {
            return this.removeKeyboardControls();
        }
        if (!this._currentDefinitions) {
            this.registerEvents(outsideOfAngularZone);
        }
        this._currentDefinitions = definitions;
        this._keyMappingFn = keyMappingFn || this.defaultKeyMappingFn;
        Object.keys(this._currentDefinitions).forEach(function (key) {
            _this._activeDefinitions[key] = {
                state: KeyEventState.NOT_PRESSED,
                action: null,
                keyboardEvent: null,
            };
        });
    };
    KeyboardControlService.prototype.removeKeyboardControls = function () {
        this.unregisterEvents();
        this._currentDefinitions = null;
    };
    KeyboardControlService.prototype.getAction = function (char) {
        return this._currentDefinitions[char] || null;
    };
    KeyboardControlService.prototype.defaultKeyMappingFn = function (keyEvent) {
        return String.fromCharCode(keyEvent.keyCode);
    };
    KeyboardControlService.prototype.handleKeydown = function (e) {
        var char = this._keyMappingFn(e);
        var action = this.getAction(char);
        if (action) {
            var actionState = this._activeDefinitions[char];
            if (actionState.state !== KeyEventState.IGNORED) {
                var execute = true;
                var params = this.getParams(action.params, e);
                if (action.validation) {
                    execute = action.validation(this.cesiumService, params, e);
                }
                if (execute === true) {
                    this._activeDefinitions[char] = {
                        state: KeyEventState.PRESSED,
                        action: action,
                        keyboardEvent: e,
                    };
                }
            }
        }
    };
    KeyboardControlService.prototype.handleKeyup = function (e) {
        var char = this._keyMappingFn(e);
        var action = this.getAction(char);
        if (action) {
            this._activeDefinitions[char] = {
                state: KeyEventState.NOT_PRESSED,
                action: null,
                keyboardEvent: e,
            };
            if (action.done && typeof action.done === 'function') {
                action.done(this.cesiumService, e);
            }
        }
    };
    KeyboardControlService.prototype.handleTick = function () {
        var _this = this;
        var activeKeys = Object.keys(this._activeDefinitions);
        activeKeys.forEach(function (key) {
            var actionState = _this._activeDefinitions[key];
            if (actionState !== null && actionState.action !== null && actionState.state === KeyEventState.PRESSED) {
                _this.executeAction(actionState.action, key, actionState.keyboardEvent);
            }
        });
    };
    KeyboardControlService.prototype.getParams = function (paramsDef, keyboardEvent) {
        if (!paramsDef) {
            return {};
        }
        if (typeof paramsDef === 'function') {
            return paramsDef(this.cesiumService, keyboardEvent);
        }
        return paramsDef;
    };
    KeyboardControlService.prototype.executeAction = function (execution, key, keyboardEvent) {
        if (!this._currentDefinitions) {
            return;
        }
        var params = this.getParams(execution.params, keyboardEvent);
        if (util.isNumber(execution.action)) {
            var predefinedAction = PREDEFINED_KEYBOARD_ACTIONS[execution.action];
            if (predefinedAction) {
                predefinedAction(this.cesiumService, params, keyboardEvent);
            }
        }
        else if (typeof execution.action === 'function') {
            var shouldCancelEvent = execution.action(this.cesiumService, params, keyboardEvent);
            if (shouldCancelEvent === false) {
                this._activeDefinitions[key] = {
                    state: KeyEventState.IGNORED,
                    action: null,
                    keyboardEvent: null,
                };
            }
        }
    };
    KeyboardControlService.prototype.registerEvents = function (outsideOfAngularZone) {
        var _this = this;
        var registerToEvents = function () {
            _this.document.addEventListener('keydown', _this.handleKeydown);
            _this.document.addEventListener('keyup', _this.handleKeyup);
            _this.cesiumService.getViewer().clock.onTick.addEventListener(_this.handleTick);
        };
        if (outsideOfAngularZone) {
            this.ngZone.runOutsideAngular(registerToEvents);
        }
        else {
            registerToEvents();
        }
    };
    KeyboardControlService.prototype.unregisterEvents = function () {
        this.document.removeEventListener('keydown', this.handleKeydown);
        this.document.removeEventListener('keyup', this.handleKeyup);
        this.cesiumService.getViewer().clock.onTick.removeEventListener(this.handleTick);
    };
    KeyboardControlService.decorators = [
        { type: _angular_core.Injectable },
    ];
    KeyboardControlService.ctorParameters = function () { return [
        { type: _angular_core.NgZone, },
        { type: CesiumService, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_common.DOCUMENT,] },] },
    ]; };
    return KeyboardControlService;
}());

(function (SceneMode) {
    SceneMode[SceneMode["SCENE3D"] = 0] = "SCENE3D";
    SceneMode[SceneMode["COLUMBUS_VIEW"] = 1] = "COLUMBUS_VIEW";
    SceneMode[SceneMode["SCENE2D"] = 2] = "SCENE2D";
    SceneMode[SceneMode["PERFORMANCE_SCENE2D"] = 3] = "PERFORMANCE_SCENE2D";
})(exports.SceneMode || (exports.SceneMode = {}));

var CameraService = (function () {
    function CameraService() {
        this.isSceneModePerformance2D = false;
    }
    CameraService.prototype.init = function (cesiumService) {
        this.viewer = cesiumService.getViewer();
        this.scene = cesiumService.getScene();
        this.screenSpaceCameraController = this.scene.screenSpaceCameraController;
        this.camera = this.scene.camera;
        this.lastRotate = this.screenSpaceCameraController.enableRotate;
        this.lastTilt = this.screenSpaceCameraController.enableTilt;
        this.lastLook = this.screenSpaceCameraController.enableLook;
    };
    CameraService.prototype._listenToSceneModeMorph = function (callback) {
        this.morphListenerCancelFn = this.scene.morphStart.addEventListener(callback);
    };
    CameraService.prototype._revertCameraProperties = function () {
        this.isSceneModePerformance2D = false;
        this.enableTilt(this.lastTilt);
        this.enableRotate(this.lastRotate);
        this.enableLook(this.lastLook);
    };
    CameraService.prototype.getCamera = function () {
        return this.camera;
    };
    CameraService.prototype.getScreenSpaceCameraController = function () {
        return this.screenSpaceCameraController;
    };
    CameraService.prototype.getMinimumZoom = function () {
        return this.screenSpaceCameraController.minimumZoomDistance;
    };
    CameraService.prototype.setMinimumZoom = function (amount) {
        this.screenSpaceCameraController.minimumZoomDistance = amount;
    };
    CameraService.prototype.getMaximumZoom = function () {
        return this.screenSpaceCameraController.maximumZoomDistance;
    };
    CameraService.prototype.setMaximumZoom = function (amount) {
        this.screenSpaceCameraController.maximumZoomDistance = amount;
    };
    CameraService.prototype.enableTilt = function (tilt) {
        this.screenSpaceCameraController.enableTilt = tilt;
    };
    CameraService.prototype.enableRotate = function (rotate) {
        this.screenSpaceCameraController.enableRotate = rotate;
    };
    CameraService.prototype.enableLook = function (lock) {
        this.screenSpaceCameraController.enableLook = lock;
    };
    CameraService.prototype.enableTranslate = function (translate) {
        this.screenSpaceCameraController.enableTranslate = translate;
    };
    CameraService.prototype.enableZoom = function (zoom) {
        this.screenSpaceCameraController.enableZoom = zoom;
    };
    CameraService.prototype.enableInputs = function (inputs) {
        this.screenSpaceCameraController.enableInputs = inputs;
    };
    CameraService.prototype.setSceneMode = function (sceneMode, duration) {
        var _this = this;
        switch (sceneMode) {
            case exports.SceneMode.SCENE3D: {
                if (this.isSceneModePerformance2D) {
                    this._revertCameraProperties();
                }
                this.scene.morphTo3D(duration);
                break;
            }
            case exports.SceneMode.COLUMBUS_VIEW: {
                if (this.isSceneModePerformance2D) {
                    this._revertCameraProperties();
                }
                this.scene.morphToColumbusView(duration);
                break;
            }
            case exports.SceneMode.SCENE2D: {
                if (this.isSceneModePerformance2D) {
                    this._revertCameraProperties();
                }
                this.scene.morphTo2D(duration);
                break;
            }
            case exports.SceneMode.PERFORMANCE_SCENE2D: {
                this.isSceneModePerformance2D = true;
                this.lastLook = this.screenSpaceCameraController.enableLook;
                this.lastTilt = this.screenSpaceCameraController.enableTilt;
                this.lastRotate = this.screenSpaceCameraController.enableRotate;
                this.screenSpaceCameraController.enableTilt = false;
                this.screenSpaceCameraController.enableRotate = false;
                this.screenSpaceCameraController.enableLook = false;
                if (this.morphListenerCancelFn) {
                    this.morphListenerCancelFn();
                }
                this.scene.morphToColumbusView(duration);
                var morphCompleteEventListener_1 = this.scene.morphComplete.addEventListener(function () {
                    _this.camera.setView({
                        destination: Cesium.Cartesian3.fromDegrees(0.0, 0.0, Math.min(CameraService.PERFORMANCE_2D_ALTITUDE, _this.getMaximumZoom())),
                        orientation: {
                            pitch: Cesium.Math.toRadians(-90),
                        }
                    });
                    morphCompleteEventListener_1();
                    _this._listenToSceneModeMorph(_this._revertCameraProperties.bind(_this));
                });
                break;
            }
        }
    };
    CameraService.prototype.cameraFlyTo = function (options) {
        this.camera.flyTo(options);
    };
    CameraService.prototype.flyTo = function (target, options) {
        return this.viewer.flyTo(target, options);
    };
    CameraService.prototype.zoomTo = function (target, offset) {
        return this.viewer.zoomTo(target, offset);
    };
    CameraService.prototype.setView = function (options) {
        this.camera.setView(options);
    };
    CameraService.prototype.trackEntity = function (entity) {
        this.viewer.trackedEntity = entity;
    };
    CameraService.prototype.untrackEntity = function () {
        this.trackEntity();
    };
    CameraService.PERFORMANCE_2D_ALTITUDE = 25000000;
    CameraService.decorators = [
        { type: _angular_core.Injectable },
    ];
    CameraService.ctorParameters = function () { return []; };
    return CameraService;
}());

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
        { type: _angular_core.Injectable },
    ];
    MapLayersService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return MapLayersService;
}());

var AssociativeArray = Cesium.AssociativeArray;
var Color = Cesium.Color;
var ColorGeometryInstanceAttribute = Cesium.ColorGeometryInstanceAttribute;
var defined = Cesium.defined;
var DistanceDisplayCondition = Cesium.DistanceDisplayCondition;
var DistanceDisplayConditionGeometryInstanceAttribute = Cesium.DistanceDisplayConditionGeometryInstanceAttribute;
var ShowGeometryInstanceAttribute = Cesium.ShowGeometryInstanceAttribute;
var Primitive = Cesium.Primitive;
var ShadowMode = Cesium.ShadowMode;
var BoundingSphereState = Cesium.BoundingSphereState;
var ColorMaterialProperty = Cesium.ColorMaterialProperty;
var MaterialProperty = Cesium.MaterialProperty;
var Property = Cesium.Property;
var colorScratch = new Color();
var distanceDisplayConditionScratch = new DistanceDisplayCondition();
function Batch(primitives, translucent, appearanceType, depthFailAppearanceType, depthFailMaterialProperty, closed, shadows) {
    this.translucent = translucent;
    this.appearanceType = appearanceType;
    this.depthFailAppearanceType = depthFailAppearanceType;
    this.depthFailMaterialProperty = depthFailMaterialProperty;
    this.depthFailMaterial = undefined;
    this.closed = closed;
    this.shadows = shadows;
    this.primitives = primitives;
    this.createPrimitive = false;
    this.waitingOnCreate = false;
    this.primitive = undefined;
    this.oldPrimitive = undefined;
    this.geometry = new AssociativeArray();
    this.updaters = new AssociativeArray();
    this.updatersWithAttributes = new AssociativeArray();
    this.attributes = new AssociativeArray();
    this.subscriptions = new AssociativeArray();
    this.showsUpdated = new AssociativeArray();
    this.itemsToRemove = [];
    this.invalidated = false;
    var removeMaterialSubscription;
    if (defined(depthFailMaterialProperty)) {
        removeMaterialSubscription = depthFailMaterialProperty.definitionChanged.addEventListener(Batch.prototype.onMaterialChanged, this);
    }
    this.removeMaterialSubscription = removeMaterialSubscription;
}
Batch.prototype.onMaterialChanged = function () {
    this.invalidated = true;
};
Batch.prototype.isMaterial = function (updater) {
    var material = this.depthFailMaterialProperty;
    var updaterMaterial = updater.depthFailMaterialProperty;
    if (updaterMaterial === material) {
        return true;
    }
    if (defined(material)) {
        return material.equals(updaterMaterial);
    }
    return false;
};
Batch.prototype.add = function (updater, instance) {
    var id = updater.entity.id;
    this.createPrimitive = true;
    this.geometry.set(id, instance);
    this.updaters.set(id, updater);
    if (!updater.hasConstantFill || !updater.fillMaterialProperty.isConstant || !Property.isConstant(updater.distanceDisplayConditionProperty)) {
        this.updatersWithAttributes.set(id, updater);
    }
    else {
        var that = this;
        this.subscriptions.set(id, updater.entity.definitionChanged.addEventListener(function (entity, propertyName, newValue, oldValue) {
            if (propertyName === 'isShowing') {
                that.showsUpdated.set(entity.id, updater);
            }
        }));
    }
};
Batch.prototype.remove = function (updater) {
    var id = updater.entity.id;
    this.createPrimitive = this.geometry.remove(id) || this.createPrimitive;
    if (this.updaters.remove(id)) {
        this.updatersWithAttributes.remove(id);
        var unsubscribe = this.subscriptions.get(id);
        if (defined(unsubscribe)) {
            unsubscribe();
            this.subscriptions.remove(id);
        }
    }
};
Batch.prototype.update = function (time) {
    var isUpdated = true;
    var removedCount = 0;
    var primitive = this.primitive;
    var primitives = this.primitives;
    var attributes;
    var i;
    if (this.createPrimitive) {
        var geometries = this.geometry.values;
        var geometriesLength = geometries.length;
        if (geometriesLength > 0) {
            if (defined(primitive)) {
                if (!defined(this.oldPrimitive)) {
                    this.oldPrimitive = primitive;
                }
                else {
                    primitives.remove(primitive);
                }
            }
            for (i = 0; i < geometriesLength; i++) {
                var geometryItem = geometries[i];
                var originalAttributes = geometryItem.attributes;
                attributes = this.attributes.get(geometryItem.id.id);
                if (defined(attributes)) {
                    if (defined(originalAttributes.show)) {
                        originalAttributes.show.value = attributes.show;
                    }
                    if (defined(originalAttributes.color)) {
                        originalAttributes.color.value = attributes.color;
                    }
                    if (defined(originalAttributes.depthFailColor)) {
                        originalAttributes.depthFailColor.value = attributes.depthFailColor;
                    }
                }
            }
            var depthFailAppearance;
            if (defined(this.depthFailAppearanceType)) {
                if (defined(this.depthFailMaterialProperty)) {
                    this.depthFailMaterial = MaterialProperty.getValue(time, this.depthFailMaterialProperty, this.depthFailMaterial);
                }
                depthFailAppearance = new this.depthFailAppearanceType({
                    material: this.depthFailMaterial,
                    translucent: this.translucent,
                    closed: this.closed
                });
            }
            primitive = new Primitive({
                asynchronous: true,
                geometryInstances: geometries,
                appearance: new this.appearanceType({
                    flat: this.shadows === ShadowMode.DISABLED || this.shadows === ShadowMode.CAST_ONLY,
                    translucent: this.translucent,
                    closed: this.closed
                }),
                depthFailAppearance: depthFailAppearance,
                shadows: this.shadows
            });
            primitives.add(primitive);
            isUpdated = false;
        }
        else {
            if (defined(primitive)) {
                primitives.remove(primitive);
                primitive = undefined;
            }
            var oldPrimitive = this.oldPrimitive;
            if (defined(oldPrimitive)) {
                primitives.remove(oldPrimitive);
                this.oldPrimitive = undefined;
            }
        }
        this.attributes.removeAll();
        this.primitive = primitive;
        this.createPrimitive = false;
        this.waitingOnCreate = true;
    }
    else if (defined(primitive) && primitive.ready) {
        if (defined(this.oldPrimitive)) {
            primitives.remove(this.oldPrimitive);
            this.oldPrimitive = undefined;
        }
        if (defined(this.depthFailAppearanceType) && !(this.depthFailMaterialProperty instanceof ColorMaterialProperty)) {
            this.depthFailMaterial = MaterialProperty.getValue(time, this.depthFailMaterialProperty, this.depthFailMaterial);
            this.primitive.depthFailAppearance.material = this.depthFailMaterial;
        }
        var updatersWithAttributes = this.updatersWithAttributes.values;
        var length = updatersWithAttributes.length;
        var waitingOnCreate = this.waitingOnCreate;
        for (i = 0; i < length; i++) {
            var updater = updatersWithAttributes[i];
            var instance = this.geometry.get(updater.entity.id);
            attributes = this.attributes.get(instance.id.id);
            if (!defined(attributes)) {
                attributes = primitive.getGeometryInstanceAttributes(instance.id);
                this.attributes.set(instance.id.id, attributes);
            }
            if (!updater.fillMaterialProperty.isConstant || waitingOnCreate) {
                var colorProperty = updater.fillMaterialProperty.color;
                colorProperty.getValue(time, colorScratch);
                if (!Color.equals(attributes._lastColor, colorScratch)) {
                    attributes._lastColor = Color.clone(colorScratch, attributes._lastColor);
                    attributes.color = ColorGeometryInstanceAttribute.toValue(colorScratch, attributes.color);
                    if ((this.translucent && attributes.color[3] === 255) || (!this.translucent && attributes.color[3] !== 255)) {
                        this.itemsToRemove[removedCount++] = updater;
                    }
                }
            }
            if (defined(this.depthFailAppearanceType) && this.depthFailAppearanceType instanceof ColorMaterialProperty && (!updater.depthFailMaterialProperty.isConstant || waitingOnCreate)) {
                var depthFailColorProperty = updater.depthFailMaterialProperty.color;
                depthFailColorProperty.getValue(time, colorScratch);
                if (!Color.equals(attributes._lastDepthFailColor, colorScratch)) {
                    attributes._lastDepthFailColor = Color.clone(colorScratch, attributes._lastDepthFailColor);
                    attributes.depthFailColor = ColorGeometryInstanceAttribute.toValue(colorScratch, attributes.depthFailColor);
                }
            }
            var show = updater.entity.isShowing && (updater.hasConstantFill || updater.isFilled(time));
            var currentShow = attributes.show[0] === 1;
            if (show !== currentShow) {
                attributes.show = ShowGeometryInstanceAttribute.toValue(show, attributes.show);
            }
            var distanceDisplayConditionProperty = updater.distanceDisplayConditionProperty;
            if (!Property.isConstant(distanceDisplayConditionProperty)) {
                var distanceDisplayCondition = distanceDisplayConditionProperty.getValue(time, distanceDisplayConditionScratch);
                if (!DistanceDisplayCondition.equals(distanceDisplayCondition, attributes._lastDistanceDisplayCondition)) {
                    attributes._lastDistanceDisplayCondition = DistanceDisplayCondition.clone(distanceDisplayCondition, attributes._lastDistanceDisplayCondition);
                    attributes.distanceDisplayCondition = DistanceDisplayConditionGeometryInstanceAttribute.toValue(distanceDisplayCondition, attributes.distanceDisplayCondition);
                }
            }
        }
        this.updateShows(primitive);
        this.waitingOnCreate = false;
    }
    else if (defined(primitive) && !primitive.ready) {
        isUpdated = false;
    }
    this.itemsToRemove.length = removedCount;
    return isUpdated;
};
Batch.prototype.updateShows = function (primitive) {
    var showsUpdated = this.showsUpdated.values;
    var length = showsUpdated.length;
    for (var i = 0; i < length; i++) {
        var updater = showsUpdated[i];
        var instance = this.geometry.get(updater.entity.id);
        var attributes = this.attributes.get(instance.id.id);
        if (!defined(attributes)) {
            attributes = primitive.getGeometryInstanceAttributes(instance.id);
            this.attributes.set(instance.id.id, attributes);
        }
        var show = updater.entity.isShowing;
        var currentShow = attributes.show[0] === 1;
        if (show !== currentShow) {
            attributes.show = ShowGeometryInstanceAttribute.toValue(show, attributes.show);
        }
    }
    this.showsUpdated.removeAll();
};
Batch.prototype.contains = function (entity) {
    return this.updaters.contains(entity.id);
};
Batch.prototype.getBoundingSphere = function (entity, result) {
    var primitive = this.primitive;
    if (!primitive.ready) {
        return BoundingSphereState.PENDING;
    }
    var attributes = primitive.getGeometryInstanceAttributes(entity);
    if (!defined(attributes) || !defined(attributes.boundingSphere) ||
        (defined(attributes.show) && attributes.show[0] === 0)) {
        return BoundingSphereState.FAILED;
    }
    attributes.boundingSphere.clone(result);
    return BoundingSphereState.DONE;
};
Batch.prototype.removeAllPrimitives = function () {
    var primitives = this.primitives;
    var primitive = this.primitive;
    if (defined(primitive)) {
        primitives.remove(primitive);
        this.primitive = undefined;
        this.geometry.removeAll();
        this.updaters.removeAll();
    }
    var oldPrimitive = this.oldPrimitive;
    if (defined(oldPrimitive)) {
        primitives.remove(oldPrimitive);
        this.oldPrimitive = undefined;
    }
};
Batch.prototype.destroy = function () {
    var primitive = this.primitive;
    var primitives = this.primitives;
    if (defined(primitive)) {
        primitives.remove(primitive);
    }
    var oldPrimitive = this.oldPrimitive;
    if (defined(oldPrimitive)) {
        primitives.remove(oldPrimitive);
    }
    if (defined(this.removeMaterialSubscription)) {
        this.removeMaterialSubscription();
    }
};
var wasFixed = false;
function fixCesiumEntitiesShadows() {
    if (wasFixed) {
        return;
    }
    Cesium.StaticGeometryColorBatch.prototype.add = function (time, updater) {
        var items;
        var translucent;
        var instance = updater.createFillGeometryInstance(time);
        if (instance.attributes.color.value[3] === 255) {
            items = this._solidItems;
            translucent = false;
        }
        else {
            items = this._translucentItems;
            translucent = true;
        }
        var length = items.length;
        for (var i = 0; i < length; i++) {
            var item = items[i];
            if (item.isMaterial(updater)) {
                item.add(updater, instance);
                return;
            }
        }
        var batch = new Batch(this._primitives, translucent, this._appearanceType, this._depthFailAppearanceType, updater.depthFailMaterialProperty, this._closed, this._shadows);
        batch.add(updater, instance);
        items.push(batch);
    };
    wasFixed = true;
}

var ConfigurationService = (function () {
    function ConfigurationService(config) {
        this.config = config;
        var fixEntitiesShadows = config ? config.fixEntitiesShadows : true;
        if (fixEntitiesShadows !== false) {
            fixCesiumEntitiesShadows();
        }
    }
    ConfigurationService.decorators = [
        { type: _angular_core.Injectable },
    ];
    ConfigurationService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: ['config',] },] },
    ]; };
    return ConfigurationService;
}());

var ScreenshotService = (function () {
    function ScreenshotService(cesiumSerive) {
        this.cesiumSerive = cesiumSerive;
    }
    ScreenshotService.prototype.getMapScreenshotDataUrlBase64 = function () {
        var canvas = this.cesiumSerive.getCanvas();
        return canvas.toDataURL();
    };
    ScreenshotService.prototype.downloadMapScreenshot = function (filename) {
        if (filename === void 0) { filename = 'map.png'; }
        var dataUrl = this.getMapScreenshotDataUrlBase64();
        this.downloadURI(dataUrl, filename);
    };
    ScreenshotService.prototype.downloadURI = function (uri, name) {
        var link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    ScreenshotService.decorators = [
        { type: _angular_core.Injectable },
    ];
    ScreenshotService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return ScreenshotService;
}());

var ContextMenuService = (function () {
    function ContextMenuService() {
        this._showContextMenu = false;
        this._contextMenuChangeNotifier = new _angular_core.EventEmitter();
        this._onOpen = new _angular_core.EventEmitter();
        this._onClose = new _angular_core.EventEmitter();
        this._defaultContextMenuOptions = {
            closeOnLeftCLick: true,
            closeOnLeftClickPriority: 10,
        };
    }
    Object.defineProperty(ContextMenuService.prototype, "contextMenuChangeNotifier", {
        get: function () {
            return this._contextMenuChangeNotifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextMenuService.prototype, "showContextMenu", {
        get: function () {
            return this._showContextMenu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextMenuService.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextMenuService.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextMenuService.prototype, "content", {
        get: function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextMenuService.prototype, "onOpen", {
        get: function () {
            return this._onOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextMenuService.prototype, "onClose", {
        get: function () {
            return this._onClose;
        },
        enumerable: true,
        configurable: true
    });
    ContextMenuService.prototype.init = function (mapEventsManager) {
        this.mapEventsManager = mapEventsManager;
    };
    ContextMenuService.prototype.open = function (content, position, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.close();
        this._content = content;
        this._position = position;
        this._options = Object.assign({}, this._defaultContextMenuOptions, options);
        this._showContextMenu = true;
        if (this.mapEventsManager && this._options.closeOnLeftCLick) {
            this.leftClickRegistration = this.mapEventsManager.register({
                event: exports.CesiumEvent.LEFT_CLICK,
                pick: exports.PickOptions.NO_PICK,
                priority: this._options.closeOnLeftClickPriority,
            });
            this.leftClickSubscription = this.leftClickRegistration.subscribe(function () {
                _this.leftClickSubscription.unsubscribe();
                _this.close();
            });
        }
        this._contextMenuChangeNotifier.emit();
        this._onOpen.emit();
    };
    ContextMenuService.prototype.close = function () {
        this._content = undefined;
        this._position = undefined;
        this._options = undefined;
        this._showContextMenu = false;
        if (this.leftClickRegistration) {
            this.leftClickRegistration.dispose();
            this.leftClickRegistration = undefined;
        }
        if (this.leftClickSubscription) {
            this.leftClickSubscription.unsubscribe();
            this.leftClickSubscription = undefined;
        }
        this._contextMenuChangeNotifier.emit();
        this._onClose.emit();
    };
    ContextMenuService.decorators = [
        { type: _angular_core.Injectable },
    ];
    ContextMenuService.ctorParameters = function () { return []; };
    return ContextMenuService;
}());

var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var LatLonVectors$1 = geodesy.LatLonVectors;
window['geodesy'] = geodesy;
var CoordinateConverter = (function () {
    function CoordinateConverter(cesiumService) {
        this.cesiumService = cesiumService;
    }
    CoordinateConverter.prototype.screenToCartesian3 = function (screenPos, addMapCanvansBoundsToPos) {
        if (!this.cesiumService) {
            throw new Error('ANGULAR2-CESIUM - Cesium service should be provided in order to do screen position calculations');
        }
        else {
            var screenPosition = __assign$1({}, screenPos);
            if (addMapCanvansBoundsToPos) {
                var mapBounds = this.cesiumService.getViewer().canvas.getBoundingClientRect();
                screenPosition.x += mapBounds.left;
                screenPosition.y += mapBounds.top;
            }
            var camera = this.cesiumService.getViewer().camera;
            return camera.pickEllipsoid(screenPosition);
        }
    };
    CoordinateConverter.prototype.screenToCartographic = function (screenPos, ellipsoid) {
        return this.cartesian3ToCartographic(this.screenToCartesian3(screenPos), ellipsoid);
    };
    CoordinateConverter.prototype.cartesian3ToCartographic = function (cartesian, ellipsoid) {
        return Cesium.Cartographic.fromCartesian(cartesian, ellipsoid);
    };
    CoordinateConverter.prototype.degreesToCartographic = function (longitude, latitude, height) {
        return Cesium.Cartographic.fromDegrees(longitude, latitude, height);
    };
    CoordinateConverter.prototype.radiansToCartographic = function (longitude, latitude, height) {
        return Cesium.Cartographic.fromRadians(longitude, latitude, height);
    };
    CoordinateConverter.prototype.degreesToUTM = function (longitude, latitude) {
        return new geodesy.LatLonEllipsoidal(latitude, longitude).toUtm();
    };
    CoordinateConverter.prototype.UTMToDegrees = function (zone, hemisphereType, easting, northing) {
        return this.geodesyToCesiumObject(new geodesy.Utm(zone, hemisphereType, easting, northing).toLatLonE());
    };
    CoordinateConverter.prototype.geodesyToCesiumObject = function (geodesyRadians) {
        return {
            longitude: geodesyRadians.lon,
            latitude: geodesyRadians.lat,
            height: geodesyRadians['height'] ? geodesyRadians['height'] : 0
        };
    };
    CoordinateConverter.prototype.midPointToCartesian3 = function (first, second) {
        var toDeg = function (rad) { return Cesium.Math.toDegrees(rad); };
        var firstPoint = new LatLonVectors$1(toDeg(first.latitude), toDeg(first.longitude));
        var secondPoint = new LatLonVectors$1(toDeg(second.latitude), toDeg(second.longitude));
        var middlePoint = firstPoint.midpointTo(secondPoint);
        return Cesium.Cartesian3.fromDegrees(middlePoint.lon, middlePoint.lat);
    };
    CoordinateConverter.prototype.middlePointByScreen = function (position0, position1) {
        var scene = this.cesiumService.getScene();
        var screenPosition1 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, position0);
        var screenPosition2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, position1);
        var middleScreenPoint = new Cesium.Cartesian2((screenPosition2.x + screenPosition1.x) / 2.0, (screenPosition2.y + screenPosition1.y) / 2.0);
        return scene.pickPosition(middleScreenPoint);
    };
    CoordinateConverter.prototype.bearingTo = function (first, second) {
        var toDeg = function (rad) { return Cesium.Math.toDegrees(rad); };
        var firstPoint = new LatLonVectors$1(toDeg(first.latitude), toDeg(first.longitude));
        var secondPoint = new LatLonVectors$1(toDeg(second.latitude), toDeg(second.longitude));
        var bearing = firstPoint.bearingTo(secondPoint);
        return bearing;
    };
    CoordinateConverter.prototype.bearingToCartesian = function (firstCartesian3, secondCartesian3) {
        var firstCart = Cesium.Cartographic.fromCartesian(firstCartesian3);
        var secondCart = Cesium.Cartographic.fromCartesian(secondCartesian3);
        return this.bearingTo(firstCart, secondCart);
    };
    CoordinateConverter.decorators = [
        { type: _angular_core.Injectable },
    ];
    CoordinateConverter.ctorParameters = function () { return [
        { type: CesiumService, decorators: [{ type: _angular_core.Optional },] },
    ]; };
    return CoordinateConverter;
}());

var __extends$10 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PolylinePrimitiveDrawerService = (function (_super) {
    __extends$10(PolylinePrimitiveDrawerService, _super);
    function PolylinePrimitiveDrawerService(cesiumService) {
        return _super.call(this, Cesium.PolylineCollection, cesiumService) || this;
    }
    PolylinePrimitiveDrawerService.prototype.add = function (cesiumProps) {
        return this._cesiumCollection.add(this.withColorMaterial(cesiumProps));
    };
    PolylinePrimitiveDrawerService.prototype.update = function (cesiumObject, cesiumProps) {
        if (cesiumProps.material instanceof Cesium.Color) {
            if (cesiumObject.material && cesiumObject.material.uniforms &&
                cesiumObject.material.uniforms.color instanceof Cesium.Color) {
                this.withColorMaterial(cesiumProps);
            }
            else if (!cesiumObject.material.uniforms.color.equals(cesiumProps.material)) {
                cesiumObject.material.uniforms.color = cesiumProps.material;
            }
        }
        _super.prototype.update.call(this, cesiumObject, cesiumProps);
    };
    PolylinePrimitiveDrawerService.prototype.withColorMaterial = function (cesiumProps) {
        if (cesiumProps.material instanceof Cesium.Color) {
            var material = Cesium.Material.fromType('Color');
            material.uniforms.color = cesiumProps.material;
            cesiumProps.material = material;
        }
        return cesiumProps;
    };
    PolylinePrimitiveDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    PolylinePrimitiveDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return PolylinePrimitiveDrawerService;
}(PrimitivesDrawerService));

var AcMapComponent = (function () {
    function AcMapComponent(_cesiumService, _cameraService, _elemRef, document, mapsManagerService, billboardDrawerService, labelDrawerService, ellipseDrawerService, polylineDrawerService, polygonDrawerService, arcDrawerService, pointDrawerService, mapEventsManager, keyboardControlService, mapLayersService, configurationService, screenshotService, contextMenuService, coordinateConverter) {
        this._cesiumService = _cesiumService;
        this._cameraService = _cameraService;
        this._elemRef = _elemRef;
        this.document = document;
        this.mapsManagerService = mapsManagerService;
        this.billboardDrawerService = billboardDrawerService;
        this.labelDrawerService = labelDrawerService;
        this.ellipseDrawerService = ellipseDrawerService;
        this.polylineDrawerService = polylineDrawerService;
        this.polygonDrawerService = polygonDrawerService;
        this.arcDrawerService = arcDrawerService;
        this.pointDrawerService = pointDrawerService;
        this.mapEventsManager = mapEventsManager;
        this.keyboardControlService = keyboardControlService;
        this.mapLayersService = mapLayersService;
        this.configurationService = configurationService;
        this.screenshotService = screenshotService;
        this.contextMenuService = contextMenuService;
        this.coordinateConverter = coordinateConverter;
        this.disableDefaultPlonter = false;
        this.mapContainer = this.document.createElement('div');
        this.mapContainer.className = 'map-container';
        this._elemRef.nativeElement.appendChild(this.mapContainer);
        this._cesiumService.init(this.mapContainer);
        this._cameraService.init(this._cesiumService);
        this.mapEventsManager.init();
        this.billboardDrawerService.init();
        this.labelDrawerService.init();
        this.ellipseDrawerService.init();
        this.polylineDrawerService.init();
        this.polygonDrawerService.init();
        this.arcDrawerService.init();
        this.pointDrawerService.init();
        this.keyboardControlService.init();
        this.contextMenuService.init(this.mapEventsManager);
    }
    AcMapComponent.prototype.ngOnInit = function () {
        this.mapsManagerService.registerMap(this.id, this);
    };
    AcMapComponent.prototype.ngOnChanges = function (changes) {
        if (changes['sceneMode']) {
            this._cameraService.setSceneMode(changes['sceneMode'].currentValue);
        }
        if (changes['flyTo']) {
            this._cameraService.cameraFlyTo(changes['flyTo'].currentValue);
        }
    };
    AcMapComponent.prototype.ngAfterViewInit = function () {
        this.mapLayersService.drawAllLayers();
    };
    AcMapComponent.prototype.getCesiumSerivce = function () {
        return this._cesiumService;
    };
    AcMapComponent.prototype.getCesiumViewer = function () {
        return this._cesiumService.getViewer();
    };
    AcMapComponent.prototype.getCameraService = function () {
        return this._cameraService;
    };
    AcMapComponent.prototype.getId = function () {
        return this.id;
    };
    AcMapComponent.prototype.getMapEventsManager = function () {
        return this.mapEventsManager;
    };
    AcMapComponent.prototype.getContextMenuService = function () {
        return this.contextMenuService;
    };
    AcMapComponent.prototype.getScreenshotService = function () {
        return this.screenshotService;
    };
    AcMapComponent.prototype.getKeyboardControlService = function () {
        return this.keyboardControlService;
    };
    AcMapComponent.prototype.getCoordinateConverter = function () {
        return this.coordinateConverter;
    };
    AcMapComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-map',
                    template: "\n      <ac-default-plonter *ngIf=\"!disableDefaultPlonter\"></ac-default-plonter>\n      <ac-context-menu-wrapper></ac-context-menu-wrapper>\n      <ng-content></ng-content>",
                    providers: [
                        CesiumService,
                        BillboardDrawerService,
                        CesiumEventBuilder,
                        KeyboardControlService,
                        MapEventsManagerService,
                        PlonterService,
                        LabelDrawerService,
                        PolylineDrawerService,
                        PolylinePrimitiveDrawerService,
                        EllipseDrawerService,
                        PointDrawerService,
                        ArcDrawerService,
                        PolygonDrawerService,
                        MapLayersService,
                        CameraService,
                        ScreenshotService,
                        ContextMenuService,
                        CoordinateConverter,
                    ]
                },] },
    ];
    AcMapComponent.ctorParameters = function () { return [
        { type: CesiumService, },
        { type: CameraService, },
        { type: _angular_core.ElementRef, },
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_common.DOCUMENT,] },] },
        { type: MapsManagerService, },
        { type: BillboardDrawerService, },
        { type: LabelDrawerService, },
        { type: EllipseDrawerService, },
        { type: PolylineDrawerService, },
        { type: PolygonDrawerService, },
        { type: ArcDrawerService, },
        { type: PointDrawerService, },
        { type: MapEventsManagerService, },
        { type: KeyboardControlService, },
        { type: MapLayersService, },
        { type: ConfigurationService, },
        { type: ScreenshotService, },
        { type: ContextMenuService, },
        { type: CoordinateConverter, },
    ]; };
    AcMapComponent.propDecorators = {
        'disableDefaultPlonter': [{ type: _angular_core.Input },],
        'id': [{ type: _angular_core.Input },],
        'flyTo': [{ type: _angular_core.Input },],
        'sceneMode': [{ type: _angular_core.Input },],
    };
    return AcMapComponent;
}());

var LayerService = (function () {
    function LayerService() {
        this._cache = true;
        this.descriptions = [];
        this.layerUpdate = new _angular_core.EventEmitter();
    }
    Object.defineProperty(LayerService.prototype, "cache", {
        get: function () {
            return this._cache;
        },
        set: function (value) {
            this._cache = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerService.prototype, "zIndex", {
        get: function () {
            return this._zIndex;
        },
        set: function (value) {
            if (value !== this._zIndex) {
                this.layerUpdate.emit();
            }
            this._zIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerService.prototype, "show", {
        get: function () {
            return this._show;
        },
        set: function (value) {
            if (value !== this._show) {
                this.layerUpdate.emit();
            }
            this._show = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerService.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            this._options = value;
            this.layerUpdate.emit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerService.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (context) {
            this._context = context;
            this.layerUpdate.emit();
        },
        enumerable: true,
        configurable: true
    });
    LayerService.prototype.setEntityName = function (name) {
        this._entityName = name;
    };
    LayerService.prototype.getEntityName = function () {
        return this._entityName;
    };
    LayerService.prototype.registerDescription = function (descriptionComponent) {
        if (this.descriptions.indexOf(descriptionComponent) < 0) {
            this.descriptions.push(descriptionComponent);
        }
    };
    LayerService.prototype.unregisterDescription = function (descriptionComponent) {
        var index = this.descriptions.indexOf(descriptionComponent);
        if (index > -1) {
            this.descriptions.splice(index, 1);
        }
    };
    LayerService.prototype.getDescriptions = function () {
        return this.descriptions;
    };
    LayerService.prototype.layerUpdates = function () {
        return this.layerUpdate;
    };
    LayerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    LayerService.ctorParameters = function () { return []; };
    return LayerService;
}());

(function (ActionType) {
    ActionType[ActionType["ADD_UPDATE"] = 0] = "ADD_UPDATE";
    ActionType[ActionType["DELETE"] = 1] = "DELETE";
})(exports.ActionType || (exports.ActionType = {}));

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
        { type: _angular_core.Injectable },
    ];
    ComputationCache.ctorParameters = function () { return []; };
    return ComputationCache;
}());

var Checker = (function () {
    function Checker() {
    }
    Checker.throwIfAnyNotPresent = function (values, propertyNames) {
        propertyNames.forEach(function (propertyName) { return Checker.throwIfNotPresent(values, propertyName); });
    };
    Checker.throwIfNotPresent = function (value, name) {
        if (!Checker.present(value[name])) {
            throw new Error("Error: " + name + " was not given.");
        }
    };
    Checker.present = function (value) {
        return value !== undefined && value !== null;
    };
    return Checker;
}());

var __extends$11 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DynamicEllipseDrawerService = (function (_super) {
    __extends$11(DynamicEllipseDrawerService, _super);
    function DynamicEllipseDrawerService(cesiumService) {
        return _super.call(this, Cesium.PrimitiveCollection, cesiumService) || this;
    }
    DynamicEllipseDrawerService.prototype.add = function (cesiumProps) {
        Checker.throwIfAnyNotPresent(cesiumProps, ['center', 'semiMajorAxis', 'semiMinorAxis']);
        return _super.prototype.add.call(this, new primitivePrimitives.EllipsePrimitive(cesiumProps));
    };
    DynamicEllipseDrawerService.prototype.update = function (ellipse, cesiumProps) {
        ellipse.updateLocationData(cesiumProps);
        return ellipse;
    };
    DynamicEllipseDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    DynamicEllipseDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return DynamicEllipseDrawerService;
}(PrimitivesDrawerService));

var __extends$12 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DynamicPolylineDrawerService = (function (_super) {
    __extends$12(DynamicPolylineDrawerService, _super);
    function DynamicPolylineDrawerService(cesiumService) {
        return _super.call(this, Cesium.PolylineCollection, cesiumService) || this;
    }
    DynamicPolylineDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    DynamicPolylineDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return DynamicPolylineDrawerService;
}(PrimitivesDrawerService));

var __extends$14 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var StaticPrimitiveDrawer = (function (_super) {
    __extends$14(StaticPrimitiveDrawer, _super);
    function StaticPrimitiveDrawer(geometryType, cesiumService) {
        var _this = _super.call(this, Cesium.PrimitiveCollection, cesiumService) || this;
        _this.geometryType = geometryType;
        return _this;
    }
    StaticPrimitiveDrawer.prototype.add = function (geometryProps, instanceProps, primitiveProps) {
        instanceProps.geometry = new this.geometryType(geometryProps);
        primitiveProps.geometryInstances = new Cesium.GeometryInstance(instanceProps);
        primitiveProps.asynchronous = false;
        var primitive = new Cesium.Primitive(primitiveProps);
        return _super.prototype.add.call(this, primitive);
    };
    StaticPrimitiveDrawer.prototype.update = function (primitive, geometryProps, instanceProps, primitiveProps) {
        instanceProps.geometry = new this.geometryType(geometryProps);
        primitiveProps.geometryInstances = new Cesium.GeometryInstance(instanceProps);
        this._cesiumCollection.remove(primitive);
        return _super.prototype.add.call(this, new Cesium.Primitive(primitiveProps));
    };
    return StaticPrimitiveDrawer;
}(PrimitivesDrawerService));

var __extends$13 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var StaticCircleDrawerService = (function (_super) {
    __extends$13(StaticCircleDrawerService, _super);
    function StaticCircleDrawerService(cesiumService) {
        return _super.call(this, Cesium.CircleGeometry, cesiumService) || this;
    }
    StaticCircleDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    StaticCircleDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return StaticCircleDrawerService;
}(StaticPrimitiveDrawer));

var __extends$15 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var StaticPolylineDrawerService = (function (_super) {
    __extends$15(StaticPolylineDrawerService, _super);
    function StaticPolylineDrawerService(cesiumService) {
        return _super.call(this, Cesium.PolylineGeometry, cesiumService) || this;
    }
    StaticPolylineDrawerService.prototype.update = function (primitive, geometryProps, instanceProps, primitiveProps) {
        var color = instanceProps.attributes.color.value;
        if (primitive.ready) {
            primitive.getGeometryInstanceAttributes().color = color;
        }
        else {
            Cesium.when(primitive.readyPromise).then(function (readyPrimitive) {
                readyPrimitive.getGeometryInstanceAttributes().color.value = color;
            });
        }
        return primitive;
    };
    StaticPolylineDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    StaticPolylineDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return StaticPolylineDrawerService;
}(StaticPrimitiveDrawer));

var __extends$16 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var StaticPolygonDrawerService = (function (_super) {
    __extends$16(StaticPolygonDrawerService, _super);
    function StaticPolygonDrawerService(cesiumService) {
        return _super.call(this, Cesium.PolygonGeometry, cesiumService) || this;
    }
    StaticPolygonDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    StaticPolygonDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return StaticPolygonDrawerService;
}(StaticPrimitiveDrawer));

var __extends$17 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var StaticEllipseDrawerService = (function (_super) {
    __extends$17(StaticEllipseDrawerService, _super);
    function StaticEllipseDrawerService(cesiumService) {
        return _super.call(this, Cesium.EllipseGeometry, cesiumService) || this;
    }
    StaticEllipseDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    StaticEllipseDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return StaticEllipseDrawerService;
}(StaticPrimitiveDrawer));

var __extends$18 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ModelDrawerService = (function (_super) {
    __extends$18(ModelDrawerService, _super);
    function ModelDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.model) || this;
    }
    ModelDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    ModelDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return ModelDrawerService;
}(EntitiesDrawerService));

var __extends$19 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BoxDrawerService = (function (_super) {
    __extends$19(BoxDrawerService, _super);
    function BoxDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.box) || this;
    }
    BoxDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    BoxDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return BoxDrawerService;
}(EntitiesDrawerService));

var __extends$20 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CorridorDrawerService = (function (_super) {
    __extends$20(CorridorDrawerService, _super);
    function CorridorDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.corridor) || this;
    }
    CorridorDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    CorridorDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return CorridorDrawerService;
}(EntitiesDrawerService));

var __extends$21 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CylinderDrawerService = (function (_super) {
    __extends$21(CylinderDrawerService, _super);
    function CylinderDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.cylinder) || this;
    }
    CylinderDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    CylinderDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return CylinderDrawerService;
}(EntitiesDrawerService));

var __extends$22 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EllipsoidDrawerService = (function (_super) {
    __extends$22(EllipsoidDrawerService, _super);
    function EllipsoidDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.ellipsoid) || this;
    }
    EllipsoidDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    EllipsoidDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return EllipsoidDrawerService;
}(EntitiesDrawerService));

var __extends$23 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PolylineVolumeDrawerService = (function (_super) {
    __extends$23(PolylineVolumeDrawerService, _super);
    function PolylineVolumeDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.polylineVolume) || this;
    }
    PolylineVolumeDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    PolylineVolumeDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return PolylineVolumeDrawerService;
}(EntitiesDrawerService));

var __extends$24 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WallDrawerService = (function (_super) {
    __extends$24(WallDrawerService, _super);
    function WallDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.wall) || this;
    }
    WallDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    WallDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return WallDrawerService;
}(EntitiesDrawerService));

var __extends$25 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RectangleDrawerService = (function (_super) {
    __extends$25(RectangleDrawerService, _super);
    function RectangleDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.rectangle) || this;
    }
    RectangleDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    RectangleDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return RectangleDrawerService;
}(EntitiesDrawerService));

var __extends$26 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LabelPrimitiveDrawerService = (function (_super) {
    __extends$26(LabelPrimitiveDrawerService, _super);
    function LabelPrimitiveDrawerService(cesiumService) {
        return _super.call(this, Cesium.LabelCollection, cesiumService) || this;
    }
    LabelPrimitiveDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    LabelPrimitiveDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return LabelPrimitiveDrawerService;
}(PrimitivesDrawerService));

var __extends$27 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BillboardPrimitiveDrawerService = (function (_super) {
    __extends$27(BillboardPrimitiveDrawerService, _super);
    function BillboardPrimitiveDrawerService(cesiumService) {
        return _super.call(this, Cesium.BillboardCollection, cesiumService) || this;
    }
    BillboardPrimitiveDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    BillboardPrimitiveDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return BillboardPrimitiveDrawerService;
}(PrimitivesDrawerService));

var __extends$28 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PointPrimitiveDrawerService = (function (_super) {
    __extends$28(PointPrimitiveDrawerService, _super);
    function PointPrimitiveDrawerService(cesiumService) {
        return _super.call(this, Cesium.PointPrimitiveCollection, cesiumService) || this;
    }
    PointPrimitiveDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    PointPrimitiveDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return PointPrimitiveDrawerService;
}(PrimitivesDrawerService));

var __extends$29 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var HtmlDrawerService = (function (_super) {
    __extends$29(HtmlDrawerService, _super);
    function HtmlDrawerService(_cesiumService) {
        var _this = _super.call(this, Cesium.HtmlCollection, _cesiumService) || this;
        _this._cesiumService = _cesiumService;
        return _this;
    }
    HtmlDrawerService.prototype.add = function (cesiumProps) {
        cesiumProps.scene = this._cesiumService.getScene();
        return _super.prototype.add.call(this, cesiumProps);
    };
    HtmlDrawerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    HtmlDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return HtmlDrawerService;
}(PrimitivesDrawerService));

var AcLayerComponent = (function () {
    function AcLayerComponent(layerService, _computationCache, mapLayersService, billboardDrawerService, labelDrawerService, ellipseDrawerService, polylineDrawerService, polygonDrawerService, arcDrawerService, pointDrawerService, modelDrawerService, boxDrawerService, corridorDrawerService, cylinderDrawerService, ellipsoidDrawerSerice, polylineVolumeDrawerService, wallDrawerService, rectangleDrawerService, dynamicEllipseDrawerService, dynamicPolylineDrawerService, staticCircleDrawerService, staticPolylineDrawerService, staticPolygonDrawerService, staticEllipseDrawerService, polylinePrimitiveDrawerService, labelPrimitiveDrawerService, billboardPrimitiveDrawerService, pointPrimitiveDrawerService, htmlDrawerService) {
        this.layerService = layerService;
        this._computationCache = _computationCache;
        this.mapLayersService = mapLayersService;
        this.show = true;
        this.store = false;
        this.zIndex = 0;
        this.acForRgx = /^let\s+.+\s+of\s+.+$/;
        this.stopObservable = new rxjs_Subject.Subject();
        this._updateStream = new rxjs_Subject.Subject();
        this.entitiesStore = new Map();
        this.layerDrawerDataSources = [];
        this._drawerList = new Map([
            ['billboard', billboardDrawerService],
            ['label', labelDrawerService],
            ['ellipse', ellipseDrawerService],
            ['polyline', polylineDrawerService],
            ['polygon', polygonDrawerService],
            ['arc', arcDrawerService],
            ['point', pointDrawerService],
            ['model', modelDrawerService],
            ['box', boxDrawerService],
            ['corridor', corridorDrawerService],
            ['cylinder', cylinderDrawerService],
            ['ellipsoid', ellipsoidDrawerSerice],
            ['polylineVolume', polylineVolumeDrawerService],
            ['rectangle', rectangleDrawerService],
            ['wall', wallDrawerService],
            ['polylinePrimitive', polylinePrimitiveDrawerService],
            ['labelPrimitive', labelPrimitiveDrawerService],
            ['billboardPrimitive', billboardPrimitiveDrawerService],
            ['pointPrimitive', pointPrimitiveDrawerService],
            ['html', htmlDrawerService],
            ['dynamicEllipse', dynamicEllipseDrawerService],
            ['dynamicPolyline', dynamicPolylineDrawerService],
            ['staticCircle', staticCircleDrawerService],
            ['staticPolyline', staticPolylineDrawerService],
            ['staticPolygon', staticPolygonDrawerService],
            ['staticEllipse', staticEllipseDrawerService],
        ]);
    }
    AcLayerComponent.prototype.init = function () {
        var _this = this;
        this.initValidParams();
        rxjs_Observable.Observable.merge(this._updateStream, this.observable).takeUntil(this.stopObservable).subscribe(function (notification) {
            _this._computationCache.clear();
            var contextEntity = notification.entity;
            if (_this.store) {
                contextEntity = _this.updateStore(notification);
            }
            _this.context[_this.entityName] = contextEntity;
            _this.layerService.getDescriptions().forEach(function (descriptionComponent) {
                switch (notification.actionType) {
                    case exports.ActionType.ADD_UPDATE:
                        descriptionComponent.draw(_this.context, notification.id, contextEntity);
                        break;
                    case exports.ActionType.DELETE:
                        descriptionComponent.remove(notification.id);
                        break;
                    default:
                        console.error('[ac-layer] unknown AcNotification.actionType for notification: ' + notification);
                }
            });
        });
    };
    AcLayerComponent.prototype.updateStore = function (notification) {
        if (notification.actionType === exports.ActionType.DELETE) {
            this.entitiesStore.delete(notification.id);
            return undefined;
        }
        else {
            if (this.entitiesStore.has(notification.id)) {
                var entity = this.entitiesStore.get(notification.id);
                Object.assign(entity, notification.entity);
                return entity;
            }
            else {
                this.entitiesStore.set(notification.id, notification.entity);
                return notification.entity;
            }
        }
    };
    AcLayerComponent.prototype.initValidParams = function () {
        if (!this.context) {
            throw new Error('ac-layer: must initialize [context] ');
        }
        if (!this.acForRgx.test(this.acFor)) {
            throw new Error("ac-layer: Invalid [acFor] syntax. Expected: [acFor]=\"let item of observable\" .Instead received: " + this.acFor);
        }
        var acForArr = this.acFor.split(' ');
        this.observable = this.context[acForArr[3]];
        this.entityName = acForArr[1];
        if (!this.observable || !(this.observable instanceof rxjs_Observable.Observable)) {
            throw new Error('ac-layer: must initailize [acFor] with rx observable, instead received: ' + this.observable);
        }
        this.layerService.context = this.context;
        this.layerService.setEntityName(this.entityName);
    };
    AcLayerComponent.prototype.ngAfterContentInit = function () {
        this.init();
    };
    AcLayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layerService.context = this.context;
        this.layerService.options = this.options;
        this.layerService.show = this.show;
        this.layerService.zIndex = this.zIndex;
        this._drawerList.forEach(function (drawer, drawerName) {
            var initOptions = _this.options ? _this.options[drawerName] : undefined;
            var drawerDataSources = drawer.init(initOptions);
            if (drawerDataSources) {
                _this.mapLayersService.registerLayerDataSources(drawerDataSources, _this.zIndex);
                (_a = _this.layerDrawerDataSources).push.apply(_a, drawerDataSources);
            }
            drawer.setShow(_this.show);
            var _a;
        });
    };
    AcLayerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.show && !changes.show.firstChange) {
            var showValue_1 = changes['show'].currentValue;
            this.layerService.show = showValue_1;
            this._drawerList.forEach(function (drawer) { return drawer.setShow(showValue_1); });
        }
        if (changes.zIndex && !changes.zIndex.firstChange) {
            var zIndexValue = changes['zIndex'].currentValue;
            this.layerService.zIndex = zIndexValue;
            this.mapLayersService.updateAndRefresh(this.layerDrawerDataSources, zIndexValue);
        }
    };
    AcLayerComponent.prototype.ngOnDestroy = function () {
        this.mapLayersService.removeDataSources(this.layerDrawerDataSources);
        this.stopObservable.next(true);
        this.removeAll();
    };
    AcLayerComponent.prototype.getLayerService = function () {
        return this.layerService;
    };
    AcLayerComponent.prototype.getStore = function () {
        return this.entitiesStore;
    };
    
    AcLayerComponent.prototype.removeAll = function () {
        this.layerService.getDescriptions().forEach(function (description) { return description.removeAll(); });
        this.entitiesStore.clear();
    };
    AcLayerComponent.prototype.remove = function (entityId) {
        this._updateStream.next({ id: entityId, actionType: exports.ActionType.DELETE });
        this.entitiesStore.delete(entityId);
    };
    AcLayerComponent.prototype.updateNotification = function (notification) {
        this._updateStream.next(notification);
    };
    AcLayerComponent.prototype.update = function (entity, id) {
        this._updateStream.next({ entity: entity, id: id, actionType: exports.ActionType.ADD_UPDATE });
    };
    AcLayerComponent.prototype.refreshAll = function (collection) {
        var _this = this;
        rxjs_Observable.Observable.from(collection).subscribe(function (entity) { return _this._updateStream.next(entity); });
    };
    AcLayerComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-layer',
                    template: '<ng-content></ng-content>',
                    providers: [
                        LayerService,
                        ComputationCache,
                        BillboardDrawerService,
                        LabelDrawerService,
                        EllipseDrawerService,
                        PolylineDrawerService,
                        ArcDrawerService,
                        PointDrawerService,
                        PolygonDrawerService,
                        ModelDrawerService,
                        BoxDrawerService,
                        CorridorDrawerService,
                        CylinderDrawerService,
                        EllipsoidDrawerService,
                        PolylineVolumeDrawerService,
                        WallDrawerService,
                        RectangleDrawerService,
                        PolylinePrimitiveDrawerService,
                        LabelPrimitiveDrawerService,
                        BillboardPrimitiveDrawerService,
                        PointPrimitiveDrawerService,
                        HtmlDrawerService,
                        DynamicEllipseDrawerService,
                        DynamicPolylineDrawerService,
                        StaticCircleDrawerService,
                        StaticPolylineDrawerService,
                        StaticPolygonDrawerService,
                        StaticEllipseDrawerService,
                    ]
                },] },
    ];
    AcLayerComponent.ctorParameters = function () { return [
        { type: LayerService, },
        { type: ComputationCache, },
        { type: MapLayersService, },
        { type: BillboardDrawerService, },
        { type: LabelDrawerService, },
        { type: EllipseDrawerService, },
        { type: PolylineDrawerService, },
        { type: PolygonDrawerService, },
        { type: ArcDrawerService, },
        { type: PointDrawerService, },
        { type: ModelDrawerService, },
        { type: BoxDrawerService, },
        { type: CorridorDrawerService, },
        { type: CylinderDrawerService, },
        { type: EllipsoidDrawerService, },
        { type: PolylineVolumeDrawerService, },
        { type: WallDrawerService, },
        { type: RectangleDrawerService, },
        { type: DynamicEllipseDrawerService, },
        { type: DynamicPolylineDrawerService, },
        { type: StaticCircleDrawerService, },
        { type: StaticPolylineDrawerService, },
        { type: StaticPolygonDrawerService, },
        { type: StaticEllipseDrawerService, },
        { type: PolylinePrimitiveDrawerService, },
        { type: LabelPrimitiveDrawerService, },
        { type: BillboardPrimitiveDrawerService, },
        { type: PointPrimitiveDrawerService, },
        { type: HtmlDrawerService, },
    ]; };
    AcLayerComponent.propDecorators = {
        'show': [{ type: _angular_core.Input },],
        'acFor': [{ type: _angular_core.Input },],
        'context': [{ type: _angular_core.Input },],
        'store': [{ type: _angular_core.Input },],
        'options': [{ type: _angular_core.Input },],
        'zIndex': [{ type: _angular_core.Input },],
    };
    return AcLayerComponent;
}());

var EntityOnMapComponent = (function () {
    function EntityOnMapComponent(_drawer, mapLayers) {
        this._drawer = _drawer;
        this.mapLayers = mapLayers;
    }
    EntityOnMapComponent.prototype.ngOnInit = function () {
        this.selfPrimitiveIsDraw = false;
        var dataSources = this._drawer.init();
        if (dataSources) {
            this.dataSources = dataSources;
            this.mapLayers.registerLayerDataSources(dataSources, 0);
        }
        this.drawOnMap();
    };
    EntityOnMapComponent.prototype.ngOnChanges = function (changes) {
        var props = changes['props'];
        if (props.currentValue !== props.previousValue) {
            this.updateOnMap();
        }
    };
    EntityOnMapComponent.prototype.drawOnMap = function () {
        this.selfPrimitiveIsDraw = true;
        return this.selfPrimitive = this._drawer.add(this.props);
    };
    EntityOnMapComponent.prototype.removeFromMap = function () {
        this.selfPrimitiveIsDraw = false;
        return this._drawer.remove(this.selfPrimitive);
    };
    EntityOnMapComponent.prototype.updateOnMap = function () {
        if (this.selfPrimitiveIsDraw) {
            return this._drawer.update(this.selfPrimitive, this.props);
        }
    };
    EntityOnMapComponent.prototype.ngOnDestroy = function () {
        this.mapLayers.removeDataSources(this.dataSources);
        this.removeFromMap();
    };
    EntityOnMapComponent.propDecorators = {
        'props': [{ type: _angular_core.Input },],
    };
    return EntityOnMapComponent;
}());

var __extends$30 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcBillboardComponent = (function (_super) {
    __extends$30(AcBillboardComponent, _super);
    function AcBillboardComponent(billboardDrawer, mapLayers) {
        return _super.call(this, billboardDrawer, mapLayers) || this;
    }
    AcBillboardComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-billboard',
                    template: '',
                },] },
    ];
    AcBillboardComponent.ctorParameters = function () { return [
        { type: BillboardDrawerService, },
        { type: MapLayersService, },
    ]; };
    return AcBillboardComponent;
}(EntityOnMapComponent));

var BasicDesc = (function () {
    function BasicDesc(_drawer, _layerService, _computationCache, _cesiumProperties) {
        this._drawer = _drawer;
        this._layerService = _layerService;
        this._computationCache = _computationCache;
        this._cesiumProperties = _cesiumProperties;
        this.onDraw = new _angular_core.EventEmitter();
        this.onRemove = new _angular_core.EventEmitter();
        this._cesiumObjectsMap = new Map();
    }
    BasicDesc.prototype._propsEvaluator = function (context) {
        return this._propsEvaluateFn(this._computationCache, context);
    };
    BasicDesc.prototype._getPropsAssigner = function () {
        var _this = this;
        return function (cesiumObject, desc) { return _this._propsAssignerFn(cesiumObject, desc); };
    };
    BasicDesc.prototype.getLayerService = function () {
        return this._layerService;
    };
    BasicDesc.prototype.setLayerService = function (layerService) {
        this._layerService.unregisterDescription(this);
        this._layerService = layerService;
        this._layerService.registerDescription(this);
        this._propsEvaluateFn = this._cesiumProperties.createEvaluator(this.props, this._layerService.cache, true);
        this._propsAssignerFn = this._cesiumProperties.createAssigner(this.props);
    };
    BasicDesc.prototype.ngOnInit = function () {
        if (!this.props) {
            console.error('ac-desc components error: [props] input is mandatory');
        }
        this._layerService.registerDescription(this);
        this._propsEvaluateFn = this._cesiumProperties.createEvaluator(this.props, this._layerService.cache);
        this._propsAssignerFn = this._cesiumProperties.createAssigner(this.props);
    };
    BasicDesc.prototype.getCesiumObjectsMap = function () {
        return this._cesiumObjectsMap;
    };
    BasicDesc.prototype.draw = function (context, id, entity) {
        var cesiumProps = this._propsEvaluator(context);
        if (!this._cesiumObjectsMap.has(id)) {
            var cesiumObject = this._drawer.add(cesiumProps);
            this.onDraw.emit({
                acEntity: entity,
                cesiumEntity: cesiumObject,
                entityId: id,
            });
            cesiumObject.acEntity = entity;
            this._cesiumObjectsMap.set(id, cesiumObject);
        }
        else {
            var cesiumObject = this._cesiumObjectsMap.get(id);
            this.onDraw.emit({
                acEntity: entity,
                cesiumEntity: cesiumObject,
                entityId: id,
            });
            cesiumObject.acEntity = entity;
            this._drawer.setPropsAssigner(this._getPropsAssigner());
            this._drawer.update(cesiumObject, cesiumProps);
        }
    };
    BasicDesc.prototype.remove = function (id) {
        var cesiumObject = this._cesiumObjectsMap.get(id);
        if (cesiumObject) {
            this.onRemove.emit({
                acEntity: cesiumObject.acEntity,
                cesiumEntity: cesiumObject,
                entityId: id,
            });
            this._drawer.remove(cesiumObject);
            this._cesiumObjectsMap.delete(id);
        }
    };
    BasicDesc.prototype.removeAll = function () {
        this._cesiumObjectsMap.clear();
        this._drawer.removeAll();
    };
    BasicDesc.prototype.ngOnDestroy = function () {
        this._layerService.unregisterDescription(this);
        this.removeAll();
    };
    BasicDesc.propDecorators = {
        'props': [{ type: _angular_core.Input },],
        'onDraw': [{ type: _angular_core.Output },],
        'onRemove': [{ type: _angular_core.Output },],
    };
    return BasicDesc;
}());

var JsonMapper = (function () {
    function JsonMapper() {
        this._mapper = new jsonStringMapper.JsonStringMapper();
    }
    JsonMapper.prototype.map = function (expression) {
        return this._mapper.map(expression);
    };
    JsonMapper.decorators = [
        { type: _angular_core.Injectable },
    ];
    JsonMapper.ctorParameters = function () { return []; };
    return JsonMapper;
}());

var SmartAssigner = (function () {
    function SmartAssigner() {
    }
    SmartAssigner.create = function (props, allowUndefined) {
        if (props === void 0) { props = []; }
        if (allowUndefined === void 0) { allowUndefined = true; }
        var fnBody = "";
        props.forEach(function (prop) {
            if (!allowUndefined) {
                fnBody += "if (obj2['" + prop + "'] !== undefined) { obj1['" + prop + "'] = obj2['" + prop + "']; } ";
            }
            else {
                fnBody += "obj1['" + prop + "'] = obj2['" + prop + "']; ";
            }
        });
        fnBody += "return obj1";
        var assignFn = new Function('obj1', 'obj2', fnBody);
        return function smartAssigner(obj1, obj2) {
            return assignFn(obj1, obj2);
        };
    };
    return SmartAssigner;
}());

var CesiumProperties = (function () {
    function CesiumProperties(_parser, _jsonMapper) {
        this._parser = _parser;
        this._jsonMapper = _jsonMapper;
        this._assignersCache = new Map();
        this._evaluatorsCache = new Map();
    }
    CesiumProperties.prototype._compile = function (expression, withCache) {
        var _this = this;
        if (withCache === void 0) { withCache = true; }
        var cesiumDesc = {};
        var propsMap = new Map();
        var resultMap = this._jsonMapper.map(expression);
        resultMap.forEach(function (resultExpression, prop) { return propsMap.set(prop, {
            expression: resultExpression,
            get: _this._parser.eval(resultExpression)
        }); });
        propsMap.forEach(function (value, prop) {
            if (withCache) {
                cesiumDesc[prop || 'undefined'] = "cache.get(`" + value.expression + "`, () => propsMap.get('" + prop + "').get(context))";
            }
            else {
                cesiumDesc[prop || 'undefined'] = "propsMap.get('" + prop + "').get(context)";
            }
        });
        var fnBody = "return " + JSON.stringify(cesiumDesc).replace(/"/g, '') + ";";
        var getFn = new Function('propsMap', 'cache', 'context', fnBody);
        return function evaluateCesiumProps(cache, context) {
            return getFn(propsMap, cache, context);
        };
    };
    CesiumProperties.prototype._build = function (expression) {
        var props = Array.from(this._jsonMapper.map(expression).keys());
        var smartAssigner = SmartAssigner.create(props);
        return function assignCesiumProps(oldVal, newVal) {
            return smartAssigner(oldVal, newVal);
        };
    };
    CesiumProperties.prototype.createEvaluator = function (expression, withCache, newEvaluator) {
        if (withCache === void 0) { withCache = true; }
        if (newEvaluator === void 0) { newEvaluator = false; }
        if (!newEvaluator && this._evaluatorsCache.has(expression)) {
            return this._evaluatorsCache.get(expression);
        }
        var evaluatorFn = this._compile(expression, withCache);
        this._evaluatorsCache.set(expression, evaluatorFn);
        return evaluatorFn;
    };
    CesiumProperties.prototype.createAssigner = function (expression) {
        if (this._assignersCache.has(expression)) {
            return this._assignersCache.get(expression);
        }
        var assignFn = this._build(expression);
        this._assignersCache.set(expression, assignFn);
        return assignFn;
    };
    CesiumProperties.decorators = [
        { type: _angular_core.Injectable },
    ];
    CesiumProperties.ctorParameters = function () { return [
        { type: angular2parse.Parse, },
        { type: JsonMapper, },
    ]; };
    return CesiumProperties;
}());

var __extends$31 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcBillboardDescComponent = (function (_super) {
    __extends$31(AcBillboardDescComponent, _super);
    function AcBillboardDescComponent(billboardDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, billboardDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcBillboardDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-billboard-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcBillboardDescComponent; }) }],
                },] },
    ];
    AcBillboardDescComponent.ctorParameters = function () { return [
        { type: BillboardDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcBillboardDescComponent;
}(BasicDesc));

var __extends$32 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcEllipseDescComponent = (function (_super) {
    __extends$32(AcEllipseDescComponent, _super);
    function AcEllipseDescComponent(ellipseDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, ellipseDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcEllipseDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-ellipse-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcEllipseDescComponent; }) }],
                },] },
    ];
    AcEllipseDescComponent.ctorParameters = function () { return [
        { type: EllipseDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcEllipseDescComponent;
}(BasicDesc));

var __extends$33 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcPolylineDescComponent = (function (_super) {
    __extends$33(AcPolylineDescComponent, _super);
    function AcPolylineDescComponent(dynamicPolylineDrawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, dynamicPolylineDrawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcPolylineDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-polyline-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcPolylineDescComponent; }) }],
                },] },
    ];
    AcPolylineDescComponent.ctorParameters = function () { return [
        { type: PolylineDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcPolylineDescComponent;
}(BasicDesc));

var PixelOffsetPipe = (function () {
    function PixelOffsetPipe() {
    }
    PixelOffsetPipe.prototype.transform = function (value, args) {
        return new Cesium.Cartesian2(value[0], value[1]);
    };
    PixelOffsetPipe.decorators = [
        { type: _angular_core.Pipe, args: [{
                    name: 'pixelOffset'
                },] },
    ];
    PixelOffsetPipe.ctorParameters = function () { return []; };
    return PixelOffsetPipe;
}());

var RadiansToDegreesPipe = (function () {
    function RadiansToDegreesPipe() {
    }
    RadiansToDegreesPipe.prototype.transform = function (value, args) {
        return (360 - Math.round(180 * value / Math.PI)) % 360;
    };
    RadiansToDegreesPipe.decorators = [
        { type: _angular_core.Pipe, args: [{
                    name: 'radiansToDegrees'
                },] },
    ];
    RadiansToDegreesPipe.ctorParameters = function () { return []; };
    return RadiansToDegreesPipe;
}());

var __extends$34 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcLabelDescComponent = (function (_super) {
    __extends$34(AcLabelDescComponent, _super);
    function AcLabelDescComponent(labelDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, labelDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcLabelDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-label-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcLabelDescComponent; }) }],
                },] },
    ];
    AcLabelDescComponent.ctorParameters = function () { return [
        { type: LabelDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcLabelDescComponent;
}(BasicDesc));

var UtilsModule = (function () {
    function UtilsModule() {
    }
    UtilsModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_common.CommonModule],
                    providers: []
                },] },
    ];
    UtilsModule.ctorParameters = function () { return []; };
    return UtilsModule;
}());

var __extends$35 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcCircleDescComponent = (function (_super) {
    __extends$35(AcCircleDescComponent, _super);
    function AcCircleDescComponent(ellipseDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, ellipseDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcCircleDescComponent.prototype._propsEvaluator = function (context) {
        var cesiumProps = _super.prototype._propsEvaluator.call(this, context);
        cesiumProps.semiMajorAxis = cesiumProps.radius;
        cesiumProps.semiMinorAxis = cesiumProps.radius;
        return cesiumProps;
    };
    AcCircleDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-circle-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcCircleDescComponent; }) }],
                },] },
    ];
    AcCircleDescComponent.ctorParameters = function () { return [
        { type: EllipseDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcCircleDescComponent;
}(BasicDesc));

var __extends$36 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcArcDescComponent = (function (_super) {
    __extends$36(AcArcDescComponent, _super);
    function AcArcDescComponent(arcDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, arcDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcArcDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-arc-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcArcDescComponent; }) }],
                },] },
    ];
    AcArcDescComponent.ctorParameters = function () { return [
        { type: ArcDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcArcDescComponent;
}(BasicDesc));

var AcEntity = (function () {
    function AcEntity(json) {
        Object.assign(this, json);
    }
    AcEntity.create = function (json) {
        if (json) {
            return Object.assign(new AcEntity(), json);
        }
        return new AcEntity();
    };
    return AcEntity;
}());

var AcNotification = (function () {
    function AcNotification() {
    }
    return AcNotification;
}());

(function (MapLayerProviderOptions) {
    MapLayerProviderOptions[MapLayerProviderOptions["ArcGisMapServer"] = Cesium.ArcGisMapServerImageryProvider] = "ArcGisMapServer";
    MapLayerProviderOptions[MapLayerProviderOptions["WebMapTileService"] = Cesium.WebMapTileServiceImageryProvider] = "WebMapTileService";
    MapLayerProviderOptions[MapLayerProviderOptions["MapTileService"] = Cesium.createTileMapServiceImageryProvider] = "MapTileService";
    MapLayerProviderOptions[MapLayerProviderOptions["WebMapService"] = Cesium.WebMapServiceImageryProvider] = "WebMapService";
    MapLayerProviderOptions[MapLayerProviderOptions["SingleTileImagery"] = Cesium.SingleTileImageryProvider] = "SingleTileImagery";
    MapLayerProviderOptions[MapLayerProviderOptions["OpenStreetMap"] = Cesium.createOpenStreetMapImageryProvider] = "OpenStreetMap";
    MapLayerProviderOptions[MapLayerProviderOptions["BingMaps"] = Cesium.BingMapsImageryProvider] = "BingMaps";
    MapLayerProviderOptions[MapLayerProviderOptions["GoogleEarthEnterpriseMaps"] = Cesium.GoogleEarthEnterpriseMapsProvider] = "GoogleEarthEnterpriseMaps";
    MapLayerProviderOptions[MapLayerProviderOptions["MapBox"] = Cesium.MapboxImageryProvider] = "MapBox";
    MapLayerProviderOptions[MapLayerProviderOptions["UrlTemplateImagery"] = Cesium.UrlTemplateImageryProvider] = "UrlTemplateImagery";
    MapLayerProviderOptions[MapLayerProviderOptions["OFFLINE"] = null] = "OFFLINE";
})(exports.MapLayerProviderOptions || (exports.MapLayerProviderOptions = {}));

var AcMapLayerProviderComponent = (function () {
    function AcMapLayerProviderComponent(cesiumService) {
        this.cesiumService = cesiumService;
        this.options = {};
        this.provider = exports.MapLayerProviderOptions.OFFLINE;
        this.show = true;
        this.alpha = 1.0;
        this.brightness = 1.0;
        this.contrast = 1.0;
        this.imageryLayersCollection = this.cesiumService.getScene().imageryLayers;
    }
    AcMapLayerProviderComponent.prototype.createOfflineMapProvider = function () {
        return Cesium.createTileMapServiceImageryProvider({
            url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
        });
    };
    AcMapLayerProviderComponent.prototype.ngOnInit = function () {
        if (!Checker.present(this.options.url) && this.provider !== exports.MapLayerProviderOptions.OFFLINE) {
            throw new Error('options must have a url');
        }
        switch (this.provider) {
            case exports.MapLayerProviderOptions.WebMapService:
            case exports.MapLayerProviderOptions.WebMapTileService:
            case exports.MapLayerProviderOptions.ArcGisMapServer:
            case exports.MapLayerProviderOptions.SingleTileImagery:
            case exports.MapLayerProviderOptions.BingMaps:
            case exports.MapLayerProviderOptions.GoogleEarthEnterpriseMaps:
            case exports.MapLayerProviderOptions.MapBox:
            case exports.MapLayerProviderOptions.UrlTemplateImagery:
                this.layerProvider = new this.provider(this.options);
                break;
            case exports.MapLayerProviderOptions.MapTileService:
            case exports.MapLayerProviderOptions.OpenStreetMap:
                this.layerProvider = this.provider(this.options);
                break;
            case exports.MapLayerProviderOptions.OFFLINE:
                this.layerProvider = this.createOfflineMapProvider();
                break;
            default:
                console.log('ac-map-layer-provider: [provider] wasn\'t found. setting OFFLINE provider as default');
                this.layerProvider = this.createOfflineMapProvider();
                break;
        }
        if (this.show) {
            this.imageryLayer = this.imageryLayersCollection.addImageryProvider(this.layerProvider, this.index);
            this.imageryLayer.alpha = this.alpha;
            this.imageryLayer.contrast = this.contrast;
            this.imageryLayer.brightness = this.brightness;
        }
    };
    AcMapLayerProviderComponent.prototype.ngOnChanges = function (changes) {
        if (changes['show'] && !changes['show'].isFirstChange()) {
            var showValue = changes['show'].currentValue;
            if (showValue) {
                if (this.imageryLayer) {
                    this.imageryLayersCollection.add(this.imageryLayer, this.index);
                }
                else {
                    this.imageryLayer = this.imageryLayersCollection.addImageryProvider(this.layerProvider, this.index);
                    this.imageryLayer.alpha = this.alpha;
                    this.imageryLayer.contrast = this.contrast;
                    this.imageryLayer.brightness = this.brightness;
                }
            }
            else if (this.imageryLayer) {
                this.imageryLayersCollection.remove(this.imageryLayer, false);
            }
        }
        if (changes['alpha'] && !changes['alpha'].isFirstChange() && this.imageryLayer) {
            this.imageryLayer.alpha = this.alpha;
        }
        if (changes['contrast'] && !changes['contrast'].isFirstChange() && this.imageryLayer) {
            this.imageryLayer.contrast = this.contrast;
        }
        if (changes['brightness'] && !changes['brightness'].isFirstChange() && this.imageryLayer) {
            this.imageryLayer.brightness = this.brightness;
        }
    };
    AcMapLayerProviderComponent.prototype.ngOnDestroy = function () {
        if (this.imageryLayer) {
            this.imageryLayersCollection.remove(this.imageryLayer, true);
        }
    };
    AcMapLayerProviderComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-map-layer-provider',
                    template: '',
                },] },
    ];
    AcMapLayerProviderComponent.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    AcMapLayerProviderComponent.propDecorators = {
        'options': [{ type: _angular_core.Input },],
        'provider': [{ type: _angular_core.Input },],
        'index': [{ type: _angular_core.Input },],
        'show': [{ type: _angular_core.Input },],
        'alpha': [{ type: _angular_core.Input },],
        'brightness': [{ type: _angular_core.Input },],
        'contrast': [{ type: _angular_core.Input },],
    };
    return AcMapLayerProviderComponent;
}());

var __extends$37 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcPointDescComponent = (function (_super) {
    __extends$37(AcPointDescComponent, _super);
    function AcPointDescComponent(pointDrawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, pointDrawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcPointDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-point-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcPointDescComponent; }) }],
                },] },
    ];
    AcPointDescComponent.ctorParameters = function () { return [
        { type: PointDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcPointDescComponent;
}(BasicDesc));

var __extends$38 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcLabelComponent = (function (_super) {
    __extends$38(AcLabelComponent, _super);
    function AcLabelComponent(labelDrawer, mapLayers) {
        return _super.call(this, labelDrawer, mapLayers) || this;
    }
    AcLabelComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-label',
                    template: '',
                },] },
    ];
    AcLabelComponent.ctorParameters = function () { return [
        { type: LabelDrawerService, },
        { type: MapLayersService, },
    ]; };
    return AcLabelComponent;
}(EntityOnMapComponent));

var __extends$39 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcPolylineComponent = (function (_super) {
    __extends$39(AcPolylineComponent, _super);
    function AcPolylineComponent(polylineDrawer, mapLayers) {
        return _super.call(this, polylineDrawer, mapLayers) || this;
    }
    AcPolylineComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-polyline',
                    template: '',
                },] },
    ];
    AcPolylineComponent.ctorParameters = function () { return [
        { type: PolylineDrawerService, },
        { type: MapLayersService, },
    ]; };
    return AcPolylineComponent;
}(EntityOnMapComponent));

var __extends$40 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcEllipseComponent = (function (_super) {
    __extends$40(AcEllipseComponent, _super);
    function AcEllipseComponent(ellipseDrawer, mapLayers) {
        return _super.call(this, ellipseDrawer, mapLayers) || this;
    }
    AcEllipseComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-ellipse',
                    template: '',
                },] },
    ];
    AcEllipseComponent.ctorParameters = function () { return [
        { type: EllipseDrawerService, },
        { type: MapLayersService, },
    ]; };
    return AcEllipseComponent;
}(EntityOnMapComponent));

var __extends$41 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcPointComponent = (function (_super) {
    __extends$41(AcPointComponent, _super);
    function AcPointComponent(pointDrawer, mapLayers) {
        return _super.call(this, pointDrawer, mapLayers) || this;
    }
    AcPointComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-point',
                    template: '',
                },] },
    ];
    AcPointComponent.ctorParameters = function () { return [
        { type: PointDrawerService, },
        { type: MapLayersService, },
    ]; };
    return AcPointComponent;
}(EntityOnMapComponent));

var AcHtmlComponent = (function () {
    function AcHtmlComponent(cesiumService, elementRef, renderer) {
        this.cesiumService = cesiumService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.isDraw = false;
    }
    AcHtmlComponent.prototype.setScreenPosition = function (screenPosition) {
        if (screenPosition) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'top', screenPosition.y + "px");
            this.renderer.setStyle(this.elementRef.nativeElement, 'left', screenPosition.x + "px");
        }
    };
    AcHtmlComponent.prototype.remove = function () {
        if (this.isDraw) {
            this.isDraw = false;
            this.cesiumService.getScene().preRender.removeEventListener(this.preRenderEventListener);
            this.renderer.setStyle(this.elementRef.nativeElement, 'display', "none");
        }
    };
    AcHtmlComponent.prototype.add = function () {
        var _this = this;
        if (!this.isDraw) {
            this.isDraw = true;
            this.preRenderEventListener = function () {
                var screenPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(_this.cesiumService.getScene(), _this.props.position);
                _this.setScreenPosition(screenPosition);
            };
            this.renderer.setStyle(this.elementRef.nativeElement, 'display', "block");
            this.cesiumService.getScene().preRender.addEventListener(this.preRenderEventListener);
        }
    };
    AcHtmlComponent.prototype.ngDoCheck = function () {
        if (this.props.show === undefined || this.props.show) {
            this.add();
        }
        else {
            this.remove();
        }
    };
    AcHtmlComponent.prototype.ngOnDestroy = function () {
        this.remove();
    };
    AcHtmlComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-html',
                    template: "<ng-content></ng-content>",
                    styles: [":host {\n                position: absolute;\n                z-index: 100;\n\t\t\t\t}"]
                },] },
    ];
    AcHtmlComponent.ctorParameters = function () { return [
        { type: CesiumService, },
        { type: _angular_core.ElementRef, },
        { type: _angular_core.Renderer2, },
    ]; };
    AcHtmlComponent.propDecorators = {
        'props': [{ type: _angular_core.Input },],
    };
    return AcHtmlComponent;
}());

var __extends$42 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcCircleComponent = (function (_super) {
    __extends$42(AcCircleComponent, _super);
    function AcCircleComponent(ellipseDrawerService, mapLayers) {
        return _super.call(this, ellipseDrawerService, mapLayers) || this;
    }
    AcCircleComponent.prototype.updateEllipseProps = function () {
        this.props.semiMajorAxis = this.props.radius;
        this.props.semiMinorAxis = this.props.radius;
        this.props.rotation = 0.0;
    };
    AcCircleComponent.prototype.drawOnMap = function () {
        this.updateEllipseProps();
        _super.prototype.drawOnMap.call(this);
    };
    AcCircleComponent.prototype.updateOnMap = function () {
        this.updateEllipseProps();
        _super.prototype.updateOnMap.call(this);
    };
    AcCircleComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-circle',
                    template: '',
                },] },
    ];
    AcCircleComponent.ctorParameters = function () { return [
        { type: EllipseDrawerService, },
        { type: MapLayersService, },
    ]; };
    return AcCircleComponent;
}(EntityOnMapComponent));

var __extends$43 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcArcComponent = (function (_super) {
    __extends$43(AcArcComponent, _super);
    function AcArcComponent(arcDrawer, mapLayers) {
        return _super.call(this, arcDrawer, mapLayers) || this;
    }
    AcArcComponent.prototype.updateOnMap = function () {
        if (this.selfPrimitiveIsDraw) {
            this.removeFromMap();
            this.drawOnMap();
        }
    };
    AcArcComponent.prototype.drawOnMap = function () {
        this.selfPrimitiveIsDraw = true;
        return this.selfPrimitive = this._drawer.add(this.geometryProps, this.instanceProps, this.primitiveProps);
    };
    AcArcComponent.prototype.ngOnChanges = function (changes) {
        var geometryProps = changes['geometryProps'];
        var instanceProps = changes['instanceProps'];
        var primitiveProps = changes['primitiveProps'];
        if (geometryProps.currentValue !== geometryProps.previousValue ||
            instanceProps.currentValue !== instanceProps.previousValue ||
            primitiveProps.currentValue !== primitiveProps.previousValue) {
            this.updateOnMap();
        }
    };
    AcArcComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-arc',
                    template: '',
                },] },
    ];
    AcArcComponent.ctorParameters = function () { return [
        { type: ArcDrawerService, },
        { type: MapLayersService, },
    ]; };
    AcArcComponent.propDecorators = {
        'geometryProps': [{ type: _angular_core.Input },],
        'instanceProps': [{ type: _angular_core.Input },],
        'primitiveProps': [{ type: _angular_core.Input },],
    };
    return AcArcComponent;
}(EntityOnMapComponent));

var __extends$44 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcPolygonDescComponent = (function (_super) {
    __extends$44(AcPolygonDescComponent, _super);
    function AcPolygonDescComponent(polygonDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, polygonDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcPolygonDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-polygon-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcPolygonDescComponent; }) }],
                },] },
    ];
    AcPolygonDescComponent.ctorParameters = function () { return [
        { type: PolygonDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcPolygonDescComponent;
}(BasicDesc));

var AcDefaultPlonterComponent = (function () {
    function AcDefaultPlonterComponent(plonterService, cd, geoConverter) {
        this.plonterService = plonterService;
        this.cd = cd;
        this.geoConverter = geoConverter;
    }
    AcDefaultPlonterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.plonterService.plonterChangeNotifier.subscribe(function () { return _this.cd.detectChanges(); });
    };
    Object.defineProperty(AcDefaultPlonterComponent.prototype, "plonterPosition", {
        get: function () {
            if (this.plonterService.plonterShown) {
                var screenPos = this.plonterService.plonterClickPosition.endPosition;
                return this.geoConverter.screenToCartesian3(screenPos, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    AcDefaultPlonterComponent.prototype.chooseEntity = function (entity) {
        this.plonterService.resolvePlonter(entity);
    };
    AcDefaultPlonterComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-default-plonter',
                    template: "\n        <ac-html *ngIf=\"plonterService.plonterShown\" [props]=\"{\n        position: plonterPosition\n      }\">\n            <div class=\"plonter-context-menu\">\n                <div *ngFor=\"let entity of plonterService.entitesToPlonter\">\n                    <div class=\"plonter-item\" (click)=\"chooseEntity(entity)\">{{ entity?.name || entity?.id }}\n                    </div>\n                </div>\n            </div>\n        </ac-html>\n    ",
                    styles: ["\n        .plonter-context-menu {\n            background-color: rgba(250, 250, 250, 0.8);\n            box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);\n        }\n\n        .plonter-item {\n            cursor: pointer;\n            padding: 2px 15px;\n            text-align: start;\n        }\n\n        .plonter-item:hover {\n            background-color: rgba(0, 0, 0, 0.15);\n        }\n    \n    "],
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                    providers: [CoordinateConverter],
                },] },
    ];
    AcDefaultPlonterComponent.ctorParameters = function () { return [
        { type: PlonterService, },
        { type: _angular_core.ChangeDetectorRef, },
        { type: CoordinateConverter, },
    ]; };
    return AcDefaultPlonterComponent;
}());

var __extends$45 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcPolygonComponent = (function (_super) {
    __extends$45(AcPolygonComponent, _super);
    function AcPolygonComponent(polygonDrawer, mapLayers) {
        return _super.call(this, polygonDrawer, mapLayers) || this;
    }
    AcPolygonComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-polygon',
                    template: '',
                },] },
    ];
    AcPolygonComponent.ctorParameters = function () { return [
        { type: PolygonDrawerService, },
        { type: MapLayersService, },
    ]; };
    return AcPolygonComponent;
}(EntityOnMapComponent));

var __extends$47 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BasicStaticPrimitiveDesc = (function (_super) {
    __extends$47(BasicStaticPrimitiveDesc, _super);
    function BasicStaticPrimitiveDesc(_staticPrimitiveDrawer, layerService, computationCache, cesiumProperties) {
        var _this = _super.call(this, _staticPrimitiveDrawer, layerService, computationCache, cesiumProperties) || this;
        _this._staticPrimitiveDrawer = _staticPrimitiveDrawer;
        return _this;
    }
    BasicStaticPrimitiveDesc.prototype.ngOnInit = function () {
        this._layerService.registerDescription(this);
        this._geometryPropsEvaluator = this._cesiumProperties.createEvaluator(this.geometryProps);
        this._instancePropsEvaluator = this._cesiumProperties.createEvaluator(this.instanceProps);
        this._primitivePropsEvaluator = this._cesiumProperties.createEvaluator(this.primitiveProps);
    };
    BasicStaticPrimitiveDesc.prototype.draw = function (context, id, entity) {
        var geometryProps = this._geometryPropsEvaluator(this._computationCache, context);
        var instanceProps = this._instancePropsEvaluator(this._computationCache, context);
        var primitiveProps = this._primitivePropsEvaluator(this._computationCache, context);
        if (!this._cesiumObjectsMap.has(id)) {
            var primitive = this._staticPrimitiveDrawer.add(geometryProps, instanceProps, primitiveProps);
            primitive.acEntity = entity;
            this._cesiumObjectsMap.set(id, primitive);
        }
        else {
            var primitive = this._cesiumObjectsMap.get(id);
            this._staticPrimitiveDrawer.update(primitive, geometryProps, instanceProps, primitiveProps);
        }
    };
    BasicStaticPrimitiveDesc.propDecorators = {
        'geometryProps': [{ type: _angular_core.Input },],
        'instanceProps': [{ type: _angular_core.Input },],
        'primitiveProps': [{ type: _angular_core.Input },],
    };
    return BasicStaticPrimitiveDesc;
}(BasicDesc));

var __extends$46 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcStaticEllipseDescComponent = (function (_super) {
    __extends$46(AcStaticEllipseDescComponent, _super);
    function AcStaticEllipseDescComponent(ellipseDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, ellipseDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcStaticEllipseDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-static-ellipse-desc',
                    template: ''
                },] },
    ];
    AcStaticEllipseDescComponent.ctorParameters = function () { return [
        { type: StaticEllipseDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcStaticEllipseDescComponent;
}(BasicStaticPrimitiveDesc));

var __extends$48 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcDynamicEllipseDescComponent = (function (_super) {
    __extends$48(AcDynamicEllipseDescComponent, _super);
    function AcDynamicEllipseDescComponent(ellipseDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, ellipseDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcDynamicEllipseDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-dynamic-ellipse-desc',
                    template: '',
                },] },
    ];
    AcDynamicEllipseDescComponent.ctorParameters = function () { return [
        { type: DynamicEllipseDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcDynamicEllipseDescComponent;
}(BasicDesc));

var __extends$49 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcDynamicPolylineDescComponent = (function (_super) {
    __extends$49(AcDynamicPolylineDescComponent, _super);
    function AcDynamicPolylineDescComponent(dynamicPolylineDrawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, dynamicPolylineDrawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcDynamicPolylineDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-dynamic-polyline-desc',
                    template: ''
                },] },
    ];
    AcDynamicPolylineDescComponent.ctorParameters = function () { return [
        { type: DynamicPolylineDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcDynamicPolylineDescComponent;
}(BasicDesc));

var __extends$50 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcStaticPolygonDescComponent = (function (_super) {
    __extends$50(AcStaticPolygonDescComponent, _super);
    function AcStaticPolygonDescComponent(polygonDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, polygonDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcStaticPolygonDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-static-polygon-desc',
                    template: '',
                },] },
    ];
    AcStaticPolygonDescComponent.ctorParameters = function () { return [
        { type: StaticPolygonDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcStaticPolygonDescComponent;
}(BasicStaticPrimitiveDesc));

var __extends$51 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcStaticCircleDescComponent = (function (_super) {
    __extends$51(AcStaticCircleDescComponent, _super);
    function AcStaticCircleDescComponent(staticCircleDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, staticCircleDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcStaticCircleDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-static-circle',
                    template: ''
                },] },
    ];
    AcStaticCircleDescComponent.ctorParameters = function () { return [
        { type: StaticCircleDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcStaticCircleDescComponent;
}(BasicStaticPrimitiveDesc));

var __extends$52 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcDynamicCircleDescComponent = (function (_super) {
    __extends$52(AcDynamicCircleDescComponent, _super);
    function AcDynamicCircleDescComponent(ellipseDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, ellipseDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcDynamicCircleDescComponent.prototype._propsEvaluator = function (context) {
        var cesiumProps = _super.prototype._propsEvaluator.call(this, context);
        cesiumProps.semiMajorAxis = cesiumProps.radius;
        cesiumProps.semiMinorAxis = cesiumProps.radius;
        return cesiumProps;
    };
    AcDynamicCircleDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-dynamic-circle-desc',
                    template: ''
                },] },
    ];
    AcDynamicCircleDescComponent.ctorParameters = function () { return [
        { type: DynamicEllipseDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcDynamicCircleDescComponent;
}(BasicDesc));

var __extends$53 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcStaticPolylineDescComponent = (function (_super) {
    __extends$53(AcStaticPolylineDescComponent, _super);
    function AcStaticPolylineDescComponent(polylineDrawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, polylineDrawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcStaticPolylineDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-static-polyline-desc',
                    template: ''
                },] },
    ];
    AcStaticPolylineDescComponent.ctorParameters = function () { return [
        { type: StaticPolylineDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcStaticPolylineDescComponent;
}(BasicStaticPrimitiveDesc));

var __extends$54 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcModelDescComponent = (function (_super) {
    __extends$54(AcModelDescComponent, _super);
    function AcModelDescComponent(modelDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, modelDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcModelDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-model-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcModelDescComponent; }) }],
                },] },
    ];
    AcModelDescComponent.ctorParameters = function () { return [
        { type: ModelDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcModelDescComponent;
}(BasicDesc));

var AcTileset3dComponent = (function () {
    function AcTileset3dComponent(cesiumService) {
        this.cesiumService = cesiumService;
        this.options = {};
        this.show = true;
        this.tilesetInstance = null;
    }
    AcTileset3dComponent.prototype.ngOnInit = function () {
        if (!Checker.present(this.options.url)) {
            throw new Error('Options must have a url');
        }
        this._3dtilesCollection = new Cesium.PrimitiveCollection();
        this.cesiumService.getScene().primitives.add(this._3dtilesCollection);
        if (this.show) {
            this.tilesetInstance = this._3dtilesCollection.add(new Cesium.Cesium3DTileset(this.options), this.index);
            if (this.style) {
                this.tilesetInstance.style = new Cesium.Cesium3DTileStyle(this.style);
            }
        }
    };
    AcTileset3dComponent.prototype.ngOnChanges = function (changes) {
        if (changes['show'] && !changes['show'].isFirstChange()) {
            var showValue = changes['show'].currentValue;
            if (showValue) {
                if (this.tilesetInstance) {
                    this._3dtilesCollection.add(this.tilesetInstance, this.index);
                }
                else {
                    this.tilesetInstance = this._3dtilesCollection.add(new Cesium.Cesium3DTileset(this.options), this.index);
                    if (this.style) {
                        this.tilesetInstance.style = new Cesium.Cesium3DTileStyle(this.style);
                    }
                }
            }
            else if (this.tilesetInstance) {
                this._3dtilesCollection.remove(this.tilesetInstance, false);
            }
        }
        if (changes['style'] && !changes['style'].isFirstChange()) {
            var styleValue = changes['style'].currentValue;
            if (this.tilesetInstance) {
                this.tilesetInstance.style = new Cesium.Cesium3DTileStyle(this.style);
            }
        }
    };
    AcTileset3dComponent.prototype.ngOnDestroy = function () {
        if (this.tilesetInstance) {
            this._3dtilesCollection.remove(this.tilesetInstance, false);
        }
    };
    AcTileset3dComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-3d-tile-layer',
                    template: '',
                },] },
    ];
    AcTileset3dComponent.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    AcTileset3dComponent.propDecorators = {
        'options': [{ type: _angular_core.Input },],
        'index': [{ type: _angular_core.Input },],
        'show': [{ type: _angular_core.Input },],
        'style': [{ type: _angular_core.Input },],
    };
    return AcTileset3dComponent;
}());

var __extends$55 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcBoxDescComponent = (function (_super) {
    __extends$55(AcBoxDescComponent, _super);
    function AcBoxDescComponent(drawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, drawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcBoxDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-box-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcBoxDescComponent; }) }],
                },] },
    ];
    AcBoxDescComponent.ctorParameters = function () { return [
        { type: BoxDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcBoxDescComponent;
}(BasicDesc));

var __extends$56 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcCylinderDescComponent = (function (_super) {
    __extends$56(AcCylinderDescComponent, _super);
    function AcCylinderDescComponent(drawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, drawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcCylinderDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-cylinder-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcCylinderDescComponent; }) }],
                },] },
    ];
    AcCylinderDescComponent.ctorParameters = function () { return [
        { type: CylinderDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcCylinderDescComponent;
}(BasicDesc));

var __extends$57 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcCorridorDescComponent = (function (_super) {
    __extends$57(AcCorridorDescComponent, _super);
    function AcCorridorDescComponent(drawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, drawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcCorridorDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-corridor-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcCorridorDescComponent; }) }],
                },] },
    ];
    AcCorridorDescComponent.ctorParameters = function () { return [
        { type: CorridorDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcCorridorDescComponent;
}(BasicDesc));

var __extends$58 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcEllipsoidDescComponent = (function (_super) {
    __extends$58(AcEllipsoidDescComponent, _super);
    function AcEllipsoidDescComponent(drawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, drawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcEllipsoidDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-ellipsoid-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcEllipsoidDescComponent; }) }],
                },] },
    ];
    AcEllipsoidDescComponent.ctorParameters = function () { return [
        { type: EllipsoidDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcEllipsoidDescComponent;
}(BasicDesc));

var __extends$59 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcPolylineVolumeDescComponent = (function (_super) {
    __extends$59(AcPolylineVolumeDescComponent, _super);
    function AcPolylineVolumeDescComponent(drawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, drawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcPolylineVolumeDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-polyline-volume-desc',
                    template: ''
                },] },
    ];
    AcPolylineVolumeDescComponent.ctorParameters = function () { return [
        { type: PolylineVolumeDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcPolylineVolumeDescComponent;
}(BasicDesc));

var __extends$60 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcWallDescComponent = (function (_super) {
    __extends$60(AcWallDescComponent, _super);
    function AcWallDescComponent(drawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, drawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcWallDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-wall-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcWallDescComponent; }) }],
                },] },
    ];
    AcWallDescComponent.ctorParameters = function () { return [
        { type: WallDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcWallDescComponent;
}(BasicDesc));

var __extends$61 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcRectangleDescComponent = (function (_super) {
    __extends$61(AcRectangleDescComponent, _super);
    function AcRectangleDescComponent(drawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, drawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcRectangleDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-rectangle-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcRectangleDescComponent; }) }],
                },] },
    ];
    AcRectangleDescComponent.ctorParameters = function () { return [
        { type: RectangleDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcRectangleDescComponent;
}(BasicDesc));

var __extends$62 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcBillboardPrimitiveDescComponent = (function (_super) {
    __extends$62(AcBillboardPrimitiveDescComponent, _super);
    function AcBillboardPrimitiveDescComponent(billboardPrimitiveDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, billboardPrimitiveDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcBillboardPrimitiveDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-billboard-primitive-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcBillboardPrimitiveDescComponent; }) }],
                },] },
    ];
    AcBillboardPrimitiveDescComponent.ctorParameters = function () { return [
        { type: BillboardPrimitiveDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcBillboardPrimitiveDescComponent;
}(BasicDesc));

var __extends$63 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcLabelPrimitiveDescComponent = (function (_super) {
    __extends$63(AcLabelPrimitiveDescComponent, _super);
    function AcLabelPrimitiveDescComponent(labelPrimitiveDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, labelPrimitiveDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcLabelPrimitiveDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-label-primitive-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcLabelPrimitiveDescComponent; }) }],
                },] },
    ];
    AcLabelPrimitiveDescComponent.ctorParameters = function () { return [
        { type: LabelPrimitiveDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcLabelPrimitiveDescComponent;
}(BasicDesc));

var __extends$64 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcPolylinePrimitiveDescComponent = (function (_super) {
    __extends$64(AcPolylinePrimitiveDescComponent, _super);
    function AcPolylinePrimitiveDescComponent(polylinePrimitiveDrawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, polylinePrimitiveDrawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcPolylinePrimitiveDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-polyline-primitive-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: _angular_core.forwardRef(function () { return AcPolylinePrimitiveDescComponent; }) }],
                },] },
    ];
    AcPolylinePrimitiveDescComponent.ctorParameters = function () { return [
        { type: PolylinePrimitiveDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcPolylinePrimitiveDescComponent;
}(BasicDesc));

var HtmlPrimitive = (function () {
    function HtmlPrimitive(options, collection) {
        if (collection === void 0) { collection = null; }
        if (typeof options !== 'object') {
            throw new Error('HtmlPrimitive ERROR: invalid html options!');
        }
        this.scene = options.scene;
        this.show = options.show || true;
        this.position = options.position;
        this.pixelOffset = options.pixelOffset;
        this.element = options.element;
        this.collection = collection;
    }
    Object.defineProperty(HtmlPrimitive.prototype, "scene", {
        set: function (scene) {
            this._scene = scene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlPrimitive.prototype, "show", {
        get: function () {
            return this._show;
        },
        set: function (show) {
            this._show = show;
            if (Cesium.defined(this.element)) {
                if (show) {
                    this._element.style.display = 'block';
                }
                else {
                    this._element.style.display = 'none';
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlPrimitive.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (position) {
            this._position = position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlPrimitive.prototype, "pixelOffset", {
        get: function () {
            return this._pixelOffset;
        },
        set: function (pixelOffset) {
            this._pixelOffset = pixelOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlPrimitive.prototype, "element", {
        get: function () {
            return this._element;
        },
        set: function (element) {
            this._element = element;
            if (Cesium.defined(element)) {
                this._element.style.position = 'absolute';
                this._element.style.zIndex = Number.MAX_VALUE.toString();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlPrimitive.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        set: function (collection) {
            this._collection = collection;
        },
        enumerable: true,
        configurable: true
    });
    HtmlPrimitive.prototype.update = function () {
        if (!Cesium.defined(this._show) || !Cesium.defined(this._element)) {
            return;
        }
        var screenPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this._scene, this._position);
        if (!Cesium.defined(screenPosition)) {
            screenPosition = new Cesium.Cartesian2((-1000), (-1000));
        }
        else if (Cesium.defined(this._pixelOffset) && Cesium.defined(this._pixelOffset.x) && Cesium.defined(this._pixelOffset.y)) {
            screenPosition.y += this._pixelOffset.y;
            screenPosition.x += this._pixelOffset.x;
        }
        if (this._lastPosition && this._lastPosition.equals(screenPosition)) {
            return;
        }
        this._element.style.top = screenPosition.y + "px";
        this._element.style.left = screenPosition.x + "px";
        this._lastPosition = screenPosition;
    };
    return HtmlPrimitive;
}());

var HtmlCollection = (function () {
    function HtmlCollection() {
        this._collection = [];
    }
    Object.defineProperty(HtmlCollection.prototype, "length", {
        get: function () {
            return this._collection.length;
        },
        enumerable: true,
        configurable: true
    });
    HtmlCollection.prototype.get = function (index) {
        return this._collection[index];
    };
    HtmlCollection.prototype.add = function (options) {
        var html = new HtmlPrimitive(options, this);
        this._collection.push(html);
        return html;
    };
    HtmlCollection.prototype.remove = function (html) {
        var index = this._collection.indexOf(html);
        if (index === (-1)) {
            return false;
        }
        this._collection.splice(index, 1);
        return true;
    };
    HtmlCollection.prototype.update = function () {
        for (var i = 0, len = this._collection.length; i < len; i++) {
            this._collection[i].update();
        }
    };
    HtmlCollection.prototype.removeAll = function () {
        while (this._collection.length > 0) {
            this._collection.pop();
        }
    };
    HtmlCollection.prototype.contains = function (html) {
        return Cesium.defined(html) && html.collection === this;
    };
    return HtmlCollection;
}());

var CesiumExtender = (function () {
    function CesiumExtender() {
    }
    CesiumExtender.extend = function () {
        Cesium.HtmlPrimitive = HtmlPrimitive;
        Cesium.HtmlCollection = HtmlCollection;
    };
    return CesiumExtender;
}());

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
        { type: _angular_core.Injectable },
    ];
    AcHtmlManager.ctorParameters = function () { return []; };
    return AcHtmlManager;
}());

var AcHtmlContext = (function () {
    function AcHtmlContext(id, context) {
        this.id = id;
        this.context = context;
    }
    return AcHtmlContext;
}());
var AcHtmlDirective = (function () {
    function AcHtmlDirective(_templateRef, _viewContainerRef, _changeDetector, _layerService, _acHtmlManager) {
        this._templateRef = _templateRef;
        this._viewContainerRef = _viewContainerRef;
        this._changeDetector = _changeDetector;
        this._layerService = _layerService;
        this._acHtmlManager = _acHtmlManager;
        this._views = new Map();
    }
    AcHtmlDirective.prototype.ngOnInit = function () {
    };
    AcHtmlDirective.prototype._handleView = function (id, primitive, entity) {
        if (!this._views.has(id) && primitive.show) {
            var context = new AcHtmlContext(id, { $implicit: entity });
            var viewRef = this._viewContainerRef.createEmbeddedView(this._templateRef, context);
            this._views.set(id, { viewRef: viewRef, context: context });
            this._changeDetector.detectChanges();
        }
        else if (this._views.has(id) && !primitive.show) {
            this.remove(id, primitive);
        }
        else if (this._views.has(id) && primitive.show) {
            this._changeDetector.detectChanges();
        }
    };
    AcHtmlDirective.prototype.addOrUpdate = function (id, primitive) {
        var context = this._layerService.context;
        var entity = context[this._layerService.getEntityName()];
        if (this._views.has(id)) {
            this._views.get(id).context.context.$implicit = entity;
        }
        this._acHtmlManager.addOrUpdate(id, { entity: entity, primitive: primitive });
        this._handleView(id, primitive, entity);
    };
    AcHtmlDirective.prototype.remove = function (id, primitive) {
        if (!this._views.has(id)) {
            return;
        }
        var viewRef = this._views.get(id).viewRef;
        this._viewContainerRef.remove(this._viewContainerRef.indexOf(viewRef));
        this._views.delete(id);
        this._acHtmlManager.remove(id);
        primitive.element = null;
    };
    AcHtmlDirective.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[acHtml]',
                },] },
    ];
    AcHtmlDirective.ctorParameters = function () { return [
        { type: _angular_core.TemplateRef, },
        { type: _angular_core.ViewContainerRef, },
        { type: _angular_core.ChangeDetectorRef, },
        { type: LayerService, },
        { type: AcHtmlManager, },
    ]; };
    return AcHtmlDirective;
}());

var __extends$65 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcHtmlDescComponent = (function (_super) {
    __extends$65(AcHtmlDescComponent, _super);
    function AcHtmlDescComponent(htmlDrawer, layerService, computationCache, cesiumProperties) {
        return _super.call(this, htmlDrawer, layerService, computationCache, cesiumProperties) || this;
    }
    AcHtmlDescComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (!this.acHtmlCreator) {
            throw new Error("AcHtml desc ERROR: ac html directive not found.");
        }
        if (!this.acHtmlTemplate) {
            throw new Error("AcHtml desc ERROR: html template not found.");
        }
    };
    AcHtmlDescComponent.prototype.draw = function (context, id) {
        var cesiumProps = this._propsEvaluator(context);
        if (!this._cesiumObjectsMap.has(id)) {
            var primitive = this._drawer.add(cesiumProps);
            this._cesiumObjectsMap.set(id, primitive);
            this.acHtmlCreator.addOrUpdate(id, primitive);
        }
        else {
            var primitive = this._cesiumObjectsMap.get(id);
            this._drawer.update(primitive, cesiumProps);
            this.acHtmlCreator.addOrUpdate(id, primitive);
        }
    };
    AcHtmlDescComponent.prototype.remove = function (id) {
        var primitive = this._cesiumObjectsMap.get(id);
        this._drawer.remove(primitive);
        this._cesiumObjectsMap.delete(id);
        this.acHtmlCreator.remove(id, primitive);
    };
    AcHtmlDescComponent.prototype.removeAll = function () {
        var _this = this;
        this._cesiumObjectsMap.forEach((function (primitive, id) {
            _this.acHtmlCreator.remove(id, primitive);
        }));
        this._cesiumObjectsMap.clear();
        this._drawer.removeAll();
    };
    AcHtmlDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-html-desc',
                    providers: [AcHtmlManager],
                    template: "\n      <div *acHtml=\"let acHtmlEntityId = id; let acHtmlContext = context\">\n          <div [acHtmlContainer]=\"acHtmlEntityId\">\n              <ng-template [ngTemplateOutlet]=\"acHtmlTemplate\"\n                           [ngTemplateOutletContext]=\"acHtmlContext\"></ng-template>\n          </div>\n      </div>"
                },] },
    ];
    AcHtmlDescComponent.ctorParameters = function () { return [
        { type: HtmlDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    AcHtmlDescComponent.propDecorators = {
        'acHtmlCreator': [{ type: _angular_core.ViewChild, args: [AcHtmlDirective,] },],
        'acHtmlTemplate': [{ type: _angular_core.ContentChild, args: [_angular_core.TemplateRef,] },],
    };
    return AcHtmlDescComponent;
}(BasicDesc));

var AcHtmlContainerDirective = (function () {
    function AcHtmlContainerDirective(_element, _acHtmlManager) {
        this._element = _element;
        this._acHtmlManager = _acHtmlManager;
    }
    Object.defineProperty(AcHtmlContainerDirective.prototype, "acHtmlContainer", {
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    AcHtmlContainerDirective.prototype.ngOnInit = function () {
        if (this._id === undefined) {
            throw new Error("AcHtml container ERROR: entity id not defined");
        }
        var entity = this._acHtmlManager.get(this._id);
        entity.primitive.element = this._element.nativeElement;
    };
    AcHtmlContainerDirective.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[acHtmlContainer]'
                },] },
    ];
    AcHtmlContainerDirective.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: AcHtmlManager, },
    ]; };
    AcHtmlContainerDirective.propDecorators = {
        'acHtmlContainer': [{ type: _angular_core.Input },],
    };
    return AcHtmlContainerDirective;
}());

var AcContextMenuWrapperComponent = (function () {
    function AcContextMenuWrapperComponent(contextMenuService, cd, componentFactoryResolver) {
        this.contextMenuService = contextMenuService;
        this.cd = cd;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    AcContextMenuWrapperComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contextMenuChangeSubscription =
            this.contextMenuService.contextMenuChangeNotifier.subscribe(function () { return _this.cd.detectChanges(); });
        this.contextMenuOpenSubscription =
            this.contextMenuService.onOpen.subscribe(function () {
                var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(_this.contextMenuService.content);
                _this.viewContainerRef.clear();
                var componentRef = _this.viewContainerRef.createComponent(componentFactory);
                componentRef.instance.data = _this.contextMenuService.options.data;
                _this.cd.detectChanges();
            });
    };
    AcContextMenuWrapperComponent.prototype.ngOnDestroy = function () {
        if (this.contextMenuChangeSubscription) {
            this.contextMenuChangeSubscription.unsubscribe();
        }
        if (this.contextMenuOpenSubscription) {
            this.contextMenuOpenSubscription.unsubscribe();
        }
    };
    AcContextMenuWrapperComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-context-menu-wrapper',
                    template: "\n      <ac-html *ngIf=\"contextMenuService.showContextMenu\" [props]=\"{position: contextMenuService.position}\">\n          <div #contextMenuContainer></div>\n      </ac-html>\n  ",
                    styles: [],
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    AcContextMenuWrapperComponent.ctorParameters = function () { return [
        { type: ContextMenuService, },
        { type: _angular_core.ChangeDetectorRef, },
        { type: _angular_core.ComponentFactoryResolver, },
    ]; };
    AcContextMenuWrapperComponent.propDecorators = {
        'viewContainerRef': [{ type: _angular_core.ViewChild, args: ['contextMenuContainer', { read: _angular_core.ViewContainerRef },] },],
    };
    return AcContextMenuWrapperComponent;
}());

var AcArrayDescComponent = (function () {
    function AcArrayDescComponent(layerService, cd) {
        this.layerService = layerService;
        this.cd = cd;
        this.show = true;
        this.entitiesMap = new Map();
        this.id = 0;
        this.acForRgx = /^let\s+.+\s+of\s+.+$/;
        this.arrayObservable$ = new rxjs_Subject.Subject();
    }
    AcArrayDescComponent.prototype.ngOnChanges = function (changes) {
        if (changes['acFor'].firstChange) {
            var acForString = changes['acFor'].currentValue;
            if (!this.acForRgx.test(acForString)) {
                throw new Error("ac-layer: Invalid [acFor] syntax. Expected: [acFor]=\"let item of observable\" .Instead received: " + acForString);
            }
            var acForArr = changes['acFor'].currentValue.split(' ');
            this.arrayPath = acForArr[3];
            this.entityName = acForArr[1];
        }
    };
    AcArrayDescComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layer.getLayerService().cache = false;
        this.layerServiceSubscription = this.layerService.layerUpdates().subscribe(function () {
            _this.cd.detectChanges();
        });
    };
    AcArrayDescComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.layerService.context['arrayObservable$'] = this.arrayObservable$;
        this.layerService.registerDescription(this);
        this.basicDescs._results.forEach(function (component) {
            component.setLayerService(_this.layer.getLayerService());
        });
        this.arrayDescs._results.splice(0, 1);
        this.arrayDescs._results.forEach(function (component) {
            _this.layerService.unregisterDescription(component);
            _this.layer.getLayerService().registerDescription(component);
            component.layerService = _this.layer.getLayerService();
            component.setLayerService(_this.layer.getLayerService());
        });
    };
    AcArrayDescComponent.prototype.ngOnDestroy = function () {
        if (this.layerServiceSubscription) {
            this.layerServiceSubscription.unsubscribe();
        }
    };
    AcArrayDescComponent.prototype.setLayerService = function (layerService) {
        this.layerService = layerService;
    };
    AcArrayDescComponent.prototype.draw = function (context, id, contextEntity) {
        var _this = this;
        var get = _get;
        var entitiesArray = get(context, this.arrayPath);
        if (!entitiesArray) {
            return;
        }
        var previousEntitiesIdArray = this.entitiesMap.get(id);
        var entitiesIdArray = [];
        this.entitiesMap.set(id, entitiesIdArray);
        entitiesArray.forEach(function (item, index) {
            _this.layerService.context[_this.entityName] = item;
            var arrayItemId = _this.generateCombinedId(id, item, index);
            entitiesIdArray.push(arrayItemId);
            _this.layer.update(contextEntity, arrayItemId);
        });
        if (previousEntitiesIdArray) {
            var entitiesToRemove = this.idGetter ?
                previousEntitiesIdArray.filter(function (entityId) { return entitiesIdArray.indexOf(entityId) < 0; }) :
                previousEntitiesIdArray;
            if (entitiesToRemove) {
                entitiesToRemove.forEach(function (entityId) { return _this.layer.remove(entityId); });
            }
        }
    };
    AcArrayDescComponent.prototype.remove = function (id) {
        var _this = this;
        var entitiesIdArray = this.entitiesMap.get(id);
        if (entitiesIdArray) {
            entitiesIdArray.forEach(function (entityId) { return _this.layer.remove(entityId); });
        }
        this.entitiesMap.delete(id);
    };
    AcArrayDescComponent.prototype.removeAll = function () {
        this.layer.removeAll();
        this.entitiesMap.clear();
    };
    AcArrayDescComponent.prototype.getAcForString = function () {
        return "let " + (this.entityName + '___temp') + " of arrayObservable$";
    };
    AcArrayDescComponent.prototype.generateCombinedId = function (entityId, arrayItem, index) {
        var arrayItemId;
        if (this.idGetter) {
            arrayItemId = this.idGetter(arrayItem, index);
        }
        else {
            arrayItemId = (this.id++) % Number.MAX_SAFE_INTEGER;
        }
        return entityId + arrayItemId;
    };
    AcArrayDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-array-desc',
                    template: "\n      <ac-layer #layer [acFor]=\"getAcForString()\"\n                [context]=\"layerService.context\"\n                [options]=\"layerService.options\"\n                [show]=\"layerService.show && show\"\n                [zIndex]=\"layerService.zIndex\">\n          <ng-content #content></ng-content>\n      </ac-layer>\n  ",
                },] },
    ];
    AcArrayDescComponent.ctorParameters = function () { return [
        { type: LayerService, },
        { type: _angular_core.ChangeDetectorRef, },
    ]; };
    AcArrayDescComponent.propDecorators = {
        'acFor': [{ type: _angular_core.Input },],
        'idGetter': [{ type: _angular_core.Input },],
        'show': [{ type: _angular_core.Input },],
        'layer': [{ type: _angular_core.ViewChild, args: ['layer',] },],
        'basicDescs': [{ type: _angular_core.ContentChildren, args: [BasicDesc, { descendants: false },] },],
        'arrayDescs': [{ type: _angular_core.ContentChildren, args: [AcArrayDescComponent, { descendants: false },] },],
    };
    return AcArrayDescComponent;
}());

var __extends$66 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcPointPrimitiveDescComponent = (function (_super) {
    __extends$66(AcPointPrimitiveDescComponent, _super);
    function AcPointPrimitiveDescComponent(pointPrimitiveDrawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, pointPrimitiveDrawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcPointPrimitiveDescComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-point-primitive-desc',
                    template: '',
                },] },
    ];
    AcPointPrimitiveDescComponent.ctorParameters = function () { return [
        { type: PointPrimitiveDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcPointPrimitiveDescComponent;
}(BasicDesc));

var __extends$67 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcPrimitivePolylineComponent = (function (_super) {
    __extends$67(AcPrimitivePolylineComponent, _super);
    function AcPrimitivePolylineComponent(polylineDrawer, mapLayers) {
        return _super.call(this, polylineDrawer, mapLayers) || this;
    }
    AcPrimitivePolylineComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-primitive-polyline',
                    template: '',
                },] },
    ];
    AcPrimitivePolylineComponent.ctorParameters = function () { return [
        { type: PolylinePrimitiveDrawerService, },
        { type: MapLayersService, },
    ]; };
    return AcPrimitivePolylineComponent;
}(EntityOnMapComponent));

var AngularCesiumModule = (function () {
    function AngularCesiumModule() {
        CesiumExtender.extend();
    }
    AngularCesiumModule.forRoot = function (config) {
        return {
            ngModule: AngularCesiumModule,
            providers: [{ provide: 'config', useValue: config }]
        };
    };
    AngularCesiumModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        _angular_common.CommonModule,
                        angular2parse.Angular2ParseModule,
                        UtilsModule,
                    ],
                    declarations: [
                        AcMapComponent,
                        AcLayerComponent,
                        AcBillboardComponent,
                        AcBillboardDescComponent,
                        AcBillboardPrimitiveDescComponent,
                        AcLabelDescComponent,
                        AcLabelPrimitiveDescComponent,
                        AcEllipseDescComponent,
                        AcPolylineDescComponent,
                        AcPolylinePrimitiveDescComponent,
                        PixelOffsetPipe,
                        RadiansToDegreesPipe,
                        AcCircleDescComponent,
                        AcArcDescComponent,
                        AcMapLayerProviderComponent,
                        AcPointDescComponent,
                        AcLabelComponent,
                        AcPolylineComponent,
                        AcPrimitivePolylineComponent,
                        AcEllipseComponent,
                        AcPointComponent,
                        AcBillboardComponent,
                        AcHtmlComponent,
                        AcCircleComponent,
                        AcArcComponent,
                        AcPolygonDescComponent,
                        AcPolygonComponent,
                        AcDefaultPlonterComponent,
                        AcModelDescComponent,
                        AcTileset3dComponent,
                        AcBoxDescComponent,
                        AcCylinderDescComponent,
                        AcCorridorDescComponent,
                        AcEllipsoidDescComponent,
                        AcPolylineVolumeDescComponent,
                        AcWallDescComponent,
                        AcRectangleDescComponent,
                        AcContextMenuWrapperComponent,
                        AcPointPrimitiveDescComponent,
                        AcHtmlDescComponent,
                        AcHtmlDirective,
                        AcHtmlContainerDirective,
                        AcArrayDescComponent,
                        AcStaticEllipseDescComponent,
                        AcDynamicEllipseDescComponent,
                        AcDynamicPolylineDescComponent,
                        AcStaticPolylineDescComponent,
                        AcDynamicCircleDescComponent,
                        AcStaticCircleDescComponent,
                        AcStaticPolygonDescComponent,
                    ],
                    exports: [
                        AcMapComponent,
                        AcBillboardComponent,
                        AcBillboardDescComponent,
                        AcBillboardPrimitiveDescComponent,
                        AcLabelDescComponent,
                        AcLabelPrimitiveDescComponent,
                        AcEllipseDescComponent,
                        AcPolylineDescComponent,
                        AcPolylinePrimitiveDescComponent,
                        AcLayerComponent,
                        AcCircleDescComponent,
                        AcArcDescComponent,
                        AcMapLayerProviderComponent,
                        AcPointDescComponent,
                        AcLabelComponent,
                        AcPolylineComponent,
                        AcPrimitivePolylineComponent,
                        AcEllipseComponent,
                        AcPointComponent,
                        AcBillboardComponent,
                        AcHtmlComponent,
                        AcCircleComponent,
                        AcArcComponent,
                        AcPolygonDescComponent,
                        AcPolygonComponent,
                        AcDefaultPlonterComponent,
                        AcModelDescComponent,
                        AcTileset3dComponent,
                        AcBoxDescComponent,
                        AcCylinderDescComponent,
                        AcCorridorDescComponent,
                        AcEllipsoidDescComponent,
                        AcPolylineVolumeDescComponent,
                        AcWallDescComponent,
                        AcRectangleDescComponent,
                        AcContextMenuWrapperComponent,
                        AcPointPrimitiveDescComponent,
                        AcHtmlDescComponent,
                        AcArrayDescComponent,
                        AcStaticEllipseDescComponent,
                        AcDynamicEllipseDescComponent,
                        AcDynamicPolylineDescComponent,
                        AcStaticPolylineDescComponent,
                        AcDynamicCircleDescComponent,
                        AcStaticCircleDescComponent,
                        AcStaticPolygonDescComponent,
                    ],
                    providers: [JsonMapper, CesiumProperties, GeoUtilsService, ViewerFactory, MapsManagerService, ConfigurationService],
                },] },
    ];
    AngularCesiumModule.ctorParameters = function () { return []; };
    return AngularCesiumModule;
}());

var __extends$68 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DisposableObservable = (function (_super) {
    __extends$68(DisposableObservable, _super);
    function DisposableObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DisposableObservable;
}(rxjs_Observable.Observable));

(function (CesiumEventModifier) {
    CesiumEventModifier[CesiumEventModifier["ALT"] = Cesium.KeyboardEventModifier.ALT] = "ALT";
    CesiumEventModifier[CesiumEventModifier["CTRL"] = Cesium.KeyboardEventModifier.CTRL] = "CTRL";
    CesiumEventModifier[CesiumEventModifier["SHIFT"] = Cesium.KeyboardEventModifier.SHIFT] = "SHIFT";
})(exports.CesiumEventModifier || (exports.CesiumEventModifier = {}));

var SelectionManagerService = (function () {
    function SelectionManagerService(mapsManager) {
        this.mapsManager = mapsManager;
        this.selectedEntitiesItems$ = new rxjs_BehaviorSubject.BehaviorSubject([]);
        this.selectedEntitySubject$ = new rxjs_Subject.Subject();
    }
    SelectionManagerService.prototype.selectedEntities$ = function () {
        return this.selectedEntitiesItems$.asObservable();
    };
    SelectionManagerService.prototype.selectedEntities = function () {
        return this.selectedEntitiesItems$.getValue();
    };
    SelectionManagerService.prototype.selectedEntity$ = function () {
        return this.selectedEntitySubject$;
    };
    SelectionManagerService.prototype.toggleSelection = function (entity, addSelectedIndicator) {
        var current = this.selectedEntities();
        if (current.indexOf(entity) === -1) {
            this.addToSelected(entity, addSelectedIndicator);
        }
        else {
            this.removeSelected(entity, addSelectedIndicator);
        }
    };
    SelectionManagerService.prototype.addToSelected = function (entity, addSelectedIndicator) {
        if (addSelectedIndicator) {
            entity['selected'] = true;
        }
        var current = this.selectedEntities();
        this.selectedEntitySubject$.next(entity);
        this.selectedEntitiesItems$.next(current.concat([entity]));
    };
    SelectionManagerService.prototype.removeSelected = function (entity, addSelectedIndicator) {
        if (addSelectedIndicator) {
            entity['selected'] = false;
        }
        var current = this.selectedEntities();
        var entityIndex = current.indexOf(entity);
        if (entityIndex !== -1) {
            current.splice(entityIndex, 1);
            this.selectedEntitiesItems$.next(current);
            this.selectedEntitySubject$.next(entity);
        }
    };
    SelectionManagerService.prototype.initSelection = function (selectionOptions, addSelectedIndicator, eventPriority, mapId) {
        var _this = this;
        if (addSelectedIndicator === void 0) { addSelectedIndicator = true; }
        this.mapEventsManagerService = this.mapsManager.getMap(mapId).getMapEventsManager();
        if (!selectionOptions) {
            Object.assign(selectionOptions, { event: exports.CesiumEvent.LEFT_CLICK });
        }
        var eventSubscription = this.mapEventsManagerService.register({
            event: selectionOptions.event,
            pick: exports.PickOptions.PICK_ONE,
            modifier: selectionOptions.modifier,
            entityType: selectionOptions.entityType,
            priority: eventPriority,
        });
        eventSubscription
            .map(function (result) { return result.entities; })
            .filter(function (entities) { return entities && entities.length > 0; })
            .subscribe(function (entities) {
            var entity = entities[0];
            _this.toggleSelection(entity, addSelectedIndicator);
        });
    };
    SelectionManagerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    SelectionManagerService.ctorParameters = function () { return [
        { type: MapsManagerService, },
    ]; };
    return SelectionManagerService;
}());

(function (EditModes) {
    EditModes[EditModes["CREATE"] = 0] = "CREATE";
    EditModes[EditModes["EDIT"] = 1] = "EDIT";
    EditModes[EditModes["CREATE_OR_EDIT"] = 2] = "CREATE_OR_EDIT";
})(exports.EditModes || (exports.EditModes = {}));

(function (EditActions) {
    EditActions[EditActions["INIT"] = 0] = "INIT";
    EditActions[EditActions["MOUSE_MOVE"] = 1] = "MOUSE_MOVE";
    EditActions[EditActions["ADD_POINT"] = 2] = "ADD_POINT";
    EditActions[EditActions["ADD_LAST_POINT"] = 3] = "ADD_LAST_POINT";
    EditActions[EditActions["CHANGE_TO_EDIT"] = 4] = "CHANGE_TO_EDIT";
    EditActions[EditActions["REMOVE_POINT"] = 5] = "REMOVE_POINT";
    EditActions[EditActions["DRAG_POINT"] = 6] = "DRAG_POINT";
    EditActions[EditActions["DRAG_POINT_FINISH"] = 7] = "DRAG_POINT_FINISH";
    EditActions[EditActions["DRAG_SHAPE"] = 8] = "DRAG_SHAPE";
    EditActions[EditActions["DRAG_SHAPE_FINISH"] = 9] = "DRAG_SHAPE_FINISH";
    EditActions[EditActions["DONE"] = 10] = "DONE";
    EditActions[EditActions["DISABLE"] = 11] = "DISABLE";
    EditActions[EditActions["ENABLE"] = 12] = "ENABLE";
    EditActions[EditActions["DISPOSE"] = 13] = "DISPOSE";
    EditActions[EditActions["SET_EDIT_LABELS_RENDER_CALLBACK"] = 14] = "SET_EDIT_LABELS_RENDER_CALLBACK";
    EditActions[EditActions["UPDATE_EDIT_LABELS"] = 15] = "UPDATE_EDIT_LABELS";
    EditActions[EditActions["SET_MANUALLY"] = 16] = "SET_MANUALLY";
})(exports.EditActions || (exports.EditActions = {}));

var __extends$70 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EditPoint = (function (_super) {
    __extends$70(EditPoint, _super);
    function EditPoint(entityId, position, pointProps, virtualPoint) {
        if (virtualPoint === void 0) { virtualPoint = false; }
        var _this = _super.call(this) || this;
        _this._show = true;
        _this.editedEntityId = entityId;
        _this.position = position;
        _this.id = _this.generateId();
        _this.pointProps = pointProps;
        _this._virtualEditPoint = virtualPoint;
        return _this;
    }
    Object.defineProperty(EditPoint.prototype, "show", {
        get: function () {
            return this._show;
        },
        set: function (value) {
            this._show = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditPoint.prototype, "props", {
        get: function () {
            return this.pointProps;
        },
        set: function (value) {
            this.pointProps = value;
        },
        enumerable: true,
        configurable: true
    });
    EditPoint.prototype.isVirtualEditPoint = function () {
        return this._virtualEditPoint;
    };
    EditPoint.prototype.setVirtualEditPoint = function (value) {
        this._virtualEditPoint = value;
    };
    EditPoint.prototype.getEditedEntityId = function () {
        return this.editedEntityId;
    };
    EditPoint.prototype.getPosition = function () {
        return this.position;
    };
    EditPoint.prototype.setPosition = function (position) {
        this.position.x = position.x;
        this.position.y = position.y;
        this.position.z = position.z;
    };
    EditPoint.prototype.getId = function () {
        return this.id;
    };
    EditPoint.prototype.generateId = function () {
        return 'edit-point-' + EditPoint.counter++;
    };
    EditPoint.counter = 0;
    return EditPoint;
}(AcEntity));

var __extends$71 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EditPolyline = (function (_super) {
    __extends$71(EditPolyline, _super);
    function EditPolyline(entityId, startPosition, endPosition, polylineProps) {
        var _this = _super.call(this) || this;
        _this.editedEntityId = entityId;
        _this.id = _this.generateId();
        _this.positions = [startPosition, endPosition];
        _this._polylineProps = polylineProps;
        return _this;
    }
    Object.defineProperty(EditPolyline.prototype, "props", {
        get: function () {
            return this._polylineProps;
        },
        set: function (value) {
            this._polylineProps = value;
        },
        enumerable: true,
        configurable: true
    });
    EditPolyline.prototype.getEditedEntityId = function () {
        return this.editedEntityId;
    };
    EditPolyline.prototype.getPositions = function () {
        return this.positions;
    };
    EditPolyline.prototype.validatePositions = function () {
        return this.positions[0] !== undefined && this.positions[1] !== undefined;
    };
    EditPolyline.prototype.getStartPosition = function () {
        return this.positions[0];
    };
    EditPolyline.prototype.getEndPosition = function () {
        return this.positions[1];
    };
    EditPolyline.prototype.setStartPosition = function (position) {
        this.positions[0] = position;
    };
    EditPolyline.prototype.setEndPosition = function (position) {
        this.positions[1] = position;
    };
    EditPolyline.prototype.getId = function () {
        return this.id;
    };
    EditPolyline.prototype.generateId = function () {
        return 'edit-polyline-' + EditPolyline.counter++;
    };
    EditPolyline.counter = 0;
    return EditPolyline;
}(AcEntity));

var defaultLabelProps = {
    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),
    backgroundPadding: new Cesium.Cartesian2(7, 5),
    distanceDisplayCondition: undefined,
    eyeOffset: Cesium.Cartesian3.ZERO,
    fillColor: Cesium.Color.WHITE,
    font: '30px sans-serif',
    heightReference: Cesium.HeightReference.NONE,
    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 1.0,
    pixelOffset: Cesium.Cartesian2.ZERO,
    pixelOffsetScaleByDistance: undefined,
    scale: 1.0,
    scaleByDistance: undefined,
    show: true,
    showBackground: false,
    style: Cesium.LabelStyle.FILL,
    text: '',
    translucencyByDistance: undefined,
    verticalOrigin: Cesium.VerticalOrigin.BASELINE,
};

var __extends$69 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EditablePolygon = (function (_super) {
    __extends$69(EditablePolygon, _super);
    function EditablePolygon(id, polygonsLayer, pointsLayer, polylinesLayer, coordinateConverter, polygonOptions, positions) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.polygonsLayer = polygonsLayer;
        _this.pointsLayer = pointsLayer;
        _this.polylinesLayer = polylinesLayer;
        _this.coordinateConverter = coordinateConverter;
        _this.positions = [];
        _this.polylines = [];
        _this.doneCreation = false;
        _this._enableEdit = true;
        _this._labels = [];
        _this.polygonProps = polygonOptions.polygonProps;
        _this.defaultPointProps = polygonOptions.pointProps;
        _this.defaultPolylineProps = polygonOptions.polylineProps;
        if (positions && positions.length >= 3) {
            _this.createFromExisting(positions);
        }
        return _this;
    }
    Object.defineProperty(EditablePolygon.prototype, "labels", {
        get: function () {
            return this._labels;
        },
        set: function (labels) {
            if (!labels) {
                return;
            }
            var positions = this.getRealPositions();
            this._labels = labels.map(function (label, index) {
                if (!label.position) {
                    label.position = positions[index];
                }
                return Object.assign({}, defaultLabelProps, label);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditablePolygon.prototype, "defaultPolylineProps", {
        get: function () {
            return this._defaultPolylineProps;
        },
        set: function (value) {
            this._defaultPolylineProps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditablePolygon.prototype, "defaultPointProps", {
        get: function () {
            return this._defaultPointProps;
        },
        set: function (value) {
            this._defaultPointProps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditablePolygon.prototype, "polygonProps", {
        get: function () {
            return this._polygonProps;
        },
        set: function (value) {
            this._polygonProps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditablePolygon.prototype, "enableEdit", {
        get: function () {
            return this._enableEdit;
        },
        set: function (value) {
            var _this = this;
            this._enableEdit = value;
            this.positions.forEach(function (point) {
                point.show = value;
                _this.updatePointsLayer(false, point);
            });
        },
        enumerable: true,
        configurable: true
    });
    EditablePolygon.prototype.createFromExisting = function (positions) {
        var _this = this;
        positions.forEach(function (position) {
            _this.addPointFromExisting(position);
        });
        this.addAllVirtualEditPoints();
        this.updatePolygonsLayer();
        this.doneCreation = true;
    };
    EditablePolygon.prototype.setPointsManually = function (points, polygonProps) {
        var _this = this;
        if (!this.doneCreation) {
            throw new Error('Update manually only in edit mode, after polygon is created');
        }
        this.positions.forEach(function (p) { return _this.pointsLayer.remove(p.getId()); });
        var newPoints = [];
        for (var i = 0; i < points.length; i++) {
            var pointOrCartesian = points[i];
            var newPoint = null;
            if (pointOrCartesian.pointProps) {
                newPoint = new EditPoint(this.id, pointOrCartesian.position, pointOrCartesian.pointProps);
            }
            else {
                newPoint = new EditPoint(this.id, pointOrCartesian, this.defaultPointProps);
            }
            newPoints.push(newPoint);
        }
        this.positions = newPoints;
        this.polygonProps = polygonProps ? polygonProps : this.polygonProps;
        this.updatePointsLayer.apply(this, [true].concat(this.positions));
        this.addAllVirtualEditPoints();
        this.updatePolygonsLayer();
    };
    EditablePolygon.prototype.addAllVirtualEditPoints = function () {
        var _this = this;
        var currentPoints = this.positions.slice();
        currentPoints.forEach(function (pos, index) {
            var currentPoint = pos;
            var nextIndex = (index + 1) % (currentPoints.length);
            var nextPoint = currentPoints[nextIndex];
            var midPoint = _this.setMiddleVirtualPoint(currentPoint, nextPoint);
            _this.updatePointsLayer(false, midPoint);
        });
    };
    EditablePolygon.prototype.setMiddleVirtualPoint = function (firstP, secondP) {
        var currentCart = Cesium.Cartographic.fromCartesian(firstP.getPosition());
        var nextCart = Cesium.Cartographic.fromCartesian(secondP.getPosition());
        var midPointCartesian3 = this.coordinateConverter.midPointToCartesian3(currentCart, nextCart);
        var midPoint = new EditPoint(this.id, midPointCartesian3, this.defaultPointProps);
        midPoint.setVirtualEditPoint(true);
        var firstIndex = this.positions.indexOf(firstP);
        this.positions.splice(firstIndex + 1, 0, midPoint);
        return midPoint;
    };
    EditablePolygon.prototype.updateMiddleVirtualPoint = function (virtualEditPoint, prevPoint, nextPoint) {
        var prevPointCart = Cesium.Cartographic.fromCartesian(prevPoint.getPosition());
        var nextPointCart = Cesium.Cartographic.fromCartesian(nextPoint.getPosition());
        virtualEditPoint.setPosition(this.coordinateConverter.midPointToCartesian3(prevPointCart, nextPointCart));
    };
    EditablePolygon.prototype.changeVirtualPointToRealPoint = function (point) {
        point.setVirtualEditPoint(false);
        var pointsCount = this.positions.length;
        var pointIndex = this.positions.indexOf(point);
        var nextIndex = (pointIndex + 1) % (pointsCount);
        var preIndex = ((pointIndex - 1) + pointsCount) % pointsCount;
        var nextPoint = this.positions[nextIndex];
        var prePoint = this.positions[preIndex];
        var firstMidPoint = this.setMiddleVirtualPoint(prePoint, point);
        var secMidPoint = this.setMiddleVirtualPoint(point, nextPoint);
        this.updatePointsLayer(true, firstMidPoint, secMidPoint, point);
        this.updatePolygonsLayer();
    };
    EditablePolygon.prototype.renderPolylines = function () {
        var _this = this;
        this.polylines.forEach(function (polyline) { return _this.polylinesLayer.remove(polyline.getId()); });
        this.polylines = [];
        var realPoints = this.positions.filter(function (pos) { return !pos.isVirtualEditPoint(); });
        realPoints.forEach(function (point, index) {
            var nextIndex = (index + 1) % (realPoints.length);
            var nextPoint = realPoints[nextIndex];
            var polyline = new EditPolyline(_this.id, point.getPosition(), nextPoint.getPosition(), _this.defaultPolylineProps);
            _this.polylines.push(polyline);
            _this.polylinesLayer.update(polyline, polyline.getId());
        });
    };
    EditablePolygon.prototype.addPointFromExisting = function (position) {
        var newPoint = new EditPoint(this.id, position, this.defaultPointProps);
        this.positions.push(newPoint);
        this.updatePointsLayer(true, newPoint);
    };
    EditablePolygon.prototype.addPoint = function (position) {
        if (this.doneCreation) {
            return;
        }
        var isFirstPoint = !this.positions.length;
        if (isFirstPoint) {
            var firstPoint = new EditPoint(this.id, position, this.defaultPointProps);
            this.positions.push(firstPoint);
            this.updatePointsLayer(true, firstPoint);
        }
        this.movingPoint = new EditPoint(this.id, position.clone(), this.defaultPointProps);
        this.positions.push(this.movingPoint);
        this.updatePointsLayer(true, this.movingPoint);
        this.updatePolygonsLayer();
    };
    EditablePolygon.prototype.movePoint = function (toPosition, editPoint) {
        editPoint.setPosition(toPosition);
        this.updatePolygonsLayer();
        if (this.doneCreation) {
            if (editPoint.isVirtualEditPoint()) {
                this.changeVirtualPointToRealPoint(editPoint);
            }
            var pointsCount = this.positions.length;
            var pointIndex = this.positions.indexOf(editPoint);
            var nextVirtualPoint = this.positions[(pointIndex + 1) % (pointsCount)];
            var nextRealPoint = this.positions[(pointIndex + 2) % (pointsCount)];
            var prevVirtualPoint = this.positions[((pointIndex - 1) + pointsCount) % pointsCount];
            var prevRealPoint = this.positions[((pointIndex - 2) + pointsCount) % pointsCount];
            this.updateMiddleVirtualPoint(nextVirtualPoint, editPoint, nextRealPoint);
            this.updateMiddleVirtualPoint(prevVirtualPoint, editPoint, prevRealPoint);
            this.updatePointsLayer(false, nextVirtualPoint);
            this.updatePointsLayer(false, prevVirtualPoint);
        }
        this.updatePointsLayer(true, editPoint);
    };
    EditablePolygon.prototype.moveTempMovingPoint = function (toPosition) {
        if (this.movingPoint) {
            this.movePoint(toPosition, this.movingPoint);
        }
    };
    EditablePolygon.prototype.movePolygon = function (startMovingPosition, draggedToPosition) {
        if (!this.doneCreation) {
            return;
        }
        if (!this.lastDraggedToPosition) {
            this.lastDraggedToPosition = startMovingPosition;
        }
        var delta = GeoUtilsService.getPositionsDelta(this.lastDraggedToPosition, draggedToPosition);
        this.positions.forEach(function (point) {
            GeoUtilsService.addDeltaToPosition(point.getPosition(), delta, true);
        });
        this.updatePointsLayer();
        this.lastDraggedToPosition = draggedToPosition;
    };
    EditablePolygon.prototype.endMovePolygon = function () {
        var _this = this;
        this.lastDraggedToPosition = undefined;
        this.positions.forEach(function (point) { return _this.updatePointsLayer(true, point); });
        this.updatePolygonsLayer();
    };
    EditablePolygon.prototype.removePoint = function (pointToRemove) {
        var _this = this;
        this.removePosition(pointToRemove);
        this.positions
            .filter(function (p) { return p.isVirtualEditPoint(); })
            .forEach(function (p) { return _this.removePosition(p); });
        this.addAllVirtualEditPoints();
        this.renderPolylines();
        if (this.getPointsCount() >= 3) {
            this.polygonsLayer.update(this, this.id);
        }
    };
    EditablePolygon.prototype.addLastPoint = function (position) {
        this.doneCreation = true;
        this.removePosition(this.movingPoint);
        this.movingPoint = null;
        this.updatePolygonsLayer();
        this.addAllVirtualEditPoints();
    };
    EditablePolygon.prototype.getRealPositions = function () {
        return this.getRealPoints().map(function (position) { return position.getPosition(); });
    };
    EditablePolygon.prototype.getRealPoints = function () {
        var _this = this;
        return this.positions.filter(function (position) { return !position.isVirtualEditPoint() && position !== _this.movingPoint; });
    };
    EditablePolygon.prototype.getPositions = function () {
        return this.positions.map(function (position) { return position.getPosition(); });
    };
    EditablePolygon.prototype.getHierarchy = function () {
        return new Cesium.PolygonHierarchy(this.getPositions());
    };
    EditablePolygon.prototype.removePosition = function (point) {
        var index = this.positions.findIndex(function (p) { return p === point; });
        if (index < 0) {
            return;
        }
        this.positions.splice(index, 1);
        this.pointsLayer.remove(point.getId());
    };
    EditablePolygon.prototype.updatePolygonsLayer = function () {
        if (this.getPointsCount() >= 3) {
            this.polygonsLayer.update(this, this.id);
        }
    };
    EditablePolygon.prototype.updatePointsLayer = function (renderPolylines) {
        var _this = this;
        if (renderPolylines === void 0) { renderPolylines = true; }
        var points = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            points[_i - 1] = arguments[_i];
        }
        if (renderPolylines) {
            this.renderPolylines();
        }
        points.forEach(function (p) { return _this.pointsLayer.update(p, p.getId()); });
    };
    EditablePolygon.prototype.dispose = function () {
        var _this = this;
        this.polygonsLayer.remove(this.id);
        this.positions.forEach(function (editPoint) {
            _this.pointsLayer.remove(editPoint.getId());
        });
        this.polylines.forEach(function (line) { return _this.polylinesLayer.remove(line.getId()); });
        if (this.movingPoint) {
            this.pointsLayer.remove(this.movingPoint.getId());
            this.movingPoint = undefined;
        }
        this.positions.length = 0;
    };
    EditablePolygon.prototype.getPointsCount = function () {
        return this.positions.length;
    };
    EditablePolygon.prototype.getId = function () {
        return this.id;
    };
    return EditablePolygon;
}(AcEntity));

var PolygonsManagerService = (function () {
    function PolygonsManagerService() {
        this.polygons = new Map();
    }
    PolygonsManagerService.prototype.createEditablePolygon = function (id, editPolygonsLayer, editPointsLayer, editPolylinesLayer, coordinateConverter, polygonOptions, positions) {
        var editablePolygon = new EditablePolygon(id, editPolygonsLayer, editPointsLayer, editPolylinesLayer, coordinateConverter, polygonOptions, positions);
        this.polygons.set(id, editablePolygon);
    };
    PolygonsManagerService.prototype.dispose = function (id) {
        this.polygons.get(id).dispose();
        this.polygons.delete(id);
    };
    PolygonsManagerService.prototype.get = function (id) {
        return this.polygons.get(id);
    };
    PolygonsManagerService.prototype.clear = function () {
        this.polygons.forEach(function (polygon) { return polygon.dispose(); });
        this.polygons.clear();
    };
    PolygonsManagerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    PolygonsManagerService.ctorParameters = function () { return []; };
    return PolygonsManagerService;
}());

var __assign$2 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var DEFAULT_POLYGON_OPTIONS = {
    addPointEvent: exports.CesiumEvent.LEFT_CLICK,
    addLastPointEvent: exports.CesiumEvent.LEFT_DOUBLE_CLICK,
    removePointEvent: exports.CesiumEvent.RIGHT_CLICK,
    dragPointEvent: exports.CesiumEvent.LEFT_CLICK_DRAG,
    dragShapeEvent: exports.CesiumEvent.LEFT_CLICK_DRAG,
    allowDrag: true,
    pointProps: {
        color: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 1,
        pixelSize: 15,
        virtualPointPixelSize: 8,
        show: true,
        showVirtual: true,
    },
    polygonProps: {
        material: new Cesium.Color(0.1, 0.5, 0.2, 0.4),
    },
    polylineProps: {
        material: function () { return Cesium.Color.BLACK; },
        width: 1,
    },
};
var PolygonsEditorService = (function () {
    function PolygonsEditorService() {
        this.updateSubject = new rxjs_Subject.Subject();
        this.updatePublisher = this.updateSubject.publish();
        this.counter = 0;
        this.observablesMap = new Map();
    }
    PolygonsEditorService.prototype.init = function (mapEventsManager, coordinateConverter, cameraService, polygonsManager) {
        this.mapEventsManager = mapEventsManager;
        this.updatePublisher.connect();
        this.coordinateConverter = coordinateConverter;
        this.cameraService = cameraService;
        this.polygonsManager = polygonsManager;
    };
    PolygonsEditorService.prototype.onUpdate = function () {
        return this.updatePublisher;
    };
    PolygonsEditorService.prototype.create = function (options, priority) {
        var _this = this;
        if (options === void 0) { options = DEFAULT_POLYGON_OPTIONS; }
        if (priority === void 0) { priority = 100; }
        var positions = [];
        var id = this.generteId();
        var polygonOptions = this.setOptions(options);
        var clientEditSubject = new rxjs_BehaviorSubject.BehaviorSubject({
            id: id,
            editAction: null,
            editMode: exports.EditModes.CREATE
        });
        var finishedCreate = false;
        this.updateSubject.next({
            id: id,
            positions: positions,
            editMode: exports.EditModes.CREATE,
            editAction: exports.EditActions.INIT,
            polygonOptions: polygonOptions,
        });
        var mouseMoveRegistration = this.mapEventsManager.register({
            event: exports.CesiumEvent.MOUSE_MOVE,
            pick: exports.PickOptions.NO_PICK,
            priority: priority,
        });
        var addPointRegistration = this.mapEventsManager.register({
            event: polygonOptions.addPointEvent,
            pick: exports.PickOptions.NO_PICK,
            priority: priority,
        });
        var addLastPointRegistration = this.mapEventsManager.register({
            event: polygonOptions.addLastPointEvent,
            pick: exports.PickOptions.NO_PICK,
            priority: priority,
        });
        this.observablesMap.set(id, [mouseMoveRegistration, addPointRegistration, addLastPointRegistration]);
        var editorObservable = this.createEditorObservable(clientEditSubject, id);
        mouseMoveRegistration.subscribe(function (_a) {
            var endPosition = _a.movement.endPosition;
            var position = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (position) {
                _this.updateSubject.next({
                    id: id,
                    positions: _this.getPositions(id),
                    editMode: exports.EditModes.CREATE,
                    updatedPosition: position,
                    editAction: exports.EditActions.MOUSE_MOVE,
                });
            }
        });
        addPointRegistration.subscribe(function (_a) {
            var endPosition = _a.movement.endPosition;
            if (finishedCreate) {
                return;
            }
            var position = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (!position) {
                return;
            }
            var allPositions = _this.getPositions(id);
            if (allPositions.find(function (cartesian) { return cartesian.equals(position); })) {
                return;
            }
            var updateValue = {
                id: id,
                positions: allPositions,
                editMode: exports.EditModes.CREATE,
                updatedPosition: position,
                editAction: exports.EditActions.ADD_POINT,
            };
            _this.updateSubject.next(updateValue);
            clientEditSubject.next(__assign$2({}, updateValue, { positions: _this.getPositions(id), points: _this.getPoints(id) }));
        });
        addLastPointRegistration.subscribe(function (_a) {
            var endPosition = _a.movement.endPosition;
            var position = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (!position) {
                return;
            }
            var updateValue = {
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.CREATE,
                updatedPosition: position,
                editAction: exports.EditActions.ADD_LAST_POINT,
            };
            _this.updateSubject.next(updateValue);
            clientEditSubject.next(__assign$2({}, updateValue, { positions: _this.getPositions(id), points: _this.getPoints(id) }));
            var changeMode = {
                id: id,
                editMode: exports.EditModes.CREATE,
                editAction: exports.EditActions.CHANGE_TO_EDIT,
            };
            _this.updateSubject.next(changeMode);
            clientEditSubject.next(changeMode);
            if (_this.observablesMap.has(id)) {
                _this.observablesMap.get(id).forEach(function (registration) { return registration.dispose(); });
            }
            _this.observablesMap.delete(id);
            _this.editPolygon(id, positions, priority, clientEditSubject, polygonOptions, editorObservable);
            finishedCreate = true;
        });
        return editorObservable;
    };
    PolygonsEditorService.prototype.edit = function (positions, options, priority) {
        if (options === void 0) { options = DEFAULT_POLYGON_OPTIONS; }
        if (priority === void 0) { priority = 100; }
        if (positions.length < 3) {
            throw new Error('Polygons editor error edit(): polygon should have at least 3 positions');
        }
        var id = this.generteId();
        var polygonOptions = this.setOptions(options);
        var editSubject = new rxjs_BehaviorSubject.BehaviorSubject({
            id: id,
            editAction: null,
            editMode: exports.EditModes.EDIT
        });
        var update = {
            id: id,
            positions: positions,
            editMode: exports.EditModes.EDIT,
            editAction: exports.EditActions.INIT,
            polygonOptions: polygonOptions,
        };
        this.updateSubject.next(update);
        editSubject.next(__assign$2({}, update, { positions: this.getPositions(id), points: this.getPoints(id) }));
        return this.editPolygon(id, positions, priority, editSubject, polygonOptions);
    };
    PolygonsEditorService.prototype.editPolygon = function (id, positions, priority, editSubject, options, editObservable) {
        var _this = this;
        var pointDragRegistration = this.mapEventsManager.register({
            event: options.dragPointEvent,
            entityType: EditPoint,
            pick: exports.PickOptions.PICK_FIRST,
            priority: priority,
        });
        var shapeDragRegistration;
        if (options.allowDrag) {
            shapeDragRegistration = this.mapEventsManager.register({
                event: options.dragShapeEvent,
                entityType: EditablePolygon,
                pick: exports.PickOptions.PICK_FIRST,
                priority: priority,
            });
        }
        var pointRemoveRegistration = this.mapEventsManager.register({
            event: options.removePointEvent,
            entityType: EditPoint,
            pick: exports.PickOptions.PICK_FIRST,
            priority: priority,
        });
        pointDragRegistration
            .do(function (_a) {
            var drop = _a.movement.drop;
            return _this.cameraService.enableInputs(drop);
        })
            .subscribe(function (_a) {
            var _b = _a.movement, endPosition = _b.endPosition, drop = _b.drop, entities = _a.entities;
            var position = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (!position) {
                return;
            }
            var point = entities[0];
            var update = {
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.EDIT,
                updatedPosition: position,
                updatedPoint: point,
                editAction: drop ? exports.EditActions.DRAG_POINT_FINISH : exports.EditActions.DRAG_POINT,
            };
            _this.updateSubject.next(update);
            editSubject.next(__assign$2({}, update, { positions: _this.getPositions(id), points: _this.getPoints(id) }));
        });
        if (shapeDragRegistration) {
            shapeDragRegistration
                .do(function (_a) {
                var drop = _a.movement.drop;
                return _this.cameraService.enableInputs(drop);
            })
                .subscribe(function (_a) {
                var _b = _a.movement, startPosition = _b.startPosition, endPosition = _b.endPosition, drop = _b.drop, entities = _a.entities;
                var endDragPosition = _this.coordinateConverter.screenToCartesian3(endPosition);
                var startDragPosition = _this.coordinateConverter.screenToCartesian3(startPosition);
                if (!endDragPosition) {
                    return;
                }
                var update = {
                    id: id,
                    positions: _this.getPositions(id),
                    editMode: exports.EditModes.EDIT,
                    updatedPosition: endDragPosition,
                    draggedPosition: startDragPosition,
                    editAction: drop ? exports.EditActions.DRAG_SHAPE_FINISH : exports.EditActions.DRAG_SHAPE,
                };
                _this.updateSubject.next(update);
                editSubject.next(__assign$2({}, update, { positions: _this.getPositions(id), points: _this.getPoints(id) }));
            });
        }
        pointRemoveRegistration.subscribe(function (_a) {
            var entities = _a.entities;
            var point = entities[0];
            var allPositions = _this.getPositions(id).slice();
            if (allPositions.length < 4) {
                return;
            }
            var index = allPositions.findIndex(function (position) { return point.getPosition().equals(position); });
            if (index < 0) {
                return;
            }
            var update = {
                id: id,
                positions: allPositions,
                editMode: exports.EditModes.EDIT,
                updatedPoint: point,
                editAction: exports.EditActions.REMOVE_POINT,
            };
            _this.updateSubject.next(update);
            editSubject.next(__assign$2({}, update, { positions: _this.getPositions(id), points: _this.getPoints(id) }));
        });
        var observables = [pointDragRegistration, pointRemoveRegistration];
        if (shapeDragRegistration) {
            observables.push(shapeDragRegistration);
        }
        this.observablesMap.set(id, observables);
        return editObservable || this.createEditorObservable(editSubject, id);
    };
    PolygonsEditorService.prototype.setOptions = function (options) {
        var defaultClone = JSON.parse(JSON.stringify(DEFAULT_POLYGON_OPTIONS));
        var polygonOptions = Object.assign(defaultClone, options);
        polygonOptions.pointProps = Object.assign({}, DEFAULT_POLYGON_OPTIONS.pointProps, options.pointProps);
        polygonOptions.polygonProps = Object.assign({}, DEFAULT_POLYGON_OPTIONS.polygonProps, options.polygonProps);
        polygonOptions.polylineProps = Object.assign({}, DEFAULT_POLYGON_OPTIONS.polylineProps, options.polylineProps);
        return polygonOptions;
    };
    PolygonsEditorService.prototype.createEditorObservable = function (observableToExtend, id) {
        var _this = this;
        observableToExtend.dispose = function () {
            var observables = _this.observablesMap.get(id);
            if (observables) {
                observables.forEach(function (obs) { return obs.dispose(); });
            }
            _this.observablesMap.delete(id);
            _this.updateSubject.next({
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.DISPOSE,
            });
        };
        observableToExtend.enable = function () {
            _this.updateSubject.next({
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.EDIT,
                editAction: exports.EditActions.ENABLE,
            });
        };
        observableToExtend.disable = function () {
            _this.updateSubject.next({
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.EDIT,
                editAction: exports.EditActions.DISABLE,
            });
        };
        observableToExtend.setManually = function (points, polygonProps) {
            var polygon = _this.polygonsManager.get(id);
            polygon.setPointsManually(points, polygonProps);
            _this.updateSubject.next({
                id: id,
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.SET_MANUALLY,
            });
        };
        observableToExtend.setLabelsRenderFn = function (callback) {
            _this.updateSubject.next({
                id: id,
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.SET_EDIT_LABELS_RENDER_CALLBACK,
                labelsRenderFn: callback,
            });
        };
        observableToExtend.updateLabels = function (labels) {
            _this.updateSubject.next({
                id: id,
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.UPDATE_EDIT_LABELS,
                updateLabels: labels,
            });
        };
        observableToExtend.getCurrentPoints = function () { return _this.getPoints(id); };
        observableToExtend.getEditValue = function () { return observableToExtend.getValue(); };
        observableToExtend.getLabels = function () { return _this.polygonsManager.get(id).labels; };
        return observableToExtend;
    };
    PolygonsEditorService.prototype.generteId = function () {
        return 'edit-polygon-' + this.counter++;
    };
    PolygonsEditorService.prototype.getPositions = function (id) {
        var polygon = this.polygonsManager.get(id);
        return polygon.getRealPositions();
    };
    PolygonsEditorService.prototype.getPoints = function (id) {
        var polygon = this.polygonsManager.get(id);
        return polygon.getRealPoints();
    };
    PolygonsEditorService.decorators = [
        { type: _angular_core.Injectable },
    ];
    PolygonsEditorService.ctorParameters = function () { return []; };
    return PolygonsEditorService;
}());

var PolygonsEditorComponent = (function () {
    function PolygonsEditorComponent(polygonsEditor, coordinateConverter, mapEventsManager, cameraService, polygonsManager) {
        this.polygonsEditor = polygonsEditor;
        this.coordinateConverter = coordinateConverter;
        this.mapEventsManager = mapEventsManager;
        this.cameraService = cameraService;
        this.polygonsManager = polygonsManager;
        this.Cesium = Cesium;
        this.editPoints$ = new rxjs_Subject.Subject();
        this.editPolylines$ = new rxjs_Subject.Subject();
        this.editPolygons$ = new rxjs_Subject.Subject();
        this.appearance = new Cesium.PerInstanceColorAppearance({ flat: true });
        this.attributes = { color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0.2, 0.2, 0.5, 0.5)) };
        this.polygonColor = new Cesium.Color(0.1, 0.5, 0.2, 0.4);
        this.lineColor = new Cesium.Color(0, 0, 0, 0.6);
        this.polygonsEditor.init(this.mapEventsManager, this.coordinateConverter, this.cameraService, polygonsManager);
        this.startListeningToEditorUpdates();
    }
    PolygonsEditorComponent.prototype.startListeningToEditorUpdates = function () {
        var _this = this;
        this.polygonsEditor.onUpdate().subscribe(function (update) {
            if (update.editMode === exports.EditModes.CREATE || update.editMode === exports.EditModes.CREATE_OR_EDIT) {
                _this.handleCreateUpdates(update);
            }
            else if (update.editMode === exports.EditModes.EDIT) {
                _this.handleEditUpdates(update);
            }
        });
    };
    PolygonsEditorComponent.prototype.getLabelId = function (element, index) {
        return index.toString();
    };
    PolygonsEditorComponent.prototype.renderEditLabels = function (polygon, update, labels) {
        update.positions = polygon.getRealPositions();
        update.points = polygon.getRealPoints();
        if (labels) {
            polygon.labels = labels;
            this.editPolygonsLayer.update(polygon, polygon.getId());
            return;
        }
        if (!this.editLabelsRenderFn) {
            return;
        }
        polygon.labels = this.editLabelsRenderFn(update, polygon.labels);
        this.editPolygonsLayer.update(polygon, polygon.getId());
    };
    PolygonsEditorComponent.prototype.removeEditLabels = function (polygon) {
        polygon.labels = [];
        this.editPolygonsLayer.update(polygon, polygon.getId());
    };
    PolygonsEditorComponent.prototype.handleCreateUpdates = function (update) {
        switch (update.editAction) {
            case exports.EditActions.INIT: {
                this.polygonsManager.createEditablePolygon(update.id, this.editPolygonsLayer, this.editPointsLayer, this.editPolylinesLayer, this.coordinateConverter, update.polygonOptions);
                break;
            }
            case exports.EditActions.MOUSE_MOVE: {
                var polygon = this.polygonsManager.get(update.id);
                if (update.updatedPosition) {
                    polygon.moveTempMovingPoint(update.updatedPosition);
                    this.renderEditLabels(polygon, update);
                }
                break;
            }
            case exports.EditActions.ADD_POINT: {
                var polygon = this.polygonsManager.get(update.id);
                if (update.updatedPosition) {
                    polygon.addPoint(update.updatedPosition);
                    this.renderEditLabels(polygon, update);
                }
                break;
            }
            case exports.EditActions.ADD_LAST_POINT: {
                var polygon = this.polygonsManager.get(update.id);
                if (update.updatedPosition) {
                    polygon.addLastPoint(update.updatedPosition);
                    this.renderEditLabels(polygon, update);
                }
                break;
            }
            case exports.EditActions.DISPOSE: {
                var polygon = this.polygonsManager.get(update.id);
                polygon.dispose();
                this.removeEditLabels(polygon);
                this.editLabelsRenderFn = undefined;
                break;
            }
            case exports.EditActions.SET_EDIT_LABELS_RENDER_CALLBACK: {
                var polygon = this.polygonsManager.get(update.id);
                this.editLabelsRenderFn = update.labelsRenderFn;
                this.renderEditLabels(polygon, update);
                break;
            }
            case exports.EditActions.UPDATE_EDIT_LABELS: {
                var polygon = this.polygonsManager.get(update.id);
                this.renderEditLabels(polygon, update, update.updateLabels);
                break;
            }
            case exports.EditActions.SET_MANUALLY: {
                var polygon = this.polygonsManager.get(update.id);
                this.renderEditLabels(polygon, update, update.updateLabels);
                break;
            }
            default: {
                return;
            }
        }
    };
    PolygonsEditorComponent.prototype.handleEditUpdates = function (update) {
        switch (update.editAction) {
            case exports.EditActions.INIT: {
                this.polygonsManager.createEditablePolygon(update.id, this.editPolygonsLayer, this.editPointsLayer, this.editPolylinesLayer, this.coordinateConverter, update.polygonOptions, update.positions);
                break;
            }
            case exports.EditActions.DRAG_POINT: {
                var polygon = this.polygonsManager.get(update.id);
                if (polygon && polygon.enableEdit) {
                    polygon.movePoint(update.updatedPosition, update.updatedPoint);
                    this.renderEditLabels(polygon, update);
                }
                break;
            }
            case exports.EditActions.DRAG_POINT_FINISH: {
                var polygon = this.polygonsManager.get(update.id);
                if (polygon && polygon.enableEdit && update.updatedPoint.isVirtualEditPoint()) {
                    polygon.changeVirtualPointToRealPoint(update.updatedPoint);
                    this.renderEditLabels(polygon, update);
                }
                break;
            }
            case exports.EditActions.REMOVE_POINT: {
                var polygon = this.polygonsManager.get(update.id);
                if (polygon && polygon.enableEdit) {
                    polygon.removePoint(update.updatedPoint);
                    this.renderEditLabels(polygon, update);
                }
                break;
            }
            case exports.EditActions.DISABLE: {
                var polygon = this.polygonsManager.get(update.id);
                if (polygon) {
                    polygon.enableEdit = false;
                    this.renderEditLabels(polygon, update);
                }
                break;
            }
            case exports.EditActions.DRAG_SHAPE: {
                var polygon = this.polygonsManager.get(update.id);
                if (polygon && polygon.enableEdit) {
                    polygon.movePolygon(update.draggedPosition, update.updatedPosition);
                }
                break;
            }
            case exports.EditActions.DRAG_SHAPE_FINISH: {
                var polygon = this.polygonsManager.get(update.id);
                if (polygon && polygon.enableEdit) {
                    polygon.endMovePolygon();
                    this.renderEditLabels(polygon, update);
                }
                break;
            }
            case exports.EditActions.ENABLE: {
                var polygon = this.polygonsManager.get(update.id);
                if (polygon) {
                    polygon.enableEdit = true;
                    this.renderEditLabels(polygon, update);
                }
                break;
            }
            default: {
                return;
            }
        }
    };
    PolygonsEditorComponent.prototype.ngOnDestroy = function () {
        this.polygonsManager.clear();
    };
    PolygonsEditorComponent.prototype.getPointSize = function (point) {
        return point.isVirtualEditPoint() ? point.props.virtualPointPixelSize : point.props.pixelSize;
    };
    PolygonsEditorComponent.prototype.getPointShow = function (point) {
        return point.show && (point.isVirtualEditPoint() ? point.props.showVirtual : point.props.show);
    };
    PolygonsEditorComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'polygons-editor',
                    template: `<ac-layer #editPolylinesLayer acFor="let polyline of editPolylines$" [context]="this" [zIndex]="1">
    <ac-polyline-primitive-desc props="{
        positions: polyline.getPositions(),
        width: polyline.props.width,
        material: polyline.props.material(),
        followSurface: true
    }">
    </ac-polyline-primitive-desc>
</ac-layer>

<ac-layer #editPointsLayer acFor="let point of editPoints$" [context]="this" [zIndex]="2">
    <ac-point-desc props="{
        position: point.getPosition(),
        pixelSize: getPointSize(point),
        color: point.props.color,
        outlineColor: point.props.outlineColor,
        outlineWidth: point.props.outlineWidth,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        show: getPointShow(point)
    }">
    </ac-point-desc>
</ac-layer>

<ac-layer #editPolygonsLayer acFor="let polygon of editPolygons$" [context]="this" [zIndex]="0">
    <ac-polygon-desc props="{
        hierarchy: polygon.getRealPositions(),
        material: polygon.polygonProps.material
    }">
    </ac-polygon-desc>
    <!--<ac-static-polygon-desc-->
    <!--geometryProps="{-->
    <!--polygonHierarchy: polygon.getHierarchy(),-->
    <!--height: 1-->
    <!--}"-->
    <!--instanceProps="{-->
    <!--attributes: attributes-->
    <!--}"-->
    <!--primitiveProps="{-->
    <!--appearance: appearance-->
    <!--}">-->
    <!--</ac-static-polygon-desc-->
    <ac-array-desc acFor="let label of polygon.labels" [idGetter]="getLabelId">
        <ac-label-primitive-desc props="{
            position: label.position,
            backgroundColor: label.backgroundColor,
            backgroundPadding: label.backgroundPadding,
            distanceDisplayCondition: label.distanceDisplayCondition,
            eyeOffset: label.eyeOffset,
            fillColor: label.fillColor,
            font: label.font,
            heightReference: label.heightReference,
            horizontalOrigin: label.horizontalOrigin,
            outlineColor: label.outlineColor,
            outlineWidth: label.outlineWidth,
            pixelOffset: label.pixelOffset,
            pixelOffsetScaleByDistance: label.pixelOffsetScaleByDistance,
            scale: label.scale,
            scaleByDistance: label.scaleByDistance,
            show: label.show,
            showBackground: label.showBackground,
            style: label.style,
            text: label.text,
            translucencyByDistance: label.translucencyByDistance,
            verticalOrigin: label.verticalOrigin
        }">
        </ac-label-primitive-desc>
    </ac-array-desc>
</ac-layer>`,
                    providers: [CoordinateConverter, PolygonsManagerService]
                },] },
    ];
    PolygonsEditorComponent.ctorParameters = function () { return [
        { type: PolygonsEditorService, },
        { type: CoordinateConverter, },
        { type: MapEventsManagerService, },
        { type: CameraService, },
        { type: PolygonsManagerService, },
    ]; };
    PolygonsEditorComponent.propDecorators = {
        'editPolygonsLayer': [{ type: _angular_core.ViewChild, args: ['editPolygonsLayer',] },],
        'editPointsLayer': [{ type: _angular_core.ViewChild, args: ['editPointsLayer',] },],
        'editPolylinesLayer': [{ type: _angular_core.ViewChild, args: ['editPolylinesLayer',] },],
    };
    return PolygonsEditorComponent;
}());

var __extends$73 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EditArc = (function (_super) {
    __extends$73(EditArc, _super);
    function EditArc(entityId, center, radius, delta, angle, _arcProps) {
        var _this = _super.call(this) || this;
        _this._arcProps = _arcProps;
        _this.id = _this.generateId();
        _this.editedEntityId = entityId;
        _this._center = center;
        _this._radius = radius;
        _this._delta = delta;
        _this._angle = angle;
        return _this;
    }
    Object.defineProperty(EditArc.prototype, "props", {
        get: function () {
            return this._arcProps;
        },
        set: function (props) {
            this._arcProps = props;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditArc.prototype, "angle", {
        get: function () {
            return this._angle;
        },
        set: function (value) {
            this._angle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditArc.prototype, "delta", {
        get: function () {
            return this._delta;
        },
        set: function (value) {
            this._delta = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditArc.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditArc.prototype, "center", {
        get: function () {
            return this._center;
        },
        set: function (value) {
            this._center = value;
        },
        enumerable: true,
        configurable: true
    });
    EditArc.prototype.updateCenter = function (center) {
        this._center.x = center.x;
        this._center.y = center.y;
        this._center.z = center.z;
    };
    EditArc.prototype.getId = function () {
        return this.id;
    };
    EditArc.prototype.generateId = function () {
        return 'edit-arc-' + EditArc.counter++;
    };
    EditArc.counter = 0;
    return EditArc;
}(AcEntity));

var __extends$72 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EditableCircle = (function (_super) {
    __extends$72(EditableCircle, _super);
    function EditableCircle(id, circlesLayer, pointsLayer, arcsLayer, options) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.circlesLayer = circlesLayer;
        _this.pointsLayer = pointsLayer;
        _this.arcsLayer = arcsLayer;
        _this.options = options;
        _this.doneCreation = false;
        _this._enableEdit = true;
        _this._labels = [];
        _this._circleProps = options.circleProps;
        _this._pointProps = options.pointProps;
        _this._polylineProps = options.polylineProps;
        return _this;
    }
    Object.defineProperty(EditableCircle.prototype, "labels", {
        get: function () {
            return this._labels;
        },
        set: function (labels) {
            var _this = this;
            if (!labels || !this._center || !this._radiusPoint) {
                return;
            }
            this._labels = labels.map(function (label, index) {
                if (!label.position) {
                    if (index !== labels.length - 1) {
                        label.position = _this._center.getPosition();
                    }
                    else {
                        label.position = _this._radiusPoint.getPosition();
                    }
                }
                return Object.assign({}, defaultLabelProps, label);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableCircle.prototype, "polylineProps", {
        get: function () {
            return this._polylineProps;
        },
        set: function (value) {
            this._polylineProps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableCircle.prototype, "pointProps", {
        get: function () {
            return this._pointProps;
        },
        set: function (value) {
            this._pointProps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableCircle.prototype, "circleProps", {
        get: function () {
            return this._circleProps;
        },
        set: function (value) {
            this._circleProps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableCircle.prototype, "center", {
        get: function () {
            return this._center;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableCircle.prototype, "radiusPoint", {
        get: function () {
            return this._radiusPoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableCircle.prototype, "enableEdit", {
        get: function () {
            return this._enableEdit;
        },
        set: function (value) {
            this._enableEdit = value;
            this._center.show = value;
            this._radiusPoint.show = value;
            this.updatePointsLayer();
        },
        enumerable: true,
        configurable: true
    });
    EditableCircle.prototype.setManually = function (center, radiusPoint, centerPointProp, radiusPointProp, circleProp) {
        if (centerPointProp === void 0) { centerPointProp = this.pointProps; }
        if (radiusPointProp === void 0) { radiusPointProp = this.pointProps; }
        if (circleProp === void 0) { circleProp = this.circleProps; }
        if (!this._center) {
            this._center = new EditPoint(this.id, center, centerPointProp);
        }
        else {
            this._center.setPosition(center);
        }
        if (!this._radiusPoint) {
            this._radiusPoint = new EditPoint(this.id, radiusPoint, radiusPointProp);
        }
        else {
            this._radiusPoint.setPosition(radiusPoint);
        }
        if (!this._outlineArc) {
            this.createOutlineArc();
        }
        else {
            this._outlineArc.radius = this.getRadius();
        }
        this.circleProps = circleProp;
        this.doneCreation = true;
        this.updateArcsLayer();
        this.updatePointsLayer();
        this.updateCirclesLayer();
    };
    EditableCircle.prototype.addPoint = function (position) {
        if (this.doneCreation) {
            return;
        }
        if (!this._center) {
            this._center = new EditPoint(this.id, position, this.pointProps);
            this._radiusPoint = new EditPoint(this.id, position.clone(), this.pointProps);
            if (!this._outlineArc) {
                this.createOutlineArc();
            }
        }
        this.updateArcsLayer();
        this.updatePointsLayer();
        this.updateCirclesLayer();
    };
    EditableCircle.prototype.addLastPoint = function (position) {
        if (this.doneCreation || !this._center || !this._radiusPoint) {
            return;
        }
        this._radiusPoint.setPosition(position);
        this.doneCreation = true;
        this.updatePointsLayer();
        this.updateCirclesLayer();
    };
    EditableCircle.prototype.movePoint = function (toPosition) {
        if (!this._center || !this._radiusPoint) {
            return;
        }
        this._radiusPoint.setPosition(toPosition);
        this._outlineArc.radius = this.getRadius();
        this.updateArcsLayer();
        this.updatePointsLayer();
        this.updateCirclesLayer();
    };
    EditableCircle.prototype.moveCircle = function (dragStartPosition, dragEndPosition) {
        if (!this.doneCreation) {
            return;
        }
        if (!this.lastDraggedToPosition) {
            this.lastDraggedToPosition = dragStartPosition;
        }
        var radius = this.getRadius();
        var delta = GeoUtilsService.getPositionsDelta(this.lastDraggedToPosition, dragEndPosition);
        GeoUtilsService.addDeltaToPosition(this.getCenter(), delta, true);
        this.radiusPoint.setPosition(GeoUtilsService.pointByLocationDistanceAndAzimuth(this.getCenter(), radius, Math.PI / 2, true));
        this._outlineArc.radius = this.getRadius();
        this.updateArcsLayer();
        this.updatePointsLayer();
        this.updateCirclesLayer();
        this.lastDraggedToPosition = dragEndPosition;
    };
    EditableCircle.prototype.endMovePolygon = function () {
        this.lastDraggedToPosition = undefined;
    };
    EditableCircle.prototype.getRadius = function () {
        if (!this._center || !this._radiusPoint) {
            return 0;
        }
        return GeoUtilsService.distance(this._center.getPosition(), this._radiusPoint.getPosition());
    };
    EditableCircle.prototype.getCenter = function () {
        return this._center ? this._center.getPosition() : undefined;
    };
    EditableCircle.prototype.getRadiusPoint = function () {
        return this._radiusPoint ? this._radiusPoint.getPosition() : undefined;
    };
    EditableCircle.prototype.dispose = function () {
        if (this._center) {
            this.pointsLayer.remove(this._center.getId());
        }
        if (this._radiusPoint) {
            this.pointsLayer.remove(this._radiusPoint.getId());
        }
        if (this._outlineArc) {
            this.arcsLayer.remove(this._outlineArc.getId());
        }
        this.circlesLayer.remove(this.id);
    };
    EditableCircle.prototype.getId = function () {
        return this.id;
    };
    EditableCircle.prototype.updateCirclesLayer = function () {
        this.circlesLayer.update(this, this.id);
    };
    EditableCircle.prototype.updatePointsLayer = function () {
        if (this._center) {
            this.pointsLayer.update(this._center, this._center.getId());
        }
        if (this._radiusPoint) {
            this.pointsLayer.update(this._radiusPoint, this._radiusPoint.getId());
        }
    };
    EditableCircle.prototype.updateArcsLayer = function () {
        if (!this._outlineArc) {
            return;
        }
        this.arcsLayer.update(this._outlineArc, this._outlineArc.getId());
    };
    EditableCircle.prototype.createOutlineArc = function () {
        if (!this._center || !this._radiusPoint) {
            return;
        }
        this._outlineArc = new EditArc(this.id, this.getCenter(), this.getRadius(), Math.PI * 2, 0, this.polylineProps);
    };
    return EditableCircle;
}(AcEntity));

var CirclesManagerService = (function () {
    function CirclesManagerService() {
        this.circles = new Map();
    }
    CirclesManagerService.prototype.createEditableCircle = function (id, editCirclesLayer, editPointsLayer, editArcsLayer, circleOptions) {
        var editableCircle = new EditableCircle(id, editCirclesLayer, editPointsLayer, editArcsLayer, circleOptions);
        this.circles.set(id, editableCircle);
        return editableCircle;
    };
    CirclesManagerService.prototype.dispose = function (id) {
        this.circles.get(id).dispose();
        this.circles.delete(id);
    };
    CirclesManagerService.prototype.get = function (id) {
        return this.circles.get(id);
    };
    CirclesManagerService.prototype.clear = function () {
        this.circles.forEach(function (circle) { return circle.dispose(); });
        this.circles.clear();
    };
    CirclesManagerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    CirclesManagerService.ctorParameters = function () { return []; };
    return CirclesManagerService;
}());

var __assign$3 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var DEFAULT_CIRCLE_OPTIONS = {
    addPointEvent: exports.CesiumEvent.LEFT_CLICK,
    dragPointEvent: exports.CesiumEvent.LEFT_CLICK_DRAG,
    dragShapeEvent: exports.CesiumEvent.LEFT_CLICK_DRAG,
    allowDrag: true,
    circleProps: {
        material: Cesium.Color.GREEN.withAlpha(0.5),
        outline: false,
        outlineWidth: 1,
        outlineColor: Cesium.Color.BLACK,
    },
    pointProps: {
        color: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 1,
        pixelSize: 15,
        virtualPointPixelSize: 8,
        show: true,
        showVirtual: true,
    },
    polylineProps: {
        width: 1,
        material: function () { return Cesium.Color.BLACK; },
    }
};
var CirclesEditorService = (function () {
    function CirclesEditorService() {
        this.updateSubject = new rxjs_Subject.Subject();
        this.updatePublisher = this.updateSubject.publish();
        this.counter = 0;
        this.observablesMap = new Map();
    }
    CirclesEditorService.prototype.init = function (mapEventsManager, coordinateConverter, cameraService, circlesManager) {
        this.mapEventsManager = mapEventsManager;
        this.updatePublisher.connect();
        this.coordinateConverter = coordinateConverter;
        this.cameraService = cameraService;
        this.circlesManager = circlesManager;
    };
    CirclesEditorService.prototype.onUpdate = function () {
        return this.updatePublisher;
    };
    CirclesEditorService.prototype.create = function (options, priority) {
        var _this = this;
        if (options === void 0) { options = DEFAULT_CIRCLE_OPTIONS; }
        if (priority === void 0) { priority = 100; }
        var center = undefined;
        var id = this.generteId();
        var circleOptions = this.setOptions(options);
        var clientEditSubject = new rxjs_BehaviorSubject.BehaviorSubject({
            id: id,
            editAction: null,
            editMode: exports.EditModes.CREATE
        });
        var finishedCreate = false;
        this.updateSubject.next({
            id: id,
            editMode: exports.EditModes.CREATE,
            editAction: exports.EditActions.INIT,
            circleOptions: circleOptions,
        });
        var mouseMoveRegistration = this.mapEventsManager.register({
            event: exports.CesiumEvent.MOUSE_MOVE,
            pick: exports.PickOptions.NO_PICK,
            priority: priority,
        });
        var addPointRegistration = this.mapEventsManager.register({
            event: exports.CesiumEvent.LEFT_CLICK,
            pick: exports.PickOptions.NO_PICK,
            priority: priority,
        });
        this.observablesMap.set(id, [mouseMoveRegistration, addPointRegistration]);
        var editorObservable = this.createEditorObservable(clientEditSubject, id);
        addPointRegistration.subscribe(function (_a) {
            var endPosition = _a.movement.endPosition;
            if (finishedCreate) {
                return;
            }
            var position = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (!position) {
                return;
            }
            if (!center) {
                var update = {
                    id: id,
                    center: position,
                    editMode: exports.EditModes.CREATE,
                    editAction: exports.EditActions.ADD_POINT,
                };
                _this.updateSubject.next(update);
                clientEditSubject.next(__assign$3({}, update, _this.getCircleProperties(id)));
                center = position;
            }
            else {
                var update = {
                    id: id,
                    center: center,
                    radiusPoint: position,
                    editMode: exports.EditModes.CREATE,
                    editAction: exports.EditActions.ADD_LAST_POINT,
                };
                _this.updateSubject.next(update);
                clientEditSubject.next(__assign$3({}, update, _this.getCircleProperties(id)));
                var changeMode = {
                    id: id,
                    center: center,
                    radiusPoint: position,
                    editMode: exports.EditModes.CREATE,
                    editAction: exports.EditActions.CHANGE_TO_EDIT,
                };
                _this.updateSubject.next(changeMode);
                clientEditSubject.next(__assign$3({}, update, _this.getCircleProperties(id)));
                if (_this.observablesMap.has(id)) {
                    _this.observablesMap.get(id).forEach(function (registration) { return registration.dispose(); });
                }
                _this.observablesMap.delete(id);
                _this.editCircle(id, priority, clientEditSubject, circleOptions, editorObservable);
                finishedCreate = true;
            }
        });
        mouseMoveRegistration.subscribe(function (_a) {
            var endPosition = _a.movement.endPosition;
            if (!center) {
                return;
            }
            var position = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (position) {
                var update = {
                    id: id,
                    center: center,
                    radiusPoint: position,
                    editMode: exports.EditModes.CREATE,
                    editAction: exports.EditActions.MOUSE_MOVE,
                };
                _this.updateSubject.next(update);
                clientEditSubject.next(__assign$3({}, update, _this.getCircleProperties(id)));
            }
        });
        return editorObservable;
    };
    CirclesEditorService.prototype.edit = function (center, radius, options, priority) {
        if (options === void 0) { options = DEFAULT_CIRCLE_OPTIONS; }
        if (priority === void 0) { priority = 100; }
        var id = this.generteId();
        var circleOptions = this.setOptions(options);
        var editSubject = new rxjs_BehaviorSubject.BehaviorSubject({
            id: id,
            editAction: null,
            editMode: exports.EditModes.EDIT
        });
        var radiusPoint = GeoUtilsService.pointByLocationDistanceAndAzimuth(center, radius, Math.PI / 2, true);
        var update = {
            id: id,
            center: center,
            radiusPoint: radiusPoint,
            editMode: exports.EditModes.EDIT,
            editAction: exports.EditActions.INIT,
            circleOptions: circleOptions,
        };
        this.updateSubject.next(update);
        editSubject.next(__assign$3({}, update, this.getCircleProperties(id)));
        return this.editCircle(id, priority, editSubject, circleOptions);
    };
    CirclesEditorService.prototype.editCircle = function (id, priority, editSubject, options, editObservable) {
        var _this = this;
        var pointDragRegistration = this.mapEventsManager.register({
            event: exports.CesiumEvent.LEFT_CLICK_DRAG,
            entityType: EditPoint,
            pick: exports.PickOptions.PICK_FIRST,
            priority: priority,
        });
        var shapeDragRegistration;
        if (options.allowDrag) {
            shapeDragRegistration = this.mapEventsManager.register({
                event: exports.CesiumEvent.LEFT_CLICK_DRAG,
                entityType: EditableCircle,
                pick: exports.PickOptions.PICK_FIRST,
                priority: priority,
            });
        }
        pointDragRegistration
            .do(function (_a) {
            var drop = _a.movement.drop;
            return _this.cameraService.enableInputs(drop);
        })
            .subscribe(function (_a) {
            var _b = _a.movement, endPosition = _b.endPosition, startPosition = _b.startPosition, drop = _b.drop, entities = _a.entities;
            var startDragPosition = _this.coordinateConverter.screenToCartesian3(startPosition);
            var endDragPosition = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (!endDragPosition) {
                return;
            }
            var point = entities[0];
            var pointIsCenter = point === _this.getCenterPoint(id);
            var editAction;
            if (drop) {
                editAction = pointIsCenter ? exports.EditActions.DRAG_SHAPE_FINISH : exports.EditActions.DRAG_POINT_FINISH;
            }
            else {
                editAction = pointIsCenter ? exports.EditActions.DRAG_SHAPE : exports.EditActions.DRAG_POINT;
            }
            if (!options.allowDrag && (editAction === exports.EditActions.DRAG_SHAPE || editAction === exports.EditActions.DRAG_SHAPE_FINISH)) {
                _this.cameraService.enableInputs(true);
                return;
            }
            var update = {
                id: id,
                center: _this.getCenterPosition(id),
                radiusPoint: _this.getRadiusPosition(id),
                startDragPosition: startDragPosition,
                endDragPosition: endDragPosition,
                editMode: exports.EditModes.EDIT,
                editAction: editAction,
            };
            _this.updateSubject.next(update);
            editSubject.next(__assign$3({}, update, _this.getCircleProperties(id)));
        });
        if (shapeDragRegistration) {
            shapeDragRegistration
                .do(function (_a) {
                var drop = _a.movement.drop;
                return _this.cameraService.enableInputs(drop);
            })
                .subscribe(function (_a) {
                var _b = _a.movement, startPosition = _b.startPosition, endPosition = _b.endPosition, drop = _b.drop;
                var startDragPosition = _this.coordinateConverter.screenToCartesian3(startPosition);
                var endDragPosition = _this.coordinateConverter.screenToCartesian3(endPosition);
                if (!endDragPosition || !startDragPosition) {
                    return;
                }
                var update = {
                    id: id,
                    center: _this.getCenterPosition(id),
                    radiusPoint: _this.getRadiusPosition(id),
                    startDragPosition: startDragPosition,
                    endDragPosition: endDragPosition,
                    editMode: exports.EditModes.EDIT,
                    editAction: drop ? exports.EditActions.DRAG_SHAPE_FINISH : exports.EditActions.DRAG_SHAPE,
                };
                _this.updateSubject.next(update);
                editSubject.next(__assign$3({}, update, _this.getCircleProperties(id)));
            });
        }
        var observables = [pointDragRegistration];
        if (shapeDragRegistration) {
            observables.push(shapeDragRegistration);
        }
        this.observablesMap.set(id, observables);
        return editObservable || this.createEditorObservable(editSubject, id);
    };
    CirclesEditorService.prototype.createEditorObservable = function (observableToExtend, id) {
        var _this = this;
        observableToExtend.dispose = function () {
            var observables = _this.observablesMap.get(id);
            if (observables) {
                observables.forEach(function (obs) { return obs.dispose(); });
            }
            _this.observablesMap.delete(id);
            _this.updateSubject.next({
                id: id,
                center: _this.getCenterPosition(id),
                radiusPoint: _this.getRadiusPosition(id),
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.DISPOSE,
            });
        };
        observableToExtend.enable = function () {
            _this.updateSubject.next({
                id: id,
                center: _this.getCenterPosition(id),
                radiusPoint: _this.getRadiusPosition(id),
                editMode: exports.EditModes.EDIT,
                editAction: exports.EditActions.ENABLE,
            });
        };
        observableToExtend.disable = function () {
            _this.updateSubject.next({
                id: id,
                center: _this.getCenterPosition(id),
                radiusPoint: _this.getRadiusPosition(id),
                editMode: exports.EditModes.EDIT,
                editAction: exports.EditActions.DISABLE,
            });
        };
        observableToExtend.setManually = function (center, radius, centerPointProp, radiusPointProp, circleProp) {
            var radiusPoint = GeoUtilsService.pointByLocationDistanceAndAzimuth(center, radius, Math.PI / 2, true);
            var circle = _this.circlesManager.get(id);
            circle.setManually(center, radiusPoint, centerPointProp, radiusPointProp, circleProp);
            _this.updateSubject.next({
                id: id,
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.SET_MANUALLY,
            });
        };
        observableToExtend.setLabelsRenderFn = function (callback) {
            _this.updateSubject.next({
                id: id,
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.SET_EDIT_LABELS_RENDER_CALLBACK,
                labelsRenderFn: callback,
            });
        };
        observableToExtend.updateLabels = function (labels) {
            _this.updateSubject.next({
                id: id,
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.UPDATE_EDIT_LABELS,
                updateLabels: labels,
            });
        };
        observableToExtend.getEditValue = function () { return observableToExtend.getValue(); };
        observableToExtend.getLabels = function () { return _this.circlesManager.get(id).labels; };
        observableToExtend.getCenter = function () { return _this.getCenterPosition(id); };
        observableToExtend.getRadius = function () { return _this.getRadius(id); };
        return observableToExtend;
    };
    CirclesEditorService.prototype.setOptions = function (options) {
        var defaultClone = JSON.parse(JSON.stringify(DEFAULT_CIRCLE_OPTIONS));
        var circleOptions = Object.assign(defaultClone, options);
        circleOptions.pointProps = Object.assign({}, DEFAULT_CIRCLE_OPTIONS.pointProps, options.pointProps);
        circleOptions.circleProps = Object.assign({}, DEFAULT_CIRCLE_OPTIONS.circleProps, options.circleProps);
        circleOptions.polylineProps = Object.assign({}, DEFAULT_CIRCLE_OPTIONS.polylineProps, options.polylineProps);
        return circleOptions;
    };
    CirclesEditorService.prototype.getCenterPosition = function (id) {
        return this.circlesManager.get(id).getCenter();
    };
    CirclesEditorService.prototype.getCenterPoint = function (id) {
        return this.circlesManager.get(id).center;
    };
    CirclesEditorService.prototype.getRadiusPosition = function (id) {
        return this.circlesManager.get(id).getRadiusPoint();
    };
    CirclesEditorService.prototype.getRadius = function (id) {
        return this.circlesManager.get(id).getRadius();
    };
    CirclesEditorService.prototype.getCircleProperties = function (id) {
        var circle = this.circlesManager.get(id);
        return {
            center: circle.getCenter(),
            radiusPoint: circle.getRadiusPoint(),
            radius: circle.getRadius()
        };
    };
    CirclesEditorService.prototype.generteId = function () {
        return 'edit-circle-' + this.counter++;
    };
    CirclesEditorService.decorators = [
        { type: _angular_core.Injectable },
    ];
    CirclesEditorService.ctorParameters = function () { return []; };
    return CirclesEditorService;
}());

var CirclesEditorComponent = (function () {
    function CirclesEditorComponent(circlesEditor, coordinateConverter, mapEventsManager, cameraService, circlesManager) {
        this.circlesEditor = circlesEditor;
        this.coordinateConverter = coordinateConverter;
        this.mapEventsManager = mapEventsManager;
        this.cameraService = cameraService;
        this.circlesManager = circlesManager;
        this.Cesium = Cesium;
        this.editPoints$ = new rxjs_Subject.Subject();
        this.editCircles$ = new rxjs_Subject.Subject();
        this.editArcs$ = new rxjs_Subject.Subject();
        this.circlesEditor.init(this.mapEventsManager, this.coordinateConverter, this.cameraService, this.circlesManager);
        this.startListeningToEditorUpdates();
    }
    CirclesEditorComponent.prototype.startListeningToEditorUpdates = function () {
        var _this = this;
        this.circlesEditor.onUpdate().subscribe(function (update) {
            if (update.editMode === exports.EditModes.CREATE || update.editMode === exports.EditModes.CREATE_OR_EDIT) {
                _this.handleCreateUpdates(update);
            }
            else if (update.editMode === exports.EditModes.EDIT) {
                _this.handleEditUpdates(update);
            }
        });
    };
    CirclesEditorComponent.prototype.getLabelId = function (element, index) {
        return index.toString();
    };
    CirclesEditorComponent.prototype.renderEditLabels = function (circle, update, labels) {
        update.center = circle.getCenter();
        update.radiusPoint = circle.getRadiusPoint();
        update.radius = circle.getRadius();
        if (labels) {
            circle.labels = labels;
            this.editCirclesLayer.update(circle, circle.getId());
            return;
        }
        if (!this.editLabelsRenderFn) {
            return;
        }
        circle.labels = this.editLabelsRenderFn(update, circle.labels);
        this.editCirclesLayer.update(circle, circle.getId());
    };
    CirclesEditorComponent.prototype.removeEditLabels = function (circle) {
        circle.labels = [];
        this.editCirclesLayer.update(circle, circle.getId());
    };
    CirclesEditorComponent.prototype.handleCreateUpdates = function (update) {
        switch (update.editAction) {
            case exports.EditActions.INIT: {
                this.circlesManager.createEditableCircle(update.id, this.editCirclesLayer, this.editPointsLayer, this.editArcsLayer, update.circleOptions);
                break;
            }
            case exports.EditActions.MOUSE_MOVE: {
                var circle = this.circlesManager.get(update.id);
                if (update.radiusPoint) {
                    circle.movePoint(update.radiusPoint);
                    this.renderEditLabels(circle, update);
                }
                break;
            }
            case exports.EditActions.ADD_POINT: {
                var circle = this.circlesManager.get(update.id);
                if (update.center) {
                    circle.addPoint(update.center);
                    this.renderEditLabels(circle, update);
                }
                break;
            }
            case exports.EditActions.ADD_LAST_POINT: {
                var circle = this.circlesManager.get(update.id);
                if (update.radiusPoint) {
                    circle.addLastPoint(update.radiusPoint);
                    this.renderEditLabels(circle, update);
                }
                break;
            }
            case exports.EditActions.DISPOSE: {
                var circle = this.circlesManager.get(update.id);
                this.removeEditLabels(circle);
                this.circlesManager.dispose(update.id);
                break;
            }
            case exports.EditActions.SET_EDIT_LABELS_RENDER_CALLBACK: {
                var circle = this.circlesManager.get(update.id);
                this.editLabelsRenderFn = update.labelsRenderFn;
                this.renderEditLabels(circle, update);
                break;
            }
            case exports.EditActions.UPDATE_EDIT_LABELS: {
                var circle = this.circlesManager.get(update.id);
                this.renderEditLabels(circle, update, update.updateLabels);
                break;
            }
            case exports.EditActions.SET_MANUALLY: {
                var circle = this.circlesManager.get(update.id);
                this.renderEditLabels(circle, update, update.updateLabels);
                break;
            }
            default: {
                return;
            }
        }
    };
    CirclesEditorComponent.prototype.handleEditUpdates = function (update) {
        switch (update.editAction) {
            case exports.EditActions.INIT: {
                var circle = this.circlesManager.createEditableCircle(update.id, this.editCirclesLayer, this.editPointsLayer, this.editArcsLayer, update.circleOptions);
                circle.setManually(update.center, update.radiusPoint);
                break;
            }
            case exports.EditActions.DRAG_POINT_FINISH:
            case exports.EditActions.DRAG_POINT: {
                var circle = this.circlesManager.get(update.id);
                if (circle && circle.enableEdit) {
                    circle.movePoint(update.endDragPosition);
                    this.renderEditLabels(circle, update);
                }
                break;
            }
            case exports.EditActions.DRAG_SHAPE: {
                var circle = this.circlesManager.get(update.id);
                if (circle && circle.enableEdit) {
                    circle.moveCircle(update.startDragPosition, update.endDragPosition);
                }
                break;
            }
            case exports.EditActions.DRAG_SHAPE_FINISH: {
                var circle = this.circlesManager.get(update.id);
                if (circle && circle.enableEdit) {
                    circle.endMovePolygon();
                    this.renderEditLabels(circle, update);
                }
                break;
            }
            case exports.EditActions.DISABLE: {
                var circle = this.circlesManager.get(update.id);
                if (circle) {
                    circle.enableEdit = false;
                    this.renderEditLabels(circle, update);
                }
                break;
            }
            case exports.EditActions.ENABLE: {
                var circle = this.circlesManager.get(update.id);
                if (circle) {
                    circle.enableEdit = true;
                    this.renderEditLabels(circle, update);
                }
                break;
            }
            default: {
                return;
            }
        }
    };
    CirclesEditorComponent.prototype.ngOnDestroy = function () {
        this.circlesManager.clear();
    };
    CirclesEditorComponent.prototype.getPointSize = function (point) {
        return point.isVirtualEditPoint() ? point.props.virtualPointPixelSize : point.props.pixelSize;
    };
    CirclesEditorComponent.prototype.getPointShow = function (point) {
        return point.show && (point.isVirtualEditPoint() ? point.props.showVirtual : point.props.show);
    };
    CirclesEditorComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'circles-editor',
                    template: `<ac-layer #editArcsLayer acFor="let arc of editArcs$" [context]="this" [zIndex]="1">
    <ac-arc-desc props="{
        angle: arc.angle,
        delta: arc.delta,
        center: arc.center,
        radius: arc.radius,
        quality: 30,
        color: arc.props.material()
    }">
    </ac-arc-desc>
</ac-layer>

<ac-layer #editPointsLayer acFor="let point of editPoints$" [context]="this" [zIndex]="2">
    <ac-point-desc props="{
        position: point.getPosition(),
        pixelSize: getPointSize(point),
        color: point.props.color,
        outlineColor: point.props.outlineColor,
        outlineWidth: point.props.outlineWidth,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        show: getPointShow(point)
    }">
    </ac-point-desc>
</ac-layer>

<ac-layer #editCirclesLayer acFor="let circle of editCircles$" [context]="this" [zIndex]="0">
    <ac-ellipse-desc props="{
        position: circle.getCenter(),
        semiMajorAxis: circle.getRadius(),
        semiMinorAxis: circle.getRadius(),
        material: circle.circleProps.material,
        outline: circle.circleProps.outline,
        height: 0
    }">
    </ac-ellipse-desc>

    <ac-array-desc acFor="let label of circle.labels" [idGetter]="getLabelId">
        <ac-label-primitive-desc props="{
            position: label.position,
            backgroundColor: label.backgroundColor,
            backgroundPadding: label.backgroundPadding,
            distanceDisplayCondition: label.distanceDisplayCondition,
            eyeOffset: label.eyeOffset,
            fillColor: label.fillColor,
            font: label.font,
            heightReference: label.heightReference,
            horizontalOrigin: label.horizontalOrigin,
            outlineColor: label.outlineColor,
            outlineWidth: label.outlineWidth,
            pixelOffset: label.pixelOffset,
            pixelOffsetScaleByDistance: label.pixelOffsetScaleByDistance,
            scale: label.scale,
            scaleByDistance: label.scaleByDistance,
            show: label.show,
            showBackground: label.showBackground,
            style: label.style,
            text: label.text,
            translucencyByDistance: label.translucencyByDistance,
            verticalOrigin: label.verticalOrigin
        }">
        </ac-label-primitive-desc>
    </ac-array-desc>
</ac-layer>`,
                    providers: [CoordinateConverter, CirclesManagerService]
                },] },
    ];
    CirclesEditorComponent.ctorParameters = function () { return [
        { type: CirclesEditorService, },
        { type: CoordinateConverter, },
        { type: MapEventsManagerService, },
        { type: CameraService, },
        { type: CirclesManagerService, },
    ]; };
    CirclesEditorComponent.propDecorators = {
        'editCirclesLayer': [{ type: _angular_core.ViewChild, args: ['editCirclesLayer',] },],
        'editArcsLayer': [{ type: _angular_core.ViewChild, args: ['editArcsLayer',] },],
        'editPointsLayer': [{ type: _angular_core.ViewChild, args: ['editPointsLayer',] },],
    };
    return CirclesEditorComponent;
}());

var __extends$74 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EditablePolyline = (function (_super) {
    __extends$74(EditablePolyline, _super);
    function EditablePolyline(id, pointsLayer, polylinesLayer, coordinateConverter, editOptions, positions) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.pointsLayer = pointsLayer;
        _this.polylinesLayer = polylinesLayer;
        _this.coordinateConverter = coordinateConverter;
        _this.editOptions = editOptions;
        _this.positions = [];
        _this.polylines = [];
        _this.doneCreation = false;
        _this._enableEdit = true;
        _this._labels = [];
        _this._pointProps = editOptions.pointProps;
        _this.props = editOptions.polylineProps;
        if (positions && positions.length >= 2) {
            _this.createFromExisting(positions);
        }
        return _this;
    }
    Object.defineProperty(EditablePolyline.prototype, "labels", {
        get: function () {
            return this._labels;
        },
        set: function (labels) {
            if (!labels) {
                return;
            }
            var positions = this.getRealPositions();
            this._labels = labels.map(function (label, index) {
                if (!label.position) {
                    label.position = positions[index];
                }
                return Object.assign({}, defaultLabelProps, label);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditablePolyline.prototype, "props", {
        get: function () {
            return this.polylineProps;
        },
        set: function (value) {
            this.polylineProps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditablePolyline.prototype, "pointProps", {
        get: function () {
            return this._pointProps;
        },
        set: function (value) {
            this._pointProps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditablePolyline.prototype, "enableEdit", {
        get: function () {
            return this._enableEdit;
        },
        set: function (value) {
            var _this = this;
            this._enableEdit = value;
            this.positions.forEach(function (point) {
                point.show = value;
                _this.updatePointsLayer(false, point);
            });
        },
        enumerable: true,
        configurable: true
    });
    EditablePolyline.prototype.createFromExisting = function (positions) {
        var _this = this;
        positions.forEach(function (position) {
            _this.addPointFromExisting(position);
        });
        this.addAllVirtualEditPoints();
        this.doneCreation = true;
    };
    EditablePolyline.prototype.setManually = function (points, polylineProps) {
        var _this = this;
        if (!this.doneCreation) {
            throw new Error('Update manually only in edit mode, after polyline is created');
        }
        this.positions.forEach(function (p) { return _this.pointsLayer.remove(p.getId()); });
        var newPoints = [];
        for (var i = 0; i < points.length; i++) {
            var pointOrCartesian = points[i];
            var newPoint = null;
            if (pointOrCartesian.pointProps) {
                newPoint = new EditPoint(this.id, pointOrCartesian.position, pointOrCartesian.pointProps);
            }
            else {
                newPoint = new EditPoint(this.id, pointOrCartesian, this._pointProps);
            }
            newPoints.push(newPoint);
        }
        this.positions = newPoints;
        this.polylineProps = polylineProps ? polylineProps : this.polylineProps;
        this.updatePointsLayer.apply(this, [true].concat(this.positions));
        this.addAllVirtualEditPoints();
    };
    EditablePolyline.prototype.addAllVirtualEditPoints = function () {
        var _this = this;
        var currentPoints = this.positions.slice();
        currentPoints.forEach(function (pos, index) {
            if (index !== currentPoints.length - 1) {
                var currentPoint = pos;
                var nextIndex = (index + 1) % (currentPoints.length);
                var nextPoint = currentPoints[nextIndex];
                var midPoint = _this.setMiddleVirtualPoint(currentPoint, nextPoint);
                _this.updatePointsLayer(false, midPoint);
            }
        });
    };
    EditablePolyline.prototype.setMiddleVirtualPoint = function (firstP, secondP) {
        var currentCart = Cesium.Cartographic.fromCartesian(firstP.getPosition());
        var nextCart = Cesium.Cartographic.fromCartesian(secondP.getPosition());
        var midPointCartesian3 = this.coordinateConverter.midPointToCartesian3(currentCart, nextCart);
        var midPoint = new EditPoint(this.id, midPointCartesian3, this._pointProps);
        midPoint.setVirtualEditPoint(true);
        var firstIndex = this.positions.indexOf(firstP);
        this.positions.splice(firstIndex + 1, 0, midPoint);
        return midPoint;
    };
    EditablePolyline.prototype.updateMiddleVirtualPoint = function (virtualEditPoint, prevPoint, nextPoint) {
        var prevPointCart = Cesium.Cartographic.fromCartesian(prevPoint.getPosition());
        var nextPointCart = Cesium.Cartographic.fromCartesian(nextPoint.getPosition());
        virtualEditPoint.setPosition(this.coordinateConverter.midPointToCartesian3(prevPointCart, nextPointCart));
    };
    EditablePolyline.prototype.changeVirtualPointToRealPoint = function (point) {
        point.setVirtualEditPoint(false);
        var pointsCount = this.positions.length;
        var pointIndex = this.positions.indexOf(point);
        var nextIndex = (pointIndex + 1) % (pointsCount);
        var preIndex = ((pointIndex - 1) + pointsCount) % pointsCount;
        var nextPoint = this.positions[nextIndex];
        var prePoint = this.positions[preIndex];
        var firstMidPoint = this.setMiddleVirtualPoint(prePoint, point);
        var secMidPoint = this.setMiddleVirtualPoint(point, nextPoint);
        this.updatePointsLayer(false, firstMidPoint, secMidPoint, point);
    };
    EditablePolyline.prototype.renderPolylines = function () {
        var _this = this;
        this.polylines.forEach(function (polyline) { return _this.polylinesLayer.remove(polyline.getId()); });
        this.polylines = [];
        var realPoints = this.positions.filter(function (point) { return !point.isVirtualEditPoint(); });
        realPoints.forEach(function (point, index) {
            if (index !== realPoints.length - 1) {
                var nextIndex = (index + 1);
                var nextPoint = realPoints[nextIndex];
                var polyline = new EditPolyline(_this.id, point.getPosition(), nextPoint.getPosition(), _this.polylineProps);
                _this.polylines.push(polyline);
                _this.polylinesLayer.update(polyline, polyline.getId());
            }
        });
    };
    EditablePolyline.prototype.addPointFromExisting = function (position) {
        var newPoint = new EditPoint(this.id, position, this._pointProps);
        this.positions.push(newPoint);
        this.updatePointsLayer(true, newPoint);
    };
    EditablePolyline.prototype.addPoint = function (position) {
        if (this.doneCreation) {
            return;
        }
        var isFirstPoint = !this.positions.length;
        if (isFirstPoint) {
            var firstPoint = new EditPoint(this.id, position, this._pointProps);
            this.positions.push(firstPoint);
            this.updatePointsLayer(true, firstPoint);
        }
        this.movingPoint = new EditPoint(this.id, position.clone(), this._pointProps);
        this.positions.push(this.movingPoint);
        this.updatePointsLayer(true, this.movingPoint);
    };
    EditablePolyline.prototype.movePoint = function (toPosition, editPoint) {
        editPoint.setPosition(toPosition);
        if (this.doneCreation) {
            if (editPoint.isVirtualEditPoint()) {
                this.changeVirtualPointToRealPoint(editPoint);
            }
            var pointsCount = this.positions.length;
            var pointIndex = this.positions.indexOf(editPoint);
            if (pointIndex < this.positions.length - 1) {
                var nextVirtualPoint = this.positions[(pointIndex + 1) % (pointsCount)];
                var nextRealPoint = this.positions[(pointIndex + 2) % (pointsCount)];
                this.updateMiddleVirtualPoint(nextVirtualPoint, editPoint, nextRealPoint);
                this.updatePointsLayer(false, nextVirtualPoint);
            }
            if (pointIndex > 0) {
                var prevVirtualPoint = this.positions[((pointIndex - 1) + pointsCount) % pointsCount];
                var prevRealPoint = this.positions[((pointIndex - 2) + pointsCount) % pointsCount];
                this.updateMiddleVirtualPoint(prevVirtualPoint, editPoint, prevRealPoint);
                this.updatePointsLayer(false, prevVirtualPoint);
            }
        }
        this.updatePointsLayer(true, editPoint);
    };
    EditablePolyline.prototype.moveTempMovingPoint = function (toPosition) {
        if (this.movingPoint) {
            this.movePoint(toPosition, this.movingPoint);
        }
    };
    EditablePolyline.prototype.moveShape = function (startMovingPosition, draggedToPosition) {
        if (!this.doneCreation) {
            return;
        }
        if (!this.lastDraggedToPosition) {
            this.lastDraggedToPosition = startMovingPosition;
        }
        var delta = GeoUtilsService.getPositionsDelta(this.lastDraggedToPosition, draggedToPosition);
        this.positions.forEach(function (point) {
            GeoUtilsService.addDeltaToPosition(point.getPosition(), delta, true);
        });
        this.updatePointsLayer.apply(this, [true].concat(this.positions));
        this.lastDraggedToPosition = draggedToPosition;
    };
    EditablePolyline.prototype.endMoveShape = function () {
        this.lastDraggedToPosition = undefined;
        this.updatePointsLayer.apply(this, [true].concat(this.positions));
    };
    EditablePolyline.prototype.removePoint = function (pointToRemove) {
        var _this = this;
        this.removePosition(pointToRemove);
        this.positions
            .filter(function (p) { return p.isVirtualEditPoint(); })
            .forEach(function (p) { return _this.removePosition(p); });
        this.addAllVirtualEditPoints();
        this.renderPolylines();
    };
    EditablePolyline.prototype.addLastPoint = function (position) {
        this.doneCreation = true;
        this.removePosition(this.movingPoint);
        this.movingPoint = null;
        this.addAllVirtualEditPoints();
    };
    EditablePolyline.prototype.getRealPositions = function () {
        return this.getRealPoints()
            .map(function (position) { return position.getPosition(); });
    };
    EditablePolyline.prototype.getRealPoints = function () {
        var _this = this;
        return this.positions
            .filter(function (position) { return !position.isVirtualEditPoint() && position !== _this.movingPoint; });
    };
    EditablePolyline.prototype.getPositions = function () {
        return this.positions.map(function (position) { return position.getPosition(); });
    };
    EditablePolyline.prototype.removePosition = function (point) {
        var index = this.positions.findIndex(function (p) { return p === point; });
        if (index < 0) {
            return;
        }
        this.positions.splice(index, 1);
        this.pointsLayer.remove(point.getId());
    };
    EditablePolyline.prototype.updatePointsLayer = function (renderPolylines) {
        var _this = this;
        if (renderPolylines === void 0) { renderPolylines = true; }
        var point = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            point[_i - 1] = arguments[_i];
        }
        if (renderPolylines) {
            this.renderPolylines();
        }
        point.forEach(function (p) { return _this.pointsLayer.update(p, p.getId()); });
    };
    EditablePolyline.prototype.update = function () {
        this.updatePointsLayer();
    };
    EditablePolyline.prototype.dispose = function () {
        var _this = this;
        this.positions.forEach(function (editPoint) {
            _this.pointsLayer.remove(editPoint.getId());
        });
        this.polylines.forEach(function (line) { return _this.polylinesLayer.remove(line.getId()); });
        if (this.movingPoint) {
            this.pointsLayer.remove(this.movingPoint.getId());
            this.movingPoint = undefined;
        }
        this.positions.length = 0;
    };
    EditablePolyline.prototype.getPointsCount = function () {
        return this.positions.length;
    };
    EditablePolyline.prototype.getId = function () {
        return this.id;
    };
    return EditablePolyline;
}(AcEntity));

var __extends$75 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EditorObservable = (function (_super) {
    __extends$75(EditorObservable, _super);
    function EditorObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EditorObservable;
}(rxjs_Observable.Observable));

var __extends$76 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PolygonEditorObservable = (function (_super) {
    __extends$76(PolygonEditorObservable, _super);
    function PolygonEditorObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PolygonEditorObservable;
}(EditorObservable));

var __extends$77 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CircleEditorObservable = (function (_super) {
    __extends$77(CircleEditorObservable, _super);
    function CircleEditorObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CircleEditorObservable;
}(EditorObservable));

var __assign$4 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var DEFAULT_POLYLINE_OPTIONS = {
    addPointEvent: exports.CesiumEvent.LEFT_CLICK,
    addLastPointEvent: exports.CesiumEvent.LEFT_DOUBLE_CLICK,
    removePointEvent: exports.CesiumEvent.RIGHT_CLICK,
    dragPointEvent: exports.CesiumEvent.LEFT_CLICK_DRAG,
    dragShapeEvent: exports.CesiumEvent.LEFT_CLICK_DRAG,
    allowDrag: true,
    pointProps: {
        color: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 1,
        pixelSize: 15,
        virtualPointPixelSize: 8,
        show: true,
        showVirtual: true,
    },
    polylineProps: {
        material: function () { return Cesium.Color.BLACK; },
        width: 3,
    },
};
var PolylinesEditorService = (function () {
    function PolylinesEditorService() {
        this.updateSubject = new rxjs_Subject.Subject();
        this.updatePublisher = this.updateSubject.publish();
        this.counter = 0;
        this.observablesMap = new Map();
    }
    PolylinesEditorService.prototype.init = function (mapEventsManager, coordinateConverter, cameraService, polylinesManager) {
        this.mapEventsManager = mapEventsManager;
        this.updatePublisher.connect();
        this.coordinateConverter = coordinateConverter;
        this.cameraService = cameraService;
        this.polylinesManager = polylinesManager;
    };
    PolylinesEditorService.prototype.onUpdate = function () {
        return this.updatePublisher;
    };
    PolylinesEditorService.prototype.create = function (options, eventPriority) {
        var _this = this;
        if (options === void 0) { options = DEFAULT_POLYLINE_OPTIONS; }
        if (eventPriority === void 0) { eventPriority = 100; }
        var positions = [];
        var id = this.generteId();
        var polylineOptions = this.setOptions(options);
        var clientEditSubject = new rxjs_BehaviorSubject.BehaviorSubject({
            id: id,
            editAction: null,
            editMode: exports.EditModes.CREATE
        });
        var finishedCreate = false;
        this.updateSubject.next({
            id: id,
            positions: positions,
            editMode: exports.EditModes.CREATE,
            editAction: exports.EditActions.INIT,
            polylineOptions: polylineOptions,
        });
        var mouseMoveRegistration = this.mapEventsManager.register({
            event: exports.CesiumEvent.MOUSE_MOVE,
            pick: exports.PickOptions.NO_PICK,
            priority: eventPriority,
        });
        var addPointRegistration = this.mapEventsManager.register({
            event: polylineOptions.addPointEvent,
            pick: exports.PickOptions.NO_PICK,
            priority: eventPriority,
        });
        var addLastPointRegistration = this.mapEventsManager.register({
            event: polylineOptions.addLastPointEvent,
            pick: exports.PickOptions.NO_PICK,
            priority: eventPriority,
        });
        this.observablesMap.set(id, [mouseMoveRegistration, addPointRegistration, addLastPointRegistration]);
        var editorObservable = this.createEditorObservable(clientEditSubject, id);
        mouseMoveRegistration.subscribe(function (_a) {
            var endPosition = _a.movement.endPosition;
            var position = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (position) {
                _this.updateSubject.next({
                    id: id,
                    positions: _this.getPositions(id),
                    editMode: exports.EditModes.CREATE,
                    updatedPosition: position,
                    editAction: exports.EditActions.MOUSE_MOVE,
                });
            }
        });
        addPointRegistration.subscribe(function (_a) {
            var endPosition = _a.movement.endPosition;
            if (finishedCreate) {
                return;
            }
            var position = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (!position) {
                return;
            }
            var allPositions = _this.getPositions(id);
            if (allPositions.find(function (cartesian) { return cartesian.equals(position); })) {
                return;
            }
            var updateValue = {
                id: id,
                positions: allPositions,
                editMode: exports.EditModes.CREATE,
                updatedPosition: position,
                editAction: exports.EditActions.ADD_POINT,
            };
            _this.updateSubject.next(updateValue);
            clientEditSubject.next(__assign$4({}, updateValue, { positions: _this.getPositions(id), points: _this.getPoints(id) }));
            if (polylineOptions.maximumNumberOfPoints && allPositions.length + 1 === polylineOptions.maximumNumberOfPoints) {
                var update = {
                    id: id,
                    positions: _this.getPositions(id),
                    editMode: exports.EditModes.CREATE,
                    updatedPosition: position,
                    editAction: exports.EditActions.ADD_LAST_POINT,
                };
                _this.updateSubject.next(update);
                clientEditSubject.next(__assign$4({}, update, { positions: _this.getPositions(id), points: _this.getPoints(id) }));
                var changeMode = {
                    id: id,
                    editMode: exports.EditModes.CREATE,
                    editAction: exports.EditActions.CHANGE_TO_EDIT,
                };
                _this.updateSubject.next(changeMode);
                clientEditSubject.next(changeMode);
                if (_this.observablesMap.has(id)) {
                    _this.observablesMap.get(id).forEach(function (registration) { return registration.dispose(); });
                }
                _this.observablesMap.delete(id);
                _this.editPolyline(id, positions, eventPriority, clientEditSubject, polylineOptions, editorObservable);
                finishedCreate = true;
            }
        });
        addLastPointRegistration.subscribe(function (_a) {
            var endPosition = _a.movement.endPosition;
            var position = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (!position) {
                return;
            }
            var updateValue = {
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.CREATE,
                updatedPosition: position,
                editAction: exports.EditActions.ADD_LAST_POINT,
            };
            _this.updateSubject.next(updateValue);
            clientEditSubject.next(__assign$4({}, updateValue, { positions: _this.getPositions(id), points: _this.getPoints(id) }));
            var changeMode = {
                id: id,
                editMode: exports.EditModes.CREATE,
                editAction: exports.EditActions.CHANGE_TO_EDIT,
            };
            _this.updateSubject.next(changeMode);
            clientEditSubject.next(changeMode);
            if (_this.observablesMap.has(id)) {
                _this.observablesMap.get(id).forEach(function (registration) { return registration.dispose(); });
            }
            _this.observablesMap.delete(id);
            _this.editPolyline(id, positions, eventPriority, clientEditSubject, polylineOptions, editorObservable);
            finishedCreate = true;
        });
        return editorObservable;
    };
    PolylinesEditorService.prototype.edit = function (positions, options, priority) {
        if (options === void 0) { options = DEFAULT_POLYLINE_OPTIONS; }
        if (priority === void 0) { priority = 100; }
        if (positions.length < 2) {
            throw new Error('Polylines editor error edit(): polyline should have at least 2 positions');
        }
        var id = this.generteId();
        var polylineOptions = this.setOptions(options);
        var editSubject = new rxjs_BehaviorSubject.BehaviorSubject({
            id: id,
            editAction: null,
            editMode: exports.EditModes.EDIT
        });
        var update = {
            id: id,
            positions: positions,
            editMode: exports.EditModes.EDIT,
            editAction: exports.EditActions.INIT,
            polylineOptions: polylineOptions,
        };
        this.updateSubject.next(update);
        editSubject.next(__assign$4({}, update, { positions: this.getPositions(id), points: this.getPoints(id) }));
        return this.editPolyline(id, positions, priority, editSubject, polylineOptions);
    };
    PolylinesEditorService.prototype.editPolyline = function (id, positions, priority, editSubject, options, editObservable) {
        var _this = this;
        var pointDragRegistration = this.mapEventsManager.register({
            event: options.dragPointEvent,
            entityType: EditPoint,
            pick: exports.PickOptions.PICK_FIRST,
            priority: priority,
        });
        var pointRemoveRegistration = this.mapEventsManager.register({
            event: options.removePointEvent,
            entityType: EditPoint,
            pick: exports.PickOptions.PICK_FIRST,
            priority: priority,
        });
        var shapeDragRegistration;
        if (options.allowDrag) {
            shapeDragRegistration = this.mapEventsManager.register({
                event: options.dragShapeEvent,
                entityType: EditPolyline,
                pick: exports.PickOptions.PICK_FIRST,
                priority: priority,
            });
        }
        if (shapeDragRegistration) {
            shapeDragRegistration
                .do(function (x) { return console.log(x); })
                .do(function (_a) {
                var drop = _a.movement.drop;
                return _this.cameraService.enableInputs(drop);
            })
                .subscribe(function (_a) {
                var _b = _a.movement, startPosition = _b.startPosition, endPosition = _b.endPosition, drop = _b.drop, entities = _a.entities;
                var endDragPosition = _this.coordinateConverter.screenToCartesian3(endPosition);
                var startDragPosition = _this.coordinateConverter.screenToCartesian3(startPosition);
                if (!endDragPosition) {
                    return;
                }
                var update = {
                    id: id,
                    positions: _this.getPositions(id),
                    editMode: exports.EditModes.EDIT,
                    updatedPosition: endDragPosition,
                    draggedPosition: startDragPosition,
                    editAction: drop ? exports.EditActions.DRAG_SHAPE_FINISH : exports.EditActions.DRAG_SHAPE,
                };
                _this.updateSubject.next(update);
                editSubject.next(__assign$4({}, update, { positions: _this.getPositions(id), points: _this.getPoints(id) }));
            });
        }
        pointDragRegistration
            .do(function (_a) {
            var drop = _a.movement.drop;
            return _this.cameraService.enableInputs(drop);
        })
            .subscribe(function (_a) {
            var _b = _a.movement, endPosition = _b.endPosition, drop = _b.drop, entities = _a.entities;
            var position = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (!position) {
                return;
            }
            var point = entities[0];
            var update = {
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.EDIT,
                updatedPosition: position,
                updatedPoint: point,
                editAction: drop ? exports.EditActions.DRAG_POINT_FINISH : exports.EditActions.DRAG_POINT,
            };
            _this.updateSubject.next(update);
            editSubject.next(__assign$4({}, update, { positions: _this.getPositions(id), points: _this.getPoints(id) }));
        });
        pointRemoveRegistration.subscribe(function (_a) {
            var entities = _a.entities;
            var point = entities[0];
            var allPositions = _this.getPositions(id).slice();
            if (allPositions.length < 3) {
                return;
            }
            var index = allPositions.findIndex(function (position) { return point.getPosition().equals(position); });
            if (index < 0) {
                return;
            }
            var update = {
                id: id,
                positions: allPositions,
                editMode: exports.EditModes.EDIT,
                updatedPoint: point,
                editAction: exports.EditActions.REMOVE_POINT,
            };
            _this.updateSubject.next(update);
            editSubject.next(__assign$4({}, update, { positions: _this.getPositions(id), points: _this.getPoints(id) }));
        });
        var observables = [pointDragRegistration, pointRemoveRegistration];
        if (shapeDragRegistration) {
            observables.push(shapeDragRegistration);
        }
        this.observablesMap.set(id, observables);
        return this.createEditorObservable(editSubject, id);
    };
    PolylinesEditorService.prototype.setOptions = function (options) {
        var defaultClone = JSON.parse(JSON.stringify(DEFAULT_POLYLINE_OPTIONS));
        var polylineOptions = Object.assign(defaultClone, options);
        polylineOptions.pointProps = Object.assign({}, DEFAULT_POLYLINE_OPTIONS.pointProps, options.pointProps);
        polylineOptions.polylineProps = Object.assign({}, DEFAULT_POLYLINE_OPTIONS.polylineProps, options.polylineProps);
        return polylineOptions;
    };
    PolylinesEditorService.prototype.createEditorObservable = function (observableToExtend, id) {
        var _this = this;
        observableToExtend.dispose = function () {
            var observables = _this.observablesMap.get(id);
            if (observables) {
                observables.forEach(function (obs) { return obs.dispose(); });
            }
            _this.observablesMap.delete(id);
            _this.updateSubject.next({
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.DISPOSE,
            });
        };
        observableToExtend.enable = function () {
            _this.updateSubject.next({
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.EDIT,
                editAction: exports.EditActions.ENABLE,
            });
        };
        observableToExtend.disable = function () {
            _this.updateSubject.next({
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.EDIT,
                editAction: exports.EditActions.DISABLE,
            });
        };
        observableToExtend.setManually = function (points, polylineProps) {
            var polyline = _this.polylinesManager.get(id);
            polyline.setManually(points, polylineProps);
            _this.updateSubject.next({
                id: id,
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.SET_MANUALLY,
            });
        };
        observableToExtend.setLabelsRenderFn = function (callback) {
            _this.updateSubject.next({
                id: id,
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.SET_EDIT_LABELS_RENDER_CALLBACK,
                labelsRenderFn: callback,
            });
        };
        observableToExtend.updateLabels = function (labels) {
            _this.updateSubject.next({
                id: id,
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.UPDATE_EDIT_LABELS,
                updateLabels: labels,
            });
        };
        observableToExtend.getCurrentPoints = function () { return _this.getPoints(id); };
        observableToExtend.getEditValue = function () { return observableToExtend.getValue(); };
        observableToExtend.getLabels = function () { return _this.polylinesManager.get(id).labels; };
        return observableToExtend;
    };
    PolylinesEditorService.prototype.generteId = function () {
        return 'edit-polyline-' + this.counter++;
    };
    PolylinesEditorService.prototype.getPositions = function (id) {
        var polyline = this.polylinesManager.get(id);
        return polyline.getRealPositions();
    };
    PolylinesEditorService.prototype.getPoints = function (id) {
        var polyline = this.polylinesManager.get(id);
        return polyline.getRealPoints();
    };
    PolylinesEditorService.decorators = [
        { type: _angular_core.Injectable },
    ];
    PolylinesEditorService.ctorParameters = function () { return []; };
    return PolylinesEditorService;
}());

var PolylinesManagerService = (function () {
    function PolylinesManagerService() {
        this.polylines = new Map();
    }
    PolylinesManagerService.prototype.createEditablePolyline = function (id, editPolylinesLayer, editPointsLayer, coordinateConverter, polylineOptions, positions) {
        var editablePolyline = new EditablePolyline(id, editPolylinesLayer, editPointsLayer, coordinateConverter, polylineOptions, positions);
        this.polylines.set(id, editablePolyline);
    };
    PolylinesManagerService.prototype.get = function (id) {
        return this.polylines.get(id);
    };
    PolylinesManagerService.prototype.clear = function () {
        this.polylines.forEach(function (polyline) { return polyline.dispose(); });
        this.polylines.clear();
    };
    PolylinesManagerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    PolylinesManagerService.ctorParameters = function () { return []; };
    return PolylinesManagerService;
}());

var PolylinesEditorComponent = (function () {
    function PolylinesEditorComponent(polylinesEditor, coordinateConverter, mapEventsManager, cameraService, polylinesManager) {
        this.polylinesEditor = polylinesEditor;
        this.coordinateConverter = coordinateConverter;
        this.mapEventsManager = mapEventsManager;
        this.cameraService = cameraService;
        this.polylinesManager = polylinesManager;
        this.Cesium = Cesium;
        this.editPoints$ = new rxjs_Subject.Subject();
        this.editPolylines$ = new rxjs_Subject.Subject();
        this.polylineLabels$ = new rxjs_Subject.Subject();
        this.polylinesEditor.init(this.mapEventsManager, this.coordinateConverter, this.cameraService, polylinesManager);
        this.startListeningToEditorUpdates();
    }
    PolylinesEditorComponent.prototype.startListeningToEditorUpdates = function () {
        var _this = this;
        this.polylinesEditor.onUpdate().subscribe(function (update) {
            if (update.editMode === exports.EditModes.CREATE || update.editMode === exports.EditModes.CREATE_OR_EDIT) {
                _this.handleCreateUpdates(update);
            }
            else if (update.editMode === exports.EditModes.EDIT) {
                _this.handleEditUpdates(update);
            }
        });
    };
    PolylinesEditorComponent.prototype.getLabelId = function (element, index) {
        return index.toString();
    };
    PolylinesEditorComponent.prototype.renderEditLabels = function (polyline, update, labels) {
        update.positions = polyline.getRealPositions();
        update.points = polyline.getRealPoints();
        if (labels) {
            polyline.labels = labels;
            this.polylineLabelsLayer.update(polyline, polyline.getId());
            return;
        }
        if (!this.editLabelsRenderFn) {
            return;
        }
        polyline.labels = this.editLabelsRenderFn(update, polyline.labels);
        this.polylineLabelsLayer.update(polyline, polyline.getId());
    };
    PolylinesEditorComponent.prototype.removeEditLabels = function (polyline) {
        polyline.labels = [];
        this.polylineLabelsLayer.remove(polyline.getId());
    };
    PolylinesEditorComponent.prototype.handleCreateUpdates = function (update) {
        switch (update.editAction) {
            case exports.EditActions.INIT: {
                this.polylinesManager.createEditablePolyline(update.id, this.editPointsLayer, this.editPolylinesLayer, this.coordinateConverter, update.polylineOptions);
                break;
            }
            case exports.EditActions.MOUSE_MOVE: {
                var polyline = this.polylinesManager.get(update.id);
                if (update.updatedPosition) {
                    polyline.moveTempMovingPoint(update.updatedPosition);
                    this.renderEditLabels(polyline, update);
                }
                break;
            }
            case exports.EditActions.ADD_POINT: {
                var polyline = this.polylinesManager.get(update.id);
                if (update.updatedPosition) {
                    polyline.addPoint(update.updatedPosition);
                    this.renderEditLabels(polyline, update);
                }
                break;
            }
            case exports.EditActions.ADD_LAST_POINT: {
                var polyline = this.polylinesManager.get(update.id);
                if (update.updatedPosition) {
                    polyline.addLastPoint(update.updatedPosition);
                    this.renderEditLabels(polyline, update);
                }
                break;
            }
            case exports.EditActions.DISPOSE: {
                var polyline = this.polylinesManager.get(update.id);
                polyline.dispose();
                this.removeEditLabels(polyline);
                this.editLabelsRenderFn = undefined;
                break;
            }
            case exports.EditActions.SET_EDIT_LABELS_RENDER_CALLBACK: {
                var polyline = this.polylinesManager.get(update.id);
                this.editLabelsRenderFn = update.labelsRenderFn;
                this.renderEditLabels(polyline, update);
                break;
            }
            case exports.EditActions.UPDATE_EDIT_LABELS: {
                var polyline = this.polylinesManager.get(update.id);
                this.renderEditLabels(polyline, update, update.updateLabels);
                break;
            }
            case exports.EditActions.SET_MANUALLY: {
                var polyline = this.polylinesManager.get(update.id);
                this.renderEditLabels(polyline, update, update.updateLabels);
                break;
            }
            default: {
                return;
            }
        }
    };
    PolylinesEditorComponent.prototype.handleEditUpdates = function (update) {
        switch (update.editAction) {
            case exports.EditActions.INIT: {
                this.polylinesManager.createEditablePolyline(update.id, this.editPointsLayer, this.editPolylinesLayer, this.coordinateConverter, update.polylineOptions, update.positions);
                break;
            }
            case exports.EditActions.DRAG_POINT: {
                var polyline = this.polylinesManager.get(update.id);
                if (polyline && polyline.enableEdit) {
                    polyline.movePoint(update.updatedPosition, update.updatedPoint);
                    this.renderEditLabels(polyline, update);
                }
                break;
            }
            case exports.EditActions.DRAG_POINT_FINISH: {
                var polyline = this.polylinesManager.get(update.id);
                if (polyline && polyline.enableEdit && update.updatedPoint.isVirtualEditPoint()) {
                    polyline.changeVirtualPointToRealPoint(update.updatedPoint);
                    this.renderEditLabels(polyline, update);
                }
                break;
            }
            case exports.EditActions.REMOVE_POINT: {
                var polyline = this.polylinesManager.get(update.id);
                if (polyline && polyline.enableEdit) {
                    polyline.removePoint(update.updatedPoint);
                    this.renderEditLabels(polyline, update);
                }
                break;
            }
            case exports.EditActions.DISABLE: {
                var polyline = this.polylinesManager.get(update.id);
                if (polyline) {
                    polyline.enableEdit = false;
                    this.renderEditLabels(polyline, update);
                }
                break;
            }
            case exports.EditActions.ENABLE: {
                var polyline = this.polylinesManager.get(update.id);
                if (polyline) {
                    polyline.enableEdit = true;
                    this.renderEditLabels(polyline, update);
                }
                break;
            }
            case exports.EditActions.DRAG_SHAPE: {
                var polyline = this.polylinesManager.get(update.id);
                if (polyline && polyline.enableEdit) {
                    polyline.moveShape(update.draggedPosition, update.updatedPosition);
                }
                break;
            }
            case exports.EditActions.DRAG_SHAPE_FINISH: {
                var polyline = this.polylinesManager.get(update.id);
                if (polyline && polyline.enableEdit) {
                    polyline.endMoveShape();
                    this.renderEditLabels(polyline, update);
                }
                break;
            }
            default: {
                return;
            }
        }
    };
    PolylinesEditorComponent.prototype.ngOnDestroy = function () {
        this.polylinesManager.clear();
    };
    PolylinesEditorComponent.prototype.getPointSize = function (point) {
        return point.isVirtualEditPoint() ? point.props.virtualPointPixelSize : point.props.pixelSize;
    };
    PolylinesEditorComponent.prototype.getPointShow = function (point) {
        return point.show && (point.isVirtualEditPoint() ? point.props.showVirtual : point.props.show);
    };
    PolylinesEditorComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'polylines-editor',
                    template: `<ac-layer #editPolylinesLayer acFor="let polyline of editPolylines$" [context]="this" [zIndex]="1">
    <ac-polyline-primitive-desc props="{
        positions: polyline.getPositions(),
        width: polyline.props.width,
        material: polyline.props.material()
    }">
    </ac-polyline-primitive-desc>
</ac-layer>

<ac-layer #editPointsLayer acFor="let point of editPoints$" [context]="this" [zIndex]="2">
    <ac-point-desc props="{
        position: point.getPosition(),
        pixelSize: getPointSize(point),
        color: point.props.color,
        outlineColor: point.props.outlineColor,
        outlineWidth: point.props.outlineWidth,
        show: getPointShow(point)
    }">
    </ac-point-desc>
</ac-layer>

<ac-layer #polylineLabelsLayer acFor="let polylineLabels of polylineLabels$" [context]="this" [zIndex]="3">
    <ac-array-desc acFor="let label of polylineLabels.labels" [idGetter]="getLabelId">
        <ac-label-primitive-desc props="{
            position: label.position,
            backgroundColor: label.backgroundColor,
            backgroundPadding: label.backgroundPadding,
            distanceDisplayCondition: label.distanceDisplayCondition,
            eyeOffset: label.eyeOffset,
            fillColor: label.fillColor,
            font: label.font,
            heightReference: label.heightReference,
            horizontalOrigin: label.horizontalOrigin,
            outlineColor: label.outlineColor,
            outlineWidth: label.outlineWidth,
            pixelOffset: label.pixelOffset,
            pixelOffsetScaleByDistance: label.pixelOffsetScaleByDistance,
            scale: label.scale,
            scaleByDistance: label.scaleByDistance,
            show: label.show,
            showBackground: label.showBackground,
            style: label.style,
            text: label.text,
            translucencyByDistance: label.translucencyByDistance,
            verticalOrigin: label.verticalOrigin
        }">
        </ac-label-primitive-desc>
    </ac-array-desc>
</ac-layer>



`,
                    providers: [CoordinateConverter, PolylinesManagerService]
                },] },
    ];
    PolylinesEditorComponent.ctorParameters = function () { return [
        { type: PolylinesEditorService, },
        { type: CoordinateConverter, },
        { type: MapEventsManagerService, },
        { type: CameraService, },
        { type: PolylinesManagerService, },
    ]; };
    PolylinesEditorComponent.propDecorators = {
        'editPointsLayer': [{ type: _angular_core.ViewChild, args: ['editPointsLayer',] },],
        'editPolylinesLayer': [{ type: _angular_core.ViewChild, args: ['editPolylinesLayer',] },],
        'polylineLabelsLayer': [{ type: _angular_core.ViewChild, args: ['polylineLabelsLayer',] },],
    };
    return PolylinesEditorComponent;
}());

var __extends$78 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EditableHippodrome = (function (_super) {
    __extends$78(EditableHippodrome, _super);
    function EditableHippodrome(id, pointsLayer, hippodromeLayer, coordinateConverter, editOptions, positions) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.pointsLayer = pointsLayer;
        _this.hippodromeLayer = hippodromeLayer;
        _this.coordinateConverter = coordinateConverter;
        _this.positions = [];
        _this.done = false;
        _this._enableEdit = true;
        _this._labels = [];
        _this.defaultPointProps = editOptions.pointProps;
        _this.hippodromeProps = editOptions.hippodromeProps;
        if (positions && positions.length === 2) {
            _this.createFromExisting(positions);
        }
        else if (positions) {
            throw new Error('Hippodrome consist of 2 points but provided ' + positions.length);
        }
        return _this;
    }
    Object.defineProperty(EditableHippodrome.prototype, "labels", {
        get: function () {
            return this._labels;
        },
        set: function (labels) {
            if (!labels) {
                return;
            }
            var positions = this.getRealPositions();
            this._labels = labels.map(function (label, index) {
                if (!label.position) {
                    label.position = positions[index];
                }
                return Object.assign({}, defaultLabelProps, label);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableHippodrome.prototype, "hippodromeProps", {
        get: function () {
            return this._hippodromeProps;
        },
        set: function (value) {
            this._hippodromeProps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableHippodrome.prototype, "defaultPointProps", {
        get: function () {
            return this._defaultPointProps;
        },
        set: function (value) {
            this._defaultPointProps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableHippodrome.prototype, "enableEdit", {
        get: function () {
            return this._enableEdit;
        },
        set: function (value) {
            var _this = this;
            this._enableEdit = value;
            this.positions.forEach(function (point) {
                point.show = value;
                _this.updatePointsLayer(point);
            });
        },
        enumerable: true,
        configurable: true
    });
    EditableHippodrome.prototype.createFromExisting = function (positions) {
        var _this = this;
        positions.forEach(function (position) {
            _this.addPointFromExisting(position);
        });
        this.createHeightEditPoints();
        this.updateHippdromeLayer();
        this.updatePointsLayer.apply(this, this.positions);
        this.done = true;
    };
    EditableHippodrome.prototype.setPointsManually = function (points, widthMeters) {
        var _this = this;
        if (!this.done) {
            throw new Error('Update manually only in edit mode, after polyline is created');
        }
        this.hippodromeProps.width = widthMeters ? widthMeters : this.hippodromeProps.width;
        this.positions.forEach(function (p) { return _this.pointsLayer.remove(p.getId()); });
        this.positions = points;
        this.createHeightEditPoints();
        this.updatePointsLayer.apply(this, points);
        this.updateHippdromeLayer();
    };
    EditableHippodrome.prototype.addPointFromExisting = function (position) {
        var newPoint = new EditPoint(this.id, position, this.defaultPointProps);
        this.positions.push(newPoint);
        this.updatePointsLayer(newPoint);
    };
    EditableHippodrome.prototype.addPoint = function (position) {
        if (this.done) {
            return;
        }
        var isFirstPoint = !this.positions.length;
        if (isFirstPoint) {
            var firstPoint = new EditPoint(this.id, position, this.defaultPointProps);
            this.positions.push(firstPoint);
            this.movingPoint = new EditPoint(this.id, position.clone(), this.defaultPointProps);
            this.positions.push(this.movingPoint);
            this.updatePointsLayer(firstPoint);
        }
        else {
            this.createHeightEditPoints();
            this.updatePointsLayer.apply(this, this.positions);
            this.updateHippdromeLayer();
            this.done = true;
            this.movingPoint = null;
        }
    };
    EditableHippodrome.prototype.createHeightEditPoints = function () {
        var _this = this;
        this.positions
            .filter(function (p) { return p.isVirtualEditPoint(); })
            .forEach(function (p) { return _this.removePosition(p); });
        var firstP = this.getRealPoints()[0];
        var secP = this.getRealPoints()[1];
        var midPointCartesian3 = Cesium.Cartesian3.lerp(firstP.getPosition(), secP.getPosition(), 0.5, new Cesium.Cartesian3());
        var bearingDeg = this.coordinateConverter.bearingToCartesian(firstP.getPosition(), secP.getPosition());
        var upAzimuth = Cesium.Math.toRadians(bearingDeg) - Math.PI / 2;
        this.createMiddleEditablePoint(midPointCartesian3, upAzimuth);
        var downAzimuth = Cesium.Math.toRadians(bearingDeg) + Math.PI / 2;
        this.createMiddleEditablePoint(midPointCartesian3, downAzimuth);
    };
    EditableHippodrome.prototype.createMiddleEditablePoint = function (midPointCartesian3, azimuth) {
        var upEditCartesian3 = GeoUtilsService.pointByLocationDistanceAndAzimuth(midPointCartesian3, this.hippodromeProps.width / 2, azimuth, true);
        var midPoint = new EditPoint(this.id, upEditCartesian3, this.defaultPointProps);
        midPoint.setVirtualEditPoint(true);
        this.positions.push(midPoint);
    };
    EditableHippodrome.prototype.movePoint = function (toPosition, editPoint) {
        if (!editPoint.isVirtualEditPoint()) {
            editPoint.setPosition(toPosition);
            this.updatePointsLayer.apply(this, this.positions);
            this.updateHippdromeLayer();
        }
        else {
            this.changeWidthByNewPoint(toPosition);
        }
    };
    EditableHippodrome.prototype.changeWidthByNewPoint = function (toPosition) {
        var firstP = this.getRealPoints()[0];
        var secP = this.getRealPoints()[1];
        var midPointCartesian3 = Cesium.Cartesian3.lerp(firstP.getPosition(), secP.getPosition(), 0.5, new Cesium.Cartesian3());
        var bearingDeg = this.coordinateConverter.bearingToCartesian(midPointCartesian3, toPosition);
        var normalizedBearingDeb = bearingDeg;
        if (bearingDeg > 270) {
            normalizedBearingDeb = bearingDeg - 270;
        }
        else if (bearingDeg > 180) {
            normalizedBearingDeb = bearingDeg - 180;
        }
        var bearingDegHippodromeDots = this.coordinateConverter.bearingToCartesian(firstP.getPosition(), secP.getPosition());
        if (bearingDegHippodromeDots > 180) {
            bearingDegHippodromeDots = this.coordinateConverter.bearingToCartesian(secP.getPosition(), firstP.getPosition());
        }
        var fixedBearingDeg = bearingDegHippodromeDots > normalizedBearingDeb ?
            bearingDegHippodromeDots - normalizedBearingDeb :
            normalizedBearingDeb - bearingDegHippodromeDots;
        if (bearingDeg > 270) {
            fixedBearingDeg = bearingDeg - bearingDegHippodromeDots;
        }
        var distanceMeters = Math.abs(GeoUtilsService.distance(midPointCartesian3, toPosition));
        var radiusWidth = Math.sin(Cesium.Math.toRadians(fixedBearingDeg)) * distanceMeters;
        this.hippodromeProps.width = Math.abs(radiusWidth) * 2;
        this.createHeightEditPoints();
        this.updatePointsLayer.apply(this, this.positions);
        this.updateHippdromeLayer();
    };
    EditableHippodrome.prototype.moveShape = function (startMovingPosition, draggedToPosition) {
        if (!this.lastDraggedToPosition) {
            this.lastDraggedToPosition = startMovingPosition;
        }
        var delta = GeoUtilsService.getPositionsDelta(this.lastDraggedToPosition, draggedToPosition);
        this.getRealPoints().forEach(function (point) {
            GeoUtilsService.addDeltaToPosition(point.getPosition(), delta, true);
        });
        this.createHeightEditPoints();
        this.updatePointsLayer.apply(this, this.positions);
        this.updateHippdromeLayer();
        this.lastDraggedToPosition = draggedToPosition;
    };
    EditableHippodrome.prototype.endMoveShape = function () {
        var _this = this;
        this.lastDraggedToPosition = undefined;
        this.createHeightEditPoints();
        this.positions.forEach(function (point) { return _this.updatePointsLayer(point); });
        this.updateHippdromeLayer();
    };
    EditableHippodrome.prototype.endMovePoint = function () {
        this.createHeightEditPoints();
        this.updatePointsLayer.apply(this, this.positions);
    };
    EditableHippodrome.prototype.moveTempMovingPoint = function (toPosition) {
        if (this.movingPoint) {
            this.movePoint(toPosition, this.movingPoint);
        }
    };
    EditableHippodrome.prototype.removePoint = function (pointToRemove) {
        var _this = this;
        this.removePosition(pointToRemove);
        this.positions
            .filter(function (p) { return p.isVirtualEditPoint(); })
            .forEach(function (p) { return _this.removePosition(p); });
    };
    EditableHippodrome.prototype.addLastPoint = function (position) {
        this.done = true;
        this.removePosition(this.movingPoint);
        this.movingPoint = null;
    };
    EditableHippodrome.prototype.getRealPositions = function () {
        return this.getRealPoints()
            .map(function (position) { return position.getPosition(); });
    };
    EditableHippodrome.prototype.getRealPoints = function () {
        return this.positions
            .filter(function (position) { return !position.isVirtualEditPoint(); });
    };
    EditableHippodrome.prototype.getWidth = function () {
        return this.hippodromeProps.width;
    };
    EditableHippodrome.prototype.getPositions = function () {
        return this.positions.map(function (position) { return position.getPosition(); });
    };
    EditableHippodrome.prototype.removePosition = function (point) {
        var index = this.positions.findIndex(function (p) { return p === point; });
        if (index < 0) {
            return;
        }
        this.positions.splice(index, 1);
        this.pointsLayer.remove(point.getId());
    };
    EditableHippodrome.prototype.updatePointsLayer = function () {
        var _this = this;
        var point = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            point[_i] = arguments[_i];
        }
        point.forEach(function (p) { return _this.pointsLayer.update(p, p.getId()); });
    };
    EditableHippodrome.prototype.updateHippdromeLayer = function () {
        this.hippodromeLayer.update(this, this.id);
    };
    EditableHippodrome.prototype.dispose = function () {
        var _this = this;
        this.hippodromeLayer.remove(this.id);
        this.positions.forEach(function (editPoint) {
            _this.pointsLayer.remove(editPoint.getId());
        });
        if (this.movingPoint) {
            this.pointsLayer.remove(this.movingPoint.getId());
            this.movingPoint = undefined;
        }
        this.positions.length = 0;
    };
    EditableHippodrome.prototype.getPointsCount = function () {
        return this.positions.length;
    };
    EditableHippodrome.prototype.getId = function () {
        return this.id;
    };
    return EditableHippodrome;
}(AcEntity));

var HippodromeManagerService = (function () {
    function HippodromeManagerService() {
        this.hippodromes = new Map();
    }
    HippodromeManagerService.prototype.createEditableHippodrome = function (id, editHippodromeLayer, editPointsLayer, coordinateConverter, hippodromeEditOptions, positions) {
        var editableHippodrome = new EditableHippodrome(id, editHippodromeLayer, editPointsLayer, coordinateConverter, hippodromeEditOptions, positions);
        this.hippodromes.set(id, editableHippodrome);
    };
    HippodromeManagerService.prototype.get = function (id) {
        return this.hippodromes.get(id);
    };
    HippodromeManagerService.prototype.clear = function () {
        this.hippodromes.forEach(function (hippodrome) { return hippodrome.dispose(); });
        this.hippodromes.clear();
    };
    HippodromeManagerService.decorators = [
        { type: _angular_core.Injectable },
    ];
    HippodromeManagerService.ctorParameters = function () { return []; };
    return HippodromeManagerService;
}());

var __assign$5 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var DEFAULT_HIPPODROME_OPTIONS = {
    addPointEvent: exports.CesiumEvent.LEFT_CLICK,
    dragPointEvent: exports.CesiumEvent.LEFT_CLICK_DRAG,
    dragShapeEvent: exports.CesiumEvent.LEFT_CLICK_DRAG,
    allowDrag: true,
    hippodromeProps: {
        material: Cesium.Color.GREEN.withAlpha(0.5),
        width: 200000.0,
        outline: false,
    },
    pointProps: {
        color: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 1,
        pixelSize: 15,
        virtualPointPixelSize: 8,
        show: true,
        showVirtual: true,
    },
};
var HippodromeEditorService = (function () {
    function HippodromeEditorService() {
        this.updateSubject = new rxjs_Subject.Subject();
        this.updatePublisher = this.updateSubject.publish();
        this.counter = 0;
        this.observablesMap = new Map();
    }
    HippodromeEditorService.prototype.init = function (mapEventsManager, coordinateConverter, cameraService, managerService) {
        this.mapEventsManager = mapEventsManager;
        this.updatePublisher.connect();
        this.coordinateConverter = coordinateConverter;
        this.cameraService = cameraService;
        this.hippodromeManager = managerService;
    };
    HippodromeEditorService.prototype.onUpdate = function () {
        return this.updatePublisher;
    };
    HippodromeEditorService.prototype.create = function (options, eventPriority) {
        var _this = this;
        if (options === void 0) { options = DEFAULT_HIPPODROME_OPTIONS; }
        if (eventPriority === void 0) { eventPriority = 100; }
        var positions = [];
        var id = this.generteId();
        var hippodromeOptions = this.setOptions(options);
        var clientEditSubject = new rxjs_BehaviorSubject.BehaviorSubject({
            id: id,
            editAction: null,
            editMode: exports.EditModes.CREATE
        });
        var finishedCreate = false;
        this.updateSubject.next({
            id: id,
            positions: positions,
            editMode: exports.EditModes.CREATE,
            editAction: exports.EditActions.INIT,
            hippodromeOptions: hippodromeOptions,
        });
        var mouseMoveRegistration = this.mapEventsManager.register({
            event: exports.CesiumEvent.MOUSE_MOVE,
            pick: exports.PickOptions.NO_PICK,
            priority: eventPriority,
        });
        var addPointRegistration = this.mapEventsManager.register({
            event: hippodromeOptions.addPointEvent,
            pick: exports.PickOptions.NO_PICK,
            priority: eventPriority,
        });
        this.observablesMap.set(id, [mouseMoveRegistration, addPointRegistration]);
        var editorObservable = this.createEditorObservable(clientEditSubject, id);
        mouseMoveRegistration.subscribe(function (_a) {
            var endPosition = _a.movement.endPosition;
            var position = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (position) {
                _this.updateSubject.next({
                    id: id,
                    positions: _this.getPositions(id),
                    editMode: exports.EditModes.CREATE,
                    updatedPosition: position,
                    editAction: exports.EditActions.MOUSE_MOVE,
                });
            }
        });
        addPointRegistration.subscribe(function (_a) {
            var endPosition = _a.movement.endPosition;
            if (finishedCreate) {
                return;
            }
            var position = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (!position) {
                return;
            }
            var allPositions = _this.getPositions(id);
            var isFirstPoint = _this.getPositions(id).length === 0;
            var updateValue = {
                id: id,
                positions: allPositions,
                editMode: exports.EditModes.CREATE,
                updatedPosition: position,
                editAction: exports.EditActions.ADD_POINT,
            };
            _this.updateSubject.next(updateValue);
            clientEditSubject.next(__assign$5({}, updateValue, { positions: _this.getPositions(id), points: _this.getPoints(id), width: _this.getWidth(id) }));
            if (!isFirstPoint) {
                var changeMode = {
                    id: id,
                    editMode: exports.EditModes.CREATE,
                    editAction: exports.EditActions.CHANGE_TO_EDIT,
                };
                _this.updateSubject.next(changeMode);
                clientEditSubject.next(changeMode);
                if (_this.observablesMap.has(id)) {
                    _this.observablesMap.get(id).forEach(function (registration) { return registration.dispose(); });
                }
                _this.observablesMap.delete(id);
                _this.editHippodrome(id, eventPriority, clientEditSubject, hippodromeOptions, editorObservable);
                finishedCreate = true;
            }
        });
        return editorObservable;
    };
    HippodromeEditorService.prototype.edit = function (positions, options, priority) {
        if (options === void 0) { options = DEFAULT_HIPPODROME_OPTIONS; }
        if (priority === void 0) { priority = 100; }
        if (positions.length !== 2) {
            throw new Error('Hippodrome editor error edit(): polygon should have 2 positions but received ' + positions);
        }
        var id = this.generteId();
        var hippodromeEditOptions = this.setOptions(options);
        var editSubject = new rxjs_BehaviorSubject.BehaviorSubject({
            id: id,
            editAction: null,
            editMode: exports.EditModes.EDIT
        });
        var update = {
            id: id,
            positions: positions,
            editMode: exports.EditModes.EDIT,
            editAction: exports.EditActions.INIT,
            hippodromeOptions: hippodromeEditOptions,
        };
        this.updateSubject.next(update);
        editSubject.next(__assign$5({}, update, { positions: this.getPositions(id), points: this.getPoints(id), width: this.getWidth(id) }));
        return this.editHippodrome(id, priority, editSubject, hippodromeEditOptions);
    };
    HippodromeEditorService.prototype.editHippodrome = function (id, priority, editSubject, options, editObservable) {
        var _this = this;
        var shapeDragRegistration;
        if (options.allowDrag) {
            shapeDragRegistration = this.mapEventsManager.register({
                event: options.dragShapeEvent,
                entityType: EditableHippodrome,
                pick: exports.PickOptions.PICK_FIRST,
                priority: priority,
            });
        }
        var pointDragRegistration = this.mapEventsManager.register({
            event: options.dragPointEvent,
            entityType: EditPoint,
            pick: exports.PickOptions.PICK_FIRST,
            priority: priority,
        });
        pointDragRegistration
            .do(function (_a) {
            var drop = _a.movement.drop;
            return _this.cameraService.enableInputs(drop);
        })
            .subscribe(function (_a) {
            var _b = _a.movement, endPosition = _b.endPosition, drop = _b.drop, entities = _a.entities;
            var position = _this.coordinateConverter.screenToCartesian3(endPosition);
            if (!position) {
                return;
            }
            var point = entities[0];
            var update = {
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.EDIT,
                updatedPosition: position,
                updatedPoint: point,
                editAction: drop ? exports.EditActions.DRAG_POINT_FINISH : exports.EditActions.DRAG_POINT,
            };
            _this.updateSubject.next(update);
            editSubject.next(__assign$5({}, update, { positions: _this.getPositions(id), points: _this.getPoints(id), width: _this.getWidth(id) }));
        });
        if (shapeDragRegistration) {
            shapeDragRegistration
                .do(function (_a) {
                var drop = _a.movement.drop;
                return _this.cameraService.enableInputs(drop);
            })
                .subscribe(function (_a) {
                var _b = _a.movement, startPosition = _b.startPosition, endPosition = _b.endPosition, drop = _b.drop, entities = _a.entities;
                var endDragPosition = _this.coordinateConverter.screenToCartesian3(endPosition);
                var startDragPosition = _this.coordinateConverter.screenToCartesian3(startPosition);
                if (!endDragPosition) {
                    return;
                }
                var update = {
                    id: id,
                    positions: _this.getPositions(id),
                    editMode: exports.EditModes.EDIT,
                    updatedPosition: endDragPosition,
                    draggedPosition: startDragPosition,
                    editAction: drop ? exports.EditActions.DRAG_SHAPE_FINISH : exports.EditActions.DRAG_SHAPE,
                };
                _this.updateSubject.next(update);
                editSubject.next(__assign$5({}, update, { positions: _this.getPositions(id), points: _this.getPoints(id), width: _this.getWidth(id) }));
            });
        }
        var observables = [pointDragRegistration];
        if (shapeDragRegistration) {
            observables.push(shapeDragRegistration);
        }
        this.observablesMap.set(id, observables);
        return this.createEditorObservable(editSubject, id);
    };
    HippodromeEditorService.prototype.setOptions = function (options) {
        var defaultClone = JSON.parse(JSON.stringify(DEFAULT_HIPPODROME_OPTIONS));
        var hippodromeOptions = Object.assign(defaultClone, options);
        hippodromeOptions.hippodromeProps = Object.assign({}, DEFAULT_HIPPODROME_OPTIONS.hippodromeProps, options.hippodromeProps);
        hippodromeOptions.pointProps = Object.assign({}, DEFAULT_HIPPODROME_OPTIONS.pointProps, options.pointProps);
        return hippodromeOptions;
    };
    HippodromeEditorService.prototype.createEditorObservable = function (observableToExtend, id) {
        var _this = this;
        observableToExtend.dispose = function () {
            var observables = _this.observablesMap.get(id);
            if (observables) {
                observables.forEach(function (obs) { return obs.dispose(); });
            }
            _this.observablesMap.delete(id);
            _this.updateSubject.next({
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.DISPOSE,
            });
        };
        observableToExtend.enable = function () {
            _this.updateSubject.next({
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.EDIT,
                editAction: exports.EditActions.ENABLE,
            });
        };
        observableToExtend.disable = function () {
            _this.updateSubject.next({
                id: id,
                positions: _this.getPositions(id),
                editMode: exports.EditModes.EDIT,
                editAction: exports.EditActions.DISABLE,
            });
        };
        observableToExtend.setManually = function (firstPosition, secondPosition, widthMeters, firstPointProp, secondPointProp) {
            var firstP = new EditPoint(id, firstPosition, firstPointProp ? firstPointProp : DEFAULT_HIPPODROME_OPTIONS.pointProps);
            var secP = new EditPoint(id, secondPosition, secondPointProp ? secondPointProp : DEFAULT_HIPPODROME_OPTIONS.pointProps);
            var hippodrome = _this.hippodromeManager.get(id);
            hippodrome.setPointsManually([firstP, secP], widthMeters);
            _this.updateSubject.next({
                id: id,
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.SET_MANUALLY,
            });
        };
        observableToExtend.setLabelsRenderFn = function (callback) {
            _this.updateSubject.next({
                id: id,
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.SET_EDIT_LABELS_RENDER_CALLBACK,
                labelsRenderFn: callback,
            });
        };
        observableToExtend.updateLabels = function (labels) {
            _this.updateSubject.next({
                id: id,
                editMode: exports.EditModes.CREATE_OR_EDIT,
                editAction: exports.EditActions.UPDATE_EDIT_LABELS,
                updateLabels: labels,
            });
        };
        observableToExtend.getCurrentPoints = function () { return _this.getPoints(id); };
        observableToExtend.getEditValue = function () { return observableToExtend.getValue(); };
        observableToExtend.getLabels = function () { return _this.hippodromeManager.get(id).labels; };
        observableToExtend.getCurrentWidth = function () { return _this.getWidth(id); };
        return observableToExtend;
    };
    HippodromeEditorService.prototype.generteId = function () {
        return 'edit-hippodrome-' + this.counter++;
    };
    HippodromeEditorService.prototype.getPositions = function (id) {
        var hippodrome = this.hippodromeManager.get(id);
        return hippodrome.getRealPositions();
    };
    HippodromeEditorService.prototype.getPoints = function (id) {
        var hippodrome = this.hippodromeManager.get(id);
        return hippodrome.getRealPoints();
    };
    HippodromeEditorService.prototype.getWidth = function (id) {
        var hippodrome = this.hippodromeManager.get(id);
        return hippodrome.getWidth();
    };
    HippodromeEditorService.decorators = [
        { type: _angular_core.Injectable },
    ];
    HippodromeEditorService.ctorParameters = function () { return []; };
    return HippodromeEditorService;
}());

var HippodromeEditorComponent = (function () {
    function HippodromeEditorComponent(hippodromesEditor, coordinateConverter, mapEventsManager, cameraService, hippodromesManager) {
        this.hippodromesEditor = hippodromesEditor;
        this.coordinateConverter = coordinateConverter;
        this.mapEventsManager = mapEventsManager;
        this.cameraService = cameraService;
        this.hippodromesManager = hippodromesManager;
        this.Cesium = Cesium;
        this.editPoints$ = new rxjs_Subject.Subject();
        this.editHippodromes$ = new rxjs_Subject.Subject();
        this.hippodromesEditor.init(this.mapEventsManager, this.coordinateConverter, this.cameraService, hippodromesManager);
        this.startListeningToEditorUpdates();
    }
    HippodromeEditorComponent.prototype.startListeningToEditorUpdates = function () {
        var _this = this;
        this.hippodromesEditor.onUpdate().subscribe(function (update) {
            if (update.editMode === exports.EditModes.CREATE || update.editMode === exports.EditModes.CREATE_OR_EDIT) {
                _this.handleCreateUpdates(update);
            }
            else if (update.editMode === exports.EditModes.EDIT) {
                _this.handleEditUpdates(update);
            }
        });
    };
    HippodromeEditorComponent.prototype.getLabelId = function (element, index) {
        return index.toString();
    };
    HippodromeEditorComponent.prototype.renderEditLabels = function (hippodrome, update, labels) {
        update.positions = hippodrome.getRealPositions();
        update.points = hippodrome.getRealPoints();
        if (labels) {
            hippodrome.labels = labels;
            this.editHippodromesLayer.update(hippodrome, hippodrome.getId());
            return;
        }
        if (!this.editLabelsRenderFn) {
            return;
        }
        hippodrome.labels = this.editLabelsRenderFn(update, hippodrome.labels);
        this.editHippodromesLayer.update(hippodrome, hippodrome.getId());
    };
    HippodromeEditorComponent.prototype.removeEditLabels = function (hippodrome) {
        hippodrome.labels = [];
        this.editHippodromesLayer.update(hippodrome, hippodrome.getId());
    };
    HippodromeEditorComponent.prototype.handleCreateUpdates = function (update) {
        switch (update.editAction) {
            case exports.EditActions.INIT: {
                this.hippodromesManager.createEditableHippodrome(update.id, this.editPointsLayer, this.editHippodromesLayer, this.coordinateConverter, update.hippodromeOptions);
                break;
            }
            case exports.EditActions.MOUSE_MOVE: {
                var hippodrome = this.hippodromesManager.get(update.id);
                if (update.updatedPosition) {
                    hippodrome.moveTempMovingPoint(update.updatedPosition);
                    this.renderEditLabels(hippodrome, update);
                }
                break;
            }
            case exports.EditActions.ADD_POINT: {
                var hippodrome = this.hippodromesManager.get(update.id);
                if (update.updatedPosition) {
                    hippodrome.addPoint(update.updatedPosition);
                    this.renderEditLabels(hippodrome, update);
                }
                break;
            }
            case exports.EditActions.DISPOSE: {
                var hippodrome = this.hippodromesManager.get(update.id);
                hippodrome.dispose();
                this.removeEditLabels(hippodrome);
                break;
            }
            case exports.EditActions.SET_EDIT_LABELS_RENDER_CALLBACK: {
                var hippodrome = this.hippodromesManager.get(update.id);
                this.editLabelsRenderFn = update.labelsRenderFn;
                this.renderEditLabels(hippodrome, update);
                break;
            }
            case exports.EditActions.UPDATE_EDIT_LABELS: {
                var hippodrome = this.hippodromesManager.get(update.id);
                this.renderEditLabels(hippodrome, update, update.updateLabels);
                break;
            }
            case exports.EditActions.SET_MANUALLY: {
                var hippodrome = this.hippodromesManager.get(update.id);
                this.renderEditLabels(hippodrome, update, update.updateLabels);
                break;
            }
            default: {
                return;
            }
        }
    };
    HippodromeEditorComponent.prototype.handleEditUpdates = function (update) {
        switch (update.editAction) {
            case exports.EditActions.INIT: {
                this.hippodromesManager.createEditableHippodrome(update.id, this.editPointsLayer, this.editHippodromesLayer, this.coordinateConverter, update.hippodromeOptions, update.positions);
                break;
            }
            case exports.EditActions.DRAG_POINT: {
                var hippodrome = this.hippodromesManager.get(update.id);
                if (hippodrome && hippodrome.enableEdit) {
                    hippodrome.movePoint(update.updatedPosition, update.updatedPoint);
                    this.renderEditLabels(hippodrome, update);
                }
                break;
            }
            case exports.EditActions.DRAG_POINT_FINISH: {
                var hippodrome = this.hippodromesManager.get(update.id);
                if (hippodrome && hippodrome.enableEdit) {
                    hippodrome.endMovePoint();
                    this.renderEditLabels(hippodrome, update);
                }
                break;
            }
            case exports.EditActions.DISABLE: {
                var hippodrome = this.hippodromesManager.get(update.id);
                if (hippodrome) {
                    hippodrome.enableEdit = false;
                    this.renderEditLabels(hippodrome, update);
                }
                break;
            }
            case exports.EditActions.ENABLE: {
                var hippodrome = this.hippodromesManager.get(update.id);
                if (hippodrome) {
                    hippodrome.enableEdit = true;
                    this.renderEditLabels(hippodrome, update);
                }
                break;
            }
            case exports.EditActions.DRAG_SHAPE: {
                var hippodrome = this.hippodromesManager.get(update.id);
                if (hippodrome && hippodrome.enableEdit) {
                    hippodrome.moveShape(update.draggedPosition, update.updatedPosition);
                }
                break;
            }
            case exports.EditActions.DRAG_SHAPE_FINISH: {
                var hippodrome = this.hippodromesManager.get(update.id);
                if (hippodrome && hippodrome.enableEdit) {
                    hippodrome.endMoveShape();
                    this.renderEditLabels(hippodrome, update);
                }
                break;
            }
            default: {
                return;
            }
        }
    };
    HippodromeEditorComponent.prototype.ngOnDestroy = function () {
        this.hippodromesManager.clear();
    };
    HippodromeEditorComponent.prototype.getPointSize = function (point) {
        return point.isVirtualEditPoint() ? point.props.virtualPointPixelSize : point.props.pixelSize;
    };
    HippodromeEditorComponent.prototype.getPointShow = function (point) {
        return point.show && (point.isVirtualEditPoint() ? point.props.showVirtual : point.props.show);
    };
    HippodromeEditorComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'hippodrome-editor',
                    template: `<ac-layer #editHippodromesLayer acFor="let hippodrome of editHippodromes$" [context]="this" [zIndex]="2">
    <ac-corridor-desc props="{
		positions: hippodrome.getRealPositions(),
		cornerType: Cesium.CornerType.ROUNDED,
		material: hippodrome.hippodromeProps.material,
		width : hippodrome.hippodromeProps.width,
		outline: hippodrome.hippodromeProps.outline,
		outlineColor: hippodrome.hippodromeProps.outlineColor,
        outlineWidth: hippodrome.hippodromeProps.outlineWidth,
        height: 0
	}">
    </ac-corridor-desc>

    <ac-array-desc acFor="let label of hippodrome.labels" [idGetter]="getLabelId">
        <ac-label-primitive-desc props="{
            position: label.position,
            backgroundColor: label.backgroundColor,
            backgroundPadding: label.backgroundPadding,
            distanceDisplayCondition: label.distanceDisplayCondition,
            eyeOffset: label.eyeOffset,
            fillColor: label.fillColor,
            font: label.font,
            heightReference: label.heightReference,
            horizontalOrigin: label.horizontalOrigin,
            outlineColor: label.outlineColor,
            outlineWidth: label.outlineWidth,
            pixelOffset: label.pixelOffset,
            pixelOffsetScaleByDistance: label.pixelOffsetScaleByDistance,
            scale: label.scale,
            scaleByDistance: label.scaleByDistance,
            show: label.show,
            showBackground: label.showBackground,
            style: label.style,
            text: label.text,
            translucencyByDistance: label.translucencyByDistance,
            verticalOrigin: label.verticalOrigin
        }">
        </ac-label-primitive-desc>
    </ac-array-desc>
</ac-layer>

<ac-layer #editPointsLayer acFor="let point of editPoints$" [context]="this" [zIndex]="2">
    <ac-point-desc props="{
        position: point.getPosition(),
        pixelSize: getPointSize(point),
        color: point.props.color,
        outlineColor: point.props.outlineColor,
        outlineWidth: point.props.outlineWidth,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        show: getPointShow(point)
    }">
    </ac-point-desc>
</ac-layer>
`,
                    providers: [CoordinateConverter, HippodromeManagerService]
                },] },
    ];
    HippodromeEditorComponent.ctorParameters = function () { return [
        { type: HippodromeEditorService, },
        { type: CoordinateConverter, },
        { type: MapEventsManagerService, },
        { type: CameraService, },
        { type: HippodromeManagerService, },
    ]; };
    HippodromeEditorComponent.propDecorators = {
        'editPointsLayer': [{ type: _angular_core.ViewChild, args: ['editPointsLayer',] },],
        'editHippodromesLayer': [{ type: _angular_core.ViewChild, args: ['editHippodromesLayer',] },],
    };
    return HippodromeEditorComponent;
}());

var DraggableToMapService = (function () {
    function DraggableToMapService(document, mapsManager) {
        this.document = document;
        this.mapsManager = mapsManager;
        this.mainSubject = new rxjs_Subject.Subject();
    }
    DraggableToMapService.prototype.setCoordinateConverter = function (coordinateConverter) {
        this.coordinateConverter = coordinateConverter;
    };
    DraggableToMapService.prototype.drag = function (imageSrc, style) {
        var _this = this;
        if (!this.coordinateConverter) {
            var map = this.mapsManager.getMap();
            if (map) {
                this.coordinateConverter = map.getCoordinateConverter();
            }
        }
        this.cancel();
        var imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.style.position = 'fixed';
        imgElement.style.visibility = 'hidden';
        imgElement.style.width = '30px';
        imgElement.style.height = '30px';
        imgElement.style['user-drag'] = 'none';
        imgElement.style['user-select'] = 'none';
        imgElement.style['-moz-user-select'] = 'none';
        imgElement.style['-webkit-user-drag'] = 'none';
        imgElement.style['-webkit-user-select'] = 'none';
        imgElement.style['-ms-user-select'] = 'none';
        Object.assign(imgElement.style, style);
        document.body.appendChild(imgElement);
        this.createDragObservable();
        this.dragObservable.subscribe(function (e) {
            imgElement.style.visibility = 'visible';
            imgElement.style.left = e.screenPosition.x - imgElement.clientWidth / 2 + 'px';
            imgElement.style.top = e.screenPosition.y - imgElement.clientHeight / 2 + 'px';
            _this.mainSubject.next(e);
            if (e.drop) {
                imgElement.remove();
            }
        }, function (e) {
            imgElement.remove();
        }, function () {
            imgElement.remove();
        });
    };
    DraggableToMapService.prototype.dragUpdates = function () {
        return this.mainSubject;
    };
    DraggableToMapService.prototype.cancel = function () {
        if (this.stopper) {
            this.stopper.next(true);
            this.stopper = undefined;
            this.dragObservable = undefined;
        }
    };
    DraggableToMapService.prototype.createDragObservable = function () {
        var _this = this;
        var stopper = new rxjs_Subject.Subject();
        var dropSubject = new rxjs_Subject.Subject();
        var pointerUp = rxjs_Observable.Observable.fromEvent(document, 'pointerup');
        var pointerMove = rxjs_Observable.Observable.fromEvent(document, 'pointermove');
        var dragStartPositionX;
        var dragStartPositionY;
        var lastMove;
        var moveObservable = pointerMove.map(function (e) {
            dragStartPositionX = dragStartPositionX ? dragStartPositionX : e.x;
            dragStartPositionY = dragStartPositionY ? dragStartPositionY : e.y;
            lastMove = {
                drop: false,
                initialScreenPosition: {
                    x: dragStartPositionX,
                    y: dragStartPositionY,
                },
                screenPosition: {
                    x: e.x,
                    y: e.y,
                },
                mapPosition: _this.coordinateConverter ?
                    _this.coordinateConverter.screenToCartesian3({ x: e.x, y: e.y }) : undefined,
            };
            return lastMove;
        })
            .takeUntil(pointerUp)
            .do(undefined, undefined, function () {
            if (lastMove) {
                var dropEvent = Object.assign({}, lastMove);
                dropEvent.drop = true;
                dropSubject.next(dropEvent);
            }
        });
        this.dragObservable = moveObservable.merge(dropSubject).takeUntil(stopper);
        this.stopper = stopper;
    };
    DraggableToMapService.decorators = [
        { type: _angular_core.Injectable },
    ];
    DraggableToMapService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [_angular_common.DOCUMENT,] },] },
        { type: MapsManagerService, },
    ]; };
    return DraggableToMapService;
}());

var DraggableToMapDirective = (function () {
    function DraggableToMapDirective(el, iconDragService) {
        this.iconDragService = iconDragService;
        el.nativeElement.style['user-drag'] = 'none';
        el.nativeElement.style['user-select'] = 'none';
        el.nativeElement.style['-moz-user-select'] = 'none';
        el.nativeElement.style['-webkit-user-drag'] = 'none';
        el.nativeElement.style['-webkit-user-select'] = 'none';
        el.nativeElement.style['-ms-user-select'] = 'none';
    }
    DraggableToMapDirective.prototype.ngOnInit = function () {
        if (typeof this.draggableToMap === 'string') {
            this.src = this.draggableToMap;
        }
        else {
            this.src = this.draggableToMap.src;
            this.style = this.draggableToMap.style;
        }
    };
    DraggableToMapDirective.prototype.onMouseDown = function () {
        this.iconDragService.drag(this.src, this.style);
    };
    DraggableToMapDirective.decorators = [
        { type: _angular_core.Directive, args: [{ selector: '[draggableToMap]' },] },
    ];
    DraggableToMapDirective.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: DraggableToMapService, },
    ]; };
    DraggableToMapDirective.propDecorators = {
        'draggableToMap': [{ type: _angular_core.Input },],
        'onMouseDown': [{ type: _angular_core.HostListener, args: ['mousedown',] },],
    };
    return DraggableToMapDirective;
}());

var AcToolbarComponent = (function () {
    function AcToolbarComponent(element) {
        this.element = element;
        this.allowDrag = true;
        this.dragStyle = {
            'height.px': 20,
            'width.px': 20,
        };
    }
    AcToolbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.allowDrag) {
            var mouseDown$ = rxjs_Observable.Observable.fromEvent(this.element.nativeElement, 'mousedown');
            var mouseMove$_1 = rxjs_Observable.Observable.fromEvent(document, 'mousemove');
            var mouseUp$_1 = rxjs_Observable.Observable.fromEvent(document, 'mouseup');
            var drag$ = mouseDown$.switchMap(function () { return mouseMove$_1.takeUntil(mouseUp$_1); });
            this.subscription = drag$.subscribe(function (event) {
                _this.element.nativeElement.style.left = event.x + 'px';
                _this.element.nativeElement.style.top = event.y + 'px';
            });
        }
    };
    AcToolbarComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AcToolbarComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-toolbar',
                    template: "\n        <div class=\"{{toolbarClass}}\">\n            <div *ngIf=\"allowDrag\">\n                <ac-toolbar-button>\n                    <ac-drag-icon></ac-drag-icon>\n                </ac-toolbar-button>\n            </div>\n\n            <ng-content></ng-content>\n        </div>\n    ",
                    styles: ["\n        :host {\n            position: absolute;\n            top: 100px;\n            left: 20px;\n            width: 20px;\n            height: 20px;\n            -webkit-user-drag: none;\n        }\n    "],
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    AcToolbarComponent.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
    ]; };
    AcToolbarComponent.propDecorators = {
        'toolbarClass': [{ type: _angular_core.Input },],
        'allowDrag': [{ type: _angular_core.Input },],
    };
    return AcToolbarComponent;
}());

var DragIconComponent = (function () {
    function DragIconComponent() {
    }
    DragIconComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-drag-icon',
                    template: "\n        <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\"  x=\"0px\" y=\"0px\"  height=\"25\"  width=\"25\"\n\t viewBox=\"0 0 476.737 476.737\" style=\"enable-background:new 0 0 476.737 476.737;\" xml:space=\"preserve\">\n<g>\n\t<g>\n\t\t<path style=\"fill:#010002;\" d=\"M475.498,232.298l-3.401-5.149l-63.565-63.565c-6.198-6.198-16.304-6.198-22.47,0\n\t\t\tc-6.198,6.198-6.198,16.273,0,22.47l36.423,36.423H254.26V54.253l36.423,36.423c6.166,6.198,16.273,6.198,22.47,0\n\t\t\tc6.166-6.198,6.166-16.273,0-22.47L249.588,4.64l-0.159-0.095l-4.99-3.305L238.369,0h-0.064l-6.007,1.24l-4.99,3.305l-0.191,0.095\n\t\t\tl-63.565,63.565c-6.198,6.198-6.198,16.273,0,22.47s16.273,6.198,22.47,0l36.455-36.423v168.225H54.253l36.423-36.423\n\t\t\tc6.198-6.198,6.198-16.273,0-22.47s-16.273-6.198-22.47,0L4.64,227.149l-0.095,0.159l-3.305,4.99L0,238.369v0.064l1.24,6.007\n\t\t\tl3.305,4.958l0.095,0.191l63.565,63.565c6.198,6.198,16.273,6.198,22.47,0c6.198-6.166,6.198-16.273,0-22.47L54.253,254.26\n\t\t\th168.225v168.225l-36.423-36.423c-6.198-6.166-16.273-6.166-22.47,0c-6.198,6.198-6.198,16.304,0,22.47l63.565,63.565l5.149,3.432\n\t\t\tl6.007,1.208h0.064l6.07-1.24l5.149-3.401l63.565-63.565c6.166-6.198,6.166-16.304,0-22.47c-6.198-6.198-16.304-6.198-22.47,0\n\t\t\tl-36.423,36.423V254.26h168.225l-36.423,36.423c-6.166,6.166-6.166,16.273,0,22.47c6.198,6.166,16.304,6.166,22.47,0\n\t\t\tl63.565-63.565l3.432-5.149l1.208-6.007v-0.064L475.498,232.298z\"/>\n\t</g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n</svg>\n    ",
                },] },
    ];
    DragIconComponent.ctorParameters = function () { return []; };
    return DragIconComponent;
}());

var AcToolbarButtonComponent = (function () {
    function AcToolbarButtonComponent() {
        this.onClick = new _angular_core.EventEmitter();
    }
    AcToolbarButtonComponent.prototype.ngOnInit = function () {
    };
    AcToolbarButtonComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ac-toolbar-button',
                    template: "\n        <div (click)=\"onClick.emit()\" class=\"button-container {{buttonClass}}\">\n            <img *ngIf=\"iconUrl\" [src]=\"iconUrl\" class=\"icon {{iconClass}}\"/>\n            <ng-content></ng-content>\n        </div>\n    ",
                    styles: ["\n        .button-container {\n            border-radius: 1px;\n            background-color: rgba(255, 255, 255, 0.8);\n            height: 30px;\n            width: 30px;\n            padding: 5px;\n            transition: all 0.2s;\n            cursor: pointer;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            flex-direction: column;\n        }\n\n        .button-container:hover {\n            background-color: rgba(255, 255, 255, 0.95);\n        }\n        \n        .icon {\n            height: 30px;\n            width: 30px;\n        }\n    "],
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    AcToolbarButtonComponent.ctorParameters = function () { return []; };
    AcToolbarButtonComponent.propDecorators = {
        'iconUrl': [{ type: _angular_core.Input },],
        'buttonClass': [{ type: _angular_core.Input },],
        'iconClass': [{ type: _angular_core.Input },],
        'onClick': [{ type: _angular_core.Output },],
    };
    return AcToolbarButtonComponent;
}());

var AngularCesiumWidgetsModule = (function () {
    function AngularCesiumWidgetsModule() {
    }
    AngularCesiumWidgetsModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        _angular_common.CommonModule,
                        AngularCesiumModule,
                    ],
                    declarations: [
                        HippodromeEditorComponent,
                        PolygonsEditorComponent,
                        CirclesEditorComponent,
                        PolylinesEditorComponent,
                        DraggableToMapDirective,
                        DragIconComponent,
                        AcToolbarComponent,
                        AcToolbarButtonComponent,
                    ],
                    exports: [
                        HippodromeEditorComponent,
                        PolygonsEditorComponent,
                        CirclesEditorComponent,
                        PolylinesEditorComponent,
                        DraggableToMapDirective,
                        AcToolbarComponent,
                        AcToolbarButtonComponent,
                    ],
                    providers: [
                        DraggableToMapService,
                    ]
                },] },
    ];
    AngularCesiumWidgetsModule.ctorParameters = function () { return []; };
    return AngularCesiumWidgetsModule;
}());

exports.CesiumHeatMapMaterialCreator = CesiumHeatMapMaterialCreator;
exports.AngularCesiumModule = AngularCesiumModule;
exports.AcEntity = AcEntity;
exports.AcNotification = AcNotification;
exports.AcMapComponent = AcMapComponent;
exports.AcLayerComponent = AcLayerComponent;
exports.AcArcDescComponent = AcArcDescComponent;
exports.AcBillboardComponent = AcBillboardComponent;
exports.AcBillboardDescComponent = AcBillboardDescComponent;
exports.AcBillboardPrimitiveDescComponent = AcBillboardPrimitiveDescComponent;
exports.AcCircleDescComponent = AcCircleDescComponent;
exports.AcEllipseDescComponent = AcEllipseDescComponent;
exports.AcPolylineDescComponent = AcPolylineDescComponent;
exports.AcPolylinePrimitiveDescComponent = AcPolylinePrimitiveDescComponent;
exports.AcLabelComponent = AcLabelComponent;
exports.AcLabelDescComponent = AcLabelDescComponent;
exports.AcLabelPrimitiveDescComponent = AcLabelPrimitiveDescComponent;
exports.AcPolygonDescComponent = AcPolygonDescComponent;
exports.AcPolygonComponent = AcPolygonComponent;
exports.AcPolylineComponent = AcPolylineComponent;
exports.AcPrimitivePolylineComponent = AcPrimitivePolylineComponent;
exports.AcPointComponent = AcPointComponent;
exports.AcPointDescComponent = AcPointDescComponent;
exports.AcCircleComponent = AcCircleComponent;
exports.AcArcComponent = AcArcComponent;
exports.AcEllipseComponent = AcEllipseComponent;
exports.AcHtmlComponent = AcHtmlComponent;
exports.AcMapLayerProviderComponent = AcMapLayerProviderComponent;
exports.AcDefaultPlonterComponent = AcDefaultPlonterComponent;
exports.AcBoxDescComponent = AcBoxDescComponent;
exports.AcCorridorDescComponent = AcCorridorDescComponent;
exports.AcCylinderDescComponent = AcCylinderDescComponent;
exports.AcEllipsoidDescComponent = AcEllipsoidDescComponent;
exports.AcPolylineVolumeDescComponent = AcPolylineVolumeDescComponent;
exports.AcWallDescComponent = AcWallDescComponent;
exports.AcRectangleDescComponent = AcRectangleDescComponent;
exports.AcTileset3dComponent = AcTileset3dComponent;
exports.AcHtmlDescComponent = AcHtmlDescComponent;
exports.AcArrayDescComponent = AcArrayDescComponent;
exports.AcDynamicCircleDescComponent = AcDynamicCircleDescComponent;
exports.AcDynamicEllipseDescComponent = AcDynamicEllipseDescComponent;
exports.AcDynamicPolylineDescComponent = AcDynamicPolylineDescComponent;
exports.AcStaticCircleDescComponent = AcStaticCircleDescComponent;
exports.AcStaticEllipseDescComponent = AcStaticEllipseDescComponent;
exports.AcStaticPolygonDescComponent = AcStaticPolygonDescComponent;
exports.AcStaticPolylineDescComponent = AcStaticPolylineDescComponent;
exports.MapEventsManagerService = MapEventsManagerService;
exports.DisposableObservable = DisposableObservable;
exports.CesiumService = CesiumService;
exports.CameraService = CameraService;
exports.CoordinateConverter = CoordinateConverter;
exports.GeoUtilsService = GeoUtilsService;
exports.PlonterService = PlonterService;
exports.ViewerConfiguration = ViewerConfiguration;
exports.MapsManagerService = MapsManagerService;
exports.KeyboardControlService = KeyboardControlService;
exports.PREDEFINED_KEYBOARD_ACTIONS = PREDEFINED_KEYBOARD_ACTIONS;
exports.ScreenshotService = ScreenshotService;
exports.SelectionManagerService = SelectionManagerService;
exports.ContextMenuService = ContextMenuService;
exports.PixelOffsetPipe = PixelOffsetPipe;
exports.AngularCesiumWidgetsModule = AngularCesiumWidgetsModule;
exports.EditPoint = EditPoint;
exports.EditPolyline = EditPolyline;
exports.EditArc = EditArc;
exports.EditablePolygon = EditablePolygon;
exports.EditableCircle = EditableCircle;
exports.EditablePolyline = EditablePolyline;
exports.EditorObservable = EditorObservable;
exports.PolygonEditorObservable = PolygonEditorObservable;
exports.CircleEditorObservable = CircleEditorObservable;
exports.defaultLabelProps = defaultLabelProps;
exports.PolygonsEditorComponent = PolygonsEditorComponent;
exports.CirclesEditorComponent = CirclesEditorComponent;
exports.PolylinesEditorComponent = PolylinesEditorComponent;
exports.HippodromeEditorComponent = HippodromeEditorComponent;
exports.DraggableToMapDirective = DraggableToMapDirective;
exports.AcToolbarComponent = AcToolbarComponent;
exports.AcToolbarButtonComponent = AcToolbarButtonComponent;
exports.DEFAULT_POLYGON_OPTIONS = DEFAULT_POLYGON_OPTIONS;
exports.PolygonsEditorService = PolygonsEditorService;
exports.DEFAULT_CIRCLE_OPTIONS = DEFAULT_CIRCLE_OPTIONS;
exports.CirclesEditorService = CirclesEditorService;
exports.DEFAULT_POLYLINE_OPTIONS = DEFAULT_POLYLINE_OPTIONS;
exports.PolylinesEditorService = PolylinesEditorService;
exports.DEFAULT_HIPPODROME_OPTIONS = DEFAULT_HIPPODROME_OPTIONS;
exports.HippodromeEditorService = HippodromeEditorService;
exports.DraggableToMapService = DraggableToMapService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-cesium.umd.js.map
