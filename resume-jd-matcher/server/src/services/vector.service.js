import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export const storeChunks = async chunksWithEmbeddings => {
  const rows = chunksWithEmbeddings.map(item => ({
    content: item.text,
    embedding: item.embedding
  }))

  const { error } = await supabase.from("resume_chunks").insert(rows)

  if (error) {
    throw new Error(error.message)
  }
}
