---
layout: post
title:  "Python 자동화 스크립트 작성하기"
author: chloeeekim
categories: [ Python, Programming ]
image: assets/images/python-automation-script/title.png
featured: true
toc: true
---

파이썬은 그 강력한 기능과 간단한 문법 덕분에 자동화 작업에 널리 사용됩니다. 반복적이고 시간이 많이 걸리는 일상 업무를 자동화하면 효율성을 크게 향상시킬 수 있습니다. 자동화를 하게 되면, 시간을 절약할 수 있고, 수작업에서 발생하는 오류를 줄일 수 있으며, 생산성을 향상할 수 있습니다. 이번 포스팅에서는 파이썬으로 자동화 스크립트를 작성하는 방법에 대해서 소개하도록 하겠습니다.

파이썬을 설치하는 과정과 기본 문법에 대해서는 이전에 작성해 둔 <a href="https://chloeeekim.github.io/python-tutorial/" target="_blank">Python Tutorial</a> 포스팅을 참고하시기 바랍니다.

# 웹 스크래핑(웹 크롤링)

웹 스크래핑이란 웹사이트에서 데이터를 자동으로 추출하는 것을 의미합니다. 파이썬의 `requests`와 `BeautifulSoup` 라이브러리를 사용하여 웹 스크래핑을 간단하게 수행할 수 있습니다. 두 라이브러리를 사용하기 위해서는 패키지를 설치해야 하는데, 터미널 혹은 명령 프롬프트를 열고 `pip`를 사용하여 설치하면 됩니다.

```bash
pip install requests beautifulsoup4
```

다음은 `example.com`이라는 사이트에서 모든 `<h1>` 태그를 찾아 그 텍스트를 출력하는 예시입니다.

```python
import requests
from bs4 import BeautifulSoup

url = "https://example.com"
response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")

h1s = soup.find_all("h1")
for h1 in h1s :
    print(h1.get_text())
```

참고로, `example.com` 사이트의 구조는 다음과 같습니다.

<img src="/assets/images/python-automation-script/1.jpg" alt="example.com" class="post-img">

따라서, 위 코드를 실행하게 되면 `Example Domain`이 출력됩니다.

# 파일 처리 자동화

파이썬을 이용하여 파일을 읽고 쓰는 작업을 자동화 할 수도 있습니다. 파이썬의 `os` 모듈을 사용하여 파일 및 디렉토리를 쉽게 관리할 수 있습니다. 다음은 특정 디렉토리 내의 모든 텍스트 파일을 읽고 내용을 출력하는 코드입니다.

```python
import os

directory = "/path/to/directory"

for filename in os.listdir(directory) :
    if filename.endswith(".txt") :
        with open(os.path.join(directory, filename), "r") as file :
            content = file.read()
            print(content)
```

# 엑셀 파일 자동화

엑셀 파일을 처리하는 작업은 `openpyxl` 라이브러리를 사용하여 자동화할 수 있습니다. 사용하기 전에 우선 `openpyxl` 패키지를 설치해줍니다.

```bash
pip install openpyxl
```

다음은 `example.xlsx` 파일의 2행부터 10행까지의 데이터를 출력하는 코드입니다.

```python
from openpyxl import load_workbook

workbook = load_workbook("example.xlsx")
sheet = workbook.active

for row in sheet.iter_rows(min_row=2, max_row=10, values_only=True) :
    print(row)
```

# 작업 스케쥴링

자동화 스크립트를 정기적으로 실행하기 위해서는 작업 스케쥴링이 필요합니다. 파이썬에서 제공하는 `schedule` 라이브러리를 사용하면 작업 스케쥴링 또한 간단하게 할 수 있습니다. 다음은 특정 함수를 매일 오전 10시에 실행하는 코드입니다.

```python
import schedule
import time

def job() :
    print("Scheduling job running...")

schedule.every().day.at("10:00").do(job)

while True :
    schedule.run_pending()
    time.sleep(1)
```

# 이메일 자동화

파이썬의 `smtplib` 모듈을 사용하면 이메일을 보내는 것 또한 자동화 할 수 있습니다. smtp 서버를 이용하기 때문에 smtp 서버가 없다면 무료로 제공되는 서버를 이용할 수도 있을 것입니다. 참고로, 구글에서도 무료 smtp 서버를 제공하니 필요하다면 확인해보시면 좋을 것 같습니다.

다음은 간단한 텍스트 이메일을 보내는 코드입니다.

```python
import smtplib
from email.mime.text import MIMEText

def send_email(subject, body, to_email) :
    from_email = "from_email@example.com"
    password = "password"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = from_email
    msg["To"] = to_email

    with smtplib.SMTP_SSL("smtp.example.com", 465) as server :
        server.login(from_email, password)
        server.sendmail(from_email, to_email, msg.as_string())

send_email("Test Subject", "This is a test email.", "to_email@example.com")
```

파이썬은 자동화 스크립트를 작성하기에 최적화된 언어입니다. 다양한 라이브러리와 간단한 문법 덕분에 초보자도 쉽게 자동화 작업을 시작할 수 있습니다. 위에서 소개한 예시들 이외에도 파이썬으로 자동화할 수 있는 작업은 무궁무진합니다. 자동화를 통해 일상 업무를 효율적으로 관리하고, 시간을 절약하고 생산성을 높일 수 있을 것입니다.
