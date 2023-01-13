const typeTemplate = "'${label}' is not a valid ${type}";
const typeTemplateCN = "数据类型必须是 ${type}";

export const validateMessagesEN = {
  default: "Validation error on field '${label}'",
  required: "'${label}' is required",
  enum: "'${label}' must be one of [${enum}]",
  whitespace: "'${label}' cannot be empty",
  date: {
    format: "'${label}' is invalid for format date",
    parse: "'${label}' could not be parsed as date",
    invalid: "'${label}' is invalid date",
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
    len: "'${label}' must be exactly ${len} characters",
    min: "'${label}' must be at least ${min} characters",
    max: "'${label}' cannot be longer than ${max} characters",
    range: "'${label}' must be between ${min} and ${max} characters",
  },
  number: {
    len: "'${label}' must equal ${len}",
    min: "'${label}' cannot be less than ${min}",
    max: "'${label}' cannot be greater than ${max}",
    range: "'${label}' must be between ${min} and ${max}",
  },
  array: {
    len: "'${label}' must be exactly ${len} in length",
    min: "'${label}' cannot be less than ${min} in length",
    max: "'${label}' cannot be greater than ${max} in length",
    range: "'${label}' must be between ${min} and ${max} in length",
  },
  pattern: {
    mismatch: "'${label}' does not match pattern ${pattern}",
  },
};

export const validateMessagesCN = {
  default: '${label}未通过校验',
  required: '${label}必填',
  whitespace: '${label}不能为空',
  date: {
    format: '${label}的格式错误',
    parse: '${label}无法被解析',
    invalid: '${label}数据不合法',
  },
  types: {
    string: typeTemplateCN,
    method: typeTemplateCN,
    array: typeTemplateCN,
    object: typeTemplateCN,
    number: typeTemplateCN,
    date: typeTemplateCN,
    boolean: typeTemplateCN,
    integer: typeTemplateCN,
    float: typeTemplateCN,
    regexp: typeTemplateCN,
    email: typeTemplateCN,
    url: typeTemplateCN,
    hex: typeTemplateCN,
  },
  string: {
    len: '${label}长度不是${len}',
    min: '${label}长度不能小于${min}',
    max: '${label}长度不能大于${max}',
    range: '${label}长度需在${min}与${max}之间',
  },
  number: {
    len: '${label}不等于${len}',
    min: '${label}不能小于${min}',
    max: '${label}不能大于${max}',
    range: '${label}需在${min}与${max}之间',
  },
  array: {
    len: '${label}长度不是${len}',
    min: '${label}长度不能小于${min}',
    max: '${label}长度不能大于${max}',
    range: '${label}长度需在${min}与${max}之间',
  },
  pattern: {
    mismatch: '${label}未通过正则判断${pattern}',
  },
};
