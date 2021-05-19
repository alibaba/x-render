## 如何开发

#### 1. 项目使用 lerna 管理，所有的大包在 `/packages`，所有的自定义组件包在 `/widgets`

#### 2. 如何跑起来（以下操作全在根目录）

```sh
# 安装依赖，请使用yarn，会去重的安装所有 node_modules (注意安装必须用 yarn，其他命令无所谓)
yarn
# 首次开发需要 build 一下，否则有些仓库的 import 在 dumi 里会找不到
npm run build
# 将文档网站跑起来
npm start
```

#### 3. 进入文档网站了，如何开发呢？

- 例如要开发 form-render 在 /docs/form-render/guide 目录下写一个 test.md 文件, 参考 /docs/form-render/guide/new-feature.md 的写法即可。发布前把
  test.md 干掉，或者放到不会被展示的文件目录下

- 提交前注意必须**格式化**。提交前注意必须**格式化**。提交前注意必须**格式化**。请安装 prettier 插件，或者在提交前执行

```sh
npm run prettier
```

#### 4. 重新安装依赖

```sh
# 先清空
npm run clean
# 再安装
yarn
```

注意 lerna clean 不会清除顶层的 node_modules，所以如果因为特殊原因要彻底清空依赖，请执行 `rm -rf node_modules`

#### 5. 发布

此操作只针对有 npm 发布权限的贡献，进入相应项目的文件夹，例如 form-render，执行 publish

```sh
# 进入
cd packages/form-render
# 换版本号、打tag。注意tag要打，便于release note的维护
yarn version --new-version 1.1.0
# 发布
npm publish
```

发布后记得到 [releases 页](https://github.com/alibaba/x-render/releases/) 补上最新发布日志

#### 6. 发布 beta 版本

beta 版本的版本号规范为 x.x.x-beta.x，一般用于大功能上线前的真实测试，不会被正常 npm i 安装。发布流程如下：

1. 进入 package/form-render 文件夹

2. 执行

```sh
# 换版本号、打tag。注意tag要打，便于release note的维护
yarn version --new-version 1.1.0-beta.0
# 发布
npm run beta
```

#### 7. 分支管理

外部同学请 fork，内部同学请在 dev 分支开发，然后都发 pull-request 到 master 分支，由负责同学审核后合并，master 分支请勿人为去动
