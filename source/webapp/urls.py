from django.urls import path

from webapp.views import SurveyCreateView, SurveyListView, SurveyDeleteView, SurveyDetailView, SurveyUpdateView

urlpatterns = [
    path('', SurveyListView.as_view(), name='index'),
    path('survey/add', SurveyCreateView.as_view(), name='survey_create'),
    path('survey/<int:pk>/delete/', SurveyDeleteView.as_view(), name='survey_delete'),
    path('survey/<int:pk>/confirm_delete/', SurveyDeleteView.as_view(), name='survey_confirm_delete'),
    path('survey/<int:pk>/answers', SurveyDetailView.as_view(), name='survey_answers'),
    path('survey/<int:pk>/update/', SurveyUpdateView.as_view(), name='survey_update'),
]
