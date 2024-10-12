const pool = require('./pool');

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM category');
  return rows;
}

async function getCategoryById(categoryId) {
  const { rows } = await pool.query(`SELECT * FROM category WHERE id = $1`, [categoryId]);
  return rows[0];
}

async function getCategoryItems(categoryId) {
  const { rows } = await pool.query(`
    SELECT item.id, item.name, item.price, item.quantity FROM item
    LEFT JOIN item_category
    ON item.id = item_category.item_id
    LEFT JOIN category
    ON item_category.category_id = category.id
    WHERE category.id = $1
  `, [categoryId]);
  return rows;
}

async function insertCategory(categoryName) {
  await pool.query(`INSERT INTO category (name) VALUES ($1)`, [categoryName]);
}

async function updateCategory(id, name) {
  await pool.query(`
    UPDATE category
    SET name = $2
    WHERE id = $1
  `, [id, name]);
}

async function removeCategory(id) {
  await pool.query(`
    DELETE FROM item_category
    WHERE category_id = $1
  `, [id]);

  await pool.query(`
    DELETE FROM category
    WHERE id = $1
  `, [id]);
}

async function removeItemFromCategory(categoryId, itemId) {
  await pool.query(`
    DELETE FROM item_category
    WHERE category_id = $1 AND item_id = $2
  `, [categoryId, itemId]);
}

async function getAllItems() {
  const { rows } = await pool.query(`SELECT * FROM item`);
  return rows;
}

async function getItemById(itemId) {
  const { rows } = await pool.query(`SELECT * FROM item WHERE id = $1`, [itemId]);
  return rows[0];
}

async function getItemCategory(itemId) {
  const { rows } = await pool.query(`
    SELECT category.id, category.name FROM item
    LEFT JOIN item_category
    ON item.id = item_category.item_id
    LEFT JOIN category
    ON category.id = item_category.category_id
    WHERE item.id = $1
  `, [itemId]);
  return rows;
}

async function insertItem(
  itemName, 
  price, 
  description, 
  quantity, 
  category_ids
) {
  const result = await pool.query(`
    INSERT INTO item 
    (name, price, description, quantity) 
    VALUES
      ($1, $2, $3, $4)
    RETURNING id
  `, [itemName, price, description, quantity]);

  const itemId = result.rows[0].id;
  for (let i = 0; i < category_ids.length; i++) {
    await pool.query(`
      INSERT INTO item_category
      (item_id, category_id)
      VALUES
        ($1, $2)  
    `, [itemId, category_ids[i]]);
  }
}

async function updateItem(
  itemId,
  itemName, 
  price, 
  description, 
  quantity, 
  category_ids
) {
  await pool.query(`
    UPDATE item
    SET name = $2, price = $3, description = $4, quantity = $5
    WHERE id = $1
  `, [itemId, itemName, price, description, quantity]);

  await pool.query(`
    DELETE FROM item_category
    WHERE item_id = $1
  `, [itemId]);

  for (let i = 0; i < category_ids.length; i++) {
    await pool.query(`
      INSERT INTO item_category
      (item_id, category_id)
      VALUES
        ($1, $2)  
    `, [itemId, category_ids[i]]);
  }
}

async function removeItem(id) {
  await pool.query(`
    DELETE FROM item_category
    WHERE item_id = $1
  `, [id]);

  await pool.query(`
    DELETE FROM item
    WHERE id = $1
  `, [id]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryItems,
  insertCategory,
  updateCategory,
  removeCategory,
  removeItemFromCategory,
  getAllItems,
  getItemById,
  getItemCategory,
  insertItem,
  updateItem,
  removeItem,
};