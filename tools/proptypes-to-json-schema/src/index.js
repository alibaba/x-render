/**
 * Created by Tw93<tw93@qq.con> on 2019-11-11.
 * 将 React PropTypes 自动转换成 Json Schema
 */

const fs = require('fs');
const docgen = require('react-docgen');
const toSchema = require('./to-Schema');

module.exports = (filePath, options = {}) => {
  const source = fs.readFileSync(filePath, 'utf8');
  let info;
  try {
    info = docgen.parse(
      source,
      docgen.resolver.findExportedComponentDefinition,
      docgen.defaultHandlers
    );
  } catch (e) {
    return toSchema({}, options);
  }
  return toSchema(info, options);
};
