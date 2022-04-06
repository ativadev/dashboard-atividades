'use strict';
const mongoose = require('mongoose');

const getUserModel = () => {
	//Schemas
	const sha256 = require('sha256');
	const userSchema = new mongoose.Schema({
		name: {
			type: String,
			max: 16,
		},
		username: {
			type: String,
			unique: true,
			required: true,
			max: 16,
		},
		pwd: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
			default: 'user',
		},
		emails: {
			type: [String],
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
			default: false,
		},
		activationCode: {
			type: String,
			required: true,
			default: sha256(String(Math.random() * 8)),
		},
	});
	return mongoose.model('user', userSchema);
};

const userModel = getUserModel();

export = { userModel };
