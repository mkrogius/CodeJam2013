exports.graph = function(req, res) {
  res.render('Graph', { title : 'Experimental Graphs' } );
};

exports.graphUpdate = function(req.res) {
  res.json(Math.random());
};