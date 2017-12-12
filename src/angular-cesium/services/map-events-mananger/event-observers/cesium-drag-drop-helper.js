import { CesiumEvent } from '../consts/cesium-event.enum';
var CesiumDragDropHelper = (function () {
    function CesiumDragDropHelper() {
    }
    CesiumDragDropHelper.getDragEventTypes = function (dragEvent) {
        var mouseDownEvent;
        var mouseUpEvent;
        if (dragEvent === CesiumEvent.LEFT_CLICK_DRAG) {
            mouseDownEvent = CesiumEvent.LEFT_DOWN;
            mouseUpEvent = CesiumEvent.LEFT_UP;
        }
        else if (dragEvent === CesiumEvent.RIGHT_CLICK_DRAG) {
            mouseDownEvent = CesiumEvent.RIGHT_DOWN;
            mouseUpEvent = CesiumEvent.RIGHT_UP;
        }
        else if (dragEvent === CesiumEvent.MIDDLE_CLICK_DRAG) {
            mouseDownEvent = CesiumEvent.MIDDLE_DOWN;
            mouseUpEvent = CesiumEvent.MIDDLE_UP;
        }
        return { mouseDownEvent: mouseDownEvent, mouseUpEvent: mouseUpEvent };
    };
    CesiumDragDropHelper.dragEvents = new Set([
        CesiumEvent.LEFT_CLICK_DRAG,
        CesiumEvent.RIGHT_CLICK_DRAG,
        CesiumEvent.MIDDLE_CLICK_DRAG
    ]);
    return CesiumDragDropHelper;
}());
export { CesiumDragDropHelper };
//# sourceMappingURL=cesium-drag-drop-helper.js.map