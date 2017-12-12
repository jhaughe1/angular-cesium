import { CesiumService } from '../../../cesium/cesium.service';
import { StaticPrimitiveDrawer } from '../static-primitive-drawer/static-primitive-drawer.service';
export declare class StaticPolylineDrawerService extends StaticPrimitiveDrawer {
    constructor(cesiumService: CesiumService);
    update(primitive: any, geometryProps: any, instanceProps: any, primitiveProps: any): any;
}
