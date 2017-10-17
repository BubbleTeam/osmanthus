/* eslint-disable */


// Part 1: eventBus
// https://github.com/developit/mitt

// An event handler can take an optional event argument
// and should not return a value

// An array of all currently registered event handlers for a type

// A map of event types and their corresponding event handlers.

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */

(function() {
    function mitt(all) {
        all = all || Object.create(null);

        return {
            /**
             * Register an event handler for the given type.
             *
             * @param  {String} type    Type of event to listen for, or `"*"` for all events
             * @param  {Function} handler Function to call in response to given event
             * @memberOf mitt
             */
            on: function on(type, handler) {
                (all[type] || (all[type] = [])).push(handler);
            },

            /**
             * Remove an event handler for the given type.
             *
             * @param  {String} type    Type of event to unregister `handler` from, or `"*"`
             * @param  {Function} handler Handler function to remove
             * @memberOf mitt
             */
            off: function off(type, handler) {
                if (all[type]) {
                    all[type].splice(all[type].indexOf(handler) >>> 0, 1);
                }
            },

            /**
             * Invoke all handlers for the given type.
             * If present, `"*"` handlers are invoked after type-matched handlers.
             *
             * @param {String} type  The event type to invoke
             * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
             * @memberof mitt
             */
            emit: function emit(type, evt) {
                (all[type] || []).map(function(handler) {
                    handler(evt);
                });
                (all['*'] || []).map(function(handler) {
                    handler(type, evt);
                });
            }
        };
    }

    window.__OSS_EVENT_BUS__ = mitt();
})();


// Part 2: reload
(function() {
    var __OSS_EVENT_BUS__ = window.__OSS_EVENT_BUS__;

    __OSS_EVENT_BUS__.on('hotReload', function(filename) {
        if (/\.css/.test(filename)) {
            updateStyle(filename);
        } else {
            location.reload();
        }
    });

    function updateStyle(filename) {
        var sheets = document.getElementsByTagName('link');
        var sheet;
        for (var i = 0; i < sheets.length; i++) {
            sheet = sheets[i];

            if (
                sheet.rel == 'stylesheet' &&
                sheet.href.indexOf(filename) !== -1
            ) {
                if (sheet.href.indexOf('styleVersion') === -1) {
                    sheet.href +=
                        (sheet.href.indexOf('?') === -1 ? '?' : '&') +
                        'styleVersion' +
                        '=' +
                        new Date().getTime();
                } else {
                    sheet.href = sheet.href.replace(
                        /styleVersion=\d+/,
                        'styleVersion=' + new Date().getTime()
                    );
                }
                return;
            }
        }
    }
})();


// Part 3: websocket-connector
(function() {
    var not_support = document.createElement('div');
    not_support.style.cssText =
        'position:fixed;top:0;left:0;right:0;background:red;color:white;line-height:30px;text-align:center;';
    not_support.innerHTML = "Your browser doesn't support WebSocket";
    if (!window.WebSocket) {
        document.body.appendChild(not_support);
        setTimeout(function() {
            document.body.removeChild(not_support);
        }, 3000);
        return;
    }

    var connect_times = 0;   // 尝试连接的次数
    var elem = document.getElementById('__hotReload');
    var mockPort = elem && elem.getAttribute('src').match(/\d+/) || 8020;

    function openSocket() {
        try {
            var socket = new WebSocket(
                (location.protocol === 'https:' ? 'wss:' : 'ws:') +
                    '//' +
                    location.hostname + ':' + mockPort
            );
            bindEventSocket(socket);
        } catch (e) {}
    }

    function bindEventSocket(socket) {
        socket.onmessage = function(event) {
            console.log('received', event.data);
            var data;
            try {
                data = JSON.parse(event.data);
            } catch (e) {
                data = {};
            }
            var type = data.type || 'default';
            var payload = data.payload || {};
            __OSS_EVENT_BUS__.emit(type, payload);
        };

        socket.onopen = function() {
            console.log('[WebSocket] connected');
        };

        socket.onclose = function() {
            connect_times += 1;
            console.log('[WebSocket] closed');
            if(connect_times < 3) {
                setTimeout(openSocket, 1000);
            }
            
        };
    }

    openSocket();
})();