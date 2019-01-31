import React, {Component} from 'react';
import './components/App/App.css';

import {PageContext, NumContext} from './context/context'

// import 'antd-mobile/dist/antd-mobile.css';
import HomePage from './components/HomePage/HomePage'
import ShopCarPage from './components/ShopCarPage/ShopCarPage'
import UserPage from './components/UserPage/UserPage'
import NavBars from './components/App/NavBar'
import TabBarBottom from './components/App/TabBarBottom'
import ProductDetail from './components/ProductDetailPage/ProductDetail'
import OrderPage from './components/OrderPage/OrederPage'
import OrderCenterPage from './components/OrderCenterPage/OrderCenterPage'
import AddressPage from './components/AddressPage/AddressPage'

import {graphqls} from './api/graphql_request'
import {getProductById, getProductByProps} from './api/graphql/product'

//import axious from './api/axious_request'


class App extends Component {
    //showComponent
    constructor(props) {
        super(props)
        this.state = {
            page: 'index',
            product_id: '',
            num: 1,
            editAddress: false,
            fromShopCar: false,
            fromOrderCenter: false,
            order_id: '',
            address_id: ''
        }
        this.changePage = this.changePage.bind(this)
        this.triggerAddress = this.triggerAddress.bind(this)
        this.setFromShopCar = this.setFromShopCar.bind(this)
        this.setOrderId = this.setOrderId.bind(this)
        this.setAddressId = this.setAddressId.bind(this)
    }

    componentWillMount() {
        sessionStorage.setItem("openid", "ovtkn4zONC3IzhpykQ7cSLZ85YFg")
        this.getGoods()
    }

    //获取数据
    getGoods(variables = {}) {
        return graphqls(getProductByProps, variables).then((data) => {
            // console.log("data", data)
            let products = data.productbyprops || []
            sessionStorage.setItem("products", JSON.stringify(products))
        })
    }

    getProductByIds(id) {
        return graphqls(getProductById, {id}).then(e => e)
    }

    //显示页面，控制子页面的显示
    changePage(page, product_id) {
        console.log("onAppPage", page)

        if (product_id) {
            this.setState({page, product_id})
        } else {
            this.setState({page})
            console.log('state.page', this.state.page)
        }
    }

    //传递给子组件的更改state的函数
    triggerAddress(editAddress) {
        this.setState({editAddress})
    }

    setAddressId(id) {
        this.setState({address_id: id})
        console.log(id)
    }

    setNum(num) {
        this.setState({num})
    }

    setFromShopCar(fromShopCar) {
        this.setState({fromShopCar})
    }

    setOrderId(order_id = "", fromOrderCenter = false) {
        console.log('----setOrderId----', order_id, fromOrderCenter)
        this.setState({order_id, fromOrderCenter})
    }

    //根据条件渲染页面
    renderPage(page = "") {
        // console.log('renderPage', page)
        const setNum = this.setNum.bind(this)

        switch (page) {
            case ('detail'):
                return (
                    <div className="pageWrap">
                        <ProductDetail product_id={this.state.product_id} setNum={setNum} changePage={this.changePage}/>
                    </div>
                )

            case('order'):
                return (
                    <div className="pageWrap">
                        <OrderPage/>
                    </div>
                )

            case('shopCar'):
                // console.log('shopCar 渲染了')
                return (
                    <div>
                        <div className="pageWrap">
                            <ShopCarPage/>
                        </div>
                        <TabBarBottom changePage={this.changePage}/>
                    </div>
                )

            case('user'):
                // console.log('user 渲染了')
                return (
                    <div>
                        <div className="pageWrap">
                            <UserPage changePage={this.changePage}/>
                        </div>
                        <TabBarBottom changePage={this.changePage}/>
                    </div>
                )
            case('index'):
                // console.log('index 渲染了')
                return (
                    <div>
                        <div className="pageWrap indexPage">
                            <HomePage changePage={this.changePage}/>
                        </div>
                        <TabBarBottom changePage={this.changePage}/>
                    </div>
                )
            case('orderCenter'):
                // console.log('orderCenter 渲染了')
                return (
                    <div className="pageWrap">
                        <OrderCenterPage/>
                    </div>
                )
            case('addressPage'):
                // console.log('addressPage 渲染了')
                return (
                    <div className="pageWrap">
                        <AddressPage
                            address={{triggerAddress: this.triggerAddress, editAddress: this.state.editAddress}}/>
                    </div>
                )
            default:
                console.log('页面显示错误')
                return (<div>页面显示错误</div>)
            //break
        }
    }

    console(page) {
        this.console.log(page)
    }

    render() {
        const changePage = this.changePage//切换page
        const triggerAddress = this.triggerAddress//新建Address?
        const fromShopCar = this.state.fromShopCar//是否来自于shopCarPage
        const setFromShopCar = this.setFromShopCar//
        const getProductByIds = this.getProductByIds//
        const order_id = this.state.order_id
        const product_id = this.state.product_id
        const setOrderId = this.setOrderId//
        const fromOrderCenter = this.state.fromOrderCenter
        const num = this.state.num
        const address_id = this.state.address_id
        const setAddressId = this.setAddressId
        //console.log('APPrender')
        return (
            <PageContext.Provider value={{
                address_id,
                setAddressId,
                changePage,
                triggerAddress,
                getProductByIds,
                num,
                fromShopCar,
                setFromShopCar,
                setOrderId,
                order_id,
                product_id,
                fromOrderCenter
            }}>
                <div className="AppWrap">
                    <div className="phone6s">
                        <div className="App shopAppWrap">
                            {this.renderPage(this.state.page)}{/*渲染页面*/}
                        </div>
                    </div>
                </div>
            </PageContext.Provider>
        );
    }
}

export default App;