# Generated by Django 5.0.3 on 2024-07-09 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0004_jobpostedhistory'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobpostedhistory',
            name='jobstatus',
            field=models.BooleanField(blank=True, default=True, null=True),
        ),
    ]
