import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CesiumService } from '../cesium/cesium.service';
import { CesiumEventBuilder } from './cesium-event-builder';
import { PickOptions } from './consts/pickOptions.enum';
import { CesiumEvent } from './consts/cesium-event.enum';
import { PlonterService } from '../plonter/plonter.service';
import { UtilsService } from '../../utils/utils.service';
import { CesiumDragDropHelper } from './event-observers/cesium-drag-drop-helper';
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
        input.pick = input.pick || PickOptions.NO_PICK;
        input.priority = input.priority || 0;
        if (input.entityType && input.pick === PickOptions.NO_PICK) {
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
        var stopper = new Subject();
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
        var mouseMoveObservable = this.eventBuilder.get(CesiumEvent.MOUSE_MOVE);
        var mouseDownRegistration = this.createEventRegistration(mouseDownEvent, modifier, entityType, pickOption, priority);
        var dropSubject = new Subject();
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
            case PickOptions.PICK_ONE:
            case PickOptions.PICK_ALL:
                picks = this.scene.drillPick(movement.endPosition);
                picks = picks.length === 0 ? null : picks;
                break;
            case PickOptions.PICK_FIRST:
                var pick = this.scene.pick(movement.endPosition);
                picks = pick === undefined ? null : [pick];
                break;
            case PickOptions.NO_PICK:
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
        if (pickOption !== PickOptions.NO_PICK) {
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
        if (pickOption === PickOptions.PICK_ONE && entitiesAndMovement.entities !== null && entitiesAndMovement.entities.length > 1) {
            return this.plonterService.plonterIt(entitiesAndMovement);
        }
        else {
            return Observable.of(entitiesAndMovement);
        }
    };
    MapEventsManagerService.decorators = [
        { type: Injectable },
    ];
    MapEventsManagerService.ctorParameters = function () { return [
        { type: CesiumService, },
        { type: CesiumEventBuilder, },
        { type: PlonterService, },
    ]; };
    return MapEventsManagerService;
}());
export { MapEventsManagerService };
//# sourceMappingURL=map-events-manager.js.map