import React 		from 'react'
import DelayLink 	from '../../DelayLink.jsx'
import Uprise 		from '../../etc/uprise.js'
import './Home.less'


const l = console.log

class Home extends React.Component{
	constructor(props){
		super(props)

		this.state = {

		}

		this._showContent = this._showContent.bind(this)
	}

	componentDidMount(){
		//l(' HOME : componentDidMount')
		this.props.addRunner(this._showContent)
	}

	componentWillUnmount(){
		this.props.removeRunner(this._showContent)
	}

	_showContent(){
		l(' HOME : Show Content')
		Uprise()
	}

	render(){
		return (
			<div  
				className="Home" 
				ref={(elem) => {this.elem = elem}}
			> 

				<header className="uprise--up uprise--delay3 uprise--hidden"> Hello, this is the homepage </header>
				<main className="uprise--up uprise--delay2 uprise--hidden"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, iure? </main>
				<footer className="uprise--up uprise--delay1 uprise--hidden" >  some foot here! </footer>
				
				<DelayLink to="/items" className="uprise--hidden uprise--delay3"> Items </DelayLink>
			</div>
		)
	}
}


export default Home