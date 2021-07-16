var SUBS = {
    callbacks: {},
};
var EExchange = /** @class */ (function () {
    function EExchange() {
    }
    EExchange.subscribeEvent = function (groups, cb) {
        Console.log('.....SUBSCRIBE_EVENT', groups);
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
    EExchange.unsubscribeEvent = function (groups, cb) {
        //if (typeof document === 'undefined') return; // проверка нужна для предотвращения сериализации ссылок при серверном рендеринге
        for (var i = 0, l = groups.length; i < l; i++) {
            var group = SUBS.callbacks[groups[i]];
            if (typeof group === 'undefined') {
                break;
            }
            SUBS.callbacks[groups[i]] = group.filter(function (_cb) { return _cb !== cb; });
        }
    };
    EExchange.raiseEvent = function (event) {
        var group = event.name;
        Console.log('...STORE=', SUBS);
        Console.log('...raiseEvent', group, event);
        var egroup = SUBS.callbacks[group];
        Console.log('...raiseEvent!', group, egroup);
        if (typeof egroup !== 'undefined') {
            egroup.map(function (_cb) { return _cb(event); });
        }
    };
    return EExchange;
}());
export { EExchange };
var Console = /** @class */ (function () {
    function Console() {
    }
    Console.log = process.env.NODE_ENV === 'development' ? console.log : function (arg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    Console.info = process.env.NODE_ENV === 'development' ? console.info : function (arg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    Console.error = console.error; //process.env.NODE_ENV === 'development' ? console.error : (arg: any, ...args: any[]) => { /* empty */ };
    Console.debug = process.env.NODE_ENV === 'development' ? console.debug : function (arg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    Console.warn = process.env.NODE_ENV === 'development' ? console.warn : function (arg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    return Console;
}());
export { Console };
