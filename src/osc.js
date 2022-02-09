import osc from "osc-js";

let oscWebSocket = new osc.WebSocketPort({
  url: "ws://" + "127.0.0.1:8999",
  metadata: true,
});

oscWebSocket.on("ready", onSocketOpen);
oscWebSocket.on("message", onSocketMessage);
oscWebSocket.on("error", function (e) {
  console.error(e.message);
});

oscWebSocket.open();

function onSocketOpen(e) {
  console.log("server connected");
  // ping()
  // statusMessage = 'server connected';
}

function onSocketMessage(message) {
  console.log(message);
  if (message) {
    receivedMessage = "address: " + message.address;

    if (message.args && message.args.length > 0) {
      receivedMessage += ", value: " + message.args[0].value;
    }
  }
}

function ping() {
  console.log("ping");
  oscWebSocket.send({
    address: "/s_new",
    args: [
      {
        type: "s",
        value: "kick",
      },
      {
        type: "i",
        value: -1,
      },
      {
        type: "i",
        value: 0,
      },
      {
        type: "i",
        value: 0,
      },
    ],
  });
}

export { ping };
