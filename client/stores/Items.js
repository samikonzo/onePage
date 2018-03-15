var items = []
var str = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum officiis quidem alias aliquid libero cum in sunt vitae amet, culpa fugit assumenda adipisci, quas rem aliquam quia quae odio reiciendis eum est nemo. Quae nostrum recusandae, neque adipisci quis delectus, ullam, vel dolorem illum repellendus perferendis laudantium nam et minus accusantium accusamus! Consequatur reiciendis tempore incidunt, eveniet eligendi mollitia minus autem necessitatibus hic dolores neque in excepturi voluptate, error perspiciatis vero ab. Et officiis incidunt, unde inventore vel nihil, eius error placeat rerum ipsa cupiditate possimus accusantium! Quis quaerat tenetur nesciunt deserunt optio sunt praesentium, alias unde illo iste. Iure!'

for( var i = 0; i < 10; i++){
  items.push(new F())
}


function F(){
	if(F.i == undefined) F.i = 0
  
	this.title = 'title ' + F.i

	var start = Math.floor(Math.random() * str.length)
	var length = Math.floor(Math.random() * str.length)

	this.description = 'description #' + F.i + ': '+ str.substr(start, length)

	this.price = Math.floor(Math.random() * 100) + ' cents'

	F.i++
}

export default items

