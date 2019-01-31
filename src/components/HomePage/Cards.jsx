import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
//import { Item } from 'antd-mobile/lib/tab-bar';
import './Cards.css'
import {PageContext} from '../../context/context'






class Cards extends Component{
    constructor(props){
        //console.log('111',props)
        super(props)
        this.state={
            product_id:''
        }
    }
    
    render(){
        //console.log('cardProps',this.props.products)
        const Cardss=this.props.products.map((item,index)=>{
            //console.log(item)
            return (
                <PageContext.Consumer key={index} >
                    {({changePage})=>{
                        return(
                            <WingBlank size="lg" className="Card">
                                {/*<Link to={"/detail?product_id="+item.id}>*/}
                                    <Card onClick={(e)=>{changePage('detail',item.id)}}>
                                        <Card.Header
                                            title={<span className="title">{item.name}</span>}
                                            extra={<span className="hot">热门</span>} 
                                        />
                                        <Card.Body>
                                            <div className="bodyWrap">
                                                <div className="imgWrap">
                                                    <img src={item.img} alt="xxx" height="100px" width="100px"/>
                                                </div>
                                                <div className="sidebar">
                                                    <p className="p1">{item.intro}</p>
                                                </div>
                                                <div className="rightsidebar">
                                                    <p className="p2">{item.price}/斤</p>
                                                    <p className="p3">库存:{item.stock}</p>
                                                </div>
                                            </div>
                                        </Card.Body>
                                        <Card.Footer content="" extra={<div></div>}/>
                                    </Card>
                                {/*</Link>*/}
                                     <WhiteSpace size="lg" />
                            </WingBlank>
                        )
                    }}
                </PageContext.Consumer>
               
            )
        })

        return (
            <div>
               {Cardss}
            </div>
        )
    }
}
export default Cards








