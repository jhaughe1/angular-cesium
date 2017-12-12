import { CesiumService } from '../cesium/cesium.service';
import * as geodesy from 'geodesy';
import { hemisphere } from 'geodesy';
import { Cartesian3 } from '../../models/cartesian3';
export declare class CoordinateConverter {
    private cesiumService;
    constructor(cesiumService?: CesiumService);
    screenToCartesian3(screenPos: {
        x: number;
        y: number;
    }, addMapCanvansBoundsToPos?: boolean): any;
    screenToCartographic(screenPos: {
        x: number;
        y: number;
    }, ellipsoid?: any): any;
    cartesian3ToCartographic(cartesian: Cartesian3, ellipsoid?: any): any;
    degreesToCartographic(longitude: number, latitude: number, height?: number): any;
    radiansToCartographic(longitude: number, latitude: number, height?: number): any;
    degreesToUTM(longitude: number, latitude: number): geodesy.Utm;
    UTMToDegrees(zone: number, hemisphereType: hemisphere, easting: number, northing: number): {
        longitude: number;
        latitude: number;
        height: any;
    };
    private geodesyToCesiumObject(geodesyRadians);
    midPointToCartesian3(first: {
        latitude: number;
        longitude: number;
    }, second: {
        latitude: number;
        longitude: number;
    }): any;
    middlePointByScreen(position0: Cartesian3, position1: Cartesian3): Cartesian3;
    bearingTo(first: {
        latitude: number;
        longitude: number;
    }, second: {
        latitude: number;
        longitude: number;
    }): number;
    bearingToCartesian(firstCartesian3: Cartesian3, secondCartesian3: Cartesian3): number;
}
