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
		this._formatDate = this._formatDate.bind(this)
		this._openInNewTab = this._openInNewTab.bind(this)
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

	_formatDate(date){
		date = new Date(date)

		var day = date.getDate()
		var month = date.getMonth() + 1
		var year = date.getFullYear() % 100 // return 2 sign

		day = day > 10 ? day : '0' + day
		month = month > 10 ? month : '0' + month
		year = year > 10 ? year : '0' + year

		return `${day}.${month}.${year}`
	}

	_openInNewTab(e){
		e.preventDefault()

		var win = window.open(e.target.getAttribute('href'), '_blank')
		win.focus()
	}


	render(){

		l(this.props)
		//var link = window.location.href.split(window.location.pathname)[1] + this.props.item.guid.split('news/')[1]
		var pathname = window.location.href.split('/#/')[1] || window.location.pathname
		var link = pathname + '/' + this.props.item._id
		var className = `NewsItem uprise--right uprise--delay${this.state.delay} uprise--auto `

		return (
			<div ref={elem=>this.elem=elem} className={className}> 
				<h2 className="NewsItem__title" href={link} onClick={this.props._handleChangePage}> {this.state.title} </h2>
				<img className="NewsItem__img uprise--left uprise--parent uprise--delay1" src={this.state.enclosure && this.state.enclosure._url} />
				<p className="NewsItem__description"> 
					{this.state.description && this.state.description.__cdata}
					<a className="NewsItem__link" href={this.state.link} onClick={this._openInNewTab}> link </a>

				</p>
				<div className="NewsItem_date"> {this._formatDate( this.state.pubDate )}</div>
			</div>
		)
	}
}

export default NewsItem