const displayTypeEnum = {
  column: 'vertical',
  row: 'horizontal',
  inline: 'inline',
};

export default props => {
  const {
    schema,
    beforeFinish,
    onMount,
    displayType,
    widgets,
    watch,
    removeHiddenData,
    readOnly,
    column,
    mapping,
    debugCss,
    locale,
    configProvider,
    allCollapsed,
    debounceInput,
    validateMessages,
    debug,
    id,

    form,
    onFinish,
    // labelAlign,
    // colon,
    // className,
    // style,
    // disabled,
    // scrollToFirstError,
    ...otherProps
  } = props;

  const formProps = {
    ...otherProps,
  };

  if (displayType) {
    formProps.layout = displayTypeEnum[displayType];
  }

  if (removeHiddenData !== undefined) {
    formProps.preserve = removeHiddenData;
  }

  return {
    formProps,
    schema,
    beforeFinish, // form 没有这个 api, 感觉找不到时机
    onMount,
    widgets,
    watch,
    readOnly,
    column,
    mapping,
    debugCss, // 好像没用了
    locale,
    configProvider,

    form,

    allCollapsed,
    debounceInput, // 好像没用了
    validateMessages,
    debug, // 换成 form 还有用吗？
    id,
  };
};
