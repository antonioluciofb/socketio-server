const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server: ServerIO } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new ServerIO(server, { cors: true });

const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" })
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("messageBack", (message) => {
    console.log(message);
    io.emit("messageFront", message);
  });
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
