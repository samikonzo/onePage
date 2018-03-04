import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher/AppDispatcher.js'
import Constants from '../constants/AppConstants.js'


const PAGES = [
	{
		name : 'Home',
		href : '/'
	},

	{
		name : 'Items',
		href : '/items'
	}
]

const EVENTS = {
	CHANGE 		: 'change',
	CHANGE_PAGE : 'changePage',
}

let _currentPage = '/'






const AppStore = Object.assign({}, EventEmitter.prototype,{

	// Pages

	emitChangePage(){
		this.emit(EVENTS.CHANGE_PAGE)
	},

	addChangePageListener(f){
		this.on(EVENTS.CHANGE_PAGE, f)
	},

	removeChangePageListener(f){
		this.removeListener(EVENTS.CHANGE_PAGE, f)
	},

	getCurrentPage(){
		return _currentPage
	},

	getPages(){
		return PAGES
	}

	//////////////////////////

})


Dispatcher.register(function(action){
	switch(action.type){
		case Constants.CHANGE_PAGE : {

			if(_currentPage == action.href) return

			_currentPage = action.href
			AppStore.emitChangePage()
			break;
		}

		case Constants.LOAD_PAGES : {

		}
	}
})


export default AppStore