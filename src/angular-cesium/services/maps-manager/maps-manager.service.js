import { Injectable } from '@angular/core';
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
        { type: Injectable },
    ];
    MapsManagerService.ctorParameters = function () { return []; };
    return MapsManagerService;
}());
export { MapsManagerService };
//# sourceMappingURL=maps-manager.service.js.map