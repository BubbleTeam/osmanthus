/* eslint-disable */

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