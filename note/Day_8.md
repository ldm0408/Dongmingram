# 1-34 Serializing a Foreign Key

* 현재 Likes 와 comments의 시리얼라이즈 된 데이터를 보면
Image가 해당 좋아요와 댓글이 달린 이미지에 대한 Foreign Key 넘버만 나와 있지 그 세부 내용은 확인 할 수 없다. 그래서 각각의 like와 comment에 이미지 정보가 나타나게 시리얼라이져를 수정 해보자

* 현재 만들어져있는 시리얼라이져는 모든 필드를 그대로불러 오는것인데 이중에 image 필드만 재 설정 해주면 된다.
```
## /images/serializers.py

class CommentSerializer(serializers.ModelSerializer):

    image = ImageSerializer()

    class Meta:
        model = models.Comment
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):

    image = ImageSerializer()    

    class Meta:
        model = models.Like
        fields = '__all__'
```
이전엔 image. 필드는 기존 모델에 설정된 foreign key가 대상이었지만
위와 같이 수정 하면 like와 comment의 image 필드는 imageSerializer() 즉 시리얼라이징 된 image 데이터를 불러올 수 있다.

* 수정 전
```
HTTP 200 OK
Allow: GET, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

[
    {
        "id": 1,
        "created_at": "2018-05-28T19:21:27.679522+09:00",
        "updated_at": "2018-05-28T19:21:27.679553+09:00",
        "creator": 1,
        "image": 1
    },
    
]
```

* 수정 후
```
HTTP 200 OK
Allow: GET, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

[
    {
        "id": 1,
        "image": {
            "id": 1,
            "created_at": "2018-05-28T19:21:11.338267+09:00",
            "updated_at": "2018-05-28T19:21:11.338299+09:00",
            "file": "/media/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2018-05-23_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.31.35.png",
            "location": "seoul",
            "caption": "hi this is django",
            "creator": 1
        },
        "created_at": "2018-05-28T19:21:27.679522+09:00",
        "updated_at": "2018-05-28T19:21:27.679553+09:00",
        "creator": 1
    },
    
]
```


# 1-35 Hidden Model Fields in Django

* 하나의 이미지에 대한 모든 Like 와 Comment를 어떻게 표시 할까
* _set 필드를 이용하면 된다

## _set 필드
Like 모델과 comment 모델엔 각각 이미지를 바라보는 foreign key가 지정 되어있다.
이럴 경우 image 모델엔 자동적으로 각각 모델에 대한 _set 필드가 생성된다.
comment_set 필드와 like_set 필드가 생성 되어 있다는 의미

이를 시러얼라이져에 이용하려면 코드를 수정 해야 한다
```
class ImageSerializer(serializers.ModelSerializer):

    comment_set = CommentSerializer(many = True)
    like_set = LikeSerializer(many = True)

    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'location',
            'caption',
            'comment_set’,
            'like_set’
        )
```
* 위를 보면 fields 의 값을 기존읜 ‘__all__’에서 직접적으로 필드를 기입해주는 방법을 사용했다.
 이렇게 직접적으로 불러와야만 _set 필드를 사용 가능하다

* comment	_set 과 like_set 에 해당 시리얼라이저 클래스를 지정해줘야 한다.

* 이때 ImageSerializer 클래스를 코드 최하단 으로 옮겨야 제대로 작동한다.
왜냐하면 파이썬은 코드를 위에서 부터 읽어 나가는데 comment와 like의 시리얼라이저 코드를 먼저 읽어야 
```
    comment_set = CommentSerializer(many = True)
    like_set = LikeSerializer(many = True)
```
위 코드가 제대로 작동하기 때문이다.

* like_set 과 comment_set의 이름을 바꾸려면 
해당 모델의  foreign key가 설정된 필드의 옵션을 수정해주면 된다.
이 경우 like 와 comment 모델의 image 필드의 옵션을 수정하면 된다.
```
image = models.ForeignKey(Image, on_delete = models.CASCADE, null =True, related_name='comments')
```
* 위 처럼 옵션에 related_name = ‘  ’ 을 설정 해주자
* related_name 의 디폴트 값은 각 모델별로 like_set, comment_set이니 이를 원하는대로 바꿔주자
* 마이그레이션을 잊지 말자
* 본인이 설정한 related_name으로 ImageSerializer클래스의 변수명과 필드명 수정을 해야 제대로 작동한다


```
class ImageSerializer(serializers.ModelSerializer):

    comments = CommentSerializer(many = True)
    likes = LikeSerializer(many = True)

    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'location',
            'caption',
            'comments',
            'likes'
        )
```

* 이후 http://localhost:8000/images/all/ 를 보면 아래 처럼 likes comments 필드를 확인할수있다.
```
{
        "id": 1,
        "file": "/media/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2018-05-23_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.31.35.png",
        "location": "seoul",
        "caption": "hi this is django",
        "comments": [
            {
                "id": 1,
                "created_at": "2018-05-28T19:21:42.991091+09:00",
                "updated_at": "2018-05-28T19:21:42.991120+09:00",
                "message": "good good!",
                "creator": 1,
                "image": 1
            }
        ],
        "likes": [
            {
                "id": 1,
                "created_at": "2018-05-28T19:21:27.679522+09:00",
                "updated_at": "2018-05-28T19:21:27.679553+09:00",
                "creator": 1,
                "image": 1
            },
            {
                "id": 2,
                "created_at": "2018-05-28T19:22:35.608009+09:00",
                "updated_at": "2018-05-28T19:22:35.608075+09:00",
                "creator": 1,
                "image": 1
            }
        ]
    }
```