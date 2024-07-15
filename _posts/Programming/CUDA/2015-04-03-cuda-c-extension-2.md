---
layout: post
title: "[CUDA 5.0] CUDA C 확장 키워드 (CUDA C Extension) - 변수의 수식어"
author: chloeeekim
categories: [CUDA, Programming]
image: assets/images/cuda-c-extension-2/title.png
featured: false
toc: true
---

<div style="text-align: center; color: red;">
※ 이 글은 2013년도에 작성된 글입니다. <br>사진이나 세부적인 내용은 지금과 다를 수 있습니다.<br><br>
</div>

저번 포스팅에 이어 CUDA C extension에 관한 설명을 마무리 짓도록 하겠습니다.

# 변수의 수식어

변수의 수식어들은 메모리 영역에 따라서 구분되어 집니다. 즉, 변수가 위치하는 메모리의 위치가 어디냐에 따라 `__device__`, `__constant__`, `__shared__` 세 가지로 나뉘어집니다. 메모리에 대해서는 이후 포스팅에서 따로 자세히 설명하도록 하고, 이번 포스팅에서는 간단하게만 언급하도록 하겠습니다.

## `__device__`

함수의 수식어인 `__device__`와는 다르므로 꼭 구분해 주셔야 합니다. `__device__` 변수는 글로벌 메모리 영역에 할당되어 프로그램이 종료될 때까지 유효하게 됩니다. `__device__` 변수에는 모든 thread가 접근할 수 있고, host에서는 API 함수를 통해 읽기와 쓰기가 가능합니다.

```cpp
#include "cuda_runtime.h"
#include "device_launch_parameters.h"
#include <stdio.h>

__device__ int d_sum;

__global__ void add(int a, int b) {
    d_sum = a + b;
}

__host__ int main() {
    int h_sum = 0;

    cudaMemset(&d_sum, 0, sizeof(int));

    add<<<1, 1>>>(2, 7);

    cudaMemcpyFromSymbol(&h_sum, d_sum, sizeof(int), 0, cudaMemcpyDeviceToHost);

    printf("2 + 7 = %d\n", h_sum);

    return 0;
}
```

`__device__` 변수는 위와 같이 `cudaMemcpyFromSymbol`이라는 함수를 통해 host 메모리에 불러올 수 있습니다. 여기서 주의하실 점은 CUDA 5.0부터 바뀐 점으로, 이전 버전들과는 symbol을 다른 방식으로 사용하여야 한다는 점입니다.

```cpp
    cudaMemcpyFromSymbol(&h_sum, "d_sum", sizeof(int), 0, cudaMemcpyDeviceToHost);
```

이전 방식으로 `cudaMemcpyFromSymbol` 함수를 호출하면 위와 같이 호출하여야 합니다. 즉, 이전 버전들에서는 symbol을 character string으로 사용하였다면, CUDA 5.0부터는 symbol을 direct로 사용할 수 있도록 바뀌었습니다. 대신 이전 버전들과 같은 방법으로는 사용할 수 없습니다.

하지만 CUDA 5.0에서도 symbol을 direct로 사용하였을 때, 빨간 밑줄이 그어지며 다음과 같은 error가 발생합니다만, 실제로 실행시켰을 때는 아무런 문제가 없습니다. 추후에 업데이트 되면서 사라질 문제가 될 것 같습니다.

<img src="/assets/images/cuda-c-extension-2/1.jpg" alt="Error occuring when used it directly" class="post-img">

## `__constant__`

`__constant__` 변수는 그 이름에서도 알 수 있듯이 상수 메모리, 즉 constant memory 영역에 할당되어 프로그램이 종료될 때까지 유효한 변수입니다. 모든 thread에서 접근이 가능하지만, `__device__` 변수와는 다르게 `__constant__` 변수는 읽기만 가능합니다. 대신 host에서 cudaMemcpyToSymbol 함수를 통해 값을 쓸 수 있도록 되어 있습니다.

```cpp
#include "cuda_runtime.h"
#include "device_launch_parameters.h"
#include <stdio.h>

__constant__ int d_sum = 0;

int main() {
    int h_sum1 = 9;
    int h_sum2 = 0;

    cudaMemcpyToSymbol(d_sum, &h_sum1, sizeof(int), 0, cudaMemcpyHostToDevice);
    cudaMemcpyFromSymbol(&h_sum2, d_sum, sizeof(int), 0, cudaMemcpyDeviceToHost);

    printf("h_sum2 = %d\n", h_sum2);

    return 0;
}
```

여기서도 주의하셔야 할 점은 CUDA 5.0부터 cudaMemcpyToSymbol의 쓰임 역시 바뀌었다는 점입니다. 위에서 `__device__` 변수를 설명하면서 언급하였던 cudaMemcpyFromSymbol 함수와 마찬가지로 symbol을 direct로 사용하도록 바뀌었습니다. 이전 버전들에서는 다음과 같이 사용하였지만, CUDA 5.0부터는 아래 방식을 사용할 수 없습니다.

```cpp
    cudaMemcpyToSymbol("d_sum", &h_sum1, sizeof(int), 0, cudaMemcpyHostToDevice);
```

즉, 위와 같이 symbol을 character string으로 사용할 수 없습니다.

## `__shared__`

`__shared__` 변수 역시 그 이름에서 알 수 잇듯 공유 메모리 영역에 할당됩니다. 다만 다른 변수들과는 달리 실행 중인 thread block 상에서만 유효하다는 것이 특징입니다. `__device__` 변수나 `__constant__` 변수가 프로그램이 종료될 때까지 유효한 것과는 다릅니다. 또, `__shared__` 변수는 block 내의 thread는 접근하여 읽고 쓰는 것이 가능하도록 되어 있습니다.

```cpp
#include "cuda_runtime.h"
#include "device_launch_parameters.h"
#include <stdio.h>

__global__ void add(int a, int b, int *c) {
    __shared__ int sum;
    sum = a + b;
    *c = sum;
}

int main() {
    int c;
    int *dev_c;

    cudaMalloc((void**)&dev_c, sizeof(int));
    add<<<1, 1>>>(2, 7, dev_c);

    cudaMemcpy(&c, dev_c, sizeof(int), cudaMemcpyDeviceToHost);

    printf("2 + 7 = %d\n", c);

    cudaFree(dev_c);

    return 0;
}
```

위는 `__shared__` 변수를 사용한 예시입니다. 예시에서는 단순하게 하나의 block에 하나의 thread만이 실행되는 코드이지만, 많은 thread가 실행되는 코드라면 `__shared__` 변수를 유용하게 사용할 수 있을 것입니다.

이것으로 CUDA C Extension에 대한 설명을 끝내도록 하겠습니다. 메모리에 대한 상세한 설명이나 CUDA의 다른 부분에 대해서는 이후 포스팅에서 더욱 자세히 다뤄보겠습니다.
