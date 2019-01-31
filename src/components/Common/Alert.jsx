import React from 'react'
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';

const alert = Modal.alert;

export const dialog =(type,message)=>{
    return new Promise((resolve,reject)=>{
        alert(type, message, [
            { text: '取消', onPress: () => {reject.call(null,0)}},
            { text: '确认', onPress: () => {resolve.call(null,1)} },
          ])
    })
}


