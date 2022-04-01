const io = require("socket.io")(3000, {
  cors: {
    origin: true, // true means to use any frontend.
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (user) => {
    users[socket.id] = user;
    socket.broadcast.emit("user-connected", users[socket.id]);
  });

  socket.on("send-message", (data) => {
    socket.broadcast.emit("get-message", {
      message: data,
      user: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[users[socket.id]];
  });
});
