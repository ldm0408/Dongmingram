# 1-39 Getting the User Feed part One

- 유저가 팔로잉한 유저의 최근 사진이 타임라인에 보이게
- 유저가 팔로잉한 유저를 모두 불러와야 한다
_ user 모델에 images 필드는 없다 하지만! 앞서 배운 _set 필드를 이용하면 된다.(image 모델이 user를 바라보고 있기 때문에- foreign Key 지정)
- 이를 더 편히 이용하기 위해 image 모델의 user모델을 foreign key 지정한 필드에 related_name 을 설정해주자

- 유저가 팔로인한 유저들의 사진 중 가장 최근에 업로드 된 2개씩 추출해서 리스트에 담는다.
```
class Feed(APIView):

    def get(self,request,format = None):

        user = request.user

        following_users = user.following.all()
        
        image_list = []

        for following_user in following_users:
            
            user_images = following_user.images.all()[:2]

            for image in user_images:

                image_list.append(image)
```
- image_list 의 이미지들을 최신 순으로 정렬 해 주자
```
sorted_list = sorted(image_list,key = lambda image: image.created_at, reverse = True)
```
- 위 의 key 부분에 람다 함수를 사용 하였다.
- 기존의 함수는 아래와 같이 작성하면 된다.
```
def get_key(image):
      return image.created_at
```


# 1-40 Getting the User Feed part two

- 인스타그램 피드는 유저 이름과 유저의 프로필 사진이 필요하다
- 이를 위해 user. model에 profile_image 필드를 생성 했다.
- admin.py 에 profile_image 필드를 추가해주는것을 잊지 말자.( 그래야 어드민 패널에서 사용가능)
- user의 username 과 프로필이미지를 프론트엔드에 사용하기 위해 이를 시리얼라이징 해줘야 한다

```
class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'username',
            'profile_image'
        )

class ImageSerializer(serializers.ModelSerializer):

    comments = CommentSerializer(many = True)
    likes = LikeSerializer(many = True)
    creator = FeedUserSerializer()

    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'location',
            'caption',
            'comments',
            'likes',
            'creator'
        )
```
- FeedUserSerializer 를 만들고, 이를 ImageSerializer의 creator 필드에 넣었다.

##  피드에 좋아요 숫자와 댓글
- 좋아요는 좋아요를 받은 갯수가 나오다 이를 위해 Image 모델에 프로퍼티를 추가해주자
- 프로퍼티는 필드이지만 데이터에 반영되지 않는다. 프로퍼티는 함수이다.
```
class Image(TimeStampedModel):

    ''' Image Model '''

    file = models.ImageField()
    location = models.CharField(max_length = 140)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete = models.CASCADE, null =True, related_name='images')

    @property
    def like_counter(self):
        return self.likes.all().count()

    def __str__(self):
        return '{} - {}'.format(self.location, self.caption)

    class Meta:
        ordering = ['-created_at']
```
* count()는 파이썬 메소드이다.

- 댓글은 username,  message 가 필요하다
- comment 시리얼라이저도 필요한 필드만 시러얼라이징 하는것으로 수정하자
- id, creator, message 필드만 설정해주고, creator는 기존 생성한 FeedUser 시리얼라이저를 사용해서  username을 사용할 수 있게 만들자. ** 이 때 FeedUser 시리얼라이저를 코드 상단으로 옮기자(파이선은 코드를 위에서 부터 읽기 때문에)
```
class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer()
    
    class Meta:
        model = models.Comment
        fields = (
            'id',
            'creator',
            'message'
        )
```

# 1-41 Using Variables on the URLS
- 

re_path : url 대신 path를 사용할 때 정규표현식(regex)를 사용하려면 re_path를 임포트 한뒤 아래처럼 사용 하면 된다.
```
from django.urls import path, re_path
from . import views

app_name = "images"
urlpatterns = [
    path(
        "",
        view = views.Feed.as_view(),
        name = 'Feed'
    ),
    re_path(
        "(?P<image_id>[-\w])/like",
        view = views.LikeImage.as_view(),
        name = 'LikeImage'
    )
    
]
```
하지만 정규표현식을 안쓰는 방법도 있다.
장고는 2.0부터 제공하는 path는 아래와 같이 이용 할 수있다
```
from django.urls import path
from . import views

app_name = "images"
urlpatterns = [
    path(
        "",
        view = views.Feed.as_view(),
        name = 'Feed'
    ),
    path(
        “iInt:image_id>/like",
        view = views.LikeImage.as_view(),
        name = 'LikeImage'
    )
    
]
```
[장고 2.0 Path 사용법](https://docs.djangoproject.com/ko/2.0/topics/http/urls/)


# 1-49 Following a User
* follow할 유저의 id를 찾아서(url의 id 변수 사용)
* user.followers.add(팔로우할 유저 객체)
* user.followers.remove(언팔로우할 유저 객체)

[.add() 참고 자료](https://docs.djangoproject.com/en/1.11/ref/models/relations/#django.db.models.fields.related.RelatedManager.add)

[.remover() 참고 자료](https://docs.djangoproject.com/en/1.11/ref/models/relations/#django.db.models.fields.related.RelatedManager.remove)


1- 51 Getting User Profile

* Url 생성(username 변수)
* 인스타그램 프로필 페이지에 포스트, 팔로워, 팔로잉 숫자가 표시 하기 위해 User 모델에  카운트 해주는 @property 생성 하자
* User Profile serializer를 만들고 팔로우 팔로잉 카운트 프로퍼티도 필드에 넣어주자
* username 으로 유저를 찾고 해당 유저의 객체를 시리얼라이저에 넣어 리턴 해주자

* 프로필 뷰의 이미지
- 이미지 시리얼라이저에 user profile image 시리얼라이저를 만들어주자
- 이미지 모델에 프로퍼티로 comment counter를 만들자( 프로필 화면 이미지에 Like, Comment 갯수 사용)
-  User Profile Image Serializer 에 ‘id’, ‘file’, ‘like_counter’, ‘comment_cunter’를 설정하자
- users/serializers.py 의 User Profile Serializer 에 images 변수를 만들어 User Profile Image Serializer 를 담아서 필드에 사용하자.

* 위 와 같은 작업 후 
http://localhost:8000/users/<username>/ 을 하면
```
{
    "username": "genie",
    "name": "yujin",
    "bio": "hello this is genie world~!",
    "website": "http://blog.naver/ggul56",
    "post_count": 3,
    "followers_count": 1,
    "followings_count": 1,
    "images": [
        {
            "id": 7,
            "file": "/media/IMG_3585.jpg",
            "like_counter": 2,
            "comment_counter": 3
        },
        {
            "id": 5,
            "file": "/media/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2018-06-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.14.49.png",
            "like_counter": 0,
            "comment_counter": 0
        },
        {
            "id": 2,
            "file": "/media/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2018-05-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.25.47.png",
            "like_counter": 3,
            "comment_counter": 0
        }
    ]
}
```
* 이렇게 user profile 창에 필요한 데이터를 불러올 수 있다.

# 1-55 Searching Images by Hashtag

* Image 모델에 해쉬태그 필드를 삽입해야함
 - .taggit 이용
[Django-taggit Documentation](https://django-taggit.readthedocs.io/en/latest/)

* 설치
```
pipenv install django-taggit
```
* 완료후 base.py 의 third party app에 등록

* 사용하고자 하는 models.py 에 import 및 tags 필드 추가
```
from django.db import models

from taggit.managers import TaggableManager

class Food(models.Model):
    # ... fields here

    tags = TaggableManager()
```
* 마이그레이션을 잊지 말자
```
python manage.py migrate
```
* 대문자,소문자 해쉬태그를 구별하지 않게 하는 설정을 추가 하자- base.py 하단에 추가하자
```
TAGGIT_CASE_INSENSITIVE = True
```
* 저장 후 어드민의 이미지에 들어가 이미지를 선택하면 tags 필드가 생성 된것을 확인할 수 있다

## search view
[참고 강의](https://academy.nomadcoders.co/courses/216935/lectures/3579545)
* url로 통해(?) request 되는 문자열을 변수에 담는다
```
hashtags = request.query_params.get('hashtags',None)
```
* 이를 더 편하게 사용하기 위해 hashtags 변수를 리스트화 시킨다
```
hashtags = hashtags.split(",")
```

* [Deep Relationship](https://docs.djangoproject.com/en/1.11/topics/db/queries/#field-lookups) - 각각의 옵션에 대해 읽어보자~!!!*
* .distinct() = 명확한 검색, 중복 방지