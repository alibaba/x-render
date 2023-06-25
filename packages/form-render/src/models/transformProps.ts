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
    debugCss,
    locale,
    configProvider,
    validateMessages,
    debug,
    id,
    labelWidth,
    maxWidth,
    form,
    onFinish,
    onFinishFailed,
    footer,
    operateExtra,
    logOnMount,
    logOnSubmit,
    labelCol,
    fieldCol,
    disabled,
    className,
    validateTrigger,
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
    disabled,
    column,
    mapping,
    debugCss, // 好像没用了
    locale,
    configProvider,
    footer,
    form,
    labelWidth,
    validateMessages,
    debug, // 换成 form 还有用吗？
    id,
    onFinishFailed,
    removeHiddenData,
    operateExtra,
    logOnMount,
    logOnSubmit,
    labelCol,
    fieldCol,
    maxWidth,
    className,
    validateTrigger
  };
};

export default transformProps;