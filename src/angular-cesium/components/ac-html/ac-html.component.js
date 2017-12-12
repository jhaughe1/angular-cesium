import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { CesiumService } from '../../services/cesium/cesium.service';
var AcHtmlComponent = (function () {
    function AcHtmlComponent(cesiumService, elementRef, renderer) {
        this.cesiumService = cesiumService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.isDraw = false;
    }
    AcHtmlComponent.prototype.setScreenPosition = function (screenPosition) {
        if (screenPosition) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'top', screenPosition.y + "px");
            this.renderer.setStyle(this.elementRef.nativeElement, 'left', screenPosition.x + "px");
        }
    };
    AcHtmlComponent.prototype.remove = function () {
        if (this.isDraw) {
            this.isDraw = false;
            this.cesiumService.getScene().preRender.removeEventListener(this.preRenderEventListener);
            this.renderer.setStyle(this.elementRef.nativeElement, 'display', "none");
        }
    };
    AcHtmlComponent.prototype.add = function () {
        var _this = this;
        if (!this.isDraw) {
            this.isDraw = true;
            this.preRenderEventListener = function () {
                var screenPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(_this.cesiumService.getScene(), _this.props.position);
                _this.setScreenPosition(screenPosition);
            };
            this.renderer.setStyle(this.elementRef.nativeElement, 'display', "block");
            this.cesiumService.getScene().preRender.addEventListener(this.preRenderEventListener);
        }
    };
    AcHtmlComponent.prototype.ngDoCheck = function () {
        if (this.props.show === undefined || this.props.show) {
            this.add();
        }
        else {
            this.remove();
        }
    };
    AcHtmlComponent.prototype.ngOnDestroy = function () {
        this.remove();
    };
    AcHtmlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-html',
                    template: "<ng-content></ng-content>",
                    styles: [":host {\n                position: absolute;\n                z-index: 100;\n\t\t\t\t}"]
                },] },
    ];
    AcHtmlComponent.ctorParameters = function () { return [
        { type: CesiumService, },
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    AcHtmlComponent.propDecorators = {
        'props': [{ type: Input },],
    };
    return AcHtmlComponent;
}());
export { AcHtmlComponent };
//# sourceMappingURL=ac-html.component.js.map