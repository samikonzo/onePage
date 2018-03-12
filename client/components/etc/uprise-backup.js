var LOGGED = 1
function l(){
	LOGGED && console.log('UPRISE : ', ...arguments)	
}

function Uprise(element){
	if(element === undefined) element = document

	const UPRISE_HIDDEN = 'uprise--hidden'
	const UPRISE_DELAY = 'uprise--delay'

	var uprises 
	var duration
	var maxDelay
	var showed = false

	find()

	//find
	function find(){
		uprises = element.querySelectorAll('[class*="uprise"]')

		//l(uprises)

		if(uprises.length){
			duration = getComputedStyle(uprises[0]).transitionDuration.match(/\d+(\.\d+)?/)[0]*1000;
			maxDelay = 0

			// save uprise state
			uprises.forEach(uprise => {
				uprise.upriseClassList = [].slice.call(uprise.classList)
				//uprise.upriseClassList.push(UPRISE_HIDDEN)

				uprise.classList.forEach( className => {
					var num = className.split('delay')[1]

					if(num){
						uprise.delayTimer = num * 200
						if(uprise.delayTimer > maxDelay) maxDelay = uprise.delayTimer
						uprise.classList.remove(UPRISE_DELAY + num)
					}

				});
			})



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
			uprise.style.display = ''
			l(uprise)
			l(uprise.delayTimer)
			l(uprise.upriseClassList)

			setTimeout(() => {

				var classes = [].slice.call(uprise.classList)
				classes.forEach( className => {
					if(className.match(/(uprise)/)) uprise.classList.remove(className)
				})
				uprise.classList.add('uprise')


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
				uprise.classList.add(UPRISE_HIDDEN)

			},  maxDelay - uprise.delayTimer)
		})

		return new Promise( (resolve, reject) => {
			setTimeout(() => {

				uprises.forEach( uprise => {
					uprise.style.display = 'none'
				})


				resolve()
			}, duration/2 + maxDelay)
		})

		// change state
		showed = false
	}


	function noUprise(){
		l('no uprises!')		
	}

	function getState(){
		return uprises.length && {elements : uprises, showed: showed}
	}

	return {
		show: show,
		hide: hide,
		getState : getState,
	}
}

export default Uprise