import React, { Component } from 'react'

import { List, InputItem ,Picker, Button} from 'antd-mobile';
// import { createForm } from 'rc-form';
import './FormAddress.css'

import {graphqls} from '../../api/graphql_request'
import {getAddressById,updateAddress} from '../../api/graphql/address'

import { district} from 'antd-mobile-demo-data';

import config from '../../api/url_config'
import {successToast} from '../Common/Toast'

const APPID =config.APPID;


export default class FormAddress extends Component {
    constructor(props){
        super(props);

        this.state={
            areaShow:false,
            name:'',
            phone:'',
            detail:'',
            code:'',
            "area": "",
            "city": "",
            "province": ""
        };

        this.trigger=this.trigger.bind(this);
        this.nameChange=this.nameChange.bind(this);
        this.phoneChange=this.phoneChange.bind(this);
        this.detailChange=this.detailChange.bind(this);
        this.codeChange=this.codeChange.bind(this);
        this.submit=this.submit.bind(this);
    }

    componentWillMount(){
        //console.log('from render------',this.props.address_id)
        if(this.props.address_id){
            graphqls(getAddressById,{id:this.props.address_id}).then((e)=>{
                //console.log('--------getAddressBYID------------',e.userAddressbyid)
                let address=e.userAddressbyid;
                this.setState({
                    name:address.username,
                    phone:address.telephone,
                    detail:address.address,
                    code:address.postcode,
                    "area": address.area,
                    "city": address.city,
                    "province": address.province
                })
            })
        }

    }

    componentWillUnmount(){
        this.props.setAddressId('')
    }

    nameChange(e){
        //console.log(e)
        this.setState({
            name:e
        })
    }

    phoneChange(e){
        //console.log(e)
        this.setState({
            phone:e
        })
    }

    detailChange(e){
        //console.log(e)
        this.setState({
            detail:e
        })
    }
    codeChange(e){
        //console.log(e)
        this.setState({
            code:e
        })
    }

    areaChange(e=[0]){
        //console.log('e',e)
        //console.log(district)

        let provinceCode=e[0],cityCode=e[1],areaCode=e[2];


        let province='',city='',area='';

        district.map((item)=>{
            if(item.value===provinceCode){
                //console.log('province',item)
                province=item.label;
                item.children.map((item)=>{
                    if(item.value===cityCode){
                        //console.log('city',item)
                        city=item.label;
                        item.children.map((item)=>{
                            if(item.value===areaCode){
                                // console.log('area',item)
                                area=item.label
                            }
                            return 0
                        })
                    }
                    return 0
                })
            }
            return 0
        });

        this.setState({
            province,
            city,
            area
        })
    }

    updateUserAddress(data){
        graphqls(updateAddress,data).then(e=>{
            successToast('更新地址成功',2)
        })
    }
    submit(){
        let data={
            "address": this.state.detail,
            "area": this.state.area,
            "city": this.state.city,
            "default":0,
            "id": new Date().getTime()+parseInt(Math.random(),10),
            "postcode": this.state.code,
            "province": this.state.province,
            "telephone": this.state.phone,
            "updatedAt": "",
            "user_id": APPID,
            "username": this.state.name
        };
        //console.log(this.props)
        if(this.props.address_id){
            this.updateUserAddress(data)
        }else{
            this.props.createUserAddress(data)
        }

    }

    trigger(){
        this.setState({
            areaShow:!this.state.areaShow
        })
    }
    render() {
        //const { getFieldProps } = this.props.form;
        return (
            <div>
                <div style={{marginTop:"50px"}}>
                    <List renderHeader={''} >
                        <InputItem
                            placeholder="姓名"
                            value={this.state.name}
                            onChange={(e)=>{this.nameChange(e)}}
                        >收货人</InputItem>
                        <div style={{marginTop:"15px"}}> </div>
                        <InputItem
                            type="phone"
                            placeholder="手机号码"
                            value={this.state.phone}
                            onChange={(e)=>{this.phoneChange(e)}}
                        >手机号码</InputItem>
                        <div style={{marginTop:"15px"}}> </div>

                        <div className='pickerWrap' style={this.state.areaShow ? {}:{display:""}}>
                            <List style={{ backgroundColor: 'white' }} className="picker-list">
                                <Picker extra={this.state.province+this.state.city+this.state.area}
                                        data={district}
                                        title="Areas"
                                        onOk={e => console.log('ok', e)}
                                        onDismiss={e => this.areaChange(e)}
                                        onPickerChange={e=> this.areaChange(e)}
                                        indicatorStyle={{position:"absolute",bottom:"0",left:"0"}}
                                >
                                    <List.Item arrow="horizontal">点击选择地区</List.Item>
                                </Picker>
                            </List>
                        </div>
                        <div style={{marginTop:"15px"}}> </div>
                        <InputItem
                            placeholder="详细地址"
                            value={this.state.detail}
                            onChange={(e)=>{this.detailChange(e)}}
                        >详细地址</InputItem>
                        <div style={{marginTop:"15px"}}> </div>
                        <InputItem
                            type="number"
                            placeholder="邮编"
                            value={this.state.code}
                            maxLength={6}
                            onChange={(e)=>{this.codeChange(e)}}
                        >邮编</InputItem>
                    </List>

                    <div style={{width:'100%',display:'flex',justifyContent:'center'}}><div style={{width:'256px'}}><Button type="primary" onClick={this.submit}>提交</Button></div></div>
                </div>
            </div>
        )
    }
}
