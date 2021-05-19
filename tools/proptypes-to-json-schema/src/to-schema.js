/**
 * Created by Tw93<tw93@qq.con> on 2019-11-11.
 * 将解析好的字段转换成 json schema
 */
const {
  getProp,
  getRequired,
  getUiWidgets,
  getColumn,
  parse,
} = require('./tool');

module.exports = function(componentInfo, options) {
  const { props, description, displayName } = componentInfo;
  const { shouldAddUi } = options;
  if (!props || props === 'undefined' || props === undefined) {
    return {};
  }

  const properties = getProp(props);
  const required = getRequired(props);
  const uiSchema = getUiWidgets(props);
  const parseInfo = parse(description);
  const column = getColumn(description);
  // schema 第一层节点对应这里的模块名
  const topProp = Object.assign(parseInfo, { type: 'object' });
  const propsSchema = Object.assign(topProp, { properties }, required);
  const schemaJson = Object.assign(
    { name: displayName, column },
    { propsSchema },
    { uiSchema }
  );
  return shouldAddUi ? schemaJson : propsSchema;
};
