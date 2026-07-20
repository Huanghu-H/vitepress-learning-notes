---
title: 函数与模块
description: 编写职责清晰、容易测试的 Python 代码
---

# 函数与模块

函数用于封装一个明确任务，模块用于组织一组相关函数、类型和常量。

## 参数与返回值

```python
def calculate_total(price: float, quantity: int = 1) -> float:
    """计算商品总价。"""
    if quantity < 1:
        raise ValueError("quantity 必须大于 0")
    return price * quantity


total = calculate_total(19.9, quantity=3)
```

类型标注不会自动检查运行时类型，但能改善编辑器提示和代码沟通。

## 避免可变默认参数

```python
# 不推荐：同一个列表会在多次调用间复用
def append_item(item, items=[]):
    items.append(item)
    return items

# 推荐
def append_item(item, items=None):
    result = [] if items is None else list(items)
    result.append(item)
    return result
```

## 模块入口

```python
def main() -> None:
    print("程序开始")


if __name__ == "__main__":
    main()
```

这样既可以直接运行文件，也可以在测试中导入函数而不自动执行程序。

## 目录组织

```text
my_project/
├── app.py
├── calculations.py
└── tests/
    └── test_calculations.py
```

::: tip 经验法则
如果一个函数需要用“先……然后……并且……”才能描述，它可能承担了太多职责，可以考虑拆分。
:::
