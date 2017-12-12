var SmartAssigner = (function () {
    function SmartAssigner() {
    }
    SmartAssigner.create = function (props, allowUndefined) {
        if (props === void 0) { props = []; }
        if (allowUndefined === void 0) { allowUndefined = true; }
        var fnBody = "";
        props.forEach(function (prop) {
            if (!allowUndefined) {
                fnBody += "if (obj2['" + prop + "'] !== undefined) { obj1['" + prop + "'] = obj2['" + prop + "']; } ";
            }
            else {
                fnBody += "obj1['" + prop + "'] = obj2['" + prop + "']; ";
            }
        });
        fnBody += "return obj1";
        var assignFn = new Function('obj1', 'obj2', fnBody);
        return function smartAssigner(obj1, obj2) {
            return assignFn(obj1, obj2);
        };
    };
    return SmartAssigner;
}());
export { SmartAssigner };
//# sourceMappingURL=smart-assigner.service.js.map