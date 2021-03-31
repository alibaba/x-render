## 如何开发

1. 项目使用 lerna 管理，所有的大包在/packages，所有的自定义组件包在/widgets
2. 如何跑起来（一下操作全在根目录）

```sh
# 安装依赖，请使用yarn，会去重的安装所有node_modules
yarn
# 首次开发需要 build 一下，否则有些仓库的import在dumi里会找不到
npm run build
# 将文档网站跑起来
npm start
```

3. 进入文档网站了，如何开发呢？

例如要开发 form-render 在 /docs/form-render/guide 目录下写一个 test.md 文件, 参考 /docs/form-render/guide/new-feature.md 的写法即可。发布前把 test.md 干掉，或者放到不会被展示的文件目录下

4. 重新安装依赖

```sh
# 先清空
npm run clean
# 再安装
yarn
```

5. 发布

在顶层执行

```sh
npm publish
```

会进入交互对话，所有被改动过的仓库都会提示你是否要发布，以及版本

或者我其实更推荐，进入相应项目的文件夹，例如 form-render

```sh
# 进入
cd packages/form-render
# 换版本号、打tag
npm version 1.1.0
# 发布
npm publish
```

6. 分支管理

外部同学请 fork，内部同学请在 dev 分支开发，然后都发 pull-request 到 master 分支，由负责同学审核后合并，master 分支请勿人为去动
