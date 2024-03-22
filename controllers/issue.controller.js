const IssueModel = require('../models/issue.models'); 

// const submitIssue = async (req, res) => {
//   try {
//     if (!req.file || !req.body.description || !req.body.userEmail) {
//       return res.status(400).json({ success: false, error: 'Invalid request. Missing file or description or userEmail.' });
//     }

//     const description = req.body.description;
//     const screenshotUrl = req.file.path;

//     // Extract user's email from the token in the headers
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = await UserService.verifyToken(token, 'secretKey');
//     const userEmail = decodedToken.email;

//     // Save the issue to the database along with the user's email
//     const newIssue = new IssueModel({
//       description,
//       screenshotUrl,
//       userEmail, // Add the user's email to the issue document
//       timestamp: new Date(),
//     });

//     await newIssue.save();

//     res.json({ success: true, message: 'Issue submitted successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

const submitIssue = async (req, res) => {
  try {
    if (!req.file || !req.body.description || !req.body.userEmail) {
      return res.status(400).json({ success: false, error: 'Invalid request. Missing file, description, or userEmail.' });
    }

    const description = req.body.description;
    const screenshotUrl = req.file.path;

    // Use userEmail from the request body if provided, otherwise extract it from the token
    const userEmail = req.body.userEmail || (req.headers.authorization.split(' ')[1] ? (await UserService.verifyToken(req.headers.authorization.split(' ')[1], 'secretKey')).email : '');

    // Save the issue to the database along with the user's email
    const newIssue = new IssueModel({
      description,
      screenshotUrl,
      userEmail, // Add the user's email to the issue document
      timestamp: new Date(),
    });

    await newIssue.save();

    res.json({ success: true, message: 'Issue submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
module.exports = { submitIssue };
