# 1-10 Databases and Django

Database agnostic 
-  올바른 아답처를 설치하면 원하는 데이터베이스를 모두 사용 할 수있다

`$Pipenv shell`
`$python manage.py runserver`
* 현재 상태에서 위의 커맨드를 입력하면 데이타베이스가 없다는 에러가 나온다

# 1-11 Creating the Databases

맥os 상단 상태 바에서 코끼리 클릭 -> open settings 클릭 —> 내 유저네임 클릭
이 후 실행 된 터미널 창에
CREATE DATABASE [이름]; 이라고 입력하고 실행하자

프로젝트 폴더의 터미널로 돌아와서
`$python manage.py runserver 실행하면 된다`
하지만 마이그레이션 하라는 에러가 나온다(이 후 고칠 예정)

* 최초 쿠키커터 설정 시 타임존을 Asia / Seoul. 이라고 했더니 Value 에러가 떴다
그래서 base.py. 파일에서 TIME_ZONE을 찾아 Asia/Seoul 과 같이 공백을 제거 해 주었더니 에러가 
해결 되었다

# 1-12 Creating the Apps

데이터베이스 작업전에 어플리케이션 작업을 해야 한다
쿠키커터는 디폴트로 유저 어플리케이션이 생성되어있다.

우리는 이미지를 유저들이 업로드하고, 댓글을 달테니까 images App을 설치해주자
`Cd dongmingram`
`$django-admin startapp images`

다음 원래 디렉토리로 돌아와서
vsc에서 Config/settings/base.py를 열어주자
해당 파일의 APPS 부분을 살펴 보면
Django apps, third-party apps, local apps 가 존재 한다.
그리고 Installed apps가 있는데 이는 장고가 시작될때 처음에 불러오는 앱이다.그리고 우리는 Django apps, third-party apps, local apps 모두 사용할 거다
* Django apps: 우리가 빌드한게 아니고 장고가 디폴트로 설치한거다
* third-party apps: 우리가 빌드한게 아니고 디폴트 값도 아닌 인터넷에서 찾아서 설치한 앱이다
* local apps: 우리가 생성한 앱이다(좀 전에 생성한 images)
 - 설치 방법 : images/apps.py를 열어 name에 프로젝트 이름 삽입
```
class ImagesConfig(AppConfig):
    name = 'dongmingram.images
```
Config/settings/base.py 의 local_apps 하단에 해당 앱을 추가
```
LOCAL_APPS = [
    'dongmingram.users.apps.UsersConfig',
    # Your stuff: custom apps go here
    'dongmingram.images.apps.ImagesConfig'
]
```

* dongmingram/templets은 필요없어서 지웠다


# 1-13 Parts of Django App- Models and Views

## Models
- 데이터의 모습/모양 / 데이터의 내용, 필드, 무슨 데이터 등등을 알아야함
Ex) 쇼핑몰 - products app(id,상품, 사진, 가격등), user app(id, email, 신용카드, 주소 등등) 필요해 따른 데이터 구성을 말 한다.

## URLS
- 장고는 한개의. URL파일을 갖고 있다. Products, user, payment 등의 app을 위한 url 파일을 만들고 config/Urls.py에서 불러준다.
* url은 장고로 하여금 뭔가를 실행하게 한다
* 프로토콜이라서 이를 사용해서 앱을 실행시킨다
* HTTP 부르는것
* 모든 앱을 위한 URL들을 합친 한개의 파일만 존재한다.

## Views
* 장고가 무엇을 해야할지 알려준다
* URL이 있어야 작동한다(로그인을 요청 할 시 이와 매칭 되는 URL이 있어야 view를 실행할 수 있다)
* 그냥 python function일 뿐이다


# 1-14 What is the Django ORM
- object relational mappers

## what is SQL
- structured query language
- 우리가 데이터베이스와 대화할때 쓰는 언어
- 데이터베이스에 데이터를 얻기 위해 작성 하는 언어
- 이는 relational databases를 뜻한다
- PostgresSQL 도 relational databases 이다
- 이들 과는 다른 non-relational databases도 있다

##finding Users
예) 콜롬비아 국적 유저를 생성일 기준으로 불러 들여 보자
SELECT * FROM users WHERE country=‘Colombia’ ORDER BY created_date
이런식.
하지만 많은 프로그램 언어를 사용하면 불편하거니와 한번에 다양한 언어를 배우는건 힘들다
이 수업은 파이썬, 자바스크립트를 사용하기에 SQL까지 배우는건 무리
하지만 장고는 이를 해결해줄 수 있다.

* 장고 ORM은 파이썬과 SQL 사이의 통역 역할을 한다.

이를 Django_Orm으로 정리하면 이렇게 된다
User.objects.filter(country=“Colombia”).order_by(‘created_date’)
이 코드를 장고는 SQL 언어로 번역해서 데이터베이스에 전달 하게 된다

* 이 때문에 장고를 하면 SQL을 따로 배우지 않아도 된다.


# 1-16 Understanding Django Models and fields

## Django Models
- 장고 모델은 파이썬 클래스이다
- 모델은 데이터의 모습을 설명해 준다
- 장고 모델은 ORM을 이용해서 데이타베이스 테이블을 만들어준다.
## fields
- 필드는 장고 그리고 데이터베이스에게 데이터의 이름과 종류를 알려줘
- 텍스트, 숫자 이메일 , 파일 등등
- 데이터의 종류를 설명하기 위해 존재한다
- 잘못된 정보를 저장했을 때 알려 주기도 한다(정보의 타입이 다른것이 들어올 경우)
* *장고 모델에 관련한 메소드들을 확인하고 사용해보자 (filter,get등등)

# 1-17 Migrating
-  모델의 모양을 바꾸기 위한 데이터베이스 프로세스 이다.
-  새로운 모델을 만들면 데이터베이스는 이를 모르기 때문에 마이그레이션을 통해 데이터 베이스를 업데이트 해줄 수 있다
- 모델 필드의 내용을 업데이트 할 경우 마이그레이션이 필요하다
* 마이그레이션 커맨드
Python manage.py runserver를 종료한뒤
`$python manage.py migrate`

* `$python manage.py makemigrations`
이 커맨드는 모델의 변경 사항을 설명하는 .py 파일을 만든다(migrations폴더에서 확인가능)


# 1-18 Creating a super user
- 장고 어드민 패널을 이용하기 위해 super user를 생성해야한다
* 장고 어드민 패널 접속 방법
- 서버를 작동 시킨 뒤
- 크롬에 http://localhost:8000/admin 입력

* super user 생성 커맨드
`$python manage.py createsuperuser`
super user 생성 후 서버를 다시 켜고 어드민 페이지를 다시 불러와서 로그인 하자





