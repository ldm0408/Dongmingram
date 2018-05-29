# 1-27 Understanding HTTP Requests

## HTTP란
- Hypertext transfer protocol
- 인터넷이 서로 커뮤니케이션 하는 방법
- 디바이스 - 서버, 클라이언트-서버 모두 http를 통한다
- 최초엔 하이퍼텍스트를 전달하기 위해서 나옴(html 전달을 위해)
- 크게 Client, server가 있고, 이들은 Request와 Response 를 통해 소통한다.
### request 기능
1. consume a resource =>GET
2. create a resource => POST
3. update a resource =>PUT
4.  delete a resource => DELETE
### request 구성
1. Header
2. Body
* response도 이 두가지로 구성되어있다.

## django가 request를 보내려면?
### Urls
- 요청 사항을 urls로 보내면 된다.
- url을 사용해서 정보를 수정하고 리소스를 바꾸는것이 백엔드의 핵심작업이다. / 이 url 모음이 바로 api다
- 백엔드의 API는 모든 종류의 클라이언트에서 사용 가능하다. / 때문에 api 디자인이 중요하다

# 1-28 Basic REST API Design Concepts
- 좋은 api를 만들기 위한 규칙!
 만약 개와 주인이라는 앱의 api를 만든다고 했을 때아래는 매우 안좋은 api이다
```
/getAllDogs
/scheduleWalkOnThePark
/getDogOwner
/getAllDogsOwner
```
- 규칙도 없고 제 멋대로이다. 팀프로젝트라면 최악이라고 볼 수 있다
- 때문에 api 디자인이 중요하다
- 동사 보다는 명사로 이뤄진 api를 구상하자
- 명사로 이뤄진 url이 좋다

```
## 동사는 http method 에만 사용한다

GET -> /dogs
POST -> /dogs
PUT -> /dogs
DELETE -> /dogs

## dogs는 컬렉션, nuri는 엘리먼트
GET -> /dogs/nuri
POST -> /dogs/nuri (error,이미 생성 되었다)
PUT -> /dogs/nuri (if nuri exists update, if not error)
DELETE -> /dogs/nuri

GET /owners/dongmin/dogs -> dongmin이 보유한 모든 dog 리스트
POST /owners/dongmin/dogs -> dongmin의 dog를 생성
PUT /owners/dongmin/dogs -> dongmin의 dogs를 업데이트
DELETE /owners/dongmin/dogs -> 삭제

GET -> /dogs/search?color=brown   갈색 강아지 검색
GET -> /owners/dongmin/dogs/search?color=brown dongmin이 보유한 갈생 강아지 검색
```
* 기존 작성한 api를 새로운 클라이언트(디바이스)가 사용해야 한다면
 기존 api에 새로운 내용을 덮어쓰지말고 새로운 버전을 만들어 사용하는게 좋다

* api는 명확하고, 이해하기 쉽고, 보자마자 이해할 수 있게 만들어야한다.


# 1-29 Django Rest Framework Installation and Basic Concepts
## Django Rest Framework
- 장고 api를 만들기 위해 최적화 되어있다. 
- 여러 종류의 class, function, 파이썬 패키지를 갖고 있고 이는 api 제작에 유용하다
* 설치 방법
```
Pipenv 환경에서
$pipenv install djangorestframework

설치 후 `/config/base.py`의 THIRD_PARTY_APPS에 추가해주자
```
THIRD_PARTY_APPS = [
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'rest_framework',
]
```
## 시리얼라이저(serializers)
- api는 json과 소통을 한다. 프런트엔드에서도 json을 요구할거다
- json은 JavaScript Object Notatatioon
- 장고는 파이썬과 소통하지 자바스크립트인 json과 소통하지 않는다
- rest framework의 시리얼라이즈를 통해 파이썬 오브젝트를 joon 오브젝트로 변환시켜준다(또한 json을 파이썬 오브젝트로 변환 시켜준다)
- 한 마디로 파이썬과 json을 연결해주는 다리이다.
```
Python -> Serializers -> Json
 Json -> Serializers -> Python
```


