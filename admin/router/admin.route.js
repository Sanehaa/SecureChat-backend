const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const issueController = require('../controller/admin.controller');

const { register } = require('../controller/admin.controller');

// Login route for admin
router.post('/login', adminController.adminLogin);
router.post('/register', register);
//to get the total number of users
router.get('/users/count', adminController.getTotalUsers); 
// to get the total number of issues reported
router.get('/issues/count', issueController.getTotalIssues);
//to get the issues from the issue field
router.get('/issues', issueController.getIssues);
module.exports = router;
