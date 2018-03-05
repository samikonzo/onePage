import React from 'react'


class Contacts extends React.Component{
	constructor(props){
		super(props)
	}
	
	render(){
		return (
			<div  
				className="Contacts" 
				ref={(elem) => {this.elem = elem}}
			> 
				<p> Contacts Page </p>
			</div>
		)
	}
}


export default Contacts