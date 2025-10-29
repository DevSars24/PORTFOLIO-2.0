import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const embeddings = new GoogleGenerativeAIEmbeddings(process.env.GEMINI_API_KEY);

export async function getRelevantContext(query, topK = 3) {
  // Example pseudo-code for vector search
  const results = await pc.query({
    vector: await embeddings.embedQuery(query),
    topK,
    includeMetadata: true,
  });
  return results.matches.map((m) => m.metadata.text).join("\n");
}
