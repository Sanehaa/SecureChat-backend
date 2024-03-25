const bcrypt = require('bcrypt');
const Admin = require('../model/admin.model');


async function registerAdmin(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    username,
    email,
    password: hashedPassword
  });

  await admin.save();
}

module.exports = {
  registerAdmin
};
