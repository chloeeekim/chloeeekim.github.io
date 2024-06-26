---
layout: post
title: "[CUDA 7] GPU 실행시간 측정 - cudaEvent"
author: chloeeekim
categories: [CUDA, Programming]
image: assets/images/cudaEvent/title.png
featured: false
toc: false
---

GPU에서 실행 시간을 측정할 수 있는 방법은 StopWatchInterface를 사용하는 등 여러 가지가 있지만, NVIDIA에서 공식적으로 제공하는 Programming Guide에서 확인할 수 있는 내용인 cudaEvent를 소개하고자 합니다.

사용하는 방법은 다음과 같습니다.

```cpp
// cudaEvent create
cudaEvent_t start, stop;
cudaEventCreate(&start);
cudaEventCreate(&stop);

. . .

cudaEventRecord(start, 0);

// 실행 시간을 측정할 GPU 코드

cudaEventRecord(stop, 0);
cudaEventSynchronize(stop);
float elapsedTime;
cudaEventElapsedTime(&elapsedTime, start, stop);

. . .

// cudaEvent destroy
cudaEventDestroy(start);
cudaEventDestroy(stop);
```

우선 두 개의 cudaEvent 변수를 생성해주어야 합니다. cudaEvent는 record하는 순간의 timestamp를 저장하는 형식이기 때문에 2개가 필요합니다. 이후 cudaEventRecord() 함수를 이용하여 시작하는 순간과 끝나는 순간의 timestamp를 저장하면 됩니다. 시간은 cudaEventElapsedTime() 함수를 이용하여 받아오는데, 기본적으로 float 형을 사용합니다. 마지막으로 cudaEventDestroy() 함수를 이용하여 cudaEvent를 destroy 해주면 마무리됩니다.
