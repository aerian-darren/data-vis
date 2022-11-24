var ToolboxFeature = /** @class */ (function () {
    function ToolboxFeature() {
    }
    return ToolboxFeature;
}());
export { ToolboxFeature };
var features = {};
export function registerFeature(name, ctor) {
    features[name] = ctor;
}
export function getFeature(name) {
    return features[name];
}
