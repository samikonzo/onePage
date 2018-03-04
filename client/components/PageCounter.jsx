import React from 'react'
import PageCounter__num from './PageCounter__num.jsx'
import PageCounter__slider from './PageCounter__slider.jsx'

class PageCounter extends React.Component{
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