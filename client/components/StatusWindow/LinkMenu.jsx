import React from 'react'
import DelayLink from '../DelayLink.jsx'
import AppActions from '../../actions/AppActions.js'
import AppStore from '../../stores/AppStore.js'
import { Link } from 'react-router-dom'
import './LinkMenu.less'

function l(){
	console.log('LinkMenu : ', ...arguments)
}

class LinkMenu extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			selected 	: AppStore.getCurrentPage(),
			pages 		: this.props.pages
		}

		this.changePage = this.changePage.bind(this) 
		this._onPageChange = this._onPageChange.bind(this)
	}

	componentWillReceiveProps(props){
		/*this.setState( (prev, next) => {
			l(next)
		})*/
		this.setState({
			selected 	: AppStore.getCurrentPage(),
		})
	}

	componentDidMount(){
		//AppStore.addChangePageListener(this._onPageChange)
	}

	changePage(e){
		/*e.preventDefault()
		var href = e.target.getAttribute('href');

		AppActions.changePage(href, history)*/
	}

	_onPageChange(){
		/*this.setState({
			selected 	: ''//AppStore.getCurrentPage(),
		})*/
		return new Promise( (resolve, reject) => {
			resolve()
		})
	}



	render(){
		var pages = this.state.pages;


		return(
			<div className="LinkMenu"> 
				Link Menu 

				<ul>
					{
						pages && pages.map((page, i) => {
							var className = 'LinkMenu__link'
							var selectedClassName = (page.href == this.state.selected) ? 'LinkMenu__link--selected' : ''
							className += ` ${selectedClassName}`
						
							return (
								<li key={i}>
									<DelayLink to={page.href} key={i} onClick={this.changePage} className={className}> {page.name} </DelayLink>
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