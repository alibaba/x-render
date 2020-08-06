import * as monaco from 'monaco-editor';

const Snippet = monaco.languages.CompletionItemKind.Snippet;
const insertTextRules =
  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;

export const initialValue = `{
  "schema": {
    "type": "object",
    "properties": {
      
    },
    "required": []
  },
  "uiSchema": {

  },
  "formData": {
    
  }
}`;

export const suggestions = [
  {
    label: 'fr-init',
    insertText: `{
  "schema": {
    "type": "object",
    "properties": {
      $0
    },
    "required": []
  },
  "uiSchema": {

  },
  "formData": {
    
  }
}`,
    documentation: '基本schema结构',
    detail: '基本schema结构',
  },
  {
    label: 'fr-object',
    insertText: `"\${1:objectName}": {
  "title": "\${2:对象}",
  "description": "这是一个对象类型",
  "type": "object",
  "properties": {
    $0
  }
}`,
    documentation: '对象',
    detail: '对象',
  },
  {
    label: 'fr-list',
    insertText: `"\${1:listName}": {
  "title": "\${2:对象数组}",
  "description": "对象数组嵌套功能",
  "type": "array",
  "minItems": 1,
  "maxItems": 3,
  "items": {
    "type": "object",
    "properties": {
      $0
    }
  }
}`,
    documentation: '对象列表',
    detail: '对象列表',
  },
  {
    label: 'fr-input',
    insertText: `"\${1:inputName}": {
  "title": "\${2:字符串}",
  "type": "string"
},`,
    documentation: '简单input',
    detail: '简单input',
  },
  {
    label: 'fr-input-complex',
    insertText: `"\${1:inputName}": {
  "title": "\${2:字符串}",
  "description": "英文或数字组合",
  "type": "string",
  "pattern": "^[A-Za-z0-9]+$",
  "message": {
    "pattern": "请输入正确格式"
  }
},$0`,
    documentation: '复杂校验input',
    detail: '复杂校验input',
  },
  {
    label: 'fr-number',
    insertText: `"\${1:numberName}": {
  "title": "\${2:数字}",
  "description": "数字输入框",
  "type": "number"
},$0`,
    documentation: '数字输入框',
    detail: '数字输入框',
  },
  {
    label: 'fr-select',
    insertText: `"\${1:selectName}": {
  "title": "\${2:单选}",
  "type": "string",
  "enum": ["a", "b","c"],
  "enumNames": ["早","中","晚"]
},$0`,
    documentation: '下拉单选框',
    detail: '下拉单选框',
  },
  {
    label: 'fr-select-radio',
    insertText: `"\${1:radiosName}": {
  "title": "\${2:单选}",
  "type": "string",
  "enum": ["a", "b","c"],
  "enumNames": ["早","中","晚"],
  "ui:widget": "radio"
},$0`,
    documentation: 'radio单选框',
    detail: 'radio单选框',
  },
  {
    label: 'fr-mselect',
    insertText: `"\${1:multiSelect}": {
  "title": "\${2:多选}",
  "description": "下拉多选",
  "type": "array",
  "items": {
    "type": "string"
  },
  "enum": ["A", "B", "C", "D"],
  "enumNames": ["杭州", "武汉", "湖州", "贵阳"],
  "ui:widget": "multiSelect"
},$0`,
    documentation: '下拉多选',
    detail: '下拉多选',
  },
  {
    label: 'fr-mselect-box',
    insertText: `"\${1:selectBoxes}": {
  "title": "\${2:多选}",
  "description": "点击多选",
  "type": "array",
  "items": {
    "type": "string"
  },
  "enum": ["A", "B", "C", "D"],
  "enumNames": ["杭州", "武汉", "湖州", "贵阳"],
},$0`,
    documentation: 'box类多选',
    detail: 'box类多选',
  },
  {
    label: 'fr-disabled',
    insertText: `"\${1:disabledName}": {
  "title": "\${2:不可用}",
  "type": "string",
  "default": "\${3:我是一个被 disabled 的值}",
  "ui:disabled": true
},$0`,
    documentation: '只读的信息',
    detail: '只读的信息',
  },
  {
    label: 'fr-date',
    insertText: `"\${1:dateName}": {
  "title": "\${2:时间}",
  "format": "\${3|date,dateTime,time|}",
  "type": "string",
  "ui:widget": "date"
},$0`,
    detail: '日期选择',
    documentation: '日期选择',
  },
  {
    label: 'fr-dateRange',
    insertText: `"\${1:rangeName}": {
  "title": "\${2:日期范围}",
  "type": "range",
  "format": "\${3|date,dateTime,time|}",
  "ui:options": {
    "placeholder": ["开始日期", "结束日期"]
  }
}`,
    detail: '日期范围',
    documentation: '从x月y日到a月b日',
  },
  {
    label: 'ui-width',
    insertText: `"ui:width": "\${1:50%}",$0`,
    detail: '组件宽度',
    documentation: '组件宽度',
  },
  {
    label: 'ui-widget',
    insertText: `"ui:widget": "\${1|date,radio,multiSelect,slider|}",$0`,
    detail: '组件类型',
    documentation: '组件类型',
  },
  {
    label: 'ui-options',
    insertText: `"ui:options": {
  $0
}`,
    detail: '特定UI设置',
    documentation: '特定UI设置',
  },
  {
    label: 'format',
    insertText: `"format": "\${1|date,dateTime,time,textarea,image,color|}",$0`,
    detail: '组件格式',
    documentation: '组件格式',
  },
].map(item => ({ ...item, kind: Snippet, insertTextRules }));
