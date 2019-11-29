// IMPORTS
const Booking = require('../models/Booking');

// EXPORT
module.exports = {
    // REQUISIÇÃO PARA LISTAGEM DE SPOTS CRIADO POR CADA USUARIO
    async store(req, res) {    
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        // APARECER TODAS AS INFORMAÇÔES DO SPOT E DO USUARIO
        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = req.connectedUsers[booking.spot.user];

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
}