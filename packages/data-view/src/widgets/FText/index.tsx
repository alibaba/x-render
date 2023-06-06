import React, { isValidElement, CSSProperties } from 'react';

import { transformData, combineClass, transDataKeyToData } from '../utils/common';
import createIconFont from '../utils/createIconFont';
import { renderText } from '../components/TextView';
import InnerHtml from '../components/InnerHtml';
import './index.less';

interface IProps {
  className: string;
  style: CSSProperties;
  dataKey: string; // 数据 key
  data: any; // 数据
  defaultValue: any; // 默认值
  leftText: string; // 左文案
  rightText: string; // 右文案
  leftTextStyle: CSSProperties; // 左文案样式
  rightTextStyle: CSSProperties; // 右文案样式
  childSchema: any; // 子协议
  render: string; // 自定义渲染函数名
  showKey: string | ((a: any, b: any) => boolean); // 根据 showKey 获取显示结果，ture 显示、false 不显示
  showLevel: number; // 控制显示等级
  format: any; // 数据格式化配置
  iconSetting: any; // 图标配置
  useType: string; // 使用方式，区别是否被其他组件调用，如果是，需要自行格式化数据
  addons: any; // data-view 插件总控
  [key: string]: any;
}

/**
 *
 * 文本组件
 */
const FText = (props: IProps) => {
  const {
    className,
    style,
    data,
    leftText,
    rightText,
    leftTextStyle,
    rightTextStyle,
    useType,
    childSchema,
    render,
    format,
    iconSetting,
    addons,
  } = props;

  const parentData = addons.getParentData();

  let value = data;

  // 布尔值特殊处理一下
  if (typeof value === 'boolean') {
    value = value + '';
  }

  // 被其他组件调用
  if (useType === 'internal') {
    // 数据进行格式化
    if (['html'].includes(format?.type)) {
      value = <InnerHtml data={value} />;
    } else {
      value = transformData(value, format, parentData, addons);
    }
  }

  // 自定义渲染：配置外置 render 方法
  if (render && typeof render === 'string') {
    const renderFunc = addons.getMethod(render);
    return renderFunc(value, props, parentData) || null;
  }

  // 协议渲染：支持协议嵌套渲染子内容
  if (childSchema) {
    let schema = childSchema;
    // 协议结构化：在协议简写时需要转换
    if (typeof childSchema === 'string') {
      schema = { widget: childSchema };
    }
    return addons.renderer({ schema, data: value, addons });
  }

  // 异常处理，这样的数据不符合渲染规则，不渲染
  if (typeof value === 'object' && !isValidElement(value)) {
    return null;
  }

  let ellipsisStyle: any = {};
  if (props.ellipsis && style?.width) {
    ellipsisStyle = { width: 0, flex: 1 };
  }
  if (style?.color || style?.fontSize) {
    ellipsisStyle.color = style.color;
    ellipsisStyle.fontSize = style.fontSize;
  }

  // 支持文本复制、省略功能
  value = renderText(value, props, ellipsisStyle);

  const content = (
    <>
      {leftText && (
        <span className="content-left-text" style={leftTextStyle}>
          {leftText}
        </span>
      )}
      {value}
      {rightText && (
        <span className="content-right-text" style={rightTextStyle}>
          {rightText}
        </span>
      )}
    </>
  );

  // 组件被其他组件调用，直接返回
  if (useType === 'internal') {
    return content;
  }

  const handleIconClick = (ev: any) => {
    transDataKeyToData(iconSetting, { data: parentData, addons });
    if (iconSetting.href) {
      if (iconSetting.target === '_self') {
        window.location.href = iconSetting.href;
      } else {
        window.open(iconSetting.href);
      }
      return;
    }
    // 传人外置方法，实现按钮点击事件
    const func = addons.getMethod(iconSetting?.method?.name || iconSetting?.method);
    func({ dataKey: props.dataKey, method: iconSetting.method, data: parentData }, ev);
  };

  const Icon = createIconFont(addons.getConfig().iconFontUrl);
  const isClick = !!iconSetting?.href || !!iconSetting?.method;
  const iconContent = (
    <Icon
      type={iconSetting?.type}
      style={{ cursor: isClick ? 'pointer' : 'auto', ...iconSetting?.style }}
      onClick={handleIconClick}
    />
  );

  return (
    <div className={combineClass('dv-text', className)} style={style}>
      {iconSetting?.direct === 'left' && <span className="left-icon">{iconContent}</span>}
      {content}
      {iconSetting?.direct !== 'left' && <span className="right-icon">{iconContent}</span>}
    </div>
  );
};

export default FText;
