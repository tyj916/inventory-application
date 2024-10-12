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

INSERT INTO item (name, price, description, quantity)
VALUES
  ('Asus ROG Strix Z790-E Gaming WiFi', 479.99, 'Slash the 6GHz barrier in style with the Strix Z790-E. Translucent shrouds outline its RGB ignition panel, alluding to its ability to jump into lightspeed under the guidance of AI Overclocking and a hyper-reactive VRM. DDR5 enhancements and an assortment of PCIe 5.0 options ramp up velocity even further, and setup is a breeze thanks to its unique Q-Design feature set.', 6),
  ('Intel Xeon Processor E5-2680 v4', 1745, 'The Intel Xeon E5-2680 V4 CPU Processor is engineered to deliver exceptional performance for a variety of demanding enterprise applications. Featuring 14 cores and a base clock speed of 2.40GHz, this processor provides robust computational power, enabling efficient multitasking and rapid data processing.', 2),
  ('Intel Core i3-12100F Processor', 107, 'Combine this capable chip with a cheap B660 motherboard, perhaps with cheaper DDR4 RAM though DDR5 boards are also available, and you are onto a winner: a low-cost system that still performs well in games and has clear upgrade potential with up to a 14900K possible.', 12),
  ('AMD Ryzen 5 3600', 199, 'Launched in July 2019, it is part of the Ryzen 5 lineup, using the Zen 2 (Matisse) architecture with Socket AM4. Thanks to AMD Simultaneous Multithreading (SMT) the core-count is effectively doubled, to 12 threads. Ryzen 5 3600 has 32 MB of L3 cache and operates at 3.6 GHz by default, but can boost up to 4.2 GHz', 5),
  ('MSI GeForce GTX 1080 Ti LIGHTNING Z', 1949.99, 'This card is really fast, but also sufficiently silent. And if you want to try your hand at overclocking, the big cooler and binned GPU really stack the deck in your favor. Everything about this card is great. We found no flaws with it.', 1);

INSERT INTO category (name)
VALUES
  ('Motherboards'),
  ('Processors'),
  ('Graphic Cards'),
  ('Gaming'),
  ('Server');

INSERT INTO item_category (item_id, category_id)
VALUES
  (1, 1),
  (1, 4),
  (2, 2),
  (2, 5),
  (3, 2),
  (4, 2),
  (5, 3),
  (5, 4);
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