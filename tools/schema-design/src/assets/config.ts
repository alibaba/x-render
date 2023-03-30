export default {
  "packages": [
    {
      "package": "moment",
      "version": "2.24.0",
      "urls": ["https://g.alicdn.com/mylib/moment/2.24.0/min/moment.min.js"],
      "library": "moment"
    },
    {
      "package": "lodash",
      "library": "_",
      "urls": ["https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js"]
    },
    {
      "package": "iconfont-icons",
      "urls": "https://at.alicdn.com/t/font_2369445_ukrtsovd92r.js"
    },
    {
      "package": "@ant-design/icons",
      "version": "4.7.0",
      "urls": ["https://g.alicdn.com/code/npm/@ali/ant-design-icons-cdn/4.5.0/index.umd.min.js"],
      "library": "icons"
    },
    {
      "package": "antd",
      "version": "4.19.5",
      "urls": [
        "https://g.alicdn.com/code/lib/antd/4.19.4/antd.min.js",
        "https://g.alicdn.com/code/lib/antd/4.19.4/antd.min.css"
      ],
      "library": "antd"
    },
    {
      "title": "fusion组件库",
      "package": "@alifd/next",
      "version": "1.26.4",
      "urls": [
        "https://g.alicdn.com/code/lib/alifd__next/1.26.4/next.min.css",
        "https://g.alicdn.com/code/lib/alifd__next/1.26.4/next-with-locales.min.js"
      ],
      "library": "Next"
    },
    {
      "package": "@ali/form-render-material",
      "version": "1.0.0",
      "library": "AliFormRenderMaterial",
      "exportSourceLibrary": "getFormRenderMaterial",
      "async": true,
      "exportMode":"functionCall",
      "type":"procode",
      "external": true
    }
  ],
  "components": [
    {
      "exportName": "AliFormRenderMaterialMeta",
      "npm": {
        "package": "@ali/form-render-material",
        "version": "1.0.0"
      },
      "url": "https://dev.g.alicdn.com/code/npm/@ali/form-render-material/1.0.0/lowcode/meta.js",
      "urls": {
        "default": "https://dev.alicdn.com/code/npm/@ali/form-render-material/1.0.0/lowcode/meta.js"
      }
    }
    
  ],
  "sort": {
    "groupList": ["基础组件", "高级组件"],
    "categoryList": ["常用控件", "日期控件", "其它控件", "布局控件", "自增控件", "表单控件"]
  },
  "groupList": ["基础组件", "高级组件"],
  "ignoreComponents": {}
}
