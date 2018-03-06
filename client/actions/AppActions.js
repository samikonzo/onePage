import Dispatcher from '../dispatcher/AppDispatcher.js'
import Constants from '../constants/AppConstants.js'
import api from '../api/api.js'

function l(){
	console.log('AppActions : ', ...arguments)
}

const AppActions = {
	changePage(href, historyObj){
		//l('changing page')

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
	}
}

export default AppActions