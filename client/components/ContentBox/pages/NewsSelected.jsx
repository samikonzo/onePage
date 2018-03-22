import React from 'react'
import PageStore from '../../../stores/PageStore.js'
import NewsStore from '../../../stores/NewsStore.js'


class NewsSelected extends React.Component{
	constructor(props){
		super(props)

		l(props)

		this.state = {
			
		}

		this._hideContent = this._hideContent.bind(this)
		this._showContent = this._showContent.bind(this)
	}

	componentWillMount(){
		PageStore.addPageChangeListener(this._hideContent)
		PageStore.addHistoryChangeListener(this._showContent)
	}

	componentWillUnmount(){}

	componentWillReceiveProps(nextProps){
		l(nextProps)
		this.setState(nextProps)
	}

	_showContent(){}
	_hideContent(){
		return new Promise( resolve => {
			setTimeout(resolve, 0)
		})
	}


	render(){
		return (
			<div> {this.state.id}</div>
		)
	}
}

export default NewsSelected