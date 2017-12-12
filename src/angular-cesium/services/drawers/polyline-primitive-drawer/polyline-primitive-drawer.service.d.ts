import { CesiumService } from '../../cesium/cesium.service';
import { PrimitivesDrawerService } from '../primitives-drawer/primitives-drawer.service';
export declare class PolylinePrimitiveDrawerService extends PrimitivesDrawerService {
    constructor(cesiumService: CesiumService);
    add(cesiumProps: any): any;
    update(cesiumObject: any, cesiumProps: any): void;
    withColorMaterial(cesiumProps: any): any;
}
