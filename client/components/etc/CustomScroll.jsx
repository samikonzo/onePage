import React 		from 'react'
import './CustomScroll.less'


class CustomScroll extends React.Component{
	constructor(props){
		super(props)

		this.state = {}
	}

	componentDidMount(){
		
	}

	componentWillUnmount(){
		
	}


	render(){
		return (
			<div ref={elem => this.elem = elem} className="CustomScroll"> 
				<div className="CustomScroll__scroll"></div>
			</div>
		)
	}
}









export default CustomScroll