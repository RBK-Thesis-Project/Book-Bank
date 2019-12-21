const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
//const http = require("http-server")
const app = express();
//---------- for chat----------------
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');
const socketio = require("socket.io");
const http = require("http");

//---------- for CORS problem----------------
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);
// const server = http.createServer(app);
// const io = socketio(server);
//-----------------------------------
const bookBankDB = require("../database/db");
require("mongoose-query-random");
var homepageRouter = require("./routers/HomePage.js");
var universityRouter = require("./routers/university.js");
var profileRouter = require("./routers/profile.js");
// app.use(express.static(path.join(__dirname, "../build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/test", function (req, res) {
//   res.send("hello")
// })
app.use(homepageRouter);
app.use("/university", universityRouter);
app.use("/profile", profileRouter);

if(process.env.NODE_ENV === "production"){
  app.use(express.static("build"));
  
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;
var server = app.listen(PORT, () =>
  console.log(`Listening to  http://localhost:${PORT} ...`)
);
//-------------For chat to-------------
var io = require('socket.io').listen(server);
io.on('connection', (socket) => {
  console.log('connect from sockit.io');
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log(name, room);
    if (error) return callback(error);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has Joined!` });
    socket.join(user.room);

    callback();
  });


  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
    }
  })
});
