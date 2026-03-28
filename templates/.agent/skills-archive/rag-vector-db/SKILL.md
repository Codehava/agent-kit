---
name: rag-vector-db
description: |
  Use when building AI applications that require memory, semantic search, embeddings, document chat, or connecting an LLM to a private dataset (RAG). Triggers on rag, vector, embedding, pinecone, qdrant, pgvector, similarity search.
---

# RAG & Vector Database Patterns

## Mental Model
RAG (Retrieval-Augmented Generation) prevents LLM hallucinations by forcing the AI to strictly answer based on context you provide. Vector databases store text as mathematical arrays (embeddings), allowing "Semantic Search" (finding text with similar meaning, not just exact keywords).

## 1. The RAG Pipeline
1. **Document Loading:** Parse PDF/Markdown/Webpages.
2. **Chunking:** Split large text into smaller chunks (e.g., 500-1000 tokens) with overlap (e.g., 100 tokens). This preserves context.
3. **Embedding:** Use an embedding model (e.g., `text-embedding-3-small`) to convert chunks into vectors.
4. **Storage:** Save to a Vector DB (pgvector, Pinecone).
5. **Retrieval Search:** Embed user's query -> search DB for nearest neighbors (Cosine Similarity).
6. **Generation:** Pass top-K results to LLM (e.g., GPT-4o) alongside the user's prompt as "Context".

## 2. Chunking Best Practices (RecursiveCharacterTextSplitter)
Never blindly split strings by length. Split by natural boundaries: Paragraphs -> Sentences -> Words.

```typescript
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
  separators: ["\n\n", "\n", " ", ""], // Natural semantic splitting
});
const output = await splitter.createDocuments([longText]);
```

## 3. Cosine Similarity Search (pgvector Example)
If using PostgreSQL (`pgvector`), querying similarities is a matter of calculating vector distances (`<=>` operator).

```typescript
import { cosineDistance, desc, gt, sql } from 'drizzle-orm';
import { embeddingsTable } from './schema';

// Convert user query to vector first
const userQueryVector = await generateEmbedding("How to reset password?");

// Search DB for semantic matches
const similarity = sql<number>`1 - (${cosineDistance(embeddingsTable.embedding, userQueryVector)})`;
const results = await db
  .select({ name: embeddingsTable.content, similarity })
  .from(embeddingsTable)
  .where(gt(similarity, 0.75)) // Only highly relevant matches
  .orderBy((t) => desc(t.similarity))
  .limit(5);
```

## 4. Prompting the LLM with Context
Always use a strict boundary to prevent prompt injection.

```text
You are a helpful support agent. Reply strictly based on the triple-quoted Context provided below. 
If the answer is not in the context, say "I don't have this information." DO NOT hallucinate.

CONTEXT:
\"\"\"
{RETRIEVED_CHUNKS_STRING}
\"\"\"

User Query: {USER_QUESTION}
```
