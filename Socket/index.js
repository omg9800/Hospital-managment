const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:3001",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};


io.on("connection", (socket) => {
  console.log("Someone has connected");

  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
    console.log(username, onlineUsers);
  });

  socket.on("sendNotification", ({ senderName, receiverName }) => {
    const receiver = getUser(receiverName);
    console.log(onlineUsers);
    console.log(senderName, "fghjkl", receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
    });
  });

  socket.on("disconnect", () => {
    console.log("Someone has left", onlineUsers);
  });

});

io.listen(5000);