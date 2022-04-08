'use strict';
const mongoose = require('mongoose');

//Schemas
const sha256 = require('sha256');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
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
	role: {
		type: String,
		required: true,
		default: 'user',
	},
	email: {
		type: String,
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

UserSchema.plugin(passportLocalMongoose);

export = mongoose.model('User', UserSchema);
