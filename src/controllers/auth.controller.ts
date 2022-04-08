import express, { Request, Response, Router } from 'express';
// const express = require('express');
const User = require('../models/user.model');
const middleware = require('../lib/middleware.lib');

const router: Router = express.Router();

router
	.route('/login')
	.get((req: Request, res: Response) => {
		res.render('pages/login', { title: 'Login' });
	})
	.post((req: Request, res: Response) => {
		const body = req.body;
		if (!body.username || !body.password) {
			res.json({ success: false, message: 'Sem usuário ou senha!' });
		} else {
			try {
				middleware.authLogin(req, res);
			} catch (e) {
				console.log(e);
			}
		}
	});

router
	.route('/signup')
	.get((req: Request, res: Response) => {
		res.render('pages/cadastro', { title: 'Cadastro' });
	})
	.post((req: Request, res: Response) => {
		const body = req.body;
		const Users = new User({
			email: body.email,
			username: body.username,
		});
		User.register(Users, body.password, (err, user) => {
			if (err) {
				res.json({ success: false, message: 'Erro!', error: err });
				console.log(err);
			} else {
				res.json({ success: true, message: 'Conta criada!' });
			}
		});
	});

export = router;
