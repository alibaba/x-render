export default [
  {
    "widget": "FPanel",
    "style": {
      "paddingTop": "20px",
      "paddingLeft": "20px",
      "paddingBottom": "20px",
      "paddingRight": "20px",
      "backgroundColor": "#ffffff",
      "marginBottom": "12px"
    },
    "children": [
      {
        "widget": "FTitle",
        "data": "基础信息"
      },
      {
        "widget": "FDescriptions",
        "column": 3,
        "items": [
          {
            "label": "创建人",
            "dataKey": "creator",
            "span": 2,
          },
          {
            "label": "关联单据",
            "dataKey": "relevanceCode",
            "span": 2
          },
          {
            "label": "单据备注",
            "dataKey": "desc",
            "span": 1
          },
          {
            "label": "创建时间",
            "dataKey": "create-time",
            "span": 3
          },
          {
            "label": "生效日期",
            "dataKey": "effective-date"
          },
          {
            "label": "描述项",
            "showLevel": 1
          },
          {
            "label": "描述项",
            "showLevel": 1
          }
        ],
        "style": {
          "backgroundColor": "#ffffff",
          "paddingTop": "0px",
          "paddingLeft": "0px",
          "paddingRight": "0px",
          "paddingBottom": "0px"
        },
        "itemShowLevel": 1,
        "getCompProps": "xxxx"
      }
    ]
  },
  // {
  //   "widget": "FTabs",
  //   "items": [
  //     {
  //       "label": "负载均衡(SLB)",
  //       "children": [
  //         {
  //           "widget": "FPanel",
  //           "style": {
  //             "paddingTop": "20px",
  //             "paddingLeft": "20px",
  //             "paddingBottom": "20px",
  //             "paddingRight": "20px",
  //             "backgroundColor": "#ffffff",
  //             "marginBottom": "12px"
  //           },
  //           "children": [
  //             {
  //               "widget": "FTitle",
  //               "data": "安全信息"
  //             },
  //             {
  //               "widget": "FDescriptions",
  //               "column": 2,
  //               "items": [
  //                 {
  //                   "label": "安全构建名称",
  //                   "dataKey": "name",
  //                   "span": 2
  //                 },
  //                 {
  //                   "label": "所属应用",
  //                   "dataKey": "app",
  //                   "span": 1
  //                 },
  //                 {
  //                   "label": "构建模式",
  //                   "dataKey": "mode",
  //                   "span": 1
  //                 },
  //                 {
  //                   "label": "公网域名",
  //                   "dataKey": "yum",
  //                   "span": 3
  //                 },
  //                 {
  //                   "label": "保留计算实例",
  //                   "dataKey": "fore"
  //                 }
  //               ],
  //               "dataKey": "safety"
  //             }
  //           ]
  //         },
  //         {
  //           "widget": "FPanel",
  //           "style": {
  //             "paddingTop": "20px",
  //             "paddingLeft": "20px",
  //             "paddingBottom": "20px",
  //             "paddingRight": "20px",
  //             "backgroundColor": "#ffffff",
  //             "marginBottom": "12px"
  //           },
  //           "children": [
  //             {
  //               "widget": "FTitle",
  //               "data": "操作日志"
  //             },
  //             {
  //               "widget": "FTable",
  //               "pagination": {
  //                 "pageSize": "3"
  //               },
  //               "style": {
  //                 "backgroundColor": "#ffffff"
  //               },
  //               "dataKey": "operLog",
  //               "column": {
  //                 "type": {
  //                   "title": "操作类型",
  //                   "dataKey": "type"
  //                 },
  //                 "creator": {
  //                   "title": "操作人",
  //                   "dataKey": "creator"
  //                 },
  //                 "time": {
  //                   "title": "操作时间",
  //                   "dataKey": "time"
  //                 },
  //                 "result": {
  //                   "title": "执行结果",
  //                   "dataKey": "result"
  //                 },
  //                 "desc": {
  //                   "title": "备注",
  //                   "dataKey": "desc"
  //                 }
  //               }
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "label": "云服务器（ECS）",
  //       "children": []
  //     }
  //   ]
  // }
]