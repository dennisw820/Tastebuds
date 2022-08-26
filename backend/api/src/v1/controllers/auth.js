// Resources
const db = require(__dirname + '/backend/.config/mysql.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authenticate } = require('passport');

// Middleware
db.connect();

module.exports = authenticate;