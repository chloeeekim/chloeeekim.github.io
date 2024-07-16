---
layout: post
title: "[Leetcode] 129. Sum Root to Leaf Numbers"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/sum-root-to-leaf-numbers/
---

binary tree가 주어졌을 때, root-to-leaf path의 숫자를 모두 더한 값을 구하는 문제
- 트리 노드는 0부터 9까지의 숫자만 포함한다.
- root-to-leaf path의 예로 1->2->3이 있다면, 123으로 계산한다.
- leaf 노드란 자식이 없는 노드를 의미한다.

<h2>Example 1</h2>
- Input : root = [1,2,3]
- Output : 25
- 1->2, 1->3 두 가지 path가 있으므로, 12 + 13 = 25

<h2>Example 2</h2>
- Input : root = [4,9,0,5,1]
- Output : 1026

<h2>Note</h2>
- stack을 사용하여 depth-first search 방식으로 구현
- 부모노드에서부터 십진법을 계산하는 방식으로 해당 노드의 val을 path의 값으로 갱신

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def sumNumbers(self, root: TreeNode) -> int:
        if not root :
            return 0
        res = 0
        stack = [root]
        while stack :
            node = stack.pop()            
            if not node.right and not node.left :
                res += node.val
            temp = node.val * 10
            if node.right :
                node.right.val += temp
                stack.append(node.right)
            if node.left :
                node.left.val += temp
                stack.append(node.left)     
        return res
```
