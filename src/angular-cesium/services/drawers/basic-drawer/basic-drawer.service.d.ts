export declare abstract class BasicDrawerService {
    protected _propsAssigner: Function;
    constructor();
    abstract add(cesiumProps: any, ...args: any[]): any;
    abstract update(primitive: any, cesiumProps: any, ...args: any[]): void;
    abstract remove(primitive: any): void;
    abstract removeAll(): void;
    abstract setShow(showValue: boolean): void;
    abstract init(options?: any): any;
    setPropsAssigner(assigner: Function): void;
}
