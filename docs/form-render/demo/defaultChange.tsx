import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const delay = ms => new Promise(res => setTimeout(res, ms));

// const schema = {
//   type: 'object',
//   column: 3,
//   properties: {
//     input1: {
//       bind: 'a.b.c',
//       title: 'Field A',
//       type: 'string',
//       required: true,
//       //default: '1111',
//       defaultValue: '1111sss'
//     },
//     input2: {
//       title: 'Field B',
//       type: 'string',
//       required: true,
//       default: '{{formData.input1}}'
//     },
//     obj: {
//       type: 'object',
//       title: '卡片主题',
//       widget: 'card',
//       description: '这是一个对象类型',
//       column: 3,
//       properties: {
//         input1: {
//           title: 'Field A',
//           type: 'string',
//         },
//         input2: {
//           title: 'Field B',
//           type: 'string',
//           default: '{{formData.obj.input1}}'
//         }
//       }
//     },
//     list: {
//       title: '对象数组',
//       description: '对象数组嵌套功能',
//       type: 'array',
//       widget: 'cardList',
//       default: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
//       items: {
//         type: 'object',
//         title: '卡片主题',
//         description: '这是一个对象类型',
//         column: 3,
//         widget: 'lineTitle',
//         properties: {
//           input1: {
//             title: 'Field A',
//             type: 'string',
//           },
//           input2: {
//             title: 'Field B',
//             type: 'string',
//             default: '{{rootValue.input1}}'
//           },
//           obj: {
//             type: 'object',
//             title: '卡片主题',
//             widget: 'card',
//             description: '这是一个对象类型',
//             column: 3,
//             properties: {
//               input1: {
//                 title: 'Field A',
//                 type: 'string',
//               },
//               input2: {
//                 title: 'Field B',
//                 type: 'string',
//                 default: '{{formData.obj.input1}}'
//               },
//               list: {
//                 title: '对象数组',
//                 description: '对象数组嵌套功能',
//                 type: 'array',
//                 widget: 'cardList',
//                 items: {
//                   type: 'object',
//                   title: '卡片主题',
//                   description: '这是一个对象类型',
//                   column: 3,
//                   widget: 'lineTitle',
//                   properties: {
//                     input1: {
//                       title: 'Field A',
//                       type: 'string',
//                     },
//                     input2: {
//                       title: 'Field B',
//                       type: 'string',
//                       default: '{{rootValue.input1}}'
//                     }
//                   }
//                 }
//               }
//             }
//           },
//           // list: {
//           //   title: '对象数组',
//           //   description: '对象数组嵌套功能',
//           //   type: 'array',
//           //   widget: 'cardList',
//           //   items: {
//           //     type: 'object',
//           //     title: '卡片主题',
//           //     description: '这是一个对象类型',
//           //     column: 3,
//           //     widget: 'lineTitle',
//           //     properties: {
//           //       input1: {
//           //         title: 'Field A',
//           //         type: 'string',
//           //       },
//           //       input2: {
//           //         title: 'Field B',
//           //         type: 'string',
//           //         default: '{{rootValue.input1}}'
//           //       }
//           //     }
//           //   }
//           // }
//         }
//       }
//     }
//   }
// };


export const schema = {
  "type": "object",
  "properties": {
    "basic": {
      "title": "基础设置",
      "type": "object",
      "widget": "title",
      "properties": {
        "rule": {
          "title": "规则1",
          "type": "object",
          "widget": "card",
          "properties": {
            "validRange": {
              "title": "生效范围",
              "type": "object",
              "widget": "subTitle",
              "properties": {
                "openChannel": {
                  "title": "开通渠道",
                  "type": "array",
                  "required": true,
                  "order": "1",
                  "widget": "multiSelect",
                  "initialValue": ["b"],
                  "props": {
                    "options": [
                      { "label": "B站-产品中心", "value": "b" },
                      { "label": "BD工作台-前台产品", "value": "bd" },
                      { "label": "P站-特邀商户产品", "value": "p" }
                    ]
                  }
                }
              }
            },
            "permissionSets": {
              "title": "权限集设置",
              "type": "object",
              "widget": "subTitle",
              "properties": {
                "validRange": {
                  "title": "开通渠道",
                  "type": "array",
                  "widget": "multiSelect",
                  "required": true,
                  "props": {
                    "options": [
                      { "label": "B站-产品中心", "value": "b" },
                      { "label": "BD工作台-前台产品", "value": "bd" },
                      { "label": "P站-特邀商户产品", "value": "p" }
                    ]
                  }
                }
              }
            }
          }
        },
      },
    },
    "jsapi": {
      "title": "功能属性-JSAPI",
      "type": "object",
      "widget": "title",
      "properties": {
        "jsapi-multiRecord": {
          "type": 'array',
          "widget": 'cardList',
          "default": [
            {
              "validRange": {
                "openChannel": ['b'],
                "signMode": ['standard'],
                "mcc": ['A1_B1']
              }
            },
          ],
          "props": {
            "onAdd": 'onItemAdd',
            "onRemove": 'onItemRemove',
            "onCopy": 'onItemCopy',
          },
          "items": {
            "type": 'object',
            "title": '规则',
            "widget": 'card',
            "properties": {
              "validRange": {
                "title": "生效范围",
                "type": "object",
                "widget": "subTitle",
                "properties": {
                  "openChannel": {
                    "title": "开通渠道",
                    "type": "array",
                    "widget": "multiSelect",
                    "required": true,
                    "props": {
                      "options": [
                        { "label": "B站-产品中心", "value": "b" },
                        { "label": "BD工作台-前台产品", "value": "bd" },
                        { "label": "P站-特邀商户产品", "value": "p" }
                      ]
                    }
                  },
                  "signMode": {
                    "title": "签约模式",
                    "tooltip": "为了提高BD代签约效率，BD代签约流程中支持设置两种签约模式。标准模式建议对BD展示较少的关键属性，以降低BD的理解成本，高级模式建议对BD展示较全的属性，以提供部分特殊业务场景使用。",
                    "type": "array",
                    "widget": "checkboxes",
                    "required": true,
                    "props": {
                      "options": [
                        { "label": "标准模式", "value": "standard" },
                        { "label": "高级模式", "value": "advanced" }
                      ]
                    }
                  },
                  "mcc": {
                    "title": "经营类目",
                    "type": "array",
                    "widget": "multiMcc",
                    "required": true,
                  }
                }
              },
              "arAttribute": {
                "title": "功能属性设置",
                "type": "object",
                "widget": "subTitle",
                "properties": {
                  "table": {
                    "type": "object",
                    "widget": "attributesTable",
                    "props": {
                      "tradeScene": {
                        "title": "交易场景",
                        "props": {
                          validAttrValueOptions: [
                            {
                              label: '小程序',
                              value: 'miniProgram'
                            },
                            {
                              label: '线下场所',
                              value: ''
                            }
                          ]
                        }
                      },
                      "refundPeriod": {
                        "title": "退款期限",
                        "props": {
                          validAttrValueOptions: [
                            {
                              label: '6个月',
                              value: '6M'
                            },
                            {
                              label: '12个月',
                              value: '12M'
                            },
                            {
                              label: '18个月',
                              value: '18M'
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              }
            },
          },
        }
      }
    },
    "businessDivision": {
      "title": "功能属性-商家分账",
      "type": "object",
      "widget": "title",
      "properties": {
        "businessDivision-multiRecord": {
          "type": 'array',
          "widget": 'cardList',
          "default": [
            {
              "validRange": {
                "openChannel": ['b'],
                "signMode": ['standard'],
                "mcc": ['A1_B1']
              }
            },
          ],
          "props": {
            "onAdd": 'onItemAdd',
            "onRemove": 'onItemRemove',
            "onCopy": 'onItemCopy',
          },
          "items": {
            "type": 'object',
            "title": '规则',
            "widget": 'card',
            "properties": {
              "validRange": {
                "title": "生效范围",
                "type": "object",
                "widget": "subTitle",
                "properties": {
                  "openChannel": {
                    "title": "开通渠道",
                    "type": "array",
                    "widget": "multiSelect",
                    "required": true,
                    "props": {
                      "options": [
                        { "label": "B站-产品中心", "value": "b" },
                        { "label": "BD工作台-前台产品", "value": "bd" },
                        { "label": "P站-特邀商户产品", "value": "p" }
                      ]
                    }
                  },
                  "signMode": {
                    "title": "签约模式",
                    "tooltip": "为了提高BD代签约效率，BD代签约流程中支持设置两种签约模式。标准模式建议对BD展示较少的关键属性，以降低BD的理解成本，高级模式建议对BD展示较全的属性，以提供部分特殊业务场景使用。",
                    "type": "array",
                    "widget": "checkboxes",
                    "required": true,
                    "props": {
                      "options": [
                        { "label": "标准模式", "value": "standard" },
                        { "label": "高级模式", "value": "advanced" }
                      ]
                    }
                  },
                  "mcc": {
                    "title": "经营类目",
                    "type": "array",
                    "widget": "multiMcc",
                    "required": true,
                  }
                }
              },
              "arAttribute": {
                "title": "功能属性设置",
                "type": "object",
                "widget": "subTitle",
                "properties": {
                  "table": {
                    "type": "object",
                    "widget": "attributesTable",
                    "props": {
                      "tradeScene": {
                        "title": "交易场景",
                        "props": {
                          validAttrValueOptions: [
                            {
                              label: '小程序',
                              value: 'miniProgram'
                            },
                            {
                              label: '线下场所',
                              value: ''
                            }
                          ]
                        }
                      },
                      "refundPeriod": {
                        "title": "退款期限",
                        "props": {
                          validAttrValueOptions: [
                            {
                              label: '6个月',
                              value: '6M'
                            },
                            {
                              label: '12个月',
                              value: '12M'
                            },
                            {
                              label: '18个月',
                              value: '18M'
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              }
            },
          },
        }
      }
    },
    "periodicDeduction": {
      "title": "功能属性-周期扣款",
      "type": "object",
      "widget": "title",
      "properties": {
        "periodicDeduction-multiRecord": {
          "type": 'array',
          "widget": 'cardList',
          "default": [
            {
              "validRange": {
                "openChannel": ['b'],
                "signMode": ['standard'],
                "mcc": ['A1_B1']
              }
            },
          ],
          "props": {
            "onAdd": 'onItemAdd',
            "onRemove": 'onItemRemove',
            "onCopy": 'onItemCopy',
          },
          "items": {
            "type": 'object',
            "title": '规则',
            "widget": 'card',
            "properties": {
              "validRange": {
                "title": "生效范围",
                "type": "object",
                "widget": "subTitle",
                "properties": {
                  "openChannel": {
                    "title": "开通渠道",
                    "type": "array",
                    "widget": "multiSelect",
                    "required": true,
                    "props": {
                      "options": [
                        { "label": "B站-产品中心", "value": "b" },
                        { "label": "BD工作台-前台产品", "value": "bd" },
                        { "label": "P站-特邀商户产品", "value": "p" }
                      ]
                    }
                  },
                  "signMode": {
                    "title": "签约模式",
                    "tooltip": "为了提高BD代签约效率，BD代签约流程中支持设置两种签约模式。标准模式建议对BD展示较少的关键属性，以降低BD的理解成本，高级模式建议对BD展示较全的属性，以提供部分特殊业务场景使用。",
                    "type": "array",
                    "widget": "checkboxes",
                    "required": true,
                    "props": {
                      "options": [
                        { "label": "标准模式", "value": "standard" },
                        { "label": "高级模式", "value": "advanced" }
                      ]
                    }
                  },
                  "mcc": {
                    "title": "经营类目",
                    "type": "array",
                    "widget": "multiMcc",
                    "required": true,
                  }
                }
              },
              "arAttribute": {
                "title": "功能属性设置",
                "type": "object",
                "widget": "subTitle",
                "properties": {
                  "table": {
                    "type": "object",
                    "widget": "attributesTable",
                    "props": {
                      "tradeScene": {
                        "title": "交易场景",
                        "props": {
                          validAttrValueOptions: [
                            {
                              label: '小程序',
                              value: 'miniProgram'
                            },
                            {
                              label: '线下场所',
                              value: ''
                            }
                          ]
                        }
                      },
                      "refundPeriod": {
                        "title": "退款期限",
                        "props": {
                          validAttrValueOptions: [
                            {
                              label: '6个月',
                              value: '6M'
                            },
                            {
                              label: '12个月',
                              value: '12M'
                            },
                            {
                              label: '18个月',
                              value: '18M'
                            }
                          ]
                        }
                      }
                    }
                  }
                }
              }
            },
          },
        }
      }
    },
    "accessRules1": {
      "title": "准入规则-前台产品",
      "type": "object",
      "widget": "title",
      "properties": {
        "accessRules1-multiRecord": {
          "type": 'array',
          "widget": 'cardList',
          "props": {
            "onAdd": 'onItemAdd',
            "onRemove": 'onItemRemove',
            "onCopy": 'onItemCopy',
          },
          default: [
            {
              conditions: {
                whiteList: {
                  "isOpen": '1',
                  "allUid": [
                    {
                      uid: '111'
                    },
                    {
                      uid: '222'
                    }
                  ]
                }
              },
            }
          ],
          "items": {
            "type": 'object',
            "title": '规则',
            "widget": 'card',
            "properties": {
              "validRange": {
                "title": "生效范围",
                "type": "object",
                "widget": "subTitle",
                "properties": {
                  "openChannel": {
                    "title": "开通渠道",
                    "type": "array",
                    "widget": "multiSelect",
                    "required": true,
                    "props": {
                      "options": [
                        { "label": "B站-产品中心", "value": "b" },
                        { "label": "BD工作台-前台产品", "value": "bd" },
                        { "label": "P站-特邀商户产品", "value": "p" }
                      ]
                    }
                  },
                }
              },
              "conditions": {
                "title": "准入条件设置",
                "type": "object",
                "widget": "subTitle",
                "properties": {
                  "merchantType": {
                    "title": "商家类型",
                    "type": "string",
                    "widget": "select",
                    "required": true,
                    "props": {
                      "options": [
                        { "label": "个人", "value": "1" },
                        { "label": "个体工商户", "value": "2" },
                        { "label": "事业单位", "value": "3" },
                        { "label": "党政及国家机关", "value": "4" },
                        { "label": "民办非企业组织", "value": "5" }
                      ]
                    }
                  },
                  "certifyType": {
                    "title": "认证类别",
                    "type": "string",
                    "widget": "select",
                    "required": true,
                    "props": {
                      "options": [
                        { "label": "需要认证", "value": "1" },
                        { "label": "无需认证", "value": "2" }
                      ]
                    }
                  },
                  "mcc": {
                    "title": "经营类目",
                    "type": "array",
                    "widget": "multiMcc",
                    "required": true,
                  },
                  "balanceAccount": {
                    "title": "余额账户",
                    "type": "string",
                    "widget": "radio",
                    "required": true,
                    "props": {
                      "options": [
                        { "label": "开启", "value": "1" },
                        { "label": "不开启", "value": "2" }
                      ]
                    }
                  },
                  "partners": {
                    "title": "支付型服务商校验",
                    "type": "string",
                    "tooltip": "xxxx",
                    "widget": "radio",
                    "required": true,
                    "props": {
                      "options": [
                        { "label": "开启", "value": "1" },
                        { "label": "不开启", "value": "2" }
                      ]
                    }
                  },
                  "whiteList": {
                    "title": "白名单功能",
                    "type": "object",
                    "tooltip": "xxxx",
                    "widget": "whiteList",
                    "required": false,
                    "props": {
                      "options": [
                        { "label": "开启", "value": "1" },
                        { "label": "不开启", "value": "2" }
                      ]
                    }
                  }
                }
              }
            },
          },
        }
      }
    },
  }
}

const Demo = () => {
  const form = useForm();

  const beforeFinish: any = ({ data, errors, schema }) => {
    if (data.objectName && data.objectName.input1 === '123') return;
    return delay(1000).then(() => {
      return {
        name: 'objectName.select1',
        error: ['外部校验错误'],
      };
    });
  };

  const onFinish = (formData: any) => {
    console.log(formData, 'formData');
  };

  return (
    <div>
      <FormRender
        displayType='row'
        form={form}
        schema={schema}
        beforeFinish={beforeFinish}
        onFinish={onFinish} // 如果beforeFinish返回一个promise，onFinish会等promise resolve之后执行
        debug={true}
        widgets={{
          title: ({ children }) => {
            return children;
          }
        }}
      />
      <Button onClick={form.submit} type='primary'>提交</Button>
    </div>
  );
};

export default Demo;
