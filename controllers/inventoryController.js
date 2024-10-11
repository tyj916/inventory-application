function getInventory(req, res) {
  res.render('index', {
    title: 'Inventory App',
    links: res.locals.links,
  });
}

module.exports = {
  getInventory,
};