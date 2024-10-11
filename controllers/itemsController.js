const db = require('../db/queries');

async function getAllItems(req, res) {
  const items = await db.getAllItems();
  res.render('allItems', {
    title: 'All Items',
    links: res.locals.links,
    items: items,
  });
}

async function addNewItemGet(req, res) {
  const categories = await db.getAllCategories();
  res.render('newItem', {
    title: 'Add New Item',
    links: res.locals.links,
    categories: categories,
  });
}

async function addNewItemPost(req, res) {
  const { name, price, description, quantity, category } = req.body;
  const category_ids = Array.isArray(category) ? category : [category];
  await db.insertItem(name, price, description, quantity, category_ids);
  res.redirect('/item');
}

module.exports = {
  getAllItems,
  addNewItemGet,
  addNewItemPost,
};