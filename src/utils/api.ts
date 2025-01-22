class Api {
  baseUrl: string;
  headers: any;

  constructor({ baseUrl, headers }: { baseUrl: string; headers?: any }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  customFetch(url: string, headers?: any) {
    return fetch(url, headers).then((res) => {
      return res.ok ? res.json() : Promise.reject(res.statusText);
    });
  }

  deleteTemplate(templateId: string) {
    return this.customFetch(`${this.baseUrl}/templates/${templateId}`, {
      headers: this.headers,
      method: "DELETE",
    });
  }

  updateTemplate(templateId: string, data: { name: string; content: string }) {
    return this.customFetch(`${this.baseUrl}/templates/${templateId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  createTemplate(newTemplate: { name: string; content: string }) {
    return this.customFetch(`${this.baseUrl}/templates`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newTemplate),
    });
  }

  getAllTemplate() {
    return this.customFetch(`${this.baseUrl}/templates`, {
      headers: this.headers,
      method: "GET",
    });
  }
}

export const api = new Api({
  baseUrl: "http://localhost:4040",
});
