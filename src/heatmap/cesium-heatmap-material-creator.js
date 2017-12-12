import { GeoUtilsService } from '../angular-cesium/services/geo-utils/geo-utils.service';
import * as h337 from 'heatmap.js/build/heatmap.js';
import { Injectable } from '@angular/core';
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
    ;
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
    ;
    CesiumHeatMapMaterialCreator.prototype.mercatorPointToHeatmapPoint = function (p) {
        var pn = {};
        pn.x = Math.round((p.x - this._xoffset) / this._factor + this._spacing);
        pn.y = Math.round((p.y - this._yoffset) / this._factor + this._spacing);
        pn.y = this.height - pn.y;
        return pn;
    };
    ;
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
    ;
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
    ;
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
    ;
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
    ;
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
        { type: Injectable },
    ];
    CesiumHeatMapMaterialCreator.ctorParameters = function () { return []; };
    return CesiumHeatMapMaterialCreator;
}());
export { CesiumHeatMapMaterialCreator };
//# sourceMappingURL=cesium-heatmap-material-creator.js.map