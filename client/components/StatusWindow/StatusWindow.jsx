import React from 'react'
import PageCounter from './PageCounter.jsx'
import LinkMenu from './LinkMenu.jsx'

class StatusWindow extends React.Component{
	render(){
		return(
			<div>
				StatusWindow
				<PageCounter pages={this.props.pages}/>
				<LinkMenu pages={this.props.pages}/>
			</div>
		)
	}
}

module.exports = StatusWindow