import React 		from 'react'
import AppActions 	from '../../../actions/AppActions.js'
import PageStore 	from '../../../stores/PageStore.js'
import NewsStore 	from '../../../stores/NewsStore.js'
import Loading 		from '../../etc/Loading.jsx'
import NewsItem 	from './NewsItem.jsx'
import bounce 		from '../../etc/bounce.js'


import './NewsSelected.less'


class NewsSelected extends React.Component{
	constructor(props){
		super(props)

		l(props)

		this.state = {
			id : this.props.match.params.id
		}

		
		this._hideContent = this._hideContent.bind(this)
		this._showContent = this._showContent.bind(this)

		// must be throttled or debounced
		var getSingleNewsThis = this._getSingleNews.bind(this)
		this._getSingleNews = bounce(getSingleNewsThis, 2000)

		this._changeSingleNews = this._changeSingleNews.bind(this)

		this._changeToPreviousPage = this._changeToPreviousPage.bind(this)
		this._changeToNextPage = this._changeToNextPage.bind(this)
	}

	componentDidMount(){
		this.elem.wheelBuzy = true

		var parent = this.elem.parentElement
		parent.wheelBuzySavedValue = parent.wheelBuzy
		parent.wheelBuzy = true

		this.previousButton.addEventListener('click', this._changeToPreviousPage)
		this.nextButton.addEventListener('click', this._changeToNextPage)

		PageStore.addPageChangeListener(this._hideContent)
		PageStore.addHistoryChangeListener(this._showContent)
		NewsStore.addSingleNewsChangeListener(this._changeSingleNews)

		this._getSingleNews()
		this._showContent()
	}

	componentWillUnmount(){
		var parent = this.elem.parentElement
		parent.wheelBuzy = parent.wheelBuzySavedValue
		delete parent.wheelBuzySavedValue

		PageStore.removePageChangeListener(this._hideContent)
		PageStore.removeHistoryChangeListener(this._showContent)
		NewsStore.removeSingleNewsChangeListener(this._changeSingleNews)

	}

	componentWillReceiveProps(nextProps){

		//l(nextProps.match.params)
		var newId = nextProps.match.params.id
		l(newId)
		if(newId == this.state.id) return

		l('change')

		this.setState({
			id: newId
		}, this._getSingleNews)
	}


	_showContent(){
		/*l('show content')*/
	}

	_hideContent(){
		return new Promise( resolve => {
			setTimeout(resolve, 0)
		})
	}

	_getSingleNews(){
		l('getSingleNews request')
		AppActions.getSingleNews(this.state.id)
	}
	_changeSingleNews(){
		l(' ')
		l('_changeSingleNews')
		var singleNews = NewsStore.getSingleNews()
		var isLoading = NewsStore.isLoading()

		l('singleNews : ', singleNews)
		l('isLoading : ', isLoading)

		this.setState({
			news: singleNews,
			isLoading: isLoading,
		})
	}

	_changeToPreviousPage(){
		l('change page to previous')
			
		var pathname = window.location.href.split('/#/')[1] || window.location.pathname
		var link ='' + (+this.state.id - 1)//pathname.split(this.state.id)[0] + ( +this.state.id - 1 )

		l('link : ', link)

		AppActions.changePage(link)
	}
	_changeToNextPage(){
		l('change page to next')

		var pathname = window.location.href.split('/#/')[1] || window.location.pathname
		var link = '' + (+this.state.id - 1) //pathname.split(this.state.id)[0] + ( +this.state.id + 1 )

		l('link : ', link)
		AppActions.changePage(link)
	}

	render(){
		//l('news : ',this.state.news)
		l(this.state)

		var className = 'NewsSelected'

		const item = this.state.news ? (
				<NewsItem item={this.state.news} delay={3}/>
			) : (
				<div></div>
			)

		return (
			<div className={className} ref={elem => this.elem = elem}>
				
				<div className="NewsSelected__button-previous" ref={elem => this.previousButton = elem}> PREVIOUS </div>
				<div className="NewsSelected__button-next" ref={elem => this.nextButton = elem}> next </div>

				{item}


				<Loading 
					showed={this.state.isLoading} 
					alone={true}/>				
			</div>
		)
	}
}


export default NewsSelected