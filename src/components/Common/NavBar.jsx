import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';


export default class NavBars extends Component{
    render(){
        let page=this.props.page||'home'
        let triggerAddress=this.props.triggerAddress||console.log
        //console.log(this.props)
        return(
            <div className="navBars" style={{zIndex:"2000"}}>
                <NavBar
                mode="dark" 
                icon={ <Icon type="left"/> }
                onLeftClick={() => {
                    triggerAddress(false)
                    this.props.changePage(page)
                    }
                }
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }}/>,
                    <Icon key="1" type="ellipsis" />,
                ]}
                ><span style={{fontSize:'14px'}}>{this.props.navBarText}</span>
                </NavBar>
            </div>
        )
    }
}









