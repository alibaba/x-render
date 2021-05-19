# FormRender snippets

快速撰写 [FormRender](https://github.com/alibaba/form-render)的模板的利器。

![](https://img.alicdn.com/imgextra/i4/O1CN01NP0URk20yx3JiuYng_!!6000000006919-2-tps-2188-1180.png)

如图，在 .json 文件中输入关键词 `fr` 即可查阅所有的快捷 snippets。其中 `fr-init` 会生成如下的骨架：

```json
{
  "type": "object",
  "properties": {},
  "required": []
}
```

然后在骨架中使用元素 snippets 撰写所有的表单项吧，例如需要一个列表则使用 `fr-list` ，如果需要下拉单选框则使用 `fr-select` ，等等。

snippets 基本分为三类：

1. 生成一个表单元素的 schema （例如输入框，多选框，列表，对象）
2. 生成部分常用选项的 schema（例如 ui:options, ui:width, format 等）
3. 生成骨架和 demo。fr-init 生成骨架，fr-demo 生成一个包含所有可用组件以及一个联动显隐的样例

注意不需要输入完整的 `fr-number-complex`来唤起一个 snippet 哦，只需要输入 `number` 或者甚至 `fnc` 就能智能联想了。
