import React 		from 'react'
import AppActions 	from '../../../actions/AppActions.js'
import PageStore 	from '../../../stores/PageStore.js'
import NewsStore	from '../../../stores/NewsStore.js'
import Uprise 		from '../../etc/uprise.js'
import CustomScroll from '../../etc/CustomScroll.jsx'
import NewsItem 	from './NewsItem.jsx'
import Loading 		from '../../etc/Loading.jsx'

import './News.less'


function getStateFromFlux(){
	return{
		isLoading 	: NewsStore.isLoading(),
		news 		: NewsStore.getNews()
	}
}


class News extends React.Component{
	constructor(props){
		super(props)

		this.state = getStateFromFlux()

		this._showContent 		= this._showContent.bind(this)
		this._hideContent 		= this._hideContent.bind(this)
		this.handleNewsRequest 	= this.handleNewsRequest.bind(this)
		this._newsRefresh 		= this._newsRefresh.bind(this)
	}

	componentDidMount(){
		this.uprise = Uprise(this.elem)

		this.handleNewsRequest()


		this.elem.wheelBuzy = true
		this.elem.addEventListener('scrollBottom', this.handleNewsRequest)

		PageStore.addPageChangeListener(this._hideContent)
		NewsStore.addNewsChangeListener(this._newsRefresh)

		this._showContent()
	}

	componentWillUnmount(){
		PageStore.removePageChangeListener(this._hideContent)
		NewsStore.removeNewsChangeListener(this._newsRefresh)
	}
	componentWillReceiveProps(nextProps){}


	_showContent(){}
	_hideContent(){
		return new Promise((resolve, reject) => {
			resolve()
		})
	}
	_newsRefresh(){
		this.setState(getStateFromFlux())
	}

	handleNewsRequest(){
		AppActions.getNews()
		/*var news = this.state.news
		var newNews = AppActions.getNews()

		this.setState({
			news : news.concat(newNews)
		})*/

	}


	render(){
		return(

			<div ref={elem => this.elem =elem} className="NewsGrid">
				{this.state.news.map( (item, i) => {
					return (
						<NewsItem key={i} item={item}/>
					)
				})}

				<Loading showed={this.state.isLoading}/>

				<CustomScroll elem={this.elem} />
			</div>
		)
	}
}


export default News