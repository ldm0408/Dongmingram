# 1-5 Parts of Django - Settings, Urls, Apps

## settings
 - 장고의 디폴트 행동을 바꿀수있다
 - 장고 디폴트를 커스터마이징 할 수 있다
 - 장고의 여러 설정(타임존, 언어 설정 등등)
 - 사용할 패키지, 모듈등을 설치 하는 곳이다
 - 사용하지 않는 것들을 삭제 가능
 - 장고를 시작할때 세팅 확인 후 전부 불러옴

## Urls
 - 장고 프로젝트는 인터넷에 연결될걸고, 당연히 URL이 있어야 한다
 - 유저가 요청한 url과 일치하는 것을 찾아 view function을 수행한다


## APPS
 - 내가 만든 어플리케이션으로 이루어져있다.
 - 앱은 정의된 범위 기능이 아주 명확하다
 - 장고는 원하는 만큼의 다양한 앱을 갖을수 있음
 - 이 앱들은 작게 구성해야 한다. 큰 앱을 작게 쪼개야한다.

### 장고로 온라인 쇼핑몰을 만들어 보자
* 필요한 앱
 1.상품
  - 상품을 보여주고 / 상품을 검색하고 / 후기를 남기고 / 상품을 만들수있고(관리자)..등등
 2 유저
 - 계정 생성 / 로그인 /장바구니 만들기 / 결제정보 / 리뷰 관리 등등
 3 장바구니
 - 장바구니 생성 / 업데이트 / 삭제 / 공유 / 체크아웃 
 4 결제
 - 결제관련 모든 작업 / 신용카드 직불카드 등등 / 세금 계산 / 환불 / 데이터 보호 / 암호화(페이팔 아임포트 등)


# 1-6 Creating our Django Project
- 장고 프로젝트를 만드는 법
`$ Django-admin startproject`
* 하지만 이방법은 장고의 크기를 조절 할 수 없다. 장고 프로젝트가 커지면 망할 수 잇음
 - production-ready-size라는걸 알려줄 필요가 있음
* cookiecutter 설치
`$Pip install cookiecutter`
OR
`$pipenv install cookiecutter`

* Cookiecutter 프로젝트 생성
`$cookiecutter https://github.com/pydanny/cookiecutter-django`


#1-8 Installing the requirements

* 쿠키커터로 생성한 프로젝트 폴더에 버블 생성
`$pipenv —three`

* 프로젝트 폴더 내 requirements 폴더의 파일들은 해당 버전에 필요한 패키지 리스트가 나타나 있다. pipenv가 이를 보고 해당 버전에 필요한 것을 설치한다.

* 각각의 파일이 차이점이 있다
Production.txt는 서버에서 내용 패키지를 설치 한다
우리의 컴퓨터에는 local.txt 의 패키지가 설치 될거다
Production , local 둘다 base.txt를 갖고 있다 이는 서버와 컴퓨터 둘 다 필요한 디폴트값이다.

* 설치 커맨드
`$pipenv install -r requirements/local.txt`
* 해당 커맨드로 설치 진행시 piplock 파일이 생성되는 부분에서 멈추게 되서 아래의 커맨드로 설치 진행 함
`$pipenv install -r requirements/local.txt —skip-lock`

# 1-9. Production settings and local settings

* 장고는 세팅 파일을 살펴보고 이를 토대로 로딩을 함

쿠키커터는 어디에서 코딩을 사용하느냐에 따라 각기 다른 세팅 파일을 쓸 수 있다.
세팅 또한 local, production, base 가 있고, 작동 위치는 requirements 와 같다
Local - 내컴퓨터
Production - 서버
Base - 내컴퓨터, 서버





