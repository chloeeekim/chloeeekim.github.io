---
layout: post
title: "[Leetcode] 8. String to Integer (atoi)"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/string-to-integer-atoi/
---

문자열이 주어졌을 때, 해당 문자열을 정수로 변환하는 문제
- 문자열은 whitespace character, 숫자 및 문자로 구성된다.
- 스페이스(' ')만이 whitespace character로 간주되며, 시작 부분을 포함하여 문자열 내에 많이 존재할 수 있다.
- minus('-') 및 plus('+') 기호로 숫자가 시작될 수 있다.
- 첫 non-whitespace character가 숫자 및 '+', '-'가 아닐 경우, 0을 리턴
- 32-bit signed integer(-2^31 ~ 2^31 - 1)를 기준으로 하여, 해당 범위를 넘는 경우 INT_MAX 혹은 INT_MIN을 리턴

<h2>Example 1</h2>
- Input : s = "42"
- Output : 42

<h2>Example 2</h2>
- Input : s = " -042"
- Output : -42

<h2>Example 3</h2>
- Input : s = "1337c0d3"
- Output : 1337

<h2>Example 4</h2>
- Input : s = "0-1"
- Output : 0

<h2>Example 5</h2>
- Input : s = "words and 987"
- Output : 0

<h1>Solution 1</h1>

<h2>Note</h2>
- strip() : 문자열 양쪽으로 한 칸 이상의 연속된 공백을 모두 지우는 함수
- split() : 공백을 기준으로 문자열을 나누어 리스트로 반환

```python
class Solution:
    def myAtoi(self, str: str) -> int:
        idx = 0
        s = str.strip().split()
        if len(s) == 0 : 
            return 0
        
        s = s[0]
        if s[0] == '+' or s[0] == '-' :
            idx = 1
        for ch in s[idx:] :
            if ch.isdigit() :
                idx += 1
            else :
                break
        
        res = s[:idx]
        res = int(res) if (res != '+' and res != '-' and res) else 0
        if res < -2 ** 31 :
            return -2 ** 31
        elif res > 2 ** 31 - 1 : 
            return 2 ** 31 - 1
        else :
            return res
```

<h1>Solution 2</h1>

<h2>Note</h2>
str을 한 문자씩 확인하면서 숫자를 찾는 방식으로 구현

```python
class Solution:
    def myAtoi(self, str: str) -> int:
        res, idx, isminus = 0, 0, False
        intmax, intmin = 2 ** 31 - 1, -2 ** 31
        if not str :
            return 0
        for i in range(len(str)) :
            if str[i] != ' ' :
                idx = i
                break
        if str[idx] == '-' or str[idx] == '+' :
            isminus = True if str[idx] == '-' else False
            idx += 1
        for i in range(idx, len(str)) :
            if str[i].isdigit() :
                res = res * 10 + int(str[i])
            else :
                break
        if isminus :
            res *= -1
            return intmin if res < intmin else res
        else :
            return intmax if res > intmax else res
```
