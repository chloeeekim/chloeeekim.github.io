---
layout: post
title: "[Leetcode] 7. Reverse Integer"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/reverse-integer/
---

주어진 32-bit 정수를 뒤집는 문제
- 32-bit signed integer 기준 (범위 : -2^31 ~ 2^31 - 1)
- 해당 범위를 넘는 경우, 0을 출력

<h2>Example 1</h2>
- Input : x = 123
- Output : 321

<h2>Example 2</h2>
- Input : x = -123
- Output : -321

<h2>Example 3</h2>
- Input : x = 120
- Output : 21

<h2>Note</h2>
reverse 문자열 구하는 방법 : [::-1]

```python
class Solution:
    def reverse(self, x: int) -> int:
        if x > 0 :
            res = int(str(x)[::-1])
        else :
            res = -1 * int(str(x * -1)[::-1])
        
        if -2**31 <= res <= 2**31 - 1 :
            return res
        else :
            return 0
```
