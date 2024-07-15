---
layout: post
title: "[Leetcode] 118. Pascal's Triangle"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/pascals-triangle/
---

양의 정수인 numRows가 주어졌을 때, 파스칼의 삼각형(Pascal's Triangle)을 만드는 문제
- 파스칼의 삼각형 : 각 숫자는 위의 두 숫자의 합으로 이루어진다.

<h2>Example 1</h2>
- Input : numRows = 5
- Output : [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

<h2>Example 2</h2>
- Input : numRows = 1
- Output : [[1]]

<h2>Note</h2>
- 한 줄씩 각 row를 계산한 뒤, 결과 리스트에 append하는 방식으로 구현

```python
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        res = []
        for i in range(numRows) :
            row = [1 for _ in range(i+1)]
            for j in range(1, i) :
                row[j] = res[i-1][j-1] + res[i-1][j]
            res.append(row)
        return res
```
