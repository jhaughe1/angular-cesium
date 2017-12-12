export var MapLayerProviderOptions;
(function (MapLayerProviderOptions) {
    MapLayerProviderOptions[MapLayerProviderOptions["ArcGisMapServer"] = Cesium.ArcGisMapServerImageryProvider] = "ArcGisMapServer";
    MapLayerProviderOptions[MapLayerProviderOptions["WebMapTileService"] = Cesium.WebMapTileServiceImageryProvider] = "WebMapTileService";
    MapLayerProviderOptions[MapLayerProviderOptions["MapTileService"] = Cesium.createTileMapServiceImageryProvider] = "MapTileService";
    MapLayerProviderOptions[MapLayerProviderOptions["WebMapService"] = Cesium.WebMapServiceImageryProvider] = "WebMapService";
    MapLayerProviderOptions[MapLayerProviderOptions["SingleTileImagery"] = Cesium.SingleTileImageryProvider] = "SingleTileImagery";
    MapLayerProviderOptions[MapLayerProviderOptions["OpenStreetMap"] = Cesium.createOpenStreetMapImageryProvider] = "OpenStreetMap";
    MapLayerProviderOptions[MapLayerProviderOptions["BingMaps"] = Cesium.BingMapsImageryProvider] = "BingMaps";
    MapLayerProviderOptions[MapLayerProviderOptions["GoogleEarthEnterpriseMaps"] = Cesium.GoogleEarthEnterpriseMapsProvider] = "GoogleEarthEnterpriseMaps";
    MapLayerProviderOptions[MapLayerProviderOptions["MapBox"] = Cesium.MapboxImageryProvider] = "MapBox";
    MapLayerProviderOptions[MapLayerProviderOptions["UrlTemplateImagery"] = Cesium.UrlTemplateImageryProvider] = "UrlTemplateImagery";
    MapLayerProviderOptions[MapLayerProviderOptions["OFFLINE"] = null] = "OFFLINE";
})(MapLayerProviderOptions || (MapLayerProviderOptions = {}));
//# sourceMappingURL=map-layer-provider-options.enum.js.map