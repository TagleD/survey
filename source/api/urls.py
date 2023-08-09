from django.urls import path

from api.views import create_survey_view, ApiSurveyDetailView, create_user_answer_view

urlpatterns = [
    path('survey/', create_survey_view, name='api_create_survey'),
    path('survey/<int:pk>/', ApiSurveyDetailView.as_view(), name='api_survey_detail'),
    path('survey/answer_add', create_user_answer_view, name='api_survey_answer_add'),
]
