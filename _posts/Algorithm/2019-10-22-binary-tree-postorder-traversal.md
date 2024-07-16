---
layout: post
title: "[Leetcode] 145. Binary Tree Postorder Traversal"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/binary-tree-postorder-traversal/
---

binary tree가 하나 주어졌을 때, 해당 트리의 postorder traversal의 결과를 구하는 문제

<h2>Example 1</h2>
- Input : root = [1,null,2,3]
- Output : [3,2,1]

<h2>Example 2</h2>
- Input : root = []
- Output : []

<h2>Example 3</h2>
- Input : root = [1]
- Output : [1]

<h2>Note</h2>
- postorder() 함수를 만들어 Recursive하게 해결
- (참고) <a href="https://chloeeekim.github.io/binary-tree-inorder-traversal/" target="_blank">inorder traversal</a>
- (참고) <a href="https://chloeeekim.github.io/binary-tree-preorder-traversal/" target="_blank">preorder traversal</a>

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def postorderTraversal(self, root: TreeNode) -> List[int]:
        res = []
        def postorder(self, node: TreeNode) -> None:
            if not node :
                return          
            postorder(self, node.left)
            postorder(self, node.right)
            res.append(node.val)
        postorder(self, root)
        return res
```
