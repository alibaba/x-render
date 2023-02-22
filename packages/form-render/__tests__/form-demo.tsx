import * as React from 'react';
import { useState } from 'react';
import FormRender, { useForm } from '../src/index';

const schema = {
  type: 'object',
  properties: {
    input1: {
      type: 'object',
      properties: {
        test: {
          title: '简单输入框',
          type: 'string',
        },
      },
    },
    select1: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
    },
  },
};

const SimpleForm = () => {
  const form = useForm();
  const [state, setState] = useState();
  const setRes = data => {
    let res;
    if (typeof data === 'object') {
      res = JSON.stringify(data);
    }
    res = (res || data) + '';
    setState(res);
  };

  const handleIsFieldTouched = () => {
    const res = form.isFieldTouched('input1.test');
    setRes(res);
  };

  const handleIsFieldsTouched = () => {
    const res = form.isFieldsTouched(['input1.test', 'select1'], true);
    setRes(res);
  };

  const handleIsFieldValidating = () => {
    const res = form.isFieldValidating('select1');
    setRes(res);
  };

  const handleSetFields = () => {
    form.setFields([
      {
        name: 'input1.test',
        touched: true,
        error: ['set input1.test error'],
        value: 'input1.test value',
      },
      {
        name: 'select1',
        validating: true,
        value: 'select1 value',
      },
    ]);
  };

  const handleGetFieldError = () => {
    const res = form.getFieldError('input1.test');
    setRes(res);
  };

  const handleValidateFields = () => {
    form.validateFields().then(data => {
      // data:
      // {
      //     input1: {
      //     test: 'input1.test value',
      //     },
      //     select1: 'select1 value,
      // }
      setRes(data);
    });
  };

  const handleGetValues = () => {
    const res = form.getValues(['input1.test', 'select1'], ({ touched }) => {
      return touched;
    });
    setRes(res);
  };

  return (
    <div>
      <FormRender form={form} schema={schema} />
      <div data-testid="fieldTouched" onClick={handleIsFieldTouched}></div>
      <div data-testid="fieldsTouched" onClick={handleIsFieldsTouched}></div>
      <div
        data-testid="fieldValidating"
        onClick={handleIsFieldValidating}
      ></div>
      <div data-testid="setFields" onClick={handleSetFields}></div>
      <div data-testid="getFieldError" onClick={handleGetFieldError}></div>
      <div data-testid="getValues" onClick={handleGetValues}></div>
      <div data-testid="validateFields" onClick={handleValidateFields}></div>
      <div data-testid="result">{state}</div>
    </div>
  );
};

export default SimpleForm;
