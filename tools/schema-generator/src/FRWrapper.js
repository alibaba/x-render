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
  oldSchemaToNew,
  newSchemaToOld,
} from './utils';
import { Ctx, StoreCtx } from './context';
// import SCHEMA from './json/basic.json';
import FR from './FR';
import PreviewFR from './PreviewFR';
import { Modal, Input, message } from 'antd';
import { Button } from 'antd';

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
  ref,
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
    _schema = combineSchema(schema.schema, schema.uiSchema); // TODO: 要不要判断是否都是object
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
        schema: {
          type: 'object',
        },
      },
      formData: {},
      selected: undefined,
    });
  };

  const onTextareaChange = e => {
    setState({ schemaForImport: e.target.value });
  };

  // 收口点 propsSchema 到 schema 的转换（一共就3个入口：defaultValue，importSchema，setValue）
  // TODO: 3个入口可能还是太多了，是不是考虑在外面裹一层
  // TODO2: 导入这边看看会不会传一个乱写的schema就crash
  const importSchema = () => {
    try {
      const info = transformFrom(looseJsonParse(local.schemaForImport));
      let _isNewVersion = true;
      if (info && info.propsSchema) {
        _isNewVersion = false;
      }
      const _info = oldSchemaToNew(info);
      const { schema, ...rest } = _info;
      setGlobal(state => ({
        schema: {
          schema,
        },
        formData: {},
        selected: undefined,
        isNewVersion: _isNewVersion,
        frProps: { ...state.frProps, ...rest },
      }));
    } catch (error) {
      message.info('格式不对哦，请重新尝试'); // 可以加个格式哪里不对的提示
    }
    toggleModal2();
  };

  let displaySchema = {};
  let displaySchemaString = '';
  try {
    const _schema = idToSchema(flattenWithData, '#', true);
    if (frProps && frProps.column) {
      _schema['column'] = frProps.column;
    }
    if (frProps && frProps.displayType) {
      _schema['displayType'] = frProps.displayType;
    }
    if (frProps && frProps.showDescIcon) {
      _schema['showDescIcon'] = frProps.showDescIcon;
    }
    displaySchema = transformTo({ schema: _schema, ...frProps });
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

  const getValue = () => {
    return displaySchema;
  };

  // 收口点 propsSchema 到 schema
  // setValue 外部用于修改大schema，叫setSchema比较合适
  // TODO: 这次顶层的props传递改动和整理后，确保这个api还是正确的
  const setValue = value => {
    try {
      // TODO: 这里默认使用setValue的同学不使用ui:Schema
      const { schema, propsSchema, uiSchema, ...rest } = value;
      let _schema = { schema: schema || propsSchema };
      let _isNewVersion = true;
      if (!schema && propsSchema) {
        _isNewVersion = false;
      }
      setGlobal(state => ({
        ...state,
        schema: _schema,
        formData: {},
        selected: undefined,
        isNewVersion: _isNewVersion,
        frProps: { ...state.frProps, ...rest },
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
    item => item === true || item === false,
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
              {/* <FR preview={preview} /> */}
              {
                preview ? <PreviewFR schema={displaySchema.schema} /> : <FR />
              }
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
