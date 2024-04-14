from rest_framework import serializers
from .models import Generator

class GeneratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Generator
        # fields = '__all__'
        fields = (
            'id', 
            'name', 
            'size', 
            'patterns', 
            'created_at', 
            # 'get_absolute_url'
            )