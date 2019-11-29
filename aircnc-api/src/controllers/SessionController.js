// IMPORT
const User = require('../models/User');

// EXPORT
module.exports = {
    // REQUISIÇÃO PARA CRIAÇÃO DO EMAIL PARA LOGIN
    async store(req, res) {
        const {email} = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
};