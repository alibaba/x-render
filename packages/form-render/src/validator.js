/* eslint-disable react-hooks/exhaustive-deps */
import {
  getDescriptorFromSchema,
  formatPathFromValidator,
  isPathRequired,
  getArray,
  getSchemaFromFlatten,
} from './utils';
import { defaultValidateMessagesCN } from './validateMessageCN';
import { defaultValidateMessages } from './validateMessage';
import Validator from 'async-validator';
import { get, merge } from 'lodash-es';

export const validateAll = ({
  formData,
  flatten,
  isRequired = true,
  touchedKeys = [],
  locale = 'cn',
  validateMessages = {},
}) => {
  let _schema = getSchemaFromFlatten(flatten);
  if (Object.keys(_schema).length === 0) return Promise.resolve();
  const descriptor = getDescriptorFromSchema({
    schema: _schema,
    isRequired,
  }).fields;
  window.descriptor = descriptor;
  // console.log(descriptor, '&&&& descriptor', formData);

  let touchVerifyList = [];

  // 如果是最后的校验，所有key都touch了，就不用算这个了
  // 因为要整个构建validator在list的情况太复杂了，所以required单独拿出来处理，但是这边有不少单独处理逻辑，例如message
  if (!isRequired) {
    touchedKeys.forEach(key => {
      const keyRequired = isPathRequired(key, _schema);
      const val = get(formData, key);
      const nullValue = [undefined, null, ''].indexOf(val) > -1; // 注意 0 不是
      const isEmptyMultiSelect = Array.isArray(val) && val.length === 0;
      if ((nullValue || isEmptyMultiSelect) && keyRequired.required) {
        const _message =
          keyRequired.message || validateMessages.required || '${title}必填';
        touchVerifyList.push({ name: key, error: [_message] });
      }
    });
  }

  const cn = defaultValidateMessagesCN;
  const en = defaultValidateMessages;

  // TODO: 有些情况会出现没有rules，需要看一下，先兜底
  let validator;
  try {
    validator = new Validator(descriptor);
  } catch (error) {
    return Promise.resolve([]);
  }
  let messageFeed = locale === 'en' ? en : cn;
  merge(messageFeed, validateMessages);
  validator.messages(messageFeed);
  return validator
    .validate(formData || {})
    .then(res => {
      if (touchVerifyList.length > 0) return touchVerifyList;
      return [];
    })
    .catch(({ errors, fields }) => {
      // error的name改成正常的path
      let normalizedErrors = getArray(errors).map(err => {
        const _path = formatPathFromValidator(err.field);
        return { name: _path, error: [err.message] };
      });
      // 添加touched的required
      normalizedErrors = [...normalizedErrors, ...touchVerifyList];
      // 合并同名的error
      let _errorFields = [];
      normalizedErrors.forEach(item => {
        const matchIndex = _errorFields.findIndex(
          ele => ele.name === item.name
        );
        if (matchIndex === -1) {
          _errorFields.push(item);
        } else {
          _errorFields[matchIndex].error = [
            ..._errorFields[matchIndex].error,
            ...item.error,
          ];
        }
      });
      return _errorFields;
    });
};

// useEffect(() => {
//   const descriptor = {
//     roles: {
//       type: 'array',
//       required: true,
//       defaultField: {
//         type: 'object',
//         fields: {
//           street: { type: 'string', required: true },
//           city: { type: 'string', required: true, message: 'invalid zip' },
//           zip: [
//             {
//               type: 'string',
//               required: true,
//               message: 'invalid zip',
//             },
//             {
//               len: 8,
//               message: 'xxx',
//             },
//           ],
//           res: {
//             type: 'array',
//             required: true,
//             defaultField: {
//               type: 'object',
//               fields: {
//                 city: { type: 'string', required: true },
//               },
//             },
//           },
//         },
//       },
//     },
//     name: {
//       type: 'string',
//       required: true,
//       validator: (rule, value) => value === 'muji',
//     },
//     age: {
//       type: 'number',
//       min: 12,
//       max: 13,
//       message: 'asdfadsf',
//       // asyncValidator: (rule, value) => {
//       //   return new Promise((resolve, reject) => {
//       //     if (value < 18) {
//       //       reject('too young'); // reject with error message
//       //     } else {
//       //       resolve();
//       //     }
//       //   });
//       // },
//     },
//   };
//   const validator = new Validator(descriptor);

//   // validator.validate({ name: 'muji' }, (errors, fields) => {
//   //   if (errors) {
//   //     // validation failed, errors is an array of all errors
//   //     // fields is an object keyed by field name with an array of
//   //     // errors per field
//   //     return handleErrors(errors, fields);
//   //   }
//   //   // validation passed
//   // });

//   validator
//     .validate({ name: 'muji', age: 16, roles: [{ zip: '123', res: [{}] }] })
//     .then(() => {
//       // validation passed or without error message
//     })
//     .catch(({ errors, fields }) => {
//       return handleErrors(errors, fields);
//     });
// }, []);

var d3 = {
  list: {
    type: 'array',
    defaultField: {
      type: 'object',
      fields: {
        userName: [
          {
            bind: false,
            title: 'User Name',
            type: 'string',
            rules: [
              {
                min: 5,
                message: '长度需要大于5',
              },
              {
                max: 12,
              },
            ],
          },
          {
            min: 5,
            message: '长度需要大于5',
          },
          {
            max: 12,
          },
        ],
        selectName: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          required: true,
        },
        checkboxName: {
          title: '是否判断',
          type: 'boolean',
          valuePropName: 'checked',
        },
      },
    },
  },
};

var d2 = {
  list: {
    type: 'array',
    defaultField: {
      type: 'object',
      fields: {
        userName: [
          {
            bind: false,
            title: 'User Name',
            type: 'string',
            rules: [
              {
                min: 5,
                message: '长度需要大于5',
              },
              {
                max: 12,
              },
            ],
          },
          {
            min: 5,
            message: '长度需要大于5',
          },
          {
            max: 12,
          },
        ],
        selectName: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          required: true,
        },
        checkboxName: {
          title: '是否判断',
          type: 'boolean',
          valuePropName: 'checked',
        },
      },
    },
  },
};
