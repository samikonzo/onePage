import { EventEmitter }		from 'events'
import Dispatcher 			from '../dispatcher/AppDispatcher.js'
import Constants 			from '../constants/AppConstants.js'
import getNewsFromServer 	from './NewsGet.js'



var news = []
var newsClientHas = []
var loading = false


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








Dispatcher.register(function(action){
	switch(action.type){
		case Constants.GET_NEWS : {
			if(loading) return
			loading = true
			NewsStore.emitNewsChange()

			var count = action.count || 5

			if(news.length < newsClientHas.length + count){
				getNewsFromServer(news.length).then(
					data => { 
						//l(data)	
						news = news.concat(data)
						newsClientHas = newsClientHas.concat( news.slice(newsClientHas.length, newsClientHas.length + count) )
						loading = false
						NewsStore.emitNewsChange()
					},

					err => { 
						//l(err.text) 
						loading = false			
						NewsStore.emitNewsChange()
					}
				)
			} else {
				//l(' ENOUGHT ')
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
		this.emit(EVENTS.NEWS_CHANGE)
	},



	isLoading(){
		return loading
	},

	getNews(){
		return newsClientHas
	},

	clearClientHas(){
		newsClientHas = []
	}
})


export default NewsStore