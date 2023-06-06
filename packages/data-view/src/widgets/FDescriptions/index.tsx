import React from 'react';
import { Descriptions, Tooltip } from 'antd';
import { isFunction } from 'lodash-es';

import createIconFont from '../utils/createIconFont';
import { combineClass } from '../utils/common';
import InnerHtml from '../components/InnerHtml';
import ReactNode from '../components/ReactNode';
import './index.less';

const { Item: DescriptionItem } = Descriptions;
const WIDGETNAME = 'dv-descriptions';

const renderItemLabel = (item: any, data: any, storeMethod: any) => {
  const { label, subLabel, labelToolTip } = item;

  // 如果 label 是函数
  if (isFunction(label)) {
    return label(item, data);
  }

  // 如果 label 是字符串函数名
  if (typeof label === 'string' && label.includes('method:')) {
    const [_, funcName] = label.split('method:');
    const func = storeMethod.getMethod(funcName);
    return func(item, data);
  }

  // 不存在 lable 提示，直接返回 label
  if (!labelToolTip) {
    return (
      <>
        {label}
        {subLabel && <span className='item-sub-label'>({subLabel})</span>}
      </>
    );
  }

  // 存在 lable 提示，进行聚合
  let { icon, title, overlayInnerStyle, ...tooltipProps } = labelToolTip || {};
  const Icon = createIconFont(storeMethod.getConfig().iconFontUrl);

  return (
    <>
      <span className='item-label-box'>
        {label}
        {labelToolTip && (
          <Tooltip
            color='#fff'
            overlayInnerStyle={{ color: 'black', ...overlayInnerStyle }}
            title={<InnerHtml data={title} />}
            {...tooltipProps}
          >
            <Icon
              type={icon?.type || 'icon-wenhao'}
              className='item-label-icon'
              style={{ ...icon?.style }}
            />
          </Tooltip>
        )}
      </span>
      {subLabel && <div className='item-sub-label'>{subLabel}</div>}
    </>
  );
};

const getDescriptionItems = (items = [], { storeMethod, data, itemShowLevel }) => {
  return items.map((item: any) => {
    const { defaultValue = '', dataKey, showLevel, hidden } = item || {};
    const { getDataFromKey, getSourceData, getMethod } = storeMethod;
    
    const _itemData = getDataFromKey(dataKey, data, defaultValue);

    const level = showLevel ?? itemShowLevel;
    // 如果描述项没有数据（包含 0），则描述项不显示
    if (level === 1 && (!_itemData || _itemData === '0')) {
      return null;
    }

    // 如果描述项没有数据（不包含 0），则示描述项不显
    if (level === 2 && !_itemData && _itemData !== 0) {
      return null;
    }

    if (hidden && typeof hidden === 'boolean') {
      return null;
    }

    const sourceData = getSourceData();
    // 如果是函数
    if (typeof hidden === 'function' && hidden(data, sourceData)) {
      return null;
    }
    
    if (hidden?.includes('method:')) {
      // 如果是通过协议声明的函数，获取函数并执行
      const [_, funcName] = hidden.split('method:');
      const func = getMethod(funcName);
      if (func && func(data, sourceData)) {
        return null;
      }
    }

    return { ...item, _itemData };
  }).filter(item => item);
}


/**
 * 描述列表
 */
const FDescriptions = (props: any) => {
  const {
    data,
    className,
    itemStyle,
    labelStyle,
    contentStyle,
    itemShowLevel,
    title,
    extra,
    storeMethod,
    items: _items,
    ...restProps
  } = props;

  const items = getDescriptionItems(_items, { data, storeMethod, itemShowLevel });
  let _column = props.column || 3;
  
  return (
    <Descriptions
      className={combineClass(WIDGETNAME, className, {
        'dv-descriptions-hasbackgournd': restProps?.style?.hasOwnProperty('backgroundColor'),
        'dv-descriptions-hasborder': !!restProps?.bordered,
        'dv-descriptions-no-header': !(title || extra),
      })}
      size='small'
      {...restProps}
      extra={<ReactNode schema={extra} data={data} storeMethod={storeMethod} />}
      title={<ReactNode schema={title} data={data} storeMethod={storeMethod} />}
    >
      {items.map((item, index) => {
        const {
          showLevel,
          _itemData,
          span: _span,
          style: _itemStyle,
          labelStyle: _labelStyle,
          ...itemProps
        } = item || {};

        const level = showLevel ?? itemShowLevel;
        const leveMap: any = { 3: 1, 4: 2 };

        // 动态计算 span
        let span = _span;
        if (items[index+1]) {
          const nextSpan = items[index+1].span ?? 1;
          if (_span + nextSpan > _column) {
            span = _column;
            _column = props.column;
          } else {
            _column = _column -1;
          }
        }

        return (
          <DescriptionItem
            key={index}
            label={renderItemLabel(item, data, storeMethod)}
            span={span}
            style={{ ...itemStyle, ..._itemStyle }}
            labelStyle={{ ...labelStyle, ..._labelStyle }}
            contentStyle={{ ...contentStyle, ...item.contentStyle }}
          >
            {storeMethod.renderer({ 
              data,
              storeMethod,
              schema: {
                widget: 'FText',
                ...itemProps,
                useType: 'internal',
                showLevel: leveMap[level] || null,
              }
            })}
          </DescriptionItem>
        );
      })}
    </Descriptions>
  );
};

export default FDescriptions;
