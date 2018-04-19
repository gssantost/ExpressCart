const db = require('./db');
const bcrypt = require('bcryptjs');

module.exports.passwordAsHash = (password) => bcrypt.hashSync(password, 10);

/*
module.exports.comparePassword = (candidatePassword, hash)=>{
    return new Promise((res,rej) => {
        let hashedPass = bcrypt.hashSync(hash, 10);
        bcrypt.compare(candidatePassword, hashedPass, function(err, isMatch) {
            if (err) throw rej(err);
            res(isMatch);
        });
    });
}; */