import React from 'react';
import { Card, Typography, Space, Tag } from 'antd';

const { Text } = Typography;

interface DetailLogWidgetProps {
  data: any;
  logList: any[];
  currentStatus: string;
  logPanel: any;
}

const DetailLogWidget: React.FC<DetailLogWidgetProps> = ({
  data,
  logList,
  currentStatus,
  logPanel
}) => {
  return (
    <Card size="small" title="自定义组件部分" style={{ marginTop: 16 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Text type="secondary">当前节点状态: </Text>
          <Tag color={currentStatus === 'success' ? 'green' : 'orange'}>
            {currentStatus}
          </Tag>
        </div>

        <div>
          <Text type="secondary">节点ID: </Text>
          <Text>{data.nodeId}</Text>
        </div>

        {data.statusPanel?.extra && (
          <div>
            <Text type="secondary">额外信息: </Text>
            <Text>{data.statusPanel.extra}</Text>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default DetailLogWidget;
