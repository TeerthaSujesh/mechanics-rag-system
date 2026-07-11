from generate import generate
from retrieve import retrieve

question = "cylinder resting between a wall and an incline, coefficient of friction, find moment to slip"
retrieved = retrieve(question, k=1)

print("=== RETRIEVED DATA ===")
print(retrieved)

print("\n=== GENERATED EXPLANATION ===")
print(generate(question, retrieved))
