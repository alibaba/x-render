# 常见问题

### 1. 我引入了组件，但发现无论如何都显示不出来？

- 首先去 <a href="https://alibaba.github.io/form-render/docs/demo/index.html" target="_blank">Demo 探索</a> 中去将对于的参数填入进去，看是否可以正常出现
- 假如可以，检查一下 onChange 回调里面是否对 formData 进行了 setState，没有的话，可能由于初始化问题没有显示，加上即可

### 2. 我的 FormRender 可以正常渲染，但是貌似 antd 的样式都没有生效？

- 在原有的 jsx 文件中，检测是否有默认 antd 的样式，或者是否引入了两个 antd 版本
- 若无样式，则加入 `import 'antd/dist/antd.css';` 样式即可
- 若两个版本，直接 `tnpm update` 即可

### 3.tooltip 如果在有其他层级元素内部，就会被遮挡，我试了调 z-index 也没用?

- 应该是父容器设置了 overflow 为 hidden，修改成 auto 应该就好了

如果有新问题，欢迎提交 PR 来补充，遇到不能解决的问题，可以添加钉钉群，寻找远程协助。
