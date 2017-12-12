var AcEntity = (function () {
    function AcEntity(json) {
        Object.assign(this, json);
    }
    AcEntity.create = function (json) {
        if (json) {
            return Object.assign(new AcEntity(), json);
        }
        return new AcEntity();
    };
    return AcEntity;
}());
export { AcEntity };
//# sourceMappingURL=ac-entity.js.map