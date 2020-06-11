export const headers = new Headers();
headers.set("Content-Type", "application/json");

export default async (method: string, url: string, data?: any, isFormData?: boolean) => {
  try {
    const body = isFormData ? data : JSON.stringify(data);
    const response = await fetch(url, { method, headers, body });
    return response.json();
  } catch (err) {
    console.error(err);
  }
}

export const API_URL = "https://v2202003114332112298.powersrv.de/api";