'use strict';
export = () => {
	const express = require('express');
	const http = require('http');
	const config = require('./config/server.config');
	const middleware = require('./lib/middleware.lib');
	// Configurações do express / http
	const app = express();
	const server = http.createServer(app);

	config.hbsConfig(app);

	app.use(middleware.timeLog);

	app.get('/', (req, res) => {
		res.render('index', {
			title: 'Dashboard',
		});
	});

	app.use('/public', config.publicConfig(express));

	server.listen(config.port, () => {
		console.log(`[SERVER] Servidor ouvindo na porta ${config.port}`);
	});
};
