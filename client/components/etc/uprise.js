var l = console.log

function Uprise(element){
	if(element === undefined) {
		element = document
	}

	//	classes
	const UPRISE_HIDDEN = 'uprise--hidden'
	const UPRISE_DURATION_DEFAULT = 1000 // transition time in s
	const UPRISE_DELAY = 'uprise--delay'
	const UPRISE_DELAY_DEFAULT = 100
	const UPRISE_DIRECTION_TRANSFORM = {
		'uprise--up' : 'translateY(-100px)',
		'uprise--down' : 'translateY(200px)',
		'uprise--left' : 'translateX(-100px)',
		'uprise--right' : 'translateX(100px)',
	}
	const UPRISE_DIRECTION_TRANSFORM_INIT = 'translate(0,0)'
	const UPRISE_DIRECTION_NAMES = [
		'uprise--up',
		'uprise--down',
		'uprise--left',
		'uprise--right'
	]
	const UPRISE_DIRECTION_DEFAULT = 'up'


	//	vars
	var uprises 
	var duration
	var maxDelay = 0
	var maxTime = 0
	var showed = false
	var initialized = false


	init()


	function init(){
		find()

		var init = true

		if(showed) show(init)
		else hide(init)	
	}


	function find(){
		//	l('--------------find--------------')

		uprises = element.querySelectorAll("[class*='uprise']")

		//	no uprises finded
		if(!uprises.length) return false

		uprises = [].map.call(uprises, el => {
			var classList
			var direction
			var delay

			//if element already proccesed by Uprise return undefined
			if( el.Uprise ){
				l('element already proccesed by Uprise')
				return undefined
			}

			el.Uprise = true

			// only uprise classes are needed
			classList = [].filter.call(el.classList, className => {
				//l(className)
				//l(className.indexOf('uprise'))
				//l(~className.indexOf('uprise'))
				//l(!~className.indexOf('uprise'))
				//l(!!~className.indexOf('uprise'))

				/*
					className.indexOf('uprise') - return index or -1
					~  - make offset ( to 0 if index return -1, to -1 if index return 0)
					!  - turn num to logical and invert
					!  - invert inverted

				*/	 
				return !!~className.indexOf('uprise')
			})

			// find delay / direction classes
			classList.forEach( className => {

				//	delay
				if( className.indexOf('delay') != -1 ){
					delay = +className.split('delay')[1] * 200
					if(delay > maxDelay){
						maxDelay = delay
						//l('maxDelay : ', maxDelay)
					}

				//	direction and something else 
				} else {
					UPRISE_DIRECTION_NAMES.forEach(directionName => {
						if( className.indexOf( directionName ) != -1 ){
							direction = directionName
						}
					})

				}	
			})

			return {
				elem 		: el,
				delay 		: delay || UPRISE_DELAY_DEFAULT,
				direction 	: direction || UPRISE_DIRECTION_DEFAULT,
				// time 	: duration || UPRISE_DURATION_DEFAULT,
			}
		})


		//	everything ok
		return true
	}


	function show(init){
		//l('--------------show--------------')

		if(!uprises.length){

			if( find() ) show()
			else noUprise()
				
			return
		}

		if(!initialized){
			setTimeout(() => {
				show()
			}, 100)
			return
		}

		hide.clearTimers()

		uprises.forEach( item => {
			var style = item.elem.style

			style.display = ''
			style.transition = ''

			setTimeout(() => {
				style.opacity = 1
				style.transform = UPRISE_DIRECTION_TRANSFORM_INIT
			}, item.delay)
		})


		setTimeout(()=>{
			showed = true
		}, maxDelay)
	}


	function hide(init){
		//l('--------------hide--------------')

		if(!uprises.length){
			if( find() ) show()
			else noUprise()
			return
		}


		if(!hide.timers){
			hide.timers = [];
			hide.clearTimers = function() {
				this.timers.forEach(timer => {
					clearTimeout(timer)
				})
			};
		}


		uprises.forEach( item => {
			//l(item)

			var style = item.elem.style
			var time = item.time || UPRISE_DURATION_DEFAULT
			var delay = maxDelay - item.delay
			var direction = item.direction

			// fast change parameters
			if(init){
				time = 0
				delay = 0
			}

			style.transition = time + 'ms'

			//l(' HIDE : ')
			//l( 'maxDelay : ', maxDelay)
			//l( 'time :', time)
			//l( 'delay :', delay)
			//l( 'time + delay : ', time + delay)

			// change props when delay time is over
			var timer1 = setTimeout(() => {
				style.opacity = '' // to 0
				style.transform = UPRISE_DIRECTION_TRANSFORM[direction]
				//style.transition = time + 'ms'
			}, delay)

			// remove displaying
			var timer2 = setTimeout(() => {
				style.display = 'none'
			}, delay + time)

			// add timers to hide.timers
			hide.timers.push(timer1)
			hide.timers.push(timer2)
		})


		// after everything changed
		var timer3 = setTimeout(() => {
			if(init){
				initialized = true
				l('--------------init--------------')
				l('maxDelay : ', maxDelay)
			}
		}, function(){
			if(init) return 0
			else return	maxDelay + (maxTime || UPRISE_DURATION_DEFAULT)
		})

		hide.timers.push(timer3)
	}	


	function getState(){
		return uprises.length && {elements : uprises, showed: showed}
	}

	function noUprise(){

	}

	return { 
		show: show,
		hide: hide,
		getState : getState
	}
}

export default Uprise