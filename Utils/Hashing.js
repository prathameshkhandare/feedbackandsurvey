const bcrypt = require('bcrypt');
async function generateHashedPassword(password, salt) {
    console.log('Received salt:', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Generated hashed password:', hashedPassword);
    return hashedPassword;
  }

  async function verifyPassword(password, storedHash) {
    const isPasswordCorrect = await bcrypt.compare(password, storedHash);
    return isPasswordCorrect;
  }

  module.exports = {
    generateHashedPassword,
    verifyPassword
  };