import { EventEmitter } from 'events'
import Dispatcher 		from '../dispatcher/AppDispatcher.js'
import Constants 		from '../constants/AppConstants.js'
import Pages 			from './Pages.json'


const EVENTS = {
	PAGE_CHANGE		: 'pageChange',
	HISTORY_CHANGE 	: 'historyChange'
}

var l = console.log
var _currentPageHref
var _currentPageNum
var _historyObj

//l(Pages)


Dispatcher.register( function(action) {
	switch(action.type){
		case Constants.CHANGE_PAGE : {

			// check redirect to current page
			if(_currentPageHref == action.href){
				return
			}

			_currentPageHref = action.href

			PageStore.emitPageChange()
			break;
		}

		case Constants.NEXT_PAGE : {
			PageStore.getCurrentPageNum()
			
			var nextPageNum

			if(_currentPageNum == undefined) nextPageNum = 0 
			else nextPageNum = _currentPageNum + 1;

			if(nextPageNum > Pages.length - 1) return
		

			_currentPageHref = Pages[nextPageNum].href
			_currentPageNum = nextPageNum

			PageStore.emitPageChange()
			break;
		}

		case Constants.PREVIOUS_PAGE : {
			PageStore.getCurrentPageNum()
			
			var previousPageNum 
			if(_currentPageNum == undefined) previousPageNum = 0
			else previousPageNum = _currentPageNum - 1;

			if(previousPageNum < 0 ) return

			_currentPageHref = Pages[previousPageNum].href
			_currentPageNum = previousPageNum

			PageStore.emitPageChange()
			break;
		}

		case Constants.POP_STATE : {
			PageStore.emitPopStateHistoryChange()
			break;
		}
	}
})

const PageStore = Object.assign({}, EventEmitter.prototype, {

	//	Page

		addHistoryObj(history){
			if(_historyObj == undefined) _historyObj = history
		},

		addPageChangeListener(f){
			this.on(EVENTS.PAGE_CHANGE, f)
		},

		removePageChangeListener(f){
			this.removeListener(EVENTS.PAGE_CHANGE, f)
		},

		emitPageChange(){
			//var listenersFuncs = PageStore.listeners(EVENTS.PAGE_CHANGE)
			var listenersFuncs = this.listeners(EVENTS.PAGE_CHANGE)
			var countOfFuncs = listenersFuncs.length
			var countOfReadyFuncs = 0;

			// run all pageChangePrepare functions
			listenersFuncs.forEach( prepareFunc => {
				prepareFunc()
					.then( () => {
						countOfReadyFuncs++

						if( checkAllReady() ){ 
							// run change history
							this.emitHistoryChange()
						}
					})
			})

			function checkAllReady(){
				return countOfReadyFuncs == countOfFuncs
			}
		},

	
	//	History

		addHistoryChangeListener(f){
			this.on(EVENTS.HISTORY_CHANGE, f)
		},

		removeHistoryChangeListener(f){
			this.removeListener(EVENTS.HISTORY_CHANGE, f)
		},

		emitHistoryChange(){
			if(_historyObj == undefined) return
			_historyObj.push(_currentPageHref)
			this.emit(EVENTS.HISTORY_CHANGE)
		},

		emitPopStateHistoryChange(){
			_currentPageHref = location.href.split(location.host)[1]
			this.getCurrentPageNum()
			
			this.emit(EVENTS.HISTORY_CHANGE)
		},


	//	etc
		getPages(){
			return Pages
		},

		getCurrentPageHref(){
			if(_currentPageHref == undefined){
				_currentPageHref = location.href.split(location.host)[1]
			}

			//l('_currentPageHref : ', _currentPageHref)
			return _currentPageHref
		},

		getCurrentPageNum(){
			this.getCurrentPageHref();

			_currentPageNum = this.getPageNumByHref(_currentPageHref)

			return _currentPageNum
		},

		getPageHrefByNum(num){
			return Pages[num].href
		},

		getPageNumByHref(href){
			/**
			*	For HashRouter needs split href by /#/
			*/

			l('Page Store getPageNumByHref href : ', href)

			href = href.split('/#')[1].trim() || href

			for(var i = 0; i < Pages.length; i++){
				var page = Pages[i]
				if(page.href == href) return i
			}
		}

})

export default PageStore