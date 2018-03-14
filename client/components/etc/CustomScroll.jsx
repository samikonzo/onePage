import React 		from 'react'
import './CustomScroll.less'


class CustomScroll extends React.Component{
	constructor(props){
		super(props)

		this.state = this.props

		this.handleScrollDown = this.handleScrollDown.bind(this)
		this.handleScrollUp = this.handleScrollUp.bind(this)
		this.changeScrollTop =  this.changeScrollTop.bind(this)
		this.handleWindowResize = this.handleWindowResize.bind(this)
	}

	componentDidMount(){
		this.setState({
			dragged: false
		})

		this.handleWindowResize()

		this.scroll.addEventListener('mousedown', this.handleScrollDown)
		document.addEventListener('mouseup', this.handleScrollUp)
		document.addEventListener('mousemove', this.changeScrollTop)
		window.addEventListener('resize', this.handleWindowResize)
	}

	componentWillReceiveProps(nextProps){
		this.setState(nextProps)
	}

	componentWillUnmount(){
		this.scroll.removeEventListener('mousedown', this.handleScrollDown)
		document.removeEventListener('mouseup', this.handleScrollUp)
		document.removeEventListener('mousemove', this.changeScrollTop)
		window.removeEventListener('resize', this.handleWindowResize)
	}

	handleScrollDown(e){
		this.setState({
			dragged: true
		})

		this.scroll.offsetY = e.offsetY
	}

	handleScrollUp(e){
		if(!this.state.dragged) return

		this.setState({
			dragged: false
		})
	}

	changeScrollTop(e){
		if(!this.state.dragged) return

		var customScrollHeight = this.state.customScrollHeight
		var scrollHeight = this.state.scrollHeight
		var scrollTopMax = this.state.scrollTopMax
		var customScrollTop = this.state.customScrollTop
		var currentScrollTop = e.clientY - customScrollTop - this.scroll.offsetY

		//l('customScrollHeight : ', customScrollHeight)
		//l('scrollHeight : ', scrollHeight)
		//l('scrollTopMax : ', scrollTopMax)
		//l('customScrollTop : ', customScrollTop)
		//l('this.scroll.offsetY : ', this.scroll.offsetY)
		//l('currentScrollTop : ', currentScrollTop)


		var newScrollPercent = currentScrollTop / scrollTopMax
		if(newScrollPercent < 0 ) newScrollPercent = 0
		if(newScrollPercent > 1) newScrollPercent = 1



		this.props.handleScrollTopChange(newScrollPercent)
	}

	handleWindowResize(){
		l(this.elem)
		var customScrollHeight = this.elem.offsetHeight
		var customScrollTop = this.elem.getBoundingClientRect().top + this.elem.clientTop
		var scrollHeight = this.scroll.offsetHeight
		var scrollTopMax = this.elem.offsetHeight - this.scroll.offsetHeight


		/*l(customScrollHeight, 
			this.elem.getBoundingClientRect().top, 
			this.elem.clientTop,
			customScrollTop, 
			scrollHeight, 
			scrollTopMax)
*/
		

		l('this.elem.getBoundingClientRect().top  : ', this.elem.getBoundingClientRect().top )
		l('this.state.scroll : ', this.state.scroll)
		//l('this.elem.clientTop : ', this.elem.clientTop)
		//l('customScrollHeight : ', customScrollHeight)
		//l('customScrollTop : ', customScrollTop)
		//l('scrollHeight : ', scrollHeight)
		//l('scrollTopMax : ', scrollTopMax)

		this.setState({
			customScrollHeight 	: this.elem.offsetHeight,
			customScrollTop 	: this.elem.getBoundingClientRect().top + this.elem.clientTop,
			scrollHeight 		: this.scroll.offsetHeight,
			scrollTopMax 		: this.elem.offsetHeight - this.scroll.offsetHeight,
		})
		//customScrollHeight
		//scrollHeight
		//scrollTopMax
		//customScrollTop
	}


	render(){
		var customScrollTop = this.state.scroll
		var scrollPosition = this.state.scrollPercent
		var scrollClassName = 'CustomScroll__scroll '

		l(customScrollTop, scrollPosition)

		if(this.elem){
			var customScrollHeight = this.state.customScrollHeight//+getComputedStyle(this.elem).height.match(/\d+(\.\d+)?/)[0]
			var customScrollTopMax = /*this.state.scrollHeight*/ - customScrollHeight

			if(customScrollTop > customScrollTopMax) customScrollTop = customScrollTopMax

			//l('customScrollTop after :',  customScrollTop);
			l('customScrollHeight : ', customScrollHeight)
			l('this.elem.scrollHeight : ', this.elem.scrollHeight)
			l('max : ', customScrollTopMax)

			l('customScrollTop :',customScrollTop)
			this.elem.style.top = customScrollTop + 'px'

			if(this.scroll){
				var scrollHeight = this.state.scrollHeight //+getComputedStyle(this.scroll).height.match(/\d+(\.\d+)?/)[0]
				var scrollTopMax = this.state.scrollTopMax //customScrollHeight - scrollHeight
				var scrollTop = scrollTopMax * scrollPosition

				this.scroll.style.top = scrollTop + 'px'

				if(this.state.dragged) scrollClassName += 'CustomScroll__scroll--dragged'
			}
		}


		return (
			<div ref={elem => this.elem = elem} className="CustomScroll"> 
				<div className={scrollClassName} ref={elem => this.scroll = elem}></div>
			</div>
		)
	}
}









export default CustomScroll