$(document).ready(function() {
	$("#btn").attr('disabled', 'disabled');

	$("#form").keyup(function() {
		
		var numSemaine = $('#numSemaine').val();
		var nbPassagers = $('#nbPassagers').val();
		var hDepart = $('#hDepart').val();
		var hRetour = $('#hRetour').val();
		var nomGare = $('#gare').val();
		var nomVille = $('#commune').val();


		if (!(numSemaine == "" || nbPassagers == "" || nbPassagers > 8 || nbPassagers < 1 || numSemaine > 56 || numSemaine < 1 
					|| !$.isNumeric(numSemaine) || !$.isNumeric(nbPassagers) || hDepart == "" 
					|| hRetour == "" || numSemaine.length < 1 || numSemaine.length > 2 || nbPassagers.length > 1 
					|| hRetour.length != 5 || hDepart.length != 5 || nomGare == "" || nomVille == "" )) {

			$("#btn").removeAttr('disabled');
			

		}
		else {
			$("#btn").attr('disabled', 'disabled');
		}

		

	});

	$("#formEdit").keyup(function() {
		
		var nbPassagers = $('#nbPassagers').val();
		var hDepart = $('#hDepart').val();
		var hRetour = $('#hRetour').val();
		var nomGare = $('#gare').val();
		var nomVille = $('#commune').val();

		if (!(nbPassagers == "" || nbPassagers > 8 || nbPassagers < 1 || !jQuery.isNumeric(nbPassagers) || hDepart == "" 
					|| hRetour == "" || nbPassagers.length > 1 || hRetour.length != 5 || hDepart.length != 5 || nomGare == "" || nomVille == "" )) {

			$("#btn").removeAttr('disabled');
			

		}
		else {
			$("#btn").attr('disabled', 'disabled');
		}

		

	});
});