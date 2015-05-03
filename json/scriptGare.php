<?php

$serveur = "localhost";
$base = "stifco";
$user = "root";
$pass = "root";

$mysqli = new mysqli($serveur, $user, $pass, $base);
$mysqli->set_charset("utf8");
if ($mysqli->connect_error) {
	die('Erreur de connexion ('.$mysqli->connect_errno.')'. $mysqli->connect_error);
}

$jsonUploaded = file_get_contents("dataGares.json");
$jsonDecoded = json_decode($jsonUploaded);

foreach($jsonDecoded as $item){
	if (strncmp($item->{'fields'}->{'code_insee_commune'},"77",2)) {
		$uic= $item->{'fields'}->{'code_uic'};
		$libelle= $item->{'fields'}->{'libelle'};
		$nomCommune = "Aucune";
		if(isset($item->{'fields'}->{'commune'})){
			$nomCommune = $item->{'fields'}->{'commune'};
		}
		$zoneNavigo= $item->{'fields'}->{'zone_navigo'};
		$coord = $item->{'fields'}->{'coord_gps_wgs84'};
		$lat= $coord[0];
		$lon = $coord[1];
		$requete = "INSERT INTO gare 
		(codeUic,libelle,nomCommune, zoneNavigo,lat,lon) 
	    	VALUES ('$uic','$libelle','$nomCommune','$zoneNavigo','$lat','$lon')";
		$mysqli->query($requete);
	}
}

$mysqli->close();

?>
