const { Router } = require('express');
const itemsController = require('../controllers/itemsController');
const itemsRouter = Router();

itemsRouter.get('/', itemsController.getAllItems);
itemsRouter.get('/new', itemsController.addNewItemGet);
itemsRouter.post('/new', itemsController.addNewItemPost);
itemsRouter.get('/:id', itemsController.getItemById);
itemsRouter.get('/:id/update', itemsController.updateItemGet);
itemsRouter.post('/:id/update', itemsController.updateItemPost);
itemsRouter.post('/:id/remove', itemsController.removeItem);

module.exports = itemsRouter;