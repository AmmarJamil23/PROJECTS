class BaseAgentProvider:

    def generate_response(self, session_id: str, message: str) -> str:

        """
        Generate response from AI agent.

        session_id: conversation identifier
        message: user input text
        returns: AI response


        """


        raise NotImplementedError("Provider must implement generate_response")