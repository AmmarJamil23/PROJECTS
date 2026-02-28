import os

from .letta_provider import LettaProvider

class ProvideFactory:

    @staticmethod
    def get_agent_provider():

        provider = os.getenv("AGENT_PROVIDER", "letta")

        if provider == "letta":
            return LettaProvider()

        raise Exception("Invalid provider")