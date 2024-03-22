const UserService = require("../services/user.services");
const UserModel = require("../models/user.models");
const { ObjectId } = require('mongodb');

exports.register = async (req, res, next) => {
  try {

    const { email, password } = req.body;
    const userId = await UserService.registerUser(email, password);
    // const successRes = await UserService.registerUser(email, password);
    const tokenData = { _id: userId, email: email };

    const token = await UserService.generateToken(tokenData, "secretKey", '1h');

    res.json({ status: true, userId: userId, token: token, success: "User Registered Successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};



exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("------",password);
    const user = await UserService.checkuser(email);
    console.log("------------user------------",user);
    if (!user) {
      return res.status(404).json({ status: false, error: "User not found" });
    }

    const isMatch =await user.comparePassword(password);

    if (isMatch === false) {
      return res.status(401).json({ status: false, error: "Invalid password" });
    }
    
    const tokenData = { _id: user._id, email: user.email };
    const token = await UserService.generateToken(tokenData, "secretKey", '1h');


    res.status(200).json({ status: true, token: token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};




  exports.googleLogin = async (req, res, next) => {
    try {
      const { email } = req.body;
  
      
      const successRes = await UserService.saveGoogleEmail(email);
  
      res.json({ status: true, success: "Google Email Saved Successfully" });
    } catch (error) {
      console.error("Google Login error:", error);
      res.status(500).json({ status: false, error: "Internal Server Error" });
    }


};


exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    // Use a case-insensitive regex to match emails
    const users = await UserModel.find({ email: { $regex: new RegExp(query, 'i') } }, 'email');

    res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// exports.getUserEmail = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];

//     const tokenData = await UserService.verifyToken(token, "secretKey");

//     if (!tokenData) {
//       return res.status(401).json({ status: false, error: "Invalid token" });
//     }

//     const userEmail = tokenData.email;

//     res.json({ status: true, email: userEmail });
//   } catch (error) {
//     console.error("Get User Email error:", error);
//     res.status(500).json({ status: false, error: "Internal Server Error" });
//   }
// };
