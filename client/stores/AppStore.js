import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher/AppDispatcher.js'
import Constants from '../constants/AppConstants.js'
import { Link } from 'react-router-dom'



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



let _currentPageHref
let _currentPageNum
let _historyObj


var LOGGED = false



const AppStore = Object.assign({}, EventEmitter.prototype,{

	// History

		emitHistoryChange(){
			LOGGED && l('Change history')
			_historyObj.push(_currentPageHref)

			this.getCurrentPageNum() // just for change pagenum in storage

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
		},

		addChangePageListener(f){
			this.on(EVENTS.CHANGE_PAGE, f)
		},

		removeChangePageListener(f){
			this.removeListener(EVENTS.CHANGE_PAGE, f)
		},

		getCurrentPage(){
			if(!_currentPageHref){
				_currentPageHref = location.href.split(location.host)[1]
			}
			return _currentPageHref
		},

		getCurrentPageNum(){
			PAGES.forEach( (page, i) => {
				if(page.href == _currentPageHref) _currentPageNum = i
			})

			return _currentPageNum
		},

		getPages(){
			return PAGES
		}

	//////////////////////////
})
/*

Dispatcher.register(function(action){
	switch(action.type){
		case Constants.CHANGE_PAGE : {

			// check redirect to current page
			if(_currentPageHref == action.href){
				return
			}
			_currentPageHref = action.href
			if(action.historyObj) _historyObj = action.historyObj

			AppStore.emitChangePage()
			break;
		}

		case Constants.NEXT_PAGE : {
			AppStore.getCurrentPageNum()
			
			if(!_historyObj && action.historyObj){
				_historyObj = action.historyObj
			}
			
			var nextPageNum = _currentPageNum + 1;
			if(nextPageNum > PAGES.length - 1) return

			l('NEXT_PAGE!')
			//l('_currentPageHref : ', _currentPageHref)
			//l('_currentPageNum : ', _currentPageNum)
			//l('_historyObj : ', _historyObj)

			_currentPageHref = PAGES[nextPageNum].href
			AppStore.emitChangePage()


			break;
		}

		case Constants.PREVIOUS_PAGE : {
			AppStore.getCurrentPageNum()
			
			if(!_historyObj){
				_historyObj = action.historyObj
			}


			var previousPageNum = _currentPageNum - 1;
			if(previousPageNum < 0 ) return

			l('PREVIOUS_PAGE')
			//l('_currentPageHref : ', _currentPageHref)
			//l('_currentPageNum : ', _currentPageNum)
			//l('_historyObj : ', _historyObj)

			_currentPageHref = PAGES[previousPageNum].href
			AppStore.emitChangePage()
			break;
		}
	}
})
*/

export default AppStore