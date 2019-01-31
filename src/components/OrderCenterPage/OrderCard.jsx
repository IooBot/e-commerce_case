import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

import ProductCard from './ProductCard'

export default class OrderCard extends Component {
  toPay(){

  }
  render() {
    const order=this.props.order||[]
    //console.log('这里是orderCard',this.props.order)
    return (
      <div>
        <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card>
                <Card.Header
                title={<span className="titleWrap"><span>{'订单号:'+order.id}</span><span>{order.createdAt}</span></span>}
                extra={<span>支付状态:{order.orderStatus==='0'?'未支付':'已支付'}</span>}
                />
                <Card.Body>
                {/*循环渲染然一个订单内的所有产品列表*/}
                <div className="OrderProductList">
                    {
                        (order.orderProducts||[]).map((item,index)=>{
                            //console.log(index,item)
                            return (<ProductCard key={item.id} orderProduct={item}/>)
                        })
                    }

                </div>
                </Card.Body>
                <Card.Footer content={<button  onClick={()=>this.props.toDeleteOrder(order.id)}>删除</button>} extra={<div>{order.orderStatus==='0'?<button onClick={()=>this.props.toPay(order.id)}>去支付</button>:''}</div>} />
            </Card>
        </WingBlank>
      </div>
    )
  }
}
