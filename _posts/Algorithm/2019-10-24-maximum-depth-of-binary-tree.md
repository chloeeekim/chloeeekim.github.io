---
layout: post
title: "[Leetcode] 104. Maximum Depth of Binary Tree"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/maximum-depth-of-binary-tree/
---

binary tree가 주어졌을 때, 해당 트리의 최대 depth를 구하는 문제
- depth는 root 노드에서부터 leaf 노드까지의 길이를 의미한다.
- leaf 노드란 자식이 없는 노드를 의미한다.

<h2>Example 1</h2>
- Input : root = [3,9,20,null,null,15,7]
- Output : 3

<h2>Example 2</h2>
- Input : root = [1,null,2]
- Output : 2

<h1>Solution 1</h1>

<h2>Note</h2>
stack을 사용하여 depth first search 방식으로 트리 탐색

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        if not root :
            return 0
        stack = [[root, 1]]
        res = 0
        while stack :
            temp = stack.pop()
            node = temp[0]
            if not node.right and not node.left :
                res = max(res, temp[1])
            if node.right :
                stack.append([node.right, temp[1] + 1])
            if node.left :
                stack.append([node.left, temp[1] + 1])
        return res
```

<h1>Solution 2</h1>

<h2>Note</h2>
- recursive하게 해결
- 한 단계씩 들어갈 때마다 depth 값을 1씩 증가시키는 방식

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        if not root:
            return 0
        depth = 0
        if root.left:
            depth = self.maxDepth(root.left)
        if root.right:
            depth = max(depth, self.maxDepth(root.right))
        return depth+1
```
