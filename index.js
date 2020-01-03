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

  //on socket disconnected
  socket.on("disconnect", function() {
    console.log("user discconected");
  });

  //on room request ,data is room id
  socket.on("room", function(data) {
    console.log("room with id " + data);
    //joinned the room
    socket.join(data);
  });

  //to join a room ,data is room id
  //used when scanned QR code
  socket.on("join", function(data) {
    console.log("joinned room with id " + data);
    //to join the room first
    socket.join(data);
    //to notify the room about the joinning of new player
    io.to(data).emit("joinned");
  });

  //to send the move of the user to the opponent
  socket.on("move", function(data) {
    console.log("moved by the user with data " + data.number + " " + data.room);
    //to broadcast to opponent users in the room
    socket.to(data.room).emit("play", data.number);
  });

  //to send the exit of the user to the opponent,data is room id
  socket.on("exit", function(data) {
    //to broadcast to opponent about the users exit
    socket.to(data).emit("stop", "");
  });
});
