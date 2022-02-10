import osc from "osc-js";

let oscWebSocket = new osc.WebSocketPort({
  url: "ws://" + "127.0.0.1:8999",
  metadata: true,
});

oscWebSocket.on("ready", signalOpen);

oscWebSocket.on("error", function (e) {
  console.error(e.message);
});

oscWebSocket.open();

function signalOpen() {
  console.info("Websocket transport connected");
}

function send(message) {
  oscWebSocket.send(message);
}

export { send };
