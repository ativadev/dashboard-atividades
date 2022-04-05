'use strict';
require('dotenv').config();
// const sessions = require('express-session');

const port = process.env.PORT || 3000;

const hbsConfig = (app) => {
	const handlebars = require('express-handlebars');
	const path = require('path');

	const root = path.join(__dirname, '../templates');

	const hbs = handlebars.create({
		partialsDir: path.join(root, '/partials'),
		layoutsDir: path.join(root, '/layouts'),
		defaultLayout: 'main',
	});
	app.engine('handlebars', hbs.engine);
	app.set('view engine', 'handlebars');
	app.set('trust proxy', 1);
	app.set('views', root);
};

// const sessionKey = process.env.SESSION_KEY || 'key_padrão';
// const session = sessions({
// 	secret: sessionKey,
// 	saveUninitialized: true,
// 	cookie: {
// 		maxAge: 24 * 60 * 60 * 1000,
// 	},
// 	resave: false,
// });

export = { port, hbsConfig };
