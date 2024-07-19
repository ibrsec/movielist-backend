const crypto = require('node:crypto')

const secretKey = process.env.SECRET_KEY;
const loop = 10000;
const charLength = 64 / 2 ;
const encType = "sha512"; 


module.exports  = (password) => {
    return crypto.pbkdf2Sync(password,secretKey,loop,charLength,encType).toString('hex');
}