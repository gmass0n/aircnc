// IMPORTS
const mongoose = require('mongoose');

// MODELO QUE O BD UTILIZARÁ
const BookingSchema = new mongoose.Schema({
    //DATA DA RESERVA
    date: String,
    //SITUAÇÃO DA RESERVA: APROVADO / NÃO APROVADO
    approved: Boolean,
    // RELACIONAMENTO AO USUARIO QUE ESTA SOLICITANDO A RESERVA
    user: {
        // TIPO DO OBJETO
        type: mongoose.Schema.Types.ObjectId,
        // REFERENCIA AO NOME DO MODEL QUE ESTA RELACIONANDO
        ref: 'User',
    },
    // RELACIONAMENTO AO SPOT QUE ESTA SENDO RESERVADO
    spot: {
        // TIPO DO OBJETO
        type: mongoose.Schema.Types.ObjectId,
        // REFERENCIA AO NOME DO MODEL QUE ESTA RELACIONANDO
        ref: 'Spot',
    }
});

// EXPORT
module.exports = mongoose.model('Booking', BookingSchema);