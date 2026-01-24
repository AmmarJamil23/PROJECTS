const pdfParse = require("pdf-parse");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let pdfData;
    try {
      pdfData = await pdfParse(req.file.buffer);
    } catch (err) {
      return res.status(400).json({ error: "PDF is encrypted or unreadable" });
    }

    const text = pdfData.text;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "PDF contains no extractable text" });
    }

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
    });

    const chunks = await splitter.splitText(text);

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY
    });

    for (const chunk of chunks) {
      const embedding = await embeddings.embedQuery(chunk);

      await supabase.from("documents").insert({
        content: chunk,
        embedding
      });
    }

    res.status(200).json({
      message: "PDF ingested successfully",
      chunks: chunks.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
};

module.exports = { uploadPdf };
