import requests
import os

from .base_provider import BaseAgentProvider

class LettaProvider(BaseAgentProvider):

    def __init__(self):

        self.api_key = os.getenv("LETTA_API_KEY")

        self.base_url = "https://api.letta.com/v1"


    def generate_response(self, session_id: str, message: str) -> str:

        url = f"{self.base_url}/agents/respond"
       