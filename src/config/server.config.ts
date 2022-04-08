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

const publicConfig = (express) => {
	const path = require('path');
	const root = path.join(__dirname, '../');
	return express.static(path.join(root, './public'));
};

const sessionConfig = (app) => {
	const session = require('express-session');
	app.set('trust proxy', 1);
	app.use(
		session({
			secret: 'segredo secreto',
			resave: false,
			saveUninitialized: true,
			cookie: { secure: true },
		})
	);
};

const authConfig = (app) => {
	const passport = require('passport');
	const User = require('../models/user.model');
	const LocalStrategy = require('passport-local').Strategy;

	passport.use(new LocalStrategy(User.authenticate()));

	app.use(passport.initialize());
	app.use(passport.session());
};

const dbConfig = () => {
	const mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost:27017/usersDB');
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

export = { port, hbsConfig, publicConfig, sessionConfig, authConfig, dbConfig };
