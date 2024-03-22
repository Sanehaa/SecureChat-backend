const mongoose = require('mongoose');
const db =require ('../configuration/db');

const issueSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  screenshotUrl: {
    type: String,
    required: true,
  },
  userEmail: {  // Add the user's email to the schema
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const IssueModel = db.model('Issue', issueSchema);

module.exports = IssueModel;
