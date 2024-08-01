---
layout: post
title: "[Leetcode] 56. Merge Intervals"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/merge-intervals/
---

interval들의 collection이 주어졌을 때, 겹치는 모든 interval들을 합치는 문제

<h2>Example 1</h2>
- Input : intervals = [[1,3],[2,6],[8,10],[15,18]]
- Output : [[1,6],[8,10],[15,18]]

<h2>Example 2</h2>
- Input : intervals = [[1,4],[4,5]]
- Output : [[1,5]]

<h2>Note</h2>
interval들을 sorting 한 후, 하나씩 비교하면서 합치는 방식으로 해결

```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        i = 0
        intervals.sort()
        while i < len(intervals) - 1 :
            if intervals[i][1] >= intervals[i+1][0] :
                intervals[i][1] = max(intervals[i][1], intervals[i+1][1])
                del intervals[i+1]
            else :
                i += 1
        return intervals
```
