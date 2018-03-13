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

			changeScrollTop(e.deltaY > 0)

			function changeScrollTop(destination){
				//l(destination, that.scrollTop)

				var n = 7
				var step = 7
				var stepTime = 5

				if(destination){
					changeScrollTop.timer = setTimeout(function f(){

						that.scrollTop += step
						n--

						if(n > 0) changeScrollTop.timer = setTimeout(f, stepTime)

					}, 0)

				} else {
					changeScrollTop.timer = setTimeout(function f(){

						that.scrollTop -= step
						n--

						if(n > 0) changeScrollTop.timer = setTimeout(f, stepTime)

					}, 0)
				}
			}
		})
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
		return (
			<div ref={elem => this.elem = elem} className="Items"> 
				{
					this.state.items.map( (item, i) => {
						var className = `Items__item uprise--down uprise--delay${i % 2} uprise--auto`

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