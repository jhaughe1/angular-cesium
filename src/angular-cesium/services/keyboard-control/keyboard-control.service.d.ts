import { NgZone } from '@angular/core';
import { KeyboardAction } from '../../models/ac-keyboard-action.enum';
import { CesiumService } from '../cesium/cesium.service';
export declare type KeyboardControlActionFn = (cesiumService: CesiumService, params: any, event: KeyboardEvent) => boolean | void;
export declare type KeyboardControlValidationFn = (cesiumService: CesiumService, params: any, event: KeyboardEvent) => boolean;
export declare type KeyboardControlDoneFn = (cesiumService: CesiumService, event: KeyboardEvent) => boolean;
export interface KeyboardControlParams {
    action: KeyboardAction | KeyboardControlActionFn;
    validation?: KeyboardControlValidationFn;
    params?: {
        [paramName: string]: any;
    };
    done?: KeyboardControlDoneFn;
}
export interface KeyboardControlDefinition {
    [keyboardCharCode: string]: KeyboardControlParams;
}
export declare class KeyboardControlService {
    private ngZone;
    private cesiumService;
    private document;
    private _currentDefinitions;
    private _activeDefinitions;
    private _keyMappingFn;
    constructor(ngZone: NgZone, cesiumService: CesiumService, document: any);
    init(): void;
    setKeyboardControls(definitions: KeyboardControlDefinition, keyMappingFn?: (keyEvent: KeyboardEvent) => string, outsideOfAngularZone?: boolean): void;
    removeKeyboardControls(): void;
    private getAction(char);
    private defaultKeyMappingFn(keyEvent);
    private handleKeydown(e);
    private handleKeyup(e);
    private handleTick();
    private getParams(paramsDef, keyboardEvent);
    private executeAction(execution, key, keyboardEvent);
    private registerEvents(outsideOfAngularZone);
    private unregisterEvents();
}
