import React from 'react'
import DelayLink from './DelayLink.jsx'
import './LinkMenu.less'

class LinkMenu extends React.Component{
	render(){
		return(
			<div className="LinkMenu"> 
				Link Menu 

				<ul>
					<li> 
						<DelayLink 
							to='' 
							onDelayStart={this.props.handlePageChange}> Home </DelayLink> 
					</li>

					<li> 
						<DelayLink 
							to='items'
							onDelayStart={this.props.handlePageChange}> Items </DelayLink> 
					</li>

				</ul>
			</div>
		)
	}
}

export default LinkMenu