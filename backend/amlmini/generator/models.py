from django.db import models

# Create your models here.
class Generator(models.Model):
    name = models.CharField(max_length=100)
    size = models.IntegerField()
    patterns = models.JSONField(default=list)
    created_at = models.DateField(auto_now_add=True)
    # slug = models.SlugField()

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.name
    
    # def get_absolute_url(self):
    #     return f'/{self.slug}/'