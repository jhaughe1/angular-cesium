import { ChangeDetectorRef, Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { AcHtmlManager } from '../../services/ac-html-manager/ac-html-manager.service';
var AcHtmlContext = (function () {
    function AcHtmlContext(id, context) {
        this.id = id;
        this.context = context;
    }
    return AcHtmlContext;
}());
export { AcHtmlContext };
var AcHtmlDirective = (function () {
    function AcHtmlDirective(_templateRef, _viewContainerRef, _changeDetector, _layerService, _acHtmlManager) {
        this._templateRef = _templateRef;
        this._viewContainerRef = _viewContainerRef;
        this._changeDetector = _changeDetector;
        this._layerService = _layerService;
        this._acHtmlManager = _acHtmlManager;
        this._views = new Map();
    }
    AcHtmlDirective.prototype.ngOnInit = function () {
    };
    AcHtmlDirective.prototype._handleView = function (id, primitive, entity) {
        if (!this._views.has(id) && primitive.show) {
            var context = new AcHtmlContext(id, { $implicit: entity });
            var viewRef = this._viewContainerRef.createEmbeddedView(this._templateRef, context);
            this._views.set(id, { viewRef: viewRef, context: context });
            this._changeDetector.detectChanges();
        }
        else if (this._views.has(id) && !primitive.show) {
            this.remove(id, primitive);
        }
        else if (this._views.has(id) && primitive.show) {
            this._changeDetector.detectChanges();
        }
    };
    AcHtmlDirective.prototype.addOrUpdate = function (id, primitive) {
        var context = this._layerService.context;
        var entity = context[this._layerService.getEntityName()];
        if (this._views.has(id)) {
            this._views.get(id).context.context.$implicit = entity;
        }
        this._acHtmlManager.addOrUpdate(id, { entity: entity, primitive: primitive });
        this._handleView(id, primitive, entity);
    };
    AcHtmlDirective.prototype.remove = function (id, primitive) {
        if (!this._views.has(id)) {
            return;
        }
        var viewRef = this._views.get(id).viewRef;
        this._viewContainerRef.remove(this._viewContainerRef.indexOf(viewRef));
        this._views.delete(id);
        this._acHtmlManager.remove(id);
        primitive.element = null;
    };
    AcHtmlDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[acHtml]',
                },] },
    ];
    AcHtmlDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
        { type: ChangeDetectorRef, },
        { type: LayerService, },
        { type: AcHtmlManager, },
    ]; };
    return AcHtmlDirective;
}());
export { AcHtmlDirective };
//# sourceMappingURL=ac-html.directive.js.map