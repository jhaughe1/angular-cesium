import { Injectable } from '@angular/core';
import { EditableCircle } from '../../../models/editable-circle';
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
        { type: Injectable },
    ];
    CirclesManagerService.ctorParameters = function () { return []; };
    return CirclesManagerService;
}());
export { CirclesManagerService };
//# sourceMappingURL=circles-manager.service.js.map