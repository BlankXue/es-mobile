# 项目介绍

> 这个手机端脚手架。方便大家快速开发，快速使用。

## 特性

- 集成自己常用`gulp`配置
- 集成阿里`lib-flexible`库，来方便适配
- 集成`weui`做前端ui框架
- gulp 支持 压缩js、压缩图片、压缩css、css自动补充前缀、文件合并
- gulp 支持 source map、公用文件 include
- gulp 支持直接浏览器浏览


## 安装/使用

```
   git clone git@github.com:JHXue/es-mobile.git
   #安装 npm
   npm install -D
   gulp init
   gulp 
```

## 所使用到知识

- rem 介绍  :point_right: <a href='https://isux.tencent.com/web-app-rem.html'>我是链接，点我</a> :point_left: 
- lib-flexible  :point_right: <a href='https://github.com/amfe/article/issues/17'>我是链接，点我</a> :point_left:
- npm 介绍  :point_right: <a href='http://jhai.me/npm/'>我是链接，点我</a> :point_left:
- gulp 介绍  :point_right: <a href='https://wizardforcel.gitbooks.io/gulp-doc/content/'>我是链接，点我</a> :point_left:
- less 教程  :point_right: <a href='http://www.lesscss.net/features/'>我是链接，点我</a> :point_left:


## 注意点

- 目前是用到 `lib-flexible` 不支持css sprite 图。 我现在支持使用没有切过的图。小图使用 less 中`data-uri`函数
- 设计稿，宽度为 **750px**,可以直接将设计稿的支持写到 less 文件里面
 

## 尺寸说明


> 配置完成之后，在实际使用时，你只要像下面这样使用：

```css
.selector {
    width: 150px;
    height: 64px; /*px*/
    font-size: 28px; /*px*/
    border: 1px solid #ddd; /*no*/
}

```      
> px2rem处理之后将会变成：

```css
.selector {
    width: 2rem;
    border: 1px solid #ddd;
}
[data-dpr="1"] .selector {
    height: 32px;
    font-size: 14px;
}
[data-dpr="2"] .selector {
    height: 64px;
    font-size: 28px;
}
[data-dpr="3"] .selector {
    height: 96px;
    font-size: 42px;
}
```
