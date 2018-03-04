/*
	Component DelayLink from
	https://gist.github.com/headzoo/8f4c6a5e843ec26abdcad87cd93e3e2e
*/


import React from 'react'
import { Link } from 'react-router-dom'


const l = console.log;


class DelayLink extends React.Component{
	constructor(props){
		super(props)
		this.timeout = null;

		this.handleClick = this.handleClick.bind(this)
	}

	componentWillUnmount(){
		if(this.timeout){
			clearTimeout(this.timeout)
		}
	}

	handleClick(e){
		const { replace, to, delay, onDelayStart, onDelayEnd } = this.props
		const { history } = this.context.router

		e.preventDefault()
		
		onDelayStart(e, to)
			.then(
				result => {
					l(result)
					changeHistory()
				},
				err => l(err)
			)
		

		function changeHistory(){
			if(replace){
				history.replace(to)
			} else {
				history.push(to)
			}

			onDelayEnd(e, to)
		}
	}

	render(){
		const props = Object.assign({}, this.props)
		delete props.delay
		delete props.onDelayStart
		delete props.onDelayEnd

		return( 
			<Link {...props} onClick={this.handleClick} />
		)
	}
}

DelayLink.defaultProps = {
	delay 			: 0,
	onDelayStart 	: () => {},
	onDelayEnd 		: () => {}
}

DelayLink.contextTypes = Link.contextTypes;


export default DelayLink