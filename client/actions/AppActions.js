import Dispatcher from '../dispatcher/AppDispatcher.js'
import Constants from '../constants/AppConstants.js'
import api from '../api/api.js'

function l(){
	console.log('AppActions : ', ...arguments)
}

const AppActions = {
	changePage(href, historyObj){
		//l('changing page')
		if(!href) return

		Dispatcher.dispatch({
			type 		: Constants.CHANGE_PAGE,
			href 		: href,
			historyObj	: historyObj
		})
	},

	nextPage(historyObj){
		Dispatcher.dispatch({
			type		: Constants.NEXT_PAGE,
			historyObj 	: historyObj
		})
	},

	previousPage(historyObj){
		Dispatcher.dispatch({
			type		: Constants.PREVIOUS_PAGE,
			historyObj 	: historyObj
		})
	},

	popstate(){
		Dispatcher.dispatch({
			type : Constants.POP_STATE
		})
	},


	getNews(count){
		Dispatcher.dispatch({
			type : Constants.GET_NEWS,
			count: count,
		})
	},

	getSingleNews(num){
		Dispatcher.dispatch({
			type : Constants.GET_SINGLE_NEWS,
			num: num,
		})
	}

}

export default AppActions