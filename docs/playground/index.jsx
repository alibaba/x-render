import { Radio, Select, Slider, Switch } from 'antd';
import React, { Component } from 'react';
import './index.css';
// import GithubCorner from 'react-github-corner';
import Demo from './main';

const Option = Select.Option;
class Root extends Component {
  state = {
    schemaName: 'simplest',
    column: 1,
    displayType: 'column',
    readOnly: false,
    labelWidth: 110,
  };

  onColumnNumberChange = value => {
    this.setState({ column: value });
  };

  onDisplayChange = value => {
    this.setState({
      displayType: value,
      showDescIcon: value === 'row',
    });
  };

  onReadOnlyChange = value => this.setState({ readOnly: value });

  onSchemaChange = e => {
    this.setState({ schemaName: e.target.value });
  };

  onLabelWidthChange = value => {
    this.setState({ labelWidth: value });
  };

  render() {
    const { showDescIcon, readOnly, labelWidth } = this.state;
    return (
      <div className="fr-playground">
        {/* <GithubCorner
          href="https://github.com/alibaba/form-render"
          bannerColor="#F6C14F"
          className="absolute top-0 right-0 z-999"
        /> */}
        {/* <a href="/" className="f6 absolute top-1 right-1 z-999">
          回主页
        </a> */}
        <div className="w-100 flex setting-container">
          <Radio.Group
            name="schemaName"
            defaultValue="simplest"
            className="w-50 flex items-center flex-wrap z-999"
            onChange={this.onSchemaChange}
          >
            <Radio value="simplest">最简样例</Radio>
            <Radio value="basic">基础控件</Radio>
            <Radio value="format">校验</Radio>
            <Radio value="dynamic-function">动态函数</Radio>
            <Radio value="new-feature">新功能</Radio>
            <Radio value="function">复杂联动</Radio>
            <Radio value="input">个性输入框</Radio>
            <Radio value="select">个性选择框</Radio>
            <Radio value="demo">完整例子</Radio>
          </Radio.Group>
          <div className="w-50 flex items-center flex-wrap z-999">
            <Select
              style={{ marginRight: 8, marginLeft: 24 }}
              onChange={this.onColumnNumberChange}
              defaultValue="1"
            >
              <Option value="1">一行一列</Option>
              <Option value="2">一行二列</Option>
              <Option value="3">一行三列</Option>
            </Select>
            <Select
              style={{ marginRight: 8 }}
              onChange={this.onDisplayChange}
              defaultValue="column"
            >
              <Option value="column">上下排列</Option>
              <Option value="row">左右排列</Option>
            </Select>
            <Switch
              style={{ marginRight: 8 }}
              checkedChildren="编辑"
              onChange={this.onReadOnlyChange}
              unCheckedChildren="只读"
              checked={readOnly}
            />
            <div style={{ width: 70 }}>标签宽度：</div>
            <Slider
              style={{ width: 80 }}
              max={200}
              min={20}
              value={labelWidth}
              onChange={this.onLabelWidthChange}
            />
          </div>
        </div>
        <Demo {...this.state} />
      </div>
    );
  }
}

export default Root;
