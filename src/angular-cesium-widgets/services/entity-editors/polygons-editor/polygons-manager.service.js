import { Injectable } from '@angular/core';
import { EditablePolygon } from '../../../models/editable-polygon';
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
        { type: Injectable },
    ];
    PolygonsManagerService.ctorParameters = function () { return []; };
    return PolygonsManagerService;
}());
export { PolygonsManagerService };
//# sourceMappingURL=polygons-manager.service.js.map