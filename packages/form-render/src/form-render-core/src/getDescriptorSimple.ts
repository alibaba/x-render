import { isEmpty } from 'lodash-es/lodash';
import { getAlphaFromHex } from '../../widgets/antd/color';
import moment from 'moment';
import { isObject } from './utils';
import { Schema } from '../../index';
import { RuleItem, RuleType } from 'async-validator';
import { orderBy } from 'lodash-es';

// 校验时间格式
function validatorTime(value?: string) {
  // 不检验空值，交给required决定
  if (isEmpty(value)) return true;

  //时间段
  if (Array.isArray(value)) {
    return value.every(item =>
      moment(
        item,
        [
          'YYYY-MM-DD',
          'HH:mm:ss',
          'YYYY-MM-DD HH:mm:ss',
          'YYYY-w',
          'YYYY',
          'YYYY-MM',
        ],
        true
      ).isValid()
    );
  }

  //时间字符串
  if (typeof value === 'string') {
    return moment(
      value,
      [
        'YYYY-MM-DD',
        'HH:mm:ss',
        'YYYY-MM-DD HH:mm:ss',
        'YYYY-w',
        'YYYY',
        'YYYY-MM',
      ],
      true
    ).isValid();
  }

  return false;
}

// 检验color
function validatorColor(value?: string) {
  const hexRegex = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i;
  // 不检验空值，交给required决定
  if (isEmpty(value)) return true;

  // 校验hex长度是否合规
  if (typeof value !== 'string' || ![4, 7, 9].includes(value?.length))
    return false;

  // 8位hex
  if (value?.length > 7) {
    const alpha = getAlphaFromHex(value);
    const isAlpha = alpha <= 100 && alpha >= 0;

    return hexRegex.test(value.slice(0, 7)) && isAlpha;
  }
  // 6位hex
  return hexRegex.test(value);
}

// 校验图片格式
function validatorImage(value?: string) {
  // 不检验空值，交给required决定
  if (isEmpty(value)) return true;

  if (typeof value !== 'string') return false;

  // 从0.x迁移过来的正则
  const imagePattern = '([/|.|w|s|-])*.(?:jpg|gif|png|bmp|apng|webp|jpeg|json)';
  return new RegExp(imagePattern).test(value);
}

// 将x-render的schema转为async-validator的格式
export const getDescriptorSimple = (schema: Schema = {}, path) => {
  let ruleItem: RuleItem = {};
  let result: RuleItem[] = [];

  if (isObject(schema)) {
    if (schema.type) {
      switch (schema.type) {
        case 'range':
          ruleItem.type = 'array';
          break;
        case 'html':
          ruleItem.type = 'string';
          break;
        default:
          ruleItem.type = schema.type as RuleType;
          break;
      }
    }

    ['pattern', 'min', 'max', 'len'].forEach(key => {
      if (Object.keys(schema).indexOf(key) > -1) {
        ruleItem[key] = schema[key];
      }
    });

    // ==================== 处理校验参数 =========================
    // async-validator预设好的类型
    const presetsFormat = ['email', 'url', 'textarea'];
    if (presetsFormat.includes(schema.format ?? '')) {
      ruleItem.type =
        schema.format === 'textarea' ? 'string' : (schema.format as RuleType);
    }

    // 校验hex格式
    if (schema.format === 'color') {
      ruleItem.message = '${title}的格式错误';
      ruleItem.validator = (_rule, value) => validatorColor(value);
    }

    // 校验image格式
    if (schema.format === 'image') {
      ruleItem.message = '${title}的格式错误';
      ruleItem.validator = (_rule, value) => validatorImage(value);
    }

    // 不做强校验，因为时间格式可以通过 props.format 进行更改
    // 校验时间格式
    // if (['date', 'dateTime', 'time'].includes(schema.format ?? '')) {
    //   ruleItem.message = '${title}的格式错误';
    //   ruleItem.validator = (_rule, value) => validatorTime(value);
    // }

    // ==================== 处理用户自定义rules =========================
    const handleRegx = desc => {
      if (desc.pattern && typeof desc.pattern === 'string') {
        desc.pattern = new RegExp(desc.pattern);
      }
      return desc;
    };

    // 处理过程为把required的rule放在数组第一位，先校验required，才会校验pattern或者validator，增加用户体验
    const isExistValidator = typeof ruleItem.validator === 'function';

    if (schema.rules) {
      if (Array.isArray(schema.rules)) {
        const hasRequired = schema.rules.some(rule => rule.required === true);

        if (hasRequired) {
          result = orderBy(schema.rules, r => (r.required ? 0 : 1)).concat(
            ruleItem
          );
        } else if (!!schema?.required) {
          result = isExistValidator
            ? [{ required: true }, ruleItem, ...schema.rules]
            : [{ required: true, ...ruleItem }, ...schema.rules];
        } else {
          result = [ruleItem, ...schema.rules];
        }

        result = result.map(r => handleRegx(r));
      } else if (isObject(schema.rules)) {
        // TODO:实际上渲染UI并未支持这种情况，后期需适配
        result = schema.rules?.required
          ? [{ required: true }, ruleItem, schema.rules]
          : [ruleItem, schema.rules];

        result = result.map(r => handleRegx(r));
      }
    } else {
      if (!!schema?.required) {
        result = isExistValidator
          ? [{ required: true }, ruleItem]
          : [{ required: true, ...ruleItem }];
      } else {
        result = [ruleItem];
      }
    }
  }

  return { [path]: result };
};
