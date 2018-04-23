const db = require('./db');
const bcrypt = require('bcryptjs');

module.exports.passwordAsHash = (password) => bcrypt.hashSync(password, 10);