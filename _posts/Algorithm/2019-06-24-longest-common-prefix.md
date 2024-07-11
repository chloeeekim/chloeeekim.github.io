---
layout: post
title: "[Leetcode] 14. Longest Common Prefix"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/longest-common-prefix/
---

여러 문자열이 포함된 array(list)가 주어졌을 때, 가장 긴 common prefix(모든 문자열에서 등장하는 prefix)를 찾는 문제
- common prefix가 없는 경우, 빈 문자열("")을 리턴한다.
- 모든 입력은 소문자 알파벳으로만 주어진다.

<h2>Example 1</h2>
- Input : ["flower", "flow", "flight"]
- Output : "fl"

<h2>Example 2</h2>
- Input : ["dog", "racecar", "car"]
- Output : ""

<h2>Note</h2>
- zip(*iterabble) : 동일한 개수로 이루어진 자료형을 묶어준다.
    - e.g., list(zip([1, 2, 3], [4, 5, 6])) -> [(1, 4), (2, 5), (3, 6)]
- 문자열 리스트를 정렬한 경우, 첫 번째 문자열과 마지막 문자열만 비교하면 가장 긴 common prefix를 구할 수 있다.

```python
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        if len(strs) == 0 :
            return ""
        elif len(strs) == 1 :
            return strs[0]
        strs.sort()
        res = ""
        for x, y in zip(strs[0], strs[-1]) :
            if x == y :
                res += x
            else :
                break
        return res
```
