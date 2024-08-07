---
layout: post
title: "[Leetcode] 13. Roman to Integer"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/roman-to-integer/
---

로마 숫자가 주어졌을 때, 정수로 변환하는 문제
- 각 문자(symbol)별 해당하는 값은 아래와 같다.
    - I : 1 / V : 5 / X : 10 / L : 50 / C : 100 / D : 500 / M : 1000
- 왼쪽에서 오른쪽으로 읽으며, 큰 숫자에서 작은 숫자의 순서로 작성된다.
- 작은 값에 해당하는 문자가 큰 값에 해당하는 문자의 왼쪽에 위치할 경우, 그 값만큼을 뺀다. (e.g., IV : 4)

<h2>Example 1</h2>
- Input : s = "III"
- Output : 3

<h2>Example 2</h2>
- Input : s = "LVIII"
- Output : 58

<h2>Example 3</h2>
- Input : s = "MCMXCIV"
- Output : 1994

<h2>Note</h2>
- dict 사용 (key : 로마 숫자(문자) / value : 문자에 해당하는 값)
- 이전에 나타난 문자가 현재 문자보다 작은 값일 경우 : 현재 문자의 값 - 이전 문자의 값
- 동일한 문자가 반복되는 경우 : 해당 문자보다 크거나 작은 값을 지닌 문자가 나올 때까지 더한다.
- 이전에 나타난 문자가 현재 문자보다 큰 값일 경우 : 이전까지의 값을 전부 더한다. (큰 숫자에서 작은 숫자로 작성되므로)

```python
class Solution:
    def romanToInt(self, s: str) -> int:
        dict = {'I' : 1, 'V' : 5, 'X' : 10, 'L' : 50, 'C' : 100, 'D' : 500, 'M' : 1000}
        
        res = 0
        temp = 0
        before = 1000
        for i, ch in enumerate(s) :
            if before < dict[ch] :
                temp = dict[ch] - temp
                res += temp
                temp = 0
            elif before == dict[ch] :
                temp += dict[ch]
            else :
                res += temp
                temp = dict[ch]
            before = dict[ch]
        res += temp
        return res
```
