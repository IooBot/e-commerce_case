import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import './TabBarBottom.css'


class TabBarBottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'index',
            hidden: false,
            fullScreen: true,
        };
        this.handleChnage=this.handleChnage.bind(this)
    }
    renderContent(page) {
        // if(page==='index'){this.props.changePage('index')}
        // if(page==='shopCar'){this.props.changePage('shopCar')}
        // if(page==='user'){this.props.changePage('user')}
    }
    handleChnage(page){
        this.props.changePage(page)
    }
    render() {
        //这里渲染一次
        return (
            <div style={this.state.fullScreen ? { position: 'absolute', height: '100%', width: '100%', bottom: 0 } : { height: 400 }} className="TabBarBottom">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="商品"
                        key="index"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://wly-1254337200.cos.ap-guangzhou.myqcloud.com/home.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://wly-1254337200.cos.ap-guangzhou.myqcloud.com/home_s.svg) center center /  21px 21px no-repeat' }}
                        />
                        }
                        selected={this.state.selectedTab === 'index'}

                        onPress={() => {
                            this.setState({
                                selectedTab: 'index',
                            });
                            this.handleChnage('index')
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent('index')}
                    </TabBar.Item>

                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://wly-1254337200.cos.ap-guangzhou.myqcloud.com/shopcar.svg) center center /  21px 21px no-repeat' }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://wly-1254337200.cos.ap-guangzhou.myqcloud.com/shopcar_s.svg) center center /  21px 21px no-repeat' }}
                            />
                        }
                        title="购物车"
                        key="shopCar"

                        selected={this.state.selectedTab === 'shopCar'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'shopCar',
                            });
                            this.handleChnage('shopCar')
                        }}
                        data-seed="logId1"
                    >
                        {this.renderContent('shopCar')}
                    </TabBar.Item>

                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://wly-1254337200.cos.ap-guangzhou.myqcloud.com/user.svg) center center /  21px 21px no-repeat' }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://wly-1254337200.cos.ap-guangzhou.myqcloud.com/user_s.svg) center center /  21px 21px no-repeat' }}
                            />
                        }
                        title="用户中心"
                        key="user"

                        selected={this.state.selectedTab === 'user'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'user',
                            });
                            this.handleChnage('user')
                        }}
                    >
                        {this.renderContent('user')}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}


export default TabBarBottom