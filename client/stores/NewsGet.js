/*

	TODO : Setup server connection

*/
import NewsSaved from './NewsSaved.json'

const l = console.log;
const divider = 7;


export default function(currentCount){
	return new Promise( (resolve, reject) => {
		setTimeout(() => {
			var pack = NewsSaved.slice(currentCount, currentCount + divider)

			//l('currentCount : ', currentCount)
			//l('divider : ', divider)
			//l('pack : ', pack)

			if(pack){
				resolve(pack)	
			} else {
				var err = new Error
				err.text = 'no news'
				reject(err)
			}

		}, 5000)
	})
}