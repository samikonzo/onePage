import React 			from 'react'
import makeItScrollable from './makeItScrollable.js'
//import throttle 		from './throttle.js'
import bounce 			from './bounce.js'

import './CustomScroll.less'

/*
		TODO
	4) scroll bottom event bounce!


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



		this.bindScrollableElement 		= this.bindScrollableElement.bind(this)
		this.handleScrollTopAdd 		= this.handleScrollTopAdd.bind(this)
		this.handleWindowResize 		= this.handleWindowResize.bind(this)
		this.refreshParameters 			= this.refreshParameters.bind(this)
		this.handleScrollCursorDown		= this.handleScrollCursorDown.bind(this)
		this.handleScrollCursorMove		= this.handleScrollCursorMove.bind(this)
		this.handleScrollCursorUp		= this.handleScrollCursorUp.bind(this)
		this.externalRefresh 			= this.refreshParameters.bind(this)
		this.scrollBottomEvent 			= this.scrollBottomEvent.bind(this)
		this.bouncedScrollBottomEvent 	= bounce(this.scrollBottomEvent, 2000)
	}

	componentDidMount(){
		window.addEventListener('resize', this.handleWindowResize)

		/*if(this.state.elem && !this.state.binded){
			this.bindScrollableElement()
			
			l(this.state.elem)
		}	*/	

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
		if(!this.state.elem){
			this.setState({
				elem : nextProps.elem

			}, function() {
				if(this.state.elem && !this.state.binded){
					this.bindScrollableElement()
					this.state.elem.style.paddingRight = '20px';
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

		//l(' ')
		//l('scrollHeight - offsetHeight : ', elem.scrollHeight - elem.offsetHeight)
		//l('scrollTop : ', elem.scrollTop)
		//l('added : ', added)
		//l('top + added > height', elem.scrollTop + added > elem.scrollHeight - elem.offsetHeight)

		if(elem.scrollTop + added > elem.scrollHeight - elem.offsetHeight){
			elem.scrollTop = elem.scrollHeight - elem.offsetHeight
		} else {
			elem.scrollTop += added
		}
 	


		var scrollPercent = elem.scrollTop / (elem.scrollHeight - elem.offsetHeight)
		if(elem.scrollHeight == elem.offsetHeight) scrollPercent = 0


		//l(' ')
		//l(' ')
		//l('elem.scrollTop :',elem.scrollTop)
		//l('elem.scrollHeight :',elem.scrollHeight )
		//l('elem.offsetHeight :', elem.offsetHeight)
		//l('scrollPercent : ', scrollPercent)

		this.refreshParameters()
	}

	handleWindowResize(){
		this.refreshParameters()
	}

	refreshParameters(){
		var elem = this.state.elem

		var fullHeight 		= elem.scrollHeight	
		var visibleHeight 	= elem.offsetHeight
		var scrollTop 		= elem.scrollTop
		var scrollPercent 	= elem.scrollTop / (elem.scrollHeight - elem.offsetHeight)
		if(elem.scrollHeight == elem.offsetHeight) scrollPercent = 0
		if(scrollPercent > 1) scrollPercent = 1
		if(scrollPercent < 0) scrollPercent = 0
		
		var wrapperTop 					= scrollTop
		var wrapperHeight 				= visibleHeight
		var wrapperComputedStyle 		= getComputedStyle(this.wrapper)
		var wrapperBorderWidthTop 		= parseInt(wrapperComputedStyle.borderTopWidth)
		var wrapperBorderWidthBottom 	= parseInt(wrapperComputedStyle.borderBottomWidth)
		var wrapperAvailableHeight 		= wrapperHeight - (wrapperBorderWidthTop + wrapperBorderWidthBottom)

		var scrollCursorHeight	= (wrapperAvailableHeight / fullHeight) * wrapperHeight

		// a lot of questions to this
		var scrollCursorIsFull = ( +(wrapperAvailableHeight / fullHeight).toFixed(2) == 1) ? true : false

		var scrollCursorTop 	= scrollPercent * (elem.offsetHeight - scrollCursorHeight)
		var scrollCursorTopMax 	= wrapperAvailableHeight - scrollCursorHeight
		if(Math.ceil(scrollCursorTop) >= Math.ceil(scrollCursorTopMax) - 10){
			scrollCursorTop = scrollCursorTopMax
			var scrollBottom = true
		} else {
			var scrollBottom = false
		}

		//l(wrapperAvailableHeight / fullHeight, scrollCursorIsFull)


		//l('scrollPercent : ', scrollPercent)
		//l('elem.offsetHeight : ', elem.offsetHeight)
		//l('scrollCursorHeight : ', scrollCursorHeight)
		//l(Math.ceil(scrollCursorTop), Math.ceil(scrollCursorTopMax))
		//l(' ')

		this.setState({
			fullHeight 				: fullHeight,
			visibleHeight 			: visibleHeight,
			scrollTop 				: scrollTop,
			wrapperTop 				: wrapperTop,
			wrapperHeight 			: wrapperHeight,
			wrapperAvailableHeight	: wrapperAvailableHeight,
			scrollCursorHeight 		: scrollCursorHeight,
			scrollCursorIsFull 		: scrollCursorIsFull,
			scrollCursorTop 		: scrollCursorTop,
			scrollBottom 			: scrollBottom,

		}, function(){
			// emit elem change event
			var scrollTopEvent = new CustomEvent('scrollTopChange', {
				bubbles: true
			})

			this.state.elem.dispatchEvent(scrollTopEvent)

			if(this.state.scrollBottom){
				setTimeout(() => {
					this.bouncedScrollBottomEvent()
				}, 100) // timer in order to avoid multiple dispatcher execution 
				
			}	
		})
	}

	scrollBottomEvent(){
		//l('scrollBottomEvent')

		var scrollBottomEvent = new CustomEvent('scrollBottom', {
			bubbles: true
		})
		this.state.elem.dispatchEvent(scrollBottomEvent)
	}

	// scrollCursorMove

	handleScrollCursorDown(e){
		var offsetY = e.offsetY

		this.setState({
			scrollCursorDragged: true,
			scrollCursorDraggedOffset: offsetY,
			mouseDownTime: performance.now()
		})

	}

	handleScrollCursorMove(e){
		if(!this.state.scrollCursorDragged){
			return
		}

		
		var wrapperBoundingTop = this.wrapper.getBoundingClientRect().top
		var distanceFromTop = e.clientY - this.state.scrollCursorDraggedOffset
		var difference = distanceFromTop - wrapperBoundingTop
		var percent = difference / (this.state.wrapperAvailableHeight - this.state.scrollCursorHeight)

		if(percent < 0) percent = 0 
		if(percent > 1) percent = 1

		var elem = this.state.elem
		elem.scrollTop = (this.state.fullHeight - this.state.visibleHeight) * percent

		this.refreshParameters()
	}	

	handleScrollCursorUp(e){
		if(!this.state.scrollCursorDragged) return


		this.setState({
			scrollCursorDragged: false
		})	

		//this.refreshParameters()
	}



	render(){
		var state = this.state

		if(this.state.scrollCursorDragged && this.state.elem) this.state.elem.style.userSelect = 'none'

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

		var wrapperClass='CustomScroll__wrapper '
		if(this.state.scrollCursorIsFull) wrapperClass += 'CustomScroll__wrapper--hidden '
		
		var scrollCursorClass = 'CustomScroll__scroll-cursor '
		if(this.state.scrollCursorDragged) scrollCursorClass += 'CustomScroll__scroll-cursor--dragged '



		return (
			<div className={wrapperClass} ref={elem => this.wrapper = elem}>
				<div className={scrollCursorClass} ref={elem => this.scrollCursor = elem}></div> 
			</div>
		)
	}
}

export default CustomScroll

