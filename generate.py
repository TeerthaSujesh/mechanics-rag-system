import ollama
import os
from prompts import build_prompt

def generate(question, retrieved, model="llava:7b"):
    prompt = build_prompt(question, retrieved)
    top_match = retrieved[0] if retrieved else None

    message = {"role": "user", "content": prompt}

    if top_match and top_match.get("image_path"):
        image_path = os.path.join(os.path.dirname(__file__), top_match["image_path"])
        if os.path.exists(image_path):
            message["images"] = [image_path]

    response = ollama.chat(model=model, messages=[message])
    return response["message"]["content"]