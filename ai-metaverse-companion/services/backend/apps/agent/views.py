from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response


from core.services.agent_service import AgentService


# Create your views here.
# This becomes my public API endpoint
class AgentMessageView(APIView):
    def post(self, request):
        session_id = request.data.get("session_id")

        message = request.data.get("message")

        service = AgentService()

        response = service.process_user_message(session_id, message)

        return Response({
            "response": response
        })
