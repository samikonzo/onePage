import React from 'react'

const l = console.log;

class PageCounter__slider extends React.Component{
	constructor(props){
		super(props)

		l(this.props.pages)

		this.state = {
			//count: this.props.pages.length
		}
	}

	render(){
		return(
			<div>
				PageCounter__slider
			</div>
		)
	}
}

module.exports = PageCounter__slider