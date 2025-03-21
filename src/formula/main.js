function blobToJson(blob) {
    return new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.onload = () => {
            resolve(JSON.parse(fr.result));
        };
        fr.readAsText(blob);
    });
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

WebSocket.prototype.sendJsonBlob = function(data) {
    const string = JSON.stringify({ client: uuid, data: data })
    const blob = new Blob([string], {type: "application/json"});
    this.send(blob)
};

const uuid = uuidv4()
let ws = undefined

function WebSocketStart() {
    ws = new WebSocket("ws://" + "192.168.1.119:8080" + "/channel")
    ws.onopen = () => {
        console.log("Socket is opened.");
        ws.sendJsonBlob({ connect: true })
    }

    ws.onmessage = (event) => {
        blobToJson(event.data).then((obj) => {
            console.log("Message received.");
        })
    };

    ws.onclose = () => {
        console.log("Socket is closed.");
    };
}

function WebSocketStop() {
    if ( ws !== undefined ) {
        ws.close()
    }
}