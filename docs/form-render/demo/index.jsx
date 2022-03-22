import FormRender, { useForm } from 'form-render';
import React, { useState } from 'react';
import schema from './basic.js';
import Percent from './otherWidgets/Percent';
// import schema1 from './basic1.json';

// console.log(JSON.stringify(combineSchema(schema1.schema, schema1.uiSchema)));

const delay = ms => new Promise(res => setTimeout(res, ms));

// const Demo = () => {
//   const form = useForm()
//   return <App form={form} schema={schema} />;
// };

const PercentWidget = ({ value, onChange }) => {
  return <Percent onPress={onChange} percent={value} />;
};

const Demo = () => {
  const [display, setDisplay] = useState({}); // TODO: 只是开发时候用

  const form = useForm();

  const onFinish = (formData, errorFields) => {
    console.group('onFinish');
    console.log('formData:', formData);
    console.log('errors:', errorFields);
    console.groupEnd();
    setDisplay([formData, errorFields]);
  };

  const outsideValidation = () => {
    return { name: 'percentage', error: ['外部校验错误'] };
  };

  const beforeFinish = () => {
    return { name: 'percentage', error: ['外部校验错误'] };
  };

  // const watch = {
  //   'a.b.c': value => {
  //     form.onItemChange('a.b.d', value);
  //   },
  //   percentage: value => {
  //     form.onItemChange('a.b.c', String(value));
  //   },
  // };

  // const extend = {
  //   'a.b.c': ({ schema }) => {
  //     return {
  //       placeholder: 'hahahah' + schema.placeholder,
  //     };
  //   },
  //   'allEnum.select': () => {
  //     const options = [];
  //     for (let i = 10; i < 36; i++) {
  //       const value = i.toString(36) + i;
  //       options.push({
  //         label: `Long Label: ${value}`,
  //         value,
  //       });
  //     }
  //     return { options };
  //   },
  // };

  // TODO: form 不传入，也可以用，至少可以展示
  return (
    <div>
      <button onClick={form.submit}>提交</button>
      <div style={{ height: 40 }}>{JSON.stringify(display[0])}</div>
      <div style={{ minHeight: 40 }}>{JSON.stringify(display[1])}</div>
      <button onClick={outsideValidation}>外部校验传入</button>
      <FormRender
        // watch={watch}
        // extend={extend}
        form={form}
        schema={schema}
        beforeFinish={beforeFinish}
        onFinish={onFinish}
        widgets={{ percent: PercentWidget, percent: PercentWidget }}
        // displayType="row"
        theme="1"
        // debug
        // debounceInput={true}
        // size="small"
        // locale="en"
      />
    </div>
  );
};

export default Demo;
