import React 		from 'react'
import Uprise 		from '../../etc/uprise.js'

import './NewsItem.less'

class NewsItem extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			guid  		:this.props.guid ,
			category 	:this.props.category,
			description :this.props.description,
			enclosure 	:this.props.enclosure,
			limk 		:this.props.limk,
			pubDate 	:this.props.pubDate,
			title 		:this.props.title,
		}


		this._showContent = this._showContent.bind(this)
		this._hideContent = this._hideContent.bind(this)
	}

	componentDidMount(){
		this.uprise = Uprise(this.elem)
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
		return (
			<div ref={elem=>this.elem=elem} className="NewsItem"> 
				<p className="uprise--right uprise--delay3 uprise--auto"> {this.state.title} </p>
			</div>
		)
	}
}
export default NewsItem