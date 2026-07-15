import ollama
from prompts import build_prompt

def generate(question, retrieved, model="llama3.1:8b"):

    prompt = build_prompt(question, retrieved)

    response = ollama.chat(
        model=model,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]