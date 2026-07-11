// Mock API service for the frontend. This simulates a backend RAG response.

export async function askQuestion(question) {
  // Return mock response after 1 second
  const mock = {
    answer:
      'The block moves because the required static friction exceeds the maximum available static friction.',
    problem_id: 'Problem 6.3',
    confidence: 0.94,
    image: '/placeholder.svg'
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(mock), 1000)
  })
}
