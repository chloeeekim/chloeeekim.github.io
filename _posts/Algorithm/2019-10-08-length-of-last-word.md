---
layout: post
title: "[Leetcode] 58. Length of Last Word"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/length-of-last-word/
---

하나의 문자열이 주어졌을 때, 마지막 단어의 길이를 구하는 문제
- 주어진 문자열은 upper/lower-case 알파벳과 공백으로 이루어진다.
- 단어란 공백을 포함하지 않는 charater의 sequence이다.
- 마지막 단어가 없는 경우, 0을 리턴한다.

<h2>Example 1</h2>
- Input : s = "Hello World"
- Output : 5

<h2>Example 2</h2>
- Input : s = "   fly me   to   the moon  "
- Output : 4

<h2>Example 3</h2>
- Input : s = "luffy is still joyboy"
- Output : 6

<h2>Note</h2>
- strip : 양쪽 공백 지우기 / rstrip : 오른쪽 공백 지우기 / lstrip : 왼쪽 공백 지우기
- 마지막 단어를 찾기 위함이므로, 왼쪽에 위치한 공백은 고려하지 않는다.
- 공백을 기준으로 split 하여 마지막 단어의 길이를 구한다.

```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        words = s.rstrip().split()
        if not words :
            return 0
        return len(words[-1])
```
