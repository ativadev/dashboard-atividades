'use strict';
import express, { Request, Response } from 'express';

export = () => {
	const http = require('http');
	const config = require('./config/server.config');
	const middleware = require('./lib/middleware.lib');

	// Configurações do express / http
	const app = express();
	const server = http.createServer(app);

	const authController = require('./controllers/auth.controller');

	config.dbConfig();
	config.flashConfig(app);
	config.hbsConfig(app);
	config.sessionConfig(app);
	config.authConfig(app);

	app.use(express.json({ limit: '50mb' }));
	app.use(express.urlencoded({ extended: true }));

	app.use(middleware.timeLog);
	app.use('/auth', authController);

	app.get('/', middleware.checkSession, (req: Request, res: Response) => {
		res.render('index', {
			title: 'Dashboard',
		});
	});

	// app.get('/login', (req, res) => {
	// 	res.render('pages/login', { title: 'Login' });
	// });

	app.use('/public', config.publicConfig(express));

	server.listen(config.port, () => {
		console.log(`[SERVER] Servidor ouvindo na porta ${config.port}`);
	});
};
