import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
var AcContextMenuWrapperComponent = (function () {
    function AcContextMenuWrapperComponent(contextMenuService, cd, componentFactoryResolver) {
        this.contextMenuService = contextMenuService;
        this.cd = cd;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    AcContextMenuWrapperComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contextMenuChangeSubscription =
            this.contextMenuService.contextMenuChangeNotifier.subscribe(function () { return _this.cd.detectChanges(); });
        this.contextMenuOpenSubscription =
            this.contextMenuService.onOpen.subscribe(function () {
                var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(_this.contextMenuService.content);
                _this.viewContainerRef.clear();
                var componentRef = _this.viewContainerRef.createComponent(componentFactory);
                componentRef.instance.data = _this.contextMenuService.options.data;
                _this.cd.detectChanges();
            });
    };
    AcContextMenuWrapperComponent.prototype.ngOnDestroy = function () {
        if (this.contextMenuChangeSubscription) {
            this.contextMenuChangeSubscription.unsubscribe();
        }
        if (this.contextMenuOpenSubscription) {
            this.contextMenuOpenSubscription.unsubscribe();
        }
    };
    AcContextMenuWrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-context-menu-wrapper',
                    template: "\n      <ac-html *ngIf=\"contextMenuService.showContextMenu\" [props]=\"{position: contextMenuService.position}\">\n          <div #contextMenuContainer></div>\n      </ac-html>\n  ",
                    styles: [],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    AcContextMenuWrapperComponent.ctorParameters = function () { return [
        { type: ContextMenuService, },
        { type: ChangeDetectorRef, },
        { type: ComponentFactoryResolver, },
    ]; };
    AcContextMenuWrapperComponent.propDecorators = {
        'viewContainerRef': [{ type: ViewChild, args: ['contextMenuContainer', { read: ViewContainerRef },] },],
    };
    return AcContextMenuWrapperComponent;
}());
export { AcContextMenuWrapperComponent };
//# sourceMappingURL=ac-context-menu-wrapper.component.js.map