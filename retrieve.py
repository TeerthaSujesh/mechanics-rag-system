from sentence_transformers import SentenceTransformer, CrossEncoder
import chromadb
import json
import re

model = SentenceTransformer("BAAI/bge-base-en-v1.5")
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(
    name="statics_problems",
    metadata={"hnsw:space": "cosine"}
)

CONFIDENCE_THRESHOLD = 0.40  # placeholder — we'll calibrate this properly once real data is in

def retrieve(question: str, k: int = 5):
    match = re.search(r"\d+-\d+", question)

    if match:
        problem = get_by_id(match.group())
        if problem:
            return [problem]

    q_embedding = model.encode([question]).tolist()
    results = collection.query(query_embeddings=q_embedding, n_results=k)

    best_distance = results["distances"][0][0]
    best_confidence = 1 - best_distance

    if best_confidence < CONFIDENCE_THRESHOLD:
        return [{
            "problem_id": results["ids"][0][0],
            "confidence": round(best_confidence, 3),
            "problem_statement": None,
            "solution_steps": None,
            "final_answer": None,
            "image_path": None,
        }]

    candidates = []
    for i in range(len(results["ids"][0])):
        distance = results["distances"][0][i]
        confidence = 1 - distance
        meta = results["metadatas"][0][i]

        candidates.append({
            "problem_id": results["ids"][0][i],
            "confidence": round(confidence, 3),
            "problem_statement": meta["problem_statement"],
            "solution_steps": json.loads(meta["solution_steps"]),
            "final_answer": meta["final_answer"],
            "image_path": meta["image_path"],
        })

    # Only rerank among candidates that individually clear the confidence bar —
    # never let the CrossEncoder "rescue" a topically weak match
    qualified = [c for c in candidates if c["confidence"] >= CONFIDENCE_THRESHOLD]

    if not qualified:
        return [{
            "problem_id": candidates[0]["problem_id"],
            "confidence": candidates[0]["confidence"],
            "problem_statement": None,
            "solution_steps": None,
            "final_answer": None,
            "image_path": None,
        }]

    pairs = [(question, c["problem_statement"]) for c in qualified]
    rerank_scores = reranker.predict(pairs)

    for c, score in zip(qualified, rerank_scores):
        c["rerank_score"] = float(score)

    qualified.sort(key=lambda c: c["rerank_score"], reverse=True)

    return [qualified[0]]


def get_by_id(problem_id: str):
    result = collection.get(ids=[problem_id])
    if not result["ids"]:
        return None
    meta = result["metadatas"][0]
    return {
        "problem_id": problem_id,
        "confidence": 1.0,
        "problem_statement": meta["problem_statement"],
        "solution_steps": json.loads(meta["solution_steps"]),
        "final_answer": meta["final_answer"],
        "image_path": meta["image_path"],
    }


if __name__ == "__main__":
    q = "cylinder resting between a wall and an incline, coefficient of friction, find moment to slip"
    for m in retrieve(q, k=5):
        print(m)