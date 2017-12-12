import { Observable } from 'rxjs/Observable';
var CesiumPureEventObserver = (function () {
    function CesiumPureEventObserver(event, modifier) {
        this.event = event;
        this.modifier = modifier;
    }
    CesiumPureEventObserver.prototype.init = function (eventsHandler) {
        var _this = this;
        this.observer = Observable.create(function (observer) {
            eventsHandler.setInputAction(function (movement) {
                if (movement.position) {
                    movement.startPosition = movement.position;
                    movement.endPosition = movement.position;
                }
                observer.next(movement);
            }, _this.event, _this.modifier);
        });
        return this.observer;
    };
    return CesiumPureEventObserver;
}());
export { CesiumPureEventObserver };
//# sourceMappingURL=cesium-pure-event-observer.js.map