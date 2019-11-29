// IMPORTS
const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');


const routes = express.Router();
const upload = multer(uploadConfig);

// GET, POST, DELETE, PUT

// req.query = ACESSAR QUERY PARAMS (PARA FILTRAGEM)
// req.params = ACESSAR ROUTES PARAMS (PARA EDIÇÃO, DELETE)
// req.body = ACESSAR CORPO DA REQUISIÇÃO (PARA CRIAÇÃO, EDIÇÃO)

// ROTAS
routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.delete('/spots/:spot_id', SpotController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

// EXPORT
module.exports = routes;