---
title: VSCode 插件
group:
  title: VSCode 插件
toc: content
---

# vscode-plugin-fr-schema

> 可视化编辑器的 VSCode 插件版本，便于维护本地 Schema

## 何时使用

- 表单 Schema 在项目本地维护而非保存在服务端
- 项目使用 ts 开发，需要编写表单数据类型定义

## 如何使用

### 安装

插件商店搜索 `FormRender` 或访问 [vscode 网上商店](https://marketplace.visualstudio.com/items?itemName=F-loat.vscode-plugin-fr-schema) 进行安装

### 演示

1. 打开任意 `.json` 文件，右上角出现进入编辑模式的 icon，表明已安装成功。可通过以下两种方式进入可视化编辑

   - 点击右上角的 icon (推荐) <img alt="icon" height="30px" src="https://img.alicdn.com/imgextra/i1/O1CN01I90n9s1l5KiSj3UOb_!!6000000004767-0-tps-216-104.jpg" />
   - 右键 `.json` 文件，选择 `可视化编辑表单配置` 或 `open with formRender schema editor`（英文编辑器）

2. 在表单设计器里完成编辑点击 “保存”。全流程如下

   <img alt="overview" width="80%" src="https://img.alicdn.com/tfs/TB1b53cmGNj0u4jSZFyXXXgMVXa-2740-1748.gif" />

## 更多能力

### 代码片段

<img width="80%" src="https://img.alicdn.com/tfs/TB12vYkq1T2gK0jSZFvXXXnFXXa-1862-976.jpg" />

如图，在 .json 文件中输入关键词 `fr` 即可查阅所有的快捷 snippets。其中 `fr-init` 会生成如下的骨架：

```json
{
  "type": "object",
  "properties": {},
  "required": []
}
```

然后在骨架中使用元素 snippets 撰写所有的表单项吧，例如需要一个列表则使用 `fr-list` ，如果需要下拉单选框则使用 `fr-select`，等等。

snippets 基本分为三类：

- 生成一个表单元素的 schema（例如输入框，多选框，列表，对象）
- 生成部分常用选项的 schema（例如 ui:options, ui:width, format 等）
- 生成骨架和 demo。fr-init 生成骨架，fr-demo 生成一个包含所有可用组件以及一个联动显隐的样例

注意不需要输入完整的 `fr-number-complex` 来唤起一个 snippet 哦，只需要输入 `number` 或者甚至 `fnc` 就能智能联想了。

### 生成 Interface

- 选中 js/ts 文件内的 schema 代码，右键选择 `解析所选对象为接口`
  <img alt="code2interface" width="80%" src="https://img.alicdn.com/tfs/TB1sv2xlCR26e4jSZFEXXbwuXXa-1440-900.gif" />

- 右键任意 `.json` 文件，选择 `解析表单配置为接口`
  <img alt="json2interface" width="80%" src="https://img.alicdn.com/tfs/TB1nI.NWrY1gK0jSZTEXXXDQVXa-2736-1744.png" />

### 生成 Scheam

- 将 React PropTypes 解析为 schema

右键任意 `.jsx` 文件，选择 `解析组件为表单配置`，具体配置方式可查看 [proptypes-to-json-schema](./proptypes) 文档

- 将表单数据转换为 schema

右键任意 `.json` 文件，选择 `转换数据为表单配置`

### 预览模式

可实时展示 `json` 文件改动效果

   <img alt="preview" width="80%" src="https://img.alicdn.com/imgextra/i3/O1CN01BbcGi71vDFhN4cwcA_!!6000000006138-2-tps-2295-1224.png" />

## 配置

> Settings -> Extensions -> FormRender generator

- 启用主题

是否适配 vscode 主题，关闭后显示默认样式

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
