const db = require('../db/queries');

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render('category/allCategories', {
    title: 'All Categories',
    links: res.locals.links,
    categories: categories,
  });
}

function addNewCategoryGet(req, res) {
  res.render('category/newCategory', {
    title: 'New Category',
    links: res.locals.links,
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

module.exports = {
  getAllCategories,
  addNewCategoryGet,
  addNewCategoryPost,
  getCategoryById,
};