import { EventEmitter } from 'events'
import Dispatcher 		from '../dispatcher/AppDispatcher.js'
import Constants 		from '../constants/AppConstants.js'
import Items			from './Items.js'


const EVENTS = {
	/*PAGE_CHANGE		: 'pageChange',
	HISTORY_CHANGE 	: 'historyChange'*/
}

var l = console.log


//l(Items)




Dispatcher.register( function(action) {
	/*
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
			
			var nextPageNum = _currentPageNum + 1;
			if(nextPageNum > Pages.length - 1) return
		
			_currentPageHref = Pages[nextPageNum].href
			_currentPageNum = nextPageNum

			PageStore.emitPageChange()
			break;
		}

		case Constants.PREVIOUS_PAGE : {
			PageStore.getCurrentPageNum()
			
			var previousPageNum = _currentPageNum - 1;
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
	*/
})

const ItemsStore = Object.assign({}, EventEmitter.prototype, {
	addItemChangeListener(f){
		this.on(EVENTS.ITEM_CHANGE, f)
	},

	removeItemChangeListener(f){
		this.removeListener(EVENTS.ITEM_CHANGE, f)
	},

	emitItemChange(){
		this.emit(EVENTS.ITEM_CHANGE)
	},

	getItems(){
		return Items
	}

})

export default ItemsStore