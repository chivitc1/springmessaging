    var ws = null;
    const stompEndpoint = "/echo-endpoint";
    var url = "ws://localhost:8080" + stompEndpoint;
    const topic = '/topic/echo';
    const destination = '/app/echo';

    function setConnected(connected) {
        document.getElementById('connect').disabled = connected;
        document.getElementById('disconnect').disabled = !connected;
        document.getElementById('echo').disabled = !connected;
    }

    function connect() {
        ws = webstomp.client(url, {protocols: ['v11.stomp', 'v12.stomp']});
        var stompHeaders = {};
        ws.connect(stompHeaders, function(frame) {
            setConnected(true);
            log(frame);
            ws.subscribe(topic, function(message) {
                log(message.body);
            })
        });
    }

    function disconnect() {
        if (ws != null) {
            ws.disconnect();
            ws = null;
        }
        setConnected(false);
    }

    function echo() {
        if (ws != null) {
            var message = document.getElementById('message').value;
            log('Sent: ' + message);
            ws.send(destination, message);
        } else {
            alert('connection not established, please connect!');
        }
    }

    function log(message) {
        var console = document.getElementById('logging');
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(message));
        console.appendChild(p);
        while (console.childNodes.length > 12) {
            console.removeChild(console.firstChild);
        }
        console.scrollTop = console.scrollHeight;
    }