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

async function getItemById(req, res) {
  const { id } = req.params;
  const item = await db.getItemById(id);
  const itemCategory = await db.getItemCategory(id);
  res.render('itemDetails', {
    title: item.name,
    item: item,
    itemCategory: itemCategory,
  });
}

module.exports = {
  getAllItems,
  addNewItemGet,
  addNewItemPost,
  getItemById,
};