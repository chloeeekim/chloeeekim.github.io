---
layout: post
title: "[Leetcode] 46. Permutations"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/permutations/
---

서로 다른 숫자로 이루어진 리스트가 주어졌을 때, 이를 이용해 만들 수 있는 모든 permutation들을 구하는 문제

<h2>Example 1</h2>
- Input : nums = [1,2,3]
- Output : [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

<h2>Example 2</h2>
- Input : nums = [0,1]
- Output : [[0,1],[1,0]]

<h2>Example 3</h2>
- Input : nums = [1]
- Output : [[1]]

<h1>Solution 1</h1>

<h2>Note</h2>
- rec() 함수를 생성하여 recursive하게 해결
- 앞에서 만들어진 리스트(temp)와 남은 리스트(remain)를 관리
- 얕은 복사의 문제로 `temp.append(num)` 대신에 `temp + [num]`을, `rem = remain.remove(num)`이나 `del num[i]` 대신에 `remain[:i] + remain[i+1:]`을 사용

```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []
        def rec(self, temp: List[int], remain: List[int]):
            if not remain :
                res.append(temp)
                return
            for i, num in enumerate(remain) :
                rem = remain[:i] + remain[i+1:]
                rec(self, temp + [num], rem)
        rec(self, [], nums)
        return res
```

<h1>Solution 2</h1>

<h2>Note</h2>
itertools의 permutations 함수를 사용

```python
from itertools import permutations

class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        return permutations(nums)
```
