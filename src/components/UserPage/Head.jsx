import React, { Component } from 'react'
import './Head.css'

export default class Head extends Component {
  render() {
    //console.log(this.props)
    const user=this.props.user?this.props.user[0]:{username:'旺仔小馒头'}
    return (
      <div className="head">
        <img className="avatar" src={user.img||'https://wly-1254337200.cos.ap-guangzhou.myqcloud.com/user_s.svg'} alt="head" width="50px" height="50px"/>
        <div className="nickName">{user.username}</div>
      </div>
    )
  }
}

