function Uprise(){
	var l = console.log

	//find

	var uprises = document.querySelectorAll('[class*="uprise"]')

	//show

	uprises.forEach(uprise => {
		//l(uprise.classList)
		uprise.classList.remove('uprise--hidden')

		uprise.classList.remove('uprise--up')
		uprise.classList.remove('uprise--down')
		uprise.classList.remove('uprise--left')
		uprise.classList.remove('uprise--right')

	})


}

export default Uprise