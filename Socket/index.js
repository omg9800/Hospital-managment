const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:3001",
  },
});

io.on("connection", (socket) =>{
    console.log("Someone has connected");

    socket.on("disconnect", ()=> {
        console.log("Someone has left");
    });
});

io.listen(5000);