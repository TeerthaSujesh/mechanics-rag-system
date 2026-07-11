import ollama
from prompts import build_prompt

def generate(question, retrieved, model="llama3.1:8b"):
    # Adapter: Person 1's solution_steps come as one string, not a list.
    # Split into rough steps so build_prompt's enumerate() works correctly.
    for match in retrieved:
        if match.get("solution_steps") and isinstance(match["solution_steps"], str):
            match["solution_steps"] = [s.strip() for s in match["solution_steps"].split(". ") if s.strip()]

    prompt = build_prompt(question, retrieved)

    response = ollama.chat(
        model=model,
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]
