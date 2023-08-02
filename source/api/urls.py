from django.urls import path

from api.views import create_survey_view

urlpatterns = [
    path('create_survey/', create_survey_view, name='create_survey'),
]