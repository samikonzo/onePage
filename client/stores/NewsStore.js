import { EventEmitter }		from 'events'
import Dispatcher 			from '../dispatcher/AppDispatcher.js'
import Constants 			from '../constants/AppConstants.js'
import getNewsFromServer 	from './News.js'



var news = []
var allNews
var loading = false

const EVENTS = {
	NEWS_CHANGE : 'NEWS_CHANGE'
}


getNewsFromServer().then(
	( xmlNews ) => {
		allNews = xmlNews
		l('allNews : ', allNews)
	},
	( err ) => l(err)
)





Dispatcher.register(function(action){
	switch(action.type){
		case Constants.GET_NEWS : {
			loading = true
			NewsStore.emitNewsChange()


			/*
				imitation server request
			*/
			setTimeout(function(){
				loading = false

				if(allNews){
					var newNews = allNews.slice(news.length, news.length + 10)
					l('newNews : ', newNews)

					news = news.concat( newNews )
				}

				NewsStore.emitNewsChange()
			}, 3000)

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
		this.emit(EVENTS.NEWS_CHANGE)
	},



	isLoading(){
		return loading
	},

	getNews(){
		return news
	}
})


export default NewsStore