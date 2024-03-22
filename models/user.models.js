const mongoose = require('mongoose');
const db =require ('../configuration/db');
const bcrypt = require("bcrypt");

const {Schema} = mongoose;

const userSchema =new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  email:{
    type:String,
    lowercase:true,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },

  profilePictureUrl: {
    type: String,
  },

  //role for admin or normal user (user is set by default)

  
});



userSchema.pre('save',async function(){
  try{
    var user =this;
    const salt = await(bcrypt.genSalt(10));
    const hashpass = await bcrypt.hash(user.password,salt);

    user.password=hashpass;
  }
  catch (error){
    throw error;
  }
});


userSchema.methods.comparePassword = async function(userPassword) {
  try {
    console.log("--------------no password", this.password);
    const isMatch = await bcrypt.compare (userPassword, this.password);
    return isMatch;
  }
  catch (error) {
    throw error;
  }
}


const UserModel = db.model('user',userSchema);

module.exports = UserModel;