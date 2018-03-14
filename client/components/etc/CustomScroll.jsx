import React 		from 'react'
import './CustomScroll.less'


class CustomScroll extends React.Component{
	constructor(props){
		super(props)

		this.state = this.props

		this.handleScrollClick = this.handleScrollClick.bind(this)
	}

	componentDidMount(){
		this.scroll.addEventListener('mousedown', this.handleScrollClick)
	}

	componentWillReceiveProps(nextProps){
		this.setState(nextProps)
		//l(this.state.scrollHeight)
	}

	componentWillUnmount(){
		this.scroll.removeEventListener('mousedown', this.handleScrollClick)
	}

	handleScrollClick(e){
		
	}


	render(){
		var customScrollTop = this.state.scroll
		var scrollPosition = this.state.scrollPercent

		if(this.elem){
			var customScrollHeight = +getComputedStyle(this.elem).height.match(/\d+(\.\d+)?/)[0]
			var customScrollTopMax = this.state.scrollHeight - customScrollHeight

			if(customScrollTop > customScrollTopMax) customScrollTop = customScrollTopMax

			//l('customScrollTop after :',  customScrollTop);
			//l('customScrollHeight : ', customScrollHeight)
			//l('max : ', customScrollTopMax)


			this.elem.style.top = customScrollTop + 'px'
			

			if(this.scroll){
				var scrollHeight = +getComputedStyle(this.scroll).height.match(/\d+(\.\d+)?/)[0]
				var scrollTopMax = customScrollHeight - scrollHeight
				var scrollTop = scrollTopMax * scrollPosition

				this.scroll.style.top = scrollTop + 'px'
			}

		}


		return (
			<div ref={elem => this.elem = elem} className="CustomScroll"> 
				<div className="CustomScroll__scroll" ref={elem => this.scroll = elem}></div>
			</div>
		)
	}
}









export default CustomScroll