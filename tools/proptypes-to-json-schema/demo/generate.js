const fs = require('fs');
const path = require('path');
const propToSchema = require('../src/index');

// 参数为目标文件地址
const apiInfo = propToSchema(`${__dirname}/index.jsx`, { shouldAddUi: true });
fs.writeFileSync(
  path.join(__dirname, 'schema.json'),
  JSON.stringify(apiInfo, null, 2)
);
