from django.contrib.auth.mixins import UserPassesTestMixin
from django.urls import reverse_lazy, reverse
from django.views.generic import TemplateView, ListView, DeleteView, DetailView, UpdateView

from webapp.forms import SurveyForm
from webapp.models import Survey, UserAnswer


# Create your views here.


class SurveyCreateView(TemplateView):
    template_name = 'survey_constructor.html'


class SurveyListView(ListView):
    template_name = 'survey_list.html'

    context_object_name = 'surveys'
    model = Survey


class SurveyDeleteView(UserPassesTestMixin, DeleteView):
    template_name = 'survey_confirm_delete.html'
    model = Survey
    success_url = reverse_lazy('index')
    permission_denied_message = 'У вас нет прав доступа'

    def test_func(self):
        return self.request.user.is_authenticated


class SurveyDetailView(DetailView):
    template_name = 'answer_list.html'
    model = Survey
    context_object_name = 'survey'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['answers'] = UserAnswer.objects.filter(survey_id=self.kwargs['pk'])
        return context


class SurveyUpdateView(UpdateView):
    model = Survey
    form_class = SurveyForm
    template_name = 'update_survey.html'
    context_object_name = 'survey'

    def get_success_url(self):
        return reverse('index')
