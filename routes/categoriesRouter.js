const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getAllCategories);
categoriesRouter.get('/new', categoriesController.addNewCategoryGet);
categoriesRouter.post('/new', categoriesController.addNewCategoryPost);
categoriesRouter.get('/:id', categoriesController.getCategoryById);
categoriesRouter.get('/:id/update', categoriesController.updateCategoryGet);
categoriesRouter.post('/:id/update', categoriesController.updateCategoryPost);
categoriesRouter.post('/:categoryId/item/:itemId/remove', categoriesController.removeItemFromCategory);

module.exports = categoriesRouter;