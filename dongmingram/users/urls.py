from django.urls import path

from . import views

app_name = "users"
urlpatterns = [
    path(
        "explore/",
        view=views.ExploreUser.as_view(),
        name="ExploreUser"
    ),
    path(
        "<int:user_id>/follow/",
        view=views.FollowUser.as_view(),
        name='FollowUser'
    ),
    path(
        "<int:user_id>/unfollow/",
        view=views.UnFollowUser.as_view(),
        name='UnFollowUser'
    ),
    path(
        "<str:username>/followers",
        view=views.UserFollowers.as_view(),
        name="user_followers"
    ),
    path(
        "<str:username>/following",
        view=views.UserFollowing.as_view(),
        name="user_following"
    ),
    path(
        "search/",
        view=views.Search.as_view(),
        name="user_searching"
    ),
    path(
        "<str:username>/",
        view=views.UserProfile.as_view(),
        name="userProfile"
    ),
    path(
        "<str:username>/password",
        view=views.ChangePassword.as_view(),
        name="change_password"
    )
]
