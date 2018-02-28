const webpack 	= require('webpack')
const path 		= require('path')

module.exports = {
	entry 		: {
		main : './client/main.jsx'
	},
	output 		: {
		path 		: __dirname + '/public/build',
		publicPath 	: 'build/',
		filename 	:  '[name]-bundle.js'
	},
	module 		: {
		rules : [

			{
				test 	: /\.js$/,
				loader 	: 'babel-loader',
				exclude : ['/node_modules/', 'public']
			},

			{
				test 	: /\.jsx$/,
				use 	: [
					'react-hot-loader/webpack',
					{
						loader 	: 'babel-loader',
						options : {
							presets : ['env', 'react']
						}
					}
				],
				exclude : ['/node_modules/', 'public']
			},			

			{
				test 	: /\.css$/,
				use 	: [
					'style-loader',
					'css-loader'
				],
				exclude : ['/node_modules/', 'public']
			},

			{
				test 	: /\.less$/,
				use 	: [
					'style-loader',
					'css-loader',
					'less-loader'
				],
				exclude : ['/node_modules/', 'public']
			},

		]
	},
	devServer 	: {
		contentBase: path.join(__dirname, "public"),
		watchContentBase: true
	},
}