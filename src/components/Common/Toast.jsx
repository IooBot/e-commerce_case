//封装Toast
import React, { Component } from 'react'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';


export const successToast=(message,time)=> {
  Toast.success(message, time);
}
export const failToast=(message,time)=> {
  Toast.fail(message, time);
}
