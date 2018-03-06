import React from 'react'
import './PageCounter__num.less'

class PageCounter__num extends React.Component{
	render(){
		return(
			<div className="PageCounter__num">
				{/*PageCounter__num*/}
				<span className="currentPage">0</span>
				<span className="splitter"></span>
				<span className="countOfPages">5</span>

			</div>
		)
	}
}

module.exports = PageCounter__num