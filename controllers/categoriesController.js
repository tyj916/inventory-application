function getAllCategories(req, res) {
  res.render('allCategories', {
    title: 'All Categories',
    links: res.locals.links,
  });
}

module.exports = {
  getAllCategories
};