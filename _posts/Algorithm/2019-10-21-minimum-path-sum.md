---
layout: post
title: "[Leetcode] 64. Minimum Path Sum"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/minimum-path-sum/
---

m x n의 양수로 채워진 Grid가 주어졌을 때, 좌상단에서 우하단으로 이동하는 path의 합의 최솟값을 구하는 문제
- 한 번에 한 칸씩 오른쪽 혹은 아래로만 이동할 수 있다.

<h2>Example 1</h2>
- Input : grid = [[1,3,1],[1,5,1],[4,2,1]]
- Output : 7
- 1 -> 3 -> 1 -> 1 -> 1

<h2>Example 2</h2>
- Input : grid = [[1,2,3],[4,5,6]]
- Output : 12

<h2>Note</h2>
특정 칸으로 이동하는 방법의 최솟값은 위쪽 혹은 왼쪽 칸의 값 중에서 작은 값에서 이동하는 것

```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        for i in range(len(grid)) :
            for j in range(len(grid[0])) :
                if i == 0 and j == 0 :
                    continue
                if i == 0 :
                    grid[i][j] += grid[i][j-1]
                elif j == 0 :
                    grid[i][j] += grid[i-1][j]
                else :
                    grid[i][j] += min(grid[i][j-1], grid[i-1][j])
        return grid[-1][-1]
```
