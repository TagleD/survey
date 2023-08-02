import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from webapp.models import Survey


# Create your views here.

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
        return JsonResponse({'status': 'error', 'message': 'Invalid method. Only POST requests are allowed.'}, status=405)