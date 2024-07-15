---
layout: post
title: "[Leetcode] 38. Count and Say"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/count-and-say/
---

특정한 규칙에 따라 sequence가 생성될 때, n번째 sequence를 구하는 문제
- '1'은 "one 1"로 읽기 때문에 '11'이 된다.
- '11'은 "two 1s"로 읽기 때문에 '21'이 된다.
- '21'은 "one 2, one 1"으로 읽기 때문에 '1211'이 된다.
- n은 1 이상 30 이하로 주어진다.
- 첫 5개의 sequence는 다음과 같다.
    1. 1
    2. 11
    3. 21
    4. 1211
    5. 111221

<h2>Example 1</h2>
- Input : n = 4
- Output : "1211"

<h2>Example 2</h2>
- Input : n = 1
- Output : "1"

<h2>Note</h2>
동일한 숫자가 반복되는 경우를 count하여 temp 문자열에 추가

```python
class Solution:
    def countAndSay(self, n: int) -> str:
        res = '1'
        for i in range(1, n) :
            count, temp, num = 0, '', res[0]            
            for j in res :
                if j == num :
                    count += 1
                else :
                    temp += str(count) + num
                    num = j
                    count = 1
            temp += str(count) + num
            res = temp
        return res
```
