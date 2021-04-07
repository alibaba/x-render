import React from 'react';
import './ErrorMessage.css';
import { translateMessage } from '../../utils';

const ErrorMessage = ({ message, schema }) => {
  let msg = '';
  if (typeof message === 'string') msg = message;
  if (Array.isArray(message)) {
    msg = message[0] || '';
  }

  msg = translateMessage(msg, schema);

  return <div className="error-message">{msg}</div>;
};

export default ErrorMessage;
