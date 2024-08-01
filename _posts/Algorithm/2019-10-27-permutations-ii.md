---
layout: post
title: "[Leetcode] 47. Permutations II"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/permutations-ii/
---

중복되는 숫자가 포함된 리스트가 주어졌을 때, 이를 이용해 만들 수 있는 모든 permutation들을 구하는 문제

<h2>Example 1</h2>
- Input : nums = [1,1,2]
- Output : [[1,1,2],[1,2,1],[2,1,1]]

<h2>Example 2</h2>
- Input : nums = [1,2,3]
- Output : [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

<h1>Solution 1</h1>

<h2>Note</h2>
- rec() 함수를 생성하여 recursive하게 해결
- 앞에서 만들어진 리스트(temp)와 남은 리스트(remain)를 관리

```python
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        res = []
        def rec(self, temp: List[int], remain: List[int]):
            if not remain :
                if temp not in res :
                    res.append(temp)
                return
            seen = remain[0] - 1
            for i, num in enumerate(remain) :
                if num != seen :
                    rem = remain[:i] + remain[i+1:]
                    rec(self, temp + [num], rem)
                    seen = num
        rec(self, [], nums)
        return res
```

<h1>Solution 2</h1>

<h2>Note</h2>
- itertools의 permutations 함수를 사용
- set으로 중복을 제거한 후, list의 형태로 변경하여 리턴

```python
from itertools import permutations

class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        return list(set(permutations(nums)))
```
