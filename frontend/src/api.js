// Talks to the FastAPI backend in /backend (see backend/app.py).
// Override the target with VITE_API_BASE in a .env file if the API
// isn't running on the default local port.

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export class ApiError extends Error {}

export async function askQuestion(question) {
  let res
  try {
    res = await fetch(`${API_BASE}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    })
  } catch (err) {
    throw new ApiError(
      `Can't reach the API at ${API_BASE}. Is the backend running (uvicorn backend.app:app)?`
    )
  }

  if (!res.ok) {
    throw new ApiError(`The API responded with an error (status ${res.status}).`)
  }

  return res.json()
}

// The backend stores image_path as a path relative to backend/data
// (e.g. "images/ch6_6-3.png"). It's served statically at /data.
export function resolveImageUrl(imagePath) {
  if (!imagePath) return null
  return `${API_BASE}/data/${imagePath}`
}
