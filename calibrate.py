from retrieve import retrieve

test_queries = [
    # (question, expected_problem_id_or_None)
    ("cylinder wedged between wall and incline, moment to cause slip", "6-11"),
    ("wheel rolling up curved incline with hanging weight on cord", "6-13"),
    ("bar leaning with roller at top, minimum angle for equilibrium", "6-18"),
    ("block on incline connected by pulley to hanging mass, range of mass", "6-19"),
    ("man pulling a cart up a ramp, minimum friction for shoes", "6-23"),
    ("three stacked blocks, force needed to cause slipping", "6-24"),
    ("how to calculate the boiling point of water", None),  # should be a clear non-match
    ("what is the capital of France", None),                # should be a clear non-match
]

for question, expected in test_queries:
    results = retrieve(question, k=1)
    top = results[0]
    print(f"Q: {question}")
    print(f"  Expected: {expected} | Got: {top['problem_id']} | Confidence: {top['confidence']}")
    print()
    
from retrieve import retrieve
result = retrieve("how to calculate the boiling point of water", k=1)
print(result)