import React from 'react'
//import DelayLink from './DelayLink.jsx'
import AppActions from '../actions/AppActions.js'
import AppStore from '../stores/AppStore.js'
import './LinkMenu.less'

function l(){
	console.log('Link : ', ...arguments)
}

class LinkMenu extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			selected : '/',
		}

		this.changePage = this.changePage.bind(this) 
		this._onPageChange = this._onPageChange.bind(this)
	}

	componentWillMount(){
		var pages = AppStore.getPages()
		this.setState({
			pages: pages
		})
	}

	componentDidMount(){
		AppStore.addChangePageListener(this._onPageChange)
	}

	changePage(e){
		e.preventDefault()
		var href = e.target.getAttribute('href');
		AppActions.changePage(href)
	}

	_onPageChange(){
		var href = AppStore.getCurrentPage()
		this.setState({
			selected: href
		})

		l(' changing page')
		l(href)
	}

	render(){
		var pages = this.state.pages;

		return(
			<div className="LinkMenu"> 
				Link Menu 

				<ul>
					{
						pages.map((page, i) => {
							var className = 'LinkMenu__link'
							var selectedClassName = (page.href == this.state.selected) ? 'LinkMenu__link--selected' : ''
							className += ` ${selectedClassName}`
						
							return (
								<li key={i}>
									<a href={page.href} key={i} onClick={this.changePage} className={className}> {page.name} </a>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}

export default LinkMenu