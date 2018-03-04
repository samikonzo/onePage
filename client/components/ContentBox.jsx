import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import DelayLink from './DelayLink.jsx' 

//	style
import './ContentBox.less'

//	pages 
import Home from './pages/Home.jsx'
import Items from './pages/Items.jsx'


const l = console.log;

class ContentBox extends React.Component{

	constructor(props){
		super(props)



		this.closeCurrent = this.closeCurrent.bind(this)
		this.endOfClose = this.endOfClose.bind(this)
	}

	closeCurrent(){
		l(this.currentOpen)
		
		// if there is handleRemove Promise inside component
		// else new Promise with default opacity changing
		if(this.currentOpen.handleRemove){
			return this.currentOpen.handleRemove()

		} else {
			return new Promise((resolve, reject) => {
				var elem = this.currentOpen.elem

				if(!elem) resolve()

				elem.style.transition = '1s'
				elem.style.opacity = 1
				elem.style.filter = 'blur(0px)'

				setTimeout(function f(){
					if(elem.style.transition != '1s'){
						setTimeout(f, 100)
						return
					}

					elem.style.opacity = 0;
					elem.style.filter = 'blur(5px)'

					setTimeout(	resolve, 1000 )
				},100)
			})
		}
	}

	endOfClose(){
		l('END OF CLOSE')
		l('this.currentOpen : ', this.currentOpen)
	}

	render(){
		return(
			<div className="ContentBox">
				<Switch>
					<Route exact path='/' render={ (props) => {
							return <Home {...props} ref={item => this.currentOpen = item} />
						}
					}/>
					<Route path='/items' render={ (props) => {
							return <Items {...props} ref={item => this.currentOpen = item} />
						}
					}/>
				</Switch>
			</div>

		)
	}
}

module.exports = ContentBox