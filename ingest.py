import json
from sentence_transformers import SentenceTransformer
import chromadb

model = SentenceTransformer('all-MiniLM-L6-v2')
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(
    name="statics_problems",
    metadata={"hnsw:space": "cosine"}
)

with open("sample_data.json") as f:
    data = json.load(f)

ids = [d["problem_id"] for d in data]
docs = [d["problem_statement"] for d in data]  # ONLY problem_statement is embedded
embeddings = model.encode(docs).tolist()

metadatas = [
    {
        "chapter": d["chapter"],
        "topic": d["topic"],
        "problem_statement": d["problem_statement"],
        "solution_steps": d["solution_steps"],
        "final_answer": d["final_answer"],
        "image_path": d["image_path"],
    }
    for d in data
]

collection.upsert(ids=ids, embeddings=embeddings, metadatas=metadatas, documents=docs)
print(f"Ingested {len(ids)} problems.")