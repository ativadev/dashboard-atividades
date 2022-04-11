'use strict';
import { Request, Response, NextFunction } from 'express';
const timeLog = async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	const data: Date = new Date();
	console.log(
		`[SERVER] ` +
			`${data.toLocaleString()} ${req.ip} - ` +
			`${req.method} ${req.url} ${res.statusCode}`
	);
	next();
};

const checkSession = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'Sua sessão expirou!');
	res.redirect('/auth/login');
};

const authLogin = (req, res) => {
	const passport = require('passport');
	// const jwt = require('jsonwebtoken');

	// const secretKey = 'segredo secreto';

	passport.authenticate('local', (err, user, info) => {
		if (err) {
			req.flash('error', 'Usuário ou senha incorretos!');
			res.redirect('/auth/login');
		} else {
			req.login(user, (err) => {
				if (err) {
					req.flash('error', 'Usuário ou senha incorretos!');
					res.redirect('/auth/login');
				} else {
					console.log('Logou!');
					res.redirect('/');
				}
			});
		}
	})(req, res);
};

export = { timeLog, authLogin, checkSession };
