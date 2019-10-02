import React from 'react';
import PropTypes from 'prop-types';

import { Upload, Icon, Modal } from 'antd';

class Image extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    type: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    data: {},
    type: 'single',
    onChange: () => {},
  };

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: this.props.data.value,
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList, file }) => {
    const { type } = this.props;
    const isSingle = type === 'single';
    const flies = isSingle ? [file] : fileList;
    // todo 多图处理,还有图片上传服务
    this.props.onChange(flies[0].thumbUrl);
    this.setState({ fileList: flies });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;

    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default Image;
