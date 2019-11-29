// IMPORTS
const mongoose = require('mongoose');

// MODELO QUE O BD UTILIZARÁ
const SpotSchema = new mongoose.Schema({
    // UPDLOAD DA IMAGEM
    thumbnail: String,
    // NOME DA COMPANHIA
    company: String,
    // PREÇO DA DIARIA
    price: Number,
    // TECNOLOGIAS QUE A EMPRESA UTILIZARÁ
    techs: [String],
    // RELACIONAMENTO AO USURARIO QUE IRA POSTAR ESSAS INFORMAÇÕES
    user: {
        // TIPO DO OBJETO
        type: mongoose.Schema.Types.ObjectId,
        // REFERENCIA AO NOMDE DO MODEL QUE ESTA RELACIONANDO
        ref: 'User',
    }
 }, {
     toJSON: {
         virtuals: true,
     }
 });

SpotSchema.virtual('thumbnail_url').get(function() {
    return `https://gmass0n-backend.herokuapp.com/files/${encodeURIComponent(this.thumbnail)}`
})

// EXPORT
module.exports = mongoose.model('Spot', SpotSchema);