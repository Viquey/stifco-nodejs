function secureLogin(req, res){
	var id = req.session.id;

	if(id ==null){
		res.redirect('/login');
	}
};







/* vue de nos propres offres */
exports.mesOffres = function(req, res, next) {
	secureLogin(req, res);
	var id = req.session.id;

	var passedMessage = req.query.message;
	var message = decodeURIComponent(passedMessage);

	req.getConnection(function(err, connection) {
      if (err) return next(err);
		var requete = "SELECT * FROM `offre` WHERE FK_offreur = ?";
		var query = connection.query(requete,[id],  
			function(err, rows){
		
				if(err)	{
					throw err;
				}
				else {
					if(message == '1') {
						res.render('mes_propositions.ejs',{'offres':rows,"prenom":req.session.prenom,"nom":req.session.nom,'message':true});
					}
					else {
						res.render('mes_propositions.ejs',{'offres':rows,"prenom":req.session.prenom,"nom":req.session.nom,'message':false});
					}
					
				}
		});
	});

};

/* Supression ou renvoie à la modif de l'offre séléctionnée (voir ProposerUnTransport.js > exports.nouvelleOffre) */
exports.actionSurMonOffre = function(req, res, next) {

	req.getConnection(function(err, connection) {
      if (err) return next(err);

		var idOffre = req.param('idOffre');
		var action = req.param('action');

		/* suppression de l'offre */
		if (action == 1) {
				var reqOffreDemandeur = "DELETE FROM `offre_demandeur` WHERE `FK_id_deplacement` = ?";
				var reqDeleteOffre = "DELETE FROM `offre` WHERE `id` = ?";
		
				var queryOffreDemandeur = connection.query(reqOffreDemandeur,[idOffre],function(err, rows){
					if(err)	{
						throw err;
					}
				});

				var queryDeleteOffre = connection.query(reqDeleteOffre,[idOffre],function(err, rows){
													
					if(err)	{
						throw err;
					}
					else {
						res.redirect('/mes_propositions');
					}
	
				});

		}

		/* renvoi à la vue update en passant les variables utiles de l'offre */
		else {
			var nbPassagers = req.param('nbPassagers');
			var hDepart = req.param('hDepart');
			var hRetour = req.param('hRetour');
			var villeDepart = req.param('villeDepart');
			var gareArrivee = req.param('gareArrivee');

			var getGareLibelleQuery = 'SELECT libelle FROM gare';

			var getGareLibelle = connection.query(getGareLibelleQuery,function(err, rows){
				if(err)	{
					throw err;
		  		}
		  		else {
		  			res.render('editMaProposition.ejs',{"prenom":req.session.prenom,"nom":req.session.nom,'gares':rows,"idOffre":idOffre,"nbPassagers":nbPassagers,"hDepart":hDepart,"hRetour":hRetour,"villeDepart":villeDepart,"gareArrivee":gareArrivee});

		  		}
	  		});
		};
	});
};