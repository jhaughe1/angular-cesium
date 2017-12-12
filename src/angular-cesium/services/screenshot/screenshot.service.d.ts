import { CesiumService } from '../cesium/cesium.service';
export declare class ScreenshotService {
    private cesiumSerive;
    constructor(cesiumSerive: CesiumService);
    getMapScreenshotDataUrlBase64(): string;
    downloadMapScreenshot(filename?: string): void;
    private downloadURI(uri, name);
}
