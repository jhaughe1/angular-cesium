import { Injectable } from '@angular/core';
import { CesiumService } from '../cesium/cesium.service';
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
        { type: Injectable },
    ];
    GeoUtilsService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return GeoUtilsService;
}());
export { GeoUtilsService };
//# sourceMappingURL=geo-utils.service.js.map