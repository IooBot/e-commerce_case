import React, { Component } from 'react';
import { ActivityIndicator } from 'antd-mobile';
import Search from './Search'
import TabBarTop from './TabBarTop'
import Cards from './Cards'
import NavBars from '../Common/NavBar'

import {graphqls} from '../../api/graphql_request'
import {getProductByProps} from '../../api/graphql/product'

import './HomePage.css'



class HomePage extends Component{
    constructor(props){
        super(props)
        this.state={
            tabs:[],
            products:[],
            select:'所有果品',
            loading:true
        }
    }

    componentDidMount () {
        //console.log('tets')
        this.getGoods()
    }
    //获取所有商品
    getGoods(variables={}){
        return graphqls(getProductByProps,variables).then((data)=>{
            // console.log(data)
            let products=data.productbyprops||[]
            let arr=products.map((item)=>{
              return item.category
            })
            arr = Array.from(new Set(arr))
            let tabs=arr.map((item)=>{
              return {title:item}
            })
            this.setState({
              tabs:[{title: '所有果品'},...tabs],
              products:products,
              select:'所有果品',
              detail:'false',
              loading:false
            })
           // sessionStorage.setItem("products",JSON.stringify(products))
            })
    }

    tabChange(e){
        let category=e.title,
            products = JSON.parse(sessionStorage.getItem("products"));
        if(category==='所有果品'){
          this.setState({
            products:products
          })
        }else{
          let arr =products.filter((item)=>{
            return item.category===category
          })
          this.setState({
            products:arr
          })
        } 
    }
    
    toDetail(e){
        this.setState({
            detail:"true"
        })
    }
    changeComponent(e){
        if(e==='1'){
            return(
                <div>detail</div>
            )
        }else if(e==='2'){
            return(
                <div>order</div>
            )
        }else{
            //console.log('222changePage',this.props.changePage)
            return(
                <div style={{paddingTop:"1px"}}>
                    <ActivityIndicator toast text="loading" animating={this.state.loading}/>

                    <NavBars navBarText="商品" changePage={this.props.changePage} page="index"/>

                    <div style={{marginTop:"45px"}}><Search getProductByName={this.getGoods.bind(this)} /></div>
                    <TabBarTop tabs={this.state.tabs} tabChange={this.tabChange.bind(this)}/>
                    <div className="productList">
                        <Cards products={this.state.products||[]} changePage={this.props.changePage}/>
                    </div>
                </div>
            )
        }
    }

    render(){
        return (
            <div className="homeWrap">
                {this.changeComponent("3")}
            </div>
        )
    }
}

export default HomePage