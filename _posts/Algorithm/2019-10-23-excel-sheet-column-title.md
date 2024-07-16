---
layout: post
title: "[Leetcode] 168. Excel Sheet Column Title"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/excel-sheet-column-title/
---

양의 정수가 하나 주어졌을 때, 이를 엑셀 시트에서 보이는 것과 같은 column title로 변경하는 문제
- A -> 1, B -> 2, ... , Z -> 26, AA -> 27, AB -> 28 ... 과 같은 순서로 진행된다.

<h2>Example 1</h2>
- Input : columnNumber = 1
- Output : "A"

<h2>Example 2</h2>
- Input : columnNumber = 28
- Output : "AB"

<h2>Example 3</h2>
- Input : columnNumber = 701
- Output : "ZY"

<h2>Note</h2>
- 26진법을 계산하듯이 역으로 계산 (26으로 나눈 나머지가 해당 자리의 값)
- ord(ch) : 문자를 아스키 코드로 변환
- chr(num) : 아스키 코드를 문자로 변환
- a //= b : a를 b로 나눈 몫을 a에 대입한다. (a /= b와 다름)

```python
class Solution:
    def convertToTitle(self, n: int) -> str:
        res = ""
        while n :
            n -= 1
            mod = n % 26
            res = chr(mod + ord('A')) + res
            n //= 26
        return res
```
