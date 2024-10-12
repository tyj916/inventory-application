const pool = require('./pool');

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM category');
  return rows;
}

async function insertCategory(categoryName) {
  await pool.query(`INSERT INTO category (name) VALUES ($1)`, [categoryName]);
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

module.exports = {
  getAllCategories,
  insertCategory,
  getAllItems,
  getItemById,
  getItemCategory,
  insertItem,
};