import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher/AppDispatcher.js'
import Constants from '../constants/AppConstants.js'
import { Link } from 'react-router-dom'

/*const l = function(){
	console.log('AppStore : ', ...arguments)
}*/

var l = console.log


const PAGES = [
	{
		name : 'Home',
		href : '/'
	},

	{
		name : 'Items',
		href : '/items'
	},

	{
		name : 'Contacts',
		href : '/contacts'
	}
]

const EVENTS = {
	CHANGE_PAGE 	: 'changePage',
	CHANGE_HISTORY 	: 'changeHistory'
}



let _currentPage
let _historyObj


var LOGGED = false



const AppStore = Object.assign({}, EventEmitter.prototype,{

	// History

	emitHistoryChange(){
		LOGGED && l('Change history')
		_historyObj.push(_currentPage)
		this.emit(EVENTS.CHANGE_HISTORY)
	},
	addChangeHistoryListener(f){
		this.on(EVENTS.CHANGE_HISTORY, f)
	},
	removeChangeHistoryListener(f){
		this.removeListener(EVENTS.CHANGE_HISTORY, f)
	},

	//////////////////////////


	// Pages
	emitChangePage(){
		
		//this.emit(EVENTS.CHANGE_PAGE)

		var funcs = AppStore.listeners(EVENTS.CHANGE_PAGE)
		var count = funcs.length
		var countReady = 0;


		LOGGED && l(funcs)


		funcs.forEach( f => {
			f().then(
				(msg)=>{
					LOGGED && l('msg : ', msg)
					countReady++
					if(checkAllReady()) this.emitHistoryChange()
				})
		})

		function checkAllReady(){
			LOGGED && l('All ready : ', count == countReady)
			return count == countReady
		}

		/*function changeHistory(){
			LOGGED && l('Change history')
			_historyObj.push(_currentPage)
		}*/
	},

	addChangePageListener(f){
		this.on(EVENTS.CHANGE_PAGE, f)
	},

	removeChangePageListener(f){
		this.removeListener(EVENTS.CHANGE_PAGE, f)
	},

	getCurrentPage(){
		if(!_currentPage){
			_currentPage = location.href.split(location.host)[1]
		}
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

			// check redirect to current page
			//l(_currentPage, ' : ', action.href)
			if(_currentPage == action.href){
				return
			}

			//l(action)

			_currentPage = action.href
			if(action.historyObj) _historyObj = action.historyObj

			AppStore.emitChangePage()
			break;
		}
	}
})


export default AppStore