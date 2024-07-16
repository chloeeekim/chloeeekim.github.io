---
layout: post
title: "[Leetcode] 136. Single Number"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/single-number/
---

비어 있지 않은, 숫자로 이루어진 리스트가 주어졌을 때, 해당 리스트 안에 한 번만 등장하는 원소를 찾는 문제
- 단 하나의 원소를 제외하고는 모두 두 번씩 등장한다.

<h2>Example 1</h2>
- Input : nums = [2,2,1]
- Output : 1

<h2>Example 2</h2>
- Input : nums = [4,1,2,1,2]
- Output : 4

<h2>Example 3</h2>
- Input : nums = [1]
- Output : 1

<h2>Note</h2>
- set : 원소의 유일성을 보장하는 자료형
- 원소가 모두 두 번씩 등장한다고 가정했을 때의 총합은 2 * sum(set(nums))이고, 하나의 원소만 한 번 등장하므로 차를 구하여 원소를 구할 수 있다.


```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        return 2 * sum(set(nums)) - sum(nums)
```
