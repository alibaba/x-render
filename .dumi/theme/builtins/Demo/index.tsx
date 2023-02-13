import React from 'react';
import TypeIt from 'typeit';
import FormRender, { useForm } from 'form-render';
import { Button, Card, Row, Col } from 'antd';
import './index.less';

const prefix = 'xr-doc-hero';

const Demo: React.FC = () => {
  const form = useForm();
  const [schema, setSchema] = React.useState<any>({
    type: 'object',
    properties: {
      input: {
        title: 'name',
        type: 'string',
      },
    },
  });

  React.useEffect(() => {
    new TypeIt('#xr-doc-hero-schema', {
      speed: 50,
    })
      .type(
        "{<br/>&nbsp;&nbsp; type: 'object',<br/>&nbsp;&nbsp; properties: {<br/>&nbsp;&nbsp;&nbsp;&nbsp; input: {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; title: 'name',<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; type: 'string',<br/>&nbsp;&nbsp;&nbsp;&nbsp; }<br/>&nbsp;&nbsp; },<br/>}",
        { instant: true }
      )
      .move(-2)
      .type('<br/>&nbsp;&nbsp;&nbsp;&nbsp;', { instant: true })
      .type('foo: {}', { delay: 100 })
      .move(-1, { instant: true })
      .type('<br/><br/>&nbsp;&nbsp;', { instant: true })
      .move(-3, { instant: true })
      .type('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', { instant: true })
      .type("title: 'foo',")
      .type('<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', { instant: true })
      .type("type: 'string',")
      .exec(() => {
        setSchema({
          type: 'object',
          properties: {
            input: {
              title: 'name',
              type: 'string',
            },
            foo: {
              title: 'foo',
              type: 'string',
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
        <FormRender
          schema={schema}
          displayType="row"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
        />
        <Row>
          <Col offset={4}>
            <Button onClick={form.submit} type="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Demo;
