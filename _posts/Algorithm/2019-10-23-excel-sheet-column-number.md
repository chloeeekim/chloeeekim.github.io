---
layout: post
title: "[Leetcode] 171. Excel Sheet Column Number"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/excel-sheet-column-number/
---

엑셀 시트에 나타나는 것과 동일한 column title이 주어졌을 때, 이를 숫자로 변경하는 문제
- A -> 1, B -> 2, ... , Z -> 26, AA -> 27, AB -> 28 ... 과 같은 순서로 진행된다.

<h2>Example 1</h2>
- Input : columnTitle = "A"
- Output : 1

<h2>Example 2</h2>
- Input : columnTitle = "AB"
- Output : 28

<h2>Example 3</h2>
- Input : columnTitle = "ZY"
- Output : 701

<h2>Note</h2>
- 26진법을 계산하듯이 계산
- ord(ch) : 문자를 아스키 코드로 변환
- chr(num) : 아스키 코드를 문자로 변환

```python
class Solution:
    def titleToNumber(self, s: str) -> int:
        res = 0
        for ch in s :
            res *= 26
            res += (ord(ch) - ord('A') + 1)
        return res
```
