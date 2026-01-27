import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)

export const retrievalRelevantChunks = async (queryEmbedding, k = 5) => {
    const { data, error } = await supabase.rpc("match_resume_chunks", {
        query_embedding: queryEmbedding,
        match_count: k
    })

    if (error) {
        throw new Error(error.message)
    }

    return data
}