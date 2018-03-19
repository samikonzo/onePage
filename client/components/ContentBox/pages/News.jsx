import React 		from 'react'
import AppActions 	from '../../../actions/AppActions.js'
import PageStore 	from '../../../stores/PageStore.js'
import NewsStore	from '../../../stores/NewsStore.js'
import Uprise 		from '../../etc/uprise.js'
import CustomScroll from '../../etc/CustomScroll.jsx'
import NewsItem 	from './NewsItem.jsx'
import Loading 		from '../../etc/Loading.jsx'

import './News.less'


/*
	News 

	didmount => load first 10 news, one by one
	request to store (10 news for one request)
	store check downloaded from server, if no news, then try to download news
	

	hide news after loading more than ~20

*/

const NewsCountPerRequest = 3


function getStateFromFlux(){
	var fluxData = {
		isLoading 	: NewsStore.isLoading(),
		news 		: NewsStore.getNews()
	}

	return fluxData
}


class News extends React.Component{
	constructor(props){
		super(props)

		this.state = Object.assign({
			listeners : {},
		}, getStateFromFlux(),)


		this._hideContent 		= this._hideContent.bind(this)
		this._newsRefresh 		= this._newsRefresh.bind(this)
		this._handleNewsRequest = this._handleNewsRequest.bind(this)
		this._emitListeners		= this._emitListeners.bind(this)
	}

	componentDidMount(){
		//l('componentDidMount')

		PageStore.addPageChangeListener(this._hideContent)
		NewsStore.addNewsChangeListener(this._newsRefresh)

		this.elem.wheelBuzy = true  // disable page changing by mwheel

		this.elem.addEventListener('scrollBottom', this._handleNewsRequest) // emit first _handeNewsRequest
	}

	componentWillUnmount(){
		PageStore.removePageChangeListener(this._hideContent)
		NewsStore.removeNewsChangeListener(this._newsRefresh)
		this.elem.removeEventListener('scrollBottom', this._handleNewsRequest)
		NewsStore.clearClientHas()
	}

	componentWillReceiveProps(nextProps){}



	_hideContent(){
		return new Promise((resolve, reject) => {
			resolve()
		})
	}

	_handleNewsRequest(){
		//l('_handleNewsRequest')
		AppActions.getNews(NewsCountPerRequest)
	}

	_newsRefresh(){
		this.setState(getStateFromFlux(), this._emitListeners)
	}

	_emitListeners(){
		for(var item in this.state.listeners){
			var elem = this.state.listeners[item]
			if(elem.externalRefresh) elem.externalRefresh()
		}
	}

	render(){
		return(

			<div ref={elem => this.elem = elem} className="NewsGrid">
				{this.state.news && this.state.news.map( (item, i) => {
					return (
						<NewsItem key={i} item={item} delay={i%NewsCountPerRequest}/>
					)
				})}

				<Loading showed={this.state.isLoading}/>

				<CustomScroll elem={this.elem} ref={elem => this.state.listeners.CustomScroll = elem}/>
			</div>
		)
	}
}




export default News