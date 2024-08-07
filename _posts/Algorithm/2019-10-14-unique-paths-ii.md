---
layout: post
title: "[Leetcode] 63. Unique Paths II"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/unique-paths-ii/
---

m x n 사이즈의 그리드가 주어졌을 때, 해당 그리드의 왼쪽 위에서 오른쪽 아래까지 도달하는 방법의 수를 구하는 문제
- 한 번에 한 칸만 아래 혹은 오른쪽으로 이동할 수 있다.
- m과 n은 최대 100 이하의 정수이다.
- 장애물이 있는 칸은 1로, 비어있는 칸은 0으로 주어진다.

<h2>Example 1</h2>
- Input : obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
- Output : 2

<h2>Example 2</h2>
- Input : obstacleGrid = [[0,1],[0,0]]
- Output : 1

<h2>Note</h2>
- dp를 사용하여 해결
- 특정 칸에 도달하기 위한 방법의 수 : 위쪽 칸에 도달하기 위한 방법의 수 + 왼쪽 칸에 도달하기 위한 방법의 수
- list를 특정 값(value)로 초기화 : lst = [value for i in range(size)]
- 가장 위쪽과 왼쪽의 칸들은 중간에 장애물이 있는 경우 도달할 수 있는 방법이 없다.

```python
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        n, m = len(obstacleGrid), len(obstacleGrid[0])
        cal = [[0 for i in range(m)] for i in range(n)]
        for i in range(n) :
            if obstacleGrid[i][0] == 1 :
                break
            cal[i][0] = 1
        for j in range(m) :
            if obstacleGrid[0][j] == 1 :
                break
            cal[0][j] = 1
        for i in range(1, n) :
            for j in range(1, m) :
                if obstacleGrid[i][j] == 1 :
                    cal[i][j] = 0
                    continue
                else :
                    cal[i][j] = cal[i-1][j] + cal[i][j-1]
        return cal[-1][-1]
```
