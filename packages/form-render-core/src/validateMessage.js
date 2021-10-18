const typeTemplate = '${title} is not a valid ${type}';

export const defaultValidateMessages = {
  default: 'Validation error on field ${title}',
  required: '${title} is required',
  // enum: '${title} must be one of [${enum}]',
  whitespace: '${title} cannot be empty',
  date: {
    format: '${title} is invalid for format date',
    parse: '${title} could not be parsed as date',
    invalid: '${title} is invalid date',
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
    len: '${title} must be exactly ${len} characters',
    min: '${title} must be at least ${min} characters',
    max: '${title} cannot be longer than ${max} characters',
    range: '${title} must be between ${min} and ${max} characters',
  },
  number: {
    len: '${title} must equal ${len}',
    min: '${title} cannot be less than ${min}',
    max: '${title} cannot be greater than ${max}',
    range: '${title} must be between ${min} and ${max}',
  },
  array: {
    len: '${title} must be exactly ${len} in length',
    min: '${title} cannot be less than ${min} in length',
    max: '${title} cannot be greater than ${max} in length',
    range: '${title} must be between ${min} and ${max} in length',
  },
  pattern: {
    mismatch: '${title} does not match pattern ${pattern}',
  },
};
