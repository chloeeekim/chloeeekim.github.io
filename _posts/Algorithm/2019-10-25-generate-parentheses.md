---
layout: post
title: "[Leetcode] 22. Generate Parentheses"
author: chloeeekim
categories: [Algorithm]
image: assets/images/leetcode.png
featured: false
toc: false
link: https://leetcode.com/problems/generate-parentheses/
---

숫자 n이 주어졌을 때, n쌍의 parentheses로 만들어지는 모든 조합을 찾는 문제

<h2>Example 1</h2>
- Input : n = 3
- Output : ["((()))","(()())","(())()","()(())","()()()"]

<h2>Example 2</h2>
- Input : n = 1
- Output : ["()"]

<h2>Note</h2>
- parenthesis() 함수로 recursive하게 해결
- 앞에서 사용한 `(`와 `)`의 개수를 함수 인자로 넘겨줌으로써 이후에 만들어질 수 있는 조합을 탐색

```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []
        def parenthesis(self, temp: str, open: int, close: int) :
            if close == n :
                res.append(temp)
                return
            if open == n :
                parenthesis(self, temp + ")", open, close + 1)
            else :
                parenthesis(self, temp + "(", open + 1, close)
                if close + 1 <= open :
                    parenthesis(self, temp + ")", open, close + 1)
        parenthesis(self, "", 0, 0)
        return res
```
