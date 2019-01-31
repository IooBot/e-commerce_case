import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';

import './NavBar.css'
import {PageContext} from '../../context/context'

export default class NavBars extends Component{
    render(){
        return(
            <PageContext.Consumer>
                {({changePage})=>{
                    return (
                        <div className="navBars">
                            <NavBar
                            mode="dark"
                            icon={<Icon type="left" />}
                            onLeftClick={() =>  changePage('index')}
                            rightContent={[
                                <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                                <Icon key="1" type="ellipsis" />,
                            ]}
                            ><span style={{fontSize:'14px'}}>电商小程序</span>
                            </NavBar>
                        </div>
                    )
                }}
            </PageContext.Consumer>
        )
    }
}



