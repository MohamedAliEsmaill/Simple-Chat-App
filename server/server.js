const express = require("express");
const path = require("path")
const app = express();
let PORT = process.env.PORT || "7000";
let server=app.listen(PORT, () => { console.log("http://localhost:" + PORT) })
let io = require("socket.io")(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
})

app.get("/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.js"));
});

io.on("connection",socket=>{
    socket.on('new-user', name => {
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-message', data => {
        socket.broadcast.emit('recive-message', data)
    })
    socket.on("exit-user", function (name) {
        socket.broadcast.emit("exit", name)
      });
})
