import React from 'react';
import { translateMessage } from '../../utils';
import './ErrorMessage.less';

const ErrorMessage = ({ message, schema, softHidden, hardHidden }) => {
  let msg = '';
  if (typeof message === 'string') msg = message;
  if (Array.isArray(message)) {
    msg = message[0] || '';
  }

  msg = translateMessage(msg, schema);

  // 无错误信息不渲染 msg 元素占位，表单之间的间隔通过 field-block 元素分隔
  if (!msg) return null;

  if (hardHidden) return <div className={`error-message`}></div>;

  return !msg && softHidden ? null : (
    <div className={`error-message`}>{msg}</div>
  );
};

export default ErrorMessage;
