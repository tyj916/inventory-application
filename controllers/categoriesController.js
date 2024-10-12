const db = require('../db/queries');

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render('category/allCategories', {
    title: 'All Categories',
    categories: categories,
  });
}

function addNewCategoryGet(req, res) {
  res.render('category/newCategory', {
    title: 'New Category',
  });
}

async function addNewCategoryPost(req, res) {
  const { name } = req.body;
  await db.insertCategory(name);
  res.redirect('/category');
}

async function getCategoryById(req, res) {
  const { id } = req.params;
  const category = await db.getCategoryById(id);
  const items = await db.getCategoryItems(id);
  res.render('category/categoryDetails', {
    title: category.name,
    category: category,
    items: items,
  });
}

async function updateCategoryGet(req, res) {
  const { id } = req.params;
  const category = await db.getCategoryById(id);
  res.render('category/updateCategory', {
    title: 'Update Category',
    category: category,
  });
}

async function updateCategoryPost(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  await db.updateCategory(id, name);
  res.redirect(`/category/${id}`);
}

async function removeItemFromCategory(req, res) {
  const { categoryId, itemId } = req.params;
  await db.removeItemFromCategory(categoryId, itemId);
  res.redirect(`/category/${categoryId}`);
}

module.exports = {
  getAllCategories,
  addNewCategoryGet,
  addNewCategoryPost,
  getCategoryById,
  updateCategoryGet,
  updateCategoryPost,
  removeItemFromCategory,
};