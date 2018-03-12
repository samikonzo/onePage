import React from 'react'

//	components
import StatusWindow from './StatusWindow/StatusWindow.jsx'
import ContentBox 	from './ContentBox/ContentBox.jsx'
import DelayLink 	from './etc/DelayLink.jsx'


//	flux 
import AppActions 	from '../actions/AppActions.js'
import AppStore 	from '../stores/AppStore.js'
import PageStore 	from '../stores/PageStore.js'


// 	style
import './App.less'
import './etc/uprise.less'


global.l = console.log


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
		this.historyObj = 	this.historyGrabbElement && 			
								this.historyGrabbElement.context &&
									this.historyGrabbElement.context.router &&
										this.historyGrabbElement.context.router.history;

		//if(this.historyObj !== undefined) 
		PageStore.addHistoryObj(this.historyObj)




		// bind mwheel to page change
		document.addEventListener('wheel', e => {
			/*
				wheelBusy prevent page changing
				wheelBusy == true after mwheel event for 1s
				wheelWaiter - sum of deltaY at last 1s
			*/

			// if some element in path have wheelBuzy prop => return
			for( var i = 0; i < e.path.length; i++){
				var el = e.path[i]
				if(el.wheelBuzy){
					return
				}
			}

			var deltayForChange = 200
			var deltaYForPrevious = -deltayForChange
			var deltaYForNext = deltayForChange
			var resetTime = 1000


			if(this.wheelBusy == true) return
			
			if(this.wheelWaiter == undefined){
				this.wheelWaiter = 0
			}

			this.wheelWaiter += e.deltaY


			if(this.wheelWaiter >= deltaYForNext){
				AppActions.nextPage(this.historyObj)
				this.wheelBusy = true
				delete this.wheelWaiter
			}


			if(this.wheelWaiter <= deltaYForPrevious){
				AppActions.previousPage(this.historyObj)
				this.wheelBusy = true

				delete this.wheelWaiter
			}

			setTimeout(() => {
				delete this.wheelWaiter
				this.wheelBusy = false
			}, resetTime)
		})

		window.addEventListener('popstate', e => {
			e.preventDefault()
			AppActions.popstate()
		})
	}


	render(){
		return(
			<div>
				<StatusWindow />
				<ContentBox />

				<DelayLink to="" ref={link => this.historyGrabbElement = link}/>
			</div>
		)
	}
}

module.exports = App