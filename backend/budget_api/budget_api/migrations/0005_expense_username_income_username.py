# Generated by Django 4.2.4 on 2023-09-17 04:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget_api', '0004_budget_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='username',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='income',
            name='username',
            field=models.CharField(default='', max_length=255),
        ),
    ]
