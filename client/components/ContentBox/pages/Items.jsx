import React from 'react'

const l = console.log

class Items extends React.Component{
	constructor(props){
		super(props)

		this.handleRemove = this.handleRemove.bind(this)
	}

	componentWillMount(){

	}


	handleRemove(){
		return new Promise( (resolve, reject) => {
			l('Items : handleRemove emited')
			setTimeout(function(){
				resolve('Items : end')
			},1000)
		})
	}


	render(){
		return (
			<div ref={elem => this.elem = elem}> 
				Items
			</div>
		)
	}
}

export default Items