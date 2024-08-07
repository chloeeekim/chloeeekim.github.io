---
layout: post
title: "[Leetcode] 17. Letter Combinations of a Phone Number"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/letter-combinations-of-a-phone-number/
---

숫자로 이루어진 문자열이 주어졌을 때, 이 숫자들로 나타낼 수 있는 모든 문자의 combination들을 구하는 문제
- 숫자는 2부터 9까지이다. (1은 해당하는 문자가 없다.)
- 각 숫자에 맵핑되는 문자는 다음과 같다.
    - 2: a, b, c / 3 : d, e, f / 4 : g, h, i / 5 : j, k, l / 6 : m, n, o / 7 : p, q, r, s / 8 : t, u, v / 9 : w, x, y, z

<h2>Example 1</h2>
- Input : digits = "23"
- Output : ["ad","ae","af","bd","be","bf","cd","ce","cf"]

<h2>Example 2</h2>
- Input : digits = ""
- Output : []

<h2>Example 3</h2>
- Input : digits = "2"
- Output : ["a","b","c"]

<h2>Note</h2>
- getComb() 함수를 생성하여 recursive하게 해결
- dict를 사용하여 각 숫자에 대응하는 문자의 리스트를 관리

```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        numbers = {'1' : [''], '2' : ['a', 'b', 'c'], '3' : ['d', 'e', 'f'],
                   '4' : ['g', 'h', 'i'], '5' : ['j', 'k', 'l'], '6' : ['m', 'n', 'o'],
                   '7' : ['p', 'q', 'r', 's'], '8' : ['t', 'u', 'v'], '9' : ['w', 'x', 'y', 'z']}        
        if digits == '' :
            return []        
        res = []
        def getComb(self, temp: str, point: int):
            if point == len(digits) :
                res.append(temp)
                return
            for ch in numbers[digits[point]] :
                getComb(self, temp + ch, point + 1)
        getComb(self, "", 0)
        return res
```
