from django import forms
from django.contrib import admin

from webapp.models import Survey, UserAnswer


# Register your models here.


class SurveyAdminForm(forms.ModelForm):
    class Meta:
        model = Survey
        fields = '__all__'  # Все поля модели


class SurveyAdmin(admin.ModelAdmin):
    form = SurveyAdminForm
    list_display = ('id', 'name', 'description', 'json_survey', 'created_at')
    list_filter = ('id', 'name', 'created_at')
    search_fields = ('id', 'name', 'description', 'json_survey', 'created_at')


admin.site.register(Survey, SurveyAdmin)


class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('id', 'json_answer', 'created_at', 'survey_id')
    list_filter = ('id', 'created_at', 'survey_id')
    search_fields = ('id', 'created_at', 'survey_id')
    fields = ('id', 'created_at', 'survey_id')


admin.site.register(UserAnswer, UserAnswerAdmin)
