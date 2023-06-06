import React from 'react';

// 处理表格 column
const detalColumn = (colmnMap: any, { addons, template, renderFRender, repeatIndex }: any) => {
  const column: any = {};

  for (const key of Object.keys(colmnMap || {})) {
    const value = colmnMap[key];
    const item = typeof value === 'string' ? { title: value } : { ...value };
    const {
      column: childColumn,
      children,
      dataEnum,
      leftUnit,
      rightUnit,
      style,
      ...otherItem
    } = item;
    const { render, notRender } = otherItem;

    if (typeof otherItem?.title === 'string' && otherItem?.title?.includes('{index}')) {
      otherItem.title = otherItem.title.replace('{index}', repeatIndex + 1);
    }

    // 对合并数据进行递归处理
    if (childColumn) {
      otherItem.column = detalColumn(childColumn, {
        addons,
        template,
        renderFRender,
        repeatIndex,
      });
    }

    if (dataEnum || style || leftUnit || rightUnit) {
      otherItem.render = (data: any) => {
        let result = data;

        // 当配置 dataEnum，根据 dataEnum 进行数据转换
        if (dataEnum) {
          result = dataEnum[result];
        }

        if (!result && result !== 0) {
          return '';
        }

        // 当配置 leftUnit | rightUnit，需要进行数据转换
        if (leftUnit) {
          result = `${leftUnit} ${result}`;
        }

        if (rightUnit) {
          result = `${result} ${rightUnit}`;
        }

        return <div style={style}>{result}</div>;
      };
    }

    // 直接字符串声明的需要转译一下
    if (typeof children === 'string') {
      otherItem.render = (data: any) => renderFRender(data, [{ widget: children }]);
    } else if (children) {
      otherItem.render = (data: any) => renderFRender(data, children);
    }

    // 表格 td 走 通用模版
    if (template && !render && !notRender) {
      otherItem.render = (data: any) => renderFRender(data, template);
    }

    // 配置外置 render 方法进行渲染
    if (render && typeof render === 'string') {
      const renderFunc = addons.getMethod(render);
      otherItem.render = (data: any, record: any, index: any) =>
        renderFunc(data, item, record, index);
    }

    column[key] = { ...otherItem };
  }

  return column;
};

export default detalColumn;
