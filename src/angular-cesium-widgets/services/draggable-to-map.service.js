import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MapsManagerService } from '../../angular-cesium/services/maps-manager/maps-manager.service';
var DraggableToMapService = (function () {
    function DraggableToMapService(document, mapsManager) {
        this.document = document;
        this.mapsManager = mapsManager;
        this.mainSubject = new Subject();
    }
    DraggableToMapService.prototype.setCoordinateConverter = function (coordinateConverter) {
        this.coordinateConverter = coordinateConverter;
    };
    DraggableToMapService.prototype.drag = function (imageSrc, style) {
        var _this = this;
        if (!this.coordinateConverter) {
            var map = this.mapsManager.getMap();
            if (map) {
                this.coordinateConverter = map.getCoordinateConverter();
            }
        }
        this.cancel();
        var imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.style.position = 'fixed';
        imgElement.style.visibility = 'hidden';
        imgElement.style.width = '30px';
        imgElement.style.height = '30px';
        imgElement.style['user-drag'] = 'none';
        imgElement.style['user-select'] = 'none';
        imgElement.style['-moz-user-select'] = 'none';
        imgElement.style['-webkit-user-drag'] = 'none';
        imgElement.style['-webkit-user-select'] = 'none';
        imgElement.style['-ms-user-select'] = 'none';
        Object.assign(imgElement.style, style);
        document.body.appendChild(imgElement);
        this.createDragObservable();
        this.dragObservable.subscribe(function (e) {
            imgElement.style.visibility = 'visible';
            imgElement.style.left = e.screenPosition.x - imgElement.clientWidth / 2 + 'px';
            imgElement.style.top = e.screenPosition.y - imgElement.clientHeight / 2 + 'px';
            _this.mainSubject.next(e);
            if (e.drop) {
                imgElement.remove();
            }
        }, function (e) {
            imgElement.remove();
        }, function () {
            imgElement.remove();
        });
    };
    DraggableToMapService.prototype.dragUpdates = function () {
        return this.mainSubject;
    };
    DraggableToMapService.prototype.cancel = function () {
        if (this.stopper) {
            this.stopper.next(true);
            this.stopper = undefined;
            this.dragObservable = undefined;
        }
    };
    DraggableToMapService.prototype.createDragObservable = function () {
        var _this = this;
        var stopper = new Subject();
        var dropSubject = new Subject();
        var pointerUp = Observable.fromEvent(document, 'pointerup');
        var pointerMove = Observable.fromEvent(document, 'pointermove');
        var dragStartPositionX;
        var dragStartPositionY;
        var lastMove;
        var moveObservable = pointerMove.map(function (e) {
            dragStartPositionX = dragStartPositionX ? dragStartPositionX : e.x;
            dragStartPositionY = dragStartPositionY ? dragStartPositionY : e.y;
            lastMove = {
                drop: false,
                initialScreenPosition: {
                    x: dragStartPositionX,
                    y: dragStartPositionY,
                },
                screenPosition: {
                    x: e.x,
                    y: e.y,
                },
                mapPosition: _this.coordinateConverter ?
                    _this.coordinateConverter.screenToCartesian3({ x: e.x, y: e.y }) : undefined,
            };
            return lastMove;
        })
            .takeUntil(pointerUp)
            .do(undefined, undefined, function () {
            if (lastMove) {
                var dropEvent = Object.assign({}, lastMove);
                dropEvent.drop = true;
                dropSubject.next(dropEvent);
            }
        });
        this.dragObservable = moveObservable.merge(dropSubject).takeUntil(stopper);
        this.stopper = stopper;
    };
    DraggableToMapService.decorators = [
        { type: Injectable },
    ];
    DraggableToMapService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: MapsManagerService, },
    ]; };
    return DraggableToMapService;
}());
export { DraggableToMapService };
//# sourceMappingURL=draggable-to-map.service.js.map