const FriendRequestService = require('../services/friendreq.services');

exports.sendFriendRequest = async (req, res, next) => {
  try {
    const { senderEmail, recipientEmail } = req.body;
    const success = await FriendRequestService.sendFriendRequest(senderEmail, recipientEmail);
    res.status(201).json({ status: true, success: 'Friend request sent successfully' });
  } catch (error) {
    console.error('Send friend request error:', error);
    res.status(500).json({ status: false, error: 'Internal Server Error' });
  }
};

exports.getPendingFriendRequests = async (req, res, next) => {
  try {
    const { userEmail } = req.params;
    const pendingFriendRequests = await FriendRequestService.getPendingFriendRequests(userEmail);
    res.status(200).json(pendingFriendRequests);
  } catch (error) {
    console.error('Get pending friend requests error:', error);
    res.status(500).json({ status: false, error: 'Internal Server Error' });
  }
};

exports.acceptFriendRequest = async (req, res, next) => {
  try {
    const { userEmail, senderEmail } = req.params;
    await FriendRequestService.acceptFriendRequest(userEmail, senderEmail);
    res.status(200).json({ status: true, success: 'Friend request accepted successfully' });
  } catch (error) {
    console.error('Accept friend request error:', error);
    res.status(500).json({ status: false, error: 'Internal Server Error' });
  }
};

exports.declineFriendRequest = async (req, res, next) => {
  try {
    const { userEmail, senderEmail } = req.params;
    await FriendRequestService.declineFriendRequest(userEmail, senderEmail);
    res.status(200).json({ status: true, success: 'Friend request declined successfully' });
  } catch (error) {
    console.error('Decline friend request error:', error);
    res.status(500).json({ status: false, error: 'Internal Server Error' });
  }
};


exports.getAcceptedFriendRequests = async (req, res, next) => {
  try {
    const { userEmail } = req.params;
    const acceptedFriendRequests = await FriendRequestService.getAcceptedFriendRequests(userEmail);
    res.status(200).json(acceptedFriendRequests);
  } catch (error) {
    console.error('Get accepted friend requests error:', error);
    res.status(500).json({ status: false, error: 'Internal Server Error' });
  }
};