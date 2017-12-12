export var UtilsService = {
    unique: function (array) {
        return array.reduce(function (accumulator, currentValue) {
            if (accumulator.indexOf(currentValue) < 0) {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, []);
    }
};
//# sourceMappingURL=utils.service.js.map