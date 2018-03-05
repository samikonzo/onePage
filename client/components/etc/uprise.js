var LOGGED = 0
function l(){
	LOGGED && console.log('UPRISE : ', ...arguments)	
}

function Uprise(){
	//find
	var uprises = document.querySelectorAll('[class*="uprise"]')
	var duration = getComputedStyle(uprises[0]).transitionDuration.match(/\d+(\.\d+)?/)[0]*1000;
	var maxDelay = 0

	l('duration : ',duration)

	//show
	function show(){
		uprises.forEach(uprise => {
			uprise.timer = 0
			uprise.upriseClassList = [].slice.call(uprise.classList)

			uprise.classList.forEach( className => {
				var num = className.split('delay')[1]
				if(num){
					uprise.delayTimer = num * 200
					if(uprise.delayTimer > maxDelay) maxDelay = uprise.delayTimer
					l(className, ' : ', num, '   |  uprise.delayTimer : ', uprise.delayTimer)
				}
			});
		
			setTimeout(() => {
				uprise.classList.remove('uprise--hidden')
				uprise.classList.remove('uprise--up')
				uprise.classList.remove('uprise--down')
				uprise.classList.remove('uprise--left')
				uprise.classList.remove('uprise--right')
				//l(uprise)
			}, uprise.delayTimer)
		})
	}

	//hide
	function hide(){
		uprises.forEach(uprise => {
			//l(uprise.upriseClassList)

			setTimeout(() => {
				uprise.classList = uprise.upriseClassList.join(' ')
			},  maxDelay - uprise.delayTimer)
		})

		return new Promise( (resolve, reject) => {
			setTimeout(resolve, duration + maxDelay)
		})
	}

	return {
		show: show,
		hide: hide
	}
}

export default Uprise