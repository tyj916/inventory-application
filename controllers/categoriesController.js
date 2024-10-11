const db = require('../db/queries');

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render('allCategories', {
    title: 'All Categories',
    links: res.locals.links,
    categories: categories,
  });
}

function addNewCategoryGet(req, res) {
  res.render('newCategory', {
    title: 'New Category',
    links: res.locals.links,
  });
}

async function addNewCategoryPost(req, res) {
  const { name } = req.body;
  await db.insertCategory(name);
  res.redirect('/category');
}

module.exports = {
  getAllCategories,
  addNewCategoryGet,
  addNewCategoryPost,
};