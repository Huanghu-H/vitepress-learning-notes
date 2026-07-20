---
title: Python 异步编程
description: 理解协程、事件循环与并发任务
---

# Python 异步编程

异步编程适合大量等待操作，例如网络请求、机器人消息和文件 I/O。它不会让 CPU 密集计算自动变快。

## 第一个协程

```python
import asyncio


async def greet(name: str) -> str:
    await asyncio.sleep(0.5)
    return f"Hello, {name}!"


async def main() -> None:
    message = await greet("Python")
    print(message)


asyncio.run(main())
```

`async def` 创建协程函数，调用后得到协程对象；`await` 会暂停当前协程，让事件循环运行其他任务。

## 并发执行

```python
async def main() -> None:
    results = await asyncio.gather(
        greet("A"),
        greet("B"),
        greet("C"),
    )
    print(results)
```

三个任务在等待期间可以交错执行，因此总时间接近一次等待，而不是三次等待之和。

## 常见错误

::: danger 不要阻塞事件循环
在协程中直接调用 `time.sleep()` 会阻塞整个线程，应改用 `await asyncio.sleep()`。CPU 密集工作可考虑进程池或专门的计算服务。
:::

## 与 Discord 机器人关联

discord.py 的指令处理函数使用 `async def`。发送消息时需要 `await ctx.send(...)`，这样机器人在等待网络响应时仍能处理其他事件。
