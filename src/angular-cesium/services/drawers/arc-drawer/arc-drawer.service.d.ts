import { CesiumService } from '../../cesium/cesium.service';
import { PrimitivesDrawerService } from '../primitives-drawer/primitives-drawer.service';
export declare class ArcDrawerService extends PrimitivesDrawerService {
    constructor(cesiumService: CesiumService);
    _calculateArcPositions(cesiumProps: any): any[];
    _calculateTriangle(cesiumProps: any): any[];
    _calculateArc(cesiumProps: any): any[];
    add(cesiumProps: any): any;
    update(primitive: any, cesiumProps: any): any;
}
