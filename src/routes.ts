import express from 'express';
import ItemsController from './controllers/ItemsController'
import PointsController from './controllers/PointsController'
const itemController = new ItemsController();
const pointController = new PointsController();
const routes = express.Router();
routes.get('/points', pointController.index)
routes.get('/items', itemController.index);
routes.post('/points/create', pointController.create);
routes.get('/points/show/:id', pointController.show);

export default routes;
