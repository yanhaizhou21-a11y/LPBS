export async function readJsonResponse<T = any>(response: Response, fallbackMessage: string): Promise<T> {
  const body = await response.text();
  const suffix = response.status ? ` (HTTP ${response.status})` : '';

  if (!body.trim()) throw new Error(`${fallbackMessage}${suffix}`);

  try {
    return JSON.parse(body) as T;
  } catch {
    throw new Error(`${fallbackMessage}${suffix}`);
  }
}
