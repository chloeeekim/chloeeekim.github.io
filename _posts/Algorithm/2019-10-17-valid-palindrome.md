---
layout: post
title: "[Leetcode] 125. Valid Palindrome"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/valid-palindrome/
---

주어진 문자열이 Palindrome인지 확인하는 문제
- Palindrome : 회문. 거꾸로 읽었을 때도 제대로 읽었을 때와 동일한 경우
- 문자열 내에서 alphanumeric character를 제외한 나머지 경우는 무시한다.

<h2>Example 1</h2>
- Input : s = "A man, a plan, a canal: Panama"
- Output : true

<h2>Example 2</h2>
- Input : s = "race a car"
- Output : false

<h2>Example 3</h2>
- Input : s = " "
- Output : true

<h2>Note</h2>
- re.sub를 사용하여 alphanumeric이 아닌 모든 경우는 ''로 치환
- 대소문자를 구분하지 않으므로, 전부 lowercase로 변경
- reverse 문자열 구하는 법 : [::-1]


```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        s = re.sub('\W', '', s).lower()
        if s[::-1] == s :
            return True
        else :
            return False
```
