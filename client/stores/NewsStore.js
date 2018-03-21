import { EventEmitter }		from 'events'
import Dispatcher 			from '../dispatcher/AppDispatcher.js'
import Constants 			from '../constants/AppConstants.js'
import getNewsFromServer 	from './NewsGet.js'



var news = []
var newsClientHas = []
var loading = false
var noNews = false


const EVENTS = {
	NEWS_CHANGE : 'NEWS_CHANGE'
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
	}
})

const NewsStore = Object.assign({}, EventEmitter.prototype, {
	addNewsChangeListener(f){
		this.on(EVENTS.NEWS_CHANGE, f)
	},

	removeNewsChangeListener(f){
		this.removeListener(EVENTS.NEWS_CHANGE, f)
	},

	emitNewsChange(){
		l('NewsStore emitNewsChange')
		this.emit(EVENTS.NEWS_CHANGE)
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
	}
})


export default NewsStore