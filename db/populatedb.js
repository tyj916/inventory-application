#! usr/bin/env node

require('dotenv').config();
const { Client } = require('pg');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const SQL = `
CREATE TABLE IF NOT EXISTS item (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  description TEXT,
  quantity INTEGER
);

CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS item_category (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item_id INTEGER,
  category_id INTEGER,
  FOREIGN KEY (item_id) REFERENCES item(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.CONNECTION_URI,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();