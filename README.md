# 内部 UI 项目

[![测试](https://github.com/work-design/rails_design/actions/workflows/test.yml/badge.svg)](https://github.com/work-design/rails_design/actions/workflows/test.yml)
[![Docker构建](https://github.com/work-design/rails_design/actions/workflows/cd.yml/badge.svg)](https://github.com/work-design/rails_design/actions/workflows/cd.yml)
[![Gem](https://github.com/work-design/rails_design/actions/workflows/gempush.yml/badge.svg)](https://github.com/work-design/rails_design/actions/workflows/gempush.yml)

## 介绍

### 纯 CSS 库，使用 scss 开发
* 由于 js 采用 hotwired 生态，故需要一套不依赖任何 js 代码的 UI 框架，[Bulma](https://github.com/jgthms/bulma) 是纯 css UI 框架中最具影响力的开源框架；
* Bulma 不仅源码简洁，更现代化，它还融合了语义 CSS 框架和 原子 CSS 框架的优点；

### js 基于 stimulus 开发
* 实现了常见 UI 框架中几乎所有常见的功能，得益于 stimulus 赋能，实际代码量是任意 js 框架代码量的五分之一或者更少；

### SVG spirit
* svg 图标解决方案中性能最好的方案；

## 约定

* 可以 import：
  * app/assets 下的文件
* entry(rollup input)
  * app/javascripts 下的文件进入
