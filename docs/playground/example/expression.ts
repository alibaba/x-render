
const case1 = {
	"type": "object",
  "properties": {
    "input": {
      "title": "输入框",
      "type": "string",
      "widget": "input",
      "hidden": "{{ formData.hidden }}",
      "disabled": "{{ formData.disabled }}",
      "placeholder": "{{ formData.placeholder || '请输入' }}"
    },
    "placeholder": {
      "title": "修改提示信息",
      "type": "string",
      "widget": "input"
    },
    "hidden": {
      "title": "隐藏",
      "type": "boolan",
      "widget": "switch"
    },
    "disabled": {
      "title": "禁用",
      "type": "boolan",
      "widget": "switch"
    }
  }
}



const case2 = {
	"type": "object",
  "properties": {
    "input1": {
      "title": "当输入框的值为 2 时，下拉单选第二个选项隐藏，如果已选中并清空选中值",
      "type": "string",
      "widget": "input"
    },
    "select1": {
      "title": "下拉单选",
      "type": "string",
      "widget": "select",
      "defaultValue": "{{ (formData.input1 === '2' && formData.select1 === 'b') ? undefined : formData.select1 }}",
      "props": {
        "options": [
          {
            "label": "早",
            "value": "a"
          },
          {
            "label": "中",
            "value": "b",
            "hidden": "{{ formData.input1 === '2' }}"
          },
          {
            "label": "晚",
            "value": "c"
          }
        ]
      }
    }
  }
}