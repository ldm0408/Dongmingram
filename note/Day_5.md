# 1-21 Explaining Model Relationships

어떻게 모델들이 연결 되는가

## one to many / many to one
### ForeignKey()
- 한명의 유저가 여러개의 사진을 올릴 수 있는 경우
- 한개의 사진이 여러개의 좋아요를 받는 경우
해당 모델에 ForeignKey()를 이용하자
ForeignKey()는 지정한 column에 해당 데이터와 연결된 모델의 ID를 데이터로 받는다. 그리고 이 ForeignKey는 해당 id의 모델을 향하게 된다.
* Image 모델에 creator column을 생성하고 거기에 ForeignKey(user모델)를 설정해 놓는다고 하면 해당 이미지 데이터와 이를 올린 유저와 연결 시켜 누가 올렸는지를 나타낼 수 있다.
뿐만 아니라 연결된 유저의 데이터에 접근가능하다.
* 비어있으면 안되는 관계로 최초 값은 null 값을 지정해 줘야 한다.

### _set
- 장고는 자동으로 set이라고 불리는 클래스 프로퍼티를 만든다
- ForeignKey가 향하는 ID의 모델은 ‘해당modelName_set’ 프로퍼티를 갖게 된다
- 이를 이용하여 해당 ID의 모델을 향하고있는 (foreugnkey가 지정된) 데이터들을 불러올 수 있다.
* 유저가 올린 이미지 전체 목록 / 한 이미지에 좋아요 한 유저 목록 등등
* 해당 column이 생성 되지는 않느다

## many to many
### ManyToManyField()
- 수많은 유저들은 서로간에 팔로잉 팔로우를 할 수 있다. 이러한 기능을 위해 ManyToManyField()를 사용한다.
- Foreign key와는 달리 이 필드는 해당 모델 자신을 향한다
- ManyToManyField(‘self’)
- 유저는 다른 유저를 팔로잉 할 수 있기 때문에 (유저 모델의 한 데이터가 같은 유저 모델의 다른 데이터를 팔로잉 팔로우 할 수 있게 만들고자 하기 때문)
- ForeignKey와는 달리 해당 필드가 비워져 있어도 된다.
- 팔로우 팔로잉 추가는 add()메소드를 이용해서 가능하다
  * ex) Dongmin.followers.add(jisu, Pedro)
  * 이경우 nicolas의 followers 필드에 jisu와 pedro의 ID값이 저장 된다.


# 1-24 Registering the Models in the admin
- 장고는 어드민 패널 이용이 엄청 쉽다 이를 이용해서 생성한 모델들을 확인해보자

* /images/admin.py를 열자

먼저 Images 폴더의 models.py를 임포트 하자
from . import models

모델이 어드민 패널에서 어떻게 보이게 될지 결정하는 Class를 생성하자


```
from django.contrib import admin
from . import models
# Register your models here.

@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    pass
```
- Images 테이블에 생성한 3개의 모델을 어드민에 보이도록 class를 생성 했다.
- 각각의 클래스 상단에는 파이썬 데코레이터로 지정을 해두었는데 데코레이터에 대해선 문서를 찾아 읽어 보도록 하자.

이렇게 admin.py를 수정 한 뒤 브라우져로 어드민 패널을 들어가 보면 Images가 생겼고 이미지 업로드, 좋아요, 댓글의 데이터 베이스가 잘 돌아가는지 테스트 해볼 수 있다.


# 1-25 Customizing the Django Admin
## string representation
- admin panel에서 각 오브젝트가 string representation으로 어떻게 보이는지에 대한 것
- 이를 이용해서 어드민 패널에서 보여지는 문자열들을 수정 가능 하다
- 예를 들어 image model에 대한 오브젝트를  ‘image object’가 아닌 지정한 문자열로 보이게 할 수 있다.(이를 통해 어드민 패널의 Like 나 Comment 창의 이미지 선택란의 항목을 구별할 수 있다)

* `/images/models.py` 수정
```
class Image(TimeStampedModel):

    ''' Image Model '''

    file = models.ImageField()
    location = models.CharField(max_length = 140)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete = models.CASCADE, null =True)

    def __str__(self):
        return '{} - {}'.format(self.location, self.caption)

class Comment(TimeStampedModel):

    ''' Comment Model '''

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete = models.CASCADE, null =True)
    image = models.ForeignKey(Image, on_delete = models.CASCADE, null =True)
    
    def __str__(self):
        return self.message

class Like(TimeStampedModel):

    ''' Like Model '''

    creator = models.ForeignKey(user_models.User, on_delete = models.CASCADE, null =True)
    image = models.ForeignKey(Image, on_delete = models.CASCADE, null =True)

    def __str__(self):
        return 'User: {} - Image Caption: {}'.format(self.creator.username, self.image.caption)
```
- 각각의 모델 클래스 안에 `__str__()` 함수를 이용해서 해당 모델 클래스의 오브젝트의 string representation을 설정 해주었다.
- image 모델은 이미지 업로드시 작성한 location - caption으로 설정
- comment 모델은 커맨트 업로드시 작성한 message
- Like 모델은 유저네임 - 이미지의 캡션
* 위와 같이 수정하고 어드민 패널을 새로고침 하면 변화를 확인 할 수 있다.

## Django ModelAdmin option
- amdin.ModelAdmin 클래스안에 저장되어 있는 내용으로 어드민 패널을 커스터마이징 할 때 유용한 옵션들이 많이 있다.
* [참조: The Django Admin Documentation](https://docs.djangoproject.com/en/1.11/ref/contrib/admin/)
### list_display
- 이 옵션은 지정한 필드의 내용을 리스트화 해서 보여준다
### list_display_links
- 이 옵션은 지정한 필드에 링크를 걸어 해당 데이터로 이동시킨다
### list_filter
- 이 옵션은 지정한 필드를 이용해서 데이터를 필터링 할 수 있다
### search_fields
- 이 옵션은 지정한 필드를 이용해서 데이터를 검색할 수 있다.

* ` /images/admin.py` 수정
어드민 패널에서 이용하고 싶은 옵션을 선택해서 원하는데로 커스터 마이징 하자
```
@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):

    list_display_links = (
        'location',
    )
    
    search_fields = (
        'location',
        'caption'
    )
    list_filter = (
        'location',
        'creator'
    )
    
    list_display = (
        'file',
        'location',
        'caption',
        'creator',
        'created_at',
        'updated_at'
    )


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):

    list_display = (
        'creator',
        'image',
        'created_at',
        'updated_at'
    )


@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    
    list_display = (
        'message',
        'creator',
        'image',
        'created_at',
        'updated_at'
    )
```
- 기존에 작성한 클래스 내부에 ‘pass’는 삭제하고 원하는 옵션을 작성 하자
- 리스트 또는 튜플로 작성해야 한다.
- 옵션 내에 기입하는 필드명은 해당 모델의 필등명을 가져와야 한다



