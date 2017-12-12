import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CesiumEvent } from '../map-events-mananger/consts/cesium-event.enum';
import { PickOptions } from '../map-events-mananger/consts/pickOptions.enum';
import { MapsManagerService } from '../maps-manager/maps-manager.service';
import { Subject } from 'rxjs/Subject';
var SelectionManagerService = (function () {
    function SelectionManagerService(mapsManager) {
        this.mapsManager = mapsManager;
        this.selectedEntitiesItems$ = new BehaviorSubject([]);
        this.selectedEntitySubject$ = new Subject();
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
            Object.assign(selectionOptions, { event: CesiumEvent.LEFT_CLICK });
        }
        var eventSubscription = this.mapEventsManagerService.register({
            event: selectionOptions.event,
            pick: PickOptions.PICK_ONE,
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
        { type: Injectable },
    ];
    SelectionManagerService.ctorParameters = function () { return [
        { type: MapsManagerService, },
    ]; };
    return SelectionManagerService;
}());
export { SelectionManagerService };
//# sourceMappingURL=selection-manager.service.js.map