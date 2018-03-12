import React 		from 'react'
import Uprise 		from '../../etc/uprise.js'
import PageStore 	from '../../../stores/PageStore.js'
import ItemsStore 	from '../../../stores/ItemsStore.js'
import CustomScroll from '../../etc/CustomScroll.jsx'

import './Items.less'

const l = console.log



class Items extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			items : ItemsStore.getItems(),
			scroll : 0//percent ?
		}

		//this.handleRemove = this.handleRemove.bind(this)
		this._showContent = this._showContent.bind(this)
		this._hideContent = this._hideContent.bind(this)
		this._itemsChange = this._itemsChange.bind(this)
	}

	componentDidMount(){
		PageStore.addPageChangeListener(this._hideContent)
		ItemsStore.addItemChangeListener(this._itemsChange)
		this.uprise = Uprise(this.elem)
		this._showContent()

		this.elem.wheelBuzy = true;
		this.elem.addEventListener('wheel', function(e){
			var that = this

			changeScrollTop(this.scrollTop + e.deltaY)

			function changeScrollTop(endScrollTop){
				var step = 10
				var stepTime = 100

				if(changeScrollTop.timer){
					clearTimeout(changeScrollTop.timer)
				}

				changeScrollTop.timer = setTimeout(function f(){
					var diff = that.scrollTop - endScrollTop
					var plusMinus = Math.abs(diff)/diff

					if(Math.abs(diff) > 10){
						that.scrollTop += step * plusMinus
					} else {
						that.scrollTop += diff
						return
					}

					changeScrollTop.timer = setTimeout(f, stepTime)
				}, 0)

			}
		})
	}

	componentWillUnmount(){
		PageStore.removePageChangeListener(this._hideContent)
		ItemsStore.removeItemChangeListener(this._itemsChange)
	}

	_showContent(){
		this.uprise.show()
	}

	_hideContent(){
		return new Promise((resolve, reject) => {
			resolve()
		})
	}

	_itemsChange(){
		//

	}


/*	handleRemove(){
		return new Promise( (resolve, reject) => {
			l('Items : handleRemove emited')
			setTimeout(function(){
				resolve('Items : end')
			},1000)
		})
	}*/


	render(){
		return (
			<div ref={elem => this.elem = elem} className="Items"> 
				{
					this.state.items.map( (item, i) => {
						var className = `Items__item uprise--up uprise--delay${10-i}`

						return (
							<div className={className} key={i}>
								<div className="Items__title"> {item.title} </div>
								<div className="Items__description"> {item.description} </div>
								<div className="Items__price"> {item.price} </div>
							</div>
						)
					})
				}

				<CustomScroll className="Items__scroll"/>

			</div>
		)
	}
}

export default Items