import React from 'react'
import { ActivityIndicator } from 'antd-mobile';

export const Loading=(text,show)=>{
    return(<ActivityIndicator toast text={text} animating={show}/>)
}