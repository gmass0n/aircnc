// IMPORTS
const multer = require('multer');
const path = require('path');

// EXPORT
module.exports = {
    storage: multer.diskStorage({
        // DEFINE O DESTINO DA IMAGEM APOS DAR O UPLOAD
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        // NOME DA IMAGEM
        filename: (req, file, cb) => {
            // CRIA A EXTENSÃO
            const ext = path.extname(file.originalname);
            // CRIA O NOME DO ARQUIVO
            const name = path.basename(file.originalname, ext);
            // CALLBACK
            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
};