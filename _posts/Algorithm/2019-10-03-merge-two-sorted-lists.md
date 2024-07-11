---
layout: post
title: "[Leetcode] 21. Merge Two Sorted Lists"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/merge-two-sorted-lists/
---

두 개의 정렬된 Linked List가 주어졌을 때, 이를 정렬된 하나의 Linked List로 만드는 문제
- 각 list의 노드 개수는 [0, 50]이다.
- list1과 list2는 모두 non-decreasing 순으로 정렬되어 있다.

<h2>Example 1</h2>
- Input : list1 = [1, 2, 4], list2 = [1, 3, 4]
- Output : [1, 1, 2, 3, 4, 4]

<h2>Example 2</h2>
- Input : list1 = [], list2 = []
- Output : []

<h2>Example 3</h2>
- Input : list1 = [], list2 = [0]
- Output : [0]

<h2>Note</h2>
- next가 None이 아닐 때까지 값을 하나씩 비교
- 하나의 리스트가 끝나면 다른 리스트의 남은 부분을 결과 리스트의 뒤에 붙인다.

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        res = ListNode(-1)
        head = res
        while l1 and l2 :
            if l1.val < l2.val :
                head.next = ListNode(l1.val)
                head = head.next
                l1 = l1.next
            else :
                head.next = ListNode(l2.val)
                head = head.next
                l2 = l2.next
        if l1 :
            head.next = l1
        if l2 :
            head.next = l2
        return res.next
```
