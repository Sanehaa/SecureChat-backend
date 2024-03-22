const otpService=  require ("../services/otp.services");

exports.otpLogin = (req, res, next)=> {
  otpService.sendOTP(req.body, (error, result)=>{
    if (error) {
      return res.status(400).send({
        message:"error",
        data:error,
      });
    }
    return res.status(200).send({
      message:"success",
      data: result,
    });
  });
};



exports.verifyOTP = (req, res, next)=> {
  otpService.verifyOTP(req.body, (error, result)=>{
    if (error) {
      return res.status(400).send({
        message:"error",
        data:error,
      });
    }
    return res.status(200).send({
      message:"success",
      data: result,
    });
  });
};