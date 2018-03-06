import React 		from 'react'
import AppActions 	from '../../actions/AppActions.js'
import PageStore 	from '../../stores/PageStore.js'

//	components
import LinkMenu from 		'./elements/LinkMenu.jsx'
//import PageSlider from 	'./elements/PageSlider.jsx'
//import PageCounter from 	'./elements/PageCounter.jsx'


class StatusWindow extends React.Component{
	constructor(props){
		super(props)

		this.state = { 
			pages : PageStore.getPages(),
			currentPageHref : PageStore.getCurrentPageHref(),
			visibility: {
				LinkMenu : true,
			}
		}

		this.handleLinkClick 		= this.handleLinkClick.bind(this)
		this.handleToggleMenuVisibility = this.handleToggleMenuVisibility.bind(this)
		this.deselectCurrent		= this.deselectCurrent.bind(this)
		this.onHistoryChange 		= this.onHistoryChange.bind(this)
	}

	componentDidMount(){
		PageStore.addPageChangeListener(this.deselectCurrent)
		PageStore.addHistoryChangeListener(this.onHistoryChange)

		this.setState({
			currentPageHref: PageStore.getCurrentPageHref()
		})
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
		
		l(prevState)

		// check for type
		this.setState({
			visibility: {
				LinkMenu: !prevState
			}
		})

	}

	deselectCurrent(){
		this.setState({
			currentPageHref: null
		})

		return new Promise((resolve, reject) => {
			resolve()
		})
	}

	onHistoryChange(){
		this.setState({
			currentPageHref: PageStore.getCurrentPageHref()
		})
	}

	render(){
		return(
			<div>
				StatusWindow
				{/*
					
					LinkMenu
					PageSlider
					PageCounter
					Application? 

				*/}
				{/*<PageCounter pages={this.props.pages}/>*/}
				

				<LinkMenu 
					pages 					= {this.state.pages} 
					currentPageHref 		= {this.state.currentPageHref}
					handleLinkClick 		= {this.handleLinkClick}
					visibility 				= {this.state.visibility.LinkMenu}
					handleToggleVisibility 	= {this.handleToggleMenuVisibility}
				/> 
			</div>
		)
	}
}

module.exports = StatusWindow