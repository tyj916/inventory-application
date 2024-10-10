function getAllCategories(req, res) {
  res.render('allCategories', {
    title: 'All Categories',
  });
}

module.exports = {
  getAllCategories
};