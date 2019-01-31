import React, { Component } from 'react'
import OrderCard from './OrderCard'
import { ActivityIndicator } from 'antd-mobile';
import TabBarTop from './OrderTabTop'
import NavBars from '../Common/NavBar'

import './OrderCenterPage.css'

import {PageContext} from '../../context/context'

import {graphqls} from '../../api/graphql_request'
import {getOrderByProps,getProductByProps,DELETE_ORDER,DELETE_ORDER_PRODUCT} from '../../api/graphql/order'

import config from "../../api/url_config";

class OrderCenterPage extends Component {
  constructor(props){
    super(props)
    this.state={
        orderList:[],
        loading:true,
        tabs:[{title:"全部订单"},{title:"未支付"},{title:"已支付"},{title:"待评论"}],
        select:"未支付"
    }

    this.toPay=this.toPay.bind(this)
    this.toDeleteOrder=this.toDeleteOrder.bind(this)
    this.tabChange=this.tabChange.bind(this)
  }

  componentDidMount(){
    let user_id='ovtkn4zONC3IzhpykQ7cSLZ85YFg'
    this.getOrder({user_id})

  }
  //获取订单，并根据订单id获取订单产品信息，之后重构数据结构
  getOrder(data){
      let that=this
    graphqls(getOrderByProps,data).then((res)=>{
        //console.log('order',res)
        let orderArr=res.orderbyprops||[]
        let length=orderArr.length
        if(!length){
            let id=setTimeout(()=>{
                that.setState({loading:false})
            },10000)
        }
        for(let i=0;i<orderArr.length;i++){
            //根据order_id获取订单产品信息,可以优化,可以只发出一次请求获取所有订单产品信息之后再经行处理
            graphqls(getProductByProps,{order_id:orderArr[i].id}).then((res)=>{
                //console.log('getProductByProps',res)
                orderArr[i].orderProducts=res.orderProductbyprops
                
                if(i===orderArr.length-1){
                    //console.log('----orderList-----',orderArr)
                    orderArr.sort((a,b)=>{
                        return new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()
                    })
                    sessionStorage.setItem('orderList',JSON.stringify(orderArr))
                    this.setState({
                        orderList:orderArr,
                        loading:false
                    })
                }
            })
        }
    }).catch((e)=>{
        //console.log('catct',e)
    })
  }

  deleteOrder(data){
      console.log('deleteOrderData',data)
    graphqls(DELETE_ORDER,data).then(e=>{
        console.log('deleteOrer',e)
        let user_id=sessionStorage.getItem('openid')
        this.getOrder({user_id})
    })
  }

  deleteOrderProduct(data){
    graphqls(DELETE_ORDER_PRODUCT,data).then(e=>{
        let user_id=sessionStorage.getItem('openid')
        this.getOrder({user_id})
    })
  }
  
  //删除订单
  toDeleteOrder(id){
    //console.log('order_id',id)
    this.deleteOrder({id})
    this.deleteOrderProduct({order_id:id})
  }

  toPay(id){
    //console.log('order_id',id)
    this.props.changePage('order')
    this.props.setOrderId(id,true)
  }

  tabChange(e){
    //有待优化，请求？(响应太慢，放弃)or使用缓存(徐分别处理，增加了代码量，这里采用)
    //console.log(e)
    let orderList=JSON.parse(sessionStorage.getItem('orderList'))||[]
    if(e.title==='未支付'){
        orderList=orderList.filter((item)=>{
            return item.orderStatus==="0"
        })
        this.setState({orderList})
    }else if(e.title==='已支付'){
        orderList=orderList.filter((item)=>{
            return item.orderStatus==="1"
        })
        this.setState({orderList})
    }else{
        this.setState({orderList})
    }
  }

  render() {
    const orderList=this.state.orderList||[]
    return (
      <div className="orderCnerWrap">
        <ActivityIndicator toast text="loading" animating={this.state.loading}/>
        <NavBars navBarText="我的订单" changePage={this.props.changePage} page="user"/>
        <div style={{marginTop:"45px"}}><TabBarTop tabChange={this.tabChange} tabs={this.state.tabs}/></div>
        <div className="orderList">
            {orderList.length===0 ?
                <div style={{marginTop:'200px',padding:'1px',position:'relative',zIndex:'10',display:'flex',justifyContent:'center'}}>
                    <div>订单为空<span onClick={()=>this.props.changePage('index')} style={{color:'#108ee9'}}>去购物</span></div>
                </div>
                :
                orderList.map((item,index)=>{
                    //console.log(index,item)
                    return(<OrderCard order={item} key={item.id} toPay={this.toPay} toDeleteOrder={this.toDeleteOrder}/>)
                })
            }
        </div>
      </div>
    )
  }
}


export default props=>{
    return(
        <PageContext.Consumer>
            {(obj)=><OrderCenterPage {...props} {...obj}/>}
        </PageContext.Consumer>
    )
}



