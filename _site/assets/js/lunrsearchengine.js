
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
    "body": "      Featured:                                                                                                                                                                                                           Test Post                              :               test 1:                                                                                                                                                                         Chloe Jungah Kim                                    25 Jun 2024                                                                                                                                                                                                                                                                                  [CUDA 5. 0] CUDA 설치하기                              :               ※ 이 글은 2013년도에 작성된 글입니다. 사진이나 세부적인 내용은 지금과 다를 수 있습니다. :                                                                                                                                                                         Chloe Jungah Kim                                    30 Mar 2015                                                                                      All Stories:                                                                                                     Test Post              :       test 1:                                                                               Chloe Jungah Kim                25 Jun 2024                                                                                                                    [CUDA 5. 0] CUDA 설치하기              :       ※ 이 글은 2013년도에 작성된 글입니다. 사진이나 세부적인 내용은 지금과 다를 수 있습니다. :                                                                               Chloe Jungah Kim                30 Mar 2015                            "
    }, {
    "id": 3,
    "url": "http://localhost:4000/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 4,
    "url": "http://localhost:4000/test/",
    "title": "Test Post",
    "body": "2024/06/25 - test 1: This is test post! "
    }, {
    "id": 5,
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