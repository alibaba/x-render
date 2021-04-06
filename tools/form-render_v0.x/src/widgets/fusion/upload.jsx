import React from 'react';
import { Icon, Upload, Message, Button } from '@alifd/next';

export default function upload(p) {
  const props = {
    name: 'file',
    listType: 'text',
    action: p.action || (p.options && p.options.action),
    enctype: 'multipart/form-data',
    withCredentials: true,
    type: 'file',
    onChange(res) {
      const info = res[0];
      if (info && info.response && info.response.status === 'done') {
        Message.success(`${info.name} 上传成功`);
        p.onChange(p.name, info.response.url);
      } else if (info && info.response && info.response.status === 'error') {
        Message.error(`${info.file.name} 上传失败`);
      }
    },
    onRemove() {
      p.onChange(p.name, '');
    },
  };

  return (
    <div className="fr-upload-mod">
      <Upload {...props} className="fr-upload-file">
        <Button>
          <Icon type="upload" /> 上传
        </Button>
      </Upload>
      {p.value && (
        <a
          href={p.value}
          target="_blank"
          rel="noopener noreferrer"
          className="fr-upload-preview"
        >
          地址查看
        </a>
      )}
    </div>
  );
}
