const router = require ('express').Router();
var cors = require("cors");
const multerConfig = require('../multerconfig'); 

const otpController = require ("../controllers/otp.controller");
const UserController = require("../controllers/user.controller");
const profileController = require("../controllers/profile.controller");
const issueController = require('../controllers/issue.controller');
const friendRequestController = require('../controllers/friendreq.controller');



router.use(cors());


router.post('/registration', UserController.register);
router.post('/login', UserController.login);

router.post('/google-login', UserController.googleLogin);

router.post('/otp-login', otpController.otpLogin); 
router.post('/otp-verify', otpController.verifyOTP); 

router.post('/updateProfilePicture', profileController.updateProfilePicture);

router.post('/submit-issue', multerConfig.upload.single('screenshot'), issueController.submitIssue);
// router.get('/api/getuseremail', UserController.getUserEmail);

router.post('/friend-requests', friendRequestController.sendFriendRequest);
router.get('/friend-requests/pending/:userEmail', friendRequestController.getPendingFriendRequests);
router.put('/friend-requests/accept/:userEmail/:senderEmail', friendRequestController.acceptFriendRequest);
router.put('/friend-requests/decline/:userEmail/:senderEmail', friendRequestController.declineFriendRequest);


router.get('/search-users', UserController.searchUsers);


router.get('/friend-requests/accepted/:userEmail', friendRequestController.getAcceptedFriendRequests);





module.exports = router;

