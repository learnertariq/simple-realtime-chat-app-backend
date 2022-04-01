const io = require("socket.io")(3000, {
  cors: {
    origin: true, // true means to use any frontend.
  },
});

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.emit("chat-message", "hello world");
});
