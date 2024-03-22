const FriendRequestModel = require('../models/friendreq.models');
const UserModel = require('../models/user.models')

class FriendRequestService {
  static async sendFriendRequest(senderEmail, recipientEmail) {
    try {
      // Check if the recipient email exists in the database
      const recipientExists = await UserModel.exists({ email: recipientEmail });

      if (!recipientExists) {
        throw new Error('Recipient email does not exist in the database');
      }

      // Check if a friend request already exists between these users
      const existingRequest = await FriendRequestModel.findOne({
        senderEmail: senderEmail,
        recipientEmail: recipientEmail,
      });

      if (existingRequest) {
        throw new Error('Friend request already sent or exists');
      }

      // Send the friend request
      const friendRequest = new FriendRequestModel({
        senderEmail: senderEmail,
        recipientEmail: recipientEmail,
        status: 'pending',
      });

      await friendRequest.save();

      return true;
    } catch (error) {
      throw error;
    }
  }

  static async getPendingFriendRequests(userEmail) {
    try {
      return await FriendRequestModel.find({ recipientEmail: userEmail, status: 'pending' });
    } catch (error) {
      throw error;
    }
  }

  static async acceptFriendRequest(userEmail, senderEmail) {
    try {
      await FriendRequestModel.updateOne(
        { senderEmail: senderEmail, recipientEmail: userEmail },
        { $set: { status: 'accepted' } }
      );
    } catch (error) {
      throw error;
    }
  }

  static async declineFriendRequest(userEmail, senderEmail) {
    try {
      await FriendRequestModel.deleteOne({ senderEmail: senderEmail, recipientEmail: userEmail });
    } catch (error) {
      throw error;
    }
  }


  static async getAcceptedFriendRequests(userEmail) {
    try {
      return await FriendRequestModel.find({ recipientEmail: userEmail, status: 'accepted' });
    } catch (error) {
      throw error;
    }
  }
  
}

module.exports = FriendRequestService;
