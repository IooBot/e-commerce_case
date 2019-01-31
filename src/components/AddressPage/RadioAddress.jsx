import React, { Component } from 'react';
import { List } from 'antd-mobile';

import './RadioAddress.css'

import {graphqls} from '../../api/graphql_request'
import {updateAddress,getAddressByProps} from '../../api/graphql/address'

const Item = List.Item;
const Brief = Item.Brief;

export default class RadioAddress extends Component{

  onChange = (id) => {
   //console.log('id:',id)
    this.updateAddress(id)
  };

  toModifyAddress(id){
    this.props.setAddressId(id)
    this.props.triggerAddress(true)
  }

  updateAddress=(id)=>{
    let that=this
    //console.log('更新启动')
    let user_id=sessionStorage.getItem('openid')
    let data={id,default:1}

    graphqls(updateAddress,data).then((e)=>{
      //更新address成功之後，重新獲取地址列表,
      graphqls(getAddressByProps,{user_id}).then((res)=>{
        //console.log(res.userAddressbyprops)
        res.userAddressbyprops.map((item)=>{
          if(item.id!==id){
            let data={id:item.id,default:0}
            graphqls(updateAddress,data).then(e=>that.props.getAddress())
          }
          return 0
        })
     })
    })
  }

  render() {
    //获取地址列表
    let addressList=[...this.props.addressList]
    return (
      <div>
      {/*
        <List renderHeader={() => ''}>
          {addressList.map(item => (
            <List   >
              <Item
                thumb={item.default===1 ? "https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" : ''}
                arrow="horizontal"
                onClick={() => {}}
              ></Item>
            </List>
          ))}
          </List>*/}

          {
            addressList.map((item)=>{
              return(
                <div className="addressListWrap" key={item.id}>
                  <span className="left-icon" onClick={()=>this.onChange(item.id)} style={item.default===1?{background: "#1890ff"}:{}}></span>
                  <span className="middle-text">{item.username+item.telephone+item.province+item.city+item.area+item.address}</span>
                  <span className="right-icon" onClick={()=>this.toModifyAddress(item.id)}></span>
                </div>
              )
            })
          }
      </div>
    );
  }
}