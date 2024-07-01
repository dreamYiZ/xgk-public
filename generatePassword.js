const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

function generatePassword(secret) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const hash = crypto.createHash('sha256');
  hash.update(secret + year + month);

  return hash.digest('hex');
}

const secret = process.env.XGK_SECRET;
const password = generatePassword(secret);
console.log('Generated password:', password, secret);
