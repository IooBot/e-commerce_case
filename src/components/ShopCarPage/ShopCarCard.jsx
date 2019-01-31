import React, { Component } from 'react'
import { Card, WhiteSpace } from 'antd-mobile';
import './ShopCarCard.css'

export default class ShopCarCard extends Component {
  render() {
    const shopCarList=this.props.shopCarList
    const deleteCarById=this.props.deleteCarById
    return (
      <div>
        {shopCarList.map((item)=>{
          return (
            <div key={item.id}>
            <Card full>
              <Card.Body>
                <div className="cardWrap">
                  <img src={item.product_id.img} alt="img" width="100px" height="100px"/>
                  <div className="middle">
                    <div>{item.product_id.name}</div>
                    <div>{item.product_id.intro}</div>
                  </div>
                  <div className="right">
                    <div>￥{item.product_id.price}</div>
                    <div>x {item.count}</div>
                   <button onClick={()=>{deleteCarById(item.id)}} className="deleteButton">删除</button>
                  </div>
                </div>
              </Card.Body>
          </Card>
            </div>
          )
        })}
      </div>
    )
  }
}

/*
count: 3
createdAt: "2018-12-31"
id: "1542346970055"
product_id: {category: "鲜果", updatedAt: "2018-12-31 11:11:11", unit: Array(3), name: "香蕉", createdAt: "2018-12-31 11:11:11", …}
updatedAt: "2018-11-16 1:42:50"
user_id: null
*/
