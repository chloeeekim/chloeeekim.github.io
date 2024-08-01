---
layout: post
title: "[Leetcode] 67. Add Binary"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/add-binary/
---

두 개의 binary string이 주어졌을 때, 두 binary의 합을 구하는 문제
- 결과 또한 binary string으로 나타내어야 한다.
- 입력되는 두 string은 모두 non-empty이며, 0과 1로만 이루어져 있다.

<h2>Example 1</h2>
- Input : a = "11", b = "1"
- Output : "100"

<h2>Example 2</h2>
- Input : a = "1010", b = "1011"
- Output : "10101"

<h2>Note</h2>
a, b를 모두 뒤집은 다음 index 0부터 더해나가는 방식으로, 결과는 다시 뒤집어야 한다.

```python
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        res = ""
        up = 0
        a, b = a[::-1], b[::-1]
        while a or b or up :
            vala = int(a[0] if a else 0)
            valb = int(b[0] if b else 0)
            up, num = divmod(vala + valb + up, 2)
            res += str(num)
            a = (a[1:] if a else None)
            b = (b[1:] if b else None)
        return res[::-1]
```
