const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_API_BASE_URL");
}

const API_ROUTES = {
    register: `${BASE_URL}/users/register/`,
    login: `${BASE_URL}/users/login/`,
    submitAnswer: `${BASE_URL}/questions/`,
    // Add other endpoints as needed
};

/**
 * Fetcher function to make API requests.
 * @param endpoint - API endpoint from API_ROUTES.
 * @param options - Fetch options (method, headers, body, etc.).
 * @returns The parsed response body.
 */
async function apiFetcher<T>(
    endpoint: keyof typeof API_ROUTES,
    options?: RequestInit
): Promise<T> {
    const url = API_ROUTES[endpoint];

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
}

export { API_ROUTES, apiFetcher };
