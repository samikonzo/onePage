import React from 'react'

//	components
import StatusWindow from './StatusWindow.jsx'
import ContentBox from './ContentBox.jsx'

//	flux 
import AppStore from '../stores/AppStore.js'
import AppActions from '../actions/AppActions.js'

// 	style
import './App.less'
import './etc/uprise.less'


class App extends React.Component{
	constructor(props){
		super(props)

		this.handlePageChange = this.handlePageChange.bind(this)
	}

	handlePageChange(){
		//	get current open page

		//	check handleRemove

		// return handleRemove Promise or return new Promise
		return new Promise( (resolve, reject) => {
			resolve()
		})
	}

	/*closeCurrent(){
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
	}*/




	render(){
		return(
			<div>
				<StatusWindow 
					handlePageChange={this.handlePageChange}
				/>

				<ContentBox />
			</div>
		)
	}
}

module.exports = App