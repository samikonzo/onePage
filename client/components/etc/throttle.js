function throttle(f, time){
	var throttled = function(){
		if(throttled.buzy){
			throttled.saved = {
				context : this,
				args : arguments,
			}
			return
		}

		throttled.buzy = true

		setTimeout(() => {
			throttled.buzy = false

			if(throttled.saved){
				f.apply(throttled.saved.context, throttled.saved.args)
			}
		}, time)

		return f.apply(null, arguments)
	}

	return throttled
}

export default throttle