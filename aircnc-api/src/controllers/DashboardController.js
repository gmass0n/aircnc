// IMPORTS
const Spot = require('../models/Spot');

// EXPORT
module.exports = {
    // REQUISIÇÃO PARA LISTAGEM DE SPOTS CRIADO POR CADA USUARIO
    async show(req, res) {    
        const { user_id } = req.headers;
        
        const spots = await Spot.find({ user: user_id });

        return res.json(spots);
    }
}