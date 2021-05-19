import React from 'react';
import { useTable } from './hooks';
import {
  Skeleton,
  Typography,
  Radio,
  Card,
  Empty,
  Pagination,
  Row,
  Col,
} from 'antd';
import './card.css';

import ErrorBoundary from './components/ErrorBoundary';

const { Meta } = Card;

const CardList = props => {
  if (props.dataSource) {
    console.error(
      '设置table-render的数据请使用searchApi，具体使用可参考：https://form-render.github.io/table-render/guide/demo#%E5%9F%BA%E6%9C%AC-demo'
    );
  }
  const { tableState, setTable, doSearch }: any = useTable();
  const { dataSource, pagination, loading, searchApi } = tableState;

  const onPageChange = (page, pageSize) => {
    setTable({ pagination: { ...pagination, current: page, pageSize } });
    doSearch({ current: page, pageSize });
  };

  const {
    headerTitle,
    toolbarRender,
    paginationOptions,
    onCardClick = () => {},
    cardRender,
    cardStyle = {},
    cardClassName = '',
  } = props;

  if (!cardRender) {
    console.error('请根据文档填入正确的cardRender');
  }

  const { type, style, cover, header, content, footer } = cardRender;

  const toolbarArray =
    typeof toolbarRender === 'function' ? toolbarRender() : [];
  const showTableTop = headerTitle || toolbarRender || Array.isArray(searchApi);
  return (
    <ErrorBoundary>
      <div className="tr-table-wrapper">
        {
          <div
            className={showTableTop ? 'tr-table-top' : 'tr-table-top-nohead'}
          >
            <div className="tr-table-title">
              <TableTitle title={headerTitle} />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              {Array.isArray(toolbarArray)
                ? toolbarArray.map((ui, idx) => {
                    return (
                      <div key={idx.toString()} style={{ marginLeft: 8 }}>
                        {ui}
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        }
        {dataSource.length ? (
          <div className="card-list">
            {/* <Row gutter={16} style={{ width: '100%' }}> */}
            {dataSource.map((card, index) => (
              <Col key={index.toString()} span={6} className="card-render">
                <Card
                  hoverable={props.hoverable || true}
                  // bodyStyle={{ padding: 12 }}
                  onClick={e => {
                    e.stopPropagation();
                    onCardClick(card, index);
                  }}
                  extra={
                    !cover
                      ? header && header.extra && header.extra(card, index)
                      : null
                  }
                  actions={footer && footer(card, index)}
                  cover={cover && renderCover(cover, card)}
                  style={cardStyle}
                  className={cardClassName}
                >
                  <Meta
                    title={
                      header &&
                      header.title &&
                      headerRender(header.title, card, index)
                    }
                    description={
                      (content &&
                        content.description &&
                        descriptionRender(
                          content.description,
                          card,
                          index
                        )) || <div style={{ height: 22 }} />
                    }
                  />
                  {content && content.list && renderList(card, content.list)}
                  {content && content.remark && (
                    <Typography.Paragraph
                      style={{
                        color: 'rgb(102, 102, 102)',
                        marginTop: '8px',
                        fontSize: 12,
                      }}
                      ellipsis={{ rows: 1 }}
                    >
                      {card[content.remark.dataIndex || content.remark]}
                    </Typography.Paragraph>
                  )}
                </Card>
              </Col>
            ))}
            {/* </Row> */}
          </div>
        ) : (
          <Empty />
        )}
        {!paginationOptions.hidden && (
          <Pagination
            size={paginationOptions.size || 'default'}
            style={{ textAlign: 'right', padding: '16px 0' }}
            pageSize={pagination.pageSize}
            total={pagination.total}
            current={pagination.current}
            onChange={onPageChange}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default CardList;

// content渲染逻辑
const renderList = (card, content) => {
  return content.map((item, idx) => {
    if (item.render && typeof item.render === 'function') {
      return (
        <div key={idx.toString()} style={{ marginTop: 4 }}>
          <Row gutter={6}>
            <Col>
              <span>{item.title}</span>:
            </Col>
            <Col>
              <span>{item.render(card, idx)}</span>
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div key={idx.toString()} style={{ marginTop: 4 }}>
        <Row gutter={6}>
          {item.title && (
            <Col>
              <span>{item.title}</span>:
            </Col>
          )}
          <Col>
            <span>
              {typeof item === 'string' ? card[item] : card[item.dataIndex]}
            </span>
          </Col>
        </Row>
      </div>
    );
  });
};

// 封面渲染逻辑
const renderCover = (cover, card): React.ReactNode => {
  if (typeof cover === 'string') return <img src={card[cover]} />;
  return (
    <img
      style={{ width: cover.width, height: cover.height }}
      src={card[cover.dataIndex]}
    />
  );
};

// header渲染逻辑
const headerRender = (title, card, index) => {
  if (typeof title === 'function') {
    return title(card, index);
  }
  return card[title.dataIndex || title];
};
// descript渲染逻辑
const descriptionRender = (desc, card, index) => {
  if (typeof desc === 'function') {
    return desc(card, index);
  }
  return card[desc.dataIndex || desc];
};

const TableTitle = ({ title }) => {
  const { tableState, setTable, doSearch }: any = useTable();
  const { tab, searchApi } = tableState;
  const _tab = tab || 0;
  const onTabChange = e => {
    const _tab = e.target.value;
    setTable({ tab: _tab });
    doSearch({ tab: _tab });
  };

  if (typeof searchApi === 'function')
    return <div className="tr-single-tab">{title}</div>;
  if (searchApi && Array.isArray(searchApi)) {
    if (searchApi.length === 1)
      return <div className="tr-single-tab">{searchApi[0].name}</div>;
    return (
      <Radio.Group onChange={onTabChange} value={_tab}>
        {searchApi.map((item, i) => {
          return (
            <Radio.Button key={i.toString()} value={i}>
              {item.name}
            </Radio.Button>
          );
        })}
      </Radio.Group>
    );
  }
  return <div className="tr-single-tab" />; // 给一个空的占位
};
