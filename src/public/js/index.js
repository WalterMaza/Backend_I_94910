const socketClient = io();

socketClient.on("nueva-visita", () => {
    console.log("se ha recibido una visita al index");
});
