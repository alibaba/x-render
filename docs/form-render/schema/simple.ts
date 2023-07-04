export default {
  "type": "object",
  "properties": {
    "fr-a5u7": {
      "title": "任务列表",
      "type": "array",
      "items": {
        "title": "任务",
        "column": 1,
        "type": "object",
        "widget": "card",
        "properties": {
          "ruleType": {
            "title": "任务类型",
            "type": "string",
            "props": {
              "options": [
                {
                  "label": "分享任务",
                  "value": "share"
                },
                {
                  "label": "购课",
                  "value": "buy"
                }
              ],
              "placeholder": "请选择"
            },
            "span": 24,
            "widget": "select"
          },
          "fr-azfz": {
            "title": "分享渠道",
            "type": "array",
            "hidden": "{{rootValue.ruleType === 'buy'}}",
            "items": {
              "title": "分享渠道",
              "column": 1,
              "type": "object",
              "widget": "card",
              "properties": {
                "shareType": {
                  "title": "分享类型",
                  "type": "string",
                  "props": {
                    "options": [
                      {
                        "label": "微信卡片",
                        "value": "1"
                      },
                      {
                        "label": "小程序",
                        "value": "2"
                      }
                    ],
                    "placeholder": "请选择"
                  },
                  "widget": "select"
                },
                "fr-1eca": {
                  "title": "小程序ID",
                  "type": "string",
                  "widget": "input",
                  "hidden": "{{rootValue.shareType === '1'}}"
                },
                "fr-7qk6": {
                  "title": "分享缩略图",
                  "widget": "imageInput",
                  "hidden": "{{rootValue.shareType === '2'}}"
                }
              }
            },
            "widget": "cardList",
            "labelCol": {
              "span": 4
            },
            "wrapperCol": {
              "span": 6
            }
          }
        }
      },
      "widget": "cardList",
      "labelCol": {
        "span": 4
      },
      "wrapperCol": {
        "span": 6
      }
    }
  },
  "displayType": "row",
  "maxWidth": "340px"
}