1. proxy the request from :3000 to :8000

- package.json 에 proxy 추가

2. Install Django-cors-headers

- 리액트는 포트 3000 이고 장고는 포트 8000 을 이용한다. 그리고 장고는 3000 에서 요청이 들어오면 디폴트로 이를 막을거다. Django-cors-headers 는 이러한 상황에서 3000 에서 온 요청을 차단하지 않도록 해준다
- `pipenv install Django-cors-headers` 설치하자

3. Add ‘corsheaders’ to INSTALLED_APPS

- base.py 에 추가하자

4. Add ‘corsheaders.middleware.CorsMiddleware’ before ‘CommonMiddleware’

- 미들웨어는 장고가 요청을 관리하는 방법이다.
- 이를 통해 장고가 차단한 3000 에서 온 요청을 해당 미들웨어가 다시 허용하게 된다.

5. Add CORS_ORIGIN_ALLOW_ALL = True On base settings

- base.py. 하단에 삽입하자
- 이렇게 되면 안전하지 않을 수 있지만 JWT 을 요구하게 될테니 괜찮다

6. Make Django load the bundles as static files with ‘str(ROOT_DIR.path(‘frontend’, ‘build’, ‘static’)

- 기존의 장고의 static 파일들은 장고 프로젝트의(dongmingram) static 폴더에 저장 되게 되었다.
- 하지만 프론트앤드 작업시 static 파일은 웹팩이 만들어준 즉 build 폴더 안의 파일을 위치시켜야 한다.
- 이 작업을 통해 frontend/build/static 에도 static 파일들이 있음을 알려준다

7. Create a views.py file on ‘dongmingram’ folder.

- views.py 파일 생성

8. Create ReactAppView that reads the file

views.py. 에 아래의 코드를 작성하자

```
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
import os


class ReactAppView(View):

    def get(self,request):

        try:
            with open(os.path.join(str(settings.ROOT_DIR), 'frontend', 'build', 'index.html')) as file:
                return HttpResponse(file.read())

        except:
            return HttpResponse(
                """
                index.html not found ! build your React app !!
                """,
                status = 501,

            )
```

9. Add the ReactAppView as a URL

- config/ urls.py 에

```
from dongmingram import views

path("", views.ReactAppView.as_view()),
```

추가하자

- path 의 “” 은 catch_all 이라는 의미이다. 이는 request 가 상단의 path 를 매칭하지 못하면 catch all 로 이동한다.
