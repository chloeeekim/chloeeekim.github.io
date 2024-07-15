---
layout: post
title: "[CUDA 5.0] CUDA C 확장 키워드 (CUDA C Extension) - 함수의 수식어"
author: chloeeekim
categories: [CUDA, Programming]
image: assets/images/cuda-c-extension-1/title.png
featured: false
toc: true
---

<div style="text-align: center; color: red;">
※ 이 글은 2013년도에 작성된 글입니다. <br>사진이나 세부적인 내용은 지금과 다를 수 있습니다.<br><br>
</div>

이번 포스팅에서는 CUDA C Extension, 즉 CUDA에서 확장된 키워드들에 대하여 소개하고자 합니다. 예제 코드를 보면 `__global__`과 같은 키워드들을 쉽게 발견할 수 있을 것입니다. 이러한 키워드들이 어떤 의미이며 무슨 역할을 하는지 알아야 보다 효율적인 프로그래밍이 가능할 것입니다.

# 함수의 수식어

함수의 수식어들은 어디서 호출할 수 있느냐와 어디서 실행되느냐에 따라 나뉩니다. `__global__`, `__device__`, `__host__`, `__device__ __host__` 이렇게 총 4가지의 경우가 가능합니다.

## `__global__`

디바이스에서 실행되는 함수를 뜻합니다. 여기서 device란 이전 포스팅에서도 언급 했듯이 GPU를 뜻합니다. `__global__`로 수식된 함수는 host에서 호출할 수는 있어도 device에서 호출할 수는 없습니다. 대신 device로 실행하는 커널 함수 지정에 사용할 수 있습니다.

다음은 `__global__`로 수식한 함수의 간단한 예입니다.

```cpp
#include "cuda_runtime.h"
#include "device_launch_parameters.h"
#include <stdio .h>;

__global__ void add(int a, int b, int *c) {
    *c = a + b;
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

위와 같이 return type은 항상 void 형이어야 하며, 다른 return type은 가질 수 없습니다. 이것은 조금만 생각해보면 쉽게 그 이유를 알 수 있습니다. 지금의 예에서는 하나의 커널 함수만이 실행되었지만, 실제로는 수천, 수만 개의 커널 함수가 한꺼번에 실행될 것입니다. 만약 `__global__` 함수의 리턴 타입이 void가 아니라면 수천, 수만 개의 커널 함수에서 제각각 return 값을 host로 넘겨주게 될 것입니다. 그러한 문제를 막기 위해 아예 void 형이 아닌 다른 return type을 가질 수 없도록 한 것입니다.

또, 함수의 호출 시에 `<<< block의 개수, thread의 개수 >>>`의 형식으로 block과 thread의 개수를 지정해 줄 수 있습니다. `__global__` 함수는 device에서 실행되는 함수이지만 device에서는 호출할 수 없습니다. 즉, 재귀호출이 불가능합니다. 이것 또한 이 함수가 수만 개가 한꺼번에 실행되는 커널 함수라는 것을 생각해보면 그 이유를 쉽게 알 수 있습니다.

또한 함수 내에 static 변수를 가질 수 없으며, 가변형 인수를 가질 수 없는 등의 제약 사항이 존재합니다. 가변형 인수를 가질 수 없다는 것은 다음과 같은 식으로 함수를 호출하는 코드는 불가능하다는 것을 뜻합니다.

```cpp
    add<<<1, 1>>>(int a, int b, dev_c);
```

또한 `__global__ __host__`와 같은 용법으로 쓰일 수 없고, 공유 메모리를 이용하며 256 바이트까지의 인수를 사용할 수 있습니다.

## `__device__`

위의 `__global__`과 마찬가지로 device에서 실행되는 함수를 뜻합니다. 하지만 `__global__`과는 다르게 host에서 호출이 불가능하고, device에서만 호출이 가능합니다. 즉, `__global__` 함수가 실행되었을 때 device 내에서 실행되는 서브 함수로 사용됩니다. device에서 실행되고 device에서 호출되기 때문에 재귀 호출이 가능하지 않느냐고 생각할 수도 있지만 마찬가지로 재귀호출은 할 수 없습니다.

```cpp
__device__ int subAdd(int a, int b) {
    return a + b;
}

__global__ void add(int a, int b, int *c) {
    *c = subAdd(a, b);
}
```

`__global__`에서 예시로 들었던 add 함수의 코드를 조금만 바꾼 `__device__` 함수의 예시입니다. 실행시켜 보면 똑같은 결과값이 나오는 것을 알 수 있습니다. `__global__` 함수는 device 내에서 실행되는 함수이기 때문에 `__device__` 함수를 호출할 수 있습니다. 하지만 host에서는 호출할 수 없기 때문에 다음과 같은 호출은 불가능합니다.

```cpp
#include "cuda_runtime.h"
#include "device_launch_parameters.h"
#include <stdio.h>

__device__ int subAdd(int a, int b) {
    return a + b;
}

int main() {
    int c;
    c = subAdd(2, 7);

    print("2 + 7 = %d\n", c);

    return 0;
}
```

위 코드를 실행시키면 다음과 같은 에러가 발생합니다.

```
error : calling a __device__ function("subAdd") from a __host__ function("main") is not allowed
```

즉, `__host__` 함수인 main 함수에서 `__device__` 함수인 subAdd 함수를 호출할 수 없다는 것입니다.

추가적으로, `__device__` 함수 역시 `__global__` 함수와 마찬가지로 static 변수를 함수 내에 가질 수 없고, 가변형 인수를 가질 수 없습니다.

## `__host__`

`__host__` 함수는 위에서 언급했던 `__global__`이나 `__device__` 함수와는 실행되는 위치부터가 다릅니다. host에서 실행되며, host에서만 호출할 수 있고, device에서는 호출할 수 없습니다. main 함수가 그 대표적인 예입니다. main 함수를 통해서 알 수 있드시, `__global__`, `__device__`, `__host__` 등의 키워드가 지정되지 않은 경우에는 `__host__`를 지정한 것과 동일한 효과를 지닙니다.

```cpp
#include "cuda_runtime.h"
#include "device_launch_parameters.h"
#include <stdio.h>;

__device__ int subAdd(int a, int b) {
    return a + b;
}

__global__ void add(int a, int b, int *c) {
    *c = subAdd(a, b);
}

__host__ int main() {
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

위의 코드처럼 main 함수를 `__host__`로 지정해주어도 아무런 문제 없이 잘 실행이 됩니다. 이는 main 함수가 `__host__` 함수이기 때문이며, 어떤 함수인지 지정해주지 않았을 때는 default로 `__host__`로 지정되기 때문입니다.

`__host__` 수식어는 `__global__` 수식어와 동시에 사용할 수는 없지만, `__device__` 수식어와는 함께 사용할 수 있습니다. 바로 `__device__ __host__`와 같은 방법으로 사용하는 것인데요. 이에 대해서는 아래에서 따로 설명하도록 하겠습니다.

## `__device__ __host__`

`__host__` 수식어와 `__device__` 수식어를 동시에 사용한 경우입니다. 이 경우 host와 device 양쪽에서 모두 사용할 수 있는 함수로 작성할 수 있습니다.

```cpp
#include "cuda_runtime.h"
#include "device_launch_parameters.h"
#include <stdio.h>;

__device__ __host__ int subAdd(int a, int b) {
    return a + b;
}

int main() {
    int c;

    c = subAdd(2, 7);

    printf("2 + 7 = %d\n", c);

    return 0;
}
```

위 코드를 실행시키면 역시나 아무런 문제 없이 잘 동작합니다. 이는 subAdd 함수가 host와 device 모두에서 사용할 수 있는 함수이기 때문입니다. 이러한 수식어를 사용하는 것이 무척이나 편리한 경우가 가끔 생기는데, host와 device 모두에서 호출하는 간단한 계산 같은 것을 `__device__ __host__` 함수로 지정하여 사용하는 경우가 있습니다. 같은 내용의 함수를 device 용, host 용으로 두 개나 만들지 않고, 하나의 함수로 해결하는 것입니다. 그 때문에 device와 host 모두에서 사용가능한 함수가 필요했고, 이 함수는 host와 device 각각 호출이 가능하며, 호출된 곳(host라면 host, device라면 device)에서 실행될 필요가 있었습니다. 따라서 `__global__` 키워드는 제외되고, `__device__ __host__`와 같은 형식으로 device와 host 모두에서 사용 가능하도록 만들어진 것입니다.

포스팅의 내용이 길어서 CUDA C 확장 키워드에 대해서 다음 포스팅에서 이어서 설명하도록 하겠습니다. 다음 포스팅에서는 변수의 수식어에 대해 이야기하도록 하겠습니다.
