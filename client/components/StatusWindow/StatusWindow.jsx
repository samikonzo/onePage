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

function getStateFromFlux(){
	var flux = {
		pages : PageStore.getPages(),
		currentPageHref : PageStore.getCurrentPageHref(),
		currentPageNum : PageStore.getCurrentPageNum(),
	}

	if(flux.currentPageNum == undefined){
		flux.visibility = {}
		flux.visibility.PageCounter = false
		flux.visibility.PageSlider = false
	}

	l(flux)

	return flux
}


class StatusWindow extends React.Component{
	constructor(props){
		super(props)

		this.state = getStateFromFlux()

		/*this.state = { 
			pages : PageStore.getPages(),
			currentPageHref : PageStore.getCurrentPageHref(),
			currentPageNum : PageStore.getCurrentPageNum(),
			visibility: {
				LinkMenu 	: false,
				PageCounter : true,
				PageSlider 	: true,
			}
		}
*/
		//l(this.state)


		this.handleLinkClick 			= this.handleLinkClick.bind(this)
		this.handleToggleMenuVisibility = this.handleToggleMenuVisibility.bind(this)
		this.deselectCurrent			= this.deselectCurrent.bind(this)
		this.onHistoryChange 			= this.onHistoryChange.bind(this)
	}

	componentDidMount(){
		PageStore.addPageChangeListener(this.deselectCurrent)
		PageStore.addHistoryChangeListener(this.onHistoryChange)

		/*this.setState({
			currentPageHref: PageStore.getCurrentPageHref(),
		})*/

		this.setState(getStateFromFlux())
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
		l('history changed')
		this.setState({
			currentPageHref: PageStore.getCurrentPageHref(),
			currentPageNum : PageStore.getCurrentPageNum()
		})
	}

	render(){

		l(' ')
		l(' STATUS WINDOW ')
		l(this.state.visibility)
		l(' ')

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
					visibility = {this.state.visibility.PageCounter}
				/>

				<PageSlider 
					{...this.state}
					handleItemClick = {this.handleLinkClick}
					visibility = {this.state.visibility.PageSlider}
				/>
			</div>
		)
	}
}

module.exports = StatusWindow