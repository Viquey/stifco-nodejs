//chargement vue register
exports.versEnregistrementForm = function(req, res) {

	var nom = "";
	var prenom = "";
	var mdp = "";
	var mdpVerif = "";
	var idNavigo = "";
	var cp = "";
	var commune = "";
	var email = "";

	res.render('formEnregistrement.ejs',{"nom":nom,"prenom":prenom,"mdp":mdp,"mdpVerif":mdp,"navigo":idNavigo,"cp":cp,"commune":commune,"email":email,"checkMdp":false, "checkIdNavigo":false});

};


//enregistre un utilisateur en BDD 
exports.registration = function(req, res, next) {
	
	var nom = req.body.nom;
	var prenom = req.body.prenom;
	var mdp = req.body.password;
	var mdpVerif = req.body.passwordVerif;
	var idNavigo = req.body.navigo;
	var cp = req.body.cp;
	var commune = req.body.ville;
	var email = req.body.mail;
	
	//Verif si idNavigo deja présent
	var tabIdNavigo = Array();

	req.getConnection(function(err, connection) {
      if (err) return next(err);
		var dataIdNavigo = connection.query('SELECT codeNavigo FROM user',  function(err, rows){

			var checkIdNav = false;
			if(err)	{
				throw err;
	  		}
	  		else {
				for(var i = 0;i<rows.length;i++){
					tabIdNavigo.push(rows[i]['codeNavigo']);
					if (tabIdNavigo[i] == idNavigo) {
						checkIdNav = true;
					} 
				}
			}
			if(checkIdNav){
				res.render('register.ejs',{"nom":nom,"prenom":prenom,"mdp":mdp,"mdpVerif":mdpVerif,"navigo":idNavigo,"cp":cp,"commune":commune,"email":email,"checkMdp":false, "checkIdNavigo":true});
			}
			else{
				/*  Verif si champ verif de mdp est la meme  */
				if (mdpVerif !== mdp) {
				res.render('register.ejs',	
					{"nom":nom,"prenom":prenom,"mdp":mdp,"mdpVerif":mdpVerif,"navigo":idNavigo,"cp":cp,"commune":commune,"email":email,"checkIdNavigo":false,"checkMdp":true});
				}
				else {
					var request = 'INSERT INTO user (codeNavigo, nom, prenom, mail, codePostal, password) VALUES (?, ?, ?, ?, ?, ?)';
					connection.query(request,[idNavigo, nom, prenom, email, cp, mdp]);
					 
					res.redirect('/index');
				}
			}
		});
	});
};

