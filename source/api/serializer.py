from rest_framework import serializers

from webapp.models import Survey


class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = ('name', 'description', 'json_survey', 'created_at')

