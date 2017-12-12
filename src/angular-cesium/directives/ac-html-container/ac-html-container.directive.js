import { Directive, Input, ElementRef } from '@angular/core';
import { AcHtmlManager } from '../../services/ac-html-manager/ac-html-manager.service';
var AcHtmlContainerDirective = (function () {
    function AcHtmlContainerDirective(_element, _acHtmlManager) {
        this._element = _element;
        this._acHtmlManager = _acHtmlManager;
    }
    Object.defineProperty(AcHtmlContainerDirective.prototype, "acHtmlContainer", {
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    AcHtmlContainerDirective.prototype.ngOnInit = function () {
        if (this._id === undefined) {
            throw new Error("AcHtml container ERROR: entity id not defined");
        }
        var entity = this._acHtmlManager.get(this._id);
        entity.primitive.element = this._element.nativeElement;
    };
    AcHtmlContainerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[acHtmlContainer]'
                },] },
    ];
    AcHtmlContainerDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: AcHtmlManager, },
    ]; };
    AcHtmlContainerDirective.propDecorators = {
        'acHtmlContainer': [{ type: Input },],
    };
    return AcHtmlContainerDirective;
}());
export { AcHtmlContainerDirective };
//# sourceMappingURL=ac-html-container.directive.js.map