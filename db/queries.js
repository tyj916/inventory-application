const pool = require('./pool');

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM category');
  return rows;
}

async function insertCategory(categoryName) {
  await pool.query(`INSERT INTO category (name) VALUES ($1)`, [categoryName]);
}

module.exports = {
  getAllCategories,
  insertCategory,
};