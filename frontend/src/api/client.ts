import { API_BASE_URL, REQUEST_TIMEOUT_MS } from '../constants/config';
import { ClientErrorCode } from '../constants/errorCodes';
import { getClientMessage } from '../constants/errorMessages';

/** Typed HTTP failure so hooks can branch on status (e.g. 404 vs network). */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Shared GET helper with timeout.
 * Maps transport failures to ApiError so screens never see raw fetch errors.
 */
export async function apiGet<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    let body: unknown = null;
    const text = await response.text();
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        body = null;
      }
    }

    if (!response.ok) {
      const message =
        body &&
        typeof body === 'object' &&
        'message' in body &&
        typeof (body as { message: unknown }).message === 'string'
          ? (body as { message: string }).message
          : `${getClientMessage(ClientErrorCode.REQUEST_FAILED)} (${response.status})`;
      throw new ApiError(message, response.status);
    }

    return body as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(getClientMessage(ClientErrorCode.REQUEST_TIMEOUT), 408);
    }
    throw new ApiError(
      getClientMessage(ClientErrorCode.NETWORK_UNREACHABLE),
      0,
    );
  } finally {
    clearTimeout(timeout);
  }
}
