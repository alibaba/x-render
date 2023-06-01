

const case1 = {
  "input1": {
    "title": "输入框",
    "type": "string",
    "widget": "input"
  },
  "select1": {
    "title": "下拉单选",
    "type": "string",
    "widget": "select",
    "defaultValue": "{{ (formData.input1 === '111' && formData.select1 === 'b') ? undefined : formData.select1 }}",
    "props": {
      "options": [
        {
          "label": "早",
          "value": "a",
          "hidden": true
        },
        {
          "label": "中",
          "value": "b",
          "hidden": "{{ formData.input1 === '111' }}"
        },
        {
          "label": "晚",
          "value": "c"
        }
      ]
    }
  }
}
