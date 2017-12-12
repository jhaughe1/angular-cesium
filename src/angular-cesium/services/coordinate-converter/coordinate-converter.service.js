var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Injectable, Optional } from '@angular/core';
import { CesiumService } from '../cesium/cesium.service';
import * as geodesy from 'geodesy';
import { LatLonEllipsoidal, Utm } from 'geodesy';
var LatLonVectors = geodesy['LatLonVectors'];
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
            var screenPosition = __assign({}, screenPos);
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
        return new LatLonEllipsoidal(latitude, longitude).toUtm();
    };
    CoordinateConverter.prototype.UTMToDegrees = function (zone, hemisphereType, easting, northing) {
        return this.geodesyToCesiumObject(new Utm(zone, hemisphereType, easting, northing).toLatLonE());
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
        var firstPoint = new LatLonVectors(toDeg(first.latitude), toDeg(first.longitude));
        var secondPoint = new LatLonVectors(toDeg(second.latitude), toDeg(second.longitude));
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
        var firstPoint = new LatLonVectors(toDeg(first.latitude), toDeg(first.longitude));
        var secondPoint = new LatLonVectors(toDeg(second.latitude), toDeg(second.longitude));
        var bearing = firstPoint.bearingTo(secondPoint);
        return bearing;
    };
    CoordinateConverter.prototype.bearingToCartesian = function (firstCartesian3, secondCartesian3) {
        var firstCart = Cesium.Cartographic.fromCartesian(firstCartesian3);
        var secondCart = Cesium.Cartographic.fromCartesian(secondCartesian3);
        return this.bearingTo(firstCart, secondCart);
    };
    CoordinateConverter.decorators = [
        { type: Injectable },
    ];
    CoordinateConverter.ctorParameters = function () { return [
        { type: CesiumService, decorators: [{ type: Optional },] },
    ]; };
    return CoordinateConverter;
}());
export { CoordinateConverter };
//# sourceMappingURL=coordinate-converter.service.js.map