---
layout: post
title: "[Leetcode] 74. Search a 2D Matrix"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/search-a-2d-matrix/
---

m x n 사이즈의 2차원 리스트가 주어졌을 때, targeet이 존재하는지 찾는 문제
- 각 row에 있는 숫자들은 증가하는 순서로 정렬되어 있다.
- 각 row의 첫 번째 숫자는 이전 row의 마지막 숫자보다 크다.

<h2>Example 1</h2>
- Input : matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
- Output : true

<h2>Example 2</h2>
- Input : matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
- Output : false

<h2>Note</h2>
- 해당 row가 target을 포함하는 범위인지 확인한 후, 해당 row에 target이 존재하는지 확인

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        for row in matrix :
            if not row :
                return False
            if row[0] <= target and row[-1] >= target :
                c = row.count(target)
                if c == 0 :
                    return False
                else :
                    return True
        return False
```
