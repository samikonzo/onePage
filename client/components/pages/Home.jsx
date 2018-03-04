import React from 'react'
import './Home.less'

const l = console.log

class Home extends React.Component{
	constructor(props){
		super(props)

		//l(props)

		this.state = {
			showed: false,
		}

		this.handleMount = this.handleMount.bind(this)
		//this.handleRemove = this.handleRemove.bind(this)
	}

	handleMount(){
		return new Promise( (resolve, reject) => {
			resolve()
		})
	}

	/*handleRemove(){
		return new Promise( (resolve, reject) => {
			l('Home : handleRemove emited')

			var elem = this.elem
			elem.style.transition = '1s'
			elem.style.opacity = 1
			elem.style.filter = 'blur(0px)'

			setTimeout(function f(){
				if(elem.style.transition != '1s'){
					setTimeout(f, 50)
					return
				}

				elem.style.opacity = 0;
				elem.style.filter = 'blur(5px)'

				setTimeout(	() => {
					resolve('Home : end')
				}, 1000)

			},10)
		})
	}*/

	componentWillMount(){

	}	

	componentDidMount(){
		const that = this;

		this.handleMount()
			.then(
				function(){
					that.setState({
						showed: true
					})
				}
			)
	}

	componentWillUnmount(){
		delete this.elem
	}

	render(){

		var clList = this.elem && this.elem.classList
		if(clList){
			if(this.state.showed) clList.add('showed')
			else clList.remove('showed')
		}

		return (
			<div  
				className="Home uprise--up uprise--delay1" 
				ref={(elem) => {this.elem = elem}}
			> 
				<header> Hello, this is the homepage </header>
				<main> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, iure? </main>
				<footer> some foot here! </footer>
			</div>
		)
	}
}


export default Home