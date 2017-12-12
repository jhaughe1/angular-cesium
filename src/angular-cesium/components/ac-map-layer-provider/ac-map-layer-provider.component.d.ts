import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CesiumService } from '../../services/cesium/cesium.service';
export declare class AcMapLayerProviderComponent implements OnInit, OnChanges, OnDestroy {
    private cesiumService;
    private createOfflineMapProvider();
    options: {
        url?: string;
    };
    provider: any;
    index: Number;
    show: boolean;
    alpha: number;
    brightness: number;
    contrast: number;
    imageryLayer: any;
    imageryLayersCollection: any;
    layerProvider: any;
    constructor(cesiumService: CesiumService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
