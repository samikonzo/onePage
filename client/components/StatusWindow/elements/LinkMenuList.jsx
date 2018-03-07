import React from 'react'
import Uprise from '../../etc/uprise.js'

class LinkMenuList extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			visible : this.props.visibility
		}

		this._showContent = this._showContent.bind(this)
		this._hideContent = this._hideContent.bind(this)
	}

	componentDidMount(){
		this.uprise = Uprise(this.elem)

		if(this.state.visible) this._showContent()
	}

	componentWillReceiveProps(newProps){

		l(newProps)

		if(newProps.show != this.state.visible){

			if(newProps.show){
				this._showContent()
			} else {
				this._hideContent()
			}

			this.setState(({
				visible : newProps.show
			}))
		}
	}

	_showContent(){
		l('_showContent')
		this.uprise.show()
	}

	_hideContent(){
		l('_hideContent')
		this.uprise.hide()
	}



	render(){

		var pages = this.props.pages
		var selected = this.props.currentPageHref


		return(
			<ul ref={elem => this.elem = elem}>
				LinkMenuList

				{pages && pages.map( (page, i) => {
					var className = 'LinkMenu__link'
					var selectedClass = (page.href == selected) ? ' LinkMenu__link--selected' : '';
					var upriseClass = this.state.visible ? ' ' : ` uprise--hidden uprise--right uprise--delay${i+1}`;


					className += selectedClass
					className += upriseClass



					return (
						<li key={i}
							href={page.href}
							onClick={this.props.handleLinkClick}
							className={className}

						>
							{page.name}
						</li>
					)
				})}
			</ul>
		)
	}
}

export default LinkMenuList