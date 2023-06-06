import React from 'react';
import { Descriptions, Tooltip } from 'antd';
import { isFunction } from 'lodash-es';

import isHidden from '../../models/isHidden';
import createIconFont from '../utils/createIconFont';
import { getValueFromKey, combineClass, startsWith } from '../utils/common';
import InnerHtml from '../components/InnerHtml';
import ReactNode from '../components/ReactNode';
import FText from '../FText';

import './index.less';

const { Item: DescriptionItem } = Descriptions;
const WIDGETNAME = 'dv-descriptions';
export interface IProps {
  /**
   * @description 描述项
   * @default []
   * @type [{ DescriptionItem }]
   */
  items: any[];

  /**
   * @description 描述列表的标题
   * @default -
   * @type 1. 支持字符串；2. 支持嵌套协议 { widget: '组件名' }； 3.支持自定义 'render:函数名称'
   */
  title: any;

  /**
   * @description 描述列表样式
   * @default -
   * @type 配置 { backgroundColor: '背景颜色'， padding: '内边距', margin: '外边距' }
   */
  style?: any;

  /**
   * @description 标签样式
   * @default -
   * @type 标签右对齐： 配置 { width: '标签宽度' } // 取标签中最长宽度
   */
  labelStyle?: any;

  /**
   * @description 描述项显示级别
   * @default 1
   * @type 1 ｜ 2；描述项无数据时，1:描述项不显示，2:描述项内容区域不显示
   */
  itemShowLevel?: 0 | 1 | 2 | 3 | 4;
  [key: string]: any;
}





/**
 * 描述列表
 */
const FDescriptions = (props: IProps) => {
  const {
    data,
    items: _items,
    className,
    itemStyle,
    labelStyle,
    contentStyle,
    itemShowLevel,
    title,
    extra,
    storeMethod,
    getParentData,
    ...otherProps
  } = props;

  const renderItemLabel = (item: any) => {
    let { label, subLabel, labelToolTip } = item;

    // 如果 label 是函数，直接执行
    if (isFunction(label)) {
      return label(item, data);
    }

    // 通过自定义方法渲染
    if (typeof label === 'string' && label.includes('render:')) {
      const [_, funcName] = label.split('render:');
      const renderFunc = storeMethod.getMethod(funcName);
      return renderFunc(item, data);
    }

    // 通过动态数据获取
    if (startsWith(label, 'source:')) {
      label = getValueFromKey({ data: storeMethod.getSourceData(), path: label, storeMethod });
    }

    if (startsWith(label, 'data:')) {
      const path = label.split('data:')[1]?.trim();
      label = getValueFromKey({ data, path, storeMethod });
    }

    // 不存在 lable 提示，直接返回 label
    if (!labelToolTip) {
      return (
        <>
          <span>{label}</span>
          {subLabel && <div className="item-sub-label">{subLabel}</div>}
        </>
      );
    }

    // 存在 lable 提示，进行聚合
    let { icon, title, ...tooltipProps } = labelToolTip || {};
    const { overlayInnerStyle, ...otherTooltipProps } = tooltipProps || {};
    const Icon = createIconFont(storeMethod.getConfig().iconFontUrl);

    // 通过动态数据获取
    if (startsWith(title, 'source:')) {
      title = getValueFromKey({ data: storeMethod.getSourceData(), path: title, storeMethod });
    }

    if (startsWith(label, 'data:')) {
      const path = label.split('data:')[1]?.trim();
      title = getValueFromKey({ data, path, storeMethod });
    }

    return (
      <>
        <span className="item-label-box">
          {label}
          {labelToolTip && (
            <Tooltip
              color="#fff"
              overlayInnerStyle={{ color: 'black', ...overlayInnerStyle }}
              {...otherTooltipProps}
              title={<InnerHtml data={title} />}
            >
              <Icon
                type={icon?.type || 'icon-wenhao'}
                className="item-label-icon"
                style={{ ...icon?.style }}
              />
            </Tooltip>
          )}
        </span>
        {subLabel && <div className="item-sub-label">{subLabel}</div>}
      </>
    );
  };


  const items = _items.map((item: any) => {
    const {
      defaultValue = '',
      dataKey,
      showKey,
      showLevel
    } = item || {};

    // 获取数据
    let value = dataKey ? getValueFromKey({ data, path: dataKey, defaultValue, storeMethod }) : data;

    const level = showLevel ?? itemShowLevel;
    // 如果描述项没有数据（包含 0），则描述项不显示
    if (level === 1 && (!value || value === '0')) {
      return null;
    }

    // 如果描述项没有数据（不包含 0），则示描述项不显
    if (level === 2 && !value && value !== 0) {
      return null;
    }

    // 受其他数据控制，检查是否需要显示
    if (showKey) {
      if (typeof showKey === 'function') {
        // 如果是函数，直接执行
        if (!showKey(data, storeMethod.getSourceData())) {
          return null;
        }
      } else if (showKey.includes('func:')) {
        // 如果是通过协议声明的函数，获取函数并执行
        const [_, funcName] = showKey.split('func:');
        const showFunc = storeMethod.getMethod(funcName);
        if (!showFunc(data, storeMethod.getSourceData())) {
          return null;
        }
      } else {
        // 函数表达式
        if (isHidden(showKey, data, storeMethod)) {
          return null;
        }
      }
    }

    return { ...item, _itemData: value };
  }).filter(item => item);


  let _column = props.column || 3

  return (
    <Descriptions
      className={combineClass(WIDGETNAME, className, {
        'dv-descriptions-hasbackgournd': otherProps?.style?.hasOwnProperty('backgroundColor'),
        'dv-descriptions-hasborder': !!otherProps?.bordered,
        'dv-descriptions-no-header': !(title || extra),
      })}
      size="small"
      {...otherProps}
      extra={<ReactNode schema={extra} data={data} storeMethod={storeMethod} />}
      title={<ReactNode schema={title} data={data} storeMethod={storeMethod} />}
    >
      {items.map((item, index) => {
        const {
          defaultValue = '',
          dataKey,
          showKey,
          showLevel,
          showContentKey,
          leftTextKey,
          rightTextKey,
          children: itemChildSchema,
          _itemData,
          span: _span,
          ...itemProps
        } = item || {};

  
        const level = showLevel ?? itemShowLevel;
        const leveMap: any = { 3: 1, 4: 2 };

        if (leftTextKey) {
          itemProps.leftText = getValueFromKey({ data, path: leftTextKey, storeMethod });
        }

        if (rightTextKey) {
          itemProps.rightText = getValueFromKey({ data, path: rightTextKey, storeMethod });
        }

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
            label={renderItemLabel(item)}
            span={span}
            style={{ ...itemStyle, ...item.style }}
            contentStyle={{ ...contentStyle, ...item.contentStyle }}
            labelStyle={{ ...labelStyle, ...item.labelStyle }}
          >
            <FText
              {...itemProps}
              childSchema={itemChildSchema}
              useType='internal'
              showKey={showContentKey}
              showLevel={leveMap[level] || null}
              data={_itemData}
              getParentData={() => data}
              storeMethod={storeMethod}
            />
          </DescriptionItem>
        );
      })}
    </Descriptions>
  );
};

export default FDescriptions;
