---
layout: post
title: "[Leetcode] 113. Path Sum II"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/path-sum-ii/
---

binary tree와 정수 sum이 주어졌을 때, root-to-leaf path의 합이 sum과 동일한 모든 path를 구하는 문제
- leaf 노드란 자식이 없는 노드를 의미한다.

<h2>Example 1</h2>
- Input : root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
- Output : [[5,4,11,2],[5,8,4,5]]

<h2>Example 2</h2>
- Input : root = [1,2,3], targetSum = 5
- Output : []

<h2>Example 3</h2>
- Input : root = [1,2], targetSum = 0
- Output : []

<h2>Note</h2>
- getpath() 함수를 생성하여 recursive하게 해결
- 만약 leaf 노드이면서 path의 값이 sum과 동일한 값을 가지는 경우 res에 전체를 append
- 얕은 복사의 문제로 `path.append(node.val)` 대신 `path = path + [node.val]` 사용
- (참고) 중간 노드의 값이 targetSum보다 커지면 아래 노드는 확인하지 않도록 구현하려 했으나, 음수 값이 포함되는 테스트 케이스가 존재하여 해당 조건은 삭제

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def pathSum(self, root: TreeNode, sum: int) -> List[List[int]]:
        if not root :
            return []
        res = []
        def getpath(self, node: TreeNode, temp: int, path: List[int]) :
            path = path + [node.val]
            if (not node.right and not node.left) and (temp + node.val == sum) :
                res.append(path)
            if node.left :
                getpath(self, node.left, temp + node.val, path)            
            if node.right :
                getpath(self, node.right, temp + node.val, path)
        getpath(self, root, 0, [])
        return res
```
