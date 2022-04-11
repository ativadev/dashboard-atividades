import express, { Request, Response, Router } from 'express';
const passport = require('passport');
// const express = require('express');
const User = require('../models/user.model');
const middleware = require('../lib/middleware.lib');

const router: Router = express.Router();

router
	.route('/login')
	.get((req: Request, res: Response) => {
		res.render('pages/login', {
			title: 'Login',
			error: req.flash('error'),
		});
	})
	.post((req: Request, res: Response) => {
		try {
			middleware.authLogin(req, res);
		} catch (e) {
			req.flash('error', 'Houve um erro em sua requisição...');
			res.redirect('/auth/login');
		}
	});

router
	.route('/signup')
	.get((req: Request, res: Response) => {
		res.render('pages/cadastro', {
			title: 'Cadastro',
			error: req.flash('error'),
		});
	})
	.post((req: Request, res: Response) => {
		const body = req.body;
		const Users = new User({
			name: body.name,
			email: body.email,
			username: body.username,
		});
		User.register(Users, body.password, (err, user) => {
			if (err) {
				req.flash('error', 'Houve um erro em sua requisição...');
				res.redirect('/auth/signup');
			} else {
				req.flash('success', `Bem vind@, ${body.name}!`);
				res.redirect('/');
			}
		});
	});

export = router;
