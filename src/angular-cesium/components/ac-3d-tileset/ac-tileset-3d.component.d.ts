import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CesiumService } from '../../services/cesium/cesium.service';
export declare class AcTileset3dComponent implements OnInit, OnChanges, OnDestroy {
    private cesiumService;
    options: {
        url?: string;
    };
    index: Number;
    show: boolean;
    style: any;
    tilesetInstance: any;
    private _3dtilesCollection;
    constructor(cesiumService: CesiumService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
