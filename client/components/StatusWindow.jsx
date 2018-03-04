import React from 'react'
import PageCounter from './PageCounter.jsx'
import LinkMenu from './LinkMenu.jsx'

class StatusWindow extends React.Component{
	render(){
		return(
			<div>
				StatusWindow
				<PageCounter />
				<LinkMenu handlePageChange={this.props.handlePageChange}/>
			</div>
		)
	}
}

module.exports = StatusWindow