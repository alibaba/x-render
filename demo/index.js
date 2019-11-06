import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GithubCorner from 'react-github-corner';
import Demo from './main';
import { Radio, Select, Switch, Collapse } from 'antd';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const { Panel } = Collapse;
// constant
const themeList = [
  { label: 'antd主题', value: 'antd' },
  { label: 'fusion主题', value: 'fusion' },
];
const FRadio = props => <Radio {...props} style={{ marginBottom: 12 }} />;

class Root extends Component {
  state = {
    schemaName: 'default',
    theme: 'antd',
    column: 1,
    displayType: 'column',
    showDescIcon: false,
  };

  onThemeChange = e => {
    this.setState({
      theme: e.target.value,
    });
  };

  onColumnNumberChange = value => {
    this.setState({
      column: value,
    });
  };

  onDisplayChange = value => {
    this.setState({
      displayType: value,
      showDescIcon: value === 'row',
    });
  };

  onShowDescChange = value => {
    this.setState({
      showDescIcon: value,
    });
  };

  onSchemaChange = e => {
    this.setState({ schemaName: e.target.value });
  };

  render() {
    const { showDescIcon } = this.state;
    return (
      <div className="vh-100 overflow-auto flex flex-column">
        <GithubCorner
          href="https://alibaba.github.io/form-render/"
          bannerColor="#F6C14F"
          className="absolute top-0 right-0 z-999"
        />
        <Collapse defaultActiveKey={['1']} onChange={() => {}}>
          <Panel header={<div className="b f3">FormRender</div>} key="1">
            <div className="w-100 flex items-center">
              <div className="w-50">
                <Radio.Group
                  name="schemaName"
                  defaultValue="simplest"
                  className="flex flex-wrap"
                  style={{ height: 20 }}
                  onChange={this.onSchemaChange}
                >
                  <FRadio value="simplest">最简样例</FRadio>
                  <FRadio value="basic">基础控件</FRadio>
                  <FRadio value="input">个性输入框</FRadio>
                  <FRadio value="select">个性选择框</FRadio>
                  <FRadio value="date">日期</FRadio>
                  <FRadio value="new-feature">新功能</FRadio>
                  <FRadio value="demo">完整例子</FRadio>
                </Radio.Group>
              </div>
              <div className="w-50 flex items-center justify-end z-999">
                <RadioGroup
                  options={themeList}
                  value={this.state.theme}
                  onChange={this.onThemeChange}
                />
                <Select
                  style={{ marginRight: 12 }}
                  onChange={this.onColumnNumberChange}
                  defaultValue="1"
                >
                  <Option value="1">一行一列</Option>
                  <Option value="2">一行二列</Option>
                  <Option value="3">一行三列</Option>
                </Select>
                <Select
                  style={{ marginRight: 12 }}
                  onChange={this.onDisplayChange}
                  defaultValue="column"
                >
                  <Option value="column">上下排列</Option>
                  <Option value="row">左右排列</Option>
                </Select>
                <Switch
                  className="mr2"
                  checkedChildren="关描述"
                  onChange={this.onShowDescChange}
                  unCheckedChildren="开描述"
                  checked={showDescIcon}
                />
              </div>
            </div>
          </Panel>
        </Collapse>
        <Demo {...this.state} />
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('__render_content_'));
