var LOGGED = 1
function l(){
	LOGGED && console.log('UPRISE : ', ...arguments)	
}

function Uprise(element){
	if(element === undefined) element = document


	var uprises 
	var duration
	var maxDelay
	var showed = false

	//find

	find()

	function find(){
		uprises = element.querySelectorAll('[class*="uprise"]')

		l(uprises)

		if(uprises.length){
			duration = getComputedStyle(uprises[0]).transitionDuration.match(/\d+(\.\d+)?/)[0]*1000;
			maxDelay = 0

			l('duration : ',duration)


			return true
		} else {
			noUprise();

			return false
		}
	}


	

	//show
	function show(){
		if(!uprises.length){

			if( find() ) show()
			else noUprise()
				
			return
		}

		uprises.forEach(uprise => {
			//uprise.timer = 0
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

		// change state
		showed = true
	}

	//hide
	function hide(){
		if(!uprises.length){

			if( find() ) show()
			else noUprise()
				
			return
		}

		uprises.forEach(uprise => {
			//l(uprise.upriseClassList)

			setTimeout(() => {
				uprise.classList = uprise.upriseClassList.join(' ')
			},  maxDelay - uprise.delayTimer)
		})

		return new Promise( (resolve, reject) => {
			setTimeout(resolve, duration/2 + maxDelay)
		})

		// change state
		showed = false
	}


	function noUprise(){
		l('no uprises!')		
	}

	return {
		show: show,
		hide: hide,
		state : showed,
	}
}

export default Uprise