function getAllCategories(req, res) {
  res.render('allCategories', {
    title: 'All Categories',
    links: res.locals.links,
  });
}

function addNewCategoryGet(req, res) {
  res.render('newCategory', {
    title: 'New Category',
    links: res.locals.links,
  });
}

module.exports = {
  getAllCategories,
  addNewCategoryGet,
};