from django.urls import path
from . import views

app_name = "images"
urlpatterns = [
    path(
        "",
        view = views.Feed.as_view(),
        name = 'Feed'
    ),
    path(
        "<int:image_id>/likes",
        view = views.LikeImage.as_view(),
        name = 'LikeImage'
    ),
    path(
        "<int:image_id>/comments",
        view = views.CommentOnImage.as_view(),
        name = 'CommentOnImage'
    ),
    path(
        "comments/<int:comment_id>",
        view = views.Comment.as_view(),
        name = 'Comment'
    )
    
]