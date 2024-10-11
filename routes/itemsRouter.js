const { Router } = require('express');
const itemsController = require('../controllers/itemsController');
const itemsRouter = Router();

itemsRouter.get('/', itemsController.getAllItems);
itemsRouter.get('/new', itemsController.addNewItemGet);
itemsRouter.post('/new', itemsController.addNewItemPost);

module.exports = itemsRouter;