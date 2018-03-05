const React 	= require('react')
const ReactDOM 	= require('react-dom')
const App 		= require('./components/App.jsx')
import { BrowserRouter, HashRouter } from 'react-router-dom'


/*
ReactDOM.render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById('app')
)

*/


ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('app')
)


