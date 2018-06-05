# 1-30 Creating Image Serializers
Images app 을 위한 serializer

/Images 에 serializers.py 생성

rest_framework의 serializers를 import하자
모델은 Images의 모델을 사용할거니깐 models도 import 해주자
```
from rest_framework import serializers
from . import models
```

Images의 모델은 Image, Comment, Like 총 3개이니 serializer에도 3개의 클래스를 만들자

클래스는 serializers.Serializer를 상속하고 안에 meta 클래스를 설정해주자

```
class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Comment
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Like
        fields = '__all__'
```


# 1-31 Creating List All Images View
## view test
- 현재의 DB에 있는 모든 이미지를 볼 수 있는 view를 만들어 test 해보자
- 사실 이런 view는 좋은게 아니다, DB에 이미지가 1만개정도 있고, 많은 사람들이 한버에 이를 보려고 하면 DB 는 퍼져버린다. / 실제로 사용하진 말고 이해하는데 중점

-view는  템플릿을 사용하고 싶을 때 render를 사용하지만 우리는 장고를 API로 사용할 거라 최초 기입 된 import 코드를 지우고 2개의 클래스를 불러오자
```
from django.shortcuts import render —> 삭제
from rest_framework.views import APIView -> 추가
from rest_framework.response import Response-> 추가
```
* APIView는 엘리먼트를 가져오고, 보여주고, Http request method를 관리하는 클래스다.
* APIView는 우리가 사용한 http requset에 따라 각기 다른 function을 사용한다.
* 여기선 get을 사용한다.
* self 는 이미 정의된 변수 이다.
* request는 클라이언트에게 오브젝트를 요청하는거다.
* format은 json, xml이 될 수 있는데 여기엔 none 지정 했고 이를 지정 하지 않으면. Json 포맷으로 응답한다.
```
class ListAllImages(APIView):

    def get(self, request, format = None):
```
* 이미지 모델을 사용하기에 해당 모델을 import 하자
* 직전에 생성한 serializer 파일도 import 하자
* 모든 이미지 오브젝트를 담을 변수를 만들어 주고 이를 serialize 해주는 변수를 생성하자
* serializer 는 1개의 이미지를 변환해주는데 여기선 모든 이미지를 해야 하니 여러개를 할 거라고 알려주자 (many = True)
```
from . import models, serializers

class ListAllImages(APIView):

    def get(self, request, format = None):
        all_images = models.Image.objects.all()
        serializer = serializers.ImageSerializer(all_images, many = True)
```
* 마지막으로response()클래스를 return 을 해주자 .인수로 data = serializer.data를 지정해주자
Serializer는 엘리먼트를 시리얼라이즈하면 이를 data 변수에 저장을하기 때문에 이렇게 사용하면 된다.
```
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers

class ListAllImages(APIView):

    def get(self, request, format = None):
        all_images = models.Image.objects.all()
        serializer = serializers.ImageSerializer(all_images, many = True)
        return Response(data = serializer.data)
```
- 이제 url을 연결하면 작동 할 거다


# 1-31 Creating the URLS and testing the Image Serializers

Url 구성요소
1. Regex (정규식)
2. View
3. Name

* app_name 을 기입하지 않으면 오류가 뜬다
```
from django.conf.urls import url
from . import views

app_name = "images"
urlpatterns = [
    url(
        regex = '^all/$',
        view = views.ListAllImages.as_view(),
        name = 'all_images'
    )
]
```
* 장고 2.0에선 url 대신 path를 사용할 수 있다.
* path는 url 보다 가독성이 좋고 더 쉽게 작성 할 수 있다.
* path를 사용 하면 아래와 같다
```
from django.urls import path

from . import views

app_name = "images"
urlpatterns = [
    path(
        "all/",
        view = views.ListAllImages.as_view(),
        name = 'all_images'
    )
]
```
* urls.py를 작성 하면 config/urls.py 에 등록 해야 한다
```
## config/urls.py
path("images/", include("dongmingram.images.urls", namespace= "images")),
```
* 서버가 연결된 상태에서 브라우저 주소창에 ` http://localhost:8000/images/all/`를 입력하면 해당 데이터를 json화 시킨 모습을 볼 수 있다.