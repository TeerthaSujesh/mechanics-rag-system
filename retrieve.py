from sentence_transformers import SentenceTransformer
import chromadb
import json
import re

model = SentenceTransformer('all-MiniLM-L6-v2')
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(
    name="statics_problems",
    metadata={"hnsw:space": "cosine"}
)

CONFIDENCE_THRESHOLD = 0.40  # placeholder — we'll calibrate this properly once real data is in

def retrieve(question: str, k: int = 3):
    match = re.search(r"\d+-\d+", question)

    if match:
       problem = get_by_id(match.group())

       if problem:
            return [problem]
    q_embedding = model.encode([question]).tolist()
    results = collection.query(query_embeddings=q_embedding, n_results=k)

    matches = []
    for i in range(len(results["ids"][0])):
        distance = results["distances"][0][i]
        confidence = 1 - distance  # Chroma returns cosine distance by default; similarity = 1 - distance
        meta = results["metadatas"][0][i]

        if confidence < CONFIDENCE_THRESHOLD:
            matches.append({
                "problem_id": results["ids"][0][i],
                "confidence": round(confidence, 3),
                "problem_statement": None,
                "solution_steps": None,
                "final_answer": None,
                "image_path": None,
            })
        else:
            matches.append({
                "problem_id": results["ids"][0][i],
                "confidence": round(confidence, 3),
                "problem_statement": meta["problem_statement"],
                "solution_steps": json.loads(meta["solution_steps"]), 
                "final_answer": meta["final_answer"],
                "image_path": meta["image_path"],
            })
    return matches

if __name__ == "__main__":
    q = "cylinder resting between a wall and an incline, coefficient of friction, find moment to slip"
    for m in retrieve(q, k=3):
        print(m)

def get_by_id(problem_id: str):
    result = collection.get(ids=[problem_id])
    if not result["ids"]:
        return None
    meta = result["metadatas"][0]
    return {
        "problem_id": problem_id,
        "confidence": 1.0,  # exact match, not a similarity guess
        "problem_statement": meta["problem_statement"],
        "solution_steps":json.loads(meta["solution_steps"]), 
        "final_answer": meta["final_answer"],
        "image_path": meta["image_path"],
    }