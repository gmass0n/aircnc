// IMPORTS
const mongoose = require('mongoose');

// MODELO QUE O BD UTILIZARÁ
const UserSchema = new mongoose.Schema({
    // EMAIL PARA LOGIN
    email: String,
});

module.exports = mongoose.model('User', UserSchema);