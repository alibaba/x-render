export default {
  "type":"object",
  "properties":{
      "rulesConfig":{
          "title":"任务配置",
          "column":1,
          "type":"object",
          "widget":"card",
          "maxWidth":"340px",
          "properties":{
              // "isShowTaskModule":{
              //     "title":"是否展示任务模块",
              //     "default":true,
              //     "type":"boolean",
              //     "required":true,
              //     "widget":"switch"
              // },
              // "fr-2b9x":{
              //     "title":"任务模块标题图片",
              //     "required":true,
              //     "maxWidth":"340px",
              //     "widget":"imageInput",
              //     "hidden":"{{formData.rulesConfig.isShowTaskModule === false}}"
              // },
              "list":{
                  "title":"可以增加抽奖的行为",
                  "type":"array",
                  "hidden":"{{formData.rulesConfig.isShowTaskModule === false}}",
                  "items":{
                      "title":"抽奖行为",
                      "column":1,
                      "type":"object",
                      "widget":"lineTitle",
                      "properties":{
                          "ruleType":{
                              "title":"行为类型",
                              "type":"string",
                              "props":{
                                  "options":[
                                      {
                                          "label":"分享",
                                          "value":"A"
                                      },
                                      {
                                          "label":"购课",
                                          "value":"B"
                                      }
                                  ],
                                  "placeholder":"请选择"
                              },
                              "widget":"select"
                          },
                          "fr-jj3b":{
                              "title":"行为描述",
                              "type":"string",
                              "widget":"input",
                              "hidden":"{{rootValue.ruleType === \"B\"}}"
                          },
                          "shareChannel":{
                              "title":"分享渠道",
                              "type":"array",
                              "hidden":"{{rootValue.ruleType === \"B\"}}",
                              "items":{
                                  "title":"渠道",
                                  "description":"",
                                  "column":1,
                                  "type":"object",
                                  "widget":"lineTitle",
                                  "properties":{
                                      // "shareChannel":{
                                      //     "title":"分享渠道",
                                      //     "type":"string",
                                      //     "props":{
                                      //         "options":[
                                      //             {
                                      //                 "label":"微信好友",
                                      //                 "value":"A"
                                      //             },
                                      //             {
                                      //                 "label":"朋友圈",
                                      //                 "value":"B"
                                      //             }
                                      //         ],
                                      //         "placeholder":"请选择"
                                      //     },
                                      //     "widget":"select"
                                      // },
                                      // "shareChannelType":{
                                      //     "title":"分享类型",
                                      //     "type":"string",
                                      //     "props":{
                                      //         "options":[
                                      //             {
                                      //                 "label":"小程序",
                                      //                 "value":"D"
                                      //             },
                                      //             {
                                      //                 "label":"微信卡片",
                                      //                 "value":"C"
                                      //             }
                                      //         ],
                                      //         "placeholder":"请选择"
                                      //     },
                                      //     "widget":"select"
                                      // },
                                      // "xcxId":{
                                      //     "title":"小程序ID",
                                      //     "type":"string",
                                      //     "widget":"input",
                                      //     "hidden":"{{rootValue.shareChannelType !== \"C\"}}"
                                      // },
                                      // "shareIcon":{
                                      //     "title":"分享缩略图",
                                      //     "widget":"imageInput",
                                      //     "hidden":"{{rootValue.shareChannelType !== \"D\"}}"
                                      // }
                                  }
                              }
                          }
                      }
                  },
                  "widget":"cardList",
                  "labelCol":{
                      "span":4
                  },
                  "wrapperCol":{
                      "span":6
                  }
              }
          }
      }
  },
  "displayType":"row",
  "maxWidth":"340px"
}