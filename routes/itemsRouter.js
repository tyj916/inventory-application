const { Router } = require('express');
const itemsController = require('../controllers/itemsController');
const itemsRouter = Router();

itemsRouter.get('/', itemsController.getAllItems);
itemsRouter.get('/new', itemsController.addNewItemGet);
itemsRouter.post('/new', itemsController.addNewItemPost);
itemsRouter.get('/:id', itemsController.getItemById);
itemsRouter.get('/:id/update', itemsController.updateItemGet);

module.exports = itemsRouter;