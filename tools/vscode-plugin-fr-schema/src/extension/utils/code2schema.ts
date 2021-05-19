import parse from 'shift-parser';

const basicExprType = [
  'DataProperty',
  'LiteralStringExpression',
  'LiteralNumericExpression',
  'LiteralBooleanExpression',
  'LiteralNullExpression',
];

const convert = (expression: any) => {
  return expression.properties.reduce((rst: any, cur: any) => {
    const { type, value, name } = cur.expression;
    const { value: key } = cur.name;

    if (basicExprType.includes(type)) {
      return { ...rst, [key]: value };
    } else if (
      cur.expression.type === 'IdentifierExpression' &&
      name !== 'undefined'
    ) {
      return { ...rst, [key]: name };
    } else if (cur.expression.type === 'ObjectExpression') {
      return { ...rst, [key]: convert(cur.expression) };
    } else {
      return rst;
    }
  }, {});
};

const getSchemaFromCode = (code: string) => {
  const pureObject = code
    .replace(/^[\s\S]*?=/, '')
    .replace(/;$/, '')
    .replace(/\?\./g, '.');
  const ast = parse(`(${pureObject})`);
  const result = convert(ast.statements[0].expression);
  return result;
};

export default getSchemaFromCode;
