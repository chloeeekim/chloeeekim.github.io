---
layout: post
title:  "Python으로 웹 스크래핑(웹 크롤링)하기"
author: chloeeekim
categories: [ Python, Programming ]
image: assets/images/python-web-scraping/title.jpg
featured: true
toc: true
---

웹 스크래핑(웹 크롤링)은 웹사이트에서 데이터를 추출하여 분석하거나 저장하는 기술입니다. 파이썬은 웹 스크래핑 작업에 널리 사용되는 프로그래밍 언어인데요. 이번 포스팅에서는 `Requests`와 `BeautifulSoup` 라이브러리를 사용하여 웹 스크래핑 하는 방법에 대해 단계별로 설명하도록 하겠습니다.

파이썬을 설치하는 과정과 기본 문법에 대해서는 이전에 작성해 둔 <a href="https://chloeeekim.github.io/python-tutorial/" target="_blank">Python Tutorial</a> 포스팅을 참고하시기 바랍니다.

# 환경 설정

파이썬이 설치되어 있다는 가정 하에, 필요한 두 라이브러리를 사용하기 위해서는 패키지를 설치해야 하는데, 터미널 혹은 명령 프롬프트를 열고 `pip`를 사용하여 설치하면 됩니다.

```bash
pip install requests beautifulsoup4
```

# 웹 스크래핑하기

웹 스크래핑 프로젝트의 기본 구조는 다음과 같습니다.

1. 웹페이지 요청 : Requests 라이브러리를 사용하여 웹페이지에 HTTP 요청을 보냅니다.
2. HTML 파싱 : BeautifulSoup을 사용하여 HTML을 파싱하고 원하는 데이터를 추출합니다.
3. 데이터 저장 : 추출한 데이터를 CSV 파일이나 데이터베이스에 저장합니다.

이번에는 간단한 구조를 지니고 있는 특정 뉴스 웹사이트에서 최신 뉴스 헤드라인을 수집하는 예제를 작성해보겠습니다.

## 웹페이지 요청

다음 코드는 Requests 라이브러리를 사용하여 `news.ycombinator.com`이라는 웹사이트에 `requests.get` 함수를 사용하여 HTTP 요청을 보냅니다.

```python
import requests

url = "https://news.ycombinator.com/"
response = requests.get(url)
html = response.content
```

## HTML 파싱

다음으로, BeautifulSoup을 사용하여 HTML을 파싱하고, `find_all` 메서드를 사용하여 뉴스 헤드라인을 포함하는 모든 `<a>` 태그를 찾습니다. 제대로 찾아졌는지 확인하기 위해서 번호를 붙여 출력해봅니다.

```python
from bs4 import BeautifulSoup

soup = BeautifulSoup(html, "html.parser")
headlines = soup.find_all("a", class_="storylink")

for i, headline in enumerate(headlines, start=1) :
    print(f"{i}. {headline.get_text()}")
```

## 데이터 저장

수집한 데이터를 CSV 파일에 저장하면 나중에 분석하거나 공유하기 쉽습니다. 다음은 `headlines.csv` 파일을 생성하고, 수집한 뉴스 헤드라인을 저장하는 예제입니다. `csv.writer`를 사용하여 데이터를 csv 형식으로 저장하게 됩니다.

```python
import csv

with open("headlines.csv", "w", newline="") as file :
    writer = csv.writer(file)
    writer.writerow(["No", "Headline"])
    for i, headline in enumerate(headlines, start=1) :
        writer.writerow([i, headline.get_text()])
```

# 다양한 기능 추가하기

## Pagination 처리

많은 웹사이트는 여러 페이지에 걸쳐서 데이터를 제공합니다. 이러한 경우 페이지네이션을 처리해야 합니다. 다음은 페이지네이션을 처리하여 여러 페이지에 걸쳐서 데이터를 수집하는 코드입니다. `get_headlines` 함수는 주어진 url에서 헤드라인을 추출하고, while 문을 통해 5페이지까지의 뉴스 헤드라인을 수집하게 됩니다.

```python
import requests
from bs4 import BeautifulSoup

def get_headlines(url) :
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    return soup.find_all("a", class_="storylink")

base_url = "https://news.ycombinator.com/news?p="
page_number = 1
all_headlines = []

while page_number <= 5 :
    url = f"{base_url}{page_number}"
    headlines = get_headlines(url)
    all_headlines.extend(headlines)
    page_number += 1

for i, headline in enumerate(all_headlines, start=1) :
    print(f"{i}. {headline.get_text()}")
```

## 요청 사이에 지연 추가

과도한 요청은 서버에 부하를 줄 수 있기도 하고, 데이터가 로드되는 데까지 시간이 걸릴 수 있기 때문에 필요한 경우 요청 사이에 지연을 추가해주는 것이 좋습니다. `time`을 사용하여 간단한 방법으로 지연을 추가할 수 있습니다. 초 단위로 지정되며, 실수도 허용되기 때문에 0.1초 등으로도 사용이 가능합니다.

```python
import time

time.sleep(1) # 1초의 지연 시간을 추가
```

이번 포스팅에서는 파이썬을 사용하여 웹 스크래핑(웹 크롤링)을 하는 방법에 대하여 알아보았습니다. 웹 스크래핑을 통해 다양한 웹사이트에서 데이터를 수집하고, 이를 분석하여 유용한 정보를 얻을 수 있습니다. Requests와 BeautifulSoup 라이브러리를 사용하면 웹 스크래핑 작업을 손쉽게 수행할 수 있습니다. 수집한 데이터를 저장해두면 추후에 유용하게 활용할 수 있을 것입니다.
