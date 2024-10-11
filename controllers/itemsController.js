function getAllItems(req, res) {
  res.render('allItems', {
    title: 'All Items',
    links: res.locals.links,
  });
}

module.exports = {
  getAllItems,
};