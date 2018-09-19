from rest_framework import serializers
from . import models
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)
from dongmingram.users import models as user_models


class SmallImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = (
            'file',
        )


class CountImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = (
            "id",
            "file",
            "like_counter",
            "comment_counter"
        )


class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'username',
            'profile_image'
        )


class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.Comment
        fields = (
            'id',
            'creator',
            'message'
        )


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Like
        fields = '__all__'


class ImageSerializer(TaggitSerializer, serializers.ModelSerializer):

    comments = CommentSerializer(many=True)
    creator = FeedUserSerializer()
    tags = TagListSerializerField()
    is_liked = serializers.SerializerMethodField()  # 함수를 사용하는 필드

    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'location',
            'caption',
            'comments',
            'like_counter',
            'comment_counter',
            'creator',
            'natural_time',
            'tags',
            'is_liked'
        )

    def get_is_liked(self, obj):  # 로그인 한 유저가 본인 피드의 사진에 좋아요 했는지 여부를 찾는다
        if 'request' in self.context:
            # view에서 context를 통해 imageSerializer에 request를 보냈기에 여기서 request class(?)사용가능
            request = self.context['request']
            try:
                models.Like.objects.get(creator__id=request.user.id, image__id=obj.id)
                return True
            except models.Like.DoesNotExist:
                return False
        return False


class InputImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = (
            'file',
            'location',
            'caption'
        )
