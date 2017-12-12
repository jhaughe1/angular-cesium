import { HtmlPrimitive } from '../primitives';
var HtmlCollection = (function () {
    function HtmlCollection() {
        this._collection = [];
    }
    Object.defineProperty(HtmlCollection.prototype, "length", {
        get: function () {
            return this._collection.length;
        },
        enumerable: true,
        configurable: true
    });
    HtmlCollection.prototype.get = function (index) {
        return this._collection[index];
    };
    HtmlCollection.prototype.add = function (options) {
        var html = new HtmlPrimitive(options, this);
        this._collection.push(html);
        return html;
    };
    HtmlCollection.prototype.remove = function (html) {
        var index = this._collection.indexOf(html);
        if (index === (-1)) {
            return false;
        }
        this._collection.splice(index, 1);
        return true;
    };
    HtmlCollection.prototype.update = function () {
        for (var i = 0, len = this._collection.length; i < len; i++) {
            this._collection[i].update();
        }
    };
    HtmlCollection.prototype.removeAll = function () {
        while (this._collection.length > 0) {
            this._collection.pop();
        }
    };
    HtmlCollection.prototype.contains = function (html) {
        return Cesium.defined(html) && html.collection === this;
    };
    return HtmlCollection;
}());
export { HtmlCollection };
//# sourceMappingURL=html.js.map