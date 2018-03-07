import React from 'react'
import LinkMenuList from './LinkMenuList.jsx'
import './LinkMenu.less'

class LinkMenu extends React.Component{
	constructor(props){
		super(props)

	}


	componentWillReceiveProps(newProps){

	}

	render(){
		var pages = this.props.pages
		var selected = this.props.currentPageHref

		/*var menuClass = "LinkMenu__menu"
		var menuHiddenClass = this.props.visibility ? '' : ' LinkMenu__menu--hidden'
		menuClass += menuHiddenClass*/
		var menuBtnTextCloseClass =  this.props.visibility ? 'LinkMenu__close-txt' : 'LinkMenu__close-txt LinkMenu__close-txt--hidden'
		var menuBtnTextOpenClass = this.props.visibility ? 'LinkMenu__open-txt LinkMenu__open-txt--hidden' : 'LinkMenu__open-txt'

		return(
			<div className="LinkMenu"> 
				<div className="LinkMenu__tglVsblBtn" onClick={this.props.handleToggleMenuVisibility}> 
					Menu
					<span className={menuBtnTextCloseClass}> Close </span> 
					<span className={menuBtnTextOpenClass}> Open </span>
				</div>

				<LinkMenuList {...this.props} show={this.props.visibility} pages={pages}/>
				

				{/*<ul className={menuClass}>
					{
						pages && pages.map( (page, i) => {
							var className = 'LinkMenu__link'
							var selectedClassName = (page.href == selected) ? 'LinkMenu__link--selected' : ''
							className += ` ${selectedClassName}`

							return(
								<li 
									key={i}
									href={page.href}
									onClick={this.props.handleLinkClick}
									className={className}
								>
										{page.name}
								</li>
							)
						})
					}
				</ul>*/}
			</div>
		)
	}
}

export default LinkMenu