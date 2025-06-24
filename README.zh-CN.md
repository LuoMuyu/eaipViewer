# eaip

*[English](README.md) | [中文](README.zh-CN.md)*

eAIP 航图查看器

# 更新内容

添加了国际化（i18n）支持

修改 AICs 和 SUPs 的Subject为中文显示

不再使用环境变量设置eAIP路径，修改为读取根目录下的Data文件夹

## 推荐的开发环境配置

使用 [VSCode](https://code.visualstudio.com/) 搭配 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (禁用Vetur插件)。

## 自定义配置

参考 [ Vite 配置文档](https://vite.dev/config/)。

## 项目初始化

```sh
npm install
```

### 编译并启用热重载（开发环境）

```sh
npm run dev
```

### 编译并压缩（生产环境）

```sh
npm run build
```

### Deployment

步骤1：从 [https://www.eaipchina.cn/home/Version/ < latest version number > /Master](https://www.eaipchina.cn/home/Default) 下载最新的 EAIP 完整包。
步骤2：解压后，将 Data 文件夹复制到 public 目录中。
步骤3：使用 Vite 构建本项目。
步骤4：将 dist 目录中的构建文件复制到完整包路径中并覆盖原有内容。
