# vscode-plugin-fr-schema

> vscode plugin for [form-render](https://github.com/alibaba/form-render)

## 安装

插件商店搜索 `FormRender` 或访问 [vscode 网上商店](https://marketplace.visualstudio.com/items?itemName=F-loat.vscode-plugin-fr-schema) 进行安装

## 使用

1. 打开任意 `.json` 文件，右上角出现进入编辑模式的 icon，表明已安装成功。点击此按钮可进入可视化编辑

   ![editor-button](https://img.alicdn.com/tfs/TB1RfZGjAcx_u4jSZFlXXXnUFXa-1919-1284.png)

2. 在表单设计器里完成编辑点击 “保存”。全流程如下

   ![overview](https://img.alicdn.com/tfs/TB1b53cmGNj0u4jSZFyXXXgMVXa-2740-1748.gif)

## 更多说明

- 唤起表单设计器的两种方式：

  1. 点击右上角的 icon (推荐)
  2. 右键 `.json` 文件，选择 `可视化编辑表单配置` 或 `open with formRender schema editor`（英文编辑器）

- 将 json schema 解析为 ts 类型定义的两种方式：

  * 选中 js/ts 文件内的 schema 代码，右键选择 `解析所选对象为接口`
   ![code2interface](https://img.alicdn.com/tfs/TB1sv2xlCR26e4jSZFEXXbwuXXa-1440-900.gif)

  * 右键任意 `.json` 文件，选择 `解析表单配置为接口`
   ![json2interface](https://img.alicdn.com/tfs/TB1nI.NWrY1gK0jSZTEXXXDQVXa-2736-1744.png)

- 将 React PropTypes 解析为 schema。右键任意 `.jsx` 文件，选择 `解析组件为表单配置`，具体配置方式可查看 [proptypes-to-json-schema](https://github.com/form-render/proptypes-to-json-schema) 文档

   ![proptypes](https://img.alicdn.com/tfs/TB1Mt4Cicieb18jSZFvXXaI3FXa-2736-1744.png)

- 将表单数据转换为 schema。右键任意 `.json` 文件，选择 `转换数据为表单配置`

- 预览模式。可实时展示 `json` 文件改动效果

   ![preview](https://img.alicdn.com/imgextra/i3/O1CN01BbcGi71vDFhN4cwcA_!!6000000006138-2-tps-2295-1224.png)

## 相关名词

- FormRender
  
  易用的跨组件体系的表单渲染引擎 - 通过 JSON Schema 快速生成自定义表单配置界面

- JSON Schema / schema

  json 标准，特指用于 FormRender 的表单配置

- 接口

  用于 typescript 的类型定义

## 参与插件开发

- 克隆项目

```sh
git clone https://github.com/F-loat/vscode-plugin-fr-schema.git
```

- 安装依赖

```sh
npm install
```

- 调试插件

使用 VSCode 打开项目，执行 `npm run dev:web`，然后按下 F5 开始调试
