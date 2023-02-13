import React from 'react';
import TypeIt from 'typeit';
import FormRender, { useForm } from 'form-render';
import { Button, Card, Row, Col } from 'antd';
import './index.less';

const prefix = 'xr-doc-hero';

const Demo: React.FC = () => {
  const form = useForm();
  const [schema, setSchema] = React.useState<any>();

  React.useEffect(() => {
    new TypeIt('#xr-doc-hero-schema', {
      speed: 50,
    })
      .type('{}')
      .move(-1, { instant: true })
      .type('<br/><br/>', { instant: true })
      .move(-1, { instant: true })
      .type('&nbsp;&nbsp;', { instant: true })
      .type('bar: {},')
      .move(-2, { instant: true })
      .type('<br/><br/>&nbsp;&nbsp;', { instant: true })
      .move(-3, { instant: true })
      .type('&nbsp;&nbsp;&nbsp;&nbsp;', { instant: true })
      .type('title: "bar",')
      .type('<br/>&nbsp;&nbsp;&nbsp;&nbsp;', { instant: true })
      .type('type: "string",')
      .exec(() => {
        setSchema({
          type: 'object',
          properties: {
            bar: {
              title: 'bar',
              type: 'string',
            },
          },
        });
      })
      .move(5)
      .type('<br/>&nbsp;&nbsp', { instant: true })
      .type('foo: {}', { delay: 100 })
      .move(-1, { instant: true })
      .type('<br/><br/>&nbsp;&nbsp;', { instant: true })
      .move(-3, { instant: true })
      .type('&nbsp;&nbsp;&nbsp;&nbsp;', { instant: true })
      .type("title: 'foo',")
      .type('<br/>&nbsp;&nbsp;&nbsp;&nbsp;', { instant: true })
      .type("type: 'string',")
      .exec(() => {
        setSchema({
          type: 'object',
          properties: {
            bar: {
              title: 'bar',
              type: 'string',
            },
            foo: {
              title: 'foo',
              type: 'string',
            },
          },
        });
      })
      .type('<br/>&nbsp;&nbsp;&nbsp;&nbsp;', { instant: true })
      .type('enum: [1, 2, 3],')
      .type('<br/>&nbsp;&nbsp;&nbsp;&nbsp;', { instant: true })
      .type('enumNames: [1, 2, 3]')
      .exec(() => {
        setSchema({
          type: 'object',
          properties: {
            bar: {
              title: 'bar',
              type: 'string',
            },
            foo: {
              title: 'foo',
              type: 'string',
              enum: [1, 2, 3],
              enumNames: [1, 2, 3],
            },
          },
        });
      })
      .type('<br/>&nbsp;&nbsp;&nbsp;&nbsp;', { instant: true })
      .type('required: true,')
      .exec(() => {
        setSchema({
          type: 'object',
          properties: {
            bar: {
              title: 'bar',
              type: 'string',
            },
            foo: {
              title: 'foo',
              type: 'string',
              enum: [1, 2, 3],
              enumNames: [1, 2, 3],
              required: true,
            },
          },
        });
      })
      .type('<br/>&nbsp;&nbsp;&nbsp;&nbsp;', { instant: true })
      .type('description: "more powerfull!!"')
      .exec(() => {
        setSchema({
          type: 'object',
          properties: {
            bar: {
              title: 'bar',
              type: 'string',
            },
            foo: {
              title: 'foo',
              type: 'string',
              enum: [1, 2, 3],
              enumNames: [1, 2, 3],
              required: true,
              description: 'more powerfull!!',
            },
          },
        });
      })
      .go();
  }, []);

  return (
    <div className={`${prefix}-demo`}>
      <Card className={`${prefix}-box`}>
        <div id="xr-doc-hero-schema"></div>
      </Card>
      <Card title="FormRender" className={`${prefix}-form`}>
        {schema ? (
          <FormRender
            schema={schema}
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
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

export default Demo;
