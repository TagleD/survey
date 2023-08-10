from django.urls import path

from api.views import create_survey_view, create_user_answer_view, ApiSurveyDetailUpdateDeleteView, ApiSurveyListView

urlpatterns = [
    path('survey/', create_survey_view, name='api_create_survey'),
    path('survey/<int:pk>/', ApiSurveyDetailUpdateDeleteView.as_view(), name='api_survey_detail'),
    path('survey/answer_add', create_user_answer_view, name='api_survey_answer_add'),
    path('survey/list', ApiSurveyListView.as_view(), name='api_survey_list_view')
]
