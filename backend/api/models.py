from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
  # Specify notes fields here
  title = models.CharField(max_length=100)
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True) # Auto populates created date
  # Author uses ForeignKey to ID who's posting that note. on_delete will remove all notes created by author if author is deleted. related_name links .notes to User.
  author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
  
  def __str__(self):
    return self.title
  