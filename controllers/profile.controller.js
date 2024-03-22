const UserModel = require('../models/user.models');

async function updateProfilePicture(req, res) {
  try {
    const userId = req.body.userId; 
    const imageUrl = req.file.path;     

    await UserModel.findByIdAndUpdate(userId, { profilePictureUrl: imageUrl });

    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

module.exports = {
  updateProfilePicture,
};
