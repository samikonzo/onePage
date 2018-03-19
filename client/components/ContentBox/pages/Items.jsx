import React 		from 'react'
import PageStore 	from '../../../stores/PageStore.js'
import ItemsStore 	from '../../../stores/ItemsStore.js'
import Uprise 		from '../../etc/uprise.js'
import CustomScroll from '../../etc/CustomScroll.jsx'

import './Items.less'

const l = console.log



class Items extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			items : ItemsStore.getItems(),
			//scroll : 0, // px
			//scrollPercent : 0, // from 0 to 1
			//scrollHeight : 0,
		}

		this._showContent = this._showContent.bind(this)
		this._hideContent = this._hideContent.bind(this)
		this._itemsChange = this._itemsChange.bind(this)
	}

	componentDidMount(){
		PageStore.addPageChangeListener(this._hideContent)
		ItemsStore.addItemChangeListener(this._itemsChange)
		this.uprise = Uprise(this.elem)

		
		this.elem.wheelBuzy = true;
	}

	componentWillUnmount(){
		PageStore.removePageChangeListener(this._hideContent)
		ItemsStore.removeItemChangeListener(this._itemsChange)
		this.uprise.clear()
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


	render(){
		var scrollableElem

		/*if(this.elem) {
			this.elem.scrollTop = this.state.scroll
			scrollableElem = this.elem
		}
		if(this.uprise) this.uprise.emitCheck(this.state.scroll)*/

		return (
			<div ref={elem => this.elem = elem} className="Items"> 
				{
					this.state.items.map( (item, i) => {
						var direction = (i % 2) ? 'uprise--right' : 'uprise--left'
						var className = `Items__item ${direction} uprise--delay${i % 2} uprise--auto uprise--auto-hide`

						return (
							<div className={className} key={i}>
								<div className="Items__title uprise--top uprise--parent uprise--delay2"> {item.title} </div>
								<div className="Items__description"> {item.description} </div>
								<div className="Items__price"> {item.price} </div>
							</div>
						)
					})
				}

				<CustomScroll 	elem={this.elem}/>

			</div>
		)
	}
}

export default Items