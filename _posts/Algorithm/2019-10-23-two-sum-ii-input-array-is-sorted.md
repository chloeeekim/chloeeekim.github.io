---
layout: post
title: "[Leetcode] 167. Two Sum II - Input Array is Sorted"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
---

주어진 정수 배열에서 두 값의 합이 찾고자 하는 값(target)일 경우, 두 인덱스를 반환하는 문제
- 주어진 정수 배열은 이미 증가하는 방향으로 정렬되어 있다.
- 인덱스는 non zero-based로 리턴해야 한다. (1부터 시작)
- 정확히 하나의 솔루션이 존재한다.
- 동일한 값은 두 번 사용할 수 없다.

<h2>Example 1</h2>
- Input : numbers = [2,7,11,15], target = 9
- Output : [1,2]

<h2>Example 2</h2>
- Input : numbers = [2,3,4], target = 6
- Output : [1,3]

<h2>Example 3</h2>
- Input : numbers = [-1,0], target = -1
- Output : [1,2]

<h2>Note</h2>
dict 사용 (key : 확인한 정수값 / value : 인덱스)

```python
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        temp = {}
        for i, num in enumerate(numbers) :
            if target - num in temp :
                return [temp[target - num] + 1, i + 1]
            else :
                temp[num] = i
```
