const UserModel = require ('../models/user.models')
const { ObjectId } = require('mongodb');
const jwt = require ('jsonwebtoken');

class UserService{
  static async registerUser (email, password) {
    try{
      const userId = new ObjectId();
      console.log('Received email for registration:', email);
      const createUser = new UserModel({userId, email, password});
      const savedUser = await createUser.save();
      return savedUser.userId;
    }
      catch(err) {
        throw err;
      }
    }

    static async checkuser (email) {
      try{
        return await UserModel.findOne({email});
      }
        catch(error) {
          throw error;
        }
      }
      
      static async generateToken (tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, {expiresIn:jwt_expire});
        }

        static async saveGoogleEmail(email) {
          try {
            const defaultPassword = 'some_default_password';
            const createUser = new UserModel({ email ,password: defaultPassword  });
            return await createUser.save();
          } catch (err) {
            throw err;
          }
        }

        static async verifyToken(token, secretKey) {
          return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (err, decoded) => {
              if (err) {
                reject(err);
              } else {
                resolve(decoded);
              }
            });
          });
        }
      


}

module.exports =UserService;
