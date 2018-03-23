import { EventEmitter }		from 'events'
import Dispatcher 			from '../dispatcher/AppDispatcher.js'
import Constants 			from '../constants/AppConstants.js'
import getNewsFromServer 	from './NewsGet.js'



var news = []
var newsClientHas = []
var singleNews
var loading = false
var noNews = false


const EVENTS = {
	NEWS_CHANGE : 'NEWS_CHANGE',
	SINGLE_NEWS_CHANGE : 'SINGLE_NEWS_CHANGE',
}


/*getNewsFromServer().then(
	( xmlNews ) => {
		allNews = xmlNews
		l('allNews : ', allNews)
	},
	( err ) => l(err)
)
*/

var noNewsCap = {
	title: 'no news, please try later'
}






Dispatcher.register(function(action){
	switch(action.type){
		case Constants.GET_NEWS : {
			if(loading) return

			loading = true
			noNews = false

			NewsStore.emitNewsChange()

			var count = action.count || 5

			// if not enought news => download from server
			if(news.length < newsClientHas.length + count){
				getNewsFromServer(news.length).then(
					data => { 
						l(data)
						data.forEach((obj, i) => {
							obj._id = news.length + i
						})


						news = news.concat(data)
						newsClientHas = newsClientHas.concat( news.slice(newsClientHas.length, newsClientHas.length + count) )
						noNews = false
						loading = false
						NewsStore.emitNewsChange()
					},

					err => { 
						noNews = true
						loading = false			
						NewsStore.emitNewsChange()
					}
				)
				
			} else {
				newsClientHas = newsClientHas.concat( news.slice(newsClientHas.length, newsClientHas.length + count) )
				loading = false
				NewsStore.emitNewsChange()
			}

			break;
		}

		case Constants.GET_SINGLE_NEWS : {
			if(loading) return
				
			loading = true
			NewsStore.emitSingleNewsChange()

			var num = action.num

			if(news.length - 1 < num){
				getNewsFromServer(num).then(

					data => {
						l('NewsStore : 1 DATA')
						loading = false
						singleNews = data[0]
						NewsStore.emitSingleNewsChange()						
					},

					err => {
						l('NewsStore : 2 ERR ')
						loading = false
						singleNews = undefined
						NewsStore.emitSingleNewsChange()
					}
				)


			} else {
				l('NewsStore : 3 ELSE ')
				singleNews = news[num]
				loading = false
				NewsStore.emitSingleNewsChange()
			}

		}
	}
})

const NewsStore = Object.assign({}, EventEmitter.prototype, {

	// NewsCahnge

	addNewsChangeListener(f){
		this.on(EVENTS.NEWS_CHANGE, f)
	},

	removeNewsChangeListener(f){
		this.removeListener(EVENTS.NEWS_CHANGE, f)
	},

	emitNewsChange(){
		//l('NewsStore emitNewsChange')
		this.emit(EVENTS.NEWS_CHANGE)
	},


	//	SingleNewsChange

	addSingleNewsChangeListener(f){
		this.on(EVENTS.SINGLE_NEWS_CHANGE, f)
	},

	removeSingleNewsChangeListener(f){
		this.removeListener(EVENTS.SINGLE_NEWS_CHANGE, f)
	},

	emitSingleNewsChange(){
		this.emit(EVENTS.SINGLE_NEWS_CHANGE)
	},




	isLoading(){
		return loading
	},

	getNews(){
		return newsClientHas
	},

	getNoNews(){
		return noNews
	},

	clearClientHas(){
		newsClientHas = []
	},

	getSingleNews(){
		l('NewsStore getSingleNews : ', singleNews)
		return singleNews
	}

})


export default NewsStore