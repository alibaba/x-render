import React from 'react';

export const getLabel = (title: string, description: string) => {
  return (
    <>
      {title}
      {description && (
        <span>
          ({description})
        </span>
      )}
    </>
  );
};

export const getColSpan = (column: number, schema: any) => {
  let span = 24;

  if (column) {
    span = 24 / column;
  }

  // 兼容 1.0 逻辑
  if (schema.width) {
    if (schema.width === '100%') {
      span = 24;
    } else if (schema.width === '50%') {
      span = 12;
    } else if (schema.width === '20%') {
      span = 5;
    } else if (schema.width < '50%') {
      span = 8;
    }
  }

  if (schema.cellSpan) {
    span = schema.cellSpan * span;
  }

  if (schema.span) {
    span = schema.span;
  }

  return span;
};