import React, { useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
import { flattenToData, dataToFlatten } from '../../../utils';
import { useStore } from '../../../utils/hooks';
import RenderChildren from './RenderChildren';
import RenderField from './RenderField';
import Wrapper from './Wrapper';

const PreviewFR = ({ schema }) => {
  const form = useForm();
  const { flatten, widgets, mapping, userProps, onFlattenChange } = useStore();
  const renderSchema = userProps.transformer.to(schema);

  useEffect(() => {
    form.setValues(flattenToData(flatten));
  }, []);

  return (
    <FormRender
      schema={renderSchema}
      form={form}
      widgets={widgets}
      mapping={mapping}
      watch={{
        '#': formData => {
          onFlattenChange(dataToFlatten(flatten, formData), 'data');
        },
      }}
    />
  );
};

const FR = ({ id = '#', preview, displaySchema }) => {
  const { flatten, frProps = {} } = useStore();

  if (preview) {
    return <PreviewFR schema={displaySchema} />;
  }

  const { column } = frProps;
  const item = flatten[id];
  if (!item) return null;

  const { schema } = item;
  const displayType = schema.displayType || frProps.displayType;
  const isObj = schema.type === 'object';
  const isList = schema.type === 'array' && schema.enum === undefined;
  const isComplex = isObj || isList;
  const width = schema['width'];
  let containerClass = `fr-field w-100 ${isComplex ? 'fr-field-complex' : ''} ${schema.className || ''}`;
  let labelClass = 'fr-label mb2';
  let contentClass = 'fr-content';

  let columnStyle = {};
  if (!isComplex && width) {
    columnStyle = {
      width,
      paddingRight: '12px',
    };
  } else if (!isComplex && column > 1) {
    columnStyle = {
      width: `calc(100% /${column})`,
      paddingRight: '12px',
    };
  }

  switch (schema.type) {
    case 'object':
      if (schema.title) {
        containerClass += ' ba b--black-20 pt4 pr3 pb2 relative mt3 mb4'; // object的margin bottom由内部元素撑起
        labelClass += ' fr-label-object bg-white absolute ph2 top-upper left-1'; // fr-label-object 无默认style，只是占位用于使用者样式覆盖
      }
      containerClass += ' fr-field-object'; // object的margin bottom由内部元素撑起
      if (schema.title) {
        contentClass += ' ml3'; // 缩进
      }
      break;
    case 'array':
      if (schema.title && !schema.enum) {
        labelClass += ' mt2 mb3';
      }
      break;
    case 'boolean':
      if (schema['widget'] !== 'switch') {
        if (schema.title) {
          labelClass += ' ml2';
          labelClass = labelClass.replace('mb2', 'mb0');
        }
        contentClass += ' flex items-center'; // checkbox高度短，需要居中对齐
        containerClass += ' flex items-center flex-row-reverse justify-end';
      }
      break;
    default:
      if (displayType === 'row') {
        labelClass = labelClass.replace('mb2', 'mb0');
      }
  }
  // 横排时
  const isCheckBox = schema.type === 'boolean' && schema['widget'] !== 'switch';
  if (displayType === 'row' && !isComplex && !isCheckBox) {
    containerClass += ' flex items-center';
    labelClass += ' flex-shrink-0 fr-label-row';
    labelClass = labelClass.replace('mb2', 'mb0');
    contentClass += ' flex-grow-1 relative';
  }

  // 横排的checkbox
  if (displayType === 'row' && isCheckBox) {
    contentClass += ' flex justify-end pr2';
  }

  const fieldProps = {
    $id: id,
    item,
    labelClass,
    contentClass,
    isComplex,
  };

  const childrenElement =
    item.children && item.children.length > 0 ? (
      <ul className={`flex flex-wrap pl0`}>
        <RenderChildren children={item.children} />
      </ul>
    ) : null;

  const isEmpty = Object.keys(flatten).length < 2; // 只有一个根元素 # 的情况
  if (isEmpty) {
    return (
      <Wrapper style={columnStyle} $id={id} item={item}>
        <div
          className={`${containerClass} h-100 f4 black-40 flex items-center justify-center`}
        >
          点击/拖拽左侧栏的组件进行添加
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={columnStyle} $id={id} item={item}>
      <div className={containerClass}>
        <RenderField {...fieldProps}>
          {(isObj || isList) && (
            <Wrapper $id={id} item={item} inside>
              {childrenElement || <div className="h2" />}
            </Wrapper>
          )}
        </RenderField>
      </div>
    </Wrapper>
  );
};

export default FR;
