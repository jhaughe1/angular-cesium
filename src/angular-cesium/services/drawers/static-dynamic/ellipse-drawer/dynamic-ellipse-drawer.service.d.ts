import { CesiumService } from '../../../cesium/cesium.service';
import { PrimitivesDrawerService } from '../../primitives-drawer/primitives-drawer.service';
export declare class DynamicEllipseDrawerService extends PrimitivesDrawerService {
    constructor(cesiumService: CesiumService);
    add(cesiumProps: any): any;
    update(ellipse: any, cesiumProps: any): any;
}
