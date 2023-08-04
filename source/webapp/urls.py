from django.urls import path

from webapp.views import SurveyCreateView, SurveyDetailView, SurveyDeleteView

urlpatterns = [
    path('', SurveyDetailView.as_view(), name='index'),
    path('survey/add', SurveyCreateView.as_view(), name='survey_create'),
    path('survey/<int:pk>/delete/', SurveyDeleteView.as_view(), name='survey_delete'),
    path('survey/<int:pk>/confirm_delete/', SurveyDeleteView.as_view(), name='survey_confirm_delete'),
]
