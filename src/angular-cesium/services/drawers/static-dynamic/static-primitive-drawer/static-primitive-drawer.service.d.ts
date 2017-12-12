import { PrimitivesDrawerService } from '../../primitives-drawer/primitives-drawer.service';
import { CesiumService } from '../../../cesium/cesium.service';
export declare abstract class StaticPrimitiveDrawer extends PrimitivesDrawerService {
    private geometryType;
    constructor(geometryType: any, cesiumService: CesiumService);
    add(geometryProps: any, instanceProps: any, primitiveProps: any): any;
    update(primitive: any, geometryProps: any, instanceProps: any, primitiveProps: any): any;
}
