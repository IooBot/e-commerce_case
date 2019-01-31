import React, { Component } from 'react'
import FormAddress from './FormAddress'

import {graphqls} from '../../api/graphql_request'
import {createAddress} from '../../api/graphql/address'
import {successToast} from '../Common/Toast'

export default class EditAddress extends Component {
    constructor(props){
        super(props);
        this.createUserAddress=this.createUserAddress.bind(this)
    }
    componentDidMount(){
        //console.log('EditAddress mount')
    }

    componentWillUnmount(){
        this.props.address.triggerAddress(false)
    }

    //创建用户地址

    createUserAddress(data){
        graphqls(createAddress,data).then(e=>{successToast('创建地址成功',2)})
        //console.log('---------',data)
    }
    render() {
        return (
            <div>
              <FormAddress setAddressId={this.props.setAddressId}  createUserAddress={this.createUserAddress} address={this.props.address} address_id={this.props.address_id} getAddress={this.getAddress}/>
            </div>
        )
    }
}
