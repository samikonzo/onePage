import React from 'react'

import './Loading.less'


class Loading extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			showed: this.props.showed
		}


	}

	componentWillReceiveProps(nextProps){
		this.setState({
			showed : nextProps.showed
		})
	}


	render(){

		var showed = this.state.showed
		var loadingClassName = 'Loading '

		//l('showed  :', showed)

		if( showed ) loadingClassName += 'Loading--showed'

		return(
			<div className={loadingClassName} ref={elem => this.elem = elem}> 
			   
				<ul> <li></li>	<li></li> <li></li>	</ul>
			</div>
		)
	}
}

export default Loading