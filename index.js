//get the express from modules
const express = require("express");
//get the socket.io from modules
const socket = require("socket.io");

//setup the express app
const app = express();
//create a server listening to the app
const server = app.listen(4000, function() {
  console.log("listening to the port 4000");
});

//setup the server with socket
var io = socket(server);
//on connection of a socket
io.on("connection", function(socket) {
  console.log("made socket connection");
});
