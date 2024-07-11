---
layout: post
title: "[Leetcode] 9. Palindrome Number"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/palindrome-number/
---

하나의 정수가 주어졌을 때, 해당 정수가 palindrome인지 확인하는 문제
- Palindrome이란 : 회문. 거꾸로 읽었을 때도 제대로 읽었을 때와 동일한 경우

<h2>Example 1</h2>
- Input : x = 121
- Output : true

<h2>Example 2</h2>
- Input : x = -121
- Output : false
- 거꾸로 읽으면 121-가 되므로 palindrome이 아니다.

<h2>Example 3</h2>
- Input : x = 10
- Output : false

<h2>Note</h2>
reverse 문자열 구하는 방법 : [::-1]

```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        x = str(x)
        if x == x[::-1] :
            return True
        else : 
            return False
```
