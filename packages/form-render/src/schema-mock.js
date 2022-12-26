// export default {
//   "properties":{
//       "activityApplyInfo":{
//           "properties":{
//               "isBrandActivity":{
//                   "enum":[
//                       true,
//                       false
//                   ],
//                   "enumNames":[
//                       "是",
//                       "否"
//                   ],
//                   "props":{

//                   },
//                   "title":"是否品牌活动",
//                   "type":"boolean",
//                   "required":true,
//                   "widget":"radio"
//               },
//               "exchangeType":{
//                   "enum":[
//                       "SHOPPING_COUPON",
//                       "STORE_RIGHT",
//                       "BRAND_RIGHT",
//                       "POINT_CASH"
//                   ],
//                   "enumNames":[
//                       "积分兑换购物券",
//                       "积分兑换门店权益",
//                       "积分兑换品牌权益",
//                       "积分加钱购"
//                   ],
//                   "props":{

//                   },
//                   "title":"兑换类型",
//                   "required":true,
//                   "type":"string",
//                   "widget":"select"
//               },
//               "exchangeSubType":{
//                   "enum":[
//                       "BRAND_COUPON",
//                       "NORMAL_COUPON",
//                       "FULL_REDUCE",
//                       "NORMAL_PARKING"
//                   ],
//                   "enumNames":[
//                       "品牌券",
//                       "银泰券",
//                       "满减券",
//                       "停车券"
//                   ],
//                   "props":{

//                   },
//                   "title":"业务细分",
//                   "dependencies":[
//                       "exchangeType"
//                   ],
//                   "type":"string",
//                   "required":true,
//                   "widget":"slider"
//               },
//               "applyDesc":{
//                   "props":{

//                   },
//                   "title":"提报说明",
//                   "required":true,
//                   "type":"string",
//                   "max":100,
//                   "format":"textarea"
//               },
//               "salePrice":{
//                   "props":{
//                       "suffix":"元"
//                   },
//                   "rules":[
//                       {
//                           "pattern":"^(([1-9]{1}\\d*)|(0{1}))(\\.\\d{1,2})?$",
//                           "message":"请输入市场价,正数且最多保留两位小数"
//                        }
//                   ],
//                   "maxLength":10,
//                   "title":"市场价",
//                   "required":true,
//                   "type":"string"
//               },
//               "isFreeInOtherChannel":{
//                   "enum":[
//                       true,
//                       false
//                   ],
//                   "enumNames":[
//                       "是",
//                       "否"
//                   ],
//                   "props":{

//                   },
//                   "title":"是否其他渠道免费派发",
//                   "type":"boolean",
//                   "required":true,
//                   "widget":"radio"
//               }
//           },
//           "props":{

//           },
//           "collapsed":false,
//           "title":"活动提报信息",
//           "type":"object",
//           "theme": "card"
//       },

//       "activityBasicInfo8":{
//         "properties":{
//             "title":{
//                 "props":{

//                 },
//                 "title":"活动标题",
//                 "required":true,
//                 "max":20,
//                 "type":"string"
//             },
//             "startTime":{
//                 "format":"dateTime",
//                 "props":{

//                 },
//                 "title":"活动开始时间",
//                 "required":true,
//                 "type":"string"
//             },
//             "endTime":{
//                 "format":"dateTime",
//                 "props":{

//                 },
//                 "title":"活动结束时间",
//                 "required":true,
//                 "type":"string"
//             },
//             "storeScopes":{
//                 "props":{

//                 },
//                 "title":"参与门店",
//                 "type":"array",
//                 "required":true,
//                 "widget":"slider"
//             },
//             "activityScopes":{
//                 "enum":[
//                     "online",
//                     "offline"
//                 ],
//                 "enumNames":[
//                     "线上活动",
//                     "线下活动"
//                 ],
//                 "props":{

//                 },
//                 "title":"活动范围",
//                 "type":"array",
//                 "required":true,
//                 "widget":"checkboxes"
//             },
//             "stockType":{
//                 "enum":[
//                     "DAILY",
//                     "TOTAL",
//                     "UNLIMITED"
//                 ],
//                 "enumNames":[
//                     "每日库存",
//                     "总库存",
//                     "不限量"
//                 ],
//                 "props":{

//                 },
//                 "title":"库存类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "totalStock":{
//                 "props":{
//                     "precision":0,
//                     "min":1,
//                     "max":9999999
//                 },
//                 "title":"库存数量",
//                 "min":1,
//                 "max":9999999,
//                 "required":true,
//                 "type":"number",
//                 "hidden":"{{formData.activityBasicInfo.stockType === \"UNLIMITED\"}}"
//             },
//             "userLimitType":{
//                 "enum":[
//                     "DAILY",
//                     "TOTAL",
//                     "UNLIMITED"
//                 ],
//                 "enumNames":[
//                     "每人每天限",
//                     "活动期间限",
//                     "不限量"
//                 ],
//                 "props":{

//                 },
//                 "title":"限领类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "limitUpper":{
//                 "props":{
//                     "precision":0,
//                     "min":1,
//                     "max":9999999
//                 },
//                 "title":"限领数量",
//                 "min":1,
//                 "max":9999999,
//                 "required":true,
//                 "type":"number",
//                 "hidden":"{{formData.activityBasicInfo.userLimitType === \"UNLIMITED\"}}"
//             },
//             "userIdentity":{
//                 "enum":[
//                     "member",
//                     "member365"
//                 ],
//                 "enumNames":[
//                     "全部可领",
//                     "仅365会员"
//                 ],
//                 "props":{

//                 },
//                 "title":"可领用户类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "employeeLimitIdentities":{
//                 "enum":[
//                     "employee",
//                     "guider"
//                 ],
//                 "enumNames":[
//                     "银泰员工",
//                     "导购员"
//                 ],
//                 "props":{

//                 },
//                 "default":[

//                 ],
//                 "title":"限领员工类型",
//                 "type":"array",
//                 "widget":"checkboxes"
//             },
//             "merchantMemberBrand":{
//                 "props":{
//                     "pureSelect":true,
//                     "placeholder":"选择后仅入会品牌会员可领"
//                 },
//                 "title":"品牌会员",
//                 "description":"选择后仅入会品牌会员可领",
//                 "type":"object",
//                 "widget":"merchantMemberBrand"
//             },
//             "userGroupId":{
//                 "props":{

//                 },
//                 "title":"宙斯人群",
//                 "type":"string"
//             },
//             "riskCode":{
//                 "props":{

//                 },
//                 "title":"活动风控码",
//                 "type":"string"
//             }
//         },
//         "props":{

//         },
//         "title":"基础信息",
//         "type":"object",
//         "theme": "card"
//     },

//       "activityBasicInfo7":{
//         "properties":{
//             "title":{
//                 "props":{

//                 },
//                 "title":"活动标题",
//                 "required":true,
//                 "max":20,
//                 "type":"string"
//             },
//             "startTime":{
//                 "format":"dateTime",
//                 "props":{

//                 },
//                 "title":"活动开始时间",
//                 "required":true,
//                 "type":"string"
//             },
//             "endTime":{
//                 "format":"dateTime",
//                 "props":{

//                 },
//                 "title":"活动结束时间",
//                 "required":true,
//                 "type":"string"
//             },
//             "storeScopes":{
//                 "props":{

//                 },
//                 "title":"参与门店",
//                 "type":"array",
//                 "required":true,
//                 "widget":"storeScopeSelect"
//             },
//             "activityScopes":{
//                 "enum":[
//                     "online",
//                     "offline"
//                 ],
//                 "enumNames":[
//                     "线上活动",
//                     "线下活动"
//                 ],
//                 "props":{

//                 },
//                 "title":"活动范围",
//                 "type":"array",
//                 "required":true,
//                 "widget":"checkboxes"
//             },
//             "stockType":{
//                 "enum":[
//                     "DAILY",
//                     "TOTAL",
//                     "UNLIMITED"
//                 ],
//                 "enumNames":[
//                     "每日库存",
//                     "总库存",
//                     "不限量"
//                 ],
//                 "props":{

//                 },
//                 "title":"库存类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "totalStock":{
//                 "props":{
//                     "precision":0,
//                     "min":1,
//                     "max":9999999
//                 },
//                 "title":"库存数量",
//                 "min":1,
//                 "max":9999999,
//                 "required":true,
//                 "type":"number",
//                 "hidden":"{{formData.activityBasicInfo.stockType === \"UNLIMITED\"}}"
//             },
//             "userLimitType":{
//                 "enum":[
//                     "DAILY",
//                     "TOTAL",
//                     "UNLIMITED"
//                 ],
//                 "enumNames":[
//                     "每人每天限",
//                     "活动期间限",
//                     "不限量"
//                 ],
//                 "props":{

//                 },
//                 "title":"限领类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "limitUpper":{
//                 "props":{
//                     "precision":0,
//                     "min":1,
//                     "max":9999999
//                 },
//                 "title":"限领数量",
//                 "min":1,
//                 "max":9999999,
//                 "required":true,
//                 "type":"number",
//                 "hidden":"{{formData.activityBasicInfo.userLimitType === \"UNLIMITED\"}}"
//             },
//             "userIdentity":{
//                 "enum":[
//                     "member",
//                     "member365"
//                 ],
//                 "enumNames":[
//                     "全部可领",
//                     "仅365会员"
//                 ],
//                 "props":{

//                 },
//                 "title":"可领用户类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "employeeLimitIdentities":{
//                 "enum":[
//                     "employee",
//                     "guider"
//                 ],
//                 "enumNames":[
//                     "银泰员工",
//                     "导购员"
//                 ],
//                 "props":{

//                 },
//                 "default":[

//                 ],
//                 "title":"限领员工类型",
//                 "type":"array",
//                 "widget":"checkboxes"
//             },
//             "merchantMemberBrand":{
//                 "props":{
//                     "pureSelect":true,
//                     "placeholder":"选择后仅入会品牌会员可领"
//                 },
//                 "title":"品牌会员",
//                 "description":"选择后仅入会品牌会员可领",
//                 "type":"object",
//                 "widget":"merchantMemberBrand"
//             },
//             "userGroupId":{
//                 "props":{

//                 },
//                 "title":"宙斯人群",
//                 "type":"string"
//             },
//             "riskCode":{
//                 "props":{

//                 },
//                 "title":"活动风控码",
//                 "type":"string"
//             }
//         },
//         "props":{

//         },
//         "title":"基础信息",
//         "type":"object"
//     },

//       "activityBasicInfo6":{
//         "properties":{
//             "title":{
//                 "props":{

//                 },
//                 "title":"活动标题",
//                 "required":true,
//                 "max":20,
//                 "type":"string"
//             },
//             "startTime":{
//                 "format":"dateTime",
//                 "props":{

//                 },
//                 "title":"活动开始时间",
//                 "required":true,
//                 "type":"string"
//             },
//             "endTime":{
//                 "format":"dateTime",
//                 "props":{

//                 },
//                 "title":"活动结束时间",
//                 "required":true,
//                 "type":"string"
//             },
//             "storeScopes":{
//                 "props":{

//                 },
//                 "title":"参与门店",
//                 "type":"array",
//                 "required":true,
//                 "widget":"storeScopeSelect"
//             },
//             "activityScopes":{
//                 "enum":[
//                     "online",
//                     "offline"
//                 ],
//                 "enumNames":[
//                     "线上活动",
//                     "线下活动"
//                 ],
//                 "props":{

//                 },
//                 "title":"活动范围",
//                 "type":"array",
//                 "required":true,
//                 "widget":"checkboxes"
//             },
//             "stockType":{
//                 "enum":[
//                     "DAILY",
//                     "TOTAL",
//                     "UNLIMITED"
//                 ],
//                 "enumNames":[
//                     "每日库存",
//                     "总库存",
//                     "不限量"
//                 ],
//                 "props":{

//                 },
//                 "title":"库存类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "totalStock":{
//                 "props":{
//                     "precision":0,
//                     "min":1,
//                     "max":9999999
//                 },
//                 "title":"库存数量",
//                 "min":1,
//                 "max":9999999,
//                 "required":true,
//                 "type":"number",
//                 "hidden":"{{formData.activityBasicInfo.stockType === \"UNLIMITED\"}}"
//             },
//             "userLimitType":{
//                 "enum":[
//                     "DAILY",
//                     "TOTAL",
//                     "UNLIMITED"
//                 ],
//                 "enumNames":[
//                     "每人每天限",
//                     "活动期间限",
//                     "不限量"
//                 ],
//                 "props":{

//                 },
//                 "title":"限领类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "limitUpper":{
//                 "props":{
//                     "precision":0,
//                     "min":1,
//                     "max":9999999
//                 },
//                 "title":"限领数量",
//                 "min":1,
//                 "max":9999999,
//                 "required":true,
//                 "type":"number",
//                 "hidden":"{{formData.activityBasicInfo.userLimitType === \"UNLIMITED\"}}"
//             },
//             "userIdentity":{
//                 "enum":[
//                     "member",
//                     "member365"
//                 ],
//                 "enumNames":[
//                     "全部可领",
//                     "仅365会员"
//                 ],
//                 "props":{

//                 },
//                 "title":"可领用户类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "employeeLimitIdentities":{
//                 "enum":[
//                     "employee",
//                     "guider"
//                 ],
//                 "enumNames":[
//                     "银泰员工",
//                     "导购员"
//                 ],
//                 "props":{

//                 },
//                 "default":[

//                 ],
//                 "title":"限领员工类型",
//                 "type":"array",
//                 "widget":"checkboxes"
//             },
//             "merchantMemberBrand":{
//                 "props":{
//                     "pureSelect":true,
//                     "placeholder":"选择后仅入会品牌会员可领"
//                 },
//                 "title":"品牌会员",
//                 "description":"选择后仅入会品牌会员可领",
//                 "type":"object",
//                 "widget":"merchantMemberBrand"
//             },
//             "userGroupId":{
//                 "props":{

//                 },
//                 "title":"宙斯人群",
//                 "type":"string"
//             },
//             "riskCode":{
//                 "props":{

//                 },
//                 "title":"活动风控码",
//                 "type":"string"
//             }
//         },
//         "props":{

//         },
//         "title":"基础信息",
//         "type":"object"
//     },

//       "activityBasicInfo5":{
//           "properties":{
//               "title":{
//                   "props":{

//                   },
//                   "title":"活动标题",
//                   "required":true,
//                   "max":20,
//                   "type":"string"
//               },
//               "startTime":{
//                   "format":"dateTime",
//                   "props":{

//                   },
//                   "title":"活动开始时间",
//                   "required":true,
//                   "type":"string"
//               },
//               "endTime":{
//                   "format":"dateTime",
//                   "props":{

//                   },
//                   "title":"活动结束时间",
//                   "required":true,
//                   "type":"string"
//               },
//               "storeScopes":{
//                   "props":{

//                   },
//                   "title":"参与门店",
//                   "type":"array",
//                   "required":true,
//                   "widget":"storeScopeSelect"
//               },
//               "activityScopes":{
//                   "enum":[
//                       "online",
//                       "offline"
//                   ],
//                   "enumNames":[
//                       "线上活动",
//                       "线下活动"
//                   ],
//                   "props":{

//                   },
//                   "title":"活动范围",
//                   "type":"array",
//                   "required":true,
//                   "widget":"checkboxes"
//               },
//               "stockType":{
//                   "enum":[
//                       "DAILY",
//                       "TOTAL",
//                       "UNLIMITED"
//                   ],
//                   "enumNames":[
//                       "每日库存",
//                       "总库存",
//                       "不限量"
//                   ],
//                   "props":{

//                   },
//                   "title":"库存类型",
//                   "required":true,
//                   "type":"string",
//                   "widget":"radio"
//               },
//               "totalStock":{
//                   "props":{
//                       "precision":0,
//                       "min":1,
//                       "max":9999999
//                   },
//                   "title":"库存数量",
//                   "min":1,
//                   "max":9999999,
//                   "required":true,
//                   "type":"number",
//                   "hidden":"{{formData.activityBasicInfo.stockType === \"UNLIMITED\"}}"
//               },
//               "userLimitType":{
//                   "enum":[
//                       "DAILY",
//                       "TOTAL",
//                       "UNLIMITED"
//                   ],
//                   "enumNames":[
//                       "每人每天限",
//                       "活动期间限",
//                       "不限量"
//                   ],
//                   "props":{

//                   },
//                   "title":"限领类型",
//                   "required":true,
//                   "type":"string",
//                   "widget":"radio"
//               },
//               "limitUpper":{
//                   "props":{
//                       "precision":0,
//                       "min":1,
//                       "max":9999999
//                   },
//                   "title":"限领数量",
//                   "min":1,
//                   "max":9999999,
//                   "required":true,
//                   "type":"number",
//                   "hidden":"{{formData.activityBasicInfo.userLimitType === \"UNLIMITED\"}}"
//               },
//               "userIdentity":{
//                   "enum":[
//                       "member",
//                       "member365"
//                   ],
//                   "enumNames":[
//                       "全部可领",
//                       "仅365会员"
//                   ],
//                   "props":{

//                   },
//                   "title":"可领用户类型",
//                   "required":true,
//                   "type":"string",
//                   "widget":"radio"
//               },
//               "employeeLimitIdentities":{
//                   "enum":[
//                       "employee",
//                       "guider"
//                   ],
//                   "enumNames":[
//                       "银泰员工",
//                       "导购员"
//                   ],
//                   "props":{

//                   },
//                   "default":[

//                   ],
//                   "title":"限领员工类型",
//                   "type":"array",
//                   "widget":"checkboxes"
//               },
//               "merchantMemberBrand":{
//                   "props":{
//                       "pureSelect":true,
//                       "placeholder":"选择后仅入会品牌会员可领"
//                   },
//                   "title":"品牌会员",
//                   "description":"选择后仅入会品牌会员可领",
//                   "type":"object",
//                   "widget":"merchantMemberBrand"
//               },
//               "userGroupId":{
//                   "props":{

//                   },
//                   "title":"宙斯人群",
//                   "type":"string"
//               },
//               "riskCode":{
//                   "props":{

//                   },
//                   "title":"活动风控码",
//                   "type":"string"
//               }
//           },
//           "props":{

//           },
//           "title":"基础信息",
//           "type":"object"
//       },

//       "activityBasicInfo4":{
//         "properties":{
//             "title":{
//                 "props":{

//                 },
//                 "title":"活动标题",
//                 "required":true,
//                 "max":20,
//                 "type":"string"
//             },
//             "startTime":{
//                 "format":"dateTime",
//                 "props":{

//                 },
//                 "title":"活动开始时间",
//                 "required":true,
//                 "type":"string"
//             },
//             "endTime":{
//                 "format":"dateTime",
//                 "props":{

//                 },
//                 "title":"活动结束时间",
//                 "required":true,
//                 "type":"string"
//             },
//             "storeScopes":{
//                 "props":{

//                 },
//                 "title":"参与门店",
//                 "type":"array",
//                 "required":true,
//                 "widget":"storeScopeSelect"
//             },
//             "activityScopes":{
//                 "enum":[
//                     "online",
//                     "offline"
//                 ],
//                 "enumNames":[
//                     "线上活动",
//                     "线下活动"
//                 ],
//                 "props":{

//                 },
//                 "title":"活动范围",
//                 "type":"array",
//                 "required":true,
//                 "widget":"checkboxes"
//             },
//             "stockType":{
//                 "enum":[
//                     "DAILY",
//                     "TOTAL",
//                     "UNLIMITED"
//                 ],
//                 "enumNames":[
//                     "每日库存",
//                     "总库存",
//                     "不限量"
//                 ],
//                 "props":{

//                 },
//                 "title":"库存类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "totalStock":{
//                 "props":{
//                     "precision":0,
//                     "min":1,
//                     "max":9999999
//                 },
//                 "title":"库存数量",
//                 "min":1,
//                 "max":9999999,
//                 "required":true,
//                 "type":"number",
//                 "hidden":"{{formData.activityBasicInfo.stockType === \"UNLIMITED\"}}"
//             },
//             "userLimitType":{
//                 "enum":[
//                     "DAILY",
//                     "TOTAL",
//                     "UNLIMITED"
//                 ],
//                 "enumNames":[
//                     "每人每天限",
//                     "活动期间限",
//                     "不限量"
//                 ],
//                 "props":{

//                 },
//                 "title":"限领类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "limitUpper":{
//                 "props":{
//                     "precision":0,
//                     "min":1,
//                     "max":9999999
//                 },
//                 "title":"限领数量",
//                 "min":1,
//                 "max":9999999,
//                 "required":true,
//                 "type":"number",
//                 "hidden":"{{formData.activityBasicInfo.userLimitType === \"UNLIMITED\"}}"
//             },
//             "userIdentity":{
//                 "enum":[
//                     "member",
//                     "member365"
//                 ],
//                 "enumNames":[
//                     "全部可领",
//                     "仅365会员"
//                 ],
//                 "props":{

//                 },
//                 "title":"可领用户类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "employeeLimitIdentities":{
//                 "enum":[
//                     "employee",
//                     "guider"
//                 ],
//                 "enumNames":[
//                     "银泰员工",
//                     "导购员"
//                 ],
//                 "props":{

//                 },
//                 "default":[

//                 ],
//                 "title":"限领员工类型",
//                 "type":"array",
//                 "widget":"checkboxes"
//             },
//             "merchantMemberBrand":{
//                 "props":{
//                     "pureSelect":true,
//                     "placeholder":"选择后仅入会品牌会员可领"
//                 },
//                 "title":"品牌会员",
//                 "description":"选择后仅入会品牌会员可领",
//                 "type":"object",
//                 "widget":"merchantMemberBrand"
//             },
//             "userGroupId":{
//                 "props":{

//                 },
//                 "title":"宙斯人群",
//                 "type":"string"
//             },
//             "riskCode":{
//                 "props":{

//                 },
//                 "title":"活动风控码",
//                 "type":"string"
//             }
//         },
//         "props":{

//         },
//         "title":"基础信息",
//         "type":"object"
//     },

//       "activityBasicInfo3":{
//         "properties":{
//             "title":{
//                 "props":{

//                 },
//                 "title":"活动标题",
//                 "required":true,
//                 "max":20,
//                 "type":"string"
//             },
//             "startTime":{
//                 "format":"dateTime",
//                 "props":{

//                 },
//                 "title":"活动开始时间",
//                 "required":true,
//                 "type":"string"
//             },
//             "endTime":{
//                 "format":"dateTime",
//                 "props":{

//                 },
//                 "title":"活动结束时间",
//                 "required":true,
//                 "type":"string"
//             },
//             "storeScopes":{
//                 "props":{

//                 },
//                 "title":"参与门店",
//                 "type":"array",
//                 "required":true,
//                 "widget":"storeScopeSelect"
//             },
//             "activityScopes":{
//                 "enum":[
//                     "online",
//                     "offline"
//                 ],
//                 "enumNames":[
//                     "线上活动",
//                     "线下活动"
//                 ],
//                 "props":{

//                 },
//                 "title":"活动范围",
//                 "type":"array",
//                 "required":true,
//                 "widget":"checkboxes"
//             },
//             "stockType":{
//                 "enum":[
//                     "DAILY",
//                     "TOTAL",
//                     "UNLIMITED"
//                 ],
//                 "enumNames":[
//                     "每日库存",
//                     "总库存",
//                     "不限量"
//                 ],
//                 "props":{

//                 },
//                 "title":"库存类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "totalStock":{
//                 "props":{
//                     "precision":0,
//                     "min":1,
//                     "max":9999999
//                 },
//                 "title":"库存数量",
//                 "min":1,
//                 "max":9999999,
//                 "required":true,
//                 "type":"number",
//                 "hidden":"{{formData.activityBasicInfo.stockType === \"UNLIMITED\"}}"
//             },
//             "userLimitType":{
//                 "enum":[
//                     "DAILY",
//                     "TOTAL",
//                     "UNLIMITED"
//                 ],
//                 "enumNames":[
//                     "每人每天限",
//                     "活动期间限",
//                     "不限量"
//                 ],
//                 "props":{

//                 },
//                 "title":"限领类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "limitUpper":{
//                 "props":{
//                     "precision":0,
//                     "min":1,
//                     "max":9999999
//                 },
//                 "title":"限领数量",
//                 "min":1,
//                 "max":9999999,
//                 "required":true,
//                 "type":"number",
//                 "hidden":"{{formData.activityBasicInfo.userLimitType === \"UNLIMITED\"}}"
//             },
//             "userIdentity":{
//                 "enum":[
//                     "member",
//                     "member365"
//                 ],
//                 "enumNames":[
//                     "全部可领",
//                     "仅365会员"
//                 ],
//                 "props":{

//                 },
//                 "title":"可领用户类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "employeeLimitIdentities":{
//                 "enum":[
//                     "employee",
//                     "guider"
//                 ],
//                 "enumNames":[
//                     "银泰员工",
//                     "导购员"
//                 ],
//                 "props":{

//                 },
//                 "default":[

//                 ],
//                 "title":"限领员工类型",
//                 "type":"array",
//                 "widget":"checkboxes"
//             },
//             "merchantMemberBrand":{
//                 "props":{
//                     "pureSelect":true,
//                     "placeholder":"选择后仅入会品牌会员可领"
//                 },
//                 "title":"品牌会员",
//                 "description":"选择后仅入会品牌会员可领",
//                 "type":"object",
//                 "widget":"merchantMemberBrand"
//             },
//             "userGroupId":{
//                 "props":{

//                 },
//                 "title":"宙斯人群",
//                 "type":"string"
//             },
//             "riskCode":{
//                 "props":{

//                 },
//                 "title":"活动风控码",
//                 "type":"string"
//             }
//         },
//         "props":{

//         },
//         "title":"基础信息",
//         "type":"object"
//     },
//       "activityBasicInfo2":{
//         "properties":{
//             "title":{
//                 "props":{

//                 },
//                 "title":"活动标题",
//                 "required":true,
//                 "max":20,
//                 "type":"string"
//             },
//             "startTime":{
//                 "format":"dateTime",
//                 "props":{

//                 },
//                 "title":"活动开始时间",
//                 "required":true,
//                 "type":"string"
//             },
//             "endTime":{
//                 "format":"dateTime",
//                 "props":{

//                 },
//                 "title":"活动结束时间",
//                 "required":true,
//                 "type":"string"
//             },
//             "storeScopes":{
//                 "props":{

//                 },
//                 "title":"参与门店",
//                 "type":"array",
//                 "required":true,
//                 "widget":"storeScopeSelect"
//             },
//             "activityScopes":{
//                 "enum":[
//                     "online",
//                     "offline"
//                 ],
//                 "enumNames":[
//                     "线上活动",
//                     "线下活动"
//                 ],
//                 "props":{

//                 },
//                 "title":"活动范围",
//                 "type":"array",
//                 "required":true,
//                 "widget":"checkboxes"
//             },
//             "stockType":{
//                 "enum":[
//                     "DAILY",
//                     "TOTAL",
//                     "UNLIMITED"
//                 ],
//                 "enumNames":[
//                     "每日库存",
//                     "总库存",
//                     "不限量"
//                 ],
//                 "props":{

//                 },
//                 "title":"库存类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "totalStock":{
//                 "props":{
//                     "precision":0,
//                     "min":1,
//                     "max":9999999
//                 },
//                 "title":"库存数量",
//                 "min":1,
//                 "max":9999999,
//                 "required":true,
//                 "type":"number",
//                 "hidden":"{{formData.activityBasicInfo.stockType === \"UNLIMITED\"}}"
//             },
//             "userLimitType":{
//                 "enum":[
//                     "DAILY",
//                     "TOTAL",
//                     "UNLIMITED"
//                 ],
//                 "enumNames":[
//                     "每人每天限",
//                     "活动期间限",
//                     "不限量"
//                 ],
//                 "props":{

//                 },
//                 "title":"限领类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "limitUpper":{
//                 "props":{
//                     "precision":0,
//                     "min":1,
//                     "max":9999999
//                 },
//                 "title":"限领数量",
//                 "min":1,
//                 "max":9999999,
//                 "required":true,
//                 "type":"number",
//                 "hidden":"{{formData.activityBasicInfo.userLimitType === \"UNLIMITED\"}}"
//             },
//             "userIdentity":{
//                 "enum":[
//                     "member",
//                     "member365"
//                 ],
//                 "enumNames":[
//                     "全部可领",
//                     "仅365会员"
//                 ],
//                 "props":{

//                 },
//                 "title":"可领用户类型",
//                 "required":true,
//                 "type":"string",
//                 "widget":"radio"
//             },
//             "employeeLimitIdentities":{
//                 "enum":[
//                     "employee",
//                     "guider"
//                 ],
//                 "enumNames":[
//                     "银泰员工",
//                     "导购员"
//                 ],
//                 "props":{

//                 },
//                 "default":[

//                 ],
//                 "title":"限领员工类型",
//                 "type":"array",
//                 "widget":"checkboxes"
//             },
//             "merchantMemberBrand":{
//                 "props":{
//                     "pureSelect":true,
//                     "placeholder":"选择后仅入会品牌会员可领"
//                 },
//                 "title":"品牌会员",
//                 "description":"选择后仅入会品牌会员可领",
//                 "type":"object",
//                 "widget":"merchantMemberBrand"
//             },
//             "userGroupId":{
//                 "props":{

//                 },
//                 "title":"宙斯人群",
//                 "type":"string"
//             },
//             "riskCode":{
//                 "props":{

//                 },
//                 "title":"活动风控码",
//                 "type":"string"
//             }
//         },
//         "props":{

//         },
//         "title":"基础信息",
//         "type":"object"
//     },

//       "activityReleaseRuleInfo":{
//           "properties":{
//               "releaseChannels":{
//                   "props":{

//                   },
//                   "title":"投放渠道",
//                   "defaut":"PMALL",
//                   "required":true,
//                   "type":"array",
//                   "widget":"distributionChannelSelect"
//               },
//               "activityTags":{
//                   "props":{

//                   },
//                   "title":"活动标签",
//                   "required":true,
//                   "type":"array",
//                   "widget":"activitySelectTags"
//               },
//               "isShowStore":{
//                   "enum":[
//                       true,
//                       false
//                   ],
//                   "enumNames":[
//                       "是",
//                       "否"
//                   ],
//                   "props":{

//                   },
//                   "title":"是否展示门店",
//                   "required":true,
//                   "type":"boolean",
//                   "widget":"radio"
//               }
//           },
//           "props":{

//           },
//           "title":"投放规则",
//           "type":"object"
//       },
//       "activityRuleInfo":{
//           "properties":{
//               "activityHeadImageUrls":{
//                   "props":{
//                       "token":"v1-f1dWFA8-ae983dd16",
//                       "maxCount":1,
//                       "limit":1,
//                       "width":480,
//                       "height":480,
//                       "tips":"活动头图480*480"
//                   },
//                   "title":"活动头图",
//                   "required":true,
//                   "type":"array",
//                   "widget":"mosUpload"
//               },
//               "activityDetailImageUrls":{
//                   "props":{
//                       "token":"v1-f1dWFA8-ae983dd16"
//                   },
//                   "title":"活动详情图",
//                   "type":"array",
//                   "widget":"mosUpload"
//               },
//               "activityRuleDesc":{
//                   "props":{

//                   },
//                   "title":"规则介绍",
//                   "required":true,
//                   "type":"string",
//                   "format":"textarea"
//               },
//               "isShowSalePrice":{
//                   "enum":[
//                       true,
//                       false
//                   ],
//                   "enumNames":[
//                       "是",
//                       "否"
//                   ],
//                   "props":{

//                   },
//                   "title":"是否展示市场价",
//                   "required":true,
//                   "type":"boolean",
//                   "widget":"radio"
//               },
//               "isSupportShare":{
//                   "enum":[
//                       true,
//                       false
//                   ],
//                   "enumNames":[
//                       "是",
//                       "否"
//                   ],
//                   "props":{

//                   },
//                   "title":"是否可分享",
//                   "required":true,
//                   "type":"boolean",
//                   "widget":"radio"
//               },
//               "activityJumpUrl":{
//                   "props":{

//                   },
//                   "title":"去使用跳转链接",
//                   "type":"string"
//               },
//               "pointType":{
//                   "enum":[
//                       "INTIME_POINT",
//                       "BRAND_POINT"
//                   ],
//                   "enumNames":[
//                       "银泰积分",
//                       "品牌积分"
//                   ],
//                   "props":{

//                   },
//                   "title":"积分类型",
//                   "required":true,
//                   "type":"string",
//                   "widget":"select"
//               },
//               "activityType":{
//                   "enum":[
//                       "POINT_CASH",
//                       "POINT_EXCHANGE"
//                   ],
//                   "enumNames":[
//                       "积分加钱购",
//                       "积分兑换"
//                   ],
//                   "props":{
//                       "value":"{{formData.activityApplyInfo.exchangeType === \"POINT_CASH\" ? \"POINT_CASH\" : \"POINT_EXCHANGE\"}}"
//                   },
//                   "title":"活动类型",
//                   "readOnly":true,
//                   "type":"string",
//                   "widget":"select"
//               },
//               "costPointNumber":{
//                   "props":{
//                       "precision":0,
//                       "min":0,
//                       "max":9999999
//                   },
//                   "min":1,
//                   "max":9999999,
//                   "title":"消耗积分数",
//                   "required":true,
//                   "type":"number",
//                   "hidden":"{{formData.activityApplyInfo.exchangeType === \"POINT_CASH\"}}"
//               }
//           },
//           "props":{

//           },
//           "title":"活动规则",
//           "type":"object"
//       },
//       "rightsEntities":{
//           "props":{

//           },
//           "title":"权益列表",
//           "type":"array",
//           "widget":"exchangeRightsTable"
//       }
//   },
//   "props":{

//   },
//   "type":"object",
//   "labelWidth":130,
//   "displayType":"row",
//   "column": 1,
// }

export default {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      title: '输入框',
    },
    list_ikPi2q: {
      title: '数组',
      type: 'array',
      items: {
        type: 'object',
        theme: 'collapse',
        props: {
          title: 'xxxxx',
        },
        properties: {
          input_3XWgl7: {
            title: '输入框',
            type: 'string',
            props: {},
          },
        },
      },
      props: {},
    },
  },
  labelWidth: 120,
  displayType: 'row',
  column: 1,
};

// export default {
//     "type": "object",

//     properties: {
//         select1: {
//           title: '隐藏输入框',
//           type: 'boolean',
//           description: 'dfadffad',
//           descType: 'icon',
//           default: true,

//         },
//         // input1: {
//         //   title: '输入框',
//         //   type: 'string',
//         //   required: true,
//         // //   hidden: '{{rootValue.select1 === true}}',
//         // },
//         input2: {
//             title: '输入框',
//             type: 'string',
//             required: true,
//             // hidden: '{{formData.select1 === true}}',
//             //disabled: '{{formData.select1 === true}}',
//             placeholder: '请选择',
//             props: {
//               disabled: true,
//             }
//           },
//       },
//     "labelWidth": 120,
//     "displayType": "row",
//     "column": 2,
//   }

// export default {
//   "type": "object",
//   "properties": {
//     "listName": {
//       "title": "对象数组",
//       "description": "对象数组嵌套功能",
//       "type": "array",
//       "items": {
//         "type": "object",
//         "properties": {
//           "rangeName": {
//             "title": "日期时间范围",
//             "type": "range",
//             "format": "date",
//             "props": {
//               "placeholder": [
//                 "开始日期",
//                 "结束日期"
//               ]
//             }
//           }
//         }
//       },
//       "props": {}
//     }
//   },
//   "labelWidth": 120,
//   "displayType": "row"
// }
