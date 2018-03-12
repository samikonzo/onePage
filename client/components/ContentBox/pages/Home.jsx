import React 		from 'react'
import Uprise 		from '../../etc/uprise.js'
import PageStore 	from '../../../stores/PageStore.js'
import DelayLink 	from '../../etc/DelayLink.jsx'
import './Home.less'



const l = console.log

class Home extends React.Component{
	constructor(props){
		super(props)

		this.state = {
		}

		this._hideContent = this._hideContent.bind(this)
		this._showContent = this._showContent.bind(this)
	}

	componentDidMount(){
		PageStore.addPageChangeListener(this._hideContent)
		this.uprise = Uprise(this.elem)
		this._showContent()
	}

	componentWillUnmount(){
		PageStore.removePageChangeListener(this._hideContent)
	}

	_hideContent(){
		this.uprise.hide()
		return new Promise( (resolve, reject) => {
			resolve()
		})
	}

	_showContent(){
		this.uprise.show()
	}

	render(){
		return (
			<div  
				className="Home" 
				ref={(elem) => {this.elem = elem}}
			> 

				<header className="uprise--up uprise--delay3 ">
					Hello, this is the homepage 
				</header>

				<main className="uprise--up uprise--delay2 ">
			 		<p className="uprise--right uprise--delay4 ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, iure? </p>
				</main>

				<footer className="uprise--up uprise--delay1 " >  
					<p className="uprise--right uprise--delay5 uprise--length20 uprise--time10"> some foot here! </p>
				</footer>
				
				<DelayLink to="/information"> bebebe </DelayLink> 
			</div>
		)
	}
}


export default Home