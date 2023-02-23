import Color from 'color';
import { isUrl } from '../utils';

const getRuleList = (schema: any, form: any) => {
  let { type, format, required, max, min, maxLength, minLength, rules: ruleList = [], pattern, message, widget, title } = schema;
  let rules: any = [...ruleList];

  max = max ?? maxLength;
  min = min ?? minLength;

  if (max) {
    rules.push({ type, max, message: message?.max });
  }

  if (min) {
    rules.push({ type, min, message: message?.min });
  }
  
  if (required) {
    if (['year','quarter', 'month', 'week', 'date', 'dateTime', 'time'].includes(format) && type === 'range') {
      rules.push({
        type: 'array',
        required: true,
        len: 2,
        fields: {
          0: { type: 'string', required: true },
          1: { type: 'string', required: true },
        }
      })
    } else if (widget === 'checkbox') {
      rules.push({ type, required: true,  whitespace: true, message: title + "必填" });
    } else {
      rules.push({ type, required: true,  whitespace: true, message: message?.required });
    }
  }

  if (pattern) {
    rules.push({ pattern, message: message?.pattern });
  }

  if (format === 'url') {
    rules.push({ type: 'url', message: message?.url });
  }

  if (format === 'email') {
    rules.push({ type: 'email', message: message?.email });
  }

  if (format === 'image') {
    rules.push({
      validator: (_: any, value: any) => {
        const imagePattern = '([/|.|w|s|-])*.(?:jpg|gif|png|bmp|apng|webp|jpeg|json)';
        const _isUrl = isUrl(value);
        const _isImg = new RegExp(imagePattern).test(value);
        return _isUrl && _isImg;
      }, 
      message: message?.email ?? '请输入正确的图片格式'
    });
  }

  if (format === 'color') {
    rules.push({
      validator: (_: any, value: any) => {
        try {
          Color(value || null); // 空字符串无法解析会报错，出现空的情况传 null
          return true;
        } catch (e) {
          return false;
        }
      }, 
      message: message?.color ?? '请填写正确的颜色格式'
    });
  }

  rules = rules.map(((item: any) => {
    if (item.validator && !item.transformed) {
      const validator = item.validator;
      item.validator = async (_: any, value: any) => {
        const result = await validator(_, value, { form });
        return result ? Promise.resolve() : Promise.reject(new Error(item.message));
      };;
      item.transformed = true;
    }
    return item;
  }));

  return rules;
}

export default getRuleList;