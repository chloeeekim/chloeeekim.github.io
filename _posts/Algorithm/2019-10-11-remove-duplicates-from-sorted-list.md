---
layout: post
title: "[Leetcode] 83. Remove Duplicates from Sorted List"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/remove-duplicates-from-sorted-list/
---

정렬된 숫자로 이루어진 Linked List가 하나 주어졌을 때, 모든 숫자가 단 한 번만 등장하도록 중복을 제거한 리스트를 만드는 문제

<h2>Example 1</h2>
- Input : head = [1, 1, 2]
- Output : [1, 2]

<h2>Example 2</h2>
- Input : head = [1, 1, 2, 3, 3]
- Output : [1, 2, 3]

<h2>Note</h2>
이전과 숫자가 동일한 노드라면, 앞 노드와 뒷 노드를 연결하여 해당 노드를 리스트에서 삭제

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        if not head :
            return head
        before, now = head, head
        appear = head.val        
        while before.next :
            now = before.next
            if now.val == appear :
                before.next = now.next
                now = None
            else :
                appear = now.val
                before = now
        return head
```
