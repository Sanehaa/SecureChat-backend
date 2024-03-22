var nodemailer =require ('nodemailer');

async function sendEmail(params, callback) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'bscs2012363@szabist.pk',
      pass: 'ftxe btij kzdd vdlw'
    },
  }
  );
  
  var mailOptions = {
    from: 'bscs2012363@gmail.com',
    to: params.email,
    subject: params.subject,
    text: params.body
  };
  
  transporter.sendMail (mailOptions, function (error, info) {
    if (error) {
      return callback(error);
    }
    else {
      return callback(null, info.response);
    }
  });
}

module.exports= {sendEmail };