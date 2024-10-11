const express = require('express');
const inventoryRouter = require('./routes/inventoryRouter');
const itemsRouter = require('./routes/itemsRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const app = express();

function navLinks(req, res, next) {
  res.locals.links = [
    { href: '/', text: 'Home' },
    { href: '/item', text: 'Items' },
    { href: '/category', text: 'Categories' },
  ];

  next();
}

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(navLinks);
app.use('/', inventoryRouter);
app.use('/item', itemsRouter);
app.use('/category', categoriesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}...`));