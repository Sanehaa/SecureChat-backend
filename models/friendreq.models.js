const mongoose = require('mongoose');
const db = require('../configuration/db');

const { Schema } = mongoose;

const friendRequestSchema = new Schema({
  senderEmail: {
    type: String,
    required: true,
  },
  recipientEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending',
  },
});

const FriendRequestModel = db.model('friendRequest', friendRequestSchema);

module.exports = FriendRequestModel;
