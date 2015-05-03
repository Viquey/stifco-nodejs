var he = require('he');

function secureLogin(req, res){
	var id = req.session.id;

	if(id ==null){
		res.redirect('/login');
	}
};


//chargement vue proposerTransport
exports.proposerTransport = function(req, res, next) {
	secureLogin(req, res);

	req.getConnection(function(err, connection) {
      if (err) return next(err);

		var getGareLibelleQuery = 'SELECT libelle FROM gare';
		var getNomVilleSansGareQuery = 'SELECT nom FROM `ville_sans_gare`';

		var getGareLibelle = connection.query(getGareLibelleQuery,function(err, rowsGare){
			if(err)	{
				throw err;
	  		}
	  		else {

	  			var getNomVilleSansGare = connection.query(getNomVilleSansGareQuery,function(err, rowsNomVille){
	  				if(err)	{
						throw err;
	  				}
	  				else {
						res.render('proposerTransport.ejs',{"prenom":req.session.prenom,"nom":req.session.nom,'gares':rowsGare,'villes':rowsNomVille});
					}
				});
	  		}	
	  	});
	});

	
};

/* Ajout d'une offre ou mise à jour d'une offre */
exports.nouvelleOffre = function(req, res, next) {

	req.getConnection(function(err, connection) {
      if (err) return next(err);

		var idOffreur = req.session.id;
		var hDepart = req.body.hDepart.trim();
		var hRetour = req.body.hRetour.trim();
		var nbPassagers = req.body.nbPassagers.trim();
		var gareArrivee = req.body.gare.toUpperCase().trim();
		gareArrivee = he.encode(gareArrivee);
		var villeDepart = req.body.commune.toUpperCase().trim(); 
		villeDepart = he.encode(villeDepart);
		var idOffre = req.param('idOffre');


		if (gareArrivee.length == 0 || villeDepart.length < 4 || gareArrivee == "" || villeDepart == "") {
			res.redirect('/proposer_transport');
		}
		else {
			var verifReqNomGare = "SELECT * FROM `gare` WHERE `libelle` = ?";

			var verifReqNomGareQuery = connection.query(verifReqNomGare,[gareArrivee],function(err, rows){
				if(err)	{
					throw err;
	  			}
	  			/* Le nom de la gare est vérifié */
	  			else if (rows.length == 1) {

	  				/* traitement du nom de la ville sans gare*/
	  				var verifReqNomVille = "SELECT * FROM `ville_sans_gare` WHERE `nom` = ?";
	  				var verifReqNomVilleQuery = connection.query(verifReqNomVille,[villeDepart],function(err, rowsVille){
						if(err)	{
							throw err;
		  				}

		  				//La ville existe déja --donc aucune insertion-- insertion de la nouvelle gare dans la bdd puis redirection
						else if (rowsVille.length == 1){
							// Ajout d'une offre via le form 
							if (!req.param('edit')) {
								var numSemaine = req.body.numSemaine;
								
								var requestOffre = "INSERT INTO offre (FK_offreur, numSemaine, nbPassagers, hDepart, hRetour, villeDepart, gareArrivee) VALUES (?,?,?,?,?,?,?)";
							
								var addOffreQuery = connection.query(requestOffre,[idOffreur,numSemaine,nbPassagers,hDepart,hRetour,villeDepart,gareArrivee],function(err, rows){
									if(err)	{
										throw err;
						  		}
									else {
										res.redirect('/menu');
									}
								});

							}

							// Mise à jour d'une offre depuis les données envoyées par la vue editMaProposition.ejs 
							else {
								var requestEditOffre = "UPDATE offre SET nbPassagers = ?, hDepart = ?, hRetour = ?, villeDepart = ?, gareArrivee = ? WHERE id = ?";

								var editOffreQuery = connection.query(requestEditOffre,[nbPassagers, hDepart, hRetour, villeDepart, gareArrivee, idOffre], function(err, rows){
									if(err)	{
										throw err;
						  		}
									else {
										res.redirect('/mes_propositions');
									}
								});
								
							};

						}

						// insertion dans la bdd table ville_sans_gare car n'existe pas
						else if (rowsVille.length == 0){

							var insertNomVilleReq = 'INSERT INTO ville_sans_gare (nom) VALUES (?)';
							var insertNomVilleQuery = connection.query(insertNomVilleReq,[villeDepart], function(err, rows){
									if(err)	{
										throw err;
						  			}
									else {
										if (!req.param('edit')) {
											var numSemaine = req.body.numSemaine;
											
											var requestOffre = "INSERT INTO offre (FK_offreur, numSemaine, nbPassagers, hDepart, hRetour, villeDepart, gareArrivee) VALUES (?,?,?,?,?,?,?)";
										
											var addOffreQuery = connection.query(requestOffre,[idOffreur,numSemaine,nbPassagers,hDepart,hRetour,villeDepart,gareArrivee],function(err, rows){
												if(err)	{
													throw err;
										  		}
												else {
													res.redirect('/menu');
												}
											});

										}
										// Mise à jour d'une offre depuis les données envoyées par la vue editMaProposition.ejs 
										else {
											var requestEditOffre = "UPDATE offre SET nbPassagers = ?, hDepart = ?, hRetour = ?, villeDepart = ?, gareArrivee = ? WHERE id = ?";

											var editOffreQuery = connection.query(requestEditOffre,[nbPassagers, hDepart, hRetour, villeDepart, gareArrivee, idOffre], function(err, rows){
												if(err)	{
													throw err;
									  		}
												else {
													res.redirect('/mes_propositions');
												}
											});
											
										};
									}
							});
						}
					});
	  			}
	  			/* Le nom de la gare ne correspond pas a ceux présentent dans la bdd */
	  			else {
	  				res.redirect('/proposer_transport')
			
	  			}
				
			});
				
		}
	});
};