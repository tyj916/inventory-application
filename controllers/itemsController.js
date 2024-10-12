const db = require('../db/queries');

async function getAllItems(req, res) {
  const items = await db.getAllItems();
  res.render('item/allItems', {
    title: 'All Items',
    items: items,
  });
}

async function addNewItemGet(req, res) {
  const categories = await db.getAllCategories();
  res.render('item/newItem', {
    title: 'Add New Item',
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
  res.render('item/itemDetails', {
    title: item.name,
    item: item,
    itemCategory: itemCategory,
  });
}

async function updateItemGet(req, res) {
  const { id } = req.params;
  const item = await db.getItemById(id);
  const itemCategory = await db.getItemCategory(id);
  const categories = await db.getAllCategories();
  res.render('item/updateItem', {
    title: 'Update Item',
    item: item,
    itemCategory: itemCategory,
    categories: categories,
  });
}

async function updateItemPost(req, res) {
  const { id } = req.params;
  const { name, price, description, quantity, category } = req.body;
  const category_ids = Array.isArray(category) ? category : [category];
  await db.updateItem(id, name, price, description, quantity, category_ids);
  res.redirect(`/item/${id}`);
}

async function removeItem(req, res) {
  const { id } = req.params;
  await db.removeItem(id);
  res.redirect('/item');
}

module.exports = {
  getAllItems,
  addNewItemGet,
  addNewItemPost,
  getItemById,
  updateItemGet,
  updateItemPost,
  removeItem,
};