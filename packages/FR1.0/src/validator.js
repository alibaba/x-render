/* eslint-disable react-hooks/exhaustive-deps */
import { getDscriptorFromSchema, formatPathFromValidator } from './utils';
import Validator from 'async-validator';

export const validateAll = ({ formData, schema, isRequired = true }) => {
  const descriptor = getDscriptorFromSchema({
    schema,
    isRequired,
  }).fields;
  // console.log(schema, 'schema', descriptor, 'descriptor', formData, 'formData');

  const cn = {
    // required: '%s 必填',
    required: '必填',
  };

  const validator = new Validator(descriptor);
  validator.messages(cn);
  return validator.validate(formData).catch(({ errors, fields }) => {
    const normalizedErrors = errors.map(err => {
      const _path = formatPathFromValidator(err.field);
      return { name: _path, error: [err.message] };
    });
    let _errorFields = [];
    normalizedErrors.forEach(item => {
      const matchIndex = _errorFields.findIndex(ele => ele.name === item.name);
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
    // errors for address.street, address.city, address.zip
  });
};

// useEffect(() => {
//   const handleErrors = (a, b) => console.log(a, b);

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
