# Generated by Django 2.0.5 on 2018-05-27 07:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0002_auto_20180527_1630'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='image',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='images.Image'),
        ),
        migrations.AlterField(
            model_name='like',
            name='image',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='images.Image'),
        ),
    ]