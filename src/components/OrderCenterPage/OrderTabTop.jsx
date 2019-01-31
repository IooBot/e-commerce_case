import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';

class TabBarTop extends Component {
    render() {
      //console.log('this.state.products',this.state.products)
      return (
        <div>
            <Tabs  onChange={e=>this.props.tabChange(e)} tabs={this.props.tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}>
            </Tabs>
        </div>
      );
    }
  }

  export default TabBarTop