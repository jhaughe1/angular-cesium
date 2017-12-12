import { DoCheck, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { CesiumService } from '../../services/cesium/cesium.service';
export declare class AcHtmlComponent implements DoCheck, OnDestroy {
    private cesiumService;
    private elementRef;
    private renderer;
    props: any;
    private isDraw;
    preRenderEventListener: () => void;
    constructor(cesiumService: CesiumService, elementRef: ElementRef, renderer: Renderer2);
    setScreenPosition(screenPosition: any): void;
    remove(): void;
    add(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
}
