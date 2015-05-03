//require('use-strict');
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* Chargement des Controlleurs */
var IndexController = require('./controllers/Index')
var LogsController = require('./controllers/Logs')
var RegisterController = require('./controllers/Enregistrement');
var ProposerUnTransportController = require('./controllers/ProposerUneOffre');
var MesOffresController = require('./controllers/MesOffres');
var ToutesLesOffresController = require('./controllers/ToutesLesOffres');
var ReservationController = require('./controllers/Reservation');

var session = require('cookie-session'); 

var mysql = require('mysql'),
	myConnection = require('express-myconnection'), 
    dbOptions = {
	  host: 'localhost',
	  user: 'root',
	  password: 'root',
	  database: 'stifco'
};



var app = express();

app.use(myConnection(mysql, dbOptions, 'single'));

app.use(session({secret: 'vychounet'}));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));


app.get('/index', IndexController.index);
app.get('/', IndexController.redirectIndex);
app.get('/menu', IndexController.menu);


app.get('/login', LogsController.login);
app.get('/logout', LogsController.logout);
app.post('/check_login', urlencodedParser, LogsController.checkLogin);


app.get('/register', RegisterController.versEnregistrementForm);
app.post('/registration', urlencodedParser, RegisterController.registration);


app.get('/proposer_transport', ProposerUnTransportController.proposerTransport);
app.post('/nouvelle_offre', urlencodedParser, ProposerUnTransportController.nouvelleOffre);


app.get('/reserver_transport_check', ReservationController.actionReserverLOffre);
app.get('/reservations', ReservationController.mesInscriptions);


app.get('/propositions', ToutesLesOffresController.voirToutesLesOffres);


app.get('/mes_propositions', MesOffresController.mesOffres);
app.get('/mes_propositions_check',MesOffresController.actionSurMonOffre);


app.listen(8080);
