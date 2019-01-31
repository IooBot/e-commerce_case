import React, { Component } from 'react'
import RadioAddress from './RadioAddress'
import EditAddress from './EditAddress'
import { List } from 'antd-mobile';
import NavBars from '../Common/NavBar'
import './AddressPage.css'

import {graphqls} from '../../api/graphql_request'
import {getAddressByProps} from '../../api/graphql/address'

import {PageContext} from '../../context/context'


const Item = List.Item;
const Brief = Item.Brief;

class AddressPage extends Component {
    constructor(props){
        super(props)
        this.state={
            addressList:[]
        }
        //console.log(props.address)
        this.getAddress=this.getAddress.bind(this)
    }


    componentDidMount(){
        let user_id=sessionStorage.getItem('openid')
        this.getAddress({user_id})
    }

    getAddress(data){
        graphqls(getAddressByProps,data).then((res)=>{
            //console.log(res.userAddressbyprops)
            this.setState({
                addressList:res.userAddressbyprops
            })
        })
    }

    renderPage(page){
        let triggerAddress=this.props.address.triggerAddress
        //console.log('000',triggerAddress)
        if(page===true){
            return(
                <div>
                    <NavBars navBarText="编辑地址" changePage={this.props.changePage} page="addressPage" triggerAddress={triggerAddress}/>
                    <div style={{marginTop:"45px"}}> </div>
                    <EditAddress address={this.props.address} address_id={this.props.address_id} getAddress={this.getAddress} setAddressId={this.props.setAddressId} />
                </div>
            )
        }else{
            return(
                <div>
                    <NavBars navBarText="我的地址" changePage={this.props.changePage} page="user"/>
                    <div style={{marginTop:"45px"}}></div>
                    <div className="addressPageWrap">
                        <div  onClick={()=>this.props.address.triggerAddress(true)}>
                            <List>
                                <Item
                                    thumb="https://wly-1254337200.cos.ap-guangzhou.myqcloud.com/positioning.svg"
                                    arrow="horizontal"
                                    onClick={() => {}}
                                >+新建地址</Item>
                            </List>
                        </div>
                        <div className="addressList">
                            <RadioAddress addressList={this.state.addressList} triggerAddress={this.props.triggerAddress} changePage={this.props.changePage} getAddress={this.getAddress} setAddressId={this.props.setAddressId} address_id={this.props.address_id}/>
                        </div>
                    </div>
                </div>

            )
        }
    }


    render() {
        return (
            <div>{this.renderPage(this.props.address.editAddress)}</div>
        )
    }


}

export default props=>{
    return(
        <PageContext.Consumer>
            {(obj)=><AddressPage {...props} {...obj}/>}
        </PageContext.Consumer>
    )
}