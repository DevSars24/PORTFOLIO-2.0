const fs = require('fs-extra');
const path = require('path');
const { Pinecone } = require('@pinecone-database/pinecone');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');

const pc = new Pinecone({ apiKey: process.env.VITE_PINECONE_API_KEY }); // From .env
const indexName = 'saurabh-index'; // Create in Pinecone dashboard

async function index() {
  try {
    // Load docs
    const mdPath = path.join(__dirname, '../data/knowledge-base.md');
    const docs = (await fs.readFile(mdPath, 'utf8')).split('\n\n'); // Chunk by paragraphs

    // Embed & upsert
    const embeddings = new GoogleGenerativeAIEmbeddings({ 
      apiKey: process.env.VITE_GEMINI_API_KEY 
    });
    const index = pc.Index(indexName);

    const vectors = [];
    for (let i = 0; i < docs.length; i++) {
      const embedding = await embeddings.embedQuery(docs[i]);
      vectors.push({
        id: `doc-${i}`,
        values: embedding,
        metadata: { text: docs[i], source: 'knowledge-base' }
      });
    }

    await index.upsert(vectors);
    console.log(`✅ Indexed ${vectors.length} chunks to Pinecone!`);
  } catch (err) {
    console.error('❌ Indexing failed:', err.message);
  }
}

index();