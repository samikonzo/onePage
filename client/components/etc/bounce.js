function bounce(f, time){
	var bounced = function(){
		if(bounced.buzy) return

		bounced.buzy = true
		setTimeout(() => {
			bounced.buzy = false
		}, time)

		return f.apply(null, arguments)
	}

	return bounced
}

export default bounce