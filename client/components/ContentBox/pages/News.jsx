import React 		from 'react'
import AppActions 	from '../../../actions/AppActions.js'
import PageStore 	from '../../../stores/PageStore.js'
import NewsStore	from '../../../stores/NewsStore.js'
import Uprise 		from '../../etc/uprise.js'
import CustomScroll from '../../etc/CustomScroll.jsx'
import NewsItem 	from './NewsItem.jsx'

import './News.less'

/*function getStateFromFlux(){
	return{
		isLoading 	: NewsStore.isLoading(),
		news 		: NewsStore.getNews()
	}
}*/


class News extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			isLoading : NewsStore.isLoading(),
			//news: NewsStore.getNews()
		}

		this.handleNewsRequest = this.handleNewsRequest.bind(this)
	}

	componentDidMount(){
		this.handleNewsRequest()

		this.uprise = Uprise(this.elem)
		this.elem.wheelBuzy = true
		this.elem.addEventListener('scrollBottom', this.handleNewsRequest)
	}

	componentWillUnmount(){}
	componentWillReceiveProps(nextProps){}

	handleNewsRequest(){
		var news = this.state.news
		var newNews = NewsStore.getNews()

		this.setState({
			news : news.concat(newNews)
		})

	}


	render(){


		//<Loading> </Loading>
		

		return(

			<div ref={elem => this.elem =elem} className="NewsGrid">
				{this.state.news.map(item => {
					return (
						<NewsItem item={item}/>
					)
				})}
				<CustomScroll elem={this.elem} />
			</div>
		)
	}
}


export default News