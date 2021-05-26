import React, { forwardRef, useImperativeHandle } from 'react';
import { useSet } from './hooks';
import copyTOClipboard from 'copy-text-to-clipboard';
import Left from './Left';
import Right from './Right';
import {
  flattenSchema,
  idToSchema,
  combineSchema,
  dataToFlatten,
  flattenToData,
  looseJsonParse,
  isObject,
  newSchemaToOld,
  schemaToState,
} from './utils';
import { Ctx, StoreCtx } from './context';
import FR from './FR';
import PreviewFR from './PreviewFR';
import { Modal, Input, Button, message } from 'antd';

const { TextArea } = Input;

function Wrapper(
  {
    schema,
    formData,
    onChange,
    onSchemaChange,
    setGlobal,
    userProps = {},
    frProps = {},
    ...rootState
  },
  ref
) {
  const [local, setState] = useSet({
    showModal: false,
    showModal2: false,
    schemaForImport: '',
  });

  const { preview } = rootState;

  const {
    transformFrom,
    transformTo,
    isNewVersion,
    extraButtons = [],
  } = userProps;

  let _schema = {};
  if (schema) {
    _schema = combineSchema(schema); // TODO: 要不要判断是否都是object
  }
  const flatten = flattenSchema(_schema);
  const flattenWithData = dataToFlatten(flatten, formData);

  const onFlattenChange = (newFlatten, changeSource = 'schema') => {
    const newSchema = idToSchema(newFlatten);
    const newData = flattenToData(newFlatten);
    // 判断只有schema变化时才调用，一般需求的用户不需要
    if (changeSource === 'schema' && onSchemaChange) {
      onSchemaChange(newSchema);
    }
    // schema 变化大都会触发 data 变化
    onChange(newData);
  };

  const onItemChange = (key, value, changeSource) => {
    flattenWithData[key] = value;
    onFlattenChange(flattenWithData, changeSource);
  };

  const toggleModal = () => setState({ showModal: !local.showModal });
  const toggleModal2 = () => setState({ showModal2: !local.showModal2 });

  const clearSchema = () => {
    setGlobal({
      schema: {
        type: 'object',
        properties: {},
      },
      formData: {},
      selected: undefined,
    });
  };

  const onTextareaChange = e => {
    setState({ schemaForImport: e.target.value });
  };

  const importSchema = () => {
    try {
      const value = transformFrom(looseJsonParse(local.schemaForImport));
      setGlobal(() => ({
        selected: undefined,
        ...schemaToState(value),
      }));
    } catch (error) {
      message.info('格式不对哦，请重新尝试'); // 可以加个格式哪里不对的提示
    }
    toggleModal2();
  };

  let displaySchema = {};
  let displaySchemaString = '';
  try {
    const _schema = {
      ...idToSchema(flattenWithData, '#', true),
      ...frProps,
    };
    displaySchema = transformTo(_schema);
    if (!isNewVersion) {
      displaySchema = newSchemaToOld(displaySchema);
    }
    displaySchemaString = JSON.stringify(displaySchema, null, 2);
  } catch (error) {}

  const copySchema = () => {
    copyTOClipboard(displaySchemaString);
    message.info('复制成功');
    toggleModal();
  };

  const getValue = () => displaySchema;

  const setValue = value => {
    try {
      setGlobal(state => ({
        ...state,
        selected: undefined,
        ...schemaToState(value),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const copyValue = () => {
    copyTOClipboard(displaySchemaString);
  };

  useImperativeHandle(ref, () => ({
    getValue,
    setValue,
    copyValue,
  }));

  // TODO: flatten是频繁在变的，应该和其他两个函数分开
  const store = {
    flatten: flattenWithData, // schema + formData = flattenWithData
    onFlattenChange, // onChange + onSchemaChange = onFlattenChange
    onItemChange, // onFlattenChange 里只改一个item的flatten，使用这个方法
    userProps,
    frProps,
    ...rootState,
  };

  const _extraButtons = Array.isArray(extraButtons) ? extraButtons : [];
  const _showDefaultBtns = _extraButtons.filter(
    item => item === true || item === false
  );
  const _extraBtns = _extraButtons.filter(item => isObject(item) && item.text);

  return (
    <Ctx.Provider value={setGlobal}>
      <StoreCtx.Provider value={store}>
        <div className="fr-generator-container">
          <Left />
          <div className="mid-layout pr2">
            <div className="mv2 mh1">
              {_showDefaultBtns[0] !== false && (
                <Button
                  className="mr2 mb1"
                  onClick={() => {
                    setGlobal({ preview: !preview, selected: '#' });
                  }}
                >
                  {preview ? '开始编辑' : '最终展示'}
                </Button>
              )}
              {_showDefaultBtns[1] !== false && (
                <Button className="mr2" onClick={clearSchema}>
                  清空
                </Button>
              )}
              {_showDefaultBtns[2] !== false && (
                <Button className="mr2" onClick={toggleModal2}>
                  导入
                </Button>
              )}
              {_showDefaultBtns[3] !== false && (
                <Button type="primary" className="mr2" onClick={toggleModal}>
                  导出schema
                </Button>
              )}
              {_extraBtns.map((item, idx) => {
                return (
                  <Button key={idx.toString()} className="mr2" {...item}>
                    {item.text || item.children}
                  </Button>
                );
              })}
            </div>
            <div className="dnd-container">
              <div style={{ height: preview ? 33 : 0 }}></div>
              {preview ? <PreviewFR schema={displaySchema} /> : <FR />}
            </div>
          </div>
          <Right globalProps={frProps} />
          <Modal
            visible={local.showModal}
            onOk={copySchema}
            onCancel={toggleModal}
            okText="复制"
            cancelText="取消"
          >
            <div className="mt3">
              <TextArea
                style={{ fontSize: 12 }}
                value={displaySchemaString}
                autoSize={{ minRows: 10, maxRows: 30 }}
              />
            </div>
          </Modal>
          <Modal
            visible={local.showModal2}
            okText="导入"
            cancelText="取消"
            onOk={importSchema}
            onCancel={toggleModal2}
          >
            <div className="mt3">
              <TextArea
                style={{ fontSize: 12 }}
                value={local.schemaForImport}
                placeholder="贴入需要导入的schema，模样可点击导出schema参考"
                onChange={onTextareaChange}
                autoSize={{ minRows: 10, maxRows: 30 }}
              />
            </div>
          </Modal>
        </div>
      </StoreCtx.Provider>
    </Ctx.Provider>
  );
}

const FRWrapper = forwardRef(Wrapper);

FRWrapper.defaultProps = {
  labelWidth: 120,
};

export default FRWrapper;
