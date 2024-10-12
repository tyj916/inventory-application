const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getAllCategories);
categoriesRouter.get('/new', categoriesController.addNewCategoryGet);
categoriesRouter.post('/new', categoriesController.addNewCategoryPost);
categoriesRouter.get('/:id', categoriesController.getCategoryById);

module.exports = categoriesRouter;