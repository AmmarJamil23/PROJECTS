from core.providers.provider_factory import ProvideFactory

class AgentService:

    def __init__(self):
        self.provider = ProvideFactory.get_agent_provider()

    def process_user_message(self, session_id, message):

        response = self.provider.generate_response(
            
            session_id=session_id,
            message=message
        )

        return response