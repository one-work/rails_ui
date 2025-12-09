# 内部 UI 项目

## 介绍

### 纯 CSS 库，使用 scss 开发
* 由于 js 采用 hotwired 生态，故需要一套不依赖任何 js 代码的 UI 框架，[Bulma](https://github.com/jgthms/bulma) 是纯 css UI 框架中最具影响力的开源框架，所以几乎是唯一的首选框架；
* Bulma 不仅源码简洁，更现代化，它还融合了语义 CSS 框架和 原子 CSS 框架（参见 helpers）的优点；

### js 基于 stimulus 开发
* 实现了常见 UI 框架中几乎所有常见的功能，得益于 stimulus 赋能，实际代码量是任意 js 框架代码量的五分之一或者更少；

### SVG spirit
* svg 图标解决方案中性能最好的方案；

### 关于 Bulma 二次开发
* bulma 本身一直比较成熟稳定，鲜有更新，为了更适应内部开发和更加适配Rails 应用，做了如下二次开发策略；
  * 直接复制了全部 bulma 源码，且不再跟进 bulma 更新；
  * 对 scss 源码进行了语法上的精简，为了更方便阅读源码；
  * 对 css 代码逻辑进行了更适配于 rails partial 拆分的适应性开发（也就是尽量在 layout 层定义 class 的特点）

