import React from 'react'
import {ActivityIndicator} from 'antd-mobile';
import {PageContext} from '../../context/context'
import OrderCard from './OrderCard'
import NavBars from '../Common/NavBar'




import {graphqls} from '../../api/graphql_request'
//import {getProductById} from '../../api/graphql/product'
import {getAddressByProps} from '../../api/graphql/address'
import {createOrders,createOrderProducts} from '../../api/graphql/order'
import {getShopCarByProps,deleteCarByProps} from '../../api/graphql/shopCar'

import {successToast,failToast} from '../Common/Toast'
import {dialog} from '../Common/Alert'
import './OrederPage.css'
import { concatSeries } from 'async';

import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class OrderPage extends React.Component{
    constructor(props){
        super(props)
        //console.log('props1111',this.props)
        this.state={
            num:props.num,
            address:{},
            products:[],
            shopCarList:[],
            sumPrice:'',
            loading:true
        }
        //this.toPay=this.toPay.bind(this)
        this.createOrder=this.createOrder.bind(this)
        this.toPay=this.toPay.bind(this)
        
    }
    //获取数据
    ///获取默认地址
    getAddress(){
        let user_id=sessionStorage.getItem('openid')
        
        graphqls(getAddressByProps,{user_id}).then((e)=>{
            //console.log('getAddressByProps----------',e.userAddressbyprops)
            let address=e.userAddressbyprops.filter((item)=>{return item.default===1})[0]
            this.setState({address})
        })
    }

    componentDidMount(){
        this.getAddress()
        if(this.props.fromShopCar){
            this.getCarByProps()
        }else if(this.props.fromOrderCenter){
            this.setState({
                loading:false
            })
            let orderList=JSON.parse(sessionStorage.getItem('orderList'))
            //过滤出选定id未支付订单
            orderList=orderList.filter((item)=>{ return (item.id===this.props.order_id)})
            console.log('orderList',orderList)

        }else{
            
            this.props.getProductByIds(this.props.product_id).then((e)=>{
                console.log('getProductByIds',e.productbyid)
                this.setState({
                    products:[e.productbyid],
                    sumPrice:this.props.num*e.productbyid.price,
                    loading:false
                })
            })
            
        }
    }

    componentWillUnmount(){
        this.props.setFromShopCar(false)
        this.props.setOrderId(false)
    }

    getCarByProps(){
        const user_id=sessionStorage.getItem('openid')
        graphqls(getShopCarByProps,{user_id}).then((response)=>{
            let sumPrice=0,num=0;
            //如果請求失敗,默认空数组
            (response.userCartbyprops||[]).map((item)=>{
                sumPrice+=item.count*item.product_id.price
                num+=item.count
                return 1
            })
            // console.log('sumPrice',sumPrice,'shopCarCount',shopCarCount)
            // console.log('getShopCarByProps',response.userCartbyprops)
            this.setState({
                shopCarList:response.userCartbyprops,
                sumPrice,
                num,
                loading:false
            })
        })
    }

    deleteCarById(id){
        //console.log(id)
        graphqls(deleteCarByProps,{id}).then((e)=>{
            console.log('删除了shopcar',e)
        })
    }

    deleteAllShopCar(){
        const shopcarList=this.state.shopCarList||[],that=this;
        shopcarList.map((item)=>{
            that.deleteCarById(item.id)
            return 0
        })
    }

    
    toCreateOrder(status){
        const payTime=new Date().toLocaleString('chinese', { hour12: false })
        this.createOrder(status,payTime) 
       
        //console.log('status',status)
    }
    createOrder(orderStatus,payTime){
        console.log('創造order')
        console.log('this.state',this.state)
        let that =this
        //{orderStatus,payTime}=data

        let id=new Date().getTime()+parseInt(Math.random(),10),
           openid=sessionStorage.getItem('openid')
        let orderData = {
            "count": that.state.num,
            "createdAt": new Date().toLocaleString('chinese', { hour12: false }),
            "deliveryTime": "",
            "id": id,
            "orderLogistics_id": "",
            "orderPay_id": "",
            "orderShipFee": 0,
            "orderStatus": orderStatus,
            "orderTotalPay": this.state.sumPrice,//-优惠
            "payTime": payTime,
            "productTotalPay": this.state.sumPrice,
            "updatedAt": "",
            "userAddress_id": that.state.address.id,
            "user_id": openid
          }

          //console.log('orderData----------------',orderData)

        const fromShopCar= this.props.fromShopCar
         graphqls(createOrders,orderData).then((e) => {
            //console.log('order创建订单成功', e)
            that.deleteAllShopCar()
            let products=that.state.products||[]
            let shopCarList=that.state.shopCarList||[]
            //从购物车页面跳转而来(多个产品)
            if(fromShopCar){
                //console.log('来自shopcar')
                //console.log('shopList----',shopCarList)
                let i=1
                shopCarList.map((item)=>{
                    //console.log(item)
                    that.createProductOrder(id,item.count,item.product_id)
                    i++;
                    if(i===shopCarList.length){
                        //订单创建成功，删除购物车里面的所有产品
                       that.deleteAllShopCar() 
                    }
                    return 0
                })
            }else{//从产品详情页面跳转而来(一个产品)
                //console.log('来自detail')
                products.map((item)=>{
                    that.createProductOrder(id,that.state.num,item)
                    return 0
                })
                
            }
         })
    }

    createProductOrder(order_id,count,product){
        //console.log('product-----------',product)
        let that=this,openid=sessionStorage.getItem('openid')
        let data={
            "count": count,
            "createdAt": new Date().toLocaleString('chinese', { hour12: false }),
            "id": new Date().getTime()+parseInt(Math.random(),10),
            "orderPay": 0,
            "order_id": order_id,
            "productPay": product.price * count,
            "product_id": product.id,
            "remark": "that.state.remark",
            "unit": "100",
            "updatedAt": "",
            "user_id": openid
        }
        graphqls(createOrderProducts,data).then((e)=>{
            console.log('orderProduct创建成功',e)
            successToast('创建订单成功',1)
            that.props.changePage('orderCenter')
        })
    }

    toPay(){
        dialog('￥'+this.state.sumPrice,'确认支付吗?').then(
            (e)=>{
                //console.log('ok ',e)
                this.toCreateOrder('1')
            },(e)=>{
                //console.log('fail ',e)
                this.toCreateOrder('0')
            })
    }


    renderCardList(){
        if(this.props.fromShopCar){
            return(
                this.state.shopCarList.map((item)=>{
                    return(<OrderCard product={item} key={item.id}/>)
                })
            )
        }else{
            return(
                this.state.products.map((item)=>{
                    return(<OrderCard product={item} key={item.id}/>)
                })
            )
        }
    }

    render(){
        const address=this.state.address
        const num =this.state.num
        //console.log('+++',address)
        return(
            <div className="orderWrap">
                <ActivityIndicator toast text="loading" animating={this.state.loading}/>

                <NavBars navBarText="创建订单" changePage={this.props.changePage} page="detail"/>

                <div className="addressWrap" style={{marginTop:"45px"}}>
                    <List>
                        <Item
                        thumb="https://wly-1254337200.cos.ap-guangzhou.myqcloud.com/positioning.svg"
                        arrow="horizontal"
                        wrap
                        multipleLine
                        onClick={() => {
                            this.props.changePage('addressPage')
                        }}
                        >{address ?
                            address.username+address.telephone+address.province+address.city+address.area+address.address:'请选择一个地址'
                        }
                        </Item>
                    </List>
                </div>
                <div className="cardList">{this.renderCardList()}</div>
                <div className="payResult">
                    <div>共计{num}件商品;合计 ￥ {this.state.sumPrice}</div>
                    <div onClick={this.toPay}>立即支付</div>
                </div>
            </div>
            )
    }
}

export default props => (
    <PageContext.Consumer>
      {(obj)=> <OrderPage {...props} {...obj}/>}
    </PageContext.Consumer>
);

