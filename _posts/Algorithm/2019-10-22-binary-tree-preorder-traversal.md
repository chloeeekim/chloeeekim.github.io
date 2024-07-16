---
layout: post
title: "[Leetcode] 144. Binary Tree Preorder Traversal"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/binary-tree-preorder-traversal/
---

binary tree가 하나 주어졌을 때, 해당 트리의 preorder traversal의 결과를 구하는 문제

<h2>Example 1</h2>
- Input : root = [1,null,2,3]
- Output : [1,2,3]

<h2>Example 2</h2>
- Input : root = []
- Output : []

<h2>Example 3</h2>
- Input : root = [1]
- Output : [1]

<h2>Note</h2>
- preorder() 함수를 만들어 Recursive하게 해결
- (참고) <a href="https://chloeeekim.github.io/binary-tree-inorder-traversal/" target="_blank">inorder traversal</a>

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def preorderTraversal(self, root: TreeNode) -> List[int]:
        res = []
        def preorder(self, node: TreeNode) -> None:
            if not node :
                return            
            res.append(node.val)
            preorder(self, node.left)
            preorder(self, node.right)
        preorder(self, root)
        return res
```
