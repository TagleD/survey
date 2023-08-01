from django.utils import timezone
from django.db import models


class Survey(models.Model):
    name = models.CharField(
        max_length=128,
        null=False,
        blank=False,
        verbose_name='Название'
    )
    description = models.TextField(
        max_length=2000,
        null=True,
        blank=True,
        verbose_name='Описание'
    )
    json_survey = models.JSONField(
        null=False,
        blank=False,
        verbose_name='Структура опроса (JSON)'
    )
    created_at = models.DateTimeField(
        default=timezone.now,
        verbose_name='Время создания',
    )

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Опрос'
        verbose_name_plural = 'Опросы'