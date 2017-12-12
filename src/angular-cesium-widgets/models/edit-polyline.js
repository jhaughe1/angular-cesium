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
var EditPolyline = (function (_super) {
    __extends(EditPolyline, _super);
    function EditPolyline(entityId, startPosition, endPosition, polylineProps) {
        var _this = _super.call(this) || this;
        _this.editedEntityId = entityId;
        _this.id = _this.generateId();
        _this.positions = [startPosition, endPosition];
        _this._polylineProps = polylineProps;
        return _this;
    }
    Object.defineProperty(EditPolyline.prototype, "props", {
        get: function () {
            return this._polylineProps;
        },
        set: function (value) {
            this._polylineProps = value;
        },
        enumerable: true,
        configurable: true
    });
    EditPolyline.prototype.getEditedEntityId = function () {
        return this.editedEntityId;
    };
    EditPolyline.prototype.getPositions = function () {
        return this.positions;
    };
    EditPolyline.prototype.validatePositions = function () {
        return this.positions[0] !== undefined && this.positions[1] !== undefined;
    };
    EditPolyline.prototype.getStartPosition = function () {
        return this.positions[0];
    };
    EditPolyline.prototype.getEndPosition = function () {
        return this.positions[1];
    };
    EditPolyline.prototype.setStartPosition = function (position) {
        this.positions[0] = position;
    };
    EditPolyline.prototype.setEndPosition = function (position) {
        this.positions[1] = position;
    };
    EditPolyline.prototype.getId = function () {
        return this.id;
    };
    EditPolyline.prototype.generateId = function () {
        return 'edit-polyline-' + EditPolyline.counter++;
    };
    EditPolyline.counter = 0;
    return EditPolyline;
}(AcEntity));
export { EditPolyline };
//# sourceMappingURL=edit-polyline.js.map