import React 		from 'react'
import AppActions 	from '../../actions/AppActions.js'
import PageStore 	from '../../stores/PageStore.js'


//	components
import LinkMenu 	from './elements/LinkMenu.jsx'
import PageCounter 	from './elements/PageCounter.jsx'
import PageSlider from 	'./elements/PageSlider.jsx'


// style
import './StatusWindow.less'


/* A LOT OF LOGICAL ERROS */


class StatusWindow extends React.Component{
	constructor(props){
		super(props)

		//this.state = getStateFromFlux()

		this.state = { 
			pages : PageStore.getPages(),
			currentPageHref : PageStore.getCurrentPageHref(),
			currentPageNum : PageStore.getCurrentPageNum(),
			visibility: {
				LinkMenu 	: false,
			}
		}

		//l(this.state)


		this.handleLinkClick 			= this.handleLinkClick.bind(this)
		this.handleToggleMenuVisibility = this.handleToggleMenuVisibility.bind(this)
		this.deselectCurrent			= this.deselectCurrent.bind(this)
		this.onHistoryChange 			= this.onHistoryChange.bind(this)
		this.getStateFromFlux 			= this.getStateFromFlux.bind(this)
	}

	componentDidMount(){
		PageStore.addPageChangeListener(this.deselectCurrent)
		PageStore.addHistoryChangeListener(this.onHistoryChange)

		/*this.setState({
			currentPageHref: PageStore.getCurrentPageHref(),
		})*/

		this.setState(this.getStateFromFlux())
	}

	componentWillUnmout(){
		PageStore.removePageChangeListener(this.deselectCurrent)
		PageStore.removeHistoryChangeListener(this.onHistoryChange)
	}

	handleLinkClick(e){
		var href = e.target.getAttribute('href')
		AppActions.changePage(href)
	}

	handleToggleMenuVisibility(e){
		var prevState = this.state.visibility.LinkMenu

		// check for type
		this.setState({
			visibility: {
				LinkMenu: !prevState
			}
		})

	}

	deselectCurrent(){
		this.setState({
			currentPageHref: null,
			currentPageNum: null
		})



		return new Promise((resolve, reject) => {
			resolve()
		})
	}

	onHistoryChange(){
		//l('history changed')
		this.setState({
			currentPageHref: PageStore.getCurrentPageHref(),
			currentPageNum : PageStore.getCurrentPageNum()
		})
	}


	getStateFromFlux(){
	var flux = {
		pages : PageStore.getPages(),
		currentPageHref : PageStore.getCurrentPageHref(),
		currentPageNum : PageStore.getCurrentPageNum(),
	}
	
	return flux
}



	render(){

		//l(' ')
		//l(' STATUS WINDOW ')
		//l(this.state.visibility)
		//l(' ')


		var isCurrentPageNum = ( this.state.currentPageNum != undefined )
		var relativeVisibility = {
			PageCounter : isCurrentPageNum, 
			PageSlider : isCurrentPageNum,
		}

		//l(relativeVisibility)

		return(
			<div className="StatusWindow">
				
				{/*
					
					PageChangeVisualizer ( loader )
					Application? 

				*/}
				

				<LinkMenu 
					{...this.state}
					visibility 					= {this.state.visibility.LinkMenu}
					handleLinkClick 			= {this.handleLinkClick}
					handleToggleMenuVisibility 	= {this.handleToggleMenuVisibility}
				/> 

				<PageCounter 
					{...this.state}
					visibility = {relativeVisibility.PageCounter}
				/>

				<PageSlider 
					{...this.state}
					handleItemClick = {this.handleLinkClick}
					visibility = {relativeVisibility.PageSlider}
				/>
			</div>
		)
	}
}

module.exports = StatusWindow