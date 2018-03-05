import React from 'react'

//	components
import StatusWindow from './StatusWindow/StatusWindow.jsx'
import ContentBox from './ContentBox/ContentBox.jsx'

//	flux 
import AppStore from '../stores/AppStore.js'
import AppActions from '../actions/AppActions.js'

// 	style
import './App.less'
import './etc/uprise.less'

function l(){
	console.log('App.jsx :', ...arguments)
}

class App extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			pages : [],
		}

		this._onPageChange = this._onPageChange.bind(this)
		//this._popState = this._popState.bind(this)
	}

	componentWillMount(){
		var pages = AppStore.getPages()
		this.setState({
			pages: pages
		})
	}


	componentDidMount(){
		//AppStore.addChangePageListener(this._onPageChange)
		//window.onpopstate = this._popState;
	}

	/*_popState(e){
		e.preventDefault()
		l('_popState')
		l(e)
	}*/

	_onPageChange(){
		//var href = AppStore.getCurrentPage()
		//l(' changing page')
		//l(href)
		/*return new Promise((resolve, reject) => {
			
			resolve('App.jsx ready')
		})*/
	}


	render(){
		return(
			<div>
				<StatusWindow pages={this.state.pages}/>
				<ContentBox pages={this.state.pages}/>
			</div>
		)
	}
}

module.exports = App