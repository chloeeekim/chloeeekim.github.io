---
layout: post
title: "[Leetcode] 2. Longest Substring Without Repeating Characters"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/longest-substring-without-repeating-characters/
---

주어진 문자열에서 문자가 반복되지 않는 최대 길이의 substring의 길이를 구하는 문제
- subsequence가 아닌 substring이어야 한다. (e.g., pwwkew에서 pwke는 subsequence)

<h2>Example 1</h2>
- Input : s = "abcabcbb"
- Output : 3
- "abc" -> 3

<h2>Example 2</h2>
- Input : s = "bbbbb"
- Output : 1
- "b" -> 1

<h2>Example 3</h2>
- Input : s = "pwwkew"
- Output : 3
- "wke" -> 3 (not "pwke")

<h2>Note</h2>
dict 사용 (key : 출현한 문자 / value : 해당 문자의 index)
sliding window 방식
반복된 문자가 나타났을 경우, 지금의 substring에의 포함 여부 확인 후 업데이트

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = {}
        res = temp = start = 0
        
        for i, ch in enumerate(s) :
            if ch in seen and seen[ch] >= start :
                res = max(res, temp)
                temp = i - seen[ch]
                start = seen[ch] + 1
            else :
                temp += 1
            seen[ch] = i
        return max(res, temp)
```
