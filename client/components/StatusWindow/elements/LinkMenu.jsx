import React from 'react'
import './LinkMenu.less'

class LinkMenu extends React.Component{
	constructor(props){
		super(props)

		//visibility
		//hendleToggleVisibility
	}


	componentWillReceiveProps(newProps){

	}

	render(){
		var pages = this.props.pages
		var selected = this.props.currentPageHref

		var className = "LinkMenu"
		var hiddenClassName = this.props.visibility ? '' : ' LinkMenu--hidden'
		className += hiddenClassName


		return(
			<div className={className}> 
				<div className="LinkMenu__tglVsblBtn" onClick={this.props.handleToggleMenuVisibility}> open / close </div>

				<ul>
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
				</ul>
			</div>
		)
	}
}

export default LinkMenu