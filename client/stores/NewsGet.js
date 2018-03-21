/*

	TODO : Setup server connection

*/
import NewsSavedJSON from './NewsSaved.json'

var NewsSaved = NewsSavedJSON.slice(0)

const l = console.log;
const divider = 2;

var canSendSomeNews = true


export default function(currentCount){
	return new Promise( (resolve, reject) => {
		setTimeout(() => {
			var pack = NewsSaved.slice(currentCount, currentCount + divider)

			l('pack : ', pack)

			if(pack && pack.length && canSendSomeNews){
				resolve(pack)	

				canSendSomeNews = false
				setTimeout(() => {
					canSendSomeNews = true
				}, 15000)

			} else {
				var err = new Error
				err.text = 'no news'
				reject(err)
			}

		}, 2000)
	})
}