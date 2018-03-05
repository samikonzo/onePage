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
	}

	componentDidMount(){
		this.setState({
			selected 	: AppStore.getCurrentPage(),
		})
	}

	componentWillReceiveProps(props){
		this.setState({
			selected 	: AppStore.getCurrentPage(),
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