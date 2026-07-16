import ollama
response = ollama.chat(
   model='llava:7b',
    messages=[{
        'role': 'user',
        'content': 'Describe the diagram in detail.',
        'images': ['images/ch6_6-11.png']
    }]
)
print(response['message']['content'])

