import { Injectable } from '@angular/core';
import { EditableHippodrome } from '../../../models/editable-hippodrome';
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
        { type: Injectable },
    ];
    HippodromeManagerService.ctorParameters = function () { return []; };
    return HippodromeManagerService;
}());
export { HippodromeManagerService };
//# sourceMappingURL=hippodrome-manager.service.js.map