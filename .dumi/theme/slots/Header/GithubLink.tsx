import React from 'react';
import { Button, Tooltip } from 'antd';

import { GithubFilled } from '@ant-design/icons';

const GithubLink: React.FC = () => {
  return (
    <Tooltip title="Github" placement="bottom">
      <Button
        href="https://github.com/alibaba/x-render"
        target="_blank"
        rel="noreferrer"
        icon={<GithubFilled style={{ fontSize: 16 }} />}
        type="text"
      />
    </Tooltip>
  );
};

export default GithubLink;
