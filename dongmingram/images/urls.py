from django.urls import path
from . import views

app_name = "images"
urlpatterns = [
    path(
        "",
        view=views.Images.as_view(),
        name = 'Feed'
    ),
    path(
        "<int:image_id>/",
        view=views.ImageDetail.as_view(),
        name='Feed'
    ),
    path(
        "<int:image_id>/likes",
        view = views.LikeImage.as_view(),
        name = 'LikeImage'
    ),
    path(
        "<int:image_id>/unlikes",
        view = views.UnLikeImage.as_view(),
        name = 'UnLikeImage'
    ),    
    path(
        "<int:image_id>/comments",
        view = views.CommentOnImage.as_view(),
        name = 'CommentOnImage'
    ),
    path(
        "<int:image_id>/comments/<int:comment_id>",
        view=views.ModerateComments.as_view(),
        name='ModerateComment'
    ),
    path(
        "comments/<int:comment_id>",
        view = views.Comment.as_view(),
        name = 'DeleteComment'
    ),
    path(
        "search/",
        view=views.Search.as_view(),
        name="search"
    ),
    
]
