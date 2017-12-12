import { ChangeDetectorRef, ComponentFactoryResolver, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
export declare class AcContextMenuWrapperComponent implements OnInit, OnDestroy {
    contextMenuService: ContextMenuService;
    private cd;
    private componentFactoryResolver;
    private contextMenuChangeSubscription;
    private contextMenuOpenSubscription;
    viewContainerRef: ViewContainerRef;
    constructor(contextMenuService: ContextMenuService, cd: ChangeDetectorRef, componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
