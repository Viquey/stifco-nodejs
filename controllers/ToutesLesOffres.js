function secureLogin(req, res){
	var id = req.session.id;

	if(id ==null){
		res.redirect('/login');
	}
};


/* chargement vue repertoriant toutes les offres */
exports.voirToutesLesOffres = function(req, res, next) {
	secureLogin(req, res);
	var voirLesOffresRequest = 'SELECT * FROM offre';	

	req.getConnection(function(err, connection) {
      if (err) return next(err);
		var query = connection.query(voirLesOffresRequest,function(err, rowsOffre){
				if(err)	{
					throw err;
	  			}
				else {

					var tabIdentite = [];
					tabIdentite.push('dd');
					for(var i = 0;i < rowsOffre.length;i++) {
						
						var identiteDeLOffreQuery = 'SELECT u.nom, u.prenom FROM user u INNER JOIN offre o ON u.id = o.FK_offreur WHERE o.FK_offreur = '+rowsOffre[i].FK_offreur;
						var query = connection.query(identiteDeLOffreQuery,function(err, rowsIdentite){ 
							if(err)	{
							throw err;
			  				} else {
			  					tabIdentite[i] = rowsIdentite[0].nom;
			  				}

						});

					}

					res.render('lesOffres.ejs', {'identite':tabIdentite,'offres':rowsOffre,"prenom":req.session.prenom,"nom":req.session.nom});
				}
		});
	});
};