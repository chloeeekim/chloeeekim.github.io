---
layout: post
title:  "[CUDA 5.0] CUDA 예제 실행하기"
author: chloeeekim
categories: [ CUDA, Programming ]
image: assets/images/cuda-samples/title.png
featured: false
toc: false
---

<div style="text-align: center; color: red;">
※ 이 글은 2013년도에 작성된 글입니다. <br>사진이나 세부적인 내용은 지금과 다를 수 있습니다.<br><br>
</div>

CUDA 5.0을 설치하고, 리부팅을 하고 나면 NVIDIA CUDA Samples Browser v5.0 아이콘이 생겼을 것입니다.

이름만으로도 어떤 프로그램인지 감이 오시나요? CUDA 5.0부터는 Installer에 samples 또한 포함이 되어 있다고 저번 포스팅에서 언급하였습니다. 이 프로그램이 바로 설치와 같이 다운 받은 예제 파일들을 찾아보고, 실행해 볼 수 있는 프로그램입니다. 한 번 실행해 봅시다.

<img src="/assets/images/cuda-samples/1.jpg" alt="CUDA Samples Browser v5.0" class="post-img">

실행하면 보이는 바와 같이 다양한 샘플들을 찾아볼 수 있고, 실행시켜 볼 수도 있습니다. 이 샘플들을 실행시켰을 때, 아무 무리 없이 잘 돌아가면 설치가 제대로 되었다는 뜻입니다. 만약 실행이 되지 않는다면, 컴퓨터에 설치되어 있는 GPU가 CUDA 가속을 지원하는지를 확인하고, 또 NVIDIA 그래픽 드라이버가 최신 버전인지를 확인해 주세요.

이 중 CUDA N-Body Simulation을 실행시켜 봅시다. N-Body가 무엇인지 몰라도 어떤 프로그램인지는 그래픽으로 시뮬레이션해주기 때문에 알아보기 쉽습니다. 실행하는 방법은 오른쪽 편에 작은 글씨로 된 Run을 누르면 됩니다.

실행하면 다음과 같은 창 하나가 뜹니다. 이 창에서는 프로그램에 대한 간단한 설명 등과 함께 맨 아래쪽에 보면 어떤 device를 사용하고 있는지에 대한 정보도 같이 볼 수 있습니다. simulation을 위해 하나의 device를 사용하였고, 그 device는 GeForce 310M이라는 정보가 뜹니다. 이 정보는 각자 사용하는 GPU에 따라 다르게 나타날 것입니다.

<img src="/assets/images/cuda-samples/2.jpg" alt="CUDA N-Body Simulation" class="post-img">

그리고 하나 더 뜨는 창에서는 다음과 같이 N-Body Simulation이 이루어집니다. 현재 시뮬레이션 되고 있는 상태에 대해서는 화면 위쪽에 나타나게 되고, 화면 전체에 N-Body Simulation이 약간의 끊김이 있기는 하지만 빠르고 매끄럽게 진행되는 것을 확인할 수 있습니다. 심지어 310M이라는 낮은 사양의 GPU에서도 말이죠.

<img src="/assets/images/cuda-samples/3.jpg" alt="CUDA N-Body Simulation" class="post-img">

NVIDA CUDA Samples Browser에서는 이러한 N-Body Simulation 이외에도 다양한 예제들을 실행시켜 볼 수 있습니다.

그리고 이러한 예제들의 코드 역시 같이 다운받아져 있는데, 이 코드들은 C:\ProgramData\NVIDIA Corporation\CUDA Samples\v5.0 폴더에 잘 정리되어 있습니다. ProgramData 폴더는 숨겨져 있는 폴더이므로 C 드라이브에 들어갔는데 폴더가 없다고 당황하지 않으셔도 됩니다. 위 주소로 들어가보면 다음과 같이 잘 정리된 CUDA 예제들의 코드를 확인하고, 직접 실행시켜 볼 수 있습니다.

<img src="/assets/images/cuda-samples/4.jpg" alt="CUDA Samples" class="post-img">

아까 위에서 실행시켜 보았던 N-Body Simulation은 5_Simulation 폴더에 nbody라는 이름으로 들어가 있습니다. VS에서 실행시켜 보면 앞서 실행시켰던 것과 같은 결과가 나오는 것을 확인할 수 있습니다.

예제 파일들은 간단한 것부터 복잡하고 어려운 계산이나 그래픽을 요하는 것까지 다양하게 제공되므로, 예제 파일을 분석하며 공부하는 것도 많은 도움이 될 것입니다. CUDA를 공부하면 C/C++로 이미 만들어져 있는 프로그램을 포팅하는 것을 주로 하게 되고, 어떻게 최적화를 하느냐에 따라 같은 내용을 실행시키더라도 성능이 확연하게 달라질 수 있습니다. 따라서 이미 잘 짜여져 있는 성능 좋은 코드를 많이 보는 것이 공부에 도움이 될 것입니다.

CUDA Project는 C/C++ Project를 그대로 이용해도 상관 없으나, VS에서는 CUDA를 설치하면 다음과 같이 CUDA 5.0 Runtime Project를 바로 생성할 수 있도록 해 줍니다.

<img src="/assets/images/cuda-samples/5.jpg" alt="CUDA 5.0 Runtime Project" class="post-img">

CUDA 5.0 Rumtime Project를 생성하면 따로 무언가를 설정할 필요 없이 바로 컴파일이나 빌드를 할 수 있도록 되어 있습니다. 생성하면 kernel.cu라는 소스 파일 하나가 공통적으로 들어가 있는데요. 여기에는 1차원 array를 더하는 내용의 코드가 포함되어 있습니다. 무척 간단한 코드로 실행시켜 보면 다음과 같은 결과가 출력됩니다.

<img src="/assets/images/cuda-samples/6.jpg" alt="CUDA Sample Project" class="post-img">

이것으로 CUDA 예제를 가능한 모든 방법을 동원하여 실행하여 보았습니다. CUDA는 아직 한글로 번역된 책이 많이 없기 때문에 이미 만들어져 있는 예제들을 보면서 실행시켜 보고, 스스로 분석하고, 다른 코드를 CUDA로 포팅해보는 연습을 하다 보면 실력이 많이 느는 것을 확인할 수 있을 것입니다.

자, 이렇게 CUDA 5.0을 사용하여 코딩할 준비가 모두 끝났습니다. 다음 포스팅에서는 위 화면에 보이는 바와 같이 CUDA Syntax Highlighting 하는 방법에 대해서 이야기하도록 하겠습니다.
