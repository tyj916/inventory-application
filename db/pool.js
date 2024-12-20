require('dotenv').config();
const { Pool } = require('pg');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

module.exports = new Pool({
  connectionString: process.env.CONNECTION_URI,
});