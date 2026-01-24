const { OpenAIEmbeddings, ChatOpenAI } = require("@langchain/openai");
const { createClient } = require("@supabase/supabase-js");
const { PromptTemplate } = require("@langchain/core/prompts");


const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
});

const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0
})

const chat = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: "Question is required"});
        }

        const questionEmbedding = await embeddings.embedQuery(question);

        const { data, error } = await supabase.rpc("match_documents", {
            query_embedding: questionEmbedding,
            match_count: 5
        });

        if (error) {
            throw error;
        }

        const context = data.map(d => d.content).join("\n\n");

        const prompt = new PromptTemplate({
        template: `
        Answer strictly using the provided context.
        Do not guess.
        If answer is not in context, say "I do not know".
        Context:
        {context}
        Question:
        {question}
        `,
        inputVariables: ["context", "question"]
        });


        const finalPrompt = await prompt.format({
            context,
            question
        });

        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Transfer-Encoding", "chunked");

        const stream = await model.stream(finalPrompt);

        for await (const chunk of stream) {
            res.write(chunk.content || "");
        }

        res.end();

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Chat failed"});
    }
};

module.exports = { chat }