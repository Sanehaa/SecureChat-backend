const app =require ('./app');
const db =require ('./configuration/db');
const UserModel = require('./models/user.models');
const express = require("express");
var http = require("http");
  const port = process.env.PORT || 81;
  var server = http.createServer(app);
  var io = require("socket.io")(server);

  app.use(express.json());

app.get('/', (req,res)=>{
  res.send ("Hello farwa!!....")
})


app.listen(port,()=>{
console.log(`Server is running on http://localhost:${port}`);
});