import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

@csrf_exempt
def create_survey_view(request, *args, **kwargs):
    if request.method == 'POST':
        if request.body:
            data = json.loads(request.body)
            print(data)
            return JsonResponse({'answer': data}, status=200)
        else:
            return JsonResponse({'answer': 'Not valid input'}, status=400)
    else:
        return JsonResponse({'answer': 'Not valid method'}, status=400)