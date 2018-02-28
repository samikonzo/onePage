import React from 'react'
import StatusWindow from './StatusWindow.jsx'
import ContentBox from './ContentBox.jsx'

//	flux 
import AppStore from '../stores/AppStore.js'
import AppActions from '../actions/AppActions.js'


// 	style
import './App.less'


class App extends React.Component{
	render(){
		return(
			<div>
				<StatusWindow />
				<ContentBox />
			</div>
		)
	}
}

module.exports = App