const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const key = "test123";
const emailServices = require("../services/emailer.services");

async function sendOTP(params, callback) {
  const otp = otpGenerator.generate(4, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });


  const ttl = 5 * 60 * 1000; //5 min expiry
  const expires = Date.now() + ttl;
  const data = `${params.email}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
  const fullHash = `${hash}.${expires}`;

  var otpMessage = `Dear Customer, ${otp} is the one time password for your login`;

  var model = {
    email: params.email,
    subject: "Registration OTP",
    body: otpMessage,
  };

  emailServices.sendEmail(model, (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, fullHash);
  });
}


async function verifyOTP(params, callback){
  let [hashValue, expires] = params.hash.split('.');

  let now = Date.now();

    if (now > parseInt(expires)) {
    console.log("OTP Expired");
    return callback("OTP Expired");
  }

  let data = Buffer.from(`${params.email}.${params.otp}.${expires}`, 'utf-8');
  let newCalculatedHash = crypto.createHmac("sha256", key).update(data).digest("hex");

  console.log("Received Hash: ", hashValue);
  console.log("Calculated Hash: ", newCalculatedHash);

  if (newCalculatedHash == hashValue){
    console.log("OTP Verification Success");
    return callback(null, "Success");
  }

  console.log("Invalid OTP");
  return callback("Invalid OTP");

console.log("Current Timestamp: ", now);
console.log("Expiration Timestamp: ", expires);

}


module.exports =  {
  sendOTP,
  verifyOTP
}