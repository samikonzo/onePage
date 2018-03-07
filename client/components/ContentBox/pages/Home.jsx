import React 		from 'react'
import DelayLink 	from '../../DelayLink.jsx'
import Uprise 		from '../../etc/uprise.js'
import AppStore 	from '../../../stores/AppStore.js'
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
		AppStore.addChangePageListener(this._hideContent)
		this.uprise = Uprise(this.elem)
		this._showContent()
	}

	componentWillUnmount(){
		AppStore.removeChangePageListener(this._hideContent)
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

				<header className="uprise--up uprise--delay3 uprise--hidden">
					Hello, this is the homepage 
				</header>

				<main className="uprise--up uprise--delay2 uprise--hidden">
			 		<p className="uprise--right uprise--delay4 uprise--hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, iure? </p>
				</main>

				<footer className="uprise--up uprise--delay1 uprise--hidden" >  
					<p className="uprise--right uprise--delay5 uprise--hidden"> some foot here! </p>
				</footer>
				
				<DelayLink to="/items" className="uprise--hidden uprise--delay3"> Items </DelayLink>
			</div>
		)
	}
}


export default Home