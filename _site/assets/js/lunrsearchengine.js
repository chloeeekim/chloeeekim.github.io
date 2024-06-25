
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 2,
    "url": "http://localhost:4000/",
    "title": "Home",
    "body": "      Featured:                                                                                                                                                                                                                 [CUDA 5. 0] CUDA Syntax Highlighting 설정하기                              :               ※ 이 글은 2013년도에 작성된 글입니다. 사진이나 세부적인 내용은 지금과 다를 수 있습니다. :                                                                                                                                                                         Chloe Jungah Kim                                    01 Apr 2015                                                                                                                                                                                                                                                                                  [CUDA 5. 0] CUDA 예제 실행하기                              :               ※ 이 글은 2013년도에 작성된 글입니다. 사진이나 세부적인 내용은 지금과 다를 수 있습니다. :                                                                                                                                                                         Chloe Jungah Kim                                    31 Mar 2015                                                                                                                                                                                                                                                                                  [CUDA 5. 0] CUDA 설치하기                              :               ※ 이 글은 2013년도에 작성된 글입니다. 사진이나 세부적인 내용은 지금과 다를 수 있습니다. :                                                                                                                                                                         Chloe Jungah Kim                                    30 Mar 2015                                                                                      All Stories:                                                                                                     [CUDA 5. 0] CUDA syntax를 이용하여 device 정보 불러오기              :       ※ 이 글은 2013년도에 작성된 글입니다. 사진이나 세부적인 내용은 지금과 다를 수 있습니다. :                                                                               Chloe Jungah Kim                02 Apr 2015                                                                                                                    [CUDA 5. 0] CUDA Syntax Highlighting 설정하기              :       ※ 이 글은 2013년도에 작성된 글입니다. 사진이나 세부적인 내용은 지금과 다를 수 있습니다. :                                                                               Chloe Jungah Kim                01 Apr 2015                                                                                                                    [CUDA 5. 0] CUDA 예제 실행하기              :       ※ 이 글은 2013년도에 작성된 글입니다. 사진이나 세부적인 내용은 지금과 다를 수 있습니다. :                                                                               Chloe Jungah Kim                31 Mar 2015                                                                                                                    [CUDA 5. 0] CUDA 설치하기              :       ※ 이 글은 2013년도에 작성된 글입니다. 사진이나 세부적인 내용은 지금과 다를 수 있습니다. :                                                                               Chloe Jungah Kim                30 Mar 2015                            "
    }, {
    "id": 3,
    "url": "http://localhost:4000/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 4,
    "url": "http://localhost:4000/cuda-syntax-device/",
    "title": "[CUDA 5.0] CUDA syntax를 이용하여 device 정보 불러오기",
    "body": "2015/04/02 - ※ 이 글은 2013년도에 작성된 글입니다. 사진이나 세부적인 내용은 지금과 다를 수 있습니다. 본격적인 CUDA 코딩에 앞서 CUDA syntax를 이용하여 device의 정보를 불러오는 방법에 대해 소개하려고 합니다. 여기서 말하는 device란 CUDA acceleration(CUDA 가속)을 지원하는 GPU를 뜻합니다. 아래의 코드는 CUDA syntax를 이용하여 device의 정보를 불러와 출력하는 내용입니다. 123456789101112131415161718192021222324252627#include  cuda_runtime. h #include  device_launch_parameters. h #include &lt;stdio. h&gt;int main() {  int i;  cudaDeviceProp prop;  int count;  cudaGetDeviceCount(&amp;count);  for (i = 0 ; i &lt; count ; i++) {    cudaGetDeviceProperties(&amp;prop, i);    printf( -- %d번째 디바이스 --\n , i+1);    printf(  (1) 장치 이름 : %s\n , prop. name);    printf(  (2) Clock Rate : %d\n , prop. clockRate);    printf(  (3) 전역 메모리 용량 : %ld\n , prop. totalGlobalMem);    printf(  (4) 상수 메모리 용량 : %ld\n , prop. totalConstMem);    printf(  (5) Register per block : %d\n , prop. regsPerBlock);    printf(  (6) Max Grid Size : %d\n , prop. maxGridSize);    printf(  (7) Max Thread Dimension : %d\n , prop. maxThreadsDim);    printf(  (8) Max Thread per block : %d\n , prop. maxThreadsPerBlock);  }  return 0;}CUDA는 cudaDeviceProp이라는 구조체 형식에 device들의 정보를 저장하게 됩니다. 이를 이용하면 device의 다양한 정보를 불러올 수 있습니다. 아래는 위 코드를 실행시킨 결과입니다.  출력된 결과를 살펴보면, GeForce GT 750M이라는 하나의 device를 사용 중이며, clock rate나 메모리 용량이 얼마인지 알 수 있습니다. cudaDeviceProp은 이외에도 다양한 정보를 제공합니다. 이러한 데이터를 잘 활용하면 효과적인 CUDA 코딩을 할 수 있을 것입니다. 그러면 위 코드를 자세히 살펴봅시다. 1  cudaDeviceProp prop;Device property의 출력을 위해 구조체를 생성한 것입니다. 위에서 잠깐 언급했듯이 CUDA는 device의 정보를 구조체 형식에 저장합니다. cudaDeviceProp 구조체는 driver_types. h 파일에 선언되어 있으며, 이러한 header file들은 CUDA project를 생성하면 외부 종속성 폴더에 추가되도록 되어 있습니다. 아래는 cudaDeviceProp 구조체의 선언 부분입니다. 1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859/** * CUDA device properties */struct __device_builtin__ cudaDeviceProp{  char  name[256];         /**&lt; ASCII string identifying device */  size_t totalGlobalMem;       /**&lt; Global memory available on device in bytes */  size_t sharedMemPerBlock;     /**&lt; Shared memory available per block in bytes */  int  regsPerBlock;        /**&lt; 32-bit registers available per block */  int  warpSize;          /**&lt; Warp size in threads */  size_t memPitch;          /**&lt; Maximum pitch in bytes allowed by memory copies */  int  maxThreadsPerBlock;     /**&lt; Maximum number of threads per block */  int  maxThreadsDim[3];      /**&lt; Maximum size of each dimension of a block */  int  maxGridSize[3];       /**&lt; Maximum size of each dimension of a grid */  int  clockRate;         /**&lt; Clock frequency in kilohertz */  size_t totalConstMem;       /**&lt; Constant memory available on device in bytes */  int  major;           /**&lt; Major compute capability */  int  minor;           /**&lt; Minor compute capability */  size_t textureAlignment;      /**&lt; Alignment requirement for textures */  size_t texturePitchAlignment;   /**&lt; Pitch alignment requirement for texture references bound to pitched memory */  int  deviceOverlap;       /**&lt; Device can concurrently copy memory and execute a kernel. Deprecated. Use instead asyncEngineCount. */  int  multiProcessorCount;    /**&lt; Number of multiprocessors on device */  int  kernelExecTimeoutEnabled;  /**&lt; Specified whether there is a run time limit on kernels */  int  integrated;         /**&lt; Device is integrated as opposed to discrete */  int  canMapHostMemory;      /**&lt; Device can map host memory with cudaHostAlloc/cudaHostGetDevicePointer */  int  computeMode;        /**&lt; Compute mode (See ::cudaComputeMode) */  int  maxTexture1D;        /**&lt; Maximum 1D texture size */  int  maxTexture1DMipmap;     /**&lt; Maximum 1D mipmapped texture size */  int  maxTexture1DLinear;     /**&lt; Maximum size for 1D textures bound to linear memory */  int  maxTexture2D[2];      /**&lt; Maximum 2D texture dimensions */  int  maxTexture2DMipmap[2];   /**&lt; Maximum 2D mipmapped texture dimensions */  int  maxTexture2DLinear[3];   /**&lt; Maximum dimensions (width, height, pitch) for 2D textures bound to pitched memory */  int  maxTexture2DGather[2];   /**&lt; Maximum 2D texture dimensions if texture gather operations have to be performed */  int  maxTexture3D[3];      /**&lt; Maximum 3D texture dimensions */  int  maxTextureCubemap;     /**&lt; Maximum Cubemap texture dimensions */  int  maxTexture1DLayered[2];   /**&lt; Maximum 1D layered texture dimensions */  int  maxTexture2DLayered[3];   /**&lt; Maximum 2D layered texture dimensions */  int  maxTextureCubemapLayered[2];/**&lt; Maximum Cubemap layered texture dimensions */  int  maxSurface1D;        /**&lt; Maximum 1D surface size */  int  maxSurface2D[2];      /**&lt; Maximum 2D surface dimensions */  int  maxSurface3D[3];      /**&lt; Maximum 3D surface dimensions */  int  maxSurface1DLayered[2];   /**&lt; Maximum 1D layered surface dimensions */  int  maxSurface2DLayered[3];   /**&lt; Maximum 2D layered surface dimensions */  int  maxSurfaceCubemap;     /**&lt; Maximum Cubemap surface dimensions */  int  maxSurfaceCubemapLayered[2];/**&lt; Maximum Cubemap layered surface dimensions */  size_t surfaceAlignment;      /**&lt; Alignment requirements for surfaces */  int  concurrentKernels;     /**&lt; Device can possibly execute multiple kernels concurrently */  int  ECCEnabled;         /**&lt; Device has ECC support enabled */  int  pciBusID;          /**&lt; PCI bus ID of the device */  int  pciDeviceID;        /**&lt; PCI device ID of the device */  int  pciDomainID;        /**&lt; PCI domain ID of the device */  int  tccDriver;         /**&lt; 1 if device is a Tesla device using TCC driver, 0 otherwise */  int  asyncEngineCount;      /**&lt; Number of asynchronous engines */  int  unifiedAddressing;     /**&lt; Device shares a unified address space with the host */  int  memoryClockRate;      /**&lt; Peak memory clock frequency in kilohertz */  int  memoryBusWidth;       /**&lt; Global memory bus width in bits */  int  l2CacheSize;        /**&lt; Size of L2 cache in bytes */  int  maxThreadsPerMultiProcessor;/**&lt; Maximum resident threads per multiprocessor */};위와 같이 선언되어 있는데, 각각 어떤 것을 의미하는지는 각 항목마다 설명이 주석처리 되어 있으므로 자세한 설명은 하지 않겠습니다. 앞서 출력해 보았던 내용 이외에도 엄청나게 많은 정보들을 저장하고 있지만, 가장 많이 쓰이게 될 몇 가지 정보들만 출력해 보았습니다. 12  int count;  cudaGetDeviceCount(&amp;count);device 장치의 개수를 획득하는 함수입니다. int 형 변수인 count를 만들고, 그것의 주소값을 argument로 넘겨주게 됩니다. cudaGetDeviceCount 함수는 cuda_runtime_api. h에 다음과 같이 정의되어 있습니다. 1extern __host__ __cudart_builtin__ cudaError_t CUDARTAPI cudaGetDeviceCount(int *count);parameter로 count의 포인터를 넘겨 받기 때문에 호출 시 argument의 사용에 주의해 주셔야 합니다. 함수의 이름에서 알 수 있다시피 count 변수에는 device의 개수 값이 들어갑니다. CUDA 뿐만이 아니라 다른 언어나 tool을 공부할 때에도 마찬가지로, 어떤 함수를 사용할 때 그것이 어떻게 정의되어 있는지 내부를 공부하는 것은 무척이나 많은 도움이 됩니다. 특히나 CUDA는 C 기반으로 짜여져 있는데다 주석도 잘 달려 있어 공부하기 편리합니다. 이렇게 CUDA syntax를 이용하여 device의 정보를 출력하는 방법에 대해 알아보았습니다. 이후 포스팅에서 CUDA 병렬 프로그래밍에 대해 더 자세히 알아보도록 하겠습니다. "
    }, {
    "id": 5,
    "url": "http://localhost:4000/cuda-syntax-highlighting/",
    "title": "[CUDA 5.0] CUDA Syntax Highlighting 설정하기",
    "body": "2015/04/01 - ※ 이 글은 2013년도에 작성된 글입니다. 사진이나 세부적인 내용은 지금과 다를 수 있습니다. VS에서 CUDA 코드를 작성하면 CUDA Syntax Highlighting은 물론이고 기본적인 C/C++ 문법마저도 Syntax Highlighting이 되지 않아 코드를 작성하기 무척이나 번거롭고 힘들었을 것입니다. 따라서, 이번 포스팅에서는 CUDA Syntax Highlighting 방법에 대해 소개하려 합니다. 이전 버전들과는 방법이 다르기 때문에, 다른 버전을 사용 중이라면 적용되지 않을 수도 있다는 점을 염두에 두시길 바랍니다. 우선 VS를 켜고, 상단 메뉴 바에서 도구 -&gt; 옵션으로 들어갑니다. 창이 하나 나타나는데, 여기서 프로젝트 및 솔루션 -&gt; VC++ 프로젝트 설정으로 들어가면 아래의 창 같은 화면이 뜹니다. 이 중 포함할 확장명에 . cu; cuh;를 추가합니다. 확장자명끼리의 구분은 ;로 구분하게 됩니다. . cu 파일은 CUDA source file이고, . cuh 파일은 CUDA header file입니다.  확장명에 추가했으면 이제 . cu와 . cuh를 C++ 편집 환경으로 설정해 줄 차례입니다. 옵션 창에서 텍스트 편집기 -&gt; 파일 확장명으로 들어가면, 아래와 같은 창이 나타납니다. 여기에 확장명 . cu, 편집기 Microsoft Visual C++을 선택하고 적용하면 됩니다. . cuh도 마찬가지 방법으로 적용해 줍니다.  이제 C:\ProgramData\NVIDIA Corporation\CUDA Samples\v5. 0\doc\syntax_highlighting\visual_studio_8 폴더로 들어가보면 usertype. dat 파일이 있을 것입니다. 이 파일을 C:\Program Files\Microsoft Visual Studio 10. 0\Common7\IDE 폴더에 복사해 넣으면 됩니다. 주소는 32bit 기준이므로, 64bit라면 Program Files (x86) 폴더에서 찾아 복사해 넣도록 합니다.  이것으로 CUDA Syntax Highlighting 준비가 모두 끝났습니다. VS를 다시 시작하거나 아니면 프로젝트를 다시 열면 문법에 맞는 색깔로 설정된 C/C++ 코드를 볼 수 있을 것입니다. 참고로, CUDA Syntax Highlighting을 위해서는 아래의 두 줄을 추가로 입력해 주어야지만 정상적으로 표현이 됩니다. 12#include  cuda_runtime. h #include  device_launch_parameters. h 이 두 줄은 모두 CUDA Project를 생성하면 만들어지는 kernel. cu에 포함되어 있습니다.  위는 정상적으로 CUDA Syntax Highlighting이 적용된 코드입니다. __global__이나 threadIdx와 같은 CUDA 문법들에도 highlighting이 적용된 것을 확인할 수 있습니다. 참고로 위 화면에서는 다른 테마가 적용되어 있으므로, 실제로 highlighting을 적용했을 때 다르게 보일 수 있습니다. "
    }, {
    "id": 6,
    "url": "http://localhost:4000/cuda-%EC%98%88%EC%A0%9C-%EC%8B%A4%ED%96%89%ED%95%98%EA%B8%B0/",
    "title": "[CUDA 5.0] CUDA 예제 실행하기",
    "body": "2015/03/31 - ※ 이 글은 2013년도에 작성된 글입니다. 사진이나 세부적인 내용은 지금과 다를 수 있습니다. CUDA 5. 0을 설치하고, 리부팅을 하고 나면 NVIDIA CUDA Samples Browser v5. 0 아이콘이 생겼을 것입니다. 이름만으로도 어떤 프로그램인지 감이 오시나요? CUDA 5. 0부터는 Installer에 samples 또한 포함이 되어 있다고 저번 포스팅에서 언급하였습니다. 이 프로그램이 바로 설치와 같이 다운 받은 예제 파일들을 찾아보고, 실행해 볼 수 있는 프로그램입니다. 한 번 실행해 봅시다.  실행하면 보이는 바와 같이 다양한 샘플들을 찾아볼 수 있고, 실행시켜 볼 수도 있습니다. 이 샘플들을 실행시켰을 때, 아무 무리 없이 잘 돌아가면 설치가 제대로 되었다는 뜻입니다. 만약 실행이 되지 않는다면, 컴퓨터에 설치되어 있는 GPU가 CUDA 가속을 지원하는지를 확인하고, 또 NVIDIA 그래픽 드라이버가 최신 버전인지를 확인해 주세요. 이 중 CUDA N-Body Simulation을 실행시켜 봅시다. N-Body가 무엇인지 몰라도 어떤 프로그램인지는 그래픽으로 시뮬레이션해주기 때문에 알아보기 쉽습니다. 실행하는 방법은 오른쪽 편에 작은 글씨로 된 Run을 누르면 됩니다. 실행하면 다음과 같은 창 하나가 뜹니다. 이 창에서는 프로그램에 대한 간단한 설명 등과 함께 맨 아래쪽에 보면 어떤 device를 사용하고 있는지에 대한 정보도 같이 볼 수 있습니다. simulation을 위해 하나의 device를 사용하였고, 그 device는 GeForce 310M이라는 정보가 뜹니다. 이 정보는 각자 사용하는 GPU에 따라 다르게 나타날 것입니다.  그리고 하나 더 뜨는 창에서는 다음과 같이 N-Body Simulation이 이루어집니다. 현재 시뮬레이션 되고 있는 상태에 대해서는 화면 위쪽에 나타나게 되고, 화면 전체에 N-Body Simulation이 약간의 끊김이 있기는 하지만 빠르고 매끄럽게 진행되는 것을 확인할 수 있습니다. 심지어 310M이라는 낮은 사양의 GPU에서도 말이죠.  NVIDA CUDA Samples Browser에서는 이러한 N-Body Simulation 이외에도 다양한 예제들을 실행시켜 볼 수 있습니다. 그리고 이러한 예제들의 코드 역시 같이 다운받아져 있는데, 이 코드들은 C:\ProgramData\NVIDIA Corporation\CUDA Samples\v5. 0 폴더에 잘 정리되어 있습니다. ProgramData 폴더는 숨겨져 있는 폴더이므로 C 드라이브에 들어갔는데 폴더가 없다고 당황하지 않으셔도 됩니다. 위 주소로 들어가보면 다음과 같이 잘 정리된 CUDA 예제들의 코드를 확인하고, 직접 실행시켜 볼 수 있습니다.  아까 위에서 실행시켜 보았던 N-Body Simulation은 5_Simulation 폴더에 nbody라는 이름으로 들어가 있습니다. VS에서 실행시켜 보면 앞서 실행시켰던 것과 같은 결과가 나오는 것을 확인할 수 있습니다. 예제 파일들은 간단한 것부터 복잡하고 어려운 계산이나 그래픽을 요하는 것까지 다양하게 제공되므로, 예제 파일을 분석하며 공부하는 것도 많은 도움이 될 것입니다. CUDA를 공부하면 C/C++로 이미 만들어져 있는 프로그램을 포팅하는 것을 주로 하게 되고, 어떻게 최적화를 하느냐에 따라 같은 내용을 실행시키더라도 성능이 확연하게 달라질 수 있습니다. 따라서 이미 잘 짜여져 있는 성능 좋은 코드를 많이 보는 것이 공부에 도움이 될 것입니다. CUDA Project는 C/C++ Project를 그대로 이용해도 상관 없으나, VS에서는 CUDA를 설치하면 다음과 같이 CUDA 5. 0 Runtime Project를 바로 생성할 수 있도록 해 줍니다.  CUDA 5. 0 Rumtime Project를 생성하면 따로 무언가를 설정할 필요 없이 바로 컴파일이나 빌드를 할 수 있도록 되어 있습니다. 생성하면 kernel. cu라는 소스 파일 하나가 공통적으로 들어가 있는데요. 여기에는 1차원 array를 더하는 내용의 코드가 포함되어 있습니다. 무척 간단한 코드로 실행시켜 보면 다음과 같은 결과가 출력됩니다.  이것으로 CUDA 예제를 가능한 모든 방법을 동원하여 실행하여 보았습니다. CUDA는 아직 한글로 번역된 책이 많이 없기 때문에 이미 만들어져 있는 예제들을 보면서 실행시켜 보고, 스스로 분석하고, 다른 코드를 CUDA로 포팅해보는 연습을 하다 보면 실력이 많이 느는 것을 확인할 수 있을 것입니다. 자, 이렇게 CUDA 5. 0을 사용하여 코딩할 준비가 모두 끝났습니다. 다음 포스팅에서는 위 화면에 보이는 바와 같이 CUDA Syntax Highlighting 하는 방법에 대해서 이야기하도록 하겠습니다. "
    }, {
    "id": 7,
    "url": "http://localhost:4000/cuda-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0/",
    "title": "[CUDA 5.0] CUDA 설치하기",
    "body": "2015/03/30 - ※ 이 글은 2013년도에 작성된 글입니다. 사진이나 세부적인 내용은 지금과 다를 수 있습니다. CUDA 5. 0은 이전 버전들과는 달리 설치가 매우 간편해진 것이 특징입니다. NVIDIA 사이트에서 CUDA ZONE을 들어가면 영어로 된 developer zone이 나오는데, 여기서 CUDA Download를 클릭해 들어가면 다음과 같은 페이지가 뜹니다. 참고로, NVIDIA Korea 사이트에서는 한글 번역을 지원해주지만 developer zone은 한글 번역을 지원해주지 않습니다. 또, 한국 사이트에서는 낮은 버전의 CUDA를 다운받게 되므로 꼭 원래 사이트에 들어가서 다운 받아 주세요.  여기서 Desktop/Notebook의 OS 등에 맞는 파일을 클릭하여 다운 받을 수 있습니다. CUDA 5. 0부터는 CUDA Toolkit과 SDK code samples, developer driver를 모두 한꺼번에 다운 받아 설치할 수 있어 무척이나 간편하게 설치할 수 있게 되어 있습니다. 다운 받은 installer를 실행하면 설치가 끝납니다. 설치가 끝나면 컴퓨터를 리부팅해야 CUDA를 사용할 수 있습니다. 자신의 GPU가 CUDA 가속을 지원하는 지에 대해서는 CUDA ZONE에서 CUDA GPUs를 들어가면 확인할 수 있습니다. Tesla, Quadro, NVS, GeForce 순으로 나와 있습니다. 현재는 대부분의 GPU들이 CUDA 가속을 지원합니다.  한 가지 더. CUDA를 사용하기 위해서는 그래픽 드라이버가 최신 버전이어야 합니다. NVIDIA 사이트에서 다운 받을 수 있으니 최신 버전인지를 확인하고 업데이트 하도록 합시다. 혹시 이후에 실행을 시켰는데 되지 않는다면 그래픽 드라이버가 최신 버전이 아니기 때문일 수도 있습니다. 자, 이렇게 CUDA 5. 0을 설치하여 사용할 준비가 끝났습니다. CUDA 5. 0에서는 다양한 예제 파일들을 같이 다운 받았기 때문에 그것들을 실행시켜 볼 수 있습니다. 예제 파일의 실행에 대해서는 다음 포스팅 때 이야기하도록 하겠습니다. "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});