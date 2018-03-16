import { EventEmitter } from 'events'
import Dispatcher 		from '../dispatcher/AppDispatcher.js'
import Constants 		from '../constants/AppConstants.js'
import getNews 			from './News.js'



var news
var loading = true



getNews().then(
	( xmlNews ) => {
		l(xmlNews)
		news = xmlNews
	},
	( err ) => l(err)
)







Dispatcher.register(function(action){
	switch(action.type){
		/*case Constants. : {
			break;
		}*/
	}
})

const NewsStore = Object.assign({}, EventEmitter.prototype, {
	isLoading(){},
	//getFirstNews(){},
	getNews(){}
})


export default NewsStore