---
layout: post
title: "[Leetcode] 111. Minimum Depth of Binary Tree"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/minimum-depth-of-binary-tree/
---

binary tree가 주어졌을 때, 해당 트리의 minimum depth를 구하는 문제
- root 노드의 depth는 1이다.

<h2>Example 1</h2>
- Input : root = [3,9,20,null,null,15,7]
- Output : 2

<h2>Example 2</h2>
- Input : root = [2,null,3,null,4,null,5,null,6]
- Output : 5

<h1>Solution 1</h1>

<h2>Note</h2>
- queue를 사용하여 level order로 순회
- level(depth)를 [node, level]의 형태로 queue에서 관리

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def minDepth(self, root: TreeNode) -> int:
        if not root :
            return 0
        res = -1
        queue = [[root, 1]]
        while queue :
            temp = queue.pop(0)
            node, level = temp[0], temp[1]
            if res != -1 and level >= res :
                break
            if not node.left and not node.right :
                res = (min(res, level) if res != -1 else level)
            if node.left :
                queue.append([node.left, level + 1])            
            if node.right :
                queue.append([node.right, level + 1])
        return res
```

<h1>Solution 2</h1>

<h2>Note</h2>
- recursive하게 해결
- 한 단계씩 들어갈 때마다 depth 값을 1씩 증가
- minimum 값을 구해야 하므로 sys.maxsize 값과 비교

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def minDepth(self, root: TreeNode) -> int:
        if not root :
            return 0
        if not root.left and not root.right:
            return 1
        depth = sys.maxsize
        if root.left:
            depth = self.minDepth(root.left)
        if root.right:
            depth = min(depth, self.minDepth(root.right))
        return depth+1
```
