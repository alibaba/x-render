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

  if (hardHidden) return <div className={`error-message`}></div>;

  return !msg && softHidden ? null : (
    <div className={`error-message`}>{msg}</div>
  );
};

export default ErrorMessage;
