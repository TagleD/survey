from django import forms

from webapp.models import Survey


class SurveyForm(forms.ModelForm):
    class Meta:
        model = Survey
        fields = ('name', 'description', 'json_survey')
        labels = {
            'name': 'Название опроса',
            'description': 'Описание опроса',
            'json_survey': 'JSON струкртура опроса'
        }
