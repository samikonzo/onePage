import React from 'react'


class Loading extends React.Component{

	componentWillReceiveProps(nextProps){

	}

	render(){

		var showed = this.props.showed
		var loadingClassName = 'Loading '

		if( showed ) loadingClassName += 'Loading--showed'

		return(
			<div className={loadingClassName}> Loading Component </div>
		)
	}
}

export default Loading