import React from 'react'
import PageCounter__num from './PageCounter__num.jsx'
import PageCounter__slider from './PageCounter__slider.jsx'


var l = console.log


class PageCounter extends React.Component{
	constructor(props){
		super(props)

		l(this.props.pages)
	}


	render(){
		return(
			<div>
				<PageCounter__num />
				<PageCounter__slider />
			</div>
		)
	}
}

module.exports = PageCounter