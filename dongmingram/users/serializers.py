from rest_framework import serializers
from . import models
from dongmingram.images import serializers as image_serializers


class UserProfileSerializer(serializers.ModelSerializer):

    images = image_serializers.CountImageSerializer(many=True)
    post_count = serializers.ReadOnlyField()
    followers_count = serializers.ReadOnlyField()
    followings_count = serializers.ReadOnlyField()
    class Meta:
        model = models.User
        fields = (
            "username",
            "name",
            "profile_image",
            "bio",
            "website",
            "post_count",
            "followers_count",
            "followings_count",
            "images"
        )

class ListUserSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.User
        fields = (
            'id',
            'profile_image',
            'username',
            'name'
        )
