import { HtmlPrimitive } from './primitives';
import { HtmlCollection } from './collections';
var CesiumExtender = (function () {
    function CesiumExtender() {
    }
    CesiumExtender.extend = function () {
        Cesium.HtmlPrimitive = HtmlPrimitive;
        Cesium.HtmlCollection = HtmlCollection;
    };
    return CesiumExtender;
}());
export { CesiumExtender };
//# sourceMappingURL=extender.js.map