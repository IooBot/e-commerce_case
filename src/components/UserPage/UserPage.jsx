import React, { Component } from 'react';
import Head from './Head'
import Lists from '../Common/List'
import NavBars from '../Common/NavBar'

import {graphqls} from '../../api/graphql_request'
import {getUserByProps} from '../../api/graphql/user'


import './UserPage.css'


class UserPage extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    componentDidMount(){
        this.getUser()
    }

    
    getUser(){
        let openid=sessionStorage.getItem('openid')
        graphqls(getUserByProps,{openid}).then((res)=>{
            console.log('user',res.userbyprops)
            this.setState({
                user:res.userbyprops
            })
        })
    }


    render(){
        return(
            <div>
                <NavBars navBarText="用户中心" changePage={this.props.changePage} page="user"/>
                <div className="UserPageWrap">
                
                    <div className="headerWrap">
                        <Head user={this.state.user}/></div>
                    <div className="toWrap">
                        <Lists text="我的订单" icon="https://wly-1254337200.cos.ap-guangzhou.myqcloud.com/order.svg" callback={()=>{this.props.changePage('orderCenter')}}/>
                        <Lists text="我的地址" icon="https://wly-1254337200.cos.ap-guangzhou.myqcloud.com/address.svg" callback={()=>this.props.changePage('addressPage')}/>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default UserPage