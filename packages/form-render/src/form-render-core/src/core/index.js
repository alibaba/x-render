import React, { useRef } from 'react';
import CoreRender from './render';
import { useStore, useStore2, useTools } from '../hooks';
import {
  getParentProps,
  getParentPath,
  getValueByPath,
  getDataPath,
  parseRootValueInSchema,
  clone,
} from '../utils';
import useDebouncedCallback from '../useDebounce';
import { validateField } from '../validator';

const Core = ({
  id = '#',
  _item, // 如果直接传了item，就不用id去取item, 暂时是内部属性，不外用
  dataIndex = [], // 数据来源是数组的第几个index，上层每有一个list，就push一个index
  hideTitle = false,
  hideValidation = false,
  debugCss,
  ...rest
}) => {
  // console.log('<Core>', id);
  const snapShot = useRef();

  const { flatten, errorFields, isEditing, formData, allTouched } = useStore();
  const {
    debounceInput,
    validateMessages,
    locale,
    displayType,
    column,
    labelWidth,
    readOnly,
    disabled,
  } = useStore2();
  const {
    onValuesChange,
    onItemChange,
    setEditing,
    touchKey,
    _setErrors,
  } = useTools();
  const formDataRef = useRef();
  const debouncedSetEditing = useDebouncedCallback(setEditing, 350);
  formDataRef.current = formData;
  const item = _item ? _item : flatten[id];
  if (!item) return null;

  let dataPath = getDataPath(id, dataIndex);
  const parentPath = getParentPath(dataPath);
  const value = getValueByPath(formData, dataPath);
  let schema = clone(item.schema);
  const dependencies = schema.dependencies;
  const dependValues = [];
  let rootValue;

  try {
    if (Array.isArray(dependencies)) {
      dependencies.forEach(item => {
        const itemPath = getDataPath(item, dataIndex);
        const result = getValueByPath(formData, itemPath);
        dependValues.push(result);
      });
    }
  } catch (error) {
    console.error(`dependencies 计算报错，${dependencies}`);
  }

  try {
    rootValue = getValueByPath(formData, parentPath);
  } catch (error) {}

  // 节流部分逻辑，编辑时不执行
  if (isEditing && snapShot.current) {
    schema = snapShot.current;
  } else {
    if (JSON.stringify(schema).indexOf('rootValue') > -1) {
      schema = parseRootValueInSchema(schema, rootValue);
    }

    snapShot.current = schema;
  }

  const removeDupErrors = arr => {
    if (!Array.isArray(arr)) {
      console.log('in removeDups: param is not an array');
      return;
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
      const sameNameIndex = array.findIndex(item => item.name === arr[i].name);
      if (sameNameIndex > -1) {
        const sameNameItem = array[sameNameIndex];
        const error1 = sameNameItem.error;
        const error2 = arr[i].error;
        array[sameNameIndex] = {
          name: sameNameItem.name,
          error:
            error1.length > 0 && error2.length > 0
              ? error2
              : [],
        };
      } else {
        array.push(arr[i]);
      }
    }
    return array.filter(
      item => Array.isArray(item.error) && item.error.length > 0
    );
  };

  // TODO: 优化一下，只有touch还是false的时候，setTouched
  const onChange = val => {
    // 动过的key，算被touch了, 这里之后要考虑动的来源
    touchKey(dataPath);
    // 开始编辑，节流
    if (debounceInput) {
      setEditing(true);
      debouncedSetEditing(false);
    }
    if (typeof dataPath === 'string') {
      onItemChange(dataPath, val);
    }
    // 先不暴露给外部，这个api
    if (typeof onValuesChange === 'function') {
      onValuesChange({ [dataPath]: val }, formDataRef.current);
    }

    validateField({
      path: dataPath,
      formData: formDataRef.current,
      flatten,
      options: {
        locale,
        validateMessages,
      },
    }).then(res => {
      _setErrors(errors => {
        return removeDupErrors([...errors, ...res]);
      });
    });
  };

  const _readOnly = readOnly !== undefined ? readOnly : schema.readOnly;
  const _disabled = disabled !== undefined ? disabled : schema.disabled;
  const _displayType = schema.displayType || rest.displayType || displayType || 'column';
  // 真正有效的label宽度需要从现在所在item开始一直往上回溯（设计成了继承关系），找到的第一个有值的 ui:labelWidth
  const _labelWidth = getParentProps('labelWidth', id, flatten) || labelWidth;

  const dataProps = {
    $id: id,
    item, // 如果直接传了item，就不用id去取item, 暂时是内部属性，不外用
    dataIndex, // 数据来源是数组的第几个index，上层每有一个list，就push一个index
    dataPath,
    hideTitle,
    hideValidation,
    debugCss,
    schema,
    value,
    onChange,
    dependValues,
    readOnly: _readOnly,
    disabled: _disabled,
    displayType: _displayType,
    labelWidth: _labelWidth,
    column,
    errorFields,
    allTouched,
  };

  return <CoreRender {...dataProps} />;
};

export default Core;
