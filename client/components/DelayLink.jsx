/*
	Component DelayLink from
	https://gist.github.com/headzoo/8f4c6a5e843ec26abdcad87cd93e3e2e

	modificated
	no delay here, just redirect request to Flux
*/


import React from 'react'
import { Link } from 'react-router-dom'
import AppActions from '../actions/AppActions.js'

const l = console.log;


class DelayLink extends React.Component{
	constructor(props){
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}


	handleClick(e){
		e.preventDefault()

		const { replace, to} = this.props
		const { history: historyObj  } = this.context.router

		//l(this.context)

		AppActions.changePage(to, historyObj)

	}

	render(){
		const props = Object.assign({}, this.props)

		return( 
			<Link {...props} onClick={this.handleClick} />
		)
	}
}

DelayLink.contextTypes = Link.contextTypes;


export default DelayLink