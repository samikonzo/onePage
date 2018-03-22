import React 		from 'react'
import DelayLink 	from '../../etc/DelayLink.jsx'

class Page404 extends React.Component{
	componentDidMount(){
		this.elem.wheelBuzy = true
	}

	render(){
		l(this.props.match)
		return (

			<div className="Page404" ref={elem => this.elem = elem}>
				<p>Error 404</p>
				<p>There is no page with url : {this.props.match.params.url}</p>
				<DelayLink to="/"> Home </DelayLink>
			</div>
		)
	}
}

export default Page404