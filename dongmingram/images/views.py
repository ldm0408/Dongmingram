from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers

class Feed(APIView):

    def get(self,request,format = None):

        user = request.user

        following_users = user.following.all()

        return Respnse(status = 200)