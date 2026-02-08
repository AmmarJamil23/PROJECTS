from rest_framework import serializers

class DocumentUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    document_name = serializers.CharField(max_length=255)

class ResumeUploadSerializer(serializers.Serializer):
    resume = serializers.FileField()
    candidate_name = serializers.CharField(max_length=255)