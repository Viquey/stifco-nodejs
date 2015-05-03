function secureLogin(req, res){
	var id = req.session.id;

	if(id ==null){
		res.redirect('/login');
	}
};





/* reservation de l'offre (inscription à une offre) */
exports.actionReserverLOffre = function(req, res) {

	req.getConnection(function(err, connection) {
      if (err) return next(err);
		var idOffre = req.param("idOffre");
		var idDemandeur = req.session.id;
		
		var request = "INSERT INTO `stifco`.`offre_demandeur` (`FK_id_deplacement`, `FK_id_demandeur`, `date`) VALUES (?, ?, NOW());";	
		
		var query = connection.query(request,[idOffre, idDemandeur],function(err, rows){
				if(err)	{

					throw err;
	  			}
				else {
					res.redirect('/propositions');
				}
		});
	});
};

/* chargement vue repertoriant nos offres réservées (l'ensemble des inscriptions à des offres) */
exports.mesInscriptions = function(req, res) {
	secureLogin(req, res);
	
	/*var request = 'SELECT * FROM user';
	
	var query = connection.query(request,function(err, rows){
			if(err)	{
				throw err;
  			}
			else {
				res.render('reservations.ejs',{"prenom":req.session.prenom,"nom":req.session.nom});
			}
	});*/
	res.render('reservations.ejs',{"prenom":req.session.prenom,"nom":req.session.nom});

};