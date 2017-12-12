import { Inject, Injectable, Optional } from '@angular/core';
import { fixCesiumEntitiesShadows } from './StaticGeometryColorBatch';
var ConfigurationService = (function () {
    function ConfigurationService(config) {
        this.config = config;
        var fixEntitiesShadows = config ? config.fixEntitiesShadows : true;
        if (fixEntitiesShadows !== false) {
            fixCesiumEntitiesShadows();
        }
    }
    ConfigurationService.decorators = [
        { type: Injectable },
    ];
    ConfigurationService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['config',] },] },
    ]; };
    return ConfigurationService;
}());
export { ConfigurationService };
//# sourceMappingURL=ConfigurationService.js.map