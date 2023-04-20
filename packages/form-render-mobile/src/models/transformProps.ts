import { _get } from '../utils';

const displayTypeEnum = {
  column: 'vertical',
  row: 'horizontal',
  inline: 'inline',
};

const transformProps =  (props: any) => {
  const {
    schema,
    beforeFinish,
    onMount,
    displayType = 'column',
    watch,
    removeHiddenData = true,
    readOnly,
    column = 1,
    mapping,
    // debugCss,
    locale,
    configProvider,
    allCollapsed,
    // debounceInput,
    validateMessages,
    debug,
    id,
    labelWidth,
    maxWidth,
    form,
    onFinish,
    onFinishFailed,
    logOnMount,
    logOnSubmit,
    labelCol,
    fieldCol,
    // labelAlign,
    // colon,
    className,
    // style,
    // disabled,
    // scrollToFirstError,
    ...otherProps
  } = props;

  const formProps = {
    ...otherProps,
  };

  if (displayType) {
    formProps.layout = displayTypeEnum[displayType] || 'horizontal';
  }

  return {
    formProps,
    schema,
    displayType,
    onFinish,
    beforeFinish, // form 没有这个 api, 感觉找不到时机
    onMount,
    watch,
    readOnly,
    column,
    mapping,
    className,
    locale,
    configProvider,
    form,
    labelWidth,
    allCollapsed,
    validateMessages,
    id,
    onFinishFailed,
    removeHiddenData,
    logOnMount,
    logOnSubmit,
    labelCol,
    fieldCol,
    maxWidth
  };
};

export default transformProps;
