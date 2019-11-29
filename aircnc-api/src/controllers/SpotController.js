// IMPORTS
const Spot = require('../models/Spot');
const User = require('../models/User');

// EXPORT
module.exports = {
    // REQUISIÇÃO PARA LISTAGEM DOS SPOTS
    async index(req, res) {
        const { tech } = req.query;
        
        // FILTRA A LISTAGEM PARA BUSCAR APENAS O OBEJTO 'techs'
        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    // REQUISIÇÃO PARA CRIAÇÃO DOS SPOTS
    async store(req, res) {
        const { filename } = req.file;
        const { techs, company, price } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if (!user ) {
            return res.status(400).json({error: "Usuário não existe"});
        } 

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            techs: techs.split(',').map(tech => tech.trim()),
            company,
            price,
        })

        return res.json(spot);
    },

    async destroy(req, res) {
        await Spot.findByIdAndDelete(req.params.id);

        return res.send();
    }
}