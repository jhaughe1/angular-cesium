var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AcEntity } from '../../angular-cesium/models/ac-entity';
var EditPoint = (function (_super) {
    __extends(EditPoint, _super);
    function EditPoint(entityId, position, pointProps, virtualPoint) {
        if (virtualPoint === void 0) { virtualPoint = false; }
        var _this = _super.call(this) || this;
        _this._show = true;
        _this.editedEntityId = entityId;
        _this.position = position;
        _this.id = _this.generateId();
        _this.pointProps = pointProps;
        _this._virtualEditPoint = virtualPoint;
        return _this;
    }
    Object.defineProperty(EditPoint.prototype, "show", {
        get: function () {
            return this._show;
        },
        set: function (value) {
            this._show = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditPoint.prototype, "props", {
        get: function () {
            return this.pointProps;
        },
        set: function (value) {
            this.pointProps = value;
        },
        enumerable: true,
        configurable: true
    });
    EditPoint.prototype.isVirtualEditPoint = function () {
        return this._virtualEditPoint;
    };
    EditPoint.prototype.setVirtualEditPoint = function (value) {
        this._virtualEditPoint = value;
    };
    EditPoint.prototype.getEditedEntityId = function () {
        return this.editedEntityId;
    };
    EditPoint.prototype.getPosition = function () {
        return this.position;
    };
    EditPoint.prototype.setPosition = function (position) {
        this.position.x = position.x;
        this.position.y = position.y;
        this.position.z = position.z;
    };
    EditPoint.prototype.getId = function () {
        return this.id;
    };
    EditPoint.prototype.generateId = function () {
        return 'edit-point-' + EditPoint.counter++;
    };
    EditPoint.counter = 0;
    return EditPoint;
}(AcEntity));
export { EditPoint };
//# sourceMappingURL=edit-point.js.map