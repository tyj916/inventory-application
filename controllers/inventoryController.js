function getInventory(req, res) {
  res.render('index', {
    title: 'Inventory App'
  });
}

module.exports = {
  getInventory,
};