import React 		from 'react'
import PageStore 	from '../../../stores/PageStore.js'
import ItemsStore 	from '../../../stores/ItemsStore.js'
import Uprise 		from '../../etc/uprise.js'
import CustomScroll from '../../etc/CustomScroll.jsx'
import MakeItScroll from '../../etc/makeItScroll.js'

import './Items.less'

const l = console.log



class Items extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			items : ItemsStore.getItems(),
			scroll : 0, // px
			scrollPercent : 0, // from 0 to 1
			scrollHeight : 0,
		}

		this._showContent 			= this._showContent.bind(this)
		this._hideContent 			= this._hideContent.bind(this)
		this._itemsChange 			= this._itemsChange.bind(this)
		this.handleScrollTopAdd		= this.handleScrollTopAdd.bind(this)
		this.handleScrollTopChange 	= this.handleScrollTopChange.bind(this)
	}

	componentDidMount(){
		PageStore.addPageChangeListener(this._hideContent)
		ItemsStore.addItemChangeListener(this._itemsChange)
		this.uprise = Uprise(this.elem)

		
		this.elem.wheelBuzy = true;
		this.scroll = MakeItScroll(this.elem, this.handleScrollTopAdd)

		this.setState({
			scrollHeight : this.elem.scrollHeight
		})
	}

	componentWillUnmount(){
		PageStore.removePageChangeListener(this._hideContent)
		ItemsStore.removeItemChangeListener(this._itemsChange)
		this.uprise.clear()
		this.scroll.clear()
	}

	_showContent(){
		//this.uprise.show()
	}

	_hideContent(){
		return new Promise((resolve, reject) => {
			resolve()
		})
	}

	_itemsChange(){

	}

	handleScrollTopAdd(addScroll){
		var prevScroll = this.state.scroll
		var nextScroll = prevScroll + addScroll
		var maxScroll = this.elem.scrollHeight - this.elem.offsetHeight

		if(nextScroll < 0) nextScroll = 0
		if(nextScroll > maxScroll) nextScroll = maxScroll

		this.setState({
			scroll: nextScroll,
			scrollPercent: nextScroll / maxScroll
		})
	}

	handleScrollTopChange(nextPercent){
		var maxScroll = this.elem.scrollHeight - this.elem.offsetHeight
		var nextScroll = nextPercent * maxScroll

		this.setState({
			scroll: nextScroll,
			scrollPercent: nextPercent
		})
	}


	render(){
		if(this.elem) this.elem.scrollTop = this.state.scroll
		if(this.uprise) this.uprise.emitCheck(this.state.scroll)

		return (
			<div ref={elem => this.elem = elem} className="Items"> 
				{
					this.state.items.map( (item, i) => {
						var className = `Items__item uprise--right uprise--delay${i % 2} uprise--auto uprise--auto-hide`

						return (
							<div className={className} key={i}>
								<div className="Items__title uprise--top uprise--parent uprise--delay2"> {item.title} </div>
								<div className="Items__description"> {item.description} </div>
								<div className="Items__price"> {item.price} </div>
							</div>
						)
					})
				}

				<CustomScroll 	className="Items__scroll" 
								scroll={this.state.scroll} 
								scrollPercent={this.state.scrollPercent} 
								scrollHeight={this.state.scrollHeight}
								handleScrollTopChange={this.handleScrollTopChange}
								/>

			</div>
		)
	}
}

export default Items