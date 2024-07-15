---
layout: post
title: "[Leetcode] 70. Climbing Stairs"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/climbing-stairs/
---

정수 n이 주어졌을 때, n번째 계단까지 도달하는 방법의 개수를 구하는 문제
- 한 번에 1계단 혹은 2계단씩만 올라갈 수 있다.
- n은 양의 정수로 주어진다.

<h2>Example 1</h2>
- Input : n = 2
- Output : 2
- [1, 1], [2] 두 가지 방법이 존재한다.

<h2>Example 2</h2>
- Input : n = 3
- Output : 3
- [1, 1, 1], [1, 2], [2, 1] 세 가지 방법이 존재한다.

<h2>Note</h2>
- 1계단 아래 혹은 2계단 아래에 도달하면 해당 계단에 도달할 수 있으므로, dp를 사용하여 해결

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        steps = [0, 1, 2]
        for i in range(3, n + 1) :
            steps.append(steps[i-2] + steps[i-1])
        return steps[n]
```
