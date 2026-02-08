from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import (
    DocumentUploadSerializer,
    ResumeUploadSerializer,
)


@api_view(["POST"])
def upload_document(request):
    serializer = DocumentUploadSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
    return Response(
        {
            "message": "Document received",
            "document_name": serializer.validated_data["document_name"]
        },
        status=status.HTTP_201_CREATED
    )

@api_view(["POST"])
def upload_resume(request):
    serializer = ResumeUploadSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response(
        {
            "message": "Resume received",
            "candidate_name": serializer.validated_data["candidate_name"]
        },
        status=status.HTTP_201_CREATED
    )

# Create your views here.
@api_view(["GET"])
def health_check(request):
    return Response(
        {
            "status": "ok",
            "service": "multi-doc-rag-backend"
        }
    )
