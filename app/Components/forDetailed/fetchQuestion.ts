import { apiFetcher, API_ROUTES } from "@/app/utils/apiClient";
export async function fetchQuestion(id: string) {
  const data = await apiFetcher(API_ROUTES.question, id, {
      headers: {
          'Cache-Control': 'no-cache',
      },
  });

  return data;
}
