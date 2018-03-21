import throttle from './throttle.js'

/*
	uprise--up  - direction ( if no direction => just opacity change)
	uprise--delay1 - transition delay : time * 200 = 200
	uprise--time10 - transition time : time * 100 = 1000
	uprise--length1 - transform distance : distance * 10 = 100 px
	uprise--auto 	- uprise without show function, just by boundingClientRect
	uprise--autohide - hide whitout hide function
	uprise--parrent - wait for parent show/hide event

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
	const UPRISE_DIRECTION_OFFSET = {
		'uprise--up' 	: {},
		'uprise--down'	: {},
		'uprise--left' 	: {},
		'uprise--right'	: {},
	}
	

	function getTransform(direction, length){
		if(!direction) return UPRISE_DIRECTION_TRANSFORM['init']
		return UPRISE_DIRECTION_TRANSFORM[direction].replace(/({{VALUE}})/, length)
	}


	//	vars
	var uprises 
	var uprisesAuto = []
	var duration
	var maxDelay = 0
	var maxTime = 0
	var showed = false
	var initialized = false


	init()


	function init(){
		find()

		//l('init : ')
		//l(uprises)
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
			var autoHide = false
			var parentListener = false

			//if element already proccesed by Uprise return undefined
			if( el.upriseProccessed ){
				//l('element already proccesed by Uprise', el, element)
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

				if( className.indexOf('autohide') != -1 ){
					autoHide = true
				}

				if( className.indexOf('parent') != -1 ){
					parentListener = true
				}
			})

			// main data 
			var upriseData = {
				delay 			: delay || UPRISE_DELAY_DEFAULT,
				direction 		: direction || UPRISE_DIRECTION_DEFAULT,
				time 			: time || UPRISE_TIME_DEFAULT,
				length 			: length || UPRISE_LENGTH_DEFAULT,
				auto 			: auto,
				autoHide 		: autoHide,
				parentListener 	: parentListener
			}	

			el.upriseData = upriseData

			// if auto => bind elem
			if(auto) bindAutoShow(el)

			if(parentListener) bindParentListener(el)



			return Object.assign({}, upriseData, {
				elem : el,
			})	
		})


		if(uprisesAuto.length){
			var throttledEmitAutoCheck = throttle(emitAutoCheck, 500)
			element.addEventListener('scrollTopChange', throttledEmitAutoCheck)
		}

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

			//l(uprises)

			uprises.forEach( (item, i) => {

				if(item == undefined){
					return
					//l(' ')
					//l(' ')
					//l(' NO ITEM!!!')
					//l(element)
					//l('i  :', i)
					//l(uprises[i])
					//l(uprises)
					//l(' ')
					//l(' ')
				}
				//l(item)

				var style = item.elem.style
				var time = item.time || UPRISE_TIME_DEFAULT
				var delay = maxDelay - item.delay
				var direction = item.direction
				var length = item.length
				var auto = item.auto
				var parentListener = item.parentListener

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
						// using with init!
						item.elem.upriseCheck()
					} else if(parentListener){
						// nothing, just dont need display none
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
			if(item == undefined) return

			item.elem.upriseClear && item.elem.upriseClear()
		})

		element.removeEventListener('scrollTopChange', throttledEmitAutoCheck)

		uprises = []
	}

	function noUprise(){
	}

	function bindParentListener(elem){
		var parent = elem.parentElement

		if(!parent) return


		elem.upriseShow = function(){
			this.upriseShowed = true

			var style = this.style
			var upriseData = this.upriseData
			var time = ( upriseData.time != undefined ) ? upriseData.time : UPRISE_TIME_DEFAULT
			var delay = upriseData.delay


			style.transition = time + 'ms'

			setTimeout(() => {
				style.opacity = 1
				style.transform = UPRISE_DIRECTION_TRANSFORM_INIT
			}, delay)

			/*setTimeout(() => {
				elem.dispatchEvent(widgetShowEvent)
			}, delay + time)*/
		}

		elem.upriseHide = function(){
			this.upriseShowed = false

			var style = this.style
			var { time=UPRISE_TIME_DEFAULT, delay, direction, length} = this.upriseData

			style.transition = time + 'ms'

			setTimeout(() => {
				style.opacity = ''
				style.transform = getTransform(direction, length)
			}, delay)

			/*setTimeout(() => {
				elem.dispatchEvent(widgetHideEvent)
			}, delay + time)*/
		}

		parent.addEventListener('show', elemShow)
		parent.addEventListener('hide', elemHide)

		function elemShow(){
			elem.upriseShow()
		}

		function elemHide(){
			elem.upriseHide()
		}
	}

	function bindAutoShow(elem){
		uprisesAuto.push(elem)

		document.addEventListener('wheel', upriseCheckEvent)

		var throttledUpriseCheckEvent = throttle(upriseCheckEvent, 100)
		window.addEventListener('resize', throttledUpriseCheckEvent)


		var widgetShowEvent = new CustomEvent('show', {
			bubbles: false
		})

		var widgetHideEvent = new CustomEvent('hide', {
			bubbles: false
		})



		function upriseCheckEvent(e) {
			elem.upriseCheck(e)
		}

		elem.upriseCheck = function(e){
			if(!this) return
			//l('elem.upriseCheck')
			const SCROLL_HEIGHT = 100

			var elCoords = this.getBoundingClientRect()
			var parentCoords = this.parentElement.getBoundingClientRect()

			var elTop = +elCoords.top.toFixed(0)
			var elBottom = +elCoords.bottom.toFixed(0)
			var elHeight = elCoords.height
			var parentTop = +parentCoords.top.toFixed(0)
			var parentBottom = +parentCoords.bottom.toFixed(0)
			var parentTop_elBottom = 0 // distance from parentTop to elBottom

			var autoHide = this.upriseData.autoHide

			var parentScrollTop = this.parentElement.scrollTop
			var parentScrollTopMin = 0;
			var parentScrollTopMax = this.parentElement.scrollHeight - this.parentElement.offsetHeight

			var scrollHeight = 0
			if(e && e.type == 'wheel'){
				//l('this.parentElement.scrollTop : ', this.parentElement.scrollTop)
				//l(e.deltaY)
				scrollHeight = SCROLL_HEIGHT * Math.abs(e.deltaY) / e.deltaY;

				if(e.deltaY > 0){
					if(parentScrollTop >= parentScrollTopMax) return
				} else {
					if(parentScrollTop <= parentScrollTopMin) return
				}
			}

			//l(elTop, ' : ', elBottom, '  |  ', parentTop, ' : ', parentBottom)


			if(!elem.upriseShowed){

				//l('check : ')
				//l('elTop - scrollHeight < parentBottom : ', elTop - scrollHeight < parentBottom)
				//l('elBottom : ', elBottom)
				//l('scrollHeight : ', scrollHeight)
				//l('elTop - scrollHeight : ', elTop - scrollHeight)
				//l('parentBottom : ', parentBottom)
				//l(elem)
				//l(this.parentElement)
				//l(' ')
				//l(' ')

				if( (elTop - scrollHeight < parentBottom &&
					elBottom - scrollHeight > parentTop + parentTop_elBottom) ||

					(elTop - scrollHeight < parentBottom && 
					elBottom - scrollHeight > parentTop && 
					elHeight < parentTop_elBottom)) {

					//l('elem.upriseShow()')

					elem.upriseShow()
				} 

			} else {
				//l(elem)
				//l(elTop, ' : ', elBottom, '  |  ', parentTop, ' : ', parentBottom)
				if(!autoHide) return

				if( elBottom - scrollHeight < parentTop + parentTop_elBottom || 
					elTop - scrollHeight > parentBottom){

					elem.upriseHide()
				}

			}
		}

		elem.upriseShow = function(){
			this.upriseShowed = true

			var style = this.style
			var upriseData = this.upriseData
			var time = ( upriseData.time != undefined ) ? upriseData.time : UPRISE_TIME_DEFAULT
			var delay = upriseData.delay

			style.transition = time + 'ms'

			setTimeout(() => {
				style.opacity = 1
				style.transform = UPRISE_DIRECTION_TRANSFORM_INIT
				elem.dispatchEvent(widgetShowEvent)
			}, delay)

			setTimeout(() => {
			}, delay + time)
		}

		elem.upriseHide = function(){
			this.upriseShowed = false

			var style = this.style
			var { time=UPRISE_TIME_DEFAULT, delay, direction, length} = this.upriseData

			style.transition = time + 'ms'

			elem.dispatchEvent(widgetHideEvent)

			setTimeout(() => {
				style.opacity = ''
				style.transform = getTransform(direction, length)
			}, delay)

			setTimeout(() => {
			}, delay + time)
		}

		elem.upriseClear = function(){
			l('elem.upriseClear')
			document.removeEventListener('wheel', upriseCheckEvent)
			window.removeEventListener('resize', throttledUpriseCheckEvent)
		}
	}

	function emitAutoCheck(parameter){
		uprisesAuto.forEach( elem => {
			//l('emitAutoCheck')
			elem.upriseCheck()
		})
	}

	var throttledEmitAutoCheck = throttle(emitAutoCheck, 500)

	return { 
		show: show,
		hide: hide,
		getState : getState,
		clear : clear,
		emitCheck : throttledEmitAutoCheck
	}
}


export default Uprise