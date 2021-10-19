const typeTemplate = '${title}的类型不是${type}';

export const defaultValidateMessagesCN = {
  default: '${title}未通过校验',
  required: '${title}必填',
  whitespace: '${title}不能为空',
  date: {
    format: '${title}的格式错误',
    parse: '${title}无法被解析',
    invalid: '${title}数据不合法',
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: '${title}长度不是${len}',
    min: '${title}长度不能小于${min}',
    max: '${title}长度不能大于${max}',
    range: '${title}长度需在${min}于${max}之间',
  },
  number: {
    len: '${title}不等于${len}',
    min: '${title}不能小于${min}',
    max: '${title}不能大于${max}',
    range: '${title}需在${min}与${max}之间',
  },
  array: {
    len: '${title}长度不是${len}',
    min: '${title}长度不能小于${min}',
    max: '${title}长度不能大于${max}',
    range: '${title}长度需在${min}于${max}之间',
  },
  pattern: {
    mismatch: '${title}未通过正则判断${pattern}',
  },
};
