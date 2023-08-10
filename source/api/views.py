import json

from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializer import SurveySerializer
from webapp.models import Survey, UserAnswer


# Create your views here.

class ApiSurveyListView(APIView):
    def get(self, request, *args, **kwargs):
        objects = Survey.objects.all()
        serializer = SurveySerializer(objects, many=True)
        return Response(serializer.data, status=200)

@csrf_exempt
def create_survey_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            new_survey = Survey(
                name=data['name'],
                description=data['description'],
                json_survey=data
            )
            new_survey.save()
            return JsonResponse({'status': 'success', 'message': 'Survey created successfully.'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data.'}, status=400)
        except KeyError as e:
            return JsonResponse({'status': 'error', 'message': f'Missing required field: {e}'}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid method. Only POST requests are allowed.'},
                            status=405)


@csrf_exempt
def create_user_answer_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            new_answer = UserAnswer(
                survey_id=data['id'],
                json_answer=data
            )
            new_answer.save()
            return JsonResponse({'status': 'success', 'message': 'Survey created successfully.'}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data.'}, status=400)
        except KeyError as e:
            return JsonResponse({'status': 'error', 'message': f'Missing required field: {e}'}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid method. Only POST requests are allowed.'},
                            status=405)


#

class ApiSurveyDetailUpdateDeleteView(APIView):
    def get_object(self, pk):
        try:
            return Survey.objects.get(pk=pk)
        except Survey.DoesNotExist:
            raise Http404

    def get(self, request, *args, **kwargs):
        survey_obj = self.get_object(pk=kwargs.get('pk'))
        serializer = SurveySerializer(survey_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        object = self.get_object(pk=self.kwargs.get('pk'))
        serializer = SurveySerializer(object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        object = self.get_object(pk=kwargs.get('pk'))
        object.delete()
        return Response({'id': kwargs.get('pk')}, status=status.HTTP_204_NO_CONTENT)
