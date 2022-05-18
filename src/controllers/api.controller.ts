import express, { Request, Response, Router } from 'express';
const passport = require('passport');
// const express = require('express');
const User = require('../models/user.model');
const middleware = require('../lib/middleware.lib');

const router: Router = express.Router();

router.route('/users').get((req: Request, res: Response) => {
	res.json({ users: [] });
});

router.route('/users/:username').get((req: Request, res: Response) => {
	const username = req.params.username;
	const json = { user: { name: username } };
	res.json(json);
});

export = router;
