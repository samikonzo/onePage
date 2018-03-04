const l 	= console.log
const express = require('express')
const app 	= express()

/*
app.use(express.static(__dirname + '/public'))
*/

app.use((req, res, next) => {
	l(req.method, req.url)
	next()
})

/*app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
})
*/
app.listen(3000)