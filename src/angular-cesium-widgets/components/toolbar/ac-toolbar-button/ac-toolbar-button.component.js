import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
var AcToolbarButtonComponent = (function () {
    function AcToolbarButtonComponent() {
        this.onClick = new EventEmitter();
    }
    AcToolbarButtonComponent.prototype.ngOnInit = function () {
    };
    AcToolbarButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-toolbar-button',
                    template: "\n        <div (click)=\"onClick.emit()\" class=\"button-container {{buttonClass}}\">\n            <img *ngIf=\"iconUrl\" [src]=\"iconUrl\" class=\"icon {{iconClass}}\"/>\n            <ng-content></ng-content>\n        </div>\n    ",
                    styles: ["\n        .button-container {\n            border-radius: 1px;\n            background-color: rgba(255, 255, 255, 0.8);\n            height: 30px;\n            width: 30px;\n            padding: 5px;\n            transition: all 0.2s;\n            cursor: pointer;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            flex-direction: column;\n        }\n\n        .button-container:hover {\n            background-color: rgba(255, 255, 255, 0.95);\n        }\n        \n        .icon {\n            height: 30px;\n            width: 30px;\n        }\n    "],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    AcToolbarButtonComponent.ctorParameters = function () { return []; };
    AcToolbarButtonComponent.propDecorators = {
        'iconUrl': [{ type: Input },],
        'buttonClass': [{ type: Input },],
        'iconClass': [{ type: Input },],
        'onClick': [{ type: Output },],
    };
    return AcToolbarButtonComponent;
}());
export { AcToolbarButtonComponent };
//# sourceMappingURL=ac-toolbar-button.component.js.map