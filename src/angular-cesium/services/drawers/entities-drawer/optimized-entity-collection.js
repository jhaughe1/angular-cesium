var OptimizedEntityCollection = (function () {
    function OptimizedEntityCollection(entityCollection, collectionSize, updateRate) {
        if (collectionSize === void 0) { collectionSize = -1; }
        if (updateRate === void 0) { updateRate = -1; }
        this.entityCollection = entityCollection;
        this._isSuspended = false;
        this._isHardSuspend = false;
        this._updateRate = updateRate;
        this._collectionSize = collectionSize;
    }
    OptimizedEntityCollection.prototype.setShow = function (show) {
        this.entityCollection.show = show;
    };
    Object.defineProperty(OptimizedEntityCollection.prototype, "isSuspended", {
        get: function () {
            return this._isSuspended;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptimizedEntityCollection.prototype, "updateRate", {
        get: function () {
            return this._updateRate;
        },
        set: function (value) {
            this._updateRate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptimizedEntityCollection.prototype, "collectionSize", {
        get: function () {
            return this._collectionSize;
        },
        set: function (value) {
            this._collectionSize = value;
        },
        enumerable: true,
        configurable: true
    });
    OptimizedEntityCollection.prototype.collection = function () {
        return this.entityCollection;
    };
    OptimizedEntityCollection.prototype.isFree = function () {
        return this._collectionSize < 1 || this.entityCollection.values.length < this._collectionSize;
    };
    OptimizedEntityCollection.prototype.add = function (entity) {
        this.suspend();
        return this.entityCollection.add(entity);
    };
    OptimizedEntityCollection.prototype.remove = function (entity) {
        this.suspend();
        return this.entityCollection.remove(entity);
    };
    OptimizedEntityCollection.prototype.removeNoSuspend = function (entity) {
        this.entityCollection.remove(entity);
    };
    OptimizedEntityCollection.prototype.removeAll = function () {
        this.suspend();
        this.entityCollection.removeAll();
    };
    OptimizedEntityCollection.prototype.onEventSuspension = function (callback, once) {
        var _this = this;
        if (once === void 0) { once = false; }
        this._onEventSuspensionCallback = { callback: callback, once: once };
        return function () {
            _this._onEventSuspensionCallback = undefined;
        };
    };
    OptimizedEntityCollection.prototype.onEventResume = function (callback, once) {
        var _this = this;
        if (once === void 0) { once = false; }
        this._onEventResumeCallback = { callback: callback, once: once };
        if (!this._isSuspended) {
            this.triggerEventResume();
        }
        return function () {
            _this._onEventResumeCallback = undefined;
        };
    };
    OptimizedEntityCollection.prototype.triggerEventSuspension = function () {
        if (this._onEventSuspensionCallback !== undefined) {
            var callback = this._onEventSuspensionCallback.callback;
            if (this._onEventSuspensionCallback.once) {
                this._onEventSuspensionCallback = undefined;
            }
            callback();
        }
    };
    OptimizedEntityCollection.prototype.triggerEventResume = function () {
        if (this._onEventResumeCallback !== undefined) {
            var callback = this._onEventResumeCallback.callback;
            if (this._onEventResumeCallback.once) {
                this._onEventResumeCallback = undefined;
            }
            callback();
        }
    };
    OptimizedEntityCollection.prototype.suspend = function () {
        var _this = this;
        if (this._updateRate < 0) {
            return;
        }
        if (this._isHardSuspend) {
            return;
        }
        if (!this._isSuspended) {
            this._isSuspended = true;
            this.entityCollection.suspendEvents();
            this.triggerEventSuspension();
            this._suspensionTimeout = setTimeout(function () {
                _this.entityCollection.resumeEvents();
                _this.triggerEventResume();
                _this._isSuspended = false;
                _this._suspensionTimeout = undefined;
            }, this._updateRate);
        }
    };
    OptimizedEntityCollection.prototype.hardSuspend = function () {
        this.entityCollection.suspendEvents();
        this._isHardSuspend = true;
    };
    OptimizedEntityCollection.prototype.hardResume = function () {
        this.entityCollection.resumeEvents();
        this._isHardSuspend = false;
    };
    return OptimizedEntityCollection;
}());
export { OptimizedEntityCollection };
//# sourceMappingURL=optimized-entity-collection.js.map