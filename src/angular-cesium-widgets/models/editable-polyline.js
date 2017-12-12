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
import { EditPoint } from './edit-point';
import { EditPolyline } from './edit-polyline';
import { GeoUtilsService } from '../../angular-cesium/services/geo-utils/geo-utils.service';
import { defaultLabelProps } from './label-props';
var EditablePolyline = (function (_super) {
    __extends(EditablePolyline, _super);
    function EditablePolyline(id, pointsLayer, polylinesLayer, coordinateConverter, editOptions, positions) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.pointsLayer = pointsLayer;
        _this.polylinesLayer = polylinesLayer;
        _this.coordinateConverter = coordinateConverter;
        _this.editOptions = editOptions;
        _this.positions = [];
        _this.polylines = [];
        _this.doneCreation = false;
        _this._enableEdit = true;
        _this._labels = [];
        _this._pointProps = editOptions.pointProps;
        _this.props = editOptions.polylineProps;
        if (positions && positions.length >= 2) {
            _this.createFromExisting(positions);
        }
        return _this;
    }
    Object.defineProperty(EditablePolyline.prototype, "labels", {
        get: function () {
            return this._labels;
        },
        set: function (labels) {
            if (!labels) {
                return;
            }
            var positions = this.getRealPositions();
            this._labels = labels.map(function (label, index) {
                if (!label.position) {
                    label.position = positions[index];
                }
                return Object.assign({}, defaultLabelProps, label);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditablePolyline.prototype, "props", {
        get: function () {
            return this.polylineProps;
        },
        set: function (value) {
            this.polylineProps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditablePolyline.prototype, "pointProps", {
        get: function () {
            return this._pointProps;
        },
        set: function (value) {
            this._pointProps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditablePolyline.prototype, "enableEdit", {
        get: function () {
            return this._enableEdit;
        },
        set: function (value) {
            var _this = this;
            this._enableEdit = value;
            this.positions.forEach(function (point) {
                point.show = value;
                _this.updatePointsLayer(false, point);
            });
        },
        enumerable: true,
        configurable: true
    });
    EditablePolyline.prototype.createFromExisting = function (positions) {
        var _this = this;
        positions.forEach(function (position) {
            _this.addPointFromExisting(position);
        });
        this.addAllVirtualEditPoints();
        this.doneCreation = true;
    };
    EditablePolyline.prototype.setManually = function (points, polylineProps) {
        var _this = this;
        if (!this.doneCreation) {
            throw new Error('Update manually only in edit mode, after polyline is created');
        }
        this.positions.forEach(function (p) { return _this.pointsLayer.remove(p.getId()); });
        var newPoints = [];
        for (var i = 0; i < points.length; i++) {
            var pointOrCartesian = points[i];
            var newPoint = null;
            if (pointOrCartesian.pointProps) {
                newPoint = new EditPoint(this.id, pointOrCartesian.position, pointOrCartesian.pointProps);
            }
            else {
                newPoint = new EditPoint(this.id, pointOrCartesian, this._pointProps);
            }
            newPoints.push(newPoint);
        }
        this.positions = newPoints;
        this.polylineProps = polylineProps ? polylineProps : this.polylineProps;
        this.updatePointsLayer.apply(this, [true].concat(this.positions));
        this.addAllVirtualEditPoints();
    };
    EditablePolyline.prototype.addAllVirtualEditPoints = function () {
        var _this = this;
        var currentPoints = this.positions.slice();
        currentPoints.forEach(function (pos, index) {
            if (index !== currentPoints.length - 1) {
                var currentPoint = pos;
                var nextIndex = (index + 1) % (currentPoints.length);
                var nextPoint = currentPoints[nextIndex];
                var midPoint = _this.setMiddleVirtualPoint(currentPoint, nextPoint);
                _this.updatePointsLayer(false, midPoint);
            }
        });
    };
    EditablePolyline.prototype.setMiddleVirtualPoint = function (firstP, secondP) {
        var currentCart = Cesium.Cartographic.fromCartesian(firstP.getPosition());
        var nextCart = Cesium.Cartographic.fromCartesian(secondP.getPosition());
        var midPointCartesian3 = this.coordinateConverter.midPointToCartesian3(currentCart, nextCart);
        var midPoint = new EditPoint(this.id, midPointCartesian3, this._pointProps);
        midPoint.setVirtualEditPoint(true);
        var firstIndex = this.positions.indexOf(firstP);
        this.positions.splice(firstIndex + 1, 0, midPoint);
        return midPoint;
    };
    EditablePolyline.prototype.updateMiddleVirtualPoint = function (virtualEditPoint, prevPoint, nextPoint) {
        var prevPointCart = Cesium.Cartographic.fromCartesian(prevPoint.getPosition());
        var nextPointCart = Cesium.Cartographic.fromCartesian(nextPoint.getPosition());
        virtualEditPoint.setPosition(this.coordinateConverter.midPointToCartesian3(prevPointCart, nextPointCart));
    };
    EditablePolyline.prototype.changeVirtualPointToRealPoint = function (point) {
        point.setVirtualEditPoint(false);
        var pointsCount = this.positions.length;
        var pointIndex = this.positions.indexOf(point);
        var nextIndex = (pointIndex + 1) % (pointsCount);
        var preIndex = ((pointIndex - 1) + pointsCount) % pointsCount;
        var nextPoint = this.positions[nextIndex];
        var prePoint = this.positions[preIndex];
        var firstMidPoint = this.setMiddleVirtualPoint(prePoint, point);
        var secMidPoint = this.setMiddleVirtualPoint(point, nextPoint);
        this.updatePointsLayer(false, firstMidPoint, secMidPoint, point);
    };
    EditablePolyline.prototype.renderPolylines = function () {
        var _this = this;
        this.polylines.forEach(function (polyline) { return _this.polylinesLayer.remove(polyline.getId()); });
        this.polylines = [];
        var realPoints = this.positions.filter(function (point) { return !point.isVirtualEditPoint(); });
        realPoints.forEach(function (point, index) {
            if (index !== realPoints.length - 1) {
                var nextIndex = (index + 1);
                var nextPoint = realPoints[nextIndex];
                var polyline = new EditPolyline(_this.id, point.getPosition(), nextPoint.getPosition(), _this.polylineProps);
                _this.polylines.push(polyline);
                _this.polylinesLayer.update(polyline, polyline.getId());
            }
        });
    };
    EditablePolyline.prototype.addPointFromExisting = function (position) {
        var newPoint = new EditPoint(this.id, position, this._pointProps);
        this.positions.push(newPoint);
        this.updatePointsLayer(true, newPoint);
    };
    EditablePolyline.prototype.addPoint = function (position) {
        if (this.doneCreation) {
            return;
        }
        var isFirstPoint = !this.positions.length;
        if (isFirstPoint) {
            var firstPoint = new EditPoint(this.id, position, this._pointProps);
            this.positions.push(firstPoint);
            this.updatePointsLayer(true, firstPoint);
        }
        this.movingPoint = new EditPoint(this.id, position.clone(), this._pointProps);
        this.positions.push(this.movingPoint);
        this.updatePointsLayer(true, this.movingPoint);
    };
    EditablePolyline.prototype.movePoint = function (toPosition, editPoint) {
        editPoint.setPosition(toPosition);
        if (this.doneCreation) {
            if (editPoint.isVirtualEditPoint()) {
                this.changeVirtualPointToRealPoint(editPoint);
            }
            var pointsCount = this.positions.length;
            var pointIndex = this.positions.indexOf(editPoint);
            if (pointIndex < this.positions.length - 1) {
                var nextVirtualPoint = this.positions[(pointIndex + 1) % (pointsCount)];
                var nextRealPoint = this.positions[(pointIndex + 2) % (pointsCount)];
                this.updateMiddleVirtualPoint(nextVirtualPoint, editPoint, nextRealPoint);
                this.updatePointsLayer(false, nextVirtualPoint);
            }
            if (pointIndex > 0) {
                var prevVirtualPoint = this.positions[((pointIndex - 1) + pointsCount) % pointsCount];
                var prevRealPoint = this.positions[((pointIndex - 2) + pointsCount) % pointsCount];
                this.updateMiddleVirtualPoint(prevVirtualPoint, editPoint, prevRealPoint);
                this.updatePointsLayer(false, prevVirtualPoint);
            }
        }
        this.updatePointsLayer(true, editPoint);
    };
    EditablePolyline.prototype.moveTempMovingPoint = function (toPosition) {
        if (this.movingPoint) {
            this.movePoint(toPosition, this.movingPoint);
        }
    };
    EditablePolyline.prototype.moveShape = function (startMovingPosition, draggedToPosition) {
        if (!this.doneCreation) {
            return;
        }
        if (!this.lastDraggedToPosition) {
            this.lastDraggedToPosition = startMovingPosition;
        }
        var delta = GeoUtilsService.getPositionsDelta(this.lastDraggedToPosition, draggedToPosition);
        this.positions.forEach(function (point) {
            GeoUtilsService.addDeltaToPosition(point.getPosition(), delta, true);
        });
        this.updatePointsLayer.apply(this, [true].concat(this.positions));
        this.lastDraggedToPosition = draggedToPosition;
    };
    EditablePolyline.prototype.endMoveShape = function () {
        this.lastDraggedToPosition = undefined;
        this.updatePointsLayer.apply(this, [true].concat(this.positions));
    };
    EditablePolyline.prototype.removePoint = function (pointToRemove) {
        var _this = this;
        this.removePosition(pointToRemove);
        this.positions
            .filter(function (p) { return p.isVirtualEditPoint(); })
            .forEach(function (p) { return _this.removePosition(p); });
        this.addAllVirtualEditPoints();
        this.renderPolylines();
    };
    EditablePolyline.prototype.addLastPoint = function (position) {
        this.doneCreation = true;
        this.removePosition(this.movingPoint);
        this.movingPoint = null;
        this.addAllVirtualEditPoints();
    };
    EditablePolyline.prototype.getRealPositions = function () {
        return this.getRealPoints()
            .map(function (position) { return position.getPosition(); });
    };
    EditablePolyline.prototype.getRealPoints = function () {
        var _this = this;
        return this.positions
            .filter(function (position) { return !position.isVirtualEditPoint() && position !== _this.movingPoint; });
    };
    EditablePolyline.prototype.getPositions = function () {
        return this.positions.map(function (position) { return position.getPosition(); });
    };
    EditablePolyline.prototype.removePosition = function (point) {
        var index = this.positions.findIndex(function (p) { return p === point; });
        if (index < 0) {
            return;
        }
        this.positions.splice(index, 1);
        this.pointsLayer.remove(point.getId());
    };
    EditablePolyline.prototype.updatePointsLayer = function (renderPolylines) {
        var _this = this;
        if (renderPolylines === void 0) { renderPolylines = true; }
        var point = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            point[_i - 1] = arguments[_i];
        }
        if (renderPolylines) {
            this.renderPolylines();
        }
        point.forEach(function (p) { return _this.pointsLayer.update(p, p.getId()); });
    };
    EditablePolyline.prototype.update = function () {
        this.updatePointsLayer();
    };
    EditablePolyline.prototype.dispose = function () {
        var _this = this;
        this.positions.forEach(function (editPoint) {
            _this.pointsLayer.remove(editPoint.getId());
        });
        this.polylines.forEach(function (line) { return _this.polylinesLayer.remove(line.getId()); });
        if (this.movingPoint) {
            this.pointsLayer.remove(this.movingPoint.getId());
            this.movingPoint = undefined;
        }
        this.positions.length = 0;
    };
    EditablePolyline.prototype.getPointsCount = function () {
        return this.positions.length;
    };
    EditablePolyline.prototype.getId = function () {
        return this.id;
    };
    return EditablePolyline;
}(AcEntity));
export { EditablePolyline };
//# sourceMappingURL=editable-polyline.js.map