---
layout: post
title:  "[CUDA 5.0] CUDA Syntax Highlighting 설정하기"
author: chloeeekim
categories: [ CUDA, Programming ]
image: assets/images/cuda-syntax-highlighting/title.png
featured: false
toc: false
---

<div style="text-align: center; color: red;">
※ 이 글은 2013년도에 작성된 글입니다. <br>사진이나 세부적인 내용은 지금과 다를 수 있습니다.<br><br>
</div>

VS에서 CUDA 코드를 작성하면 CUDA Syntax Highlighting은 물론이고 기본적인 C/C++ 문법마저도 Syntax Highlighting이 되지 않아 코드를 작성하기 무척이나 번거롭고 힘들었을 것입니다. 따라서, 이번 포스팅에서는 CUDA Syntax Highlighting 방법에 대해 소개하려 합니다. 이전 버전들과는 방법이 다르기 때문에, 다른 버전을 사용 중이라면 적용되지 않을 수도 있다는 점을 염두에 두시길 바랍니다.

우선 VS를 켜고, 상단 메뉴 바에서 도구 -> 옵션으로 들어갑니다. 창이 하나 나타나는데, 여기서 프로젝트 및 솔루션 -> VC++ 프로젝트 설정으로 들어가면 아래의 창 같은 화면이 뜹니다. 이 중 포함할 확장명에 `.cu; cuh;`를 추가합니다. 확장자명끼리의 구분은 ;로 구분하게 됩니다. `.cu` 파일은 CUDA source file이고, `.cuh` 파일은 CUDA header file입니다.

<img src="/assets/images/cuda-syntax-highlighting/1.jpg" alt="CUDA Syntax Highlighting Setting" class="post-img">

확장명에 추가했으면 이제 .cu와 .cuh를 C++ 편집 환경으로 설정해 줄 차례입니다. 옵션 창에서 텍스트 편집기 -> 파일 확장명으로 들어가면, 아래와 같은 창이 나타납니다. 여기에 확장명 .cu, 편집기 Microsoft Visual C++을 선택하고 적용하면 됩니다. .cuh도 마찬가지 방법으로 적용해 줍니다.

<img src="/assets/images/cuda-syntax-highlighting/2.jpg" alt="CUDA Syntax Highlighting Setting" class="post-img">

이제 C:\ProgramData\NVIDIA Corporation\CUDA Samples\v5.0\doc\syntax_highlighting\visual_studio_8 폴더로 들어가보면 `usertype.dat` 파일이 있을 것입니다. 이 파일을 C:\Program Files\Microsoft Visual Studio 10.0\Common7\IDE 폴더에 복사해 넣으면 됩니다. 주소는 32bit 기준이므로, 64bit라면 Program Files (x86) 폴더에서 찾아 복사해 넣도록 합니다.

<img src="/assets/images/cuda-syntax-highlighting/3.jpg" alt="usertype.dat file" class="post-img">

이것으로 CUDA Syntax Highlighting 준비가 모두 끝났습니다. VS를 다시 시작하거나 아니면 프로젝트를 다시 열면 문법에 맞는 색깔로 설정된 C/C++ 코드를 볼 수 있을 것입니다. 참고로, CUDA Syntax Highlighting을 위해서는 아래의 두 줄을 추가로 입력해 주어야지만 정상적으로 표현이 됩니다.

```cpp
#include "cuda_runtime.h"
#include "device_launch_parameters.h"
```

이 두 줄은 모두 CUDA Project를 생성하면 만들어지는 kernel.cu에 포함되어 있습니다.

<img src="/assets/images/cuda-syntax-highlighting/4.jpg" alt="CUDA Syntax Highlighting result" class="post-img">

위는 정상적으로 CUDA Syntax Highlighting이 적용된 코드입니다. `__global__`이나 `threadIdx`와 같은 CUDA 문법들에도 highlighting이 적용된 것을 확인할 수 있습니다. 참고로 위 화면에서는 다른 테마가 적용되어 있으므로, 실제로 highlighting을 적용했을 때 다르게 보일 수 있습니다.
