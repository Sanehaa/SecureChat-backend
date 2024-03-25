const bcrypt = require("bcrypt");
const { registerAdmin } = require('../service/admin.services');
const Admin = require("../model/admin.model");
const User = require("../../models/user.models");
const Issue = require('../../models/issue.models');


exports.adminLogin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const admin = await Admin.findOne({ $or: [{ username }, { email }] });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments(); 

    res.status(200).json({ totalUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


    // to detch issues from the database
exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find();

    res.status(200).json({ issues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//tot no of issues/report
exports.getTotalIssues = async (req, res) => {
  try {
    const totalIssues = await Issue.countDocuments();
    res.status(200).json({ totalIssues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};