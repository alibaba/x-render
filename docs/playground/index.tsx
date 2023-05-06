import React, { useCallback, useMemo, useState } from "react";
import FormRender, { useForm } from 'form-render';
import debounce from 'lodash/debounce';
import Editor from "@monaco-editor/react";
import Controller from "./controller";
import { Row, Col } from 'antd';
// @ts-ignore
import { serializeToDraft, deserialize } from './serialize';
import AsyncSelect from "./customized/AsyncSelect";
import './index.css';

const Playground = () => {
  const form = useForm();
  const [value, setValue] = useState("");
  const [displayType, setDisplayType] = useState('column');
  const [column, setColumn] = useState(1);
  const [readonly, setReadonly] = useState(false);
  const [labelWidth, setLabelWidth] = useState(100);
  const [lang, setLang] = useState('json');

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
  const schema = useMemo(() => parseSchema(value), [value, lang]);

  return (
    <div className="fr-playground">
        <Controller onChange={onControllerChange} />
        <Row gutter={24} style={{ flex: 1, overflow: 'hidden', padding: '0 24px 0 16px' }}>
          <Col span={12}>
            <Editor
              theme='vs-dark'
              value={value}
              language={lang}
              onChange={debounceEditorChange}
              onMount={() => {
                const schema = require(`./json/simplest.json`);
                setValue(JSON.stringify(schema.schema, null, '\t'))
              }}
            />
          </Col>
          <Col span={12} style={{ overflowY: 'auto', overflowX: 'hidden', height: '100%',  background: '#fff', padding: '24px 24px 24px 24px', boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)' }}>
            <FormRender
              form={form}
              schema={schema}
              displayType={displayType}
              column={column}
              readOnly={readonly}
              labelWidth={labelWidth}
              widgets={{ asyncSelect: AsyncSelect }}
            />
          </Col>
        </Row>
     
    </div>
  );
};

export default Playground;