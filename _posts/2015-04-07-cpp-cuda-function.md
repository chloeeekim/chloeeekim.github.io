---
layout: post
title: "[CUDA 5.5] cpp에서 CUDA 함수 사용하기"
author: chloeeekim
categories: [CUDA, Programming]
image: assets/images/cpp-cuda-function/title.png
featured: false
toc: false
---

이번 포스팅에서는 cpp에서 CUDA 함수를 사용하는 방법에 대하여 이야기해보겠습니다.

지금껏 `.cu` 파일만으로 프로젝트를 구성하게 되면 다음과 같은 구조로 나타납니다.

<img src="/assets/images/cpp-cuda-function/1.png" alt=".cu file project example" class="post-img">

main 함수에서는 kernel 함수로 `__global__` 함수를 호출하고, `__global__` 함수는 sub 함수로 `__device__` 함수를 호출하면서 프로그램이 진행됩니다. 즉, `.cu` 파일 내에서 main 함수가 있고, `__global__` 함수와 `__device__` 함수가 존재해 서로를 호출하는 데에 문제가 없었을 것입니다.

하지만 일반적인 프로그램의 경우 cpp(혹은 c)와 CUDA를 혼재해서 사용하게 되고, 그렇게 되면 `.cu` 파일에 있는 CUDA 함수들을 호출하는 데에 문제가 생깁니다. main 함수는 `.cpp` 파일에 있고, CUDA 함수는 `.cu` 파일에 있는 구조가 되기 때문에 그것을 정의해주지 않으면 인식하지 못하기 때문입니다.

cpp에서 CUDA 함수를 사용하게 되는 과정을 간단히 구조화하면 다음과 같습니다.

<img src="/assets/images/cpp-cuda-function/2.png" alt=".cpp and .cu file project example" class="post-img">

main 함수는 `.cpp` 파일에 있고, 다른 cpp 함수들도 호출하면서 프로그램이 진행됩니다. 그러다 CUDA 함수를 사용할 경우가 생기면 `.cu` 파일 내에 정의된 `__host__` function을 호출하는 방식으로 CUDA 함수를 사용합니다. `__host__` 함수는 필요한 CUDA 함수를 진행하여 결과를 얻어 main 함수, 혹은 cpp 함수로 전달해주는 역할을 합니다.

여기서 중요한 점은 `__host__` function과 main 함수는 다르다는 점입니다. main 함수는 `__host__` 함수라고 할 수 있지만, 모든 `__host__` 함수가 main 함수는 아닙니다.

`__host__` 함수에 `extern "C"`라고 표시가 되어 있는데, 이것이 바로 cpp에서 CUDA 함수를 호출할 수 있게 해 주는 문법입니다. 사용하는 방법은 다음과 같습니다.

우선 cpp 파일에 이러이러한 CUDA 함수를 사용할 것이라고 정의하여 줍니다. 일반적으로 header file에 정의하게 되지만, 프로젝트의 사이즈가 크지 않다면 CUDA 함수를 호출하는 부분이 있는 파일에 정의해주면 됩니다.

```cpp
extern "C" void cuda_function(int a, int b, ...);
```

일반적으로 함수를 정의할 때처럼 정의해주면 되지만, 중요한 점은 앞에 `extern "C"` 를 붙여야 한다는 것입니다. 이렇게 정의한 함수를 `.cu` 파일에서 `__host__` 함수로 작성하면 됩니다.

```cpp
__global__ void global_function(int a, int b, ...) {
    ...
}

extern "C" void cuda_function(int a, int b, ...) {
    ...
    global_function<<<blockDim, threadDim>>(a, b, ...);
    checkCudaErrors(cudaThreadSynchronize());
    ...
}
```

위 코드는 `.cu` 파일에 작성되는 코드입니다. `extern "C"`를 붙인 `__host__` 함수는 결국 cpp와 CUDA 함수들을 연결해주는 연결다리 역할을 한다고 볼 수 있습니다.

실제로 사용하는 예는 다음과 같습니다. 제 프로젝트에서 작성한 코드 일부입니다.

```cpp
//kernel Functions
//glInputOutput_kernel.cu
extern "C" void setupTexture(int iv, int ih, Pixel *data, int bpp, int num);
extern "C" void deleteTexture(int num);
extern "C" void deleteAllTextures();
extern "C" void displayMod(Pixel *data, Pixel *bgData, Pixel *curData, Pixel *diffData, int v, int h, enum showBoxMode mode);

// diffImage.cu
extern "C" double diffImage(Pixel *bgData, Pixel *curData, Pixel *diffData, unsigned int width, unsigned int height, unsigned int size);

// bilateralFilter.cu
extern "C" void initTexture(int width, int height, Pixel *image);
extern "C" void freeTexture();
extern "C" void updateGaussian(float delta, int radius);
extern "C" double initBilateralFilterCUDA(float delta, int radius, int width, int height, Pixel *pixels);
extern "C" double bilateralFilter(Pixel *pixels, int width, int height, float e_d, int radius, int iterations);
```

```cpp
__global__ void imageSubtractionGlobal(Pixel *bgData, Pixel *curData, Pixel *diffData, int x) {
    int i = blockDim.x * blockIdx.x + threadIdx.x;
    diffData[i] = MIN(MAX((bgData[i] - curData[i]), 0.f), 255.f);
}

extern "C" void diffImage(Pixel *bgData, Pixel *curData, Pixel *diffData, unsigned int width, unsigned int height, unsigned int size) {
    imageSubtractionGlobal<<<512, 512>>>(bgData, curData, diffData, width);
    checkCudaErrors(cudaThreadSynchronize());
}
```
