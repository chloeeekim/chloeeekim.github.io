---
layout: post
title: "[Leetcode] 217. Contains Duplicate"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/contains-duplicate/
---

숫자들이 포함된 리스트가 주어졌을 때, 해당 리스트에 중복된 값이 있는지를 구하는 문제
- 동일한 값이 두 번 이상 반복되는 것이 존재할 경우 true를 리턴한다.
- 모든 값이 한 번씩만 등장하는 경우 false를 리턴한다.

<h2>Example 1</h2>
- Input : nums = [1,2,3,1]
- Output : true

<h2>Example 2</h2>
- Input : nums = [1,2,3,4]
- Output : false

<h2>Example 3</h2>
- Input : nums = [1,1,1,3,3,4,3,2,4,2]
- Output : true

<h2>Note</h2>
중복을 허용하지 않는 set을 생성 후, set과 기존 list의 길이를 비교하여, set이 더 짧다면 중복이 존재하는 것임을 확인할 수 있다.

```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        setnums = set(nums)
        if len(nums) != len(setnums) :
            return True
        else :
            return False
```
