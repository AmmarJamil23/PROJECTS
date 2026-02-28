import requests
import os

from .base_provider import BaseAgentProvider


class LettaProvider(BaseAgentProvider):

    def __init__(self):

        self.api_key = os.getenv("LETTA_API_KEY")

        self.base_url = "https://api.letta.com/v1"


    def generate_response(self, session_id: str, message: str) -> str:

        url = f"{self.base_url}/agents/respond"

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        payload = {
            "session_id": session_id,
            "message": message
        }

        response = requests.post(url, headers=headers, json=payload)

        if response.status_code != 200:
            # This will print the exact reason Letta rejected the request to your terminal
            error_details = f"Status: {response.status_code}, Body: {response.text}"
            print(f"LETTA DEBUG: {error_details}") 
            raise Exception(f"Letta API error: {error_details}")

        data = response.json()

        return data.get("response", "")