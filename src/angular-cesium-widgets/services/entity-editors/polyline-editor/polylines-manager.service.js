import { Injectable } from '@angular/core';
import { EditablePolyline } from '../../../models/editable-polyline';
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
        { type: Injectable },
    ];
    PolylinesManagerService.ctorParameters = function () { return []; };
    return PolylinesManagerService;
}());
export { PolylinesManagerService };
//# sourceMappingURL=polylines-manager.service.js.map