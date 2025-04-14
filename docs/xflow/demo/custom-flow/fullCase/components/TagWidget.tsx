import React from 'react';
import { Tag, Popover, Typography, Space } from 'antd';
import '../index.less';

const { Text } = Typography;

interface TagItem {
  name: string;
  code: string;
  description: string;
}

interface TagWidgetProps {
  tags?: TagItem[];
  style?: React.CSSProperties;
  className?: string;
}

const getTagData = (data: any, values: any) => {
  const tagData =
    (values || [])
      ?.map((val) => data?.tagData?.find((item) => item.code === val))
      .filter(Boolean) || [];
  return tagData;
};

const TagWidget: React.FC<TagWidgetProps> = ({ data }) => {
  const dataKeys = Object.keys(data);
  const nodeType = dataKeys?.includes('firstScene')
    ? 'firstScene'
    : 'secondScene';
  const firstSceneData = data?.displayName
    ? [
        {
          name: data.displayName,
          code: data.firstMeasure,
          description: data.description,
          color: 'blue',
        },
      ]
    : getTagData(data, [data?.firstMeasure] || []);
  const nodeData =
    nodeType === 'firstScene'
      ? firstSceneData
      : data?.tagWidgetData || getTagData(data, data?.secondMeasures || []);

  const renderContent = (tag: TagItem) => (
    <Space direction="vertical" size="small" style={{ padding: '8px' }}>
      <div>
        <Text strong style={{ fontSize: '12px' }}>
          指标名称:
        </Text>{' '}
        {tag.name}
      </div>
      <div>
        <Text strong style={{ fontSize: '12px' }}>
          指标代码:
        </Text>{' '}
        {tag.code}
      </div>
      <div>
        <Text strong style={{ fontSize: '12px' }}>
          指标描述:
        </Text>{' '}
        {tag.description}
      </div>
    </Space>
  );

  return (
    <div>
      {Boolean(data?.firstScene || data?.secondScene) && (
        <div style={{ marginBottom: '8px' }}>
          <Text strong style={{ fontSize: '12px' }}>
            分类：
          </Text>
          <Text style={{ color: '#1890ff' }}>
            {nodeType === 'firstScene' ? data?.firstScene : data?.secondScene}
          </Text>
        </div>
      )}
      <Space size="small" style={{ width: '100%' }} wrap>
        {(nodeData || []).map((tag: any, index: number) => (
          <Popover
            key={index}
            content={renderContent(tag)}
            trigger="hover"
            getPopupContainer={() =>
              document.getElementById('xflow-container') as HTMLElement
            }
            overlayClassName="tag-popover"
          >
            <Tag color={tag.color} key={index}>
              {tag.name}
            </Tag>
          </Popover>
        ))}
      </Space>
    </div>
  );
};

export default TagWidget;
