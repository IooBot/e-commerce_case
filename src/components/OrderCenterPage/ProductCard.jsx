import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';



export default class ProductCard extends Component {
  render() {
    //console.log('productCard------------',this.props)
    //console.log('这里是productCard')
    const orderProduct=this.props.orderProduct
    return (
      <div>
        <WingBlank size="lg">
            <WhiteSpace size="lg" />
                <Card>
                    <Card.Body>
                        <div className="cardWrap">
                            <img src={orderProduct.product_id.img} alt="img" width="100px" height="100px"/>
                            <div className="middle">
                                <div>{orderProduct.product_id.name}</div>
                                <div>{orderProduct.product_id.intro}</div>
                            </div>
                            <div className="right">
                                <div>￥{orderProduct.product_id.price}</div>
                                <div>x {orderProduct.count}</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            <WhiteSpace size="lg" />
        </WingBlank>
      </div>
    )
  }
}