---
title: Python 语法基础
description: 变量、集合、流程控制与推导式速记
---

# Python 语法基础

Python 强调可读性。掌握数据类型、控制流程和常用容器后，就能编写多数基础脚本。

## 常用数据类型

```python
name = "Lin"              # str
age = 24                   # int
progress = 0.75            # float
is_active = True           # bool
skills = ["Python", "Git"] # list
profile = {"city": "上海"}  # dict
```

使用 `type()` 查看对象类型：

```python
print(type(skills))  # <class 'list'>
```

## 条件与循环

```python
score = 86

if score >= 90:
    level = "优秀"
elif score >= 60:
    level = "通过"
else:
    level = "继续练习"

for index, skill in enumerate(skills, start=1):
    print(index, skill)
```

::: warning 缩进属于语法
Python 通常使用 4 个空格缩进。不要在同一文件中混用 Tab 和空格。
:::

## 推导式

推导式适合表达简单的映射或筛选：

```python
numbers = range(1, 11)
squares_of_even = [n * n for n in numbers if n % 2 == 0]
print(squares_of_even)  # [4, 16, 36, 64, 100]
```

当逻辑包含多个条件或副作用时，普通循环通常更容易阅读。

## 解包

```python
point = (12, 8)
x, y = point

first, *middle, last = [1, 2, 3, 4, 5]
print(middle)  # [2, 3, 4]
```

## 下一步

继续阅读 [函数与模块](/notes/python/functions-modules)，学习如何组织可复用代码。
