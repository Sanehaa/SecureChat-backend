const mongoose = require('mongoose');
const db =require ('../../configuration/db');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const Admin = db.model('Admin', adminSchema);

module.exports = Admin;
