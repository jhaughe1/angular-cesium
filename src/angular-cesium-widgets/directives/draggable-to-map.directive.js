import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { DraggableToMapService } from '../services/draggable-to-map.service';
var DraggableToMapDirective = (function () {
    function DraggableToMapDirective(el, iconDragService) {
        this.iconDragService = iconDragService;
        el.nativeElement.style['user-drag'] = 'none';
        el.nativeElement.style['user-select'] = 'none';
        el.nativeElement.style['-moz-user-select'] = 'none';
        el.nativeElement.style['-webkit-user-drag'] = 'none';
        el.nativeElement.style['-webkit-user-select'] = 'none';
        el.nativeElement.style['-ms-user-select'] = 'none';
    }
    DraggableToMapDirective.prototype.ngOnInit = function () {
        if (typeof this.draggableToMap === 'string') {
            this.src = this.draggableToMap;
        }
        else {
            this.src = this.draggableToMap.src;
            this.style = this.draggableToMap.style;
        }
    };
    DraggableToMapDirective.prototype.onMouseDown = function () {
        this.iconDragService.drag(this.src, this.style);
    };
    DraggableToMapDirective.decorators = [
        { type: Directive, args: [{ selector: '[draggableToMap]' },] },
    ];
    DraggableToMapDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: DraggableToMapService, },
    ]; };
    DraggableToMapDirective.propDecorators = {
        'draggableToMap': [{ type: Input },],
        'onMouseDown': [{ type: HostListener, args: ['mousedown',] },],
    };
    return DraggableToMapDirective;
}());
export { DraggableToMapDirective };
//# sourceMappingURL=draggable-to-map.directive.js.map