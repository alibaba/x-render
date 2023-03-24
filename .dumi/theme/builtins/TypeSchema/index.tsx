import React from 'react';
import TypeIt from 'typeit-react';
import FormRender, { useForm } from 'form-render';
import { Button, Card } from 'antd';
import './index.less';

const prefix = 'xr-doc-hero';

const time = (str: string, time: number) => {
  let res = '';
  for (let i = 0; i < time; i++) {
    res += str;
  }
  return res;
}
const red = (val: string) => `<span style="color:#cf222e">${val}</span>`
const violet = (val: string) => `<span style="color:#8250df">${val}</span>`
const blue = (val: string) => `<span style="color:#0550ae">${val}</span>`
const black = (val: string) => `<span style="color:#0a3069">${val}</span>`
const br = (times: number) => time('<br/>', times);
const space = (times: number) => time('&nbsp;', times);


const TypeSchema: React.FC = () => {
  const form = useForm();
  const [schema, setSchema] = React.useState<any>();

  return (
    <div className={`${prefix}-demo`}>
      <Card className={`${prefix}-box`}>
        <div className={`${prefix}-schema`}>
          <TypeIt
            getBeforeInit={instance => {
              instance
                .options({
                  speed: 40,
                })
                .type('{}')
                .move(-1, { instant: true })
                .type(br(2), { instant: true })
                .move(-1, { instant: true })
                .type(space(2), { instant: true })
                .type(`${blue('name')}: {},`)
                .move(-2, { instant: true })
                .type(`${br(2)}${space(2)}`, { instant: true })
                .move(-3, { instant: true })
                .type(space(4), { instant: true })
                .type(`${blue('title')}: ${black(`'Name'`)},`)
                .type(`${br(1)}${space(4)}`, { instant: true })
                .type(`${blue('type')}: ${black(`'string'`)},`)
                .type(`${br(1)}${space(4)}`, { instant: true })
                .exec(() => {
                  setSchema({
                    type: 'object',
                    properties: {
                      name: {
                        title: 'Name',
                        type: 'string',
                      },
                    },
                  });
                })
                .type(`${blue('placeholder')}: ${black(`'Please input your name.'`)},`)
                .exec(() => {
                  setSchema({
                    type: 'object',
                    properties: {
                      name: {
                        title: 'Name',
                        type: 'string',
                        placeholder: 'Please input your name.'
                      },
                    },
                  });
                })
                .move(5)
                .type(`${br(1)}${space(2)}`, { instant: true })
                .type(`${blue('fruit')}: {}`)
                .move(-1, { instant: true })
                .type(`${br(2)}${space(2)}`, { instant: true })
                .move(-3, { instant: true })
                .type(space(4), { instant: true })
                .type(`${blue('title')}: ${black(`'Favorite Fruit'`)},`)
                .type(`${br(1)}${space(4)}`, { instant: true })
                .type(`${blue('type')}: ${black(`'number'`)},`)
                .exec(() => {
                  setSchema({
                    type: 'object',
                    properties: {
                      name: {
                        title: 'Name',
                        type: 'string',
                        placeholder: 'Please input your name.'
                      },
                      fruit: {
                        title: 'Favorite Fruit',
                        type: 'string',
                      },
                    },
                  });
                })
                .type(`${br(1)}${space(4)}`, { instant: true })
                .type(`${blue('enum')}: ${black(`[${violet('1')}, ${violet('2')}, ${violet('3')}]`)},`)
                .type(`${br(1)}${space(4)}`, { instant: true })
                .type(`${blue('enumNames')}:  ${black(`['apple', 'cherry', 'pear'],`)}`)
                .exec(() => {
                  setSchema({
                    type: 'object',
                    properties: {
                      name: {
                        title: 'Name',
                        type: 'string',
                        placeholder: 'Please input your name.'
                      },
                      fruit: {
                        title: 'Favorite Fruit',
                        type: 'number',
                        enum: [1, 2, 3],
                        enumNames: ['apple', 'cherry', 'pear'],
                      },
                    },
                  });
                })
                .type(`${br(1)}${space(4)}`, { instant: true })
                .type(`${blue('required')}: ${violet('true')},`)
                .exec(() => {
                  setSchema({
                    type: 'object',
                    properties: {
                      name: {
                        title: 'Name',
                        type: 'string',
                        placeholder: 'Please input your name.'
                      },
                      fruit: {
                        title: 'Favorite Fruit',
                        type: 'number',
                        enum: [1, 2, 3],
                        enumNames: ['apple', 'cherry', 'pear'],
                        required: true,
                      },
                    },
                  });
                })
                .type(`${br(1)}${space(4)}`, { instant: true })
                .type(`${blue('default')}: ${black(`2,`)}`)
                .exec(() => {
                  setSchema({
                    type: 'object',
                    properties: {
                      name: {
                        title: 'Name',
                        type: 'string',
                        placeholder: 'Please input your name.'
                      },
                      fruit: {
                        title: 'Favorite Fruit',
                        type: 'number',
                        enum: [1, 2, 3],
                        enumNames: ['apple', 'cherry', 'pear'],
                        required: true,
                        default: 2,
                      },
                    },
                  });
                })
                .move(-167, { instant: true })
                .type(`${br(1)}${space(4)}`, { instant: true })
                .type(`${blue('extra')}: ${red(`'Easiest way to build a form!'`)}`)
                .exec(() => {
                  setSchema({
                    type: 'object',
                    properties: {
                      name: {
                        title: 'Name',
                        type: 'string',
                        placeholder: 'Please input your name.',
                        extra: 'Easiest way to build a form!'
                      },
                      fruit: {
                        title: 'Favorite Fruit',
                        type: 'number',
                        enum: [1, 2, 3],
                        enumNames: ['apple', 'cherry', 'pear'],
                        required: true,
                        default: 2,
                      },
                    },
                  });
                })
              return instance;
            }}>
          </TypeIt>
        </div>
      </Card>
      <Card title="FormRender" className={`${prefix}-form`}>
        {schema ? (
          <FormRender
            schema={schema}
            form={form}
            onFinish={(data) => {
              window.alert(JSON.stringify(data))
            }}
          />
        ) : (
          <div className={`${prefix}-loading`}>Transform schema to form...</div>
        )}
        <Button onClick={form.submit} type="primary">
          Submit
        </Button>
      </Card>
    </div>
  );
};

export default TypeSchema;
