var SUBS = {
    callbacks: {},
};
var EExchange = /** @class */ (function () {
    function EExchange() {
    }
    EExchange.prototype.subscribeEvent = function (groups, cb) {
        for (var i = 0, l = groups.length; i < l; i++) {
            var group = SUBS.callbacks[groups[i]];
            if (typeof group === 'undefined') {
                SUBS.callbacks[groups[i]] = [];
                group = SUBS.callbacks[groups[i]];
            }
            if (group.findIndex(function (_cb) { return _cb === cb; }) < 0)
                group.push(cb);
        }
    };
    EExchange.prototype.unsubscribeEvent = function (groups, cb) {
        for (var i = 0, l = groups.length; i < l; i++) {
            var group = SUBS.callbacks[groups[i]];
            if (typeof group === 'undefined') {
                break;
            }
            SUBS.callbacks[groups[i]] = group.filter(function (_cb) { return _cb !== cb; });
        }
    };
    EExchange.prototype.raiseEvent = function (event) {
        var group = event.name;
        var egroup = SUBS.callbacks[group];
        if (typeof egroup !== 'undefined') {
            egroup.map(function (_cb) { return _cb(event); });
        }
    };
    return EExchange;
}());
var eexchange = new EExchange();
export default eexchange;
