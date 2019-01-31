import React, { Component } from 'react'
import { List } from 'antd-mobile';
const Item = List.Item;

export default class Lists extends Component {
  render() {
    return (
        <List >
            {
                this.props.icon ?
                <Item
                extra={this.props.extra}
                thumb={this.props.icon}
                arrow="horizontal"
                onClick={() => {this.props.callback()}}
                >{this.props.text}</Item>
                :
                <Item
                extra={this.props.extra}
                arrow="horizontal"
                onClick={() => {this.props.callback()}}
                >{this.props.text}</Item>
            }
        </List>
    )
  }
}






