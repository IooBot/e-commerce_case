import React, {Component} from 'react';
import ShopCarCard from './ShopCarCard'
import {PageContext} from '../../context/context'
import {ActivityIndicator} from 'antd-mobile';
import './ShopCarPage.css'
import {graphqls} from '../../api/graphql_request'
import {getShopCarByProps, deleteCarByProps, createShopCar} from '../../api/graphql/shopCar'
import NavBars from '../Common/NavBar'

class ShopCarPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shopCarList: [],
            sumPrice: 0,
            shopCarCount: 0,
            loading: true
        }
        //this.renderShopCarList=this.renderShopCarList.bind(this)
        this.deleteCarById = this.deleteCarById.bind(this)
        //this.deleteAllShopCar=this.deleteAllShopCar.bind(this)
    }

    componentDidMount() {
        this.getCarByProps()
    }

    //获取购物车列表，并统计总价总数量
    getCarByProps() {
        const user_id = sessionStorage.getItem('openid')
        console.log(user_id, '>>>>>>');
        graphqls(getShopCarByProps, {user_id}).then((response) => {
            let sumPrice = 0, shopCarCount = 0;
            //如果請求失敗,默认空数组

            (response.userCartbyprops || []).map((item) => {
                sumPrice += item.count * item.product_id.price
                shopCarCount += item.count
                return 1
            })

            //console.log('sumPrice',sumPrice,'shopCarCount',shopCarCount)
            //console.log('getShopCarByProps',response.userCartbyprops)

            console.log(response, ">>>");
            this.setState({
                shopCarList: response.userCartbyprops,
                sumPrice,
                shopCarCount,
                loading: false
            })
        })
    }

    //删除购物车
    deleteCarById(id) {
        //console.log(id)
        graphqls(deleteCarByProps, {id}).then((e) => {
            console.log('deleteShopCar', e)
            this.getCarByProps()
        })
    }


    render() {
        return (
            <div className="shopCarPage">
                <ActivityIndicator toast text="loading" animating={this.state.loading}/>
                <NavBars navBarText="购物车" changePage={this.props.changePage} page="detail"/>
                {
                    this.state.shopCarList.length === 0 ?
                        <div style={{
                            marginTop: '200px',
                            padding: '1px',
                            position: 'relative',
                            zIndex: '10',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <div>购物车空空如也<span onClick={() => this.props.changePage('index')}
                                              style={{color: '#108ee9'}}>去购物</span></div>
                        </div>
                        :
                        ''
                }
                <div className="ShopCarList">
                    {/*this.renderShopCarList()*/}
                    <ShopCarCard shopCarList={this.state.shopCarList} deleteCarById={this.deleteCarById}/>
                </div>
                <div className="footer">
                    <div className="message">合计: ￥{this.state.sumPrice}</div>
                    <button
                        className="toPay"
                        onClick={() => {
                            if (this.state.shopCarList.length > 0) {
                                this.props.changePage('order')
                                this.props.setFromShopCar(true)
                                //this.deleteAllShopCar()
                            }
                        }}
                    >去支付
                    </button>
                </div>
            </div>
        )
    }
}

export default props => (
    <PageContext.Consumer>
        {(obj) => <ShopCarPage {...props} {...obj}/>}
    </PageContext.Consumer>
);