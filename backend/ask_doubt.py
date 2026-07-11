from retrieve import retrieve
from generate import generate


def ask_doubt(question: str):
    """
    Orchestrates the RAG pipeline:
    1. Retrieve relevant problems.
    2. Generate an explanation using Llama.
    3. Return a JSON-friendly response.
    """

    retrieved = retrieve(question, k=1)

    if not retrieved:
        return {
            "success": False,
            "message": "No matching problem found."
        }

    best_match = retrieved[0]

    answer = generate(question, retrieved)

    return {
        "success": True,
        "answer": answer,
        "matched_problem": best_match["problem_id"],
        "confidence": best_match["confidence"],
        "image_path": best_match["image_path"],
        "solution_steps": best_match["solution_steps"],
        "final_answer": best_match["final_answer"]
    }