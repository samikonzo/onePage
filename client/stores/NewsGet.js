/*

	TODO : Setup server connection

*/
import NewsSavedJSON from './NewsSaved.json'

var NewsSaved = NewsSavedJSON.slice(0, 4)

const l = console.log;
const divider = 7;


export default function(currentCount){
	return new Promise( (resolve, reject) => {
		setTimeout(() => {
			var pack = NewsSaved.slice(currentCount, currentCount + divider)

			//l('currentCount : ', currentCount)
			//l('divider : ', divider)
			l('pack : ', pack)

			if(pack && pack.length){
				resolve(pack)	
			} else {
				var err = new Error
				err.text = 'no news'
				reject(err)
			}

		}, 1100)
	})
}