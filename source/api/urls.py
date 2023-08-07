from django.urls import path

from api.views import create_survey_view, ApiSurveyDetailView

urlpatterns = [
    path('survey/', create_survey_view, name='api_create_survey'),
    path('survey/<int:pk>/', ApiSurveyDetailView.as_view(), name='api_survey_detail'),
]
