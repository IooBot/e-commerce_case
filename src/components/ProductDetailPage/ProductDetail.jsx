import React, { Component } from 'react';
import Card from './Card'
import NavBars from '../Common/NavBar'
import './ProductDetail.css'

import {ActivityIndicator} from 'antd-mobile';

import UserAction from './UserAction'

import {graphqls} from '../../api/graphql_request'
import {getProductById} from '../../api/graphql/product'

export default class ProductDetail extends Component{

    constructor(props){
        super(props)
        this.state={
            product:{},
            loading:true
        }
    }

    getProduct(){
        graphqls(getProductById,{id:this.props.product_id}).then((e)=>{
            //console.log('productId',e.productbyid)
            this.setState({
                product:e.productbyid,
                loading:false
            })
        })
    }

    componentWillMount(){
        this.getProduct()
    }

    render(){
        return(
            <div className="detailWrap">
                <ActivityIndicator toast text="loading" animating={this.state.loading}/>
                <NavBars navBarText="创建订单" changePage={this.props.changePage} page="index"/>
                <div style={{marginTop:"45px"}}><Card product={this.state.product}/></div>
                <UserAction product={this.state.product} setNum={this.props.setNum} />
            </div>
        )
    }
}