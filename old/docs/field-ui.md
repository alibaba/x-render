## 定制改写基础表单 UI

- 通过给 FormRender 传入 FieldUI prop 来改写原有底层基础的表单元素，详细可见源码中的 [实现](https://github.com/alibaba/form-render/blob/master/src/base/as-field.jsx#L96)
- 样式覆盖基本能满足简单的样式修改需求，普通用户慎用`FieldUI`

`FieldUI` 的 `props`:

| Prop               |   Type    | Required | Default  |                 Description                 |
| ------------------ | :-------: | :------: | :------: | :-----------------------------------------: |
| **`className`**    | `String`  |   `N`    |   `N`    |     使用`ui:options`里设置的`className`     |
| **`displayType`**  | `String`  |   `N`    | `column` | 设置表单横向排列或者纵向排序`column`/ `row` |
| **`isComplex`**    | `Boolean` |   `N`    |   `N`    |       是否是复杂结构：对象和对象数组        |
| **`isRequired`**   | `Boolean` |   `N`    |   `N`    |                是否是必填项                 |
| **`schema`**       | `Object`  |   `Y`    |   `N`    |             组件对应的子 schema             |
| **`showLabel`**    | `Boolean` |   `N`    |  `true`  |               是否展示 label                |
| **`showDescIcon`** | `Boolean` |   `N`    | `false`  |  是否将文字形式说明显示成描述 tooltip 形式  |
| **`showValidate`** | `Boolean` |   `N`    |  `true`  |                是否展示校验                 |
| **`validateText`** | `String`  |   `N`    |   `N`    |                  校验文字                   |
