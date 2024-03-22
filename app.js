require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const body_parser = require('body-parser');
const multerConfig = require('./multerconfig');
const userRouter = require('./router/user.router');
const profileController = require('./controllers/profile.controller');
const UserModel = require('./models/user.models');

const messages = []

app.use(express.json());
app.use(body_parser.json());
app.use('/uploads', express.static('uploads'));

app.post('/updateProfilePicture', multerConfig.upload.single('image'), async (req, res) => {
  try {
    console.log(req.file); 

    if (!req.file || !req.body.userId) {
      return res.status(400).json({ success: false, error: 'Invalid request. Missing file or userId.' });
    }

    const userId = req.body.userId;
    const imageUrl = req.file.path;

    const userExists = await UserModel.findOne({ userId });
    if (!userExists) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    await UserModel.findOneAndUpdate({ userId: userId }, { profilePictureUrl: imageUrl });

    res.json({ success: true, imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
app.use('/', userRouter);


io.on('connection', (socket) => {
  const username = socket.handshake.query.username;

  socket.on('message', (data) => {
    const message = {
      message: data.message,
      senderUsername: username,
      sentAt: Date.now()
    }
    messages.push(message)
    io.emit('message', message)
  });
});

const port = process.env.PORT || 80;
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

module.exports = app;