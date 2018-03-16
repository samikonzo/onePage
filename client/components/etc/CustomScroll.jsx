import React 		from 'react'
import makeItScrollable from './makeItScrollable.js'


import './CustomScroll.less'

/*
		TODO
	1) scroll enable for change scrollTop of this.props.elem
	2) change size of scroll to relative element visible part to element scrollHeight
	2.1) min and max size of scroll
	3) resize changing

		ISSUE 
	1) when away from page scrolling to top
	2) when resizing from bottom to big screen - a lot of empty space
	3) remove something from refresh
*/



class CustomScroll extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			elem : this.props.elem,
			scrollPercent : 0,
			scrollTop: 0,
			binded : false,
		}

		this.bindScrollableElement 	= this.bindScrollableElement.bind(this)
		this.handleScrollTopAdd 	= this.handleScrollTopAdd.bind(this)
		this.handleWindowResize 	= this.handleWindowResize.bind(this)
		this.refreshParameters 		= this.refreshParameters.bind(this)
		this.handleScrollCursorDown	= this.handleScrollCursorDown.bind(this)
		this.handleScrollCursorMove	= this.handleScrollCursorMove.bind(this)
		this.handleScrollCursorUp	= this.handleScrollCursorUp.bind(this)
	}

	componentDidMount(){
		window.addEventListener('resize', this.handleWindowResize)

		if(this.state.elem && !this.state.binded){
			this.bindScrollableElement()
		}		

		this.scrollCursor.addEventListener('mousedown', this.handleScrollCursorDown)
		document.addEventListener('mousemove', this.handleScrollCursorMove)
		document.addEventListener('mouseup', this.handleScrollCursorUp)

	}

	componentWillUnmount(){
		this.state.elem.scrollable.clear()

		window.removeEventListener('resize', this.handleWindowResize)
		this.scrollCursor.removeEventListener('mousedown', this.handleScrollCursorDown)
		document.removeEventListener('mousemove', this.handleScrollCursorMove)
		document.removeEventListener('mouseup', this.handleScrollCursorUp)
	}

	componentWillReceiveProps(nextProps){
		l('NEW PROPS', nextProps)

		if(!this.state.elem){
			this.setState({
				elem : nextProps.elem

			}, function() {
				if(this.state.elem && !this.state.binded){
					this.bindScrollableElement()
				}	
			})
		}
	}



	bindScrollableElement(){
		var elem = this.state.elem

		this.setState({
			binded: true,
		})

		elem.scrollable = makeItScrollable(elem, this.handleScrollTopAdd) // make elem scrollable by wheel
		this.refreshParameters() 
	}

	handleScrollTopAdd(added){
		var elem = this.state.elem
		elem.scrollTop += added

		var scrollPercent = elem.scrollTop / (elem.scrollHeight - elem.offsetHeight)
		this.refreshParameters()
	}

	handleWindowResize(){
		this.refreshParameters()
	}

	refreshParameters(){
		var elem = this.state.elem

		var fullHeight 		= elem.scrollHeight	
		var scrollTop 		= elem.scrollTop
		var scrollPercent 	= elem.scrollTop / (elem.scrollHeight - elem.offsetHeight)
		if(scrollPercent > 1) scrollPercent = 1
		if(scrollPercent < 0) scrollPercent = 0
		
		var wrapperTop 					= scrollTop
		var wrapperHeight 				= elem.offsetHeight
		var wrapperComputedStyle 		= getComputedStyle(this.wrapper)
		var wrapperBorderWidthTop 		= parseInt(wrapperComputedStyle.borderTopWidth)
		var wrapperBorderWidthBottom 	= parseInt(wrapperComputedStyle.borderBottomWidth)
		var wrapperAvailableHeight 		= wrapperHeight - (wrapperBorderWidthTop + wrapperBorderWidthBottom)

		var scrollCursorHeight	= (wrapperAvailableHeight / fullHeight) * 100
		var scrollCursorTop 	= scrollPercent * (elem.offsetHeight - scrollCursorHeight)
		var scrollCursorTopMax 	= wrapperAvailableHeight - scrollCursorHeight
		if(scrollCursorTop > scrollCursorTopMax){
			scrollCursorTop = scrollCursorTopMax
		}




		this.setState({
			fullHeight : fullHeight,
			scrollTop : scrollTop,
			wrapperTop : wrapperTop,
			wrapperHeight : wrapperHeight,
			wrapperAvailableHeight: wrapperAvailableHeight,
			scrollCursorHeight : scrollCursorHeight,
			scrollCursorTop : scrollCursorTop,
		})
	}


	// scrollCursorMove
	handleScrollCursorDown(e){
		var offsetY = e.offsetY

		this.setState({
			scrollCursorDragged: true,
			scrollCursorDraggedOffset: offsetY,
		})

		l('mousedown')
	}

	handleScrollCursorMove(e){
		if(!this.state.scrollCursorDragged) return

			//change elem.scroll.top

			var wrapperBoundingTop = this.wrapper.getBoundingClientRect().top
			var distanceFromTop = e.clientY - this.state.scrollCursorDraggedOffset
			var difference = distanceFromTop - wrapperBoundingTop
			var percent = difference / (this.state.wrapperAvailableHeight - this.state.scrollCursorHeight)

			if(percent < 0) percent = 0 
			if(percent > 1) percent = 1

			l('percent :', percent)
			l('this.state.fullHeight : ', this.state.fullHeight)
			var elem = this.state.elem
			elem.scrollTop = this.state.fullHeight * percent

			//l('ele percent : ', elem.scrollTop / this.state.fullHeight)

			this.refreshParameters()
	}	

	handleScrollCursorUp(e){
		if(!this.state.scrollCursorDragged) return
		this.setState({
			scrollCursorDragged: false
		})	

		l('mouseup')
	}



	render(){
		var state = this.state

		if(this.state.binded){

			if(this.wrapper != undefined){
				var wrapperS = this.wrapper.style
				wrapperS.top = state.wrapperTop + 'px'
				wrapperS.height = state.wrapperHeight + 'px'
			}

			if(this.scrollCursor != undefined){
				var cursorS = this.scrollCursor.style
				cursorS.top = state.scrollCursorTop + 'px'
				cursorS.height = state.scrollCursorHeight + 'px'
			}

		}

		var scrollCursorClass = 'CustomScroll__scroll-cursor '
		if(this.state.scrollCursorDragged) scrollCursorClass += 'CustomScroll__scroll-cursor--dragged'

		return (
			<div className="CustomScroll__wrapper" ref={elem => this.wrapper = elem}>
				<div className={scrollCursorClass} ref={elem => this.scrollCursor = elem}></div> 
			</div>
		)
	}
}

export default CustomScroll

