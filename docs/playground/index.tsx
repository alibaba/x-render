import React, { useCallback, useMemo, useState } from "react";
import FormRender, { useForm } from 'form-render';
import debounce from 'lodash/debounce';
import Editor from "@monaco-editor/react";
import Controller from "./controller";
import { Row, Col, Tabs } from 'antd';
// @ts-ignore
import { serializeToDraft, deserialize } from './serialize';
import AsyncSelect from "./customized/AsyncSelect";
import './index.less';

const Playground = () => {
  const form = useForm();
  const [value, setValue] = useState("");
  const [displayType, setDisplayType] = useState('column');
  const [column, setColumn] = useState(1);
  const [readonly, setReadonly] = useState(false);
  const [labelWidth, setLabelWidth] = useState(100);
  const [lang, setLang] = useState('json');
  const [formData, setFormData] = useState({});

  const onEditorChange = (val?: string) => {
    if (val) {
      setValue(val);
    }
  }
  
  const parseSchema = (str: string) => {
    try {
      if (lang === 'javascript') {
        return deserialize(str);
      } else {
        return JSON.parse(str)
      }
    } catch (e) {
      return {}
    }
  }

  const onControllerChange = (val) => {
    if (val.schema) {
      try {
        const schema = require(`./json/${val.schema}.json`);
        setValue(JSON.stringify(schema.schema, null, '\t'))
        setLang('json');
      } catch {
        const schema = require(`./json/${val.schema}.js`);
        setLang('javascript')
        setValue(serializeToDraft(schema.schema))
      }
    }

    if (val.displayType) {
      setDisplayType(val.displayType);
    }

    if (val.column) {
      setColumn(val.column)
    }

    if (typeof val.readonly === 'boolean') {
      setReadonly(val.readonly);
    }

    if (val.labelWidth) {
      setLabelWidth(val.labelWidth);
    }
  }

  const debounceEditorChange = useCallback(debounce(onEditorChange, 200), [])
  const schema = parseSchema(value);

  const onValuesChange = () => {
    setTimeout(() => {
      form.submit();
    })
  }

  return (
    <div className="fr-playground">
        <Controller onChange={onControllerChange} />
        <Row gutter={20} style={{ flex: 1, overflow: 'hidden' }}>
          <Col span={12}>
            <Tabs
              items={[
                {
                  label: 'Schema',
                  key: 'schema',
                  children: 
                    <Editor
                      theme='vs-dark'
                      value={value}
                      language={lang}
                      options={{
                        lineNumbers: 'off',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 14,
                        minimap: {
                          enabled: false
                        }
                      }}
                      onChange={debounceEditorChange}
                      onMount={() => {
                        const schema = require(`./json/simplest.json`);
                        setValue(JSON.stringify(schema.schema, null, '\t'))
                      }}
                    />
                  
                },
                {
                  label: 'FormData',
                  key: 'data',
                  children: 
                    <Editor
                      theme='vs-dark'
                      value={JSON.stringify(formData, null, '\t')}
                      language={lang}
                      options={{
                        lineNumbers: 'off',
                        readOnly: true,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 14,
                        minimap: {
                          enabled: false
                        }
                      }}
                    />
                }
              ]}
            />
          </Col>
          <Col span={12} style={{ overflowY: 'auto', overflowX: 'hidden', height: '100%',  background: '#fff', padding: '24px 32px 24px 24px', boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)' }}>
            <FormRender
              form={form}
              schema={schema}
              displayType={displayType}
              column={column}
              readOnly={readonly}
              labelWidth={labelWidth}
              widgets={{ asyncSelect: AsyncSelect }}
              watch={{ '#' : onValuesChange }}
              onFinish={(values) => {
                setFormData(values);
              }}
            />
          </Col>
        </Row>
     
    </div>
  );
};

export default Playground;