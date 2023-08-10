import json

from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import TemplateView, ListView, DeleteView, DetailView

from webapp.models import Survey, UserAnswer


# Create your views here.


class SurveyCreateView(TemplateView):
    template_name = 'survey_constructor.html'


class SurveyListView(ListView):
    template_name = 'survey_list.html'

    context_object_name = 'surveys'
    model = Survey


class SurveyDeleteView(DeleteView):
    template_name = 'survey_confirm_delete.html'
    model = Survey
    success_url = reverse_lazy('index')



class SurveyDetailView(DetailView):
    template_name = 'answer_list.html'
    model = Survey
    context_object_name = 'survey'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['answers'] = UserAnswer.objects.filter(survey_id=self.kwargs['pk'])
        return context



