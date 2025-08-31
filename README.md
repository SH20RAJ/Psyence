# 🧠 Psyence

**Psyence** is a SaaS + open-source project that acts as a **psychology-powered copilot for human interaction**.  
It uses **Retrieval-Augmented Generation (RAG)** with **Cloudflare AutoRAG + R2 storage** to deliver practical, context-grounded answers on:

- Flirting & dating (respectful approaches, handling rejection)
- Leadership & communication (speak like a CEO, motivate teams)
- Self-improvement (habits, mindset, productivity, stoicism)
- Humor & wit (light teasing, comebacks, banter)
- Negotiation & persuasion (influence ethically, set boundaries)
- Everyday psychology (confidence, charisma, relationships)

Psyence draws from **psychology research, public-domain classics, playbooks, and curated templates**.  
It’s like **Duolingo + Charisma on Command + Psychology Today**, powered by AI.

---

## 🚀 Features
- **RAG Answers** → grounded in psychology & communication playbooks.
- **Tone Styles** → Friendly • Witty • Direct • Empathic • CEO-style.
- **Role-Play Mode** → simulate conversations, get feedback.
- **Knowledge Cards** → bite-sized psychology insights, negotiation tactics, humor patterns.
- **Citations** → every answer cites its source.
- **Cloudflare Native** → AutoRAG + R2 for low-latency, cheap storage.

---

## 🏗️ Tech Stack
- **Frontend** → Next.js 15 (App Router), TailwindCSS, shadcn/ui  
- **Backend** → Cloudflare Workers + AutoRAG (RAG pipeline, retrieval, safety layer)  
- **Storage** → Cloudflare R2 (documents, embeddings JSONL)  
- **Vector Search** → AutoRAG indexer (with hybrid search: embeddings + BM25)  
- **LLM** → OpenAI GPT-4.1 (default) or open-source (Mistral, LLaMA via plugins)  
- **Auth** → Clerk / Auth.js  
- **Payments** → Stripe  

---

## 📂 Project Structure
```

psyence/
├── apps/
│   ├── web/        # Next.js frontend
│   ├── worker/     # Cloudflare Worker (AutoRAG endpoints)
├── data/
│   ├── raw/        # source material (txt/md/pdf summaries)
│   ├── processed/  # cleaned + chunked text
│   ├── embeddings/ # JSONL embeddings stored in R2
├── scripts/
│   ├── ingest.ts   # pipeline: clean → chunk → embed → upload
├── README.md

````

---

## ⚡ Getting Started

### 1. Clone
```bash
git clone https://github.com/<your-username>/psyence.git
cd psyence
````

### 2. Install

```bash
npm install
```

### 3. Env Setup

Create `.env.local`:

```env
OPENAI_API_KEY=sk-xxxx
CLOUDFLARE_ACCOUNT_ID=xxxx
CLOUDFLARE_API_TOKEN=xxxx
R2_BUCKET=psyence-rag
```

### 4. Ingest Data

Put your `.md` or `.txt` notes in `data/raw/`. Then run:

```bash
npm run ingest
```

This will:

1. Clean + chunk docs
2. Generate embeddings
3. Upload JSONL → **R2**
4. Register in AutoRAG index

### 5. Run Dev

```bash
npm run dev
```

---

## 📊 Data Sources

* 📚 **Public domain psychology texts** → [Project Gutenberg](https://www.gutenberg.org/), [Internet Archive](https://archive.org/)
* 🧾 **Your own notes & playbooks** → flirting, rejection replies, charisma hacks, negotiation scripts
* 🎙️ **Podcast & YouTube transcripts** (transformative summaries only)
* 📰 **Blogs & newsletters** → Farnam Street, Psychology Today, Charisma on Command
* 🗂️ **Community datasets** → cleaned Reddit/Quora Q\&A (e.g. r/socialskills)

⚠️ **Copyright note:** full copyrighted books (*48 Laws of Power*, etc.) are **not stored**. Only licensed summaries, notes, or public-domain equivalents are used.

---

## 🛠️ Optimizations with AutoRAG + R2

* **Pre-chunk text** → \~800–1200 tokens, avoids embedding huge docs.
* **Store embeddings in JSONL batches** → faster ingestion.
* **Compression** → `gzip`/`zstd` on R2 to cut storage by 5–10×.
* **Metadata tagging** → tone, culture, context (dating, work, humor).
* **Hybrid search** → combine embeddings + keyword search for better accuracy.
* **Re-ranking** → small cross-encoder rerank top-12 → top-4 chunks.
* **Caching** → store popular queries in Cloudflare KV or D1 for instant (<50ms) answers.

---

## 🤝 Contributing

1. Fork & PR
2. Add psychology notes / playbooks to `data/raw/`
3. Run `npm run ingest` to process + embed
4. Submit your PR 🎉

---

## 📜 License

MIT License — all contributed content must be **public domain, licensed, or original**.

---

## 🌟 Vision

Psyence is building the **OS for human interaction** —
a universal copilot for charisma, influence, relationships, and personal growth.

Think: *“ChatGPT trained on all of psychology, social intelligence, and charisma playbooks.”*

---

