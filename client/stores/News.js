/*

	TODO : Setup server connection

*/

import NewsSaved from './NewsSaved.json'


function News(){

	var getNewsPromise = new Promise((resolve, reject) => {



		setTimeout(() => {
			resolve(NewsSaved)
		}, 5000)

		/*var xhr = new XMLHttpRequest()
		xhr.open('GET','https://lenta.ru/rss')
		xhr.send()

		xhr.onload = function(){
			if(this.status == 200){
				resolve(this.responce)
			} else {
				var err = new Error(this.statusText)
				err.code = this.status
				reject(err)
			}
		}

		xhr.onerror = function(){
			var err = new Error(this.statusText)
			err.code = this.status
			reject(err)
		}*/
	})


	return getNewsPromise
}


export default News