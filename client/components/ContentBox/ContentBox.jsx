//	main imports
import React 				from 'react'
import { Switch, Route } 	from 'react-router-dom'
import PageStore			from '../../stores/PageStore.js'


//	style
import './ContentBox.less'

//	pages 
import Home from './pages/Home.jsx'
import Items from './pages/Items.jsx'
import Contacts from './pages/Contacts.jsx'


const l = console.log;

class ContentBox extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			show : false,
			runAfterShow : [],
		}

		this._hideContent = this._hideContent.bind(this)
		this._showContent = this._showContent.bind(this)
	}

	componentWillMount(){
	}

	componentDidMount(){
		PageStore.addPageChangeListener(this._hideContent)
		PageStore.addHistoryChangeListener(this._showContent)

		setTimeout(() => {
			this._showContent()
		}, 100)	
	}

	componentWillUnmount(){
		PageStore.removePageChangeListener(this._hideContent)
		PageStore.removeHistoryChangeListener(this._showContent)
	}


	_hideContent(){
		var transitionTime = +getComputedStyle(this.elem).transitionDuration.match(/\d+(\.\d+)?/)[0]
		transitionTime *= 1000

		this.setState({
			show: false
		})
		
		return new Promise( (resolve, reject) => {
			setTimeout(() => {
				resolve('ContentBox : hidded')
			}, transitionTime)
		})
	}

	_showContent(){
		this.setState({
			show: true
		})
	}

	render(){
		var className = "ContentBox"
		var hidden = !this.state.show ? ' ContentBox--hidden' : ''
		className += hidden

		return(
			<div className={className} ref={elem => this.elem = elem}>
				<Switch>
					<Route exact path='/' render={ (props) => {
							return (
								<Home {...props} 
									ref={item => this.currentOpen = item} 
								/>
							)
						}
					}/>

					<Route path='/items' render={ (props) => {
							return (
								<Items {...props} 
									ref={item => this.currentOpen = item} 
								/>
							)
						}
					}/>

					<Route path='/contacts' render={ (props) => {
							return (
								<Contacts {...props} 
									ref={item => this.currentOpen = item} 
								/>
							)
						}
					}/>
				</Switch>
			</div>
		)
	}
}

module.exports = ContentBox