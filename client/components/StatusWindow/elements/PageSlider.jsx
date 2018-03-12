import React from 'react'

import './PageSlider.less'

const l = console.log;

class PageSlider extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			pages: this.props.pages,
			currentPageNum : this.props.currentPageNum,
		}

		//l(this.props)

		this.handleItemCLick = this.handleItemCLick.bind(this)
	}

	componentWillReceiveProps(newProps){
		this.setState({
			currentPageNum : newProps.currentPageNum
		})
	}

	handleItemCLick(e){
		//l('item click')
		this.props.handleItemClick(e)
	}

	render(){
		return(
			<div className="PageSlider">

				{this.state.pages.map( (page, i) => {
					var className = 'PageSlider__slide'

					if(this.state.currentPageNum == i) className += ' PageSlider__slide--selected'

					return (
						<div key={i}
							className={className}
							onClick={this.handleItemCLick}
							href={page.href}
						></div>
					)
				})}
			</div>
		)
	}
}

module.exports = PageSlider