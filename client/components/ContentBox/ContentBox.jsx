//	main imports
import React 				from 'react'
import { Switch, Route } 	from 'react-router-dom'
import AppStore 			from '../../stores/AppStore.js'

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

		this._hideContent		= this._hideContent.bind(this)
		this._showContent		= this._showContent.bind(this)
		this._addToRunAfterShow = this._addToRunAfterShow.bind(this)
		this._emitRunAfterShow 	= this._emitRunAfterShow.bind(this)
		this._removeFromRunAfterShow = this._removeFromRunAfterShow.bind(this)
	}

	componentWillMount(){
	}

	componentDidMount(){
		AppStore.addChangePageListener(this._hideContent)
		AppStore.addChangeHistoryListener(this._showContent)

		setTimeout(() => {
			this._showContent()
		}, 100)	
	}

	componentWillUnmount(){
		AppStore.removeChangePageListener(this._hideContent)
		AppStore.removeChangeHistoryListener(this._showContent)
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

		var transitionTime = +getComputedStyle(this.elem).transitionDuration.match(/\d+(\.\d+)?/)[0]
		transitionTime *= 1000

		setTimeout(() => {
			this._emitRunAfterShow()
		}, transitionTime)
	}

	_addToRunAfterShow(f){
		//this.runAfterShow.push(f)
		var runners = this.state.runAfterShow
		runners.push(f)
		this.setState({
			runAfterShow: runners
		})

		//l(this.state.runAfterShow)
	}

	_removeFromRunAfterShow(f){
		var runners = this.state.runAfterShow
		var cleanRunners = []
		runners.forEach( runner => {
			if(runner != f) cleanRunners.push(runner)
		})

		this.setState({
			runAfterShow: cleanRunners
		})
	}

	_emitRunAfterShow(){
		var runners = this.state.runAfterShow
		runners.forEach(f => {
			f()
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
									addRunner={this._addToRunAfterShow}
									removeRunner={this._removeFromRunAfterShow}
								/>
							)
						}
					}/>

					<Route path='/items' render={ (props) => {
							return (
								<Items {...props} 
									ref={item => this.currentOpen = item} 
									addRunner={this._addToRunAfterShow}
									removeRunner={this._removeFromRunAfterShow}
								/>
							)
						}
					}/>

					<Route path='/contacts' render={ (props) => {
							return (
								<Contacts {...props} 
									ref={item => this.currentOpen = item} 
									addRunner={this._addToRunAfterShow}
									removeRunner={this._removeFromRunAfterShow}
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