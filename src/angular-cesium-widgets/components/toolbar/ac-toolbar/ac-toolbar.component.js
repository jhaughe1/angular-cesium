import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
var AcToolbarComponent = (function () {
    function AcToolbarComponent(element) {
        this.element = element;
        this.allowDrag = true;
        this.dragStyle = {
            'height.px': 20,
            'width.px': 20,
        };
    }
    AcToolbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.allowDrag) {
            var mouseDown$ = Observable.fromEvent(this.element.nativeElement, 'mousedown');
            var mouseMove$_1 = Observable.fromEvent(document, 'mousemove');
            var mouseUp$_1 = Observable.fromEvent(document, 'mouseup');
            var drag$ = mouseDown$.switchMap(function () { return mouseMove$_1.takeUntil(mouseUp$_1); });
            this.subscription = drag$.subscribe(function (event) {
                _this.element.nativeElement.style.left = event.x + 'px';
                _this.element.nativeElement.style.top = event.y + 'px';
            });
        }
    };
    AcToolbarComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AcToolbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-toolbar',
                    template: "\n        <div class=\"{{toolbarClass}}\">\n            <div *ngIf=\"allowDrag\">\n                <ac-toolbar-button>\n                    <ac-drag-icon></ac-drag-icon>\n                </ac-toolbar-button>\n            </div>\n\n            <ng-content></ng-content>\n        </div>\n    ",
                    styles: ["\n        :host {\n            position: absolute;\n            top: 100px;\n            left: 20px;\n            width: 20px;\n            height: 20px;\n            -webkit-user-drag: none;\n        }\n    "],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    AcToolbarComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    AcToolbarComponent.propDecorators = {
        'toolbarClass': [{ type: Input },],
        'allowDrag': [{ type: Input },],
    };
    return AcToolbarComponent;
}());
export { AcToolbarComponent };
//# sourceMappingURL=ac-toolbar.component.js.map