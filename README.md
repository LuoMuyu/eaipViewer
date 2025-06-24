# eaip

*[English](README.md) | [中文](README.zh-CN.md)*

eAIP Viewer

# Changed

Added internationalization (i18n) support

Modified the Subject of AICs and SUPs to display in Chinese

No longer uses environment variables to set the eAIP path; now reads from the Data folder in the root directory

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Deployment

Step1: Download latest EAIP full package from [https://www.eaipchina.cn/home/Version/ < latest version number > /Master](https://www.eaipchina.cn/home/Default).   
Step2: unzip and deploy Data package to public package.   
Step3: vite build this project.    
Step4: copy files in build dist into the full package path and override content.    
