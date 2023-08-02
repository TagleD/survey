# Generated by Django 4.1.7 on 2023-08-01 16:58

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('json_answer', models.JSONField(verbose_name='Структура ответа (JSON)')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Время создания')),
                ('survey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='webapp.survey', verbose_name='Опрос')),
            ],
            options={
                'verbose_name': 'Ответ',
                'verbose_name_plural': 'Ответы',
            },
        ),
    ]