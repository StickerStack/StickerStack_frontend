import { API_URL } from '../constants';

class Api {
  public url: string;
  public headers: HeadersInit;

  constructor(url: string, headers: HeadersInit) {
    this.url = url;
    this.headers = headers;
  }

  public checkResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`${res.status}`);
  }

  public async removeBackground(formData: FormData) {
    const data = await fetch(`${this.url}/stickerslogic/rembg-image`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    return this.checkResponse(data);
  }
}

const api = new Api(API_URL, {
  'Content-Type': 'application/json',
});

export { api, Api };
