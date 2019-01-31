import React,{Component} from 'react'
import {PageContext} from '../../context/context'

import './UserAction.css' 

import ActionSheets from './ActionSheet'


class UserAction extends Component{
    constructor(){
        super()
        this.state={
            actionSheet:false
        }
        this.triggerActionSheet=this.triggerActionSheet.bind(this)
    }

    triggerActionSheet(){
        this.setState({
            actionSheet:!this.state.actionSheet
        })
    }

    renderPage(){
        
        let actionSheet=this.state.actionSheet
        if(actionSheet){
            return(<div><ActionSheets triggerActionSheet={this.triggerActionSheet} product={this.props.product} setNum={this.props.setNum}/></div>)
        }else{
            return(
                <div className="actionWrap">
                    <button className="service">客服</button>
                    <button className="toCar" onClick={()=>this.props.changePage('shopCar')}>购物车</button>
                    <button className="addCar" onClick={this.triggerActionSheet}>加入购物车</button>
                    <button className="toPay" onClick={this.triggerActionSheet}>立即购买</button>
                </div>
            )
        }
    }

    render(){
        return(<div>{this.renderPage()}</div>)
    }
}


export default  props=> (
    <PageContext.Consumer>
      {({changePage}) => <UserAction {...props} changePage={changePage} />}
    </PageContext.Consumer>
  );

