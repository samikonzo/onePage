/*
	TODO : 
	1) remove buzy waiter
	2) add new buzy waiter
*/



var l = console.log



function Uprise(element){
	if(element === undefined) {
		element = document
	}

	//	classes
	const UPRISE_HIDDEN = 'uprise--hidden'
	const UPRISE_DURATION_DEFAULT = 1 // transition time in s
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
	var buzy = false


	init()



	function init(){
		find()

		if(showed) show(true)
		else hide(true)	
	}


	function find(){
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
					if(delay > maxDelay) maxDelay = delay

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


	function show(){
		l('show')

		if(buzy){
			waitUnbusy(show)
			return
		}
		buzy = true

		if(!uprises.length){

			if( find() ) show()
			else noUprise()
				
			return
		}

		uprises.forEach( item => {
			var style = item.elem.style

			style.display = ''

			setTimeout(() => {
				style.opacity = 1
				style.transform = UPRISE_DIRECTION_TRANSFORM_INIT
			}, item.delay)
		})


		setTimeout(()=>{
			showed = true
		}, maxDelay)
	}


	function hide(fast){
		l('hide')

		if(buzy){
			waitUnbusy(hide)
			return
		}
		buzy = true

		if(!uprises.length){

			if( find() ) show()
			else noUprise()
				
			return
		}

		uprises.forEach( item => {
			//l(item)

			var style = item.elem.style
			var time = item.time || UPRISE_DURATION_DEFAULT
			var delay = maxDelay - item.delay
			var direction = item.direction

			if(fast){
				time = 0
				delay = 0
				maxDelay = 0
			}

			style.transition = time + 's'

			setTimeout(() => {
				style.opacity = '' // to 0
				style.transform = UPRISE_DIRECTION_TRANSFORM[direction]
			}, delay)
		})

		setTimeout(() => {
			buzy = false
		}, maxDelay + (maxTime || UPRISE_DURATION_DEFAULT))

	}


	function getState(){
		return uprises.length && {elements : uprises, showed: showed}
	}

	function waitUnbusy(func){
		l('waitUnbusy')

		// check queue, if exist, jsut add to queue and return
		if(!waitUnbusy.queue){
			waitUnbusy.queue = []
		} 

		waitUnbusy.queue.push(func)
		l('func added')

		if(!waitUnbusy.timer){
			waitUnbusy.timer = 100
		}


		setTimeout(function f(){
			if(buzy){
				setTimeout(f, waitUnbusy.timer)
				return
			}

			// release first func in queue
			var firstQueueFunc = waitUnbusy.queue.splice(0,1)[0]
			firstQueueFunc()

			// start waiter if another func exist
			if(waitUnbusy.queue.length) setTimeout(f, waitUnbusy.timer)

		}, 0)	
	}

	return { 
		show: show,
		hide: hide,
		getState : getState
	}
}

export default Uprise