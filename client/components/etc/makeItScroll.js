import throttle 	from './throttle.js'

function MakeItScroll(elem, listenFunc){

	var throttledListenFunc 

	if(!listenFunc){
		throttledListenFunc = function(){}
	} else {
		throttledListenFunc = listenFunc //throttle(listenFunc, 10)
	}

	elem.addEventListener('wheel', changeScroll)



	function changeScroll(e){
		var that = this

		changeScrollTop.timer && clearTimeout(changeScrollTop.timer)

		changeScrollTop(e.deltaY > 0)

		function changeScrollTop(destination){
			//l(destination, that.scrollTop)

			var n = 20
			var step = 5
			var stepTime = 3

			if(destination){
				changeScrollTop.timer = setTimeout(function f(){

					//that.scrollTop += step

					n--

					//l('n : ', n)

					//throttledListenFunc(that.scrollTop)
					throttledListenFunc(+step)

					if(n > 0) changeScrollTop.timer = setTimeout(f, stepTime)

				}, 0)

			} else {
				changeScrollTop.timer = setTimeout(function f(){

					//that.scrollTop -= step
					n--

					//throttledListenFunc(that.scrollTop)
					throttledListenFunc(-step)

					if(n > 0) changeScrollTop.timer = setTimeout(f, stepTime)

				}, 0)
			}
		}
	}

	function scrollClear(){
		elem.removeEventListener('wheel', changeScroll)
		l('clear')
	}

	return {
		clear: scrollClear
	}	
}

export default MakeItScroll