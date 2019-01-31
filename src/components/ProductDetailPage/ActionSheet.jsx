import React from 'react'
import './ActionSheet.css'
import { ActionSheet, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';
import { List, Stepper } from 'antd-mobile';

import {graphqls} from '../../api/graphql_request'
import {createShopCar} from '../../api/graphql/shopCar'
import {PageContext} from '../../context/context'

import {successToast,failToast} from '../Common/Toast'




class ActionSheets extends React.Component {
  constructor() {
    super();
    this.state = {
      num:1
    };
    this.addCar=this.addCar.bind(this)
  }
  
 
  add(){
      let num=this.state.num+1
      if(num===100000){

      }else{
        this.setState({ num })
      }   
      this.props.setNum(num)
  }
  minius(){
    let num=this.state.num-1
    if(num===0){

    }else{
      this.setState({num})
    }
    this.props.setNum(num)
  }

  addCar(){
      let that=this
      let createdAt=new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString().slice(2)
      let id=new Date().getTime()+parseInt(Math.random()*100000,10)
      let user_id=sessionStorage.getItem('openid')
      //console.log(user_id)
      //console.log('-----',this.props)
      const variable={
        count:that.state.num,
        id,
        createdAt,
        updatedAt:createdAt,
        user_id,
        product_id:this.props.product.id
      }
      console.log('shopcar',variable)

    graphqls(createShopCar,variable).then((e)=>{
        //console.log(e)
        successToast('加入购物车成功',1)
    },()=>failToast('失败！请重试'))
  }

  render() {
    return (
        <div className="actionSheet">
            <div className="mask" onClick={this.props.triggerActionSheet}></div>
            <div className="sheetWrap">
                <div className="row">价格:{this.props.product.price}</div>
                <div className="row">库存:{this.props.product.stock}</div>
                <div className="numWrap row">
                    购买数量:<span onClick={this.add.bind(this)}>+</span><span>{this.state.num}</span><span onClick={this.minius.bind(this)}>-</span>
                </div>
                <PageContext.Consumer>
                    {({changePage})=>{
                        return(
                            <div className="buttonWraps">
                                <button onClick={this.addCar}>加入购物车</button>
                                <button onClick={()=>changePage('order')}>立即购买</button>
                            </div>
                        )
                    }}
                </PageContext.Consumer>
                
            </div>
        </div>
    )
  }
}


export default ActionSheets