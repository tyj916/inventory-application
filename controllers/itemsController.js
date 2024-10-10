function getAllItems(req, res) {
  res.render('allItems', {
    title: 'All Items',
  });
}

module.exports = {
  getAllItems,
};