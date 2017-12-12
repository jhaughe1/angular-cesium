import { Rectangle } from './cesium-heatmap-material-creator';
import { Cartesian3 } from './../angular-cesium/models/cartesian3';
export interface Rectangle {
    west: number;
    south: number;
    east: number;
    north: number;
}
export interface HeatPointDataPoint {
    x: number;
    y: number;
    value: number;
}
export interface HeatmapDataSet {
    min?: number;
    max?: number;
    heatPointsData: HeatPointDataPoint[];
}
export interface HeatMapOptions {
    [propName: string]: any;
    gradient?: any;
    radius?: number;
    opacity?: number;
    maxOpacity?: number;
    minOpacity?: number;
    blur?: any;
}
export declare class CesiumHeatMapMaterialCreator {
    private static containerCanvasCounter;
    static calcCircleContainingRect(center: Cartesian3, radius: number): any;
    static calcEllipseContainingRect(center: Cartesian3, semiMajorAxis: number, semiMinorAxis: number): any;
    static calculateContainingRectFromPoints(points: Cartesian3[]): any;
    heatmapOptionsDefaults: {
        minCanvasSize: number;
        maxCanvasSize: number;
        radiusFactor: number;
        spacingFactor: number;
        maxOpacity: number;
        minOpacity: number;
        blur: number;
        gradient: {
            '.3': string;
            '.65': string;
            '.8': string;
            '.95': string;
        };
    };
    WMP: any;
    _spacing: number;
    width: number;
    height: number;
    _mbounds: any;
    bounds: any;
    _factor: number;
    _rectangle: Rectangle;
    heatmap: any;
    _xoffset: any;
    _yoffset: any;
    setData(min: any, max: any, data: any): boolean;
    private setWGS84Data(min, max, data);
    private mercatorPointToHeatmapPoint(p);
    private wgs84PointToHeatmapPoint;
    private createContainer(height, width);
    private wgs84ToMercator(p);
    private rad2deg;
    private wgs84ToMercatorBB(bb);
    private mercatorToWgs84BB(bb);
    private setWidthAndHeight(mbb);
    create(containingBoundingRect: Rectangle, heatmapDataSet: HeatmapDataSet, heatmapOptions: HeatMapOptions): any;
    private setClear(heatMapMaterial, id);
}
