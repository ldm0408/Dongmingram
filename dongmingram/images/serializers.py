from rest_framework import serializers
from . import models
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer
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

    creator = FeedUserSerializer(read_only = True)

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
        


class ImageSerializer(serializers.ModelSerializer):

    comments = CommentSerializer(many = True)
    creator = FeedUserSerializer()
    tags = TagListSerializerField()

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
            'created_at',
            'tags'
        )

class InputImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = (
            'file',
            'location',
            'caption'
        )