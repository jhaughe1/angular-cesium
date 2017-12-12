import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { PlonterService } from '../../services/plonter/plonter.service';
import { CoordinateConverter } from '../../services/coordinate-converter/coordinate-converter.service';
var AcDefaultPlonterComponent = (function () {
    function AcDefaultPlonterComponent(plonterService, cd, geoConverter) {
        this.plonterService = plonterService;
        this.cd = cd;
        this.geoConverter = geoConverter;
    }
    AcDefaultPlonterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.plonterService.plonterChangeNotifier.subscribe(function () { return _this.cd.detectChanges(); });
    };
    Object.defineProperty(AcDefaultPlonterComponent.prototype, "plonterPosition", {
        get: function () {
            if (this.plonterService.plonterShown) {
                var screenPos = this.plonterService.plonterClickPosition.endPosition;
                return this.geoConverter.screenToCartesian3(screenPos, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    AcDefaultPlonterComponent.prototype.chooseEntity = function (entity) {
        this.plonterService.resolvePlonter(entity);
    };
    AcDefaultPlonterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-default-plonter',
                    template: "\n        <ac-html *ngIf=\"plonterService.plonterShown\" [props]=\"{\n        position: plonterPosition\n      }\">\n            <div class=\"plonter-context-menu\">\n                <div *ngFor=\"let entity of plonterService.entitesToPlonter\">\n                    <div class=\"plonter-item\" (click)=\"chooseEntity(entity)\">{{ entity?.name || entity?.id }}\n                    </div>\n                </div>\n            </div>\n        </ac-html>\n    ",
                    styles: ["\n        .plonter-context-menu {\n            background-color: rgba(250, 250, 250, 0.8);\n            box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);\n        }\n\n        .plonter-item {\n            cursor: pointer;\n            padding: 2px 15px;\n            text-align: start;\n        }\n\n        .plonter-item:hover {\n            background-color: rgba(0, 0, 0, 0.15);\n        }\n    \n    "],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [CoordinateConverter],
                },] },
    ];
    AcDefaultPlonterComponent.ctorParameters = function () { return [
        { type: PlonterService, },
        { type: ChangeDetectorRef, },
        { type: CoordinateConverter, },
    ]; };
    return AcDefaultPlonterComponent;
}());
export { AcDefaultPlonterComponent };
//# sourceMappingURL=ac-default-plonter.component.js.map