---
title: JavaScript 核心语法
description: 变量、函数、数组处理与异步操作
---

# JavaScript 核心语法

## 变量声明

优先使用 `const`，需要重新赋值时使用 `let`，避免使用作用域规则较复杂的 `var`。

```js
const siteName = '知行笔记'
let visitCount = 0

visitCount += 1
```

## 函数

```js
function add(a, b) {
  return a + b
}

const multiply = (a, b) => a * b
```

箭头函数很适合简短回调；需要动态 `this` 时应理解它和普通函数的区别。

## 数组处理

```js
const notes = [
  { title: 'Python', published: true },
  { title: 'Git', published: false }
]

const publishedTitles = notes
  .filter(note => note.published)
  .map(note => note.title)
```

`map` 负责变换，`filter` 负责筛选，`find` 返回第一个匹配项。

## 异步函数

```js
async function loadData() {
  const response = await fetch('/data.json')

  if (!response.ok) {
    throw new Error(`请求失败：${response.status}`)
  }

  return response.json()
}
```

::: tip 错误处理
网络请求可能失败。调用异步函数时应根据业务场景使用 `try...catch`，并为用户提供可理解的反馈。
:::
