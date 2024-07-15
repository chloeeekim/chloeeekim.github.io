---
layout: post
title: "[Leetcode] 28. Implement strStr()"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/implement-strstr/
---

두 개의 문자열(haystack, needle)이 주어졌을 때, haystack 내에서 needle이 처음 등장하는 인덱스를 리턴하는 문제
- needle이 haystack 내에 존재하지 않는다면 -1을 리턴한다.

<h2>Example 1</h2>
- Input : haystack = "sadbutsad", needle = "sad"
- Output : 0

<h2>Example 2</h2>
- Input : haystack = "leetcode", needle = "leeto"
- Output : -1

<h2>Note</h2>
- find : 찾는 문자나 문자열이 없다면 -1을 리턴
- index : 찾는 문자나 문자열이 없다면 오류 발생

```python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        return haystack.find(needle)
```
