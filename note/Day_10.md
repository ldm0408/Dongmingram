# 1-57 Search users by username

* 해쉬테그 검색과 거의 유사하다
```
class Search(APIView):
    
    def get(self,request, format= None):

        username = request.query_params.get('username',None)

        if username is not None:
            users = models.User.objects.filter(username__istartswith = username)
            serializer = serializers.ListUserSerializer(users, many = True)
            return Response(data = serializer.data, status = status.HTTP_200_OK)

        else:
            return Response(status = status.HTTP_404_NOT_FOUND)
```
# 1-58 Creating Notification Models

* Notifications app 을 만든다.
* 알림은 다른사용자가 나를 좋아요, 댓글, 팔로우 할때 나타나게 할 예정이다
* 모델은 아래와 같이 구성 한다

1. Creator
 - 알림을 보내는 유저를 의미한다. Foreignkey로 user model을 지정한다.
2. To
- 알림을 받는 유저를 의미한다. 역시 Foreignkey로 user model을 지정한다
* creator 필드와 to 필드는 동일한 모델을 foreignkey로 사용 하고있다. 이럴 경우. Related-name을 지정해 줘야 에러가 나지 않는다
3. notification_type
- 알림의 종류를 뜻한다. 이경우 like, comment, follow 세가지로 구성하면 된다.
4. Image
- like와 comment할 대상인 이미지를 의미한다. Image model을 foreignkey로 지정하자.
- follow 알림은 이미지가 필요없다. 그래서 에러를 방지하기위해. 이미지필드에  null 값과 blank 값에 각각 True를 지정해주자
* 알림 모델에 기존에 이미지 모델에 사용하던 TimeStampedModel을 차용해서 알림 발생 시기를 이용하도록 지정했다.
```
class Notification(image_models.TimeStampedModel):

    TYPE_CHOICES = (
        ('like','Like'),
        ('comment','Comment'),
        ('follow','Follow')
    )

    creator = models.ForeignKey(user_models.User, on_delete = models.CASCADE, related_name='creator')
    to = models.ForeignKey(user_models.User, on_delete=models.CASCADE, related_name='to')
    notification_type = models.CharField(max_length = 20, choices = TYPE_CHOICES)
    image = models.ForeignKey(image_models.Image, on_delete=models.CASCADE, null=True, blank=True)
```


# 1-60 Creating Follow, Comment and Like notification

* 좋아요, 댓글, 팔로우가 만들어질때마다 알림이 뜨게 뷰를 만들자
* notification view에 notification function을 만들자
- 이는 notification에 필요한 필드의 값을 인수로 받고, notification models object를 생성하게 한다
```
def Notification(creator, to, notification_type, image=None,comment=None ):

    notification = models.Notification.objects.create(
        creator = creator,
        to = to,
        notification_type=notification_type,
        comment = comment,
        image = image,
    )

    notification.save()
```
* 이를 users, images의 views.py 에 import 하고, Follow, Comment and Like 를 생성하는 클래스에 사용하자
* 이 후 Follow, Comment and Like가 생성될시 해당 동작에 대한 notification이 자동 생성된다.


# 1-62 Moderating comments on my image

* 내가 올린 사진에 달린 댓글(누가 남긴 댓글이던 간에)을 삭제 해보자
*  url은 —> images/<images_id>/comments/<comments_id>
* 이미지를 찾고, 그 이미지가 유저 본인이 만든것인지 체크 한뒤 커멘트 오브젝트를 또 불러올 수 있지만 이는 너무 복잡
* 커맨트를 먼저 찾고, 그 커맨트가 달린 이미지의 id를 체크 하고, 그 이미지가 유저 본인인지 한번에 체크 하자~!

```
class ModerateComments(APIView):
    
    def delete(self, request, image_id, comment_id, format=None):
        user = request.user

        try:
            comment_to_delete = models.Comment.objects.get(
                id = comment_id, image__id = image_id, image__creator = user)
            comment_to_delete.delete()
        except models.Comment.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
        
        return Response(status= status.HTTP_204_NO_CONTENT)
```

# 1-64 Getting the image likes
* 한개의 이미지에 좋아요한 유저의 리스트를 불러오자
* 기존의 like 생성 view안에 추가한다(urls 또한 동일)
* values()
 - 해당 model objects 쿼리 내부 값을 볼 수 있다.
 -  각 필드의 키와 값을 딕셔너리화 해서 반환해주는 쿼리셋이다
 - 이를 이용해서 like 모델에 creator id 값을 이용해서 해당 유저들을 찾을거다

* users app 의 models 와 serializers가 필요하다
- like 한 유저의 리스트가 필요하기 때문에

```
class LikeImage(APIView):

    def get(self, request, image_id, format = None):

        likes = models.Like.objects.filter(image__id = image_id)

        like_creators_ids = likes.values('creator_id')

        users = user_models.User.objects.filter(id__in = like_creators_ids)

        serializer = user_serializers.ListUserSerializer(users, many = True)

        return Response(data = serializer.data, status = status.HTTP_200_OK)
```

# 1-65 Edit a Photo

* 사진 수정을 해보자
* 기존에 있던  imageDetail view 에 메소드를 더하자
* 사진 수정에 사용할 serializer를 만들자 —> InputImageSerializer
* 이미지는 해당 이미지 아이디와, creator 가 user 본인인지 체크를 해줘야 한다
* 유저 본인이 만든 이미지가 아니면 수정 할 수 없도록 해야하기 때문이다
* 총 3개(file, location, caption). 필드를 사용할건데 해당 내용들이 전부 수정되지 않으면 에러가 난다
* 이때 사용하는게 ‘partial update’ —> partial 값을 True 로 지정해서 부분 업데이트가 가능하게 하자

```
    def put(self, request, image_id, format = None):

        user= request.user

        try:
            image = models.Image.objects.get(id = image_id, creator = user)
        except models.Image.DoesNotExist:
            return Response(status = status.HTTP_401_UNAUTHORIZED)
        
        serializer = serializers.InputImageSerializer(image, data = request.data, partial = True)

        if serializer.is_valid():
            serializer.save(creator = user)
            return Response(data = serializer.data, status = status.HTTP_204_NO_CONTENT)

        else:
            return Response(status = status.HTTP_400_BAD_REQUEST)
```

# 1-67 Update profile
* user profile class에 put 메소드를 추가 한다.
* 해당 클래스에 공통적으로 username 으로 유저를 찾는 기능을 사용하는 관계로 이를 메소드 화 해서 사용하자
* 사용자 유저(request.user) 와 요청한 유저(url의 username으로 찾은 유저)가 일치한지 체크를 한다.
* serializer는 기존에 user profile serializer를 사용하고, 포스트, 팔로잉, 팔로우 카운트는 read only filed로 설정하자.
* 부분 업데이트가 가능하게 partial = True를 설정하자
```
def put(self, request, username, format = None):
        
        user = request.user
        
        found_user = self.get_user(username)

        if found_user is None:
            return Response(status = status.HTTP_404_NOT_FOUND)
        
        elif found_user.username != user.username:
            return Response(status = status.HTTP_401_UNAUTHORIZED)
        
        else:
            serializer = serializers.UserProfileSerializer(found_user, data = request.data, partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response(data = serializer.data, status = status.HTTP_200_OK)
            else:
                return Response(data = serializer.errors, status = status.HTTP_400_BAD_REQUEST)
```

# 1-68 Updating the password

* user profile class가 아닌 새로운 클래스를 작성하자
* 유저가 이전 비번을 잘 전달했는지 체크하고, 기존의 오래된 데이터를 다뤄야하고, 해당 비번이 현재 비번과 동일한지 등을 체크해야하는데 개별 클래스를 이용하는 이유
* Django 문서에 check password가 있으니 참고하자!!!!!
* request.user의 username과 url의 username이 같은지 체크
* request data에서 현재 패스워드를 받자 —> request.data.get(‘현재 패스워드 키값)
* 입력한 패스워드가 현재 패스워드와 같은지 체크 —> user.check_password(‘현재패스워드’)
* 같으면 입력한 새로운 패스워드를 불러와서 새로운 패스워드로 저장 --> user.set_password(‘새로운 패스워드’)

```
class ChangePassword(APIView):

    def put(self, request, username, format = None):

        user = request.user

        if user.username == username:

            current_password = request.data.get('current_password', None)

            if current_password is not None:

                password_match = user.check_password(current_password) ## Boolean

                if password_match:

                    new_password = request.data.get('new_password', None)

                    if new_password is not None:

                        user.set_password(new_password)

                        user.save()

                        return Response(status = status.HTTP_200_OK)

                    else:
                        return Response(status=status.HTTP_400_BAD_REQUEST)
                
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
```