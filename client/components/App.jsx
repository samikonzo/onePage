import React from 'react'

//	components
import StatusWindow from './StatusWindow/StatusWindow.jsx'
import ContentBox from './ContentBox/ContentBox.jsx'
import DelayLink from './DelayLink.jsx'

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
	}

	componentWillMount(){
		var pages = AppStore.getPages()
		this.setState({
			pages: pages
		})
	}


	componentDidMount(){
		document.addEventListener('wheel', e => {
			//.context.router.history
			/*l(this.historyGrabbElement !== undefined)
			l(this.historyGrabbElement.context !== undefined)
			l(this.historyGrabbElement.context.router !== undefined)
			l(this.historyGrabbElement.context.router.history !== undefined)*/

			this.historyObj = 	this.historyGrabbElement && 			
									this.historyGrabbElement.context &&
										this.historyGrabbElement.context.router &&
											this.historyGrabbElement.context.router.history;


			if(this.wheelBusy == true) return



			if(this.wheelWaiter == undefined){
				this.wheelWaiter = 0
			}

			this.wheelWaiter += e.deltaY

			if(this.wheelWaiter >= 300){
				AppActions.nextPage(this.historyObj)
				this.wheelBusy = true

				delete this.wheelWaiter
			}
			if(this.wheelWaiter <= -300){
				AppActions.previousPage(this.historyObj)
				this.wheelBusy = true

				delete this.wheelWaiter
			}

			setTimeout(() => {
				delete this.wheelWaiter
				this.wheelBusy = false
			}, 1000)
		})
	}


	render(){
		return(
			<div>
				<StatusWindow pages={this.state.pages}/>
				<ContentBox pages={this.state.pages}/>
				<DelayLink to="" ref={link => this.historyGrabbElement = link}/>
			</div>
		)
	}
}

module.exports = App