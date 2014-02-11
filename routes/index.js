
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('public', { title: 'Home', layout: 'public' });
};
