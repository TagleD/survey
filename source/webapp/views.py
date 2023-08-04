from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import TemplateView, ListView, DeleteView

from webapp.models import Survey


# Create your views here.


class SurveyCreateView(TemplateView):
    template_name = 'survey_constructor.html'


class SurveyDetailView(ListView):
    template_name = 'survey_list.html'

    context_object_name = 'surveys'
    model = Survey


class SurveyDeleteView(DeleteView):
    template_name = 'survey_confirm_delete.html'
    model = Survey
    success_url = reverse_lazy('index')

