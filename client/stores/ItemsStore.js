import { EventEmitter } from 'events'
import Dispatcher 		from '../dispatcher/AppDispatcher.js'
import Constants 		from '../constants/AppConstants.js'
import Items			from './Items.js'


const EVENTS = {
}

var l = console.log





Dispatcher.register( function(action) {
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