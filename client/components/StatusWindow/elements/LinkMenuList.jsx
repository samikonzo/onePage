import React from 'react'
import Uprise from '../../etc/uprise.js'

class LinkMenuList extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			visible : false
		}

		this._showContent = this._showContent.bind(this)
		this._hideContent = this._hideContent.bind(this)
	}

	componentDidMount(){
		this.uprise = Uprise(this.elem)

		this.setState({
			uprise : this.uprise.getState()
		})

		if(this.props.visibility){
			this.setState({
				visible: true
			})
			//this._showContent()
		}
	}


	/*shouldComponentUpdate(nextProps) {
	    if ( nextProps.show != this.state.visible ) {

	    	if( nextProps.show ){
				this._showContent()
			} else {
				this._hideContent()
			}

			this.setState(({
				visible : nextProps.show
			}))

			return true;
		}

		if( nextProps.currentPageHref != this.state.selected ){

			this.setState({
				selected : nextProps.currentPageHref
			})

			return true
		}


		// say no to render 
		return false;
	  }
*/

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

		if(this.state.uprise){
			var uprises = this.state.uprise.uprises
			var shown = this.state.uprise.shown
		}


		return(
			<ul ref={elem => this.elem = elem}>
				LinkMenuList

				{pages && pages.map( (page, i) => {
					var className = 'LinkMenu__link'
					var selectedClass = (page.href == selected) ? ' LinkMenu__link--selected' : '';
					className += selectedClass
					

					// first time
					if(!this.state.uprise){
						var upriseClass = ` uprise--hidden uprise--right uprise--delay${i+1}`;

					} else {

						upriseClass = ''
						/*if(shown){
							upriseClass = ' uprise'

						} else {
							upriseClass = uprises[i].

						}*/
						
					}	

					className += upriseClass

					//var upriseClass = this.state.visible ? ' ' : ` uprise--hidden uprise--right uprise--delay${i+1}`;



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