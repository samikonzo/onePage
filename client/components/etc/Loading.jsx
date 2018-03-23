import React from 'react'
import Uprise from './uprise.js'

import './Loading.less'


class Loading extends React.Component{

	constructor(props){
		super(props)

		this.state = this.props

	}

	componentDidMount(){
		this.uprise = Uprise(this.elem)
	}

	componentWillUnmount(){
		this.uprise.clear()
	}

	componentWillReceiveProps(nextProps){
		this.setState(nextProps, () => {
			if(this.state.showedMsg){
				this.uprise.show()
			} else {
				this.uprise.hide()
			}
		})
	}



	render(){
		var LoadingClass = "Loading "
		var LoadingAnimationClass = "Loading__animation "
		var LoadingMessageClass = "Loading__message "

		var msg = this.state.msg && this.state.msg.split(' ').map( (word, i) => {

			var randomDelayTime = Math.floor( Math.random() * 5 )

			var className = `Loading__word uprise--right uprise--delay${randomDelayTime}`
			
			word += ' '

			return (<span className={className} key={i}>{word}</span>)
		})

		if(this.state.alone) LoadingClass += 'Loading--alone '

		if(this.state.showed){
			LoadingClass += 'Loading--showed '
			LoadingAnimationClass += "Loading__animation--showed " 
		}

		if(this.state.showedMsg) LoadingMessageClass += "Loading__message--showed "

		
		return(
			<div className={LoadingClass} ref={elem => this.elem = elem}>
				<div className={LoadingAnimationClass}>
					<ul> <li></li>	<li></li> <li></li>	</ul>
				</div>

				<div className={LoadingMessageClass}> {msg} </div>
			</div>
		)
	}
}

export default Loading