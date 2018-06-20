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
        "<int:image_id>/like",
        view = views.LikeImage.as_view(),
        name = 'LikeImage'
    )
    
]