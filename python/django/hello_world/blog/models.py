from django.db import models

# Create your models here.
class Article(models.Model):
  id = models.AutoField(primary_key=True)
  title = models.TextField()
  brief = models.TextField()
  content = models.TextField()
  publish_date = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.title

