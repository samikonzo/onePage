var l = console.log

/*
	uprise--up  - direction ( if no direction => just opacity change)
	uprise--delay1 - transition delay : time * 200 = 200
	uprise--time10 - transition time : time * 100 = 1000
	uprise--length1 - transform distance : distance * 10 = 100 px
	uprise--auto 	- uprise without show function, just by boundingClientRect
*/


function Uprise(element){
	if(element === undefined) {
		element = document
	}

	//	constants
	const UPRISE_TIME_DEFAULT = 1000 // transition time in s

	const UPRISE_DELAY = 'uprise--delay'
	const UPRISE_DELAY_DEFAULT = 0 // transition-delay in ms

	const UPRISE_LENGTH_DEFAULT = 100 //px

	const UPRISE_DIRECTION_TRANSFORM_INIT = 'translate(0,0)'
	const UPRISE_DIRECTION_NAMES = ['uprise--up', 'uprise--down', 'uprise--left', 'uprise--right']
	const UPRISE_DIRECTION_DEFAULT = ''
	const UPRISE_DIRECTION_TRANSFORM = {
		'uprise--up' : 'translateY(-{{VALUE}}px)',
		'uprise--down' : 'translateY({{VALUE}}px)',
		'uprise--left' : 'translateX(-{{VALUE}}px)',
		'uprise--right' : 'translateX({{VALUE}}px)',
		'init'		: UPRISE_DIRECTION_TRANSFORM_INIT
	}
	

	function getTransform(direction, length){
		if(!direction) return UPRISE_DIRECTION_TRANSFORM['init']
		return UPRISE_DIRECTION_TRANSFORM[direction].replace(/({{VALUE}})/, length)
	}


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

		const init = true
		hide(init)	
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
			var time
			var length
			var auto = false

			//if element already proccesed by Uprise return undefined
			if( el.upriseProccessed ){
				l('element already proccesed by Uprise')
				return undefined
			}

			el.upriseProccessed = true


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
					}

				//	time  
				} else if( className.indexOf('time') != -1 ){
					time = +className.split('time')[1] * 100
					if(time > maxTime) maxTime = time

		
				//	length
				} else if( className.indexOf('length') != -1 ){
					length = ++className.split('length')[1] * 10
		
							
				//	direction and something else 
				} else {
					UPRISE_DIRECTION_NAMES.forEach(directionName => {
						if( className.indexOf( directionName ) != -1 ){
							direction = directionName
						}
					})
				}	

				if( className.indexOf('auto') != -1 ){
					auto = true
				}
			})

			// main data 
			var upriseData = {
				delay 		: delay || UPRISE_DELAY_DEFAULT,
				direction 	: direction || UPRISE_DIRECTION_DEFAULT,
				time 		: time || UPRISE_TIME_DEFAULT,
				length 		: length || UPRISE_LENGTH_DEFAULT,
				auto 		: auto
			}	

			el.upriseData = upriseData

			// if auto => bind elem
			if(auto) bindAutoShow(el)



			return Object.assign( upriseData, {
				elem : el,
			})	
		})


		//	everything ok
		return true
	}


	function show(init){
		//l('--------------show--------------', init)

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

		hide.clearTimers && hide.clearTimers()

		uprises.forEach( item => {
			var style = item.elem.style
			var time = item.time + 'ms'

			style.display = ''
			style.transition = time || UPRISE_TIME_DEFAULT + 'ms'

			//l(item.time)

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

		// remove all timers
		// dont uncomment
		// cause init function stoped by first hide function after hide(init)
		//hide.clearTimers && hide.clearTimers()

		//l('--------------hide--------------', init, element)

		return new Promise( (resolve, reject) => {


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
				var time = item.time || UPRISE_TIME_DEFAULT
				var delay = maxDelay - item.delay
				var direction = item.direction
				var length = item.length
				var auto = item.auto

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
					style.transform = getTransform(direction, length)
					//style.transition = time + 'ms'
				}, delay)

				// remove displaying
				var timer2 = setTimeout(() => {

					if(auto){
						item.elem.upriseCheck()
					} else {
						style.display = 'none'
					}


					
				}, delay + time)

				// add timers to hide.timers
				hide.timers.push(timer1)
				hide.timers.push(timer2)
			})


			// after everything changed
			var wholeTime
			if(init){
				wholeTime = 0
			} else {
				wholeTime = maxDelay + (maxTime || UPRISE_TIME_DEFAULT)
			}

			//l(element)
			//l('maxDelay : ', maxDelay)
			//l('maxTime : ', maxTime)
			//l('wholeTime : ', wholeTime)



			var timer3 = setTimeout(() => {
				if(init){
					initialized = true
					//l(' ')
					//l('--------------   INIT  --------------', element)
					//l(' ')
					//l('maxDelay : ', maxDelay)
				}

				resolve()
			}, wholeTime)

			hide.timers.push(timer3)

		})
	}	


	function getState(){
		return uprises.length && {elements : uprises, showed: showed}
	}

	function clear(){
		l('clear ')
		
		uprises.forEach(item => {
			item.elem.upriseClear && item.elem.upriseClear()
		})

		uprises = []
	}

	function noUprise(){
	}

	function bindAutoShow(elem){
		document.addEventListener('wheel', upriseCheckEvent)
		//window.addEventListener('resize', upriseCheckEvent)

		function upriseCheckEvent() {
			elem.upriseCheck()
		}

		elem.upriseCheck = function(e){
			l('elem.upriseCheck')
			var elCoords = this.getBoundingClientRect()
			var parentCoords = this.parentElement.getBoundingClientRect()

			var elTop = +elCoords.top.toFixed(0)
			var elBottom = +elCoords.bottom.toFixed(0)
			var parentTop = +parentCoords.top.toFixed(0)
			var parentBottom = +parentCoords.bottom.toFixed(0)

			//l(elTop, ' : ', elBottom, '  |  ', parentTop, ' : ', parentBottom)

			if(!elem.upriseShowed && elTop < parentBottom){ 
				elem.upriseShow()
			} else if(elem.upriseShowed && (elBottom < parentTop || elTop > parentBottom)){
				elem.upriseHide()
			} 
		}

		elem.upriseShow = function(){
			l('elem.upriseShow')
			l(this.upriseData)

			var style = this.style
			var upriseData = this.upriseData
			var time = upriseData.time
			var delay = upriseData.delay

			style.transition = /*time ||*/ UPRISE_TIME_DEFAULT + 'ms'

			setTimeout(() => {
				style.opacity = 1
				style.transform = UPRISE_DIRECTION_TRANSFORM_INIT
			}, delay)

			elem.upriseShowed = true
		}

		elem.upriseHide = function(){
			elem.upriseShowed = false
		}

		elem.upriseClear = function(){
			l('elem.upriseClear')
			document.removeEventListener('wheel', handleWheelEvent)
		}
	}

	return { 
		show: show,
		hide: hide,
		getState : getState,
		clear : clear,
	}
}

export default Uprise