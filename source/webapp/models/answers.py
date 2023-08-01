from django.db import models
from django.utils import timezone


class UserAnswer(models.Model):
    survey = models.ForeignKey(
        to='webapp.Survey',
        related_name='user_answers',
        on_delete=models.CASCADE,
        verbose_name='Опрос'
    )
    json_answer = models.JSONField(
        null=False,
        blank=False,
        verbose_name='Структура ответа пользователей (JSON)'
    )
    created_at = models.DateTimeField(
        default=timezone.now,
        verbose_name='Время создания',
    )

    def __str__(self):
        return f'{self.created_at}'

    class Meta:
        verbose_name = 'Ответ пользователя'
        verbose_name_plural = 'Ответы пользователей'