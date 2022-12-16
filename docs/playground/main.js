import { Tabs } from 'antd';
import FormRender, { useForm } from 'form-render';
import { deserialize, serializeToDraft } from 'fr-generator';
import parseJson from 'json-parse-better-errors';
import { useEffect, useState } from 'react';
import AsyncSelect from './customized/AsyncSelect';
import DefaultSchema from './json/simplest.json';
import CodeBlock from './monaco';

// help functions
const schema2str = obj => JSON.stringify(obj, null, 2) || '';

const Demo = ({ schemaName, theme, ...formProps }) => {
  const [schemaStr, set1] = useState(() => schema2str(DefaultSchema.schema));
  const [error, set2] = useState('');
  const [isJs, setIsJs] = useState(false);

  const updateSchemaStr = () => {
    let schema = {};
    try {
      schema = require(`./json/${schemaName}.json`);
      set1(schema2str(schema.schema));
      setIsJs(false);
    } catch (error) {
      // 不存在，默认存储的是动态函数，取js文件
      schema = require(`./json/${schemaName}.js`);
      set1(serializeToDraft(schema.schema));
      setIsJs(true);
    }
  };

  useEffect(() => {
    updateSchemaStr();
  }, [schemaName]);

  const parseSchema = str => {
    return isJs ? deserialize(str) : parseJson(str);
  };

  const tryParse = schemaStr => {
    let schema = {};
    try {
      schema = parseSchema(schemaStr);
      if (typeof schema !== 'object') {
        set2('schema非正确json');
        return;
      }
      set2('');
      return schema;
    } catch (error) {
      set2(String(error));
    }
  };

  const handleCodeChange = schemaStr => {
    set1(schemaStr);
    tryParse(schemaStr);
  };

  let schema = {};
  try {
    schema = parseSchema(schemaStr);
  } catch (error) {
    console.log(error);
  }

  const form = useForm();

  return (
    <div className="flex-auto flex">
      <div className="w-50 h-100 pl2 flex flex-column">
        <Tabs
          defaultActiveKey="1"
          onChange={() => {}}
          className="flex flex-column"
          style={{ overflow: 'auto' }}
          items={[
            {
              label: 'Schema',
              key: '1',
              children: (
                <CodeBlock value={schemaStr} onChange={handleCodeChange} />
              ),
            },
            {
              label: 'Data',
              key: '2',
              children: (
                <CodeBlock value={schema2str(form.getValues())} readOnly />
              ),
            },
          ]}
        />
      </div>
      <div className="w-50 h-100 flex flex-column pa2">
        <div
          className="h-100 overflow-auto pa3 pt4 flex-auto"
          style={{ borderLeft: '1px solid #ddd' }}
        >
          {error ? (
            <div>{error}</div>
          ) : (
            <FormRender
              form={form}
              schema={schema}
              {...formProps}
              widgets={{ asyncSelect: AsyncSelect }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;
