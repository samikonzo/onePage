import React 		from 'react'
import Uprise 		from '../../etc/uprise.js'

import './NewsItem.less'

class NewsItem extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			guid  		: this.props.item.guid ,
			category 	: this.props.item.category,
			description : this.props.item.description,
			enclosure 	: this.props.item.enclosure,
			link 		: this.props.item.link,
			pubDate 	: this.props.item.pubDate,
			title 		: this.props.item.title,
			delay 		: this.props.delay,
		}


		this._showContent = this._showContent.bind(this)
		this._hideContent = this._hideContent.bind(this)
	}



	componentDidMount(){
		this.uprise = Uprise(this.elem.parentElement)
	}

	componentWillUnmount(){
		this.uprise.clear()
	}

	_showContent(){}
	_hideContent(){
		return new Promise((resolve, reject) => {
			resolve()
		})
	}


	render(){
		var className = `NewsItem uprise--right uprise--delay${this.state.delay} uprise--auto `

		return (
			<div ref={elem=>this.elem=elem} className={className}> 
				<p> {this.state.title} </p>
			</div>
		)
	}
}
export default NewsItem