---
layout: post
title: "[Leetcode] 226. Invert Binary Tree"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/invert-binary-tree/
---

binary tree가 주어졌을 때, 이를 좌우로 뒤집는 문제

<h2>Example 1</h2>
- Input : root = [4,2,7,1,3,6,9]
- Output : [4,7,2,9,6,3,1]

<h2>Example 2</h2>
- Input : root = [2,1,3]
- Output : [2,3,1]

<h2>Example 3</h2>
- Input : root = []
- Output : []

<h2>Note</h2>
- invert() 함수를 만들어서 해당 노드의 자식 노드 두 개를 바꾸어주는 방식으로 구현

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def invertTree(self, root: TreeNode) -> TreeNode:
        if not root :
            return root
        def invert(self, node: TreeNode):
            temp = node.right
            node.right = node.left
            node.left = temp
            if node.right :
                invert(self, node.right)
            if node.left :
                invert(self, node.left)
        invert(self, root)
        return root
```
