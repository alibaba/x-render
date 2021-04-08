---
order: 2
title: VSCode 插件
group:
  title: VSCode 插件
toc: menu
---

# vscode-plugin-fr-schema

> 可视化编辑器的 VSCode 插件版本，便于维护本地 Schema

## 何时使用

* 表单 Schema 在项目本地维护而非保存在服务端
* 项目使用 ts 开发，需要编写表单数据类型定义

## 如何使用

### 安装

插件商店搜索 `FormRender` 或访问 [vscode 网上商店](https://marketplace.visualstudio.com/items?itemName=F-loat.vscode-plugin-fr-schema) 进行安装

### 演示

1. 打开任意 `.json` 文件，右上角出现进入编辑模式的 icon，表明已安装成功。可通过以下两种方式进入可视化编辑
  
   * 点击右上角的 icon (推荐) <img alt="icon" height="30px" src="https://img.alicdn.com/imgextra/i1/O1CN01I90n9s1l5KiSj3UOb_!!6000000004767-0-tps-216-104.jpg" />
   * 右键 `.json` 文件，选择 `可视化编辑表单配置` 或 `open with formRender schema editor`（英文编辑器）

2. 在表单设计器里完成编辑点击 “保存”。全流程如下

   <img alt="overview" width="80%" src="https://img.alicdn.com/tfs/TB1b53cmGNj0u4jSZFyXXXgMVXa-2740-1748.gif" />

## 更多能力

- 将 json schema 解析为 ts 类型定义：

  * 选中 js/ts 文件内的 schema 代码，右键选择 `解析所选对象为接口`
   <img alt="code2interface" width="80%" src="https://img.alicdn.com/tfs/TB1sv2xlCR26e4jSZFEXXbwuXXa-1440-900.gif" />

  * 右键任意 `.json` 文件，选择 `解析表单配置为接口`
   <img alt="json2interface" width="80%" src="https://img.alicdn.com/tfs/TB1nI.NWrY1gK0jSZTEXXXDQVXa-2736-1744.png" />

- 将 React PropTypes 解析为 schema

  右键任意 `.jsx` 文件，选择 `解析组件为表单配置`，具体配置方式可查看 [proptypes-to-json-schema](./proptypes) 文档

- 将表单数据转换为 schema

  右键任意 `.json` 文件，选择 `转换数据为表单配置`

- 预览模式。可实时展示 `json` 文件改动效果

   <img alt="preview" width="80%" src="https://img.alicdn.com/imgextra/i3/O1CN01BbcGi71vDFhN4cwcA_!!6000000006138-2-tps-2295-1224.png" />

## 插件开发

- 克隆项目

```sh
git clone https://github.com/alibaba/form-render.git
cd form-render/tools/vscode-plugin-fr-schema
```

- 安装依赖

```sh
npm install
```

- 调试插件

使用 VSCode 打开项目，执行 `npm run dev:web`，然后按下 F5 开始调试
