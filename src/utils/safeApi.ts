/**
 * Safe fetch helper that inspects the Content-Type header and status before calling res.json().
 * This prevents the classic "Unexpected token '<', '<!DOCTYPE '... is not valid JSON" error
 * when an endpoint returns an HTML page (like 404/500/Vite fallback) or when the server is reloading.
 */
export async function safeFetchJson<T = any>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<{ ok: boolean; status: number; data?: T; error?: string }> {
  try {
    const res = await fetch(input, init);
    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (!res.ok) {
        return {
          ok: false,
          status: res.status,
          error: data?.error || data?.message || `Request failed with status ${res.status}`
        };
      }
      return { ok: true, status: res.status, data };
    }

    // If response was not JSON (e.g. HTML 404 or index.html fallback)
    const text = await res.text();
    const isHtml = text.trim().startsWith('<') || contentType.includes('text/html');
    const errorMsg = isHtml
      ? `The server returned an HTML response instead of JSON (Status ${res.status}). The service may be starting or the route was not found.`
      : text.slice(0, 160) || `Request failed with status ${res.status}`;

    return {
      ok: false,
      status: res.status,
      error: errorMsg
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      error: err?.message || 'Network connection failed'
    };
  }
}
