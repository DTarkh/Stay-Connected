Documentation for Using URLs and Environment Variables in Next.js
1. Setting Up Environment Variables
To manage API base URLs and configurations, define environment variables in your Next.js project.

1.1. Create .env.local
Create a .env.local file in the root of your project to store environment variables, including the base URL for your API.

Example:
    NEXT_PUBLIC_API_BASE_URL = https://example.site.com
    NEXT_PUBLIC_API_BASE_URL: The NEXT_PUBLIC_ prefix exposes the variable to client-side JavaScript.
Note: Add .env.local to .gitignore to prevent it from being committed to version control.

1.2. Environment-Specific Files
You can create separate files for different environments:
.env.development: For local development.
.env.production: For production.

2. Accessing Environment Variables in Code
You can access environment variables using process.env in your code.

Example:

            const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

            if (!BASE_URL) {
            throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");
            }
3. Using URLs in API Requests
After setting up environment variables, use them to make dynamic API requests.

3.1. API Request Example
Use the base URL and endpoints in your login and registration code.

Login Example:

        import { apiFetcher, API_ROUTES } from "@/app/apiClient";

        const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await apiFetcher('login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        // Handle success

        };
3.2. apiClient.ts Example
This file constructs API endpoints dynamically using the environment variable.

        const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!BASE_URL) {
        throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");
        }

        const API_ROUTES = {
        register: `${BASE_URL}/users/register/`,
        login: `${BASE_URL}/users/login/`,
        };