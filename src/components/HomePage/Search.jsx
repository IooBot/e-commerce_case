import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';

class Search extends Component {
  constructor(props){
    super(props)
    this.state={
      value:''
    }
  }
  componentDidMount() {
    //this.autoFocusInst.focus();
    //console.log(this.props.getProductByName)
  }
  onChange= (value) => {
    this.setState({ value });
    //console.log(value)
  };
  clear = () => {
    this.setState({ value: '' });
    //console.log('cancel')
  };
  handleClick = () => {
    this.manualFocusInst.focus();
  }
  render() {
    return (<div>
      <SearchBar
        value={this.state.value}
        placeholder="请输入要搜索的商品名"
        onSubmit={value => this.props.getProductByName({name:value})}
        onClear={value => console.log(value, 'onClear')}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onCancel={() => {this.props.getProductByName({}) ;this.clear();console.log('onconcel')}}
        showCancelButton
        onChange={this.onChange}
      />
    </div>);
  }
}

export default Search
