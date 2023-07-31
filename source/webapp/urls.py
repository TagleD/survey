from django.urls import path

from webapp.views import IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
]