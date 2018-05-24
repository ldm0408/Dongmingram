# 1-19 Creating the User Model
- models를 통해 장고는 varible을 데이터베이스 테이블로 변환시킨다
- 이 프로젝트를 예로 들면 자동으로 유저, 이미지를 위한 테이블을 생성 한다는 의미
- 장고는 우리가 생성한 model에 variables로 DB에 column을 자동 생성할거다
- 장고가 DB를 작업해준다.

* 테이블은 데이터 전체의 모습을 말한다 ex) 엑셀 시트
* column은 데이터의 세부 내역을 의미한다 ex) 보통 엑셀 첫행에 기입 하는것들(이름, 이메일, 가격 등)
* models 에 직접 작성한 파이썬 class 내부의 variable 이름이 곧 DB 테이블의 column이 된다.

## user app models filed추가
`Users/models.py` 를 열어서
```
class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, 
```
Name 변수 하단에 원하는 변수를 추가한다.

인스타그램 프로필에 필요한 website, bio, phone, gender 필드를 추가해보자
```
class User(AbstractUser):

    GENDER_CHOICES = (
        ('male','Male'),
        ('female', 'Female'),
        ('not-specified', 'Not specfied')
    )

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, max_length=255)
    website = models.URLField(null = True)
    bio = models.TextField(null = True)
    phone = models.CharField(max_length = 140, null = True)
    gender = models.CharField(max_length = 80, choices = GENDER_CHOICES, null = True)
```
* GENDER_CHOICES라는 상수를 생성해서 성별 선택하는 필드에 사용했다.
* 기존에 생성된 유저(super user)가 있는 경우 새로운 필드에 null = True 값을 줘서 공백으로 나타나게 했다( 이렇게 안하면 알림 메시지가 뜬다고 한다)
* users 모델에 원하는 변수를 추가한 후 Migration을 해야 제대로 반영이된다
```
$ python manage.py makemigrations
$ python manage.py migrate
```
* 작업 후 새로고침 해서 어드민 패널을 확인하자
## 참고사항
- cookiecutter는 users 모델을 디폴트로 생성해 주고 이때 users의 모델은 AbstractUser 라는 이름의 클래스를 상속 받은 클래스이다.


# 1-20 Creating the Image Model
## time stamp
 - 언제 모델이 생성되었는지
 - 언제 모델이 업데이트 되었는지
댓글이나 좋아요등에 각각 생성날짜와 업데이트 날짜의 변수를 줄 수 있지만 효율적이지 않다.
그래서 abstract model을 만들어서 다른 모델들을 위한 base로 사용 한다.
여기선 abstract time stamp model을 만들어 사용할 예정이다.
`/images/models.py` 를 열어 아래와 같이 수정한다.
```
from django.db import models

# Create your models here.
class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
```
* TimeStampedmodel을 만들었고 이는 models의Model을 상속 받았다.
* 하단에 Meta class는 해당 클래스에 대한 추가 정보로써 DB에 영향을 주지 않고(필드를 생성하지않는다), 이 클래스가 abstract 클래스라는걸 명시해준다
* abstract 베이스 클래스는 데이터베이스와 연결 되지않는다. 단지 다른 모델들을 위한 베이스로 사용된다.
## image model fields 추가
- 이미지와 관련된 모델들을 생성해주자
- 각각에 TimeStampedmodel을 상속하자
-  먼저, 이미지와 커멘트 모델을 생성 했다.
```
class Image(TimeStampedModel):

    file = models.ImageField()
    location = models.CharField(max_length = 140)
    caption = models.TextField()


class Comment(TimeStampedModel):

    message = models.TextField()

```
* 완료후 Migration으로 마무리 해주자
* 내가 만드려는 app에 필요한 모델과 각각의 필드에 대한 고민이 중요할듯 하다



