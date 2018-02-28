import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher/AppDispatcher.js'
import Constants from '../constants/AppConstants.js'

const EVENTS = {
	CHANGE : 'change',
}

const AppStore = Object.assign({}, EventEmitter.prototype,{
	emitChange(){
		this.emit(EVENTS.CHANGE)
	},	

	addChangeListener(f){
		this.on(EVENTS.CHANGE, f)
	},

	removeChangeListener(f){
		this.removeListener(EVENTS.CHANGE. f)
	}
})

Dispatcher.register(function(action){})


export default AppStore