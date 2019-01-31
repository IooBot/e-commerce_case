import React, { Component } from 'react';

import './Card.css'


export default class Card extends Component{
    constructor(props){
        super(props)
        //console.log('1',props)
        this.state={
            product:props.product
        }
    }
    
    componentWillReceiveProps(props){
        //console.log('cardProps',props)
        this.setState({
            product:props.product
        })
    }

    render(){
        const product =this.state.product
        return (
            <div className="card">
                <img src={product.img||''} alt="Avatar" style={{width:"100%",height:'200px'}}/>
                <div className="container">
                    <h4>{product.name}</h4> 
                    <p style={{fontSize:"12px"}}>{product.intro}</p>
                    <p style={{fontSize:"12px"}}>剩余:{product.stock}</p>
                    <span className="price">￥{product.price}</span>
                </div>
            </div>
        )
    }
}