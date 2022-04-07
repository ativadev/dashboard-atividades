{
	const path = require('path');
	const srcDir = './dist/public/react';
	const outDir = '../../dist/public/react';

	module.exports = {
		mode: 'production',
		entry: {
			home: srcDir + '/home/App.jsx',
			login: srcDir + '/login/App.jsx',
		},
		output: {
			path: path.resolve(__dirname, outDir),
			filename: '[name].min.js',
		},
		module: {
			rules: [
				{
					test: /\.jsx$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-react'],
							},
						},
					],
				},
			],
		},
	};
}
