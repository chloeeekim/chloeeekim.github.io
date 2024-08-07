---
layout: post
title: "[Leetcode] 2. Add Two Numbers"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/add-two-numbers/
---

두 개의 Linked List가 주어졌을 때, 두 Linked List의 합을 구하는 문제
- 각 노드에는 정확히 1자리의 숫자가 포함되어 있다.
- 숫자는 역순으로 저장되어 있다. (e.g., 342 : 2 -> 4 -> 3)
- 숫자 0이 아닌 경우, 0으로 시작하는 숫자는 없다. (e.g., 043은 없다)

<h2>Example 1</h2>
- Input : l1= [2, 4, 3], l2 = [5, 6, 4]
- Output : [7, 0, 8]
- 342 + 465 = 807

<h2>Example 2</h2>
- Input : l1 = [0], l2 = [0]
- Output : [0]

<h2>Example 3</h2>
- Input : l1 = [9, 9, 9, 9, 9, 9, 9], l2 = [9, 9, 9, 9]
- Output : [8, 9, 9, 9, 0, 0, 0, 1]

<h2>Note</h2>
divmod : python 내장함수 (a/b, a%b 값을 리턴)

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        up = 0
        res = ListNode(-1)
        tail = res
        
        while l1 or l2 or up :
            val1 = (l1.val if l1 else 0)
            val2 = (l2.val if l2 else 0)
            up, num = divmod(val1 + val2 + up, 10)
            
            tail.next = ListNode(num)
            tail = tail.next
            
            l1 = (l1.next if l1 else None)
            l2 = (l2.next if l2 else None)
        
        return res.next
```
