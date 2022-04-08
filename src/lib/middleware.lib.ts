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
			`${data.toLocaleString()} ` +
			`${req.ip} - ` +
			`${req.method} ` +
			`${req.url} ` +
			`${res.statusCode}`
	);
	next();
};

const authLogin = (req, res) => {
	const passport = require('passport');
	const jwt = require('jsonwebtoken');

	const secretKey = 'segredo secreto';

	passport.authenticate('local', (err, user, info) => {
		req.login(user, (err) => {
			const token = jwt.sign(
				{ userId: user._id, username: user.username },
				secretKey,
				{ expiresIn: '8h' }
			);
			res.json({ success: true, message: 'Sucesso!', token: token });
		});
	});
};

export = { timeLog, authLogin };
