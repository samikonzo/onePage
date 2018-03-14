import throttle 	from './throttle.js'

function MakeItScroll(elem, listenFunc){

	var throttledListenFunc 

	if(!listenFunc){
		throttledListenFunc = function(){}
	} else {
		throttledListenFunc = throttle(listenFunc, 10)
	}

	elem.addEventListener('wheel', changeScroll)


	function changeScroll(e){
		changeScrollTop.timer && clearTimeout(changeScrollTop.timer)

		changeScrollTop(e.deltaY > 0)

		function changeScrollTop(destination){
			var n = 20
			var step = 5
			var stepTime = 3

			if(destination){
				changeScrollTop.timer = setTimeout(function f(){
					n--
					throttledListenFunc(+step)
					
					if(n > 0) changeScrollTop.timer = setTimeout(f, stepTime)
				}, 0)

			} else {
				changeScrollTop.timer = setTimeout(function f(){
					n--
					throttledListenFunc(-step)

					if(n > 0) changeScrollTop.timer = setTimeout(f, stepTime)
				}, 0)
			}
		}
	}

	function scrollClear(){
		elem.removeEventListener('wheel', changeScroll)
	}

	return {
		clear: scrollClear
	}	
}

export default MakeItScroll