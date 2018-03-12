import React from 'react'
import './PageCounter.less'
import Uprise from '../../etc/uprise.js'

var l = console.log

class PageCounter extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			currentPageNum : this.props.currentPageNum
		}

		this._showContent = this._showContent.bind(this)
		this._hideContent = this._hideContent.bind(this)
	}

	componentDidMount(){
		this.uprise = Uprise(this.elem)
		this._showContent()
	}

	componentWillReceiveProps(newProps){
		if(newProps.currentPageNum != this.state.currentPageNum){

			this._hideContent()
				.then( () => {
					this.setState({
						currentPageNum : newProps.currentPageNum
					}, this._showContent)
				})
		}
	}

	_showContent(){
		this.uprise.show()
	}

	_hideContent(){
		return new Promise( (resolve, reject) => {
			this.uprise.hide()
				.then(resolve)
		})		
	}



	render(){
		var currentPageNum = this.state.currentPageNum != undefined ? this.state.currentPageNum + 1 : ''

		return(
			<div className="PageCounter" ref={elem => this.elem = elem}>
				<span className="PageCounter__current uprise--time5 uprise--delay0 uprise--length1">
					{
						currentPageNum
					}
				</span>

				<span className="PageCounter__splitter"></span>

				<span className="PageCounter__count">
					{this.props.pages.length}
				</span>

			</div>
		)
	}
}

module.exports = PageCounter