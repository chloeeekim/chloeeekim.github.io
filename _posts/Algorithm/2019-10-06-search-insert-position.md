---
layout: post
title: "[Leetcode] 35. Search Insert Position"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/search-insert-position/
---

정렬된 리스트와 정수 하나가 주어졌을 때, 주어진 정수(target)가 삽입될 위치의 인덱스를 찾는 문제
- target이 삽입되더라도 리스트는 정렬되어 있어야 한다.

<h2>Example 1</h2>
- Input : nums = [1, 3, 5, 6], target = 5
- Output : 2

<h2>Example 2</h2>
- Input : nums = [1, 3, 5, 6], target = 2
- Output : 1

<h2>Example 3</h2>
- Input : nums = [1,3,5,6], target = 7
- Output : 4

<h2>Note</h2>
- target이 리스트의 마지막 값보다 큰 경우 : 리스트의 제일 마지막에 위치한다.
- 리스트를 돌면서 target보다 크거나 같은 값이 나오면 해당 인덱스를 리턴한다.

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        if target > nums[-1] :
            return len(nums)
        for i in range(len(nums)) :
            if nums[i] >= target :
                return i
```
