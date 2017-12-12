import { Injectable } from '@angular/core';
import { JsonStringMapper } from 'json-string-mapper';
var JsonMapper = (function () {
    function JsonMapper() {
        this._mapper = new JsonStringMapper();
    }
    JsonMapper.prototype.map = function (expression) {
        return this._mapper.map(expression);
    };
    JsonMapper.decorators = [
        { type: Injectable },
    ];
    JsonMapper.ctorParameters = function () { return []; };
    return JsonMapper;
}());
export { JsonMapper };
//# sourceMappingURL=json-mapper.service.js.map