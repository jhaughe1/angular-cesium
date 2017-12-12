import { NgZone } from '@angular/core';
import { ViewerFactory } from '../viewer-factory/viewer-factory.service';
import { ViewerConfiguration } from '../viewer-configuration/viewer-configuration.service';
export declare class CesiumService {
    private ngZone;
    private viewerFactory;
    private viewerConfiguration;
    private cesiumViewer;
    constructor(ngZone: NgZone, viewerFactory: ViewerFactory, viewerConfiguration: ViewerConfiguration);
    init(mapContainer: HTMLElement): void;
    getViewer(): any;
    getScene(): any;
    getCanvas(): HTMLCanvasElement;
}
