//chargement vue login
exports.login = function(req, res) {
	res.render('login.ejs',{"mdpIncorrect":false});
};

//deconnexion
exports.logout = function(req, res) {
	req.session.id = null;
	req.session.prenom = null;
	req.session.nom = null;
	res.redirect('/index');
};

//verification du login
exports.checkLogin = function(req,res, next){

	var idNavigo = req.body.identifiant;
	var mdp = req.body.password;
	var mdpIncorrect = false;
	
	

	req.getConnection(function(err, connection) {
      if (err) return next(err);
      	var requete = 'SELECT * FROM user WHERE codenavigo = ? AND password = ?';
		var query = connection.query(requete,[idNavigo, mdp],function(err, rows){
								
									if(err)	{
										throw err;
									}
									else if(rows.length != 1) {
											res.render('login.ejs',{'mdpIncorrect':true});
									}
									else {
										req.session.id = rows[0]['id'];
										req.session.prenom = rows[0]['prenom'];
										req.session.nom = rows[0]['nom'];
										res.redirect('/menu');
									}
								});
	});

};