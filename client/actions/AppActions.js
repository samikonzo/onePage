import Dispatcher from '../dispatcher/AppDispatcher.js'
import Constants from '../constants/AppConstants.js'
import api from '../api/api.js'

function l(){
	console.log('AppActions : ', ...arguments)
}

const AppActions = {
	changePage(href){
		l('changing page')

		Dispatcher.dispatch({
			type: Constants.CHANGE_PAGE,
			href: href,
		})
	}
}

export default AppActions