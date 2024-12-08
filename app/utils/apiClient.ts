const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_API_BASE_URL");
}

const API_ROUTES = {
  register: `${BASE_URL}/users/register/`,
  login: `${BASE_URL}/users/login/`,
  reset: `${BASE_URL}/users/password-reset/`,
  submitAnswer: `${BASE_URL}/questions/`,
  tags: `${BASE_URL}/tags/`,
  question: (id: string) => `${BASE_URL}/questions/${id}/`,
  profile: `${BASE_URL}/users/profile`, 
    // Add other endpoints as needed
};

/**
 * Fetcher function to make API requests.
 * @param endpoint - API endpoint from API_ROUTES.
 * @param id - Dynamic parameter for the endpoint, if needed.
 * @param options - Fetch options (method, headers, body, etc.).
 * @returns The parsed response body.
 */
async function apiFetcher<T>(
  endpoint: string | ((id: string) => string),
  id?: string,
  options?: RequestInit
): Promise<T | null> {
  const url = typeof endpoint === "function" ? endpoint(id!) : endpoint;

  const response = await fetch(url, options);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export { API_ROUTES, apiFetcher };
