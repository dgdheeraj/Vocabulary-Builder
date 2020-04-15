from django.db import models

# Create your models here.
class details(models.Model):
    name=models.CharField(max_length=50)
    uname=models.CharField(max_length=50)
    passwd=models.CharField(max_length=50)

    # So that you can identfy each instance in the admin page
    def __str__(self):
        return self.name