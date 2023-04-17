const _apiUrl = import.meta.env["VITE_API_URL"];

if (!_apiUrl) {
  throw new Error("Unable to find environment variable: VITE_API_URL");
}

export const apiUrl = _apiUrl;
