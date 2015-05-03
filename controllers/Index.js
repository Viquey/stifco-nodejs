function secureLogin(req, res){
	var id = req.session.id;

	if(id ==null){
		res.redirect('/login');
	}
};


/* Chargement de la vue index */
exports.index = function(req, res) {
	//secureLogin(req, res);
	res.render('index.ejs', {"titre":"Accueil"});
};

/* redirection vers fonction index */
exports.redirectIndex = function(req, res) {
	res.redirect('/index');
};

/* chargement vue menu ou la page index des connectés */
exports.menu = function(req, res) {
	secureLogin(req, res);
	res.render('menu.ejs', {"prenom":req.session.prenom,"nom":req.session.nom});
};

