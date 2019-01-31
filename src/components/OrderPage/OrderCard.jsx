import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

export default class OrderCard extends Component {
  render() {
    //console.log(this.props)
    const product = this.props.product 
    //console.log('product',product)
    if(product.product_id){
        return (
            <WingBlank size="lg">
                    <Card>
                        <Card.Body>
                            <div className="cardWrap">
                                <img src={product.product_id.img} alt="img" width="100px" height="100px"/>
                                <div className="middle">
                                    <div style={{fontSize:"12px"}}>{product.product_id.name}</div>
                                    <div style={{fontSize:"12px"}}>{product.product_id.intro}</div>
                                </div>
                                <div className="right">
                                    <div>￥{product.product_id.price}</div>
                                    <div>x {product.count}
                                </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                <WhiteSpace size="lg" />
          </WingBlank>
        )
    }else{
        return (
            <WingBlank size="lg">
                    <Card>
                        <Card.Body>
                            <div className="cardWrap">
                                <img src={product.img} alt="img" width="100px" height="100px"/>
                                <div className="middle">
                                    <div style={{fontSize:"12px"}}>{product.name}</div>
                                    <div style={{fontSize:"12px"}}>{product.intro}</div>
                                </div>
                                <div className="right">
                                    <div style={{fontSize:"12px"}}>￥{product.price}</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                <WhiteSpace size="lg" />
          </WingBlank>
        )
    }
    
  }
}
