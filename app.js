import express from 'express';
import routes  from './routes/index.js';
// import favicon from 'serve-favicon';
import flash from 'connect-flash';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';

let app=express();
let port=process.env.PORT || 8023;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(flash());
// app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use('/public',express.static('public'));
app.use(session({
	secret: 'finance',
	key: 'index', //cookie name
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30
	}, //30 days
}));
routes(app);

let server=app.listen(port,function(){
	console.log('server is listening on port:'+port);
});


